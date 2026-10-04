# Website review, round 0

- **Reviewed artifact:** reference site (branch `codex/import-oakheart-site-v19`, source commit `2bff014`)
- **Date:** 2026-10-04
- **Inspection scope:**
  - Inspected: the brief (`docs/brief.md`), the rubric (`docs/review-rubric.md`), and the rendered text, titles, meta robots, JSON-LD and links captured from a local run on 2026-10-04 (`pages.txt`) for `/`, `/services`, `/about`, `/contact`, `/guides`, `/insights`, `/work/booking-flow`, `/privacy` and a 404 probe at `/approach`. I looked at the 1440px and 390px screenshots of home, contact and services in full (mobile shots cropped into segments), and at the desktop shots of about, guides, insights, work/booking-flow, privacy and the 404. I read the source on the branch without checking it out: `app/layout.tsx`, `app/contact/page.tsx`, `app/services/page.tsx`, `components/inquiry-form.tsx`, `app/api/inquiries/route.ts`, `components/site.tsx` and `components/engagement-process.tsx`. I also grepped the featured article for statistics and listed the files to look for robots and sitemap files.
  - Not inspected: Lighthouse, axe, a schema validator and a live form submission were not run. The article `/insights/the-bigger-opportunity-for-ai` was not in the capture; I checked only its source for statistics. Earlier internal reviews in `ops/` were deliberately not read.
  - Robots/noindex is judged as configured in the captured metadata.

---

## 1. Recovered meaning (from the site only)

1. **Who it is for:** "businesses that move the physical world" / "coordinate people, physical assets, and service delivery". The size is left open on purpose: "businesses of every size" (home hero), "From growing companies to midmarket and enterprise organizations" (services hero), "from growing businesses to complex enterprises" (about hero). The site never names consumer-facing businesses or the brief's verticals (rentals, experiences, appointments, stays, fitness, moving).
2. **The problem it addresses:** handoffs between the customer experience and operations. Home: "When serving a customer requires people, physical assets, and systems to work together, the experience depends on every handoff." No page mentions customers asking AI assistants where to go and what to book. AI search shows up only as one included feature ("Conversion, SEO, and AI-search foundations included").
3. **What is offered, first step and cost:** websites, customer apps and operational tools. The first step is a **free tailored website preview** "for qualified businesses", then "one price to complete, connect, and launch". Apps, staff tools and AI support are "optional projects with their own price". No price is published. There is no AI Visibility Check, no 24-hour turnaround and no money-back promise.
4. **Why believe it:** the founder's employer history ("buying at Carvana, purchase and delivery at Rivian, and digital product leadership at Clutch and Hertz", /about), plus a process that is careful and visibly measured (/guides, /work/booking-flow). There are no results, figures or samples.
5. **What to do next and the effort:** "Get your free website preview" leads to /contact, a four-field form (name, work email, optional website, required free-text message of at least 10 characters). After that comes "a short conversation about your project and preview timing", and then the preview. That is moderate effort, and it takes several steps before the visitor receives anything.

**Divergence from the brief (dimension 1 findings):** the primary CTA is wrong (preview instead of the AI Visibility Check). The core thesis (AI assistants decide where customers go) is missing. The audience is widened to every size including enterprise, and is not tied to consumer-facing businesses. The offer is framed as "websites, customer apps, and operational tools" rather than Found → Booked → Supported. Risk reversal and ongoing monitoring are missing.

---

## 2. Critical failures and unmet requirements

