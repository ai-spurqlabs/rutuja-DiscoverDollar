Feature: Add reference document for different visibility options

    
@smoke @audit_manager @MVT

    Scenario: Verify reference document uploaded with all visibility is displayed to audit reviewer.
        When Manager navigates to "MANAGE" page
        And User apply filter of status as "InProgress"
        And User copy 1st claim number
        And User Clears all filters
        And User applies the claim number filter
        And clicks on a claim number
        And User uploads Files "ReferenceDocALL.xlsx" and "ReferenceDocInt.xlsx" as Reference document
        And selects "Agreement" as file type for both files
        And select Visibility to "all" for one file and "internal" for other
        And the file name "ReferenceDocInt.xlsx" should be displayed in the claim details view with indicator "(IV)"
        And user downloads the reference document
        And the file should be downloaded successfully with "Downloaded Successfully" message
        And User closes the claim details view
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "Sumit" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ManagerReview" to "ReadyToSubmit" sends "" for approval, and leaves the comment as "Automation"
        And User applies a status filter, changes the status from "ReadyToSubmit" to "CTCReview" sends "qaaudit.reviewer" for approval, and leaves the comment as "Automation"
        And The Audit Reviewer log in to the application for Review
        And User type claim number and click on suggestion
        And the file name "ReferenceDocALL.xlsx" should be displayed in the claim details view
        And user downloads the reference document
        Then the file should be downloaded successfully with "Downloaded Successfully" message
        And Verify that "ReferenceDocALL.xlsx" file is downloaded