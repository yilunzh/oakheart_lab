import { neon } from "@neondatabase/serverless";
import type { CheckRequest } from "./check-request";

export type StoredLead = CheckRequest & {
  requestKey: string;
  websiteHost: string;
  referrer?: string;
  utm?: Record<string, string>;
  ipHash?: string;
  status?: "new" | "test";
};

export interface LeadStore {
  /** Requests from this IP hash in the last hour. */
  countRecentByIp(ipHash: string): Promise<number>;
  /** True if the same email asked about the same site in the last 24 hours. */
  hasRecentDuplicate(email: string, websiteHost: string): Promise<boolean>;
  /** Inserts the lead. Returns its id, or null if this request key was already stored. */
  insert(lead: StoredLead): Promise<string | null>;
  markNotified(id: string): Promise<void>;
  /** New leads from the last 7 days whose owner notification has not been sent. */
  listUnnotified(): Promise<(StoredLead & { id: string })[]>;
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
    async listUnnotified() {
      const rows = await sql`
        select id, request_key, business_name, website, website_host, location, business_type,
               email, question, heard_from, referrer, utm
        from oakheart.check_requests
        where status = 'new' and notified_at is null and created_at > now() - interval '7 days'
        order by created_at
        limit 50`;
      return rows.map((r) => ({
        id: r.id,
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
  };
}
