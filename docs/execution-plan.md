# Oakheart Lab agency website: execution plan

**Status:** Plan v3, 2026-10-04 (owner inputs applied; see `docs/decisions.md`) · **Owner:** Yilun · **Repo:** `yilunzh/oakheart_lab`
**Reference only:** branch `codex/import-oakheart-site-v19` (current site source, review history v1–v11, ops record). It is evaluated as a baseline. **The new site is designed and built from first principles; no code or design system is carried over** (owner direction, 2026-10-04).
**Skills used:** `oakheart:software-delivery-agency`, `oakheart:business-strategy-copilot`, `oakheart:copy-reviewer`, `oakheart:sales-pitch-reviewer`, `oakheart:learning-loop`, and the vendored `seo` plugin (`seo-geo`, `seo-agentic`, `seo-schema`, `seo-technical`, `seo-page`, `seo-local`).

**v2 changes:**
- The ICP is now consumer-facing, operationally intensive businesses, not motorsport-first. This is the owner's correction.
- The existing site is reference only. The new site is a fresh build (v3).
- Prior owner decisions recorded in that branch's `AGENTS.md` are reconciled (§3.5).

---

## 1. Summary

The current site sells "a better customer experience" to "businesses of every size." Its design is strong; its message is not. The visitor finds nothing to recognize themselves in, no named outcome, and no reason to act now.

The rebuild keeps the design system and engineering, and sharpens **who it's for, what problem it names, and the first step**:

- **Buyer: companies that move atoms, not bits.** These are consumer-facing businesses where a booking or purchase sets real-world work in motion: people, vehicles, equipment, rooms, time slots. Examples: experiences and activities, rentals (vehicles, equipment, boats), service appointments (auto, home, wellness, clinics), stays and hospitality, fitness and classes, moving and storage. The founder's background (Carvana, Rivian, Clutch, Hertz) is exactly this pattern: online decisions that end in physical delivery.
- **The sharpness comes from the problem, not a niche.** Their customers now ask ChatGPT, Gemini, Perplexity and Google's AI answers "where should I go / who should I book." If the AI can't find, understand or trust the business, it isn't in the answer. If it does send people, a clumsy booking path and slow answers lose them. Operationally intensive businesses get hit hardest, because their offers are complex: availability, eligibility, what's included, policies. AI gets those details wrong, and generic booking widgets handle them badly.
- **Promise:** **Get found → Get booked → Keep them coming back.** These are the three existing pillars (AEO/SEO, personalized booking and upsell, self-service support), presented as one demand system.
- **First step:** a **free AI Visibility Check**, unlimited and delivered in under 24 hours, followed by a free tailored preview for qualified businesses.

The site also works as the case study. Oakheart's own AI visibility is baselined before launch and tracked afterwards.

**Quality bar:** each round is scored by a fresh, blind reviewer against a fixed rubric (`docs/review-rubric.md`). We stop when a round reaches ≥ 9.0/10 weighted, with no dimension below 8 and every gate passing. If that hasn't happened, we stop after 5 rounds and report what is still open. A review score shows editorial quality. It does not prove conversion; launch metrics (§9) decide that.

---

## 2. Diagnosis of the current site

These observations come from running the reference build locally and capturing every page at 1440px and 390px on 2026-10-04. The formal scored baseline is Round 0 (§8.3).

**What the reference teaches.** These are requirements and lessons for the new build, not code to reuse:
- **Craft bar:** the current site is visually polished and calm, with a working mobile layout. The new design must match that quality while carrying a much sharper message.
- **Lead-capture requirements:** the reference's inquiry API set a good bar. The new build must meet it from scratch: server-side validation, origin and size checks, a honeypot, idempotency, rate limiting, honest storage-failure handling, and tests for each.
- **Intake UX:** keep entered values when the visitor edits or hits an error, use an honest confirmation, and manage focus.
- **Integrity:** "no obligation," labeled concepts and simulations, and founder background presented as career context rather than endorsements.

**Fix:**

