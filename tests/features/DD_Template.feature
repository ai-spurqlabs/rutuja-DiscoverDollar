Feature: Export DD Template

        @smoke @user @MVT
        Scenario Outline: User want to Export DD Template.
                When User navigates to "<bucket>" page
                And User Clear applied filters
                And User apply claim type filter as "<claimTYpe>"
                And User copy 1st claim number
                And User paste copied claim number to "<fileName>" file at cell no "<cellNo>"
                And User clicks on Export option
                And User click on "<dropdownOption>" option
                And Uploads File "<fileName>"
                And User click on export button
                And "<popupMsg>" message is displayed
                And User click on Request status icon
                And user verify status as "<status>"
                And Click on output file icon
                And User gets the path of latest downloaded file
                And User unzipped the downloaded file
                Then User verifies that exported file contains same claim number in cell "B2"
                Examples:
                        | bucket | claimTYpe           | fileName             | cellNo | dropdownOption | popupMsg          | status    |
                        | MANAGE | Vendor Funds Billed | UploadDDTemplateVFB.csv | A2     | DD Template    | Request Submitted | COMPLETED |
                        | MANAGE | Stock Adjustment    | UploadDDTemplateSA.csv | A2     | DD Template    | Request Submitted | COMPLETED |
