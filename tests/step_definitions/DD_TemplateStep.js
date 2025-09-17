import { When, Then } from "@cucumber/cucumber";

When('User apply claim type filter as {string}', async function (claimType) {
    await this.ddTemplate.applyClaimTypeFilter(claimType);
});

When('User copy 1st claim number', async function () {
    await this.ddTemplate.copy1stClaimNo();
});

When('User paste copied claim number to {string} file at cell no {string}', async function (fileName, cellNo) {
    await this.ddTemplate.pasteCopiedClaimNo(fileName, cellNo);
});

When('User clicks on Export option', async function () {
    await this.ddTemplate.clickOnExportOption();
});

When('User click on {string} option', async function (ddTemplate) {
    await this.ddTemplate.clickOnDDtemplate(ddTemplate);
});

When('User click on export button', async function () {
    await this.ddTemplate.clickOnExportButton();
});

When('User click on Request status icon', async function () {
    await this.ddTemplate.clickOnRequestStatus();
});

When('Click on output file icon', async function () {
    await this.ddTemplate.clickOnOutputFileIcon();
});

When('User click on line items icon', async function () {
    await this.ddTemplate.clickOnLineItemsIcon();
});

When('User unzipped the downloaded file', async function () {
    await this.ddTemplate.unzipTheDownload();
});

Then('User verifies that exported file contains same claim number in cell {string}', async function (cellNo) {
    await this.ddTemplate.verifyClaimFromXlsx(cellNo);
});

When('User gets the path of latest downloaded file', async function () {
    await this.ddTemplate.getPathOfLatestDownloadedFile();
});
