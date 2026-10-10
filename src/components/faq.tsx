export type FaqItem = { q: string; a: string; source?: { label: string; href: string } };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer items-start justify-between gap-6 text-left text-lg font-medium">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-ink/20 text-sm transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{item.a}</p>
          {item.source && (
            <p className="mt-2 text-xs text-muted">
              Source:{" "}
              <a href={item.source.href} className="underline underline-offset-2 hover:text-ink" rel="noopener">
                {item.source.label}
              </a>
            </p>
          )}
        </details>
      ))}
    </div>
  );
}
