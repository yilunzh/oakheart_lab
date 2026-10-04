# Round 8 review

- **Reviewed artifact:** HEAD commit `be9cfd9` ("Round 8 end-to-end evidence"). The site code is identical to `860a3ae`, which is what is deployed at https://oakheart-lab.vercel.app. I confirmed this from the live HTML, which contains the round-8 changes: the "Method / How we run the check." section, the repaired founder-card sentence and `sm:whitespace-nowrap` on the sample report.
- **Date:** 2026-10-04
- **Inspection scope:**
  - **Documents:** the brief, rubric, research file (`phase1-market.md`), decisions, cutover checklist, the round-7 prior findings, and every `*-e2e.md` file from round 2 to round 8. I did not open `docs/reviews/README.md` or any `round-N.md`.
  - **Rendered pages:** `pages.txt`, covering text with the FAQ expanded, links, JSON-LD and the scripted form test.
  - **Screenshots:** all 16 in the round-8 capture: `desktop-*`, `mobile-*` (the full-page mobile shots cut into 7 and 4 segments), `e2e-*`, `success-m.png` and `sample-320.png`.
  - **Source:** `src/`, `tests/`, `db/migrations/`, `vercel.json` and `.github/workflows/`, plus `git diff 8ec0e75..HEAD`.
  - **Tests I ran:**
    - `pnpm test`: 18 passed.
    - `tests/browser/success-heading.cjs`: PASS.
    - My own Playwright scripts against the local production build at http://127.0.0.1:3100:
      - 18 success-state runs across 320, 390 and 1440 px, with response delays of 0, 800 and 2,500 ms
      - 40 randomized-delay runs at 390 and 1440 px
      - axe-core 4 plus an element-level horizontal-overflow scan at 320, 390 and 1440 px on both pages, with the error state triggered on the check page
    - Lighthouse mobile, three runs per page.
  - **Live site (curl only, no submissions):**
    - both pages, `robots.txt`, `sitemap.xml`, `/opengraph-image` and the headshot
    - `/api/cron/notify-pending` without auth, which returned 401
    - canonicals, Open Graph tags and JSON-LD `@id`s
    - external source links: Pew, BrightLocal, Google, Substack and LinkedIn
  - **GitHub Actions:** the run list for the repository (0 runs). The secrets endpoint is blocked by the proxy (403).
  - **Gmail (read-only):** I searched for the round-8 receipts.

---

## 1. Recovered meaning (from the site alone)

1. **Who it is for:** owners of booking-based, operations-heavy consumer businesses, "businesses that move atoms, not bits".
   - The site names them as "Tours, rentals, appointments, classes and stays" and the six category cards: Tours & experiences, Rentals, Home & auto services, Classes & wellness, Stays & hospitality, Moving & storage.
   - **Matches the brief.**
2. **The problem:** customers increasingly ask AI assistants where to book.
   - AI either doesn't mention the business or gets its operational details wrong: "Wrong age limit, old prices, a cancellation policy you changed last year".
   - Then the booking path loses the people who do arrive.
   - **Matches the brief's thesis**, including "complex offers are hurt most".
3. **What is offered:**
   - **First step:** a free AI Visibility Check: "Report in under 24 hours", "Free, as many as you like", "No obligation".
   - **Then:** a free tailored preview "if your check shows clear fixes".
   - **Then:** one paid project, Found → Booked → Supported, with "One price, agreed up front".
   - **Optionally:** ongoing work, plus the companion app and staff tools ("Ask us").
   - **No prices.** The money-back sentence is verbatim.
   - **Matches the brief.**
4. **Why believe it:**
   - three sourced and dated statistics
   - a labeled illustrative answer card and a labeled sample report
   - a candid method ("It is a sample, not a ranking")
   - the founder's public career background (Hertz, Clutch, Rivian, Carvana) and his own quote
   - honest FAQs ("No one honestly can")
   - **Matches the brief and D7′:** there are no employer metrics.
5. **What to do next:** fill in a 5-required-field form, plus 2 optional fields, on `/ai-visibility-check`. That takes about a minute. The fallback is "Prefer to talk first? Email Yilun".
   - **Matches the brief.** A call is replaced by email until the scheduling URL exists (cutover item 7, an owner constraint).

