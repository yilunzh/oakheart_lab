# Round 5 review

- **Reviewed artifact:** HEAD commit `6a8e267` ("Round 5 end-to-end evidence"). It differs from the deployed site code commit `9677fa9` only in `docs/` (`git diff --stat 9677fa9..HEAD`: `docs/reviews/README.md`, `docs/reviews/round-5-e2e.md`). I curled the deployed site and it serves the round-5 content ("Wrenmoor", "Quillbay", "Brackenfold", "We fix what keeps", `id="check-form"`).
- **Date:** 2026-10-04
- **Reviewer:** independent. I did not open `docs/reviews/README.md` or any `round-N.md`.

**Inspection scope:**
- **Inputs:** the brief, rubric, decisions, `phase1-market.md`, the round-4 prior findings, and all four `*-e2e.md` files.
- **Captures:** `pages.txt`, and all 14 screenshots. The long ones were cropped into readable segments.
- **Source:** `src/`, `tests/` and `vercel.json`, including the full diff `f4d913c..HEAD`.
- **Tests:** `pnpm test` gives 15/15 passing.
- **Local build** (`127.0.0.1:3100`):
  - Playwright: overflow at 320/360/390/1024/1440, axe on both pages at 390 and 1440, a mocked-201 success state, the 422 error state, the closing-CTA anchor, every nav hash target, and the mobile menu.
  - Lighthouse mobile: 3 runs per page.
- **Deployed site** (`oakheart-lab.vercel.app`), read-only:
  - status codes for pages, assets, robots, sitemap and the cron endpoint
  - canonical, OG and JSON-LD on both pages
- **External links:** status codes for every outbound link.
- **Gmail:** a read-only search of the owner inbox through the connector.
- **Name collisions:** web searches for every invented name.
- **Not done:**
  - I did not submit anything to the deployed API.
  - No screen-reader pass.
  - No external schema validator.

---

## 1. Recovered meaning (from the site alone)

1. **Who it is for.** Owners of businesses "where a booking sets real work in motion": tours, rentals, home and auto services, classes and wellness, stays, and moving and storage (home, "Who we help"). The eyebrow reads "For businesses that move atoms, not bits". **Matches the brief.**
2. **The problem.** Customers ask AI assistants where to book. The assistants:
   - leave you out ("AI doesn't mention you")
   - get operational facts wrong ("Wrong age limit, old prices, a cancellation policy you changed last year")
   - send people into a booking path that loses them
   
   **Matches the thesis.**
3. **What is offered, and what it costs.**
   - A free AI Visibility Check: "Report in under 24 hours", "Free, as many as you like", "No obligation".
   - Then a free tailored preview "if your check shows clear fixes".
   - Then one Found / Booked / Supported project at "One price, agreed up front".
   - Then optional ongoing work. A companion app and staff tools are "Also available".
   - No prices appear. The blanket money-back line appears verbatim three times: How it works, FAQ and footer.
   
   **Matches the offer ladder.**
4. **Why believe it.**
   - Founder background: Hertz, Clutch, Rivian and Carvana, "over a decade", within the approved facts.
   - Three sourced and dated statistics.
   - A labeled sample report and an explicit method ("It is a sample, not a ranking").
   - Candid FAQs ("No one honestly can").
   
   **Matches the brief, with no invented proof.**
5. **What to do next, and the effort.** "Get your free AI check" leads to a form with five required fields and two optional ones. The secondary options are emailing Yilun or asking about a tailored preview. **Matches the brief.**

**Divergence from the brief:** none material. "Unlimited" is rendered as "Free, as many as you like", which is faithful.

---

## 2. Critical failures and unmet requirements

**No critical failure.** All four gates pass (section 5).

**Unmet or at-risk items:**

- **On mobile, the success heading is still hidden under the sticky header.** The round-4 fix did not work for this state.
  - In `e2e-mobile-success.png` the visible text starts at "Your report will arrive within 24 hours…". The "Request received." heading sits behind the header.
  - I reproduced it at 390×844 with a mocked `201`. After submitting, the focused element is `role=status` and the `h2` spans y=39–67, while the header's bottom edge is at y=65. Screenshot: `scratchpad/r5rev/success-m.png`.
  - **Cause:** in `src/components/check-form.tsx`, `requestAnimationFrame(() => statusRef.current?.focus())` does not scroll, because the success box is already partly in view. `scroll-mt-24` only applies when a scroll happens.
  - `round-5-e2e.md` says the confirmation now "clears the sticky header". That statement is not accurate.
  - The error states are fine: on mobile the focused field's top is at 448 and `#form-status` at 344, both below the 65px header.
