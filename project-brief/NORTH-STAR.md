---
file_type: north-star
loom_brief_version: 1
project_id: loom-dummy-test
last_updated: 2026-05-17
---

# NORTH-STAR — Loom Dummy Test

## Mission

A minimal test project for the Loom MVP pipeline. Its only purpose: verify
that the Architect agent can read, validate, and accept a complete brief.

The project itself is intentionally trivial — a static landing page that
says "Hello from Loom" with one piece of empty-state copy.

## Personas

### Tester

- **Who:** A developer verifying the Loom pipeline works
- **Goal:** Run an end-to-end test from brief → built artifact
- **Pain:** Manually setting up brief files is tedious

## Verifiable Principles

- The brief must validate without violations
- The project must transition from `brief_received` to `ready`
- The Content Builder must produce a single markdown file
- The Observer must issue a GO recommendation

## Success Metrics

- Architect validation: 0 violations
- Build time: under 60 seconds
- Final status: `ready_for_human_gate`
