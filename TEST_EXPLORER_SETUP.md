# 🧪 Test Explorer Setup Guide

This guide will help you set up and use the Test Explorer for the BNZ Banking Test Automation project.

## 📋 Prerequisites

### Required VS Code Extensions
The following extensions will be automatically recommended when you open the project:

1. **C# Dev Kit** (`ms-dotnettools.csharp`) - Essential for C# development
2. **Test Explorer for VS Code** (`hbenl.vscode-test-explorer`) - Main test explorer
3. **.NET Test Explorer** (`formulahendry.dotnet-test-explorer`) - .NET specific test discovery
4. **Playwright Test for VS Code** (`ms-playwright.playwright`) - Playwright integration
5. **Cucumber (Gherkin) Support** (`alexkrechik.cucumberautocomplete`) - Feature file syntax
6. **Cucumber Syntax Highlighting** (`stevejpurves.cucumber`) - Better Gherkin highlighting

### System Requirements
- **.NET 9.0 SDK** or later
- **PowerShell 7+** (for browser installation)
- **Git** (for version control)

## 🚀 Quick Setup

### 1. Install Extensions
```bash
# VS Code will prompt you to install recommended extensions
# Or install manually:
code --install-extension ms-dotnettools.csharp
code --install-extension hbenl.vscode-test-explorer
code --install-extension formulahendry.dotnet-test-explorer
code --install-extension ms-playwright.playwright
```

### 2. Build Project & Install Dependencies
```bash
# Navigate to test project directory
cd BankingWebsite.Tests

# Restore NuGet packages
dotnet restore

# Build the project
dotnet build

# Install Playwright browsers
pwsh bin/Debug/net9.0/playwright.ps1 install
```

### 3. Verify Test Discovery
- Open VS Code Test Explorer panel (Testing icon in Activity Bar)
- You should see the BNZ test categories:
  - 🟢 **Smoke Tests**
  - 🔵 **Navigation Tests** 
  - 🟡 **Regression Tests**
  - 🟣 **Data-Driven Tests**

## 🎯 Test Categories & Organization

### Test Explorer Tree Structure
```
🗂️ BankingWebsite.Tests
├── 🟢 Smoke Tests
│   └── NavigateToLoginPageFromHomepage
├── 🔵 Navigation Tests
│   ├── NavigateToPersonalInternetBanking
│   ├── NavigateToBusinessInternetBanking
│   └── ReturnToHomepageFromLoginPage
├── 🟡 Regression Tests
│   └── VerifyLoginPageElements
└── 🟣 Data-Driven Tests
    └── VerifyLoginPageLinksRedirectCorrectly
```

### Available Test Categories
- **BNZ**: All BNZ banking tests
- **Smoke**: Quick validation tests
- **Navigation**: Page navigation tests
- **Regression**: Full feature validation
- **Login**: Login-specific functionality
- **UI**: User interface tests
- **Personal**: Personal banking tests
- **Business**: Business banking tests
- **HomePage**: Homepage-related tests
- **Links**: Link validation tests
- **DataDriven**: Parameterized tests

## 🔧 Running Tests

### Via Test Explorer GUI
1. **Open Test Explorer**: Click Testing icon (🧪) in Activity Bar
2. **Run Individual Tests**: Click ▶️ next to any test
3. **Run Categories**: Click ▶️ next to category folders
4. **Run All Tests**: Click ▶️ at the top level
5. **Debug Tests**: Click 🐛 next to any test for debugging

### Via Command Palette
- `Ctrl+Shift+P` → "Test: Run All Tests"
- `Ctrl+Shift+P` → "Test: Run Tests in Current File"
- `Ctrl+Shift+P` → "Test: Debug Tests in Current File"

### Via VS Code Tasks
Access via `Ctrl+Shift+P` → "Tasks: Run Task":

- **Build All Tests** - Compile the test project
- **Run All BNZ Tests** - Execute all tests with reporting
- **Run Smoke Tests** - Quick smoke test suite
- **Run Navigation Tests** - Navigation-specific tests
- **Debug Tests (Headed Mode)** - Visual browser debugging
- **Run Tests with Firefox** - Cross-browser testing
- **Install Playwright Browsers** - Setup browser binaries
- **Clean Test Results** - Clear output directories
- **Generate Test Report** - HTML test reports

