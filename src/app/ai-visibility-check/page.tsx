import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckForm } from "@/components/check-form";
import { Faq } from "@/components/faq";
import { Section } from "@/components/section";
import { SampleReport } from "@/components/sample-report";
import { checkCovers, checkFaq, methodSteps, site, talkFirst } from "@/content/site";

export const metadata: Metadata = {
  title: "Free AI Visibility Check",
  alternates: { canonical: "/ai-visibility-check" },
  openGraph: {
    type: "website",
    siteName: "Oakheart Lab",
    title: "Free AI Visibility Check | Oakheart Lab",
    description:
      "See what ChatGPT, Gemini, Perplexity, Claude and Google's AI answers tell customers about your business. Free report in under 24 hours.",
    url: "/ai-visibility-check",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Oakheart Lab: free AI Visibility Check" }],
  },
  description:
    "Find out what ChatGPT, Gemini, Perplexity, Claude and Google's AI answers tell customers about your business: whether you're mentioned, what they get wrong, and what to fix first. Free, in under 24 hours.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${site.url}/ai-visibility-check#service`,
      name: "Free AI Visibility Check",
      serviceType: "AI search visibility audit",
      description:
        "We ask ChatGPT, Gemini, Perplexity, Claude and Google's AI answers the questions your customers ask, then send a plain-language report within 24 hours: whether you're mentioned, what they get wrong, and the three fixes that matter most.",
      provider: { "@id": `${site.url}/#org` },
      url: `${site.url}/ai-visibility-check`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: checkFaq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function CheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Free AI Visibility Check</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            See what AI tells your customers about you.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            We ask ChatGPT, Gemini, Perplexity, Claude and Google&rsquo;s AI answers the questions
            your customers ask, then send you a plain-language report within 24 hours.
          </p>
        </div>
        <div id="check-form" className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5 shadow-[0_20px_60px_-35px_rgba(22,19,15,0.35)] sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <CheckForm />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <ul className="space-y-2 lg:mt-6">
            {[
              "Whether you’re mentioned, and how often",
              "What they get wrong about your prices, policies and availability",
              "The three fixes that matter most",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden="true" className="text-good">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Free, as many as you like, no obligation. No newsletter unless you ask for it.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-5 min-[400px]:flex-row">
            <Image
              src="/images/yilun-zhang.jpg"
              alt=""
              width={56}
              height={56}
              loading="eager"
              className="size-14 shrink-0 rounded-full"
            />
            <div className="text-[15px] leading-relaxed">
              <p>
                Oakheart Lab’s founder,{" "}
                <span className="font-semibold">Yilun Zhang, runs every check himself.</span> No
                sales call unless you ask.
              </p>
              <p className="mt-2 text-sm">
                <Link href="/#founder" className="underline underline-offset-2 hover:text-accent">
                  About Yilun
                </Link>
                <span className="mx-2 text-muted">·</span>
                <a href={talkFirst.href} className="whitespace-nowrap underline underline-offset-2 hover:text-accent">
                  {talkFirst.label}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section id="what-you-get" eyebrow="What your report covers" title="Whether you show up, and whether AI gets you right." tone="surface">
        <div className="grid gap-6 sm:grid-cols-2">
          {checkCovers.map((c, i) => (
            <div key={c.title} className="rounded-2xl border border-line bg-paper p-6">
              <p className="font-mono text-sm text-accent">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
        <SampleReport />
      </Section>

      <Section eyebrow="Method" title="How we run the check."
        intro="Answers vary by run, location and account, so we sample them. It is a sample, not a ranking. Any tool that gives you a single “AI rank” is overstating what can be measured."
      >
        <ol className="mb-12 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.2fr]">
          {methodSteps.map((m, i) => (
            <Fragment key={m.label}>
              {i > 0 && (
                <li aria-hidden="true" className="grid place-items-center text-2xl text-muted">
                  {i < methodSteps.length - 1 ? "×" : "="}
                </li>
              )}
              <li className={`rounded-2xl p-5 ${i === methodSteps.length - 1 ? "bg-night text-paper" : "border border-line bg-surface"}`}>
                <p className="text-lg font-semibold">{m.label}</p>
                <p className={`mt-1 text-sm leading-snug ${i === methodSteps.length - 1 ? "text-paper/75" : "text-muted"}`}>{m.detail}</p>
              </li>
            </Fragment>
          ))}
        </ol>
        <Faq items={checkFaq} />
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-night p-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-xl font-semibold leading-snug">
            Ready to see what AI tells your customers? Your report arrives within 24 hours.
          </p>
          <a
            href="#check-form"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-paper px-6 text-[15px] font-semibold text-ink hover:bg-white"
          >
            Get my free AI check
          </a>
        </div>
      </Section>
    </>
  );
}
