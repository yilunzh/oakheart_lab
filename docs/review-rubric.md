# Website review rubric

This rubric is given to independent reviewers. It is adapted from the Oakheart skills: the `business-strategy-copilot` review rubric, the `copy-reviewer` review protocol, `software-delivery-agency` research-design and engineering-release acceptance, and the `seo` plugin audits. Keep it fixed across review rounds. (Owner changes 2026-10-11: dimension 5 briefly scored hooks against fixed word budgets; those budgets were removed the same day in favour of the `oakheart:copy-reviewer` protocol, so dimension 5 scores from that day aren't strictly comparable.)

## What the reviewer receives

- The brief (`docs/brief.md`): buyer, offer, approved facts and constraints
- The deployed preview URL and/or the page content
- Screenshots at 390px and 1440px
- Lighthouse, axe and schema-validator output
- On re-review only: the previous round's concrete findings, so the reviewer can check whether each was closed

The reviewer does **not** receive the writer's rationale, prior scores or any target score. The review is diagnosis only. The reviewer does not edit the site.

## Step 1: Recovered meaning (before scoring)

Using only the site, state:
1. Who it is for
2. The problem it addresses
3. What is offered, including the first step and what it costs
4. Why a visitor should believe it
5. What the visitor should do next, and how much effort that takes

Any divergence from the brief is a finding under dimension 1.

## Step 2: Score 8 dimensions (0–10, with evidence for every rating)

| # | Dimension | Weight | What earns a high score |
|---|---|---:|---|
| 1 | **Positioning clarity** | 15% | Within 5 seconds a target buyer recognizes themselves, the problem and the promise. The hero is specific to the buyer, not generic. There is one thesis across pages. |
| 2 | **Offer and buyer relevance** | 15% | Speaks in the buyer's language about their actual decision. The offer ladder, first step, commitment and risk (e.g. refund terms) are clear even without published prices. Pillars read as one system. |
| 3 | **Credibility and evidence integrity** | 15% | Claims trace to evidence. Statistics are sourced and dated. Samples and prototypes are labeled. Founder experience is relevant and not inflated. No implied endorsements. |
| 4 | **Conversion path and friction** | 15% | One primary action that is visible at every decision point. The form asks only what it needs. Errors and confirmation states are clear. Next steps after submit are explicit. Objections are answered near the decision. |
| 5 | **Copy quality and voice** | 10% | Direct, specific and concrete. No generic agency prose, filler slogans or artificial contrasts. Qualifications sit beside claims. Explains the offer plainly: what the visitor does, what we do and how much effort it takes. Concise without cutting needed explanation; adjacent elements don't repeat each other. |
| 6 | **Visual design and UX craft** | 10% | Clear hierarchy, purposeful visuals that carry meaning, consistent system, and polished mobile layout with no wrapping or truncation defects. |
| 7 | **Search and AI discoverability** | 10% | Facts are crawlable as HTML. Schema matches visible content. Entity description is consistent. Answer-first, citable passages. Sensible crawler access, sitemap and canonicals. |
| 8 | **Technical quality and accessibility** | 10% | Mobile Lighthouse performance ≥ 90 (3-run median), CWV within targets, accessibility ≥ 95, no axe serious or critical issues, no broken links, form works end to end. |

**Anchors:** 5 = material rework needed · 7 = useful but important gaps · 8 = strong with limited substantive gaps · 9 = decision-ready, only minor polish · 10 = unusually strong with no meaningful identified defect (fluency alone does not earn it).

An applicable dimension that the reviewer could not inspect is **unverified**, not N/A, and blocks a pass.

Weighted total = Σ(score × weight) / Σ(weights).

## Step 3: Gates (each pass / fail / unverified, with reason)

- **Evidence gate:** no fabricated testimonials, logos, results or reviews. No unsourced statistics. No guaranteed rankings or AI recommendations.
- **Conversion gate:** the primary form submits on mobile and desktop, the lead is received at its destination, and the confirmation is accurate.
- **Rendering gate:** no layout defect at 390px or 1440px impairs reading or action.
- **Regression gate (rounds 2+):** no unrequested loss of strengths noted in earlier rounds.

A failed or unverified gate prevents a pass regardless of the average.

## Step 4: Return

1. The version or commit reviewed, the date, and what was actually inspected
2. The recovered-meaning answers
3. Critical failures and unmet requirements
4. Per-dimension score, evidence and location
5. Gate results
6. Up to 7 prioritized fixes, each with the exact passage or element, why it matters, and the smallest correction
7. Strengths to preserve
8. The strongest counterargument to the site's positioning, and the limitations of this review
