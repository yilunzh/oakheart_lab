# Round 4: end-to-end form evidence (visitor → database → owner inbox)

- **Date:** 2026-10-04
- **Deployment:** `f4d913c`, live at https://oakheart-lab.vercel.app
- **Method:** the real check form ran in Chromium at 390×844 and 1440×900 against the production build (same commit), loaded from the local build because the sandbox browser can't open external HTTPS pages. Each `/api/checks` request body was forwarded to the **deployed** endpoint with the production `Origin` header.
- **Inbox check:** the owner's Gmail inbox was searched through the Gmail connector.

| Submission | Deployed API | Visitor saw | Owner inbox (Gmail) |
|---|---|---|---|
| Browser, 390 (mobile) | `201 received` | "Request received… within 24 hours from yilun@oakheartlab.com…", plus the spam note and next step | "New AI check request: E2E Round4 mobile (ignore)" in Inbox, 15:23:31Z |
| Browser, 1440 (desktop) | `201 received` | Same | "New AI check request: E2E Round4 desktop (ignore)" in Inbox, 15:23:34Z |
| curl QA lead | `201 received` | n/a | "New AI check request: Round 4 QA (ignore)" in Inbox, 15:22:56Z |
| Earlier notification test (`d66b9be`) | `201 received` | n/a | in Inbox, 15:19:57Z, `notified_at` set 92 ms after insert |

## Configuration and safeguards

- **Sender:** `onboarding@resend.dev` (Resend test sender) until oakheartlab.com is verified in Resend. Recipient: yilun@oakheartlab.com.
- **QA addresses** (`e2e-*`, `qa-*`, `notify-*` @oakheartlab.com) are stored as `status='test'` automatically (unit-tested), so they never look like real leads.
- **Failed notifications:**
  - logged to the Vercel function logs (`[notify] …`)
  - retried by the daily, secret-protected Vercel Cron at `/api/cron/notify-pending`
