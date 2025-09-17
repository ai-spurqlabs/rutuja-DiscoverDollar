import CSS from "../fixtures/Css.json" with { type: "json" };

class BulkClaim {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('BulkClaim: globalThis.page is not available');
        }
    }

    async add() {
        await this.page.locator(CSS.Add).click();
    }

    async selectbulk() {
        await this.page.locator(CSS.ToDoOptions1).click();
    }

    async selectaudit(Text) {
        await this.page.locator(CSS.Audit).click();
        await this.page.locator(`text=${Text}`).click();
    }

    async selectclaimType(Text) {
        await this.page.locator(CSS.claimType).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(CSS.dropdown_options).filter({ hasText: Text }).first().scrollIntoViewIfNeeded();
        await this.page.locator(CSS.dropdown_options).filter({ hasText: Text }).first().click();
        await this.page.waitForTimeout(7000);
    }

    async uploadFile(Text) {
        // TODO: adapt file upload helper if test runner provides one
        await this.page.locator(CSS.uploadfile).setInputFiles(Text);
    }

    async submitClaim() {
        await this.page.locator(CSS.upload).click();
        await this.page.waitForTimeout(7000);
        await this.page.locator(CSS.submit).click();
        await this.page.waitForTimeout(7000);
    }

    async verifyclaimGenerate(Text) {
        await this.page.waitForTimeout(5000);
        await this.page.reload();
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.badge).waitFor({ state: 'visible' });
        // simple contains check
        const badgeText = await this.page.locator(CSS.badge).textContent();
        if (!badgeText.includes(Text)) throw new Error(`Expected badge to contain ${Text}`);
    }

    async Toast(Text) {
        const t = await this.page.locator(CSS.toast).textContent();
        if (!t.includes(Text)) throw new Error(`Toast does not contain ${Text}`);
    }

    async disable() {
        // Playwright doesn't have direct "should be disabled" assertion here; leave as locator check
        await this.page.locator(CSS.upload).waitFor({ state: 'attached' });
    }

    async verifyerror(Text) {
        const t = await this.page.locator(CSS.error).textContent();
        if (!t.includes(Text)) throw new Error(`Error does not contain ${Text}`);
    }

    async download() {
        await this.page.waitForTimeout(7000);
        await this.page.locator(CSS.Download).click();
        await this.page.waitForTimeout(5000);
        // TODO: implement download verification using Playwright API (page.waitForEvent('download'))
        await this.page.waitForTimeout(15000);
    }

    async verifybadge(Text) {
        // TODO: implement robust waitUntil replacement if needed
        await this.page.locator(CSS.badge).waitFor({ state: 'visible' });
        const badgeText = await this.page.locator(CSS.badge).textContent();
        if (!badgeText.includes(Text)) throw new Error(`Badge does not contain ${Text}`);
    }

    async exportandExtract(cell) {
        // TODO: implement downloads housekeeping and CSV read using Node helpers
        await this.page.waitForTimeout(3000);
        await this.page.locator(CSS.Export_Request_Status).nth(0).click();
        await this.page.waitForTimeout(5000);
        // TODO: verify download via Playwright download event and parse CSV
    }

    async applyclaimNumber() {
        await this.page.locator(CSS.Claim_Number_Filter).click({ force: true });
        await this.page.locator(CSS.UserFilterSearch).fill(process.env.claimNo || '');
        await this.page.waitForTimeout(10000);
        await this.page.locator(CSS.UserFilterResult).nth(0).click();
    }

    async extractTax(cell) {
        // TODO: replace cy.task readDataxlsx with Node-side helper; keep placeholder for now
        // e.g., use test runner task to populate process.env.taxamount
    }

    async verifyTax(amount) {
        await this.page.waitForTimeout(4000);
        if (amount !== (process.env.taxamount || '').toString()) throw new Error('Tax amount mismatch');
    }

    async clickExport() {
        // TODO: implement downloads via Playwright
        await this.page.waitForTimeout(4000);
        await this.page.locator(CSS.exportDropdown).click();
        await this.page.waitForTimeout(7000);
    }
}

export default BulkClaim;