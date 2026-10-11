# Review rounds

Each round is scored by a fresh, blind reviewer against `docs/review-rubric.md`. The goal is a weighted total ≥ 9.0 with no dimension below 8 and all gates passing, or 8 rounds (owner goal, 2026-10-04).

**Live site** (always the latest push to the branch): https://oakheart-lab.vercel.app

| Round | Commit | Deployment | Weighted score | Notes |
|---|---|---|---|---|
| 0 | reference site (`codex/import-oakheart-site-v19`) | not deployed (reference only) | 4.6 (provisional) | Baseline against the new brief |
| 1 | `329727c` | https://oakheart-7ahhv2yxe-oakheart-lab.vercel.app | 7.85 (conversion gate unverified) | First slice: homepage + free check page |
| 2 | `a4c79c0` | https://oakheart-lqgepsjzk-oakheart-lab.vercel.app | 8.00 (conversion gate failed: no owner notification) | Form connected to Neon; Round 1 fixes |
| 3 | `9c91fb5` | https://oakheart-hkp3au6qy-oakheart-lab.vercel.app | 8.40 (conversion gate failed at review time; owner email verified right after) | Notification fallback cron, mobile form order, OG/icon, copy fixes |
| 4 | `f4d913c` | https://oakheart-lab.vercel.app (production at f4d913c) | 8.75 (all gates pass) | Notification logging + test tagging, desktop gap fix, sample report, URL base, copy |
| 5 | `9677fa9` | https://oakheart-lab.vercel.app (production at 9677fa9) | 8.85 (all gates pass) | Invented example names, hero softened, faster notification retry, closing CTA, polish |
| 6 | `e984681` | https://oakheart-lab.vercel.app (production at e984681) | 8.73 (all gates pass) | Mobile confirmation visible, claim-based retries after response, 3-hourly retry workflow, cutover checklist |
| 7 | `8ec0e75` | https://oakheart-lab.vercel.app (production at 8ec0e75) | 8.90 (all gates pass) | Truthful method copy (manual checks), Service/Offer schema, no-double-send window, failing cron on missed sends, copy polish |
| 8 | `860a3ae` | https://oakheart-lab.vercel.app (production at 860a3ae) | 8.50 (all gates pass) | Copy pass, crash-safe retry lease, 320px fixes |
| 9 | `e03629f` | https://oakheart-lab.vercel.app | 8.10 (all gates pass) | Positioning vs content-led competitors: sample plan, outcome-first form field, pricing/SEO FAQs; one-line header at 320px |
| 10 | `89f8483` | https://oakheart-lab.vercel.app | 8.20 (all gates pass) | Round-9 fixes. Remaining gaps are owner decisions (founder framing, hero subhead, urgency line) and ops (Resend domain, `CRON_SECRET`, privacy page) |
| 11 | `1d41c58` | https://oakheart-lab.vercel.app | 8.35 (all gates pass) | Owner decisions: founder section on approved facts, quote approved, subhead names Claude, Gemini, ChatGPT, Grok and Muse |
| 12 | `a164083` | https://oakheart-lab.vercel.app | 7.85 (all gates pass) | Recurring offer, plainer headings, visuals; recurring frame only half-carried |
| 13 | `44aa7a9` | https://oakheart-lab.vercel.app | 8.23 (all gates pass) | Recurring frame throughout, month-to-month FAQ, hero matches the check, plainer headings |
| 14 | `7810964` | https://oakheart-lab.vercel.app | 8.18 (all gates pass) | Flat monthly fee, privacy page, mobile loop; owner-final subhead and urgency line not deducted |
| 15 | `8e21c89` | https://oakheart-lab.vercel.app | 8.75 (all gates pass) | Round-14 fixes, privacy details, IP salt set, visible retry failure |
| 16 | `736a70a` | https://oakheart-lab.vercel.app | 8.65 (all gates pass) | Round-15 fixes; assistant count still inconsistent in one caption |

## Outcome (8 rounds complete)

The goal was a weighted score of 9.0 or more, or 8 rounds. **All 8 rounds are done. The best score was 8.90 (round 7).** Rounds 4–8 passed all four gates. No round reached 9.0.

| | R0 (old site) | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|---|---|---|---|---|---|---|---|---|---|
| Weighted | 4.6 | 7.85 | 8.00 | 8.40 | 8.75 | 8.85 | 8.73 | **8.90** | 8.50 |
| Gates | – | conv. unverified | conv. fail | conv. fail | all pass | all pass | all pass | all pass | all pass |

Each fresh reviewer re-examined the whole site and found new issues. Round 8 found an intermittent confirmation-visibility race that earlier single-run checks missed. Scores from rounds 4–8 therefore sit in a narrow band (8.5–8.9) rather than rising steadily.

**Post-round-8 fixes** (`docs/reviews/round-8.md`), deployed but not separately scored:
- **Confirmation race:** fixed; browser check now runs 20 times with random latency.
- **Owner email:** now states the submission time and the report deadline, and flags delayed notifications in the subject.

**Still open from the last reviews:**
- **Owner actions:** add the `CRON_SECRET` GitHub secret; verify oakheartlab.com in Resend; send a scheduling URL; send DataForSEO credentials (see `docs/cutover-checklist.md`).
- **Copy:**
  - shorten the hero subhead (it is also the mobile LCP element, about 2.5 s in lab tests)
  - give Booked and Supported one concrete operational example each
  - use one invented business across the hero card and the sample report
- **Layout:** keep the header on one line at 320 px.
