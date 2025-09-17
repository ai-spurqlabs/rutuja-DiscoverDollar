import { When, Then } from "@cucumber/cucumber";

When('user navigates to cantire {string} view', async function (page) {
    await this.claimDetails.claimNavigation(page);
});

When('user navigates to {string} view', async function (page) {
    await this.claimDetails.navigation(page);
});

When('clicks on the claim number', { timeout: 30000 }, async function () {
    await this.addrefdoc.click_claim();
});

Then('the claim details view should be displayed', async function () {
    await this.claimDetails.verify_claimdetailspage();
});

When('select a claim number row', async function () {
    await this.claimDetails.claim_details();
});

Then('the claim details displayed in the page is same as in claim details view', async function () {
    await this.claimDetails.verify_claimdetails();
});

When('user clicks on comments icon in claim details view', async function () {
    await this.claimDetails.click_comment();
});

When('the comments view is displayed', async function () {
    await this.claimDetails.verify_comments_view();
});

When('user enters a comment {string} in the comment section', async function (comment) {
    await this.claimDetails.enter_comment(comment);
});

When('the {string} is displayed in the comments view', async function (comment) {
    await this.claimDetails.verify_comment(comment);
});

When('user clicks on the delete comment icon', async function () {
    await this.claimDetails.click_delete();
});

Then('the comment should be deleted successfully with {string}', async function (message) {
    await this.claimDetails.verify_successmsg(message);
});

When('user applies {string} filter', async function (claimType) {
    await this.claimDetails.applyClaimTypeFilter(claimType);
});

When('user clicks on line items button', async function () {
    await this.claimDetails.clickLineItemsButton();
});

Then('the {string} field should be displayed in the line items view', async function (fieldName) {
    await this.claimDetails.verifyFieldInLineItemsView(fieldName);
});
