import {test, expect, Locator} from "@playwright/test";
import{Page}from "@playwright/test";

export class DashboardPage{
    products: Locator;
    productsText: Locator;
    cart: Locator;
    page: Page;
    constructor(page: Page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName: string){
       
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();

    for (let i=0; i<count; i++){
        if (await this.products.nth(i).locator("b").textContent() === productName){
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    }

    async navigateToCart(){
        await this.cart.click();
        // await this.page.locator("div li").first().waitFor();
        const cartItem = this.page.locator(".cart li").filter({has: this.page.locator("h3"), hasText: /^\s*ZARA COAT 3\s*$/i});
        // await expect(cartItem).toBeVisible();
    }
}