| # | Observed | Why it hurts conversion | Rebuild |
|---|---|---|---|
| 1 | Hero: "A better customer experience. *A business that runs better.*" | Generic outcome any agency could claim. Fails the 5-second test | Lead with the AI-discovery shift and the buyer's moment ("your next customer is asking ChatGPT who to book") |
| 2 | "Businesses of every size," "move the physical world" | The label is close to right ("atoms, not bits") but never made concrete | Name the business types and show recognizable examples on the homepage |
| 3 | The AI thesis appears once, as "AI-search foundations" in a paragraph | The sharpest, most timely differentiator is buried | Make AI discovery the opening argument and Pillar 1 |
| 4 | Below the fold, three optional services (mobile app, staff tools, AI support) get equal visual weight with the core offer | Choice overload. The app and back-office tools are off the demand thesis | Restructure as Found → Booked → Supported. AI support becomes "Supported." The app and back-office tools move to "When you need more" |
| 5 | The hero splits attention between a left CTA column and a right "free preview" explainer of the same weight | Two focal points, and the CTA is not the strongest element | One focal point: headline, subhead and CTA, with a visual showing an AI answer |
| 6 | Proof is only founder background, and it sits on About | Least proof exactly where it's needed | Founder strip on the homepage, a sample report, Oakheart's own visibility baseline, the method |
| 7 | "One price to complete, connect, and launch" with no price or range | Uncertainty at the decision point | A price signal ("from …") once Yilun decides (D3) |
| 8 | Nav "Our approach" has no matching page; "Articles & advice" links out to Substack | Thin trust signal; no citable on-site content for AI engines | Fix the IA; add answer-first guides on-site (§6) |
| 9 | The site is noindex, with no analytics, by owner decision | Correct for a concept. A demand-gen site must be indexed and measured before it launches as one | Launch gate: approve indexing and analytics scope (D6) |

---

## 3. Positioning decisions

### D1. ICP (decided by the owner): **consumer-facing businesses with high operational intensity**

**Working definition:** a customer chooses and books or buys online, and fulfillment then depends on coordinating people, physical assets, locations and time.

**Qualifying signals** (used on the check form and in qualification calls): bookings or appointments are central to revenue; offers vary by availability, eligibility or options; staff currently answer many repetitive pre-booking questions; the business is local or multi-location and depends on discovery.

**How the site stays sharp without a niche:**
- The homepage speaks to the shared problem and uses **3–4 recognizable examples** drawn from different business types. For example, an AI answer for "best kayak rental in Tahoe," "who can fix my Tesla's AC this week," or "beginner-friendly climbing gym near me." Each shows the same failure modes.
- **Use-case pages, not industry pages,** at launch, organized by the buyer's job: **Book an experience**, **Rent something**, **Schedule a service**. These cover most of the ICP with three pages that share one argument.
- **Industry pages come later, driven by demand:** add one when 3+ inquiries come from the same industry or a guide earns traffic. This avoids a thin "industries we serve" grid.

### D2. Core promise and narrative

> **Customers now ask AI where to go. Make sure it recommends you, and that they can book without friction.**

