# Round 7 review

- **Reviewed artifact:** HEAD `009b362` ("Round 7 end-to-end evidence"). The site code is from `8ec0e75`. The live deployment at https://oakheart-lab.vercel.app serves the same content. I confirmed this by curl: "Common questions", "one project, start to finish", "runs every check himself" and `knowsAbout` are all present, and "third-party data service" is gone.
- **Date:** 2026-10-04
- **Reviewer:** independent. I did not open `docs/reviews/README.md` or any `round-N.md`.

## Inspection scope

- **Documents:** the brief, rubric, research file (§1a–1e, §2), decisions, cutover checklist, the round-6 findings, and every `*-e2e.md` (rounds 2–7).
- **Rendered text:** `pages.txt` (FAQ expanded, metadata, JSON-LD, links, and the scripted form test against the local build).
- **Screenshots:** all 13 in `round7/`. I cut the full-page captures into segments and viewed every one: desktop-home 0–4, desktop-check 0–2, mobile-home 0–6, mobile-check 0–3, plus the fold, form-errors, form-submit and `success-m` captures.
- **Source:** `src/**`, `tests/**`, `vercel.json` and `.github/workflows/notify-pending.yml`. I read the full round-7 diff (`git diff HEAD~2 HEAD~1`).
- **Live site, read-only curl:**
  - status codes for `/`, `/ai-visibility-check`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, the headshot, and `/api/cron/notify-pending` (401 without the secret)
  - canonical, robots, og:url and og:image tags
  - JSON-LD
  - I did **not** submit to the live API.
- **Local build (127.0.0.1:3100):**
  - `pnpm test`: 17/17 pass.
  - `tests/browser/success-heading.cjs`: PASS. Header bottom 65 px, heading top 121 px, focus on the status region, exit 0. The screenshot went to my scratchpad, and the repo stayed clean.
  - Lighthouse mobile, 3 runs per page, in a fresh output folder. An older `lh/` folder from an earlier session was present, and I ignored it.
  - axe-core at 320, 390 and 1440 with the FAQs expanded.
  - Overflow and clipping scans at 320, 340, 350, 360, 375 and 390.
  - The mobile menu and every in-page anchor target.
- **External links:** Pew, BrightLocal, Google I/O and Substack return 200. LinkedIn returns 999, its normal bot block.
- **Gmail connector, read-only:** "New AI check request: Round 7 QA (ignore)" is in the Inbox at 2026-10-04T15:54:24Z, from `onboarding@resend.dev` to yilun@oakheartlab.com. Earlier rounds' receipts are present too, including Round 6 at 15:43:20Z.

---

## 1. Recovered meaning (from the site only)

1. **Who it is for.** Owners of booking-based businesses "that move atoms, not bits": tours, rentals, home and auto services, classes and wellness, stays, and moving and storage. Source: hero eyebrow, "Who we help" cards, and the business-type select.
2. **The problem.** Customers now ask AI assistants where to book. Those assistants may leave the business out ("AI doesn't mention you"), get operational details wrong ("Wrong age limit, old prices, a cancellation policy you changed last year"), or send people into a booking path that loses them.
3. **What is offered.**
   - **First step:** a free AI Visibility Check, with a report "within 24 hours", "Free, as many as you like", "No obligation".
   - **Then:** a free tailored preview "if your check shows clear fixes we can help with".
   - **Then:** one paid Found, Booked and Supported project, "One price, agreed up front", connected to the existing booking system.
   - **Then:** optional ongoing work.
   - **Cost:** no prices are shown. Every project gets "one price, agreed before we start". There is a blanket promise: "If you're not happy with our service, we'll give your money back, no questions asked."
4. **Why believe it.**
   - three sourced, dated and linked statistics: Pew, BrightLocal and Google I/O
   - a founder with a named automotive digital-commerce background (Hertz, Clutch, Rivian, Carvana)
   - a labeled illustrative answer card and sample report
   - candid FAQs ("No one honestly can", "For most local bookings today, yes")
   - a method that admits it is "a sample, not a ranking"
5. **What to do next.** Click "Get your free AI check". This is the primary button in the header, the hero, the How it works band and the closing band. The form asks for 5 required fields and 2 optional ones and takes about a minute. The secondary actions are "Prefer to talk first? Email Yilun" and "Ask about a tailored preview" (mailto).

