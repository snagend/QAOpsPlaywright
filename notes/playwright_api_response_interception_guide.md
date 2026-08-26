# Playwright JS/TS: API Response Interception & Mocking Guide 🌐

## 1. What is API Response Interception? 🕵️
In end-to-end testing, **API Response Interception** allows Playwright to intercept outbound network requests sent by the browser, fetch or manipulate the server's response, and modify the data before it reaches the UI.

This technique is useful for:
* Testing edge cases (e.g., zero search results, long titles, special characters).
* Overriding data without modifying the backend database.
* Preserving realistic server headers and status codes while changing payload values.

---

## 2. Code Breakdown & Line-by-Line Logic 📜

```javascript
await page.route(
  "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  async route => {
    // 1. Send request to actual backend and retrieve real response metadata
    const response = await page.request.fetch(route.request());
    
    // 2. Prepare custom mock payload
    let body = JSON.stringify(fakePayLoadOrders);
    
    // 3. Fulfill the request back to the browser with modified payload
    route.fulfill({
      response,
      body,
    });
  }
);
```

### Syntax & Parameter Analysis

| Method / Syntax | Role & Function |
| :--- | :--- |
| `page.route(urlPattern, handler)` | Sets up a network interceptor. Whenever the browser requests a matching URL, Playwright pauses the request and hands control to the async handler function. |
| `*` Wildcard | Matches any dynamic parameter at the end of the URL path (e.g., customer IDs like `/123`). |
| `async route => { ... }` | Arrow function that acts as a callback. Runs **only when a matching network request occurs**. |
| `route.request()` | Extracts the original HTTP request details (headers, URL, method) initiated by the browser. |
| `page.request.fetch(...)` | Sends the paused request to the real backend server behind the scenes to fetch real metadata (status codes, response headers). |
| `JSON.stringify(fakePayLoadOrders)` | Converts JavaScript objects/arrays into raw JSON string format required for network transmission. |
| `route.fulfill({ response, body })` | Sends the final HTTP response to the browser. Reuses status codes & headers from `response`, but overrides the content payload with `body`. |

---

## 3. Behind-the-Scenes Execution Flow 🔄

```
+---------+               +-----------+               +-------------+
| Browser |               | Playwright|               | Real Server |
+----+----+               +-----+-----+               +------+------+
     |                          |                            |
     |--- 1. Request URL ------>|                            |
     |   (/get-orders/123)      |                            |
     |                          |-- 2. fetch(route.request)->|
     |                          |                            |
     |                          |<-- 3. Returns Real Status -|
     |                          |       (200 OK & Headers)   |
     |                          |                            |
     |                          | [4. Overwrites Body with   |
     |                          |    fakePayLoadOrders]      |
     |                          |                            |
     |<-- 5. route.fulfill() ---|                            |
     |    (Real Status +        |                            |
     |     Fake Payload Body)   |                            |
```

1. **Trigger:** Browser initiates an API request.
2. **Intercept:** Playwright catches the call mid-air and pauses browser rendering.
3. **Secret Fetch:** Playwright forwards the request quietly to the real backend server.
4. **Server Reply:** Real server returns headers and status codes (e.g., `200 OK`).
5. **Payload Swap:** Playwright replaces the original payload body with your mock JSON string (`fakePayLoadOrders`).
6. **Fulfill:** Browser receives the modified response and renders the mock data on screen.

---

## 4. Response Interception vs Pure Mocking ⚖️

### Option A: Interception & Modification (Using `fetch`)
* **When to use:** When backend is running and you want to inherit actual server headers, CORS settings, or status codes, but modify specific data fields.
* **Hits Real Backend:** Yes 📡

```javascript
await page.route('**/api/ecom/order/*', async route => {
  const response = await page.request.fetch(route.request());
  let body = JSON.stringify(fakePayLoadOrders);
  await route.fulfill({ response, body });
});
```

### Option B: Pure Mocking (No Backend Call)
* **When to use:** When backend server is down, slow, under development, or when you want fast, isolated UI unit tests.
* **Hits Real Backend:** No 🛑

```javascript
await page.route('**/api/ecom/order/*', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(fakePayLoadOrders),
  });
});
```
