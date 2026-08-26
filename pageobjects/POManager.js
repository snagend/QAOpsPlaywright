const {LoginPage} = require ("./LoginPage");
const{DashboardPage} = require ("./DashboardPage");
const{CartPage} = require ("../pageobjects/CartPage");
const{PlaceOrder} = require ("../pageobjects/PlaceOrder");
const{OrderConfirmation} = require ("../pageobjects/OrderConfirmation");

class POManager{
    constructor(page){
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

module.exports = {POManager};