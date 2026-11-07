import Link from "next/link";

const runs = [
  { engine: "ChatGPT", mentioned: 2, total: 5 },
  { engine: "Google’s AI", mentioned: 3, total: 5 },
  { engine: "Perplexity", mentioned: 0, total: 5 },
];

export function SampleReport() {
  return (
    <figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper px-5 py-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Sample report excerpt</p>
        <p className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
          Illustrative · invented business
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 p-5 sm:p-6 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-sm text-muted">Quillbay Heating &amp; Air</p>
          <p className="mt-2 text-lg font-medium">&ldquo;Who near me can swap my oil furnace for a heat pump?&rdquo;</p>
          <dl className="mt-4 space-y-2 text-[15px]">
            {runs.map((r) => (
              <div key={r.engine} className="flex items-center justify-between gap-4 border-b border-line pb-2">
                <dt>{r.engine}</dt>
                <dd className="whitespace-nowrap font-mono text-sm sm:text-[15px]">
                  named in {r.mentioned} of {r.total} tries
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-4 text-[15px] leading-relaxed">
          <div className="rounded-xl bg-bad-soft p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-bad">Error found</p>
            <p className="mt-1">
              ChatGPT says you only do repairs. Your site lists heat pump installs. The answer cites
              an old directory listing from before you started installing.
            </p>
          </div>
          <div className="rounded-xl bg-good-soft p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-good">Fix first</p>
            <p className="mt-1">
              Update your services on that listing and your Google Business Profile, and add a heat
              pump installation page that answers what homeowners ask, like ductwork, cold weather
              and backup heat, so assistants have one consistent answer to repeat.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-line px-5 py-3 text-xs text-muted">
        Shows the format only, with 3 of the 5 assistants we check. Your report uses your business, your location and real answers
        from each assistant.{" "}
        <Link href="/#sample-plan" className="underline underline-offset-2 hover:text-ink">
          See how a check becomes a plan
        </Link>
      </figcaption>
    </figure>
  );
}
