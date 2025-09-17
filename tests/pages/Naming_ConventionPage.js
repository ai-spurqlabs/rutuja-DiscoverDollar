import CSS from "../fixtures/Css.json" with { type: "json" };

class NamePage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('NamePage: globalThis.page is not available');
    }
  }

  async download(option) {
    await this.page.locator(CSS.actionButton).nth(1).click();
    await this.page.locator(CSS.menu).locator(`:text("${option}")`).click();
  }

  async verifyFile() {
    const peoplesoftID = process.env.PeoplesoftID || global.PeoplesoftID;
    const locationNo = process.env.LocationNo || global.LocationNo;
    const claimNo = process.env.GenClaim || global.GenClaim;
    const expectedFileName = `${peoplesoftID}_${locationNo}_${claimNo}.csv`;
    // TODO: implement Playwright download verification using page.waitForEvent('download') in the step that triggers the download
    // For now, throw a descriptive error so runner-side implementation is not overlooked
    throw new Error(`verifyFile not implemented: expected ${expectedFileName} - replace with Playwright download helper`);
  }
}

export default NamePage;
