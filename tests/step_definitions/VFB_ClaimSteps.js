import { When, Then } from "@cucumber/cucumber";

When("line1 {string} {string} {string} {string}", async function (AudPd, banner, claimBatch, claimPre) {
    await this.vfbClaim.enterLine1(AudPd, banner, claimBatch, claimPre);
});

When('line2 {string} {string} {string} {string}', async function (cbm, curr, venNum, venName) {
    await this.vfbClaim.enterLine2(cbm, curr, venNum, venName);
});

When('line3 {string} {string} {string} {string}', async function (year, peopSoft, prog, claimcd) {
    await this.vfbClaim.enterLine3(year, peopSoft, prog, claimcd);
});

When('line4 {string} {string} {string} {string}', async function (prod, PoNo, Loaddate, Qtecost) {
    await this.vfbClaim.enterLine4(prod, PoNo, Loaddate, Qtecost);
});

When('line5 {string} {string} {string} {string}', async function (unt, expl, corrRate, AppRate) {
    await this.vfbClaim.enterLine5(unt, expl, corrRate, AppRate);
});

When('line6 {string} {string} {string} {string}', async function (CorBill, BillAmt, claimAmt, desc) {
    await this.vfbClaim.enterLine6(CorBill, BillAmt, claimAmt, desc);
});

When('line7 {string} {string} {string}', async function (Perd, comment, src) {
    await this.vfbClaim.enterLine7(Perd, comment, src);
});

When('User select Vendor Funds Billed claim', async function () {
    await this.vfbClaim.selectClaim();
});