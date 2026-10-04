# Round 2 review: homepage and free AI check page

- **Reviewed artifact:** HEAD `bcfc67d` of `/home/user/oakheart_lab` (`git rev-parse --short HEAD`). The deployed build `a4c79c0` has the same `src/` as HEAD; the two later commits only touch `docs/reviews/`.
- **Date:** 2026-10-04
- **Reviewer:** independent. I did not open `docs/reviews/README.md`, `round-0.md` or `round-1.md`. Prior findings came only from the supplied `prior-findings.md`.

**What I actually inspected:**
- `docs/brief.md`, `docs/review-rubric.md`, `docs/research/phase1-market.md`, `docs/reviews/round-2-e2e.md`, and the round 1 findings for the closure check.
- `pages.txt`: rendered text with FAQ expanded, metadata, JSON-LD, links and the scripted form test.
- All 12 supplied screenshots (desktop and mobile: full page, fold, form errors and form submit, for both pages).
- Source: all of `src/` and `tests/`. `pnpm test` gives 12 of 12 passing.
- Local production build at `http://127.0.0.1:3100`:
  - Lighthouse mobile, 3 runs per page
  - axe-core 4.10 at 1440 and 390, with WCAG 2.x A/AA and best-practice tags
  - horizontal-overflow check
  - mobile menu open and anchor navigation
  - a **mocked 201** browser submission at 390 and 1440, to render the success state the local server cannot produce
- Deployed site: GET requests only (200s for `/`, `/ai-visibility-check`, `robots.txt`, `sitemap.xml` and the headshot; `noindex` confirmed). I did not submit to the deployed API.
- External links: Pew, BrightLocal, Google I/O and Substack return 200. LinkedIn returns 999 to curl (bot blocking) and was not opened in a browser.

**Not inspected:**
- I did not submit the form through a browser against the deployed site. Delivery evidence there is the curl and database read-back in `round-2-e2e.md`.
- No screen-reader pass.
- No external schema validator; JSON-LD was checked by hand against visible content.
- Lab Lighthouse only (local `next start`, no CDN), so no field Core Web Vitals.

---

## 1. Recovered meaning (from the site only)

1. **Who it is for.** Owners of businesses "that move atoms, not bits", where "a booking sets real work in motion": tours, rentals, home and auto services, classes and wellness, stays, moving and storage (home, "Who we help" cards). **Matches the brief.**
2. **Problem.** Customers ask AI assistants where to book. The assistants either leave the business out, get its operational details wrong (age limits, prices, cancellation policy), or send people into a booking path that loses them (home, failure modes 01–03). **Matches the thesis.**
3. **Offer, first step and cost.**
   - The first step is a free AI check: a report "within 24 hours", "Free, as many as you like", "No obligation".
   - Then a free tailored preview "if your check shows clear fixes we can help with".
   - Then one project (Found, Booked, Supported) at "one price, agreed up front".
   - Then optional ongoing work, and on request a mobile app and staff tools.
   - The money-back line appears verbatim. No prices.
   - **Matches the brief.**
4. **Why believe it.**
   - Three sourced and dated market cards.
   - A clearly labeled illustrative answer card.
   - Candid FAQ ("No one honestly can"; Maps and reviews "For most local bookings today, yes").
   - A disclosed method ("a sample, not a ranking").
   - The founder's public background (Hertz, Clutch, Rivian, Carvana) and a promise that he reviews every report.
   - There is no Oakheart track record or sample report yet. The brief allows none, so this is a limitation, not a divergence.
5. **Next step and effort.** Click "Get your free AI check" and fill in five required fields (name, website, area, type, email) plus two optional ones. That takes about a minute. Alternatively, "Prefer to talk first? Email Yilun". **Matches**, with one divergence:
   - The brief's secondary CTA is "a call or the tailored preview". The site offers only an email link. There is no way to book a call and no direct way to ask for the preview.
   - This is minor, because the brief does not supply a scheduling URL.

---

## 2. Critical failures and unmet requirements

- **No critical content, evidence or rendering failure.**
- **Unmet: owner notification for new leads.**
  - `RESEND_API_KEY` is not set, so `notified_at` stays null (`round-2-e2e.md`). Nothing alerts the owner when a lead arrives.
  - The success panel nevertheless promises "Your report will arrive within 24 hours from yilun@oakheartlab.com" (`check-form.tsx`, success branch; rendered in `round2r/mobile-success-mock.png`).
  - Today that promise holds only if someone runs the SQL query in `round-2-e2e.md` at least once a day.
  - `notify.ts` returns `false` on failure, and nothing retries or alerts later. Even after the key is set, one failed send leaves a lead silently unnotified.
  - This is the only reason the Conversion gate does not pass (section 4).
