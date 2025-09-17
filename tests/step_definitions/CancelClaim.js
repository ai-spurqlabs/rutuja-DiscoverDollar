import { When, Then } from "@cucumber/cucumber";

When('User clicks on To-do', async function () {
    await this.cancelClaim.todo();
});

When('User clicks on Reviews', async function () {
    await this.cancelClaim.Reviews();
});

When('User clicks On Action', async function () {
    await this.cancelClaim.Action_icon();
});

When('User clicks on cancel claim', async function () {
    var Flag = await this.cancelClaim.claim_number_read();
    await this.cancelClaim.cancel_claim_opt();
});

Then('User verifies message as {string}', async function (message) {
    await this.cancelClaim.verify_message(message);
});

When('User clicks on {string}', async function (tap_ele) {
    await this.cancelClaim.tap_element(tap_ele);
});

When('User clicks on filter', async function () {
    await this.cancelClaim.select_filter();
});

When('User clicks on Manage bucket', async function () {
    await this.cancelClaim.Manage_Bucket();
});

When('User clicks on claims', async function () {
    await this.cancelClaim.click_claims();
});

When('User clicks on {string} filter icon and apply {string}', async function (fil_icon, status) {
    await this.cancelClaim.choose_filter(fil_icon, status);
});

When('User clicks on claim filter for manage bucket', async function () {
    await this.cancelClaim.manage_select_filter();
});