- **The notification safety net is still a day long.**
  - **New this round:** a successful notification triggers a retry of earlier failed ones (`check-handler.ts`, `retryPending`).
  - **The gap:** that retry only fires when a later email succeeds. If Resend itself is failing, every retry fails too. The only other retry is the daily cron (`vercel.json`, `"0 13 * * *"`), and nobody is alerted.
  - **Two smaller engineering issues in the new path:**
    1. The retry is `await`ed before the visitor's `201` is returned. With a backlog (up to 50 leads, sent one after another), the visitor's confirmation waits on all of those emails.
    2. Two overlapping successful submissions can each run `notifyPending` and email the same pending lead twice. `listUnnotified` is a plain select with no claim step.
- **The sender is still `onboarding@resend.dev`** (confirmed in Gmail). This is acceptable for owner-only notification. It is a cutover item.
- **The check runner remains unverified.** `decisions.md` still lists the DataForSEO credentials as open, so the site cannot show whether a report "in under 24 hours" is delivered by automation or by hand. That is outside this site review, but it underpins the core promise.

---

## 3. Closure check (round-4 prioritized fixes)

| # | Round-4 finding | Status | Evidence |
|---|---|---|---|
| 1 | Illustrations used names that match real operators ("North Shore Kayak", "Lakeside Kayak Co.", Lake Tahoe) | **Closed** | `answer-card.tsx` now uses "Wrenmoor Paddle Co." and "Quillbay Kayak Tours" near "Pine Hollow Lake". `sample-report.tsx` uses "Brackenfold Kayaks · Pine Hollow Lake (invented)". The caption reads "the businesses and lake are invented". Web searches for all three business names return no operator. One residual nit: a real **Pine Hollow Reservoir** (Wamic, Oregon) has a lakeside resort that rents kayaks. No business is implicated, but "the lake is invented" is not strictly true (fix 4). |
| 2 | Hero promise read as an outcome guarantee | **Closed** | `page.tsx`: "We fix what keeps them from finding you and describing you correctly, and make sure the people they send land in a booking flow that works…" (`desktop-home-fold.png`, hero paragraph). |
| 3 | Notification fallback did not fit the 24-hour promise | **Partly closed** | Added: retry of failed notifications after the next successful one (`check-handler.ts` lines 86–89, unit-tested). The cron is still daily (Hobby plan limit, `round-5-e2e.md`). There is still no alert when Resend fails, and the sender is still `onboarding@resend.dev`. |
| 4 | Status and fields hidden under the sticky header | **Partly closed** | Fields (`scroll-mt-28`) and `#form-status` (`scroll-mt-24`) now land clear of the header (`mobile-form-errors.png`; measured at 344 and 448 against a 65px header). The success heading is still hidden (`e2e-mobile-success.png`; reproduced with h2 top at 39 against header bottom at 65). |
| 5 | No closing action on the check page | **Closed** | A dark band after the FAQ reads "Ready to see what AI tells your customers? Your report arrives within 24 hours. [Get my free AI check]" and links to `#check-form` (`desktop-check.png`, bottom; `mobile-check.png`, bottom). Clicking it puts the form at y=96 on both viewports. |
| 6 | Mobile sample-report row wrap | **Closed** | `dd` now has `whitespace-nowrap font-mono text-sm`. At 390, each row reads "mentioned in 2 of 5 runs" on one line (`mobile-check.png`, sample report rows). |
| 7 | Consistency items | **Partly closed** | Closed: "Moving & storage" is in `businessTypes` (`pages.txt`, select options). `areaServed` was removed. Organization `sameAs` was added (live JSON-LD). Open: DataForSEO is still unnamed ("a third-party data service set to your location"). |

---

## 4. Per-dimension scores

| # | Dimension | Weight | Score |
|---|---|---:|---:|
| 1 | Positioning clarity | 15% | 9 |
| 2 | Offer and buyer relevance | 15% | 9 |
| 3 | Credibility and evidence integrity | 15% | 9 |
| 4 | Conversion path and friction | 15% | 8 |
| 5 | Copy quality and voice | 10% | 9 |
| 6 | Visual design and UX craft | 10% | 9 |
| 7 | Search and AI discoverability | 10% | 9 |
| 8 | Technical quality and accessibility | 10% | 9 |
| | **Weighted total** | | **8.85** |

