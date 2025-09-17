Feature: Notifications

    @smoke @user @MVT
    Scenario:  when user changes the status of the claim then the user should receive a notifcation
        When user navigates to "REVIEWS" view
        And User cleares "AUDIT PERIOD " filter
        And user changes the status of a claim from "InProgress" to "ManagerReview", "qaaudit.manager@discoverdollar.com" for claim approval, "Automation" as comment
        Then user should receive a notification with "Claim Status Changed" message

    @smoke @audit_manager @MVT
    Scenario: Audit manager should be able to approve the claim request sent by user
        When the manager navigates to the notification view
        And manager receives a notification with "Claim Approval Request"
        And manager clicks on the claim approval request
        And User cleares "AUDIT PERIOD " filter
        Then the manager should be able to change the status of the claim to "ReadyToSubmit", "Automation" as comment
        And "Status Changed Successfully" message is displayed