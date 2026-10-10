# Round 10: end-to-end evidence

- **Date:** 2026-10-10
- **Deployment:** `89f8483`, live at https://oakheart-lab.vercel.app
- **Method:** the real form ran in Chromium against the live site at 390 px, choosing the new "Car buying or auto service" type. Test emails (`e2e-*@oakheartlab.com`) are stored with status `test`.

| Submission | Live API | Visitor saw | Owner inbox |
|---|---|---|---|
| Browser, 390 (mobile) | `201` | "Request received. Your report will arrive within 24 hours…" | "New AI check request: E2E Round10 mobile (ignore)" in Inbox, 19:39:14Z, type "Car buying or auto service" |

Round 9 (`e03629f`) also recorded live submissions at 390 and 1440 px with inbox receipts; the form handler is unchanged since then apart from the business-type list.

## Other checks (local production build of `89f8483`)

| Check | Result |
|---|---|
| `pnpm lint`, `pnpm test` | clean; 18 passed |
| axe-core 4.10 at 320, 390, 1440 px, both pages | 0 violations |
| Horizontal overflow at 320, 390, 1440 px | none; header 65 px at every width |
| Mobile menu | closes on Escape (focus returns to the menu button) and on an outside tap |
| Confirmation visibility (`tests/browser/success-heading.cjs`, 20 runs) | PASS 20/20 |
| Lighthouse mobile, 3 runs (median) | Home: performance 97, accessibility 100, best practices 100, LCP 2368 ms, CLS 0. Check page: performance 98, accessibility 100, best practices 100, LCP 2380 ms, CLS 0. SEO 69 is the intended noindex on non-production builds. |
