import {test, expect, request} from "@playwright/test";

const loginPayload = {"userEmail":"vns77@vns.com","userPassword":"Test@12345"};
const createOrderPayload = {"orders":[{"country":"India","productOrderedId":"6960eae1c941646b7a8b3ed3"}]};

test("E2E API Testing", async({request}) => {
    const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload,
    });

    await expect(loginResponse).toBeOK();
    const loginResponseJson = await loginResponse.json();
    expect(loginResponseJson.message).toBe("Login Successfully");
    const token = loginResponseJson.token;
    console.log(`Token received after login: ${token}`);

    const createOrder = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: createOrderPayload,
        headers: {
            Authorization: token,
            "content-type": "application/json",
        },
    });

    await expect(createOrder).toBeOK();
    const createOrderJson = await createOrder.json();
    expect(createOrderJson.message).toBe("Order Placed Successfully");
    const orderId = createOrderJson.orders[0];
    console.log(`Order created successfully with Order ID: ${orderId}`);

    const viewOrder = await request.get(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${orderId}`, {
        headers:{
            Authorization: token,
            "content-type": "application/json"
        }
    })
    await expect(viewOrder).toBeOK();
    const viewOrderJson = await viewOrder.json();
    expect(viewOrderJson.message).toBe("Orders fetched for customer Successfully");
    const orderedBy = viewOrderJson.data.orderById;
    console.log(`Order Created By: ${orderedBy}`);

    const deleteOrder = await request.delete(`https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderId}`, {
        headers:{
            Authorization: token,
            "content-type": "application/json"
        }
    });

    await expect(deleteOrder).toBeOK();
    const deleteOrderJson = await deleteOrder.json();
    const message = deleteOrderJson.message;
    console.log(`Order deletion confirmation message: ${message}`);
});