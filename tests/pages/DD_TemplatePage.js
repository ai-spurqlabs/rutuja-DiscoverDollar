globalThis.unique_id = null
import CSS from "../fixtures/Css.json" with { type: "json" };

class DD_TemplatePage {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('DD_TemplatePage: globalThis.page is not available');
        }
    }

    async applyClaimTypeFilter(claimType) {
        await this.page.locator(CSS.claimType_fil).click()
        await this.page.locator(CSS.search_fil).fill(claimType)
        await this.page.waitForTimeout(3000)
        await this.page.locator(`:text("${claimType}")`).click()
        await this.page.waitForTimeout(5000)
    }

    async copy1stClaimNo() {
        const claimNoText = await this.page.locator(CSS.firstClaimNo).textContent() || ''
        // store for later steps; using global for compatibility with existing steps
        global.claim_number = claimNoText.trim()
    }

    async pasteCopiedClaimNo(fileName, cellNo) {
        // TODO: Implement node helper to update CSV in test runner. Original used cy.task('claimNumberCSV', obj)
        const obj = {
            par1: `cypress/fixtures/${fileName}`,
            par2: cellNo,
            par3: global.claim_number
        }
        // Example: await this.page.context()._options.request.post(...) or call a helper
        await this.page.waitForTimeout(10000)
    }

    async clickOnExportOption() {
        await this.page.locator(CSS.exportDropdown).click()
    }

    async clickOnDDtemplate(ddTemplate) {
        await this.page.locator(CSS.exportDropdownList).locator(`:text("${ddTemplate}")`).click()
    }

    async clickOnExportButton() {
        await this.page.locator(CSS.ExportButton).click()
    }

    async clickOnRequestStatus() {
        await this.page.locator(CSS.RequestStatusIcon).click()
    }

    async clickOnOutputFileIcon() {
        await this.page.locator(CSS.OutputFileIcon).first().click()
    }

    async clickOnLineItemsIcon() {
        await this.page.locator(CSS.ViewLineItems).click()
    }

    async getPathOfLatestDownloadedFile() {
        // TODO: replace cy.task('latestDownloadedFile') with runner helper that returns latest downloaded filename
        await this.page.waitForTimeout(3000)
        // e.g. global.fileName = await helper.latestDownloadedFile()
    }

    async unzipTheDownload() {
        // TODO: replace cy.task('unzipFile') with runner helper
        await this.page.waitForTimeout(3000)
        // e.g. global.excelName = await helper.unzipFile(global.fileName)
    }

    async verifyClaimFromXlsx(cellNo) {
        // TODO: replace cy.task('readClaimNoFromxlsx') with runner helper that reads XLSX
        await this.page.waitForTimeout(3000)
        // Example check (pseudo): assert.deepEqual(global.claim_number, xlsxClaimNo.trim())
    }
}

export default DD_TemplatePage
