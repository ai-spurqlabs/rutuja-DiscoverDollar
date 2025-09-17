import CSS from "../fixtures/Css.json" with { type: "json" };
globalThis.AllClaims = null;

class CopyClaimNoPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('CopyClaimNoPage: globalThis.page is not available');
    }
  }

  async clickManage() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ManageOption).click();
  }

  async clickClaim() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ClaimOption).click();
  }

  async validateCopyList() {
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.CopyOption).click();
    await this.page.waitForTimeout(5000);
    const clno = (await this.page.locator(CSS.FirstClaim).textContent()) || '';
    const clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    // optional log
    if (clip !== clno.trim()) throw new Error(`Clipboard mismatch: expected ${clno.trim()} got ${clip}`);
  }

  async clickFirstClaim() {
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.FirstClaim).click();
  }

  async validateCopyDetails(bucket) {
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.CopyDetail1).click();
    await this.page.waitForTimeout(7000);
    const cl1 = (await this.page.locator(CSS.ClaimNoDetail1).textContent()) || '';
    let clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    if (clip !== cl1.trim()) throw new Error('Clipboard vs ClaimNoDetail1 mismatch');

    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.CopyDetail2).click();
    await this.page.waitForTimeout(5000);
    const cl2 = (await this.page.locator(CSS.ClaimNoDetail2).textContent()) || '';
    clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    if (clip !== cl2.trim()) throw new Error('Clipboard vs ClaimNoDetail2 mismatch');

    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.CopyClaimType).click();
    await this.page.waitForTimeout(5000);
    const ctype = (await this.page.locator(CSS.ClaimType).textContent()) || '';
    clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    if (clip !== ctype.trim()) throw new Error('Clipboard vs ClaimType mismatch');

    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.CopyVendorName).click();
    await this.page.waitForTimeout(5000);
    const vname = (await this.page.locator(CSS.VendorName1).textContent()) || '';
    clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    if (clip !== vname.trim()) throw new Error('Clipboard vs VendorName mismatch');

    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.CopyVendorNumber).click();
    await this.page.waitForTimeout(5000);
    const vnum = (await this.page.locator(CSS.VendorNumber).textContent()) || '';
    clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    if (clip !== vnum.trim()) throw new Error('Clipboard vs VendorNumber mismatch');

    if (bucket === 'MANAGE') {
      await this.page.waitForTimeout(5000);
      await this.page.locator(CSS.CopyAmount_Mng).click();
      await this.page.waitForTimeout(5000);
      const amt = (await this.page.locator(CSS.Amount_Mng).textContent()) || '';
      clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
      // original code used an unclear cy.wrap/alias; keep simple containment check
      if (!amt.includes(clip)) throw new Error('Amount clip does not match Amount_Mng');
    } else {
      await this.page.waitForTimeout(5000);
      await this.page.locator(CSS.CopyAmount).click();
      await this.page.waitForTimeout(5000);
      const amt = (await this.page.locator(CSS.Amount).textContent()) || '';
      clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
      if (clip !== amt.trim()) throw new Error('Amount clip mismatch');
    }
  }

  async clickTodo() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ToDoOption).click();
  }

  async clickBucket(bucket) {
    await this.page.waitForTimeout(5000);
    if (bucket === 'RESOLVE') {
      await this.page.locator(CSS.ResolveBtn).click();
    } else {
      await this.page.locator(`:text("${bucket}")`).click({ force: true });
    }
    await this.page.waitForTimeout(7000);
  }

  async clickReview(reviews) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(`:text("${reviews}")`).click();
    await this.page.waitForTimeout(7000);
  }

  async clickChangeStatus() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.ChangeStatusFirstClaim).first().click();
    // ignore page uncaught exceptions by default in Playwright
    await this.page.waitForTimeout(7000);
  }

  async VerifyCopyCS() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.CopyClaimNoCS).click();
    await this.page.waitForTimeout(5000);
    const cl = (await this.page.locator(CSS.ClaimNoCS).textContent()) || '';
    const clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    if (!cl.trim().includes(clip)) throw new Error('VerifyCopyCS: clipboard not contained in ClaimNoCS');
  }

  async FilterStatus(status) {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.StatusFil).scrollIntoViewIfNeeded().click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.StatusInp).fill(status);
    await this.page.waitForTimeout(7000);
    await this.page.locator(CSS.Status_opt).click();
  }

  async SelectMultiple() {
    await this.page.waitForTimeout(10000);
    await this.page.locator(CSS.Claim1).click();
    // additional selections left commented intentionally
  }

  async VerifyCopyBulk() {
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.copy1).click();
    await this.page.waitForTimeout(5000);
    const clno = (await this.page.locator(CSS.claimBSC1).textContent()) || '';
    const clip = await this.page.evaluate(async () => await navigator.clipboard.readText());
    globalThis.AllClaims = clno.trim() + '\r' + '\n';
    if (clip !== clno.trim()) throw new Error('VerifyCopyBulk: clipboard mismatch for claimBSC1');
    await this.page.waitForTimeout(5000);
    await this.page.waitForTimeout(5000);
    await this.page.locator(CSS.copyall3).click();
    await this.page.waitForTimeout(5000);
    const clipAll = await this.page.evaluate(async () => await navigator.clipboard.readText());
    if (!clipAll.includes(globalThis.AllClaims)) throw new Error('VerifyCopyBulk: clipboard does not contain AllClaims');
  }
}

export default CopyClaimNoPage
