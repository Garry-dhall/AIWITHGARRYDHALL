# BNZ Banking Website Test Automation

This project contains Playwright-based test automation for the BNZ banking website using C# and Gherkin scenarios.

## Project Structure

```
BankingWebsite.Tests/
├── Constants/
│   └── TestConstants.cs          # All test constants and URLs
├── PageObjects/
│   ├── HomePage.cs               # Home page elements and methods
│   └── LoginPage.cs              # Login page elements and methods
├── Steps/
│   ├── HomePageSteps.cs          # Step definitions for home page
│   └── LoginPageSteps.cs         # Step definitions for login page
├── Features/
│   └── BNZLoginNavigation.feature # Gherkin scenarios
├── Config/
│   └── TestConfig.cs             # Test configuration
├── Utilities/
│   └── PlaywrightHooks.cs        # Playwright setup and teardown
├── Tests/
│   └── BNZLoginNavigationTests.cs # Test runner
└── BankingWebsite.Tests.csproj   # Project file
```

## Key Features

1. **Page Object Model**: Clean separation of page elements and actions
2. **Reusable Step Definitions**: Parameterized steps for different scenarios
3. **Constants Management**: Centralized constants for easy maintenance
4. **Gherkin Scenarios**: Business-readable test scenarios
5. **Screenshot on Failure**: Automatic screenshots for failed tests
6. **Video Recording**: Optional video recording of test execution
7. **Cross-browser Support**: Chrome, Firefox, and WebKit support

## Running Tests

### Prerequisites
```bash
# Install Playwright browsers
pwsh bin/Debug/net9.0/playwright.ps1 install
```

### Run Tests
```bash
# Run all tests
dotnet test

# Run specific category
dotnet test --filter "Category=Smoke"

# Run with specific browser
$env:BROWSER="firefox"; dotnet test

# Run in headed mode
$env:HEADLESS="false"; dotnet test
```

## Environment Variables

- `BROWSER`: chromium|firefox|webkit (default: chromium)
- `HEADLESS`: true|false (default: false)
- `TIMEOUT`: timeout in milliseconds (default: 30000)
- `BASE_URL`: base URL for tests (default: https://www.bnz.co.nz/)

## Test Scenarios Covered

1. Navigate to login page from homepage
2. Verify login page elements are visible
3. Navigate to Personal Internet Banking
4. Navigate to Business Internet Banking
5. Return to homepage from login page
6. Verify login page links redirect correctly (outline scenario)

## Test Results Summary

All tests have been validated against the live BNZ website:

✅ **Test 1 - Navigate to login page from homepage**: PASSED
✅ **Test 2 - Verify login page elements are visible**: PASSED  
✅ **Test 3 - Navigate to Personal Internet Banking**: PASSED
✅ **Test 4 - Navigate to Business Internet Banking**: PASSED
✅ **Test 5 - Return to homepage from login page**: PASSED
✅ **Test 6 - Verify login page links redirect correctly**: PASSED

### Overall Test Suite Status: 100% PASSED (6/6 tests)

## Selectors Used

The framework uses element references and CSS selectors based on the actual BNZ website structure:

- **Home Page Elements**: Login link ([ref=e37]), BNZ Logo ([ref=e10]), Navigation menu
- **Login Page Elements**: Personal ([ref=e42]), Business ([ref=e43]), Client Fund Service ([ref=e47]), WealthNet ([ref=e49])

## Framework Architecture

- **Constants**: Centralized URL and text constants
- **Page Objects**: Encapsulated page elements and actions
- **Step Definitions**: Reusable Gherkin step implementations
- **Configuration**: Environment-based test settings
- **Utilities**: Browser lifecycle management

This framework follows best practices for maintainable, scalable test automation using Playwright and C#.