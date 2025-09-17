import { When, Then } from "@cucumber/cucumber";

When("User navigates to Review page", async function () {
  await this.addrefdoc.nav_review();
});

When("User Clear applied filters", async function () {
  await this.addrefdoc.Clearappliedfilters();
});

When("User Clear filters", { timeout: 15000 }, async function () {
  await this.addrefdoc.Clearfilters();
});

When("User Clears all filters", async function () {
  await this.addrefdoc.Clearsfilters();
});

When("clicks on a claim number", async function () {
  await this.addrefdoc.click_claim();
});

When("The Audit Reviewer log in to the application for Review", async function () {
  await this.addrefdoc.logIn();
});

When("selects {string} as file type", async function (filetype) {
  await this.addrefdoc.select_filetype(filetype);
});

When("selects {string} as file type for both files", async function (filetype) {
  await this.addrefdoc.select_filetypes(filetype);
});

When(
  "select Visibility to {string} for one file and {string} for other",
  async function (all, internal) {
    await this.addrefdoc.selectVisibility(all, internal);
  }
);

When(
  "User uploads Files {string} and {string} as Reference document",
  async function (file1, file2) {
    await this.addrefdoc.fileupload(file1, file2);
  }
);

When("uploads {string} as reference document", async function (file) {
  await this.addrefdoc.upload_doc(file);
});

When(
  "the file name {string} should be displayed in the claim details view",
  async function (file) {
    await this.addrefdoc.verify_uploadAll(file);
  }
);

When("User navigates to the Resolve page", async function () {
  await this.addrefdoc.nav_resolve();
});

When("User navigates to the Approve page", async function () {
  await this.addrefdoc.nav_approve();
});

When("User navigates to the FollowUp page", async function () {
  await this.addrefdoc.nav_FollowUp();
});

When("user downloads the reference document", async function () {
  await this.addrefdoc.download_refdoc();
});

When("User applies the claim number filter", async function () {
  await this.addrefdoc.applyclaimNumberFilter();
});

Then(
  "the file should be downloaded successfully with {string} message",
  async function (msg) {
    await this.addrefdoc.verify_download(msg);
  }
);

When("User closes the claim details view", async function () {
  await this.addrefdoc.closeClaimDetails();
});

When("User type claim number and click on suggestion", async function () {
  await this.addrefdoc.searchClaim();
});

Then(
  "the file name {string} should be displayed in the claim details view with indicator {string}",
  async function (fileName, indicator) {
    await this.addrefdoc.verifyFilename(fileName, indicator);
  }
);