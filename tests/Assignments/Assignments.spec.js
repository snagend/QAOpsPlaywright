const {test, expect} = require("@playwright/test");


// =============================Assignment-1 ==================
// test("User login validation", async ({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     await page.locator("#username").fill("rahulshetty");
//     await page.locator("input[type='password']").fill("Learning@830$3mK2");
//     await page.locator("#signInBtn").click();
//     console.log(await page.locator("[style*='block']").textContent());
//     await expect(page.locator("[style*='block']")).toContainText("Incorrect");
//     await page.locator("#username").fill("");
//     await page.locator("#username").fill("rahulshettyacademy");
//     await page.locator("input[type='password']").fill("Learning@830$3mK2");
//     await page.locator("#signInBtn").click();
//     console.log(await page.locator("h4 > a").first().textContent());
//     console.log(await page.locator("h4 > a").nth(1).textContent());
//     console.log(await page.locator("h4 > a").allTextContents());
// });

// =============================Assignment-2 ==================
// test("Test Assignment", async ({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/client/auth/login");
//     // await page.locator(".login-wrapper-footer-text").click();
//     // await page.locator("#firstName").fill("VNS");
//     // await page.locator("#lastName").fill("VNS");
//     // await page.locator("#userEmail").fill("vns77@vns.com");
//     // await page.locator("#userMobile").fill("1234567890");
//     // await page.locator("[value='Male']").click();
//     // await page.locator("#userPassword").fill("Test@12345");
//     // await page.locator("#confirmPassword").fill("Test@12345");
//     // await page.locator("[type='checkbox']").click();
//     // await page.locator("#login").click();
//     // await page.locator(".btn-primary").click();
//     await page.locator("#userEmail").fill("vns77@vns.com");
//     await page.locator("#userPassword").fill("Test@12345");
//     await page.locator("#login").click();
//     // await page.waitForLoadState('networkidle'); //Waits till all api's are loaded and the network is idle
//     await page.locator(".card-body b").first().waitFor(); //waits till the first element is loaded.
//     console.log(await page.locator(".card-body b").allTextContents());
// });


// test("Extracting user name from the text and logging in", async ({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const url = "https://rahulshettyacademy.com/loginpagePractise/";
//     const userName = page.locator("#username");
//     const password = page.locator("#password");

//     await page.goto(url);
//     await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
//     const [newPage] = await Promise.all([
//         context.waitForEvent("page"),
//         await page.locator("[href*='documents-request']").click(),
//     ]);
//     const text = await newPage.locator(".red").textContent();
//     const splitText = text.split("@");
//     const usrName = splitText[1].split(".")[0];
//     const passwd = "Learning@830$3mK2";

//     await userName.fill(usrName);
//     await password.fill(passwd);
//     await page.locator(".checkmark").last().click();
//     await page.locator("#okayBtn").click();
//     await expect(page.locator(".checkmark").last()).toBeChecked();
//     const dropDown = await page.locator("select.form-control");
//     await dropDown.selectOption("consult");
//     // await page.pause();
//     await page.locator("#terms").click();
//     await page.locator("#terms").uncheck();
//     await expect(page.locator("#terms")).not.toBeChecked();
//     await page.locator("#terms").click();
//     await expect(page.locator("#terms")).toBeChecked();
//     await page.locator("#signInBtn").click();

//     // await page.waitForLoadState("networkidle");
//     await page.locator(".card-body a").last().waitFor();
//     console.log(await page.locator(".card-body a").allTextContents());
// });

// test("End to End Workflow", async({page}) => {
//     const usrName = "vns77@vns.com";
//     const passwd = "Test@12345";

//     await page.goto("https://rahulshettyacademy.com/client");
//     await page.locator("#userEmail").fill(usrName);
//     await page.getByPlaceholder("enter your passsword").fill(passwd);
//     await page.getByText("Login").click();
//     await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
//         .getByRole("button", {name: "Add To Cart"}).click();
//     await page.getByText("Cart").nth(0).click();
//     await page.getByText("Checkout").click();
//     await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay: 150});
//     await page.locator(".ta-results").getByRole("button", {name: "India"}).nth(1).click();
//     await page.getByText("PLACE ORDER").click();
//     await expect(page.getByText("Thankyou for the order.")).toBeVisible();
//     const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//     console.log(orderId);
//     const finalOrderId = orderId.replace(/\|/g, "").trim();
//     await page.getByRole("button", {name: "ORDERS"}).click();
//     await page.locator("tr").filter({hasText: finalOrderId})
//         .getByRole("button", {name: "View"}).click();
// });

// class MobilePhone{

//     constructor(brandName){
//         this.brand = brandName;
//     }
// };

// const myPhone = new MobilePhone("Apple");
// console.log(myPhone.brand);

// class Car{
//     constructor(modelName, topSpeed){
//         this.model = modelName;
//         this.speed = topSpeed;
//         this.fuelLevel = 100;
//     }
// };

// const myCar = new Car("Ferrari", "320");
// console.log(myCar.model);
// console.log(myCar.speed);
// console.log(myCar.fuelLevel);

// class SmartLight{
//     constructor(roomName){
//         this.room = roomName;
//         this.isOn = false;
//     }

//     turnOn(){
//         this.isOn = true;
//         console.log(`The light in ${this.room} is now ON!`);
//     }
// };

// const myLight = new SmartLight("Kitchen");
// myLight.turnOn();


// class FlightTicket {
//     constructor(inputName, inputSeat){
//         this._passengerName = inputName;
//         this._seatNumber = inputSeat;
//         }

//         get passengerName(){
//             return this._passengerName.toUpperCase();
//         };

//         get seatNumber(){
//             return `Seat: ${this._seatNumber}`;
//         };

//         set seatNumber(newSeatNumber){
//             if(this._seatNumber === ""){
//                 console.log("Please enter valid seat number");
//             }else{
//                 this._seatNumber = newSeatNumber;
//             }
//         }
       
// };

// const myTicket = new FlightTicket("Rahul", "12A");
// console.log(myTicket.passengerName);
// console.log(myTicket.seatNumber);

test("Automatic login", async({browser}) => {
     const usrName = "vns77@vns.com";
    const passwd = "Test@12345";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(usrName);
    await page.locator("#userPassword").fill(passwd);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path: "state.json"});
    await browser.newContext({storageState: "state.json"})
})

test("Routing practice", async({page}) => {
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            route.fulfill({
                response,
                json: fakeresponse,
            })
        }
    )
});

