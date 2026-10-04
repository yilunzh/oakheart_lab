import { after } from "next/server";
import { handleCheckRequest } from "@/lib/check-handler";
import { neonStore } from "@/lib/lead-store";
import { resendNotifier } from "@/lib/notify";
import { notifyPending } from "@/lib/notify-pending";
import { site } from "@/content/site";

const store = process.env.DATABASE_URL ? neonStore(process.env.DATABASE_URL) : null;
const notify = resendNotifier(
  process.env.RESEND_API_KEY,
  site.email,
  process.env.NOTIFY_FROM ?? "Oakheart Lab <checks@oakheartlab.com>",
);

async function hashIp(ip: string) {
  const data = new TextEncoder().encode(`${process.env.IP_HASH_SALT ?? "oakheart-lab"}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(digest).toString("hex");
}

function allowedOrigins(request: Request) {
  const host = request.headers.get("host");
  return host ? [`https://${host}`, `http://${host}`] : null;
}

export async function POST(request: Request) {
  return handleCheckRequest(request, {
    store,
    notify,
    hashIp,
    allowedOrigins: allowedOrigins(request),
    // Runs after the response is sent, so the visitor never waits on retries.
    retryPending: store
      ? async () => after(() => notifyPending(store, notify).catch(() => {}))
      : undefined,
  });
}
