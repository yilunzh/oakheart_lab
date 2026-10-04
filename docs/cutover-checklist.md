# Launch and cutover checklist

These items are deliberately deferred until oakheartlab.com moves from Substack to this site. Each lists its owner and where to change it.

| # | Item | Where | Owner |
|---|---|---|---|
| 1 | Move the Substack custom domain to a subdomain (e.g. `writing.oakheartlab.com`) before pointing `www` at Vercel | Substack settings | Yilun |
| 2 | Point `www.oakheartlab.com` at the Vercel project; leave email DNS (MX, SPF, DKIM) untouched | DNS + Vercel → Domains | Yilun |
| 3 | Set `NEXT_PUBLIC_SITE_URL=https://www.oakheartlab.com` | Vercel env vars | Claude |
| 4 | Set `NEXT_PUBLIC_SITE_INDEXABLE=true` (removes noindex, opens robots.txt, keeps `/api/` disallowed) | Vercel env vars | Claude, after owner OK |
| 5 | Verify oakheartlab.com in Resend; set `NOTIFY_FROM="Oakheart Lab <checks@oakheartlab.com>"` | Resend → Domains, Vercel env | Yilun |
| 6 | Add the `CRON_SECRET` repository secret (same value as in Vercel) so the 3-hourly notification retry runs | GitHub → Settings → Secrets → Actions | Yilun |
| 7 | Scheduling URL for calls, to replace the "Email Yilun" fallback | `src/content/site.ts` (`talkFirst`) | Yilun supplies, Claude wires |
| 8 | DataForSEO credentials for the check runner. Once it runs, name DataForSEO in "How we run it" (held back until then so the page doesn't describe a pipeline that isn't live) | Vercel env, `ops/check-runner/` | Yilun supplies, Claude builds |
| 9 | Submit the sitemap in Google Search Console and Bing Webmaster Tools | Search consoles | Yilun |
| 10 | Redirects for any indexed Substack URLs that move | `next.config.ts` redirects | Claude |
