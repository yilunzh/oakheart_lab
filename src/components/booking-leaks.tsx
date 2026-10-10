import { leaks } from "@/content/site";

/** The path from question to booking, and where each customer is lost. */
export function BookingLeaks() {
  return (
    <figure className="mt-12">
      <figcaption className="text-xl font-semibold">Where bookings slip away</figcaption>
      <ol className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr_1fr_auto] md:gap-4">
        {leaks.map((l) => (
          <li key={l.stage}>
            <p className="flex items-center gap-2">
              <span className="rounded-full bg-ink px-3 py-1.5 text-sm font-medium text-paper">{l.stage}</span>
              <span aria-hidden="true" className="hidden text-muted md:inline">→</span>
            </p>
            <div className="ml-5 mt-2 border-l-2 border-dashed border-bad/50 pl-4 pt-2">
              <p className="font-mono text-xs uppercase tracking-wider text-bad">Lost here</p>
              <p className="mt-1 font-semibold">{l.leak}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{l.why}</p>
            </div>
          </li>
        ))}
        <li>
          <span className="inline-flex rounded-full bg-good-soft px-3 py-1.5 text-sm font-semibold text-good">
            <span aria-hidden="true" className="mr-1.5">✓</span>Booked
          </span>
        </li>
      </ol>
    </figure>
  );
}
