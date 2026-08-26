# Playwright Master Guide: Setup & CLI Commands
> **Course:** Rahul Shetty Academy - Playwright Automation
> **Date:** July 20, 2026
> **Purpose:** Core reference manual for Playwright architecture, configuration, and terminal execution.

---

## 📌 1. Core Concepts & Architecture

### How Playwright Works
Unlike older tools like Selenium that communicate via a slow HTTP WebDriver layer, Playwright communicates directly with browsers using a single WebSocket connection via the **Chrome DevTools Protocol (CDP)**.

* **Fast Execution:** No intermediate network hops.
* **Flake Reduction:** Out-of-the-box auto-waiting mechanisms.
* **Multi-Browser:** Supports Chromium, WebKit (Safari), and Firefox natively.

> 💡 **Key Takeaway:** 
> Playwright tests run directly inside browser contexts, which means browser sessions are isolated and execute incredibly fast without reloading the whole browser executable.

---

## 🛠️ 2. Environment Setup

Follow these sequential steps to initialize a fresh Playwright automation framework.

### Prerequisites
Make sure you have Node.js installed. Verify using your terminal:
```bash
node -v
npm -v
```

### Framework Initialization
Run the following wizard command in your project directory:
```bash
npm init playwright@latest
```

#### Configuration Choices during Setup:
During the terminal prompt, select the following options:
1. **Language:** JavaScript or TypeScript *(Select based on course module)*
2. **Where to put your tests?:** `tests`
3. **Add a GitHub Actions workflow?:** `false` (Can add later)
4. **Install Playwright browsers?:** `true`

---

## 💻 3. Essential CLI Commands

Keep this quick-reference command table handy whenever you are running or debugging test scripts.

| Command Syntax | Description |
| :--- | :--- |
| `npx playwright test` | Runs all tests across all configured browsers in **headless** mode. |
| `npx playwright test --headed` | Forces the browser windows to open visibly (**headed** mode). |
| `npx playwright test <filename>` | Executes only a specific test script file. |
| `npx playwright test --project=chromium` | Runs tests exclusively on a specific browser profile. |
| `npx playwright test --grep "@Sanity"` | Runs specific test scenarios tagged with a unique string. |
| `npx playwright show-report` | Launches a local web server to inspect visual HTML test results. |

---

## 📝 4. First Test Script Structure

This blueprint demonstrates the mandatory components of a standard Playwright test file.

```javascript
const { test, expect } = require('@playwright/test');

test('Verify Rahul Shetty Academy Login Page', async ({ page }) => {
    // 1. Navigate to the Target URL
    await page.goto('https://rahulshettyacademy.com');

    // 2. Extract and print the page title for debugging
    const pageTitle = await page.title();
    console.log("Opened Page Title is: " + pageTitle);

    // 3. Perform an Assertion
    await expect(page).toHaveTitle("Let's Shop");
});
```

### Critical Syntax Breakdown
* **`async` / `await`**: JavaScript is asynchronous by default. Playwright commands must line up sequentially. Every single browser action requires the `await` keyword.
* **`{ page `}**: This is a default Playwright **Fixture**. It automatically provisions an isolated browser page instance for this specific test block without manually launching the browser.

---

## 🔍 5. Troubleshooting & Debugging Tools

Rahul Shetty emphasizes these debugging techniques to fix failing locator paths.

### A. Playwright Inspector
To step through your script line-by-line using a visual UI debugger:
```bash
npx playwright test --debug
```

### B. Codegen (Test Generator)
To record your manual browser interactions and automatically write the equivalent code for you:
```bash
npx playwright codegen https://rahulshettyacademy.com
```

---

## 🗒️ Personal Course Notes & Gotchas
* *Note 1: If your `npm init` commands fail due to proxy settings, run `npm config set proxy` beforehand.*
* *Note 2: Remember that `expect` assertions have built-in retry mechanisms up to 5 seconds by default.*
