Feature: Debug Navigation
  Test navigation elements availability

  @debug @auditor
  Scenario: Check navigation elements after login
    Given User is on the main dashboard after login
    When User attempts to navigate to manage section
