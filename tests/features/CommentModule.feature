Feature: Comment Module Functionality

  Background:
    Given User is logged into the Cantire application

  @test4
  Scenario Outline: Navigate to comments section via Global Search with internal steps
    When User navigates to comment module "<bucket>" page
    And User copies the first claim number
    And User searches for comment module "Claim Number" in the global search banner
    And User pastes the copied claim number in the search box
    And User selects the claim from search results
    And User clicks on the comments button in claim details view
    Then Comments section should be displayed
    Examples:
      | bucket  |
      | MANAGE  |

  @test4
  Scenario Outline: Navigate to TO-DO tabs and verify comments functionality
    When User navigates to comment module "To-dos" page
    And User clicks on "<todo_tab>" tab in TO-DO section
    And User selects first claim from the TO-DO tab
    Then User should see claim details page or skip if no claims available
    And User should see "Add comment" section on claim details if claims exist
    Examples:
      | todo_tab  |
      | Reviews   |
      | Resolve   |
      | Follow-Ups|
      | Approve   |

  @test4
  Scenario: Navigate to comments section via Manage Claims with internal steps
    When User navigates to comment module "MANAGE" page
    And User selects a claim from manage claims
    And User clicks on the comments button in claim details view
    Then Comments section should be displayed

  @test4
  Scenario Outline: Add internal comment as Auditor with complete flow
    When User navigates to comment module "MANAGE" page
    And User selects a claim from manage claims
    And User clicks on the comments button in claim details view
    And User adds an internal comment with content "<comment_text>"
    Then The comment "<comment_text>" should be visible in the comments section

    Examples:
      | comment_text                  |
      | Test internal comment by Auditor |

@test5
  Scenario Outline: Verify comment visibility for Auditor Reviewer role
    When User logs in as "Auditor Reviewer"
    And User navigates to comment module "MANAGE" page
    And User selects a claim from manage claims
    And User clicks on the comments button in claim details view
    Then Comments section should be displayed
    And The comment "<comment_text>" should be visible in the comments section
    And User should be able to view comments made by other roles

    Examples:
      | comment_text                  |
      | Test internal comment by Auditor |


  @test6
  Scenario: Verify comprehensive comment visibility rules across all user roles
    # Step 1: Add internal comment as Auditor
    When User navigates to comment module "MANAGE" page
    And User selects a claim from manage claims
    And User clicks on the comments button in claim details view
    And User adds an internal comment with content "Internal comment by Auditor - visible to internal users only"
    Then The comment "Internal comment by Auditor - visible to internal users only" should be visible in the comments section

    # Step 2: Add external comment as Auditor
    When User adds an external comment with content "External comment by Auditor - visible to all users"
    Then The comment "External comment by Auditor - visible to all users" should be visible in the comments section

    # Step 3: Verify external comments appear in claim history
    When User clicks on Claim History
    Then The external comment "External comment by Auditor - visible to all users" should be displayed in claim history

    # Step 5: Switch to Manager role and verify visibility
    When User logs in as "Audit Manager"
    And User navigates to comment module "MANAGE" page
    And User selects a claim from manage claims
    And User clicks on the comments button in claim details view
    Then Comments section should be displayed
    And The comment "Internal comment by Auditor - visible to internal users only" should be visible in the comments section
    And The comment "External comment by Auditor - visible to all users" should be visible in the comments section
    And User should see all internal and external comments
