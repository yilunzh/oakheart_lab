# Website review, round 1

- **Reviewed artifact:** new site slice at the HEAD commit `329727c` ("Build Round 1 slice: homepage and free AI check page")
- **Date:** 2026-10-04
- **Inspection scope:**
  - **Inputs read:** `docs/brief.md`, `docs/review-rubric.md` and `docs/research/phase1-market.md` (the evidence base). I also looked at `docs/decisions.md` (D3, D6) and `docs/execution-plan.md` only to check whether the noindex and the open scheduling URL are intentional.
  - **Rendered output:** `round1/pages.txt`, which holds the text with the FAQ expanded, the titles, meta robots, JSON-LD, links and the scripted form test, for `/` and `/ai-visibility-check`.
  - **Screenshots:** I viewed all 13 PNGs in `round1/`: the full pages at 1440 and 390 for home and check (the full pages were cropped into segments so I could read them), the four `*-fold.png` views, the four `*-form-errors.png` / `*-form-submit.png` views, and `_founder.png`.
  - **Source:** I read all of `src/` (`app/layout.tsx`, `app/page.tsx`, `app/ai-visibility-check/page.tsx`, `app/api/checks/route.ts`, `lib/check-request.ts`, `content/site.ts` and every component).
  - **Live checks against `next start` at http://127.0.0.1:3100:**
    - Lighthouse 12.8.2, mobile, 3 runs per page.
    - axe-core 4 in Playwright Chromium at 1440 and 390, on both pages and on the form error state, with the FAQ expanded.
    - A horizontal-overflow check at both widths.
    - Keyboard tab order through the form.
    - Invalid-input validation.
    - A curl `POST /api/checks`, which returned `503 {"error":"not_connected"}`.
    - `robots.txt` and `sitemap.xml`, which both returned 404.
    - The canonical and og:title tags.
    - The external links: Pew, BrightLocal, Google I/O and oakheartlab.com/about returned 200. LinkedIn returned 999 (bot-blocked) and was not verified in a browser.
  - **Not inspected:**
    - **End-to-end lead delivery:** the backend is deliberately not connected.
    - **Field Core Web Vitals:** no CrUX data exists.
    - **External schema validation:** no external validator was run. I checked the JSON-LD by hand against the visible text.
    - **Screen-reader output:** no screen-reader pass was done.
  - **Noindex:** the pages are intentionally noindex until launch (D6), so noindex is not counted as a defect.

---

## 1. Recovered meaning (from the site only)

1. **Who it is for:** "businesses that move atoms, not bits", which the site spells out as "Businesses where a booking sets real work in motion. Tours, rentals, appointments, classes and stays". Four verticals are named with customer questions: tours and experiences, rentals, home and auto services, classes and wellness.
2. **The problem:** "Your customers are asking AI where to book. Does it get you right?" Three failure modes follow: "AI doesn't mention you", "AI gets your details wrong", "The booking path loses them".
3. **What is offered, the first step and the cost:**
   - Step 1 is a free AI check, delivered in under 24 hours, "Free, as many as you like".
   - Step 2 is a free tailored preview "for qualified businesses".
   - Step 3 is Found, Booked and Supported "as one project", with "one price, agreed up front".
   - Step 4 is optional ongoing work.
   - Also offered: a companion app and staff tools.
   - Risk reversal: "If you're not happy with our service, we'll give your money back, no questions asked."
   - No prices are published.
4. **Why believe it:**
   - Three statistics or facts, each with a source and date (Pew, BrightLocal, Google I/O).
   - A labeled illustrative AI answer.
   - The founder's background (Hertz, Clutch, Rivian, Carvana) and his own quote.
   - Candid FAQ answers ("No one honestly can" guarantee ChatGPT recommendations).
   - A method section on the check page ("It is a sample, not a ranking").
5. **What to do next and the effort:** "Get your free AI check" leads to a form with 5 required fields and 2 optional ones. It takes about a minute. The report arrives within 24 hours. There is **no visible way to book a call or ask for the tailored preview**; the only contact is a mailto "Ask us" and the footer email.

