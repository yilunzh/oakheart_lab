# Decisions log

Newest first. Each entry lists the decision, its source, and what it supersedes. Earlier decisions are recorded in `AGENTS.md` (codex build) and `ops/client-record.json`.

## 2026-10-10: One flat monthly fee; privacy page; subhead and urgency line are final

- **Pricing model:** one flat monthly fee covers the first round of fixes and the upkeep after it. No separate project fee. Month to month, stop anytime. Still no prices on the site (D3a). Step 2 label "Included in your monthly fee"; How it works H2 "A free check, then one flat monthly fee for the fixes and the upkeep."; pricing, contract and check-page FAQs updated. **Supersedes** "one price, agreed up front" for the fixes.
- **Privacy page** at `/privacy`, linked under the form and in the footer, stating only what the code does (form fields, referrer, UTM, hashed IP; Vercel, Neon, Resend; no advertising or tracking cookies; deletion on request by email).
- **Hero subhead and "Smart companies are already sprinting…" are final owner choices.** Reviewers are told not to deduct for them.
- **Mobile:** the monthly loop is drawn as a dashed bracket from step 3 back to step 1; "Who's already moving" shows two items on phones, four from `sm` up.

## 2026-10-10: Month to month; hero names the assistants we check

- **Commitment:** ongoing work is month to month, stop anytime. New FAQ "Is there a long contract?"; step 3 label "Every month, stop anytime".
- **Hero assistant list matches the check:** "ChatGPT, Google's AI, Gemini, Perplexity and Claude". **Supersedes** the earlier "Claude, Gemini, ChatGPT, Grok and Muse" wording (reviewers flagged the coverage mismatch three rounds running).

## 2026-10-10: Recurring offer, plainer headings, lighter pages

- **Ongoing support is part of the offer, not optional.** The owner wants a recurring business that pays back acquisition cost. Step 3 is now "Stay ahead" (label "Every month"): re-run the check, keep facts current, improve booking. A loop note ties each month's check to the next round of fixes; the sample plan ends with a monthly line; the pricing FAQ says ongoing work is a monthly fee agreed up front. **Supersedes** "Ongoing support (optional)" in the brief and the 2026-10-04 three-step decision.
- **"Move atoms, not bits" is a quote, not a heading.** The hero eyebrow is now "For tours, rentals, auto, home services and stays"; the founder H2 is "Over a decade building how people buy and rent cars online." The phrase stays out of headings; the footer and site description name the business types instead.
- **Book pillar:** "Age, waiver and group-size rules shown before checkout" was confusing and minor. Replaced with "Live times and prices on the page they land on" and "Fewer steps to a confirmed booking on a phone". The sample plan's "ask for ages" fix became "Cut the steps from tour page to confirmed booking on a phone".
- **Recurring frame everywhere (after round 12):** How it works H2 "A free check, a round of fixes, then monthly upkeep."; a drawn loop from step 3 back to step 1; the sample-plan caption names both the fixes and the monthly fee; the "What we do" intro, footer and site description say "every month". Plainer headings: "Questions your customers ask AI before they book." and "We fix what AI says, how you take bookings and how you answer questions." The Pew stat card was dropped to shorten "What changed" (the BrightLocal card stays).
- **Less text, more visuals:** the three failure-mode paragraphs became a "Where bookings slip away" flow; the pillars hang off a "Your facts" bar; "How it works" shows the monthly loop; the founder roles are chips; the check page's method paragraph became a questions × assistants × runs = report diagram. Shorter copy throughout.

## 2026-10-10: Founder framing, quote, subhead and urgency line (owner answers)