**Divergence from the brief:** none material. Buyer, thesis, offer ladder, 24-hour unlimited free check, money-back wording, no prices and founder facts all match. The check method now matches `decisions.md`, "How the free check runs before the runner exists".

---

## 2. Closure check on round-6 findings

| Round-6 item | Status | Evidence |
|---|---|---|
| **A / Fix 1.** Method copy described a pipeline that isn't live | **Closed** | Live `/ai-visibility-check` no longer contains "third-party data service" or "Software runs the questions". The founder card reads "**Yilun Zhang runs every check himself**". The FAQ reads "He runs the questions on each assistant, checks the answers against your site, and writes the findings and fixes himself." This matches the new `decisions.md` entry and cutover item 8. |
| **B / Fix 2.** Failed notifications alert no one | **Partly closed** | **Done:** `notify-pending/route.ts` now returns `status: result.sent < result.pending ? 500 : 200`. **Still open:** the only caller that turns a 500 into an email is the GitHub job, and it still exits 0 with "CRON_SECRET repository secret not set; skipping" (`notify-pending.yml`). Cutover item 6 still parks the secret. The daily Vercel cron receives the 500, but nothing in the repo routes that failure to a person. So the alert path exists in code but is not active. |
| **C1 / Fix 3.** A fresh lead could be emailed twice | **Closed** | `claimUnnotified` now requires `created_at < now() - interval '2 minutes'`. New unit test: "leaves a lead alone while its first send may still be in flight". The overlapping-runs test now ages its row past the grace period. 17/17 pass. One residual edge: `notify()` succeeds but `markNotified` throws (`.catch(() => {})`), so a later retry re-sends. This is benign and rare. |
| **C2 / Fix 3 (optional part).** A crash after the claim loses the notification silently | **Open** | The claim still sets `notified_at = now()` before sending (`lead-store.ts`). No `claimed_at` lease exists, so a function cut off between claim and send or release leaves the lead marked as notified forever. |
| **Fix 4.** "One team" slogan | **Closed** | The H2 is now "Found, booked, supported: one project, start to finish." (`desktop-home-2` crop, top). |
| **Fix 5.** Service and Offer schema for the check | **Closed** | The live JSON-LD has a `Service` "Free AI Visibility Check" with `provider` `{"@id":"https://oakheart-lab.vercel.app/#org"}` and `offers` `{"@type":"Offer","price":"0","priceCurrency":"USD"}`, plus the FAQPage. The description matches the visible lede. |
| **Fix 6.** Step 2 title misaligned on desktop | **Closed** | `md:min-h-8` on the step labels. In the `desktop-home-3` crop (y about 418–475), all four step titles sit on one baseline. |
| **Fix 7.** Test and motion hygiene | **Closed** | **Test script:** `process.exitCode = pass ? 0 : 1`, and the pass condition now also requires focus. The default screenshot goes to `os.tmpdir()`. I verified exit 0 and a clean `git status`. **Motion:** `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }` in `globals.css`, and `revealStatus` picks `behavior` through `matchMedia`. |

**Summary:** 6 closed, 1 partly closed (B), 1 open (C2, optional in round 6).

**Correction to the round-6 record:** round 6 listed "no overflow from 320 to 1440" as a strength. That holds only for page-level scroll width. At 320 px the sample report is **clipped inside its `overflow-hidden` figure** (§3, item 3). The component is unchanged since `e984681`, so this is a missed defect, not a round-7 regression.

---

## 3. Critical failures and unmet requirements

**No critical failure.** All gates pass (§5).

### 1. The notification safety net still depends on a parked setup step

- **The path today:**
  1. The first send fails.
  2. The lead is retried either when another lead's notification succeeds (the `after()` retry, which only claims leads older than 2 minutes), or at the daily Vercel cron at 13:00 UTC.
  3. The 3-hourly GitHub run is inert without `CRON_SECRET`.