Calculation: (9×15 + 9×15 + 9×15 + 8×15 + 9×10 + 9×10 + 9×10 + 9×10) / 100 = 885 / 100 = **8.85**.

### 4.1 Positioning clarity: 9

**Evidence:**
- `desktop-home-fold.png` and `mobile-home-fold.png`:
  - Eyebrow: "FOR BUSINESSES THAT MOVE ATOMS, NOT BITS".
  - H1: "More of your customers are asking AI where to book. **Does it get you right?**"
  - The answer card beside it shows the problem concretely: Correct, Wrong, Not mentioned / Your business.
- The thesis carries through every section: "The answer is becoming the storefront" → the six vertical questions → three failure modes → Found / Booked / Supported. The check page H1 "See what AI tells your customers about you." continues the same idea.

**Why not 10:**
- "Move atoms, not bits" is the founder's own phrase and a good filter. But the vertical list is what lets an owner recognize themselves, and it only appears in the second fold on mobile (`mobile-home-1` crop).
- On mobile the hero card sits below the fold (`mobile-home-fold.png`, which ends at the micro-proof). This is a minor point.

### 4.2 Offer and buyer relevance: 9

**Evidence:**
- The "How it works" four-step ladder (`pages.txt`; `mobile-home-4` crop):
  - "STEP 1 · UNDER 24 HOURS"
  - "STEP 2 · IF YOUR CHECK SHOWS ROOM TO IMPROVE"
  - "STEP 3 · YOU DECIDE / One price, agreed up front"
  - "STEP 4 · OPTIONAL"
- The risk reversal sits right below it with the CTA: "If you're not happy with our service, we'll give your money back, no questions asked."
- The buyer's own questions are used as copy, for example "Does the pontoon rental include fuel and life jackets?"
- The FAQ answers the switching-cost objection: "Do I have to switch booking systems? No… FareHarbor, Peek, Mindbody, Square…".
- The pillars read as one system: "One team, so nothing gets lost between handoffs."

**Why not 10:**
- The secondary path is email only ("Prefer to talk first? Email Yilun"). The scheduling URL is still open in `decisions.md`, so this is a known gap, not a defect.
- What a "project" involves in time and effort is only hinted at ("a short conversation… access to the tools you already use").

### 4.3 Credibility and evidence integrity: 9

**Evidence:**
- **Statistics.** All three are sourced and dated, and each link returns 200:
  - "Pew Research Center, March 2025 browsing data, published Jul 2025"
  - "BrightLocal Local Consumer Review Survey, Feb 2026"
  - "Google I/O, May 2026"
  
  Each matches `phase1-market.md`: lines 40, 29 (§1a) and 56/69. The Google item is phrased as "Google says…", as the research file advises.
- **Labeled illustrations.**
  - Hero caption: "Illustrative example: the businesses and lake are invented."
  - Sample report tag: "Illustrative · fictional business" and "(invented)".
  - Figcaption: "Shows the format only."
- **Founder copy stays within the approved facts.**
  - "over a decade", "leads digital products for Hertz's global rental business", "ran digital products at Clutch", "built Rivian's purchase and delivery experience from scratch", "led homepage, search and listings at Carvana".
  - No employer metrics, no "15+ years", no Fleetbit.
- **No guarantees.** "No one honestly can" answers the question about being recommended by AI.

**Why not 10:**
- "The businesses and lake are invented": a real Pine Hollow Reservoir with kayak rentals exists in Oregon (web search). The risk is low, but the claim is not strictly accurate.
- The BrightLocal 45% is vendor research, and `phase1-market.md` says to treat it as directional. The site attributes it correctly but shows it as a headline number.

### 4.4 Conversion path and friction: 8

**Evidence:**
- **The primary action is everywhere.** It appears in the header on every page ("Get your free AI check" / "Free AI check" on mobile), the hero, after How it works, in the closing band, and in the footer. On the check page it now also closes the page: the new band linking to `#check-form`.
- **The form asks only what it needs.**
  - Required: business, website, location, type, email.
  - Optional: a question and a source.
  - Each field has a reason: "We compare what AI says against your own site."
- **Clear errors.** "Please fix the highlighted fields." plus per-field messages, with focus on the first invalid field (`desktop-form-errors.png`, `mobile-form-errors.png`).
- **Honest failure states with a prefilled mailto.** "We couldn't submit your request right now, and nothing was saved…" (`desktop-form-submit.png`). The 429 state reads "That's a lot of requests from one connection in an hour…" and keeps every value (`e2e-desktop-success.png`).
- **Explicit next steps after submitting.** "Your report will arrive within 24 hours from yilun@oakheartlab.com, sent to … check your spam or promotions folder… no sales call unless you ask for one."