| # | Brief requirement | Site today | Where |
|---|---|---|---|
| C1 | Primary CTA: free AI Visibility Check, delivered in under 24 hours | Not present on any page. Every CTA is the website preview: "Get your free website preview", "Free preview", "Request a free preview" | All pages: nav button, hero, closing band; /contact H1 "See what's possible for your business." |
| C2 | Thesis: customers ask ChatGPT, Gemini, Perplexity and AI Overviews; complex offers suffer most | Absent. The thesis is customer experience plus operations handoffs | Home "BUILT ON OPERATIONAL EXPERIENCE"; /about "Digital promises. Physical delivery." |
| C3 | Audience: owners and operators of consumer-facing, operationally intensive businesses; busy, not technical | "businesses of every size", "midmarket and enterprise organizations", "complex enterprises" | Home hero body; /services hero; /about hero |
| C4 | Core engagement: Found → Booked → Supported | Restructured as "Win the customer / Deliver the service / Bring them back" and "Get found / Get chosen / Get booked". "Supported" (self-service and AI support with handoff) is pushed down to an optional add-on | /services "One connected customer experience." and "A PLACE TO START" |
| C5 | Risk reversal: "If you're not happy with our service, we'll give your money back, no questions asked." | Absent. The only risk language is "No obligation to buy" for the free preview | All pages |
| C6 | Ongoing: visibility monitoring, content, booking improvements, support | Only "Continued maintenance and improvement are available" inside a collapsed FAQ answer | /services FAQ "What happens after launch?" (source) |
| C7 | Approved founder facts (Hertz $300M+, app revenue to $1B+, 70% AI deflection, Rivian +$1,500 per vehicle, Carvana 20M+ pageviews, Fleetbit, 15+ years, Atlanta, LinkedIn) | Only employer names appear. No results, no title, no LinkedIn link, no location | /about "The experience behind the approach." |
| C8 | Discoverability for an AI-visibility firm | `noindex, nofollow` on every page, `JSON-LD: none` on every page, no `robots`/`sitemap` route in `app/` | `pages.txt` ROBOTS/JSON-LD lines; `app/layout.tsx` `robots: { index: false, follow: false }` |

---

## 3. Dimension scores

### 1. Positioning clarity (15%): **3 / 10**
- The hero is generic and could fit any CX agency: "A better customer experience. A business that runs better." (home H1, desktop-home.png top left). A rental or tour operator would not recognise their own problem within 5 seconds.
- The eyebrow "FOR BUSINESSES THAT MOVE THE PHYSICAL WORLD" is the closest the site gets to the brief's audience. It is undercut immediately by "for businesses of every size" (home hero body) and "midmarket and enterprise organizations" (/services hero).
- The thesis is consistent across pages, but it is the wrong one. Every page repeats "Connect the customer experience. Coordinate the work behind it." (services H1, footer tagline). The AI-assistant thesis does not appear.
- Credit: the site is internally coherent. One idea runs through home, services, about and approach.

### 2. Offer and buyer relevance (15%): **3 / 10**
- The first step is the free tailored preview, which in the brief is the secondary offer. The primary free AI Visibility Check is missing (C1).
- The ladder that does exist is clear: preview, then "one price to complete, connect, and launch", then optional add-ons with "their own price" (home "WHEN YOUR BUSINESS NEEDS MORE"; /services "Price and timing?" paragraph). It respects "No prices on the site."
- The pillars do not read as the brief's single Found → Booked → Supported system. "Supported" appears as a separate optional "AI customer support" card (C4).
- There is no risk reversal (C5) and no ongoing monitoring tier (C6).
- "For qualified businesses" appears 8+ times with no criteria anywhere, which is friction for a skeptical buyer (home hero caption, /contact caption "For qualified businesses considering a website project.").
- Buyer language is partly right. "Do I need to replace my booking system?" (/services FAQ) and "Customers choose, then lose context" (/guides) answer real operator decisions.

### 3. Credibility and evidence integrity (15%): **5 / 10**
- **Integrity is good.** There are no testimonials, logos, client results or statistics. Concepts are labeled ("Simulated steps are clearly marked.", home preview card 02; FAQ "Simulated steps are marked."). Guarantees are explicitly disclaimed: "rankings and recommendations cannot be guaranteed" (/services FAQ "How will we know it's working?", source).
- **Evidence is thin.** The only proof is one sentence of employer names on /about. None of the approved, highly relevant results are used: Hertz contact rate −50% and an AI agent deflecting 70% of inquiries (directly relevant to "Supported"), $300M+ from simpler journeys and upsell (relevant to "Booked"), Carvana's homepage, search and listings at 20M+ pageviews per month (relevant to "Found").
- "buying at Carvana" (/about) understates the approved fact (Lead PM Merchandising: homepage, search and listings) and is vague. It is not inflated.
- Fleetbit, 15+ years, Atlanta and the LinkedIn URL are missing, so a skeptical visitor cannot verify the founder.
- Home "The experience behind Oakheart Lab" points to /about, which has no more substance than the home teaser.

