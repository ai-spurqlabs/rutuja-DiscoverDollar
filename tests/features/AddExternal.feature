Feature:External comment Visibility in Claim History
    @smoke1 @audit_manager @MVT
    Scenario: Verify external Comment added during status change is displayed in claim history
        When Manager navigates to "MANAGE" page
        And User Clear filters
        And user select Audit Period as "2024"
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "suraj" for approval, and leaves the externel comment as "Automation Test"
        And User Clear filters
        And User applies claim number filter
        And clicks on the claim number
        And User clicks on Claim History
        Then User verifies comment added is "Automation Test"