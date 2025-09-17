Feature: Checking user visibility for Audit rviewer role

@smoke @auditReviewer @MVT
Scenario Outline: Verifying user visibility for audit reviewer role 
When User navigate to "<BarOption>"
Then User checks visibility of usertable in table
Examples:
    | BarOption |
    | To-Dos    | 
    | Manage    |
