export const site = {
  name: "Oakheart Lab",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oakheartlab.com",
  email: "yilun@oakheartlab.com",
  linkedin: "https://www.linkedin.com/in/yilun-zhang-7b804510/",
  substack: "https://substack.com/@oakheartlab",
  description:
    "Oakheart Lab helps businesses that move atoms, not bits get found by AI assistants, described correctly, and booked without friction.",
};

export const checkCta = {
  label: "Get your free AI check",
  href: "/ai-visibility-check",
  micro: ["Report in under 24 hours", "Free, as many as you like", "No obligation"],
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
    figure: "8% vs 15%",
    text: "How often people clicked a regular search result when Google showed an AI summary, compared with searches that had no summary.",
    source: "Pew Research Center, March 2025 browsing data, published Jul 2025",
    href: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/",
  },
  {
    figure: "45%",
    text: "of US consumers say they’ve used AI tools like ChatGPT or Gemini to get local business recommendations.",
    source: "BrightLocal Local Consumer Review Survey, Feb 2026",
    href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
  },
];

/** ChatGPT weekly active users as announced by OpenAI (sources: docs/research/adoption-facts.md). */
export const chatgptWeeklyUsers = [
  { date: "2023-11-06", label: "Nov 2023", users: 100, note: "Sam Altman, OpenAI DevDay" },
  { date: "2024-08-29", label: "Aug 2024", users: 200, note: "OpenAI, to Axios" },
  { date: "2024-12-04", label: "Dec 2024", users: 300, note: "Sam Altman, DealBook" },
  { date: "2025-02-20", label: "Feb 2025", users: 400, note: "OpenAI COO, to CNBC" },
  { date: "2025-03-31", label: "Mar 2025", users: 500, note: "OpenAI" },
  { date: "2025-10-06", label: "Oct 2025", users: 800, note: "Sam Altman, OpenAI DevDay" },
  { date: "2026-02-27", label: "Feb 2026", users: 900, note: "OpenAI, via TechCrunch" },
  { date: "2026-08-06", label: "Aug 2026", users: 1000, note: "OpenAI, via TechCrunch" },
  { date: "2026-09-29", label: "Sep 2026", users: 1200, note: "Sam Altman, OpenAI DevDay" },
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

export const failureModes = [
  {
    title: "AI doesn’t mention you",
    body: "The assistant names two or three businesses. If it can’t find clear, current facts about yours, you aren’t one of them.",
  },
  {
    title: "AI gets your details wrong",
    body: "Wrong age limit, old prices, a cancellation policy you changed last year. The customer rules you out before they ever see your site.",
  },
  {
    title: "The booking path loses them",
    body: "They click through and hit a clunky widget, a dead end on mobile, or a question nobody answers. They book someone else.",
  },
];

export const pillars = [
  {
    key: "Discover",
    icon: "discover",
    title: "Be the business AI can find, understand and cite.",
    points: [
      "Clear, crawlable pages for every offer, with the details customers ask about",
      "Consistent facts across your site, Google Business Profile, Yelp and booking platforms",
      "Search and AI crawler access set up correctly",
    ],
  },
  {
    key: "Book",
    icon: "book",
    title: "Turn that visit into a confirmed booking.",
    points: [
      "A booking path built around how your customers choose",
      "The right add-ons at the right moment, never pushy",
      "Connected to the booking system you already use",
    ],
  },
  {
    key: "Support",
    icon: "support",
    title: "Answer customers’ questions instantly, and bring in your team when it matters.",
    points: [
      "Self-service answers grounded in your real policies",
      "AI support that knows when to bring in your team",
      "Fewer repeat questions for your staff",
    ],
  },
];

export const steps = [
  {
    title: "Free AI check",
    icon: "step-check",
    time: "Under 24 hours",
    body: "We ask the leading AI assistants what your customers ask. Within 24 hours you’ll see where you’re left out, what they get wrong and what to fix first.",
  },
  {
    title: "A plan to close the gaps",
    icon: "step-plan",
    time: "One price, agreed up front",
    body: "We map out how to fix what the check found and turn it into more bookings, then do the work with the systems you already use. You see the plan and the price before anything starts.",
  },
  {
    title: "Ongoing support, if you want it",
    icon: "step-ongoing",
    time: "Optional",
    body: "AI assistants and your competitors keep changing. We keep checking what assistants say about you, keep your facts current and keep improving how customers book.",
  },
];

export const homeFaq = [
  {
    q: "Do I have to switch booking systems?",
    a: "No. We design around the booking system you already use, whether that’s FareHarbor, Peek, Mindbody, Square or something else, and connect to it wherever it allows. Replacing it is never the starting point.",
  },
  {
    q: "Isn’t this just SEO?",
    a: "Mostly, it’s good SEO done properly. Google says showing up in its AI features rests on the same foundations as search. What we add is the part generic SEO skips for businesses like yours: making sure the operational facts AI repeats are correct, and making sure the booking path converts the people it sends.",
  },
  {
    q: "Don’t Google Maps and reviews still matter more?",
    a: "For most local bookings today, yes, and we treat them that way. AI assistants draw on the same sources: your website, Google Business Profile, reviews and listings. So the Discover work strengthens Maps and search too. AI answers are a fast-growing place where those facts get repeated, and where mistakes cost you quietly.",
  },
  {
    q: "Can you guarantee ChatGPT will recommend us?",
    a: "No one honestly can. AI answers vary from one run to the next. What we can do is fix what keeps assistants from finding and trusting you, measure how often you’re mentioned and described correctly across repeated checks, and show you the trend.",
  },
  {
    q: "What does it cost?",
    a: "Every project gets one price, agreed before we start, based on what your business needs. The AI check is free. And if you’re not happy with our service, we’ll give your money back, no questions asked.",
  },
  {
    q: "What do you need from me?",
    a: "For the free check: your business name, website, location, type of business and an email for the report. For a project: a short conversation about how you take bookings today, and access to the tools you already use.",
  },
];

export const businessTypes = [
  "Tours, activities & experiences",
  "Vehicle, boat or equipment rentals",
  "Home or auto services",
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
    body: "How often each assistant names your business across repeated runs of the same questions.",
  },
  {
    title: "Are your details right?",
    body: "Whether the assistant gets your prices, availability, age limits, what’s included and policies right, checked against your own site.",
  },
  {
    title: "Where it gets its information",
    body: "The websites, listings and review sites each assistant cites, so you know which sources shape what it says.",
  },
  {
    title: "What to fix first",
    body: "The three changes most likely to improve what AI says about you, in plain language.",
  },
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
    a: "AI answers change from run to run. One answer is an anecdote; repeated runs show a pattern. We report how often you’re mentioned and described correctly, not a made-up “AI ranking.”",
  },
  {
    q: "Is it really free? What’s the catch?",
    a: "It’s free and you can request as many as you like. There’s no sales call unless you ask for one. If the report shows problems you want help with, reply to it and we’ll talk. If not, keep the report and use it however you like.",
  },
  {
    q: "Who runs the check?",
    a: "Yilun Zhang, Oakheart Lab’s founder. He runs the questions on each assistant, checks the answers against your site, and writes the findings and fixes himself.",
  },
  {
    q: "What happens to my information?",
    a: "We use it to run your check and to send you the report. We don’t sell it or add you to a newsletter without asking.",
  },
];
