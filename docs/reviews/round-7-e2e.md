# Round 7: end-to-end evidence

- **Date:** 2026-10-04
- **Deployment:** `8ec0e75`, live at https://oakheart-lab.vercel.app

| Check | Result |
|---|---|
| Live QA lead ("Round 7 QA", Stays & hospitality) to the deployed API | `201 received` at 15:54:23Z |
| Owner inbox (Gmail, read via connector) | "New AI check request: Round 7 QA (ignore)" in Inbox at 15:54:24Z |
| Live check-page JSON-LD | `Service` "Free AI Visibility Check" with `provider` → `#org` and `Offer` price 0 USD, plus FAQPage |
| `/api/cron/notify-pending` without the secret | `401` |
| Cron with failed sends | returns `500` when `sent < pending`, so the GitHub Actions run fails and GitHub emails the owner (code: `src/app/api/cron/notify-pending/route.ts`) |
| Double-send window | Retries only claim leads older than 2 minutes, so a first send in progress can't be duplicated. Unit test: "leaves a lead alone while its first send may still be in flight" (17 tests pass) |
| Mobile confirmation (`tests/browser/success-heading.cjs`) | PASS: heading top 121 px, header bottom 65 px, status focused. Exits non-zero on failure |
