import{test, expect, request} from "@playwright/test";
import {customtest} from "../utils/fixtures.js";

customtest("fixtures Demo", async({authenticatedPage, createOrder, testDataForOrder}) => {
    //login to application, create order and verify if the order is created from history page
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
});