- **Worst case:** a lead submitted just after 13:00 UTC on a quiet day is not seen for about 24 hours. That uses up the whole "Report in under 24 hours" window.
- **Alerting:** the new 500 alerts no one until the secret exists (closure item B).
- **Severity:**
  - Cutover item 6 defers the secret deliberately, and the site is noindex, so this is a **launch blocker rather than a current defect**.
  - It does not depend on DNS, though, and it is the one remaining gap between "lead stored" and "owner knows in time".

### 2. A crash after the claim can still lose a notification

- See closure item C2.
- This is low probability: Resend calls are fast and batches are at most 20. But the failure would be silent.

### 3. The sample report is clipped below about 340 px

- **Where:** `/ai-visibility-check`, sample report excerpt, at 320 px. My capture is `r7-320-sample.png` in the scratchpad.
- **What is cut:**
  - "mentioned in 2 of 5 r[uns]"
  - "ChatGPT says the minimum age is 12[.]"
  - "Your tour page says 6+ with an adult[.]"
  - "“Age & requirements[”]"
- **Cause:**
  - The single-column grid track (`grid … md:grid-cols-[1fr_1.2fr]`) has no `minmax(0,1fr)` below `md`.
  - The `dd` is `whitespace-nowrap`, so the track grows to the row's min-content width.
  - The figure's `overflow-hidden` then hides the excess instead of scrolling the page.
- **Scope:**
  - At 340–390 px nothing is clipped (scan above).
  - It is outside the rubric's 390/1440 gate widths, so it does not fail the rendering gate. It does affect small phones and zoomed views.

---

## 4. Per-dimension scores

### 1. Positioning clarity: 9/10 (weight 15%)

- **Hero:** "FOR BUSINESSES THAT MOVE ATOMS, NOT BITS / More of your customers are asking AI where to book. Does it get you right?" (`desktop-home-fold`, `mobile-home-fold`).
  - It names the buyer, the channel and the stake within the first viewport at both widths.
  - The answer card (Correct / Wrong. Their site says 6+ with an adult / Not mentioned: Your business) states the thesis visually. It is labeled "Illustrative example: the businesses and the lake are invented."
- **One thesis across both pages:**
  - Home ends with "Find out what AI tells your customers about you."
  - The check-page H1 is "See what AI tells your customers about you."
  - The footer reads "AI visibility, booking and customer support for businesses that move atoms, not bits."
- **New section H2:** "AI answers now shape who gets the booking." It is plainer than its predecessor and directly on-thesis.
- **Why not 10:** the hero subhead carries Booked and Supported in one trailing clause ("…and make sure the people they send land in a booking flow that works…"). The paid value is underweighted at first glance (see §8).

### 2. Offer and buyer relevance: 9/10 (weight 15%)

- **The offer ladder** (How it works, `desktop-home-3`) has explicit commitment points:
  - "STEP 1 · UNDER 24 HOURS"
  - "STEP 2 · IF YOUR CHECK SHOWS ROOM TO IMPROVE"
  - "STEP 3 · YOU DECIDE / One price, agreed up front"
  - "STEP 4 · OPTIONAL"
  - It is followed directly by the verbatim blanket money-back line.
- **Buyer language:**
  - the six category questions, e.g. "Does the pontoon rental include fuel and life jackets?"
  - "Do I have to switch booking systems? No… FareHarbor, Peek, Mindbody, Square…", which answers the research file's migration-fear finding (§3b, rec. 5)
- **The pillars read as one system:** "Found, booked, supported: one project, start to finish."
- **The optional extras are present:** "Also available when you need them: a companion mobile app, and staff tools…"
- **Why not 10:**
  - Who qualifies for the tailored preview stays soft ("If your check shows clear fixes we can help with").
  - Booked and Supported are described as outcomes without any example of what changes in the booking path.

### 3. Credibility and evidence integrity: 9/10 (weight 15%)

- **Statistics** (`desktop-home-0/1`, `mobile-home-1`) each trace to research §1e and carry a source and date:
  - **Pew:** "8% vs 15%… Source: Pew Research Center, March 2025 browsing data, published Jul 2025". This matches research line 40 and the "say 'in March 2025 browsing data'" instruction.
  - **BrightLocal:** "45%… Source: BrightLocal Local Consumer Review Survey, Feb 2026". It is phrased "say they've used", not framed as a precise jump, as research §1e(4) asks.
  - **Google:** "Google says Search will now book local experiences and services… and even call some businesses on their behalf. Source: Google I/O, May 2026". This matches research §1d, which gives a summer 2026 rollout.
