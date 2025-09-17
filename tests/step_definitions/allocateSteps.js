import { When, Then } from "@cucumber/cucumber";

When('filters the claims of {string}', async function (auditp) {
    await this.allocate.filter_claims(auditp);
});

When('clicks on {string} claim option', async function (icon) {
    await this.allocate.click_allocate(icon);
});

When('enters the username {string}', async function (username) {
    await this.allocate.enter_username(username);
});

When('allocates the claim', async function () {
    await this.allocate.allocate_claim();
});

When('success message {string} is displayed', async function (msg) {
    await this.allocate.verify_success(msg);
});

Then('the claim is successfully assigned to the user {string}', async function (userid) {
    await this.allocate.verify_allocate(userid);
});