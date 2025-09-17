import { When, Then } from "@cucumber/cucumber";

When('user clicks Manage claim option', async function () {
    await this.copyClaimNo.clickManage();
});

When('user clicks Claim option', async function () {
    await this.copyClaimNo.clickClaim();
});

When('user validates copied claim number in first claim', async function () {
    await this.copyClaimNo.validateCopyList();
});

When('user clicks claim details view for the first claim', async function () {
    await this.copyClaimNo.clickFirstClaim();
});

Then('user validates copied claim number in details view {string}', async function (bucket) {
    await this.copyClaimNo.validateCopyDetails(bucket);
});

When('user clicks Todo option', async function () {
    await this.copyClaimNo.clickTodo();
});

When('user clicks {string}', async function (bucket) {
    await this.copyClaimNo.clickBucket(bucket);
});

When('user visits {string} bucket', async function (reviews) {
    await this.copyClaimNo.clickReview(reviews);
});

When('user clicks Change status option for first claim', async function () {
    await this.copyClaimNo.clickChangeStatus();
});

Then('user validates copied claim number in the Change status modal', async function () {
    await this.copyClaimNo.VerifyCopyCS();
});

When('user filters {string} status', async function (status) {
    await this.copyClaimNo.FilterStatus(status);
});

When('user selects multiple claims', async function () {
    await this.copyClaimNo.SelectMultiple();
});

Then('user verifies copied claim numbers', async function () {
    await this.copyClaimNo.VerifyCopyBulk();
});