**Divergence from the brief:**
- The secondary CTA (a call or the tailored preview) is missing. This is a finding under dimensions 2 and 4.
- "Moving and storage" and "stays" get no recognizable example. Stays appears only in a list and in the form dropdown.
- Everything else matches the brief: the thesis, the audience framing, the primary CTA, the ladder, the risk reversal, no prices, and the founder facts.

---

## 2. Critical failures and unmet requirements

| # | Requirement (brief or rubric) | Site today | Where |
|---|---|---|---|
| U1 | "Secondary: a call or the tailored preview" (brief, Constraints) | No call CTA or preview-request CTA anywhere. The preview is described ("For qualified businesses, we mock up…") but cannot be requested. The only alternative to the check is `mailto:` "Ask us" after the add-ons line, plus the footer email. The scheduling URL is still open per `decisions.md`. | Home, How it works step 2; home, What we do footnote; the check page has nothing |
| U2 | Conversion gate: the lead is received and the confirmation is accurate | The API returns 503 by design, and the form shows an honest failure message. Delivery cannot be verified. | `src/app/api/checks/route.ts` lines 30–32; `desktop-form-submit.png` / `mobile-form-submit.png` |
| U3 | Rubric dimension 7: "sensible crawler access, sitemap and canonicals" | `/robots.txt` and `/sitemap.xml` return 404. Neither page has `<link rel="canonical">`. The check page inherits the home og:title "Oakheart Lab \| Get found by AI. Get booked." This is acceptable while the pages are noindex, but it is not built yet. | `src/app/layout.tsx` metadata; no `app/robots.ts` or `app/sitemap.ts` |

No fabricated proof, unsourced statistic or guarantee was found, so there is no critical evidence failure.

---

## 3. Per-dimension scores

### 1. Positioning clarity — **8.5 / 10** (weight 15%)
**Evidence for:**
- The H1 "Your customers are asking AI where to book. Does it get you right?" is specific to booking businesses and the AI thesis.
- The sub-copy names ChatGPT, Gemini and Google, and the promise ("find you, describe you correctly, and send people into a booking flow that works, without replacing the booking system you already use") covers Found, Booked and Supported plus the no-migration objection (`desktop-home-fold.png`).
- The labeled answer card (a kayak tour for a 6-year-old, with a "Wrong. Their site says 6+ with an adult" tag) shows the accuracy angle within seconds on desktop.
- The thesis is the same across both pages: the check page H1 "See what AI tells your customers about you" and "Not just whether you show up. Whether AI gets you right."

**Gaps:**
- **The eyebrow carries the audience on its own.** "For businesses that move atoms, not bits" is a phrase, not a self-identifier, and the vertical names first appear one screen down ("Who we help").
- **On mobile, the answer card falls below the fold** (`mobile-home-fold.png` ends at the micro-proof row), so the "gets it wrong" proof is not visible in the first 5 seconds.
- **Two brief verticals get no example question:** moving and storage, and stays.

### 2. Offer and buyer relevance — **8 / 10** (weight 15%)
**Evidence for:**
- The ladder is explicit and in order: Step 1 · Under 24 hours, Step 2 · If it's a fit, Step 3 · You decide, Step 4 · Optional (`desktop-home-2` crop).
- Commitment and risk are clear without prices: "One price, agreed up front… You know the price before we start" and the approved money-back line, used verbatim with no invented window.
- The FAQ answers the buyer's real decisions: "Do I have to switch booking systems? No… FareHarbor, Peek, Checkfront, Mindbody, Vagaro, Square or Housecall Pro"; "Isn't this just SEO?"; "What does it cost?".
- The pillars read as one system: "One team, start to finish… from the AI answer to a confirmed booking and the questions that come after."

**Gaps:**
- **No secondary CTA** (U1). A buyer ready for step 2 or a call has nowhere to click.
- **"Qualified" is undefined.** "For qualified businesses" gives no hint of what qualifies.
- **The homepage FAQ understates what the form asks for.** "For the free check, just your business name, website and location", while the form also requires "Type of business" and "Email for your report".
- **The check page doesn't say what comes after the report** beyond the FAQ "we'll offer to talk". The preview and paid path are invisible to a visitor who lands straight on the check page.