The narrative arc, used on the homepage and in sales calls:
1. **Shift:** discovery is moving from ten blue links to one AI answer.
2. **Stakes:** an AI answer names a few businesses, not a page of ten. Being missing or misdescribed (wrong hours, prices, eligibility, what's included) costs bookings you never see.
3. **Why operationally intensive businesses are hit hardest:** complex offers are hard for AI to summarize correctly and hard for generic booking widgets to sell.
4. **System:** Found (AEO/SEO) → Booked (personalized booking and upsell) → Supported (self-service answers and support).
5. **Proof:** method transparency, a sample report, the founder's operating experience, and Oakheart's own measured visibility.
6. **Step:** free AI Visibility Check.

Statistics about AI-assistant usage go on the site only with a named source and date, re-verified at build time. That rule comes from `seo-geo` and `copy-reviewer`.

### D3. Offer ladder

The ladder is reconciled with the earlier approved offer (§3.5). Prices are not shown on the site (D3a).

| Step | What the buyer gets | Price | Role |
|---|---|---|---|
| **Free AI Visibility Check** | We ask 10–15 real customer questions on ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews. The report shows where you appear, what's cited, factual errors, and the top 3 fixes. **Unlimited, delivered in under 24 hours.** | Free | **Primary CTA** (new) |
| **Free tailored preview** (existing, owner-approved) | A tailored homepage and one booking-journey preview for qualified businesses, with no obligation | Free | Mid-funnel, offered after the check or a call |
| **Complete website & booking experience** (existing core offer) | Found + Booked delivered as one complete launch: content, schema and entity cleanup, booking flow and upsell, integration with existing systems, instrumentation | One price agreed before work starts (not shown on site) | **Core paid offer** |
| **Ongoing: AI visibility & support** | Monthly visibility monitoring, content, booking improvements, and an AI customer-support assistant (Supported) | Agreed monthly fee | Retention |
| When you need more | Companion mobile app; staff tools & automation | Quoted separately | Optional |

**Risk reversal (owner decision D3b):** "If you're not happy with our service, we'll give your money back, no questions asked." It sits beside every paid-offer mention and in the FAQ. It is a satisfaction guarantee, not a performance guarantee: we still never promise rankings or AI recommendations (`growth-service.md`). Refund window and scope are to be confirmed and written into the engagement terms before the first paid project; the site makes no claim about them until then.

**No prices on the site (D3a).** The "What does it cost?" FAQ answers: one fixed price agreed before work starts, with the money-back promise.

### D4. Proof strategy with no client case studies yet

We do not fabricate testimonials, logos or results. That is a critical failure in the rubric. Instead the site uses:
1. **Founder background and patterns:** 15+ years building consumer commerce where an online decision ends in physical delivery (Carvana, Rivian, Clutch, Hertz). He speaks to the patterns he has seen across those businesses. **No employer results or metrics are shown (D7′).**
2. **A sample AI Visibility report:** a real run on a public business, anonymized or used with permission, clearly labeled as a sample.
3. **Oakheart's own AI visibility:** baseline and current, with the prompts, dates and engines published.
4. **The existing booking-flow concept:** already labeled as illustrative.
5. **Method transparency:** exactly what we check and how we measure.
6. Consented, measured case studies replace items 2 and 4 as they arrive.

### 3.5 Reconciling with prior owner decisions (reference branch `AGENTS.md`)

The reference build records earlier decisions. This plan changes some of them because of the new ask ("sharper, more conversion-optimized, AI demand thesis"). The 2026-10-04 owner answers are logged in `docs/decisions.md`.

| Prior decision | This plan | Status |
|---|---|---|
| "Lead with websites and booking flows… AI is a delivery method" | Lead with **AI-driven demand** (found → booked → supported). The website and booking build stays the core paid offer | **Change: confirm** |
| "Do not narrow the paid offer to one service" | Kept: the core offer is still the complete website and booking experience. The free check is a new entry point, not a narrower product | Compatible |
| Free tailored preview for qualified prospects | Kept as the mid-funnel step. The primary CTA becomes the lower-effort free check | **Change: confirm** |
| No guarantees, invented results, prices or timelines | Kept | Compatible |
| Avoid page-count and scope-heavy sales copy | Kept: deliverables are described as outcomes and mechanisms, not page counts | Compatible |
| Optional app, back-office and AI support services | AI support is promoted into the system as "Supported"; app and back-office are demoted to "When you need more" | **Change: confirm** |
| noindex, no analytics, no DNS or Substack changes without approval | Kept as gates. Launch needs explicit approval of indexing, analytics scope and domain cutover | Gates (D5/D6) |

---

## 4. Site architecture and page specs

### 4.1 Information architecture

```
/                         Home: AI-discovery argument → system → proof → check
/ai-visibility-check      Primary conversion page (form + sample report)
/found                    Pillar: AI search & AEO/SEO
/booked                   Pillar: booking & upsell (absorbs /work/booking-flow concept)
/supported                Pillar: self-service & AI support
/for/experiences          Use case: book an experience (tours, activities, classes, venues)
/for/rentals              Use case: rent something (vehicles, equipment, boats, gear)
/for/services             Use case: schedule a service (auto, home, wellness, clinics)
/how-we-work              Process, preview, ownership, what we need from you
/proof                    Own visibility tracker, sample report, concepts
/about                    Founder story and results
/guides/*                 Answer-first guides on-site (Substack stays for essays)
/contact                  Guided intake (preview / call / optional services)
/privacy
```

Navigation: `How it works · Who it's for · Results · Guides · About`, with **Get your free AI check** always visible.

Redirect `/services` → `/how-we-work`, `/insights` → `/guides`, and `/work/booking-flow` → `/booked#example`. Remove the dead "Our approach" link.

### 4.2 Homepage section by section

A new visual direction is defined in Phase 2 from the brief. It is not inherited from the reference site. It must make the AI-answer visual and the founder results the strongest elements on the page.

| # | Section | Job | Content direction | CTA |
|---|---|---|---|---|
| 1 | **Hero** | Show who it's for, the problem and the step within 5 seconds | Eyebrow: "For businesses that move atoms, not bits." H1 direction: "Your next customer is asking AI *who to book.*" Subhead names the buyer and the Found → Booked promise. The right column becomes a visual of an AI answer card naming businesses, with "Is yours here?" | Primary: Get your free AI Visibility Check · Secondary: See a sample report |
| 2 | **Recognize yourself** | Make the ICP concrete | 3–4 example strips showing a real customer query → AI answer → what went wrong (missing, wrong price, can't book) | none |
| 3 | **Why it's harder for you** | Show that we understand operational intensity | Availability, eligibility, options and policies are what AI gets wrong and booking widgets sell badly | none |
| 4 | **The system: Found → Booked → Supported** | Present the offer as one system | Three columns, each with outcome, mechanism and example deliverables. Links to pillar pages | Inline secondary |
| 5 | **Proof** | Earn trust | Founder block (headshot, background, the patterns he has seen, with no employer metrics), Oakheart's own visibility baseline, a sample report, and a transparent method | See the sample report |
| 6 | **How it works** | Reduce perceived effort | Free check (under 24h) → free tailored preview → one-price launch with money-back promise → ongoing (optional) | Get your free check |
| 7 | **FAQ** | Handle objections and give AI engines citable text | "Isn't this just SEO?", "Can you guarantee ChatGPT recommends us?" (no, and why), "Do I need a new website?", "Do you replace my booking system?", "What does it cost?" | none |
| 8 | **Final CTA band** | Convert | Restate the check: what you get, how long it takes, no obligation | Primary |
| — | When you need more | Keep the optional services findable | Compact row (app, staff tools), not three full cards | Text links |

### 4.3 `/ai-visibility-check` (the most important page)

- **Above the fold:** "Your free AI Visibility Check, in your inbox in under 24 hours." What you get, a sample report preview, "unlimited, no obligation," and the form.
- **Form:** posts to a new lead API that meets the §2 lead-capture requirements. Fields: business name, website, city/region, business type (feeds use-case routing), email. Optional: "a question you wish AI answered correctly about you," and "how did you hear about us" (including ChatGPT / AI assistant).
- **After submit:** an honest confirmation saying what happens next and when (report within 24 hours), plus an optional call to walk through it. The call needs a scheduling URL; until then, fall back to arranging it by email.
- **Fulfillment: a semi-automated check runner.** It has to be, to promise unlimited checks in under 24 hours.
  - **Runner (`ops/check-runner/`):** given a business, it generates 10–15 customer-style prompts from the business type and location, then queries the engines through **DataForSEO** (D9): its AI Optimization APIs for ChatGPT, Claude, Gemini and Perplexity, and its SERP API for Google AI Overviews.
  - **Output:** it records the answers, cited URLs, mentions and competitors, flags likely factual errors against the business's own site, and drafts the report.
  - **Human review:** Yilun reviews and sends each report. A queue and an alert fire if a check approaches 20 hours.
  - **Disclosure:** API answers can differ from the consumer apps. The report says which surface was sampled and when.

### 4.4 Pillar and use-case pages

**Pillar pages** (`/found`, `/booked`, `/supported`) cover:
- the problem in the buyer's words
- what we do
- how it's measured
- a worked example
- FAQ
- CTA

**Use-case pages** (`/for/experiences`, `/for/rentals`, `/for/services`) cover:
- the questions their customers ask AI
- the typical errors and friction for that business type
- what Found, Booked and Supported mean for them
- a relevant example
- CTA

The motorsport research dimensions in `niche.md` become examples on `/for/experiences` and `/for/rentals`, not a vertical.

---

## 5. Conversion system

- **One primary action site-wide:** the AI Visibility Check. The secondary action is a call or the tailored preview. No page has more than two CTA types.
- **Friction budget:** the check form takes under 60 seconds. The preview uses a short guided intake.
- **Lead routing:** the lead API stores each lead in Postgres (Neon) with a stable ID and deduplication, sends an email notification to the owner, and queues the check runner. Delivery is verified with a synthetic submission before launch.
- **Speed-to-lead:** auto-confirmation; human acknowledgment within 1 business day; check delivered within the promised window.
- **Instrumentation** (approval required; D6):
  - `cta_click{location,cta}`, `check_form_start`, `check_form_submit`, `check_form_error{field}`, `preview_request`, `call_booked`, `sample_report_view`, `pricing_view`
  - Source and campaign (UTM) tags captured on every lead
  - AI referrer capture: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, and `utm_source=chatgpt.com`. Verify current referrer behavior at build time
  - Self-reported "how did you hear about us" on the form
- **Accessibility:** WCAG 2.2 AA, with focus management, contrast and an axe pass each round. This also determines agent readiness (`seo-agentic`).

---

## 6. AI discovery foundation: Oakheart's own site

We apply the method to ourselves first. This follows `seo-geo` guidance: GEO is SEO fundamentals applied to AI surfaces. Google's guidance rejects `llms.txt`, chunking tricks and mention-farming as ranking levers.

### 6.1 Technical and entity
- Static or server-rendered HTML for all content, so facts are crawlable without JavaScript.
- **Remove noindex at launch only, with owner approval.** Add a canonical domain, sitemap and `robots.txt` that allows search and AI retrieval crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, Googlebot, Bingbot). The training-crawler policy is a separate decision (D6).
- Schema (via `seo-schema`): `Organization` / `ProfessionalService`, `Person` (founder, `sameAs` LinkedIn and Substack), `Service` per pillar, `FAQPage` only where visible FAQ text matches, `Article` on guides, `BreadcrumbList`.
- One consistent entity description ("Oakheart Lab helps consumer-facing, operationally intensive businesses get found by AI assistants and turn that demand into bookings") across the site, LinkedIn, Substack, Google Business Profile (if applicable) and directories.
- Core Web Vitals targets on mobile lab runs: LCP < 2.0s, CLS < 0.05, INP < 200ms.

### 6.2 Content engine (answer-first, citable, on-site)
Substack stays for essays. On-site guides are where AI-citable answers live. Ship 6 at launch, then 2 per month:
1. How ChatGPT and Google's AI Overviews choose which local businesses to recommend
2. The AI visibility checklist for booking-based businesses
3. Why AI gets your hours, prices and policies wrong, and how to fix it
4. Booking-flow teardown: what customers need before they pay for a physical service
5. Upsells that don't feel pushy: add-ons, upgrades, protection products
6. An AI support assistant for operationally intensive businesses: what to automate and what not to

### 6.3 Measurement: own prompt panel
- 20 fixed prompts: 10 category queries such as "agency to help my rental business show up in ChatGPT," and 10 brand queries such as "what is Oakheart Lab."
- Run on ChatGPT, Gemini, Perplexity and Google AI Overviews, in fresh sessions, with a fixed locale. Repeat 3× per run, monthly.
- Record mentions, citations, factual errors, URLs cited, date and engine separately. Do not compute a fake "visibility score."
- The same template powers the client check.

---

## 7. Tech stack and engineering

**Fresh build, chosen from first principles.** The site needs to do three things:
- serve fast, crawlable marketing and guide pages
- capture leads safely
- run the check pipeline: background jobs, API calls to AI engines, and report generation

That points to one full-stack framework native to the chosen host.

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router, TypeScript)**, static-rendered marketing and guide pages | Native on Vercel. Static HTML for crawlability and speed. Route handlers and cron for leads and the check runner in one codebase |
| Styling | Tailwind CSS with a small, purpose-built component set (no UI kit dump) | Small bundle; design tokens defined in Phase 2 |
| Content | MDX for guides; typed content module for pages | Versioned, reviewable, schema components |
| Data | **Neon Postgres** + Drizzle | Leads, checks and reports; preview branches per deployment |
| Email | Transactional email (e.g. Resend) | Lead notifications and report delivery |
| Check runner | Route handler + Vercel Cron/queue → engine APIs | Meets the under-24-hour promise with a human review step |
| QA | Unit tests for the lead API (validation, idempotency, rate limit, failure); Playwright journeys and screenshots (390/1440); Lighthouse (3-run median); axe; link and schema checks; all in CI | Repeatable evidence for every review round |