- **Partly unmet (minor): secondary CTA.** Only a `mailto:` link is offered. There is no call link and no direct request for the preview (brief, Constraints: "Secondary: a call or the tailored preview").

---

## 3. Per-dimension scores

| # | Dimension | Weight | Score |
|---|---|---:|---:|
| 1 | Positioning clarity | 15% | 9 |
| 2 | Offer and buyer relevance | 15% | 8 |
| 3 | Credibility and evidence integrity | 15% | 8 |
| 4 | Conversion path and friction | 15% | 7 |
| 5 | Copy quality and voice | 10% | 8 |
| 6 | Visual design and UX craft | 10% | 8 |
| 7 | Search and AI discoverability | 10% | 8 |
| 8 | Technical quality and accessibility | 10% | 8 |
| | **Weighted total** | | **8.00** |

(9×15 + 8×15 + 8×15 + 7×15 + 8×10 + 8×10 + 8×10 + 8×10) / 100 = **8.00**

### 1. Positioning clarity: 9

**What works:**
- **The hero is buyer-specific and makes the accuracy thesis in five seconds.** The eyebrow reads "For businesses that move atoms, not bits". The H1 reads "Your customers are asking AI where to book. **Does it get you right?**" (`desktop-home-fold.png`, y ≈ 150–430).
- **The answer card shows the thesis visually.** "North Shore Kayak … tours are for ages 12 and up" is tagged "Wrong. Their site says 6+ with an adult", and "Your business" is "Not mentioned" (`desktop-home-fold.png`, right column).
- **One thesis runs across both pages.** The check page H1 "See what AI tells your customers about you" and the section "Not just whether you show up. Whether AI gets you right." (`desktop-check.png`) repeat the home thesis.
- **The "Who we help" questions let each vertical recognize itself** (for example, "Which cabins near Asheville allow two dogs?").

**Why not 10:**
- The H1 states as present fact a behavior that, for many local verticals, is still a minority behavior.
- The FAQ answer "Don't Google Maps and reviews still matter more? For most local bookings today, yes" deals with this well. But it sits at the bottom of the page, not near the hero claim.

### 2. Offer and buyer relevance: 8

**What works:**
- **The ladder is clear and calm.** "Start free. Decide when you've seen the difference." runs in four steps, with "STEP 2 · IF YOUR CHECK SHOWS ROOM TO IMPROVE" and "STEP 3 · YOU DECIDE: One price, agreed up front".
- **The risk reversal is verbatim and sits next to the CTA** ("If you're not happy with our service, we'll give your money back, no questions asked.", `desktop-home.png`, peach band at y ≈ 1450 in the scaled image).
- **The FAQ answers buyer objections in their own terms.** It names FareHarbor, Peek, Mindbody and Square, and states "Replacing it is never the starting point".
- **The pillars read as one system.** "Found, booked, supported. One team, start to finish." has three parallel cards.

**Gaps:**
- **The secondary path is email only.** "Prefer to talk first? Email Yilun" (`mailto:…?subject=Question%20about%20Oakheart%20Lab`). There is no call option, and the preview cannot be requested.
- **Capacity is not addressed.** The founder "leads digital products for Hertz's global rental business" and "You work with him directly". A careful buyer will ask about availability, and the site never answers.
- **The pillar bullets are features rather than outcomes the owner can verify.** Examples: "The right add-ons at the right moment, never pushy" and "Fewer repeat questions for your staff".

### 3. Credibility and evidence integrity: 8

**The statistics match the evidence base:**
- **Pew card.** "8% vs 15% … clicked a regular search result when Google showed an AI summary, compared with searches that had no summary. Source: Pew Research Center, March 2025 browsing data, published Jul 2025." This matches research 1b/1e exactly.
- **BrightLocal card.** "45% of US consumers say they've used AI tools … to get local business recommendations. Source: BrightLocal Local Consumer Review Survey, Feb 2026." This matches 1a. The 6%→45% jump is not used, as the research advised.
- **Google card.** "Google says Search will now book local experiences and services … and even call some businesses on their behalf. Source: Google I/O, May 2026." This matches 1d and is attributed.
- **Intro line.** "…some assistants are starting to book them too" is now supported by the Google card.

