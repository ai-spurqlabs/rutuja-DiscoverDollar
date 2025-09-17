Feature: Internal External Comments

    @smoke  @auditReviewer
    Scenario Outline: Check comments by Audit reviewer is visible by Auditor
        # When user log in to "<account>" with "<jwt>"
        When user chooses "<bucket>"
        And User Clear applied filters
        And user filters claimno and selects it for "<account>" "<bucket>"
        And user clicks on comments button in claim details view
        Then user "<verify>" comment "<equality>" and "<addcomment>" with "<content>" also "<visibility>"
        @auditReviewer @MVT
        Examples:
            | account        | jwt            | bucket  | verify | equality | addcomment | content | visibility |
            | Audit Reviewer | jwtTokenAR.txt | APPROVE |        |          | yes        | AudRev  |            |
        @user @MVT
        Examples:
            | account | jwt           | bucket | verify | equality | addcomment | content | visibility         |
            | Auditor | jwtTokenA.txt | MANAGE | AudRev | yes      | yes        | Auditor | INTERNALLY VISIBLE |
            | Auditor | jwtTokenA.txt | MANAGE | AudRev | yes      | yes        | Auditor | EXTERNALLY VISIBLE |
        @audit_manager @MVT
        Examples:
            | account       | jwt           | bucket | verify  | equality | addcomment | content      | visibility         |
            | Audit Manager | jwtTokenM.txt | MANAGE | Auditor | yes      | yes        | internal mgr | INTERNALLY VISIBLE |
            | Audit Manager | jwtTokenM.txt | MANAGE | Auditor | yes      | yes        | external mgr | EXTERNALLY VISIBLE |
