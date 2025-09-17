Feature: Delete Referance Document

        @smoke @audit_manager @MVT
        Scenario Outline: User want to delete Reference Document
                When User navigates to "<page>" page
                And User click on claim number
                And uploads "<file>" as reference document                
                And User select file type as "<fileType>"
                Then User get add pop up as "<file>" and "<addMsg>"
                And User click on Close
                And User search for claim number and click on claim number
                And user click on Delete icon "<file>"
                Then User verifies message as "removed reference document"

                Examples:
                        | page   | file                 | fileType        | addMsg                            | 
                        | MANAGE | addAndDelRefDoc.xlsx | Billing Details | Reference docs added successfully |  