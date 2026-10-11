# Round 14 review (summary)

- **Reviewed:** `7810964` (flat monthly fee, privacy page), 2026-10-10, fresh blind reviewer told not to deduct for the owner-final subhead and "sprinting" line.
- **Weighted total: 8.18.** Gates all **pass**. Scores: Positioning 8 · Offer 8 · Credibility 8.5 · Conversion 8 · Copy 8 · Visual 8 · Discoverability 8 · Technical 9.

## What happened
| Finding | Action |
|---|---|
| Lead alerts from Resend sandbox; GitHub retry skips green | `NOTIFY_FROM` needs a verified oakheartlab.com domain in Resend (owner, DNS). The workflow now **fails visibly** without `CRON_SECRET`. |
| Check FAQ: dangling "If not" | **Fixed.** |
| "Covers everything" vs "Also available" | **Fixed:** "covers the work in your plan"; "Also available, priced separately". |
| Privacy page omissions; public salt fallback | **Fixed:** retention ("until you ask us to delete it"), Google Workspace named, mailto link; `IP_HASH_SALT` set in Vercel. |
| No "monthly" at the close | **Fixed:** final CTA mentions the flat monthly fee. |
| Long SEO FAQ; long mobile "What changed"; long H2; method jab | **Fixed:** SEO answer ~50 words; 45% card hidden on phones; shorter "What we do" H2; jab removed. |
| Schema address not visible | **Fixed:** "He's based in Atlanta, GA." in the founder bio. |
| Mobile loop doubled (bracket plus dashed box) | **Fixed:** plain caption under the bracket. |
