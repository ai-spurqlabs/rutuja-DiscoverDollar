Feature: Add Comment to claim with Enhanced edit Options

    @smoke @audit_manager @MVT
    Scenario: Verify user can mention other user using Comment while changing status
        When Manager navigates to "MANAGE" page
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "Sumit" for approval, and leaves the comment as "@Sumit"
        And User Clear filters
        And User applies claim number filter
        And clicks on a claim number
        And user clicks on comments button in claim details view
        Then the "@Sumit" is displayed in the comments view

    @smoke @audit_manager @MVT
    Scenario: Verify user can add image as comment when user is changing status through Bulk Change Status
        When User navigates to "MANAGE" page
        And User Clear applied filters
        And user apply status "InProgress" filter for "MANAGE"
        And user copy claim No from "00" and write it into csv file "A2"
        And user click on action menu and select bulk status change
        And user click on "CSV"
        And user type next status as "ManagerReview" and click on "InProgress ManagerReview"
        And uploads "Claim_Number.csv" as reference document
        And user type assignee as "Sumit"
        And user insert "commentSS.png" file as Comment
        And click on update button
        And Manager navigates to "MANAGE" page
        And User Clear filters
        And User applies claim number filter
        And clicks on a claim number
        And user clicks on comments button in claim details view
        Then user verify image is present in comment chat

    @smoke @audit_manager @MVT
    Scenario: Verify user can send comment with Rich Text Formating options
        When Manager navigates to "MANAGE" page
        And clicks on a claim number
        And user click on "Add Comment" button
        And user add comment as "Automation" with Rich Text Formatting options
        And user click on "POST" button
        And "Comment added successfully" message is displayed
        And user clicks on comments button in claim details view
        Then user verifies comment as "Automation" with Rich Text Formatting in comment chat
