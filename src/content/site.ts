export const site = {
  name: "Oakheart Lab",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oakheartlab.com",
  email: "yilun@oakheartlab.com",
  linkedin: "https://www.linkedin.com/in/yilun-zhang-7b804510/",
  substack: "https://substack.com/@oakheartlab",
  description:
    "Oakheart Lab helps tours, rentals, auto, home-service and hospitality businesses get found by AI assistants, described correctly, booked without friction, then keeps them ahead of competitors and changes in AI every month.",
};

export const checkCta = {
  label: "Get your free AI check",
  href: "/ai-visibility-check",
  micro: ["Five fields, no call", "Report in under 24 hours", "Free, as many as you like", "No obligation"],
};

export const moneyBack =
  "If you’re not happy with our service, we’ll give your money back, no questions asked.";

export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "What we do", href: "/#system" },
  { label: "About", href: "/#founder" },
  { label: "FAQ", href: "/#faq" },
];

export const shiftStats = [
  {
    figure: "45%",
    text: "of US consumers have used AI tools like ChatGPT or Gemini for local business recommendations.",
    source: "BrightLocal Local Consumer Review Survey, Feb 2026",
    href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
  },
];

/** ChatGPT weekly active users as announced by OpenAI (sources: docs/research/adoption-facts.md). */
export const chatgptWeeklyUsers = [
  { date: "2023-11-06", label: "Nov 2023", users: 100, note: "Sam Altman, OpenAI DevDay", href: "https://techcrunch.com/2023/11/06/openais-chatgpt-now-has-100-million-weekly-active-users/" },
  { date: "2024-08-29", label: "Aug 2024", users: 200, note: "OpenAI, to Axios", href: "https://www.axios.com/2024/08/29/openai-chatgpt-200-million-weekly-active-users" },
  { date: "2024-12-04", label: "Dec 2024", users: 300, note: "Sam Altman, DealBook", href: "https://www.cnbc.com/2024/12/04/openais-active-user-count-soars-to-300-million-people-per-week.html" },
  { date: "2025-02-20", label: "Feb 2025", users: 400, note: "OpenAI COO, to CNBC", href: "https://techcrunch.com/2025/02/20/openai-now-serves-400-million-users-every-week/" },
  { date: "2025-03-31", label: "Mar 2025", users: 500, note: "OpenAI", href: "https://techcrunch.com/2025/03/31/openai-raises-40b-at-300b-post-money-valuation/" },
  { date: "2025-10-06", label: "Oct 2025", users: 800, note: "Sam Altman, OpenAI DevDay", href: "https://techcrunch.com/2025/10/06/sam-altman-says-chatgpt-has-hit-800m-weekly-active-users/" },
  { date: "2026-02-27", label: "Feb 2026", users: 900, note: "OpenAI, via TechCrunch", href: "https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users/" },
  { date: "2026-08-06", label: "Aug 2026", users: 1000, note: "OpenAI, via TechCrunch", href: "https://techcrunch.com/2026/08/06/openai-brings-unlimited-chatgpt-text-chats-to-free-users/" },
  { date: "2026-09-29", label: "Sep 2026", users: 1200, note: "Sam Altman, OpenAI DevDay", href: "https://techcrunch.com/2026/09/29/openais-latest-features-take-direct-aim-at-the-app-store-model/" },
];

export const movers = [
  {
    when: "Oct 2025",
    text: "Booking.com and Expedia launch apps inside ChatGPT.",
    href: "https://openai.com/index/introducing-apps-in-chatgpt/",
  },
  {
    when: "Apr 2026",
    text: "FareHarbor tour operators become bookable inside ChatGPT.",
    href: "https://marketing.fareharbor.com/blog/chatgpt-fareharbors-newest-distribution-partner/",
  },
  {
    when: "May 2026",
    text: "Google says Search will book local services for people, and call some businesses on their behalf.",
    href: "https://blog.google/products-and-platforms/products/search/search-io-2026/",
  },
  {
    when: "Jul 2026",
    text: "Yelp licenses its reviews and business data to OpenAI for ChatGPT answers.",
    href: "https://www.axios.com/2026/07/23/yelp-reviews-chatgpt-geo-partnership",
  },
];

