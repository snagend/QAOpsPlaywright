import { test, expect, request } from "@playwright/test";

const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

const base_url = "https://eventhub.rahulshettyacademy.com";
const usrName = "vns777@vns.com";
const passwd = "Test@12345";
let webContext;

test.beforeAll(async({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base_url);
  await page.getByPlaceholder("you@email.com").fill(usrName);
  await page.getByPlaceholder("••••••").fill(passwd);
  await page.locator("#login-btn").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({path: "state.json"});
  webContext = await browser.newContext({storageState: "state.json"});
})

export async function loginAndGoToEvents(page) {
  await page.goto(base_url + "/events");
};

export async function bannerVisible(page) {
  await expect(page.getByTestId("event-card").first()).toBeVisible();
  await expect(page.getByTestId("event-card")).toHaveCount(6);
  await expect(page.getByText(/sandbox holds up to/i)).toBeVisible();
  await expect(page.getByText("9 bookings")).toBeVisible();
};

export async function bannerNotVisible(page) {
  await expect(page.getByTestId("event-card").first()).toBeVisible();
  await expect(page.getByTestId("event-card")).toHaveCount(4);
  await expect(page.getByText(/sandbox holds up to/i)).toBeHidden();
  await expect(page.getByText("9 bookings")).toBeHidden();
};

test("Six event banner validation", async ({}) => {
  const page = await webContext.newPage()
  await page.route("**/api/events*", async route => {
    console.log(`Application requested URL ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      json: SIX_EVENTS_RESPONSE,
    });
    console.log(`Response Sent mock data back to the app`)
  });
  console.log("Logging in to the application");
  await loginAndGoToEvents(page);
  console.log("Navigation to the events page done");
  await bannerVisible(page);
  await page.close();
});


test("Four events banner validation", async({}) => {
  const page = await webContext.newPage()
  await page.route("**/api/events*", async (route) => {
    await route.fulfill({
      status: 200,
      json: FOUR_EVENTS_RESPONSE,
    });
  });
  await loginAndGoToEvents(page);
  await bannerNotVisible(page);
});