**Labeling and founder facts:**
- **The illustration is labeled.** "Illustrative example with fictional businesses. Your free check shows what assistants actually say about you."
- **The founder copy stays inside the approved facts.** It says "over a decade" (not "15+ years"). Roles match the brief. There are no employer metrics, and Fleetbit is absent.
- The phrase "led homepage, search and listings at Carvana" compresses "led the team responsible for…". That is acceptable, though slightly stronger than the source.

**Gaps:**
- **One unsourced comparative claim.** Home FAQ: "AI answers are the fastest-growing place where those facts get repeated". No source supports "fastest-growing". Similarweb's +117% referral growth is vendor data and is not cited.
- **The method does not disclose the data source or location setting** (check page, "How we run it"). Research §4a/§5.3 notes that API-based responses "can differ from what a consumer sees in the ChatGPT app" and recommends naming the location setting and data source. "We ask ChatGPT, Gemini, Perplexity, Claude and Google's AI answers the questions your customers ask" reads as consumer-app fidelity.
- **No sample report is shown yet.** The proof therefore rests entirely on the founder.

### 4. Conversion path and friction: 7

**What works:**
- **One primary action everywhere.**
  - Header CTA: "Free AI check" on mobile, the full label on desktop.
  - Hero CTA, closing band and closing dark section.
  - The CTA plus "Prefer to talk first? Email Yilun" in the mobile menu (`round2r/mobile-menu-open.png`).
- **The form asks only what it needs.** It has five required fields, and the home FAQ "What do you need from me?" now lists exactly those fields.
- **Errors are clear.**
  - A summary reads "Please fix the highlighted fields."
  - Each field has its own message, for example "Enter your website so we can check what AI says against it.".
  - Focus moves to the first invalid field (`desktop-form-errors.png`, `mobile-form-errors.png`).
- **The failure state is honest and carries the lead.** It reads "We couldn't submit your request right now, and nothing was saved…", followed by a prefilled `mailto:` ("Email your details to yilun@oakheartlab.com"). Input is preserved (`desktop-form-submit.png`, `mobile-form-submit.png`; `mailtoFor()` in `check-form.tsx`).
- **The success state is explicit** (mocked 201, `round2r/mobile-success-mock.png`). It shows:
  - "Request received."
  - the sender address and the recipient
  - "check your spam or promotions folder"
  - a next step, "see how we fix what the check finds"
  - "no sales call unless you ask"
  - Focus moves to `role=status`, and the heading is visible below the sticky header (h2 top 281px at 390, header bottom 65px).
- **The founder trust card now sits beside the form** on desktop (`desktop-check-fold.png`, y ≈ 585–705).

**Gaps:**
- **The success promise outruns operations.** The owner is not alerted, so "Your report will arrive within 24 hours" depends on manual database polling (section 2).
- **On mobile the form starts below the fold.** The first field is at y = 891 on an 844px viewport (measured), and the submit button is at y = 1643. A visitor who tapped "Get your free AI check" sees the H1, bullets and founder card, but no field (`mobile-check-fold.png`). It is one swipe, but it is the decision point.
- **The secondary action is email only** (dimension 2).

### 5. Copy quality and voice: 8

**What works:**
- **Specific, practitioner-toned lines.** "Wrong age limit, old prices, a cancellation policy you changed last year." "They arrive ready to book and hit a clunky widget, a dead end on mobile, or a question nobody answers."
- **Candid FAQ.** "Mostly, it's good SEO done properly." "No one honestly can."
- **Qualifications sit beside claims.** "connect to it wherever it allows". "If your check shows clear fixes we can help with".

**Gaps:**
- **A repeated "X, not Y" or "not just X, Y" pattern** that the rubric counts as artificial contrast:
  - "An operator's product leader, not a generalist agency."
  - "Not just whether you show up. Whether AI gets you right."
  - "It is a sample, not a ranking."
  - "not a made-up 'AI ranking.'"
  - "Visibility tools stop at visibility. Web agencies stop at the website."
  - Each is defensible, but together they become a tic. The "atoms, not bits" line is the founder's own phrase and is fine.
- **"The answer is becoming the storefront."** is a slogan-style heading.

### 6. Visual design and UX craft: 8

**What works:**
- **Consistent system.** Warm paper background, one accent color, mono eyebrows and rounded cards across both pages (`desktop-home.png`, `desktop-check.png`).
- **The visual carries meaning.** The answer card with Correct, Wrong and Not-mentioned tags is the argument itself.
- **Clean mobile layout.** No overflow (scrollWidth − innerWidth = 0 on both pages at 390), no clipped text, and a working disclosure menu that closes on navigation (`round2r/mobile-menu-open.png`; after tapping FAQ, `open=false` and `#faq` sits at top 80px).

