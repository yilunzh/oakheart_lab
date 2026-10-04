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
| 6 | `e984681` | https://oakheart-lab.vercel.app (production at e984681) | pending | Mobile confirmation visible, claim-based retries after response, 3-hourly retry workflow, cutover checklist |
