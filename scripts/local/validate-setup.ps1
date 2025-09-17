# CI/CD Setup Validation Script for Comment Module Testing
# This script validates the local environment for CI/CD compatibility

param(
    [switch]$Help
)

if ($Help) {
    Write-Host "CI/CD Setup Validation Script for Comment Module Testing" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\validate-setup.ps1 [options]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  -Help    Show this help message" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Description:" -ForegroundColor Yellow
    Write-Host "  Validates the local environment for CI/CD compatibility" -ForegroundColor Yellow
    Write-Host "  Checks Node.js, npm, project structure, dependencies, and workflows" -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

Write-Host "Validating CI/CD Setup for Comment Module Testing" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# Function to print status
function Write-Status {
    param([string]$Status, [string]$Message)

    switch ($Status) {
        "success" { Write-Host "[SUCCESS] $Message" -ForegroundColor Green }
        "warning" { Write-Host "[WARNING] $Message" -ForegroundColor Yellow }
        "error" { Write-Host "[ERROR] $Message" -ForegroundColor Red }
        "info" { Write-Host "[INFO] $Message" -ForegroundColor Blue }
    }
}

# Check Node.js version
function Test-NodeJS {
    Write-Host "📦 Checking Node.js..." -ForegroundColor Blue

    try {
        $nodeVersion = & node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            $version = $nodeVersion -replace '^v', ''
            $majorVersion = [int]($version -split '\.')[0]

            if ($majorVersion -ge 18) {
                Write-Status "success" "Node.js version: $version (compatible)"
                return $true
            } else {
                Write-Status "warning" "Node.js version: $version (recommended: 18+)"
                return $true
            }
        } else {
            Write-Status "error" "Node.js not found"
            return $false
        }
    } catch {
        Write-Status "error" "Node.js not found"
        return $false
    }
}

# Check npm
function Test-NPM {
    Write-Host "📦 Checking npm..." -ForegroundColor Blue

    try {
        $npmVersion = & npm --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Status "success" "npm version: $npmVersion"
            return $true
        } else {
            Write-Status "error" "npm not found"
            return $false
        }
    } catch {
        Write-Status "error" "npm not found"
        return $false
    }
}

# Check project structure
function Test-ProjectStructure {
    Write-Host "📁 Checking project structure..." -ForegroundColor Blue

    $requiredFiles = @(
        "package.json",
        "playwright.config.js",
        "cucumber.cjs",
        ".env",
        "tests/features/CommentModule.feature",
        ".github/workflows/ci-cd-comment-module.yml"
    )

    $missingFiles = @()

    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            $missingFiles += $file
        }
    }

    if ($missingFiles.Count -eq 0) {
        Write-Status "success" "All required files present"
        return $true
    } else {
        Write-Status "error" "Missing files: $($missingFiles -join ', ')"
        return $false
    }
}

# Check dependencies
function Test-Dependencies {
    Write-Host "🔧 Checking dependencies..." -ForegroundColor Blue

    if (-not (Test-Path "node_modules")) {
        Write-Status "warning" "node_modules not found - run 'npm install'"
        return $false
    }

    # Check for key dependencies
    $keyDeps = @("@cucumber/cucumber", "@playwright/test", "allure-playwright")
    $allDepsFound = $true

    foreach ($dep in $keyDeps) {
        try {
            $result = & npm list $dep 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Status "success" "Dependency $dep installed"
            } else {
                Write-Status "error" "Dependency $dep not found"
                $allDepsFound = $false
            }
        } catch {
            Write-Status "error" "Dependency $dep not found"
            $allDepsFound = $false
        }
    }

    return $allDepsFound
}

# Check Playwright browsers
function Test-Playwright {
    Write-Host "🌐 Checking Playwright browsers..." -ForegroundColor Blue

    try {
        $playwrightVersion = & npx playwright --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Status "success" "Playwright CLI available"

            if (Test-Path "node_modules/playwright") {
                Write-Status "success" "Playwright browsers directory exists"
                return $true
            } else {
                Write-Status "warning" "Playwright browsers not installed - run 'npx playwright install'"
                return $false
            }
        } else {
            Write-Status "error" "Playwright not properly installed"
            return $false
        }
    } catch {
        Write-Status "error" "npx not available"
        return $false
    }
}