**Why 8:**
- At the moment of conversion on mobile, the confirmation heading "Request received." is hidden under the header (`e2e-mobile-success.png`; reproduced). This is the one state every converting mobile visitor sees.
- The lead-notification safety net is still daily, with no alerting. A silent Resend failure could cost a 24-hour promise.

### 4.5 Copy quality and voice: 9

**Evidence:**
- Concrete and calm throughout:
  - "Wrong age limit, old prices, a cancellation policy you changed last year."
  - "One answer is an anecdote; repeated runs show a pattern."
  - "Mostly, it's good SEO done properly."
  - "For most local bookings today, yes, and we treat them that way."
- Qualifications sit beside claims. The method paragraph ends "It is a sample, not a ranking. Any tool that gives you a single 'AI rank' is overstating what can be measured."

**Why not 10:**
- The "What we do" block says "One team" twice in a row: H2 "Found, booked, supported. One team, start to finish." and lede "…One team, so nothing gets lost between handoffs." It reads as slogan cadence.
- "The answer is becoming the storefront." is a slogan, though the paragraph below it earns it.

### 4.6 Visual design and UX craft: 9

**Evidence:**
- A consistent system: warm paper background, a single rust accent, mono eyebrows, and rounded cards.
- The answer card's taxonomy of Correct (green), Wrong (red) and Not mentioned (dashed) gives the visuals meaning (`desktop-home-fold.png`, right).
- The sample report's red "Error found" box beside a green "Fix first" box mirrors that taxonomy (`desktop-check` crop 1).
- On mobile the check page leads with the H1, then one sentence, then the form (`mobile-check-fold.png`).
- No horizontal overflow at 320, 360, 390, 1024 or 1440 on either page (Playwright `scrollWidth − innerWidth = 0`).
- The mobile menu opens cleanly (`r5rev/mobile-nav.png`).

**Why not 10:**
- The hidden success heading at 390 (above).
- In `mobile-form-errors.png` the "FREE AI VISIBILITY CHECK" eyebrow is clipped under the header after focus moves. This is cosmetic, because the error summary and first field are fully visible.

### 4.7 Search and AI discoverability: 9

**Evidence:**
- **Crawlable HTML.** All facts are server-rendered HTML, including the FAQ answers (`pages.txt`, and the `curl` HTML contains them).
- **Schema matches visible content.**
  - Home `@graph`: ProfessionalService with `sameAs` Substack, plus a Person with LinkedIn and Substack `sameAs`.
  - FAQPage: 6 Q&As, identical to the visible FAQ.
  - The check page has its own FAQPage of 5 Q&As, also identical.
- **Live metadata resolves on the serving host.**
  - `canonical` is `https://oakheart-lab.vercel.app`, and `/ai-visibility-check` has its own canonical.
  - `og:image` is a 1200×630 `/opengraph-image` (200).
  - The sitemap lists both URLs on the live host.
- **Robots.** `robots.txt` (`Disallow: /`) and `noindex, nofollow` are intentional before launch. Lighthouse SEO is 69 for that reason alone: the only failing audit is `is-crawlable`.
- **Consistent entity description.** "Oakheart Lab helps businesses that move atoms, not bits get found by AI assistants, described correctly, and booked without friction." appears in the meta description, the schema and the footer.

**Why not 10:**
- The method names "a third-party data service" rather than DataForSEO, which is a citable fact.
- Cutover steps (site URL, robots and noindex) are pending by design.

### 4.8 Technical quality and accessibility: 9

**Evidence:**

| Page | Run 1 | Run 2 | Run 3 | Perf median |
|---|---|---|---|---:|
| `/` | perf 96 · LCP 2570 · TBT 111 · CLS 0 | perf 97 · LCP 2503 · TBT 45 · CLS 0 | perf 98 · LCP 2499 · TBT 39 · CLS 0 | **97** |
| `/ai-visibility-check` | perf 98 · LCP 2344 · TBT 31 · CLS 0 | perf 100 · LCP 1886 · TBT 28 · CLS 0 | perf 98 · LCP 2324 · TBT 31 · CLS 0 | **98** |

