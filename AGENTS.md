# Oakheart Lab website

## Product direction
Lead with websites and booking flows for businesses combining digital demand with operationally intensive delivery. Backend tools supporting the customer lifecycle are in scope, not limited to racing. AI is a delivery method. Owner approved a free tailored homepage and one key booking-journey preview for qualified prospects, with no obligation to buy. Confirm fit and preview timing in a short conversation; distinguish simulations from integrations. Paid offer is a complete website and booking experience with conversion, SEO and AI-search foundations; one price for completed launch with preview. User rejects page-count and scope-heavy sales copy: own complete delivery and existing-system integration. Optional services: companion mobile app, AI back-office automation, AI customer support. Keep operational detail in project discussion, not sales-page caveat lists. Fees and delivery windows remain undecided. Do not narrow the paid offer to one service or claim a whole-project zero-risk/performance guarantee. Keep the tone practitioner-led, specific, and calm. No invented client results, testimonials, prices, timelines, scarcity, guarantees, or employer endorsements.

## Source and content
- `content/site.ts`: services, article records, FAQ copy.
- `app/`: page templates and inquiry route.
- `components/`: shared visual system, inquiry form, illustrative booking flow.
- `ops/content-sources.md`: evidence and claim boundaries.
- `ops/operating-playbook.md`: maintenance, review, and approval policy.
- `ops/client-record.json`: current scope, open decisions, and evidence status.
- `VERIFY.md`: retained check commands, coverage, and evidence limits.

## Authorization
Owner has approved public access and publication of the current improvements. Do not change oakheartlab.com DNS, migrate Substack, send emails, enable analytics, spend money, or activate recurring tasks without the owner's authorization. Preserve audience. Scheduled operation is NOT enabled by this file.

## Change workflow
Read the latest source and open tasks. Implement a bounded change, run the relevant checks in `VERIFY.md`, and request independent review for consequential copy or release changes. Keep a reversible source commit. Use Sites skills for source synchronization, previews, and publishing within the existing authorized audience. Internal documentation/test-command maintenance does not require a new public deployment. Never change production schema during request handling. Applied migrations are immutable.

## Quality gates
Review mobile/desktop behavior and keyboard focus. Test form success, invalid input, storage failure and idempotency before public launch. Keep an honest success state and preserve form values on error. No public GET endpoint for inquiry data. Validate input server-side and use prepared SQL. Never expose database contents, tokens, or personal information in a public artifact.

## Launch constraints
The existing concept is publicly published with owner approval. That is separate from commercial operational readiness, custom-domain migration, search indexing, or recurring services. See `ops/operating-playbook.md` for those outstanding decisions. Keep noindex until indexing is explicitly approved; public access alone does not authorize changing it. Article links point to the existing Substack custom domain. Domain migration requires a route-level redirect plan.
