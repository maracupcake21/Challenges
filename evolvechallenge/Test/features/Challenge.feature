Feature: Performance Test
   In order to verify the Performance Test Challenge
   As a user of Performance Test Challenge
   I should be able to get the response time

   Scenario: Performance Test
   Given I open performance test for "Evolve Challenge"
   When I enter "travelport.com" in host textbox
   And I enter 15 as a number request
   Then I should get response time chart
   And I verify the response times
   And finish