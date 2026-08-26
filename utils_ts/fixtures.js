const base = require("@playwright/test");
import { request, expect } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils"

const loginPayLoad = { userEmail: "vns77@vns.com", userPassword: "Test@12345" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

exports.customtest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {
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

    createOrder: async ({ }, use) => {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayLoad);
        const response = await apiUtils.createorder(orderPayload);
        await use(response);
        await apiContext.dispose();
    },

    testDataForOrder: {
        productName: "ADIDAS ORIGINAL",
    }
});

exports.assignmenttest = base.test.extend({
    loginAndGoToEvents: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const usrName = "vns777@vns.com";
        const passwd = "Test@12345";
        const baseUrl = "https://eventhub.rahulshettyacademy.com"

        await page.goto(baseUrl);
        await page.getByPlaceholder("you@email.com").fill(usrName);
        await page.getByPlaceholder("••••••").fill(passwd);
        await page.getByRole("button", { name: "Sign In" }).click();
        await expect(page.getByText("Discover & Book")).toBeVisible();
        await page.getByTestId("nav-events").click();
        await page.getByText("Upcoming Events").waitFor();
        await use(page);
    }
});

exports.assignment3 = base.test.extend({
    authenticatedPage: async({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
        await page.getByPlaceholder("you@email.com").fill("vns@gmail.com");
        await page.getByPlaceholder("••••••").fill("Test@12345");
        await page.locator("#login-btn").click();
        await page.getByText("Featured Events").waitFor();
        // await page.waitForTimeout(2000);
        const token = await page.evaluate(() => localStorage.getItem("eventhub_token"));
        page.token = token;
        await page.locator("#nav-events").click();
        await page.waitForLoadState("networkidle");
        await use(page);
    },

    createEvent: async({authenticatedPage}, use) => {
        const token = authenticatedPage.token
        const apiResponse = await authenticatedPage.request.post("https://api.eventhub.rahulshettyacademy.com/api/events",
            {
                headers:{
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data:{
                    "title":"test12345",
                    "description":"",
                    "category":"Conference",
                    "venue":"test",
                    "city":"test",
                    "eventDate":"2026-08-20T14:42:00.000Z",
                    "price":123,
                    "totalSeats":3
                }
            })
        const apiResponseJson = await apiResponse.json();
        console.log("Full API Response Payload:", apiResponseJson);
        const eventName = apiResponseJson.data.title;
        console.log(eventName)
        await use(eventName);
    }
});