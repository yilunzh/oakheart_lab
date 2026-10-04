import Link from "next/link";
import { Logo } from "./logo";
import { CtaLink } from "./cta-link";
import { checkCta, nav } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Oakheart Lab home">
          <Logo className="text-[17px]" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <CtaLink href={checkCta.href} className="min-h-10 px-4 text-sm sm:px-5">
          <span className="sm:hidden">Free AI check</span>
          <span className="hidden sm:inline">{checkCta.label}</span>
        </CtaLink>
      </div>
    </header>
  );
}
