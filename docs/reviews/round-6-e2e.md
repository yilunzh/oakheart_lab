# Round 6: end-to-end evidence

- **Date:** 2026-10-04
- **Deployment:** `e984681`, live at https://oakheart-lab.vercel.app

| Check | Result |
|---|---|
| Live QA lead ("Round 6 QA", Moving & storage) to the deployed API | `201 received` at 15:43:18Z |
| Owner inbox (Gmail, read via connector) | "New AI check request: Round 6 QA (ignore)" in Inbox at 15:43:20Z, from `onboarding@resend.dev` to yilun@oakheartlab.com |
| Mobile confirmation visibility (`tests/browser/success-heading.cjs`, mocked 201 at 390×844) | header bottom 65 px, "Request received." heading top 121 px, focus on the status region: **PASS**. Screenshot: `success-m.png` in the round-6 capture |
| Retry safety | Retries claim leads atomically before emailing (`for update skip locked`) and release the claim on failure; they run after the response via `after()`. Unit tests cover single delivery across overlapping runs. |
| Retry cadence | Immediate opportunistic retry after any successful notification, plus the daily Vercel Cron (13:00 UTC), plus a GitHub Actions run every 3 hours. The GitHub run needs the `CRON_SECRET` repository secret: cutover checklist item 6. |

**QA-only behaviour:** `qa-*@oakheartlab.com` leads are stored as `status='test'`, so they are excluded from retries and never look like real leads.
