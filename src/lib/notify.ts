import type { StoredLead } from "./lead-store";

export type Notifier = (lead: StoredLead) => Promise<boolean>;

/** Emails the owner via Resend. Returns false (never throws) if not configured or on failure. */
export function resendNotifier(apiKey: string | undefined, to: string, from: string): Notifier {
  return async (lead) => {
    if (!apiKey) return false;
    const lines = [
      `Business: ${lead.businessName}`,
      `Website: ${lead.website}`,
      `Location: ${lead.location}`,
      `Type: ${lead.businessType}`,
      `Email: ${lead.email}`,
      `Question: ${lead.question ?? "(none)"}`,
      `Heard from: ${lead.heardFrom ?? "(not given)"}`,
      `Referrer: ${lead.referrer ?? "(none)"}`,
      `UTM: ${lead.utm ? JSON.stringify(lead.utm) : "(none)"}`,
      "",
      "Report promised within 24 hours of this email.",
    ];
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          reply_to: lead.email,
          subject: `New AI check request: ${lead.businessName}`,
          text: lines.join("\n"),
        }),
      });
      if (!res.ok) console.error(`[notify] Resend responded ${res.status} for lead ${lead.requestKey}`);
      return res.ok;
    } catch (err) {
      console.error(`[notify] Resend request failed for lead ${lead.requestKey}`, err);
      return false;
    }
  };
}
