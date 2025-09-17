import { When, Then } from "@cucumber/cucumber";

When("User applies a status filter, changes the status from {string} to {string} sends {string} for approval, and leaves the externel comment as {string}", { timeout: 60000 }, async function (preStatus, nextStatus, approval, comment) {
    await this.addExternal.changeStatusAndAddExternalComment(preStatus, nextStatus, approval, comment);
});



Then("User verifies comment added is {string}", {timeout:30000}, async function (comment) {
    await this.addExternal.verifyComment(comment);
});
