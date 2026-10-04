# Oakheart Lab agency website: execution plan

**Status:** Draft plan, 2026-10-04 · **Owner:** Yilun · **Repo:** `yilunzh/oakheart_lab`
**Skills used:** `oakheart:software-delivery-agency`, `oakheart:business-strategy-copilot`, `oakheart:copy-reviewer`, `oakheart:sales-pitch-reviewer`, `oakheart:learning-loop`, and the vendored `seo` plugin (`seo-geo`, `seo-agentic`, `seo-schema`, `seo-technical`, `seo-page`, `seo-local`).

---

## 1. Summary

The current preview site (oakheart-lab.yilun145104.chatgpt.site) sells "a better customer experience" for "businesses that move the physical world," built "for businesses of every size." That framing is accurate, but it gives a visitor nothing to recognize themselves in, no named outcome, and no reason to act now. The free website preview is a reasonable hook, but it asks the visitor to imagine a website before they believe they have a problem.

The rebuild narrows the site to **one buyer, one problem, one first step**:

- **Buyer:** owner-operators of booked, in-person experience and rental businesses. These are the businesses customers now choose by asking an AI assistant: "best racing school near Austin for a beginner," "where can I rent a track car for a day." The recommended first vertical is motorsport experiences: racing schools, track-car rentals, HPDE coaching. Section 3 explains why.
- **Problem:** customers ask ChatGPT, Gemini, Perplexity and Google's AI Overviews where to go. If the AI can't find, understand or trust your offer, you aren't in the answer. If it does send people, a clumsy booking path loses them.
- **Promise:** **Get found → Get booked → Keep them coming back.** These are the three existing pillars (AEO/SEO, personalized booking and upsell, self-service support), presented as one demand system rather than three services.
- **First step:** a **free AI Visibility Check**. We ask the leading AI assistants the questions your customers ask and show where you appear, what they get wrong, and what to fix first. Every page has one primary CTA (the check) and one secondary CTA (a 20-minute call).

The site also works as the case study. Oakheart's own AI visibility is baselined before launch and tracked afterwards, so the agency can show the method working on itself before it has client results.

**Quality bar:** each round is scored by a fresh, blind reviewer against a fixed rubric (`docs/review-rubric.md`). We stop when a round reaches ≥ 9.0/10 weighted, with no dimension below 8 and every gate passing. If that hasn't happened, we stop after 5 rounds and report what is still open. A review score shows editorial quality. It does not prove conversion; launch metrics (§9) decide that.

---

## 2. Diagnosis of the current site

These observations come from the live page text, captured 2026-10-04. Rendered screenshots were not captured because the sandbox browser could not validate TLS for the domain. Visual review is scheduled in Round 1.

| # | What the site says / does | Why it hurts conversion | Fix in the rebuild |
|---|---|---|---|
| 1 | "A better customer experience. A business that runs better." | A generic outcome any agency could claim. Fails the 5-second test: who is this for, and what changes? | Lead with the AI-discovery shift and a concrete buyer moment |
| 2 | "Businesses of every size," "businesses that move the physical world" | Too broad for anyone to recognize themselves | Name the vertical; add vertical landing pages |
| 3 | The AI thesis is barely present (one mention of "AI-search foundations") | The sharpest, most timely differentiator is buried | Make AI discovery the opening argument |
| 4 | Four offers compete: website, mobile app, staff tools, AI support | Choice overload; the app and back-office tools are off-thesis for a demand-gen agency | Collapse into Found → Booked → Supported; move apps and back-office to "also available" |
| 5 | Primary CTA "Get your free website preview" | High imagined effort; it sells a deliverable, not a diagnosis of a problem | Low-effort diagnostic CTA: free AI Visibility Check |
| 6 | Proof is limited to the founder's background (Carvana, Rivian, Clutch, Hertz), and it lives on About | The most credible asset sits off the homepage; there are no examples, no sample output and no method evidence | Founder credibility on the homepage, a sample report, Oakheart's own visibility baseline, and a transparent method |
| 7 | "One price to complete, connect, and launch" with no price shown | Creates uncertainty at the decision point | Show the offer ladder with prices or "from" ranges (needs input D3) |
| 8 | `/approach` returns 404 and "Our approach" points nowhere; `/guides`, `/insights` exist but are thin | Broken trust signal; no citable content for AI engines | Fix the IA; build answer-first guides (§6) |
| 9 | Tagline "Independent thinking. Thoughtful building." | Pleasant but carries no information | Replace with the promise line |

