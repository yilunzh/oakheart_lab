import type { LeadStore } from "./lead-store";
import type { Notifier } from "./notify";

/** Retries owner notifications for stored leads that were never notified. */
export async function notifyPending(store: LeadStore, notify: Notifier) {
  const claimed = await store.claimUnnotified();
  let sent = 0;
  for (const lead of claimed) {
    if (await notify(lead)) sent++;
    else await store.releaseClaim(lead.id);
  }
  return { pending: claimed.length, sent };
}
