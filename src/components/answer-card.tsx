type Row = {
  name: string;
  text: string;
  tag?: { tone: "bad" | "good"; label: string };
};

const rows: Row[] = [
  {
    name: "Emerald Paddle Co.",
    text: "Guided family tours at sunset. Kids 5 and up with an adult.",
    tag: { tone: "good", label: "Correct" },
  },
  {
    name: "North Shore Kayak",
    text: "Great reviews, but tours are for ages 12 and up.",
    tag: { tone: "bad", label: "Wrong. Their site says 6+ with an adult" },
  },
];

export function AnswerCard() {
  return (
    <figure className="relative">
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_20px_60px_-30px_rgba(22,19,15,0.35)] sm:p-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="size-2 rounded-full bg-ink/80" aria-hidden="true" />
          <span className="font-mono">AI assistant</span>
        </div>
        <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-[15px]">
          Best kayak tour near Lake Tahoe for a family with a 6-year-old?
        </p>
        <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
          <p className="text-muted">Here are a couple of good options:</p>
          {rows.map((row) => (
            <div key={row.name} className="rounded-xl border border-line p-3">
              <p>
                <span className="font-semibold">{row.name}.</span> {row.text}
              </p>
              {row.tag && (
                <p
                  className={`mt-2 inline-flex rounded-full px-2.5 py-1 font-mono text-xs ${
                    row.tag.tone === "bad" ? "bg-bad-soft text-bad" : "bg-good-soft text-good"
                  }`}
                >
                  {row.tag.label}
                </p>
              )}
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-accent/60 bg-accent-soft/60 p-3">
            <p className="font-mono text-xs text-accent">Not mentioned</p>
            <p className="mt-1 font-semibold">Your business</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-muted">
        Illustrative example with fictional businesses. Your free check shows what assistants actually say about you.
      </figcaption>
    </figure>
  );
}
