Feature: Manual Claim creation

    @smoke @user @MVT
    Scenario:  Create Manual Pricing Claim
        When user clicks on Add claim
        And user selects "Pricing" claim type
        And user fills out the form with "formdata.json"
        And user attaches the claim sheet "PricingClaims.csv"
        And user clicks the Preview button
        And user click on check box
        And user gets the generated claimno and clicks the submit button
        Then user verfies that the claim is generated in the review bucket

    @smoke @MVT @user
    Scenario: Validation of error messages when user enters invalid values for Stock adjustment claim type
        When user clicks on Add claim
        And user selects "Stock Adjustment" claim type
        Then user types value for field and verifies error message:
            | Field         | Value      | Errormsg                                                                      |
            | Claim Batch   | abc        | Claim Batch field is allowed only a number                                    |
            | Claim Batch   | 1          | Claim Batch Should be 2 digit                                                 |
            | CBM Number    | sa         | CBM Number field is allowed only a number                                     |
            | CBM Number    | 3          | CBM Number Should be 3 digit                                                  |
            | Vendor Number | 1          | Vendor Number Should be 4 digit                                               |
            | Adj Date      | 07/02/2022 | Adj Date Should always be greater than Effective date                         |
            | CTC product   | 1          | CTC Product Should be 7 digit                                                 |
            | Sub Total     | 1          | Sub Total Should be equal to the product of PO Price and Adj Quantity         |
            | Peoplesoft    | abc        | peoplesoft field is allowed only a number                                     |
            | Peoplesoft    | 1          | peoplesoft Should be 10 digit                                                 |
            | Claim Amount  | 1          | CLAIM_AMOUNT should be equal to multiplication of subtotal and allowance rate |


    @smoke @MVT  @user
    Scenario Outline: Validation of error messages when user enters invalid values for Pricing claim type
        When user clicks on Add claim
        And user selects "Pricing" claim type
        Then user types value for field and verifies error message:
            | Field            | Value           | Errormsg                                                        |
            | Legacy Vendor ID | 123             | Legacy Vendor ID always 4 digit                                 |
            | Peoplesoft ID    | 12              | Peoplesoft ID always 10 digit                                   |
            | Peoplesoft ID1   | sa              | Peoplesoft ID field is allowed only a number                    |
            | CBM ID           | 13              | CBM ID always 3 digit                                           |
            | NET AMOUNT       | 100             | Net Amount should be equal to Gross Amount                      |
            | SKU              | 111             | SKU always 7 digit                                              |
            | PO_SKU           | 111             | PO_SKU should always be 15 digits                               |
            | PO_SKU1          | 111111111111111 | Should be a combination of PO_NUMBR and SKU                     |
            | PO_NUMBR         | 111             | PO_NUMBR always 8 Digits                                        |
            | COST DIFF        | 100             | Cost Diff should be difference between paid cost and quote cost |



    @smoke @user @MVT
    Scenario Outline:  Verify Tax Amount is present in claims export file after creating specific claims
        When user clicks on Add claim
        And user selects "<claimType>" claim type
        And user fills out "<claimType>" form with "<formData>"
        And user attaches the claim sheet "<claimSheet>"
        And user clicks the Preview button
        And user click on check box
        And user gets the generated claimno and clicks the submit button
        And user verifies that the SA claim is generated in the review bucket
        And User clicks on export
        And User gets tax amount data from "N2"
        Then User verify tax amount is "4.46887"
        Examples:
            | claimType               | formData      | claimSheet                |
            | Statement Audit         | formdata.json | StockAdjustmentClaims.csv |
            | Duplicate Payments      | formdata.json | StockAdjustmentClaims.csv |
            | Miscellaneous or Others | formdata.json | PricingClaims.csv         |