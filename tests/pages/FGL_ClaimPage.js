import CSS from "../fixtures/Css.json" with { type: "json" };

class ClaimPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('ClaimPage: globalThis.page is not available');
    }
  }

  async Add_plus() {
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.Add_button).click();
  }

  async claim_option() {
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.claim_option).click();
  }

  async Select_claim_type(claim_type) {
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.Claim_Type).selectOption({ label: claim_type }).catch(() => {});
    // preserve prior behavior: store selected claim type
    global.claimType = claim_type;
  }

  async vendor_rebate_form(
    VenName,
    VenNum,
    pplsoft,
    grsAmt,
    netAmt,
    claimDesc,
    loc,
    Text
  ) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.banner).click();
    await this.page.locator(`:text("FGL")`).click();

    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.Audit_period).click();
    await this.page.locator(CSS.Audit_period_option).click();

    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.Audit_Year).click();
    await this.page.locator(CSS.Audit_Year_option).click();

    await this.page.locator(CSS.vendor_name_fgl).fill(VenName);
    await this.page.locator(CSS.vendor_number_fgl).fill(VenNum);
    await this.page.locator(CSS.peoplesoft_id).fill(pplsoft + Math.floor(Math.random() * 90 + 10));

    await this.page.locator(CSS.VAD_prefix).click();
    await this.page.locator(CSS.VAD_prefix_option).click();

    await this.page.locator(CSS.currency).click();
    await this.page.locator(CSS.currency_option).click();

    await this.page.locator(CSS.gross_amount).fill(grsAmt);
    await this.page.locator(CSS.net_amount).fill(netAmt);
    await this.page.locator(CSS.claim_description).fill(claimDesc);
    if ((global.claimType || '') === "Vendor Rebate") {
      await this.page.locator(CSS.Location).fill(loc);
    }
    // File upload: attempt setInputFiles; original used drag-n-drop attachFile
    try {
      await this.page.locator(CSS.browseOptionToUploadFile).setInputFiles(Text);
    } catch (e) {
      // fallback: try input[type=file]
      await this.page.setInputFiles('input[type="file"]', Text).catch(() => {});
    }
    await this.page.waitForTimeout(25000);
    await this.page.locator(CSS.preview_btn).click();
  }

  async verify_message(message) {
    await this.page.waitForTimeout(2000);
    const txt = await this.page.locator(CSS.ClaimIdText).textContent() || '';
    if (!txt.includes(message)) throw new Error('verify_message mismatch');
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.Submit_Btn).click();
  }
}
export default ClaimPage;
