const {test, expect} = require ("@playwright/test");

class OrderConfirmation{
    constructor(page){
        this.page = page;
        this.confirmMsg = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.ordersPage = page.locator("tbody");
        this.ordersRow = page.locator("tbody tr");

    };

    async confirmAndViewOrder(){
        await expect(this.confirmMsg).toHaveText(" Thankyou for the order. ");
        const orderId = await this.orderId.textContent();
        console.log(orderId);

        await this.myOrders.click();
        await this.ordersPage.waitFor();
        const rows = await this.ordersRow;
 
 
        for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
      }
   }
        const orderIdDetails = await this.page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    };
};

module.exports = {OrderConfirmation};