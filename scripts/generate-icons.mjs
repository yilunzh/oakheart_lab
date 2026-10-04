#!/usr/bin/env node
// Generates the site's spot-illustration icons with the OpenAI Image API,
// then writes optimized WebP assets to public/icons/. See docs/icon-brief.md.
//
// Usage:
//   OPENAI_API_KEY=... node scripts/generate-icons.mjs discover book support
//   OPENAI_API_KEY=... node scripts/generate-icons.mjs --ref <raw.png> tours rentals
//   node scripts/generate-icons.mjs --optimize-only [keys...]
//   ICON_STYLE=geometric RAW_DIR=... node scripts/generate-icons.mjs --no-optimize discover
//
// Raw 1024px PNGs and token usage go to RAW_DIR (default ../oakheart-icons-raw),
// outside the repo. The API key is read from the environment and never logged.

import { mkdir, readFile, writeFile, appendFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW_DIR = path.resolve(process.env.RAW_DIR ?? path.join(ROOT, "..", "oakheart-icons-raw"));
const OUT_DIR = path.join(ROOT, "public", "icons");
const MODEL = process.env.ICON_MODEL ?? "gpt-image-2.5-sunburst";
const QUALITY = process.env.ICON_QUALITY ?? "high";

const PALETTE =
  "Strict palette, no other hues: oak green #1f5c3a (primary), deep green #13241b (darkest tone), soft green #e2eee5 (light fills), paper #f5f4ee (lightest), and at most one small amber #f6c343 accent.";
const COMPOSITION = [
  "One centered subject on a square canvas, occupying about 70% of the frame with generous even padding.",
  "No text, no letters, no numbers, no logos.",
  "Bold simple silhouettes with few details so it reads clearly at 48 to 64 pixels.",
].join(" ");
const NO_BACKDROP = "Fully transparent background, nothing behind the subject: no ground, no circle badge, no backdrop.";

// Alternative looks explored with the owner; pick one with ICON_STYLE=<name> (default: the approved style).
export const STYLES = {
  // A: outlined spot illustration (first round, not chosen)
  outlined: [
    "A single refined editorial spot-illustration icon for a calm, practitioner-led consultancy website.",
    "Flat shapes with a confident, slightly rounded deep green (#13241b) outline of even weight.",
    "Subtle two-tone flat shading only: each shape has a base tone and one darker shade tone on its lower right; light comes from the top left.",
    "No gradients, no 3D, no gloss, no highlights, no texture, no drop shadow, no clip-art look.",
    PALETTE, NO_BACKDROP,
  ],
  // B: no outlines, chunky geometric shapes (owner-approved 2026-10-04)
  geometric: [
    "A single modern geometric icon for a calm, premium consultancy website.",
    "Built only from solid flat shapes with no outlines or strokes at all; forms are simplified to circles, rounded rectangles and clean arcs with generous corner radii.",
    "Depth comes only from overlapping shapes in different tones of the palette; one flat shade tone per shape at most, light from the top left.",
    "The silhouette must read strongly against a pale off-white page: the outer shapes are oak green or deep green, and soft green and paper tones appear only on top of darker shapes, never as the outer edge of the subject.",
    "Amber is used sparingly: at most one small amber detail in the whole icon, never more than one amber element.",
    "No gradients, no 3D, no gloss, no texture, no drop shadow.",
    PALETTE, NO_BACKDROP,
  ],
  // C: fine monoline drawing with offset color blocks
  monoline: [
    "A single elegant editorial icon in a fine monoline style, like a premium magazine or architecture-studio pictogram.",
    "Thin, uniform deep green (#13241b) line drawing with rounded ends, open and airy.",
    "Behind the line drawing, one or two loose flat color blocks in soft green and oak green, slightly offset from the lines like a misregistered print.",
    "No shading, no gradients, no 3D, no texture, no drop shadow.",
    PALETTE, NO_BACKDROP,
  ],
  // D: hand-printed linocut / woodcut
  linocut: [
    "A single icon in the style of a hand-carved linocut or woodcut print, crafted and warm, suiting a brand called Oakheart.",
    "Bold carved deep green (#13241b) shapes with slightly irregular hand-cut edges and a few carved line details; flat ink colors with a faint print grain.",
    "Two or three flat ink colors only, no gradients, no 3D, no gloss.",
    PALETTE, NO_BACKDROP,
  ],
  // E: outlined subject on a soft-green rounded badge
  badge: [
    "A single refined editorial icon placed on a soft green (#e2eee5) rounded-square badge tile, with the subject slightly breaking out of the tile's top edge.",
    "The subject uses flat shapes with a confident, slightly rounded deep green (#13241b) outline and subtle two-tone flat shading, light from the top left.",
    "No gradients, no 3D, no gloss, no texture, no drop shadow.",
    PALETTE,
    "Transparent background outside the badge tile.",
  ],
};
const STYLE_NAME = process.env.ICON_STYLE ?? "geometric";
if (!STYLES[STYLE_NAME]) throw new Error(`Unknown ICON_STYLE: ${STYLE_NAME}`);
export const STYLE_PROMPT = [...STYLES[STYLE_NAME], COMPOSITION].join(" ");

const REF_NOTE =
  "Match the attached reference icon's style exactly: the same outline weight, the same shading method, the same palette, padding and level of detail. Draw only the new subject, not the reference subject.";

export const ICONS = {
  discover: "A magnifying glass over a small map pin, with a tiny chat bubble. Being found and cited by AI.",
  book: "A calendar card with one date checked, and a small ticket stub. A confirmed booking.",
  support: "Two overlapping chat bubbles, one with a small headset. Instant answers with a human handoff.",
  tours: "A kayak with a paddle on a small wave.",
  rentals: "A rental key on a tag.",
  services: "A wrench crossed with a small house.",
  classes: "A rolled yoga mat with a small clock.",
  stays: "A small cabin with a pine tree.",
  moving: "A stack of moving boxes with a hand truck dolly.",
  "step-check": "A clipboard with a magnifying glass: the free check.",
  "step-plan": "A folded plan or blueprint with an upward arrow: the plan.",
  "step-ongoing": "A circular arrow around a small upward chart line: ongoing support.",
};

// 128 px covers 2x retina at the 40–64 px display sizes used on the site.
const SIZES = [128];

function promptFor(key, withRef) {
  return `${STYLE_PROMPT}${withRef ? ` ${REF_NOTE}` : ""} Subject: ${ICONS[key]}`;
}

async function callApi(key, refPath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
  const headers = { Authorization: `Bearer ${apiKey}` };
  const common = { model: MODEL, size: "1024x1024", quality: QUALITY, background: "transparent", output_format: "png", n: 1 };
  let res;
  if (refPath) {
    const form = new FormData();
    for (const [k, v] of Object.entries({ ...common, prompt: promptFor(key, true) })) form.append(k, String(v));
    form.append("image[]", new Blob([await readFile(refPath)], { type: "image/png" }), path.basename(refPath));
    res = await fetch("https://api.openai.com/v1/images/edits", { method: "POST", headers, body: form });
  } else {
    res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ ...common, prompt: promptFor(key, false) }),
    });
  }
  const json = await res.json();
  if (!res.ok) throw new Error(`${key}: HTTP ${res.status} ${json?.error?.message ?? ""}`);
  return json;
}