**Strengths to keep:** the honest "no obligation" tone, clear labeling of simulated steps, founder operating experience in automotive and mobility, and the "see it before you commit" idea, which becomes the mid-funnel preview after the visibility check.

---

## 3. Positioning decisions

Each decision has a recommended default. The plan proceeds on these defaults unless Yilun changes them in Phase 0.

### D1. Ideal customer profile: **recommended: booked experiences and rentals, motorsport first**

| Option | Fit with the AI thesis | Right to win | Competition | Verdict |
|---|---|---|---|---|
| **A. Motorsport experiences** (racing schools, track-car rental, HPDE, driving experiences) | High: considered, high-ticket, research-heavy purchases; buyers ask "which school / which car / is it safe for a beginner" | Strongest: founder's automotive background; the `software-delivery-agency` skill already has a motorsport research playbook (`niche.md`) | Low: few agencies specialize here | **Beachhead** |
| B. Broader experiences and rentals (tours, activities, boat/RV/exotic rental) | High | Medium: adjacent booking and inventory patterns | Medium | **Expansion: second vertical page after first proof** |
| C. Local services (med-spa, dental, home services) | Medium-high | Low | Very high: crowded with SEO agencies | Avoid for now |
| D. Keep it horizontal ("any business") | n/a | n/a | n/a | The current problem |

Implementation: homepage copy speaks to "booked experience and rental businesses," with motorsport examples throughout. `/motorsport` is the first full vertical page. The IA supports adding `/experiences`, `/rentals` and others without restructuring. If Yilun prefers to lead fully horizontal, only the hero, examples and vertical pages change. Pillar pages, the offer ladder and the tech stack stay the same.

### D2. Core promise and narrative

> **Customers now ask AI where to go. Make sure it recommends you, and that they can book in a few taps.**

The narrative arc, used on the homepage and in sales calls:
1. **Shift:** discovery is moving from ten blue links to one AI answer.
2. **Stakes:** an AI answer names a few businesses, not a page of ten. Being missing, or misdescribed (wrong prices, outdated programs), costs bookings you never see.
3. **System:** Found (AEO/SEO) → Booked (personalized booking and upsell) → Supported (self-service answers and support).
4. **Proof:** method transparency, a sample report, the founder's operating experience, and Oakheart's own measured visibility.
5. **Step:** free AI Visibility Check.

Statistics about AI-assistant usage go on the site only with a named source and date, re-verified at build time. That rule comes from `seo-geo` and `copy-reviewer`.

### D3. Offer ladder

Prices need input from Yilun. Until then, each price is a marked placeholder and the site does not go live with it.

| Step | What the buyer gets | Price | Role |
|---|---|---|---|
| **Free AI Visibility Check** | We run 10–15 real customer questions across ChatGPT, Gemini, Perplexity and Google AI Overviews and report where you appear, what is cited, factual errors, and the top 3 fixes. Delivered in N business days. Done manually at first, and the site says so. | Free | Primary CTA and lead magnet |
| **Demand Audit + Plan** | Full AEO/SEO and booking-path audit, a competitor answer map, and a prioritized fix plan | `{{PRICE}}` fixed | Low-risk paid entry |
| **Demand Sprint** (about 6 weeks) | Implement Found + Booked: content and schema, entity and listings cleanup, booking flow and upsell rebuild, instrumentation | `{{PRICE}}` fixed, with an optional performance-based fee where a baseline exists | Core offer |
| **Demand Partner** (monthly) | AI visibility monitoring, content, booking experiments, AI support assistant | `{{PRICE}}`/mo | Retention |

