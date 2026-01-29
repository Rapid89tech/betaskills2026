#!/usr/bin/env node

/**
 * Course Navigation Integration Test Runner
 * 
 * This script runs comprehensive integration tests for the course navigation flow,
 * covering the complete user journey from course discovery to content access.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createTestResultsDir() {
  const testResultsDir = path.join(process.cwd(), 'test-results');
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }
}

function runTests() {
  log('🚀 Starting Course Navigation Integration Tests', 'cyan');
  log('=' .repeat(60), 'blue');

  try {
    // Ensure test results directory exists
    createTestResultsDir();

    // Run the integration tests
    log('📋 Running integration test suite...', 'yellow');
    
    const testCommand = 'npx vitest --config vitest.config.navigation-integration.ts --run';
    
    log(`Executing: ${testCommand}`, 'blue');
    
    const output = execSync(testCommand, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });

    log('✅ Integration tests completed successfully!', 'green');
    log('Test Output:', 'bright');
    console.log(output);

    // Check if results file was created
    const resultsFile = path.join(process.cwd(), 'test-results', 'navigation-integration-tests.json');
    if (fs.existsSync(resultsFile)) {
      const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
      
      log('\n📊 Test Results Summary:', 'bright');
      log(`Total Tests: ${results.numTotalTests}`, 'blue');
      log(`Passed: ${results.numPassedTests}`, 'green');
      log(`Failed: ${results.numFailedTests}`, results.numFailedTests > 0 ? 'red' : 'green');
      log(`Test Suites: ${results.numTotalTestSuites}`, 'blue');
      
      if (results.success) {
        log('\n🎉 All integration tests passed!', 'green');
      } else {
        log('\n❌ Some tests failed. Check the output above for details.', 'red');
        process.exit(1);
      }
    }

  } catch (error) {
    log('❌ Integration tests failed!', 'red');
    log('Error details:', 'red');
    console.error(error.stdout || error.message);
    
    if (error.stderr) {
      log('Error output:', 'red');
      console.error(error.stderr);
    }
    
    process.exit(1);
  }
}

function showHelp() {
  log('Course Navigation Integration Test Runner', 'bright');
  log('', 'reset');
  log('Usage:', 'yellow');
  log('  node scripts/run-navigation-integration-tests.js', 'blue');
  log('', 'reset');
  log('This script runs comprehensive integration tests for:', 'reset');
  log('  • Complete user journey from course card to content', 'blue');
  log('  • Navigation across different enrollment states', 'blue');
  log('  • Error handling and recovery mechanisms', 'blue');
  log('  • Cross-browser and device compatibility', 'blue');
  log('  • Performance and loading state handling', 'blue');
  log('', 'reset');
  log('Test files included:', 'yellow');
  log('  • course-navigation-flow.integration.test.ts', 'blue');
  log('  • course-navigation-edge-cases.integration.test.ts', 'blue');
  log('  • complete-user-journey.integration.test.ts', 'blue');
  log('', 'reset');
  log('Results will be saved to: test-results/navigation-integration-tests.json', 'magenta');
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// Run the tests
runTests();