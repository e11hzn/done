import { test, expect } from '@playwright/test';

test('allows creating a todo from the form', async ({ page }) => {
  const todoName = `Playwright Todo ${Date.now()}`;

  await page.goto('/');

  await page.getByLabel(/Name:/).fill(todoName);
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(
    page.getByRole('heading', { level: 3, name: todoName }),
  ).toBeVisible();
});
