import CSS from "../fixtures/Css.json" with { type: "json" };
let ClaimSubMissionDate;
let aging;

class ClaimAgingPage {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('ClaimAgingPage: globalThis.page is not available');
        }
    }

    async applyFilter(status) {
        await this.page.waitForTimeout(3000);
        const statusEl = this.page.locator(CSS.statusColumn).filter({ hasText: CSS.statusText });
        await statusEl.locator(CSS.filterIcon).scrollIntoViewIfNeeded();
        await statusEl.locator(CSS.filterIcon).click();
        await this.page.locator(CSS.filter_criteria).fill(status, { timeout: 25000 });
        await this.page.locator(CSS.filter_options).filter({ hasText: status }).click({ timeout: 25000 });
    }

    async exportXlsx() {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.exportDropdown).click({ timeout: 25000 });
        await this.page.locator(CSS.exportDropdownList).filter({ hasText: 'Claims' }).click({ timeout: 25000 });
        await this.page.waitForTimeout(5000);
    }

    async agingData(cell1, cell2) {
        await this.page.waitForTimeout(10000);
        // TODO: replace Cypress task with Node-side helper to read XLSX synchronously or via test setup
        // Placeholder: expect a global helper `readDataFromxlsx` available on process for now
        if (typeof process.readDataFromxlsx === 'function') {
            ClaimSubMissionDate = process.readDataFromxlsx(cell1);
            aging = process.readDataFromxlsx(cell2);
        } else {
            // leave values undefined; implement helper in test harness
        }
    }

    async verifyAging() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const todayDate = `${mm}/${dd}/${yyyy}`;

        const date1 = new Date(todayDate);
        const date2 = new Date(ClaimSubMissionDate);

        const dateDiff = date1.getTime() - date2.getTime();
        const DifferenceInDate = dateDiff / (1000 * 3600 * 24);

        if (Number(DifferenceInDate) !== Number(aging)) {
            throw new Error(`Aging mismatch: expected ${aging} got ${DifferenceInDate}`);
        }
    }
}

export default ClaimAgingPage