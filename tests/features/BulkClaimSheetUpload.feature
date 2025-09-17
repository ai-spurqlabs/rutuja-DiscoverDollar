Feature: Bulk ClaimSheet Upload

    @smoke @user @MVT
    Scenario:  Upload Bulk Claimsheet and verify that the request is successfully processed
        When user clicks on Add Menu
        And Selects upload bulk Claim
        And Selects Upload Claimsheets
        And Uploads Bulk Claimsheets "BulkClaimSheet.zip"
        And Clicks Submit Button
        And Verify claimsheets are processed and generated with process status "COMPLETED"
        Then Verify "[ SUCCESS ]" is displayed

    @user @MVT
    Scenario:  Upload wrong Bulk Claimsheet zip file and verify that the error is displayed
        When user clicks on Add Menu
        And Selects upload bulk Claim
        And Selects Upload Claimsheets
        And Uploads Bulk Claimsheets "BulkCS_wrongfile.zip"
        And Clicks Submit Button
        And Verify claimsheets are processed and generated with process status "ERROR"
        Then Verify "[ ERROR ]" is displayed
