# Icon brief: custom iconography (OpenAI image generation)

**Owner request (2026-10-04):** the site needs richer, custom iconography. Hand-coded SVG icons look too simplistic. Use OpenAI image generation; the key is available as the `OPENAI_API_KEY` environment variable. Never print, log or commit the key.

## Style spec (keep identical across every icon)

- **Look:** refined, editorial "spot illustration" icons. Richer than line icons, but not 3D, glossy or clip-art.
  - Flat shapes with a confident, slightly rounded outline.
  - Subtle two-tone shading; no gradients.
  - A consistent light source from the top left.
- **Palette** (from `src/app/globals.css`):
  - oak green `#1f5c3a` (primary)
  - deep green `#13241b` (outline and shadow)
  - soft green `#e2eee5` (fills)
  - amber `#f6c343` (one small accent per icon at most)
  - paper `#f5f4ee`
  - no other hues
- **Composition:**
  - a single centered subject, square canvas, generous padding (subject about 70% of the frame)
  - transparent background, no text, no letters, no logos
  - must read clearly at 48–64 px
- **Consistency:** generate the whole set with one shared style prompt plus a per-icon subject line. If the API supports a reference image, pass the first approved icon to keep the style locked.

## Icons needed

| Key | Used in | Subject |
|---|---|---|
| `discover` | What we do → Discover | A magnifying glass over a small map pin, with a tiny chat bubble. Being found and cited by AI. |
| `book` | What we do → Book | A calendar card with one date checked, and a small ticket stub. A confirmed booking. |
| `support` | *Unused since 2026-10-11* (the third pillar became Stay ahead and uses `step-ongoing`) | Two overlapping chat bubbles, one with a small headset. Instant answers with a human handoff. |
| `tours` | Question card: Tours & experiences | A kayak with a paddle on a small wave |
| `rentals` | Question card: Rentals | A pontoon boat, or a rental key on a tag |
| `services` | Question card: Home services | A wrench crossed with a small house |
| `automotive` | Question card: Car buying & service | A car with a small wrench and price tag (replaced `classes`, 2026-10-04) |
| `stays` | Question card: Stays & hospitality | A small cabin with a pine tree |
| `moving` | Question card: Moving & storage | A stack of moving boxes with a dolly |
| `step-check` | How it works: Step 1 | A clipboard with a magnifier: the free check |
| `step-plan` | How it works: Step 2 | A folded plan or blueprint with an upward arrow: the plan |
| `step-ongoing` | How it works: Step 3 | A circular arrow around a small upward chart line: ongoing |

Optional, only if the set above is approved:
- report status icons (mentioned / wrong / fix first)
- a hero spot illustration

## Process

1. **Check the current OpenAI image API** (model name, parameters, transparent-background support) in the official docs before writing code. Don't rely on memory.
2. **Write a script** at `scripts/generate-icons.mjs` that:
   - reads `OPENAI_API_KEY` from the environment
   - generates each icon (PNG, transparent background, 1024×1024)
   - saves the raw files outside the repo
   - writes optimized assets to `public/icons/<key>.webp` (or PNG). Target each icon at about 20 KB or less, sized for 2× retina at 64 px display (128×128) plus a 256×256 variant where needed.
3. **Generate `discover`, `book` and `support` first.** Show them to the owner as one image and get approval of the style before generating the rest.
4. **Iterate the prompt, not individual icons,** until the set is consistent. Record the final style prompt in this file.
   - **Final (2026-10-04):** style B, geometric with no outlines. The full prompt, model and cost are in `docs/decisions.md` ("Custom icons"), and the prompt is also the `geometric` entry in `scripts/generate-icons.mjs`.
5. **Integrate:**
   - `next/image` with fixed width and height
   - `alt=""` where the icon is decorative next to a text label
   - placed in the pillar cards, question cards and step headers
   - no layout shift, and the mobile layout still clean
6. **Verify, then publish:**
   - `pnpm lint`, `pnpm test`, `pnpm build`
   - Playwright screenshots at 390 and 1440 px, sent to the owner
   - commit and push; Vercel auto-deploys `claude/jolly-meitner-altfse` to https://oakheart-lab.vercel.app
7. **Record** costs, model, prompts and the decision in `docs/decisions.md`.
