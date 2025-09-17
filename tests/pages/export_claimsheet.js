import CSS from "../fixtures/Css.json" with { type: "json" };

class export_claimsheet {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('export_claimsheet: globalThis.page is not available');
        }
    }

    async click_options() {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.custom_claim_sort).scrollIntoViewIfNeeded();
        await this.page.locator(CSS.custom_claim_sort).click({ force: true });
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.actions_icon).click();
    }

    async click_exp_claimsh() {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.actions_menu).filter({ hasText: 'DOWNLOAD CLAIMSHEET' }).click();
        await this.page.waitForTimeout(5000);
    }

    async sel_claim() {
        await this.page.locator(CSS.add_claims).click();
        await this.page.locator(CSS.bulk_claim).click();
        await this.page.locator(CSS.upload_claimsheets).click();
        // TODO: adapt to Playwright file upload helpers
        await this.page.locator(CSS.upload_refdoc).setInputFiles('test22.zip');
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.upload).click();
        await this.page.waitForTimeout(5000);
        await this.page.reload();
        await this.page.waitForTimeout(5000);
    }

    async filter_claim() {
        // Read fixture file via Node helper if needed
        // For now, use the fixture content path
        const fs = await import('fs');
        const claims = fs.readFileSync('tests/fixtures/abc.txt', 'utf8');
        const articleID = claims.split(',')[0];
        await this.page.locator(CSS.claim_no_filter).click();
        await this.page.locator(CSS.filter_criteria).fill(articleID);
        await this.page.waitForTimeout(7000);
        await this.page.locator(CSS.filter_options).nth(0).click();
        await this.page.locator(CSS.first_checkbox).click();
    }

    async click_download_claimsh() {
        await this.page.locator(CSS.options_icon).nth(1).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.download_claimsh_excel).click();
        await this.page.waitForTimeout(7000);
    }

    async nav_rev() {
        await this.page.locator(CSS.manage).click();
        await this.page.locator(`text=CLAIMS`).click({ force: true });
        await this.page.waitForTimeout(5000);
    }
}

export default export_claimsheet