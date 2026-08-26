import {test, expect} from "@playwright/test";
import {vnstest} from "../Practice/Utils/fixtures";

vnstest("E2E fixtures testing", async({vnsfixture, createOrder}) => {
    await vnsfixture.goto("https://rahulshettyacademy.com/client");
        //View Order
    await vnsfixture.locator("button[routerlink='/dashboard/myorders']").click();
    await vnsfixture.locator("tbody").waitFor();
    await vnsfixture.locator("tr").filter({hasText: createOrder.orderId}).getByText("View").click();
    await vnsfixture.getByText(" View Orders ").click();
    
    //Delete Order
    await vnsfixture.locator("tr").filter({hasText: createOrder.orderId}).getByText("Delete").click();
    await expect(vnsfixture.getByText("Orders Deleted Successfully")).toBeVisible();
});