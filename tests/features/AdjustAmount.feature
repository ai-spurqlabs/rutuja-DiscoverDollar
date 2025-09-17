Feature: Update Adjust Amount

    @smoke @audit_manager @MVT
    Scenario: Verify Adjust Amount is updating in Claim Export after adding Partial Reversed
        When Manager navigates to "MANAGE" page
        And User Clear filters
        And user select Audit Period as "2024"
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "sumit" for approval, and leaves the comment as "Automation"
        And User Clear filters
        And User applies claim number filter 
        And User applies a status filter, changes the status from "ManagerReview" to "ReadyToSubmit" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ReadyToSubmit" to "CTCReview" sends "Mano" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCReview" to "CTCApproved" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCApproved" to "PendingPosting" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "PendingPosting" to "PostedNotCollected" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "PostedNotCollected" to "NetDeducted" sends "" for approval, and leaves the comment as "Automation"
        And the user applies the "NetDeducted" filter, changes the status to "Reversed", selects the Reversal Type as "Partial Reversal", adjusts the amount to "1" and adds a comment as "Automation"
        And "Status Changed Successfully" message is displayed
        And User Clear filters
        And User applies claim number filter
        And User clicks on export and claims
        And User gets Adjust Amount data from "P2"
        Then User verify Adjust Amount is "1"
        And User verifies claim value is displayed in first row is "NetDeducted"

    @smoke @audit_manager @MVT
    Scenario: Verify Adjust Amount is updating in Claim Export after adding Full Reversed
        When Manager navigates to "MANAGE" page
        And User Clear filters
        And user select Audit Period as "2024"
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "sumit" for approval, and leaves the comment as "Automation"
        And User Clear filters
        And User applies claim number filter
        And User applies a status filter, changes the status from "ManagerReview" to "ReadyToSubmit" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ReadyToSubmit" to "CTCReview" sends "Mano" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCReview" to "CTCApproved" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCApproved" to "PendingPosting" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "PendingPosting" to "PostedNotCollected" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "PostedNotCollected" to "NetDeducted" sends "" for approval, and leaves the comment as "Automation"
        And the user applies the "NetDeducted" filter, changes the status to "Reversed", selects the Reversal Type as "Full Reversal", adjusts the amount to "" and adds a comment as "Automation"
        And "Status Changed Successfully" message is displayed
        And User Clear filters
        And User applies claim number filter
        And User clicks on export and claims
        And User gets Adjust Amount data from "P2"
        Then User verify Adjust Amount is equal to Gross Amount
        And User verifies claim value is displayed in first row is "Reversed"