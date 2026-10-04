export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-tight ${className}`}>
      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" className="shrink-0">
        <circle cx="13" cy="13" r="12" fill="var(--accent)" />
        <path d="M13 5.5c3.6 2.4 4.8 6.1 0 15-4.8-8.9-3.6-12.6 0-15Z" fill="var(--paper)" />
        <path d="M13 9v11" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span>Oakheart Lab</span>
    </span>
  );
}
