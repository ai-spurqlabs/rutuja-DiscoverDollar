Feature: Claim Details view


    @smoke @audit_manager @MVT
    Scenario Outline: when user clicks on the claim number then the claim details view should display the correct details of claim
        When user navigates to cantire "<page>" view
        And select a claim number row
        And clicks on the claim number
        Then the claim details displayed in the page is same as in claim details view
        Examples:
            | page    |
            | REVIEWS |


    @smoke  @audit_manager @MVT
    Scenario Outline: Verify User can Comment
        When user navigates to cantire "<page>" view
        And clicks on the claim number
        And user clicks on comments icon in claim details view
        And the comments view is displayed
        And user enters a comment "<comment>" in the comment section
        And the "<comment>" is displayed in the comments view
        And user clicks on the delete comment icon
        Then the comment should be deleted successfully with "<message>"
        Examples:
            | page    | comment                               | message                      |
            | REVIEWS | adding comment from automation script | Comment Deleted Successfully |

    @smoke @user
    Scenario Outline: Verify Location field is displayed for the claim types in line items view
        When Manager navigates to "MANAGE" page
        And user applies "<claim Type>" filter
        And user clicks on line items button
        Then the "LOCATION" field should be displayed in the line items view

        Examples:
            | claim Type          |
            | Statement Audit     |
            | Duplicate Payments  |
            | Cash/Trade Discount |
            | Markdown            |
            | Vendor Rebate       |

