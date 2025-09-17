import { Given, When, Then } from "@cucumber/cucumber";
import CSS from "../fixtures/Css.json" with { type: "json" };

Given('User is logged into the Cantire application', async function () {
    // This will be handled by the hooks based on tags
});





When('User navigates to comment module {string} page', { timeout: 60000 }, async function (bucket) {
    await this.commentModuleCore.clickBucket(bucket);
});

When('User selects a claim from the bucket', { timeout: 120000 }, async function () {
    await this.commentModuleCore.selectClaimFromBucket();
});

When('User clicks on the comments button in claim details view', { timeout: 60000 }, async function () {
    await this.commentModuleCore.clickCommentsButton();
});

Then('Comments section should be displayed', async function () {
    await this.commentModuleCore.verifyCommentsSectionDisplayed();
});

Then('Comment input field should be visible', async function () {
    await this.commentModuleCore.verifyCommentInputFieldVisible();
});

Then('Comment visibility dropdown should be available', async function () {
    await this.commentModuleCore.verifyCommentVisibilityDropdownAvailable();
});

When('User adds an internal comment with content {string}', { timeout: 90000 }, async function (content) {
    console.log(`🔧 Adding internal comment: "${content}"`);

    // Check if comments section is already open (from previous step)
    const commentsSectionVisible = await this.page.locator(CSS.comments_view).isVisible().catch(() => false);

    if (!commentsSectionVisible) {
        console.log('Comments section not visible, clicking comments button...');
        await this.commentModuleCore.clickCommentsButton();
    } else {
        console.log('Comments section already visible, proceeding...');
    }

    await this.commentModuleCore.setCommentVisibility('INTERNALLY VISIBLE');
    await this.commentModuleCore.addComment(content);
});

When('User adds an external comment with content {string}', { timeout: 90000 }, async function (content) {
    console.log(`🔧 Adding external comment: "${content}"`);
    // Check if comments section is already open (from previous comment)
    const commentsSectionVisible = await this.page.locator(CSS.comments_view).isVisible().catch(() => false);

    if (!commentsSectionVisible) {
        console.log('Comments section not visible, clicking comments button...');
        await this.commentModuleCore.clickCommentsButton();
    } else {
        console.log('Comments section already visible, proceeding...');
    }

    await this.commentModuleCore.setCommentVisibility('EXTERNALLY VISIBLE');
    await this.commentModuleCore.addComment(content);
});

When('User adds a comment with content {string} and visibility {string}', async function (content, visibility) {
    await this.commentModuleCore.clickCommentsButton();
    await this.commentModuleCore.setCommentVisibility(visibility);
    await this.commentModuleCore.addComment(content);
});

Then('The comment should be visible to Auditor and Manager roles', async function () {
    await this.commentModuleCore.verifyCommentVisibleToInternalUsers();
});

Then('The comment {string} should be visible in the comments section', async function (expectedComment) {
    console.log(`Verifying comment "${expectedComment}" is visible in comments section...`);
    await this.commentModuleCore.verifyCommentAdded(expectedComment);
});

Then('The comment should be visible to all user roles', async function () {
    await this.commentModuleCore.verifyCommentVisibleToAllUsers();
});

Then('The comment should not be visible to External Auditor role', async function () {
    await this.commentModuleCore.verifyInternalCommentsNotVisibleToExternalAuditor();
});

Then('Comment should display correct timestamp', async function () {
    await this.commentModuleCore.verifyCommentTimestamp();
});

Then('Comment should display user information', async function () {
    await this.commentModuleCore.verifyCommentUserInfo();
});

Then('The comment should appear in claim history', async function () {
    await this.commentModuleCore.verifyCommentInHistory();
});

Then('Email notification should be sent to relevant users', async function () {
    await this.commentModuleCore.verifyEmailNotificationSent();
});

Then('Email notification should be sent to all relevant users', async function () {
    await this.commentModuleCore.verifyEmailNotificationSentToAll();
});

Then('The email should contain the comment details', async function () {
    await this.commentModuleCore.verifyEmailContainsCommentDetails();
});

Then('The email should contain the claim information', async function () {
    await this.commentModuleCore.verifyEmailContainsClaimInfo();
});

Then('The email should indicate it\'s an internal comment', async function () {
    await this.commentModuleCore.verifyEmailIndicatesInternalComment();
});

Then('The email should indicate it\'s an external comment', async function () {
    await this.commentModuleCore.verifyEmailIndicatesExternalComment();
});

Then('The email should be sent to broader user group including external auditors', async function () {
    await this.commentModuleCore.verifyEmailSentToBroaderGroup();
});



Then('User should not have option to add internal comments', async function () {
    await this.commentModuleCore.verifyNoInternalCommentOption();
});

Then('User should be able to add external comments', async function () {
    await this.commentModuleCore.verifyCanAddExternalComments();
});