**D5. Hosting (decided): Vercel.**
- **Cutover:** the new site deploys to a new Vercel project. The ChatGPT Sites deployment stays live until production cutover.
- **Preview deployments:** every review round and PR gets a preview URL, with noindex on previews.
- **Domain:** no DNS change to `oakheartlab.com` until cutover is planned; email DNS records stay untouched; Substack URLs get a redirect plan first.

---

## 8. Quality loop: review, score, iterate (≥ 9/10 or 5 rounds)

### 8.1 Protocol
This follows `copy-reviewer/references/review.md`, the `business-strategy-copilot` review rubric, and `software-delivery-agency/research-design.md`:
- **Fresh, blind reviewers each round:** separate agents with minimal context. They get the brief, the facts, the rubric (`docs/review-rubric.md`), the running site, screenshots and Lighthouse output. They do **not** get the target score, previous scores, or the writer's rationale. On re-review they get the previous findings, so they can check whether each was closed.
- **Recovered-meaning test first:** from the site alone, the reviewer states who it is for, what is offered, why to believe it, and what to do next.
- **Specialist passes in each round, run in parallel:**
  1. Copy and pitch: `copy-reviewer` + `sales-pitch-reviewer` (one shared review)
  2. Strategy and positioning: the `business-strategy-copilot` independent review
  3. Search and AI discovery: `seo-page`, `seo-geo`, `seo-schema`, `seo-technical`, `seo-agentic`
  4. Visual and UX: rendered screenshots at 390 and 1440, plus a form walkthrough
  5. Technical: `npm run verify`, Lighthouse, axe, links, schema
