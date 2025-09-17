Feature: User want to check Aging of Claim 

@user @MVT
Scenario: User want to verify the age of claim
    When User navigates to "MANAGE" page
    And User Clear applied filters
    And User apply filter of status as "CBMReview"
    And User clicks on export and claims
    And User get aging data from "C2" and "X2" xlsx file
    Then User verify aging is correct