import { When, Then } from "@cucumber/cucumber";

When("User Navigate to Add menu", async function () {
  await this.bulkClaim.add();
});

When("Select upload bulk Claim menu", async function () {
  await this.bulkClaim.selectbulk();
});

When("Select Audit Period {string}", async function (Text) {
  await this.bulkClaim.selectaudit(Text);
});

When("Select Claim type {string}", async function (Text) {
  await this.bulkClaim.selectclaimType(Text);
});

When("Uploads File {string}", async function (Text) {
  await this.bulkClaim.uploadFile(Text);
});

When("Clicks on Submit Button", async function () {
  await this.bulkClaim.submitClaim();
});

When(
  "Verify Claims are processed and generated with process status {string}",
  async function (Text) {
    await this.bulkClaim.verifyclaimGenerate(Text);
  }
);

Then("verify if application display error message {string}", async function (Text) {
  await this.bulkClaim.Toast(Text);
});

Then("Submit Button is disable", async function () {
  await this.bulkClaim.disable();
});

Then("User verify error message {string}", async function (Text) {
  await this.bulkClaim.verifyerror(Text);
});

Then("User Click on Download icon and file gets download", async function () {
  await this.bulkClaim.download();
});

When("User waits till status is {string}", async function (Text) {
  await this.bulkClaim.verifybadge(Text);
});

When(
  "User Export Claim Data and extract claim number from {string}",
  async function (cell) {
    await this.bulkClaim.exportandExtract(cell);
  }
);

When("User applies claim number filter", { timeout: 30000 }, async function () {
  await this.bulkClaim.applyclaimNumber();
});

When("User gets tax amount data from {string}", async function (cell) {
  await this.bulkClaim.extractTax(cell);
});

Then("User verify tax amount is {string}", async function (amount) {
  await this.bulkClaim.verifyTax(amount);
});

When("User clicks on export", async function () {
  await this.bulkClaim.clickExport();
});

When("User gets Net Deducted amount data from {string}", async function (cell) {
  await this.bulkClaim.extractTax(cell);
});

Then("User verify Net Deducted amount is {string}", async function (amount) {
  await this.bulkClaim.verifyTax(amount);
});
