# Round 9 review (summary)

- **Reviewed:** `e03629f`, 2026-10-10, by a fresh blind reviewer (local production build plus the live site; the live form was not resubmitted by the reviewer).
- **Weighted total: 8.10.** Gates: evidence, conversion, rendering and regression all **pass**.

| # | Dimension | Score |
|---|---|---:|
| 1 | Positioning clarity | 8 |
| 2 | Offer and buyer relevance | 8 |
| 3 | Credibility and evidence integrity | 7.5 |
| 4 | Conversion path and friction | 8.5 |
| 5 | Copy quality and voice | 8 |
| 6 | Visual design and UX craft | 8.5 |
| 7 | Search and AI discoverability | 7.5 |
| 8 | Technical quality and accessibility | 9 |

## Prior findings (round 8)
Closed: 1 (success reveal), 2 (owner email deadline), 5 (Book/Support examples), 6 (one invented business; side effect below), 7 (one-line header at 320 px). Open: 3 (retry job; `CRON_SECRET` missing, and GitHub fires the "3-hourly" schedule about every 7.4 h). Deferred by owner decision: 4 (hero subhead).

## Findings and what happened
| # | Finding | Action |
|---|---|---|
| 1 | Notification retry inactive; real cadence ~7.4 h | **Owner action:** add `CRON_SECRET`; decide on a real scheduler. Not changed. |
| 2 | Sample plan's Book and Support fixes don't follow from an AI-only check | **Fixed:** step 2 and the sample plan now include a walk through the booking path and the questions staff answer most. |
| 3 | Founder framing ("demand generation at enterprise scale") exceeds the approved facts | **Owner decision** (2026-10-04 framing). Not changed; recommended wording: "A decade building digital commerce for businesses that move atoms, not bits." |
| 4 | Quillbay is both competitor (hero) and "you" (report, plan) | **Fixed:** hero competitor renamed "Fernhollow Kayaks". |
| 5 | Hero subhead repeats the H1 and pushes the CTA to the fold | **Owner decision.** Recommended: drop the first sentence. |
| 6 | Unsourced Google claim; "Smart companies are already sprinting" | Google claim **fixed** (quoted and linked to Google Search Central). The "sprinting" line is an owner request (2026-10-04); left for the owner. |
| 7 | Car buying missing from the form; success link; step time labels unrendered; "Also available" missing | **All fixed.** |
| — | Support bullets repeat the handoff point; straight apostrophes; "No sales call" ×4; entity description omits support; thin schema; mobile menu ignores Escape/outside tap; sample plan columns unbalanced | **All fixed** (Atlanta address, founder description, alumniOf, knowsAbout added to JSON-LD). |
| — | Resubmitting within 24 h drops a newly added "AI should get right" answer | Not changed (edge case). |
| — | No privacy page | Not changed; a launch item. |

**Counterargument recorded:** the site sells AI-visibility worry while the paid work is a booking and support build, and the Book and Support work has the least evidence on the page.