**Divergence from the brief:** none found.

---

## 2. Closure check of the round-7 findings

| # | Round-7 finding | Status | Evidence |
|---|---|---|---|
| 1 | Notification safety net depends on the parked `CRON_SECRET` | **Open** (deferred by the owner as cutover item 6) | `.github/workflows/notify-pending.yml` still exits 0 when the secret is missing. GitHub reports 0 workflow runs: the workflow arrived after the 15:17 UTC slot, so the first scheduled run would be 18:17 UTC. The secrets API is blocked to me, so whether the secret exists is **unverified**. The worst case is unchanged: a failed first send waits for the 13:00 UTC Vercel cron, up to about 24 h. See also new finding N2. |
| 2 | A crash after the claim can lose a notification | **Closed** | `lead-store.ts` now claims with `set claimed_at = now()`, filtered by `claimed_at is null or claimed_at < now() - interval '10 minutes'`. `notify-pending.ts` calls `markNotified` only after `notify()` returns true. `0002_claimed_at.sql` is present, and the e2e file says it is applied. New test: "re-offers a lead whose claim was never released (crash mid-send) after the lease expires" (passes). Residue: the `claimUnnotified` doc comment still says "(sets notified_at)", which is stale. |
| 3 | Founder-card sentence reads as an edit seam | **Closed** | It now reads "Oakheart Lab's founder, **Yilun Zhang, runs every check himself.** No sales call unless you ask." (`desktop-check-fold.png`, card at y ≈ 615; also in the live HTML). |
| 4 | Sample report clipped below about 340 px | **Closed** | The grid has `grid-cols-1`, and the `dd` is `sm:whitespace-nowrap`. In `sample-320.png` "mentioned in 2 of 5 runs" wraps fully, and "6+ with an adult" and "Age & requirements" are whole. My 320 px scan found a document width of 320 and no element past the right edge on either page. |
| 5 | Mobile founder-card link breaks mid-phrase | **Closed** | The `talkFirst` link has `whitespace-nowrap`. `e2e-mobile-success.png` (y ≈ 811) and `mobile-check-1` (y ≈ 52) show "About Yilun · Prefer to talk first? Email Yilun" on one line. |
| 6 | Record a browser-driven live submission | **Closed** | `round-8-e2e.md` records the real form at 390 and 1440 px, forwarded to the deployed API, both returning `201`. In Gmail (read-only) I found both receipts in the Inbox: "New AI check request: E2E Round8 mobile (ignore)" at 16:14:18Z and "…desktop (ignore)" at 16:14:20Z, from `onboarding@resend.dev` to yilun@oakheartlab.com. Caveat: the mobile screenshot from that run shows the defect in new finding N1, and the e2e file doesn't mention it. |
| 7 | Homepage lab LCP margin | **Open** (unchanged) | The LCP element is still the hero subhead `p.mt-6`, 205 px tall at 390 px. Home mobile LCP over three runs: 2593, 2507 and 1988 ms, a median of 2507 ms, still right at the 2.5 s line. |

---

## 3. Critical failures and unmet requirements

**No critical failure. All four gates pass (§5).** Two new substantive findings and one carried-over item:

### N1. The confirmation can land under the sticky header and lose focus, intermittently

- **Where:** `/ai-visibility-check` after a successful submit, at both 390 and 1440 px.
- **Evidence:**
  - **The round-8 e2e evidence shows it.** In `e2e-mobile-success.png` the green box starts above the header bottom (65 px). The "Request received." heading is hidden behind the header, and the first visible line is "Your report will arrive within 24…". `round-8-e2e.md` nonetheless records the mobile confirmation as "PASS: heading top 121 px". That number comes from the separate mocked test, not from this run.
  - **My reproduction:**
    - With a mocked `201` delayed 800 ms at 390×844, the heading top was **26 px**, against a header bottom of 65. `document.activeElement` was `null` instead of the status region.
    - Over 20 randomized-delay runs (100–1,600 ms) per width it happened **1/20 at 390 px and 1/20 at 1440 px**. Screenshots: `race-390.png` and `race-1440.png` in my scratchpad.
    - All other runs placed the heading at 121 px with the status focused.
