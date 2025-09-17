import CSS from "../fixtures/Css.json" with { type: "json" };

class usercolPage {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('usercolPage: globalThis.page is not available');
        }
    }

    async Bar_Options(baroption) {
        if (baroption == "Overview") {
            await this.page.locator(CSS.overview_option).click()
            await this.page.locator(CSS.cash_discount).click()
        } else if (baroption == "To-Dos") {
            await this.page.locator(CSS.todos).click()
            const follow = await this.page.locator(`:text("FOLLOW-UPS")`).count()
            if (follow > 0) {
                await this.page.locator(CSS.followUp).click()
            } else {
                await this.page.locator(CSS.approveOpt).click()
            }
        } else if (baroption == "Manage") {
            await this.page.locator(CSS.manage_bar).click()
            const claimsExists = await this.page.locator(`:text("CLAIMS")`).count()
            if (claimsExists > 0) {
                await this.page.locator(CSS.claims).click()
            }
        }
    }

    async tableOptions() {
        const msg = await this.page.locator(CSS.tableOptions).textContent() || ''
        if (msg === 'USER') throw new Error('tableOptions equals USER')
    }

    async globalSearchClaim(claimNo) {
        await this.page.locator(CSS.globalSearch).fill(claimNo)
        await this.page.locator(`:text("${claimNo}")`).click()
    }

    async claimDetailsPage() {
        const message = await this.page.locator(CSS.ClaimDetailTitle).textContent() || ''
        if (message !== 'Claim Details') throw new Error('claimDetailsPage title mismatch')
    }

    async UserIdExist() {
        const allText = await this.page.locator(CSS.UserIDExist).textContent() || ''
        if (allText === 'USER') throw new Error('UserIdExist equals USER')
    }

    async change_status() {
        await this.page.waitForTimeout(3000)
        await this.page.locator(CSS.backArrrow).click()
        const enabled = await this.page.locator(CSS.ChangeStatusBtn).isEnabled().catch(() => false)
        if (enabled) {
            await this.page.locator(CSS.ChangeStatusBtn).click()
        }
    }

    async verifyStatusBlock(claim) {
        const status = await this.page.locator(CSS.statusTitle).textContent() || ''
        if (status !== `Change Status - ${claim}`) throw new Error('verifyStatusBlock mismatch')
    }
}
export default usercolPage;