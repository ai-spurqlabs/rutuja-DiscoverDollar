import CSS from "../fixtures/Css.json" with { type: "json" };

class allocate {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('allocate: globalThis.page is not available');
        }
    }

    async filter_claims(auditp) {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.audit_per_filter).scrollIntoViewIfNeeded();
        await this.page.locator(CSS.audit_per_filter).click();
        await this.page.locator(CSS.filter_criteria).fill(auditp);
        await this.page.waitForTimeout(7000);
        await this.page.locator(CSS.filter_options).nth(0).filter({ hasText: auditp }).click();
        await this.page.waitForTimeout(5000);
    }

    async click_allocate(icon) {
        const text = await this.page.locator(CSS.claim_no).textContent();
        process.env.claimNo = text.trim();
        await this.page.locator(CSS.Actions_icon).click();
        await this.page.locator(CSS.successMsgAlert).filter({ hasText: icon }).click();
    }

    async enter_username(username) {
        await this.page.waitForTimeout(3000);
        await this.page.locator(CSS.select_filetype).fill(username);
        await this.page.waitForTimeout(7000);
        await this.page.locator(`text=${username}`).click();
    }

    async allocate_claim() {
        await this.page.locator(CSS.allocate_button).click();
    }

    async verify_success(msg) {
        const text = await this.page.locator(CSS.success_message).textContent();
        if (!text.includes(msg)) throw new Error(`Success message mismatch: expected ${msg}`);
    }

    async verify_allocate(userid) {
        await this.page.locator(CSS.claim_no_filter).click();
        await this.page.locator(CSS.filter_criteria).fill(process.env.claimNo || '');
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.filter_options).nth(0).click();
        await this.page.waitForTimeout(5000);
        const u = await this.page.locator(CSS.user).textContent();
        if (!u.includes(userid)) throw new Error('User id not found in allocation row');
    }
}

export default allocate;