- **Likely cause:** `check-form.tsx` calls `requestAnimationFrame(() => revealStatus(statusRef.current))` right after `setStatus("sent")`.
  - If the frame fires before React commits the success tree, `statusRef.current` still points at the old `#form-status` div.
  - That div gets scrolled to and focused, then unmounted. The new `role="status"` box is never scrolled to or focused.
  - The `scroll-mt-24` margin therefore never applies to the element the visitor actually sees.
- **Why it matters:**
  - The visitor still sees confirmation body text, so the confirmation stays accurate and the conversion gate holds.
  - But on mobile the "Request received." heading is hidden, and focus is lost for keyboard and screen-reader users. This is the most important moment on the site.
  - `success-heading.cjs` samples a single zero-delay run, so it can't catch this race.

### N2. The owner email states the deadline from the wrong moment

- **Where:** `src/lib/notify.ts`, which ends every email with "Report promised within 24 hours of this email."
- **Why it matters:**
  - A lead whose first send failed is emailed later: by the next successful lead, by the 13:00 UTC cron, or by the GitHub run once its secret exists.
  - For a lead submitted at 13:05 UTC and caught by the next day's cron, the email arrives about 24 h after submission, yet it tells the owner he still has 24 h. The visitor was promised 24 h from submission.
  - `claimUnnotified` doesn't return `created_at`, so the email carries no submission time at all.
- **Compounding factor:** this combines with the open round-7 item 1. The lead is safe, but the owner's sense of the deadline is wrong exactly when it matters.

### Carried over (deferred): the 3-hourly GitHub retry depends on `CRON_SECRET` (cutover item 6)

- This is a deliberate owner deferral and the site is noindex, so it is a launch blocker, not a current defect.

---

## 4. Per-dimension scores

### 1. Positioning clarity: 9 / 10 (weight 15%)

**What works:**
- **The hero is buyer-specific and passes the 5-second test:**
  - The eyebrow reads "FOR BUSINESSES THAT MOVE ATOMS, NOT BITS".
  - The H1 reads "More of your customers are asking AI where to book. Does it get you right?"
  - Beside them sits the answer card with "Correct", "Wrong. Their site says 6+ with an adult" and "Not mentioned / Your business" (`desktop-home-fold.png`; on mobile, `mobile-home-0`, y ≈ 850–1390).
- **One thesis on both pages:**
  - the check page H1, "See what AI tells your customers about you."
  - the footer line, "AI visibility, booking and customer support for businesses that move atoms, not bits."

**Limitation:**
- **The hero subhead is long.** It runs 55 words and three clauses, starting "ChatGPT, Gemini and Google now answer…" and ending "…without replacing the booking system you already use."
- At 390 px it takes 8 lines (`mobile-home-fold.png`, y ≈ 370–590) and pushes the CTA to y ≈ 630.
- This is the only thing between the H1 and the action.

### 2. Offer and buyer relevance: 8 / 10 (weight 15%)

**What works:**
- **The ladder has explicit commitment points:**
  - "STEP 1 · UNDER 24 HOURS"
  - "STEP 2 · IF YOUR CHECK SHOWS ROOM TO IMPROVE"
  - "STEP 3 · YOU DECIDE: One price, agreed up front"
  - "STEP 4 · OPTIONAL"
  - Evidence: `mobile-home-4`, y ≈ 470–1390.
- **Risk reversal is verbatim** in the band after the ladder and in the footer, and there are no prices.
- **It speaks the buyer's language:**
  - the category questions, such as "Does the pontoon rental include fuel and life jackets?"
  - the FAQ "Do I have to switch booking systems?", naming FareHarbor, Peek, Mindbody and Square
- **The pillars now read as one system.** The new intro says "Because we handle all three together, the facts AI repeats, your booking pages and your support answers stay consistent."

**Gaps:**
- **Booked and Supported stay abstract next to Found:**
  - "A booking path built around how your customers choose"
  - "The right add-ons at the right moment, never pushy"
  - "Fewer repeat questions for your staff"
- **The paid value case therefore has no concrete before-and-after**, while the free check has a vivid one.
- **The secondary action is "Email Yilun", not a call** (cutover item 7, an owner constraint, not scored down).

