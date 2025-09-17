import { When, Then } from "@cucumber/cucumber";

When('Manager navigates to {string} page', { timeout: 15000 }, async function (Page) {
    await this.claimCorrection.navToPage(Page);
});

When('Manager applies filters as {string} and {string}', async function (claimType, stat) {
    await this.claimCorrection.appliesfilters(claimType, stat);
});

When('Manager click on claim number', async function () {
    await this.claimCorrection.clickonclaimnumber();
});

When('Manager click on edit icon', async function () {
    await this.claimCorrection.editicon();
});

When('Manager click on download', async function () {
    await this.claimCorrection.clickondownload();
});

Then('Manager verify {string} and file present in download', async function (downMsg) {
    await this.claimCorrection.filepresent(downMsg);
});

When('Manager search for claim number', async function () {
    await this.claimCorrection.searchforclaimnumber();
});

When('Manager make correction as {string} and upload document', async function (correction) {
    await this.claimCorrection.Manageruploaddocument(correction);
});

Then('Manager verify the file upload {string} {string} {string} {string} {string}', async function (verifyMsg, change1, change1Cell, change2, change2Cell) {
    await this.claimCorrection.verifythefileupload(verifyMsg, change1, change1Cell, change2, change2Cell);
});

When('Manager click on view line items', async function () {
    await this.claimCorrection.clickonviewlineitems();
});

Then('Manager verify change as {string} {string} {string}', async function (claimType, change1, change2) {
    await this.claimCorrection.verifychangeas(claimType, change1, change2);
});

When('User change first claim to {string} and {string}', async function (statusA, comment) {
    await this.claimCorrection.changeStatus(statusA, comment);
});