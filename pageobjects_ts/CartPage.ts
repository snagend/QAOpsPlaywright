import{test, expect, Locator} from "@playwright/test";
import {Page} from "@playwright/test"

export class CartPage{

    checkout: Locator;
    product: Locator;
    page: Page;

    constructor(page: Page){
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