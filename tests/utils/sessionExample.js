// Example: Running @MVT tagged Cucumber tests with session management
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginUtils = require('../utils/loginUtils');

let browser;
let page;
let loginUtils;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginUtils = new LoginUtils(page);

  // Use session management for login (equivalent to cy.session)
  const loginSuccess = await loginUtils.loginUser(); // or loginAuditReviewer(), etc.
  if (!loginSuccess) {
    throw new Error('Login failed');
  }
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

// Example @MVT tagged scenario
Given('I am logged in as an auditor', async function () {
  // Session is already established in Before hook
  console.log('User is logged in via session management');
});

When('I navigate to the claims dashboard', async function () {
  await page.goto(process.env.Cantire_Stage_URL + '/dashboard');
});

Then('I should see the claims summary', async function () {
  // Your test assertions here
  const summaryElement = page.locator('.claims-summary');
  await expect(summaryElement).toBeVisible();
});
