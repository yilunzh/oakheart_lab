import type { Metadata } from "next";
import { CheckForm } from "@/components/check-form";
import { Faq } from "@/components/faq";
import { Section } from "@/components/section";
import { checkCovers, checkFaq } from "@/content/site";

export const metadata: Metadata = {
  title: "Free AI Visibility Check",
  description:
    "Find out what ChatGPT, Gemini, Perplexity, Claude and Google's AI answers tell customers about your business: whether you're mentioned, what they get wrong, and what to fix first. Free, in under 24 hours.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: checkFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Free AI Visibility Check</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            See what AI tells your customers about you.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            We ask ChatGPT, Gemini, Perplexity, Claude and Google&rsquo;s AI answers the questions
            your customers ask, then send you a plain-language report within 24 hours.
          </p>
          <ul className="mt-6 space-y-2">
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
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_20px_60px_-35px_rgba(22,19,15,0.35)] sm:p-7">
          <CheckForm />
        </div>
      </section>

      <Section id="what-you-get" eyebrow="What your report covers" title="Not just whether you show up. Whether AI gets you right." tone="surface">
        <div className="grid gap-6 sm:grid-cols-2">
          {checkCovers.map((c, i) => (
            <div key={c.title} className="rounded-2xl border border-line bg-paper p-6">
              <p className="font-mono text-sm text-accent">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="How we run it" title="An honest method, because AI answers move around."
        intro={
          <>
            We write questions the way your customers would ask them, for your type of business and
            location. We run each question several times on each assistant, because answers change
            from one run to the next. The report shows how often you were mentioned and described
            correctly, with the sources each assistant cited. It is a sample, not a ranking. Any
            tool that gives you a single &ldquo;AI rank&rdquo; is overstating what can be measured.
          </>
        }
      >
        <Faq items={checkFaq} />
      </Section>
    </>
  );
}
