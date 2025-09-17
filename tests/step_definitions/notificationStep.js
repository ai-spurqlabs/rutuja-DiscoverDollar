import {
    When,
    Then,
} from '@cucumber/cucumber';

When('User cleares {string} filter', async function (filterName) {
    await this.notification.clearFilter(filterName);
});

When('user changes the status of a claim from {string} to {string}, {string} for claim approval, {string} as comment', async function (initial, final, mgr, cmnt) {
    await this.notification.change_status(initial, final, mgr, cmnt);
});

Then('user should receive a notification with {string} message', async function (msg) {
    await this.notification.verify_notification(msg);
});

When('the manager navigates to the notification view', async function () {
    await this.notification.nav_notification();
});

When('manager receives a notification with {string}', async function (msg) {
    await this.notification.mgr_successmsg(msg);
});

Then('the manager should be able to change the status of the claim to {string}, {string} as comment', async function (status, cmnt) {
    await this.notification.status(status, cmnt);
});

When('manager clicks on the claim approval request', async function () {
    await this.notification.approve_req();
});

When('{string} message is displayed', async function (msg) {
    await this.notification.verify_success_msg(msg);
});

When('the user applies the {string} filter, changes the status to {string}, selects the Reversal Type as {string}, adjusts the amount to {string} and adds a comment as {string}', async function (currentStatus, nextStatus, reversalType, adjustAmount, comment) {
    await this.notification.applyReversedFilter(currentStatus, nextStatus, reversalType, adjustAmount, comment);
});

When('User gets Adjust Amount data from {string}', async function (cell) {
    await this.claim.extractTax(cell);
});

Then('User verify Adjust Amount is {string}', async function (amount) {
    await this.claim.verifyTax(amount);
});

Then('User verifies claim value is displayed in first row is {string}', async function (verifyText) {
    await this.notification.verifyClaimValue(verifyText);
});

Then('User verify Adjust Amount is equal to Gross Amount', async function () {
    await this.notification.verifyAdjustEqualGrossAmount();
});