### 3. Credibility and evidence integrity: 9 / 10 (weight 15%)

**The statistics trace to the research file's "safest to quote" list (§1e) and are dated and linked:**
- **Pew "8% vs 15%"**, labeled "March 2025 browsing data, published Jul 2025", as §1e asks.
- **BrightLocal 45%**, attributed to "BrightLocal Local Consumer Review Survey, Feb 2026".
- **Google I/O, May 2026**, stated as "Google says…".
- All three source links return 200 live.

**Labels and founder facts:**
- **Concepts are labeled:**
  - "Illustrative example: the businesses and the lake are invented."
  - "Illustrative · fictional business"
  - "Brackenfold Kayaks · Marrowfield Lake (invented)"
  - "Shows the format only."
- **Founder copy stays inside the approved public facts:** "over a decade" (not "15+"), roles only, no metrics, no Fleetbit or PM guide, and the approved quote verbatim.
- **The method is truthful about the hand-run check** ("He runs the questions on each assistant… himself"), per the decision of 2026-10-04.

**Minor:**
- **The hero card and the sample report use different invented businesses for the same scenario.** On the hero card Quillbay is misdescribed as "12 and up". In the sample report it is Brackenfold with the identical 12-vs-6+ error.
- A careful reader could wonder which one is "you". This is cosmetic.
- **BrightLocal is a vendor (V ⚠VI)**, and the research file calls the jump from 6% to 45% "directional". The attribution by name is adequate.

### 4. Conversion path and friction: 8 / 10 (weight 15%)

**What works:**
- **One primary action everywhere:**
  - the header button ("Free AI check" on mobile)
  - the hero, the How-it-works band and the final dark band
  - the check-page form, plus an in-page CTA (`#check-form`) at the end
- **The form asks only what it needs:** 5 required fields, 2 labeled optional, and a "We compare what AI says against your own site." hint.
- **The error state is clear:**
  - a summary, "Please fix the highlighted fields."
  - per-field messages, with focus on the first invalid field (`mobile-form-errors.png`)
- **The failure state is honest:** "…nothing was saved. You can send the same details by email instead." with a prefilled mailto, and values kept (`mobile-form-submit.png`, `desktop-form-submit.png`).
- **The success copy states the sender, the recipient, a spam hint, a next step and "no sales call"** (`success-m.png`).
- **Live end to end:** `201` on both widths, and Gmail Inbox receipts verified by me.

**Deductions:**
- **N1:** about 1 in 20 successful submits hides the confirmation heading under the header and drops focus. One of only two live mobile e2e captures this round shows it.
- **N2 and the parked retry secret** affect whether the 24-hour promise is kept.

### 5. Copy quality and voice: 8 / 10 (weight 10%)

**What works:**
- **Direct and concrete, with qualifications next to claims:**
  - "It is a sample, not a ranking. Any tool that gives you a single 'AI rank' is overstating what can be measured."
  - "For most local bookings today, yes, and we treat them that way."
  - "Mostly, it's good SEO done properly."
- **The round-8 titles are plainer and better:**
  - "How we run the check."
  - "Start with a free check. Decide once you've seen what we'd change."
  - "Questions about working with us."
- **The founder sentence is repaired.**

**Remaining gaps:**
- **The hero subhead is overloaded** (see dimension 1).
- **A few pillar bullets are generic agency phrasing:**
  - "never pushy"
  - "Fewer repeat questions for your staff"
  - "A booking path built around how your customers choose"
- **"Report in under 24 hours" and "within 24 hours"** alternate. They are compatible but not identical.

### 6. Visual design and UX craft: 9 / 10 (weight 10%)

**What works:**
- **Consistent system:** warm paper, one rust accent, mono eyebrows and rounded cards.
- **Visuals carry meaning:** the answer card's Correct / Wrong / Not mentioned states, and the sample report's red "Error found" and green "Fix first" (`desktop-check.png`, y ≈ 975–1180).
- **Clean at 390 and 1440 px:** no wrapping or truncation defects in any of the 11 mobile segments or the desktop full-page shots.
- **The founder card now stacks the photo above the text below 400 px** (`mobile-check-0`, y ≈ 1590).

