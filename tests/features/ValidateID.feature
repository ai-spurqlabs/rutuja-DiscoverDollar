Feature: Validate generated claim ID

@smoke @user 
Scenario: Verify newly generated claimID in reviews
When User taps on Add option
And User taps on claims option
And User select "Vendor Rebate" from claim type
And User fills up claim info as "test" "1234" "12345678" "10" "10" "test" " " " " and upload "claimsheet.xlsx"
And user click on check box
And User taps on "Submit" button
And User taps on "TO-DOS" option
And User taps on review option
And User taps on claim number filter
Then User verifies generated id in results