async function optimize(key) {
  const raw = path.join(RAW_DIR, `${key}.png`);
  // Trim the transparent margin, then re-pad evenly so every icon has the same framing.
  const trimmed = await sharp(raw).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  const side = Math.round(Math.max(width, height) / 0.84);
  const square = await sharp(trimmed.data)
    .extend({
      top: Math.floor((side - height) / 2),
      bottom: Math.ceil((side - height) / 2),
      left: Math.floor((side - width) / 2),
      right: Math.ceil((side - width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  await mkdir(OUT_DIR, { recursive: true });
  for (const size of SIZES) {
    const out = path.join(OUT_DIR, size === 128 ? `${key}.webp` : `${key}@${size}.webp`);
    await sharp(square).resize(size, size, { kernel: "lanczos3" }).webp({ quality: 88, alphaQuality: 90, effort: 6 }).toFile(out);
    console.log(`  ${path.relative(ROOT, out)} ${((await stat(out)).size / 1024).toFixed(1)} KB`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const optimizeOnly = args.includes("--optimize-only");
  const skipOptimize = args.includes("--no-optimize");
  const refIdx = args.indexOf("--ref");
  const refPath = refIdx >= 0 ? path.resolve(args[refIdx + 1]) : null;
  const keys = args.filter((a, i) => !a.startsWith("--") && !(refIdx >= 0 && i === refIdx + 1));
  const selected = keys.length ? keys : Object.keys(ICONS);
  for (const k of selected) if (!ICONS[k]) throw new Error(`Unknown icon key: ${k}`);
  await mkdir(RAW_DIR, { recursive: true });

  await Promise.all(
    selected.map(async (key) => {
      if (!optimizeOnly) {
        const json = await callApi(key, refPath);
        await writeFile(path.join(RAW_DIR, `${key}.png`), Buffer.from(json.data[0].b64_json, "base64"));
        await appendFile(
          path.join(RAW_DIR, "usage.jsonl"),
          JSON.stringify({ key, style: STYLE_NAME, model: MODEL, quality: QUALITY, ref: refPath ? path.basename(refPath) : null, usage: json.usage, at: new Date().toISOString() }) + "\n",
        );
        console.log(`generated ${key}`);
      } else if (!existsSync(path.join(RAW_DIR, `${key}.png`))) {
        throw new Error(`No raw file for ${key}`);
      }
    }),
  );
  if (skipOptimize) return;
  for (const key of selected) {
    console.log(`optimize ${key}`);
    await optimize(key);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
