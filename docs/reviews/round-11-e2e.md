# Round 11: evidence

- **Date:** 2026-10-10
- **Deployment:** `1d41c58`, live at https://oakheart-lab.vercel.app
- **Form and API:** unchanged since round 10's live submission on `89f8483` (201, owner inbox receipt "E2E Round10 mobile (ignore)" at 19:39:14Z) apart from the duplicate-confirmation wording. No new live submission was made.

## Checks (local production build of `1d41c58`)

| Check | Result |
|---|---|
| `pnpm lint`, `pnpm test` | clean; 18 passed |
| axe-core 4.10 at 320, 390, 1440 px, both pages | 0 violations |
| Horizontal overflow at 320, 390, 1440 px | none |
| Confirmation visibility (`tests/browser/success-heading.cjs`, 20 runs) | PASS 20/20 |
| Lighthouse mobile, 3 runs (median) | Home: performance 98, accessibility 100, best practices 100, LCP 2494 ms, CLS 0. Check page: performance 98, accessibility 100, LCP 2335 ms, CLS 0. SEO 69 is the intended noindex on non-production builds. |
