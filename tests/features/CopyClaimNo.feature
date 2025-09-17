Feature: Copy Claim number 

 @smoke @user @MVT
Scenario: Validate Copy Claim number feature in Manage Claim page
When user clicks Manage claim option
And user clicks Claim option
And user validates copied claim number in first claim 
And user clicks claim details view for the first claim
Then user validates copied claim number in details view "MANAGE"

 @smoke @audit_manager @MVT
Scenario Outline: Validate Copy Claim number feature in Todo buckets
When user clicks Todo option
And user clicks "<bucket>"
And user validates copied claim number in first claim 
And user clicks claim details view for the first claim
Then user validates copied claim number in details view "<bucket>"

Examples:
    | bucket      | 
    | REVIEWS     |
    | RESOLVE     |
    | FOLLOW-UPS  |
    | APPROVE     |

 @user
Scenario: Validate Copy Claim number feature in Status Change
When user clicks Todo option
And user visits "REVIEWS" bucket
And user clicks Change status option for first claim
Then user validates copied claim number in the Change status modal 

 @user
Scenario Outline: Verify that Auditor can change bulk status from REVIEW and APPROVE bucket
When user clicks Todo option
And user visits "REVIEWS" bucket
And user filters "InProgress" status
And user selects multiple claims
And user click on action menu and select bulk status change
Then user verifies copied claim numbers