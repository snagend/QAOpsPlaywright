import {LoginPage} from "./LoginPage";
import{DashboardPage} from "./DashboardPage";
import{CartPage} from "../pageobjects/CartPage";
import{PlaceOrder} from "../pageobjects/PlaceOrder";
import{OrderConfirmation} from "../pageobjects/OrderConfirmation";
import{Page} from "@playwright/test";

export class POManager{

    loginPage: LoginPage; //provide the class name here
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    placeOrder: PlaceOrder;
    orderConfirmation: OrderConfirmation;
    page: Page;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.placeOrder = new PlaceOrder(page);
        this.orderConfirmation = new OrderConfirmation(page);

    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getcartPage(){
        return this.cartPage;
    }

    getplaceOrder(){
        return this.placeOrder;
    }

    getorderConfirmation(){
        return this.orderConfirmation;
    }
}