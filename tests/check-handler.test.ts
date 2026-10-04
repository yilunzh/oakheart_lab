import { describe, expect, it } from "vitest";
import { handleCheckRequest, type HandlerDeps } from "@/lib/check-handler";
import type { LeadStore, StoredLead } from "@/lib/lead-store";

function memoryStore(opts: { fail?: boolean } = {}) {
  const rows: (StoredLead & { id: string; at: number; notified?: boolean })[] = [];
  const store: LeadStore = {
    async countRecentByIp(ipHash) {
      if (opts.fail) throw new Error("db down");
      return rows.filter((r) => r.ipHash === ipHash && Date.now() - r.at < 3600_000).length;
    },
    async hasRecentDuplicate(email, host) {
      return rows.some((r) => r.email === email && r.websiteHost === host && Date.now() - r.at < 86400_000);
    },
    async insert(lead) {
      if (rows.some((r) => r.requestKey === lead.requestKey)) return null;
      const id = `id-${rows.length + 1}`;
      rows.push({ ...lead, id, at: Date.now() });
      return id;
    },
    async markNotified(id) {
      const r = rows.find((x) => x.id === id);
      if (r) r.notified = true;
    },
    async listUnnotified() {
      return rows.filter((r) => !r.notified);
    },
  };
  return { store, rows };
}

const valid = {
  businessName: "Tahoe Paddle",
  website: "tahoepaddle.example.com",
  location: "Lake Tahoe, CA",
  businessType: "Tours, activities & experiences",
  email: "Owner@Example.com",
};

function req(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://site.test/api/checks", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://site.test", "x-forwarded-for": "1.2.3.4", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function deps(store: LeadStore | null, notified: { n: number } = { n: 0 }): HandlerDeps {
  return {
    store,
    notify: async () => {
      notified.n++;
      return true;
    },
    hashIp: async (ip) => `h:${ip}`,
    allowedOrigins: ["https://site.test"],
  };
}

