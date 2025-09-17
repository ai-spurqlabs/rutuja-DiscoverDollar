import { When, Then } from "@cucumber/cucumber";

When("user clicks on Add claim", async function () {
  await this.manualClaim.ManualPricingClaim();
});

When("user selects {string} claim type", async function (claimtype) {
  await this.manualClaim.SelectClaimType(claimtype);
});

Then("user types value for field and verifies error message:", async function (dataTable) {
  await this.manualClaim.newmanualclaim(dataTable);
});

When("user fills out the form with {string}", async function (form) {
  await this.manualClaim.EnterFormDetails(form);
});

When("user attaches the claim sheet {string}", async function (filename) {
  await this.manualClaim.AttachClaimSheet(filename);
});

When("user clicks the Preview button", async function () {
  await this.manualClaim.PreviewClaim();
});

When("user gets the generated claimno and clicks the submit button", async function () {
  await this.manualClaim.ClickSubmit();
});

Then("user verfies that the claim is generated in the review bucket", async function () {
  await this.manualClaim.VerifyClaim();
});

Then("user verfies that the message {string} is displayed", async function (msg) {
  await this.manualClaim.ClaimRequired(msg);
});

When("user fills out only mandatory fields with {string}", async function (form) {
  await this.manualClaim.EnterMandatoryFields(form);
});

Then("user verifies that the error messages are displayed", async function () {
  await this.manualClaim.Checkerrmsg();
});

Then("user verifies below errors are displayed", async function (datatable) {
  for (const element of datatable.hashes()) {
    await this.manualClaim.ValidateErrmsg(element.Error, element.Position);
  }
});

Then(
  "user verifies that the SA claim is generated in the review bucket",
  async function () {
    await this.manualClaim.VerifySAClaim();
  }
);

When(
  "user fills out only mandatory fields in Stock Adjustment form with {string}",
  async function (form) {
    await this.manualClaim.EnterMandatorySAFields(form);
  }
);

When("user fills partially Stock Adjustment form with {string}", async function (form) {
  await this.manualClaim.EnterPartialSAFields(form);
});

Then("user verifies that the error {string} is displayed", async function (mesg) {
  await this.manualClaim.VerifyFormValidationError(mesg);
});

Then(
  "user types {string} for {string} and verifies {string}",
  async function (val, field, msg) {
    await this.manualClaim.ValidateFields_SA(val, field, msg);
  }
);

Then("user verifies that PDF icon is Present", async function () {
  await this.manualClaim.PDFiconPresent();
});

When("user click on check box", async function () {
  await this.manualClaim.clickCheckBox();
});

//===================== Miscellaneous Claim Type ==========================
When(
  "user select Banner as {string} select claim type as {string} and fills data as {string}",
  async function (banner, claimType, form) {
    await this.manualClaim.MiscellaneousFormDetails(banner, claimType, form);
  }
);

When("user fills out {string} form with {string}", async function (claimtype, form) {
  await this.manualClaim.fillClaimDetails(claimtype, form);
});
