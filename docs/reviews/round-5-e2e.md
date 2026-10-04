# Round 5: end-to-end form evidence

- **Date:** 2026-10-04
- **Deployment:** `9677fa9`, live at https://oakheart-lab.vercel.app
- **Method:** same as round 4 — the real form in Chromium, with the request body forwarded to the deployed `/api/checks` endpoint.

| Submission | Deployed API | Visitor saw | Owner inbox |
|---|---|---|---|
| Browser, 390 (mobile) | `201 received` | "Request received…" confirmation. **Correction (found by the round 5 review):** the heading was still partly under the sticky header on mobile; fixed in round 6 and checked by `tests/browser/success-heading.cjs` | "New AI check request: E2E Round5 mobile (ignore)" in Inbox, 15:32:30Z |
| Browser, 1440 (desktop) | `429 rate_limited` | Alert: "That's a lot of requests from one connection in an hour…" with a prefilled email-fallback link. All entered values were kept (`e2e-desktop-success.png`). | none (nothing stored, as designed) |

The desktop `429` happened because the test machine had already sent more than 5 QA submissions from one IP within the hour. This shows the per-IP rate limit and its honest recovery state working in production. Successful desktop submissions and their inbox receipts are recorded in `round-4-e2e.md`.

**New in this round:** when an owner notification succeeds, any earlier leads whose notification failed are retried immediately (unit-tested). This is on top of the daily cron; Vercel's Hobby plan only allows cron jobs to run daily.
