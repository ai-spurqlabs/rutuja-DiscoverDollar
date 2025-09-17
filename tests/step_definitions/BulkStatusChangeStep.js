import { When, Then } from "@cucumber/cucumber";

When('user navigate to {string} bucket', async function (bucket) {
    await this.home.navigateToDoBuckets(bucket);
});

When('user select multiple claims', async function () {
    await this.review.selectAllClaims();
});

When('user click on action menu and select bulk status change', async function () {
    await this.review.selectBulkStatusChange();
});

When('user click on actions menu and select bulk status change', async function () {
    await this.bulkStatusChange.selectBulkStatusChange();
});

When('user select status {string}, assignee {string} and add comment {string}', async function (status, assignee, comment) {
    await this.bulkStatusChange.selectStatusAndAssignee(status, assignee, comment);
});

Then('verify bulk status change is successful', async function () {
    await this.bulkStatusChange.verifyStatusChange1();
});

Then('verify Submit button is disable', async function () {
    await this.bulkStatusChange.verifySubmitButton();
});

When('user apply USER filter {string}', async function (user) {
    await this.review.applyUserFilter(user);
});

When('user select valid status {string}, assignee {string} and add comment {string}', async function (status, assignee, comment) {
    await this.bulkStatusChange.selectValidStatusAndAssignee(status, assignee, comment);
});

When('user apply status {string} filter for {string}', async function (status, bucket) {
    await this.review.applyStatusFilter(status, bucket);
});

When('user navigate to manage claims', async function () {
    await this.home.navigateToManageClaims();
});

When('user copy claim No from {string} and write it into csv file {string}', async function (row, cellID1) {
    await this.bulkStatusChange.copyClaimNo(row, cellID1);
});

When('user click on {string}', async function (BulkStatusChangeType) {
    await this.bulkStatusChange.clickOnBulkStatusChangeType(BulkStatusChangeType);
});

When('user type next status as {string} and click on {string}', async function (nextStatus, dropdownStatus) {
    await this.bulkStatusChange.typeNextStatus(nextStatus, dropdownStatus);
});

Then('user verify pervious and next status as {string}', async function (changeStatusFromTo) {
    await this.bulkStatusChange.verifyPerviousAndNextStatusAs(changeStatusFromTo);
});

When('user type assignee as {string}', async function (assignee) {
    if (assignee != "") {
        await this.bulkStatusChange.assigneeName(assignee);
    }
});

When('user type comment as {string}', async function (comment) {
    await this.bulkStatusChange.addComment(comment);
});

When('click on update button', async function () {
    await this.bulkStatusChange.clickUpdate();
});

Then('user verify status as {string}', async function (RPstatus) {
    await this.bulkStatusChange.verifyStatusChange(RPstatus);
});

When('user change Claim Number from {string} at {string} cell', async function (fileName, cellId) {
    await this.bulkStatusChange.changeClaimNumberFromXLSX(fileName, cellId);
});

When('user select Audit Period as {string}', async function (auditPeriod) {
    await this.bulkStatusChange.selectAuditPeriod(auditPeriod);
});

When('User applies a status filter, changes the status from {string} to {string} sends {string} for approval, and leaves the comment as {string}', async function (preStatus, nextStatus, approval, comment) {
    await this.bulkStatusChange.changeStatusAddComment(preStatus, nextStatus, approval, comment);
});

When('user insert {string} file as Comment', async function (filename) {
    await this.bulkStatusChange.insertCommentFile(filename);
});

Then('user verify image is present in comment chat', async function () {
    await this.bulkStatusChange.verifyImageIsPresentInCommentChat();
});

When('user add comment as {string} with Rich Text Formatting options', async function (commentText) {
    await this.bulkStatusChange.addCommentWithRichTextFormattingOptions(commentText);
});

Then('user verifies comment as {string} with Rich Text Formatting in comment chat', async function (verifyCommentText) {
    await this.bulkStatusChange.verifyCommentWithRichTextFormattingInCommentChat(verifyCommentText);
});

When('user click on {string} button', async function (buttonName) {
    await this.bulkStatusChange.clickOnButton(buttonName);
});