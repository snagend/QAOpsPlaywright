const { test, expect } = require("@playwright/test");

test("Client App login", async ({ page }) => {
    const usrName = "vns77@vns.com";
    const passwd = "Test@12345";
    const products = await page.locator(".card-body");
    const product = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(usrName);
    await page.getByPlaceholder("enter your passsword").fill(passwd);
    await page.getByRole('button', {name: "Login"}).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body").first().waitFor();
    
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
        .getByRole("button", {name: "Add to Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    // await page.getByRole(/^Cart$/i).click();

    // const cartItem = page.locator(".cart li").filter({ has: page.locator("h3"), hasText: /^\s*ZARA COAT 3\s*$/i });
    // await expect(cartItem).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click();

    //My Code to select an item from a dynamic drop down:
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })
    // await page.getByRole("button", {name: /^\s*India\s*$/i}).waitFor({state: 'visible'});
    // await page.getByRole("button", {name: /^\s*India\s*$/i}).click();

    // await page.getByRole("button",{name :"India"}).nth(1).click();

    // await page.locator(".ta-results button")
    // .filter({ hasText: /^\s*India\s*$/i })
    // .click();

    await page.locator(".ta-results")
    .getByRole("button", { name: "India" }).nth(1)
    .click();


    //My code
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(usrName);
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(/^\s*Thankyou for the order.\s*$/)).toBeVisible();
    
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const cleanOrderId = orderId.replace(/\|/g, "").trim();
    console.log(cleanOrderId);

    // View Orders: (AI approch solid)
    await page.locator("li [routerlink*='myorders']").click();
    await page.locator("tbody tr")
        .filter({ hasText: cleanOrderId })
        .locator(".btn-primary")
        .click();
    await expect(page.locator(".col-text")).toHaveText(cleanOrderId);


});



// test('@Webst Client App login', async ({ page }) => {
//    //js file- Login js, DashboardPage
//    const email = "anshika@gmail.com";
//    const productName = 'ZARA COAT 3';
//    const products = page.locator(".card-body");
//    await page.goto("https://rahulshettyacademy.com/client");
//    await page.getByPlaceholder("email@example.com").fill(email);
//    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
//    await page.getByRole('button',{name:"Login"}).click();
//    await page.waitForLoadState('networkidle');
//    await page.locator(".card-body b").first().waitFor();
   
//    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
//    .getByRole("button",{name:"Add to Cart"}).click();
 
//    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
//    //await page.pause();
//    await page.locator("div li").first().waitFor();
//    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
//    await page.getByRole("button",{name :"Checkout"}).click();
 
//    await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
//    await page.getByRole("button",{name :"India"}).nth(1).click();
//    await page.getByText("PLACE ORDER").click();
 
//    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
// })



//Codegen script:
// test('Codegen test', async ({ page }) => {
//   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
//   await page.getByRole('textbox', { name: 'email@example.com' }).click();
//   await page.getByRole('textbox', { name: 'email@example.com' }).fill('vns77@vns.com');
//   await page.getByRole('textbox', { name: 'email@example.com' }).press('Tab');
//   await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Test@12345');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByRole('button', { name: ' Add To Cart' }).nth(1).click();
//   await page.getByRole('button', { name: '   Cart' }).click();
//   await page.getByRole('button', { name: 'Checkout❯' }).click();
//   await page.getByRole('textbox', { name: 'Select Country' }).click();
//   await page.getByRole('textbox', { name: 'Select Country' }).fill('india');
//   await page.getByRole('button', { name: ' India' }).click();
//   await page.locator('.actions').click();
//   await page.locator('body').press('Tab');
//   await page.locator('label').filter({ hasText: 'AutomationAutomation Practice' }).press('Tab');
//   await page.getByRole('link', { name: 'Automation Automation Practice' }).press('Tab');
//   await page.getByRole('link', { name: 'Get Shortlisted by Recruiters' }).press('Tab');
//   await page.getByRole('button', { name: ' HOME' }).press('Tab');
//   await page.getByRole('button', { name: '   ORDERS' }).press('Tab');
//   await page.getByRole('button', { name: '   Cart' }).press('Tab');
//   await page.getByRole('button', { name: 'Sign Out' }).press('Tab');
//   await page.getByRole('textbox').first().press('Tab');
//   await page.getByRole('combobox').first().press('Tab');
//   await page.getByRole('combobox').nth(1).press('Tab');
//   await page.getByRole('textbox').nth(1).press('Tab');
//   await page.getByRole('textbox').nth(2).press('Tab');
//   await page.locator('input[name="coupon"]').press('Tab');
//   await page.getByRole('button', { name: 'Apply Coupon' }).press('Tab');
//   await page.getByRole('textbox').nth(4).press('Tab');
//   await page.getByRole('textbox', { name: 'Select Country' }).press('Tab');
//   await page.getByText('AutomationAutomation PracticeGet Shortlisted by Recruiters - Take QA Skill').click();
//   await page.getByText('Place Order').click();
//   await page.getByText('| 6a5cbce785b8849b49f7e2a3 |').click();
//   await page.getByRole('heading', { name: 'Thankyou for the order.' }).click();
//   await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();
// });