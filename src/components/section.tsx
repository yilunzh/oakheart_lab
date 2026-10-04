export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "paper",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  tone?: "paper" | "surface";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-line ${tone === "surface" ? "bg-surface" : "bg-paper"}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
        )}
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {intro && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</div>}
        {children && <div className="mt-10 sm:mt-12">{children}</div>}
      </div>
    </section>
  );
}
