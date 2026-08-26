const {test, expect} = require("@playwright/test");

// test("Assignment - 1: Event Hub End to End flow", async({page}) => {
//     const usrName = "vns777@vns.com";
//     const passwd = "Test@12345";
//     const baseUrl = "https://eventhub.rahulshettyacademy.com"

//     await page.goto(baseUrl);
//     await page.getByPlaceholder("you@email.com").fill(usrName);
//     await page.getByPlaceholder("••••••").fill(passwd);
//     await page.getByRole("button", {name: "Sign In"}).click();
//     await page.getByText("Discover & Book").waitFor();
//     await expect(page.getByText("Discover & Book")).toBeVisible();

//     await page.locator("#nav-events").click();
//     await page.getByText("Add New Event").click();
//     await page.getByPlaceholder("Event title").fill("Test Event");
//     await page.locator("#category").selectOption("Concert");
//     await page.getByPlaceholder("e.g. Bangalore").fill("Hyderabad");
//     await page.getByPlaceholder("Venue name & address").fill("Test Venue");
//     await page.locator("input[type='datetime-local']").fill('2026-07-25T15:30');
//     await page.getByPlaceholder("0.00").fill("100");
//     await page.getByPlaceholder("e.g. 500").fill("50");
//     await page.getByText("Add Event").click();
//     await expect(page.getByText("Event created!")).toBeVisible();

//     await page.locator("#nav-events").click();
    
//     await page.locator("[data-testid='event-card']").first().waitFor();
//     await expect(page.locator("[data-testid='event-card']").filter({ hasText: "Test Event" })).toBeVisible();
//     const seatDetails = await page.locator("[data-testid='event-card'] .text-emerald-600").nth(0).textContent();
    
//     const avlSeats = seatDetails.split(" seats")[0];
//     const seatsBeforeBooking = parseInt(avlSeats)
    
//     await page.locator("[data-testid='event-card']").filter({ hasText: "Test Event" })
//         .locator("[data-testid='book-now-btn']").click();

//     await page.getByPlaceholder("Your full name").fill("Test");
//     await page.getByPlaceholder("you@email.com").fill(usrName);
//     await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
//     await page.locator("#confirm-booking").click();
//     await page.locator("div[class*='text-sm'] .booking-ref").waitFor();
//     const bookingRef = await page.locator("div[class*='text-sm'] .booking-ref").textContent();
    
//     await page.getByTestId("nav-bookings").click();
//     await expect(page).toHaveURL(`${baseUrl}/bookings`);
//     await page.locator("#booking-card").first().waitFor();
//     await expect(page.locator("#booking-card")
//         .filter({hasText: bookingRef})).toBeVisible();
//     // await expect(page.locator("#booking-card").nth(0)).toHaveText("Test Event");

//     await page.getByTestId("nav-events").click();
//     await page.getByTestId("event-card").first().waitFor();
//     await expect(page.getByTestId("event-card").filter({hasText: "Test Event"})).toBeVisible();

//     const seatDetailsAft = await page.getByTestId("event-card").filter({hasText: "Test Event"})
//         .locator("span[class^=text-xs]").textContent();
//     const avlSeats1 = seatDetailsAft.split(" seats")[0];
//     const seatsAfterBooking = parseInt(avlSeats1)
//     await expect(seatsAfterBooking).toBe(seatsBeforeBooking -1);
// });


// test("Assignment - 2: Ticket Booking - Refund Qualified", async({page}) => {
//     const usrName = "vns777@vns.com";
//     const passwd = "Test@12345";
//     const baseUrl = "https://eventhub.rahulshettyacademy.com"

//     await page.goto(baseUrl);
//     await page.getByPlaceholder("you@email.com").fill(usrName);
//     await page.getByPlaceholder("••••••").fill(passwd);
//     await page.getByRole("button", {name: "Sign In"}).click();
//     await expect(page.getByText("Discover & Book")).toBeVisible();

//     await page.getByTestId("event-card").first().getByTestId("book-now-btn").click();
//     await page.getByPlaceholder("Your full name").fill("Test");
//     await page.getByPlaceholder("you@email.com").fill(usrName);
//     await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
//     await page.locator("#confirm-booking").click();

