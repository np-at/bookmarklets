import {describe} from "node:test";
import {expect, test} from "@playwright/test";


describe("test index.html",  () => {
    // testing to make sure that parcel is able to swap out the nodejs:fs module with a browser compatible one
    // it fails sometimes (not sure why)
    test('all links are present', async ({page}) => {
        await page.goto("http://localhost:1234");
        await page.waitForSelector("a");
        const links = await page.$$("a");
        expect(links.length).toBe(10);
    })
    test('all links have href', async ({page}) => {
        await page.goto("http://localhost:1234");
        await page.waitForSelector("a");
        const links = await page.$$("a");
        for (const link of links) {
            expect(await link.getAttribute("href")).toBeTruthy();
        }
    });

})
