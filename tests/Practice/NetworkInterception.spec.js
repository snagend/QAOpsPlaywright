import {test, expect, request} from "@playwright/test";
import {APIUtils} from "../Practice/Utils/APIUtils"

const loginPayload = {"userEmail":"vns77@vns.com","userPassword":"Test@12345"};
const createOrderPayload = {"orders":[{"country":"India","productOrderedId":"6960eae1c941646b7a8b3ed3"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async({}) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
});

test('Place the order', async ({ page }) => {

   await page.addInitScript(value => {
      window.localStorage.setItem("token", value)
   }, response.token);

   await page.goto("https://rahulshettyacademy.com/client");

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            route.fulfill({
                response,
                json: fakePayLoadOrders,
            })
        }
   )

        await page.locator("button[routerlink*='myorders']").click();
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
        console.log(await page.locator(".mt-4").textContent());
})