//     await page.getByTestId("nav-bookings").click();
//     await expect(page).toHaveURL(`${baseUrl}/bookings`);
//     await page.getByRole("button", {name: "View Details"}).nth(0).click();
//     await expect(page.getByText("Booking Information")).toBeVisible();
//     const bookingRef = await page.locator("[class*='gap-4 mb-8'] span").nth(0).textContent();
//     const eventTitle = await page.locator("[class*='gap-4 mb-8'] h1").textContent();
//     const firstCharBookingRef = bookingRef.trim().charAt(0);
//     const firstCharEventTitle = eventTitle.trim().charAt(0);
//     await expect(firstCharBookingRef).toBe(firstCharEventTitle);

//     await page.getByTestId("check-refund-btn").click();
//     await expect(page.getByTestId("refund-result")).toBeVisible();
//     await expect(page.getByTestId("refund-result")).toContainText("Eligible for refund.");
//     await expect(page.getByTestId("refund-result")).toContainText("Single-ticket bookings qualify for a full refund.");
// });

// test.only("Assignment - 2.1: Ticket Booking - Refund not Qualified", async({page}) => {
//     const usrName = "vns777@vns.com";
//     const passwd = "Test@12345";
//     const baseUrl = "https://eventhub.rahulshettyacademy.com"

//     await page.goto(baseUrl);
//     await page.getByPlaceholder("you@email.com").fill(usrName);
//     await page.getByPlaceholder("••••••").fill(passwd);
//     await page.getByRole("button", {name: "Sign In"}).click();
//     await expect(page.getByText("Discover & Book")).toBeVisible();

//     await page.getByTestId("event-card").nth(3).getByTestId("book-now-btn").click();
//     await page.getByRole("button", {name: "+"}).click({clickCount: 2});
//     const totalTickets = await page.locator("#ticket-count").textContent();
//     await page.getByPlaceholder("Your full name").fill("Test");
//     await page.getByPlaceholder("you@email.com").fill(usrName);
//     await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
//     await page.locator("#confirm-booking").click();

//     await page.getByTestId("nav-bookings").click();
//     await expect(page).toHaveURL(`${baseUrl}/bookings`);
//     await page.getByRole("button", {name: "View Details"}).nth(0).click();
//     await expect(page.getByText("Booking Information")).toBeVisible();
//     const bookingRef = await page.locator("[class*='gap-4 mb-8'] span").nth(0).textContent();
//     const eventTitle = await page.locator("[class*='gap-4 mb-8'] h1").textContent();
//     const firstCharBookingRef = bookingRef.trim().charAt(0);
//     const firstCharEventTitle = eventTitle.trim().charAt(0);
//     await expect(firstCharBookingRef).toBe(firstCharEventTitle);

//     await page.getByTestId("check-refund-btn").click();
//     await expect(page.getByTestId("refund-result")).toBeVisible();
//     await expect(page.getByTestId("refund-result")).toContainText("Not eligible for refund.");
//     await expect(page.getByTestId("refund-result")).toContainText(`Group bookings (${totalTickets} tickets) are non-refundable.`);
// });

// test("Opening new tab", async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const [newPage] = await Promise.all([
//     context.waitForEvent("page"),
//     page.locator("[href*='documents-request']").click(),
// ]);
//     await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
//     const textContent = await newPage.locator(".red").textContent()
//     const initialContent = textContent.split(".")[0];
//     const usrName = initialContent.split("@")[1];
//     console.log(usrName);
// });

test("End to End flow", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const usrName = "svn777@svn.com";
    const passwd = "Test@12345";
    const baseUrl = "https://rahulshettyacademy.com/client"

    await page.goto(baseUrl);
    await page.getByPlaceholder("email@example.com").fill(usrName);
    await page.getByPlaceholder("enter your passsword").fill(passwd);
    await page.getByText("Login").click();

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
        .getByRole("button", {name: " Add To Cart"}).click();
    await page.locator("[routerlink$='cart']").click();

    await page.getByText("Checkout").click();
    await expect(page.locator(".user__name label")).toHaveText(usrName);
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.locator(".ta-results").filter({hasText: "India"})
        .getByRole("button").nth(1).click();
    await page.getByText("Place Order ").click();
    const orderId = await page.locator(".em-spacer-1 label").nth(1).textContent();
    const finalOrderId = orderId.replace(/\|/g, "").trim();
    console.log(finalOrderId);
    await page.getByRole("button", {name: "  ORDERS"}).click();

    await page.locator("tr").filter({hasText: finalOrderId})
        .getByRole("button", {name: "View"}).click();
});
    