Feature: Globally search claim Number

    @user @MVT
    Scenario Outline: User want to search claim number globally
        When User navigates to "<bucket>" page
        And User Clear applied filters
        And User copy first claim number
        And User paste copied claim number in claim search box
        Then User verifies that claim number is same as we searched
        Examples:
            | bucket  |
            | REVIEWS |
            | MANAGE  |

    @user @MVT
    Scenario Outline: User search invalid claim number and get error msg
        When User navigates to "<bucket>" page
        And User type invalid claim number as "VAD11111111111111111"
        Then User verifies "Claim Number Not Found" message and "No Data found."
        Examples:
            | bucket  |
            | REVIEWS |
            | MANAGE  |


    @user @MVT
    Scenario Outline: User searches for "<scope>" in the global search banner
        When User searches for "<scope>" in the global search banner
        And User types the "<value>" in the search box
        Then User verifies the "<message>" is displayed with "<value>"
        Examples:
            | scope         | value            | message                 |
            | Claim Number  | VAD2500012       |                         |
            | Claim Number  | abc              | Claim Number Not Found  |
            | Vendor Name   | DYSON CANADA LTD |                         |
            | Vnedor Name   | -                | Vendor Name Not Found   |
            | Vendor Number | 321321           |                         |
            | Vendor Number | h                | Vendor Number Not Found |