# Oakheart verification

Run `npm run verify` from the project root after installing the project's locked dependencies using the existing Sites workflow. The retained harness uses Node's built-in SQLite API; this run used Node 24.19.0. Do not assume older runtimes support it.

| Check | Evidence | Does not prove |
| --- | --- | --- |
| Inquiry API | Actual handler + SQLite: validation, malformed requests, origin, storage, sequential deduplication, rate limit, failure | Browser behavior, deployed D1, concurrent retry safety, notification receipt |
| Intake UX | Historical `ops/review-v11.md` | A new current browser pass |
| Operational readiness | Existing agency `agency_checks.py` against `ops/client-record.json` | Release permission or working integrations |

Latest bounded execution: `ops/verification-2026-09-26.json`. It names the application revision and source hashes. Public deployment remains v16; maintenance documentation and command changes do not change application behavior or imply a new deployed version.

Run the installed agency skill's `scripts/agency_checks.py check ops/client-record.json --stage release` separately. Expected exit 2 currently means incomplete evidence; inspect its JSON. Do not suppress the exit status or mark missing checks verified. The real capability is lead capture, not the illustrative booking example. The checker has no concept-release exemption; its output is an operational-readiness gap list, not an instruction to unpublish an approved concept.

For future changes, rerun affected checks and record exact source/version, time, result and untested boundaries. Do not reuse today's receipt after relevant source changes. Browser intake checks should include a clean-state complete submission, invalid input, edit/back preservation and error recovery using isolated synthetic records; live submissions require explicit scope. Notification/CRM receipt cannot be certified until a destination is authorized and connected.

No recurring checks or CI were activated. No DNS, tracking, messaging or production data changes are authorized by this document.