**Gaps:**
- **The mobile check page puts the form below the fold** (see dimension 4).
- **The desktop "Type of business" select truncates the chosen value** to "Tours, activities & exper" (`desktop-form-submit.png`, x ≈ 1040–1215, y ≈ 544), because it sits in a half-width column.
- **The desktop stat cards are text-dense.** "Booking" as a big figure is a slightly odd numeral substitute (`desktop-home.png`, "What changed" band).

### 7. Search and AI discoverability: 8

**What works:**
- **Facts are crawlable HTML.** The FAQ answers are in the DOM with the FAQ expanded (`pages.txt`).
- **The JSON-LD FAQPage on both pages matches the visible Q&A word for word.**
- **The entities are consistent.**
  - ProfessionalService and Person nodes are linked by `@id`.
  - `sameAs` now points to LinkedIn and `https://yilunzh.substack.com/`.
  - The description is the same in meta, JSON-LD and footer.
- **The plumbing is correct.**
  - Per-page canonicals.
  - `robots.ts` gated on `NEXT_PUBLIC_SITE_INDEXABLE`. It disallows everything now; when indexable, it allows everything except `/api/` and lists the sitemap.
  - `sitemap.xml` with both URLs.
  - Distinct `og:title` per page.
- **Lighthouse SEO is 69 on both pages.** The only failing audit is `is-crawlable` (intentional noindex).

**Gaps:**
- **No `og:image`, and `og:type` and `og:site_name` are missing.**
  - The layout sets `type` and `siteName`, but the page-level `openGraph` objects in `page.tsx` and `ai-visibility-check/page.tsx` replace the layout's object, so they are dropped. The `curl` output on both pages shows og:title, description and url only.
  - Link previews in email, LinkedIn and Slack will be bare.
- **The schema entities are thin.**
  - Person has no `image`, `description` or `knowsAbout`.
  - The org has no `logo`.
- **Canonicals resolve to `https://www.oakheartlab.com`, which serves the Substack today.** This is correct for cutover, but pre-launch shares of the Vercel URL will declare a canonical that is not this site.

### 8. Technical quality and accessibility: 8

**Lab results:**

| Page | Performance (3 runs) | Median | Accessibility | Best practices | LCP | CLS | TBT |
|---|---|---:|---:|---:|---|---:|---|
| Home | 97 / 98 / 97 | 97 | 100 | 100 | 2.4–2.5 s | 0 | 20–80 ms |
| Check page | 99 / 98 / 99 | 99 | 100 | 100 | 2.2–2.3 s | 0 | 20–40 ms |

- **axe:** 0 violations on both pages at 1440 and 390.
- **Links:** all internal anchors resolve, and external sources return 200 (LinkedIn returns 999 because of bot blocking).
- **API:**
  - The handler validates input, caps size, checks origin, uses a honeypot, rate-limits, dedupes, is idempotent by request ID, hashes the IP, and returns honest 503s.
  - It has 12 unit tests, including "still stores the lead when notification fails".
  - On the deployed site: a curl submission returned 201 and was stored, a retry returned 202 and was stored once, an empty submission returned 422, and a foreign origin returned 403. The database read-back is confirmed (`round-2-e2e.md`).

**Why 8:**
- The rubric item "form works end to end" is incomplete. The lead stops at the database, and there is no owner alert and no retry when a notification fails.
- No browser submission against the deployed site has been recorded.
- LCP at 2.5 s in the lab on home sits on the "good" boundary.

---

## 4. Gates

