import CSS from "../fixtures/Css.json" with { type: "json" };

class FGL_UpldBulkPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('FGL_UpldBulkPage: globalThis.page is not available');
    }
  }

  async UploadBulkClaim() {
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.UploadBulkClaim_Option).click();
  }

  async select_auditPeriod() {
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.select_auditPeriod_option).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(`xpath=${CSS.suggested_option}`).click();
  }

  async select_claimType(claim_type) {
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.select_claimType_option).click();
    await this.page.waitForTimeout(2000)
    await this.page.locator(CSS.vendor_rebate_option).click();
  }

  async upload_claimFile(Text) {
    await this.page.waitForTimeout(5000)
    try {
      await this.page.locator(CSS.browseOptionToUploadFile).setInputFiles(Text);
    } catch (e) {
      await this.page.setInputFiles('input[type="file"]', Text).catch(() => {});
    }
  }

  async submit_btn() {
    await this.page.waitForTimeout(10000);
    await this.page.locator(`:text("SUBMIT")`).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.Yes_Option).click();
  }

  async verify_uploadedMessage(messsage) {
    await this.page.waitForTimeout(1000)
    const displayMsg = await this.page.locator(CSS.toast_msg).textContent() || ''
    if (!displayMsg.includes(messsage)) throw new Error('uploadedMessage mismatch')
  }

  async verify_completed_message(msg) {
    const Msg = await this.page.locator(CSS.Status_InProgress).textContent() || ''
    if (!Msg.includes("INPROGRESS")) throw new Error('status not in progress')
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.Refresh_button).click();
    await this.page.waitForTimeout(7000);
    const Complete_Msg = await this.page.locator(CSS.Status_Completed).textContent() || ''
    if (Complete_Msg.trim() !== msg) throw new Error('completed message mismatch')
  }

  async tap_download() {
    await this.page.locator(`xpath=(//span[@class='p-button-icon pi pi-download'])[1]`).click();
  }

  async verify_downloaded_file(csv_file) {
    await this.page.waitForTimeout(5000)
    // TODO: replace with Playwright download validation using page.waitForEvent('download') in step
  }
}
export default FGL_UpldBulkPage;
