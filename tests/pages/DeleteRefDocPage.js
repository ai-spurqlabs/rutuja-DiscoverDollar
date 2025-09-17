globalThis.claim = null;
import CSS from "../fixtures/Css.json" with { type: "json" };

class DeleteRefDoc {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('DeleteRefDoc: globalThis.page is not available');
    }
  }

  async navToPage(Page) {
    // ignore uncaught exceptions is test runner concern
    await this.page.waitForTimeout(5000);
    if (Page == "MANAGE") {
      await this.page.locator(CSS.Manage).click();
      await this.page.locator(CSS.Claims_button).click();
      await this.page.waitForTimeout(5000);
    } else {
      await this.page.waitForTimeout(10000);
      await this.page.locator(CSS.left_nav_menu).click();
      await this.page.locator(CSS.ToDoOptions).locator(`:text("${Page}")`).click();
      await this.page.waitForTimeout(5000);
    }
  }

  async clickonclaimnumber() {
    const el = this.page.locator(CSS.claimNumbers).nth(1)
    const claimno = await el.textContent() || ''
    global.claim = claimno
    await this.page.waitForTimeout(5000)
    await el.click()
    await this.page.waitForTimeout(5000)
  }

  async selectfiletype(fileType) {
    await this.page.waitForTimeout(7000)
    const headerText = await this.page.locator(CSS.selectfiletype).textContent() || ''
    if (!headerText.includes(fileType)) throw new Error('fileType not present')
    await this.page.locator(CSS.select_filetype).nth(1).selectOption({ label: fileType }).catch(() => {})
    await this.page.locator(CSS.submit_filetype).click().catch(() => {})
    await this.page.waitForTimeout(2000)
  }

  async addpopup(file, addMsg) {
    const sm = await this.page.locator(CSS.success_message).textContent() || ''
    if (!sm.includes(addMsg)) throw new Error('add message not found')
    await this.page.locator(CSS.uploaded_refdoc).scrollIntoViewIfNeeded()
    const uploaded = await this.page.locator(CSS.uploaded_refdoc).textContent() || ''
    if (!uploaded.includes(file)) throw new Error('uploaded file not listed')
  }

  async clickonClose() {
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.closeBt).click()
  }

  async searchforclaimnumber() {
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.ClaimNo_filter).click()
    await this.page.locator(CSS.ClaimNO_filter_search).fill(global.claim)
    await this.page.waitForTimeout(10000)
    await this.page.locator(CSS.filter_options).nth(0).locator(`:text("${global.claim.trim()}")`).click()
    await this.page.waitForTimeout(7000)
    await this.page.locator(CSS.first_claimNum).click()
  }

  async clickonDeleteicon(file) {
    await this.page.waitForTimeout(7000)
    const rows = await this.page.locator(CSS.rowsPath).count()
    // tableContent children start at index 2 in original; adapt by iterating rows
    for (let i = 0; i < rows; i++) {
      const cell = this.page.locator(`.tableContent > :nth-child(${i + 2}) > :nth-child(2)`)
      const aa = (await cell.textContent() || '').trim()
      if (aa === file.trim()) {
        await this.page.locator(`.tableContent > :nth-child(${i + 2}) > :nth-child(5)`).click()
        await this.page.locator(CSS.conformDelYes).click({ timeout: 50000 })
      }
    }
  }

  async deleltepopup(file, delMsg) {
    await this.page.waitForTimeout(5000)
    const uploaded = await this.page.locator(CSS.uploaded_refdoc).textContent() || ''
    if (uploaded.includes(file)) throw new Error('file still present after delete')
    await this.page.waitForTimeout(3000)
  }
}

export default DeleteRefDoc;
