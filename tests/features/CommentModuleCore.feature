Feature: Comment Module Core Functionality

    Background:
        Given User is logged into the Cantire application

    @smoke @regression @navigation1 @auditor @test
    Scenario Outline: Navigate to comments section via Global Search
        When User navigates to comment module "<bucket>" page
        And User copies the first claim number
        And User searches for comment module "Claim Number" in the global search banner
        And User pastes the copied claim number in the search box
        And User selects the claim from search results
        And User clicks on the comments button in claim details view
        Then Comments section should be displayed
        Examples:
            | bucket  |
            | MANAGE  |

    @regression @navigation @auditor
    Scenario Outline: Navigate to comments section via To-dos bucket
        When User navigates to comment module "<bucket>" page
        And User selects a claim from the bucket
        And User clicks on the comments button in claim details view
        Then Comments section should be displayed
        Examples:
            | bucket    |
            | APPROVE   |
            | MANAGE    |
            | REVIEWS   |

    @regression @navigation @auditor
    Scenario: Navigate to comments section via Manage Claims
        When User navigates to comment module "MANAGE" page
        And User selects a claim from manage claims
        And User clicks on the comments button in claim details view
        Then Comments section should be displayed

    @regression @internal_comments @auditor
    Scenario Outline: Add internal comment as Auditor and verify visibility
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an internal comment with content "<comment_text>"
        Then The comment should be visible to Auditor and Manager roles
        And The comment should not be visible to External Auditor role
        Examples:
            | comment_text              |
            | Internal comment by Auditor |

    @regression @internal_comments @audit_manager
    Scenario Outline: Add internal comment as Manager and verify visibility
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an internal comment with content "<comment_text>"
        Then The comment should be visible to Auditor and Manager roles
        And The comment should not be visible to External Auditor role
        Examples:
            | comment_text             |
            | Internal comment by Manager |

    @regression @external_comments @auditor
    Scenario Outline: Add external comment as Auditor and verify visibility
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "<comment_text>"
        Then The comment should be visible to all user roles
        And The comment should appear in claim history
        And Email notification should be sent to relevant users
        Examples:
            | comment_text             |
            | External comment by Auditor |

    @regression @external_comments @audit_manager
    Scenario Outline: Add external comment as Manager and verify visibility
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "<comment_text>"
        Then The comment should be visible to all user roles
        And The comment should appear in claim history
        And Email notification should be sent to relevant users
        Examples:
            | comment_text            |
            | External comment by Manager |

    @regression @external_comments @audit_reviewer
    Scenario Outline: Add external comment as External Auditor and verify visibility
        When User navigates to comment module "REVIEWS" page
        And User selects a claim from the bucket
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "<comment_text>"
        Then The comment should be visible to all user roles
        And The comment should appear in claim history
        And Email notification should be sent to relevant users
        Examples:
            | comment_text                   |
            | External comment by External Auditor |

    @regression @comment_visibility @auditor
    Scenario: Verify comment visibility rules across different user roles
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        Then Internal comments should only be visible to Auditor and Manager roles
        And External comments should be visible to all user roles
        And External Auditor should only be able to add external comments

    @regression @comment_history @auditor
    Scenario: Verify external comments appear in claim history
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "Test comment for history"
        Then The comment should appear in claim history
        And The history entry should indicate it was added via comments

    @regression @email_notifications @auditor
    Scenario: Verify email notifications for new comments
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an internal comment with content "Test for email notification"
        Then Email notification should be sent to relevant users
        And The email should contain the comment details
        And The email should contain the claim information

    @regression @email_notifications @audit_manager
    Scenario: Verify email notifications for external comments
        When User navigates to comment module "MANAGE" page
        And User selects a claim
        And User clicks on the comments button in claim details view
        And User adds an external comment with content "External comment test"
        Then Email notification should be sent to all relevant users
        And The email should indicate it's an external comment
        And The email should be sent to broader user group

    @regression @comment_permissions @audit_reviewer
    Scenario: Verify External Auditor comment permissions
        When User logs in as External Auditor
        And User navigates to comment module "REVIEWS" page
        And User selects a claim from the bucket
        And User clicks on the comments button in claim details view
        Then User should only see external comments
        And User should not have option to add internal comments
        And User should be able to add external comments
        And User should be able to view comments made by other roles