- **Scoring:** 8 fixed dimensions with fixed weights (`docs/review-rubric.md`), 0–10 with anchors. Every rating cites evidence.
- **Critical failures override the average:** fabricated proof, guaranteed rankings, unsourced statistics, a broken primary form, an unreadable mobile layout, or a false claim of verification.

### 8.2 Stop rule
- **Pass:** weighted score ≥ 9.0, no dimension < 8, all gates pass, no open critical or major findings.
- **Otherwise iterate,** fixing substantive defects before cosmetic ones and rerunning the full review on the complete final version.
- **Hard stop after Round 5.** The skills default to two cycles; the user explicitly asked for up to five. Report the final score, the remaining defects, and the smallest input that would resolve each.
- Each round is logged in `docs/reviews/round-N.md`: commit, date, scope, scores, findings, and the closure record. The reference build's `ops/review-v*.md` history stays on its branch.

### 8.3 Round plan
| Round | Artifact | Focus |
|---|---|---|
| 0 (baseline) | **The reference site, unchanged**, against the new brief | Scores the starting point on the same rubric, so improvement is measured, not asserted |
| 1 | **Slice:** new hero + "recognize yourself" + system section + check page, mobile and desktop | Positioning clarity, offer pull, AI-answer visual |
| 2 | All core pages with full content | Argument, proof, objections, IA |
| 3 | Integrated build on a preview URL | Conversion path, forms, mobile, performance, schema |
| 4 | Revised build | Close findings; regression check |
| 5 | Release candidate (if still needed) | Final-version full review; launch gates |

