// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries: 1, //retries the failed test cases for one time, in the second attempt it passed it will put that test cases under flaky
  workers : 3, //controls the parallel execution, 3 test file will run parallely.

  /* Maximum time one test can run for. */
  timeout: 40*1000,


  expect: {timeout: 40*1000},
  reporter : 'html',
  actionTimeout: 10 * 1000,
  navigationTimeout: 30 * 1000,

projects : [
  {
      name: "safari",
        use: {
      browserName : 'webkit',
      headless : true,
      screenshot: 'on',
      trace: 'on', //off, on, retain-on-failure
      // ...devices["iPhone 11"],
    }
  },

  {
      name: "chrome",
        use: {
      browserName : 'chromium',
      headless : true,
      screenshot: 'on',  //off, on, only-on-failure
      video: 'off', //off, on, retain-on-failure, on-first-retry
      trace: 'on',  //off, on, retain-on-failure, on-first-retry
      ignoreHttpsErrors: true,  //Ignore the SSL certificates error
      permissions: ["geolocation"],  //Accepts the location if the browser prompts
      //viewport : {width:720, height:720},  //Opens the browser in the provided width and height
      // ...devices["iPhone 11"],  //Runs the test in the provided device mode
    }
  },

  {
      name: "firefox",
        use: {
      browserName : 'firefox',
      headless : true,
      screenshot: 'on',
      trace: 'on' //off, on, retain-on-failure
    }
  },
]

});

module.exports = config;

