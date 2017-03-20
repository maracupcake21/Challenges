Feature: Performance Test
   In order to verify the Performance Test Challenge
   As a user of Performance Test Challenge
   I should be able to get the response time

   Scenario Outline: Performance Test
   Given I open performance test for "Evolve Challenge"
   When I enter <hostname> in host textbox
   And I enter <nrequest> as a number request
   Then I should get response time chart
   And I verify the response times
   And Supose to <finish>


     Examples:
    | hostname       | nrequest | finish |
    | travelport.com |  20      | no     |
    | travelport.com |  20      | no     |
    | google.com     |  15      | no     |
    | google.com     |  15      | no     |
    | twitter.com    |  12      | no     |
    | travelport.com |  16      | no     |
    | google.com     |  20      | no     |
    | google.com     |  15      | no     |
    | travelport.com |  20      | no     |
    | travelport.com |  20      | yes    |
    