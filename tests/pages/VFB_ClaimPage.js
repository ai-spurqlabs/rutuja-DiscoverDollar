import CSS from "../fixtures/Css.json" with { type: "json" };

class VFB_ClaimPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('VFB_ClaimPage: globalThis.page is not available');
    }
  }

  async enterLine1(AudPd, banner, claimBatch, claimPre) {
    await this.page.waitForTimeout(4000);
    await this.page.locator(CSS.AuditPeriod_VFB).click();
    await this.page.locator(`:text("${AudPd}")`).click();

    await this.page.locator(CSS.Banner_VFB).click();
    await this.page.locator(`:text("${banner}")`).click();

    await this.page.locator(CSS.ClaimBatch_VFB).fill(claimBatch);

    await this.page.locator(CSS.ClaimPrefix_VFB).click();
    await this.page.locator(`:text("${claimPre}")`).click();
  }

  async enterLine2(cbm, curr, venNum, venName) {
    await this.page.locator(CSS.Cbm_VFB).fill(Math.floor(Math.random() * 900 + 100).toString());
    await this.page.locator(CSS.Currency_VFB).click();
    await this.page.locator(`:text("${curr}")`).click();
    await this.page.locator(`xpath=${CSS.VendorNumber_Xpath}`).fill(venNum);
    await this.page.locator(`xpath=${CSS.VendorName_Xpath}`).fill(venName);
  }

  async enterLine3(year, peopSoft, prog, claimcd) {
    await this.page.locator(CSS.Year_VFB).click();
    await this.page.locator(`:text("${year}")`).click();

    await this.page.locator(`xpath=${CSS.Peoplesoft_Xpath}`).fill(peopSoft + Math.floor(Math.random() * 90 + 10));
    await this.page.locator(CSS.ProgName_Xpath).nth(0).click();
    await this.page.locator(`:text("${prog}")`).click();
    await this.page.locator(CSS.ClaimCode).locator(`:text("${CSS.ClaimCodeText}")`).click();
    await this.page.locator(CSS.DealTypeList).locator(`:text("${claimcd}")`).click();
  }

  async enterLine4(prod, PoNo, Loaddate, Qtecost) {
    await this.page.waitForTimeout(2000);
    await this.page.locator(`xpath=${CSS.Product_Xpath}`).nth(0).fill(prod);

    await this.page.waitForTimeout(2000);
    await this.page.locator(`xpath=${CSS.PoNum_Xpath}`).fill(PoNo);
    await this.page.waitForTimeout(2000);
    await this.page.locator(`xpath=${CSS.Date_Xpath}`).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(`xpath=${CSS.Today_Date}`).click();

    await this.page.locator(`xpath=${CSS.QuoteCost_Xpath}`).fill(Qtecost);
  }

  async enterLine5(unt, expl, corrRate, AppRate) {
    await this.page.locator(`xpath=${CSS.Unt_Xpath}`).fill(unt);
    await this.page.locator(`xpath=${CSS.Expl_Xpath}`).fill(expl);
    await this.page.locator(`xpath=${CSS.CorrRate_Xpath}`).fill(corrRate);
    await this.page.locator(`xpath=${CSS.AppRate_Xpath}`).fill(AppRate);
  }

  async enterLine6(CorBill, BillAmt, claimAmt, desc) {
    await this.page.locator(`xpath=${CSS.CorrBill_Xpath}`).fill(CorBill);
    await this.page.locator(`xpath=${CSS.BillAmt_Xpath}`).fill(BillAmt);
    const claimHandle = this.page.locator(`xpath=${CSS.claimAmt_Xpath}`);
    await claimHandle.scrollIntoViewIfNeeded();
    await claimHandle.fill(claimAmt);
    await this.page.locator(`xpath=${CSS.Desc_Xpath}`).fill(desc);
  }

  async enterLine7(Perd, comment, src) {
    await this.page.locator(`xpath=${CSS.Period_Xpath}`).fill(Perd);
    await this.page.locator(`xpath=${CSS.Comment_Xpath}`).fill(comment);
    await this.page.locator(`xpath=${CSS.Source_Xpath}`).fill(src);
  }

  async selectClaim() {
    await this.page.locator(CSS.selectclaim_option).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(CSS.selectclaim_List).click();
  }
}
export default VFB_ClaimPage;
