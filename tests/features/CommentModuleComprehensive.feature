Feature: Comprehensive Comment Module Functionality

    # Background:
    #     Given User is logged into the Cantire application

    @smoke @regression @navigation @auditor @manager @external_auditor @test1
    Scenario Outline: Navigate to comments section from various entry points
        When User navigates to comment module "<bucket>" page
        And User selects a claim from the bucket
        And User clicks on the comments button in claim details view
        Then Comments section should be displayed
        And Comment input field should be visible
        And Comment visibility dropdown should be available
        Examples:
            | bucket    |
            | MANAGE    |
            # | APPROVE   |
            # | REVIEWS   |

    @regression @internal_comments @auditor
    Scenario Outline: Add internal comment as Auditor and verify visibility rules
        When User logs in as "Auditor"
        And User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an internal comment with content "<comment_text>"
        Then The comment should be visible to Auditor and Manager roles
        And The comment should not be visible to External Auditor role
        And Comment should display correct timestamp
        And Comment should display user information
        Examples:
            | comment_text                      |
            | Internal comment by Auditor user |

    @regression @internal_comments @manager
    Scenario Outline: Add internal comment as Manager and verify visibility rules
        When User logs in as "Manager"
        And User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an internal comment with content "<comment_text>"
        Then The comment should be visible to Auditor and Manager roles
        And The comment should not be visible to External Auditor role
        And Comment should display correct timestamp
        And Comment should display user information
        Examples:
            | comment_text                     |
            | Internal comment by Manager user |

    @regression @external_comments @auditor
    Scenario Outline: Add external comment as Auditor and verify comprehensive functionality
        When User logs in as "Auditor"
        And User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "<comment_text>"
        Then The comment should be visible to all user roles
        And The comment should appear in claim history
        And Email notification should be sent to relevant users
        And Comment should display correct timestamp
        And Comment should display user information
        Examples:
            | comment_text                     |
            | External comment by Auditor user |

    @regression @external_comments @manager
    Scenario Outline: Add external comment as Manager and verify comprehensive functionality
        When User logs in as "Manager"
        And User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "<comment_text>"
        Then The comment should be visible to all user roles
        And The comment should appear in claim history
        And Email notification should be sent to relevant users
        And Comment should display correct timestamp
        And Comment should display user information
        Examples:
            | comment_text                    |
            | External comment by Manager user |

    @regression @external_comments @external_auditor
    Scenario Outline: Add external comment as External Auditor and verify functionality
        When User logs in as "External Auditor"
        And User navigates to comment module "REVIEWS" page
        And User selects a claim from the bucket
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "<comment_text>"
        Then The comment should be visible to all user roles
        And The comment should appear in claim history
        And Email notification should be sent to relevant users
        And Comment should display correct timestamp
        And Comment should display user information
        Examples:
            | comment_text                           |
            | External comment by External Auditor user |

    @regression @comment_permissions @external_auditor
    Scenario: Verify External Auditor comment permissions and restrictions
        When User logs in as "External Auditor"
        And User navigates to comment module "REVIEWS" page
        And User selects a claim from the bucket
        And User clicks on the comments button in claim details view
        Then User should only see external comments
        And User should not have option to add internal comments
        And User should be able to add external comments
        And User should be able to view comments made by other roles
        And Internal visibility option should not be available

    @regression @comment_visibility @cross_role
    Scenario: Verify comment visibility across different user roles
        Given Internal comments exist from Auditor and Manager
        And External comments exist from all roles
        When User logs in as "Auditor"
        Then User should see all internal and external comments
        When User logs in as "Manager"
        Then User should see all internal and external comments
        When User logs in as "External Auditor"
        Then User should only see external comments
        And User should not see internal comments

    @regression @claim_history @external_comments
    Scenario: Verify external comments appear in claim history with proper details
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "Test comment for history verification"
        And User clicks on Claim History
        Then The external comment "Test comment for history verification" should be displayed in claim history
        And The history entry should indicate it was added via comments
        And The history should show the user who added the comment
        And The history should show the timestamp of the comment

    @regression @email_notifications @internal_comments
    Scenario: Verify email notifications for internal comments
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an internal comment with content "Test internal comment for email notification"
        Then Email notification should be sent to relevant users
        And The email should contain the comment details
        And The email should contain the claim information
        And The email should indicate it's an internal comment

    @regression @email_notifications @external_comments
    Scenario: Verify email notifications for external comments
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "Test external comment for email notification"
        Then Email notification should be sent to all relevant users
        And The email should indicate it's an external comment
        And The email should be sent to broader user group including external auditors

    @regression @comment_validation @empty_comment
    Scenario: Verify validation for empty comments
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User attempts to add an empty comment
        Then Appropriate validation message should be displayed
        And Comment should not be posted

    @regression @comment_validation @character_limit
    Scenario: Verify character limit validation for comments
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User attempts to add a comment exceeding character limit
        Then Character limit validation message should be displayed
        And Comment should not be posted

    @regression @comment_formatting @rich_text
    Scenario: Verify rich text formatting in comments
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds a comment with rich text formatting "**bold** and *italic* text"
        Then The comment should display with proper formatting
        And The formatting should be preserved in claim history

    @regression @comment_threading @multiple_comments
    Scenario: Verify multiple comments display and threading
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds multiple comments with different visibility
        Then All comments should be displayed in chronological order
        And Comments should be properly threaded
        And Each comment should show its visibility status
        And Comment count should be accurate

    @regression @comment_search @filtering
    Scenario: Verify comment search and filtering functionality
        Given Multiple comments exist on a claim
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User searches for specific comment content
        Then Only matching comments should be displayed
        And Search results should be highlighted
        And User should be able to clear search filter

    @regression @comment_edit @modification
    Scenario: Verify comment editing functionality (if supported)
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds a comment with content "Original comment"
        Then User should be able to edit their own comments
        And Edited comments should show modification timestamp
        And Comment history should track changes

    @regression @comment_delete @removal
    Scenario: Verify comment deletion functionality (if supported)
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds a comment with content "Comment to be deleted"
        Then User should be able to delete their own comments
        And Deleted comments should be removed from view
        And Comment count should be updated
        And Deletion should be logged in claim history

    @regression @comment_attachments @file_upload
    Scenario: Verify file attachments in comments (if supported)
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds a comment with file attachment
        Then The attachment should be uploaded successfully
        And The attachment should be visible in the comment
        And Users should be able to download the attachment
        And Attachment should be accessible to appropriate user roles

    @regression @comment_mention @user_tagging
    Scenario: Verify user mention functionality in comments (if supported)
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User mentions another user in a comment
        Then The mentioned user should receive a notification
        And The mention should be highlighted in the comment
        And Mentioned user should be able to click on the mention to navigate

    @regression @comment_export @reporting
    Scenario: Verify comment export functionality (if supported)
        Given Multiple comments exist on a claim
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User exports comments
        Then Comments should be exported in the specified format
        And Export should include all relevant comment details
        And Export should respect user permissions and visibility rules

    @regression @performance @load_testing
    Scenario: Verify comment module performance with large number of comments
        Given A claim has large number of comments
        When User navigates to comment module "MANAGE" page
        And User selects the claim with many comments
        And User clicks on the comments button in claim details view
        Then Comments should load within acceptable time
        And Pagination should work correctly for large comment lists
        And Search should work efficiently on large comment sets

    @regression @accessibility @screen_reader
    Scenario: Verify comment module accessibility
        When User navigates to comment module "MANAGE" page using screen reader
        And User selects a claim
        And User clicks on the comments button in claim details view
        Then All comment elements should have proper ARIA labels
        And Keyboard navigation should work correctly
        And Screen reader should announce comment content properly
        And Color contrast should meet accessibility standards

    @regression @mobile_responsiveness @responsive_design
    Scenario: Verify comment module works on mobile devices
        When User accesses the application on mobile device
        And User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        Then Comment section should be properly responsive
        And Comment input should work on touch devices
        And Comment visibility options should be accessible on mobile
        And Comment history should be readable on small screens