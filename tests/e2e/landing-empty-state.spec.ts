import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// E2E walkthrough: Tester persona verifies the landing empty-state artifact
// exists and is structurally valid as the final pipeline output.
// Since the project is a content-only artifact (no running UI per brief),
// this e2e validates the user journey: "a developer opens the produced file
// and sees a friendly Greek empty-state ready to be wired into a page."

const LANDING_PATH = join(process.cwd(), 'src/content/landing.md');

test.describe('Landing empty-state artifact e2e', () => {
  test('Tester journey: locate, open, and read the produced empty-state', async () => {
    // Step 1: Tester locates the file at the canonical path
    expect(existsSync(LANDING_PATH)).toBe(true);

    // Step 2: Tester opens and parses it
    const raw = readFileSync(LANDING_PATH, 'utf8');
    const parsed = matter(raw);

    // Step 3: Tester confirms frontmatter signals Greek locale for the landing page
    expect(parsed.data.locale).toBe('el');

    // Step 4: Tester confirms the body contains a friendly Greek empty-state string
    const body = parsed.content.trim();
    expect(body.length).toBeGreaterThan(0);
    expect(/[\u0370-\u03FF]/.test(body)).toBe(true);
  });
});
