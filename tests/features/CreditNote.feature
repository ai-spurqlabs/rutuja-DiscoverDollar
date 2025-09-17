Feature: Credit Note

    @smoke @user @MVT
    Scenario: user should have an option to attach reference document of type "Credit Note" to Claims
        When User navigates to "MANAGE" page
        # And User Clear applied filters
        And User click on claim number
        And uploads "claimsheet.xlsx" as reference document        
        And User select file type as "Credit Note"
        Then User get add pop up as "claimsheet.xlsx" and "Reference docs added successfully"


