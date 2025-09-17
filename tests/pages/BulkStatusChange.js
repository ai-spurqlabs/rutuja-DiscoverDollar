import CSS from "../fixtures/Css.json" with { type: "json" };

class BulkStatusChange {
    constructor() {
        this.page = globalThis.page;
        if (!this.page) {
            throw new Error('BulkStatusChange: globalThis.page is not available');
        }
    }

    async selectBulkStatusChange() {
        await this.page.waitForTimeout(2000);
        await this.page.locator(CSS.actionMenu).click();
        await this.page.locator(CSS.bulkStatusChangeButton).click();
        // Note: Cypress uncaught:exception suppression should be handled in test runner configuration
    }

    async selectStatusAndAssignee(status, assignee, message) {
        const statusArr = ["ReadyToSubmit", "NeedsCorrection", "CTCApproved", "CTCDenied", "CBMReview", "VendorReview", "GoodClaimNotAccounted", "NeedsCorrection"];
        await this.page.locator(CSS.statusDropDown1).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(CSS.status).filter({ hasText: status }).first().click();
        await this.page.waitForTimeout(5000);

        if (!statusArr.includes(status)) {
            await this.page.locator(CSS.assignee).nth(1).fill(assignee, { timeout: 7000 });
            await this.page.waitForTimeout(7000);
            await this.page.locator(CSS.filter_options).nth(0).filter({ hasText: assignee }).click();
        }

        await this.page.locator(CSS.textarea).fill(message);
        await this.page.locator(CSS.submitButton).click();
    }

