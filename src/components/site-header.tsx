import Link from "next/link";
import { Logo } from "./logo";
import { CtaLink } from "./cta-link";
import { MobileNav } from "./mobile-nav";
import { checkCta, nav } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 min-[360px]:gap-4 sm:px-6">
        <Link href="/" aria-label="Oakheart Lab home">
          <Logo className="whitespace-nowrap text-[17px] max-[359px]:text-[15px]" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CtaLink href={checkCta.href} className="min-h-10 whitespace-nowrap max-sm:px-4 max-sm:text-sm sm:px-5 sm:text-sm">
            <span className="min-[360px]:hidden">Free check</span>
            <span className="hidden min-[360px]:inline sm:hidden">Free AI check</span>
            <span className="hidden sm:inline">{checkCta.label}</span>
          </CtaLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
