import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  const mainNav = page.getByLabel('Main navigation')

  await page.goto('http://localhost:3000/')
  await mainNav.getByRole('link', { name: 'Work', exact: true }).click()
  await page.getByRole('link', { name: 'Automotive' }).click()
  await page.getByRole('link', { name: 'Jeep Share in the Adventure' }).click()
  await page.getByRole('button', { name: 'Play/Pause' }).click()
  await mainNav.getByRole('link', { name: 'About' }).click()
  await mainNav.getByRole('link', { name: 'Studio' }).click()
  await mainNav.getByRole('link', { name: 'Moments' }).click()
  await mainNav.getByRole('link', { name: 'News' }).click()
  await page.getByText('Ford Trucks have long been a').click()
  await mainNav.getByRole('link', { name: 'Contact' }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByText('Full name is required')).toBeVisible()
  await expect(page.getByText('Email address is required')).toBeVisible()
  await expect(page.getByText('Valid Phone number is Required')).toBeVisible()
  await expect(page.getByText('Message is Required')).toBeVisible()
  await expect(page.getByText('Please select at least one')).toBeVisible()
})