**Guarantee:** the agency skill (`measurement.md`) supports a "covered fees are earned only on agreed demonstrated improvement" offer. It is strong for conversion, but it requires a baseline, a prespecified metric and a decision rule. Recommendation: mention it on the Sprint as "Available when we can measure your baseline," with a link to how it works. Do not use it as a blanket headline promise. **Never promise rankings or AI recommendations** (`growth-service.md`).

### D4. Proof strategy with no client case studies yet

We do not fabricate testimonials, logos or results. That is a critical failure in the rubric. Instead the site uses:
1. **Founder credibility:** product roles at Carvana, Rivian, Clutch and Hertz, framed as "what that taught us about online decisions that end in physical delivery," with no implied client endorsements.
2. **A sample AI Visibility report:** a real run on a public business, anonymized or used with permission, clearly labeled as a sample.
3. **Oakheart's own AI visibility:** baseline and current, with the prompts, dates and engines published. This is the agency showing its method on itself.
4. **A worked booking-flow example:** the existing `/work/booking-flow` prototype, labeled as a prototype.
5. **Method transparency:** exactly what we check and how we measure.
6. Real case studies replace items 2 and 4 as consented, measured results come in.

---

## 4. Site architecture and page specs

### 4.1 Information architecture

```
/                         Home: AI-discovery argument → system → proof → check
/ai-visibility-check      Primary conversion page (form + sample report)
/found                    Pillar: AI search & AEO/SEO
/booked                   Pillar: personalized booking & upsell
/supported                Pillar: self-service & AI support
/motorsport               Vertical: racing schools, track rental, HPDE
/pricing                  Offer ladder, what's included, guarantee terms, FAQ
/how-we-work              Process, timeline, ownership, what we need from you
/proof                    Own visibility tracker, sample report, prototypes (→ /work as cases arrive)
/about                    Founder, why this agency, operating background
/guides/*                 Answer-first guides (AEO content engine; see §6)
/book                     20-min call (Cal.com / Google Calendar)
/privacy, /terms
/llms.txt, /robots.txt, /sitemap.xml
```

Navigation: `How it works · Motorsport · Pricing · Guides · About`, with the **Get your free AI check** button always visible. That is five items plus the CTA, down from the current six-plus items with competing CTAs.

Redirect the old `/services`, `/insights`, `/contact`, `/work/booking-flow` and similar paths, and fix the `/approach` 404.

### 4.2 Homepage section by section

Each section has one job. The content is drafted in Phase 3. The lines below are direction, not final copy.

| # | Section | Job | Content direction | CTA |
|---|---|---|---|---|
| 1 | **Hero** | Show who it's for, the problem and the step within 5 seconds | H1 around "Your next customer is asking ChatGPT where to book." Subhead names the buyer and the Found → Booked promise. A visual shows an AI answer card listing businesses, with "Is yours here?" | Primary: Get your free AI Visibility Check · Secondary: See a sample report |
| 2 | **The shift** | Make the problem concrete | 2–3 sourced facts with dates, plus an annotated example of an AI answer for a real motorsport query, showing who gets named and what is wrong | none |
| 3 | **What it costs you** | Raise the stakes without fearmongering | Three failure modes: not mentioned; mentioned but wrong (prices, programs); recommended but the booking path loses them | none |
| 4 | **The system: Found → Booked → Supported** | Explain the offer as one system | Three columns, each with outcome, mechanism and example deliverables. Links to pillar pages | Inline secondary |
| 5 | **Proof** | Earn trust | Founder block, Oakheart's own visibility baseline, a sample report thumbnail and the prototype | See the sample report |
| 6 | **How it works** | Reduce perceived effort | Check (free, ~N days) → Audit + Plan → Sprint → Partner, with time and commitment at each step | Get your free check |
| 7 | **Built for motorsport and experience businesses** | Help the visitor recognize themselves | Specific buyer questions for racing schools and rentals ("Do I need a license?", "What's included?", "Seat time vs. day at the track") | Visit /motorsport |
| 8 | **FAQ** | Handle objections and give AI engines citable text | "Isn't this just SEO?", "Can you guarantee ChatGPT recommends us?" (no, and why), "Do I need a new website?", "What do you need from me?", "What does it cost?" Uses FAQPage schema where the visible text matches | none |
| 9 | **Final CTA** | Convert | Restate the check: what you get, how long it takes, no obligation | Primary form inline |

