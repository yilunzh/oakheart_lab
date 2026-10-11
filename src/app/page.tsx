import type { Metadata } from "next";
import Image from "next/image";
import { AdoptionChart } from "@/components/adoption-chart";
import { AnswerCard } from "@/components/answer-card";
import { BookingLeaks } from "@/components/booking-leaks";
import { CtaLink } from "@/components/cta-link";
import { Faq } from "@/components/faq";
import { SamplePlan } from "@/components/sample-plan";
import { Section } from "@/components/section";
import {
  chatgptWeeklyUsers,
  checkCta,
  movers,
  talkFirst,
  customerQuestions,
  homeFaq,
  moneyBack,
  alsoAvailable,
  audienceLine,
  factsLine,
  loopNote,
  pillars,
  roles,
  shiftStats,
  site,
  steps,
} from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      founder: { "@id": `${site.url}/#founder` },
      logo: `${site.url}/icon`,
      sameAs: [site.substack],
      address: { "@type": "PostalAddress", addressLocality: "Atlanta", addressRegion: "GA", addressCountry: "US" },
      knowsAbout: ["AI search visibility", "Answer engine optimization", "Online booking conversion", "Customer support automation"],
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: "Yilun Zhang",
      jobTitle: "Founder",
      description:
        "Founder of Oakheart Lab. Has spent the last decade building digital commerce products in automotive, at Hertz, Clutch, Rivian and Carvana.",
      alumniOf: { "@type": "CollegeOrUniversity", name: "University of Toronto" },
      knowsAbout: ["Digital commerce", "Online booking", "AI search visibility"],
      image: `${site.url}/images/yilun-zhang.jpg`,
      worksFor: { "@id": `${site.url}/#org` },
      sameAs: [site.linkedin, site.substack],
    },
    {
      "@type": "FAQPage",
      mainEntity: homeFaq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {audienceLine}
          </p>
          <h1 className="mt-4 text-[2.3rem] font-semibold leading-[1.06] tracking-tight text-balance sm:text-6xl">
            Customers now ask AI which local business to book.{" "}
            <span className="text-accent">Does it recommend you, and get your details right?</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Customers now ask ChatGPT, Google&rsquo;s AI, Gemini, Perplexity and Claude for
            recommendations before they ever visit your website. We fix what keeps AI from mentioning you, or causes it to get your details wrong. And
            when customers click through, we make booking with you quick and easy, using the booking
            system you already have.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink href={checkCta.href}>{checkCta.label}</CtaLink>
            <CtaLink href="/ai-visibility-check#what-you-get" variant="secondary">
              See what the check covers
            </CtaLink>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            {checkCta.micro.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-good">✓</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
        <AnswerCard />
      </section>

      {/* The shift */}
      <Section
        eyebrow="What changed"
        title="AI answers now shape who gets the booking."
        intro="Customers used to compare ten links. Now an assistant may name only a few businesses, and more people ask every month. Smart companies are already sprinting to get ahead of it."
        tone="surface"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <figure className="rounded-2xl border border-line bg-paper p-6 lg:col-span-2">
            <p className="text-2xl font-semibold tracking-tight">12× in under three years</p>
            <p className="mt-1 text-muted">ChatGPT weekly active users, as announced by OpenAI</p>
            <div className="mt-6">
              <AdoptionChart data={chatgptWeeklyUsers} />
            </div>
            <figcaption className="mt-3 text-xs text-muted">
              Sources: OpenAI announcements reported by TechCrunch, CNBC and Axios, Nov 2023 to Sep 2026.
            </figcaption>
          </figure>
          <div className="rounded-2xl border border-line bg-paper p-6">
            <p className="text-2xl font-semibold tracking-tight">Who&rsquo;s already moving</p>
            <ol className="mt-5 space-y-5">
              {movers.map((m, i) => (
                <li key={m.when} className={`border-l-2 border-accent pl-4 ${i === 0 ? "hidden sm:block" : ""}`}>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">{m.when}</p>
                  <p className="mt-1 leading-snug">
                    {m.text}{" "}
                    <a href={m.href} className="text-sm text-muted underline underline-offset-2 hover:text-ink" rel="noopener">
                      Source
                    </a>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-6">
          {shiftStats.map((s) => (
            <figure key={s.figure} className="grid gap-x-6 gap-y-2 rounded-2xl border border-line bg-paper p-6 sm:grid-cols-[auto_1fr] sm:items-center">
              <p className="text-4xl font-semibold tracking-tight sm:row-span-2">{s.figure}</p>
              <p className="leading-relaxed">{s.text}</p>
              <figcaption className="text-xs text-muted">
                Source:{" "}
                <a href={s.href} className="underline underline-offset-2 hover:text-ink" rel="noopener">
                  {s.source}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Why it matters */}
      <Section
        eyebrow="Why it matters"
        title="Questions your customers ask AI before they book."
      >
        <div
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0"
          role="list"
          aria-label="Questions customers ask AI"
          tabIndex={0}
        >
          {customerQuestions.map((c) => (
            <div key={c.q} role="listitem" className="w-[80%] shrink-0 snap-start rounded-2xl border border-line bg-surface p-5 sm:w-auto">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted">
                <Image src={`/icons/${c.icon}.webp`} alt="" width={40} height={40} className="size-10 shrink-0" />
                {c.kind}
              </p>
              <p className="mt-2 text-lg font-medium">&ldquo;{c.q}&rdquo;</p>
            </div>
          ))}
        </div>
        <p aria-hidden="true" className="mt-2 text-sm text-muted sm:hidden">Swipe for more →</p>
        <BookingLeaks />
      </Section>

      {/* System */}
      <Section
        id="system"
        eyebrow="What we do"
        title="We fix what AI reads, how you take bookings and how you answer questions."
        intro="All three run on the same facts. We get them right, then keep them right every month."
        tone="surface"
      >
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-paper px-5 py-4">
          <p className="mr-2 font-mono text-xs uppercase tracking-widest text-muted">Your facts</p>
          {factsLine.map((f) => (
            <span key={f} className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">{f}</span>
          ))}
        </div>
        <div aria-hidden="true" className="hidden h-6 grid-cols-3 md:grid">
          {pillars.map((p) => <span key={p.key} className="mx-auto w-px bg-ink/25" />)}
        </div>
        <ol className="mt-4 grid gap-6 md:mt-0 md:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.key} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
              <Image src={`/icons/${p.icon}.webp`} alt="" width={48} height={48} className="mb-4 size-12" />
              <p className="flex items-center gap-3 font-mono text-sm">
                <span className="grid size-7 place-items-center rounded-full bg-ink text-paper">
                  {i + 1}
                </span>
                <span className="font-semibold uppercase tracking-widest">{p.key}</span>
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-snug">{p.title}</h3>
              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">—</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[15px] text-muted">{alsoAvailable}</p>
      </Section>

      {/* Founder */}
      <Section id="founder" eyebrow="Who you’ll work with" title="Over a decade building how people buy and rent cars online.">
        <div className="grid items-start gap-10 md:grid-cols-[220px_1fr]">
          <Image
            src="/images/yilun-zhang.jpg"
            alt="Yilun Zhang, founder of Oakheart Lab"
            loading="eager"
            width={220}
            height={220}
            className="rounded-2xl"
          />
          <div className="max-w-2xl">
            <blockquote className="text-2xl font-medium leading-snug tracking-tight">
              &ldquo;In the last nine months I&rsquo;ve watched customers change how they decide.
              They ask an AI assistant, and the answer shapes the booking before a website ever
              loads. Most businesses haven&rsquo;t caught up yet, and that&rsquo;s why I built
              Oakheart Lab.&rdquo;
            </blockquote>
            <p className="mt-5 leading-relaxed text-muted">
              Yilun Zhang has spent the last decade building digital commerce in automotive, where
              cars, locations, staff and handover times all have to line up behind every online
              sale. Your business runs on the same kind of complexity. He&rsquo;s based in Atlanta, GA.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              {roles.map((r) => (
                <li key={r.company} className="rounded-full border border-line px-3 py-1.5">
                  <span className="font-semibold">{r.company}</span>
                  <span className="text-muted"> · {r.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <a href={site.linkedin} className="underline underline-offset-2 hover:text-accent" rel="noopener">
                LinkedIn
              </a>
              <span className="mx-2 text-muted">·</span>
              <a href={site.substack} className="underline underline-offset-2 hover:text-accent" rel="noopener">
                Writing on building with AI
              </a>
            </p>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="A free check, then one flat monthly fee for the fixes and the upkeep."
        tone="surface"
      >
        <div className="relative">
        {/* Mobile loop: a dashed bracket from step 3 back up to step 1. */}
        <div aria-hidden="true" className="absolute bottom-16 left-0 top-12 w-4 rounded-l-xl border-y-2 border-l-2 border-dashed border-accent/60 md:hidden" />
        <span aria-hidden="true" className="absolute left-3 top-[38px] text-[10px] text-accent md:hidden">▶</span>
        <ol className="grid gap-4 pl-6 md:grid-cols-3 md:pl-0">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`relative rounded-2xl border p-5 ${i === 2 ? "border-accent bg-accent-soft" : "border-line bg-paper"}`}
            >
              <Image src={`/icons/${s.icon}.webp`} alt="" width={48} height={48} className="mb-3 size-12" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{s.time}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              {i < 2 && (
                <span aria-hidden="true" className="absolute -right-3.5 top-1/2 z-10 hidden size-7 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-muted md:grid">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        </div>
        {/* The loop: step 3 feeds back into step 1 every month. */}
        <div className="relative mt-1 hidden h-14 md:block">
          <div aria-hidden="true" className="absolute inset-x-[16.67%] top-0 h-7 rounded-b-3xl border-x-2 border-b-2 border-dashed border-accent/60" />
          <span aria-hidden="true" className="absolute left-[16.67%] -top-2.5 -translate-x-1/2 text-sm leading-none text-accent">▲</span>
          <p className="absolute left-1/2 top-7 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap bg-surface px-3 text-[15px] font-medium">
            <span aria-hidden="true" className="text-accent">↻</span>
            {loopNote}
          </p>
        </div>
        <p className="mt-3 flex items-center gap-2 pl-6 text-[15px] font-medium md:hidden">
          <span aria-hidden="true" className="text-accent">↻</span>
          {loopNote}
        </p>
        <SamplePlan />
        <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-lg font-medium">{moneyBack}</p>
          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <CtaLink href={checkCta.href}>{checkCta.label}</CtaLink>
            <a href={talkFirst.href} className="text-sm underline underline-offset-4 hover:text-accent">
              {talkFirst.label}
            </a>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Questions" title="Questions about working with us.">
        <Faq items={homeFaq} />
      </Section>

      {/* Final CTA */}
      <section className="bg-night text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            Find out what AI tells your customers about you.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/75">
            Within 24 hours: where you show up, what&rsquo;s wrong and what to fix first. Free, no
            obligation. If you want our help after that, it&rsquo;s one flat monthly fee, and you can
            stop anytime.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <CtaLink href={checkCta.href} variant="inverse">
              {checkCta.label}
            </CtaLink>
            <a href={talkFirst.href} className="text-paper/85 underline underline-offset-4 hover:text-paper">
              {talkFirst.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
