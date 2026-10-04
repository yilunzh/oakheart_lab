"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { businessTypes, heardFrom, site } from "@/content/site";
import type { FieldErrors } from "@/lib/check-request";

type Status = "idle" | "sending" | "sent" | "duplicate" | "error";

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : undefined;

function mailtoFor(data: Record<string, FormDataEntryValue>) {
  const body = [
    "Please run a free AI check for:",
    `Business: ${data.businessName ?? ""}`,
    `Website: ${data.website ?? ""}`,
    `Location: ${data.location ?? ""}`,
    `Type: ${data.businessType ?? ""}`,
    data.question ? `Question: ${data.question}` : "",
  ].filter(Boolean).join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent("Free AI check request")}&body=${encodeURIComponent(body)}`;
}

const fieldClass =
  "mt-1.5 block w-full scroll-mt-28 rounded-xl border border-ink/25 bg-surface px-3.5 py-3 text-base text-ink placeholder:text-muted/70 focus:border-ink aria-[invalid=true]:border-bad";

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-bad">
          {error}
        </p>
      )}
    </div>
  );
}

function revealStatus(el: HTMLElement | null) {
  if (!el) return;
  // scroll-margin on the element keeps it clear of the sticky header.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  el.focus({ preventScroll: true });
}

export function CheckForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");
  const [requestId] = useState(newId);
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
        .map((k) => [k, params.get(k)])
        .filter(([, v]) => v),
    );
    setStatus("sending");
    setErrors({});
    setMessage("");
    setFallbackHref(null);
    try {
      const res = await fetch("/api/checks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, requestId, utm, referrer: document.referrer || undefined }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 201 || res.status === 202) {
        setSentTo(String(data.email ?? ""));
        setStatus(json.status === "duplicate" ? "duplicate" : "sent");
        requestAnimationFrame(() => revealStatus(statusRef.current));
        return;
      } else if (res.status === 429) {
        setStatus("error");
        setMessage("That’s a lot of requests from one connection in an hour. Please try again later, or email us and we’ll run it.");
        setFallbackHref(mailtoFor(data));
      } else if (res.status === 422 && json.fields) {
        setErrors(json.fields);
        setStatus("error");
        setMessage("Please fix the highlighted fields.");
        const first = Object.keys(json.fields)[0];
        if (first) document.getElementById(first)?.focus();
        return;
      } else {
        setStatus("error");
        setMessage("We couldn’t submit your request right now, and nothing was saved. You can send the same details by email instead.");
        setFallbackHref(mailtoFor(data));
      }
    } catch {
      setStatus("error");
      setMessage("We couldn’t reach our server, and nothing was saved. Check your connection and try again, or send the details by email.");
      setFallbackHref(mailtoFor(data));
    }
    requestAnimationFrame(() => revealStatus(statusRef.current));
  }

  if (status === "sent" || status === "duplicate") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="scroll-mt-24 rounded-2xl border border-good/30 bg-good-soft p-6">
        <h2 className="text-xl font-semibold">
          {status === "sent" ? "Request received." : "We already have this one."}
        </h2>
        <p className="mt-2 leading-relaxed">
          {status === "sent"
            ? `Your report will arrive within 24 hours from ${site.email}, sent to ${sentTo}.`
            : `You asked about this website in the last 24 hours, so your report is already on its way to ${sentTo} from ${site.email}.`}{" "}
          If it isn&rsquo;t in your inbox, check your spam or promotions folder.
        </p>
        <p className="mt-3 leading-relaxed">
          While you wait, see <Link href="/#system" className="underline underline-offset-2">how we fix what the check finds</Link>, or reply to the report with any questions. There&rsquo;s no sales call unless you ask for one.
        </p>
      </div>
    );
  }

  const describe = (id: keyof FieldErrors, hint?: boolean) =>
    [hint ? `${id}-hint` : null, errors[id] ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-status">
      <div
        ref={statusRef}
        id="form-status"
        tabIndex={-1}
        role={status === "error" ? "alert" : undefined}
        className={message ? "scroll-mt-24 rounded-xl border border-bad/30 bg-bad-soft p-4 text-sm text-bad" : "sr-only"}
      >
        {message}
        {fallbackHref && (
          <>
            {" "}
            <a href={fallbackHref} className="font-semibold underline underline-offset-2">
              Email your details to {site.email}
            </a>
          </>
        )}
      </div>

      <Field id="businessName" label="Business name" error={errors.businessName}>
        <input id="businessName" name="businessName" autoComplete="organization" required
          aria-invalid={!!errors.businessName} aria-describedby={describe("businessName")} className={fieldClass} />
      </Field>
      <Field id="website" label="Website" hint="We compare what AI says against your own site." error={errors.website}>
        <input id="website" name="website" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" required
          aria-invalid={!!errors.website} aria-describedby={describe("website", true)} className={fieldClass} />
      </Field>
      <div className="grid gap-5">
        <Field id="location" label="City or area you serve" error={errors.location}>
          <input id="location" name="location" autoComplete="address-level2" placeholder="e.g. Asheville, NC" required
            aria-invalid={!!errors.location} aria-describedby={describe("location")} className={fieldClass} />
        </Field>
        <Field id="businessType" label="Type of business" error={errors.businessType}>
          <select id="businessType" name="businessType" defaultValue="" required
            aria-invalid={!!errors.businessType} aria-describedby={describe("businessType")} className={fieldClass}>
            <option value="" disabled>Choose one</option>
            {businessTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <Field id="email" label="Email for your report" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" required
          aria-invalid={!!errors.email} aria-describedby={describe("email")} className={fieldClass} />
      </Field>
      <Field id="question" label="A question you wish AI answered correctly about you (optional)"
        hint="For example: “Do you allow dogs on the boat?”" error={errors.question}>
        <textarea id="question" name="question" rows={2} maxLength={600}
          aria-invalid={!!errors.question} aria-describedby={describe("question", true)} className={fieldClass} />
      </Field>
      <Field id="heardFrom" label="How did you hear about us? (optional)" error={errors.heardFrom}>
        <select id="heardFrom" name="heardFrom" defaultValue="" className={fieldClass}
          aria-invalid={!!errors.heardFrom} aria-describedby={describe("heardFrom")}>
          <option value="">Prefer not to say</option>
          {heardFrom.map((h) => <option key={h}>{h}</option>)}
        </select>
      </Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 font-semibold text-accent-ink transition-colors hover:bg-[#9c330a] disabled:opacity-70">
        {status === "sending" ? "Sending…" : "Get my free AI check"}
      </button>
      <p className="text-center text-xs text-muted">
        Report in under 24 hours. We use your details only to run your check and send the report.
      </p>
    </form>
  );
}