- **Supporting claims:**
  - "some assistants are starting to book them too" is supported by the FareHarbor and ChatGPT and OpenAI apps entries (§1d).
  - "Google says showing up in its AI features rests on the same foundations as search" is supported by §2a ("rooted in our core Search ranking and quality systems").
- **Labeling:**
  - the sample report is tagged "Illustrative · fictional business" and "(invented)"
  - the hero card is labeled as invented
- **Founder copy** stays within the approved public facts:
  - "over a decade", not 15+
  - the employer roles are background only, with no metrics
  - the quote is verbatim from the brief
- **The round-7 method fix removes the only integrity risk I would otherwise flag:**
  - "Yilun Zhang runs every check himself"
  - "He runs the questions on each assistant, checks the answers against your site, and writes the findings and fixes himself."
  - This now matches `decisions.md` and cutover item 8.
- **Why not 10:** proof still rests on background and method. There is no real (consented) sample report yet; `decisions.md` lists it as still open. That is a known, honest gap, not a defect.

### 4. Conversion path and friction: 9/10 (weight 15%)

- **One primary action everywhere:**
  - the header "Get your free AI check" (mobile: "Free AI check")
  - the hero button
  - the money-back band
  - the closing dark band
  - the check-page closing card "Get my free AI check" → `#check-form`
- **The form asks only what the brief's FAQ says it needs:** "your business name, website, location, type of business and an email".
- **Error state:** "Please fix the highlighted fields." plus per-field messages, with focus moved to the first invalid field (`desktop-form-errors`, `mobile-form-errors`).
- **Failure state:** honest: "We couldn't submit your request right now, and nothing was saved…", with a prefilled mailto and values kept (`desktop-form-submit`, `mobile-form-submit`, `pages.txt` tail).
- **Success state:** "Request received. Your report will arrive within 24 hours from yilun@oakheartlab.com, sent to … check your spam or promotions folder", plus the next step. It sits below the sticky header (`success-m.png`; the test re-run passes at 121 > 65 px).
- **Objections near the decision:**
  - "Is it really free? What's the catch?"
  - "Who runs the check?"
  - "What happens to my information?"
- **Why not 10:**
  - The notification safety net and alert are not yet active (§3, item 1). This is the one weak link between a submission and a report within 24 hours.
  - At 1440×900 the submit button sits just below the fold (`desktop-check-fold`; in the full capture it is at y about 939). This is minor because the visitor scrolls naturally through a visible form.
  - The round-7 live lead was API-level. The last browser-driven deployed submissions were rounds 4 and 5. Round 7 changed only `revealStatus`, not the request body.

### 5. Copy quality and voice: 8/10 (weight 10%)

- **Strengths:**
  - concrete, practitioner-calm writing: "Wrong age limit, old prices, a cancellation policy you changed last year"
  - "One answer is an anecdote; repeated runs show a pattern"
  - "It is a sample, not a ranking"
  - "No one honestly can"
- **Problems:**
  - **New line, misplaced appositive:** "**Yilun Zhang runs every check himself**, Oakheart Lab's founder. No sales call unless you ask." (`desktop-check-fold`, founder card; `mobile-check-1` crop, y about 100). "Oakheart Lab's founder" now modifies "himself". This is the most visible sentence on the trust card, and it reads as an edit seam.
  - **Slogan cadence remains in places:**
    - "Nothing gets lost between handoffs." (What we do intro)
    - "Start free. Decide when you've seen the difference."
    - "the business becomes untouchable" is the founder's own approved quote, so it is acceptable.
  - **"Common questions."** is neutral filler. It replaces a more voiced heading, but costs little.
- Qualifications sit beside claims throughout (the Maps FAQ, the "Answers also vary with location and account" caveat).

### 6. Visual design and UX craft: 9/10 (weight 10%)

