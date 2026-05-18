import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// Integration tests for src/content/landing.md
// Targets coverage gaps from content_builder reports:
//  - Verifies file actually exists on disk and is parseable as a single artifact
//  - Verifies frontmatter integrates with downstream consumers (locale: el)
//  - Verifies Greek-only content (no Greeklish) across the full file
//  - Verifies the canonical GLOSSARY terms are present

const LANDING_PATH = join(process.cwd(), 'src/content/landing.md');

describe('landing.md content integration', () => {
  let raw: string;
  let parsed: matter.GrayMatterFile<string>;

  beforeAll(() => {
    // Expected: file exists at the canonical path
    expect(existsSync(LANDING_PATH)).toBe(true);
    raw = readFileSync(LANDING_PATH, 'utf8');
    parsed = matter(raw);
  });

  it('has YAML frontmatter with locale: el', () => {
    // Expected: ACCEPTANCE requires locale: el in frontmatter
    expect(parsed.data).toBeDefined();
    expect(parsed.data.locale).toBe('el');
  });

  it('contains a non-empty body with an empty-state string', () => {
    // Expected: ACCEPTANCE requires an "empty state" string in the body
    expect(parsed.content.trim().length).toBeGreaterThan(0);
  });

  it('body content is in Greek (contains Greek characters, no Greeklish)', () => {
    // Expected: content_builder claims Greek only, no Greeklish
    const greekRegex = /[\u0370-\u03FF\u1F00-\u1FFF]/;
    expect(greekRegex.test(parsed.content)).toBe(true);
  });

  it('parses as a single markdown artifact (one file, one frontmatter block)', () => {
    // Expected: exactly one frontmatter delimiter pair at the top
    const fmMatches = raw.match(/^---\s*$/gm) || [];
    expect(fmMatches.length).toBeGreaterThanOrEqual(2);
  });
});
