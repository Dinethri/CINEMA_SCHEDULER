Feature: Cinema Scheduler Application
  The Cinema Scheduler App should allow an admin user to manage cinema shows.
  This feature verifies login, navigation, table behavior, sorting, form validation,
  typeahead, and saving new shows.

  Background:
    Given I launch the Cinema Scheduler application
    And I am on the Login Page

  # 1. Verify login function with correct credentials
  Scenario: Successful login with valid credentials
    When I login with username "Admin" and password "password"
    Then I should be redirected to the Dashboard
    And I should see the "Cinema List" tab
    And I should see the "Details" tab

  # 2. Verify login function with incorrect credentials
  Scenario: Failed login with invalid credentials
    When I login with username "wrong" and password "invalid"
    Then I should see an error message "Invalid username or password"

  # 3. Verify Dashboard tabs after login
  Scenario: Dashboard displays Cinema List and Details tabs after login
    When I login with username "Admin" and password "password"
    Then the Dashboard should show the following tabs:
      | Cinema List |
      | Details     |

  # 4. Verify Empty Cinema List table
  Scenario: Cinema List displays empty state when no shows exist
    Given I login with username "Admin" and password "password"
    When I navigate to the Cinema List tab
    Then I should see an empty table message "No shows available"

  # 5. Verify field values in Cinema List table
  Scenario: Cinema List should display correct table fields
    Given shows exist in the Cinema List
    When I navigate to the Cinema List tab
    Then the table should have the following columns:
      | Schedule ID |
      | Movie Title |
      | Theater     |
      | Show Time   |
      | Show Date   |
      | Subtitled   |
      | Premiere    |
      | Remarks     |

  # 6. Verify pagination in Cinema List
  Scenario: Pagination should work properly in Cinema List
    Given more than 10 shows exist
    When I navigate to the next page
    Then I should see the next set of records displayed

  # 7. Verify sorting for Schedule ID column
  Scenario: Sort Schedule ID column
    Given multiple shows exist
    When I click the Schedule ID column header
    Then the Schedule ID column should be sorted in ascending order
    When I click the Schedule ID column header again
    Then the Schedule ID column should be sorted in descending order

  # 8. Verify sorting for Movie Title column
  Scenario: Sort Movie Title column
    Given multiple shows exist
    When I click the Movie Title column header
    Then the Movie Title column should be sorted alphabetically A-Z
    When I click the Movie Title column header again
    Then the Movie Title column should be sorted alphabetically Z-A

  # 9. Verify sorting for Show Date column
  Scenario: Sort Show Date column
    Given multiple shows exist
    When I click the Show Date column header
    Then the Show Date column should be sorted from earliest to latest
    When I click the Show Date column header again
    Then the Show Date column should be sorted from latest to earliest

  # 10. Verify Export button when shows exist
  Scenario: Export button should be enabled when shows exist
    Given shows exist in the Cinema List
    When I navigate to the Cinema List tab
    Then the Export button should be enabled

  # 11. Verify New Show button visibility and navigation
  Scenario: New Show button should navigate to Details page
    Given I login with username "Admin" and password "password"
    When I click the New Show button
    Then I should be redirected to the Details page

  # 12. Verify Movie Title field typeahead
  Scenario: Movie Title input should show typeahead suggestions
    Given I am on the Details tab
    When I type "Av" into the Movie Title field
    Then I should see movie suggestions displayed
    And the suggestion list should contain "Avatar"

  # 13. Verify Show Date field validation
  Scenario: Show Date should not allow invalid dates
    Given I am on the Details tab
    When I enter an invalid date "32/13/2025" in the Show Date field
    Then I should see a validation error "Invalid date format"

  # 14. Save button with incomplete required fields
  Scenario: Save button disabled when required fields are missing
    Given I am on the Details tab
    When I leave required fields empty
    Then the Save button should be disabled

  # 15. Successful save of new show
  Scenario: Save a new show successfully
    Given I am on the Details tab
    When I fill in all required fields with valid values
    And I click the Save button
    Then the show should be saved successfully
    And I should see a confirmation message "Show created successfully"
    And the new show should appear in the Cinema List
