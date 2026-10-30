# Launch and cutover checklist

These items are deliberately deferred until oakheartlab.com moves from Substack to this site. Each lists its owner and where to change it.

| # | Item | Where | Owner |
|---|---|---|---|
| 1 | **Done 2026-10-26.** Substack custom domain moved to `blog.oakheartlab.com` (root-domain redirect disabled) | Substack settings | Yilun |
| 2 | **Done 2026-10-26.** `www` CNAME → Vercel, apex and `*` A → `216.198.79.1` (apex redirects to `www`); email DNS untouched | DNS (Network Solutions) + Vercel → Domains | Yilun |
| 3 | **Done 2026-10-26.** `NEXT_PUBLIC_SITE_URL=https://www.oakheartlab.com` | Vercel env vars | Claude |
| 4 | **Done 2026-10-26** (owner OK). `NEXT_PUBLIC_SITE_INDEXABLE=true` for production only; previews stay noindex | Vercel env vars | Claude |
| 5 | Verify oakheartlab.com in Resend; set `NOTIFY_FROM="Oakheart Lab <checks@oakheartlab.com>"` | Resend → Domains, Vercel env | Yilun |
| 6 | Add the `CRON_SECRET` repository secret (same value as in Vercel) so the 3-hourly notification retry runs | GitHub → Settings → Secrets → Actions | Yilun |
| 7 | Scheduling URL for calls, to replace the "Email Yilun" fallback | `src/content/site.ts` (`talkFirst`) | Yilun supplies, Claude wires |
| 8 | DataForSEO credentials for the check runner. Until it runs, the site says (truthfully) that a person runs every check. Once it is live, update "How we run it" and the "Who runs the check?" FAQ to describe the software step and name DataForSEO | Vercel env, `ops/check-runner/` | Yilun supplies, Claude builds |
| 9 | Submit the sitemap in Google Search Console and Bing Webmaster Tools | Search consoles | Yilun |
| 10 | Redirects for indexed Substack URLs (`/p/*`, `/about`, `/archive`, `/feed`, `/subscribe`, `/s/*`, `/t/*`, `/podcast`, `/notes`) to `blog.oakheartlab.com`. Done in `next.config.ts`; change the subdomain there if Substack moves elsewhere | `next.config.ts` redirects | Claude |
