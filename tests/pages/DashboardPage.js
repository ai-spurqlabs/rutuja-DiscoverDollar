globalThis.val1 = 0
globalThis.allTotal = 0
globalThis.amount
globalThis.lastPageNo
import CSS from "../fixtures/Css.json" with { type: "json" };

class DashboardPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('DashboardPage: globalThis.page is not available');
    }
  }

  async overview(tab) {
    global.allTotal = 0
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.Navaiagte).click()
    await this.page.waitForTimeout(7000)
    if (tab == "ALL CLAIMS") {
      await this.page.locator(CSS.DashboardTab).locator(`:text("${tab}")`).click()
      await this.page.locator(CSS.bannerDropdown).click()
    } else if (tab == "Banner") {
      await this.page.locator(CSS.pageHeader).locator(CSS.options).click()
    }
  }

  sumOfValues_table1() {
    if (global.amount !== global.allTotal.toFixed(1)) throw new Error('sumOfValues_table1 mismatch')
  }

  async Calculate() {
    await this.page.waitForTimeout(5000)
    // Check if first row exists
    const firstRowCount = await this.page.locator(CSS.firstRow).count().catch(() => 0)
    if (firstRowCount > 0) {
      const paginatorCount = await this.page.locator(CSS.paginator).count().catch(() => 0)
      if (paginatorCount > 0) {
        const lastPageArrow = await this.page.locator(CSS.lastPageArrow)
        const enabled = await lastPageArrow.isEnabled().catch(() => false)
        if (enabled) {
          for (let i = 1; i <= global.lastPageNo; i++) {
            await this.page.locator(CSS.pageNumber).locator(`:text("${i}")`).click()
            const count = await this.page.locator(CSS.amount).count()
            for (let index1 = 0; index1 < count; index1++) {
              const amountHandle = this.page.locator(CSS.amount).nth(index1)
              await amountHandle.scrollIntoViewIfNeeded()
              await this.page.waitForTimeout(500)
              const amountText = await amountHandle.textContent() || ''
              let v = amountText.replace('CA$', '').replace(/,/g, '')
              global.allTotal = global.allTotal + parseFloat(v || 0)
            }
          }
        } else {
          const count = await this.page.locator(CSS.amount).count()
          for (let index1 = 0; index1 < count; index1++) {
            const amountText = await this.page.locator(CSS.amount).nth(index1).textContent() || ''
            await this.page.waitForTimeout(500)
            let v = amountText.replace('CA$', '').replace(/,/g, '')
            global.allTotal = global.allTotal + parseFloat(v || 0)
          }
        }
      } else {
        const count = await this.page.locator(CSS.amount).count()
        for (let index1 = 0; index1 < count; index1++) {
          const amountText = await this.page.locator(CSS.amount).nth(index1).textContent() || ''
          await this.page.waitForTimeout(500)
          let v = amountText.replace('CA$', '').replace(/,/g, '')
          global.allTotal = global.allTotal + parseFloat(v || 0)
        }
      }
    } else {
      // No data found
    }
  }

  async applyFilter(banner, auditPeriod) {
    // logging
    if (banner == "CTR") {
      await this.page.locator(CSS.bannerDropdownItems).locator(`:text("MARKS")`).click()
      await this.page.locator(CSS.bannerDropdownItems).locator(`:text("FGL")`).click()
    } else if (banner == "FGL") {
      await this.page.locator(CSS.bannerDropdownItems).locator(`:text("MARKS")`).click()
      await this.page.locator(CSS.bannerDropdownItems).locator(`:text("CTR")`).click()
    } else if (banner == "MARKS") {
      await this.page.locator(CSS.bannerDropdownItems).locator(`:text("FGL")`).click()
      await this.page.locator(CSS.bannerDropdownItems).locator(`:text("CTR")`).click()
    }
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.select_filetype).selectOption({ label: auditPeriod }).catch(() => {})
  }

  async getamountandclicks(row, column) {
    await this.page.waitForTimeout(10000)
    const selector = `.p-datatable-tbody > :nth-child(${row}) > :nth-child(${column})`
    const amtText = await this.page.locator(selector).textContent() || ''
    let dashboardAmount = amtText.replace('$', '').replace(/,/g, '')
    global.amount = parseFloat(dashboardAmount).toFixed(1)
    await this.page.locator(selector).click()
    await this.page.waitForTimeout(5000)
    const paginatorCount = await this.page.locator(CSS.paginator).count().catch(() => 0)
    if (paginatorCount > 0) {
      await this.page.locator(CSS.status_dropdown).click()
      await this.page.locator(CSS.dropdown_options).locator(`:text("50")`).click()
      await this.page.waitForTimeout(7000)
      const lastPageArrow = this.page.locator(CSS.lastPageArrow)
      if (await lastPageArrow.isEnabled().catch(() => false)) {
        await lastPageArrow.click()
        const textLastPage = await this.page.locator(CSS.pageNumber).last().textContent() || ''
        global.lastPageNo = textLastPage
        await this.page.locator(CSS.paginationfirst).click()
      }
    }
  }

  columnPresent(columnName) {
    return this.page.locator(CSS.pageHeader).waitFor({ state: 'visible', timeout: 25000 }).then(async () => {
      const text = await this.page.locator(CSS.pageHeader).textContent()
      if (!((text || '').includes(columnName))) throw new Error('column not present')
    })
  }

  async exportToExcel() {
    await this.page.locator(CSS.ExportToExcel).click()
  }

  async verifyDownload(fileName) {
    // TODO: implement Playwright download verification in the test step using page.waitForEvent('download')
  }

  async clickOnFullscreenView() {
    await this.page.locator(CSS.fullScreenView).click()
  }

  async applyFilterForBAnnerTab(banner, auditPeriod) {
    await this.page.locator(CSS.DashboardTab).locator(`:text("${banner}")`).click()
  }
}
export default DashboardPage;