- Lighthouse mobile, all runs: accessibility 100 and best practices 100. Lab LCP is about 2.5 s on home, so it is within target.
- axe (WCAG 2.0, 2.1 and 2.2 A/AA plus best practice): **0 violations** on both pages at 390 and 1440.
- Links:
  - every internal anchor target exists, and each lands at y=80 below the header
  - the outbound links return 200, except LinkedIn, which returns 999 (bot block)
  - deployed assets and pages return 200, and the cron endpoint returns 401 without the secret
- `pnpm test`: 15/15 passing.
- The form works end to end (gate 5.2).

**Why not 10:**
- The success-focus scroll bug.
- The new `retryPending` is awaited on the visitor's request path and has no claim step, so a backlog slows the confirmation and concurrent requests can double-send (§2).

---

## 5. Gates

| Gate | Result | Reason |
|---|---|---|
| **Evidence** | **Pass** | No testimonials, logos or client results. All three statistics are sourced, dated and linked. Illustrations are labeled as invented and use names that match no operator. The FAQ says "No one honestly can" guarantee a recommendation, and there is no ranking promise. The money-back line is the owner-approved satisfaction promise, not a performance guarantee. |
| **Conversion** | **Pass** | **Mobile at `9677fa9`:** the deployed API returned `201`, and I confirmed the Gmail receipt myself ("New AI check request: E2E Round5 mobile (ignore)", Inbox, 2026-10-04 15:32:30Z, to yilun@oakheartlab.com). **Desktop at this commit:** it was rate-limited (`429`), which shows the limit and its recovery state working. The desktop client code is identical to mobile; only viewport-dependent CSS differs. The round-4 desktop receipt (Inbox, 15:23:34Z) and the unchanged API path cover it, and my mocked-201 test shows the desktop confirmation fully visible (h2 at y=183). **Confirmation text** is accurate. The hidden heading on mobile is a defect, but the confirming sentence is visible, so it does not fail this gate. |
| **Rendering** | **Pass** | No overflow from 320 to 1440. Every screenshot reads cleanly. The success heading under the header at 390 is the only defect, and the confirmation body stays visible and actionable. |
| **Regression** | **Pass** | All strengths noted in round 4 remain, with no unrequested loss of copy, sections, tests or scores:<br>• the answer-card taxonomy and the sample report<br>• the sourced stat cards and the candid FAQs<br>• the method disclosure and the mobile check-page order<br>• the form engineering<br>• perf ≥ 96, a11y 100, axe 0<br>• the founder copy |

---

## 6. Prioritized fixes

1. **Make the mobile confirmation heading clear the header.**
   - **Element:** `src/components/check-form.tsx`, the success branch: `requestAnimationFrame(() => statusRef.current?.focus())`.
   - **Why:** this is the moment of conversion. "Request received." sits behind the sticky header at 390 (`e2e-mobile-success.png`; reproduced with h2 y=39–67 against a 65px header). `focus()` does not scroll a partly visible element, so `scroll-mt-24` never applies.
   - **Smallest fix:** in the `201/202` branch, call `statusRef.current?.scrollIntoView({ block: "start" }); statusRef.current?.focus({ preventScroll: true });`. Do the same for the error branch for consistency. Add a Playwright assertion that the `h2` top is greater than the header's bottom edge.
2. **Close the silent-failure gap in lead notification.**
   - **Element:** `vercel.json` `"0 13 * * *"`, plus `retryPending` in `check-handler.ts`.
   - **Why:** if Resend fails, nothing retries until the next day's cron, and nobody is told. Separately, the awaited retry delays visitors' confirmations when there is a backlog, and concurrent successes can double-send.
   - **Smallest fixes:**
     - (a) Add an external scheduler that calls `/api/cron/notify-pending` with the bearer secret every 2–3 hours. A GitHub Actions `schedule` is free and not bound by the Hobby cron limit.
     - (b) Run the retry after the response, using Next's `after()`.
     - (c) Claim leads before sending: `update … set notified_at = now() where id = $1 and notified_at is null returning id`, and reset it on failure.
     - At cutover, verify oakheartlab.com in Resend and replace `onboarding@resend.dev`.
3. **Name the data provider in the method.**
   - **Element:** `src/app/ai-visibility-check/page.tsx`, "How we run it": "We collect answers through a third-party data service set to your location".
   - **Why:** it is a concrete and citable fact that supports the "honest method" claim, and it is still open from round 4.
   - **Smallest fix:** "…through DataForSEO, a third-party data service, set to your location…".
