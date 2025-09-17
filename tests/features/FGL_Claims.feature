Feature: FGL claim functionality

    @smoke @user  @MVT
    Scenario Outline: Verify user can create claim for different claim types
        When User taps on Add option
        And User taps on claims option
        And User select "<claim type>" from claim type
        And User fills up claim info as "test" "1234" "12345678" "10" "10" "test" "12" and upload "claimsheet.xlsx"
        Then User verifies "Claim ID Generated" message on page
        And user click on check box
        And user gets the generated claimno and clicks the submit button

        Examples:
            | claim type    |
            | Vendor Rebate |
            | Volume Rebate |
