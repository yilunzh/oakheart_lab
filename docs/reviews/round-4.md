# Round 4 independent review

- **Reviewed artifact:** HEAD commit `1089e30`. The site code is identical to `f4d913c`; `1089e30` adds only `docs/reviews/round-4-e2e.md` and a README line. The deployed site serves the `f4d913c` content: "Lakeside Kayak Co." and the reworded hero subhead are both live on https://oakheart-lab.vercel.app.
- **Date:** 2026-10-04
- **Inspection scope:**
  - Inputs read: `docs/brief.md`, including the owner constraint added during this review that the site does not address founder capacity; `docs/review-rubric.md`; `docs/research/phase1-market.md`; `docs/decisions.md`; the round-3 prior findings; and `round-2-e2e.md`, `round-3-e2e.md` and `round-4-e2e.md`. Per instructions I did not open `README.md` or `round-0` to `round-3`.
  - Captured material: `pages.txt` (rendered text, metadata, JSON-LD, links and the scripted form test) and all 14 screenshots (desktop-/mobile- home, check, fold, form-errors and form-submit, plus e2e-mobile/desktop-success).
  - Source: all of `src/`, `tests/` and `vercel.json`. `pnpm test`: 14/14 pass.
  - Local production build at `127.0.0.1:3100`:
    - Lighthouse mobile, 3 runs per page.
    - axe-core 4 (wcag2a/aa, 21aa, 22aa and best-practice) at 390 and 1440, with FAQs open.
    - Playwright: horizontal overflow at 320, 390, 768, 1024 and 1440; an element capture of the mobile sample report; the sticky-header height.
  - Deployed site (curl only, with no API submission):
    - Status of `/`, `/ai-visibility-check`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/icon` and the headshot.
    - Canonical, OG, Twitter and JSON-LD URLs.
    - The cron endpoint without auth.
  - External links: Pew, BrightLocal, Google I/O and Substack return 200. LinkedIn returns 429 to curl, as expected for LinkedIn.
  - **Owner inbox independently verified:** a read-only Gmail search found the 4 notification emails listed in `round-4-e2e.md`. Each went from `onboarding@resend.dev` to `yilun@oakheartlab.com` and landed in the Inbox, at 15:19:57Z, 15:22:56Z, 15:23:31Z and 15:23:34Z.
  - Web search on the fictional names used in the illustrations (see Credibility).

---

## 1. Recovered meaning (site only)

1. **Who it is for.**
   - Owners of businesses "that move atoms, not bits", where "a booking sets real work in motion": tours, rentals, home and auto services, classes and wellness, stays, and moving and storage (home, "Who we help").
   - **Matches the brief.**
2. **The problem.**
   - Customers increasingly ask AI assistants where to book.
   - Assistants either don't mention you or get operational details wrong (age limits, prices, policies), and the booking path then loses those who arrive (home, "01/02/03" cards).
   - **Matches the thesis**, including the "complex offers are hurt most" angle.
3. **What is offered, the first step and its cost.**
   - First step: a free AI Visibility Check, "Report in under 24 hours · Free, as many as you like · No obligation".
   - Then a free tailored preview, "if your check shows clear fixes".
   - Then one Found → Booked → Supported project, "One price, agreed up front".
   - Then optional ongoing work, with the companion app and staff tools as add-ons.
   - Cost: no prices. "If you're not happy with our service, we'll give your money back, no questions asked."
   - **Matches the brief** on every rung.
4. **Why believe it.**
   - Three sourced and dated stats: Pew Jul 2025, BrightLocal Feb 2026 and Google I/O May 2026.
   - A labeled illustrative answer card and a labeled sample report excerpt.
   - Candid FAQs ("No one honestly can"; Maps "For most local bookings today, yes").
   - A method disclosure.
   - The founder's public career background (Hertz, Clutch, Rivian, Carvana) and his own quote.
   - **Within approved facts.** No employer metrics, no "15+ years", no Fleetbit.
5. **What to do next, and the effort.**
   - Click "Get your free AI check" and fill in 5 required fields plus 2 optional ones (about 1 minute).
   - Secondary: email Yilun, or ask about a tailored preview by mailto.
   - **Matches** the primary and secondary CTAs in the brief.

**Divergences from the brief:** none material.
- Minor: the brief's audience and the homepage list "Moving & storage", but the check form's "Type of business" options omit it (`src/content/site.ts` `businessTypes`). Those visitors must pick "Other booking-based business".

---

## 2. Critical failures and unmet requirements

**No critical failure.** All four gates pass (section 5).

Unmet or at-risk items:
- **An illustrative example uses a real business name, labeled as fictional.**
  - The hero answer card (`src/components/answer-card.tsx`, line 14; `desktop-home-fold.png`, right card, middle row) reads "**North Shore Kayak**: Great reviews, but tours are for ages 12 and up. *Wrong. Their site says 6+ with an adult*". The caption says "Illustrative example with fictional businesses."
  - A web search shows that "North Shore Kayak" rentals and a "North Shore Kayak Tour" operate at Lake Tahoe today: Tahoe Vista, listed on Tripadvisor, and Tahoe Adventure Company.
  - The query in the card is "Best kayak tour near Lake Tahoe…". A Tahoe operator reading this could take it as a statement about a real competitor's age policy.
  - "Lakeside Kayak Co. · South Lake Tahoe" in the sample report sits next to the real Lakeside Marina, which rents kayaks in South Lake Tahoe. That is a lower risk, but the same class of problem.
  - This is not a fabricated testimonial or result, so the Evidence gate still passes. It is the most important fix this round.
- **The notification fallback still does not fit the 24-hour promise.**
  - The instant path is now proven: 4 of 4 emails are in the Inbox, about 90 ms after insert.
  - But `vercel.json` still has `"schedule": "0 13 * * *"`. If the instant email fails, the first retry can come about 24 hours after submission.
  - Failures are now logged (`src/lib/notify.ts`: `console.error('[notify] Resend responded …')`), but nobody is alerted by a log line.
- **The sender is Resend's test address** (`onboarding@resend.dev`, per `round-4-e2e.md`). It works for owner-only notification, but it must be replaced by a verified oakheartlab.com sender before any visitor-facing email is added. Treat it as a cutover checklist item.

---

## 3. Closure check (round-3 findings)

| # | Round-3 finding | Status | Evidence |
|---|---|---|---|
| 1 | Close the lead-to-inbox loop, log failures, fit the fallback to the 24-hour promise, record a real receipt | **Partly closed** | **Closed:** key set; failures logged in both branches (`notify.ts`); browser receipts recorded (`round-4-e2e.md`) and confirmed in Gmail by me. **Open:** cron still daily (`vercel.json` `0 13 * * *`); no digest. |
| 2 | Empty band on check page at desktop | **Closed** | `page.tsx` line 39 now has `lg:grid-rows-[auto_1fr]`. In `desktop-check-fold.png`, the founder card sits at y≈585–703 directly under the bullets, with no gap. |
| 3 | Preview metadata on a host that serves it | **Closed** | Live: canonical `https://oakheart-lab.vercel.app`, `og:image …/opengraph-image?…` (200), JSON-LD `@id`/`logo`/`image` on `oakheart-lab.vercel.app`, `/icon` 200, headshot 200, sitemap on the same host. |
| 4 | Substack links at cutover | **Closed** | `site.substack = "https://substack.com/@oakheartlab"` (200, domain-independent). The cutover steps are recorded in `decisions.md` ("Pre-launch URL base"). |
| 5 | Show what a report looks like | **Closed** | `SampleReport` is labeled "Sample report excerpt · Illustrative · fictional business", with the caption "Shows the format only…" (`desktop-check.png`, y≈1000–1210). The naming caveat is in section 2. |
| 6 | Qualify the hero subhead absolute | **Closed** | It now reads "…answer 'who should I book?', often before a customer ever visits your site." |
| 7 | Retire the last contrast pair | **Closed** | "Visibility tools stop at visibility…" is gone. The new intro is "We handle the whole path: from what AI says about you, to a confirmed booking, to the questions customers ask afterwards." |
| polish | Name DataForSEO in "How we run it" | **Open** | The text still says "a third-party data service". |
| polish | `scroll-margin-top` for fields and status | **Open** | Only `Section` has `scroll-mt-20`. In `e2e-mobile-success.png` the "Request received." heading sits under the 65px sticky header, so the visible panel starts at "Your report will arrive…". |
| polish | Call option once a scheduling URL exists | **Open (owner input)** | `decisions.md` still lists the scheduling URL as open. |