    async verifyStatusChange1() {
        const text = await this.page.locator(CSS.successMsgAlert).textContent();
        if (!text.includes('Request Submitted Successfully')) throw new Error('Request not submitted');
        await this.page.locator(CSS.refreshButton).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.refreshButton).click();
        const statusText = await this.page.locator(CSS.successStatus).textContent();
        if (statusText.trim() !== 'COMPLETED') throw new Error('Status not COMPLETED');
    }

    async verifySubmitButton() {
        // Playwright way: check disabled property
        const disabled = await this.page.locator(CSS.submitButton).isDisabled();
        if (!disabled) throw new Error('Submit button is not disabled');
    }

    async selectValidStatusAndAssignee(status, assignee, comment) {
        await this.page.locator(CSS.statusDropDown).click();
        await this.page.locator(CSS.status).filter({ hasText: status }).click();
        await this.page.locator(CSS.assignee).nth(1).fill(assignee);
        await this.page.locator(CSS.textarea).fill(comment);
    }

    async copyClaimNo(row, cellID1) {
        await this.page.waitForTimeout(5000);
        const claimNo = await this.page.locator(`#td${row}`).textContent();
        process.env.claimNo = claimNo.trim();
        const obj = { par1: "cypress/fixtures/Claim_Number.csv", par2: cellID1, par3: claimNo.trim() };
        // TODO: implement Node task 'claimNumberCSV' replacement if needed
    }

    async clickOnBulkStatusChangeType(BulkStatusChangeType) {
        if (BulkStatusChangeType == "CSV") {
            await this.page.waitForTimeout(5000);
            await this.page.locator(CSS.checkBoxCSV).click();
        } else if (BulkStatusChangeType == "Update Net Deducted") {
            await this.page.locator(`text=${BulkStatusChangeType}`).click();
        }
    }

    async typeNextStatus(nextStatus, dropdownStatus) {
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.nextStatusCSV).fill(nextStatus);
        await this.page.locator(CSS.nextStatusDropdown).filter({ hasText: dropdownStatus }).click();
    }

    async verifyPerviousAndNextStatusAs(changeStatusFromTo) {
        await this.page.waitForTimeout(5000);
        const verifyText = await this.page.locator(CSS.textPreNextStatus).textContent();
        if (verifyText.trim() !== changeStatusFromTo) throw new Error('Previous/Next status mismatch');
    }

    async assigneeName(assignee) {
        await this.page.waitForTimeout(3000);
        await this.page.locator(CSS.searchApproer).fill(assignee);
        await this.page.locator(CSS.filter_options).filter({ hasText: assignee }).click();
    }

    async addComment(comment) {
        await this.page.waitForTimeout(3000);
        await this.page.locator(CSS.statusChangeComment).fill(comment);
    }

    async clickUpdate() {
        await this.page.waitForTimeout(3000);
        await this.page.locator('text=UPDATE').click();
    }

    async verifyStatusChange(RPstatus) {
        await this.page.locator(CSS.Refresh).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.Refresh).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(CSS.Refresh).click();
        const verifyText = await this.page.locator(CSS.Status_Completed).textContent();
        if (verifyText.trim() !== RPstatus) throw new Error('Status mismatch');
    }

    async changeClaimNumberFromXLSX(fileName, cellId) {
        await this.page.waitForTimeout(3000);
        const object = { par1: "cypress/fixtures/" + fileName, par2: cellId, par3: (process.env.claimNo || '').trim() };
        // TODO: replace cy.task('claimNumberCSV', object) with Node helper
    }

    async selectAuditPeriod(auditPeriod) {
        await this.page.locator(CSS.selectAuditPeriod).selectOption(auditPeriod);
    }

    async changeStatusAddComment(preStatus, nextStatus, approval, comment) {
        const bodyText = await this.page.locator(CSS.EntirePage).textContent();
        if (bodyText.includes(CSS.statusText)) {
            const statusFilter = this.page.locator(CSS.appliedFilter).filter({ hasText: CSS.statusText });
            await statusFilter.locator(CSS.crossManage).scrollIntoViewIfNeeded();
            await statusFilter.locator(CSS.crossManage).click();
            await this.page.waitForTimeout(3000);
        }

        await this.page.waitForTimeout(3000);
        const statusColumn = this.page.locator(CSS.statusColumn).filter({ hasText: CSS.statusText });
        await statusColumn.locator(CSS.filterIcon).scrollIntoViewIfNeeded();
        await statusColumn.locator(CSS.filterIcon).click();
        await this.page.locator(CSS.filter_criteria).fill(preStatus);
        await this.page.waitForTimeout(1000);
        await this.page.locator(CSS.filter_options).filter({ hasText: preStatus }).click();
        await this.page.waitForTimeout(2000);

        const claimText = await this.page.locator(CSS.claim_no).textContent();
        process.env.claimNo = claimText;
        const vendorText = await this.page.locator(CSS.vendor_name).textContent();
        process.env.VendorName = vendorText;
        const auditText = await this.page.locator(CSS.audit_period).textContent();
        process.env.AuditPeriod = auditText;
        const claimTypeText = await this.page.locator(CSS.claim_type).textContent();
        process.env.ClaimType = claimTypeText;

        await this.page.locator(CSS.change_status1).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(CSS.changestatus).first().click();
        await this.page.locator(CSS.dropdown_options).filter({ hasText: nextStatus }).click();
        if (approval !== "") {
            await this.page.waitForTimeout(1000);
            await this.page.locator(CSS.searchApprover).fill(approval);
            await this.page.locator(`text=${approval}`).click({ force: true });
        }
        if (comment.includes("@")) {
            await this.page.locator(CSS.status_comment).fill(comment, { timeout: 25000 });
            await this.page.locator(CSS.mentionSuggestionDropDown).filter({ hasText: comment.replace(/@/g, "") }).click();
        } else {
            await this.page.locator(CSS.status_comment).fill(comment);
        }
        await this.page.waitForTimeout(1000);
        await this.page.locator(CSS.submitbuttonText).click();
        await this.page.waitForTimeout(5000);
    }

    async insertCommentFile(filename) {
        await this.page.locator(CSS.insertImage).click();
        await this.page.locator(CSS.AttachClaimsheet).setInputFiles('cypress/fixtures/' + filename);
    }

    async verifyImageIsPresentInCommentChat() {
        await this.page.locator(CSS.imageMessage).last().waitFor({ state: 'visible' });
    }

    async addCommentWithRichTextFormattingOptions(commentText) {
        await this.page.locator(CSS.boldButton).click();
        await this.page.locator(CSS.status_comment).fill(commentText);
        await this.page.locator(CSS.boldButton).click();

        await this.page.locator(CSS.italicButton).click();
        await this.page.locator(CSS.status_comment).fill(commentText);
        await this.page.locator(CSS.italicButton).click();

        await this.page.locator(CSS.underlineButton).click();
        await this.page.locator(CSS.status_comment).fill(commentText);
        await this.page.locator(CSS.underlineButton).click();
    }

    async verifyCommentWithRichTextFormattingInCommentChat(verifyCommentText) {
        const bold = await this.page.locator(CSS.boldMessage).last().textContent();
        const italic = await this.page.locator(CSS.italicMessage).last().textContent();
        const underline = await this.page.locator(CSS.underlineMessage).last().textContent();
        if (!bold.includes(verifyCommentText) || !italic.includes(verifyCommentText) || !underline.includes(verifyCommentText)) {
            throw new Error('Rich text formatted comment not found');
        }
    }

    async clickOnButton(buttonName) {
        await this.page.locator(`text=${buttonName}`).click();
    }
}

export default BulkStatusChange