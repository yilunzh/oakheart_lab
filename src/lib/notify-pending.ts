import type { LeadStore } from "./lead-store";
import type { Notifier } from "./notify";

/** Retries owner notifications for stored leads that were never notified. */
export async function notifyPending(store: LeadStore, notify: Notifier) {
  const pending = await store.listUnnotified();
  let sent = 0;
  for (const lead of pending) {
    if (await notify(lead)) {
      await store.markNotified(lead.id);
      sent++;
    }
  }
  return { pending: pending.length, sent };
}
