import{test, expect, Locator} from "@playwright/test";
import{Page} from "@playwright/test";

export class LoginPage{
    signInbutton: Locator;
    username: Locator;
    password: Locator;
    page: Page;
    constructor(page: Page){
        this.page = page;
        this.signInbutton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(usrName: string, passwd: string){
        await this.username.fill(usrName);
        await this.password.fill(passwd);
        await this.signInbutton.click();
        await this.page.waitForLoadState("networkidle");
    }
}