import type { Page } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:1234');
// })

const createIframe = async (page: Page, id: string): Promise<void> => {
  await page.evaluate((id) => {
    const iframe = document.createElement("iframe");
    iframe.id = id;
    iframe.srcdoc = '<div id="inner">' + "Hello World" + "</div>";
    document.body.appendChild(iframe);
  }, id);
};

// TODO: Get this test to work

// test("dig into iframe", async ({ page }) => {
//   await createIframe(page, "iframe1");
//   await createIframe(page, "iframe2");
//   const iframe1 = await page.waitForSelector("#iframe1");
//
//   const inner = await iframe1.contentFrame();
//   expect(inner).toBeTruthy();
//   expect((await inner?.$("#inner"))?.textContent()).toBe("Hello World");
//
//   const inner2 = await page.waitForSelector("#iframe2 #inner");
//   expect(inner2).toBeTruthy();
//   const results = Array<HTMLElement>();
//   await page.evaluate(() => {
//     digIntoIframes(document, (doc) => {
//       const inner = doc.getElementById("inner");
//       if (inner) {
//         results.push(inner);
//       }
//     });
//   });
//   expect(results.length).toBe(2);
// });
