# Playwright Network Interception & Listeners Guide 🌐

## 1. Network Methods Overview 🧰

| Method | Role | Primary Use |
| :--- | :--- | :--- |
| `route.fulfill()` 📦 | Intercepts & returns custom response | Mocking response data or status codes[cite: 2] |
| `route.continue()` ➡️ | Alters outgoing request & proceeds | Modifying request headers, URL, or payload |
| `route.abort()` 🛑 | Cancels request completely | Blocking heavy assets like images or ads |
| `page.on('response')` 🎧 | Passive network listener | Logging or inspecting responses without pausing execution |

---

## 2. Response Interception (`route.fulfill`) 📦

* **`body:` vs `json:`**: Use `body:` for raw text strings (requires `JSON.stringify()`). Use `json:` to pass JavaScript objects directly—Playwright handles stringification and headers automatically.
* **Using `fetch`**: `page.request.fetch(route.request())` preserves real backend status codes and headers while letting you swap the payload.

```javascript
await page.route("**/api/ecom/order/*", async route => {
  const response = await page.request.fetch(route.request());
  await route.fulfill({
    response,
    json: fakePayLoadOrders,
  });
});