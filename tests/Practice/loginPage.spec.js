import {test, except} from "@playwright/test"

test("Login Validation", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.locator("[href*='documents-request']").click(),
    ]);
    const textContent = await newPage.getByText("mentor@rahulshettyacademy.com").textContent();
    const name = textContent.split("@")[1];
    const usr_name = name.split(".")[0].trim();
    const password = "Learning@830$3mK2";

    // page.on("dialog", async (dialog) => {await dialog.accept()});
    // page.on("dialog", async (dialog) => {
    //     console.log(`Dialog message: ${dialog.message()}`);
    //     await dialog.accept();
    // });


    await page.waitForLoadState("networkidle");
    await page.locator("#username").fill(usr_name);
    await page.locator("#password").fill(password);
    
    // await page.locator(".radiotextsty").nth(1).click();
    
    const dropdown = page.locator(".form-group select");
    await dropdown.selectOption("Consultant");
    await page.locator("#terms").click();
    await page.locator("#signInBtn").click();    
});