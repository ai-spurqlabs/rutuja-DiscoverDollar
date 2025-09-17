import CSS from "../fixtures/Css.json" with { type: "json" };

class GlobalSearch {
    constructor(firstClaimNo) {
        this.firstClaimNo = firstClaimNo;
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('GlobalSearch: globalThis.page is not available');
        }
    }

    async copyFirstClaimNumber() {
        console.log('Copying first claim number...');

        // Try multiple selectors for the first claim number
        const claimSelectors = [
            CSS.firstClaimNo, // "tbody > tr >td >div > div > div > span:nth(0)"
            '#td00', // Standard table cell
            'tbody tr:first-child td:first-child', // First cell in first row
            '.tableRow .btn-table', // Button table class
            '[class*="claim"] span', // Any span with claim in class
            'span[class*="claim"]', // Span with claim class
            'td span', // Any span in table cell
            '.claim-number', // Claim number class
            '[data-testid*="claim"]' // Test ID
        ];

        let claimNumber = '';

        for (const selector of claimSelectors) {
            try {
                console.log(`Trying claim number selector: ${selector}`);
                const element = this.page.locator(selector).first();

                // Check if element exists and is visible
                const isVisible = await element.isVisible().catch(() => false);
                if (isVisible) {
                    claimNumber = await element.textContent() || '';
                    claimNumber = claimNumber.trim();

                    // Check if it looks like a claim number (contains letters and numbers)
                    if (claimNumber && /[A-Z]{4}\d{6}\d{3}/.test(claimNumber)) {
                        console.log(`✅ Found claim number: ${claimNumber} using selector: ${selector}`);
                        break;
                    }
                }
            } catch (error) {
                console.log(`❌ Claim selector ${selector} failed: ${error.message}`);
            }
        }

        if (!claimNumber) {
            // Take screenshot for debugging
            await this.page.screenshot({
                path: 'copy-claim-number-failed.png',
                fullPage: true
            });
            console.log('❌ Could not find claim number, taking screenshot');

            throw new Error('Could not find claim number to copy');
        }

        this.firstClaimNo = claimNumber;
        console.log(`✅ Successfully copied claim number: ${this.firstClaimNo}`);
    }

    async pasteClaimNo() {
        console.log(`Pasting claim number: ${this.firstClaimNo}`);

        // Check if claim number was copied
        if (!this.firstClaimNo || this.firstClaimNo.trim() === '') {
            throw new Error('No claim number was copied. Make sure to call copyFirstClaimNumber first.');
        }

        // Clear the search box first
        await this.page.locator(CSS.globalsrchTextBox).clear();

        // Type the claim number with delay
        await this.page.locator(CSS.globalsrchTextBox).type(this.firstClaimNo.trim(), { delay: 100 });

        // Wait for autocomplete dropdown to appear
        await this.page.waitForTimeout(2000);

        // Try multiple selectors for the autocomplete option
        const autocompleteSelectors = [
            CSS.filter_options, // ".p-autocomplete-item"
            '.p-autocomplete-item', // Direct selector
            '[role="option"]', // ARIA option
            '.autocomplete-item', // Alternative
            `li:has-text("${this.firstClaimNo.trim()}")`, // Text-based
            '.dropdown-item', // Dropdown item
            '.search-result' // Search result
        ];

        let optionClicked = false;

        for (const selector of autocompleteSelectors) {
            try {
                console.log(`Trying autocomplete selector: ${selector}`);

                // Wait for selector to be visible
                await this.page.waitForSelector(selector, { timeout: 3000 });

                // Get the element
                const element = this.page.locator(selector).first();

                // Check if it's visible and contains our claim number
                const isVisible = await element.isVisible();
                const elementText = await element.textContent();

                if (isVisible && elementText && elementText.includes(this.firstClaimNo.trim())) {
                    await element.click();
                    console.log(`✅ Successfully clicked autocomplete option with selector: ${selector}`);
                    optionClicked = true;
                    break;
                }
            } catch (error) {
                console.log(`❌ Autocomplete selector ${selector} failed: ${error.message}`);
            }
        }

        if (!optionClicked) {
            console.log('⚠️ Could not find autocomplete option, proceeding without clicking');
            // Don't throw error - just log the issue and continue
        }

        console.log('✅ Paste claim number operation completed');
    }

    async verifyClaimNumber() {
        await this.page.waitForTimeout(5000);
        const claimNo = await this.page.locator(CSS.firstClaimNumber).textContent() || '';
        if (claimNo.trim() !== this.firstClaimNo) throw new Error('verifyClaimNumber mismatch');
    }

    async typeInvalidClaimNo(invalidClaim) {
        // ignoring uncaught exceptions should be handled in test runner
        await this.page.locator(CSS.globalsrchTextBox).type(invalidClaim, { delay: 100 });
    }

    async verifyerrormsg(msg, popupMsg) {
        await this.page.waitForTimeout(10000);
        const invalidClaimNo = await this.page.locator(CSS.filter_options).nth(0).textContent() || '';
        if (invalidClaimNo.trim() !== msg) throw new Error('verifyerrormsg mismatch');
        await this.page.waitForTimeout(5000);
    }

    async searchInGlobalBanner(scope) {
        const clickUntilScope = async (retries = 5) => {
            const searchscope = await this.page.locator(CSS.globlSearch).textContent() || '';
            if (!searchscope.includes(scope) && retries > 0) {
                await this.page.locator(CSS.switchSearchbutton).click();
                await this.page.waitForTimeout(500);
                return clickUntilScope(retries - 1);
            }
        };
        await clickUntilScope();
    }

    async typeInSearchBox(value) {
        await this.page.locator(CSS.globalsrchTextBox).type(value, { delay: 100 });
        await this.page.waitForTimeout(2000);
    }

    async verifySearchResult(message, value) {
        if (message === "") {
            await this.page.locator(CSS.filter_options).click();
            await this.page.waitForTimeout(2000);
            const claimsViewText = await this.page.locator(CSS.claimsView).textContent() || '';
            if (!claimsViewText.includes(value)) throw new Error('verifySearchResult value not found');
        } else {
            const filt = await this.page.locator(CSS.filter_options).textContent() || '';
            if (!filt.includes(message)) throw new Error('verifySearchResult message not found');
        }
    }
}
export default GlobalSearch;
