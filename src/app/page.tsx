import type { Metadata } from "next";
import Image from "next/image";
import { AnswerCard } from "@/components/answer-card";
import { CtaLink } from "@/components/cta-link";
import { Faq } from "@/components/faq";
import { Section } from "@/components/section";
import {
  checkCta,
  previewRequest,
  talkFirst,
  customerQuestions,
  failureModes,
  homeFaq,
  moneyBack,
  pillars,
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
      knowsAbout: ["AI search visibility", "Answer engine optimization", "Online booking conversion", "Customer support automation"],
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: "Yilun Zhang",
      jobTitle: "Founder",
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
            For businesses that move atoms, not bits
          </p>
          <h1 className="mt-4 text-[2.3rem] font-semibold leading-[1.06] tracking-tight text-balance sm:text-6xl">
            More of your customers are asking AI where to book.{" "}
            <span className="text-accent">Does it get you right?</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            ChatGPT, Gemini and Google now answer &ldquo;who should I book?&rdquo;, often before a
            customer ever visits your site. We fix what keeps them from finding you and describing you correctly,
            and make sure the people they send land in a booking flow that works, without replacing the booking system you already use.
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
        intro="Customers used to compare ten links. Now an assistant often names two or three businesses, and some assistants are starting to book them too."
        tone="surface"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {shiftStats.map((s) => (
            <figure key={s.figure} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
              <p className="text-4xl font-semibold tracking-tight">{s.figure}</p>
              <p className="mt-3 flex-1 leading-relaxed">{s.text}</p>
              <figcaption className="mt-4 text-xs text-muted">
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
        title="You can’t win a customer you never knew was looking."
        intro="They ask an assistant questions like these, book whoever it suggests and never call you. When the answer is you, they call ready to book."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {customerQuestions.map((c) => (
            <div key={c.q} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">{c.kind}</p>
              <p className="mt-2 text-lg font-medium">&ldquo;{c.q}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {failureModes.map((f, i) => (
            <div key={f.title}>
              <p className="font-mono text-sm text-accent">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* System */}
      <Section
        id="system"
        eyebrow="What we do"
        title="Discover, book, support: one project, start to finish."
        intro="We handle the whole path: what AI says about you, the booking itself, and the questions customers ask afterwards. Because we handle all three together, the facts AI repeats, your booking pages and your support answers stay consistent."
        tone="surface"
      >
        <ol className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.key} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
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
        <p className="mt-8 text-sm text-muted">
          Also available when you need them: a companion mobile app, and staff tools that cut
          re-entered information and missed handoffs.{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-ink">
            Ask us
          </a>
          .
        </p>
      </Section>

      {/* Founder */}
      <Section id="founder" eyebrow="Who you'll work with" title="Enterprise-scale demand generation, built for businesses like yours.">
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
              loads. Large companies have teams adapting to that. Most owner-run businesses
              don&rsquo;t, and that&rsquo;s who I built Oakheart Lab for.&rdquo;
            </blockquote>
            <p className="mt-5 leading-relaxed text-muted">
              Yilun Zhang has spent over a decade leading demand generation and digital
              transformation at enterprise scale. He leads digital products at Hertz, and before
              that built digital commerce at Clutch, Rivian and Carvana. Oakheart Lab brings that
              playbook to owner-run businesses, and you work with him directly.
            </p>
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
        title="Start with a free check. Decide once you've seen what we'd change."
        tone="surface"
      >
        <ol className="grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted md:min-h-8">
                Step {i + 1} · {s.time}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              {i === 1 && (
                <a href={previewRequest.href} className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-accent">
                  {previewRequest.label}
                </a>
              )}
            </li>
          ))}
        </ol>
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
            Tell us your business and website. Within 24 hours you&rsquo;ll get a plain-language
            report: where you show up, what&rsquo;s wrong, and what to fix first. Free, with no
            obligation.
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
