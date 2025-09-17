Feature: Bulk status changes

    @smoke @MVT @audit_manager
    Scenario Outline: Verify that Auditor can change bulk status from REVIEW and APPROVE bucket
        When user navigate to "<bucket>" bucket
        And User Clear applied filters
        And user select multiple claims
        And user click on actions menu and select bulk status change
        And user select status "<status>", assignee "<assignee>" and add comment "<comment>"
        Then verify bulk status change is successful
        Examples:
            | status     | assignee  | comment    | bucket  |
            | PeerReview | qaauditor | Automation | REVIEWS |

    @smoke @user @MVT
    Scenario: Verify that Auditor can't change bulk status without selecting claim
        When user navigate to "REVIEWS" bucket
        And User Clear applied filters
        And user click on action menu and select bulk status change
        Then verify Submit button is disable

    @smoke @user @MVT
    Scenario: Verify that Auditor can't change bulk claim status of other Auditors
        When user navigate to "REVIEWS" bucket
        And User Clear applied filters
        And user apply USER filter "qaauditor@discoverdollar.com"
        And user select multiple claims
        And user click on action menu and select bulk status change
        And user select valid status "PeerReview", assignee "srigowri@discoverdollar.com" and add comment "Automation"
        Then verify Submit button is disable

    @smoke @audit_manager @MVT
    Scenario Outline: User want to change status using csv file and verify status as Completed
        When User navigates to "<bucket>" page
        And User Clear applied filters
        And user apply status "<currentStatus>" filter for "<bucket>"
        And user copy claim No from "<claimRow1>" and write it into csv file "<cellID1>"
        And user copy claim No from "<claimRow2>" and write it into csv file "<cellID2>"
        And user click on action menu and select bulk status change
        And user click on "<changeStatusType>"
        And user type next status as "<nextStatus>" and click on "<dropdownStatus>"
        Then user verify pervious and next status as "<changeStatusFromTo>"
        When uploads "Claim_Number.csv" as reference document
        And user type assignee as "<assignee>"
        And user type comment as "<comment>"
        And click on update button
        Then the file should be downloaded successfully with "<popUpMsg>" message
        Then user verify status as "<Status>"
        Examples:
            | bucket | currentStatus | claimRow1 | cellID1 | claimRow2 | cellID2 | changeStatusType | nextStatus    | dropdownStatus           | changeStatusFromTo                   | assignee | comment                              | popUpMsg                       | Status    |
            | MANAGE | PeerReview    | 00        | A2      | 10        | A3      | CSV              | ManagerReview | PeerReview ManagerReview | ( From PeerReview to ManagerReview ) | Sumit    | ( From PeerReview to ManagerReview ) | Request Submitted Successfully | COMPLETED |
