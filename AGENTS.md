# Oakheart Lab website

## Product direction
Current direction (owner decisions 2026-10-04; full log in `docs/decisions.md`, plan in `docs/execution-plan.md`, approved facts in `docs/brief.md`):

- **Audience:** consumer-facing businesses with high operational intensity, the companies that move atoms, not bits. Not limited to one vertical.
- **Message:** lead with AI-driven demand. Customers ask AI assistants where to go; we make sure they find you, book you, and get supported. The pillars are Found → Booked → Supported.
- **Calls to action:** the primary CTA is a free AI Visibility Check, unlimited and delivered in under 24 hours. The free tailored preview for qualified prospects stays as the second step.
- **Paid offer:** the core paid offer remains a complete website and booking experience integrated with existing systems. The mobile app and staff tools are optional.
- **Pricing and risk reversal:** no prices on the site. Risk reversal is "If you're not happy with our service, we'll give your money back, no questions asked." Do not add windows or conditions unless the owner approves them. This is not a performance guarantee; never promise rankings or AI recommendations.
- **Founder results:** may be cited from `docs/brief.md` as career results, never as employer endorsements or Oakheart client results.
- **Integrity:** no invented client results, testimonials, logos, scarcity or timelines.
- **Tone:** practitioner-led, specific, calm. Avoid page-count and scope-heavy sales copy.

## Source and content
- `content/site.ts`: services, article records, FAQ copy.
- `app/`: page templates and inquiry route.
- `components/`: shared visual system, inquiry form, illustrative booking flow.
- `ops/content-sources.md`: evidence and claim boundaries.
- `ops/operating-playbook.md`: maintenance, review, and approval policy.
- `ops/client-record.json`: current scope, open decisions, and evidence status.
- `VERIFY.md`: retained check commands, coverage, and evidence limits.

## Authorization
Owner has approved public access and publication of the current improvements. Owner approved moving hosting to Vercel and, at launch, indexing, analytics and AI crawler access (2026-10-04). Do not change oakheartlab.com DNS, migrate Substack, send emails, spend money, or activate recurring tasks without the owner's authorization. Preserve audience. Scheduled operation is NOT enabled by this file.

## Change workflow
Read the latest source and open tasks. Implement a bounded change, run the relevant checks in `VERIFY.md`, and request independent review for consequential copy or release changes. Keep a reversible source commit. Use Vercel preview deployments for review rounds; production promotion follows the launch checklist. Internal documentation/test-command maintenance does not require a new public deployment. Never change production schema during request handling. Applied migrations are immutable.

## Quality gates
Review mobile/desktop behavior and keyboard focus. Test form success, invalid input, storage failure and idempotency before public launch. Keep an honest success state and preserve form values on error. No public GET endpoint for inquiry data. Validate input server-side and use prepared SQL. Never expose database contents, tokens, or personal information in a public artifact.

## Launch constraints
The existing concept is publicly published with owner approval. That is separate from commercial operational readiness, custom-domain migration, search indexing, or recurring services. See `ops/operating-playbook.md` for those outstanding decisions. Indexing is approved for the production launch; keep noindex on preview deployments. Article links point to the existing Substack custom domain. Domain migration requires a route-level redirect plan.