### 3. Credibility and evidence integrity — **8 / 10** (weight 15%)
**Evidence for:**
- All three "What changed" items name a source and a date and link to the primary page, and each link returned 200:
  - Pew is described as "March 2025 browsing data, published Jul 2025", which matches research 1e #1.
  - BrightLocal is dated Feb 2026. The site does not frame the 6%→45% jump, as research 1e #4 asks.
  - Google I/O, May 2026, is attributed to Google ("Google says").
- The illustrative card is labeled "Illustrative example with fictional businesses."
- There is no guarantee: "Can you guarantee ChatGPT will recommend us? No one honestly can."
- The founder copy matches the approved facts. It says "over a decade", not "15+"; it gives no employer metrics, no Fleetbit and no Clutch revenue figure; the quote is his own.
- The method disclosure follows research 2b and 5.3–5.4: "It is a sample, not a ranking. Any tool that gives you a single 'AI rank' is overstating what can be measured."

**Gaps:**
- **"…and more and more often it books them too"** (home, "What changed" intro). This is an unsourced trend claim. The evidence base supports product launches (Google I/O, FareHarbor in ChatGPT), not growing usage. Expedia found only 8% of travelers comfortable letting AI book (research 1a).
- **Pew paraphrase:** "How often people clicked through to a website when Google showed an AI summary". Pew measured clicks on a *traditional search result link* (8%), and a further 1% clicked a link inside the summary. The site's wording slightly overstates the drop. Use Pew's wording.
- **"We work with the system you already run, such as FareHarbor, Peek, Checkfront, Mindbody, Vagaro, Square or Housecall Pro"** reads as proven integrations with seven named platforms. Nothing on the site evidences them. "Built around" or "designed to work with" would be safer until there is a delivered example.
- **The founder link labels don't match their destination.** "Writing on building with AI" (founder block) and "Writing on Substack" (footer) both go to `https://www.oakheartlab.com/about`, which is the Substack *About* page, not a writing index. The same URL is the `sameAs` in the Person JSON-LD. Per `execution-plan.md` §IA, `/about` becomes this site's founder page at domain cutover, so the link and `sameAs` will then point at the site itself.
- **The only proof is the founder; there is no Oakheart artifact.** No sample report exists yet, which is expected at this stage. The check page carries no credibility element at all near the form.

### 4. Conversion path and friction — **7.5 / 10** (weight 15%)
**Evidence for:**
- **The primary CTA appears at every decision point:** the sticky header ("Free AI check" on mobile), the hero, the money-back band, and the dark closing band.
- **The form asks for reasonable fields:** 5 required, 2 optional, with a visible "(optional)" label and a helpful hint ("We compare what AI says against your own site.").
- **Validation is clear and specific:** "Enter your website so we can check what AI says against it."; "Enter a web address like yourbusiness.com."; "Enter a valid email address."
  - The error summary "Please fix the highlighted fields." appears at the top.
  - Focus moves to the first invalid field (Playwright: focused `businessName`, `role="alert"`).
  - `aria-invalid` and `aria-describedby` are wired (`desktop-form-errors.png`, `mobile-form-errors.png`).
- **The 503 state is honest:** "We couldn't submit your request right now, and nothing was saved. Email yilun@oakheartlab.com with your business name and website and we'll run your check." The status gets focus and the entered values are kept (`*-form-submit.png`).
- The success copy in the source ("Request received. Your report will arrive by email within 24 hours.") would not show in the current state, so it is not misleading.
- The honeypot is off-screen, `aria-hidden` and `tabIndex=-1`, and the tab order skips it.

**Gaps:**
- **No secondary path to a call or the preview** (U1).
- **The fallback email in the error message is plain text, not a link** (`check-form.tsx`, where `setMessage` is a string). A mobile user has to copy it by hand, and this is the only route to a lead today.
- **The success state stops at the report.** It doesn't name the sender address, mention the spam folder, or offer the next step (a call or the preview).
- **Nothing near the form answers "who is doing this?"** The check page has no founder line or photo, and it doesn't repeat the money-back or "no sales calls" reassurance.
- **End-to-end delivery is unverified** (by design).

