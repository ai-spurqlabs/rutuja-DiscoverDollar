import CSS from "../fixtures/Css.json" with { type: "json" };

class CancellationAmountPage {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('CancellationAmountPage: globalThis.page is not available');
        }
    }

    async fetch_reportingamount() {
        const text = await this.page.locator(CSS.reporting_amount).textContent();
        const reporting_amount = parseFloat(text.replace(/[^\d.-]/g, ""));
        const tax = Number(process.env.taxamount || NaN);
        if (reporting_amount !== tax) throw new Error(`Reporting amount ${reporting_amount} !== expected ${tax}`);
    }
}

export default CancellationAmountPage;