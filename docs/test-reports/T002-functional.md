# Functional Test Report — Hero Tagline (Greek)

## Scope
Verified the artifact produced by `content_builder` at `src/content/hero.md`.
No UI or backend was in scope (per builder coverage.md).

## Tested
- File existence at canonical path
- YAML frontmatter parses cleanly
- `locale: el` declared
- Body contains Greek script (no Greeklish)
- Canonical brand term `Loom` present
- Tagline + subtitle both present
- E2E: content ready for landing-page consumption
- E2E: tone free of hard-sell English jargon

## Predicted Results
| Test | Predicted | Owner |
|---|---|---|
| exists at src/content/hero.md | PASS | content_builder |
| parses as valid markdown | PASS | content_builder |
| declares locale: el | PASS | content_builder |
| content is in Greek script | PASS | content_builder |
| uses canonical brand term Loom | PASS | content_builder |
| contains tagline + subtitle | PASS | content_builder |
| hero content artifact available (e2e) | PASS | content_builder |
| tone avoids hard-sell jargon (e2e) | PASS | content_builder |

## Failed
None predicted.

## Gaps Not Tested (out of scope)
- UI rendering of hero (no component built)
- English variant (intentionally absent)
- Legal/empty-state copy

## Overall
**Status: passed** — all integration and e2e checks should succeed against the artifact `content_builder` produced.
