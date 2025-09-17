import { When, Then } from "@cucumber/cucumber";

When('User navigates to {string} page', async function (Page) {
    await this.deleteRefDoc.navToPage(Page);
});

When('User click on claim number', async function () {
    await this.deleteRefDoc.clickonclaimnumber();
});

When('User select file type as {string}', async function (fileType) {
    await this.deleteRefDoc.selectfiletype(fileType);
});

Then('User get add pop up as {string} and {string}', async function (file, addMsg) {
    await this.deleteRefDoc.addpopup(file, addMsg);
});

When('User click on Close', async function () {
    await this.deleteRefDoc.clickonClose();
});

When('User search for claim number and click on claim number', async function () {
    await this.deleteRefDoc.searchforclaimnumber();
});

When('user click on Delete icon {string}', async function (file) {
    await this.deleteRefDoc.clickonDeleteicon(file);
});

Then('User get delelte pop up as {string} and {string}', async function (file, delMsg) {
    await this.deleteRefDoc.deleltepopup(file, delMsg);
});