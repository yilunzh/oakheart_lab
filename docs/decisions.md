# Decisions log

Newest first. Each entry lists the decision, its source, and what it supersedes. Earlier decisions are recorded in `AGENTS.md` (codex build) and `ops/client-record.json`.

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
