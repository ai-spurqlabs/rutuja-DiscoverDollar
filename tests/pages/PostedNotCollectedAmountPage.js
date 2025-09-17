import CSS from "../fixtures/Css.json" with { type: "json" };

class PostedNotCollectedAmountPage {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('PostedNotCollectedAmountPage: globalThis.page is not available');
        }
    }

    async extractgross_amount(cell) {
        // TODO: replace cy.task('readDataxlsx') with a Node helper to read XLSX and populate global or process.env
        // Example: global.grossAmount = await helper.readDataxlsx(cell)
    }

    compare_postedNotcollected_grossamount() {
        const grossamt = global.grossAmount || process.env.grossAmount
        const posted_not_collected = global.taxamount || process.env.taxamount
        if (grossamt !== posted_not_collected) throw new Error('gross amount mismatch')
    }

    async totalNetDeductedAmount(totalNetDeductedA) {
        const text = await this.page.locator(CSS.totalNetdeductedAmount).textContent() || ''
        if (!text.includes(totalNetDeductedA)) throw new Error('totalNetDeductedAmount mismatch')
    }
}

export default PostedNotCollectedAmountPage