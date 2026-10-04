import { neon } from "@neondatabase/serverless";
import type { CheckRequest } from "./check-request";

export type StoredLead = CheckRequest & {
  requestKey: string;
  websiteHost: string;
  referrer?: string;
  utm?: Record<string, string>;
  ipHash?: string;
};

export interface LeadStore {
  /** Requests from this IP hash in the last hour. */
  countRecentByIp(ipHash: string): Promise<number>;
  /** True if the same email asked about the same site in the last 24 hours. */
  hasRecentDuplicate(email: string, websiteHost: string): Promise<boolean>;
  /** Inserts the lead. Returns its id, or null if this request key was already stored. */
  insert(lead: StoredLead): Promise<string | null>;
  markNotified(id: string): Promise<void>;
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
           email, question, heard_from, referrer, utm, ip_hash)
        values
          (${lead.requestKey}, ${lead.businessName}, ${lead.website}, ${lead.websiteHost},
           ${lead.location}, ${lead.businessType}, ${lead.email}, ${lead.question ?? null},
           ${lead.heardFrom ?? null}, ${lead.referrer ?? null},
           ${lead.utm ? JSON.stringify(lead.utm) : null}, ${lead.ipHash ?? null})
        on conflict (request_key) do nothing
        returning id`;
      return rows[0]?.id ?? null;
    },
    async markNotified(id) {
      await sql`update oakheart.check_requests set notified_at = now() where id = ${id}`;
    },
  };
}