### 4.3 `/ai-visibility-check` (the most important page)

- **Above the fold:** what you get, a sample report preview, delivery time, "no sales pressure," and the form.
- **Form** (as short as possible, everything needed for the check): business name, website, city/region, main offering (a dropdown that also feeds vertical routing), email. Optional: "the question you wish AI answered about you." No phone number required.
- **After submit:** a confirmation page that sets expectations (what happens next and when), an optional "book a call to walk through it," and a promise not to start a newsletter without opt-in.
- **Behind the scenes:** the lead is stored with a stable ID, deduplicated by domain, and routed to Yilun by email and CRM. Fulfillment uses a prompt-panel template (§6.3) so each check is consistent and repeatable.

### 4.4 Pillar and vertical pages

Each pillar page (`/found`, `/booked`, `/supported`) covers:
- the buyer problem in their own words
- what we do (deliverables)
- how we measure it
- a worked example
- FAQ
- CTA

`/motorsport` uses the `niche.md` research dimensions: beginner confidence, prerequisites and licensing, seat time versus time at the venue, what's included, track logistics, and upsells such as coaching, video/data review and extra sessions. It shows that Oakheart understands how these buyers decide. This page must be the best page on the internet about how motorsport experience businesses get found and booked.

---

## 5. Conversion system

- **One primary action site-wide:** the AI Visibility Check. The secondary action is a call. No page has more than two CTA types.
- **Friction budget:** the check form takes under 60 seconds. Call booking is a 3-click embed.
- **Message match:** ads, outreach and guides deep-link to the vertical or check page with matching headlines.
- **Lead routing:** form → serverless function → database (Neon, already connected) + email notification + CRM. Day 1 can be a simple Neon table plus an email; migrate to HubSpot free or Attio when volume justifies it. Leads are deduplicated by domain, and each submission gets a stable lead ID.
- **Speed-to-lead:** auto-confirmation immediately; human acknowledgment within 1 business day; check delivered within the promised window. Each step is tracked.
- **Instrumentation** (privacy-friendly analytics such as Plausible or Vercel Web Analytics, plus server-side events):
  - `cta_click{location, cta}`, `check_form_start`, `check_form_submit`, `check_form_error{field}`, `call_booked`, `sample_report_view`, `pricing_view`
  - Referrer capture for AI sources: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, and `utm_source=chatgpt.com`. Verify current referrer behavior at build time.
  - "How did you hear about us?" on the form, with "ChatGPT / AI assistant" as an option. This is self-reported attribution for AI-sourced leads.
- **Accessibility:** WCAG 2.2 AA for forms (labels, errors, keyboard). This also determines agent readiness (`seo-agentic`).

---

## 6. AI discovery foundation: Oakheart's own site

We apply the method to ourselves first. This follows `seo-geo` guidance: GEO is SEO fundamentals applied to AI surfaces. Google's guidance rejects `llms.txt`, chunking tricks and mention-farming as ranking levers.

