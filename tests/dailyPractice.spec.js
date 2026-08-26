const {test, expect} = require("@playwright/test");

test("User login validation", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshetty");
    await page.locator("input[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await page.locator("#username").fill("");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("input[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("h4 > a").first().textContent());
    console.log(await page.locator("h4 > a").nth(1).textContent());
    console.log(await page.locator("h4 > a").allTextContents());
})