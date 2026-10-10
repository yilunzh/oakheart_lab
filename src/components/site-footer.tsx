import Link from "next/link";
import { Logo } from "./logo";
import { checkCta, moneyBack, nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-lg" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            AI visibility, booking and customer support for tours, rentals, auto, home services and stays, kept current every month.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{moneyBack}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={checkCta.href} className="hover:text-accent">Free AI check</Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
            </li>
            <li>
              <a href={site.linkedin} className="hover:text-accent" rel="noopener">LinkedIn</a>
            </li>
            <li>
              <a href={site.substack} className="hover:text-accent" rel="noopener">Writing on Substack</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-line px-4 py-6 text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} Oakheart Lab
      </div>
    </footer>
  );
}
