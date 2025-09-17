import { When, Then } from "@cucumber/cucumber";

When('User gets Cancellation amount data from {string}', async function (cell) {
    await this.bulkClaim.extractTax(cell);
});

Then('User verify Cancellation amount is equal to reporting amount of claim', async function () {
    await this.cancellationAmount.fetch_reportingamount();
});