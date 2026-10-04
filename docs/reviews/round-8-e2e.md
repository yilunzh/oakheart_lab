# Round 8: end-to-end evidence

- **Date:** 2026-10-04
- **Deployment:** `860a3ae`, live at https://oakheart-lab.vercel.app
- **Method:** the real form ran in Chromium at both widths. Each request body was forwarded to the deployed `/api/checks` with the production `Origin` header.
- **Inbox check:** Gmail, read via the connector.

| Submission | Deployed API | Visitor saw | Owner inbox |
|---|---|---|---|
| Browser, 390 (mobile) | `201 received` | "Request received. Your report will arrive within 24 hours from yilun@oakheartlab.com…", plus the spam note and next step | "New AI check request: E2E Round8 mobile (ignore)" in Inbox, 16:14:18Z |
| Browser, 1440 (desktop) | `201 received` | Same | "New AI check request: E2E Round8 desktop (ignore)" in Inbox, 16:14:20Z |

## Other checks

| Check | Result |
|---|---|
| Mobile confirmation visibility (`tests/browser/success-heading.cjs`) | **Correction (found by the round 8 review):** the single-run check passed, but the live mobile capture (`e2e-mobile-success.png`) showed an intermittent race. In about 1 of 20 runs the confirmation heading ended under the header and lost focus. Fixed after round 8 (reveal moved into `useEffect`). The check now runs 20 times with random latency: **PASS 20/20** |
| Horizontal overflow at 320 px (both pages, every element) | document width 320 on both pages; the sample report has no clipped content (`sample-320.png`) |
| Crash-safe retries | Leads are claimed with a 10-minute `claimed_at` lease, and `notified_at` is set only after a successful send. Unit test: "re-offers a lead whose claim was never released (crash mid-send) after the lease expires". 18 tests pass. Migration `0002_claimed_at.sql` is applied to the database. |
