import CSS from "../fixtures/Css.json" with { type: "json" };

class ReviewPage {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('ReviewPage: globalThis.page is not available');
        }
    }

    async selectAllClaims() {
        // quick pause to allow DOM to settle
        await this.page.waitForTimeout(2000)
        await this.page.locator('[type="checkbox"]').nth(1).check({ force: true })
    }

    async selectBulkStatusChange() {
        await this.page.locator(CSS.actionMenu).click()
        await this.page.locator(CSS.bulkStatusChangeButton).click()
        // ignoring uncaught exceptions should be handled by the test runner
    }

    async applyUserFilter(user) {
        await this.page.locator(CSS.table).evaluate((el) => el.scrollLeft = el.scrollWidth)
        await this.page.locator(CSS.userFilter).click({ force: true })
        await this.page.locator(CSS.userFilterInput).fill(user)
        await this.page.waitForTimeout(7000)
        await this.page.locator(CSS.userList).locator(`:text("${user}")`).click()
        await this.page.waitForTimeout(7000)
    }

    async applyStatusFilter(status, bucket) {
        await this.page.waitForTimeout(5000)
        if (bucket == "APPROVE") {
            await this.page.locator(CSS.StatusFilter).click({ force: true })
        }
        if (bucket == "MANAGE") {
            await this.page.locator(CSS.statusFilter).click({ force: true })
        }
        await this.page.locator(CSS.userFilterInput).fill(status)
        await this.page.waitForTimeout(5000)
        await this.page.locator(CSS.userList).locator(`:text("${status}")`).click()
        await this.page.waitForTimeout(7000)
    }

    async clickOnFirstClaim() {
        await this.page.locator(CSS.firstClaimNumber).click()
    }
}

export default ReviewPage