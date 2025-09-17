Feature: Bulk Claim Upload

    @smoke @user @MVT
    Scenario:  verify if application display error message Unsupported file type
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Select Audit Period "2022"
        And Select Claim type "Stock Adjustment"
        And Uploads File "OA.xlsx"
        Then verify if application display error message "Unsupported file type"

    @smoke @user @MVT
    Scenario:  Verify submit button is disables if not select audit period and claim type
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Uploads File "StockAdjustmentSampleData test.csv"
        Then Submit Button is disable

    @smoke @audit_manager @MVT
    Scenario:  Verify error message if file is missing some coloumns
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Select Audit Period "2022"
        And Select Claim type "Stock Adjustment"
        And Uploads File "StockAdjustmentSampleData test error.csv"
        And Clicks on Submit Button
        Then User verify error message "Required columns are missing ( Banner ,Header Gross Amount ,Header Adjustment Amount ,Claim Source ,Generated Report ID ,Continuation Claim ) Re-Upload"

    @smoke @audit_manager @MVT
    Scenario: Verify tax amount for Claim type Statement Audit
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Select Audit Period "2022"
        And Select Claim type "Statement Audit"
        And Uploads File "Statement AuditTemplate.csv"
        And Clicks on Submit Button
        And Verify Claims are processed and generated with process status "COMPLETED"
        And User Export Claim Data and extract claim number from "E2"
        And User taps on "TO-DOS" option
        And User taps on review option
        And User Clears all filters
        And User applies claim number filter
        And User clicks on export
        And User gets tax amount data from "N2"
        Then User verify tax amount is "4.46887"

    @smoke @audit_manager @MVT
    Scenario:  Verify tax amount for Claim type Duplicate Payments
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Select Audit Period "2022"
        And Select Claim type "Duplicate Payments"
        And Uploads File "Duplicate PaymentsTemplate.csv"
        And Clicks on Submit Button
        And Verify Claims are processed and generated with process status "COMPLETED"
        And User Export Claim Data and extract claim number from "AC2"
        And User taps on "TO-DOS" option
        And User taps on review option
        And User Clears all filters
        And User applies claim number filter
        And User clicks on export
        And User gets tax amount data from "N2"
        Then User verify tax amount is "20"


    @smoke @audit_manager @MVT
    Scenario:  Verify tax amount for Claim type Miscellaneous or Others
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Select Audit Period "2022"
        And Select Claim type "Miscellaneous or Others"
        And Uploads File "Miscellaneous or OthersTemplate.csv"
        And Clicks on Submit Button
        And Verify Claims are processed and generated with process status "COMPLETED"
        And User Export Claim Data and extract claim number from "AF2"
        And User taps on "TO-DOS" option
        And User taps on review option
        And User Clears all filters
        And User applies claim number filter
        And User clicks on export
        And User gets tax amount data from "N2"
        Then User verify tax amount is "1.45"

    @smoke @audit_manager @MVT
    Scenario:  Verify tax amount for Claim type Miscellaneous or Others
        When User Navigate to Add menu
        And Select upload bulk Claim menu
        And Select Audit Period "2025"
        And Select Claim type "Costdown Promo and PAD Deal"
        And Uploads File "Costdown Promo and PAD DealTemplate.csv"
        And Clicks on Submit Button
        And Verify Claims are processed and generated with process status "COMPLETED"
        And User Export Claim Data and extract claim number from "BJ2"
        And User taps on "TO-DOS" option
        And User taps on review option
        And User Clears all filters
        And User applies claim number filter
        And User clicks on export
        And User gets tax amount data from "N2"
        Then User verify tax amount is "0"