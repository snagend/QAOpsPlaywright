import {test, expect} from "@playwright/test";

test("Playwright special locators", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("abc12345");
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000}); 
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name: "Add"}).click();
});


test("Playwright test level timeout", async ({page}) => {
    test.setTimeout(60000);
    const slowExpect = expect.configure({timeout: 9000});
    
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("abc12345");
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 6000}); 
    await page.getByRole("link", {name: "Shop"}).click({timeout: 15000});
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name: "Add"}).click();
    
});



//Instructor's code:
// test('Playwright Special locators', async ({ page }) => {
  
//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByLabel("Check me out if you Love IceCreams!").click();
//     await page.getByLabel("Employed").check();
//     await page.getByLabel("Gender").selectOption("Female");
//     await page.getByPlaceholder("Password").fill("abc123");
//     await page.getByRole("button", {name: 'Submit'}).click();
//     await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
//     await page.getByRole("link",{name : "Shop"}).click();
//     await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
//     //locator(css)
 
// });