export const customerQuestions = [
  { kind: "Tours & experiences", icon: "tours", q: "Can my 6-year-old do the sunset kayak tour?" },
  { kind: "Rentals", icon: "rentals", q: "Does the pontoon rental include fuel and life jackets?" },
  { kind: "Car buying & service", icon: "automotive", q: "Which dealer near me has a certified used RAV4 under $25k I can test-drive Saturday?" },
  { kind: "Home services", icon: "services", q: "Which plumber near me can replace a water heater tomorrow?" },
  { kind: "Stays & hospitality", icon: "stays", q: "Which lakeside cabins near Asheville take two big dogs, and what’s the pet fee?" },
  { kind: "Moving & storage", icon: "moving", q: "Who can move a one-bedroom this Saturday, and what will it cost?" },
];

/** Where a booking is lost between the question and the confirmation. */
export const leaks = [
  { stage: "Customer asks AI", leak: "You’re not mentioned", why: "It can’t find clear, current facts about you." },
  { stage: "AI names you", leak: "Your details are wrong", why: "An old price or age limit rules you out." },
  { stage: "They click through", leak: "Booking is a struggle", why: "A clunky widget or dead end on mobile." },
];

export const factsLine = ["Offers", "Prices", "Availability", "Policies"];

export const pillars = [
  {
    key: "Discover",
    icon: "discover",
    title: "Be found and described correctly.",
    points: [
      "Clear pages with the details customers ask about",
      "Same facts everywhere: your site, Google, Yelp, booking platforms",
      "Readable by search and AI crawlers",
    ],
  },
  {
    key: "Book",
    icon: "book",
    title: "Turn the visit into a booking.",
    points: [
      "Live times and prices on the page they land on",
      "Fewer steps to a confirmed booking on a phone",
      "The right add-on at checkout, like gear or an upgrade",
    ],
  },
  {
    key: "Stay ahead",
    icon: "step-ongoing",
    title: "Keep improving as competitors and AI change.",
    points: [
      "A monthly check against the competitors AI names instead of you",
      "Updates when assistants add features, like booking inside ChatGPT",
      "Prices, seasons and policies kept current on your site and listings",
    ],
  },
];

export const alsoAvailable = "Also available: a companion mobile app, and staff tools and automation.";

/** Public roles only (docs/brief.md). */
export const roles = [
  { company: "Hertz", title: "VP of Product" },
  { company: "Clutch", title: "Head of Product" },
  { company: "Rivian", title: "Group PM, Digital Commerce" },
  { company: "Carvana", title: "Product Track Lead" },
];

export const steps = [
  {
    title: "Get your free check",
    icon: "step-check",
    time: "Under 24 hours",
    body: "Five fields, no call. We ask AI assistants your customers’ questions and email you what to fix first.",
  },
  {
    title: "Get your plan and fixes",
    icon: "step-plan",
    time: "Included in your monthly fee",
    body: "One short call about how you take bookings. You approve a plan; we do the fixes in the tools you already use.",
  },
  {
    title: "Stay ahead",
    icon: "step-ongoing",
    time: "Every month, stop anytime",
    body: "We re-check you against competitors, keep your facts current, adapt to new AI features, keep improving booking and tell you what changed.",
  },
];

export const loopNote = "Each month’s check sets the next round of fixes.";

/** Illustrative plan for the same invented business as the sample report. No timelines or prices. */
export const samplePlan = {
  business: "Quillbay Kayak Tours",
  groups: [
    {
      key: "Discover",
      fixes: [
        "Correct the age rule on old listings and Google",
        "Add an “Age & requirements” section to every tour page",
        "Publish times, prices and inclusions as text and structured data",
      ],
    },
    {
      key: "Book",
      fixes: [
        "Show live sunset-tour times on the tour page",
        "Fewer taps from tour page to booking on a phone",
        "Offer the dry-bag rental at checkout on sunset tours",
      ],
    },
    {
      key: "Stay ahead, every month",
      fixes: [
        "Re-run the check against the two outfitters AI names most",
        "List tours where AI assistants start taking bookings",
        "Update times and prices before the summer season",
      ],
    },
  ],
};