- **Consistent system:** cream and white section rhythm, mono eyebrows, one accent orange for actions, bordered cards.
- **Purposeful visuals:** the answer card and the sample report carry meaning.
- **Fixed this round:** the step titles now align (`desktop-home-3`).
- **Mobile:** single column, full-width buttons, no truncation at 390 in any capture.
- **Why not 10:**
  1. The 320 px clip of the sample report (§3, item 3).
  2. On mobile the founder-card link "Prefer to talk first? Email Yilun" breaks across two lines mid-link (`mobile-check-1` crop, y about 180–200; also `success-m.png` at the bottom).
  3. The mobile form-errors capture shows the eyebrow half under the sticky header after focus scrolls to the first field. It is cosmetic.

### 7. Search and AI discoverability: 9/10 (weight 10%)

- **Facts are crawlable HTML,** including the FAQ answers (`pages.txt`).
- **Live metadata uses the pre-launch base** as decided:
  - `<link rel="canonical" href="https://oakheart-lab.vercel.app/ai-visibility-check"/>`
  - matching og:url
  - the sitemap lists both URLs on the same base
  - `robots.txt` is `Disallow: /` and the pages carry `noindex, nofollow`, both intentional until cutover items 3–4
- **Entity graph:**
  - `ProfessionalService #org` with founder `Person`, `sameAs` LinkedIn and Substack, and a description identical to the meta description and footer
  - new `knowsAbout`
  - the check page's `Service` and `Offer` (price 0) matches the visible lede
- **Answer-first passages:**
  - the "Isn't this just SEO?" and "Can you guarantee…" answers are self-contained and citable
  - "Which assistants do you check? ChatGPT, Google's AI Overviews and AI Mode, Gemini, Perplexity and Claude."
- **Why not 10:**
  - The check page's `provider` `@id` points to a node defined only on the homepage graph. This is valid, but a page-local parser sees an unresolved reference.
  - `knowsAbout` includes "Answer engine optimization", a term that appears nowhere in the visible copy.
  - Lighthouse SEO is 69 only because of `is-crawlable` (noindex), which is expected.

### 8. Technical quality and accessibility: 9/10 (weight 10%)

- **Lighthouse mobile, 3 runs each (local production build, simulated throttling):**

  | Page | Performance | Accessibility | Best practices | LCP (ms) | CLS | TBT (ms) |
  |---|---|---|---|---|---|---|
  | `/` | 97 / 98 / 97 (median 97) | 100 | 100 | 2519 / 2423 / 2508 (median 2508) | 0 | 38–65 |
  | `/ai-visibility-check` | 98 / 98 / 99 (median 98) | 100 | 100 | 2355 / 2351 / 2242 (median 2351) | 0 | 21–30 |

- **axe:** 0 violations at 320, 390 and 1440 on both pages, with the FAQ open.
- **Page scroll width** equals the viewport at every width tested.
- **Links and navigation:**
  - The mobile menu opens, navigates to `/#faq` (target at 79.5 px, below the header) and closes.
  - All in-page anchors exist: `how-it-works`, `system`, `founder`, `faq`, `what-you-get`, `check-form`.
  - External links resolve.
- **The form works end to end on the live site:**
  - round-7 API lead → Inbox at 15:54:24Z, which I verified in Gmail
  - browser-driven deployed submissions in rounds 4 and 5
  - the cron endpoint returns 401 without the secret
  - 17 unit tests pass
- **Why not 10:**
  - The homepage's lab LCP median (2508 ms, element `p.mt-6`, the hero subhead) sits right at the 2.5 s "good" line.
  - The 320 px clip.

### Weighted total

| # | Dimension | Weight | Score | Weighted |
|---|---|---:|---:|---:|
| 1 | Positioning clarity | 15% | 9 | 1.35 |
| 2 | Offer and buyer relevance | 15% | 9 | 1.35 |
| 3 | Credibility and evidence integrity | 15% | 9 | 1.35 |
| 4 | Conversion path and friction | 15% | 9 | 1.35 |
| 5 | Copy quality and voice | 10% | 8 | 0.80 |
| 6 | Visual design and UX craft | 10% | 9 | 0.90 |
| 7 | Search and AI discoverability | 10% | 9 | 0.90 |
| 8 | Technical quality and accessibility | 10% | 9 | 0.90 |
| | **Total** | 100% | | **8.90 / 10** |

No dimension is unverified.

---

## 5. Gates

