import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

// E2E walkthrough: a visitor lands on the page and sees the Greek hero.
// Since the content_builder explicitly did NOT touch UI components, there is
// no rendered page yet. We assert the content artifact is ready to be wired
// into the landing page, simulating the 'first impression' user journey.

test.describe('Visitor lands on homepage', () => {
  // Expected: content artifact exists so the landing page can import it.
  // Will FAIL if the UI is also expected to render — but UI work is out of scope
  // per the builder's coverage gap declaration.
  test('hero content artifact is available for the landing page', async () => {
    const heroPath = resolve(process.cwd(), 'src/content/hero.md');
    expect(existsSync(heroPath)).toBe(true);

    const raw = readFileSync(heroPath, 'utf8');
    const { content, data } = matter(raw);

    // A Greek-speaking Tester persona must immediately see Greek copy.
    expect(data.locale).toBe('el');
    expect(content).toMatch(/[\u0370-\u03FF]/);
  });

  // Expected: tone is warm/educational — no aggressive sales words.
  // Heuristic check; non-fatal but flagged if marketing jargon leaks in.
  test('tone avoids hard-sell English jargon', async () => {
    const heroPath = resolve(process.cwd(), 'src/content/hero.md');
    const raw = readFileSync(heroPath, 'utf8').toLowerCase();
    const forbidden = ['buy now', 'limited offer', 'click here', 'sign up free!!!'];
    for (const phrase of forbidden) {
      expect(raw).not.toContain(phrase);
    }
  });
});
