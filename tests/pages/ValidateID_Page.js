globalThis.claimID = null
import CSS from "../fixtures/Css.json" with { type: "json" };

class ValidateID_Page {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('ValidateID_Page: globalThis.page is not available');
    }
  }

  async get_text() {
    await this.page.waitForTimeout(7000)
    const text = await this.page.locator(CSS.generatedClaimId).nth(0).textContent() || ''
    globalThis.claimID = text
  }

  async verify_claimID() {
    await this.page.waitForTimeout(3000)
    const text = await this.page.locator(CSS.Resulted_claimID1).textContent() || ''
    const verify_id = text.trim()
    if (!globalThis.claimID.includes(verify_id)) throw new Error('claimID verification failed')
  }

  async tap_button(Btn) {
    await this.page.waitForTimeout(2000)
    await this.page.locator(`xpath=${CSS.tap_button_xpath}`).click()
  }

  async tap_option(option) {
    await this.page.waitForTimeout(3000)
    await this.page.locator(`xpath=${CSS.tap_option_xpath}`).click()
  }

  async tap_review() {
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.review_option).click()
  }

  async select_filter() {
    await this.page.waitForTimeout(7000)
    await this.page.locator(CSS.crossManage).nth(0).click()
    await this.page.waitForTimeout(10000)
    await this.page.locator(CSS.crossManage).nth(0).click()
    // best-effort to ensure element state
    await this.page.waitForTimeout(7000)
    await this.page.locator(CSS.select_filter).click()
  }

  async enter_ID() {
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.filter_criteria).fill(globalThis.claimID)
    await this.page.waitForTimeout(10000)
    await this.page.locator(CSS.filter_options).nth(0).click()
  }
}
export default ValidateID_Page