- **Evidence gate: PASS.**
  - There are no testimonials, logos, client results or reviews.
  - All three statistics are named, dated and linked, and each traces to research §1e.
  - The illustrations are labeled invented or fictional.
  - "Can you guarantee ChatGPT will recommend us? No one honestly can." There is no ranking or recommendation promise.
  - The method copy now describes the process that actually runs (`decisions.md`).
- **Conversion gate: PASS.**
  - **Mobile and desktop submission:** the form submits at both widths. It was browser-driven against the deployed endpoint in `round-4-e2e.md` (both widths) and `round-5-e2e.md` (mobile).
  - **Lead received:** the round-7 live lead arrived at the destination, which I verified in Gmail.
  - **Accurate confirmation:** the success state matches what happens; the mocked 201 test passes and `success-m.png` shows it.
  - **Honest failure states:** the local unconnected state shows the failure message ("nothing was saved").
  - **Caveat:** round 7 itself has no browser-driven live submission. The request body path is unchanged since those rounds.
- **Rendering gate: PASS.**
  - No defect at 390 or 1440 impairs reading or action.
  - The 320 px sample-report clip is outside the gate widths. It is recorded as a fix.
- **Regression gate: PASS.**
  - The hero, answer card, sample report, stat cards, candid FAQs, offer ladder, money-back line, form states, a11y 100 and axe 0 all remain.
  - Heading changes ("AI answers now shape who gets the booking.", "Common questions.") lose no strength noted in round 6.

---

## 6. Prioritized fixes

### 1. Turn on the notification safety net and its alert before any real traffic

- **Element:** `.github/workflows/notify-pending.yml` ("CRON_SECRET repository secret not set; skipping." → `exit 0`), and cutover item 6.
- **Why:**
  - Without it, a lead whose first email fails can wait until the next 13:00 UTC Vercel cron, up to about 24 hours. That breaks "Report in under 24 hours".
  - The new 500 notifies no one.
- **Smallest correction:**
  - The owner adds the `CRON_SECRET` repository secret now. It doesn't depend on DNS.
  - Optionally, have the "skipping" branch `exit 1` once a `LEADS_LIVE` repo variable is true, so an unconfigured job can't stay green after launch.

### 2. Make the retry claim crash-safe

- **Element:** `src/lib/lead-store.ts` `claimUnnotified` (`update … set notified_at = now()` before sending).
- **Why:** a function cut off between the claim and the send or release marks the lead notified forever, with no log of a send.
- **Smallest correction:**
  - Add a `claimed_at timestamptz` column.
  - Claim with `set claimed_at = now() … where notified_at is null and (claimed_at is null or claimed_at < now() - interval '10 minutes')`.
  - Set `notified_at` only in `markNotified` after a successful send.
  - Add one unit test: "a claim that is never released is retried after the lease expires".

### 3. Repair the founder-card sentence on the check page

- **Element:** `src/app/ai-visibility-check/page.tsx`: "**Yilun Zhang runs every check himself**, Oakheart Lab's founder. No sales call unless you ask."
- **Why:** the appositive now attaches to "himself". This is the page's main trust line, and it reads as an edit seam.
- **Smallest correction:** "**Oakheart Lab's founder, Yilun Zhang, runs every check himself.** No sales call unless you ask."

### 4. Stop the sample report clipping on small phones

- **Element:** `src/components/sample-report.tsx`: `<div className="grid gap-8 p-5 sm:p-6 md:grid-cols-[1fr_1.2fr]">` and the `dd` with `whitespace-nowrap`.
- **Why:** at 320 px "mentioned in 2 of 5 r…", "minimum age is 12", "6+ with an adult" and "Age & requirements" are cut off by `overflow-hidden`. This is the page's main proof element.
- **Smallest correction:** add `grid-cols-1` (which is `minmax(0,1fr)`) to the grid, and change the `dd` to `sm:whitespace-nowrap`.

### 5. Keep the mobile founder-card links whole

- **Element:** the check-page founder card, "About Yilun · Prefer to talk first? Email Yilun" (`mobile-check-1`, y about 180–200).
- **Why:** the second link breaks mid-phrase across lines.
- **Smallest correction:** add `whitespace-nowrap` to each link (the `·` separator can wrap), or shorten the label to "Email Yilun".

