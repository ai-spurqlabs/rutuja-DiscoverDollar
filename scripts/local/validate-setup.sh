#!/bin/bash

# CI/CD Setup Validation Script for Comment Module Testing
# This script validates the local environment for CI/CD compatibility

set -e

echo "🔍 Validating CI/CD Setup for Comment Module Testing"
echo "=================================================="

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

# Check Node.js version
check_nodejs() {
    echo "📦 Checking Node.js..."
    if command -v node &> /dev/null; then
        local version=$(node --version | sed 's/v//')
        local major_version=$(echo $version | cut -d. -f1)
        if [ "$major_version" -ge 18 ]; then
            print_status "success" "Node.js version: $version (compatible)"
        else
            print_status "warning" "Node.js version: $version (recommended: 18+)"
        fi
    else
        print_status "error" "Node.js not found"
        return 1
    fi
}

# Check npm
check_npm() {
    echo "📦 Checking npm..."
    if command -v npm &> /dev/null; then
        local version=$(npm --version)
        print_status "success" "npm version: $version"
    else
        print_status "error" "npm not found"
        return 1
    fi
}

# Check project structure
check_project_structure() {
    echo "📁 Checking project structure..."

    local required_files=(
        "package.json"
        "playwright.config.js"
        "cucumber.cjs"
        ".env"
        "tests/features/CommentModule.feature"
        ".github/workflows/ci-cd-comment-module.yml"
    )

    local missing_files=()

    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            missing_files+=("$file")
        fi
    done

    if [ ${#missing_files[@]} -eq 0 ]; then
        print_status "success" "All required files present"
    else
        print_status "error" "Missing files: ${missing_files[*]}"
        return 1
    fi
}

# Check dependencies
check_dependencies() {
    echo "🔧 Checking dependencies..."

    if [ ! -d "node_modules" ]; then
        print_status "warning" "node_modules not found - run 'npm install'"
        return 1
    fi

    # Check for key dependencies
    local key_deps=(
        "@cucumber/cucumber"
        "@playwright/test"
        "allure-playwright"
    )

    for dep in "${key_deps[@]}"; do
        if npm list "$dep" &> /dev/null; then
            print_status "success" "Dependency $dep installed"
        else
            print_status "error" "Dependency $dep not found"
            return 1
        fi
    done
}

# Check Playwright browsers
check_playwright() {
    echo "🌐 Checking Playwright browsers..."

    if command -v npx &> /dev/null; then
        if npx playwright --version &> /dev/null; then
            print_status "success" "Playwright CLI available"

            # Check if browsers are installed
            if [ -d "node_modules/playwright" ]; then
                print_status "success" "Playwright browsers directory exists"
            else
                print_status "warning" "Playwright browsers not installed - run 'npx playwright install'"
            fi
        else
            print_status "error" "Playwright not properly installed"
            return 1
        fi
    else
        print_status "error" "npx not available"
        return 1
    fi
}

# Check environment variables
check_environment() {
    echo "🔐 Checking environment variables..."

    if [ -f ".env" ]; then
        print_status "success" ".env file exists"

        # Check for required environment variables
        local required_vars=(
            "Cantire_Stage_URL"
            "Auditor"
            "A_Password"
        )

        local missing_vars=()

        for var in "${required_vars[@]}"; do
            if ! grep -q "^$var=" .env; then
                missing_vars+=("$var")
            fi
        done

        if [ ${#missing_vars[@]} -eq 0 ]; then
            print_status "success" "All required environment variables configured"
        else
            print_status "warning" "Missing environment variables: ${missing_vars[*]}"
        fi
    else
        print_status "error" ".env file not found"
        return 1
    fi
}

# Check GitHub Actions workflows
check_workflows() {
    echo "⚙️  Checking GitHub Actions workflows..."

    local workflow_files=(
        ".github/workflows/ci-cd-comment-module.yml"
        ".github/workflows/ci-cd-full-suite.yml"
    )

    for workflow in "${workflow_files[@]}"; do
        if [ -f "$workflow" ]; then
            print_status "success" "Workflow $workflow exists"
        else
            print_status "error" "Workflow $workflow not found"
            return 1
        fi
    done
}

# Check test files
check_test_files() {
    echo "🧪 Checking test files..."

    local test_patterns=(
        "tests/features/CommentModule*.feature"
        "tests/step_definitions/CommentModule*.js"
    )

    for pattern in "${test_patterns[@]}"; do
        if compgen -G "$pattern" > /dev/null; then
            print_status "success" "Test files found: $pattern"
        else
            print_status "warning" "No test files found: $pattern"
        fi
    done
}

# Validate package.json scripts
check_scripts() {
    echo "📜 Checking package.json scripts..."

    if [ -f "package.json" ]; then
        local required_scripts=(
            "test:comment-module"
            "ci:test"
            "playwright:install"
        )

        for script in "${required_scripts[@]}"; do
            if grep -q "\"$script\":" package.json; then
                print_status "success" "Script $script defined"
            else
                print_status "warning" "Script $script not found in package.json"
            fi
        done
    else
        print_status "error" "package.json not found"
        return 1
    fi
}

# Main validation function
main() {
    local errors=0

    echo "🚀 Starting CI/CD setup validation..."
    echo

    # Run all checks
    check_nodejs || ((errors++))
    check_npm || ((errors++))
    check_project_structure || ((errors++))
    check_dependencies || ((errors++))
    check_playwright || ((errors++))
    check_environment || ((errors++))
    check_workflows || ((errors++))
    check_test_files || ((errors++))
    check_scripts || ((errors++))

    echo
    echo "=================================================="

    if [ $errors -eq 0 ]; then
        print_status "success" "CI/CD setup validation completed successfully!"
        echo
        print_status "info" "You can now run: npm run ci:test"
        print_status "info" "Or simulate CI: bash scripts/local/simulate-ci.sh"
    else
        print_status "error" "CI/CD setup validation failed with $errors error(s)"
        echo
        print_status "info" "Please fix the errors above and run this script again"
        exit 1
    fi
}

# Run main function
main "$@"