| Gate | Result | Reason |
|---|---|---|
| **Evidence** | **Pass** | No testimonials, logos, results or reviews. All three statistics are named and dated with primary links, matching research 1e. "No one honestly can" guarantee answer. The illustration is labeled. One unsourced *comparative* phrase ("fastest-growing place") is a fix item, not a fabricated statistic. |
| **Conversion** | **Fail (narrow, operational)** | *Submits:* the client posts correctly at 390 and 1440 (scripted, `pages.txt`), and the deployed API accepts and stores leads (`round-2-e2e.md`). *Received at its destination:* only half met. The database is a store, not a destination; the destination is a person who can deliver within 24 hours, and no one is alerted. *Confirmation accurate:* the "Request received" wording is accurate, but "will arrive within 24 hours" is accurate only with manual daily polling. **What remains:** set `RESEND_API_KEY` and a verified `NOTIFY_FROM` domain; add a fallback for `notified_at is null` (a daily cron or digest, or retry); and run one browser submission on the deployed site at 390 and 1440 that shows both the row and the owner email. Then mark the test rows. |
| **Rendering** | **Pass** | No overflow at 390 or 1440, and no clipping that impairs reading. The form below the mobile fold and the truncated select value are craft issues, not defects that block action. |
| **Regression** | **Pass** | Every strength listed in the round 1 findings is intact: hero H1 and labeled card, sourced stat cards, FAQ candor (now with the Maps answer added), the "sample, not a ranking" method, founder copy within approved facts, the verbatim money-back line, honest 503 handling with focus and ARIA, and the Lighthouse and axe baseline. |

**Result: not a pass.** Only the Conversion gate blocks it.

---

## 5. Closure check: round 1 findings

| # | Round 1 finding | Status | Evidence |
|---|---|---|---|
| 1 | Add secondary CTA (call or preview) and say what "qualified" means | **Partly closed** | The `mailto:` link "Prefer to talk first? Email Yilun" is added in the How it works band, closing section, check-page founder card and mobile menu. Step 2 now says "If your check shows clear fixes we can help with". Residual: no call scheduling and no direct preview request. The round 1 smallest fix anticipated swapping in a scheduling URL later. |
| 2 | Failure and success states carry the lead | **Closed** | The error state has a `mailto:` prefilled with business, website, location, type and question (`mailtoFor`). The success state has the sender, recipient, spam hint and next step (`round2r/mobile-success-mock.png`). |
| 3 | Tighten two evidence paraphrases | **Closed** | "…and some assistants are starting to book them too". Pew card: "How often people clicked a regular search result when Google showed an AI summary, compared with searches that had no summary." |
| 4 | FAQ "what you need from me" matches the form | **Closed** | "…your business name, website, location, type of business and an email for the report." |
| 5 | Trust next to the form | **Closed** | Founder card with photo, "Every report is reviewed by Yilun Zhang… No sales call unless you ask", and an About link (`desktop-check-fold.png`, y ≈ 585–705). Side effect: on mobile it pushes the form below the fold. |
| 6 | Founder writing link and SEO plumbing | **Closed** | Links and `sameAs` point to `https://yilunzh.substack.com/` (200). `robots.ts` and `sitemap.ts` are gated. Per-page canonicals are present. The check page has its own `og:title`. Residual (new, minor): og:image, og:type and og:site_name are missing. |
| 7 | "Co.." typo and mobile nav | **Closed** | "Emerald Paddle Co.:" now renders correctly. A `<details>` mobile menu has all anchors plus the email link and closes on navigation. |

---

## 6. Prioritized fixes (up to 7)

1. **Make lead delivery reach a person.**
   - **Element:** `src/lib/notify.ts` and `src/app/api/checks/route.ts` (env), plus the success copy "Your report will arrive within 24 hours…".
   - **Why:** The confirmation promises a 24-hour report, but nothing tells the owner a lead exists. This is the only failing gate.
   - **Smallest fix:**
     - Set `RESEND_API_KEY` and `NOTIFY_FROM` on a verified domain in Vercel.
     - Add a daily scheduled job, or a Vercel cron route, that emails any rows `where notified_at is null and status='new'`.
     - Run one real browser submission on the deployed site at 390 and 1440 and record the row and the received email in the e2e file.
2. **Put the first form field above the fold on mobile.**
   - **Element:** `/ai-visibility-check` at 390. The founder card (`mobile-check-fold.png`, y ≈ 605–790) precedes the form, and the first field is at y = 891.
   - **Why:** This is the decision point for every CTA click on the site.
   - **Smallest fix:** below `lg`, order the form before the founder card, or shorten the intro to the H1 and one line and move the bullets below the form. Keep the founder card directly under the submit button on mobile.
3. **Source or soften the "fastest-growing" claim.**
   - **Element:** Home FAQ: "AI answers are the fastest-growing place where those facts get repeated, and where mistakes cost you quietly."
   - **Why:** It is an unsourced comparative claim inside an otherwise carefully sourced page, and it appears in the answer to the skeptic's question.
   - **Smallest fix:** "AI answers are a fast-growing place where those facts get repeated, and where mistakes cost you quietly."
