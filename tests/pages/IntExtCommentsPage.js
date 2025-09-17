import fs from 'fs'
import path from 'path'
import CSS from "../fixtures/Css.json" with { type: "json" };

class IntExtCommentsPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('IntExtCommentsPage: globalThis.page is not available');
    }
  }

  async userlogin(account, jwt) {
    // Read JWT from fixture and set localStorage before navigation
    const jwtPath = path.join(process.cwd(), 'cypress', 'fixtures', jwt)
    const jwtToken = fs.readFileSync(jwtPath, 'utf8')
    await this.page.addInitScript((token) => {
      window.localStorage.setItem('jwtToken', token)
    }, jwtToken)
    await this.page.goto(process.env.Cantire_Stage_URL || '/')
  }

  async clickManage() {
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.ManageOption).click()
    await this.page.locator(CSS.ClaimOption).click()
  }

  async clickbucket(bucket) {
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.ToDoOption).click()
    await this.page.locator(`:text("${bucket}")`).click()
  }

  async selectClaimAR() {
    await this.page.waitForTimeout(3000)
    const txt = await this.page.locator(CSS.FirstClaim).textContent() || ''
    global.claimNo = txt.trim()
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.FirstClaim).click()
  }

  async selectClaimA() {
    await this.page.waitForTimeout(3000)
    const txt = await this.page.locator(CSS.FirstClaim).textContent() || ''
    global.claimNo = txt.trim()
    await this.page.locator(CSS.Claimfil).nth(0).click()
    await this.page.locator(CSS.SearchBox).fill(global.claimNo)
    await this.page.waitForTimeout(8000)
    await this.page.locator(CSS.SearchRes).locator(`:text("${global.claimNo}")`).click()
    await this.page.locator(CSS.FirstClaim).click()
  }

  async clickComment() {
    await this.page.waitForTimeout(3000)
    await this.page.locator(CSS.CommentOpt).click()
  }

  async verifyComment(verify, equality) {
    await this.page.waitForTimeout(5000)
    const len = await this.page.locator(CSS.NoOfComments).count()
    const selector = `#comments-view > div:nth-child(${len}) > div > div > span`
    const txt = await this.page.locator(selector).textContent() || ''
    await this.page.waitForTimeout(5000)
    if (equality == 'yes') {
      if (txt.trim() !== verify) throw new Error('verifyComment equality failed')
    } else {
      if (txt.trim() === verify) throw new Error('verifyComment inequality failed')
    }
  }

  async addComment(content) {
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.CommentInp).fill(content)
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.PostBtn).click()
    await this.page.waitForTimeout(5000)
  }

  async setVisibility(visibility) {
    await this.page.waitForTimeout(5000)
    await this.page.locator(CSS.Visibility).click()
    await this.page.waitForTimeout(5000)
    await this.page.locator(`:text("${visibility}")`).click()
    await this.page.waitForTimeout(5000)
  }
}

export default IntExtCommentsPage
