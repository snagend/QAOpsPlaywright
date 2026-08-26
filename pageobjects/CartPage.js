const {test, expect} =require ("@playwright/test");

class CartPage{

    constructor(page){
        this.page = page;
        this.checkout = page.locator("text=Checkout");
        this.product = page.locator("h3:has-text('ZARA COAT 3')");
    }

    async viewCartAndCheckout(){
        const bool = await this.product.isVisible();
        // expect(bool).toBeTruthy();
        await this.checkout.click();
    }
}

module.exports = {CartPage};