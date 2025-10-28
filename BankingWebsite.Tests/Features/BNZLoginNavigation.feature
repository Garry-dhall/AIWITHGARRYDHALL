Feature: BNZ Login Navigation
    As a BNZ customer
    I want to navigate to the login page
    So that I can access my internet banking

Background:
    Given I am on the BNZ homepage

Scenario: Navigate to login page from homepage
    When I click on the "Login" link
    Then I should be redirected to the login choices page
    And I should see the "Internet banking login" heading
    And I should see the "Choose type of Internet Banking" text
    And I should see "Personal" and "Business" login options

Scenario: Verify login page elements are visible
    When I navigate to the login choices page
    Then I should see the login page title "Internet Banking Login - BNZ"
    And I should see the "Internet banking login" heading
    And I should see the "Personal or Business" section
    And I should see the "Personal" login link
    And I should see the "Business" login link
    And I should see the "Client Fund Service" link
    And I should see the "WealthNet" link

Scenario: Navigate to Personal Internet Banking
    Given I am on the login choices page
    When I click on the "Personal" login option
    Then I should be redirected to the personal internet banking login page
    And the URL should contain "secure.bnz.co.nz/foyer/target/ib"

Scenario: Navigate to Business Internet Banking
    Given I am on the login choices page
    When I click on the "Business" login option
    Then I should be redirected to the business internet banking login page
    And the URL should contain "secure.bnz.co.nz/foyer/target/ib4b"

Scenario: Return to homepage from login page
    Given I am on the login choices page
    When I click on the BNZ logo
    Then I should be redirected to the homepage
    And I should see the homepage title "BNZ - Personal & Business Banking"

Scenario Outline: Verify login page links redirect correctly
    Given I am on the login choices page
    When I click on the "<linkText>" link
    Then I should be redirected to a page with URL containing "<expectedUrl>"

    Examples:
    | linkText           | expectedUrl                           |
    | Personal           | secure.bnz.co.nz/foyer/target/ib     |
    | Business           | secure.bnz.co.nz/foyer/target/ib4b   |
    | Client Fund Service| bnz.co.nz/cfs/app/login.html         |
    | WealthNet          | wealthnet.bnz.co.nz                   |