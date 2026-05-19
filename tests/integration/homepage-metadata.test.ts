import { describe, it, expect } from 'vitest';

/**
 * Integration tests for homepage metadata.
 *
 * Coverage gap targeted: ui_builder did NOT add E2E/rendered-head tests.
 * These tests import the actual metadata objects from the Next.js app
 * router files and verify they conform to Next.js Metadata contract,
 * ensuring a <meta name="description"> tag will be emitted.
 */

describe('Homepage metadata integration', () => {
  it('exports a metadata object from src/app/page.tsx with a description', async () => {
    // Expected outcome: page.tsx exports `metadata.description` as a non-empty string.
    const pageModule = await import('../../src/app/page');
    expect(pageModule.metadata).toBeDefined();
    expect(typeof pageModule.metadata.description).toBe('string');
    expect((pageModule.metadata.description as string).length).toBeGreaterThan(0);
  });

  it('exports a metadata object from src/app/layout.tsx with a description default', async () => {
    // Expected outcome: layout.tsx exports `metadata.description` so any page
    // without its own description still emits a meta description tag.
    const layoutModule = await import('../../src/app/layout');
    expect(layoutModule.metadata).toBeDefined();
    expect(typeof layoutModule.metadata.description).toBe('string');
    expect((layoutModule.metadata.description as string).length).toBeGreaterThan(0);
  });

  it('homepage description is concise (under 160 chars, SEO best practice)', async () => {
    // Expected outcome: description is short enough that Google will not truncate it.
    const pageModule = await import('../../src/app/page');
    const desc = pageModule.metadata.description as string;
    expect(desc.length).toBeLessThanOrEqual(160);
  });
});
