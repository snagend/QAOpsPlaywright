import { test, expect, request } from "@playwright/test"

test("Security test request intercept", async ({ page }) => {
    const usrName = "vns77@vns.com";
    const passwd = "Test@12345";
    const products = await page.locator(".card-body");
    const product = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(usrName);
    await page.locator("#userPassword").fill(passwd);
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order")
});

//Blocking the requests using Abort:
    // await page.route("**/*.css", route => route.abort());
    // await page.route("**/*.{jpg, png, jpeg}", route => route.abort());
//Logging request and response URL and status code in the output:
    // await page.on("request", request => console.log(request.url()));
    // await page.on("response", response => console.log(response.url(), response.status()));