**Minor, below the gate widths:**
- **At 320 px the header wraps to two lines:** the wordmark "Oakheart / Lab" and the "Free AI / check" button.
  - Seen in `sample-320.png` (top) and my 320 capture. The wordmark link measures 51 px tall against 33 px at 390.
- **N1** is also a craft defect in the success transition.

### 7. Search and AI discoverability: 9 / 10 (weight 10%)

**What works:**
- **All facts are server-rendered HTML,** including the FAQ answers inside `<details>`.
- **Live metadata is correct for the pre-launch base:**
  - `canonical` is `https://oakheart-lab.vercel.app` and `/ai-visibility-check`.
  - `og:url`, `og:image` (200, image/png, 1200×630) and Twitter tags are present.
  - JSON-LD `@id`s resolve to `https://oakheart-lab.vercel.app/#org`, `#founder` and `/ai-visibility-check#service`.
- **Schema matches visible content:**
  - `ProfessionalService` and `Person`
  - a `FAQPage` whose answers are word-for-word the visible FAQ on each page
  - a `Service` with an `Offer` at price 0 USD, whose description matches the hero
- **The entity description is consistent** across the meta description, the org schema and the footer.
- **The sitemap lists both pages.**
- **`robots.txt` is `Disallow: /`, and both pages are `noindex, nofollow`.** This is deliberate pre-launch (cutover item 4), so Lighthouse SEO scores 69 because of noindex alone (`is-crawlable` = 0) and I don't count that against the site.

**Minor:**
- **The org node has no `areaServed` or `address`.** Atlanta is approved, and the Person has no `homeLocation` either.
- **The check-page `og:image` has no `og:image:type`.** The homepage has one.

### 8. Technical quality and accessibility: 8 / 10 (weight 10%)

**Lighthouse mobile, local production build, three runs each:**

| Page | Performance (median) | Accessibility | Best practices | CLS | LCP (median) | TBT |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 97 (runs: 96, 97, 99) | 100 | 100 | 0 | 2507 ms | 37–144 ms |
| `/ai-visibility-check` | 98 (runs: 98, 100, 98) | 100 | 100 | 0 | 2346 ms | 23–43 ms |

**Other checks:**
- **axe-core 4:** 0 violations on both pages at 320, 390 and 1440 px, including the error state.
- **Links:**
  - no broken internal links, and an unknown path returns 404
  - external links return 200, except LinkedIn's 999 bot block
  - `/api/cron/notify-pending` without auth returns 401
- **Unit tests:** 18 pass.

**Deductions:**
- **N1** loses focus on success, an accessibility defect, intermittently.
- **The home LCP median sits exactly at the 2.5 s "good" threshold**, unchanged since round 7.

### Weighted total

(9×15 + 8×15 + 9×15 + 8×15 + 8×10 + 9×10 + 9×10 + 8×10) / 100 = (135 + 120 + 135 + 120 + 80 + 90 + 90 + 80) / 100 = **8.50**

---

## 5. Gates

| Gate | Result | Reason |
|---|---|---|
| **Evidence** | **Pass** | No testimonials, logos, client results or reviews. All three statistics are sourced, dated and linked. Illustrations are labeled as invented. There is no ranking or recommendation promise: "Can you guarantee ChatGPT will recommend us? No one honestly can." |
| **Conversion** | **Pass** | The real form submitted at 390 and 1440 px to the deployed API and got `201` (`round-8-e2e.md`, `e2e-*-success.png`). Both leads arrived in yilun@oakheartlab.com's Inbox, which I verified read-only in Gmail (16:14:18Z and 16:14:20Z). The confirmation text is accurate. N1 affects the scroll position and focus of the confirmation, not its accuracy or the delivery of the lead. |
| **Rendering** | **Pass** | No layout defect at 390 or 1440 px impairs reading or action: all screenshots, my overflow scan showing document width equal to viewport width, and no off-canvas elements. N1 is an intermittent post-submit scroll issue, not a layout defect, and the confirmation body stays visible. The 320 px header wrap is outside the gate widths. |
| **Regression** | **Pass** | The round-8 diff touches only copy, layout fixes, the lease logic and tests. Every strength listed in round 7 is still present. The rAF-based `revealStatus` behind N1 was not changed this round, since `check-form.tsx` is not in `git diff 8ec0e75..HEAD`. So N1 is a newly found latent defect, not a loss caused by this round. |

