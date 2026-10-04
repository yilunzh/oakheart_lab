<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Oakheart Lab website

Before changing copy, offer or structure, read:
- `docs/brief.md`: approved facts and constraints. This is the source of truth for claims.
- `docs/decisions.md`: owner decisions, newest first.
- `docs/execution-plan.md`: architecture, conversion system and quality loop.

Hard rules:
- Use only publicly available founder information. No results or metrics from past or current employers.
- No invented client results, testimonials, logos, statistics or scarcity.
- Never promise rankings or AI recommendations.
- The primary CTA is the free AI Visibility Check (unlimited, under 24 hours).
- Keep the money-back sentence exactly as approved.
- The previous site (branch `codex/import-oakheart-site-v19`) is a reference only. Do not copy its code or design system.
- Secrets (DataForSEO, email sending) live in Vercel env vars, never in the repo.
- Review rounds follow `docs/review-rubric.md`. Reviewers never see target or prior scores.
