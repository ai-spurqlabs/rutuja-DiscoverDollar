import CSS from "../fixtures/Css.json" with { type: "json" };

class CancelClaimPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('CancelClaimPage: globalThis.page is not available');
    }
  }

  async todo() {
    await this.page.locator(CSS.ToDo).click();
  }

  async Reviews() {
    await this.page.locator(CSS.review).click();
  }

  async Action_icon() {
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.actions_icon).click();
  }

  async cancel_claim_opt() {
    await this.page.locator(CSS.Cancel_claim_option).click();
  }

  async verify_message(message) {
    if (message == "claim cancelled successfully") {
      const t = await this.page.locator(CSS.toast).textContent();
      if (!t.includes(message)) throw new Error('Toast message mismatch');
    } else if (message == "0 Claims") {
      const t = await this.page.locator(CSS.claims_message).textContent();
      if (!t.includes(message)) throw new Error('Claims message mismatch');
    }
  }

  async tap_element(tap_ele) {
    await this.page.locator(`text=${tap_ele}`).click();
  }

  async select_filter() {
    await this.page.locator(CSS.Filter_icon).click();
    await this.page.locator(CSS.enter_value_sb).click();
    await this.page.locator(CSS.enter_value_sb).fill(process.env.claim_number || '');
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.filter_options).nth(0).click();
  }

  async manage_select_filter() {
    await this.page.locator(CSS.manage_filter).click();
    await this.page.locator(CSS.enter_mb_search).click();
    await this.page.locator(CSS.enter_mb_search).fill(process.env.claim_number || '');
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.filter_options).nth(0).click();
  }

  async Manage_Bucket() {
    await this.page.locator(CSS.manage).click();
  }

  async click_claims() {
    await this.page.locator(CSS.Claims_button).click();
    await this.page.waitForTimeout(5000);
  }

  async choose_filter(fil_icon, status) {
    if (fil_icon == "Status" && status == "InProgress") {
      const status_icon_filter = this.page.locator(CSS.Status_icon_filter);
      await status_icon_filter.scrollIntoViewIfNeeded();
      await status_icon_filter.click();
      await this.page.locator(CSS.enter_mb_search).fill(status);
      await this.page.waitForTimeout(10000);
      await this.page.locator(CSS.search_item).filter({ hasText: "InProgress" }).click();
    } else if (fil_icon == "User" && status == "qaauditor@discoverdollar.com") {
      await this.page.locator(CSS.table).scrollTo('right');
      const user_icon_filter = this.page.locator(CSS.User_icon_filter);
      await user_icon_filter.scrollIntoViewIfNeeded();
      await user_icon_filter.click();
      await this.page.locator(CSS.enter_mb_search).fill(status);
      await this.page.waitForTimeout(5000);
      await this.page.locator(CSS.sugg_option).nth(0).click({ force: true });
    }
  }

  async claim_number_read() {
    const text = await this.page.locator(CSS.Clm_no_vad).textContent();
    const claimNumber = text;
    process.env.claim_number = claimNumber;
    return claimNumber;
  }
}

export default CancelClaimPage;