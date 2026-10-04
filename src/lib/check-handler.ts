import { validateCheckRequest } from "./check-request";
import type { LeadStore } from "./lead-store";
import type { Notifier } from "./notify";

const MAX_BYTES = 8_000;
const MAX_PER_IP_PER_HOUR = 5;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/** Our own QA submissions: stored as status "test" so they never look like real leads. */
export const isTestSubmission = (email: string) => /^(e2e|qa|notify)-[^@]*@oakheartlab\.com$/.test(email);

export type HandlerDeps = {
  store: LeadStore | null;
  notify: Notifier;
  hashIp: (ip: string) => Promise<string>;
  allowedOrigins: string[] | null;
  retryPending?: () => Promise<unknown>;
};

const json = (body: unknown, status: number) => Response.json(body, { status });

export async function handleCheckRequest(request: Request, deps: HandlerDeps): Promise<Response> {
  const origin = request.headers.get("origin");
  if (deps.allowedOrigins && origin && !deps.allowedOrigins.includes(origin)) {
    return json({ error: "forbidden_origin" }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "unsupported_media_type" }, 415);
  }
  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json({ error: "payload_too_large" }, 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return json({ error: "invalid_json" }, 400);
  }
  // Honeypot: bots fill hidden fields. Reply as if accepted, store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return json({ status: "received" }, 202);
  }

  const result = validateCheckRequest(body);
  if (!result.ok) return json({ error: "invalid", fields: result.errors }, 422);

  if (!deps.store) return json({ error: "not_connected" }, 503);

  const lead = result.value;
  const requestKey =
    typeof body.requestId === "string" && uuidPattern.test(body.requestId) ? body.requestId : crypto.randomUUID();
  const websiteHost = new URL(lead.website).hostname.replace(/^www\./, "");
  const utm =
    body.utm && typeof body.utm === "object"
      ? Object.fromEntries(
          Object.entries(body.utm as Record<string, unknown>)
            .filter(([k, v]) => utmKeys.includes(k) && typeof v === "string")
            .map(([k, v]) => [k, (v as string).slice(0, 200)]),
        )
      : undefined;
  const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 500) || undefined : undefined;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    const ipHash = await deps.hashIp(ip);
    if ((await deps.store.countRecentByIp(ipHash)) >= MAX_PER_IP_PER_HOUR) {
      return json({ error: "rate_limited" }, 429);
    }
    if (await deps.store.hasRecentDuplicate(lead.email, websiteHost)) {
      return json({ status: "duplicate" }, 202);
    }
    const id = await deps.store.insert({
      ...lead,
      requestKey,
      websiteHost,
      referrer,
      utm: utm && Object.keys(utm).length ? utm : undefined,
      ipHash,
      status: isTestSubmission(lead.email) ? "test" : "new",
    });
    if (!id) return json({ status: "duplicate" }, 202);
    if (await deps.notify({ ...lead, requestKey, websiteHost, referrer })) {
      await deps.store.markNotified(id).catch(() => {});
      // Email is working right now: also send any earlier leads whose notification failed.
      if (deps.retryPending) await deps.retryPending().catch(() => {});
    }
    return json({ status: "received" }, 201);
  } catch {
    return json({ error: "storage_failed" }, 503);
  }
}
