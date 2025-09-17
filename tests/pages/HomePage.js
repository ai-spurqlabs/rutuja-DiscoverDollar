import CSS from "../fixtures/Css.json" with { type: "json" };

class HomePage {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('HomePage: globalThis.page is not available');
        }
    }

    async navigateToDoBuckets(bucket) {
        // Test-runner should handle uncaught exceptions globally
        await this.page.waitForTimeout(5000)
        await this.page.locator(CSS.ToDo).click()
        await this.page.locator(CSS.ToDoOptions).locator(`:text("${bucket}")`).click()
    }

    async navigateToManageClaims() {
        await this.page.waitForTimeout(5000)
        await this.page.locator(CSS.Manage).click()
        await this.page.locator(CSS.ToDoOptions).locator(`:text("CLAIMS")`).click()
    }
}

export default HomePage