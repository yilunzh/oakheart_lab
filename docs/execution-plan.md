# Oakheart Lab agency website: execution plan

**Status:** Draft plan v2, 2026-10-04 · **Owner:** Yilun · **Repo:** `yilunzh/oakheart_lab`
**Reference build:** branch `codex/import-oakheart-site-v19` (Sites version 19 source, review history v1–v11, ops record)
**Skills used:** `oakheart:software-delivery-agency`, `oakheart:business-strategy-copilot`, `oakheart:copy-reviewer`, `oakheart:sales-pitch-reviewer`, `oakheart:learning-loop`, and the vendored `seo` plugin (`seo-geo`, `seo-agentic`, `seo-schema`, `seo-technical`, `seo-page`, `seo-local`).

**v2 changes:**
- The ICP is now consumer-facing, operationally intensive businesses, not motorsport-first. This is the owner's correction.
- The plan now builds on the codex reference build instead of a greenfield rebuild.
- Prior owner decisions recorded in that branch's `AGENTS.md` are reconciled (§3.5).

---

## 1. Summary

The current site sells "a better customer experience" to "businesses of every size." Its design is strong; its message is not. The visitor finds nothing to recognize themselves in, no named outcome, and no reason to act now.

The rebuild keeps the design system and engineering, and sharpens **who it's for, what problem it names, and the first step**:

- **Buyer: companies that move atoms, not bits.** These are consumer-facing businesses where a booking or purchase sets real-world work in motion: people, vehicles, equipment, rooms, time slots. Examples: experiences and activities, rentals (vehicles, equipment, boats), service appointments (auto, home, wellness, clinics), stays and hospitality, fitness and classes, moving and storage. The founder's background (Carvana, Rivian, Clutch, Hertz) is exactly this pattern: online decisions that end in physical delivery.
- **The sharpness comes from the problem, not a niche.** Their customers now ask ChatGPT, Gemini, Perplexity and Google's AI answers "where should I go / who should I book." If the AI can't find, understand or trust the business, it isn't in the answer. If it does send people, a clumsy booking path and slow answers lose them. Operationally intensive businesses get hit hardest, because their offers are complex: availability, eligibility, what's included, policies. AI gets those details wrong, and generic booking widgets handle them badly.
- **Promise:** **Get found → Get booked → Keep them coming back.** These are the three existing pillars (AEO/SEO, personalized booking and upsell, self-service support), presented as one demand system.
- **First step:** a **free AI Visibility Check**, followed by the existing free tailored preview for qualified businesses.

The site also works as the case study. Oakheart's own AI visibility is baselined before launch and tracked afterwards.

**Quality bar:** each round is scored by a fresh, blind reviewer against a fixed rubric (`docs/review-rubric.md`). We stop when a round reaches ≥ 9.0/10 weighted, with no dimension below 8 and every gate passing. If that hasn't happened, we stop after 5 rounds and report what is still open. A review score shows editorial quality. It does not prove conversion; launch metrics (§9) decide that.

---

## 2. Diagnosis of the current site

These observations come from running the codex reference build locally (v19 source) and capturing pages at 1440px and 390px on 2026-10-04, plus the live page text.

**Keep:**
- **Visual system:** editorial serif headlines with an italic green accent, generous whitespace, a restrained palette, and a dark-green CTA band. It reads as premium and calm, and the mobile layout holds up.
- **Engineering:** an inquiry API with server-side validation, origin and size checks, a honeypot, idempotency, rate limiting and storage-failure handling, all with tests (`scripts/check-inquiries.cjs`). Also a guided `/contact` intake with an editable review step and an honest confirmation, plus the labeled booking-flow concept at `/work/booking-flow`.
- **Tone and integrity:** "No obligation," simulated steps labeled, no invented results, founder background framed as career context rather than endorsements.

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

The ladder is reconciled with the existing approved offer (§3.5). Prices need input from Yilun.

| Step | What the buyer gets | Price | Role |
|---|---|---|---|
| **Free AI Visibility Check** | We ask 10–15 real customer questions on ChatGPT, Gemini, Perplexity and Google AI Overviews. The report shows where you appear, what's cited, factual errors, and the top 3 fixes. Delivered in N business days. Done manually at first, and the site says so. | Free | **Primary CTA** (new) |
| **Free tailored preview** (existing, owner-approved) | A tailored homepage and one booking-journey preview for qualified businesses, with no obligation | Free | Mid-funnel, offered after the check or a call |
| **Complete website & booking experience** (existing core offer) | Found + Booked delivered as one complete launch: content, schema and entity cleanup, booking flow and upsell, integration with existing systems, instrumentation | One price, `{{PRICE}}` or "from" range | **Core paid offer** |
| **Ongoing: AI visibility & support** | Monthly visibility monitoring, content, booking improvements, and an AI customer-support assistant (Supported) | `{{PRICE}}`/mo | Retention |
| When you need more | Companion mobile app; staff tools & automation | Quoted separately | Optional |