Then('User should be able to view comments made by other roles', async function () {
    await this.commentModuleCore.verifyCanViewCommentsFromOtherRoles();
});

Then('User should see all internal and external comments', async function () {
    console.log('Verifying user can see all internal and external comments...');
    await this.commentModuleCore.verifyAllCommentsVisible();
});

Then('User should only see external comments', async function () {
    console.log('Verifying user can only see external comments...');
    await this.commentModuleCore.verifyOnlyExternalCommentsVisible();
});

Then('User should not see internal comments', async function () {
    console.log('Verifying user cannot see internal comments...');
    await this.commentModuleCore.verifyInternalCommentsNotVisible();
});

Then('The comment {string} should not be visible to External Auditor role', async function (commentText) {
    console.log(`Verifying comment "${commentText}" is not visible to External Auditor role...`);
    await this.commentModuleCore.verifyInternalCommentsNotVisibleToExternalAuditor();
});

Then('Internal visibility option should not be available', async function () {
    await this.commentModuleCore.verifyInternalVisibilityOptionNotAvailable();
});

When('User clicks on Claim History', { timeout: 30000 }, async function () {
    console.log('🔄 Navigating back to claim details page...');

    // Take screenshot before navigation
    await this.page.screenshot({
      path: 'before-navigating-back.png',
      fullPage: true
    });
    console.log('📸 Screenshot taken: before-navigating-back.png');

    // Check current URL before navigation
    const currentUrl = this.page.url();
    console.log('📍 Current URL before navigation:', currentUrl);

    // Navigate back to claim details page
    await this.page.goBack();
    await this.page.waitForTimeout(5000); // Increased wait time

    // Check URL after navigation
    const newUrl = this.page.url();
    console.log('📍 URL after navigation:', newUrl);

    // Take screenshot after navigation
    await this.page.screenshot({
      path: 'after-navigating-back.png',
      fullPage: true
    });
    console.log('📸 Screenshot taken: after-navigating-back.png');

    // Verify we're back on claim details page
    const pageText = await this.page.locator('body').textContent();
    const hasClaimDetails = pageText.includes('Claim Details') ||
                           pageText.includes('claim details') ||
                           /[A-Z]{4}\d{6}\d{3}/.test(pageText); // Claim number pattern

    if (!hasClaimDetails) {
      console.log('⚠️ WARNING: May not be on claim details page after navigation');
      console.log('🔍 Page content preview:', pageText.substring(0, 300));

      // Try to navigate to claim details if not already there
      console.log('🔄 Attempting to navigate to claim details...');
      // This would require knowing the claim URL, but for now we'll continue
    } else {
      console.log('✅ Successfully navigated back to claim details page');
    }

    console.log('🔍 Clicking on Claim History button...');
    await this.commentModuleCore.clickClaimHistory();
});

Then('The external comment {string} should be displayed in claim history', { timeout: 60000 }, async function (commentText) {
    await this.commentModuleCore.verifyCommentInHistory(commentText);
});


Then('The history should show the user who added the comment', async function () {
    await this.commentModuleCore.verifyHistoryShowsUser();
});

Then('The history should show the timestamp of the comment', async function () {
    await this.commentModuleCore.verifyHistoryShowsTimestamp();
});

When('User attempts to add an empty comment', async function () {
    await this.commentModuleCore.attemptEmptyComment();
});

Then('Appropriate validation message should be displayed', async function () {
    await this.commentModuleCore.verifyValidationMessage('empty');
});

Then('Comment should not be posted', async function () {
    await this.commentModuleCore.verifyCommentNotPosted();
});

When('User attempts to add a comment exceeding character limit', async function () {
    await this.commentModuleCore.attemptLongComment();
});

Then('Character limit validation message should be displayed', async function () {
    await this.commentModuleCore.verifyValidationMessage('length');
});

When('User adds a comment with rich text formatting {string}', async function (formattedComment) {
    await this.commentModuleCore.clickCommentsButton();
    await this.commentModuleCore.setCommentVisibility('EXTERNALLY VISIBLE');
    await this.commentModuleCore.addFormattedComment(formattedComment);
});

Then('The comment should display with proper formatting', async function () {
    await this.commentModuleCore.verifyCommentFormatting();
});

Then('The formatting should be preserved in claim history', async function () {
    await this.commentModuleCore.verifyFormattingInHistory();
});

When('User adds multiple comments with different visibility', async function () {
    await this.commentModuleCore.addMultipleCommentsWithDifferentVisibility();
});

Then('All comments should be displayed in chronological order', async function () {
    await this.commentModuleCore.verifyCommentsChronologicalOrder();
});

Then('Comments should be properly threaded', async function () {
    await this.commentModuleCore.verifyCommentsThreading();
});

