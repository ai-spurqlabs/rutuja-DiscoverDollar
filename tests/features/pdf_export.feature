Feature: PDF Export claimsheet


    @smoke @user @filename @removefile @MVT
    Scenario: When user uploads a claimsheet of a  claim and downloads the claimsheet then the claimsheet download should be successful
        When user uploads claimsheet for a claim
        And user navigates to the Manage Claims page
        And User Clear applied filters
        And selects the claim
        And clicks on download pdf
        Then the file should be downloaded successfully with "Downloaded Successfully" message