### 5. Copy quality and voice — **8 / 10** (weight 10%)
**Evidence for:**
- The copy is concrete and in the buyer's own words: "Does the pontoon rental include fuel and life jackets?" and "a cancellation policy you changed last year."
- It is calm and practitioner-like: "Mostly, it's good SEO done properly."
- Qualifications sit beside claims: "One answer is an anecdote; repeated runs show a pattern."

**Gaps:**
- **Typo:** "Emerald Paddle Co.. Guided family tours" has a double period. The data name ends in "." and the component adds another (`answer-card.tsx`: `{row.name}.`). It shows in the hero on both widths.
- **Slogan and contrast lines:**
  - "The answer is becoming the storefront."
  - "An operator's product leader, not a generalist agency."
  - "Visibility tools stop at visibility. Web agencies stop at the website."
  These are mild and mostly earned, but the "not X" construction appears twice.
- **"more and more often"** is vague (see dimension 3).
- **"Free, as many as you like"** appears three times. It is approved, but it reads oddly to an owner who needs one check, and "unlimited" could invite abuse questions.

### 6. Visual design and UX craft — **8 / 10** (weight 10%)
**Evidence for:**
- The palette, type scale and section rhythm are consistent.
- The hero visual carries meaning: the Correct and Wrong tags and the dashed "Not mentioned / Your business" row.
- The hierarchy is clear on both pages.
- There is no horizontal overflow at 390 or 1440 (`scrollWidth` equals `clientWidth`).
- The form is comfortable on mobile: full-width 48px inputs (`mobile-check-0`).

**Gaps:**
- **There is no navigation on mobile.** The nav is `hidden … md:flex` with no menu (`site-header.tsx`), so on phones How it works, What we do, About and FAQ are reachable only from the footer (`mobile-home-fold.png`).
- **The hero pill wraps on mobile.** "Wrong. Their site says 6+ with an adult" breaks onto two lines inside a rounded pill (`mobile-home-0` crop, around y = 1220). It is minor and readable.
- **Content shows through the sticky header** (`bg-paper/90`). It is visible behind the logo in `mobile-form-errors.png` and `mobile-form-submit.png`.
- **The check page's desktop left column ends at about y = 545** while the form runs to about y = 945, leaving a large empty area (`desktop-check-fold.png`). That space could hold the trust line from dimension 4.
- **Footer links on mobile sit about 28px apart**, which is tight as tap targets (`mobile-home-6` crop).

### 7. Search and AI discoverability — **6.5 / 10** (weight 10%)
**Evidence for:**
- All facts are server-rendered HTML. The FAQ uses `<details>`, and the answer text is in the DOM.
- The FAQPage JSON-LD on both pages matches the visible Q&A word for word.
- The ProfessionalService and Person `@graph` entries are linked by `@id`.
- The entity description is consistent across the meta description, JSON-LD and footer ("…businesses that move atoms, not bits get found by AI assistants, described correctly, and booked without friction").
- The check page's method section is answer-first and citable.
- Titles are distinct and descriptive.

**Gaps:**
- `robots.txt` and `sitemap.xml` return 404, and no canonical exists (U3).
- The check page's og:title is the home title.
- There is no `Service` or `Offer` markup for the free check.
- The Person schema has no `image` or `description`, and its `sameAs` points to `oakheartlab.com/about`, which collides with the planned cutover.
- ProfessionalService has no `logo` or `image`.
- Noindex is intentional and not scored.

### 8. Technical quality and accessibility — **8 / 10** (weight 10%; end-to-end form sub-criterion **unverified**)
**Evidence:**
- **Lighthouse mobile, median of 3 runs:**

  | Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
  |---|---:|---:|---:|---:|---:|---:|---:|
  | Home | 97 | 100 | 100 | 63 | 2.5 s | 0 | 50 ms |
  | Check | 98 | 100 | 100 | 60 | 2.1 s | 0 | 70 ms |

- **The low SEO scores come only from `is-crawlable`,** that is, the intentional noindex.
- **axe:** 0 violations at 1440 and 390 on both pages, including the form error state. Three "incomplete" color-contrast items are the `aria-hidden` ✓ glyphs, which is not an issue.
- **Keyboard:** the order is skip link, then logo, then header CTA, then form fields in order, then submit, then FAQ summaries. The skip link targets `#main`.
- **Links:** none broken. The anchor `#what-you-get` exists.

