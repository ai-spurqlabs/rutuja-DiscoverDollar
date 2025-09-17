import { Given, When, Then } from "@cucumber/cucumber";

When("User taps on Add option", async function () {
  await this.fglClaim.Add_plus();
});

When("User taps on claims option", async function () {
  await this.fglClaim.claim_option();
});

When("User select {string} from claim type", async function (claim_type) {
  await this.fglClaim.Select_claim_type(claim_type);
});

When(
  "User fills up claim info as {string} {string} {string} {string} {string} {string} {string} and upload {string}",
  async function (VenName, VenNum, pplsoft, grsAmt, netAmt, claimDesc, loc, Text) {
    await this.fglClaim.vendor_rebate_form(
      VenName,
      VenNum,
      pplsoft,
      grsAmt,
      netAmt,
      claimDesc,
      loc,
      Text
    );
  }
);

Then("User verifies {string} message on page", async function (message) {
  await this.fglClaim.verify_message(message);
});
