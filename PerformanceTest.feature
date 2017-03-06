Feature: Performance Test
  As a performance tester
  I want to go to a page to verify the response time from different locations
  So that I can compare the response time from different locations

  Scenario: Page loaded in USA end-point
    Given I go to the page in USA end-point
    When Page is loaded
    Then Result is a response time

  Scenario: Page loaded in EUR end-point
    Given I go to the page in EUR end-point
    When Page is loaded
    Then Result is a response time

  Scenario: Page loaded
    Given I go to the page in APAC end-point
    When Page is loaded
    Then Result is a response time
