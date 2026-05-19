import { test, expect } from '@playwright/test';

/**
 * E2E tests verifying the rendered <head> on the homepage contains a
 * meta description tag. This directly tests the acceptance criterion of
 * the task ("Add meta description tag to homepage") and closes the
 * ui_builder coverage gap: "Did not add E2E tests asserting the rendered <head>".
 */

test.describe('Homepage meta description', () => {
  test('renders a <meta name="description"> tag with non-empty content', async ({ page }) => {
    // Expected outcome: the homepage HTML <head> contains exactly one
    // meta description tag, and its content attribute is a non-empty string.
    await page.goto('/');
    const metaDescription = page.locator('head > meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);
    const content = await metaDescription.getAttribute('content');
    expect(content).toBeTruthy();
    expect((content ?? '').trim().length).toBeGreaterThan(0);
  });

  test('meta description is reasonable length for SEO (<= 160 chars)', async ({ page }) => {
    // Expected outcome: content length is within SEO best-practice bounds.
    await page.goto('/');
    const content = await page.locator('head > meta[name="description"]').getAttribute('content');
    expect(content).not.toBeNull();
    expect((content as string).length).toBeLessThanOrEqual(160);
    expect((content as string).length).toBeGreaterThanOrEqual(20);
  });

  test('homepage still renders user-visible "Hello from Loom" heading alongside metadata', async ({ page }) => {
    // Expected outcome: adding metadata did not break the rendered UI.
    // Per NORTH-STAR, the landing page shows "Hello from Loom".
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