---

## 9. Launch measurement and learning

| Metric | Baseline | 90-day target (provisional) |
|---|---|---|
| Check-form conversion (sessions → submits) | n/a (new) | 3–5% of qualified traffic |
| Check → call or preview | n/a | 30%+ |
| Call → paid build | n/a | track; set after the first 10 calls |
| AI-sourced sessions and leads (referrer + self-report) | 0 | first attributable AI-sourced lead |
| Own prompt panel: brand queries answered correctly | baseline in Phase 1 | correct on all major engines |
| Own prompt panel: category queries mentioning Oakheart | baseline | presence on ≥ 1 engine |

Traffic will be low at launch, so A/B tests won't reach significance (`agency_checks.py sample-size`). Early iteration uses qualitative evidence: form-error events, call notes, and the buyer language captured in checks. After each 10 leads or each month, run a `learning-loop` review.

---

## 10. Phased timeline

About 4 weeks to launch-ready (fresh build).

| Phase | Days | Work | Skills | Exit evidence |
|---|---|---|---|---|
| **0. Decisions and setup** | 1–2 | Log decisions; **Round 0 baseline review of the reference site**; scaffold the fresh Next.js app, Vercel project and Neon DB | software-delivery-agency | `docs/decisions.md`, round-0 scores, empty app deployed to preview |
| **1. Research and baseline** | 2–4 | ICP research: how operationally intensive consumer businesses get discovered, what AI gets wrong about them, buyer language. Competitor AEO agencies. **Own prompt-panel baseline.** One sample check on a public business | deep-research, business-strategy-copilot, seo-geo | `docs/brief.md`, baseline CSV, sample report |
| **2. Positioning and slice** | 4–6 | Messaging hierarchy, hero options, AI-answer visual; design system from scratch; build the slice | copy-reviewer, sales-pitch-reviewer | **Round 1** |
| **3. Full content** | 6–10 | All pages, 6 guides, the check page and form changes | copy-reviewer, seo-content-brief, seo-page | **Round 2** |
| **4. Integrate** | 10–14 | Hosting (D5), notifications, schema, sitemap/robots (noindex kept until approved), analytics (if approved), CI | engineering-release, seo-technical, seo-schema, seo-agentic | Preview URL, checks green, **Round 3** |
| **5. Iterate** | 14–18 | Rounds 4–5 as needed | all reviewers | Pass, or the stop report |
| **6. Launch** | after approval | Indexing on, domain mapping, Search Console + Bing, entity listings | seo-technical, seo-local | Live verification, rollback point |
| **7. Operate** | ongoing | Monthly prompt panel, 2 guides/mo, lead SLA, learning-loop reviews, first case study | learning-loop, growth-service | Monthly report |

