# Round 3: end-to-end form evidence

- **Date:** 2026-10-04
- **Deployment:** `9c91fb5`, live at https://oakheart-lab.vercel.app

## Browser-driven submissions

**Method:** the real check form ran in Chromium at 390×844 and 1440×900 against the production build (same commit). The form's `/api/checks` request was forwarded unchanged to the **deployed** endpoint `https://oakheart-lab.vercel.app/api/checks`. The sandbox browser can't open external HTTPS pages directly, so the page itself was loaded from the local build.

| Viewport | API response from deployed endpoint | What the visitor saw |
|---|---|---|
| 390 (mobile) | `201 {"status":"received"}` | "Request received. Your report will arrive within 24 hours from yilun@oakheartlab.com, sent to e2e-browser-mobile@…" plus the spam-folder note and next step |
| 1440 (desktop) | `201 {"status":"received"}` | Same, with the desktop address |

**Database read-back** (`oakheart.check_requests`): both rows present, with business name, website host, email and `utm_source=e2e-browser`. They were then marked `status='test'`.

Screenshots: `e2e-mobile-success.png` and `e2e-desktop-success.png` in the round-3 capture folder.

## Owner notification

- **Instant email:** `RESEND_API_KEY` is not set yet (owner adding it now), so `notified_at` is null on all test rows.
- **Daily fallback (`9c91fb5`):** Vercel Cron calls `/api/cron/notify-pending` daily at 13:00 UTC and retries any new lead from the last 7 days that has no notification yet.
  - The endpoint is protected by `CRON_SECRET`: an unauthenticated call returns `401`.
  - Once the key is set, any lead whose instant email failed is emailed on the next run.
- **Pending:** a real owner-email receipt, after the key is configured.
