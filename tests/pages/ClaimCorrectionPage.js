globalThis.CSS3 = null;
globalThis.CSS4 = null;
import CSS from "../fixtures/Css.json" with { type: "json" };
let claim;

class claimCorrection {
  constructor() {
    // Use the global page directly
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('ClaimCorrectionPage: globalThis.page is not available; ensure hooks set it before using this page object');
    }
  }
  async navToPage(Page) {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle'); // Wait for page to fully load
    if (Page == "MANAGE") {
      await this.page.locator(CSS.Manage).waitFor({ state: 'visible', timeout: 10000 }); // Wait for element to be visible
      await this.page.locator(CSS.Manage).click();
      await this.page.locator(CSS.Claims_button).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator(CSS.Claims_button).click();
      await this.page.waitForLoadState('networkidle'); // Wait after navigation
    }
  }

  async appliesfilters(claimType, stat) {
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.status_fil).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.status_fil).click({ timeout: 25000 });
    await this.page.locator(CSS.search_fil).fill(stat);
    await this.page.waitForTimeout(4000);
    await this.page.locator(`text=${stat}`).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.claimType_fil).click({ timeout: 25000 });
    await this.page.locator(CSS.search_fil).fill(claimType);
    await this.page.waitForTimeout(7000);
    await this.page.locator(`text=${claimType}`).click();
    await this.page.waitForTimeout(5000);
  }

  async clickonclaimnumber() {
    const claimno = await this.page.locator(CSS.first_claimNum).first();
    claim = (await claimno.textContent()).trim();
    global.CSS3 = claim;
    await claimno.click({ timeout: 25000 });
    await this.page.waitForTimeout(7000);
  }

  async editicon() {
    await this.page.locator(CSS.edit_icon).click({ timeout: 25000 });
    await this.page.waitForTimeout(7000);
  }

  async clickondownload() {
    await this.page.locator(`text=${CSS.downloadLineItems}`).click();
  }

  async filepresent(downMsg) {
    await this.page.locator(CSS.success_message).waitFor({ timeout: 10000 });
    const msg = await this.page.locator(CSS.success_message).textContent();
    if (!msg.includes(downMsg)) throw new Error("Message not found");
    await this.page.waitForTimeout(5000);
    // Download verification logic to be implemented if needed
  }

  async searchforclaimnumber() {
    await this.page.locator(CSS.claimNo_fil).click({ timeout: 25000 });
    await this.page.locator(CSS.search_fil).fill(global.CSS3.trim());
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.filter_criteria).locator(`text=${global.CSS3.trim()}`).click();
    await this.page.waitForTimeout(5000);
  }

  async Manageruploaddocument(correction) {
    global.CSS4 = correction;
    // File creation logic to be implemented if needed
    await this.page.waitForTimeout(7000);
    const uploadTable = await this.page.locator(CSS.refdoc_table);
    const hasRefDoc = await uploadTable.locator(CSS.first_refdoc).count() > 0;
    if (hasRefDoc) {
      await this.page.locator(CSS.addnew_refdoc).click({ timeout: 25000 });
    }
    await this.page.locator(CSS.upload_file).setInputFiles(`cypress/downloads/${global.CSS3}_DataCorrection.csv`);
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.submit_bt).click({ timeout: 25000 });
  }

  async verifythefileupload(verifyMsg, change1, change1Cell, change2, change2Cell) {
    // File update logic to be implemented if needed
    await this.page.waitForTimeout(9000);
    await this.page.locator(CSS.upload_file).setInputFiles(`cypress/downloads/${global.CSS3.trim()}_DataCorrection.csv`);
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.submit_bt).click({ timeout: 25000 });
    await this.page.locator(CSS.toast).waitFor({ timeout: 25000 });
    const toastMsg = await this.page.locator(CSS.toast).textContent();
    if (!toastMsg.includes(verifyMsg)) throw new Error("Verification message not found");
  }

  async clickonviewlineitems() {
    await this.page.locator(CSS.view_LI).click({ timeout: 25000 });
  }

  async verifychangeas(claimType, change1, change2) {
    let change1Selector, change2Selector;
    if (claimType == "Over and Above") {
      change1Selector = CSS.overAndAboveChange1;
      change2Selector = CSS.overAndAboveChange2;
    } else if (claimType == "Pricing") {
      change1Selector = CSS.pricingChange1;
      change2Selector = CSS.pricingChange2;
    } else if (claimType == "Statement Audit") {
      change1Selector = CSS.StatementAuditChange1;
      change2Selector = CSS.StatementAuditChange2;
    } else if (claimType == "Stock Adjustment") {
      change1Selector = CSS.StockAdjustmentChange1;
      change2Selector = CSS.StockAdjustmentChange2;
    } else if (claimType == "Vendor Funds Billed") {
      change1Selector = CSS.VendorFundsBilledChange1;
      change2Selector = CSS.VendorFundsBilledChange2;
    }
    const val1 = (await this.page.locator(change1Selector).textContent()).trim();
    const val2 = (await this.page.locator(change2Selector).textContent()).trim();
    if (val1 !== change1) throw new Error("Change1 value mismatch");
    if (val2 !== change2) throw new Error("Change2 value mismatch");
  }

  async changeStatus(statusA, comment) {
    const selectedClaimNo = await this.page.locator(CSS.SelectedClaimNo).textContent();
    global.CSS3 = selectedClaimNo.trim();
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.Changestatus).first().click({ timeout: 60000 });
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.Statusdropdown).click({ timeout: 25000 });
    await this.page.locator(CSS.status).locator(`text=${statusA}`).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.Comment_text).fill(comment);
    const submitBtn = this.page.locator(CSS.submit_button);
    if (await submitBtn.isEnabled()) {
      await submitBtn.click();
    }
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.crossManage).first().click({ timeout: 100000 });
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ClaimNo_filter).click({ timeout: 25000 });
    await this.page.locator(CSS.ClaimNO_filter_search).fill(global.CSS3);
    await this.page.waitForTimeout(15000);
    await this.page.locator(CSS.filter_options).first().locator(`text=${global.CSS3.trim()}`).click();
    await this.page.waitForTimeout(7000);
    // Optionally click secondFilter if enabled
    const filterSection = this.page.locator(CSS.filtersection);
    const secondFilter = filterSection.locator(CSS.secondFilter);
    if (await secondFilter.count() > 0 && !(await secondFilter.isDisabled())) {
      await secondFilter.click();
    }
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.first_claimNum).click({ timeout: 25000 });
  }
}

export default claimCorrection;