---

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| A broad ICP drifts back to generic | The sharpness lives in the problem (AI discovery + complex offers), the examples and the use-case pages. The reviewer's recovered-meaning test checks this every round |
| No case studies, so the proof is thin | Own visibility tracker, a sample report, transparent method and founder credibility. Prioritize 1–2 pilot clients for consented case studies |
| AI-visibility claims age quickly or overpromise | Source and date every statistic; no ranking guarantees; re-verify guidance at build time |
| The free check becomes a time sink | Templated prompt panel, a qualification field, a weekly cap, and later automation |
| Chasing the review score instead of buyer outcomes | Blind reviewers, a fixed rubric, gates that override averages, a Round 0 baseline, and launch metrics as the real test |
| A fresh build regresses on lead-capture safety the reference already had | The §2 requirements become tests before launch, plus a synthetic end-to-end submission on the preview |

---

## 12. Inputs

**Answered 2026-10-04** (see `docs/decisions.md`): ICP, no prices on site, money-back promise, unlimited checks in under 24 hours, Vercel, indexing/analytics/crawlers allowed, resume and LinkedIn as proof.

**Still open:**
1. **§3.5 changes:** proceeding on the defaults (AI-demand lead, check as primary CTA, AI support folded into the system). Say so if you disagree.
2. **Credentials:** an email sending service (e.g. Resend) and DataForSEO, set as Vercel env vars.
3. **Sample report:** any business that would allow a named sample report. Otherwise we use an anonymized one.
