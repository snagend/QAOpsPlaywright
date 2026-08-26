Feature: Ecommerce Validations

  Scenario: Placing the order
    Given a login to Ecommerce application with "vns77@vns.com" and "Test@12345"
    When Add "zara coat 3" to cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details and place the order
    Then Verify order is present in the OrderHistory


  @regression
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
    | username      | password          |
    | rahulshetty   | Learning@830$3mK2 | 
    | hello@123.com | Iamhello@12       |

