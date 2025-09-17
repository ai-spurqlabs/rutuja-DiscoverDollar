Feature: Verifying the Posted Not collected column amount is same as gross amount of claims in Posted Not Collected status


    @smoke @audit_manager @MVT
    Scenario: Verify the Posted Not collected column amount and gross claim amount are equal when claim is in Posted Not Collected status.
        When  User navigates to "MANAGE" page
        And User Clear filters  
        And user select Audit Period as "2024" 
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "Sumit" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ManagerReview" to "ReadyToSubmit" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ReadyToSubmit" to "CTCReview" sends "Mano" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCReview" to "CTCApproved" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCApproved" to "PendingPosting" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "PendingPosting" to "PostedNotCollected" sends "" for approval, and leaves the comment as "Automation"
        And User Clear filters
        And User applies claim number filter
        And User clicks on export and claims
        And User gets Posted Not collected amount data from "R2"
        And User gets Gross amount data from "M2"
        Then User verify Posted Not collected amount is equal to Gross amount of claim