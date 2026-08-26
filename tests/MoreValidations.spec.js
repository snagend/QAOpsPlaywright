const {test, expect} = require("@playwright/test")

// test("Popup Validations", async({page}) => {
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//     // await page.goto("http://google.com");
//     // await page.goBack();
//     // await page.goForward();
//     await expect(page.locator("#displayed-text")).toBeVisible();
//     await page.locator("#hide-textbox").click();
//     await expect(page.locator("#displayed-text")).toBeHidden();
//     await page.locator("#confirmbtn").click();
//     // await page.pause();
//     await page.on("dialog", dialog => dialog.accept());
//     // await page.on("dialog", dialog => dialog.dismiss());
//     await page.locator("#mousehover").hover();
//     await page.locator(".mouse-hover-content a").nth(0).click();
//     const framesPage = page.frameLocator("#courses-iframe"); //iframe, frameset to move into the frame
//     await framesPage.locator("li a[href*=lifetime-access]:visible").click(); //to select the visible element.
//     const students = await framesPage.locator(".count-text").nth(0).textContent();
//     console.log(students);
   
// })

// test.describe.configure({mode: "parallel"}); 
// test.describe.configure({mode: "serial"}); 

test("User action validation", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole("button", {name: "Hide"}).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    await page.getByPlaceholder("Enter Your Name").fill("VNS");
    await page.getByRole("button", {name: "Confirm"}).click();
    await page.on("dialog", dialog => dialog.dismiss());
    await page.getByRole("button", {name: "Confirm"}).click();
    await page.on("dialog", dialog => dialog.accept());
    await page.getByRole("button", {name: "Mouse Hover"}).hover();
    await page.locator(".mouse-hover-content a").nth(1).click();
    const framesPage = page.frameLocator("#courses-iframe");
    await expect(framesPage.getByText(" contact@rahulshettyacademy.com")).toBeVisible();
    await framesPage.locator("li a[href$='access']:visible").click();
});

test("Screenshot and Visual comparision", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByPlaceholder("Hide/Show Example").screenshot({path: "partialScreehshot.jpg"})
    await page.getByRole("button", {name: "Hide"}).click();
    await page.screenshot({path: "screenshot.png"})
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
});

test("Visual testing", async({page}) => {
    await page.goto("https://www.google.com/");
    // await expect(page.screenshot()).toMatchSnapshot("landing.png");
    await expect(page).toHaveScreenshot("landing.png");
})
