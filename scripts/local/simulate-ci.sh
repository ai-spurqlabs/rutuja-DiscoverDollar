#!/bin/bash

# CI/CD Simulation Script for Comment Module Testing
# This script simulates the CI/CD pipeline locally for testing purposes

set -e

echo "🚀 Simulating CI/CD Pipeline for Comment Module Testing"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Function to simulate CI step
simulate_step() {
    local step_name=$1
    local command=$2

    echo
    print_status "info" "Step: $step_name"
    echo "Command: $command"

    if eval "$command"; then
        print_status "success" "$step_name completed"
    else
        print_status "error" "$step_name failed"
        return 1
    fi
}

# Set CI environment variables
setup_ci_environment() {
    echo "🔧 Setting up CI environment..."

    export CI=true
    export HEADLESS=1
    export REAL_LOGIN=1
    export NODE_ENV=test

    # Load environment variables from .env if it exists
    if [ -f ".env" ]; then
        set -a
        source .env
        set +a
        print_status "success" "Environment variables loaded from .env"
    else
        print_status "warning" ".env file not found - using system environment"
    fi
}

# Validate setup before running
validate_setup() {
    echo "🔍 Validating setup..."

    if [ ! -f "package.json" ]; then
        print_status "error" "package.json not found"
        exit 1
    fi

    if [ ! -f "playwright.config.js" ]; then
        print_status "error" "playwright.config.js not found"
        exit 1
    fi

    if [ ! -f "cucumber.cjs" ]; then
        print_status "error" "cucumber.cjs not found"
        exit 1
    fi

    print_status "success" "Setup validation passed"
}

# Install dependencies
install_dependencies() {
    simulate_step "Install Dependencies" "npm ci"
}

# Install Playwright browsers
install_browsers() {
    simulate_step "Install Playwright Browsers" "npx playwright install --with-deps"
}

# Create test results directory
setup_test_directory() {
    simulate_step "Setup Test Directory" "mkdir -p test-results"
}

# Run Comment Module tests
run_comment_module_tests() {
    local test_command="npx cucumber-js tests/features/CommentModule.feature \
        --format json:test-results/cucumber-results.json \
        --format html:test-results/cucumber-report.html \
        --format summary"

    simulate_step "Run Comment Module Tests" "$test_command"
}

# Generate Allure report
generate_allure_report() {
    if [ -d "allure-results" ]; then
        simulate_step "Generate Allure Report" "npm run report"
    else
        print_status "warning" "No allure-results directory found - skipping Allure report generation"
    fi
}

# Generate test summary
generate_summary() {
    echo
    echo "📊 Test Execution Summary"
    echo "========================"

    if [ -f "test-results/cucumber-results.json" ]; then
        # Count scenarios and steps
        local scenarios_passed=$(grep -o '"status":"passed"' test-results/cucumber-results.json | wc -l)
        local scenarios_failed=$(grep -o '"status":"failed"' test-results/cucumber-results.json | wc -l)
        local total_scenarios=$((scenarios_passed + scenarios_failed))

        print_status "info" "Total Scenarios: $total_scenarios"
        print_status "success" "Passed: $scenarios_passed"
        if [ "$scenarios_failed" -gt 0 ]; then
            print_status "error" "Failed: $scenarios_failed"
        fi

        # Calculate duration if available
        local duration=$(grep -o '"duration":[0-9]*' test-results/cucumber-results.json | head -1 | cut -d: -f2)
        if [ ! -z "$duration" ]; then
            local duration_seconds=$((duration / 1000000000))
            print_status "info" "Duration: ${duration_seconds}s"
        fi
    else
        print_status "warning" "Test results file not found"
    fi
}

# Show report locations
show_reports() {
    echo
    echo "📁 Generated Reports"
    echo "==================="

    if [ -f "test-results/cucumber-report.html" ]; then
        print_status "success" "HTML Report: test-results/cucumber-report.html"
        print_status "info" "Open in browser: file://$(pwd)/test-results/cucumber-report.html"
    fi

    if [ -d "allure-report" ]; then
        print_status "success" "Allure Report: allure-report/index.html"
        print_status "info" "Open in browser: file://$(pwd)/allure-report/index.html"
    fi

    if [ -d "test-results" ]; then
        print_status "success" "Test Results: test-results/"
        echo "Contents:"
        ls -la test-results/
    fi
}

# Cleanup function
cleanup() {
    echo
    print_status "info" "Cleaning up temporary files..."
    # Add cleanup commands here if needed
}

# Main simulation function
main() {
    local start_time=$(date +%s)

    echo "🎯 Simulating GitHub Actions CI/CD Pipeline"
    echo "Repository: $(basename $(pwd))"
    echo "Branch: $(git branch --show-current 2>/dev/null || echo 'unknown')"
    echo "Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
    echo "Started at: $(date)"
    echo

    # Trap for cleanup
    trap cleanup EXIT

    # Run simulation steps
    validate_setup
    setup_ci_environment
    install_dependencies
    install_browsers
    setup_test_directory
    run_comment_module_tests
    generate_allure_report
    generate_summary
    show_reports

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    echo
    echo "======================================================"
    print_status "success" "CI/CD simulation completed in ${duration}s"

    # Check if tests passed
    if [ -f "test-results/cucumber-results.json" ]; then
        local failed_count=$(grep -o '"status":"failed"' test-results/cucumber-results.json | wc -l)
        if [ "$failed_count" -eq 0 ]; then
            print_status "success" "All tests passed! ✅"
            exit 0
        else
            print_status "error" "$failed_count test(s) failed ❌"
            exit 1
        fi
    else
        print_status "warning" "Could not determine test results"
        exit 1
    fi
}

# Show usage if help requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [options]"
    echo
    echo "Simulate CI/CD pipeline for Comment Module testing"
    echo
    echo "Options:"
    echo "  --help, -h    Show this help message"
    echo
    echo "Environment Variables:"
    echo "  HEADLESS=1    Run tests in headless mode (default: 1)"
    echo "  CI=true       Enable CI mode (default: true)"
    echo
    echo "Examples:"
    echo "  $0                          # Run full simulation"
    echo "  HEADLESS=0 $0              # Run with browser visible"
    echo "  DEBUG=* $0                 # Run with debug logging"
    exit 0
fi

# Run main function
main "$@"
