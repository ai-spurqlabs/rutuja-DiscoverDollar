Feature: Update Net Deduction Amount

    @smoke @audit_manager @MVT
    Scenario: Verify update Net Deducted Amount
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
        And user change Claim Number from "NetDeducted.xlsx" at "E2" cell
        And user click on actions menu and select bulk status change
        And user click on "Update Net Deducted"
        And uploads "NetDeducted.xlsx" as reference document
        And click on update button
        And the file should be downloaded successfully with "Request Submitted Successfully" message
        And Manager navigates to "MANAGE" page
        And User Clear filters
        And User applies claim number filter
        And User clicks on export and claims
        And User gets Net Deducted amount data from "S2"
        Then User verify Net Deducted amount is "1"    

    @smoke @audit_manager @MVT
    Scenario: Verify user is able to update Net Deducted Amount when status is GoodClaimNotAccounted
        When Manager navigates to "MANAGE" page
        And User Clear filters
        And user select Audit Period as "2024"
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "sumit" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ManagerReview" to "ReadyToSubmit" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ReadyToSubmit" to "CTCReview" sends "Mano" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "CTCReview" to "GoodClaimNotAccounted" sends "" for approval, and leaves the comment as "Automation"
        And "Status Changed Successfully" message is displayed
        And user change Claim Number from "NetDeducted.goodclaim.xlsx" at "E2" cell
        And user click on actions menu and select bulk status change
        And user click on "Update Net Deducted"
        And uploads "NetDeducted.goodclaim.xlsx" as reference document
        And click on update button
        And the file should be downloaded successfully with "Request Submitted Successfully" message
        And Manager navigates to "MANAGE" page
        And User Clear filters
        And User applies claim number filter
        And User clicks on export and claims
        And User gets Net Deducted amount data from "S2"
        Then User verify Net Deducted amount is "1"

    @smoke @audit_manager @MVT
    Scenario: Verify total net deducted amount is displayed after file upload
        When Manager navigates to "MANAGE" page
        And User Clear filters
        And user select Audit Period as "2024"
        And User clicks on "Status" filter icon and apply "NetDeducted"
        And user click on actions menu and select bulk status change
        And user click on "Update Net Deducted"
        And uploads "TotalNetDeductedAmoun.xlsx" as reference document
        Then Verify total net amount is displayed as "Net Deducted Amount (-$4.00)"

    @smoke @audit_manager @MVT
    Scenario: Verify user is able to update Net Deducted Amount when status is Reversed
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
        And user change Claim Number from "NetDeducted.Reversed.xlsx" at "E2" cell
        And user click on actions menu and select bulk status change
        And user click on "Update Net Deducted"
        And uploads "NetDeducted.Reversed.xlsx" as reference document
        And click on update button
        And the file should be downloaded successfully with "Request Submitted Successfully" message
        And Manager navigates to "MANAGE" page
        And User Clear filters
        And User applies claim number filter
        And User clicks on export and claims
        And User gets Net Deducted amount data from "S2"
        Then User verify Net Deducted amount is "1"
