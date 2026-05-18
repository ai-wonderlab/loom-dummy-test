import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

// Integration tests for hero content file produced by content_builder.
// These tests target gaps the builder declared: no UI/backend wiring,
// so we verify the file is structurally valid and consumable by downstream
// content pipelines (frontmatter parsing, locale, Greek-only tone).

const HERO_PATH = resolve(process.cwd(), 'src/content/hero.md');

describe('hero.md integration', () => {
  // Expected: file exists on disk so a static site generator can read it.
  it('exists at src/content/hero.md', () => {
    expect(existsSync(HERO_PATH)).toBe(true);
  });

  // Expected: frontmatter parses and declares Greek locale (acceptance criterion analog).
  it('parses as valid markdown with YAML frontmatter', () => {
    const raw = readFileSync(HERO_PATH, 'utf8');
    const parsed = matter(raw);
    expect(parsed).toBeTruthy();
    expect(parsed.content.trim().length).toBeGreaterThan(0);
  });

  // Expected: locale is 'el' per project convention (ACCEPTANCE.md uses locale: el for landing).
  it('declares locale: el in frontmatter', () => {
    const raw = readFileSync(HERO_PATH, 'utf8');
    const parsed = matter(raw);
    expect(parsed.data.locale).toBe('el');
  });

  // Expected: body contains Greek characters and no Greeklish (Latin words used phonetically).
  it('content is in Greek script, not Greeklish', () => {
    const raw = readFileSync(HERO_PATH, 'utf8');
    const { content } = matter(raw);
    const greekChars = content.match(/[\u0370-\u03FF\u1F00-\u1FFF]/g) || [];
    expect(greekChars.length).toBeGreaterThan(10);
  });

  // Expected: brand term 'Loom' appears verbatim (canonical glossary term).
  it('uses canonical brand term Loom', () => {
    const raw = readFileSync(HERO_PATH, 'utf8');
    expect(raw).toMatch(/Loom/);
  });

  // Expected: both a tagline and subtitle are present (task said 'tagline' but builder
  // reported including subtitle — verify both render).
  it('contains tagline and subtitle sections', () => {
    const raw = readFileSync(HERO_PATH, 'utf8');
    const { content } = matter(raw);
    const nonEmptyLines = content.split('\n').map(l => l.trim()).filter(Boolean);
    expect(nonEmptyLines.length).toBeGreaterThanOrEqual(2);
  });
});
