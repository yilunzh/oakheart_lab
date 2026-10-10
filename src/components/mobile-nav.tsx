"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav, talkFirst } from "@/content/site";

export function MobileNav() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  const close = () => {
    if (ref.current) ref.current.open = false;
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) ref.current.open = false;
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);
  return (
    <details ref={ref} className="group md:hidden">
      <summary
        aria-label="Menu"
        className="grid size-10 cursor-pointer place-items-center rounded-full border border-ink/20"
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
          <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="group-open:hidden" />
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="hidden group-open:block" />
        </svg>
      </summary>
      <nav aria-label="Mobile" className="absolute inset-x-0 top-16 border-b border-line bg-paper px-4 pb-6 pt-2 shadow-lg">
        <ul className="divide-y divide-line">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close} className="block py-3 text-lg">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={talkFirst.href} className="block py-3 text-lg">{talkFirst.label}</a>
          </li>
        </ul>
      </nav>
    </details>
  );
}
