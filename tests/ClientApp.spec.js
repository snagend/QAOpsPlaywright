const {test, expect} = require("@playwright/test");

test("Client App login", async ({page}) => {
    const usrName = "vns77@vns.com";
    const passwd = "Test@12345";
    const products = await page.locator(".card-body");
    const product = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(usrName);
    await page.locator("#userPassword").fill(passwd);
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body").first().waitFor();
    const titles = await page.locator(".card-body").allTextContents();
    console.log(titles);
    const count = await products.count();

    // for (let i=0; i<count; i++){
    //     if (products.nth(i).locator("b").textContent() === "ZARA COAT 3"){
    //         products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }

    await page.locator(".card-body").filter({has: page.locator("b"), hasText: "ZARA COAT 3"})
    .locator("text= Add To Cart").click();

    // Alternate method without for loop - Find the exact card containing the product title, then click its Add To Cart button
    // await page.locator(".card-body")
    // .filter({ has: page.locator("b"), hasText: "ZARA COAT 3" })
    // .locator("text=Add To Cart")
    // .click();
   
    await page.locator("[routerlink*='cart']").click();
    const cartItem = page.locator(".cart li").filter({has: page.locator("h3"), hasText: /^\s*ZARA COAT 3\s*$/i});
    // await expect(cartItem).toBeVisible();
    await page.locator("text=Checkout").click();
    
    //Instructor Code to select an item from a dynamic drop down:
    // await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })
    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();
    // const optionsCount = await dropdown.locator("button").count();
    // for(let i=0; i<optionsCount; i++){
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //     if(text === " India"){
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }


    //My Code to select an item from a dynamic drop down:
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })
    await page.locator(".ta-results button")
    .filter({ hasText: /^\s*India\s*$/i })
    .click();

    //My code
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(usrName);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const cleanOrderId = orderId.replace(/\|/g, "").trim();
    console.log(cleanOrderId);

    // View Orders: (AI approch solid)
    await page.locator("li [routerlink*='myorders']").click();
    await page.locator("tbody tr")
    .filter({ hasText: cleanOrderId})
    .locator(".btn-primary")
    .click();
    await expect(page.locator(".col-text")).toHaveText(cleanOrderId);

    //View Orders: (My code)
    // await page.locator("li [routerlink*='myorders']").click();
    // await page.locator("tbody tr")
    // .filter({has: page.locator("th"), hasText: cleanOrderId})
    // .locator(".btn-primary")
    // .click();

    
});



//Instructor course full code:
// test('@Webst Client App login', async ({ page }) => {
//    //js file- Login js, DashboardPage
//    const email = "anshika@gmail.com";
//    const productName = 'ZARA COAT 3';
//    const products = page.locator(".card-body");
//    await page.goto("https://rahulshettyacademy.com/client");
//    await page.locator("#userEmail").fill(email);
//    await page.locator("#userPassword").fill("Iamking@000");
//    await page.locator("[value='Login']").click();
//    await page.waitForLoadState('networkidle');
//    await page.locator(".card-body b").first().waitFor();
//    const titles = await page.locator(".card-body b").allTextContents();
//    console.log(titles); 
//    const count = await products.count();
//    for (let i = 0; i < count; ++i) {
//       if (await products.nth(i).locator("b").textContent() === productName) {
//          //add to cart
//          await products.nth(i).locator("text= Add To Cart").click();
//          break;
//       }
//    }
 
//    await page.locator("[routerlink*='cart']").click();
//    //await page.pause();
 
//    await page.locator("div li").first().waitFor();
//    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//    expect(bool).toBeTruthy();
//    await page.locator("text=Checkout").click();
 
//   await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
//    const dropdown = page.locator(".ta-results");
//    await dropdown.waitFor();
//    const optionsCount = await dropdown.locator("button").count();
//    for (let i = 0; i < optionsCount; ++i) {
//       const text = await dropdown.locator("button").nth(i).textContent();
//       if (text === " India") {
//          await dropdown.locator("button").nth(i).click();
//          break;
//       }
//    }
 
//    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
//    await page.locator(".action__submit").click();
//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//    console.log(orderId);

// await page.locator("button[routerlink*='myorders']").click();
//    await page.locator("tbody").waitFor();
//    const rows = await page.locator("tbody tr");
 
 
//    for (let i = 0; i < await rows.count(); ++i) {
//       const rowOrderId = await rows.nth(i).locator("th").textContent();
//       if (orderId.includes(rowOrderId)) {
//          await rows.nth(i).locator("button").first().click();
//          break;
//       }
//    }
//    const orderIdDetails = await page.locator(".col-text").textContent();
//    expect(orderId.includes(orderIdDetails)).toBeTruthy();
// });