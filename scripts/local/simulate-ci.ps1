# CI/CD Simulation Script for Comment Module Testing
# This script simulates the CI/CD pipeline locally for testing purposes

param(
    [switch]$Help,
    [switch]$Headless = $true,
    [string]$Browser = "chromium"
)

if ($Help) {
    Write-Host "CI/CD Simulation Script for Comment Module Testing" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\simulate-ci.ps1 [options]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  -Help           Show this help message" -ForegroundColor Yellow
    Write-Host "  -Headless       Run tests in headless mode (default: true)" -ForegroundColor Yellow
    Write-Host "  -Browser        Browser to use (chromium, firefox, webkit) (default: chromium)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Environment Variables:" -ForegroundColor Yellow
    Write-Host "  HEADLESS=0      Run with browser visible" -ForegroundColor Yellow
    Write-Host "  CI=true         Enable CI mode (default: true)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\simulate-ci.ps1" -ForegroundColor Yellow
    Write-Host "  .\simulate-ci.ps1 -Headless:$false" -ForegroundColor Yellow
    Write-Host "  .\simulate-ci.ps1 -Browser firefox" -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

Write-Host "Simulating CI/CD Pipeline for Comment Module Testing" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Colors for output
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"
$Blue = "Blue"
$Cyan = "Cyan"

# Function to print status
function Write-Status {
    param([string]$Status, [string]$Message)

    switch ($Status) {
        "success" { Write-Host "[SUCCESS] $Message" -ForegroundColor $Green }
        "warning" { Write-Host "[WARNING] $Message" -ForegroundColor $Yellow }
        "error" { Write-Host "[ERROR] $Message" -ForegroundColor $Red }
        "info" { Write-Host "[INFO] $Message" -ForegroundColor $Blue }
    }
}

# Function to simulate CI step
function Invoke-Step {
    param(
        [string]$StepName,
        [string]$Command
    )

    Write-Host ""
    Write-Status "info" "Step: $StepName"
    Write-Host "Command: $Command" -ForegroundColor $Blue

    try {
        Invoke-Expression $Command
        if ($LASTEXITCODE -eq 0) {
            Write-Status "success" "$StepName completed"
            return $true
        } else {
            Write-Status "error" "$StepName failed"
            return $false
        }
    } catch {
        Write-Status "error" "$StepName failed: $($_.Exception.Message)"
        return $false
    }
}

# Set CI environment variables
function Set-CIEnvironment {
    Write-Host "🔧 Setting up CI environment..." -ForegroundColor $Blue

    $env:CI = "true"
    $env:HEADLESS = if ($Headless) { "1" } else { "0" }
    $env:REAL_LOGIN = "1"
    $env:NODE_ENV = "test"
    $env:BROWSER = $Browser

    # Load environment variables from .env if it exists
    if (Test-Path ".env") {
        Get-Content ".env" | ForEach-Object {
            if ($_ -match '^([^=]+)=(.*)$') {
                $key = $matches[1]
                $value = $matches[2]
                Set-Item -Path "env:$key" -Value $value
            }
        }
        Write-Status "success" "Environment variables loaded from .env"
    } else {
        Write-Status "warning" ".env file not found - using system environment"
    }
}

# Validate setup before running
function Test-Setup {
    Write-Host "🔍 Validating setup..." -ForegroundColor $Blue

    $requiredFiles = @(
        "package.json",
        "playwright.config.js",
        "cucumber.cjs"
    )

    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            Write-Status "error" "$file not found"
            return $false
        }
    }

    Write-Status "success" "Setup validation passed"
    return $true
}

# Install dependencies
function Install-Dependencies {
    return Invoke-Step "Install Dependencies" "npm ci"
}

# Install Playwright browsers
function Install-Browsers {
    return Invoke-Step "Install Playwright Browsers" "npx playwright install --with-deps"
}

# Create test results directory
function New-TestDirectory {
    return Invoke-Step "Setup Test Directory" "if (-not (Test-Path 'test-results')) { New-Item -ItemType Directory -Path 'test-results' | Out-Null }"
}

# Run Comment Module tests
function Start-CommentModuleTests {
    $testCommand = "npx cucumber-js tests/features/CommentModule.feature " +
                   "--format json:test-results/cucumber-results.json " +
                   "--format html:test-results/cucumber-report.html " +
                   "--format summary"

    return Invoke-Step "Run Comment Module Tests" $testCommand
}

# Generate Allure report
function New-AllureReport {
    if (Test-Path "allure-results") {
        return Invoke-Step "Generate Allure Report" "npm run report"
    } else {
        Write-Status "warning" "No allure-results directory found - skipping Allure report generation"
        return $true
    }
}

