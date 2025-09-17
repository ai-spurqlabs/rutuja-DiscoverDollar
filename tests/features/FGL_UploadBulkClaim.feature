Feature: Upload Bulk Claim functionality

    @smoke @user @MVT
    Scenario: Verify upload Bulk claim functionaity for fgl claim
        When User taps on Add option
        And User taps on upload claim option
        And User select audit period
        And User select "Vendor Rebate" claim type
        And User upload claim file "Vendor RebateTemplate.csv"
        And User tap on submit button
        And User verifies message "Request Submitted"
        Then User verfies status as "COMPLETED"

    @smoke @user @MVT
    Scenario: Verify user can download claim data
        When User taps on Add option
        And User create claim through upload bulk claim for "Vendor Rebate" claim with file "Vendor RebateTemplate.csv" and verifies "Request Submitted" and "COMPLETED"
        And User taps on download option
        Then User verifies '.csv' in download folder
