export const site = {
  name: "Oakheart Lab",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oakheartlab.com",
  email: "yilun@oakheartlab.com",
  linkedin: "https://www.linkedin.com/in/yilun-zhang-7b804510/",
  substack: "https://www.oakheartlab.com/about",
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
    text: "How often people clicked through to a website when Google showed an AI summary, compared with when it didn’t.",
    source: "Pew Research Center, March 2025 browsing data, published Jul 2025",
    href: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/",
  },
  {
    figure: "45%",
    text: "of US consumers say they’ve used AI tools like ChatGPT or Gemini to get local business recommendations.",
    source: "BrightLocal Local Consumer Review Survey, Feb 2026",
    href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
  },
  {
    figure: "Booking",
    text: "Google says Search will now book local experiences and services for people, and even call some businesses on their behalf.",
    source: "Google I/O, May 2026",
    href: "https://blog.google/products-and-platforms/products/search/search-io-2026/",
  },
];

export const customerQuestions = [
  { kind: "Tours & experiences", q: "Can my 6-year-old do the sunset kayak tour?" },
  { kind: "Rentals", q: "Does the pontoon rental include fuel and life jackets?" },
  { kind: "Home & auto services", q: "Who has a same-day AC repair slot near me?" },
  { kind: "Classes & wellness", q: "Is there a beginner class on Saturday morning?" },
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
    body: "They arrive ready to book and hit a clunky widget, a dead end on mobile, or a question nobody answers. They book someone else.",
  },
];

export const pillars = [
  {
    key: "Found",
    title: "Be the business AI can find, understand and cite.",
    points: [
      "Clear, crawlable pages for every offer, with the details customers ask about",
      "Consistent facts across your site, Google Business Profile, Yelp and booking platforms",
      "Search and AI crawler access set up correctly",
    ],
  },
  {
    key: "Booked",
    title: "Turn that visit into a confirmed booking.",
    points: [
      "A booking path built around how your customers choose",
      "The right add-ons at the right moment, never pushy",
      "Connected to the booking system you already use",
    ],
  },
  {
    key: "Supported",
    title: "Answer customers instantly, hand off when it matters.",
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
    time: "Under 24 hours",
    body: "We ask the leading AI assistants what your customers ask and show you what they say about you, what they get wrong, and what to fix first.",
  },
  {
    title: "Free tailored preview",
    time: "If it’s a fit",
    body: "For qualified businesses, we mock up your homepage and one key booking journey so you can see the difference before deciding anything.",
  },
  {
    title: "One price, agreed up front",
    time: "You decide",
    body: "We deliver Found, Booked and Supported as one project, connected to your existing systems. You know the price before we start.",
  },
  {
    title: "Ongoing, if you want it",
    time: "Optional",
    body: "We keep checking what AI says about you, keep your facts current and keep improving the booking path.",
  },
];

export const homeFaq = [
  {
    q: "Do I have to switch booking systems?",
    a: "No. We work with the system you already run, such as FareHarbor, Peek, Checkfront, Mindbody, Vagaro, Square or Housecall Pro, and improve everything around it.",
  },
  {
    q: "Isn’t this just SEO?",
    a: "Mostly, it’s good SEO done properly. Google says showing up in its AI features rests on the same foundations as search. What we add is the part generic SEO skips for businesses like yours: making sure the operational facts AI repeats are correct, and making sure the booking path converts the people it sends.",
  },
  {
    q: "Can you guarantee ChatGPT will recommend us?",
    a: "No one honestly can. AI answers vary from one run to the next. What we can do is fix what keeps assistants from finding and trusting you, measure how often you’re mentioned and described correctly across repeated checks, and show you the trend.",
  },
  {
    q: "What does it cost?",
    a: "Every project gets one price, agreed before we start, based on what your business needs. The AI check and the tailored preview are free. And if you’re not happy with our service, we’ll give your money back, no questions asked.",
  },
  {
    q: "What do you need from me?",
    a: "For the free check, just your business name, website and location. For a project, a short call about how you take bookings today and access to the tools you already use.",
  },
];

export const businessTypes = [
  "Tours, activities & experiences",
  "Vehicle, boat or equipment rentals",
  "Home or auto services",
  "Health, wellness & beauty appointments",
  "Fitness, classes & studios",
  "Stays & hospitality",
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
    a: "It’s free and you can request as many as you like. If the report shows problems you want help with, we’ll offer to talk. If not, keep the report and use it however you like.",
  },
  {
    q: "What happens to my information?",
    a: "We use it to run your check and to send you the report. We don’t sell it or add you to a newsletter without asking.",
  },
];
