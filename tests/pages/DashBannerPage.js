import CSS from "../fixtures/Css.json" with { type: "json" };

class DashBannerPage {
  constructor() {
    this.page = globalThis.page;
    if (!this.page) {
      throw new Error('DashBannerPage: globalThis.page is not available');
    }
  }

  async dashboard_page(option) {
    if (option === "MY CLAIMS") {
      const text = await this.page.locator(CSS.MyClaims).textContent();
      if ((text || '').trim() !== option) throw new Error('dashboard_page MY CLAIMS mismatch');
    } else if (option === "ALL CLAIMS") {
      const text = await this.page.locator(CSS.All_Claims).textContent();
      if ((text || '').trim() !== option) throw new Error('dashboard_page ALL CLAIMS mismatch');
    } else if (option === "Banner") {
      const text = await this.page.locator(CSS.BannerOption).textContent();
      if ((text || '').trim() !== option) throw new Error('dashboard_page Banner mismatch');
    }
  }

  async all_banners(banner) {
    if (banner === "CTR") {
      if (!await this.page.locator(CSS.CTR_option).isVisible()) throw new Error('CTR option missing');
    } else if (banner === "FGL") {
      if (!await this.page.locator(CSS.FGL_option).isVisible()) throw new Error('FGL option missing');
    } else if (banner === "MARKS") {
      if (!await this.page.locator(CSS.MarksOption).isVisible()) throw new Error('MARKS option missing');
    } else if (banner === "TOTAL") {
      if (!await this.page.locator(CSS.TotalOption).isVisible()) throw new Error('TOTAL option missing');
    }
  }

  async tap_banner() {
    await this.page.locator(CSS.BannerOption).click();
  }

  async select_option(opt) {
    if (opt === "ALL CLAIMS") {
      await this.page.locator(CSS.allClaimsOption).click();
      await this.page.waitForTimeout(10000);
    }
  }

  async AllClaims_Total() {
    const row = await this.page.locator(CSS.allClaimsTotal).textContent();
    const fetchArr = JSON.stringify((row || '').split(" "));
    const final_str = fetchArr.substring(23, 197);
    global.final_str = final_str;
  }

  async Banner_Total() {
    await this.page.locator(CSS.BannerOption).click();
    await this.page.locator(`:text("TOTAL")`).click();
    await this.page.locator(CSS.finalView).scrollIntoViewIfNeeded();
    const text = await this.page.locator(CSS.BannerText).textContent();
    const newSplitArray = JSON.stringify((text || '').split(" "));
    const final_str_banner = newSplitArray.substring(4, 178);
    global.final_str_banner = final_str_banner;
  }

  verify_values() {
    if (global.final_str !== global.final_str_banner) throw new Error('verify_values mismatch');
  }

  async ApplyFilters(banner, adtPrd) {
    await this.page.locator(CSS.bannerDropdown).click();
    if (banner === "CTR") {
      await this.page.locator(CSS.FGL_Opt).click();
      await this.page.locator(CSS.Mrks_Opt).click();
    } else if (banner === "FGL") {
      await this.page.locator(CSS.CTR_Opt).click();
      await this.page.locator(CSS.Mrks_Opt).click();
    } else if (banner === "MARKS") {
      await this.page.locator(CSS.CTR_Opt).click();
      await this.page.locator(CSS.FGL_Opt).click();
    }
    await this.page.locator(CSS.ApplyButton).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(CSS.select_filetype).selectOption({ label: adtPrd }).catch(() => {});
  }

  async verify_Title_Total_AC() {
    const titleRow = await this.page.locator(CSS.Titles).textContent();
    global.titlesAC = (titleRow || '').substring(7);
    await this.page.locator(CSS.Bottom_Line).scrollIntoViewIfNeeded();
    const TotalValue = await this.page.locator(CSS.totalValue).textContent();
    global.TotalAC = (TotalValue || '').substring(6).trim();
  }

  async verify_Title_Total_Banner() {
    const titleRowBanner = await this.page.locator(CSS.titleBanner).textContent();
    global.titlesBanner = (titleRowBanner || '');
    await this.page.locator(CSS.Bottom_Line).scrollIntoViewIfNeeded();
    const TotalValueBanner = await this.page.locator(CSS.totalBanner).textContent();
    global.TotalBanner = (TotalValueBanner || '').trim();
  }

  async selectBannerValues(option) {
    await this.page.locator(CSS.BannerOption).click();
    await this.page.waitForTimeout(2000);
    if (option === "CTR") {
      await this.page.waitForTimeout(5000);
    } else if (option === "FGL") {
      await this.page.locator(CSS.FGL_Banner).click();
      await this.page.waitForTimeout(5000);
    } else if (option === "MARKS") {
      await this.page.locator(CSS.MRKS_Banner).click();
      await this.page.waitForTimeout(5000);
    }
  }

  verifyTitleAndBanner() {
    if (global.titlesAC !== global.titlesBanner) throw new Error('titles mismatch');
    if (global.TotalAC !== global.TotalBanner) throw new Error('total mismatch');
  }
}
export default DashBannerPage;
