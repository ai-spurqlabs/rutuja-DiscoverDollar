import { When, Then } from "@cucumber/cucumber";

When("user navigates to the {string}", async function (page) {
  await this.claimd.navigation(page);
});

When("user clicks on the options", async function () {
  await this.claimsh.click_options();
});

When("clicks on export claimsheet", async function () {
  await this.claimsh.click_exp_claimsh();
});

When("user uploads claimsheet for a claim", async function () {
  await this.claimsh.sel_claim();
});

When("selects the claim", async function () {
  await this.claimsh.filter_claim();
});

When("clicks on download claimsheet", async function () {
  await this.claimsh.click_download_claimsh();
});

When("user navigates to the Manage Claims page", async function () {
  await this.claimsh.nav_rev();
});
