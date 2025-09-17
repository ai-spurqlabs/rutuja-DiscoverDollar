import CSS from "../fixtures/Css.json" with { type: "json" };

class BulkClaimSheetUpload {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('BulkClaimSheetUpload: globalThis.page is not available');
        }
    }

    async AddMenu() {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.AddClaim1_button).click();
    }

    async SelectBulkClaim() {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.UploadBulkClaim_button).click();
    }

    async SelectUploadCS() {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.UploadClaimSheets_option).click();
    }

    async UploadCS(CSfile) {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.UploadCSFile).setInputFiles(CSfile);
    }

    async ClickSubmit() {
        await this.page.waitForTimeout(10000);
        await this.page.locator(CSS.SubmitButton).click();
    }

    async Verifymsg(msg) {
        await this.page.waitForTimeout(2000);
        const t = await this.page.locator(CSS.toast_msg).textContent();
        if (!t.includes(msg)) throw new Error(`Toast message did not contain ${msg}`);
    }

    async verifyclaimSheetGen(Text) {
        // TODO: Replace cy.waitUntil logic with a proper retry loop or locator waits
        await this.page.locator(CSS.badge).waitFor({ state: 'visible' });
        const b = await this.page.locator(CSS.badge).textContent();
        if (!b.includes(Text)) throw new Error(`Badge does not contain ${Text}`);
    }

    async Verifystatus(msg) {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.status_dropdown_arrow).click();
        await this.page.waitForTimeout(5000);
        const t = await this.page.locator(CSS.status_msg).textContent();
        if (!t.trim().includes(msg)) throw new Error(`Status message does not contain ${msg}`);
    }
}

export default BulkClaimSheetUpload