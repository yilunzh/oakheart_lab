type Tone = "good" | "bad" | "miss";

const tagStyles: Record<Tone, string> = {
  good: "bg-good-soft text-good",
  bad: "bg-bad-soft text-bad",
  miss: "bg-highlight-soft text-highlight-ink",
};

const rows = [
  { name: "Wrenmoor Heating & Air", note: "Installs heat pumps", tone: "good" as const, tag: "Correct", rowDelay: 1.5, tagDelay: 2.1 },
  { name: "Fernhollow Comfort", note: "“Doesn’t install heat pumps”", tone: "bad" as const, tag: "Wrong", rowDelay: 1.7, tagDelay: 2.4 },
];

function Tag({ tone, delay, children }: { tone: Tone; delay: number; children: React.ReactNode }) {
  return (
    <span
      className={`answer-pop shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] ${tagStyles[tone]}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}

/** Hero illustration: a short AI answer in a phone frame. Plays once on load; static with reduced motion. */
export function AnswerCard() {
  return (
    <figure className="mx-auto w-full max-w-[340px]">
      <div className="rounded-[2.6rem] bg-night p-2.5 shadow-[0_30px_70px_-30px_rgba(19,36,27,0.55)]">
        <div className="overflow-hidden rounded-[2.1rem] bg-surface">
          <div className="flex justify-center pt-2.5" aria-hidden="true">
            <span className="h-5 w-24 rounded-full bg-night" />
          </div>
          <div className="space-y-3 px-4 pb-6 pt-4 text-[14px] leading-snug">
            <p className="text-center font-mono text-[11px] text-muted">AI assistant</p>
            <p
              className="answer-in ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-accent-ink"
              style={{ animationDelay: "0.2s" }}
            >
              Is a heat pump a good idea for my 1970s house, and who near me installs them?
            </p>
            <p
              className="answer-in max-w-[85%] rounded-2xl rounded-bl-md bg-paper px-3.5 py-2.5"
              style={{ animationDelay: "1s" }}
            >
              It can be. An installer should check your ducts and panel first. Near you:
            </p>
            {rows.map((r) => (
              <div
                key={r.name}
                className="answer-in flex items-center justify-between gap-2 rounded-xl border border-line px-3 py-2.5"
                style={{ animationDelay: `${r.rowDelay}s` }}
              >
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="block text-[12px] text-muted">{r.note}</span>
                </span>
                <Tag tone={r.tone} delay={r.tagDelay}>{r.tag}</Tag>
              </div>
            ))}
            <div
              className="answer-in flex items-center justify-between gap-2 rounded-xl border border-dashed border-highlight bg-highlight-soft/60 px-3 py-2.5"
              style={{ animationDelay: "1.9s" }}
            >
              <span className="font-semibold">Your business</span>
              <Tag tone="miss" delay={2.7}>Not mentioned</Tag>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">
        Illustrative example: the businesses are invented. Your free check shows what assistants actually say about you.
      </figcaption>
    </figure>
  );
}
