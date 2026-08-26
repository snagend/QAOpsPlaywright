import {test, expect, request} from "@playwright/test";
import {APIUtils} from "../Practice/Utils/APIUtils"

const loginPayload = {"userEmail":"vns77@vns.com","userPassword":"Test@12345"};
const createOrderPayload = {"orders":[{"country":"India","productOrderedId":"6960eae1c941646b7a8b3ed3"}]};
const url = "https://rahulshettyacademy.com/client";
let response;

test.beforeAll(async({}) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
});

test("E2E Hybrid Testing", async({page}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    },response.token)

    await page.goto(url);
    //View Order
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    await page.locator("tr").filter({hasText: response.orderId}).getByText("View").click();
    await page.getByText(" View Orders ").click();

    //Delete Order
    await page.locator("tr").filter({hasText: response.orderId}).getByText("Delete").click();
    await expect(page.getByText("Orders Deleted Successfully")).toBeVisible();
})