Then('Each comment should show its visibility status', async function () {
    await this.commentModuleCore.verifyCommentVisibilityStatus();
});

Then('Comment count should be accurate', async function () {
    await this.commentModuleCore.verifyCommentCount();
});

Given('Multiple comments exist on a claim', async function () {
    await this.commentModuleCore.setupMultipleComments();
});

When('User searches for specific comment content', async function () {
    await this.commentModuleCore.searchComments('test search term');
});

Then('Only matching comments should be displayed', async function () {
    await this.commentModuleCore.verifySearchResults();
});

Then('Search results should be highlighted', async function () {
    await this.commentModuleCore.verifySearchHighlighting();
});

Then('User should be able to clear search filter', async function () {
    await this.commentModuleCore.verifySearchFilterClearable();
});

Then('User should be able to edit their own comments', async function () {
    await this.commentModuleCore.verifyCommentEditable();
});

Then('Edited comments should show modification timestamp', async function () {
    await this.commentModuleCore.verifyEditedCommentTimestamp();
});

Then('Comment history should track changes', async function () {
    await this.commentModuleCore.verifyCommentHistoryTracksChanges();
});

Then('User should be able to delete their own comments', async function () {
    await this.commentModuleCore.verifyCommentDeletable();
});

Then('Deleted comments should be removed from view', async function () {
    await this.commentModuleCore.verifyCommentRemoved();
});

Then('Deletion should be logged in claim history', async function () {
    await this.commentModuleCore.verifyDeletionLoggedInHistory();
});

When('User adds a comment with file attachment', async function () {
    await this.commentModuleCore.addCommentWithAttachment();
});

Then('The attachment should be uploaded successfully', async function () {
    await this.commentModuleCore.verifyAttachmentUploaded();
});

Then('The attachment should be visible in the comment', async function () {
    await this.commentModuleCore.verifyAttachmentVisible();
});

Then('Users should be able to download the attachment', async function () {
    await this.commentModuleCore.verifyAttachmentDownloadable();
});

Then('Attachment should be accessible to appropriate user roles', async function () {
    await this.commentModuleCore.verifyAttachmentAccessByRoles();
});

When('User mentions another user in a comment', async function () {
    await this.commentModuleCore.addCommentWithMention();
});

Then('The mentioned user should receive a notification', async function () {
    await this.commentModuleCore.verifyMentionNotification();
});

Then('The mention should be highlighted in the comment', async function () {
    await this.commentModuleCore.verifyMentionHighlighting();
});

Then('Mentioned user should be able to click on the mention to navigate', async function () {
    await this.commentModuleCore.verifyMentionClickable();
});

When('User exports comments', async function () {
    await this.commentModuleCore.exportComments();
});

Then('Comments should be exported in the specified format', async function () {
    await this.commentModuleCore.verifyCommentsExported();
});

Then('Export should include all relevant comment details', async function () {
    await this.commentModuleCore.verifyExportIncludesDetails();
});

Then('Export should respect user permissions and visibility rules', async function () {
    await this.commentModuleCore.verifyExportRespectsPermissions();
});

Given('A claim has large number of comments', async function () {
    await this.commentModuleCore.setupLargeNumberOfComments();
});

Then('Comments should load within acceptable time', async function () {
    await this.commentModuleCore.verifyCommentsLoadTime();
});

Then('Pagination should work correctly for large comment lists', async function () {
    await this.commentModuleCore.verifyPaginationWorks();
});

Then('Search should work efficiently on large comment sets', async function () {
    await this.commentModuleCore.verifySearchEfficiency();
});

When('User navigates to comment module {string} page using screen reader', async function (bucket) {
    await this.commentModuleCore.clickBucket(bucket);
});

Then('All comment elements should have proper ARIA labels', async function () {
    await this.commentModuleCore.verifyARIA_labels();
});

Then('Keyboard navigation should work correctly', async function () {
    await this.commentModuleCore.verifyKeyboardNavigation();
});

Then('Screen reader should announce comment content properly', async function () {
    await this.commentModuleCore.verifyScreenReaderAnnouncements();
});

Then('Color contrast should meet accessibility standards', async function () {
    await this.commentModuleCore.verifyColorContrast();
});

When('User accesses the application on mobile device', async function () {
    await this.commentModuleCore.setMobileViewport();
});

Then('Comment section should be properly responsive', async function () {
    await this.commentModuleCore.verifyResponsiveDesign();
});

Then('Comment input should work on touch devices', async function () {
    await this.commentModuleCore.verifyTouchInput();
});

Then('Comment visibility options should be accessible on mobile', async function () {
    await this.commentModuleCore.verifyMobileVisibilityOptions();
});

Then('Comment history should be readable on small screens', async function () {
    await this.commentModuleCore.verifyMobileHistoryReadability();
});
