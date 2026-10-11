import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Oakheart Lab collects when you request a free AI check, why, who processes it, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: "Oakheart Lab",
    title: "Privacy | Oakheart Lab",
    description: "What Oakheart Lab collects when you request a free AI check, why, who processes it, and how to have it deleted.",
    url: "/privacy",
  },
};

const sections = [
  {
    h: "What we collect",
    body: [
      "When you request a free AI check: your business name, website, location, type of business, email, and anything you add in the optional fields.",
      "With each request: the page that referred you, any campaign tags in the link (UTM), and a one-way hash of your IP address, used only to limit abuse. We don’t store the IP address itself.",
    ],
  },
  {
    h: "Why",
    body: [
      "To run your check, send you the report and reply if you write back. The referrer, campaign tags and “How did you hear about us?” answer show us how people find us. The IP hash limits repeated requests. We don’t sell your information or add you to a newsletter without asking.",
    ],
  },
  {
    h: "Who processes it",
    body: [
      "Vercel hosts the site. Neon stores check requests. Resend sends the notification email to Oakheart Lab, and Google Workspace hosts Oakheart Lab’s email, where your report is written and sent. Each processes data only to provide that service. To run your check we ask AI assistants questions about your business, using its name, website, location and type, never your email.",
    ],
  },
  {
    h: "How long we keep it",
    body: ["Until you ask us to delete it."],
  },
  {
    h: "Cookies",
    body: ["This site doesn’t use advertising or tracking cookies."],
  },
  {
    h: "Your choices",
    body: [
      "To see, correct or delete what we hold about you, email us. We’ll do it and confirm by email.",
    ],
    email: true,
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Privacy</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">How we handle your information.</h1>
      <p className="mt-4 text-sm text-muted">Last updated 10 October 2026.</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="text-xl font-semibold">{s.h}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-2 leading-relaxed text-muted">{p}</p>
            ))}
            {"email" in s && (
              <p className="mt-2">
                <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-accent">{site.email}</a>
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-12">
        <Link href="/ai-visibility-check" className="underline underline-offset-4 hover:text-accent">
          Back to the free AI check
        </Link>
      </p>
    </section>
  );
}
