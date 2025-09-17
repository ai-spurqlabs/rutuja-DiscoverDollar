import CSS from "../fixtures/Css.json" with { type: "json" };

class ClaimDetails {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('ClaimDetails: globalThis.page is not available');
    }
  }

  async claimNavigation(pageName) {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.left_nav_menu).click();
    await this.page.locator(CSS.To_do).filter({ hasText: pageName }).click();
    await this.page.waitForTimeout(7000);
    if (pageName !== 'APPROVE') {
      await this.page.locator(CSS.crossManage).nth(0).click();
      await this.page.locator(CSS.crossManage).nth(0).click();
    }
  }

  async navigation(pageName) {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.left_nav_menu).click();
    await this.page.locator(CSS.To_do).filter({ hasText: pageName }).click();
    await this.page.waitForTimeout(7000);
  }

  async verify_claimdetailspage() {
    await this.page.locator(CSS.claim_details_heading).waitFor({ state: 'visible' });
  }

  async claim_details() {
    await this.page.waitForTimeout(7000);
    const claimType = await this.page.locator(CSS.claim_type).textContent();
    process.env.ClaimType = claimType.trim();
    const vendor = await this.page.locator(CSS.vendor_name).textContent();
    process.env.VendorName = vendor.trim();
    const status = await this.page.locator(CSS.status1).textContent();
    process.env.Status = status.trim();
    const audit = await this.page.locator(CSS.audit_period).textContent();
    process.env.AuditPeriod = audit.trim();
    const claimNo = await this.page.locator(CSS.claim_no).textContent();
    process.env.claimNo = claimNo.trim();
    // optional log
  }

  async verify_claimdetails() {
    await this.page.waitForTimeout(7000);
    const claimNoCd = await this.page.locator(CSS.claim_no_cd).textContent();
    if (!process.env.claimNo.includes(claimNoCd.trim())) throw new Error('Claim number mismatch');
    const vend = await this.page.locator(CSS.vendor_name_cd).textContent();
    if (!process.env.VendorName.includes(vend.trim())) throw new Error('Vendor name mismatch');
    const ctype = await this.page.locator(CSS.claim_type_cd).textContent();
    if (!process.env.ClaimType.includes(ctype.trim())) throw new Error('Claim type mismatch');
    const aud = await this.page.locator(CSS.audit_period_cd).textContent();
    if (!process.env.AuditPeriod.includes(aud.trim())) throw new Error('Audit period mismatch');
    const st = await this.page.locator(CSS.status_cd).textContent();
    if (!process.env.Status.includes(st.trim())) throw new Error('Status mismatch');
  }

  async click_comment() {
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.comment_cd).click();
  }

  async verify_comments_view() {
    await this.page.locator(CSS.comments_view).waitFor({ state: 'visible' });
  }

  async enter_comment(comment) {
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.comment_input).fill(comment);
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.post_comment).click();
  }

  async verify_comment(comment) {
    const t = await this.page.locator(CSS.comments).textContent();
    if (!t.includes(comment)) throw new Error('Comment not found');
  }

  async click_delete() {
    await this.page.waitForTimeout(7000);
    const count = await this.page.locator(CSS.comments).count();
    const idx = count - 1;
    if (idx >= 0) {
      await this.page.locator(CSS.comments).nth(idx).locator('i.pi').click();
    }
  }

  async verify_successmsg(message) {
    await this.page.locator(CSS.successMsgAlert).waitFor({ state: 'visible' });
    const t = await this.page.locator(CSS.successMsgAlert).textContent();
    if (!t.includes(message)) throw new Error('Success message mismatch');
  }

  async applyClaimTypeFilter(claimType) {
    const th = this.page.locator(CSS.tableOptions).filter({ hasText: ' CLAIM TYPE ' }).first();
    await this.page.waitForTimeout(3000);
    await th.locator(CSS.filterbutton).first().click({ force: true });
    await this.page.locator(CSS.suggestions).last().fill(claimType);
    await this.page.waitForTimeout(2000);
    await this.page.locator(CSS.Pricing_select_option).first().click();
    await this.page.waitForTimeout(2000);
  }

  async clickLineItemsButton() {
    await this.page.locator(CSS.lineItemsButton).first().click();
    await this.page.waitForTimeout(2000);
  }

  async verifyFieldInLineItemsView(fieldName) {
    const text = await this.page.locator(CSS.lineitems).textContent();
    if (!text.includes(fieldName)) throw new Error('Field not found in line items view');
  }
}

export default ClaimDetails
