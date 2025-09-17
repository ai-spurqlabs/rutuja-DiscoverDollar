import CSS from "../fixtures/Css.json" with { type: "json" };

class exp_pdf {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('exp_pdf: globalThis.page is not available');
    }
  }

  async click_exp_pdf(name) {
    await this.page.locator(CSS.actions_icon).click();
    await this.page.locator(`text=${name}`).click();
    await this.page.waitForTimeout(3000);
  }

  async click_download_pdf() {
    await this.page.locator(CSS.options_icon).nth(1).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.download_pdf).click();
  }
}

export default exp_pdf