---

## 4. Per-dimension scores

### 1. Positioning clarity: **9 / 10** (15%)

**Strengths:**
- The eyebrow, H1 and subhead name the buyer, the problem and the promise at the fold. The eyebrow reads "FOR BUSINESSES THAT MOVE ATOMS, NOT BITS"; the H1 reads "More of your customers are asking AI where to book. Does it get you right?" (`desktop-home-fold.png`, `mobile-home-fold.png`).
- The answer card makes the accuracy thesis concrete with a "Correct / Wrong / Not mentioned" taxonomy.
- One thesis runs across both pages. The check page H1 "See what AI tells your customers about you." echoes it.
- The six customer questions ("Can my 6-year-old do the sunset kayak tour?", "Which cabins near Asheville allow two dogs?") put the operational-complexity angle in the buyer's own words.

**Gap:**
- On mobile, the answer card falls below the fold (`mobile-home-fold.png` ends at the card's top edge). Mobile visitors get the promise in text only at first glance. This is acceptable.

### 2. Offer and buyer relevance: **9 / 10** (15%)

**Strengths:**
- The ladder is explicit and gated sensibly, from "STEP 1 · UNDER 24 HOURS" to "STEP 4 · OPTIONAL" ("How it works").
- The commitment ("You know the price before we start") and the risk reversal are verbatim from the brief, repeated near the CTA and in the footer.
- The pillars read as one system ("1 FOUND / 2 BOOKED / 3 SUPPORTED") with concrete points ("Connected to the booking system you already use").
- The FAQ "Do I have to switch booking systems? No…" names FareHarbor, Peek, Mindbody and Square. That answers the buyer's biggest migration fear (research §3b).

**Gaps:**
- "Moving & storage" is missing from the form's business types (see recovered meaning).
- The tailored preview is reachable only by mailto ("Ask about a tailored preview"). That is fine at this stage.

### 3. Credibility and evidence integrity: **8 / 10** (15%)

**Strengths:**
- All three stats trace to the research file and are worded within it:
  - Pew 8% vs 15% (research line 40, "March 2025 browsing data").
  - BrightLocal 45%, "of US consumers say…", attributed to BrightLocal (research line 21; the vendor caveat is honoured through attribution).
  - Google I/O agentic booking (research line 56).
- Each stat links to its primary source, and all three links return 200.
- The sample report and answer card are both labeled.
- The founder paragraph stays strictly inside the approved facts:
  - "over a decade", "leads digital products for Hertz's global rental business", "built Rivian's purchase and delivery experience from scratch", "led homepage, search and listings at Carvana"
  - no metrics, no endorsements
- The method section discloses the sampling and its limits: "It is a sample, not a ranking."

**Deductions:**
- (a) "North Shore Kayak" in a Lake Tahoe example labeled "fictional" collides with a real Lake Tahoe kayak operator, and the card asserts an error about its age policy. "Lakeside Kayak Co. · South Lake Tahoe" is close to the real Lakeside Marina. The label is literally inaccurate, and this is the kind of detail a skeptical local operator notices.
- (b) The hero line "We make sure they find you, describe you correctly…" (`src/app/page.tsx`, line 79) reads as an outcome guarantee. The FAQ on the same page says "No one honestly can" guarantee it. This is softer than a ranking promise but sits close to the brief's "no performance guarantee" constraint.

### 4. Conversion path and friction: **9 / 10** (15%)

**Strengths:**
- There is one primary action everywhere: the header CTA, hero, How-it-works band, closing dark band and footer on the homepage, and the form at the top of the check page.
- On mobile, the form starts right after a one-line intro (`mobile-check-fold.png`, form at y≈398).
- The form asks only what the report needs, with two optional fields.
- Errors are inline, specific and focus the first invalid field (`desktop-form-errors.png`: "Enter your website so we can check what AI says against it.").
- The failure state is honest and offers a prefilled email fallback (`desktop-form-submit.png`).
- The success state names the sender, the recipient and the spam folder, gives a next step, and says "no sales call" (`e2e-desktop-success.png`).
- **End to end is now proven:** the deployed API returned 201, and the owner's Gmail Inbox shows matching emails, which I verified independently.

**Gaps:**
- The check page has no action after "What your report covers", the sample report and the FAQ (`desktop-check.png`, y≈1000–1800). The header CTA points to the same URL and does not scroll back to the form.
- On mobile success, the heading sits under the sticky header (`e2e-mobile-success.png`).
- The fallback cadence is daily (section 2).

### 5. Copy quality and voice: **8.5 / 10** (10%)

**Strengths:**
- The copy is calm and specific, in a practitioner voice: "Wrong age limit, old prices, a cancellation policy you changed last year."
- The FAQ answers are candid and qualified: "Mostly, it's good SEO done properly."
- The last contrast pair is gone.

**Gaps:**
- "We make sure they find you…" puts a promise where a qualification belongs (see dimension 3).
- "One team" appears twice in two lines: "One team, start to finish." / "One team, so nothing gets lost between handoffs." That echoes a slogan cadence.
- "The answer is becoming the storefront." is the one remaining tagline-style H2. It is acceptable.

### 6. Visual design and UX craft: **8.5 / 10** (10%)

**Strengths:**
- The system is consistent: warm paper, one rust accent, mono eyebrows, and rounded cards.
- The visuals carry meaning: the answer-card taxonomy, and the red "Error found" and green "Fix first" blocks.
- The desktop check page is now balanced (`desktop-check-fold.png`).
- There is no horizontal overflow at 320, 390, 768, 1024 or 1440 (Playwright: `scrollWidth − innerWidth = 0` on both pages).

**Defects:**
- **Mobile sample report rows wrap unevenly.** At 390, "Google AI Overviews" wraps to two lines, and its value wraps to "mentioned in 3 of 5 / runs" with an orphaned "runs". The values then misalign with the rows above and below (my element capture of `figure` at 390, row 2 height 54px versus 31.5px for the others; also visible in `mobile-check.png`, y≈1350 in the scaled view).
- The sticky header covers the success heading on mobile (`e2e-mobile-success.png`) and clips the eyebrow when an error is focused (`mobile-form-errors.png`, top: "FREE AI VISIBILITY CHECK" cut off).

### 7. Search and AI discoverability: **8.5 / 10** (10%)

**Strengths:**
- All facts are server-rendered HTML; the FAQ answers are present in the HTML.
- The FAQPage JSON-LD on both pages matches the visible Q&A word for word (`pages.txt`).
- The ProfessionalService and Person graph uses consistent `@id`s and the same description string as the meta description.
- Live canonicals, sitemap and OG point to the serving host.
- Robots disallows everything and the meta says `noindex, nofollow`. Both are intentional before launch (`layout.tsx` and `robots.ts` switch on `NEXT_PUBLIC_SITE_INDEXABLE`; D6). Lighthouse SEO is 69 only because of this.
- The passages are answer-first and citable ("ChatGPT, Google's AI Overviews and AI Mode, Gemini, Perplexity and Claude.").

**Gaps:**
- `areaServed: "US"` in JSON-LD is not stated anywhere in the visible copy.
- The Organization node has no `sameAs`; only the Person has one.
- The data provider is not named, although research §6.3 recommends naming DataForSEO for citability and trust.

### 8. Technical quality and accessibility: **9.5 / 10** (10%)

**Lighthouse, mobile, local production build, 3 runs each:**

| Page | Performance (median) | Accessibility | Best practices | Median LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| `/` | 98 (runs 95 / 98 / 98) | 100 | 100 | 2.50 s | 53–165 ms | 0 |
| `/ai-visibility-check` | 98 (all runs) | 100 | 100 | 2.36 s | 23–43 ms | 0 |

**Other checks:**
- **axe:** 0 violations on both pages at 390 and 1440.
- **Links:** all internal anchors resolve. External sources return 200; LinkedIn returns 429 to curl only.
- **Deployed checks:** the cron endpoint returns 401 without auth.
- **Tests:** 14/14 pass, including QA-address tagging.
- **Form:** works end to end (section 5).

**Deduction:**
- The home LCP median of 2.50 s sits on the threshold in lab conditions, so there is no margin.

**Weighted total:**

| Weight group | Scores | Calculation |
|---|---|---|
| 15% dimensions | 9, 9, 8, 9 | (9+9+8+9) × 0.15 = 5.25 |
| 10% dimensions | 8.5, 8.5, 8.5, 9.5 | (8.5+8.5+8.5+9.5) × 0.10 = 3.50 |
| **Total** | | **8.75 / 10** |

---

## 5. Gates

| Gate | Result | Reason |
|---|---|---|
| Evidence | **Pass** | No testimonials, logos, client results or reviews. All statistics are named and dated. No ranking or recommendation guarantee; the FAQ says "No one honestly can". Caveat: the "fictional" example names collide with real Lake Tahoe operators (fix 1). It is a labeled illustration, not a fabricated result, but it should be corrected before any promotion. |
| Conversion | **Pass** | The browser form at 390 and 1440 got 201 from the deployed API (`round-4-e2e.md`). The emails arrived in the `yilun@oakheartlab.com` Inbox, which I confirmed by a read-only Gmail search (4 threads, 15:19:57Z–15:23:34Z). The success copy is accurate: the report comes from the owner's address, and the owner is notified instantly. The local "not saved" state is honest (`desktop-form-submit.png`, `mobile-form-submit.png`). |
| Rendering | **Pass** | No defect at 390 or 1440 impairs reading or action. The sample-row wrap and the header overlap on success are cosmetic. |
| Regression | **Pass** | All round-3 strengths are intact: the hero card, the three stat cards with identical wording, the candid FAQs, the method disclosure, the mobile check order, the form engineering, perf/a11y, and the approved-facts founder copy. Nothing was lost; the desktop check layout improved. |

---

## 6. Prioritized fixes

1. **Use names that cannot match real operators in the illustrations.**
   - **Element:** `src/components/answer-card.tsx`, line 14, "North Shore Kayak" (and line 9, "Emerald Paddle Co."); `src/components/sample-report.tsx`, "Lakeside Kayak Co. · South Lake Tahoe".
   - **Why:** a real "North Shore Kayak" rental and tour operation exists at Lake Tahoe. The card tells visitors that "tours are for ages 12 and up" is AI getting that business wrong, under a caption calling it fictional. That is reputational and legal exposure, and a credibility slip with exactly the operators this site targets.
   - **Smallest fix:** use plainly invented names and keep the scenario generic, for example "Pinecrest Paddle Co." and "Example Kayak Tours". Check each name with one web search. Optionally drop "Lake Tahoe" from the query ("Best family kayak tour near me for a 6-year-old?") and use the same neutral naming in the sample report.
2. **Turn the hero promise into an effort, not an outcome.**
   - **Element:** `src/app/page.tsx`, line 79, "We make sure they find you, describe you correctly, and send people into a booking flow that works…".
   - **Why:** it reads as a guarantee, and the FAQ on the same page says no one can guarantee it. The brief rules out performance guarantees.
   - **Smallest fix:** "We fix what keeps them from finding you and describing you correctly, and send people into a booking flow that works…"
3. **Make the notification fallback fit the 24-hour promise.**
   - **Element:** `vercel.json`, `"0 13 * * *"`.
   - **Why:** an instant-email failure is logged but not seen, and the first retry can come about 24 hours later.
   - **Smallest fix:** run every 2–4 hours if the plan allows. If not, have the daily run email a digest of all `status='new'` leads from the last 24 hours, whether or not they were notified, so a silent failure surfaces the next morning. At cutover, verify oakheartlab.com in Resend and replace `onboarding@resend.dev`.
4. **Keep focused status and fields clear of the sticky header.**
   - **Element:** the success `div[role=status]` and `#form-status` in `src/components/check-form.tsx`; the form inputs.
   - **Why:** in `e2e-mobile-success.png` the "Request received." heading is hidden under the 65px header, at the moment of confirmation.
   - **Smallest fix:** add `scroll-mt-24` to both status containers, and `scroll-margin-top: 6rem` to `input, select, textarea` in `globals.css`.
5. **Add a closing action on the check page.**
   - **Element:** the end of `src/app/ai-visibility-check/page.tsx`, after the "How we run it" FAQ.
   - **Why:** a visitor convinced by the sample report and the method has nothing to click there. The header CTA points to the same URL and does not return them to the form.
   - **Smallest fix:** give the form card `id="form"`, then add one `CtaLink` "Get my free AI check" → `#form` after the FAQ. Optionally point the header CTA to `/ai-visibility-check#form`.
6. **Fix the mobile sample-report row wrap.**
   - **Element:** the `dd` in `sample-report.tsx` ("mentioned in {n} of {total} runs").
   - **Why:** at 390, "mentioned in 3 of 5 / runs" orphans a word and misaligns the column (`mobile-check.png`).
   - **Smallest fix:** add `whitespace-nowrap` to the `dd`, and shorten the label to "{n} of {total} runs", with "Mentioned in" as a column header.
7. **Small consistency items.**
   - Add "Moving & storage" to `businessTypes`, to match "Who we help".
   - Name DataForSEO in "How we run it" ("…through DataForSEO, a third-party data service, set to your location…").
   - Either state the US service area in visible copy or drop `areaServed`.
   - Add `sameAs` to the Organization node.

---

## 7. Strengths to preserve

- The hero H1 with the labeled answer card: the "Correct / Wrong / Not mentioned" taxonomy is the site's clearest idea.
- The new sample report excerpt. It shows the run-frequency format, the cited source and a concrete "Fix first", and it answers "is this a canned audit?". Keep it, with neutral names.
- The three sourced and dated stat cards, linked to their primary sources.
- The candid FAQs: "No one honestly can"; Maps "For most local bookings today, yes"; "Mostly, it's good SEO done properly."
- The method disclosure: "It is a sample, not a ranking."
- The mobile check page order (H1, one line, form) and the now-balanced desktop check layout.
- Form engineering:
  - honest failure states with a prefilled mailto
  - idempotency and duplicate handling
  - a honeypot and rate limiting
  - focus management
  - QA-address tagging
  - logged notification failures
  - 14 tests
- The technical baseline: mobile performance 98, accessibility 100, 0 axe violations, no overflow from 320 to 1440.
- Founder copy strictly within the approved public facts, and the verbatim money-back line.
- Pre-launch metadata now resolves on the serving host.

---

## 8. Strongest counterargument and limitations

**Counterargument to the positioning:**
- The AI-assistant channel is real and growing, but for most local bookings it is still small.
  - AI tools handle about 3.2% of US desktop search activity, against Google's 73.7% (SparkToro/Datos).
  - AI Overviews appear on about 15% of pure local-intent results, against the local pack's 93% (Whitespark).
  - Only 8% of travelers are comfortable letting AI book (Expedia).
- A skeptical operator may value the free check as a curiosity but conclude that the money belongs in Google Business Profile and the booking flow. The site partly pre-empts this ("the Found work strengthens Maps and search too").
- **Context only, not a defect:** the site describes the founder's current Hertz role and says "You work with him directly". A buyer may privately wonder how much attention a solo practice can give. By owner decision (brief, Constraints), the site deliberately does not address this, so it is not scored or listed as a fix.

**Limitations of this review:**
- Lighthouse and axe ran against the local production build, not the Vercel CDN. Core Web Vitals are lab estimates.
- I did not submit to the deployed API. Conversion rests on `round-4-e2e.md` (whose method forwards request bodies with the production `Origin`), plus my own read-only Gmail confirmation of the four notification emails.
- No screen-reader pass and no external schema validator.
- LinkedIn was not opened in a browser (it returns 429 to curl).
- The real-name collision check was a quick web search on three names, not a trademark search.
- I did not verify that the check runner (DataForSEO, D9) is operational. `decisions.md` lists its credentials as still open. Delivering reports in under 24 hours may currently rely on manual work, which is outside what this site review can observe.