### 4. Conversion path and friction (15%): **5 / 10**
- **Strengths:** one CTA is visible at every decision point (persistent nav "Free preview" button, hero button, closing band on every content page; desktop-home.png, mobile-home.png). The form is short: name, email, optional website and message (desktop-contact.png right column). It has labeled fields, a privacy note beside the button, a client-side `role="alert"` error, a server-side retry-safe request ID, and an honest confirmation: "Your preview request has been saved… No preview slot or paid project is confirmed yet." plus "This form doesn't send an automatic confirmation email." (`components/inquiry-form.tsx`). The next step is explicit: "We'll email to arrange a short conversation about your project and preview timing." (/contact).
- **Gaps:**
  - The CTA is the wrong action (C1).
  - The form makes **Business website optional**, which is the one field a visibility check needs. It also requires a free-text essay ("What does your business do, and what would you like your website or booking process to do better?"), which is effort for a busy, non-technical owner.
  - The visitor gets nothing tangible from the first submission. A call has to be arranged first.
  - No refund or risk reversal sits near the decision. "Qualified" is undefined.
  - At 390px the form starts roughly 900px down the page, below the bullet list and the email block (mobile-contact.png, form heading at ~y=945), so a mobile visitor has to scroll past copy to act.
  - Leads are written only to the database (`app/api/inquiries/route.ts`). The code has no email or other notification to the owner, so "the lead is received at its destination" depends on someone checking the database.
- Live submission was not tested. Behavior is assessed from source only.

### 5. Copy quality and voice (10%): **6 / 10**
- **Strengths:** calm and practitioner-like where it is specific. /guides is the best writing on the site: "Replacement is a separate decision. Consider it when a required capability cannot be supported safely by the current system—not simply because a new interface looks better." and "More inquiries aren't necessarily better if they are a poor fit or cannot be served." Qualifications sit beside claims ("where the data allows", /work/booking-flow 04).
- **Weaknesses:**
  - Slogan pairs and artificial contrasts are used as headings on nearly every section: "A better customer experience. A business that runs better.", "Digital experiences. Real-world delivery.", "Digital promises. Physical delivery.", "See the possibilities. Then decide.", "New possibilities. A practical starting point.", "See your website. Reimagined.", "Independent thinking. Thoughtful building."
  - The copy leans on scope, which the brief tells writers to avoid: "We write, design, build, connect, and launch it.", "Websites · Content · Search visibility · Booking", "Customer portals · Staff tools · Workflow automation", "content, design, booking connections, conversion, SEO, and AI-search foundations".
  - Abstract nouns ("customer experience", "possibilities") outnumber concrete operator situations. The guides page shows the team can write concretely.

