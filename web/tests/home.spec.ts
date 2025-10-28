import { test, expect } from '@playwright/test'

test('has h1 text', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await expect(
    page.getByRole('heading', { name: 'JMILLS ENTERTAINMENT' })
  ).toBeVisible()
})
