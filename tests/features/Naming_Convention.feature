Feature:Change in naming convention of CSV file

    @smoke @user @MVT
    Scenario Outline:  Verify the name of ClaimSheet downloaded after claim creation is in format PeoplesoftID_LocationNo._ClaimNo.
        When user clicks on Add claim
        And user selects "<claimType>" claim type
        And user fills out "<claimType>" form with "<formData>"
        And user attaches the claim sheet "<claimSheet>"
        And user clicks the Preview button
        And user click on check box
        And user gets the generated claimno and clicks the submit button
        And user verifies that the SA claim is generated in the review bucket
        And user click on actions menu and select "DOWNLOAD CLAIMSHEET"
        Then user verifies the downloaded file name is in the format PeoplesoftID_LocationNo_ClaimNo

        Examples:
            | claimType       | formData      | claimSheet                |
            | Statement Audit | formdata.json | StockAdjustmentClaims.csv |