---

## 6. Prioritized fixes (up to 7)

### 1. Make the success reveal deterministic (N1)

- **Element:** `src/components/check-form.tsx`, `requestAnimationFrame(() => revealStatus(statusRef.current))` after `setStatus("sent" | "duplicate")`, and the same call at the end of the error paths.
- **Why:**
  - About 5% of successful submits scroll to and focus the about-to-unmount form status.
  - The "Request received." heading ends up under the sticky header (`e2e-mobile-success.png`), and focus is lost.
- **Smallest correction:**
  - Reveal in a `useEffect` (or `useLayoutEffect`) keyed on `status` and `message`, so it runs after commit against the mounted node:
    ```ts
    useEffect(() => { if (status === "sent" || status === "duplicate" || (status === "error" && message)) revealStatus(statusRef.current); }, [status, message]);
    ```
  - Remove the rAF calls.
  - Make `success-heading.cjs` loop about 20 runs with a random 100–1,500 ms route delay, and fail if any run fails.
  - Correct the mobile line in `round-8-e2e.md`, whose own screenshot contradicts its "PASS".

### 2. Put the real deadline in the owner email (N2)

- **Element:** `src/lib/notify.ts`, "Report promised within 24 hours of this email."; `claimUnnotified` in `src/lib/lead-store.ts`, which doesn't return `created_at`.
- **Why:** a retried notification can arrive many hours late and still tell the owner he has 24 hours.
- **Smallest correction:**
  - Pass `createdAt` through the insert and claim paths.
  - Replace the line with "Submitted: {createdAt UTC}. Report due by {createdAt + 24 h UTC}."
  - Prefix the subject with "[LATE]" when more than 2 hours have passed since submission.

### 3. Turn on the 3-hourly retry before any real traffic (round-7 item 1, still open)

- **Element:** `.github/workflows/notify-pending.yml` (`exit 0` when the secret is missing) and cutover item 6.
- **Why:** without it, a failed first send can wait until the next 13:00 UTC cron. That consumes the whole 24-hour window, and the cron's 500 alerts no one.
- **Smallest correction:**
  - The owner adds the `CRON_SECRET` repository secret now. It doesn't depend on DNS.
  - After the 18:17 UTC run, confirm in the Actions tab that the run made the curl call rather than logging "skipping".

### 4. Shorten the hero subhead (dimension 1, dimension 5, and the round-7 LCP item)

- **Element:** `src/app/page.tsx`, hero `p.mt-6` (55 words). It is also the LCP element, with a 2507 ms median.
- **Why:** on mobile it takes 8 lines between the H1 and the CTA, and it sits right at the LCP threshold.
- **Smallest correction:** cut it to two sentences of about 30 words. For example: "ChatGPT, Gemini and Google now answer 'who should I book?' before customers reach your site. We fix what they get wrong, and make sure the people they send can book, on the system you already use."

### 5. Give Booked and Supported one concrete example each

- **Element:** the `pillars` in `src/content/site.ts`:
  - "A booking path built around how your customers choose"
  - "The right add-ons at the right moment, never pushy"
  - "Fewer repeat questions for your staff"
- **Why:** the paid offer rests on these two pillars, and they read as generic next to Found's specifics.
- **Smallest correction:** replace one bullet in each with an operational example in the site's own scenario. For example:
  - **Booked:** "Age, waiver and group-size rules shown before checkout, not after."
  - **Supported:** "'Can we bring the dog?' answered from your policy at 10 pm, with a handoff when it's a judgment call."
  - These are illustrations of what is built, not results.

### 6. Use one invented business across the hero card and the sample report

- **Element:** the `answer-card.tsx` Quillbay line ("tours are for ages 12 and up" / "Wrong. Their site says 6+ with an adult") and `sample-report.tsx` "Brackenfold Kayaks".
- **Why:** the same 12-vs-6+ error belongs to two different fictional businesses, which slightly blurs the "this is you" story.
- **Smallest correction:** rename the sample report's business to "Quillbay Kayak Tours", keeping "(invented)".

