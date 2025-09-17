import { When, Then } from "@cucumber/cucumber";

When('user clicks on Add Menu', async function () {
    await this.bulkClaimSheet.AddMenu();
});

When('Selects upload bulk Claim', async function () {
    await this.bulkClaimSheet.SelectBulkClaim();
});

When('Selects Upload Claimsheets', async function () {
    await this.bulkClaimSheet.SelectUploadCS();
});

When('Uploads Bulk Claimsheets {string}', async function (CSfile) {
    await this.bulkClaimSheet.UploadCS(CSfile);
});

When('Clicks Submit Button', async function () {
    await this.bulkClaimSheet.ClickSubmit();
});

Then('Verify message {string} is displayed', async function (msg) {
    await this.bulkClaimSheet.Verifymsg(msg);
});

When('Verify claimsheets are processed and generated with process status {string}', async function (Text) {
    await this.bulkClaimSheet.verifyclaimSheetGen(Text);
});

Then('Verify {string} is displayed', async function (msg) {
    await this.bulkClaimSheet.Verifystatus(msg);
});
  

