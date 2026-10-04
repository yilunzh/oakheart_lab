import { neonStore } from "@/lib/lead-store";
import { resendNotifier } from "@/lib/notify";
import { notifyPending } from "@/lib/notify-pending";
import { site } from "@/content/site";

// Called daily by Vercel Cron (vercel.json). Vercel sends `Authorization: Bearer $CRON_SECRET`.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) return Response.json({ error: "not_connected" }, { status: 503 });
  const result = await notifyPending(
    neonStore(process.env.DATABASE_URL),
    resendNotifier(process.env.RESEND_API_KEY, site.email, process.env.NOTIFY_FROM ?? "Oakheart Lab <checks@oakheartlab.com>"),
  );
  // A non-2xx status makes the scheduled caller (GitHub Actions) fail and email the owner.
  return Response.json(result, { status: result.sent < result.pending ? 500 : 200 });
}
