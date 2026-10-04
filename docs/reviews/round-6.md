# Round 6 review

- **Reviewed artifact:** HEAD commit `fead24d` ("Round 6 end-to-end evidence"). The site code is from `e984681`. `fead24d` only adds `docs/reviews/round-6-e2e.md`. The live deployment serves the same copy: "Marrowfield" appears on both live pages, and "Pine Hollow" and "One team, so" do not.
- **Date:** 2026-10-04
- **Reviewer:** independent. I did not open `docs/reviews/README.md` or any `round-N.md`.

**Inspection scope:**

- **Documents:**
  - `docs/brief.md`, `docs/review-rubric.md`, `docs/research/phase1-market.md`, `docs/decisions.md` and `docs/cutover-checklist.md`
  - the round-5 findings (`scratchpad/round6/prior-findings.md`)
  - `docs/reviews/round-2-e2e.md` through `round-6-e2e.md`
- **Captures:** the rendered text, metadata, JSON-LD, links and form test in `scratchpad/round6/pages.txt`.
- **Screenshots:** all 13 in `scratchpad/round6/`. I cut the four full-page captures into readable segments (`scratchpad/round6/crops/`).
- **Source:** `src/**`, `tests/**`, `vercel.json` and `.github/workflows/notify-pending.yml`.
- **Commands I ran:**
  - `pnpm test`: 16 of 16 passed.
  - `tests/browser/success-heading.cjs`: header bottom 65, heading top 121, focus on `status`, PASS.
- **My own Playwright run (local build, `127.0.0.1:3100`):**
  - Mocked 201, 202, 500, 429 and network-abort responses, at 390×844 and 1440×900.
  - The 201 case again with reduced motion.
  - A horizontal-overflow sweep at 320, 360, 390, 414, 768, 1024, 1280 and 1440 px on both pages.
- **axe-core 4:** both pages at 390 and 1440, FAQ expanded, plus the 422 error state.
- **Lighthouse (mobile):** three runs per page.
- **Live site:** curl of https://oakheart-lab.vercel.app for both pages (metadata), `robots.txt`, `sitemap.xml`, `/opengraph-image`, the headshot, and the cron endpoint without auth. I did not submit to the live API.
- **Gmail (read-only):** looked up the "Round 6 QA" notification.
- **Web search:** checked the invented names for collisions.

---

## 1. Recovered meaning (from the site only)

1. **Who it is for.** Owners of businesses "that move atoms, not bits" (hero eyebrow), where "a booking sets real work in motion": tours, rentals, home and auto services, classes and wellness, stays, and moving and storage (home, "Who we help" cards). *Matches the brief.*
2. **The problem.** "More of your customers are asking AI where to book. Does it get you right?" (H1).
   - The page names three failures: "AI doesn't mention you", "AI gets your details wrong" and "The booking path loses them" (home, 01–03).
   - *Matches the thesis.*
3. **What is offered and what it costs.**
   - **Step 1:** a free AI check, "Report in under 24 hours", "Free, as many as you like", "No obligation".
   - **Step 2:** a free tailored preview, "if your check shows clear fixes we can help with".
   - **Step 3:** Found, Booked and Supported "as one project… You know the price before we start".
   - **Step 4:** optional ongoing work. A mobile app and staff tools are also available.
   - **Cost:** the check and the preview are free. Projects have "one price, agreed before we start", with no published prices. The blanket money-back line appears verbatim in three places (How it works band, FAQ "What does it cost?", footer).
   - *Matches the brief's offer ladder, the no-prices rule and D3b′.*
4. **Why believe it.**
   - The founder's public career: Hertz, Clutch, Rivian, Carvana, and "over a decade… moving atoms, not bits".
   - Three stat cards, each sourced, dated and linked.
   - An answer card and a sample report, both labeled as invented.
   - Candid FAQs ("No one honestly can"), and a method disclosure ("It is a sample, not a ranking").
   - Founder review of every report.
5. **What to do next, and the effort.**
   - Press "Get your free AI check".
   - Fill 5 required fields and 2 optional ones (`mobile-check-00` crop: the whole form fits about 1.1 screens at 390).
   - The alternative is "Prefer to talk first? Email Yilun" (a mailto).
   - Effort: about a minute.

