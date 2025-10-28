# BNZ Banking Website Test Automation Framework

## Overview
This is a comprehensive test automation framework for the BNZ (Bank of New Zealand) website, built using Playwright for browser automation and Cucumber for Behavior Driven Development (BDD).

## Framework Architecture

### 🏗️ Structure
```
Tests/
├── Features/                    # Gherkin feature files
│   └── LoginNavigation.feature  # Login navigation scenarios
├── Steps/                       # Step definitions
│   ├── HomePageSteps.ts        # Home page step implementations
│   └── LoginPageSteps.ts       # Login page step implementations
├── PageObjects/                 # Page Object Model
│   ├── HomePage.ts             # Home page elements and methods
│   └── LoginPage.ts            # Login page elements and methods
├── Constants/                   # Test configuration and constants
│   └── TestConstants.ts        # URLs, timeouts, test data
├── Utilities/                   # Support utilities
│   ├── BrowserContext.ts       # Browser management
│   └── Hooks.ts                # Test lifecycle hooks
├── Reports/                     # Test execution reports
│   └── screenshots/            # Test failure screenshots
├── TestData/                    # Test data files
├── Config/                      # Configuration files
├── cucumber.config.js          # Cucumber configuration
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
1. Navigate to the Tests directory:
   ```bash
   cd Tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Basic Test Execution
```bash
# Run all tests
npm run test

# Run specific feature
npm run test:login

# Run with specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run in headed mode (visible browser)
npm run test:headed

# Run smoke tests only
npm run test:smoke

# Run critical tests only
npm run test:critical
```

### Cucumber Profiles
```bash
# Run with specific Cucumber profile
npm run cucumber -- --profile smoke
npm run cucumber -- --profile critical
npm run cucumber -- --profile regression
npm run cucumber -- --profile development
```

### Tag-based Execution
```bash
# Run tests with specific tags
npm run cucumber -- --tags "@smoke"
npm run cucumber -- --tags "@critical"
npm run cucumber -- --tags "not @skip"
```

## 📝 Test Scenarios

### Login Navigation Feature
- **Background**: Navigate to BNZ homepage
- **Scenarios**:
  - Navigate to Personal Banking login
  - Navigate to Business Banking login
  - Verify login page elements
  - Test navigation accessibility
  - Validate page URLs and titles

### Test Tags
- `@smoke`: Essential functionality tests
- `@critical`: High-priority business scenarios
- `@positive`: Happy path scenarios
- `@alternative`: Alternative user flows
- `@accessibility`: Accessibility compliance tests
- `@navigation`: Navigation-specific tests
- `@skip`: Temporarily disabled tests
- `@wip`: Work in progress tests

## 🛠️ Framework Components

### Page Object Model
**HomePage.ts**
- Navigation elements (login buttons, menus)
- Page verification methods
- Element interaction utilities

**LoginPage.ts**
- Login form elements
- Authentication options
- Page validation methods

### Step Definitions
**Parameterized Steps**: Reusable steps with parameters
```gherkin
When I click on the "Personal Banking" login button
Then I should see the "Personal Banking Login" page title
```

### Browser Management
**BrowserContext.ts**
- Singleton pattern for browser instance management
- Multi-browser support (Chrome, Firefox, Safari)
- Screenshot capture on failures
- Browser lifecycle management

### Constants and Configuration
**TestConstants.ts**
- Base URLs and endpoints
- Page titles and text expectations
- Timeout configurations
- Test data constants

## 📊 Reporting

### Report Types
1. **HTML Reports**: Interactive browser-based reports
2. **JSON Reports**: Machine-readable test results
3. **JUnit XML**: CI/CD integration format
4. **Screenshots**: Automatic capture on test failures

### Report Locations
- HTML: `Tests/Reports/cucumber-report.html`
- JSON: `Tests/Reports/cucumber-report.json`
- JUnit: `Tests/Reports/cucumber-junit.xml`
- Screenshots: `Tests/Reports/screenshots/`

## 🔧 Configuration

### Playwright Configuration
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Viewport**: Desktop (1280x720), Mobile (375x667)
- **Timeouts**: Configurable per action type
- **Retry**: Failed test retry mechanism
- **Parallel**: Concurrent test execution

### Cucumber Configuration
- **Multiple Profiles**: Default, smoke, critical, regression, development
- **Reporting**: HTML, JSON, JUnit formats
- **Tag Filtering**: Include/exclude specific test categories
- **Parallel Execution**: Configurable worker count
- **Retry Logic**: Automatic retry for flaky tests

## 🐛 Bug Reports

During initial testing, the following bugs were identified:

### High Priority
1. **Radio Button Selection Bug**: Unable to select radio buttons in forms
2. **API CORS Errors**: Cross-origin request failures for certain endpoints

### Medium Priority
3. **Font Loading Issues**: Custom fonts failing to load properly
4. **LaunchDarkly Configuration**: Feature flag service errors

### Low Priority
5. **Facebook Tracking Errors**: Social media tracking pixel failures
6. **Resource Loading**: Minor CSS/JS resource loading delays

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: BNZ Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:smoke
      - run: npm run test:critical
```

## 📚 Best Practices

### Test Writing
1. **Use meaningful scenario names** that describe business value
2. **Keep scenarios focused** on single functionality
3. **Use parameterized steps** for reusability
4. **Tag scenarios appropriately** for proper categorization
5. **Write descriptive step definitions** with clear assertions

### Page Objects
1. **Encapsulate page elements** and interactions
2. **Use meaningful element selectors** (data-testid preferred)
3. **Implement wait strategies** for dynamic content
4. **Return page objects** for method chaining
5. **Handle dynamic elements** gracefully

### Maintenance
1. **Regular dependency updates** for security and features
2. **Review and update selectors** when UI changes
3. **Monitor test execution times** and optimize slow tests
4. **Clean up obsolete test data** and screenshots
5. **Document framework changes** and updates

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Add appropriate tags to new scenarios
3. Update documentation for new features
4. Ensure tests pass locally before committing
5. Write clear commit messages

## 📞 Support

For framework issues or questions:
1. Check existing documentation
2. Review test execution logs
3. Verify environment setup
4. Check browser compatibility
5. Contact the QA team for assistance

---

**Framework Version**: 1.0.0  
**Last Updated**: October 2024  
**Playwright Version**: 1.40.0  
**Cucumber Version**: 10.0.0