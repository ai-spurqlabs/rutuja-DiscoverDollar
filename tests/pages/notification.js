import CSS from "../fixtures/Css.json" with { type: "json" };

class notification {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('notification: globalThis.page is not available');
    }
  }

  async clearFilter(filterName) {
    const sections = await this.page.locator(CSS.filterSection).allTextContents();
    for (const text of sections) {
      if (text.includes(filterName)) {
        // find the element then click crossManage inside it
        const el = this.page.locator(CSS.filterSection).filter({ hasText: filterName }).first();
        await el.locator(CSS.crossManage).click();
      }
    }
  }

  async change_status(initial, final, mgr, cmnt) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.table).scrollTo('right');
    await this.page.locator(CSS.status_filter).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.status_filter).click();
    await this.page.locator(CSS.filter_criteria).fill(initial);
    await this.page.waitForTimeout(1000);
    await this.page.locator(CSS.filter_options).filter({ hasText: initial }).first().click();
    await this.page.waitForTimeout(2000);

    const claimText = await this.page.locator(CSS.claim_no).textContent();
    process.env.claimNo = claimText.trim();
    const vendor = await this.page.locator(CSS.vendor_name).textContent();
    process.env.VendorName = vendor.trim();
    const audit = await this.page.locator(CSS.audit_period).textContent();
    process.env.AuditPeriod = audit.trim();
    const claimType = await this.page.locator(CSS.claim_type).textContent();
    process.env.ClaimType = claimType.trim();

    await this.page.locator(CSS.change_status1).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.changestatus).nth(0).click();
    await this.page.locator(CSS.dropdown_options).filter({ hasText: final }).click();
    if (mgr !== "") {
      await this.page.waitForTimeout(1000);
      await this.page.locator(CSS.searchApprover).fill(mgr);
      await this.page.waitForTimeout(2000);
      await this.page.locator(`text=${mgr}`).click();
    }
    await this.page.locator(CSS.status_comment).fill(cmnt);
    await this.page.locator(CSS.submit_status).click();
  }

  async verify_notification(msg) {
    const t = await this.page.locator(CSS.notification_msg).textContent();
    if (!t.includes(msg)) throw new Error('Notification message mismatch');
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.notification).click();
    await this.page.locator('text=View all').click({ force: true });
    await this.page.locator(CSS.notification_link).click();
    await this.page.waitForTimeout(7000);
    const claim = await this.page.locator(CSS.claim_num).textContent();
    if (!process.env.claimNo.includes(claim.trim())) throw new Error('ClaimNo mismatch in notification');
    const aud = await this.page.locator(CSS.Audt_period).textContent();
    if (!process.env.AuditPeriod.includes(aud)) throw new Error('AuditPeriod mismatch');
    const vend = await this.page.locator(CSS.vend_name).textContent();
    if (!process.env.VendorName.includes(vend)) throw new Error('VendorName mismatch');
    const ctype = await this.page.locator(CSS.claim_type).textContent();
    if (!process.env.ClaimType.includes(ctype.trim())) throw new Error('ClaimType mismatch');
  }

  async nav_notification() {
    await this.page.locator(CSS.notification).click();
    await this.page.waitForTimeout(4000);
    await this.page.locator('text=View all').click({ force: true });
  }

  async verify_notif_msg(msg) {
    const t = await this.page.locator(CSS.notif_msg).textContent();
    if (!t.includes(msg)) throw new Error('Notification message mismatch');
  }

  async status(status, cmnt) {
    await this.page.locator(CSS.change_status_icon).nth(0).click();
    await this.page.locator(CSS.status_dropdown).click();
    await this.page.locator(`text=${status}`).click();
    await this.page.locator(CSS.comments_text).fill(cmnt);
    await this.page.locator(CSS.submit_status).click();
  }

  async approve_req() {
    await this.page.locator(CSS.approve_req).click();
    await this.page.waitForTimeout(3000);
    await this.clearFilter("AUDIT PERIOD ");
    const claim = await this.page.locator(CSS.claim_num).textContent();
    if (!process.env.claimNo.includes(claim.trim())) throw new Error('ClaimNo mismatch in approve_req');
  }

  async verify_success_msg(msg) {
    const t = await this.page.locator(CSS.successMsgAlert).textContent();
    if (!t.includes(msg)) throw new Error('Success message mismatch');
    await this.page.waitForTimeout(8000);
  }

  async mgr_successmsg(msg) {
    await this.page.waitForTimeout(8000);
    const t = await this.page.locator(CSS.notif_msg).textContent();
    if (!t.includes(msg)) throw new Error('Manager success message mismatch');
  }

  async applyReversedFilter(currentStatus, nextStatus, reversalType, adjustAmount, comment) {
    const bodyText = await this.page.locator(CSS.EntirePage).textContent();
    if (bodyText.includes(CSS.statusText)) {
      await this.page.locator(CSS.appliedFilter).filter({ hasText: CSS.statusText }).locator(CSS.crossManage).click();
      await this.page.waitForTimeout(3000);
    }

    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.statusColumn).filter({ hasText: CSS.statusText }).locator(CSS.filterIcon).click();
    await this.page.locator(CSS.filter_criteria).fill(currentStatus);
    await this.page.waitForTimeout(1000);
    await this.page.locator(CSS.filter_options).filter({ hasText: currentStatus }).click();
    await this.page.waitForTimeout(2000);

    const claim = await this.page.locator(CSS.claim_no).textContent();
    process.env.claimNo = claim;

    const gross = await this.page.locator(CSS.amountColumn).textContent();
    process.env.grossAmount = gross;

    await this.page.locator(CSS.change_status1).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(CSS.changestatus).nth(0).click();
    await this.page.locator(CSS.dropdown_options).filter({ hasText: nextStatus }).click();
    await this.page.locator(CSS.reversalType).click();
    await this.page.locator(CSS.dropdown_options).filter({ hasText: reversalType }).click();

    if (adjustAmount !== "") {
      await this.page.waitForTimeout(1000);
      await this.page.locator(CSS.adjustAmountTextBox).fill(adjustAmount);
    }

    await this.page.locator(CSS.status_comment).fill(comment);
    await this.page.waitForTimeout(1000);
    await this.page.locator(CSS.submitbuttonText).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyClaimValue(verifyText) {
    const t = await this.page.locator(CSS.firstRowColumns).textContent();
    if (!t.includes(verifyText)) throw new Error('Claim value mismatch');
  }

  async verifyAdjustEqualGrossAmount() {
    const actualValue = parseFloat((process.env.grossAmount || '').replace(/[, ]/g, ''));
    if (!((process.env.taxamount || '').toString().includes(actualValue.toString()))) throw new Error('Adjust amount not equal to gross amount');
  }
}

export default notification;