### 7. Keep the header on one line at 320 px

- **Element:** `site-header.tsx`, the logo link and the `CtaLink` (`px-4 text-sm`).
- **Why:** at 320 px "Oakheart / Lab" and "Free AI / check" each wrap to two lines (`sample-320.png`, top). It is small, but it is the persistent primary CTA on small phones.
- **Smallest correction:**
  - Add `whitespace-nowrap` to both.
  - Use `max-[359px]:px-3` on the CTA, or `max-[339px]:hidden` on the wordmark text and keep the icon.
  - Also, trivially, fix the stale "(sets notified_at)" in the `claimUnnotified` doc comment.

---

## 7. Strengths to preserve

- **The hero answer card** with labeled Correct / Wrong / Not mentioned states and the "Illustrative example… invented" caption. It shows the thesis in one picture.
- **The truthful method section,** consistent between the copy, the FAQ and the schema:
  - "How we run the check." / "It is a sample, not a ranking."
  - "Who runs the check?" → Yilun runs it by hand
- **The sample report.** It shows run frequency per assistant, a cited cause and a concrete "Fix first". It is now robust down to 320 px.
- **Three sourced, dated, linked statistics,** all from the research file's safest list, with the Pew date stated as the research asks.
- **Candid FAQs** on SEO, Maps and guarantees, with the money-back line verbatim in three places, and no prices.
- **Founder copy strictly within the approved public facts.** The founder's own quote and "You work with him directly" are kept, and nothing is said about capacity, per the owner's decision.
- **Form engineering:**
  - honest 422, 429, 5xx and network states, with a prefilled mailto and preserved values
  - idempotency key, honeypot, per-IP rate limit and QA tagging
  - the new crash-safe 10-minute lease, with `notified_at` set only after a successful send
  - a 401 on the unauthenticated cron
- **Measured quality:**
  - Lighthouse performance 97 and 98 (medians)
  - accessibility and best practices 100
  - CLS 0
  - axe 0 at three widths
- **Correct pre-launch metadata on the live site:** vercel.app canonicals, Open Graph, and JSON-LD `@id`s.

---

## 8. Strongest counterargument and limitations

### Counterargument to the positioning

**The site leads with the newest, smallest discovery channel for its buyer.** The research file it cites shows this:
- For pure local-intent queries the local pack appears on 93% and AI Overviews on 15% (Whitespark, 2025-05).
- Google Maps showed tracked businesses 66% of the time, against 32–38% for AI platforms (BrightLocal, 2026-09).
- Only 8% of travelers are comfortable letting AI book (Expedia via Skift, 2026-04).

**What follows for the buyer:**
- A skeptical operator could treat the free check as a curiosity and put the money into reviews, their Google Business Profile or their booking widget.
- The site concedes this honestly ("For most local bookings today, yes"), and it argues that the Found work strengthens Maps too.
- But the paid value then rests on Booked and Supported, which are the least concrete parts of the page (fix 5).

**A related trust question, recorded but not scored:**
- "Runs every check himself", with "as many as you like" and "under 24 hours", invites a buyer to ask how one person sustains this alongside a VP role.
- The owner has decided not to address capacity, and the unlimited 24-hour check is an owner-set offer.

### Limitations of this review

- **Lab measurements only.** Lighthouse and axe ran on the local production build, not the Vercel CDN. CWV are simulated.
- **No live submission by me** (out of bounds). Live conversion rests on `round-8-e2e.md` and my read-only Gmail check. I saw the success state only with mocked responses and in the e2e screenshots.
- **N1's frequency (about 1 in 20)** comes from 40 local runs with synthetic delays. The real-world rate depends on device speed and network timing.
- **The GitHub `CRON_SECRET` is unverified.** The secrets API returned 403 through the proxy, and no workflow run has happened yet. I did not inspect Vercel cron alerting settings.
- **The hand-run check is unobservable.** I cannot verify report quality or the 24-hour turnaround.
- **Not tested:**
  - no screen-reader pass
  - no external schema validator (I checked the JSON-LD by hand against the visible copy)
  - LinkedIn content not opened (999 bot block)
