Feature: Ecommerce Validations
  @regression
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
    | username      | password          |
    | rahulshetty   | Learning@830$3mK2 | 
    | hello@123.com | Iamhello@12       |