import { Given, When, Then } from "@cucumber/cucumber";

When("user click on actions menu and select {string}", async function (option) {
    await this.name.download(option);
});

Then('user verifies the downloaded file name is in the format PeoplesoftID_LocationNo_ClaimNo', async function () {
    await this.name.verifyFile();
});