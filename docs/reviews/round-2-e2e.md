# Round 2: end-to-end form evidence

- **Date:** 2026-10-04
- **Deployment:** `a4c79c0`, live at https://oakheart-lab.vercel.app (Vercel deployment `dpl_9PX2CBCr1PPy2PEXMorMjCsLz55N`)
- **Method:** HTTP requests to the live `/api/checks` endpoint with a synthetic lead, then a direct read of `oakheart.check_requests` in Neon.

| Test | Result |
|---|---|
| Valid submission (request ID `704c1523-…`) | `201 {"status":"received"}` |
| Same submission retried | `202 {"status":"duplicate"}`: stored once |
| Empty submission | `422` with per-field errors |
| Foreign `Origin` header | `403 forbidden_origin` |
| Database read-back | 1 row: business, host `example.com`, email, `utm_source=e2e`, IP stored as a hash. Afterwards marked `status='test'` |
| Owner email notification | **Not sent.** `RESEND_API_KEY` is not configured yet, so `notified_at` is null. The lead is still stored, which is the designed fallback. |
| `robots.txt` | `Disallow: /`, as intended while noindex is on |
| `sitemap.xml` | 200 |

**Owner can read new leads with:**

```sql
select * from oakheart.check_requests where status = 'new' order by created_at desc;
```