export const homeFaq = [
  {
    q: "Do I have to switch booking systems?",
    a: "No. We work with the one you have, like FareHarbor, Peek, Mindbody or Square, and connect to it wherever it allows.",
  },
  {
    q: "Isn’t this just SEO?",
    a: "The Discover part mostly is: good SEO done properly. Google says its SEO best practices still apply to AI Overviews and AI Mode. But we don’t sell a quota of articles. We make sure your site and the listings AI reads have the right facts: what you offer, prices, availability and policies. We also go further: easier booking on a phone, and monthly updates as competitors and AI assistants change.",
    source: { label: "Google Search Central: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
  },
  {
    q: "Don’t Google Maps and reviews still matter more?",
    a: "For most local bookings today, yes, and we treat them that way. AI assistants read the same sources: your site, Google Business Profile, reviews and listings. So the Discover work strengthens Maps and search too.",
  },
  {
    q: "Can you guarantee ChatGPT will recommend us?",
    a: "No one honestly can. AI answers vary from run to run. We fix what keeps assistants from finding and trusting you, then measure how often you’re mentioned and described correctly, month by month.",
  },
  {
    q: "What does it cost?",
    a: "One flat monthly fee covers your plan: the first fixes and the upkeep. There’s no project fee. It’s set for your business after the check, agreed before any work starts, and stays the same each month. Three listing fixes shouldn’t cost the same as a booking rebuild, so there’s no published price. The check is free. If you’re not happy with our service, we’ll give your money back, no questions asked.",
  },
  {
    q: "Is there a long contract?",
    a: "No. It’s one flat monthly fee, month to month, and you can stop anytime.",
  },
  {
    q: "What do you need from me?",
    a: "For the free check: your business name, website, location, type of business and an email for the report. To work together: a short conversation about how you take bookings today, and access to the tools you already use.",
  },
];

export const businessTypes = [
  "Tours, activities & experiences",
  "Vehicle, boat or equipment rentals",
  "Car buying or auto service",
  "Home services",
  "Health, wellness & beauty appointments",
  "Fitness, classes & studios",
  "Stays & hospitality",
  "Moving & storage",
  "Other booking-based business",
];

export const heardFrom = [
  "ChatGPT or another AI assistant",
  "Google search",
  "LinkedIn",
  "Oakheart Lab newsletter",
  "Referral",
  "Other",
];

export const checkCovers = [
  {
    title: "Are you mentioned?",
    body: "How often each assistant names you, across repeated runs.",
  },
  {
    title: "Are your details right?",
    body: "Prices, availability and policies, checked against your site. Your top concern first.",
  },
  {
    title: "Where it gets its information",
    body: "The sites, listings and reviews each assistant cites.",
  },
  {
    title: "What to fix first",
    body: "The three changes most likely to improve what AI says about you.",
  },
];

export const methodSteps = [
  { label: "Your customers’ questions", detail: "Written for your type of business and location" },
  { label: "5 assistants", detail: "ChatGPT, Google’s AI (Overviews and AI Mode), Gemini, Perplexity, Claude" },
  { label: "Several runs each", detail: "Because answers change from run to run" },
  { label: "Your report", detail: "How often you’re mentioned and described correctly, with the sources cited" },
];

export const talkFirst = {
  label: "Prefer to talk first? Email Yilun",
  href: "mailto:yilun@oakheartlab.com?subject=Question%20about%20Oakheart%20Lab",
};

export const checkFaq = [
  {
    q: "Which assistants do you check?",
    a: "ChatGPT, Google’s AI Overviews and AI Mode, Gemini, Perplexity and Claude.",
  },
  {
    q: "Why do you ask each question more than once?",
    a: "AI answers change from run to run. Repeated runs show a pattern, so we report how often you’re mentioned and described correctly, not a made-up “AI ranking.”",
  },
  {
    q: "Is it really free? What’s the catch?",
    a: "It’s free, as many as you like, with no sales call unless you ask. If you want help with what it finds, reply and we’ll talk: one flat monthly fee, month to month. If not, keep the report.",
  },
  {
    q: "Who runs the check?",
    a: "Yilun Zhang, Oakheart Lab’s founder. He runs the questions, checks the answers against your site and writes the fixes himself.",
  },
  {
    q: "What happens to my information?",
    a: "We use it to run your check, send you the report and see how you found us. We don’t sell it or add you to a newsletter without asking.",
    link: { label: "Read the privacy page", href: "/privacy" },
  },
];
