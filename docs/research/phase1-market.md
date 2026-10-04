# Phase 1 market research: AI-assisted local discovery, buyers, competitors

Prepared 2026-10-04 for the Oakheart Lab website. Every claim carries a source URL and date. "Accessed" means the page shows no date, so the access date is given instead.

**Evidence labels**
- **R (reliable):** primary data from an independent researcher, or an official first-party statement of the company's own product or metrics. First-party usage metrics are self-reported, so attribute them ("Google says…").
- **V (vendor research):** the methodology is disclosed, but the publisher sells a product the finding supports. It is usable with attribution, but it is not neutral.
- **W (weak):** vendor marketing, an undisclosed method, figures seen only in search snippets or secondary blogs, or a page we could not open.
- **⚠ OLD:** more than 18 months old, meaning published before 2025-04-04.
- **⚠ VI:** the source has a commercial interest in the claim.

Context from `docs/decisions.md` (D7′, 2026-10-04): no employer results or metrics go on the site. Employer names and roles are background only. D9: the check runner uses DataForSEO.

---

## 1. AI assistant usage for local and booking decisions

### 1a. Adoption

| Figure | Source / date | Label |
|---|---|---|
| 45% of US consumers used AI tools (ChatGPT, Gemini, Perplexity and others) for local business recommendations, up from 6% the year before. AI now ranks 3rd as a recommendation source, behind Google and Facebook. n=1,002, SurveyMonkey panel. | BrightLocal LCRS 2026, https://www.brightlocal.com/research/local-consumer-review-survey/ (2026-02-11) | V ⚠VI (BrightLocal sells local SEO and AI-visibility tools). The jump from 6% to 45% in a single year suggests the question wording changed, so treat it as directional. |
| Of all consumers, 31% used ChatGPT and 23% used Google AI Mode for business recommendations. 64% of 30–44-year-olds used AI, against 24% of those over 60. 97% of AI users double-check AI recommendations against real reviews. | BrightLocal, https://www.brightlocal.com/research/lcrs-ai-trust/ (2026-03-10) | V ⚠VI |
| Google: AI Mode has "surpassed 1 billion monthly active users", and the Gemini app has 950M MAU. | Alphabet Q2 2026 CEO remarks, https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2026/ (2026-07-22) | R (self-reported) |
| Google: AI Overviews reach more than 2.5B users per month. | Reported from the Q2 2026 call, https://www.fool.com/investing/2026/08/25/sundar-pichai-says-alphabets-ai-products-now-reach/ (2026-08-25). Our fetch of blog.google did not show this line. | W until confirmed in the transcript |
| ChatGPT has 900M weekly active users and 50M paying subscribers. | OpenAI via TechCrunch, https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users (2026-02-27) | R (self-reported) |
| ChatGPT has 1.2B weekly users, per DevDay on 2026-09-29. | Only secondary blogs, e.g. https://fourweekmba.com/ai-chatgpt-12b-weekly-users-devday-2026-distribution/ | W (primary source not found) |
| "Seeking Information" grew from 14% to 24% of ChatGPT messages. "Practical Guidance" is about 29%. 49% of messages are "Asking". Based on 1.1M messages, May 2024 to Jun 2025. | NBER w34255, Chatterji et al. (OpenAI and Harvard), https://www.nber.org/system/files/working_papers/w34255/w34255.pdf (2025-09) | R, though the authors include OpenAI staff. The paper has no local or booking breakdown. |
| Counterweight: on US desktop in 2025, Google handled 73.7% of search activity across 41 sites. AI tools combined (ChatGPT, Claude, Copilot, Gemini, DeepSeek) handled 3.2%. ChatGPT trailed Amazon, Bing and YouTube. | SparkToro/Datos, https://sparktoro.com/blog/new-research-search-happens-everywhere-an-analysis-of-41-websites-with-significant-search-activity/ (2026-03-03) | R. Datos is a Semrush company, so there is mild ⚠VI. Desktop only. |
| Of US travelers, 39% used AI for travel and 56% used AI for planning, booking or in-destination help on at least one trip. | Phocuswright, https://www.phocuswright.com/Travel-Research/Research-Updates/2025/search-slips-ai-surges (2025) | W: **the page returned 403 and the figures come from search snippets only** |
| Of travelers, 8% are comfortable letting AI handle bookings, and about 70% prefer to book with trusted brands. | Expedia Group survey via Skift, https://skift.com/2026/04/14/expedia-ai-survey-travel-discovery-booking-8-percent/ (2026-04-14) | V ⚠VI (Expedia benefits from "book with brands"). Sample size not disclosed. |
| Travelers: 33% use AI to discover experiences and 53% use it for destination research. Operators (n=505, Mar 2026): 56% say AI feels "overwhelming", and 44% "received inaccurate information from AI tools". | GetYourGuide/Arival, https://www.getyourguide.press/blog/tettspring2026 (2026-05-26) | V ⚠VI (OTA) |
| Use of AI for tour discovery was 8% in the US and 7% in Europe in 2025. The 2026 follow-up (n=2,550) says AI "rivals" Google and social media for some segments, but the 2026 figures are paywalled. | Arival, https://arival.travel/article/ai-new-search-for-affluent-travelers/ (2026-03-30) | V (the 2026 numbers are not accessible) |
| Claude: we found **no** local or booking-specific usage data. Similarweb puts Claude at about 9% of AI-platform web traffic, against ChatGPT at 53% and Gemini at 27–28%. | Similarweb, https://aisearch.similarweb.com/blog/gen-ai-stats/ (2026-07-29) | V ⚠VI (Similarweb sells AI-traffic tracking) |