**No performance guarantee and no promised rankings or AI recommendations.** This matches the existing owner decision and `growth-service.md`.

### D4. Proof strategy with no client case studies yet

We do not fabricate testimonials, logos or results. That is a critical failure in the rubric. Instead the site uses:
1. **Founder credibility:** product roles at Carvana, Rivian, Clutch and Hertz, framed as "online decisions that end in physical delivery," with no implied client endorsements. The existing wording in `ops/content-sources.md` is already approved.
2. **A sample AI Visibility report:** a real run on a public business, anonymized or used with permission, clearly labeled as a sample.
3. **Oakheart's own AI visibility:** baseline and current, with the prompts, dates and engines published.
4. **The existing booking-flow concept:** already labeled as illustrative.
5. **Method transparency:** exactly what we check and how we measure.
6. Consented, measured case studies replace items 2 and 4 as they arrive.

### 3.5 Reconciling with prior owner decisions (codex branch `AGENTS.md`)

The codex build encodes earlier decisions. This plan changes some of them because of the new ask ("sharper, more conversion-optimized, AI demand thesis"). **Yilun confirms each in Phase 0.**

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
/pricing                  Offer ladder, what's included, FAQ        (needs D3)
/how-we-work              Process, preview, ownership, what we need from you
/proof                    Own visibility tracker, sample report, concepts
/about                    Founder (existing copy, tightened)
/guides/*                 Answer-first guides on-site (Substack stays for essays)
/contact                  Existing guided intake (preview / call / services)
/privacy
```

Navigation: `How it works · Who it's for · Pricing · Guides · About`, with **Get your free AI check** always visible.

Redirect `/services` → `/how-we-work`, `/insights` → `/guides`, and `/work/booking-flow` → `/booked#example`. Remove the dead "Our approach" link.

### 4.2 Homepage section by section

The existing layout primitives are reused: the eyebrow label, serif H1 with italic accent, two-column rows, tinted bands, and the dark CTA band.

| # | Section | Job | Content direction | CTA |
|---|---|---|---|---|
| 1 | **Hero** | Show who it's for, the problem and the step within 5 seconds | Eyebrow: "For businesses that move atoms, not bits." H1 direction: "Your next customer is asking AI *who to book.*" Subhead names the buyer and the Found → Booked promise. The right column becomes a visual of an AI answer card naming businesses, with "Is yours here?" | Primary: Get your free AI Visibility Check · Secondary: See a sample report |
| 2 | **Recognize yourself** | Make the ICP concrete | 3–4 example strips showing a real customer query → AI answer → what went wrong (missing, wrong price, can't book) | none |
| 3 | **Why it's harder for you** | Show that we understand operational intensity | Availability, eligibility, options and policies are what AI gets wrong and booking widgets sell badly | none |
| 4 | **The system: Found → Booked → Supported** | Present the offer as one system | Three columns, each with outcome, mechanism and example deliverables. Links to pillar pages | Inline secondary |
| 5 | **Proof** | Earn trust | Founder strip ("Carvana, Rivian, Clutch, Hertz: online decisions, physical delivery"), Oakheart's own visibility baseline, sample report thumbnail | See the sample report |
| 6 | **How it works** | Reduce perceived effort | Free check → free tailored preview → one-price launch → ongoing (optional), with time and commitment at each step | Get your free check |
| 7 | **FAQ** | Handle objections and give AI engines citable text | "Isn't this just SEO?", "Can you guarantee ChatGPT recommends us?" (no, and why), "Do I need a new website?", "Do you replace my booking system?", "What does it cost?" | none |
| 8 | **Final CTA band** | Convert | Restate the check: what you get, how long it takes, no obligation | Primary |
| — | When you need more | Keep the optional services findable | Compact row (app, staff tools), not three full cards | Text links |

### 4.3 `/ai-visibility-check` (the most important page)

- **Above the fold:** what you get, a sample report preview, delivery time, "no obligation," and the form.
- **Form:** reuses the existing inquiry API and its protections, adding `interest=ai-visibility-check`. Fields: business name, website, city/region, business type (feeds use-case routing), email. Optional: "a question you wish AI answered correctly about you," and "how did you hear about us" (including ChatGPT / AI assistant).
- **After submit:** keep the existing honest confirmation pattern and add what happens next and when. Optional: book a call to walk through the result. This needs a scheduling URL; until then, the email fallback already in the build.
- **Fulfillment:** a prompt-panel template (§6.3) so each check is consistent.

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
- **Friction budget:** the check form takes under 60 seconds. The preview keeps its existing guided intake.
- **Lead routing:** the existing validated inquiry API stores leads. **Gap to close before launch:** no notification or CRM destination is connected (playbook). Add an email notification (Resend, or Gmail via an approved connector) and verify it with a synthetic submission.
- **Speed-to-lead:** auto-confirmation; human acknowledgment within 1 business day; check delivered within the promised window.
- **Instrumentation** (approval required; D6):
  - `cta_click{location,cta}`, `check_form_start`, `check_form_submit`, `check_form_error{field}`, `preview_request`, `call_booked`, `sample_report_view`, `pricing_view`
  - The existing source and campaign tags on inquiries are kept
  - AI referrer capture: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, and `utm_source=chatgpt.com`. Verify current referrer behavior at build time
  - Self-reported "how did you hear about us" on the form
- **Accessibility:** keep the existing focus management and contrast fixes, and add an axe pass each round. This also determines agent readiness (`seo-agentic`).

---

## 6. AI discovery foundation: Oakheart's own site

We apply the method to ourselves first. This follows `seo-geo` guidance: GEO is SEO fundamentals applied to AI surfaces. Google's guidance rejects `llms.txt`, chunking tricks and mention-farming as ranking levers.

### 6.1 Technical and entity
- The existing app server-renders, so facts are already crawlable as HTML. Keep it that way: no client-only content.
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

**Start from the codex reference build, not greenfield.** It already has the design system, an SSR Next (vinext) app, a hardened inquiry pipeline with tests, guided intake and accessibility fixes. Rebuilding in Astro would discard tested work for little gain.

| Concern | Plan |
|---|---|
| Codebase | Merge `codex/import-oakheart-site-v19` into the working branch; restructure pages and content in `content/site.ts` and `app/` |
| UI | Keep the existing tokens and type. Remove unused shadcn components at the end to cut bundle weight |
| Leads | Keep `app/api/inquiries` and its tests; add the `ai-visibility-check` interest and a notification destination |
| QA | Run the existing `npm run verify`. Add Playwright screenshots at 390 and 1440 (now proven to work locally in this environment), Lighthouse (3-run median), axe, a link checker and a schema validator |
| Content | `content/site.ts` plus new guide routes |

**D5. Hosting** (decision needed). The app currently runs on ChatGPT Sites (Cloudflare Workers + D1).
- **Option A, recommended: move hosting to Vercel**, swapping D1 for Neon behind the existing Drizzle layer. Claude can then deploy a preview URL for every review round and every PR; both connectors are already working in this session. Cost: port the Cloudflare-specific runtime bits and re-verify the inquiry handler against Postgres.
- **Option B: stay on Sites.** No runtime changes, but Claude cannot publish there from this environment. Codex or Yilun would deploy each round, which slows the review loop.
- Either way: no DNS change to `oakheartlab.com` without approval; email DNS records stay untouched; Substack URLs get a redirect plan before any domain cutover.

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
- Each round is logged in `docs/reviews/round-N.md`: commit, date, scope, scores, findings, and the closure record. This continues the existing `ops/review-v*.md` history.

### 8.3 Round plan
| Round | Artifact | Focus |
|---|---|---|
| 0 (baseline) | **The current v19 site, unchanged** | Scores the starting point on the same rubric, so improvement is measured, not asserted |
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

About 3 weeks to launch-ready, shorter than v1 because the reference build is reused.

| Phase | Days | Work | Skills | Exit evidence |
|---|---|---|---|---|
| **0. Decisions and setup** | 1–2 | Confirm §3.5 changes and D3/D5/D6; merge the codex branch; `npm run verify` green; **Round 0 baseline review** | software-delivery-agency | `docs/decisions.md`, round-0 scores |
| **1. Research and baseline** | 2–4 | ICP research: how operationally intensive consumer businesses get discovered, what AI gets wrong about them, buyer language. Competitor AEO agencies. **Own prompt-panel baseline.** One sample check on a public business | deep-research, business-strategy-copilot, seo-geo | `docs/brief.md`, baseline CSV, sample report |
| **2. Positioning and slice** | 4–6 | Messaging hierarchy, hero options, AI-answer visual; build the slice in the existing app | copy-reviewer, sales-pitch-reviewer | **Round 1** |
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
| The hosting move breaks the tested inquiry pipeline | Rerun `npm run verify` against the new DB adapter, plus a synthetic end-to-end submission on the preview |

---

## 12. Inputs needed from Yilun (Phase 0)

1. **§3.5 changes:** OK to lead with AI-driven demand, make the free AI Visibility Check the primary CTA (keeping the tailored preview as step 2), and fold AI support into the core system while demoting the app and back-office tools?
2. **D3 prices:** the core build (one price or a "from" range) and the monthly ongoing tier.
3. **Check capacity:** how many free checks per week you can deliver, and in how many business days.
4. **D5 hosting:** move to Vercel + Neon (recommended) or stay on Sites?
5. **D6 launch gates:** approval scope for indexing, analytics/consent, and the AI training-crawler policy.
6. **Notifications:** where new leads should go (email address, CRM), and a scheduling URL for calls.
7. **Proof assets:** LinkedIn URL, headshot, any shareable past-role results, and any business that would allow a named sample report.
