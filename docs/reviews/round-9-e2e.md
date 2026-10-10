# Round 9: end-to-end evidence

- **Date:** 2026-10-10
- **Deployment:** `e03629f`, live at https://oakheart-lab.vercel.app
- **Method:** the real form ran in Chromium against the live site at both widths, with the optional "What should AI get right about you?" field filled in. Test emails (`e2e-*@oakheartlab.com`) are stored with status `test`.
- **Inbox check:** Gmail, read via the connector.

| Submission | Live API | Visitor saw | Owner inbox |
|---|---|---|---|
| Browser, 390 (mobile) | `201` | "Request received. Your report will arrive within 24 hours from yilun@oakheartlab.com…"; heading below the sticky header and focused | "New AI check request: E2E Round9 mobile (ignore)" in Inbox, 19:24:49Z, with the "AI should get right:" line |
| Browser, 1440 (desktop) | `201` | Same | "New AI check request: E2E Round9 desktop (ignore)" in Inbox, 19:24:52Z, same |

## Other checks (local production build of `e03629f`)

| Check | Result |
|---|---|
| `pnpm lint`, `pnpm test` | clean; 18 passed |
| axe-core 4.10 at 320, 390, 1440 px, both pages | 0 violations |
| Horizontal overflow at 320, 390, 1440 px | document width equals viewport; 0 elements past the right edge |
| Header at 320–1440 px | one line, 65 px tall at every width |
| Confirmation visibility (`tests/browser/success-heading.cjs`, 20 runs, random latency) | PASS 20/20 |
| Lighthouse mobile, 3 runs (median) | Home: performance 97, accessibility 100, best practices 100, LCP 2501 ms, CLS 0, TBT 110 ms. Check page: performance 99, accessibility 100, best practices 100, LCP 1908 ms, CLS 0, TBT 55 ms. SEO 69 on both is the intended noindex on non-production builds (the only failing audit is is-crawlable). |
