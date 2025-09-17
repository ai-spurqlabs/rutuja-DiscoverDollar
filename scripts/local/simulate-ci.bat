@echo off
echo ===============================================
echo Simulating CI/CD Pipeline for Comment Module Testing
echo ===============================================
echo.

echo [INFO] Repository: %CD%
echo [INFO] Started at: %DATE% %TIME%
echo.

echo [INFO] Step: Validate Setup
if not exist "package.json" (
    echo [ERROR] package.json not found
    goto :error
)
if not exist "playwright.config.js" (
    echo [ERROR] playwright.config.js not found
    goto :error
)
if not exist "cucumber.cjs" (
    echo [ERROR] cucumber.cjs not found
    goto :error
)
echo [SUCCESS] Setup validation passed
echo.

echo [INFO] Step: Setup CI Environment
set CI=true
set HEADLESS=1
set REAL_LOGIN=1
set NODE_ENV=test
echo [SUCCESS] CI environment configured
echo.

echo [INFO] Step: Install Dependencies
echo Command: npm ci
call npm ci
if %errorlevel% neq 0 (
    echo [ERROR] Dependencies installation failed
    goto :error
)
echo [SUCCESS] Dependencies installed
echo.

echo [INFO] Step: Install Playwright Browsers
echo Command: npx playwright install --with-deps
call npx playwright install --with-deps
if %errorlevel% neq 0 (
    echo [ERROR] Playwright browsers installation failed
    goto :error
)
echo [SUCCESS] Playwright browsers installed
echo.

echo [INFO] Step: Setup Test Directory
if not exist "test-results" mkdir test-results
echo [SUCCESS] Test directory created
echo.

echo [INFO] Step: Run Comment Module Tests
echo Command: npx cucumber-js tests/features/CommentModule.feature --format json:test-results/cucumber-results.json --format html:test-results/cucumber-report.html --format summary
call npx cucumber-js tests/features/CommentModule.feature --format json:test-results/cucumber-results.json --format html:test-results/cucumber-report.html --format summary
set TEST_EXIT_CODE=%errorlevel%
echo.

if %TEST_EXIT_CODE% neq 0 (
    echo [WARNING] Some tests failed (exit code: %TEST_EXIT_CODE%)
) else (
    echo [SUCCESS] All tests completed
)

echo.
echo [INFO] Step: Generate Allure Report
if exist "allure-results" (
    echo Command: npm run report
    call npm run report
    if %errorlevel% neq 0 (
        echo [WARNING] Allure report generation failed
    ) else (
        echo [SUCCESS] Allure report generated
    )
) else (
    echo [WARNING] No allure-results directory found - skipping Allure report
)
echo.

echo ===============================================
echo Test Execution Summary
echo ===============================================

if exist "test-results\cucumber-results.json" (
    echo [INFO] Test results available in: test-results\cucumber-results.json
    echo [INFO] HTML report available in: test-results\cucumber-report.html
) else (
    echo [WARNING] Test results file not found
)

if exist "allure-report" (
    echo [INFO] Allure report available in: allure-report\index.html
)

echo.
echo ===============================================
echo [SUCCESS] CI/CD simulation completed!

if %TEST_EXIT_CODE% equ 0 (
    echo [SUCCESS] All tests passed!
    goto :end
) else (
    echo [WARNING] Some tests failed
    goto :end
)

:error
echo.
echo ===============================================
echo [ERROR] CI/CD simulation failed!
echo.
exit /b 1

:end
echo [INFO] Simulation completed
exit /b %TEST_EXIT_CODE%
