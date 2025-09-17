Feature: PDF Icon Present

  @smoke @user @MVT
  Scenario:  Create Manual Claim and verify that PDF icon is Present
    When user clicks on Add claim
    And user selects "Pricing" claim type
    And user fills out the form with "formdata.json"
    And user attaches the claim sheet "PricingClaims.csv"
    And user clicks the Preview button
    And user click on check box
    And user gets the generated claimno and clicks the submit button
    Then user verfies that the claim is generated in the review bucket
    And user verifies that PDF icon is Present