### 1b. Click-through effects of AI Overviews

| Figure | Source / date | Label |
|---|---|---|
| When an AI summary appeared, users clicked a traditional result on 8% of visits, against 15% without one. They clicked a link inside the summary on 1% of visits. Sessions ended after 26% of AI-summary pages against 16% for others. 18% of searches produced a summary. The study used 900 adults and 68,879 searches from **March 2025**. | Pew Research Center, https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ (2025-07-22) | **R (independent)**. The data is now 19 months old, and AI summaries appear more often today. |
| AI Overviews cut the CTR of the position-1 result by 58% (Dec 2023 vs Dec 2025, 300k **informational** keywords, desktop, GSC data). | Ahrefs, https://ahrefs.com/blog/ai-overviews-reduce-clicks-update (2026-02-04) | V ⚠VI (Ahrefs sells AI-visibility tools). Not local queries. |
| The earlier Ahrefs figure was −34.5%. | https://ahrefs.com/blog/ai-overviews-reduce-clicks/ (2025-04-17) | V, superseded |
| On queries with an AIO, organic CTR was 0.52% when the brand was not cited and 0.70% when it was. Without an AIO it was 1.45%. Cited brands get 35% more organic clicks and 91% more paid clicks. Data: 42 client organizations, Jun 2024 to Sep 2025. | Seer Interactive, https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update (2025-11-04) | V ⚠VI (an agency selling AIO services). The sample is its own clients. |
| **Local nuance:** across 540 queries in 3 cities and 6 industries, AIOs appeared on 68% and the local pack on 39%. For pure local-intent queries the picture flips: AIOs appeared on 15% and the local pack on 93%. For informational queries AIOs appeared on 92%, and for hybrid queries ("cost of braces in Chicago") on 97%. In one dataset, 60% of AIO citations went to third-party sites. | Whitespark, https://whitespark.ca/blog/case-study-the-prevalence-of-ai-overviews-in-local-search/ (2025-05-12) | V ⚠VI (local SEO vendor). Close to the 18-month limit. The verticals are services, not experiences. |

### 1c. Referral traffic from AI assistants

| Figure | Source / date | Label |
|---|---|---|
| AI platforms sent an average of 770.7M referral visits a month worldwide (Jun 2025 to May 2026), up 117% YoY. ChatGPT sent more than 80% of AI referrals to the top 1,000 domains. Travel averaged 44.5M visits a month, up 116% YoY. 22.6% of ChatGPT travel answers included web citations (US desktop, May 2026), the highest rate of any category. AI referrals remain "a low single-digit percentage" of most sites' traffic. | Similarweb, https://aisearch.similarweb.com/blog/ai-referral-traffic-by-industry/ (2026-09-03) | V ⚠VI |
| After a May 2026 update, ChatGPT referrals to homepages rose from about 26–29% to about 62–63%. About 26% of ChatGPT responses now contain an ad. | Similarweb, https://aisearch.similarweb.com/blog/gen-ai-stats/ (2026-07-29) | V ⚠VI |
| US retail: AI referrals were up 62% YoY in July 2026. AI visits convert 60% better and earn 53% more revenue per visit than non-AI visits, the 11th straight month that AI visits converted better. | Adobe Analytics via Digital Commerce 360, https://www.digitalcommerce360.com/2026/08/19/adobe-ai-referral-traffic-data-july-2026/ (2026-08-19) | V ⚠VI (Adobe sells AI-visibility tooling). **Retail only.** A travel figure of "+194% YoY" appeared only in a snippet (W). |
| Operators say AI-referred traffic bounces 45% less. | GetYourGuide (above, 2026-05-26) | V ⚠VI |

