Feature: VFB claim Type Integration

    @smoke @user @MVT
    Scenario Outline: Verify user can create claim
        When user clicks on Add claim
        And user selects "<Claim Type>" claim type
        And user attaches the claim sheet "PricingClaims.csv"
        And line1 "<Audit Period>" "<Banner>" "<Claim Batch>" "<Claim Prefix>"
        And line2 "<CBM>" "<Currency>" "<Vendor Number>" "<Vendor Name>"
        And line3 "<Year>" "<Peoplesoft>" "<Program Name>" "<Claim Code>"
        And line4 "<PRODUCT>" "<PO NUMBER>" "<LOAD DATE>" "<QUOTE COST>"
        And line5 "<UNT>" "<EXPLANATION>" "<CORRECT RATE>" "<APPLIED RATE>"
        And line6 "<CORRECT BILLING>" "<BILLED AMOUNT>" "<CLAIM AMOUNT>" "<DESCRIPTION>"
        And line7 "<PERIOD>" "<COMMENT>" "<SOURCE>"
        And enters5 "<ClaimSource>" "<GeneratedReportID>" "<ContinuationClaim>"
        And user clicks the Preview button
        And user click on check box
        Then User verifies "Claim ID Generated" message on page
        Examples:
            | Claim Type          | Audit Period | Banner | Claim Batch | Claim Prefix | CBM | Currency | Vendor Number | Vendor Name | Year | Peoplesoft | Program Name | Claim Code | PRODUCT | PO NUMBER | LOAD DATE  | QUOTE COST | UNT | EXPLANATION | CORRECT RATE | APPLIED RATE | CORRECT BILLING | BILLED AMOUNT | CLAIM AMOUNT | DESCRIPTION | PERIOD                | COMMENT | SOURCE |ClaimSource | GeneratedReportID | ContinuationClaim |Location|
            | Vendor Funds Billed | 2022         | CTR    | 12          | VAD1         | 123   | USD      | 1234          | test        | 2021 | 12345678   |  INITIAL FILL      | 72       | 1234567 | 12345     | 11/15/2022 | 10         | 1   | test        | 1            | 0            | 1               | 50            | 10           | test        | 11/15/2022-11/20/2022 | test    | test   |DD          | 123               | Yes               |20|

    @smoke @user @MVT
    Scenario: Verifying user can upload file through Bulk Claim update
        When User taps on Add option
        And User taps on upload claim option
        And User select audit period
        And User select Vendor Funds Billed claim
        And User upload claim file "Vendor Funds BilledTemplate.csv"
        And User tap on submit button
        And User waits till status is "COMPLETED"
        Then User Click on Download icon and file gets download