**Gaps:**
- **Home LCP sits right at the 2.5 s threshold** on a local server with no CDN. These are lab numbers only; there is no field data.
- **No client-side validation.** If the API is unreachable, the user gets the network error rather than field help. This is minor.
- **End-to-end delivery is unverified.**

---

## 4. Weighted total

| # | Dimension | Weight | Score | Weighted |
|---|---|---:|---:|---:|
| 1 | Positioning clarity | 15 | 8.5 | 1.275 |
| 2 | Offer and buyer relevance | 15 | 8.0 | 1.200 |
| 3 | Credibility and evidence integrity | 15 | 8.0 | 1.200 |
| 4 | Conversion path and friction | 15 | 7.5 | 1.125 |
| 5 | Copy quality and voice | 10 | 8.0 | 0.800 |
| 6 | Visual design and UX craft | 10 | 8.0 | 0.800 |
| 7 | Search and AI discoverability | 10 | 6.5 | 0.650 |
| 8 | Technical quality and accessibility | 10 | 8.0 (end-to-end form unverified) | 0.800 |
| | **Weighted total** | 100 | | **7.85 / 10** |

---

## 5. Gates

| Gate | Result | Reason |
|---|---|---|
| Evidence | **Pass** | No testimonials, logos, results or reviews. Every statistic names a source and date. No ranking or recommendation guarantee ("No one honestly can"). The hero example is labeled fictional. Watch item: "more and more often it books them too" is an unsourced trend claim but not a statistic (fix 3). |
| Conversion | **Unverified** | The API returns 503 by design (`route.ts`: "Until then, never claim a request was received"). The form submits on both widths and shows an accurate failure state, but lead receipt and the success confirmation cannot be tested. |
| Rendering | **Pass** | No defect at 390 or 1440 impairs reading or action. There is no overflow. The minor items (pill wrap, show-through under the sticky header, no mobile nav) do not block anything. |
| Regression | **N/A** | Round 0 reviewed a different artifact (the reference site), so this is the first review of this codebase. |

**Result: not a pass.** The Conversion gate is unverified, and so is the dimension 8 end-to-end sub-criterion.

---

## 6. Prioritized fixes (up to 7)

1. **Add the secondary CTA (call or tailored preview).**
   - **Element:** How it works, step 2 ("Free tailored preview… For qualified businesses"); the closing band; the check page.
   - **Why:** It is a brief requirement. Buyers past step 1 have no path today.
   - **Smallest fix:** add a quiet text link under the primary CTA in the closing band and in step 2, for example "Prefer to talk first? Email Yilun" (`mailto:` with a subject) until the scheduling URL exists, then swap in the URL. Add one line saying what "qualified" means.

2. **Make the failure and success states carry the lead.**
   - **Element:** the 503 message "…Email yilun@oakheartlab.com with your business name and website…" (`check-form.tsx`) and the success panel.
   - **Why:** Today the error state is the only way a lead gets through, and the email is plain text.
   - **Smallest fix:** render the address as a `mailto:` link prefilled with the entered business name, website and location. In the success state, add the sender address, "check spam", and the next step (a call or the preview).

3. **Tighten two evidence paraphrases.**
   - **Element:** "and more and more often it books them too", and the Pew card "How often people clicked through to a website when Google showed an AI summary…".
   - **Why:** The first is unsourced (the evidence shows launches, not adoption, and Expedia found 8% comfortable letting AI book). The second slightly misstates Pew's measure.
   - **Smallest fix:** change the first to "…and some assistants are starting to book them too", which the Google I/O card then supports. Change the second to "How often people clicked a regular search result when Google showed an AI summary, compared with when it didn't."

4. **Make the "what you need from me" answer match the form.**
   - **Element:** home FAQ "For the free check, just your business name, website and location."
   - **Why:** The form also requires type of business and email. The mismatch adds a small trust tax at the decision point.
   - **Smallest fix:** "…your business name, website, location, type of business and an email for the report."

