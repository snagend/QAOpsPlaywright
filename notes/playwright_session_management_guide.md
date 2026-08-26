# Playwright JS/TS: Session Management & Authentication Guide 🎭

## 1. What is Session Storage & `state.json`? 🔑
When testing authenticated web applications, logging in via the UI before every test creates slowness and flakiness. Playwright allows you to extract cookies, local storage, and session tokens into a JSON file (`state.json`) and reuse them across browser contexts.

### Saving & Loading Storage State Manually
```javascript
// Extract and save state after UI login
await context.storageState({ path: "state.json" });

// Inject saved state into a new browser context
const webContext = await browser.newContext({ storageState: "state.json" });
const page = await webContext.newPage();
```

---

## 2. Global Setup Architecture 🌐
Instead of running login steps inside individual test files using `beforeAll`, Playwright supports **Setup Projects** in `playwright.config.js`. This executes the login sequence **once** before all tests run.

### Step 1: Authentication Setup Script (`tests/auth.setup.js`)
```javascript
import { test as setup } from '@playwright/test';

setup('authenticate user', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('anshika@gmail.com');
  await page.locator('#userPassword').fill('Iamking@000');
  await page.locator('#login').click();
  
  // Ensure login redirect is complete before saving session
  await page.waitForURL('**/dashboard/**');
  
  // Save active session state
  await page.context().storageState({ path: 'state.json' });
});
```

### Step 2: Configure Global Dependency (`playwright.config.js`)
```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    // 1. Run auth setup first
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.js/ 
    },
    
    // 2. Main E2E tests depend on 'setup'
    {
      name: 'e2e tests',
      dependencies: ['setup'],
      use: {
        // Automatically inject state.json into all page fixtures
        storageState: 'state.json', 
      },
    },
  ],
});
```

### Step 3: Write Pre-Authenticated Tests (`tests/dashboard.spec.js`)
```javascript
import { test, expect } from '@playwright/test';

test('View Dashboard Orders', async ({ page }) => {
  // Directly navigate to secured page—already logged in! 🔓
  await page.goto('https://rahulshettyacademy.com/client/dashboard/dash');
  await expect(page.locator('.card-body')).toHaveCount(3);
});
```

---

## 3. Handling Guest / Unauthenticated Tests 🚫🍪
When testing features like "Forgot Password" or "Invalid Login", you need a completely clean, logged-out session.

### Option A: Clean Browser Context (`browser` fixture)
```javascript
test('Test invalid login manually', async ({ browser }) => {
  // Create fresh context without storageState
  const context = await browser.newContext(); 
  const page = await context.newPage();
  
  await page.goto('https://rahulshettyacademy.com/client');
});
```

### Option B: File-Level Override (`test.use`)
```javascript
import { test, expect } from '@playwright/test';

// Override storageState for all tests in this file
test.use({ storageState: { cookies: [], origins: [] } });

test('Test invalid login page', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
});
```

---

## Summary of Key Benefits 🚀
1. **Speed:** Avoids executing login UI steps for dozens of individual test cases.
2. **Reliability:** Prevents login page bugs from breaking unrelated feature test suites.
3. **Scalability:** Integrates smoothly with parallel worker execution.