### 6.1 Technical and entity
- Server-rendered or static HTML, so every fact is crawlable without JavaScript.
- `robots.txt` that allows search and AI retrieval crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, Googlebot, Bingbot), with the training-crawler policy decided deliberately (D6).
- Schema (via `seo-schema`): `Organization` / `ProfessionalService`, `Person` (founder, with `sameAs` to LinkedIn), `Service` per pillar, `FAQPage` only where visible FAQ text matches, `Article` on guides, `BreadcrumbList`.
- One consistent entity description ("Oakheart Lab is an AI search and booking-conversion agency for experience and rental businesses") repeated across the site, LinkedIn, Google Business Profile (if applicable), Crunchbase, Clutch.co and directory listings.
- Sitemap, canonicals, Open Graph, fast Core Web Vitals (LCP < 2.0s, CLS < 0.05, INP < 200ms on mobile lab runs).
- An optional `llms.txt` / Markdown mirror. It is cheap to add, but Google calls it not a ranking factor, so we don't claim it as a lever.

### 6.2 Content engine (answer-first, citable)
Ship 6 guides at launch, then 2 per month. Each opens with a 2–3 sentence direct answer, then evidence, a comparison table and an FAQ. Starting topics:
1. How ChatGPT and Google's AI Overviews choose which local businesses to recommend
2. AI visibility checklist for racing schools and track-day businesses
3. Why AI gets your prices and programs wrong, and how to fix it
4. Booking-flow teardown: what high-ticket experience buyers need before they pay
5. Upsells that don't feel pushy: coaching, video, extra sessions
6. AI support assistant for experience businesses: what to automate and what not to

### 6.3 Measurement: own prompt panel
- 20 fixed prompts: 10 category queries such as "agency to help my racing school show up in ChatGPT," and 10 brand queries such as "what is Oakheart Lab."
- Run on ChatGPT, Gemini, Perplexity and Google AI Overviews, in fresh sessions, with a fixed locale. Repeat 3× per run, monthly.
- Record mentions, citations, factual errors, URLs cited, date and engine separately. Do not compute a fake "visibility score" from a small sample (`discovery-evidence.md`).
- The same template powers the client AI Visibility Check, so the free offer and our own proof use one method.

---

## 7. Tech stack and engineering

| Concern | Recommendation | Why |
|---|---|---|
| Framework | **Astro** + Tailwind (TypeScript) | Static-first HTML, near-zero JS, excellent CWV and crawlability, MDX for guides |
| Hosting | **Vercel** (MCP connected) | Preview deploy per PR, which lets each review round inspect a real URL; edge functions for forms |
| Forms / leads | Vercel function → **Neon** Postgres (MCP connected) + email (Resend) | Durable lead record, dedupe, no third-party form lock-in |
| Scheduling | Cal.com or Google Calendar booking page | Low friction; calendar already connected |
| Analytics | Plausible or Vercel Analytics + server events | Privacy-friendly; minimal consent friction |
| Content | MDX in repo | Versioned, reviewable, works with schema components |
| QA | Playwright (390/768/1440 screenshots), Lighthouse CI (3 runs, median), axe, link checker, schema validator | Repeatable evidence for each review round |

**Migration note:** the current site runs on ChatGPT Sites. `engineering-release.md` says to keep an existing Sites project in its environment unless migration is explicitly requested. Rebuilding in this repo is that request. **Confirm in Phase 0 (D5)**, along with the domain (`oakheartlab.com`?) and DNS access. Keep the old site live until cutover, and add 301s for any indexed URLs.

Repository layout (planned):
```
docs/                 plan, rubric, brief, decisions log, review rounds
site/                 Astro app (src/pages, src/components, src/content/guides)
site/tests/           Playwright + a11y + link checks
ops/prompt-panel/     prompt list, run template, results (CSV/JSON)
.github/workflows/    lint, build, Playwright, Lighthouse CI
```

---

## 8. Quality loop: review, score, iterate (≥ 9/10 or 5 rounds)