5. **Put trust next to the form.**
   - **Element:** the empty left column under "Free, as many as you like…" on `/ai-visibility-check` (`desktop-check-fold.png`, y ≈ 560–940).
   - **Why:** It answers "who runs this and what happens next?" at the decision point.
   - **Smallest fix:** a small founder line with photo ("Your check is run and reviewed by Yilun Zhang, …"), linking to `/#founder`, plus "No sales call unless you ask."

6. **Fix the founder writing link and the SEO plumbing before launch.**
   - **Element:**
     - "Writing on building with AI" and "Writing on Substack", which both go to `https://www.oakheartlab.com/about`.
     - Person `sameAs`.
     - Missing canonical, robots and sitemap.
     - The check page og:title.
   - **Why:** The labels don't match the destination. That URL becomes this site's own `/about` at cutover. Crawler access and canonicals are rubric items.
   - **Smallest fix:**
     - Point the links and `sameAs` at the Substack archive URL that will survive cutover.
     - Add `app/robots.ts` and `app/sitemap.ts`, gated on `NEXT_PUBLIC_SITE_INDEXABLE`.
     - Add `alternates.canonical` per page.
     - Give the check page its own `openGraph.title`.

7. **Polish: the typo and mobile navigation.**
   - **Element:** "Emerald Paddle Co.." (`answer-card.tsx`, `{row.name}.`), and the header nav hidden below `md` with no menu.
   - **Why:** The visible typo is in the hero, and mobile users cannot reach the FAQ or founder section without scrolling to the footer.
   - **Smallest fix:** drop the trailing "." from the data name or render the separator conditionally. Add a compact mobile nav: a disclosure menu, or a single "FAQ" link next to the CTA.

---

## 7. Strengths to preserve

- **The hero H1 and the labeled illustrative answer card.** They show the accuracy thesis instantly, and the "Illustrative example with fictional businesses" caption is honest.
- **The sourced and dated statistic cards** with primary links. They are the right three figures from research 1e.
- **The FAQ's candor.** "No one honestly can" on guarantees, "Mostly, it's good SEO done properly", and the named booking systems in the no-migration answer.
- **The check page's method section** ("It is a sample, not a ranking"). It distinguishes the offer from the score-based competitors in research 4a.
- **Founder copy that stays exactly inside the approved facts,** with no employer metrics.
- **The money-back line used verbatim,** with no invented window.
- **The honest 503 handling.** It never claims a request was received, it keeps the user's input, and focus management and ARIA are correct.
- **Technical baseline:** Lighthouse mobile performance 97–98, accessibility 100, zero axe violations, no overflow.

---

## 8. Strongest counterargument and limitations

**Counterargument to the positioning:** "Your customers are asking AI where to book" may overstate the present for many of these verticals.
- In SparkToro/Datos 2025 US desktop data, AI tools combined handled 3.2% of search activity, against Google's 73.7%.
- For pure local-intent queries, Whitespark found AI Overviews on only 15% of results, against the local pack on 93%.
- In Expedia's survey, only 8% of travelers are comfortable letting AI book.

For an AC repair shop or a yoga studio, Google Maps and reviews may still decide most bookings. An owner who checks this could read the hero as AI hype, which is the exact skepticism the brief warns about. A second line of attack: the founder currently leads digital products at Hertz, and the site says "You work with him directly". A careful buyer may ask about capacity. With no Oakheart track record or sample report yet, the founder is the only proof.

**Limitations of this review:**
- **Lighthouse ran in the lab** against a local `next start` server: no CDN and no real network. CWV are lab estimates, not field data.
- **No external schema validator was run.** The JSON-LD was checked by hand.
- **No screen-reader pass was done.** Accessibility rests on Lighthouse, axe and a keyboard tab test.
- **Lead delivery, the success-state rendering and email receipt were not exercised.** The backend is not connected, so the Conversion gate is unverified.
- **The LinkedIn link returned 999 to curl** (bot blocking) and was not opened in a browser.
- **Scope:** only the two pages in this slice were judged. Missing secondary pages (privacy, a full about page, guides) are not scored. A privacy link near a form that collects email will be expected before launch.
