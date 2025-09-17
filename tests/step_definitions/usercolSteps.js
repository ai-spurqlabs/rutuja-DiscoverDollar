import { Given, When, Then } from "@cucumber/cucumber";

When("User navigate to {string}", async function (baroption) {
  await this.usertable.Bar_Options(baroption);
});

Then("User checks visibility of usertable in table", async function () {
  await this.usertable.tableOptions();
});

When("User search for claim {string}", async function (claimNo) {
  await this.usertable.globalSearchClaim(claimNo);
});

When("User navigated to claim details page", async function () {
  await this.usertable.claimDetailsPage();
});

Then("verify userid is not available", async function () {
  await this.usertable.UserIdExist();
});

Then(
  "User go to table and change status for claim {string}",
  async function (claim) {
    await this.usertable.change_status();
    await this.usertable.verifyStatusBlock(claim);
  }
);
