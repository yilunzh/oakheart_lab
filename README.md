# Oakheart Lab

Agency website for Oakheart Lab: helping consumer-facing, operationally intensive businesses (companies that move atoms, not bits) get found by AI assistants, get booked, and keep customers coming back.

- [Execution plan](docs/execution-plan.md)
- [Decisions log](docs/decisions.md)
- [Review rubric](docs/review-rubric.md) (given to blind reviewers each iteration round)

## Source

The application started from the Oakheart Lab site, Sites saved version 19 (source commit `fd032bb6dcd211ff92736c84557ab433555dd7e5`), imported on branch `codex/import-oakheart-site-v19`. Review history for that build is in `ops/`.

### Development

Requires Node.js >=22.13 and pnpm (see package.json).

```sh
pnpm install
pnpm dev        # http://localhost:5173
npm run verify  # inquiry API checks (Node SQLite)
```

See [verification commands](VERIFY.md) and [starter/runtime documentation](docs/sites-starter-readme.md). The imported build uses the Sites/Cloudflare runtime and a D1 binding for inquiries; the plan moves hosting to Vercel with Postgres (Neon).