### 1d. Product shifts that move booking into the assistant (all R, first-party)
- **Google** (I/O, 2026-05-19): agentic booking expands to "local experiences and services". For home repair, beauty and pet care, Search will "call businesses on your behalf". Rollout to all US users in summer 2026. https://blog.google/products-and-platforms/products/search/search-io-2026/
- **Google** (via SEJ, 2025-11-17): agentic restaurant booking went US-wide, with event tickets and local appointments in Labs. https://www.searchenginejournal.com/google-extends-ai-travel-planning-and-agentic-booking-in-search/561251/ . Partners named in secondary sources (Booksy, Vagaro, Fresha) are W.
- **OpenAI** (2025-10-06): apps in ChatGPT, with Booking.com and Expedia live and OpenTable and Tripadvisor to follow. https://openai.com/index/introducing-apps-in-chatgpt/
- **FareHarbor** (2026-04-15): FareHarbor operators can be booked inside ChatGPT with live availability. This is early access and requires the FareHarbor Distribution Network. https://marketing.fareharbor.com/blog/chatgpt-fareharbors-newest-distribution-partner/ (⚠VI)
- **Yelp licenses reviews, photos and business data to OpenAI** (330M reviews according to secondary sources), plus Request-a-Quote inside ChatGPT. Axios via Yahoo, https://finance.yahoo.com/media-advertising/articles/exclusive-yelp-deal-pushes-local-130005436.html (2026-07-23). The August extension to restaurant reservations is W (snippet only).
- **ChatGPT Maps** launched in August 2026 using "trusted third-party providers". This comes from secondary sources only (W). The OpenAI help page returned 403.
- **ChatGPT self-serve ads** opened to US businesses on 2026-05-05. https://qz.com/openai-chatgpt-ads-manager-self-serve-us-businesses-050626 (W/secondary)

### 1e. The 3–5 figures safest to quote on the site
1. **Pew Research Center (22 Jul 2025):** when Google showed an AI summary, users clicked a traditional result on 8% of visits, against 15% when it did not. Say "in March 2025 browsing data".
2. **Google, Q2 2026 earnings remarks (22 Jul 2026):** AI Mode has passed 1 billion monthly active users. Attribute it to Google.
3. **OpenAI via TechCrunch (27 Feb 2026):** ChatGPT has 900 million weekly active users. Attribute it to OpenAI.
4. **BrightLocal Local Consumer Review Survey (11 Feb 2026, n=1,002 US adults):** 45% of consumers used AI tools for local business recommendations. Name BrightLocal and do not frame the 6%→45% jump as precise.
5. **Google I/O (19 May 2026):** Google says Search will book local experiences and services and call some businesses on the user's behalf. This is a fact about the product, not a statistic, so it is low-risk and on-thesis.

Avoid as headline claims: the Ahrefs 58% (informational queries, vendor), the Adobe conversion lift (retail only), the Phocuswright snippets (not verified), and ChatGPT's 1.2B (no primary source).

---

## 2. How AI assistants choose which businesses to recommend

### 2a. Official guidance (R, first-party)
- **Google Search Central, "Optimizing for generative AI features"** (last updated 2026-07-10; announced 2026-05-15). https://developers.google.com/search/docs/fundamentals/ai-optimization-guide and https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing
  - AI features are "rooted in our core Search ranking and quality systems". To be eligible, a page "must be indexed and eligible to be shown in Google Search with a snippet".
  - Google recommends unique, "non-commodity", people-first content and public, crawlable pages.
  - It says to use **Google Business Profile and Merchant Center** where relevant.
  - It says these are **not needed**: llms.txt ("Google Search itself doesn't use them"), content "chunking", AI-specific rewriting, and special schema. Structured data is not required for AI features.
  - Search Console now has a Generative AI performance report, rolling out to a subset of sites.
- **OpenAI crawlers** (accessed 2026-10-04): https://developers.openai.com/api/docs/bots. **OAI-SearchBot** surfaces sites in ChatGPT search, and sites that block it "will not be shown in ChatGPT search answers". GPTBot is for training. ChatGPT-User handles user-initiated fetches. OpenAI's ChatGPT search help page (https://help.openai.com/en/articles/9237897-chatgpt-search) returned 403, so we could not verify its local-results wording from the primary source.
- **Bing / Copilot** (2026-02-10): https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview. Bing Webmaster Tools now reports Copilot citations and "grounding queries". Microsoft's own advice: clear headings, tables and FAQ sections; evidence; fresh content; and **IndexNow** for change notification.
- **Perplexity** (accessed 2026-10-04): https://docs.perplexity.ai/guides/bots. To appear, allow PerplexityBot (search, not training). Perplexity-User fetches on demand and "generally ignores robots.txt". Perplexity publishes no ranking-factor guidance.
- **Data licensing beats optimization.** ChatGPT's local answers now draw on licensed Yelp data (Axios, 2026-07-23, above), and FareHarbor and Booking.com feed ChatGPT directly. Being correctly represented on the platforms the assistants license from is an official, verifiable lever.

