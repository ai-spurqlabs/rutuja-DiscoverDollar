Feature: Dashboard functionalities

    @audit_manager @MVT
    Scenario Outline: Verification on amount on dashboard for all claims tab
        When User clicks on overview and click on "ALL CLAIMS"
        And User apply "<banner>" filter and "<auditPeriod>" filter
        And User get amount and clicks on "<row>" and "<column>"
        And User get amount form each claim
        Then User verifies that overview amount and all claim total amount is same
        Examples:
            | banner | auditPeriod | row | column |
            | CTR    | 2025        | 2   | 3      |
            |        | 2022        | 3   | 4      |
            | FGL    | 2024        | 1   | 5      |
            | MARKS  | 2024        | 3   | 6      |

    @audit_manager
    Scenario Outline: Verification on amount on dashboard for Banner tab
        When User clicks on overview and click on "Banner"
        And User apply "<banner>" filter and "<auditPeriod>" filter for banner tab
        And User get amount and clicks on "<row>" and "<column>"
        And User get amount form each claim
        Then User verifies that overview amount and all claim total amount is same
        Examples:
            | banner | auditPeriod | row | column |
            | CTR    | 2025        | 2   | 3      |
            | TOTAL  | 2022        | 3   | 4      |
            | FGL    | 2024        | 1   | 5      |
            | MARKS  | 2024        | 5   | 6      |


    @audit_manager
    Scenario Outline: verify fullscreen view data in ALL CLAIMS tab
        When User clicks on overview and click on "ALL CLAIMS"
        And User apply "<banner>" filter and "<auditPeriod>" filter
        And Verify that "Banner" Column is present
        And Verify that "Banner" Column is present
        And User get amount and clicks on "<row>" and "<column>"
        And User get amount form each claim
        Then User verifies that overview amount and all claim total amount is same
        Examples:
            | banner | auditPeriod | row | column |
            | CTR    | 2024        | 2   | 3      |
            |        | 2022        | 3   | 4      |
            | FGL    | 2024        | 1   | 5      |
            | MARKS  | 2024        | 5   | 6      |

    @audit_manager
    Scenario Outline: verify fullscreen view data in Banner tab
        When User clicks on overview and click on "Banner"
        And User apply "<banner>" filter and "<auditPeriod>" filter for banner tab
        And User get amount and clicks on "<row>" and "<column>"
        And User get amount form each claim
        Then User verifies that overview amount and all claim total amount is same
        Examples:
            | banner | auditPeriod | row | column |
            | CTR    | 2024        | 2   | 3      |
            | TOTAL  | 2022        | 3   | 4      |
            | FGL    | 2024        | 1   | 5      |
            | MARKS  | 2024        | 5   | 6      |

@user @MVT
Scenario: Verification of export to excel feature
    When User clicks on overview and click on "ALL CLAIMS"
    And Click on export to excel
    Then Verify that "ClaimSummaryAsOf" file is downloaded