**Divergences from the brief:**

- **"One team, start to finish"** (home, What we do H2). This sits next to "You work with him directly", and the brief describes a founder-led practice. It is a mild implied-scale signal. It is not contradicted by any approved fact, but it is not supported by one either. Scored under dimension 5.
- **Present-tense method claims.** The page says "We collect answers through a third-party data service…" and "Software runs the questions…". `cutover-checklist.md` item 8 says the DataForSEO runner is not yet live. See section 3.

---

## 2. Closure check: round-5 findings

| # | Round-5 finding | Status | Evidence |
|---|---|---|---|
| 1 | Mobile success heading hidden under the sticky header | **Closed** | `check-form.tsx` `revealStatus()` now calls `scrollIntoView({block:"start"})` then `focus({preventScroll:true})`, with `scroll-mt-24`. `success-m.png` shows "Request received." fully visible at y≈134 below the 65px header. In my run, all 11 states (201, 202, 500, 429 and network error at both widths, plus 201 with reduced motion) were in view: success h2 at 121–149 and error box at 96–210, against a header bottom of 65. Focus lands on `status` or `form-status`. |
| 2 | Notification safety net about a day long, with no alert. Awaited retry delays the visitor. Concurrent double-send. | **Partly closed** | **Closed:** the retry runs via `after()` (`api/checks/route.ts`). Claims are atomic with `for update skip locked` (`lead-store.ts` `claimUnnotified`), with release on failure (`notify-pending.ts`). A 3-hourly GitHub Actions run calls the cron endpoint (`.github/workflows/notify-pending.yml`, `"17 */3 * * *"`). **Still open:** (a) nobody is alerted (§3, item B). (b) The workflow is inert until the `CRON_SECRET` repo secret exists (cutover item 6), and it exits 0 when the secret is missing. (c) The first send for a new lead is outside the claim scheme (§3, item C). The `onboarding@resend.dev` sender is an accepted cutover item (#5). |
| 3 | Name the data provider in "How we run it" | **Open, owner-deferred** | `cutover-checklist.md` #8 holds back the DataForSEO name "until then so the page doesn't describe a pipeline that isn't live". As a deferral this is a constraint. However, the generic sentence it was meant to sharpen still describes the pipeline in the present tense. See new finding A. |
| 4 | "Pine Hollow Lake" is a real place | **Closed** | Renamed to "Marrowfield Lake" (`answer-card.tsx`, `sample-report.tsx`). A web search finds no Marrowfield Lake. The nearest hit is "Marrowfield Water", a 6-hectare trout loch on Shetland with no kayak trade. "Wrenmoor Paddle", "Quillbay Kayak" and "Brackenfold Kayaks" return no hits. |
| 5 | Repeated "One team" | **Closed** | The lede now reads "…to the questions customers ask afterwards. Nothing gets lost between handoffs." The H2 keeps "One team" once; see fix 4 for a separate concern about the word. |
| 6 | Inaccurate round-5 e2e note | **Closed** | `round-5-e2e.md` now carries "**Correction (found by the round 5 review):** the heading was still partly under the sticky header on mobile; fixed in round 6…". |
| 7 | One cutover checklist | **Closed** | `docs/cutover-checklist.md` lists 10 items, each with a location and an owner. |

---

## 3. Critical failures and unmet requirements

**No critical failure.** All four gates pass (section 5).

**Unmet or at-risk items:**

### A. The method copy describes a pipeline that the project's own checklist says is not live

- **Where:**
  - `/ai-visibility-check`, "How we run it": "We collect answers through a third-party data service set to your location, so what one customer sees on their own phone can differ."
  - FAQ "Who runs the check?": "Software runs the questions so they can be repeated across assistants, but a person writes the findings and fixes."
- **The conflict:**
  - `cutover-checklist.md` #8 says: "DataForSEO credentials for the check runner. Once it runs, name DataForSEO… (held back until then so the page doesn't describe a pipeline that isn't live)."
  - `decisions.md` still lists "DataForSEO credentials (D9)" as open.
  - So either the generic sentences already describe a pipeline that isn't live, or the pipeline is live and the deferral reason no longer applies.
- **Why it matters:** "an honest method" is the page's own claim. A visitor requesting a check today may receive a report produced by a different method than the one described.
- **Severity:** I cannot observe how reports are produced today, so this is at-risk, not proven false. It does not breach the evidence gate, because no result, testimonial or statistic is fabricated.

### B. Notification failures still do not alert anyone

- **The cause:** `/api/cron/notify-pending` returns `200 {pending, sent}` even when `sent < pending`. The GitHub job uses `curl -fsS`, so it fails only on 4xx or 5xx. If Resend is down, every run stays green.
- **The setup gap:** the job is a no-op until the `CRON_SECRET` repo secret exists, and it logs "skipping" with exit 0. Cutover item 6 parks that secret until launch, but it does not depend on DNS.
- **What a missed lead costs:** a missed lead breaks the "under 24 hours" promise, and stored leads are only visible by SQL.

### C. Two small gaps remain in the new claim scheme

1. **A fresh lead can be emailed twice.**
   - `check-handler.ts` inserts the lead with `notified_at = null`, awaits `notify()`, then calls `markNotified`.
   - A `claimUnnotified` running at the same moment (another visitor's `after()` retry, or the cron) can claim that same row during the Resend call and email it again.
   - The window is short, but the round-6 change was meant to rule out double sends. The unit test "never claims the same lead twice across overlapping runs" covers only retry-versus-retry.
2. **A crash can lose a notification silently.**
   - The claim sets `notified_at = now()` before sending.
   - If the function is cut off between the claim and the send or release (for example, an `after()` time limit with a 20-lead batch), the row looks notified forever.

---

## 4. Scores

| # | Dimension | Weight | Score |
|---|---|---:|---:|
| 1 | Positioning clarity | 15% | 9 |
| 2 | Offer and buyer relevance | 15% | 9 |
| 3 | Credibility and evidence integrity | 15% | 8.5 |
| 4 | Conversion path and friction | 15% | 9 |
| 5 | Copy quality and voice | 10% | 8 |
| 6 | Visual design and UX craft | 10% | 9 |
| 7 | Search and AI discoverability | 10% | 8 |
| 8 | Technical quality and accessibility | 10% | 9 |
| | **Weighted total** | | **8.73** |

Calculation: (9×15 + 9×15 + 8.5×15 + 9×15 + 8×10 + 9×10 + 8×10 + 9×10) / 100 = 872.5 / 100 = **8.73**.

### 1. Positioning clarity: 9

**Evidence:**

- The hero (`mobile-home-fold.png`, `desktop-home-fold.png`) names the buyer: "FOR BUSINESSES THAT MOVE ATOMS, NOT BITS".
- It states the problem as a question the buyer cares about: "More of your customers are asking AI where to book. Does it get you right?"
- The lede states the promise, including the reassurance most relevant to this buyer: "…without replacing the booking system you already use."
- The answer card shows the thesis in one glance: Correct / Wrong / Not mentioned for an invented kayak query.
- The thesis is identical on the check page: H1 "See what AI tells your customers about you."
- The entity line is consistent across the meta description, JSON-LD and footer: "AI visibility, booking and customer support for businesses that move atoms, not bits".

**Why not 10:**

- The hero leads with the Found pillar. Booked and Supported get one clause.
- A rental or moving operator whose main pain is the booking path recognizes the problem only from the "Who we help" cards onward (`mobile-home-02` crop).

### 2. Offer and buyer relevance: 9

**Evidence:**

- The four-step ladder (`desktop-home-03` crop) gives a commitment level for each step:
  - "STEP 2 · IF YOUR CHECK SHOWS ROOM TO IMPROVE"
  - "STEP 3 · YOU DECIDE / One price, agreed up front"
  - "STEP 4 · OPTIONAL"
- The risk reversal appears verbatim and prominently in the How it works band.
- The buyer's language shows in the six vertical questions: "Does the pontoon rental include fuel and life jackets?" and "Who can move a one-bedroom this Saturday, and what will it cost?"
- The pillars read as one system: "We deliver Found, Booked and Supported as one project".
- FAQs answer real decision questions: switching booking systems, "Isn't this just SEO?", and Maps versus AI.

**Why not 10:**

- The Supported pillar's bullets ("Fewer repeat questions for your staff") are the least concrete of the three.
- The tailored-preview step is reachable only by mailto ("Ask about a tailored preview"). This is acceptable given that the scheduling URL is a cutover item (#7).

### 3. Credibility and evidence integrity: 8.5

**What holds up:**

- **Statistics** all trace to `phase1-market.md` §1 and its recommended list (lines 65–69, 211):
  - "8% vs 15%": Pew, "March 2025 browsing data, published Jul 2025", rated R in the research.
  - "45%": attributed to "BrightLocal Local Consumer Review Survey, Feb 2026", as the research directs.
  - "Booking": Google I/O, May 2026, phrased as "Google says".
  - Each card links to its primary source.
- **Labels:**
  - Answer card: "Illustrative example: the businesses and the lake are invented."
  - Sample report: "Illustrative · fictional business", "(invented)", and "Shows the format only."
- **Founder copy** is strictly within the approved facts:
  - "over a decade", not "15+ years"
  - the "moving atoms, not bits" phrase and the quote, both verbatim
  - the Hertz, Clutch, Rivian and Carvana roles as approved
  - no employer metrics, and no Fleetbit
- **Guarantees:** none on outcomes. "No one honestly can" (FAQ).

**Why 8.5:**

- **The method claims are at risk** (§3 A). "Software runs the questions" and "We collect answers through a third-party data service" are stated as current fact, while the cutover checklist says the runner isn't live.
- **The BrightLocal 45% is shown without qualification.** The research file flags it as directional: "The jump from 6% to 45%… suggests the question wording changed". The card's wording ("say they've used") is acceptable, but it is the weakest number on the site.
- **There is no proof from Oakheart's own work yet.** This is an owner constraint (D7′), not a defect.

### 4. Conversion path and friction: 9

**Evidence:**

- **The primary CTA appears at every decision point:**
  - header ("Free AI check" on mobile)
  - hero
  - How it works band
  - closing band
  - check page: form above the fold on desktop (`desktop-check-fold.png`) and starting at y≈400 on mobile (`mobile-check-fold.png`)
  - closing "Get my free AI check" anchor
- **The form asks only what it needs:** 5 required fields, with the reason for the website field given ("We compare what AI says against your own site.").
- **The states are honest and visible:**
  - 422: "Please fix the highlighted fields.", per-field messages, and focus on the first invalid field (`mobile-form-errors.png`, `desktop-form-errors.png`).
  - 5xx: "…nothing was saved… Email your details to yilun@oakheartlab.com", with a prefilled mailto and the values preserved (`mobile-form-submit.png`, `desktop-form-submit.png`).
  - 429 and network-error states, verified by me.
  - Success: "Request received.", plus where the report comes from, where it goes, a spam-folder note and "no sales call unless you ask" (`success-m.png`).
- **Objections are answered next to the form:** "Every report is reviewed by Yilun Zhang… No sales call unless you ask."
- **The live lead reached the owner:** `201` at 15:43:18Z, and Gmail shows "New AI check request: Round 6 QA (ignore)" in Inbox at 15:43:20Z, sent to yilun@oakheartlab.com.

**Why not 10:**

- The secondary paths (call, preview) are email only, pending cutover item 7.
- The notification safety net still has the alerting gap (§3 B), so a lead can sit unseen while the 24-hour clock runs.

### 5. Copy quality and voice: 8

**Strengths:**

- The writing is mostly plain and specific.
- The problem trio names concrete failures: "Wrong age limit, old prices, a cancellation policy you changed last year."
- The FAQs are candid and answer first.
- Qualifications sit beside claims: "It is a sample, not a ranking. Any tool that gives you a single 'AI rank' is overstating what can be measured."

**Deductions:**

- **"Found, booked, supported. One team, start to finish."** (home, What we do H2; `mobile-home-03` crop) is still a slogan cadence. "Team" also implies a staff that the page otherwise doesn't claim: the founder block ends "You work with him directly". The brief asks for "practitioner-led, specific, calm".
- **"The answer is becoming the storefront."** and **"Straight answers."** lean on headline style. Both are acceptable.
- **The ellipsis-free lede is fine.**
- **No filler or artificial contrasts elsewhere.**

### 6. Visual design and UX craft: 9

**Evidence:**

- A consistent warm-neutral system with one accent.
- The mono eyebrows and labels carry meaning (the "Correct", "Wrong…" and "Not mentioned" chips; "ERROR FOUND" and "FIX FIRST" in the sample report).
- The hierarchy is clean at both widths (all crops).
- No horizontal overflow at any of the 8 widths from 320 to 1440 on either page.
- The mobile sample report rows fit without wrapping defects (`mobile-check-02` crop).
- The sticky header no longer hides any state.

**Minor polish:**

- **Step 2 label wrap.** On desktop How it works, the label "STEP 2 · IF YOUR CHECK SHOWS ROOM TO IMPROVE" wraps to two lines. Its title "Free tailored preview" therefore sits about 16px lower than the other three step titles (`desktop-home.png` about y 4318–4365; `crops/desktop-home-03.png` y 418–465).
- **Partial assistant coverage in the sample.** The sample report lists 3 of the 5 assistants the page says it checks. This is acceptable for a format sample.

### 7. Search and AI discoverability: 8

**Evidence:**

- **Facts are server-rendered HTML.** The FAQ answers are present in `pages.txt` with the FAQ expanded and match the FAQPage JSON-LD word for word.
- **Live metadata uses the preview base as intended:**
  - `canonical` is `https://oakheart-lab.vercel.app` and `/ai-visibility-check`.
  - The `og:url` values match.
  - JSON-LD `@id`s are `https://oakheart-lab.vercel.app/#org` and `#founder`.
- **Crawl control is gated as intended:** `robots: noindex, nofollow` and `robots.txt` `Disallow: /` while `NEXT_PUBLIC_SITE_INDEXABLE` is unset (cutover #4). `src/app/robots.ts` opens access and adds the sitemap at launch.
- **The sitemap is valid** with both URLs. The OG image and headshot return 200.
- **The entity graph is consistent:** ProfessionalService ↔ Person (founder), with `sameAs` pointing to LinkedIn and Substack.

**Gaps:**

- The check page's JSON-LD is FAQPage only. Nothing describes the free check as a Service or Offer, and nothing links it to `#org`. This is the site's primary entity-level offer.
- ProfessionalService has no `areaServed` or `knowsAbout`.
- Lighthouse SEO is 69 only because of the intended `is-crawlable` failure. All other SEO audits pass.

### 8. Technical quality and accessibility: 9

**Lighthouse, mobile, three runs per page:**

| Page | Performance | Accessibility | Best practices | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| Home | 97 / 97 / 97 | 100 | 100 | 2.5 s | 50–90 ms | 0 |
| Check | 98 / 98 / 98 | 100 | 100 | 2.4 s | 30 ms | 0 |

**Other checks:**

- axe: 0 violations on 6 runs (both pages × 2 widths, plus the error state).
- No broken links. All in-page anchors (`#how-it-works`, `#system`, `#founder`, `#faq`, `#what-you-get`, `#check-form`) resolve. The cron endpoint returns 401 without auth.
- 16 unit tests pass, and the browser check passes.

**Deductions (engineering residue, none visitor-facing):**

- §3 B: no alert on failed retries.
- §3 C: the first-send race, and a claim with no lease.
- `tests/browser/success-heading.cjs` prints "FAIL" but still exits 0, so it cannot gate CI. When run without an argument it writes `success-heading.png` into the repo root; I deleted the one my run created.
- `html { scroll-behavior: smooth }` (`globals.css:38`) and `revealStatus`'s `behavior:"smooth"` ignore `prefers-reduced-motion`.

---

## 5. Gates

| Gate | Result | Reason |
|---|---|---|
| Evidence | **Pass** | No testimonials, logos, client results or reviews. All three statistics are named, dated and linked to the sources in `phase1-market.md`. Both examples are labeled invented. There is no ranking or recommendation guarantee ("No one honestly can"). The method-claim risk (§3 A) concerns process, not fabricated evidence. |
| Conversion | **Pass** | **Live:** the deployed API returned 201, and I verified the inbox receipt via Gmail (15:43:20Z, Inbox). The round-6 lead was posted at the API level; the browser-driven mobile and desktop submissions forwarded to the live API are in `round-4-e2e.md` and `round-5-e2e.md`, and their receipts are in the same inbox (15:23:31Z, 15:23:34Z, 15:32:30Z). The round-6 client diff touches only how status is revealed, not the request. I verified every response state's confirmation at 390 and 1440 against the local build. |
| Rendering | **Pass** | No defect impairs reading or action at 390 or 1440 (all screenshots and crops). No overflow from 320 to 1440. The previous mobile success-state defect is fixed. The only issue left is the cosmetic step-2 label wrap. |
| Regression | **Pass** | Every strength listed in round 5 is intact: the answer card, sample report, sourced stat cards, candid FAQs, method disclosure, closing band, form engineering (now 16 tests), and the perf and a11y baseline. Nothing unrequested was removed. |

---

## 6. Prioritized fixes

### 1. Make the method copy match what runs today

- **Element:**
  - `src/app/ai-visibility-check/page.tsx`, "How we run it": "We collect answers through a third-party data service set to your location…"
  - FAQ "Who runs the check?": "Software runs the questions so they can be repeated across assistants…"
- **Why:** `cutover-checklist.md` #8 says the runner is not live. The page calls itself "an honest method", so it has to describe today's process accurately.
- **Smallest correction:** ask the owner how checks run today.
  - **If they are run by hand:** drop the data-service sentence. Use "Yilun runs every check and writes the findings and fixes; we're automating the repeat runs" until the runner is live.
  - **If the runner is live:** name DataForSEO now, which also closes round-5 fix 3.

### 2. Make failed notifications visible

- **Element:** `src/app/api/cron/notify-pending/route.ts`, which always returns 200.
- **Why:** if Resend is down, every retry fails silently, and a lead can miss the 24-hour promise unseen.
- **Smallest correction:**
  - Return `status: 500` when `sent < pending`, so the `curl -f` step fails and GitHub emails the repo owner.
  - Ask the owner to add the `CRON_SECRET` repo secret now. Cutover item 6 does not depend on DNS.

### 3. Close the first-send gap in the claim scheme

- **Element:** `check-handler.ts`, which inserts with `notified_at` null before `notify()`, together with `lead-store.ts` `claimUnnotified`.
- **Why:** a concurrent retry can email a brand-new lead a second time. A crash after a claim marks a lead notified forever.
- **Smallest correction:**
  - Add `and created_at < now() - interval '2 minutes'` to the `claimUnnotified` subquery. This leaves fresh leads to their own request.
  - Optionally, store the claim in a separate `claimed_at` column with a 10-minute lease, and set `notified_at` only after a successful send.
  - Add a unit test for retry-versus-first-send.

### 4. Drop the implied team

- **Element:** the `src/app/page.tsx` What we do H2, "Found, booked, supported. One team, start to finish."
- **Why:** it is a slogan cadence, and "team" implies a staff that the founder block ("You work with him directly") doesn't claim. It is the least practitioner-like line on the page.
- **Smallest correction:** "Found, booked, supported. One project, start to finish." This matches step 3, "as one project".

### 5. Describe the free check as an offer in structured data

- **Element:** the `/ai-visibility-check` JSON-LD, currently FAQPage only.
- **Why:** this is the site's primary offer, and AI assistants cite structured offers. Adding it makes "free, under 24 hours" machine-readable and ties it to the entity.
- **Smallest correction:** add a `Service`:
  - `name`: "Free AI Visibility Check"
  - `provider`: `{"@id": site.url + "/#org"}`
  - `offers`: `{"@type": "Offer", "price": "0", "priceCurrency": "USD"}`
  - `description`: the visible lede

### 6. Align the How it works step titles on desktop

- **Element:** "STEP 2 · IF YOUR CHECK SHOWS ROOM TO IMPROVE" (`desktop-home.png` about y 4318–4365).
- **Why:** the two-line label pushes "Free tailored preview" below the other three titles.
- **Smallest correction:** shorten the label to "STEP 2 · IF THERE'S ROOM TO IMPROVE", or give the labels `min-h-[2lh]` at `lg`.

### 7. Test and motion hygiene

- **Element:** `tests/browser/success-heading.cjs`, plus `globals.css:38`.
- **Why:** the browser check cannot fail a pipeline, and it writes into the repo root. Smooth scroll ignores reduced-motion preferences.
- **Smallest correction:**
  - Set `process.exitCode = pass ? 0 : 1`.
  - Default the screenshot path to `os.tmpdir()`.
  - Add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }` and choose `behavior` in `revealStatus` via `matchMedia`.

---

## 7. Strengths to preserve

- **The hero and its labeled answer card.** Correct / Wrong / Not mentioned shows the whole thesis in one picture, and the invented names now have no real-world collisions.
- **The sample report excerpt.** It shows run frequency ("mentioned in 2 of 5 runs"), a cited cause ("an old listing on a review site") and a concrete "Fix first".
- **Three sourced, dated and linked stat cards**, chosen from the research file's reliable list.
- **Candid FAQs and the method disclosure.** For example: "No one honestly can"; "For most local bookings today, yes, and we treat them that way"; "It is a sample, not a ranking".
- **The offer ladder with explicit commitment points**, and the verbatim blanket money-back line.
- **Form engineering:**
  - honest 422, 429, 5xx and network states, with a prefilled mailto and preserved values
  - idempotency, a honeypot, rate limiting and QA tagging
  - an atomic retry claim that runs after the response
  - every status now visible below the sticky header at both widths
- **The technical baseline:** perf 97 and 98, a11y 100, axe 0, CLS 0, and no overflow from 320 to 1440.
- **Founder copy strictly within the approved public facts.**
- **Accurate evidence files.** The round-5 e2e correction is the right habit.

---

## 8. Strongest counterargument and limitations

**Counterargument to the positioning:**

- **The site leads with the newest and smallest discovery channel.** The research file's own data supports this:
  - For pure local-intent queries, AI Overviews appear 15% of the time against the local pack's 93% (Whitespark, 2025-05).
  - Google Maps showed tracked businesses 66% of the time against 32–38% for AI platforms (BrightLocal, 2026-09).
  - Only 8% of travelers are comfortable letting AI book (Expedia via Skift, 2026-04).
- **A skeptical operator may file the check as a curiosity.** They may spend on their Google Business Profile, reviews and booking widget instead.
- **The site pre-empts this honestly.** The "Don't Google Maps and reviews still matter more?" FAQ says yes, and argues that the Found work strengthens Maps too.
- **Its value case still rests on the AI hook.** Booked and Supported carry most of the paid value, but they get one clause in the hero.
- **A separate trust question is out of scope.** A busy operator may ask how a founder with a current VP role delivers a whole project. The owner has decided not to address this (decisions, "Availability"), so I record it as a buyer question, not a defect.

**Limitations of this review:**

- **Lab measurements only.** Lighthouse and axe ran against the local production build, not the Vercel CDN, and Core Web Vitals are lab estimates.
- **No live submission.** I did not submit to the live API (out of bounds). Live conversion rests on `round-6-e2e.md` and earlier e2e files, plus my read-only Gmail check. The round-6 live lead was API-level, not browser-driven.
- **Mocked states.** I verified the success and error states with mocked responses on the local build.
- **The check runner is unobservable.** I cannot see whether reports are produced by the described method, or whether they arrive in under 24 hours (§3 A).
- **Not tested:**
  - no screen-reader pass
  - no external schema validator
  - LinkedIn not opened
- **Name checks** used web search only, not a trademark search.
