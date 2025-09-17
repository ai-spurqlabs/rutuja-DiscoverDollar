Feature: Verifying the Cancellation amount and Reporting amount of claims in status CTC Denied


    @smoke @audit_manager @MVT
    Scenario: Verify the cancellation is equal to reporting amount after CTC Denied status of a claim.
        When  User navigates to "MANAGE" page
        And User Clear filters   
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "Sumit" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ManagerReview" to "ReadyToSubmit" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ReadyToSubmit" to "CTCReview" sends "Mano" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCReview" to "CTCDenied" sends "" for approval, and leaves the comment as "Automation"
        And User Clear filters
        And User applies claim number filter
        And User clicks on export and claims
        And User gets Cancellation amount data from "O2"
        Then User verify Cancellation amount is equal to reporting amount of claim