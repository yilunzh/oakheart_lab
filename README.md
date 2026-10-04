# Oakheart Lab

Agency website for Oakheart Lab: helping experience and rental businesses get found by AI assistants, get booked, and keep customers coming back.

- [Execution plan](docs/execution-plan.md)
- [Review rubric](docs/review-rubric.md) (given to blind reviewers each iteration round)

## Existing website source

This branch imports the Oakheart Lab site, saved version 19, from source commit `fd032bb6dcd211ff92736c84557ab433555dd7e5`.

The existing planning documents above describe subsequent work; this import preserves the previously built site rather than implementing that plan.

### Development

Requires Node.js >=22.13 and pnpm (see package.json).

```sh
pnpm install
pnpm dev
```

See [verification commands](VERIFY.md) and [starter/runtime documentation](docs/sites-starter-readme.md). The current site uses the Sites/Cloudflare runtime and a D1 database binding for inquiries. Runtime secrets, database contents and hosting accounts are not transferred by this branch. Deployment elsewhere requires configuring equivalent services.

Import includes application source, content, site image assets, dependency lockfile, migrations and retained project documentation. Review-image source assets and TypeScript build cache are omitted. No live website deployment was changed by this import.
