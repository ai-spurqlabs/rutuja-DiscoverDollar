import { When, Then } from "@cucumber/cucumber";

When('User clicks on overview and click on {string}', async function (tab) {
  await this.dashboard.overview(tab);
});

When('User get amount form each claim', async function () {
  await this.dashboard.Calculate();
});

Then('User verifies that overview amount and all claim total amount is same', async function () {
  await this.dashboard.sumOfValues_table1();
});

When('User apply {string} filter and {string} filter', async function (banner, auditPeriod) {
  await this.dashboard.applyFilter(banner, auditPeriod);
});

When('User get amount and clicks on {string} and {string}', async function (row, column) {
  await this.dashboard.getamountandclicks(row, column);
});

When('Verify that {string} Column is present', async function (columnName) {
  await this.dashboard.columnPresent(columnName);
});

When('Click on export to excel', async function () {
  await this.dashboard.exportToExcel();
});

Then('Verify that {string} file is downloaded', async function (fileName) {
  await this.dashboard.verifyDownload(fileName);
});

When('User click on fullscreen view', async function () {
  await this.dashboard.clickOnFullscreenView();
});

When('User apply {string} filter and {string} filter for banner tab', async function (banner, auditPeriod) {
  await this.dashboard.applyFilter(banner, auditPeriod);
});