import CSS from "../fixtures/Css.json" with { type: "json" };

class Filter_Suggestion {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('Filter_Suggestion: globalThis.page is not available');
        }
    }

    async navToPage(Page) {
        await this.page.waitForTimeout(5000)
        if (Page == 'REVIEWS') {
            await this.page.waitForTimeout(10000)
            await this.page.locator(CSS.left_nav_menu).click()
            await this.page.locator(CSS.ToDoOptions).locator(`:text("${Page}")`).click()
            await this.page.waitForTimeout(5000)
        }
        if (Page == 'MANAGE') {
            await this.page.locator(CSS.Manage).click()
            await this.page.locator(CSS.Claims_button).click()
            await this.page.waitForTimeout(5000)
        }
    }

    async clickfiltericon(pageName, filter) {
        if (pageName == 'REVIEWS') {
            if (filter == 'claimType') {
                await this.page.locator(CSS.crossManage).nth(0).click()
                await this.page.waitForTimeout(5000)
                await this.page.locator(CSS.filter_Common_css).nth(1).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(1).click()
            }
            if (filter == 'status') {
                await this.page.locator(CSS.filter_Common_css).nth(7).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(7).click()
            }
            if (filter == 'auditPeriod') {
                await this.page.locator(CSS.filter_Common_css).nth(8).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(8).click()
            }
            if (filter == 'user') {
                await this.page.locator(CSS.filter_Common_css).nth(10).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(10).click()
            }
        }
        if (pageName == 'MANAGE') {
            if (filter == 'claimType') {
                await this.page.locator(CSS.filter_Common_css).nth(1).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(1).click()
            }
            if (filter == 'status') {
                await this.page.locator(CSS.filter_Common_css).nth(6).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(6).click()
            }
            if (filter == 'auditPeriod') {
                await this.page.locator(CSS.filter_Common_css).nth(7).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(7).click()
            }
            if (filter == 'user') {
                await this.page.locator(CSS.filter_Common_css).nth(9).scrollIntoViewIfNeeded()
                await this.page.locator(CSS.filter_Common_css).nth(9).click()
            }
        }
        await this.page.waitForTimeout(5000)
        await this.page.locator(CSS.search_fil).click()
        await this.page.waitForTimeout(5000)
    }

    async verifiesFilterSugg(filterOption, position) {
        const text = await this.page.locator('li[role="option"]').nth(position).textContent() || ''
        if (text.trim() !== filterOption) throw new Error('filter suggestion mismatch')
    }
}

export default Filter_Suggestion