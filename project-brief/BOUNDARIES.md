---
file_type: boundaries
loom_brief_version: 1
project_id: loom-dummy-test
last_updated: 2026-05-17
---

# BOUNDARIES — Loom Dummy Test

## Universal

These rules apply unconditionally:

- No secrets in repo (use Vercel Vault for production)
- All inputs validated via Zod (where applicable)
- Security headers on all public endpoints
- RLS enabled on all DB tables

## Opted-in

These boundaries are explicitly opted in for this project:

- **Performance budgets:** none (test project, not deployed)
- **GDPR compliance:** not applicable (no real users)
- **Cookie consent:** not required (no tracking)
- **A11y:** WCAG AA target for any UI surfaces