### 8.1 Protocol
This follows `copy-reviewer/references/review.md`, the `business-strategy-copilot` review rubric, and `software-delivery-agency/research-design.md`:
- **Fresh, blind reviewers each round:** separate agents with minimal context. They get the brief, the facts, the rubric (`docs/review-rubric.md`), the deployed preview URL, and the screenshots and Lighthouse output. They do **not** get the target score, previous scores, or the writer's rationale. On re-review they get the previous concrete findings, so they can check whether each was closed.
- **Recovered-meaning test first:** before scoring, the reviewer states, from the artifact alone, who it is for, what is offered, why to believe it, and what to do next. Divergence from the brief is a finding.
- **Specialist passes in each round, run in parallel:**
  1. Copy and pitch: `copy-reviewer` + `sales-pitch-reviewer` (one shared brief, one review)
  2. Strategy and positioning: the `business-strategy-copilot` independent review
  3. Search and AI discovery: `seo-page`, `seo-geo`, `seo-schema`, `seo-technical`, `seo-agentic`
  4. Visual and UX: rendered screenshots at mobile and desktop, plus a form-completion walkthrough
  5. Technical: Lighthouse (3-run median), axe, broken links, schema validation
- **Scoring:** the 8 fixed dimensions with fixed weights are in `docs/review-rubric.md`, rated 0–10 with anchors (5 = material rework, 7 = important gaps, 8 = strong, 9 = decision-ready, minor polish only, 10 = no meaningful defect). Every rating cites evidence. The rubric stays fixed across rounds, and we don't shop for reviewers.
- **Critical failures override the average:** fabricated proof or testimonials, guaranteed rankings or AI recommendations, unsourced statistics, a broken primary form, an unreadable mobile layout, or a false claim of verification.

### 8.2 Stop rule
- **Pass:** weighted score ≥ 9.0, no dimension < 8, all gates pass, no open critical or major findings.
- **Otherwise iterate**, fixing substantive defects before cosmetic ones and rerunning the full review on the complete final version. Prior scores are never carried forward.
- **Hard stop after Round 5.** The skills default to two cycles; the user explicitly asked for up to five. Report the final score, the remaining defects, and the smallest input that would resolve each. Usually that input is real evidence: a price, a sample report, a case study.
- Each round is logged in `docs/reviews/round-N.md`: version or commit hash, date, reviewer scope, scores, findings, and the closure record.

### 8.3 Round plan
| Round | Artifact under review | Focus |
|---|---|---|
| 1 | **Representative slice**: hero, the system section, the check page with form, mobile and desktop | Riskiest assumptions: positioning clarity, offer pull, visual direction |
| 2 | Full content draft + design system on all core pages | Argument, proof, objection handling, IA |
| 3 | Built site on a Vercel preview | Conversion path, forms, mobile, performance, schema |
| 4 | Revised build | Close findings; regression check against strengths from earlier rounds |
| 5 | Release candidate (if still needed) | Final-version full review; launch gates |

---

## 9. Launch measurement and learning

A score of 9/10 is editorial. Business proof comes from these:

| Metric | Baseline | 90-day target (provisional) |
|---|---|---|
| Check-form conversion (sessions → submits) | n/a (new) | 3–5% of qualified traffic |
| Check → call booked | n/a | 30%+ |
| Call → paid (Audit or Sprint) | n/a | track; set after the first 10 calls |
| AI-sourced sessions and leads (referrer + self-report) | 0 | first attributable AI-sourced lead |
| Own prompt panel: brand queries answered correctly | baseline in Phase 1 | correct on all major engines |
| Own prompt panel: category queries mentioning Oakheart | baseline | measurable presence on ≥ 1 engine |

Traffic will be low at launch. A/B tests won't reach significance for months (check with `agency_checks.py sample-size`), so early iteration uses qualitative evidence: session recordings, form-error events, call notes, and the buyer language captured in checks. After each 10 leads or each month, run a `learning-loop` review to capture corrections and propose skill or site changes with evidence.

