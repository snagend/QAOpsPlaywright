import {test, expect} from "@playwright/test";

const userName = "vns77@vns.com";
const password = "Test@12345";
const url = "https://rahulshettyacademy.com/client";

test("End to End UI testing", async({page}) => {

    //Login
    await page.goto(url);
    await page.getByPlaceholder("email@example.com").fill(userName);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.locator("#login").click();

    //Wait for dashboard and add product
    await page.locator(".card-body").first().waitFor();
    await page.locator(".card-body").filter({hasText: "iphone 13 pro"})
        .getByRole("button", {name: " Add To Cart"}).click();
    
    //Cart navigation and checkout
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.getByText("Checkout").click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.locator(".ta-results").filter({hasText: " India"}).click();
    await page.getByText("Place Order ").click();

    //Order Confirmation
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const rawOrderId = await page.locator("td[class='em-spacer-1'] label").nth(1).textContent();
    const orderId = rawOrderId.replace(/\|/g, "").trim();
    console.log(orderId);

    //View Order
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tr").filter({hasText: orderId}).getByText("View").click();
    await page.getByText(" View Orders ").click();

    //Delete Order
    await page.locator("tr").filter({hasText: orderId}).getByText("Delete").click();
    await expect(page.getByText("Orders Deleted Successfully")).toBeVisible();


})