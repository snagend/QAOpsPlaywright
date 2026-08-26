const {test, expect} = require('@playwright/test');

test('First Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.route("**/*.css", route => route.abort());
    // await page.route("**/*.{jpg, png, jpeg}", route => route.abort());
    const userName = page.locator("input#username");
    const signIn = page.locator("input#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.on("request", request => console.log(request.url()));
    await page.on("response", response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");   
    await page.locator("[type = 'password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await page.locator("[type = 'password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents(); //wont wait till the page load and given alone without first or nth(1) will return array with 0 element [].
    console.log(allTitles);

});

// test("Page Playwright test", async ({page}) => {
//     await page.goto("https://google.com");
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google");
// });

// test("UI Controls", async ({page}) => {
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     await page.locator(".radiotextsty").last().click();
//     await page.locator("#okayBtn").click();
//     await expect(page.locator(".radiotextsty").last()).toBeChecked()
//     console.log(await page.locator(".radiotextsty").last().isChecked);
//     const dropDown = await page.locator("select.form-control");
//     await dropDown.selectOption("consult");
//     // await page.pause();
//     await page.locator("#terms").click();
//     await expect(page.locator("#terms")).toBeChecked();
//     await page.locator("#terms").uncheck();
//     expect(await page.locator("#terms").isChecked()).toBeFalsy();
//     await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
// });


// test("Child Window Handling", async ({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const documentLink = page.locator("[href*='documents-request']");
//     const [newPage] = await Promise.all([
//         context.waitForEvent("page"),
//         await documentLink.click(),
//     ])
//     const text = await newPage.locator(".red").textContent();
//     console.log(text);
//     const arrayText = text.split("@");
//     const domain = arrayText[1].split(".")[0];
//     // console.log(domain);
//     await page.locator("input#username").fill(domain);
//     console.log(await page.locator("input#username").inputValue());
//     // await page.pause();

// })

