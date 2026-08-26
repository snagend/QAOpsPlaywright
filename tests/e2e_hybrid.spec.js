import {test, expect, request} from "@playwright/test";
import {APIUtils_Practice} from "../utils/APIUtils_Practice";

const loginPayLoad = {"userEmail":"vns77@vns.com","userPassword":"Test@12345"};
const orderPayLoad = {"orders":[{"country":"India","productOrderedId":"6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtil = new APIUtils_Practice(apiContext, loginPayLoad);

    try{
        response = await apiUtil.createOrder(orderPayLoad);
        console.log(`✅ Order Created successfully with order ID ${response.orderId}`);
    }catch(error){
        console.error("❌ Order Creation Failed");
        throw error;
    }
});

test("Hybrid end to end test", async({page}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    await page.locator("tr").filter({hasText: response.orderId}).getByRole("button", {name: "View"}).click();

})