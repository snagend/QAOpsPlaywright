import{test, expect, request} from "@playwright/test";

export class APIUtils_Practice{
    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad,
            })

        if(!loginResponse.ok()){
            throw new Error(`Login Failed with Error Code: ${loginResponse.status()} - ${loginResponse.statusText()}`);
        }
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad){
        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    "Authorization": response.token,
                    "content-type": "application/json",
                }
            });

        if(!orderResponse.ok()){
            throw new Error(`Order was not created ${orderResponse.status()} - ${orderResponse.statusText()}`);
        }

        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        console.log(orderId);
        return response;

    }
}