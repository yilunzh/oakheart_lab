# AI-maintained website: operating playbook

Status: publicly published concept with inquiry storage; not certified for unattended operation. Public access/publication is already authorized. No autonomous publishing, recurring schedule, analytics collection, CRM integration, or outbound email is enabled. Current deployment provenance and outstanding evidence are indexed in `ops/client-record.json`; commands and coverage are in `VERIFY.md`.

## Proposed recurring workflow, pending activation
1. Read current source, latest release and open decisions.
2. Review connected analytics (when configured), new inquiries through authorized Sites database tools, and broken links. Unavailable data is unavailable, not zero.
3. Propose the smallest useful update. Distinguish evidence, hypothesis, and forecast. Use qualified inquiries, proposals, wins and contribution as outcomes; subscriber counts alone are not business results.
4. Draft content or code in the source project. Keep evidence references with claims.
5. Run affected checks, review copy, and obtain an independent review for material changes.
6. Present a preview and concise change summary where approval is required. Pricing, offers, guarantees, brand claims, release, access changes and spending must stay within actual authority. Carry existing authorization forward; do not treat previously approved public access as pending again.
7. Publish only within authorized audience, verify deployment success, record release, and retain rollback point.

## Inquiry operations
- POST /api/inquiries persists validated records to D1. Public read/list is intentionally absent.
- Owner reads inquiries with authorized Sites management tools. No notification email or automatic prospect response is configured.
- Before relying on unattended lead capture, choose a notification/CRM destination, authorize the connection, and verify delivery with a synthetic submission. Until then the owner must explicitly arrange manual review; no response cadence has been verified. Do not present stored inquiries as emailed notifications.
- Source and campaign tags are captured with inquiries; site-visit analytics are not yet enabled.
- Inquiry statuses can later be maintained as new, qualified, proposal, won, lost, spam. No unattended status updates are active.
- Never send private inquiry data into generated public content or third-party services without authorized purpose.

## Content changes
Keep publication articles on Substack for now. New agency articles can use the app route templates. Drafts must carry source links and be marked proposed until approved. Concepts must be labeled; case studies need permission and evidence. Avoid converting evaluation scores into business-impact claims.

## Commercial operation and domain-launch checklist
- [x] Owner approved public concept publication and existing offer direction. New material claims/privacy changes still need applicable review and authority.
- [ ] Confirm pricing/scoping, delivery capacity, ownership and ongoing support terms.
- [ ] Decide hosting/domain mapping; do not change email DNS records.
- [ ] Inventory current Substack URLs, plan redirects, test incoming paths before domain change.
- [ ] Approve contact notification/CRM integration and verify receipt.
- [ ] Set analytics/consent scope, verify events and establish baseline; do not enable tracking silently.
- [ ] Strengthen public anti-abuse controls (verified challenge and edge rate limiting) before broad exposure.
- [ ] Test mobile, keyboard, error and success paths on production hosting.
- [ ] Approve indexing; replace preview noindex and set verified canonical domain/sitemap.
- [ ] Select schedule/cadence and approval boundaries; activate scheduler only then.

## Recovery
Redeploy a known-good saved Sites version for code rollback; do not rewrite source history. Database migrations are forward-only and may already be applied even if deployment fails. Restoring code does not restore deleted data. Export/backup and privacy retention policies need owner confirmation before public operation.

## Commands
Local checks: `npm run verify` (isolated synthetic SQLite only; not a hosted/browser certification).
Readiness completeness: run the installed agency skill's `scripts/agency_checks.py check ops/client-record.json --stage release`. It should report the remaining gaps, not a fabricated production pass. The record classifies the real lead-capture capability; the booking illustration is not operational booking.
Build: node /root/.codex/plugins/cache/openai-curated-remote/sites/0.1.71/scripts/build-site.mjs
Schema changes: node node_modules/drizzle-kit/bin.cjs generate (inspect SQL before publishing).
Preview: Sites managed preview per installed Sites instructions. Do not directly start or kill unrelated servers.
