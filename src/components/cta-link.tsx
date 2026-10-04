import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  className?: string;
};

const styles = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-hover shadow-sm",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-surface",
  inverse:
    "bg-paper text-ink hover:bg-white",
};

export function CtaLink({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