# Check environment variables
function Test-Environment {
    Write-Host "🔐 Checking environment variables..." -ForegroundColor Blue

    if (Test-Path ".env") {
        Write-Status "success" ".env file exists"

        $requiredVars = @("Cantire_Stage_URL", "Auditor", "A_Password")
        $missingVars = @()
        $envContent = Get-Content ".env" -Raw

        foreach ($var in $requiredVars) {
            if ($envContent -notmatch "^$var=") {
                $missingVars += $var
            }
        }

        if ($missingVars.Count -eq 0) {
            Write-Status "success" "All required environment variables configured"
            return $true
        } else {
            Write-Status "warning" "Missing environment variables: $($missingVars -join ', ')"
            return $false
        }
    } else {
        Write-Status "error" ".env file not found"
        return $false
    }
}

# Check GitHub Actions workflows
function Test-Workflows {
    Write-Host "⚙️  Checking GitHub Actions workflows..." -ForegroundColor Blue

    $workflowFiles = @(
        ".github/workflows/ci-cd-comment-module.yml",
        ".github/workflows/ci-cd-full-suite.yml"
    )

    $allWorkflowsFound = $true

    foreach ($workflow in $workflowFiles) {
        if (Test-Path $workflow) {
            Write-Status "success" "Workflow $workflow exists"
        } else {
            Write-Status "error" "Workflow $workflow not found"
            $allWorkflowsFound = $false
        }
    }

    return $allWorkflowsFound
}

# Check test files
function Test-TestFiles {
    Write-Host "🧪 Checking test files..." -ForegroundColor Blue

    $testPatterns = @(
        "tests/features/CommentModule*.feature",
        "tests/step_definitions/CommentModule*.js"
    )

    $allPatternsFound = $true

    foreach ($pattern in $testPatterns) {
        $matches = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue
        if ($matches) {
            Write-Status "success" "Test files found: $pattern"
        } else {
            Write-Status "warning" "No test files found: $pattern"
            $allPatternsFound = $false
        }
    }

    return $allPatternsFound
}

# Validate package.json scripts
function Test-Scripts {
    Write-Host "📜 Checking package.json scripts..." -ForegroundColor Blue

    if (Test-Path "package.json") {
        $packageContent = Get-Content "package.json" -Raw
        $requiredScripts = @("test:comment-module", "ci:test", "playwright:install")
        $allScriptsFound = $true

        foreach ($script in $requiredScripts) {
            if ($packageContent -match "`"$script`":") {
                Write-Status "success" "Script $script defined"
            } else {
                Write-Status "warning" "Script $script not found in package.json"
                $allScriptsFound = $false
            }
        }

        return $allScriptsFound
    } else {
        Write-Status "error" "package.json not found"
        return $false
    }
}

# Main validation function
function Start-Validation {
    $errors = 0

    Write-Host "🚀 Starting CI/CD setup validation..." -ForegroundColor Green
    Write-Host ""

    # Run all checks
    if (-not (Test-NodeJS)) { $errors++ }
    if (-not (Test-NPM)) { $errors++ }
    if (-not (Test-ProjectStructure)) { $errors++ }
    if (-not (Test-Dependencies)) { $errors++ }
    if (-not (Test-Playwright)) { $errors++ }
    if (-not (Test-Environment)) { $errors++ }
    if (-not (Test-Workflows)) { $errors++ }
    if (-not (Test-TestFiles)) { $errors++ }
    if (-not (Test-Scripts)) { $errors++ }

    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan

    if ($errors -eq 0) {
        Write-Status "success" "CI/CD setup validation completed successfully!"
        Write-Host ""
        Write-Status "info" "You can now run: npm run ci:test"
        Write-Status "info" "Or simulate CI: .\scripts\local\simulate-ci.ps1"
        return $true
    } else {
        Write-Status "error" "CI/CD setup validation failed with $errors error(s)"
        Write-Host ""
        Write-Status "info" "Please fix the errors above and run this script again"
        return $false
    }
}

# Run main function
Start-Validation
