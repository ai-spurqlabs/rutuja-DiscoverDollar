Feature: Claim Correction

    @smoke @audit_manager @MVT
    Scenario Outline: Audit manager want do download Claim Correction document, Edit and Upload document.
        When user navigates to "REVIEWS" view
        And User Clear filters
        And User apply claim type filter as "<claimType>"
        And User applies a status filter, changes the status from "InProgress" to "ManagerReview" sends "Sumit" for approval, and leaves the comment as "Automation"
        When Manager navigates to "MANAGE" page
        And User Clear filters
        And Manager applies filters as "<claimType>" and "ManagerReview"
        And User change first claim to "NeedsCorrection" and "Test Automation"
        And Manager click on edit icon
        And Manager click on download
        Then Manager verify "Line items exported successfully." and file present in download
        Then Manager verify the file upload "Request Submitted Successfully" "<change1>" "<change1cell>" "<change2>" "<change2cell>"
        Examples:
            | claimType           | change1                         | change1cell | change2                      | change2cell |
            | Statement Audit     | 12/13/2022                      | AB          | Statement Audit Discription  | Y           |

    @smoke @audit_manager @MVT
    Scenario Outline: Audit manager want do download Claim Correction document, Edit and Upload document.
        When user navigates to "REVIEWS" view
        And User Clear filters
        And User apply claim type filter as "<claimType>"
        And user changes the status of a claim from "InProgress" to "ManagerReview", "Sumit" for claim approval, "Automation" as comment
        And user changes the status of a claim from "ManagerReview" to "ReadyToSubmit", "" for claim approval, "Automation" as comment
        And user changes the status of a claim from "ReadyToSubmit" to "CTCReview", "Mano" for claim approval, "Automation" as comment
        When Manager navigates to "MANAGE" page
        And User Clear filters
        And Manager applies filters as "<claimType>" and "CTCReview"
        And User change first claim to "NeedsCorrection" and "Test Automation"
        And Manager click on edit icon
        And Manager click on download
        Then Manager verify "Line items exported successfully." and file present in download
        Then Manager verify the file upload "Request Submitted Successfully" "<change1>" "<change1cell>" "<change2>" "<change2cell>"
        Examples:
            | claimType       | change1    | change1cell | change2                     | change2cell |
            | Pricing         | 12/13/2022 | AS          | Pricing Discription         | V           |