import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/site";

export const metadata: Metadata = {
  title: { default: "Oakheart Lab — Customer Experience & Operations", template: "%s | Oakheart Lab" },
  description: "Customer experiences and operational tools for businesses that coordinate people, physical assets, and real-world delivery. Start with a free tailored website preview from Oakheart Lab.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><a className="skip-link" href="#content">Skip to content</a><Header/><div id="content">{children}</div><Footer/></body>
    </html>
  );
}
