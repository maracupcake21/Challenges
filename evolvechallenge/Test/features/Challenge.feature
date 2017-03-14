Feature: Performance Test
   In order to verify tha Performance Test
   As a user of Performance Test
   I should be able to get the response time

   Scenario: Performance Test
   Given I open performance test page
   When I enter "travelport.com" in host textbox
   And I enter 15 as a number request
   Then I should get response time chart as a result