### 6. Visual design and UX craft (10%): **7 / 10**
- **Strengths:** a consistent editorial system (serif display with an italic green second line, a muted sage alternating band, a dark green closing band) across all pages. Hierarchy is clear. The 390px layouts stack cleanly with no overflow or truncation (mobile-home.png, mobile-services.png, mobile-contact.png). The FAQ accordion is tidy (desktop-services.png "A few details.").
- **Weaknesses:**
  - The pages use no visuals that carry meaning. There is no example preview, report or booking-journey image, although the offer is "see it before you commit" (desktop-home.png has only text blocks).
  - The logo mark renders as a glyph that reads like an italic "d" (the code's "o" plus "l" overlap; all headers). Its accessible text in the capture is "o l oakheartlab", though source gives it `aria-label="Oakheart Lab home"`.
  - At 390px the footer "© 2026 Oakheart Lab" wraps onto two lines (mobile-contact.png bottom).
  - The "Explore the offer" and "Our approach" naming is inconsistent with "What we build" and "What we do" between nav and footer.
  - Body text is a light grey on white or sage. Contrast was not measured (see dimension 8).

### 7. Search and AI discoverability (10%): **3 / 10**
- **As configured, the site cannot be indexed.** Every page has `ROBOTS: noindex, nofollow` (`pages.txt`; `app/layout.tsx` `robots: { index: false, follow: false }`).
- `JSON-LD: none` on every page, so there is no Organization, ProfessionalService, Person, FAQPage or Article schema.
- No `robots.txt` or sitemap route exists in `app/` or `public/`, and no canonical tags appear in the captured metadata.
- The entity description is consistent but off-brief: "Customer Experience & Operations" (home title). The about title duplicates the brand: "About Oakheart Lab | Oakheart Lab".
- Positive: facts are server-rendered HTML. The FAQ uses `<details>`, so answers are in the DOM. /guides has answer-first passages that could be cited.
- For a firm whose brief leads with AI visibility, the site models none of the practices it would sell.
- Insights links point to `https://www.oakheartlab.com/p/...` and "More on Substack -> https://www.oakheartlab.com/". If this site takes over that domain, those article links will break or loop.

### 8. Technical quality and accessibility (10%): **unverified** (provisional 6 / 10 from partial evidence)
- No Lighthouse, CWV or axe data. A pass is blocked until these are run.
- Partial evidence:
  - All captured pages return HTTP 200. The 404 page works and returns 404 (`/approach`). Every internal link in the capture resolves to a captured route or anchor (`/services#process`, `#measurement` exist in source).
  - There is a skip link, and the form fields have `<Label htmlFor>`.
  - The honeypot is `aria-hidden` with `tabIndex={-1}`, though its label "Leave this empty" appears in the captured text.
  - Success focus moves to a `role="status"` region.
- Untested: the form end to end, colour contrast of grey body copy, and the featured article page (not captured).

### Weighted total

| # | Dimension | Weight | Score |
|---|---|---:|---:|
| 1 | Positioning clarity | 15 | 3 |
| 2 | Offer and buyer relevance | 15 | 3 |
| 3 | Credibility and evidence integrity | 15 | 5 |
| 4 | Conversion path and friction | 15 | 5 |
| 5 | Copy quality and voice | 10 | 6 |
| 6 | Visual design and UX craft | 10 | 7 |
| 7 | Search and AI discoverability | 10 | 3 |
| 8 | Technical quality and accessibility | 10 | unverified (provisional 6) |

**Weighted total: 4.6 / 10** with the provisional 6 for dimension 8. The total over the seven scored dimensions only (weights 90) is 4.4 / 10. The result is **not a pass**: the score is low, dimension 8 is unverified, and the conversion gate is unverified.

---

## 4. Gates

| Gate | Result | Reason |
|---|---|---|
| Evidence | **Pass** | No testimonials, logos, client results, reviews or statistics on any captured page or in the featured article source. Guarantees are explicitly disclaimed ("rankings and recommendations cannot be guaranteed", /services FAQ). Simulated steps are labeled. |
| Conversion | **Unverified** | No live submission on mobile or desktop. Source shows a sound client and API path with an accurate confirmation, but leads go only to a database with no owner notification, so receipt at the destination is unproven. The form also serves the wrong primary offer. |
| Rendering | **Pass** | In the inspected 1440px and 390px screenshots, no layout defect impairs reading or action. Minor: the footer copyright wraps at 390px, and the mobile form starts far below the fold (a friction issue, not a defect). |
| Regression | **N/A** (round 0) | No earlier round. |

---

## 5. Prioritized fixes

1. **Make the free AI Visibility Check the primary offer and CTA.**
   - *Element:* home hero H1 "A better customer experience. A business that runs better." with button "Get your free website preview"; nav button "Free preview"; closing band "See the possibilities. Then decide."
   - *Why:* the brief's single conversion goal is missing from every page (C1). It is the lowest-effort first step for a skeptical buyer.
   - *Smallest correction:* rewrite the home hero, nav button and shared `Closing` component around "Free AI Visibility Check: we ask ChatGPT, Gemini, Perplexity and Google AI Overviews what your customers ask, then report where you appear, what they get wrong, and the top fixes, in under 24 hours." Keep the preview and a call as secondary links.
2. **Put the brief's thesis and audience in the hero and the services intro.**
   - *Element:* "for businesses of every size" (home), "From growing companies to midmarket and enterprise organizations" (/services), "from growing businesses to complex enterprises" (/about).
   - *Why:* it widens the audience away from the brief (C3), and it hides the AI-assistant problem (C2) that makes the offer urgent.
   - *Smallest correction:* replace those phrases with the consumer-facing verticals (rentals, experiences, appointments, stays, fitness, moving and storage). Add one sentence explaining why complex availability, eligibility and policies are what AI gets wrong.
3. **Turn the contact form into a visibility-check request.**
   - *Element:* /contact form; "Business website (optional)"; required message textarea.
   - *Why:* a check needs the website. The essay field adds effort. The visitor gets nothing until a call is arranged.
   - *Smallest correction:* make the website field required. Make the message optional and add a "city or service area" field. Change the button to "Get my free AI Visibility Check" with "Report by email within 24 hours" beside it. Add an owner notification (email) on insert in `app/api/inquiries/route.ts`, then verify end to end.
4. **Restate the engagement as Found → Booked → Supported, then add the risk reversal and the ongoing tier.**
   - *Element:* /services "One connected customer experience." (Win/Deliver/Bring back) and "A PLACE TO START" (Get found/chosen/booked).
   - *Why:* the pillars do not read as the brief's single system (C4). The refund promise (C5) is the main objection-handler for agency-skeptical owners.
   - *Smallest correction:* rename the three cards Found, Booked and Supported with the brief's contents. Add the exact sentence "If you're not happy with our service, we'll give your money back, no questions asked." near each CTA. Add an "Ongoing" line: visibility monitoring, content, booking improvements, support.
5. **Use the approved founder results as evidence.**
   - *Element:* /about "Oakheart Lab was founded by Yilun Zhang, whose product experience spans buying at Carvana…" and home "BUILT ON OPERATIONAL EXPERIENCE".
   - *Why:* employer names alone do not answer "why believe it" (C7). The approved results map one-to-one onto Found, Booked and Supported.
   - *Smallest correction:* add 4–5 results framed as career results, for example "At Hertz (VP Consumer Product, 2023–present): customer contact rate reduced 50%; launched the first AI service agent, which deflects 70% of inquiries". Add title, 15+ years, Atlanta and the LinkedIn link. Correct "buying at Carvana" to "homepage, search and listings at Carvana (20M+ pageviews per month)".
6. **Make the site practise what it sells on discoverability.**
   - *Element:* `app/layout.tsx` `robots: { index: false, follow: false }`; `JSON-LD: none` on all pages; no sitemap or robots route.
   - *Why:* as configured, no crawler or AI assistant can index the site (C8). That undermines an AI-visibility offer.
   - *Smallest correction:*
     - Gate `noindex` on an environment flag that is off in production.
     - Add Organization/ProfessionalService and Person JSON-LD that matches visible text, and FAQPage for /services if desired.
     - Add `app/sitemap.ts`, `app/robots.ts` and canonicals.
     - Change the default title to the AI-visibility positioning and fix "About Oakheart Lab | Oakheart Lab".
     - Resolve the `oakheartlab.com/p/...` Substack links before the domain moves.
7. **Cut the slogan pairs and scope lists. Define "qualified".**
   - *Element:* "Digital experiences. Real-world delivery.", "Digital promises. Physical delivery.", "See your website. Reimagined.", "We write, design, build, connect, and launch it.", the repeated "For qualified businesses".
   - *Why:* they read as agency prose to a skeptical owner, and the brief warns against scope-heavy copy. An undefined qualifier adds doubt.
   - *Smallest correction:* replace each heading pair with one plain, specific sentence about an operator situation, in the style of /guides. Add one line saying who qualifies for the preview.

---

## 6. Strengths to preserve

- **Evidence discipline:** no invented results, labeled simulations, and explicit "rankings and recommendations cannot be guaranteed" (/services FAQ).
- **The /guides page:** concrete, buyer-side decision help ("Customers choose, then lose context", "Replacement is a separate decision.", the measurement section). It is the best expression of the practitioner voice.
- **The /services FAQ** answers real objections ("Do I need to replace my booking system?" "Not necessarily…").
- **An honest form confirmation** ("No preview slot or paid project is confirmed yet."), a privacy note at the point of submission, and a clear privacy page.
- **A consistent, calm visual system** with clean 390px stacking and a persistent CTA in the header.
- **No prices published**, while still promising "one price… before you commit".

---

## 7. Strongest counterargument and limitations

**Strongest counterargument to the site's positioning:** the site's "customer experience plus operations" framing is arguably more durable than an AI-visibility hook. It describes what the paid engagement actually delivers (websites, booking, operations) rather than a fast-moving acquisition channel. It also avoids overclaiming in a category full of AI hype, which suits the skeptical buyer. The rebuttal is that a free, concrete, 24-hour diagnostic about a problem the owner can verify gives a busy, skeptical owner a reason to act now. A generic "better customer experience" promise does not. The brief also defines the AI Visibility Check as the conversion goal. The site's careful voice and evidence discipline should carry over into that framing rather than be discarded.

**Limitations of this review:**
- Lighthouse, CWV, axe, schema validation and a live form submission were not run, so dimension 8 and the conversion gate are unverified.
- Screenshots are static full-page captures. No interaction states, such as FAQ open, form error, form success or the `?interest=` contact variants, were viewed.
- The featured article page was not captured.
- Judgments on discoverability treat `noindex` as configured, even though this is a local concept build.
- Owner decisions in `docs/decisions.md` were not provided and may explain some divergences.
