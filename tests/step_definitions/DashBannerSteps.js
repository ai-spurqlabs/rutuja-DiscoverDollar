import { When, Then } from '@cucumber/cucumber';

When('user see {string} on dashboard', async function (option) {
    await this.dashBannerPage.dashboard_page(option);
});

When('user taps on banner', async function () {
    await this.dashBannerPage.tap_banner();
});

Then('user see following {string} under banner tab', async function (banner) {
    await this.dashBannerPage.all_banners(banner);
});

When('user taps on {string}', async function (opt) {
    await this.dashBannerPage.select_option(opt);
});

When('user check total value of All claims', async function () {
    await this.dashBannerPage.AllClaims_Total();
});

When('user check total value of Banner', async function () {
    await this.dashBannerPage.Banner_Total();
});

Then('user verifies both total values are same', async function () {
    await this.dashBannerPage.verify_values();
});

When('User apply {string} filter and {string} filter for all claims', async function (banner, adtPrd) {
    await this.dashBannerPage.ApplyFilters(banner, adtPrd);
});

When('user captures title and totalValue of each banner', async function () {
    await this.dashBannerPage.verify_Title_Total_AC();
});

Then('user verifies Title & Total of All claims and Banner', async function () {
    await this.dashBannerPage.verifyTitleAndBanner();
});

When('user taps on banner for {string}', async function (option) {
    await this.dashBannerPage.selectBannerValues(option);
    await this.dashBannerPage.verify_Title_Total_Banner();
});

