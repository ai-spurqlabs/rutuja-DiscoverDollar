Feature: Miscellaneous or Others

    @smoke @user @MVT
    Scenario Outline: Create Manual Miscellaneous or Others Claim
        When user clicks on Add claim
        And user selects "Miscellaneous or Others" claim type
        And user select Banner as "<Banner>" select claim type as "<claimType>" and fills data as "formdata.json"
        And user attaches the claim sheet 'PricingClaims.csv'
        And user clicks the Preview button
        And user click on check box
        And user gets the generated claimno and clicks the submit button
        Then user verfies that the claim is generated in the review bucket
        
        Examples:
            | Banner | claimType                      |
            | CTR    | Cash Discount                  |
            | CTR    | Cost Down                      |
            | FGL    | Defective Allowance            |
            | FGL    | Volume Rebate                  |
            | MARKS  | Handling Charge Due on Returns |
            | MARKS  | Duplicate Payments             |
