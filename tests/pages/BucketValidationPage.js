import CSS from "../fixtures/Css.json" with { type: "json" };
import fs from 'fs';

class BucketValidationPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('BucketValidationPage: globalThis.page is not available');
    }
  }

  async LogintoAccount(account, jwtfile) {
    // read JWT from fixtures and set it into localStorage before navigation
    const jwtPath = `cypress/fixtures/${jwtfile}`;
    const jwtToken = fs.existsSync(jwtPath) ? fs.readFileSync(jwtPath, 'utf8') : '';
    if (jwtToken) {
      await this.page.addInitScript((token) => {
        window.localStorage.setItem('jwtToken', token);
      }, jwtToken);
    }
    await this.page.goto(process.env.Cantire_Stage_URL || 'about:blank');
  }

  async FindClaimInBucket(bucket, claimno) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ToDo).click();
    await this.page.locator(CSS.ToDoOptions).filter({ hasText: bucket }).click();
    await this.page.locator(CSS.ClaimnoFilter).nth(0).click();
    await this.page.locator(CSS.ClaimNO_filter_search).fill(claimno);
    await this.page.locator(`:text("${claimno.trim()}")`).click();
  }

  async ApplyFilterManage(bucket, user, stat) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.Manage).click();
    await this.page.locator(CSS.ToDoOptions).filter({ hasText: 'CLAIMS' }).click();
    await this.page.locator(CSS.UserFilterManage).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.UserFilterManage).click({ force: true });
    await this.page.locator(CSS.UserFilterSearch).fill(user);
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.UserFilterResult).nth(0).click();
    await this.page.locator(CSS.StatusFilterManage).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.StatusFilterManage).click({ force: true });
    await this.page.locator(CSS.UserFilterSearch).fill(stat);
    await this.page.waitForTimeout(25000);
    await this.page.locator(CSS.UserFilterResult).nth(0).click();
  }

  async ApplyFilter(bucket, user, stat) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ToDo).click();
    await this.page.locator(CSS.ToDoOptions).filter({ hasText: bucket }).click();
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.crossManage).nth(0).click();
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.crossManage).nth(0).click();
    await this.page.waitForTimeout(10000);
    // best-effort: attempt to close any extra crossManage buttons
    if (await this.page.locator(CSS.crossManage).isVisible()) {
      await this.page.locator(CSS.crossManage).nth(0).click();
      await this.page.waitForTimeout(10000);
    }
    await this.page.locator(CSS.UserFilter).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.UserFilter).click({ force: true });
    await this.page.locator(CSS.UserFilterSearch).fill(user);
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.UserFilterResult).nth(0).click();
    await this.page.locator(CSS.StatusFilter).scrollIntoViewIfNeeded();
    await this.page.locator(CSS.StatusFilter).click({ force: true });
    await this.page.locator(CSS.UserFilterSearch).fill(stat);
    await this.page.waitForTimeout(25000);
    await this.page.locator(CSS.UserFilterResult).nth(0).click();
  }

  async ChangeStatus(status, assignee, comment) {
    process.env.VerifyStatus = status;
    const selectedClaimText = await this.page.locator(CSS.SelectedClaimNo).textContent();
    process.env.SelectedClaim = selectedClaimText.trim();
    await this.page.locator(CSS.Checkbox).click();
    await this.page.locator(CSS.Changestatus).nth(0).click({ force: true });
    // ignore uncaught exceptions - Playwright will not fail on page exceptions by default
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.Statusdropdown).click();
    await this.page.locator(CSS.status).filter({ hasText: status }).click();
    await this.page.waitForTimeout(5000);
    if (
      status !== 'ReadyToSubmit' &&
      status !== 'CBMReview' &&
      status !== 'VendorReview' &&
      status !== 'NeedsCorrection'
    ) {
      await this.page.locator(CSS.Assignee_searchbox).fill(assignee);
      await this.page.locator(CSS.select_assignee).click();
    }
    await this.page.locator(CSS.Comment_text).fill(comment);
    await this.page.locator(CSS.submit_button).waitFor({ state: 'attached' });
    await this.page.locator(CSS.submit_button).click();
    await this.page.waitForTimeout(10000);
  }

  async VerifyBucket(target) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ToDo).click();
    await this.page.locator(CSS.ToDoOptions).filter({ hasText: target }).click();
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.crossManage).nth(0).click();
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.crossManage).nth(0).click();
    if (await this.page.locator(CSS.crossManage).isVisible()) {
      await this.page.locator(CSS.crossManage).nth(0).click();
      await this.page.waitForTimeout(10000);
    }

    if (target === 'RESOLVE') {
      await this.page.locator(CSS.crossManage).nth(0).click();
      await this.page.waitForTimeout(10000);
      await this.page.locator(CSS.UserFilterResolve).scrollIntoViewIfNeeded();
      await this.page.locator(CSS.UserFilterResolve).click({ force: true });
    } else {
      await this.page.locator(CSS.UserFilter).scrollIntoViewIfNeeded();
      await this.page.locator(CSS.UserFilter).click({ force: true });
    }
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.UserFilterClear).click();
    await this.page.locator(CSS.ClaimnoFilter).nth(0).click();
    await this.page.locator(CSS.ClaimNO_filter_search).fill(process.env.SelectedClaim || '');
    await this.page.waitForTimeout(30000);
    await this.page.locator(`:text("${(process.env.SelectedClaim || '').trim()}")`).click();
    await this.page.waitForTimeout(10000);
    const claimNumText = await this.page.locator(CSS.Claimnumber).textContent();
    if (claimNumText.trim() !== (process.env.SelectedClaim || '').trim()) {
      throw new Error('Claim number does not match SelectedClaim');
    }
    if (target === 'RESOLVE') {
      const verifyText = await this.page.locator(CSS.VerifyStatusResolve).textContent();
      if (verifyText.trim() !== (process.env.VerifyStatus || '').trim()) throw new Error('Status mismatch');
    } else {
      const verifyText = await this.page.locator(CSS.VerifyStatus).textContent();
      if (verifyText.trim() !== (process.env.VerifyStatus || '').trim()) throw new Error('Status mismatch');
    }
  }
}
export default BucketValidationPage