4. **Make "the lake is invented" literally true.**
   - **Element:** `answer-card.tsx` and `sample-report.tsx`, "Pine Hollow Lake".
   - **Why:** Pine Hollow Reservoir in Wamic, Oregon has a lakeside resort that rents kayaks. No business is implicated, but the caption asserts the lake is invented.
   - **Smallest fix:** use a name with no search hits, for example "Lake Tamsworth". Alternatively, change the caption to "the businesses are invented".
5. **Remove the repeated "One team".**
   - **Element:** `src/app/page.tsx`, the What we do H2 "Found, booked, supported. One team, start to finish." and the lede "…One team, so nothing gets lost between handoffs."
   - **Why:** the doubled slogan cadence is the most agency-like passage on an otherwise plain-spoken page.
   - **Smallest fix:** lede: "We handle the whole path: from what AI says about you, to a confirmed booking, to the questions customers ask afterwards, so nothing gets lost between handoffs."
6. **Correct the round-5 e2e note.**
   - **Element:** `docs/reviews/round-5-e2e.md`, "now with a scroll margin so it clears the sticky header".
   - **Why:** its own screenshot shows otherwise. Evidence files should describe what the capture shows.
   - **Smallest fix:** re-capture after fix 1, and keep the claim only if the heading is visible.
7. **Write the cutover checklist down in one place.**
   - **Element:** `decisions.md`, "Pre-launch URL base".
   - **Why:** several launch items live in different places:
     - the `NEXT_PUBLIC_SITE_URL` switch
     - robots and noindex removal (D6)
     - the Resend sender domain (D8)
     - the scheduling URL
     - the DataForSEO credentials (D9)
   - **Smallest fix:** add a single checklist with each item and its owner.

---

## 7. Strengths to preserve

- The hero H1 with the labeled answer card. "Correct / Wrong / Not mentioned" remains the site's clearest idea, and the names are now plainly invented.
- The sample report excerpt: run frequency, the cited source, and a concrete "Fix first", now with no wrap at 390.
- The three sourced and dated stat cards, linked to primary sources.
- The candid FAQs ("No one honestly can"; "For most local bookings today, yes"; "Mostly, it's good SEO done properly") and the method disclosure ("It is a sample, not a ranking").
- The new closing band on the check page, which returns visitors to the form.
- The hero sentence, now phrased as effort rather than outcome.
- Form engineering:
  - honest failure, 429 and 422 states, with prefilled mailto
  - values preserved on failure
  - idempotency and duplicate handling
  - a honeypot and IP rate limiting
  - QA tagging and logged notification failures
  - the new retry, and 15 tests
- The technical baseline: perf median 97 and 98, a11y 100, axe 0, CLS 0, no overflow from 320 to 1440.
- Founder copy strictly within the approved public facts, and the verbatim blanket money-back line.

---

## 8. Strongest counterargument and limitations

**Counterargument to the positioning:**
- For most local bookings, the AI-assistant channel is still small compared with Google Search and Maps:
  - AI Overviews appear on about 15% of pure local-intent results, against the local pack's 93% (Whitespark, 2025-05).
  - BrightLocal's 2026 study found Google Maps showed tracked businesses 66% of the time, against 32–38% for AI platforms.
  - Only 8% of travelers are comfortable letting AI book (Expedia via Skift, 2026-04).
- A skeptical operator may treat the free check as a curiosity and decide the money belongs in their Google Business Profile, reviews and booking widget. The site partly pre-empts this: "For most local bookings today, yes, and we treat them that way… the Found work strengthens Maps and search too." The Booked and Supported pillars do not depend on the AI thesis.
- The positioning leads with the newest and least-proven channel to sell work whose value mostly comes from the oldest ones.

**Limitations of this review:**
- **Lab measurements only.** Lighthouse and axe ran against the local production build, not the Vercel CDN. Core Web Vitals are lab estimates.
- **Conversion evidence.** I did not submit to the deployed API. Conversion rests on `round-5-e2e.md` and `round-4-e2e.md` (request bodies forwarded with the production `Origin`), plus my own read-only Gmail check of all five notification emails. Desktop delivery at this exact commit is inferred from identical client code, as explained in the gate.
- **Mocked success state.** The success-state bug was reproduced with a mocked `201` on the local build. The deployed capture (`e2e-mobile-success.png`) shows the same result.
- **Not tested:**
  - no screen-reader pass
  - no external schema validator
  - LinkedIn was not opened (it returns 999 to curl)
- **Name checks.** The collision check was web search only, not a trademark search.
- **Check runner.** I cannot observe whether the runner (DataForSEO, credentials still open per `decisions.md`) is operational. So I cannot verify that reports actually arrive "in under 24 hours".