4. **Disclose how the check queries assistants.**
   - **Element:** check page "How we run it" paragraph and the FAQ "Which assistants do you check?".
   - **Why:** The research (§4a, §5.3) notes that API responses can differ from the consumer app. Saying so strengthens the "honest method" claim and pre-empts the "that's not what I see" objection.
   - **Smallest fix:** add one sentence: "We run the questions through each assistant's search-enabled interface, set to your location, using a third-party data service; what one customer sees on one day can still differ."
5. **Give the secondary path a real next step.**
   - **Element:** "Prefer to talk first? Email Yilun" (home and check page), and Step 2 "Free tailored preview".
   - **Why:** It is a brief requirement ("a call or the tailored preview"), and buyers already convinced by step 1 have only a generic email.
   - **Smallest fix:**
     - When a scheduling URL exists, change the label to "Prefer to talk first? Book a 20-minute call" (no duration claim beyond what the owner approves).
     - Until then, add a second `mailto:` link under Step 2 with the subject "Tailored preview request".
6. **Restore Open Graph completeness.**
   - **Element:** `openGraph` in `src/app/page.tsx` and `src/app/ai-visibility-check/page.tsx`, which override the layout's `type` and `siteName`.
   - **Why:** Leads will often arrive through shared links, and the previews are currently bare.
   - **Smallest fix:**
     - Spread the shared values (`type: "website"`, `siteName`) into each page's `openGraph`.
     - Add `app/opengraph-image.tsx`, or a static 1200×630 image showing the answer card.
     - Add `image` to the Person node and `logo` to the org.
7. **Thin out the "not X, Y" constructions.**
   - **Element:**
     - "An operator's product leader, not a generalist agency."
     - "Not just whether you show up. Whether AI gets you right."
     - "Visibility tools stop at visibility. Web agencies stop at the website."
   - **Why:** Repeated contrast reads as agency copy, which the audience is primed to distrust.
   - **Smallest fix:** keep "a sample, not a ranking" (it carries method). Rewrite two of the others as plain statements, for example "A product leader from rental and car-buying commerce" and "Whether AI mentions you, and whether it gets you right."

Polish, not ranked: widen the "Type of business" select, or shorten the option labels, so "Tours, activities & experiences" is not cut off at 1440 (`desktop-form-submit.png`).

---

## 7. Strengths to preserve

- **The hero H1 plus the labeled illustrative answer card.** It is the clearest statement of the accuracy thesis, and it is honest.
- **The three sourced and dated statistic cards,** now worded exactly to the sources.
- **The FAQ candor,** especially the new "Don't Google Maps and reviews still matter more? For most local bookings today, yes". It defuses the strongest counterargument in the owner's own terms.
- **The check page's disclosed method** ("It is a sample, not a ranking"). It separates the offer from score-based competitors.
- **The founder trust card beside the form,** with "Every report is reviewed by Yilun Zhang".
- **Form engineering:**
  - honest failure states
  - a prefilled `mailto:` fallback
  - idempotent submission
  - duplicate handling
  - correct focus and ARIA
  - unit tests covering the failure paths
- **The technical baseline:** mobile performance 97–99, accessibility 100, 0 axe violations, no overflow.
- **Founder copy that stays inside the approved public facts** and the verbatim money-back line.

---

## 8. Strongest counterargument and limitations

**Counterargument to the positioning:** "Your customers are asking AI where to book" may still overstate the present for most of these verticals.
- In SparkToro/Datos 2025 US desktop data, AI tools handled 3.2% of search activity, against Google's 73.7%.
- Whitespark found AI Overviews on only 15% of pure local-intent results, against the local pack on 93%.
- Expedia found only 8% of travelers comfortable letting AI book.
- The site's own FAQ concedes that Maps and reviews matter more today. The pitch therefore rests on a trend, which the Pew and Google I/O cards support only partly.
- A second line of attack: the sole proof is a founder who currently leads digital products at Hertz, with no Oakheart sample report or track record. "You work with him directly" invites a capacity question the site does not answer.

**Limitations of this review:**
- Lighthouse ran in the lab against a local server. Core Web Vitals are lab estimates.
- The success state was rendered with a mocked 201, because the local server has no database. Deployed delivery rests on the curl and database evidence in `round-2-e2e.md`, not on my own browser submission.
- Owner email receipt could not be tested because it is not configured.
- No screen-reader pass and no external schema validator.
- LinkedIn returned 999 to curl and was not opened in a browser.
- The deployed build (`a4c79c0`) was compared with HEAD by `git diff --stat` (docs only), not by a byte comparison of the deployed output.
