# Round 3 review: independent

- **Reviewed artifact:** HEAD commit of /home/user/oakheart_lab = `ce539eb` ("Round 3 browser e2e evidence against deployed API"). Its only changes over `9c91fb5` are in docs. The deployed site at https://oakheart-lab.vercel.app serves the round-3 content (confirmed by curl: "third-party data service", "Ask about a tailored preview", "fast-growing place", "A product leader from businesses").
- **Date:** 2026-10-04
- **Inspection scope:**
  - **Brief and rubric:** `docs/brief.md`, `docs/review-rubric.md`.
  - **Evidence base:** `docs/research/phase1-market.md`. The domain and notification decisions in `docs/decisions.md` were consulted.
  - **Prior findings:** `prior-findings.md` from the round-3 scratchpad.
  - **End-to-end files:** `docs/reviews/round-2-e2e.md` and `round-3-e2e.md`. No other review files were opened.
  - **Rendered text, metadata, JSON-LD and links:** `pages.txt`.
  - **Supplied screenshots (all 14):**
    - Full page and fold at 390 and 1440, for both pages.
    - Form-error and form-submit states at 390 and 1440.
    - `e2e-mobile-success.png` and `e2e-desktop-success.png`.
  - **Source:** all of `src/`, `tests/` and `vercel.json`. `pnpm test`: 13/13 pass.
  - **Local production build** (http://127.0.0.1:3100):
    - Playwright at 320, 390, 1024 and 1440: overflow, axe-core 4 (WCAG 2.0/2.1/2.2 A/AA plus best-practice), keyboard tab order, mobile menu, anchor targets, and a measurement of the check-page grid gap, including a live test of the proposed fix.
    - Lighthouse 12: mobile, 3 runs per page; desktop, 1 run per page.
  - **Deployed site:** curl only, for status codes, meta tags, robots, sitemap, OG image and cron auth. No submission was made to the deployed API.
  - **External links:** curl.

---

## 1. Recovered meaning (from the site only)

1. **Who it is for.**
   - "For businesses that move atoms, not bits" (hero eyebrow).
   - Made concrete by the six vertical cards: tours and experiences, rentals, home and auto services, classes and wellness, stays and hospitality, moving and storage.
   - Also: "Tours, rentals, appointments, classes and stays: people, equipment, rooms and time slots have to line up."
   - Matches the brief's audience.
2. **The problem.**
   - Customers ask AI assistants where to book. The assistants either leave you out or get your operational details wrong ("Wrong age limit, old prices, a cancellation policy you changed last year").
   - Then the booking path loses the visitor.
   - Matches the brief's thesis, including "complex offers are hurt most".
3. **What is offered, the first step and its cost.**
   - **First step:** a free AI Visibility Check: "Report in under 24 hours · Free, as many as you like · No obligation".
   - **Then:** a free tailored preview "if your check shows clear fixes we can help with".
   - **Then:** one Found → Booked → Supported project at "one price, agreed up front".
   - **Then:** optional ongoing work. The mobile app and staff tools are listed as "Also available".
   - **No prices.** The money-back line appears verbatim.
   - Matches the brief.
4. **Why believe it.**
   - Three sourced and dated cards: Pew, BrightLocal, Google I/O.
   - A labeled illustrative answer card.
   - A founder with relevant, public, unquantified experience (Hertz, Clutch, Rivian, Carvana).
   - A disclosed method ("a sample, not a ranking").
   - Candid FAQs ("Can you guarantee ChatGPT will recommend us? No one honestly can.").
   - There are no client results; the site claims none.
5. **What to do next, and the effort.**
   - Click "Get your free AI check".
   - Fill 5 required fields (name, website, area, type, email) and 2 optional ones.
   - Expect a report by email within 24 hours.
   - Secondary paths: "Prefer to talk first? Email Yilun" and "Ask about a tailored preview" (both `mailto:`).

**Divergence from the brief:** none in meaning. The brief allows the secondary CTA to be "a call or the tailored preview". The preview request now exists, but the call option does not; the scheduling URL is still an open owner decision. This is minor.

---

## 2. Critical failures and unmet requirements

- **No critical content, evidence or rendering failure.**
- **Unmet: the lead does not yet reach its destination (owner email).**
  - Per D8, the destination is `yilun@oakheartlab.com`.
  - `round-3-e2e.md` reads: "`RESEND_API_KEY` is not set yet … `notified_at` is null on all test rows", and "Pending: a real owner-email receipt".
  - Leads are stored in Neon: both browser submissions returned `201`, and both rows were read back. No person is alerted, though.
  - Meanwhile the success panel promises "Your report will arrive within 24 hours from yilun@oakheartlab.com" (`e2e-mobile-success.png`, top; `e2e-desktop-success.png`, right panel).
  - This is the sole reason the Conversion gate fails.
- **Residual design risk in the new fallback** (`vercel.json`, `src/lib/notify-pending.ts`, `src/lib/notify.ts`). The daily cron is a real improvement, but:
  - It runs once a day, at 13:00 UTC. A lead whose instant email fails at 13:05 UTC is first retried about 24 hours later, after the promised report deadline. The fallback cannot by itself keep the 24-hour promise.
  - `resendNotifier` returns `false` without logging, both on a non-OK response and in its `catch`. A misconfigured `NOTIFY_FROM` domain or a rejected key would fail silently on every lead, including every cron retry, and would leave no trace in the Vercel logs.

---

## 3. Closure check against the round-2 findings

| # | Prior finding | Status | Evidence |
|---|---|---|---|
| 1 | Make lead delivery reach a person | **Partly closed** | **Done:**<br>• Daily retry cron added (`vercel.json`; `/api/cron/notify-pending` returns 401 without the secret, confirmed by curl on the deployed site).<br>• `listUnnotified` and `markNotified` added, with tests.<br>• Real browser submissions at 390 and 1440 returned `201` from the deployed API, and the DB rows were read back (`round-3-e2e.md`).<br>**Still open:** `RESEND_API_KEY` is unset and no owner-email receipt is recorded. See also the timing and silent-failure gaps in §2. |
| 2 | First form field above the fold on mobile | **Closed** | At 390 the first field ("Business name") sits at y = 447 (Playwright), and the field is visible in `mobile-check-fold.png` at y ≈ 430–495. The founder card now follows the submit button (`mobile-check.png`). **New side effect:** a desktop gap (see Dimension 6 and Fix 2). |
| 3 | Soften "fastest-growing" | **Closed** | Now reads "AI answers are a fast-growing place where those facts get repeated…" (home FAQ, `pages.txt`). |
| 4 | Disclose how the check queries assistants | **Closed** | "We collect answers through a third-party data service set to your location, so what one customer sees on their own phone can differ." (check page, "How we run it"). The provider (DataForSEO, D9) is not named. Research §6.3 recommends naming it. This is optional polish. |
| 5 | Give the secondary path a real next step | **Partly closed** | "Ask about a tailored preview" now sits under Step 2, as a `mailto:` with subject "Tailored preview request" and a body template (`pages.txt`, links). A call option is still absent, pending a scheduling URL (decisions.md: "Still open: … scheduling URL for calls"). |
| 6 | Open Graph completeness | **Partly closed** | **In code:**<br>• `type`, `siteName`, `twitter:card summary_large_image`, a 1200×630 `opengraph-image` and alt text are now present on the deployed HTML (curl).<br>• The Person `image` and org `logo` were added (JSON-LD in `pages.txt`).<br>**In practice:**<br>• `site.url` defaults to `https://www.oakheartlab.com`, which today is served by Substack (`x-served-by: Substack`).<br>• `og:image` resolves to `https://www.oakheartlab.com/opengraph-image?…`, which returns **404**. So do `…/icon` and `…/images/yilun-zhang.jpg`, both referenced in the JSON-LD.<br>• Any link shared from the preview therefore still unfurls without an image. |
| 7 | Thin out "not X, Y" constructions | **Closed** | • "An operator's product leader, not a generalist agency" → "A product leader from businesses that move atoms."<br>• "Not just whether you show up…" → "Whether you show up, and whether AI gets you right."<br>• "Visibility tools stop at visibility. Web agencies stop at the website." remains. The fix asked for two of the three to be rewritten, so this is acceptable. |
| — | Polish: select truncation at 1440 | **Closed** | "Tours, activities & experiences" is fully visible in `desktop-form-submit.png` (select at y ≈ 620–668). |

---

## 4. Per-dimension scores

### 1. Positioning clarity: **9** (weight 15%)
- **Hero** (`desktop-home-fold.png`, `mobile-home-fold.png`). The H1 is "More of your customers are asking AI where to book. Does it get you right?". The subhead names the assistants and the booking-system reassurance.
- **The illustrative answer card** shows the accuracy thesis visually at 1440 ("Wrong. Their site says 6+ with an adult"; "Not mentioned · Your business").
- **One thesis on both pages.** The check page's H1 is "See what AI tells your customers about you". Its "Are your details right?" card restates the accuracy angle.
- **Small gap:** the eyebrow "For businesses that move atoms, not bits" is founder shorthand. A kayak operator may not self-identify with it within 5 seconds. The vertical cards lower down do that job instead (`desktop-home.png`, "Who we help").

### 2. Offer and buyer relevance: **8.5** (weight 15%)
- **The ladder is clear without prices.** The four steps are "Free AI check / Free tailored preview / One price, agreed up front / Ongoing, if you want it". The verbatim money-back line sits directly under them (`desktop-home.png`, How it works band).
- **It speaks to the buyer's real decisions:** "Do I have to switch booking systems? No… FareHarbor, Peek, Mindbody, Square", and "What do you need from me?".
- **The pillars read as one system:** "Found, booked, supported. One team, start to finish."
- **Deductions:**
  - No call option yet (brief: "Secondary: a call or the tailored preview").
  - The preview is gated only by "if your check shows clear fixes we can help with", with no indication of who qualifies or how long it takes. That is acceptable under the brief, but thin for a buyer weighing step 2.

### 3. Credibility and evidence integrity: **8.5** (weight 15%)
- **Every statistic has a named source and date, and matches the research:**
  - "8% vs 15% … Pew Research Center, March 2025 browsing data, published Jul 2025" matches research §1b.
  - "45% … BrightLocal Local Consumer Review Survey, Feb 2026" matches §1a.
  - The Google I/O, May 2026 claim matches §1c.
- **All three source links return 200.**
- **The concept is labeled:** "Illustrative example with fictional businesses."
- **Founder copy stays within the approved public facts:** "over a decade", "moving atoms, not bits", Hertz/Clutch/Rivian/Carvana roles, the verbatim belief quote, no metrics. The Not-approved list (15+ years, Fleetbit, the Clutch revenue figure) is absent.
- **No endorsements or logos.**
- **Deductions:**
  - The only proof is the founder. There is no sample report, even a labeled synthetic one, to show what "plain-language report" means.
  - The data provider is unnamed ("a third-party data service").
  - BrightLocal sells AI-visibility tools (research ⚠VI) and is not flagged as such. The brief does not require that, so this is noted, not penalized.

### 4. Conversion path and friction: **8** (weight 15%)
- **One primary action** ("Get your free AI check") appears in the header, the hero, after How it works, and in the closing band (`desktop-home.png`). It is also in the mobile header (`mobile-home-fold.png`).
- **The form asks only what it needs.** Five required fields, each with a stated reason ("We compare what AI says against your own site"). The first field is above the fold at 390 (`mobile-check-fold.png`).
- **Error states are clear:**
  - A summary, per-field messages, and focus moved to the first invalid field (`mobile-form-errors.png`, `desktop-form-errors.png`; Playwright confirmed focus on `businessName`).
  - The honest failure state with a prefilled `mailto:` appears in `mobile-form-submit.png` and `desktop-form-submit.png`.
- **Success copy states the next steps:** the sender address, a spam-folder note, "reply to the report", "no sales call" (`e2e-*-success.png`).
- **Objections are answered next to the form:** "Every report is reviewed by Yilun Zhang… No sales call unless you ask."
- **Deduction:** the confirmation's 24-hour promise is not yet backed by owner notification (§2). This is the one substantive defect in the path.

### 5. Copy quality and voice: **8.5** (weight 10%)
- **Concrete, buyer-language specifics:**
  - "Does the pontoon rental include fuel and life jackets?"
  - "Which cabins near Asheville allow two dogs?"
  - "a cancellation policy you changed last year"
- **Qualifications sit beside claims:**
  - "For most local bookings today, yes, and we treat them that way."
  - "It is a sample, not a ranking."
- **Remaining agency cadence:**
  - "Visibility tools stop at visibility. Web agencies stop at the website."
  - "One team, start to finish."
  - "The answer is becoming the storefront."
- **One absolute in the hero subhead:** "ChatGPT, Gemini and Google now answer 'who should I book?' before anyone visits your site". The site's own Maps FAQ and the research counterweights (SparkToro 3.2%, Whitespark 15%) say this is true for some customers, not all.

### 6. Visual design and UX craft: **8** (weight 10%)
- **Consistent, calm system:** warm paper background, one accent, mono eyebrows. Hierarchy is clear, and the answer card carries the thesis rather than decorating.
- **Mobile layout is clean:** no overflow at 320 or 390. The menu opens as a full-width sheet with 44px+ rows (Playwright `menu390.png`).
- **New defect, check page at ≥ 1024 px:** a large empty band in the left column between the intro paragraph and the bullet list.
  - **Size:** 195px at 1440 when idle, rising to 297px when the error state lengthens the form. At 1024 it is 143px, rising to 245px.
  - **Where to see it:** `desktop-check-fold.png`, y ≈ 390–590; `desktop-form-errors.png`, y ≈ 390–690.
  - **Cause:** the form spans two auto-sized grid rows (`lg:row-span-2`), so its extra height is shared into row 1.
  - **Impact:** it reads as broken on the primary conversion page at desktop, and it pushes the founder card below the fold.
  - **Verified fix:** setting `grid-template-rows: auto 1fr` reduced the gap to the intended 24px in both states.
- **Minor:** after a failed submit at 390, the scroll position leaves the page eyebrow clipped under the sticky header (`mobile-form-errors.png`, y ≈ 65). This is cosmetic.

### 7. Search and AI discoverability: **8** (weight 10%)
- **All facts are server-rendered HTML.** The FAQ answers are in the DOM, and the visible text matches the FAQPage JSON-LD on both pages (`pages.txt`).
- **Schema covers the entities:**
  - ProfessionalService + Person graph with `@id` links, `founder` / `worksFor`, and `sameAs` (LinkedIn, Substack).
  - The entity description matches the meta description.
- **Indexing controls are deliberate:** canonicals are set; the sitemap lists both pages; robots is `Disallow: /` while noindex is on. Lighthouse SEO is 69 only because of `is-crawlable`, as intended.
- **Deductions:**
  - Every absolute URL (canonical, `og:url`, `og:image`, JSON-LD `url` / `logo` / `image`, and the sitemap `<loc>`s) points to `www.oakheartlab.com`, which currently serves the Substack. The logo, image and OG image return 404 there. This is harmless for indexing while the site is noindex, but it defeats link previews now.
  - **Cutover hazard:** `site.substack` (`https://yilunzh.substack.com/`) currently redirects to `https://www.oakheartlab.com/`. After DNS cutover, the "Writing on Substack" / "Writing on building with AI" links and the Person `sameAs` will loop back to this site, unless Substack's custom domain is moved first.
  - Answer-first passages exist in the FAQs. There is no standalone "What is an AI Visibility Check" definitional sentence near the top of the check page.

### 8. Technical quality and accessibility: **8.5** (weight 10%)
- **Lighthouse, mobile, local production build, 3 runs each:**
  - Home: performance 96 / 97 / 98 (median **97**); LCP 2.53 / 2.50 / 2.49 s; CLS 0; TBT 42–118 ms.
  - Check page: performance 98 / 98 / 98 (median **98**); LCP 2.36–2.38 s; CLS 0.
  - Accessibility 100 and Best Practices 100 on all runs.
  - Desktop: 100 / 100 / 100 on both pages.
- **axe-core:** 0 violations at 320, 390, 1024 and 1440 on both pages.
- **Keyboard:** the tab order is logical (skip link → logo → CTA → menu → fields in order → submit → founder links). The honeypot is skipped.
- **Links:**
  - No broken internal links; all anchor targets exist (`how-it-works`, `system`, `founder`, `faq`, `what-you-get`, `main`).
  - External sources return 200. LinkedIn returns 999 to curl, which is bot-blocking and unverified.
- **Tests:** 13/13 pass, including the new cron-retry tests.
- **Deductions:**
  - "Form works end to end" holds to the database, not to the owner's inbox.
  - Notification failures are not logged (§2).
  - Home mobile LCP sits right at the 2.5 s "good" threshold. Its LCP element is the hero paragraph, which waits on the web font.

**Weighted total** = (9 + 8.5 + 8.5 + 8) × 0.15 + (8.5 + 8 + 8 + 8.5) × 0.10 = 5.10 + 3.30 = **8.40 / 10**

---

## 5. Gates

| Gate | Result | Reason |
|---|---|---|
| **Evidence** | **Pass** | • No testimonials, logos, results or reviews.<br>• All three statistics are named and dated, and match `phase1-market.md`.<br>• "Can you guarantee ChatGPT will recommend us? No one honestly can."<br>• The illustrative card is labeled. |
| **Conversion** | **Fail** | **Met:**<br>• Submits on mobile and desktop: real browser submissions at 390 and 1440 got `201` from the deployed API (`round-3-e2e.md`; `e2e-*-success.png`).<br>• The confirmation renders correctly.<br>**Not met:**<br>• "The lead is received at its destination." The destination is the owner's inbox (D8). The recorded evidence says the email is **not** sent (`notified_at` null; key unset), and no receipt is recorded.<br>• "The confirmation is accurate." Its 24-hour promise therefore depends on the owner manually querying Neon.<br>**To pass:** the gate passes with one recorded owner-email receipt from a real browser submission, plus a fallback whose timing fits within 24 hours. |
| **Rendering** | **Pass** | • No overflow at 320, 390, 1024 or 1440. No truncation.<br>• The desktop check-page gap (Dimension 6) is a visible craft defect, but it does not block reading or action: the form is fully visible at the top right in `desktop-check-fold.png`. |
| **Regression** | **Pass** | Everything listed as a strength in round 2 is intact:<br>• Hero plus labeled answer card; the three sourced cards; FAQ candor.<br>• The founder card still sits beside the form at desktop and directly under the submit button at mobile, as recommended.<br>• Form engineering, with tests up from the previous count to 13.<br>• Performance ≥ 96, accessibility 100, axe 0.<br>• Founder facts within approval.<br>The desktop gap is a new defect introduced by the mobile reorder, not the loss of a noted strength. It is scored under Dimension 6. |

**Result: not a pass.** The Conversion gate fails.

---

## 6. Prioritized fixes (up to 7)

1. **Close the lead-to-inbox loop, and make the fallback fit the 24-hour promise.**
   - **Element:** `RESEND_API_KEY` and `NOTIFY_FROM` in Vercel; `vercel.json` cron `"0 13 * * *"`; `src/lib/notify.ts` (silent `return false` on both failure branches).
   - **Why:** this is the only failing gate. Also, a daily retry can put the first alert at up to ~24 hours after submission, which is too late for a 24-hour report.
   - **Smallest fix:**
     - Set the key and a verified `NOTIFY_FROM` domain.
     - Add `console.error` with the Resend status and body on failure, so failures appear in Vercel logs.
     - Run the cron more often if the plan allows (for example every 2–4 hours). If it does not, have the daily run also email a digest of all `status='new'` leads from the last 24 hours, so a broken instant path is visible by the next morning.
     - Record one real browser submission on the deployed site with the received email in the e2e file.
2. **Remove the empty band on the check page at desktop.**
   - **Element:** the `<section>` in `src/app/ai-visibility-check/page.tsx`, line 39, `className="mx-auto grid … lg:grid-cols-[1fr_1fr] …"`. Visible in `desktop-check-fold.png` at y ≈ 390–590.
   - **Why:** the primary conversion page looks broken at desktop, and the founder trust card is pushed below the fold.
   - **Smallest fix:** add `lg:grid-rows-[auto_1fr]` to that section. Tested live in Playwright: the gap goes from 195px (297px with errors) to 24px.
3. **Point preview metadata at a host that serves it.**
   - **Element:** `site.url` in `src/content/site.ts` (default `https://www.oakheartlab.com`), plus the `og:image`, canonical, JSON-LD and sitemap URLs derived from it.
   - **Why:** before cutover that host is Substack. `og:image`, `/icon` and the founder image all return 404 there, so round-2 fix 6 has no effect on any link shared now.
   - **Smallest fix:** set `NEXT_PUBLIC_SITE_URL=https://oakheart-lab.vercel.app` on the Vercel environment until DNS cutover, and switch it at launch.
4. **Add a cutover checklist item for the Substack links.**
   - **Element:** `site.substack = "https://yilunzh.substack.com/"`, used in the founder section ("Writing on building with AI"), the footer ("Writing on Substack") and the Person `sameAs`.
   - **Why:** that URL redirects to `www.oakheartlab.com`. Once the domain points at this site, those links will loop back to the homepage and the `sameAs` will be self-referential.
   - **Smallest fix:** before cutover, move the Substack to a subdomain (for example `writing.oakheartlab.com`) or back to `yilunzh.substack.com`, and update `site.substack`.
5. **Show what a report looks like.**
   - **Element:** the check page "What your report covers" section.
   - **Why:** the founder is currently the only proof. A visual of one labeled sample finding would make "plain-language report" concrete and answer "is this a canned audit?". The decisions log already lists a named sample report as open.
   - **Smallest fix:** one mocked report row, styled like the hero answer card and labeled "Sample with a fictional business", for example "Asked 5×: mentioned 1/5 · Age limit stated as 12+ (your site: 6+) · Cited source: Tripadvisor listing".
6. **Qualify the hero subhead's absolute.**
   - **Element:** "ChatGPT, Gemini and Google now answer 'who should I book?' before anyone visits your site."
   - **Why:** the site's own FAQ concedes that Maps and reviews matter more for most local bookings, and the research counterweights (SparkToro 3.2%, Whitespark 15%) make "anyone" overreach for a skeptical buyer.
   - **Smallest fix:** "…now answer 'who should I book?', often before a customer ever visits your site."
7. **Retire the last contrast pair.**
   - **Element:** "Visibility tools stop at visibility. Web agencies stop at the website."
   - **Why:** this is the remaining agency cadence, aimed at an audience primed to distrust agencies.
   - **Smallest fix:** "We handle the whole path, from the AI answer to a confirmed booking and the questions that come after." Merge it with the existing following sentence.

**Polish, not ranked:**
- Name DataForSEO in "How we run it" (research §6.3).
- Add `scroll-margin-top` to form fields so the sticky header does not cover content after error focus (`mobile-form-errors.png`).
- Add a call option once a scheduling URL exists.

---

## 7. Strengths to preserve

- **The hero H1 with the labeled illustrative answer card.** It is still the clearest and most honest expression of the accuracy thesis.
- **The three sourced and dated stat cards,** worded exactly to the research.
- **The candid FAQs,** especially "Don't Google Maps and reviews still matter more? For most local bookings today, yes" and "No one honestly can."
- **The new method disclosure:** "third-party data service set to your location… It is a sample, not a ranking."
- **The mobile check page order:** H1, one line, then the form, with the founder card directly after submit.
- **Form engineering:**
  - honest failure states with a prefilled `mailto:`
  - idempotency and duplicate handling
  - focus management and ARIA
  - a honeypot
  - 13 passing tests
  - the new auth-protected retry cron
- **The technical baseline:** mobile performance 97–98 (medians), accessibility 100, 0 axe violations, no overflow from 320 to 1440.
- **Founder copy strictly within the approved public facts,** and the verbatim money-back line.

---

## 8. Strongest counterargument and limitations

**Counterargument to the positioning.** The pitch is built on a trend that is real but still minor for most of these buyers today.
- On US desktop, AI tools handle about 3.2% of search activity, against Google's 73.7% (SparkToro/Datos).
- AI Overviews appear on about 15% of pure local-intent results, against the local pack's 93% (Whitespark).
- Only 8% of travelers are comfortable letting AI book (Expedia).
- A skeptical operator could reasonably conclude that the free check is interesting but the paid project should start with Google Business Profile and the booking flow, which is in effect what "Found" and "Booked" deliver anyway.
- A second line of attack: the founder "leads digital products for Hertz's global rental business" today, and the site says "You work with him directly". That invites an unanswered capacity question: who does the work, and how fast?

**Limitations of this review:**
- **Lab conditions.** Lighthouse and axe ran against a local production build, not the deployed CDN. Core Web Vitals are lab estimates.
- **Success state.** I did not submit to the deployed API. The success state rests on `round-3-e2e.md` and its screenshots.
  - That file says the request was "forwarded unchanged" to the deployed endpoint. The handler returns 403 for a foreign `Origin`, so the `Origin` header was probably dropped or rewritten for the `201` to occur.
  - This does not change the conclusion. Same-origin acceptance on the deployed page itself was covered by curl in round 2.
- **Owner email.** Receipt could not be tested; it is not configured.
- **Not done:** no screen-reader pass, no external schema validator.
- **LinkedIn** returned 999 to curl and was not opened in a browser.