### 2b. Independent and vendor studies on what correlates with being cited
| Finding | Source / date | Label |
|---|---|---|
| 200,085 local searches on ChatGPT, AI Mode and AIO, with 1.9M citations. Repeat runs overlap only 20–33%. Google Maps showed tracked businesses 66% of the time, against 32–38% for the AI platforms. Business sites made up 93% of unique source domains and 42% of citations. Answers name 2.5 businesses (AIO) to 4.1 (ChatGPT). 53–59% of recommendations fall within 5 km. | BrightLocal, https://www.brightlocal.com/research/local-ai-visibility-study/ (2026-09-16) | V ⚠VI |
| Across 6.8M citations from ChatGPT, Gemini and Perplexity (Jul–Aug 2025, 4 sectors), 86% came from "brand-managed" sources: websites 44% and listings 42%. Reddit made up 2% once location was applied. Gemini leans toward websites and OpenAI toward listings. | Yext, https://www.yext.com/about/news-media/ai-citations-release (2025-10-09) | V ⚠VI (Yext sells listings) |
| Across 75k brands, branded web mentions correlate with AI Overview visibility at 0.664, against 0.218 for backlinks. A Dec 2025 follow-up found YouTube mentions at about 0.737. | Ahrefs, https://ahrefs.com/blog/ai-overview-brand-correlation/ (Aug 2025; follow-up per secondary sources) | V ⚠VI. Correlational. National brands, not local. |
| **Adding JSON-LD schema produced no significant uplift in citations** (1,885 pages against about 4,000 controls, Aug 2025 to Mar 2026). AIO citations fell 4.6% relative to controls. | Ahrefs via SER, https://www.seroundtable.com/study-schema-citations-study-41311.html (2026-05-13) | V. Note the selection effect: the pages already had more than 100 AIO citations. |
| The same prompt returns the same brand list less than 1% of the time across ChatGPT, Claude and AIO (2,961 prompts, 60–100 runs each). "Any tool that gives a 'ranking position in AI' is full of baloney." | SparkToro/Gumshoe via SEJ, https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/ (2026-01-30) | R (independent researcher, co-run with a vendor) |
| ChatGPT recommends 1.2% of multi-location brand locations, Gemini 11.0% and Perplexity 7.4%, against 35.9% in the Google 3-Pack. Based on 350k locations. | SOCi LVI 2026 via press release, https://natlawreview.com/press-releases/ai-search-recommends-only-12-local-businesses-rest-are-invisible (2026-03-10) | V ⚠VI |
| ChatGPT local sources: business websites 58%, mentions 27%, directories 15%. Yelp was absent at the time. | BrightLocal, https://www.brightlocal.com/research/uncovering-chatgpt-search-sources/ (2024-12-12) | V ⚠OLD, superseded by the Yelp licensing deal |

**What holds up across the sources (synthesis):** Indexable, crawlable business websites are the largest citation source, according to BrightLocal 2026 and Yext. Listings and review platforms carry more weight in OpenAI's pipeline: Yext's data shows it, and the Yelp deal confirms it. Reviews and rating thresholds filter the results. Off-site mentions correlate more strongly than links. Proximity still matters. Results are volatile, so the measurement that holds is mention *rate* over many runs, not *rank*.

