Feature: Export claimsheet

    @smoke @user @MVT
    Scenario: When the user navigates to the page and exports the claimsheet of custom claim and the claimsheet should be exported successfully
        When user clicks on Add claim
        And user selects "Pricing" claim type
        And user fills out the form with "formdata.json"
        And user attaches the claim sheet "PricingClaims.csv"
        And user clicks the Preview button
        And user click on check box
        And user gets the generated claimno and clicks the submit button
        Then user verfies that the claim is generated in the review bucket
        And user clicks on the options
        And clicks on export claimsheet
        Then the file should be downloaded successfully with "Downloaded Successfully" message




