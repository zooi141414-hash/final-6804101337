import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {
  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
  });

  await test.step('ตรวจสอบ Last Name is required', async () => {
    await page.fill('#first-name', 'John');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
  });

  await test.step('ตรวจสอบ Postal Code is required', async () => {
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    await page.fill('#postal-code', '50000');
    await page.click('#continue');
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});