### 2c. Community claims (unverified or contradicted)
- **"Install llms.txt"**: Hibu says it has installed llms.txt files on every client site (https://hibu.com/blog/marketing-solutions/hibu-is-making-sure-your-small-business-stays-visible-in-ai-search, 2025-08-08). **Google says Search does not use llms.txt.**
- **"Schema or FAQPage is the key to AI citations"**: widely repeated on agency blogs. The Ahrefs controlled test found no uplift, and Google says schema is not required. Schema is still useful for accurate facts (hours, prices, offers) and rich results, but it should not be sold as a citation lever.
- **"About 150 reviews or 4.3★ needed for ChatGPT"**: the BrightLocal averages are 4.3★ on ChatGPT, 4.1 on Perplexity and 3.9 on Gemini. A hard review-count threshold appears only on agency blogs (W).
- **"ChatGPT uses Bing's top 20–30 results"**: practitioner claim, not confirmed by OpenAI (W).
- **"AI ranking position" tools**: contradicted by SparkToro.

---

## 3. Buyer reality: operationally intensive consumer businesses

### 3a. Common booking systems and how they make money
| Vertical | Systems | Model / price (source) |
|---|---|---|
| Tours, activities, rentals | **FareHarbor** | No operator subscription. The customer pays a booking fee, usually cited as 6%, with more on third-party channels. Source is competitor pages, e.g. https://www.bokun.io/fareharbor-pricing (accessed 2026-10-04), W ⚠VI. FareHarbor's own pricing page failed to load. |
| | **Peek Pro** | Variable booking fee "up to 6–8%", pricing quote-based. Competitor page https://www.bokun.io/peek-pro-pricing, W ⚠VI |
| | **Checkfront** | $99/month plus a 3% online booking fee, which the operator can absorb or pass on. https://www.checkfront.com/pricing/ (accessed 2026-10-04), R |
| | Rezdy, Bókun, Xola, Booqable (rentals) | Not priced here |
| | **OTAs (Viator, GetYourGuide)** | Viator does not publish its operator commission. Operators report 20–30%, with more for Accelerate placement. https://otaplaybook.com/viator-commission-rate-what-operators-actually-pay/ (W) |
| Fitness, wellness, studios | **Mindbody** | Per-location tiers, with "Starter" around $129/month. Higher tiers are quoted. https://vibefam.com/mindbody-pricing/ (W ⚠VI, competitor) |
| Salons, beauty, barbers | **Vagaro, Booksy, Square Appointments, Fresha** | Booksy Boost takes 30% of a new client's first visit, with a $10 minimum and $100 maximum. https://support.booksy.com/hc/en-us/articles/16486248108946-How-does-Boost-pricing-work (R). Square Appointments has a free Solo tier, with paid tiers on its pricing page (https://squareup.com/us/en/appointments/pricing; prices did not render). |
| Home and auto services | **ServiceTitan** (enterprise, quote-only, annual contracts); **Housecall Pro** | Housecall Pro costs $79, $189 or $329 per month billed monthly, with no long-term contract. https://www.housecallpro.com/pricing/ (accessed 2026-10-04, R) |
| Moving and storage | SmartMoving, Supermove | Not priced. Cons below. |
| Hospitality / vacation rental | Property management systems and booking engines (Rezfusion and others) | Not researched in depth |

### 3b. Pain points in operators' own words
- FareHarbor (Capterra, https://www.capterra.com/p/135106/FareHarbor/reviews/, accessed 2026-10-04): "Customers constantly complained that it was hard to use" (Owner, Maritime, 2025-07-25). "you have to hit the 'increase' button a million times because it won't allow you to enter your guests" (2026-06-03). "The bookings fees of 6,00% is very high" (Hospitality CEO, 2023-11-21 ⚠OLD).
- Vagaro (Capterra, https://www.capterra.com/p/153752/Vagaro/reviews/): "Brand customization options for the website booking widget remain fairly basic" (2026-08-03). "It lets people book outside my hours when cleanup time is added" (2026-04-12). "Cannot customize the amount of a deposit per an appointment" (2026-04-15).
- Mindbody (Capterra, https://capterra.com/p/40229/MINDBODY/reviews/?page=6): "Mindbody takes a lot of fees for new clients that sign up using the platform" (2025-02-25). "They kept going up in price all the time and never offered a better experience" (2025-02-09). Reddit quotes compiled by a competitor (https://vibefam.com/switching-from-mindbody-reddit-2026/, 2026-07-05, ⚠VI): "they make it impossoble for you to leave… you don't actually own your cleints" (r/mindbody). "Support that's great during sales, then vanishes" (r/gymowner).
- Booksy: barbers report being charged the Boost commission for clients who came through their **own** website or Google profile via a Booksy link. Source is competitor summaries, e.g. https://www.setora.co.uk/blog/booksy-boost-commission-explained (W ⚠VI).
- ServiceTitan (Capterra, https://capterra.com/p/150053/ServiceTitan/reviews/?page=7): "It does soo much that it can be difficult to navigate" (2024-05-20). Reddit threads summarized by third parties report long contracts and painful implementation (W).
- Peek Pro: complaints about variable, unclear fees and setup complexity. Source is aggregated, https://www.capterra.com/p/142459/Peek-PRO-Tour-Operator-Software/reviews/ (we did not fetch it verbatim, W).
- AI-specific: 44% of experience operators "received inaccurate information from AI tools", and 56% find AI "overwhelming" (GetYourGuide, 2026-05-26, V).

**Recurring themes:** fees that eat margin or land on the customer; clunky checkout and party-size or deposit logic; widgets that cannot be branded; data lock-in and export fees; support that fades after the sale; marketplaces charging commission for demand the business generated itself.

### 3c. What they already pay for
- **Booking or field-service software:** $0 to about $400+ a month per location, plus 3–8% booking fees (above).
- **OTA and marketplace commission:** 20–30% on Viator, and 30% of a new client's first visit on Booksy Boost (above).
- **Reputation and messaging tools:** Birdeye is quote-based and secondary sources put it at about $299–$449+ per location per month on 12-month contracts (https://pabau.com/blog/birdeye-pricing/, W). Podium's last listed tiers were $399 and $599 (W).
- **Listings and AI visibility monitoring:** BrightLocal starts at $31/month (https://www.brightlocal.com/local-seo-tools/local-ai-visibility/). Lighthouse Local costs $79–$249/month and Ayzeo starts at $39/month (section 4).
- **SEO agencies:** a poll of 439 providers put the average agency retainer at $3,209/month and the most common band at $501–$1,000. https://ahrefs.com/blog/seo-pricing/ (2024-08-15 ⚠OLD, V).
- **SMB marketing overall (LocaliQ, n≈300, 2026-02-24, https://localiq.com/blog/small-business-marketing-trends-report-2026/, V ⚠VI):** 52% have budgets under $1,000/month, 50% have no marketing staff, and 34% work with at least one marketing partner. They choose partners on price, proven results and reporting transparency.
- **WordStream/LocaliQ (n=300+, 2026-08-17, https://localiq.com/blog/2026-seo-insights/, V):** 40% had traffic disrupted by algorithm changes or AI search, 50% run SEO in-house, and 50% say they monitor AI referrals.

### 3d. Objections to agencies (evidence and inference)
- **"Locked into a contract with nothing to show for it."** Recurring in SEO-agency Trustpilot reviews (e.g. https://ca.trustpilot.com/review/highervisibility.com, W). ServiceTitan and Birdeye contract stories reinforce it.
- **"They don't understand my operation."** "Agency doesn't understand the business" is a top-2 reason clients fire agencies (https://everything-pr.com/the-cmo-agency-trust-gap-2026-why-clients-leave-and-why-agencies-dont-see-it-coming, W, method unclear).
- **"I can't tell if it worked."** Reporting transparency is a top selection criterion (LocaliQ, above).
- **"Will you make me switch booking systems?"** We infer this from the migration dread and export fees in 3b.
- **"AI hype and snake oil."** Supported by the llms.txt and "AI rank" claims in 2c, and by SparkToro's finding.
- **"It's too expensive and I can't commit."** Over half of SMBs spend under $1,000/month on marketing (LocaliQ).

---

## 4. Competitor landscape

### 4a. AI search / AEO / GEO for SMBs and local businesses (12)
| # | Who / URL | Positioning (their words) | ICP | Offer and lead magnet | Proof | Price |
|---|---|---|---|---|---|---|
| 1 | **BrightLocal**, https://www.brightlocal.com/local-seo-tools/local-ai-visibility/ | "AI is recommending local businesses. Is yours one of them?" | Local SMBs, agencies, multi-location | Self-serve visibility score 0–100 across ChatGPT, AI Mode and AIO, up to 20 prompts per location, citation gaps. 14-day free trial. Publishes its own research. | Review ratings, its own studies, case studies | From $31/month |
| 2 | **Birdeye Search AI**, https://birdeye.com/search-ai/ | "Jay diagnoses and fixes AI visibility, by location" | Multi-location brands (healthcare, dental, home services, franchises) | Agentic fixes for listings, FAQs and blogs. "Check My AI Visibility" tool plus a research report. | "30% avg AI visibility increase", G2 badges | Quote-based (about $299+/location/month per third parties, W) |
| 3 | **Yext Scout / Corvo AI**, https://www.yext.com/platform/scout | Visibility intelligence across 4 AI models and 12M locations | Enterprise. Corvo targets SMBs. | Scout plus API/MCP. **Corvo AI is a free texting assistant for SMB owners** (2026-09, https://investors.yext.com/sec-filings/all-sec-filings/content/0001628280-26-059706/ex993q2fy27productupdatepr.htm) | Its 6.8M-citation study | Enterprise quote. Corvo free. |
| 4 | **Local Falcon**, https://www.localfalcon.com/features/ai-search-visibility | AI visibility across ChatGPT, AIO, AI Mode, Gemini and Grok | Local SMBs, agencies | **Geo-grid AI scans** that run the same prompt from many points, Share of AI Voice, free trial | Research blog | Credit-based (not captured) |
| 5 | **Lighthouse Local (Rhetor)**, https://www.lighthouselocal.ai/ | "When customers ask ChatGPT… who to hire, does it say you?" | Solo and single-location service businesses, agencies | **Free 60-second URL audit with a 0–100 score** (on-site signals), monitoring, done-for-you services, white label | Example audits | $79–$249/month; agency $349–$999 |
| 6 | **Ayzeo**, https://ayzeo.com/use-cases/local-businesses | "Know how AI sees your brand, and fix it" | Local businesses | Free 30-second website analysis, schema auto-generation | "5,000+ businesses", "0% to 20% citation rate" | From $39/month |
| 7 | **Insites**, https://insites.com/resources/free-ai-visibility-audit/ | "The local AI visibility intelligence platform" | Agencies and resellers selling to SMBs | **Free white-label audit, no signup**, used as an agency prospecting tool | Agency testimonials | Demo |
| 8 | **HubSpot AEO / AI Search Grader**, https://www.hubspot.com/ai-search-grader | Free one-time check of what ChatGPT, Perplexity and Gemini say "based on their training data" | Marketers | Free score out of 100 covering sentiment and share of voice | HubSpot brand | Free; AEO $50/month |
| 9 | **Semrush free AI visibility checker**, https://www.semrush.com/free-tools/ai-search-visibility-checker/ | Brand visibility in ChatGPT, Gemini, AI Mode and AIO from a 26M+ prompt database | Marketers, SMBs | Free 3×/day per secondary sources | Database size | Free; paid toolkit |
| 10 | **WebFX GEO**, https://www.webfx.com/seo/services/ai-search-optimization/ | "Digital Marketing That Drives Revenue®" | Mid-market B2B and B2C | Free strategy proposal plus OmniSEO® tracking | "$10B+ revenue driven", "586%" case study | From $3,000/month; 6-month commitment per secondary sources |
| 11 | **LocaliQ (Gannett)**, https://localiq.com/products/search-engine-optimization/ | "Be found… in AI-generated answers, recommendations, and summaries" | SMBs: home services, healthcare, auto, travel and entertainment | SEO/GEO plus listings on 50+ sites. Free website and ads graders, but no AI grader seen. | Partner badges, "283M leads" | Demo |
| 12 | **Hibu**, https://hibu.com/blog/marketing-solutions/hibu-is-making-sure-your-small-business-stays-visible-in-ai-search | SMBs "stay visible in AI search" | Local service SMBs | Submits profile data to LLMs and installs llms.txt on all sites | None shown | Not public |

**DataForSEO and similar tooling.** None of the 12 publicly discloses its data provider. DataForSEO positions its AI Optimization API (LLM Mentions, LLM Responses, LLM Scraper; ChatGPT, Gemini, Claude, Perplexity, plus AIO through the SERP API) as the backbone for "a new generation of AI visibility… tracking tools" (https://dataforseo.com/apis/ai-optimization-api and https://dataforseo.com/solutions/geo, accessed 2026-10-04). Pricing is per request, e.g. LLM Mentions at $0.1 per request. Expect several of the cheap free audits (Lighthouse, Ayzeo, Insites) to run on this or similar APIs, which means **the raw data is a commodity**. Methods differ:
- HubSpot explicitly tests training-data answers, with no live search.
- Local Falcon runs geo-grid sampling.
- Lighthouse and Ayzeo mostly score on-site signals.

For Oakheart, API-based responses can differ from what a consumer sees in the ChatGPT app with location and search on. Prefer DataForSEO's LLM Scraper for ChatGPT and Gemini plus the SERP API for AIO, and disclose the method.

### 4b. Booking-conversion agencies (4)
| Who / URL | Positioning | ICP | Offer / lead magnet | Proof | Price | AI offer |
|---|---|---|---|---|---|---|
| **TOMIS**, https://tomis.tech/fareharbor-tomis/ | "The Preferred Digital Marketing Agency Partner for FareHarbor Tour Operators" | Tour operators on FareHarbor (50+ clients) | SEO, ads, websites, CRO, AI voice and chatbot. Free consultation. | Named case studies (e.g. 19× ROAS) | Separate page | Mentions AI search only in passing |
| **Tourism Tiger**, http://tourismtiger.com/ | "Sales-focused Web Design For Tourism Websites Since 2014" | Tour and activity operators worldwide | Website packages, 18+ booking integrations. Free website audit checklist. | "300+ websites", "40% lift in sales" | Quote | None seen |
| **FareHarbor Sites**, https://marketing.fareharbor.com/sell/fareharbor-sites/ | Websites built to convert traffic into direct bookings | FareHarbor operators | Site, SEO and hosting | "28.3% avg. conversion lift" (vendor, method undisclosed) | Quote | Pairs with the ChatGPT app |
| **Bluetent**, https://www.bluetent.com/ | "Digital Marketing Solutions for Vacation Rental Professionals" | Vacation-rental managers | Direct-booking sites (Rezfusion), SEO, **AEO listed** | Success stories | Not public | AEO is listed but not detailed |

Also noted: **Screen Pilot** (https://www.screenpilot.com/, hotels and leisure) runs a "Route to Recommendation" AI guest-journey piece citing "68% of frequent travellers now use AI to plan trips". That figure has no source on the page (W).

### 4c. White space for Oakheart
1. **Accuracy rather than presence.** Every free audit we found scores whether you are *mentioned*. None checks what the assistant gets *wrong* about availability, eligibility, inclusions, deposits, cancellation or age and weight limits. Those facts break bookings in this ICP, and 44% of experience operators already report inaccurate AI info (GetYourGuide).
2. **One team from found to booked.** AEO tools stop at visibility. Booking agencies stop at the website and ads and have little or no AI offer. Nobody sells AI visibility, a booking journey that works with the existing system, and support deflection as one scoped price.
3. **Works with the current booking system.** Operators fear migration (Mindbody export fees, ServiceTitan onboarding). "Keep your FareHarbor, Mindbody or Housecall Pro" is a differentiator that vertical vendors such as FareHarbor Sites cannot offer across systems.
4. **Cross-vertical, operations-heavy niche.** Competitors are either horizontal (LocaliQ, Hibu, BrightLocal) or tied to one vertical (TOMIS, Bluetent). The common ground of "moves atoms" businesses (capacity, time slots, assets, staff) is unclaimed.
5. **Practitioner credibility without employer metrics (per D7′).** The founder's background is consumer-commerce product leadership at Hertz, Rivian, Carvana and Clutch, plus an operator co-founder role at Fleetbit. No competitor leads with a product executive from rental, mobility or marketplace commerce. Use roles and domain only, never employer figures.
6. **Measurement honesty as positioning.** SparkToro shows AI "rank" tracking is unreliable. Reporting mention rate and factual accuracy over repeated runs, with the method disclosed, separates Oakheart from score-based tools.

---

## 5. Implications for the website (evidence-linked)

1. **Lead with being described correctly, not just appearing.** Sample headline direction: "When customers ask AI where to book, does it get your details right?" Evidence: 44% of operators report inaccurate AI info (GetYourGuide, 2026-05-26), and AI now books directly, which raises the cost of wrong facts (Google I/O, 2026-05-19; FareHarbor and ChatGPT, 2026-04-15).
2. **Make the free check show what makes it different.** Show that it checks (a) presence, (b) factual accuracy of policies, prices, inclusions and eligibility, (c) which sources the assistant cites, and (d) the top fixes. Most free tools only score presence (4a).
3. **Disclose the method on the check page.** Name the assistants, say the questions are run several times because answers vary from one run to the next (SparkToro, 2026-01-30), name the location setting, and name the data source (DataForSEO, per D9). Say plainly that results are a sample, not a ranking.
4. **Do not show an "AI ranking position" or a single magic score.** SparkToro found less than 1% list consistency. Report the mention rate across runs and the specific errors found.
5. **Answer "do I have to switch booking systems?" above the fold or in the first FAQ.** The answer is no: we integrate with FareHarbor, Peek, Checkfront, Mindbody, Vagaro, Square, Housecall Pro and the like. Evidence: migration fear and lock-in complaints (3b).
6. **Answer the contract objection with the brief's approved language only.** Use "one price agreed before work starts" and the approved no-questions-asked money-back line. Do not add windows or terms (brief; D3b′). Evidence: agency lock-in complaints (3d).
7. **Explain the opportunity in money the owner already pays.** Show OTA and marketplace commission (20–30% on Viator, 30% of a new client's first visit on Booksy Boost) and booking fees passed to the customer (3–8%) as the cost of not being found and booked directly. Present these as category ranges with sources, never as promised savings.
8. **Cite at most 3–4 statistics, each with source and date** (list in 1e). Pew 8% vs 15%, Google AI Mode 1B+ MAU, BrightLocal 45%, plus Google's agentic-booking announcement. Label BrightLocal as BrightLocal's survey.
9. **Do not use these claims:**
   - "Install llms.txt" or "schema gets you into ChatGPT" (Google guidance, 2026-07-10; Ahrefs schema test, 2026-05-13)
   - any ranking or recommendation promise (brief constraint)
   - "AI traffic converts X% better" (Adobe data is retail only)
   - Phocuswright or Screen Pilot travel percentages (unverified)
   - the ChatGPT 1.2B weekly users figure (no primary source)
   - **any employer figures from the founder's resume** (D7′)
10. **Frame "Found" around what official guidance actually says.** That means crawlable, indexed pages with unique operational detail (Google), allowing OAI-SearchBot and PerplexityBot (OpenAI, Perplexity docs), IndexNow and fresh facts (Bing), and accurate profiles on GBP, Yelp and booking-platform distribution (Google guide; the Yelp–OpenAI deal; FareHarbor's ChatGPT app). It is credible because it is not secret.
11. **Use founder proof as domain fit, not results.** Example: "Product leader in rental, mobility and car-buying commerce (Hertz, Rivian, Carvana)". Pair it with Oakheart's own measured visibility and a sample report once one exists (D7′). This fills white space 5 without employer metrics.
12. **Name verticals and the questions their customers actually ask AI.** Examples: "Can I bring a 6-year-old on the kayak tour?", "Does the boat rental include fuel?", "Is there a same-day HVAC slot?" Owners must recognize themselves quickly, and competitors are generic or tied to one vertical (4c). This also previews what the free check tests.

---

### Sources that could not be accessed
These returned 403 or did not render: Phocuswright research pages; Travel Age West; PhocusWire; OpenAI ChatGPT-search help article; Search Engine Land (Yelp article); FareHarbor pricing page; Arival 2026 figures (paywalled); and Square Appointments prices (did not render). Figures that rely only on these are marked W.
