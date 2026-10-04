import { neon } from "@neondatabase/serverless";
import type { CheckRequest } from "./check-request";

export type StoredLead = CheckRequest & {
  requestKey: string;
  websiteHost: string;
  referrer?: string;
  utm?: Record<string, string>;
  ipHash?: string;
  status?: "new" | "test";
  /** When the visitor submitted (ISO). Set for retried notifications. */
  submittedAt?: string;
};

export interface LeadStore {
  /** Requests from this IP hash in the last hour. */
  countRecentByIp(ipHash: string): Promise<number>;
  /** True if the same email asked about the same site in the last 24 hours. */
  hasRecentDuplicate(email: string, websiteHost: string): Promise<boolean>;
  /** Inserts the lead. Returns its id, or null if this request key was already stored. */
  insert(lead: StoredLead): Promise<string | null>;
  markNotified(id: string): Promise<void>;
  /**
   * Atomically claims (10-minute lease via claimed_at) up to 20 new leads (older than 2 minutes, newer than 7 days) whose owner notification has not
   * been sent (sets claimed_at), so overlapping retries can't email the same lead twice.
   */
  claimUnnotified(): Promise<(StoredLead & { id: string })[]>;
  /**
   * Releases a claim when the notification failed, so a later retry picks the lead up again.
   * A claim that is never released (e.g. the function crashed mid-send) expires after 10 minutes.
   */
  releaseClaim(id: string): Promise<void>;
}

export function neonStore(databaseUrl: string): LeadStore {
  const sql = neon(databaseUrl);
  return {
    async countRecentByIp(ipHash) {
      const rows = await sql`
        select count(*)::int as n from oakheart.check_requests
        where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'`;
      return rows[0]?.n ?? 0;
    },
    async hasRecentDuplicate(email, websiteHost) {
      const rows = await sql`
        select 1 from oakheart.check_requests
        where email = ${email} and website_host = ${websiteHost}
          and created_at > now() - interval '24 hours'
        limit 1`;
      return rows.length > 0;
    },
    async insert(lead) {
      const rows = await sql`
        insert into oakheart.check_requests
          (request_key, business_name, website, website_host, location, business_type,
           email, question, heard_from, referrer, utm, ip_hash, status)
        values
          (${lead.requestKey}, ${lead.businessName}, ${lead.website}, ${lead.websiteHost},
           ${lead.location}, ${lead.businessType}, ${lead.email}, ${lead.question ?? null},
           ${lead.heardFrom ?? null}, ${lead.referrer ?? null},
           ${lead.utm ? JSON.stringify(lead.utm) : null}, ${lead.ipHash ?? null}, ${lead.status ?? "new"})
        on conflict (request_key) do nothing
        returning id`;
      return rows[0]?.id ?? null;
    },
    async markNotified(id) {
      await sql`update oakheart.check_requests set notified_at = now() where id = ${id}`;
    },
    async claimUnnotified() {
      const rows = await sql`
        update oakheart.check_requests set claimed_at = now()
        where id in (
          select id from oakheart.check_requests
          where status = 'new' and notified_at is null
            and (claimed_at is null or claimed_at < now() - interval '10 minutes')
            and created_at > now() - interval '7 days'
            -- leave fresh leads to their own first send, so a retry can't double-send
            and created_at < now() - interval '2 minutes'
          order by created_at
          limit 20
          for update skip locked
        )
        returning id, created_at, request_key, business_name, website, website_host, location, business_type,
                  email, question, heard_from, referrer, utm`;
      return rows.map((r) => ({
        id: r.id,
        submittedAt: new Date(r.created_at).toISOString(),
        requestKey: r.request_key,
        businessName: r.business_name,
        website: r.website,
        websiteHost: r.website_host,
        location: r.location,
        businessType: r.business_type,
        email: r.email,
        question: r.question ?? undefined,
        heardFrom: r.heard_from ?? undefined,
        referrer: r.referrer ?? undefined,
        utm: r.utm ?? undefined,
      }));
    },
    async releaseClaim(id) {
      await sql`update oakheart.check_requests set claimed_at = null where id = ${id}`;
    },
  };
}
