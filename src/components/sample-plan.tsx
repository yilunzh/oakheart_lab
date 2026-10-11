import { samplePlan } from "@/content/site";

export function SamplePlan() {
  return (
    <figure id="sample-plan" className="mt-12 scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Sample plan excerpt</p>
        <p className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
          Illustrative · fictional business
        </p>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-sm text-muted">
          {samplePlan.business} (invented). The check found ChatGPT giving the wrong minimum age.
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {samplePlan.groups.map((g) => (
            <div key={g.key}>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">{g.key}</p>
              <ul className="mt-3 space-y-2.5 text-[15px] leading-snug">
                {g.fixes.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-line px-5 py-3 text-xs text-muted">
        Shows the format only. Your plan comes from your check.
      </figcaption>
    </figure>
  );
}
