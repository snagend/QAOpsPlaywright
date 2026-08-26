import {test, expect, request} from "@playwright/test";

export class APIUtils{

        constructor(apiContext, loginPayload){
            this.apiContext = apiContext;
            this.loginPayload = loginPayload;
        };

    async createToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
                data: this.loginPayload,
            });
        
            await expect(loginResponse).toBeOK();
            const loginResponseJson = await loginResponse.json();
            expect(loginResponseJson.message).toBe("Login Successfully");
            const token = loginResponseJson.token;
            console.log(`Token received after login: ${token}`);
            return token;
    };

    async createOrder(createOrderPayload){
        let response = {};
        response.token = await this.createToken();

        const createOrder = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                data: createOrderPayload,
                headers: {
                    Authorization: response.token,
                    "content-type": "application/json",
                },
            });
        
            await expect(createOrder).toBeOK();
            const createOrderJson = await createOrder.json();
            expect(createOrderJson.message).toBe("Order Placed Successfully");
            const orderId = createOrderJson.orders[0];
            console.log(`Order created successfully with Order ID: ${orderId}`);
            response.orderId = orderId;
            return response;
    };
}