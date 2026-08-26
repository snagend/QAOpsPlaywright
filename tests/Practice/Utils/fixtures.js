const base = require("@playwright/test");
import { request, expect } from "@playwright/test";
import {APIUtils} from "../Utils/APIUtils";

const loginPayload = {"userEmail":"vns77@vns.com","userPassword":"Test@12345"};
const createOrderPayload = {"orders":[{"country":"India","productOrderedId":"6960eae1c941646b7a8b3ed3"}]};

exports.vnstest = base.test.extend({
    vnsfixture: async ({browser}, use) => {
        const usrName = "vns77@vns.com";
        const passwd = "Test@12345";
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(usrName);
        await page.locator("#userPassword").fill(passwd);
        await page.locator("#login").click();
        await page.waitForLoadState("networkidle");
        await use(page);
        await context.close();
    },

    createOrder: async({}, use) => {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayload);
        const response = await apiUtils.createOrder(createOrderPayload);
        await use(response);
        await apiContext.dispose();        
}
});


