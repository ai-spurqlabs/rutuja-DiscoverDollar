import { When, Then } from "@cucumber/cucumber";

When('User apply filter of status as {string}', async function (status) {
    await this.claimAging.applyFilter(status);
});

When('User clicks on export and claims', async function () {
    await this.claimAging.exportXlsx();
});

When('User get aging data from {string} and {string} xlsx file', async function (cell1, cell2) {
    await this.claimAging.agingData(cell1, cell2);
});

Then('User verify aging is correct', async function () {
    await this.claimAging.verifyAging();
});

