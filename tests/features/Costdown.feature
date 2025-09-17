Feature: Costdown Claim type

    @smoke @user @MVT
    Scenario Outline: Add Costdown claim
        When user clicks on Add claim
        And user selects "<Claim Type>" claim type
        And enters1 "<Deal Type>" "<Banner>" "<Audit year>" "<Audit Period>"
        And enters2 "<Vendor name>" "<Peoplesoft ID>" "<Legacy>" "<CBM ID>" "<CBM Name>"
        And enters3 "<Claim Type>" "<Currency>" "<Program name>" "<Program code>" "<VAD>" "<Deal year>" "<Contract number>" "<Contract date>"
        And enters4 "<Claim Type>" "<Actual_H>" "<Billed_I>" "<IAS_J>" "<Other_K>" "<Net_HIJK>" "<Claim Description>"
        And enters5 "<ClaimSource>" "<GeneratedReportID>" "<ContinuationClaim>"
        And enters 6 line "<dealnum>" "<prod>" "<proddesc>" "<startdte>" "<enddte>" "<dealqty_A>" "<totalqty_A>" "<qtyB>" "<qtydiff>" "<perunit_C>" "<billed_D>" "<difference_C-D>" "<total_A*C_E>" "<billed_B*D_F>" "<claimAmt_E-F_G>" "<postCD>" "<VADclaim>" "<netAmt>"
        And user attaches the claim sheet "PricingClaims.csv"
        And user clicks the Preview button
        And user click on check box
        Then User verifies "Claim ID Generated" message on page
        Examples:
            | Claim Type                            | Deal Type  | Banner | Audit year | Audit Period | Vendor name | Peoplesoft ID | Legacy | CBM ID | CBM Name | Currency | Program name | Program code | VAD  | Deal year | Contract number | Contract date | Actual_H | Billed_I | IAS_J | Other_K | Net_HIJK | Claim Description | ClaimSource | GeneratedReportID | ContinuationClaim | dealnum | prod    | proddesc | startdte   | enddte     | dealqty_A | totalqty_A | qtyB | qtydiff | perunit_C | billed_D | difference_C-D | total_A*C_E | billed_B*D_F | claimAmt_E-F_G | postCD | VADclaim | netAmt |
            | Costdown Margin O and A or Promo Deal | Margin O&A | CTR    | 2025       | 2025         | Test        | 1234567890    | 1ab2   | 123    | test123  | USD      | Cost down    | 027          | VAD1 | 2022      | 12345           | 11/14/2022    | 10       | 5        | 2     | 2       | 1        | testDescription   | DD          | 123               | Yes               | 1234    | 1237459 | prod     | 06/09/2025 | 06/29/2025 | 5         | 5          | 4    | 1       | 5         | 4        | 1              | 25          | 16           | 9              | 1      | 1        | 7      |
