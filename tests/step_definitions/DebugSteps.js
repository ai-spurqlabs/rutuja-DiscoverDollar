import { Given, When, Then } from "@cucumber/cucumber";

Given('User is on the main dashboard after login', async function () {
    // Wait for page to fully load after login
    await this.page.waitForTimeout(5000);
    
    // Log current URL and page title
    const url = this.page.url();
    const title = await this.page.title();
    console.log('Current URL:', url);
    console.log('Page title:', title);
    
    // Take a screenshot for debugging
    await this.page.screenshot({ path: 'dashboard-after-login.png', fullPage: true });
    
    // Check what navigation elements are actually present
    const allImages = await this.page.locator('img').count();
    console.log('Total images on page:', allImages);
    
    const navItems = await this.page.locator('.nav-item').count();
    console.log('Nav items found:', navItems);
    
    const allButtons = await this.page.locator('button').count();
    console.log('Total buttons on page:', allButtons);
    
    // Log all available navigation elements
    const navElements = await this.page.locator('.nav-item img, [src*="manage"], button:has-text("Manage")').all();
    for (let i = 0; i < navElements.length; i++) {
        const element = navElements[i];
        try {
            const src = await element.getAttribute('src');
            const alt = await element.getAttribute('alt');
            const text = await element.textContent();
            console.log(`Nav element ${i}: src=${src}, alt=${alt}, text=${text}`);
        } catch (e) {
            console.log(`Nav element ${i}: Could not get attributes`);
        }
    }
});

When('User attempts to navigate to manage section', async function () {
    // This is a simplified test step to debug navigation
    console.log('Attempting to navigate to manage section...');
    
    // Try to find any element that might lead to manage
    const possibleSelectors = [
        'img[src*="manage"]',
        'button:has-text("Manage")',
        '.nav-item img:nth-child(2)',
        '.nav > :nth-child(3)',
        '[aria-label*="manage" i]'
    ];
    
    let found = false;
    for (const selector of possibleSelectors) {
        try {
            const count = await this.page.locator(selector).count();
            console.log(`Selector "${selector}" found ${count} elements`);
            if (count > 0) {
                await this.page.locator(selector).first().click();
                console.log(`Successfully clicked with selector: ${selector}`);
                found = true;
                break;
            }
        } catch (error) {
            console.log(`Selector "${selector}" failed: ${error.message}`);
        }
    }
    
    if (!found) {
        console.log('No manage navigation element found');
        // Take another screenshot
        await this.page.screenshot({ path: 'no-manage-found.png', fullPage: true });
    }
});