After review rounds 9 and 10 the owner decided:
- **Founder section: approved facts, with automotive's relevance spelled out.** H2: "Over a decade building digital commerce for businesses that move atoms, not bits." The bio uses the approved line ("building digital commerce products in automotive … moving atoms, not bits") and explains why it transfers: vehicles, locations, staff, eligibility rules and handover times have to line up behind every online purchase or rental. **Supersedes** the 2026-10-04 "demand generation and digital transformation at enterprise scale" framing.
- **Founder quote: approved as written.** Closes the open item from 2026-10-04.
- **Hero subhead: kept, with the assistant list changed** to "Claude, Gemini, ChatGPT, Grok and Muse" (Muse is Meta's personal AI agent, launched Sep 2026), for keyword coverage. The rest of the subhead is unchanged.
- **"Smart companies are already sprinting to get ahead of it." stays.** Reviewers flagged it as unsupported; the owner keeps it as a deliberate urgency line beside the dated "Who's already moving" list.

## 2026-10-10: Positioning against content-led AI visibility services

The owner asked to act on the FirstIndex review (`docs/research/competitor-firstindex.md`). Changes: a labeled sample plan under "How it works", the form's optional field reframed as "What should AI get right about you?", a pricing FAQ that explains why there are no published prices, and an SEO FAQ that says we don't sell an article quota. Competitors stay unnamed on the site. No change to D3a (no prices) or the money-back sentence.

## 2026-10-04: Homepage headline

The owner found "More of your customers are asking AI where to book. Does it get you right?" unclear: book what? The second line also read as awkward. Of four options, the owner chose:

> **Customers now ask AI which local business to book. Does it recommend you, and get your details right?**

The owner's reasons:
- The first line works for any local business, whatever it sells.
- The question names both things that matter: being recommended, and being described correctly.

The headline and the share image (`opengraph-image`) now match; the share image's font is smaller so the longer text fits. It asks a question and makes no promise of recommendations.

**Subhead (same day, owner feedback):** the old subhead had two problems. "Who should I book?" read as if the reader was the one being booked, and the second sentence was a run-on ending in jargon ("booking flow"). The owner chose:

> Customers now ask ChatGPT, Gemini and Google for recommendations before they ever visit your website. We fix what keeps AI from mentioning you, or causes it to get your details wrong. And when customers click through, we make booking with you quick and easy, using the booking system you already have.

It does not say "we make sure AI recommends you", per the hard rule against promising AI recommendations.

## 2026-10-04: "Why it matters" categories

The owner asked for automotive to be its own category, not grouped with home services, and for one existing card to make way for it.

- **Removed: Classes & wellness.** It was the weakest card:
  - It is the least operationally intense of the six.
  - Discovery already runs largely through Mindbody and ClassPass.
  - It is low-ticket.
  - Its example question was a plain schedule lookup.
  - Classes stay in the free-check form's business-type list.
- **Added: Car buying & service**, with the question "Which dealer near me has a certified used RAV4 under $25k I can test-drive Saturday?" It shows the inventory, price and availability details AI gets wrong, and it matches the founder's public background.
- **Renamed: Home & auto services → Home services**, with the question "Which plumber near me can replace a water heater tomorrow?" This avoids a second auto question.
- **Stays & hospitality** has a stronger question: "Which lakeside cabins near Asheville take two big dogs, and what's the pet fee?" It now asks about a policy and a fee AI often gets wrong, not just a yes/no pet rule.
- **New icon:** `automotive` (style B, same prompt, Discover as reference). It took three attempts. The first two read poorly, and variant 3 shows both buying (tag) and service (wrench). The three attempts cost about $0.15. The `classes` icon was removed.
- **Brief:** the audience examples in `docs/brief.md` now include car buying and service.

## 2026-10-04: Custom icons (style B, geometric)

The owner chose **style B: geometric, no outlines** from five rendered options: A outlined, B geometric, C monoline, D linocut, E badge tile. The choice was made on fit with the site's restrained type and hairline borders, and on legibility at 40–64 px.

Two prompt changes were made before generating the full set:
- outer shapes are always oak or deep green, so pale fills never fade into the paper background
- at most one amber detail per icon

**What was built**
- **Icons:** 12 icons in `public/icons/<key>.webp`. Each is 128 × 128 (2× retina at the 40–64 px display sizes) and about 4 KB.
- **Placement:**
  - What we do pillars: 64 px
  - The six question cards: 40 px
  - How it works steps: 56 px
- **Markup:** `next/image` with fixed sizes and `alt=""`, since each icon sits next to a text label.
- **Checks:** no layout shift (CLS 0) and no horizontal scroll at 390 px.
- **Generation:**
  - Script: `scripts/generate-icons.mjs` (`ICON_STYLE` defaults to `geometric`).
  - Raw 1024 px files and token logs are kept outside the repo.
  - Discover, Book and Support were generated from the prompt alone. The other nine passed the approved Discover icon as a style reference through `/v1/images/edits`.

**Model:** `gpt-image-2.5-sunburst` (snapshot 2026-09-08), quality `high`, 1024 × 1024, transparent background, PNG.

**Cost:** about **$1.55** for 27 images, including the first round in style A and the four alternative styles.
- Tokens: 47.4k image output tokens at $30/M, 8k text input tokens at $5/M and 9.2k image input tokens at $8/M.
- That works out to about $0.05 per icon.

**Final style prompt** (shared by every icon, followed by `Subject: <per-icon line>` from the script):

> A single modern geometric icon for a calm, premium consultancy website. Built only from solid flat shapes with no outlines or strokes at all; forms are simplified to circles, rounded rectangles and clean arcs with generous corner radii. Depth comes only from overlapping shapes in different tones of the palette; one flat shade tone per shape at most, light from the top left. The silhouette must read strongly against a pale off-white page: the outer shapes are oak green or deep green, and soft green and paper tones appear only on top of darker shapes, never as the outer edge of the subject. Amber is used sparingly: at most one small amber detail in the whole icon, never more than one amber element. No gradients, no 3D, no gloss, no texture, no drop shadow. Strict palette, no other hues: oak green #1f5c3a (primary), deep green #13241b (darkest tone), soft green #e2eee5 (light fills), paper #f5f4ee (lightest), and at most one small amber #f6c343 accent. Fully transparent background, nothing behind the subject: no ground, no circle badge, no backdrop. One centered subject on a square canvas, occupying about 70% of the frame with generous even padding. No text, no letters, no numbers, no logos. Bold simple silhouettes with few details so it reads clearly at 48 to 64 pixels.

With a reference image, this line is added before the subject: "Match the attached reference icon's style exactly: the same outline weight, the same shading method, the same palette, padding and level of detail. Draw only the new subject, not the reference subject."

**Subjects:** as listed in `docs/icon-brief.md`, except that `rentals` uses the rental key on a tag rather than the pontoon boat.

## 2026-10-04: Owner follow-up answers

| # | Decision | Supersedes / notes |
|---|---|---|
| D3b′ | **The money-back promise is a blanket statement: generous, all paid work, no window, no conditions** ("given I'm just starting out"). | Closes the open D3b question. Revisit as volume grows. |
| D7′ | **No results or metrics from past or current employers on the site.** Employer names and roles are career background only. The founder may discuss industry trends and patterns. | **Supersedes D7** (resume figures as proof). Proof now rests on background, method, the sample report, Oakheart's own measured visibility, and later client case studies. |
| D8 | **Lead notifications go to yilun@oakheartlab.com.** | A sending service still needs credentials (e.g. Resend API key, set as a Vercel env var, never committed). |
| D9 | **Check-runner data provider: DataForSEO.** Its AI Optimization APIs (LLM responses and mentions across ChatGPT, Claude, Gemini, Perplexity) and SERP API (Google AI Overviews) cover all engines through one vendor. | Replaces the separate per-engine API keys in plan §4.3. Credentials are stored as Vercel env vars. Verify current endpoint coverage and pricing at build time. |
| D7″ | **Founder information: only what is already public.** Verified public source: oakheartlab.com/about. LinkedIn could not be fetched, so LinkedIn-only and resume-only details wait for owner confirmation. | Refines D7′. |
| D7‴ | **LinkedIn export supplied.** Public titles, dates, Atlanta and education approved. Fleetbit, the PM guide and "15+ years" are not public, so they are excluded. Private LinkedIn data is ignored, and the export is not stored in the repo. | Closes the pending founder items in the brief. |
| D10 | **Headshot supplied:** `public/images/yilun-zhang.jpg`. | |

**Still open:** sending-service credentials (D8); DataForSEO credentials (D9); any business willing to be the named sample report.

## 2026-10-04: Owner answers to the execution-plan inputs (Yilun, in session)

| # | Decision | Supersedes / notes |
|---|---|---|
| D1 | **ICP: consumer-facing businesses with high operational intensity: companies that move atoms, not bits.** Not a single vertical; motorsport is only one example source. | Supersedes plan v1's "motorsport first." |
| D2 | **Lead with AI-driven demand: Found → Booked → Supported.** The website and booking build stays the core paid offer. | Changes AGENTS.md "lead with websites and booking flows; AI is a delivery method." Proceeding on the plan default: the owner did not object when the plan was presented. Revisit if the owner disagrees. |
| D3a | **No prices on the website.** | Pricing page dropped from the IA. "One price agreed before we start" remains. |
| D3b | **Money-back promise: "If you're not happy with our service, we'll give your money back, no questions asked."** | Supersedes the AGENTS.md "no guarantees" rule *for this specific satisfaction guarantee only*. It is still not a performance guarantee, and we still never promise rankings or AI recommendations. **Open:** the refund window and which fees it covers (project fee, monthly fee). Until confirmed, the site states the promise without an invented window, and the terms are written before the first paid engagement. |
| D3c | **Free AI Visibility Check: unlimited, delivered in under 24 hours.** | Requires a semi-automated check runner (plan §4.3) to be sustainable. The tailored preview stays as step 2. |
| D5 | **Move hosting to Vercel** (Postgres via Neon replaces D1). | Supersedes AGENTS.md "use Sites skills for publishing." No DNS change to oakheartlab.com until cutover is planned; email DNS untouched. |
| D6 | **Allow indexing, analytics, and AI crawlers (search *and* training).** | Supersedes the AGENTS.md noindex and no-analytics hold, effective at launch. Keep noindex on preview deployments. |
| D7 | **Proof: the founder's resume and LinkedIn may be used** (https://www.linkedin.com/in/yilun-zhang-7b804510/). | Supersedes "no proprietary metrics copied" for the figures stated on the owner-supplied resume. Present them as the founder's career results, never as employer endorsements or Oakheart client results. **Confirm:** the owner is OK publishing figures from a current employer (Hertz) on a commercial site. |

**Still open:** notification destination for new leads (default: `yilun@oakheartlab.com` via a transactional email service, which needs an API key); scheduling URL for calls; refund window and scope (D3b); API keys for the check runner (OpenAI, Perplexity, Gemini, Anthropic, and SerpAPI or DataForSEO for Google AI Overviews).

## 2026-10-04: Existing site is reference only

The owner directed that the existing site (branch `codex/import-oakheart-site-v19`) is used **only as a reference**. It is evaluated as the Round 0 baseline, and the new site is designed and built from first principles. No code or design system is carried over. An accidental merge of the reference source into `claude/jolly-meitner-altfse` was undone by a follow-up commit; the reference branch is unchanged.

## 2026-10-04: Database

The owner connected the existing Neon database (`neon-cinnabar-castle`, also used by the ptc-concept project) to the oakheart-lab Vercel project. This site's data lives in its own `oakheart` schema (migration `db/migrations/0001_check_requests.sql`) and never touches the other project's tables. It can move to a dedicated database later without code changes beyond the connection string.

## 2026-10-04: Pre-launch URL base

`NEXT_PUBLIC_SITE_URL=https://oakheart-lab.vercel.app` is set in Vercel, so canonicals, Open Graph images and JSON-LD links resolve before the domain moves. **At cutover:**
1. Set it to `https://www.oakheartlab.com`.
2. Move the Substack to a subdomain (e.g. `writing.oakheartlab.com`). The site already links to the Substack profile at `substack.com/@oakheartlab`, which doesn't depend on the custom domain.

## 2026-10-04: Availability

The owner decided **not** to publicly address availability or capacity alongside the current Hertz role. Reviewers have raised it as a buyer question; it is a deliberate choice, not an open defect. The site does not add capacity or side-practice statements. (Update, same day: the "You work with him directly" line was also removed at the owner’s request.)

## 2026-10-04: How the free check runs before the runner exists

Until the DataForSEO check runner is built (cutover item 8), the free check is run by Yilun by hand: the same questions on each assistant, repeated, compared against the business's site. The site says exactly that. It does not describe software or a data service that isn't live yet.

## 2026-10-04: Brand color

The owner chose **Oak green** (`#1f5c3a` accent, `#f5f4ee` paper, `#13241b` night) from six rendered options, replacing Ember orange. The example AI-answer card's "Not mentioned: Your business" highlight uses **amber** (`#f6c343` border, `#fdeec9` fill, `#7a4f00` text), so it stays distinct from both the brand green and the semantic green "Correct" tag. All text and button pairs meet WCAG AA (white on green 7.9:1; amber text on amber fill 6.2:1). The logo mark, favicon and share image use the new green.

## 2026-10-04: Pillar names and founder framing

- **Pillars renamed** from Found / Booked / Supported to **Discover / Book / Support** (owner asked for "Discover"; the other two became verbs to match).
- **Founder section reframed** around demand generation and digital transformation for consumer businesses at enterprise scale, and the change the owner has observed over the last nine months. The new quote expresses the owner's stated observation in his voice and **needs his approval of the exact wording**. Roles stay as public facts; no employer metrics.

## 2026-10-04: Size-neutral positioning

The owner isn't yet sure which customer size fits best and believes he can help large businesses too. The site stays **size-neutral**: no "owner-run", "small" or "large companies" framing. The customer is defined by situation (consumer-facing, booking-based, operationally detailed, decided through AI answers), not size. Revisit after the first 20–30 free checks. Under consideration but not done: an optional "How many locations?" form field to learn who shows up.

## 2026-10-04: Three-step offer

The owner simplified "How it works" to three steps:
1. **Free AI check:** the gap audit, in under 24 hours.
2. **A tailored plan** to close the gaps and drive growth, with one price agreed up front, then the work.
3. **Optional ongoing support** to keep up as assistants and competitors change.

The free tailored preview is **dropped** as a separate step and offer, and removed from the site copy, the FAQ and the brief.

## 2026-10-04: Urgency in "What changed"

At the owner's request, the section now shows the pace of adoption and that smart companies are already moving:
- **Chart:** a line chart of ChatGPT weekly active users as announced by OpenAI, 100M (Nov 2023) to 1.2B (Sep 2026), "12× in under three years". Sources are in `docs/research/adoption-facts.md`. The "on track for 700M" projection is excluded.
- **"Who's already moving":** four dated, sourced examples (Booking.com and Expedia, FareHarbor, Google, Yelp).
- **Copy:** the intro now says "Smart companies are already sprinting to get ahead of it."
- **Removed:** the Google "Booking" stat card, since Google now sits in the movers list.
