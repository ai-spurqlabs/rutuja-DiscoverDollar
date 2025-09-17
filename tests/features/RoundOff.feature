Feature: RoundOff feature

    @smoke @user @MVT
    Scenario: Verify user can check round off functionality via upload
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Select Audit Period "2024"
        And Select Claim type "Stock Adjustment"
        And Uploads File "Stock AdjustmentTemplate.csv"
        And Clicks on Submit Button
        And Verify claimsheets are processed and generated with process status "COMPLETED" 
        And Click on output file icon
        Then Verify that "ExportData" file is downloaded