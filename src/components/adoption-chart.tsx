"use client";

import { useEffect, useRef, useState } from "react";

type Point = { date: string; label: string; users: number; note: string; href?: string };

const PAD = { top: 28, right: 56, bottom: 36, left: 48 };
const Y_MAX = 1200;
const Y_TICKS = [0, 400, 800, 1200];

const fmt = (m: number) => (m >= 1000 ? `${(m / 1000).toFixed(m % 1000 ? 1 : 0)}B` : `${m}M`);

export function AdoptionChart({ data }: { data: Point[] }) {
  // Size the drawing to its container so text renders at real pixel sizes on every screen.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(280, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 480 ? 240 : 300;
  const t0 = new Date(data[0].date).getTime();
  const t1 = new Date(data[data.length - 1].date).getTime();
  const x = (d: string) => PAD.left + ((new Date(d).getTime() - t0) / (t1 - t0)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / Y_MAX) * (H - PAD.top - PAD.bottom);
  const pts = data.map((d) => ({ ...d, cx: x(d.date), cy: y(d.users) }));
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].cx.toFixed(1)},${y(0)} L${pts[0].cx.toFixed(1)},${y(0)} Z`;
  const last = pts[pts.length - 1];
  const years = ["2024", "2025", "2026"].map((yr) => ({ yr, cx: x(`${yr}-01-01`) }));

  const [active, setActive] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = ((e.clientX - r.left) / r.width) * W;
    let best = 0;
    pts.forEach((p, i) => {
      if (Math.abs(p.cx - px) < Math.abs(pts[best].cx - px)) best = i;
    });
    setActive(best);
  }
  function onKey(e: React.KeyboardEvent<SVGSVGElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    setActive((a) => {
      const cur = a ?? pts.length - 1;
      return e.key === "ArrowRight" ? Math.min(pts.length - 1, cur + 1) : Math.max(0, cur - 1);
    });
  }

  const a = active !== null ? pts[active] : null;

  return (
    <div ref={wrapRef} className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-accent"
        role="img"
        aria-label={`Line chart: ChatGPT weekly active users grew from ${fmt(data[0].users)} in ${data[0].label} to ${fmt(last.users)} in ${last.label}. Use left and right arrow keys to read each point.`}
        tabIndex={0}
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
        onKeyDown={onKey}
        onBlur={() => setActive(null)}
      >
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth="1" />
            <text x={PAD.left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill="var(--muted)">
              {t === 0 ? "0" : fmt(t)}
            </text>
          </g>
        ))}
        {years.map((yr) => (
          <text key={yr.yr} x={yr.cx} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--muted)">
            {yr.yr}
          </text>
        ))}
        <path d={area} fill="var(--accent)" opacity="0.1" />
        <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {a && (
          <line x1={a.cx} x2={a.cx} y1={PAD.top} y2={y(0)} stroke="var(--muted)" strokeWidth="1" />
        )}
        {pts.map((p, i) => (
          <circle
            key={p.date}
            cx={p.cx}
            cy={p.cy}
            r={i === pts.length - 1 || i === active ? 5 : 0}
            fill="var(--accent)"
            stroke="var(--surface)"
            strokeWidth="2"
          />
        ))}
        <text x={last.cx + 10} y={last.cy} dominantBaseline="middle" fontSize="15" fontWeight="600" fill="var(--ink)">
          {fmt(last.users)}
        </text>
        <text x={pts[0].cx} y={pts[0].cy - 12} textAnchor="start" fontSize="11" fill="var(--muted)">
          {fmt(pts[0].users)}
        </text>
      </svg>
      {a && (
        <div
          className="pointer-events-none absolute top-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm shadow-sm"
          style={{ left: `clamp(0px, calc(${(a.cx / W) * 100}% - 70px), calc(100% - 150px))` }}
          aria-live="polite"
        >
          <p className="font-semibold text-ink">{fmt(a.users)} weekly users</p>
          <p className="text-xs text-muted">
            {a.label} · {a.note}
          </p>
        </div>
      )}
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-muted hover:text-ink">View data</summary>
        <table className="mt-2 w-full text-left text-sm">
          <thead>
            <tr className="text-muted">
              <th className="py-1 font-medium">Date</th>
              <th className="py-1 font-medium">Weekly users</th>
              <th className="py-1 font-medium">Announced by</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.date} className="border-t border-line">
                <td className="py-1">{d.label}</td>
                <td className="py-1">{fmt(d.users)}</td>
                <td className="py-1 text-muted">
                  {d.href ? (
                    <a href={d.href} className="underline underline-offset-2 hover:text-ink" rel="noopener">{d.note}</a>
                  ) : (
                    d.note
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
