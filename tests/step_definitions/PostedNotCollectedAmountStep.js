import { When, Then } from "@cucumber/cucumber";

Then('User verify Posted Not collected amount is equal to Gross amount of claim', async function () {
    await this.postnotcoll.compare_postedNotcollected_grossamount();
});

When('User gets Posted Not collected amount data from {string}', async function (cell) {
    await this.claim.extractTax(cell);
});

When('User gets Gross amount data from {string}', async function (cell) {
    await this.postnotcoll.extractgross_amount(cell);
});

Then('Verify total net amount is displayed as {string}', async function (totalNetDeductedA) {
    await this.postnotcoll.totalNetDeductedAmount(totalNetDeductedA);
});



