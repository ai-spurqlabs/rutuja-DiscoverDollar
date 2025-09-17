import CSS from "../fixtures/Css.json" with { type: "json" };

class Addrefdoc {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('Addrefdoc: globalThis.page is not available');
    }
  }

  async nav_review() {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.left_nav_menu).click();
    await this.page.locator(CSS.review).click();
  }

  async Clearappliedfilters() {
    await this.page.waitForTimeout(5000);
    const body1 = await this.page.locator("body");
    await this.page.waitForTimeout(3000);
    if (await this.page.locator(CSS.crossManage).isVisible()) {
      await this.page.locator(CSS.crossManage).first().click({ force: true });
    }
  }

  async Clearfilters() {
    await this.page.locator(CSS.crossManage).first().click();
    await this.page.waitForTimeout(5000);
    // const body1 = await this.page.locator("body");
    await this.page.waitForTimeout(3000);
    if (await this.page.locator(CSS.crossManage).isVisible()) {
      await this.page.locator(CSS.crossManage).first().click();
    }
  }

  async Clearsfilters() {
    await this.page.locator(CSS.crossManage).nth(1).click({ force: true });
    await this.page.waitForTimeout(5000);
    const body1 = await this.page.locator("body");
    await this.page.waitForTimeout(3000);
    if (await this.page.locator(CSS.crossManage).isVisible()) {
      await this.page.locator(CSS.crossManage).first().click({ force: true });
    }
  }

  async click_claim() {
    const claimno = await this.page.locator(CSS.first_claimNum).textContent();
    const claim = claimno;
    await this.page.locator(CSS.first_claimNum).click({ force: true });
  }

  async fileupload(file1, file2) {
    const $upload = await this.page.locator(CSS.refdoc_table);
    if (await $upload.locator(CSS.first_refdoc).count() > 0) {
      await this.page.locator(CSS.addnew_refdoc).click();
      await this.page.locator(CSS.upload_refdoc).setInputFiles([file1, file2]);
    } else {
      await this.page.locator(CSS.upload_refdoc).setInputFiles([file1, file2]);
    }
  }

  async upload_doc(file) {
    const $upload = await this.page.locator(CSS.refdoc_table);
    if (await $upload.locator(CSS.first_refdoc).count() > 0) {
      await this.page.locator(CSS.addnew_refdoc).click();
      await this.page.locator(CSS.upload_refdoc).setInputFiles(file);
    } else {
      await this.page.locator(CSS.upload_refdoc).setInputFiles(file);
    }
  }

  async select_filetype(filetype) {
    await this.page.locator(CSS.select_dropdown).waitFor({ state: 'visible' });
    await this.page.locator(CSS.select_filetype).nth(1).selectOption(filetype);
    await this.page.locator(CSS.submit_filetype).click();
  }

  async select_filetypes(filetype) {
    await this.page.locator(CSS.select_dropdown).waitFor({ state: 'visible' });
    await this.page.locator(CSS.select_filetype).nth(1).selectOption(filetype);
    await this.page.locator(CSS.select_filetype).nth(3).selectOption(filetype);
  }

  async selectVisibility(all, internal) {
    await this.page.locator(CSS.select_filetype).nth(2).selectOption(all);
    await this.page.locator(CSS.select_filetype).nth(4).selectOption(internal);
    await this.page.locator(CSS.submit_filetypes).click();
  }

  async verify_upload(file) {
    await this.page.locator(CSS.success_message).filter({ hasText: " Reference docs added successfully " });
    await this.page.locator(CSS.uploaded_refdoc).filter({ hasText: file });
  }

  async verify_uploadAll(file) {
    await this.page.locator(CSS.uploaded_refdoc).filter({ hasText: file });
  }

  async nav_resolve() {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.left_nav_menu).click();
    await this.page.locator(CSS.resolve).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.crossManage).first().click();
    await this.page.waitForTimeout(10000);
  }

  async nav_FollowUp() {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.left_nav_menu).click();
    await this.page.locator(CSS.followup).click();
    await this.page.waitForTimeout(10000);
  }

  async download_refdoc() {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.download_refdoc).first().click({ force: true });
  }

  async verify_download(msg) {
    await this.page.locator(CSS.download_toast).waitFor({ state: 'visible' });
    await this.page.locator(CSS.success_message).filter({ hasText: msg });
  }

  async logIn() {
    // Note: JWT login needs to be handled differently in Playwright
    // This might need custom implementation
    await this.page.goto(process.env.Cantire_Stage_URL + "/main/dashboard");
  }

  async searchClaim() {
    await this.page.locator(CSS.searchClaimNumber).fill(process.env.claim_number);
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.search_item).click();
  }

  async closeClaimDetails() {
    await this.page.locator(CSS.closeBt).click();
  }

  async nav_approve() {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.left_nav_menu).click();
    await this.page.locator(CSS.approve).click();
    await this.page.waitForTimeout(10000);
  }

  async applyclaimNumberFilter() {
    await this.page.locator(CSS.Claim_Number_Filter).click({ force: true });
    await this.page.locator(CSS.UserFilterSearch).clear();
    await this.page.locator(CSS.UserFilterSearch).fill(process.env.claim_number);
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.UserFilterResult).first().click();
  }

  async verifyFilename(fileName, indicator) {
    await this.page.locator("div").filter({ hasText: fileName }).filter({ hasText: indicator });
  }
}

export default Addrefdoc;
