import CSS from "../fixtures/Css.json" with { type: "json" };

class AddExternalPage {
  constructor() {
    // Use the global page directly
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('AddExternalPage: globalThis.page is not available; ensure hooks set it before using this page object');
    }
  }

  async changeStatusAndAddExternalComment(preStatus, nextStatus, approval, comment) {
    const body = await this.page.locator(CSS.EntirePage);
    if (await this.page.locator(CSS.appliedFilter).count() >= 1) {
      const appliedFilterCSS = await this.page.locator(CSS.appliedFilter);
      if ((await appliedFilterCSS.textContent()).includes(CSS.statusText)) {
        const statusFilter = this.page.locator(CSS.appliedFilter).filter({ hasText: CSS.statusText });
        await statusFilter.locator(CSS.crossManage).scrollIntoViewIfNeeded();
        await statusFilter.locator(CSS.crossManage).click();
        await this.page.waitForTimeout(3000);
      }
    }

    await this.page.waitForTimeout(3000);
    const statusColumn = this.page.locator(CSS.statusColumn).filter({ hasText: CSS.statusText });
    await statusColumn.locator(CSS.filterIcon).scrollIntoViewIfNeeded();
    await statusColumn.locator(CSS.filterIcon).click();

    await this.page.locator(CSS.filter_criteria).clear();
    await this.page.locator(CSS.filter_criteria).fill(preStatus);
    await this.page.waitForTimeout(1000);
    await this.page.locator(CSS.filter_options).filter({ hasText: preStatus }).click();
    await this.page.waitForTimeout(2000);

    const claimNoText = await this.page.locator(CSS.claim_no).textContent();
    process.env.claimNo = claimNoText.trim();

    const vendorNameText = await this.page.locator(CSS.vendor_name).textContent();
    process.env.VendorName = vendorNameText.trim();

    const auditPeriodText = await this.page.locator(CSS.audit_period).textContent();
    process.env.AuditPeriod = auditPeriodText.trim();

    const claimTypeText = await this.page.locator(CSS.claim_type).textContent();
    process.env.ClaimType = claimTypeText.trim();

    await this.page.locator(CSS.change_status1).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(CSS.changestatus).first().click();
    await this.page.locator(CSS.dropdown_options).filter({ hasText: nextStatus }).click();

    if (approval != "") {
      await this.page.waitForTimeout(1000);
      await this.page.locator(CSS.searchApprover).fill(approval);
      await this.page.locator(`span.dd-sub-heading-two:has-text("${approval}")`).click({ force: true });
    }

    // Click the button with icon "pi pi-angle-down" inside the comment visibility section
    await this.page.locator('button.p-button-icon-only .pi.pi-angle-down').click();

    await this.page.locator(CSS.menuList).filter({ hasText: "EXTERNALLY VISIBLE" }).click();

    if (comment.includes("@")) {
      await this.page.locator(CSS.status_comment).fill(comment, { delay: 100 });
      await this.page.locator(CSS.mentionSuggestionDropDown).filter({ hasText: comment.replace(/@/g, "") }).click();
    } else {
      await this.page.locator(CSS.status_comment).fill(comment);
    }

    await this.page.waitForTimeout(1000);
    await this.page.getByText(CSS.submitbuttonText).click();
    await this.page.waitForTimeout(5000);
  }

  async clickHistory() {
    await this.page.locator(CSS.history).click();
  }

  async verifyComment(comment) {
    await this.page.locator(CSS.readMore).filter({ hasText: "Read More" }).click();
    await this.page.locator(CSS.verifyComment).filter({ hasText: comment });
  }
}

export default AddExternalPage;