### Via Terminal Commands
```bash
# Run all tests
dotnet test

# Run by category
dotnet test --filter "Category=Smoke"
dotnet test --filter "Category=Navigation"
dotnet test --filter "Category=BNZ"

# Run with specific browser
$env:BROWSER="firefox"; dotnet test
$env:BROWSER="webkit"; dotnet test

# Run in headed mode (visual)
$env:HEADLESS="false"; dotnet test

# Run with verbose output
dotnet test --logger "console;verbosity=detailed"

# Generate test report
dotnet test --logger "trx" --results-directory "./TestResults"
```

## 🎭 Browser Configuration

### Supported Browsers
- **Chromium** (default) - Fast, reliable
- **Firefox** - Alternative engine testing  
- **WebKit** - Safari-like testing

### Environment Variables
Set these in your terminal or VS Code settings:

```bash
# Browser selection
$env:BROWSER="chromium"    # or "firefox", "webkit"

# Execution mode
$env:HEADLESS="true"       # or "false" for visual
$env:TIMEOUT="30000"       # milliseconds
$env:BASE_URL="https://www.bnz.co.nz/"
```

## 📊 Test Results & Reporting

### Test Output Locations
- **Console Output**: VS Code Terminal
- **TRX Reports**: `./TestResults/` directory
- **Screenshots**: `./Reports/screenshots/` (on failure)
- **Videos**: `./Reports/videos/` (if enabled)
- **Logs**: VS Code Output panel

### Viewing Results
1. **Test Explorer**: Green ✅/Red ❌ indicators
2. **Problems Panel**: Failed test details
3. **Terminal**: Detailed execution logs
4. **Files**: Open generated HTML/TRX reports

## 🛠️ Troubleshooting

### Common Issues

#### Tests Not Appearing in Explorer
```bash
# Rebuild the project
dotnet clean
dotnet restore
dotnet build

# Reload VS Code window
Ctrl+Shift+P → "Developer: Reload Window"
```

#### Browser Installation Issues
```bash
# Reinstall browsers
pwsh BankingWebsite.Tests/bin/Debug/net9.0/playwright.ps1 install --force
```

#### Test Discovery Problems
```bash
# Check test project structure
dotnet test --list-tests

# Verify test adapter
dotnet test --logger "console;verbosity=diagnostic"
```

#### Permission Issues (Windows)
```powershell
# Run as Administrator if needed
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Getting Help
- Check the project README.md
- Review test output logs
- Open issues in the repository
- Consult Playwright documentation

## 🎯 Best Practices

### Running Tests
1. **Start with Smoke Tests** - Quick validation
2. **Use Headed Mode for Debugging** - Visual feedback
3. **Run Cross-Browser for CI/CD** - Comprehensive testing
4. **Generate Reports for Documentation** - Stakeholder updates

### Debugging Tests
1. **Use VS Code Debugger** - Set breakpoints in step definitions
2. **Enable Verbose Logging** - Detailed execution information
3. **Run Single Tests** - Isolate issues
4. **Check Screenshots** - Visual failure evidence

### Performance Tips
1. **Run Tests in Parallel** - Faster execution (use with caution)
2. **Use Headless Mode** - Reduced resource usage
3. **Clean Test Results** - Free up disk space
4. **Filter Test Categories** - Run only what you need

---

## 📝 Quick Reference Commands

| Action | Command |
|--------|---------|
| Build Tests | `dotnet build BankingWebsite.Tests/` |
| Run All Tests | `dotnet test` |
| Run Smoke Tests | `dotnet test --filter "Category=Smoke"` |
| Debug Mode | `$env:HEADLESS="false"; dotnet test` |
| Firefox Testing | `$env:BROWSER="firefox"; dotnet test` |
| Install Browsers | `pwsh bin/Debug/net9.0/playwright.ps1 install` |
| Clean Results | `Remove-Item -Recurse TestResults, bin, obj` |

Your Test Explorer is now fully configured for BNZ Banking test automation! 🎉