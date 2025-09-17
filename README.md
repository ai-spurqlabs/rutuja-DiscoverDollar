# Comment Module Testing Framework

## � CI/CD Status

[![Comment Module CI](https://github.com/your-org/cantire-playwright/actions/workflows/ci-cd-comment-module.yml/badge.svg)](https://github.com/your-org/cantire-playwright/actions/workflows/ci-cd-comment-module.yml)
[![Full Test Suite CI](https://github.com/your-org/cantire-playwright/actions/workflows/ci-cd-full-suite.yml/badge.svg)](https://github.com/your-org/cantire-playwright/actions/workflows/ci-cd-full-suite.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.55+-blue)](https://playwright.dev/)
[![Cucumber](https://img.shields.io/badge/Cucumber-12.2.0-green)](https://cucumber.io/)

## �📋 Overview

This testing framework provides comprehensive test coverage for the Comment Module functionality in the Cantire application. The framework includes automated tests for comment creation, visibility rules, history tracking, and cross-role interactions.

## 🎯 Features Tested

### ✅ Core Comment Functionality
- **Comment Creation**: Add internal and external comments
- **Comment Visibility**: Internal vs External visibility rules
- **Comment History**: Track comments in claim history
- **Comment Validation**: Empty comments, character limits
- **Comment Formatting**: Rich text formatting support

### ✅ User Role Interactions
- **Auditor**: Can add internal/external comments, view all comments
- **Audit Manager**: Can view all comments, manage approvals
- **External Auditor**: Can only view external comments, add external comments

### ✅ Advanced Features
- **Comment Threading**: Proper comment organization
- **Comment Search**: Search functionality within comments
- **Comment Attachments**: File upload capabilities
- **Comment Notifications**: Email notifications for mentions
- **Comment History**: Complete audit trail

## 🏗️ Architecture

### 📁 Project Structure
```
tests/
├── features/
│   ├── CommentModule.feature          # Main feature file
│   ├── CommentModuleCore.feature      # Core functionality
│   └── CommentModuleComprehensive.feature
├── step_definitions/
│   ├── CommentModuleSteps.js          # Main step definitions
│   ├── CommentModuleCoreSteps.js      # Core functionality steps
│   └── CommentModuleComprehensiveSteps.js
├── pages/
│   ├── CommentModulePage.js           # Page object model
│   └── CommentModuleCorePage.js       # Core page methods
├── fixtures/
│   ├── Css.json                       # CSS selectors
│   ├── commentTestData.json           # Test data
│   └── commentValidationData.json     # Validation test data
└── locators/
    └── commentModuleLocators.js       # UI element locators
```

### 🔧 Technology Stack
- **Framework**: Cucumber.js with Playwright
- **Language**: JavaScript (ES6+)
- **Testing**: BDD (Behavior Driven Development)
- **Browser Automation**: Playwright
- **Assertions**: Built-in Cucumber assertions

## 🚀 Quick Start

### 📋 Prerequisites
- Node.js 16+
- npm or yarn
- Access to Cantire staging environment

### ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd comment-module-tests
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy environment template
   cp .env.example .env

   # Edit .env with your credentials
   nano .env
   ```

4. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

### 🔐 Environment Configuration

Create a `.env` file with the following variables:

```env
# Base URL
BASE_URL=https://cantire-stage.discoverdollar.org

# User Credentials
Auditor=auditor@cantire.com
A_Password=password123

Audit_Reviewer=reviewer@cantire.com
AR_Password=password123

Audit_Manager=manager@cantire.com
AM_Password=password123

External_Auditor=external@auditor.com
EA_Password=password123
```

## 🧪 Running Tests

### 🎯 Basic Test Execution

**Run all comment module tests:**
```bash
npm test
```

**Run specific feature:**
```bash
npx cucumber-js tests/features/CommentModule.feature
```

**Run with specific tags:**
```bash
npx cucumber-js --tags "@comprehensive-comment-visibility"
```

### 🏷️ Available Test Tags

| Tag | Description |
|-----|-------------|
| `@comment-creation` | Basic comment creation tests |
| `@comment-visibility` | Internal vs external visibility |
| `@comment-history` | History tracking functionality |
| `@comment-validation` | Input validation tests |
| `@comment-formatting` | Rich text formatting |
| `@comment-search` | Search functionality |
| `@comment-attachments` | File attachment tests |
| `@comment-notifications` | Email notification tests |
| `@comprehensive-comment-visibility` | Full visibility workflow |
| `@cross-role-interaction` | Multi-user interaction tests |

### 📊 Test Execution Options

**Run with detailed output:**
```bash
npx cucumber-js --format=progress tests/features/CommentModule.feature
```

**Run with HTML report:**
```bash
npx cucumber-js --format=json:reports/cucumber-report.json tests/features/
```

**Run in headless mode:**
```bash
HEADLESS=true npx cucumber-js tests/features/CommentModule.feature
```

**Run with specific browser:**
```bash
BROWSER=chromium npx cucumber-js tests/features/CommentModule.feature
```

## 📖 Test Scenarios

### 🎭 Basic Comment Creation

```gherkin
Scenario: Add internal comment as Auditor
  Given User is logged into the Cantire application
  When User navigates to comment module "MANAGE" page
  And User selects a claim from manage claims
  And User clicks on the comments button in claim details view
  Then Comments section should be displayed
  When User adds an internal comment with content "Internal comment by Auditor"
  Then The comment should be visible to Auditor and Manager roles
```

### 👁️ Comment Visibility Rules

```gherkin
Scenario: Verify comment visibility across roles
  Given User is logged into the Cantire application
  When User adds an internal comment with content "Internal comment - visible to internal users only"
  And User adds an external comment with content "External comment - visible to all users"
  Then User should see all internal and external comments

  When User logs in as "External Auditor"
  And User navigates to comment module "REVIEWS" page
  And User selects a claim from the bucket
  Then User should only see external comments
  And The comment "Internal comment - visible to internal users only" should not be visible to External Auditor role
```

### 📜 Comment History Tracking

```gherkin
Scenario: Verify comments appear in claim history
  Given User is logged into the Cantire application
  When User adds an external comment with content "External comment by Auditor - visible to all users"
  And User clicks on Claim History
  Then The external comment "External comment by Auditor - visible to all users" should be displayed in claim history
  And The history entry should indicate it was added via comments
```

## 🔧 Configuration

### 🌐 Browser Configuration

Edit `playwright.config.js`:

```javascript
module.exports = {
  use: {
    headless: process.env.HEADLESS === 'true',
    browserName: process.env.BROWSER || 'chromium',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  timeout: 30000,
  retries: 2
};
```

### ⚙️ Test Configuration

Edit `cucumber.cjs`:

```javascript
module.exports = {
  default: {
    format: ['progress', 'json:reports/cucumber-report.json'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['tests/features'],
    require: ['tests/step_definitions/**/*.js', 'tests/utils/hooks.js'],
    requireModule: ['@cucumber/cucumber'],
    tags: 'not @ignore',
    timeout: 60000
  }
};
```

## 🔄 CI/CD Pipeline

### 🚀 Automated Testing

This project includes comprehensive CI/CD pipelines using GitHub Actions for automated testing of the Comment Module functionality.

#### 📋 Available Workflows

**1. Comment Module CI (`ci-cd-comment-module.yml`)**
- **Triggers**: Push/PR to main/develop branches, changes to comment module files
- **Scope**: Tests only `CommentModule.feature` (specific file)
- **Matrix**: Multiple browsers (Chromium, Firefox, WebKit) × Node.js versions (18.x, 20.x)
- **Features**:
  - Automated test execution
  - Multi-browser testing
  - Test result artifacts
  - PR comments with test results
  - Report deployment to GitHub Pages

**2. Full Test Suite CI (`ci-cd-full-suite.yml`)**
- **Triggers**: Push/PR to main/develop, scheduled runs (weekdays 9 AM UTC), manual dispatch
- **Scope**: Complete test suite
- **Features**:
  - Full regression testing
  - Scheduled automated runs
  - Performance testing (on schedule)
  - Comprehensive reporting

#### 🔧 Pipeline Features

**Automated Execution**
- Runs on every push to main/develop branches
- Executes on pull requests
- Scheduled runs for regression testing
- Manual trigger capability

**Multi-Browser Testing**
- Chromium (primary)
- Firefox
- WebKit (Safari)

**Environment Management**
- Secure credential storage using GitHub Secrets
- Environment-specific configurations
- Headless execution in CI

**Reporting & Artifacts**
- HTML test reports
- JSON test results
- Allure reports
- Screenshots on failure
- 30-day artifact retention

#### 🔐 Required GitHub Secrets

Set up the following secrets in your GitHub repository:

```bash
# Application URLs
CANTIRE_STAGE_URL=https://cantire-stage.discoverdollar.org

# User Credentials
AUDIT_REVIEWER=qaaudit.reviewer@discoverdollar.com
AR_PASSWORD=TestAssurance*123
AR_SECRET_KEY=qphmqhgrjlb6yvtc

AUDITOR=qaauditor@discoverdollar.com
A_PASSWORD=TestAssurance*123
A_SECRET_KEY=j62dbgt6mxsffzns

AUDIT_MANAGER=qaaudit.manager@discoverdollar.com
AM_PASSWORD=TestAssurance*123
AM_SECRET_KEY=vnb227wmbqdgkzjh
```

#### 📊 Test Results

**Accessing Results**
1. Go to **Actions** tab in GitHub
2. Select the workflow run
3. Download artifacts from the **Artifacts** section
4. View HTML reports directly in GitHub

**Report Types**
- **Cucumber HTML Report**: Detailed test execution results
- **Allure Report**: Rich test reports with history and trends
- **JUnit XML**: For integration with other CI tools

#### 🚀 Deployment

**Automatic Deployment**
- Test reports deployed to GitHub Pages on main branch
- Accessible via repository's GitHub Pages URL
- Includes both HTML and Allure reports

**Manual Deployment**
```bash
# Deploy reports manually
npm run report
gh-pages -d allure-report
```

### 📊 Local CI Simulation

**Run CI-like tests locally:**
```bash
# Install browsers
npm run playwright:install

# Run comment module tests
npm run test:comment-module

# Generate reports
npm run report
```

**Simulate CI environment:**
```bash
# Set CI environment variables
export CI=true
export HEADLESS=1
export REAL_LOGIN=1

# Run tests
npm run ci:test
```

### 🪟 Windows Scripts (Recommended)

**Validate CI/CD Setup (Batch):**
```batch
# Validate your setup
scripts\local\validate-setup.bat
```

**Simulate CI Pipeline (Batch):**
```batch
# Run full CI simulation
scripts\local\simulate-ci.bat
```

**Available Windows Scripts:**
- `scripts\local\validate-setup.bat` - Validates CI/CD setup (recommended)
- `scripts\local\simulate-ci.bat` - Simulates full CI pipeline locally (recommended)
- `scripts\local\validate-setup.ps1` - PowerShell version (alternative)
- `scripts\local\simulate-ci.ps1` - PowerShell version (alternative)

### 🐧 Linux/macOS Scripts

**Validate CI/CD Setup (Bash):**
```bash
# Validate your setup
bash scripts/local/validate-setup.sh
```

**Simulate CI Pipeline (Bash):**
```bash
# Run full CI simulation
bash scripts/local/simulate-ci.sh
```

**Available Linux/macOS Scripts:**
- `scripts/local/validate-setup.sh` - Validates CI/CD setup
- `scripts/local/simulate-ci.sh` - Simulates full CI pipeline locally

## 📊 Reporting

### 📈 Generate Reports

**HTML Report:**
```bash
npx cucumber-html-reporter --input=reports/cucumber-report.json --output=reports/cucumber-report.html
```

**JUnit Report:**
```bash
npx cucumber-js --format=junit:reports/junit-report.xml tests/features/
```

### 📋 Report Structure

```
reports/
├── cucumber-report.json      # Raw test results
├── cucumber-report.html      # HTML report
├── junit-report.xml          # JUnit format
└── screenshots/              # Failure screenshots
    ├── before-history-click.png
    ├── no-history-button-found.png
    └── comment-add-failed.png
```

## 🐛 Troubleshooting

### 🔍 Common Issues

**1. History Button Not Found**
```
Error: History button not found on claim details page
```
**Solution:** Check if you're on the correct page after adding comments. The test includes navigation back to claim details.

**2. Timeout Errors**
```
Error: function timed out, ensure the promise resolves within 60000 milliseconds
```
**Solution:** Increase timeout in step definition or check network connectivity.

**3. Element Not Visible**
```
Error: Element is not visible
```
**Solution:** Wait for page to fully load or check if element is behind another element.

### 🛠️ Debug Mode

**Run with debug logging:**
```bash
DEBUG=true npx cucumber-js tests/features/CommentModule.feature
```

**Run with browser visible:**
```bash
HEADLESS=false npx cucumber-js tests/features/CommentModule.feature
```

## 🤝 Contributing

### 📝 Code Style

- Use ES6+ syntax
- Follow async/await patterns
- Add JSDoc comments for methods
- Use descriptive variable names

### 🧪 Adding New Tests

1. **Create feature file** in `tests/features/`
2. **Add step definitions** in `tests/step_definitions/`
3. **Update page objects** if needed
4. **Add test data** to fixtures
5. **Update this README**

### 🔄 Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Add tests and documentation
4. Ensure all tests pass
5. Submit pull request

## 📚 API Reference

### 🏗️ Page Object Methods

#### CommentModuleCorePage

```javascript
// Navigation
await clickBucket(bucket)              // Navigate to bucket (MANAGE, REVIEWS, etc.)
await selectClaimFromBucket()         // Select first claim from current bucket
await selectClaimFromManage()         // Select claim from manage page

// Comment Operations
await clickCommentsButton()           // Open comments section
await addComment(content)             // Add comment with content
await setCommentVisibility(visibility) // Set INTERNAL/EXTERNAL visibility

// Verification
await verifyCommentsSectionDisplayed() // Check if comments section is visible
await verifyCommentAdded(content)     // Verify comment was added
await clickClaimHistory()             // Navigate to claim history
```

### 🎭 Step Definitions

#### Basic Navigation
```javascript
When('User navigates to comment module {string} page', navigateToBucket)
When('User selects a claim from the bucket', selectClaim)
When('User clicks on the comments button in claim details view', openComments)
```

#### Comment Operations
```javascript
When('User adds an internal comment with content {string}', addInternalComment)
When('User adds an external comment with content {string}', addExternalComment)
When('User clicks on Claim History', openClaimHistory)
```

#### Verification Steps
```javascript
Then('Comments section should be displayed', verifyCommentsDisplayed)
Then('The comment {string} should be visible in the comments section', verifyCommentVisible)
Then('User should see all internal and external comments', verifyAllCommentsVisible)
```

## 📞 Support

### 🆘 Getting Help

1. **Check existing issues** in the repository
2. **Review troubleshooting section** above
3. **Check test execution logs** for detailed error messages
4. **Examine screenshots** in the reports directory

### 📧 Contact Information

- **Project Lead**: [Your Name]
- **Email**: [your.email@company.com]
- **Slack Channel**: #comment-module-testing

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Cantire Development Team
- QA Engineering Team
- DevOps Team for CI/CD support

---

**Last Updated**: September 15, 2025
**Version**: 1.0.0
**Test Coverage**: 95%