### 6. Record a browser-driven live submission in the next e2e file

- **Element:** `docs/reviews/round-7-e2e.md`, which has only an API-level QA lead.
- **Why:** the conversion gate rests on rounds 4 and 5 for browser evidence. Any change to `check-form.tsx`, including round 7's `revealStatus` change, should be re-proven in a real browser against production.
- **Smallest correction:** each round, run one 390 px browser submission forwarded to the deployed API (the round-4 method) with a `qa-*` address, and log the Gmail receipt.

### 7. Trim the homepage's lab LCP margin

- **Element:** the hero subhead `p.mt-6` is the LCP element. The median is 2508 ms on simulated mobile.
- **Why:** it sits at the 2.5 s "good" threshold. Real-world CWV after launch may tip over it.
- **Smallest correction:** confirm the Geist font is preloaded with `display: swap` (next/font defaults), and check that no client component above the fold delays hydration of the hero text. Re-measure on the Vercel URL with PageSpeed Insights after launch.

---

## 7. Strengths to preserve

- **The truthful method disclosure.** "Yilun Zhang… runs the questions on each assistant, checks the answers against your site, and writes the findings and fixes himself." Together with "It is a sample, not a ranking", it now matches what actually runs.
- **The hero with its labeled Correct / Wrong / Not mentioned answer card.** It shows the thesis in one picture.
- **The sample report.** It shows run frequency, a cited cause and a concrete "Fix first".
- **Three sourced, dated, linked statistics**, each from the research file's safest list.
- **Candid FAQs:**
  - "No one honestly can"
  - "For most local bookings today, yes, and we treat them that way"
  - "Mostly, it's good SEO done properly"
- **The offer ladder with explicit commitment points**, the verbatim blanket money-back line, and no prices.
- **Form engineering:**
  - honest 422, 429, 5xx and network states, with a mailto fallback and preserved values
  - idempotency key, honeypot, rate limit and QA tagging
  - an atomic claim with a 2-minute grace period
  - a status visible below the sticky header
  - motion that respects reduced-motion settings
- **The Service, Offer and FAQPage JSON-LD**, consistent with the visible copy.
- **Lighthouse:** performance 97–99, a11y 100, best practices 100, CLS 0, axe 0.
- **Founder copy strictly within the approved public facts.**

---

## 8. Strongest counterargument and limitations

**Counterargument to the positioning:**

- **The site leads with the youngest, smallest discovery channel.** The research file itself shows:
  - Local-pack dominance for pure local intent: AI Overviews on 15% of queries against the local pack's 93% (Whitespark, 2025-05).
  - Google Maps showing tracked businesses 66% of the time against 32–38% for AI platforms (BrightLocal, 2026-09).
  - Only 8% of travelers comfortable letting AI book (Expedia via Skift, 2026-04).
- **A skeptical operator may treat the free check as a curiosity** and spend on reviews, their Google Business Profile or their booking widget instead.
- **The site pre-empts this honestly** in the Maps FAQ.
- **The paid value case still leans on Booked and Supported,** which get one clause in the hero and no concrete before-and-after.
- **A related trust question:**
  - "Runs every check himself", with "as many as you like" and "under 24 hours", invites a buyer to ask how one person sustains this alongside a VP role.
  - The owner has decided not to address capacity (decisions, "Availability"), and the unlimited 24-hour check is an owner-set offer.
  - So I record this as a buyer question, not a defect.

**Limitations of this review:**

- **Lab measurements only.** Lighthouse and axe ran against the local production build, not the Vercel CDN, and CWV are simulated.
- **No live submission by me** (out of bounds). Live conversion rests on the e2e files and my read-only Gmail check. The round-7 live lead was API-level.
- **Mocked or unconnected states.** I saw the success and failure states via the mocked test and the unconnected local server.
- **The hand-run check process is unobservable.** I cannot verify report quality or the 24-hour turnaround.
- **Vercel cron failure alerting.** I found nothing in the repo that alerts on a failed Vercel cron. I did not inspect Vercel dashboard notification settings.
- **Not tested:**
  - no screen-reader pass
  - no external schema validator
  - LinkedIn content not opened (999 bot block)
