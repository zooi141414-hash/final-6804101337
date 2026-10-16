import { test, expect } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    // driverOpenInventory: จำลองสถานะ Login ด้วย Cookie
    await context.addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/',
      },
    ]);
    await page.goto('/inventory.html');
  });

  await test.step('ตรวจสอบ Inventory จริง', async () => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  await context.close();
});