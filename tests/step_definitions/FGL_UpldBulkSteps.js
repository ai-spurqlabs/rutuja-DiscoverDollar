import { Given, When, Then } from "@cucumber/cucumber";

When("User taps on upload claim option", async function () {
  await this.fglUploadBulk.UploadBulkClaim();
});

When("User select audit period", async function () {
  await this.fglUploadBulk.select_auditPeriod();
});

When("User select {string} claim type", async function (claim_type) {
  await this.fglUploadBulk.select_claimType(claim_type);
});

When("User upload claim file {string}", async function (Text) {
  await this.fglUploadBulk.upload_claimFile(Text);
});

When("User tap on submit button", async function () {
  await this.fglUploadBulk.submit_btn();
});

When("User verifies message {string}", async function (messsage) {
  await this.fglUploadBulk.verify_uploadedMessage(messsage);
});

Then("User verfies status as {string}", async function (msg) {
  await this.fglUploadBulk.verify_completed_message(msg);
});

When(
  "User create claim through upload bulk claim for {string} claim with file {string} and verifies {string} and {string}",
  async function (claim_type, Text, messsage, msg) {
    await this.fglUploadBulk.UploadBulkClaim();
    await this.fglUploadBulk.select_auditPeriod();
    if (claim_type == "Vendor Rebate") {
      await this.fglUploadBulk.select_claimType(claim_type);
    } else if (claim_type == "Vendor Funds Billed") {
      await this.vfbClaim.selectClaim(claim_type);
    }
    await this.fglUploadBulk.upload_claimFile(Text);
    await this.fglUploadBulk.submit_btn();
    await this.fglUploadBulk.verify_uploadedMessage(messsage);
    await this.fglUploadBulk.verify_completed_message(msg);
  }
);

When("User taps on download option", async function () {
  await this.fglUploadBulk.tap_download();
});

Then("User verifies {string} in download folder", async function (csv_file) {
  await this.fglUploadBulk.verify_downloaded_file(csv_file);
});
