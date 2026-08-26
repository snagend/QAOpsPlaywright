import{test, expect, request} from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = "https://eventhub.rahulshettyacademy.com/api";

const y_mail = "vns@yahoo.com"
const g_mail = "vns@gmail.com"
let token;

test("Assignment No.2", async({browser, request}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginResponse = await request.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", 
    {
      data: {
        email: y_mail,
        password: "Test@12345",
      }
    })
    await expect(loginResponse).toBeOK();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    const response = await page.request.get("https://api.eventhub.rahulshettyacademy.com/api/events",
      {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      await expect(response).toBeOK();
      const responseJson = await response.json();
      const eventId = responseJson.data[0].id; 
      console.log(eventId);

      const createOrder = await page.request.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", 
        {
          headers:{
          "authorization": `Bearer ${token}`,
          },
          data:{
            "eventId": eventId,
            "customerName": 'Yahoo User',
            "customerEmail": "vns@yahoo.com",
            "customerPhone": "1234567890",
            "quantity": 1,
          }
        });
        await expect(createOrder).toBeOK();
        // const createOrderJson = await createOrder.json();
        // const yahooBookingId = createOrderJson.data.id;
        const yahooBookingId = (await createOrder.json()).data.id;
        console.log(yahooBookingId);


        await page.goto("https://eventhub.rahulshettyacademy.com/login");
        await page.getByPlaceholder("you@email.com").fill(g_mail);
        await page.getByPlaceholder("••••••").fill("Test@12345");
        await page.locator("#login-btn").click();
        await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`);
        await page.waitForLoadState("networkidle");
        await expect(page.getByText('Access Denied')).toBeVisible();
        await expect(page.getByText('You are not authorized to view this booking.')).toBeVisible();
});
