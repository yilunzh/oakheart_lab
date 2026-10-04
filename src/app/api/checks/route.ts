import { validateCheckRequest } from "@/lib/check-request";

const MAX_BYTES = 8_000;

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "unsupported_media_type" }, { status: 415 });
  }
  const raw = await request.text();
  if (raw.length > MAX_BYTES) {
    return Response.json({ error: "payload_too_large" }, { status: 413 });
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  // Honeypot: bots fill hidden fields. Reply as if accepted, store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ status: "received" }, { status: 202 });
  }

  const result = validateCheckRequest(body);
  if (!result.ok) {
    return Response.json({ error: "invalid", fields: result.errors }, { status: 422 });
  }

  // Storage, owner notification and the check runner are connected in Phase 4.
  // Until then, never claim a request was received.
  return Response.json({ error: "not_connected" }, { status: 503 });
}
