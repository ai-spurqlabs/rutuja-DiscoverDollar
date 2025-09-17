import { Given, When, Then } from "@cucumber/cucumber";

When("User taps on {string} button", async function (Btn) {
    await this.vip.get_text();
    await this.vip.tap_button(Btn);
});

When("User taps on {string} option", async function (option) {
    await this.vip.tap_option(option);
});

When("User taps on claim number filter", async function () {
    await this.vip.select_filter();
    await this.vip.enter_ID();
});

Then("User verifies generated id in results", async function () {
    await this.vip.verify_claimID();
});

When("User taps on review option", async function () {
    await this.vip.tap_review();
});