---

## 10. Phased timeline

About 4 weeks to launch, assuming Phase 0 inputs arrive in the first 2 days.

| Phase | Days | Work | Skills | Exit evidence |
|---|---|---|---|---|
| **0. Decisions and setup** | 1–2 | Confirm D1–D6, collect inputs (§12), scaffold the repo, Vercel project, Neon DB, client record for Oakheart itself | software-delivery-agency (operating) | Decisions logged in `docs/decisions.md` |
| **1. Research and baseline** | 2–4 | Buyer research for motorsport operators (pains, language, how they buy agencies); competitor agencies' AEO positioning; incumbent site audit; **own prompt-panel baseline**; one sample Visibility Check on a public business | deep-research, business-strategy-copilot, seo-geo, seo-audit | `docs/brief.md` (sourced), baseline CSV, sample report |
| **2. Positioning and slice** | 4–7 | Messaging hierarchy, hero options, offer ladder copy, visual direction; build the representative slice | copy-reviewer, sales-pitch-reviewer, artifact-design | **Review Round 1** |
| **3. Full content and design** | 7–12 | All core page copy, 6 guides drafted, design system, page templates | copy-reviewer, seo-content-brief, seo-page | **Review Round 2** |
| **4. Build** | 12–18 | Astro build, forms → Neon + email, analytics, schema, robots/sitemap, Playwright and Lighthouse CI | software-delivery-agency (engineering), seo-technical, seo-schema, seo-agentic | Vercel preview, CI green, **Review Round 3** |
| **5. Iterate** | 18–24 | Close findings; Rounds 4–5 as needed | all reviewers | Pass, or the Round 5 stop report |
| **6. Launch** | 24–26 | DNS cutover, 301s, Search Console + Bing Webmaster, directory/entity listings, announce | seo-technical, seo-local | Live verification, rollback plan |
| **7. Operate** | ongoing | Monthly prompt panel, 2 guides/mo, lead-ops SLA, learning-loop reviews, first case study | learning-loop, growth-service | Monthly report |

---

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Narrowing to motorsport shrinks the market too much | The homepage speaks to experiences and rentals broadly, and the IA adds verticals cheaply. Revisit after 30 leads or 90 days |
| No case studies, so the proof is thin | Own visibility tracker, a sample report, transparent method and founder credibility. Prioritize 1–2 discounted pilot clients for consented case studies |
| AI-visibility claims age quickly or overpromise | Source and date every statistic; no ranking guarantees; re-verify guidance at build time |
| The free check becomes a time sink | Templated prompt panel, a qualification field, a capped weekly volume, and later automation of the panel run |
| Chasing the review score instead of buyer outcomes | Blind reviewers, a fixed rubric, gates that override averages, and launch metrics as the real test |
| Migration loses existing (small) search equity | Redirect map and Search Console monitoring |

---

## 12. Inputs needed from Yilun (Phase 0)

1. **D1 ICP:** confirm "experiences and rentals, motorsport first," or pick another lead vertical.
2. **D3 prices:** for the Audit, Sprint and Partner tiers (or "from" ranges), and whether the performance-based fee option is on offer.
3. **Check turnaround and capacity:** how many free checks per week you can deliver, and in how many business days.
4. **D5 hosting and domain:** OK to move off ChatGPT Sites to Vercel? Is `oakheartlab.com` the domain, and who has DNS access?
5. **D6 AI training crawlers:** allow or block training crawlers (separate from search and retrieval crawlers, which we allow).
6. **Proof assets:** LinkedIn URL, headshot, any shareable results from past roles (with what's allowed to be said), any prospect who would allow a named sample report, and any existing pilot or client results.
7. **Tools:** preferred CRM, email sender, and scheduling tool (defaults: Neon + Resend + Cal.com).
