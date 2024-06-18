import { test, expect } from "@playwright/test";

// testing to make sure that parcel is able to swap out the nodejs:fs module with a browser compatible one
// it fails sometimes (not sure why)
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:1234");
  await page.waitForSelector("a");
});
test("all links are present", async ({ page }) => {
  await page.waitForSelector("a");
  const links = await page.locator("a").all();
  expect(links).toHaveLength(12);
});
test("all links have href", async ({ page }) => {
  await page.waitForSelector("a");
  const links = page.locator("a");
  for (const link of await links.all()) {
    const hrefVal = await link.getAttribute("href");
    expect(hrefVal).toBeTruthy();
  }
});
