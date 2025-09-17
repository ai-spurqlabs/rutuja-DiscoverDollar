Feature: Cancel Claim Creation

    @smoke @audit_manager @MVT
    Scenario: Verifying user can cancel claim
        When User clicks on To-do
        And User clicks on "REVIEWS"
        And User Clear applied filters
        And user apply USER filter "qaaudit.manager@discoverdollar.com"
        And User clicks On Action
        And User clicks on cancel claim
        Then User verifies message as "claim cancelled successfully"
        And User clicks on filter
        Then User verifies message as "0 Claims"

    @user @MVT
    Scenario: Verifying user can cancel a claim from the manage claim bucket.
        When User clicks on To-do
        And User clicks on Manage bucket
        And User clicks on claims
        And User Clear applied filters
        And User clicks on "Status" filter icon and apply "InProgress"
        And User clicks on "User" filter icon and apply "qaauditor@discoverdollar.com"
        And User clicks On Action
        And User clicks on cancel claim
        Then User verifies message as "claim cancelled successfully"
        And User clicks on claim filter for manage bucket
        Then User verifies message as "0 Claims"