# Generate test summary
function New-TestSummary {
    Write-Host ""
    Write-Host "📊 Test Execution Summary" -ForegroundColor $Cyan
    Write-Host "========================" -ForegroundColor $Cyan

    if (Test-Path "test-results/cucumber-results.json") {
        try {
            $results = Get-Content "test-results/cucumber-results.json" -Raw | ConvertFrom-Json

            $scenariosPassed = ($results | Where-Object { $_.status -eq "passed" }).Count
            $scenariosFailed = ($results | Where-Object { $_.status -eq "failed" }).Count
            $totalScenarios = $scenariosPassed + $scenariosFailed

            Write-Status "info" "Total Scenarios: $totalScenarios"
            Write-Status "success" "Passed: $scenariosPassed"
            if ($scenariosFailed -gt 0) {
                Write-Status "error" "Failed: $scenariosFailed"
            }

            # Calculate duration if available
            $durationMatch = $results | Select-Object -First 1 | Select-String -Pattern '"duration":(\d+)'
            if ($durationMatch) {
                $duration = [long]$durationMatch.Matches[0].Groups[1].Value
                $durationSeconds = $duration / 1000000000
                Write-Status "info" "Duration: $([math]::Round($durationSeconds, 2))s"
            }
        } catch {
            Write-Status "warning" "Could not parse test results"
        }
    } else {
        Write-Status "warning" "Test results file not found"
    }
}

# Show report locations
function Show-Reports {
    Write-Host ""
    Write-Host "📁 Generated Reports" -ForegroundColor $Cyan
    Write-Host "===================" -ForegroundColor $Cyan

    if (Test-Path "test-results/cucumber-report.html") {
        Write-Status "success" "HTML Report: test-results/cucumber-report.html"
        Write-Status "info" "Open in browser: file:///$(Resolve-Path 'test-results/cucumber-report.html' | Select-Object -ExpandProperty Path)"
    }

    if (Test-Path "allure-report") {
        Write-Status "success" "Allure Report: allure-report/index.html"
        Write-Status "info" "Open in browser: file:///$(Resolve-Path 'allure-report/index.html' | Select-Object -ExpandProperty Path)"
    }

    if (Test-Path "test-results") {
        Write-Status "success" "Test Results: test-results/"
        Write-Host "Contents:" -ForegroundColor $Blue
        Get-ChildItem "test-results" | ForEach-Object {
            Write-Host "  $($_.Name)" -ForegroundColor $Blue
        }
    }
}

# Cleanup function
function Clear-TempFiles {
    Write-Host ""
    Write-Status "info" "Cleaning up temporary files..."
    # Add cleanup commands here if needed
}

# Main simulation function
function Start-Simulation {
    $startTime = Get-Date

    Write-Host "🎯 Simulating GitHub Actions CI/CD Pipeline" -ForegroundColor $Cyan
    Write-Host "Repository: $(Split-Path (Get-Location) -Leaf)" -ForegroundColor $Blue

    try {
        $branch = & git branch --show-current 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Branch: $branch" -ForegroundColor $Blue
        } else {
            Write-Host "Branch: unknown" -ForegroundColor $Blue
        }
    } catch {
        Write-Host "Branch: unknown" -ForegroundColor $Blue
    }

    try {
        $commit = & git rev-parse --short HEAD 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Commit: $commit" -ForegroundColor $Blue
        } else {
            Write-Host "Commit: unknown" -ForegroundColor $Blue
        }
    } catch {
        Write-Host "Commit: unknown" -ForegroundColor $Blue
    }

    Write-Host "Started at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor $Blue
    Write-Host ""

    # Setup cleanup on exit
    $cleanup = {
        Clear-TempFiles
    }
    Register-EngineEvent PowerShell.Exiting -Action $cleanup | Out-Null

    # Run simulation steps
    if (-not (Test-Setup)) { return $false }
    Set-CIEnvironment
    if (-not (Install-Dependencies)) { return $false }
    if (-not (Install-Browsers)) { return $false }
    if (-not (New-TestDirectory)) { return $false }
    if (-not (Start-CommentModuleTests)) { return $false }
    New-AllureReport
    New-TestSummary
    Show-Reports

    $endTime = Get-Date
    $duration = $endTime - $startTime

    Write-Host ""
    Write-Host "======================================================" -ForegroundColor $Cyan
    Write-Status "success" "CI/CD simulation completed in $([math]::Round($duration.TotalSeconds, 0))s"

    # Check if tests passed
    if (Test-Path "test-results/cucumber-results.json") {
        try {
            $results = Get-Content "test-results/cucumber-results.json" -Raw | ConvertFrom-Json
            $failedCount = ($results | Where-Object { $_.status -eq "failed" }).Count

            if ($failedCount -eq 0) {
                Write-Status "success" "All tests passed! ✅"
                return $true
            } else {
                Write-Status "error" "$failedCount test(s) failed ❌"
                return $false
            }
        } catch {
            Write-Status "warning" "Could not determine test results"
            return $false
        }
    } else {
        Write-Status "warning" "Could not determine test results"
        return $false
    }
}

# Run main function
$success = Start-Simulation

if (-not $success) {
    exit 1
}
