@echo off
echo ===============================================
echo Validating CI/CD Setup for Comment Module Testing
echo ===============================================
echo.

echo [INFO] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found
    goto :error
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [SUCCESS] Node.js version: %NODE_VERSION%
)

echo.
echo [INFO] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found
    goto :error
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [SUCCESS] npm version: %NPM_VERSION%
)

echo.
echo [INFO] Checking project structure...
if not exist "package.json" (
    echo [ERROR] package.json not found
    goto :error
) else (
    echo [SUCCESS] package.json found
)

if not exist "playwright.config.js" (
    echo [ERROR] playwright.config.js not found
    goto :error
) else (
    echo [SUCCESS] playwright.config.js found
)

if not exist "cucumber.cjs" (
    echo [ERROR] cucumber.cjs not found
    goto :error
) else (
    echo [SUCCESS] cucumber.cjs found
)

if not exist ".env" (
    echo [WARNING] .env file not found
) else (
    echo [SUCCESS] .env file found
)

if not exist "tests\features\CommentModule.feature" (
    echo [ERROR] CommentModule.feature not found
    goto :error
) else (
    echo [SUCCESS] CommentModule.feature found
)

echo.
echo [INFO] Checking for other CommentModule files...
if exist "tests\features\CommentModule*.feature" (
    for /f %%i in ('dir /b tests\features\CommentModule*.feature 2^>nul ^| find /c "CommentModule"') do set FILE_COUNT=%%i
    if !FILE_COUNT! gtr 1 (
        echo [WARNING] Multiple CommentModule feature files found. CI/CD will only use CommentModule.feature
    ) else (
        echo [SUCCESS] Only CommentModule.feature found (as expected)
    )
) else (
    echo [WARNING] No CommentModule feature files found
)

if not exist ".github\workflows\ci-cd-comment-module.yml" (
    echo [ERROR] CI/CD workflow not found
    goto :error
) else (
    echo [SUCCESS] CI/CD workflow found
)

echo.
echo [INFO] Checking dependencies...
if not exist "node_modules" (
    echo [WARNING] node_modules not found - run 'npm install'
    goto :error
) else (
    echo [SUCCESS] node_modules directory exists
)

echo.
echo [INFO] Checking package.json scripts...
findstr /C:"\"test:comment-module\":" package.json >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] test:comment-module script not found
) else (
    echo [SUCCESS] test:comment-module script found
)

findstr /C:"\"ci:test\":" package.json >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] ci:test script not found
) else (
    echo [SUCCESS] ci:test script found
)

echo.
echo ===============================================
echo [SUCCESS] CI/CD setup validation completed!
echo.
echo [INFO] You can now run:
echo [INFO]   npm run ci:test
echo [INFO]   .\scripts\local\simulate-ci.bat
echo.
goto :end

:error
echo.
echo ===============================================
echo [ERROR] CI/CD setup validation failed!
echo.
echo [INFO] Please fix the errors above and run this script again
exit /b 1

:end
echo [INFO] Validation completed successfully
exit /b 0
