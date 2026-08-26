const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager");
const { expect } = require("@playwright/test");
const { chromium } = require("@playwright/test");

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (usrName, passwd) {
    // Write code here that turns the phrase above into concrete actions

    const products = await this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(usrName, passwd);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function () {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getcartPage();
    await cartPage.viewCartAndCheckout();
});

When('Enter valid details and place the order', async function (usrName) {
    // Write code here that turns the phrase above into concrete actions
    const placeOrder = this.poManager.getplaceOrder();
    await placeOrder.placeOrder(usrName);
});

Then('Verify order is present in the OrderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderConfirmation = this.poManager.getorderConfirmation();
    await orderConfirmation.confirmAndViewOrder();
});


Given('a login to Ecommerce2 application with {string} and {string}', async function (userName, password) {
    // Write code here that turns the phrase above into concrete actions
    const signIn = this.page.locator("input#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(userName);
    await this.page.locator("[type = 'password']").fill(password);
    await signIn.click();
});

Then('Verify error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});