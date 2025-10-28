import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: 'Work', exact: true }).click()
  await page.getByRole('link', { name: 'Automotive' }).click()
  await page.getByRole('link', { name: 'Jeep Share in the Adventure' }).click()
  await page.getByRole('button', { name: 'Play/Pause' }).click()
  await page.getByRole('link', { name: 'About' }).click()
  await page.getByRole('link', { name: 'Studio' }).click()
  await page.getByRole('link', { name: 'Moments' }).click()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('navigation').getByRole('link', { name: 'News' }).click()
  await page.getByText('Ford Trucks have long been a').click()
  await page.getByRole('link', { name: 'Contact' }).click()
  await page
    .locator('form')
    .filter({ hasText: 'Interests:Full-service' })
    .getByRole('button')
    .click()
  await expect(page.getByText('Full name is required')).toBeVisible()
  await expect(page.getByText('Email address is required')).toBeVisible()
  await expect(page.getByText('Valid Phone number is Required')).toBeVisible()
  await expect(page.getByText('Message is Required')).toBeVisible()
  await expect(
    page.getByText('Please select at least one').nth(2)
  ).toBeVisible()
})