describe("POST /api/checks", () => {
  it("stores a valid request, normalizes fields and notifies", async () => {
    const { store, rows } = memoryStore();
    const notified = { n: 0 };
    const res = await handleCheckRequest(req({ ...valid, utm: { utm_source: "chatgpt.com", evil: "x" } }), deps(store, notified));
    expect(res.status).toBe(201);
    expect(rows).toHaveLength(1);
    expect(rows[0].email).toBe("owner@example.com");
    expect(rows[0].website).toBe("https://tahoepaddle.example.com/");
    expect(rows[0].websiteHost).toBe("tahoepaddle.example.com");
    expect(rows[0].utm).toEqual({ utm_source: "chatgpt.com" });
    expect(rows[0].notified).toBe(true);
    expect(notified.n).toBe(1);
  });

  it("returns field errors for invalid input and stores nothing", async () => {
    const { store, rows } = memoryStore();
    const res = await handleCheckRequest(req({ ...valid, website: "not a site", email: "nope" }), deps(store));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(Object.keys(body.fields).sort()).toEqual(["email", "website"]);
    expect(rows).toHaveLength(0);
  });

  it("requires every mandatory field", async () => {
    const res = await handleCheckRequest(req({}), deps(memoryStore().store));
    const body = await res.json();
    expect(Object.keys(body.fields).sort()).toEqual(["businessName", "businessType", "email", "location", "website"]);
  });

  it("rejects unknown select values", async () => {
    const res = await handleCheckRequest(req({ ...valid, businessType: "Spaceport" }), deps(memoryStore().store));
    expect(res.status).toBe(422);
  });

  it("silently drops honeypot submissions", async () => {
    const { store, rows } = memoryStore();
    const res = await handleCheckRequest(req({ ...valid, company: "bot" }), deps(store));
    expect(res.status).toBe(202);
    expect(rows).toHaveLength(0);
  });

  it("rejects malformed JSON, wrong content type, oversize bodies and foreign origins", async () => {
    const d = deps(memoryStore().store);
    expect((await handleCheckRequest(req("{oops"), d)).status).toBe(400);
    expect((await handleCheckRequest(req("[]"), d)).status).toBe(400);
    expect((await handleCheckRequest(req(valid, { "content-type": "text/plain" }), d)).status).toBe(415);
    expect((await handleCheckRequest(req({ ...valid, question: "x".repeat(9000) }), d)).status).toBe(413);
    expect((await handleCheckRequest(req(valid, { origin: "https://evil.test" }), d)).status).toBe(403);
  });

  it("is idempotent for a retried request id", async () => {
    const { store, rows } = memoryStore();
    const requestId = "6f1c2a52-3c1b-4c9e-9a51-1d7f0f9b1a11";
    const d = deps(store);
    expect((await handleCheckRequest(req({ ...valid, requestId }), d)).status).toBe(201);
    // Same key, different email (so the 24h duplicate check doesn't mask it)
    expect((await handleCheckRequest(req({ ...valid, email: "b@example.com", requestId }), d)).status).toBe(202);
    expect(rows).toHaveLength(1);
  });

  it("treats the same email and site within 24 hours as a duplicate", async () => {
    const { store, rows } = memoryStore();
    const d = deps(store);
    await handleCheckRequest(req(valid), d);
    const res = await handleCheckRequest(req({ ...valid, website: "https://www.tahoepaddle.example.com" }), d);
    expect(res.status).toBe(202);
    expect((await res.json()).status).toBe("duplicate");
    expect(rows).toHaveLength(1);
  });

  it("rate limits after 5 requests per IP per hour", async () => {
    const { store } = memoryStore();
    const d = deps(store);
    for (let i = 0; i < 5; i++) {
      expect((await handleCheckRequest(req({ ...valid, email: `u${i}@example.com` }), d)).status).toBe(201);
    }
    expect((await handleCheckRequest(req({ ...valid, email: "u9@example.com" }), d)).status).toBe(429);
  });

  it("reports storage failure honestly", async () => {
    const res = await handleCheckRequest(req(valid), deps(memoryStore({ fail: true }).store));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("storage_failed");
  });

  it("reports not connected when there is no store", async () => {
    const res = await handleCheckRequest(req(valid), deps(null));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("not_connected");
  });

  it("still stores the lead when notification fails", async () => {
    const { store, rows } = memoryStore();
    const res = await handleCheckRequest(req(valid), { ...deps(store), notify: async () => false });
    expect(res.status).toBe(201);
    expect(rows[0].notified).toBeUndefined();
  });
});

describe("notifyPending", () => {
  it("notifies and marks only leads whose notification succeeds", async () => {
    const { notifyPending } = await import("@/lib/notify-pending");
    const marked: string[] = [];
    const leads = ["a", "b"].map((id) => ({ id, requestKey: id, websiteHost: "x.com", businessName: id, website: "https://x.com/", location: "L", businessType: "T", email: `${id}@x.com` }));
    const store = {
      countRecentByIp: async () => 0,
      hasRecentDuplicate: async () => false,
      insert: async () => null,
      markNotified: async (id: string) => void marked.push(id),
      listUnnotified: async () => leads,
    };
    const result = await notifyPending(store, async (lead) => lead.businessName === "a");
    expect(result).toEqual({ pending: 2, sent: 1 });
    expect(marked).toEqual(["a"]);
  });
});

describe("test submissions", () => {
  it("stores our own QA addresses as status test", async () => {
    const { store, rows } = memoryStore();
    await handleCheckRequest(req({ ...valid, email: "e2e-browser@oakheartlab.com" }), deps(store));
    await handleCheckRequest(req({ ...valid, email: "owner2@example.com" }), deps(store));
    expect(rows.map((r) => r.status)).toEqual(["test", "new"]);
  });
});

describe("retry of earlier failed notifications", () => {
  it("runs after a successful notification, not after a failed one", async () => {
    let retries = 0;
    const retryPending = async () => void retries++;
    const ok = memoryStore();
    await handleCheckRequest(req(valid), { ...deps(ok.store), retryPending });
    const bad = memoryStore();
    await handleCheckRequest(req(valid), { ...deps(bad.store), notify: async () => false, retryPending });
    expect(retries).toBe(1);
  });
});
