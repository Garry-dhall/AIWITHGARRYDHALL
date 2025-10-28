@login @navigation @smoke
Feature: Navigate to Login Page
  As a BNZ customer
  I want to navigate to the login page
  So that I can access my internet banking account

  Background:
    Given I navigate to the BNZ website

  @critical
  Scenario: Successfully navigate to login choices page
    When I click on the "Login" button in the header
    Then I should be redirected to the login choices page
    And I should see the page title "Internet Banking Login - BNZ"
    And I should see the heading "Internet banking login"
    And I should see login options for "Personal" and "Business"

  @positive
  Scenario Outline: Navigate to specific login type
    When I click on the "Login" button in the header
    And I click on the "<loginType>" login option
    Then I should be redirected to the "<loginType>" login page
    And the URL should contain "<expectedUrlPart>"

    Examples:
      | loginType | expectedUrlPart |
      | Personal  | secure.bnz.co.nz/foyer/target/ib |
      | Business  | secure.bnz.co.nz/foyer/target/ib4b |

  @alternative
  Scenario: Navigate to alternative login services
    When I click on the "Login" button in the header
    Then I should see alternative login options
    And I should see "Client Fund Service" option
    And I should see "WealthNet" option

  @accessibility
  Scenario: Verify login page accessibility elements
    When I click on the "Login" button in the header
    Then the login page should have proper accessibility elements
    And the page should have a main heading
    And navigation elements should be accessible

  @navigation
  Scenario: Navigate back to homepage from login page
    When I click on the "Login" button in the header
    And I click on the BNZ logo
    Then I should be redirected back to the homepage
    And I should see the homepage title "BNZ - Personal & Business Banking"