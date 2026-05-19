# Coverage — Homepage (`src/app/page.tsx`)

## Purpose

Static landing page for the Loom dummy test project. Renders the
"Hello from Loom" heading and a single empty-state message, and exports
Next.js `metadata` (title + description) for SEO.

## What is tested

- Main `<h1>` renders with the correct accessible name.
- Empty-state copy is present in the DOM.
- `metadata.title` is exported and defined.
- `metadata.description` is exported, is a non-trivial string (>20 chars).
- No axe-core accessibility violations.

## What is NOT tested

- Visual regression / Tailwind class output (no snapshot used).
- The `<head>` rendering itself — Next.js owns the injection of
  `metadata` into the document head; we trust the framework contract
  and assert only on the exported object.
- `RootLayout` is not unit-tested separately; its `metadata` mirrors
  the page metadata and would be covered by an integration/e2e test.

## Accessibility notes

- Semantic `<main>` landmark with `aria-labelledby` pointing at the
  `<h1>` id.
- Empty-state paragraph uses `role="status"` with `aria-live="polite"`
  so assistive tech can announce it.
- Mobile-first responsive type scale (`text-4xl sm:text-5xl lg:text-6xl`).
- No interactive elements → no focus states required on this page.
- No animation → `prefers-reduced-motion` is a no-op here.
