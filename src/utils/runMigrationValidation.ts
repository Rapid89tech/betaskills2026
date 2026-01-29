/**
 * Migration Validation Runner
 * 
 * This utility provides easy-to-use functions to run migration validation
 * and generate reports for the legacy component migration.
 */

import { migrationValidationSuite, ValidationSuiteResult } from './migrationValidationSuite';
import { logger } from './logger';

/**
 * Run complete migration validation and log results
 */
export async function runMigrationValidation(): Promise<ValidationSuiteResult> {
  try {
    logger.info('🚀 Starting migration validation...');
    
    const result = await migrationValidationSuite.runCompleteValidationSuite();
    
    // Log summary
    logger.info('📊 Migration Validation Summary:');
    logger.info(`   Overall: ${result.overallPassed ? 'PASSED' : 'FAILED'}`);
    logger.info(`   Tests: ${result.passedTests}/${result.totalTests} passed`);
    logger.info(`   Duration: ${result.totalDuration}ms`);
    
    // Log category results
    logger.info('📋 Category Results:');
    logger.info(`   Component Validation: ${result.summary.componentValidation ? 'PASSED' : 'FAILED'}`);
    logger.info(`   Data Consistency: ${result.summary.dataConsistency ? 'PASSED' : 'FAILED'}`);
    logger.info(`   Migration Completeness: ${result.summary.migrationCompleteness ? 'PASSED' : 'FAILED'}`);
    logger.info(`   Performance Validation: ${result.summary.performanceValidation ? 'PASSED' : 'FAILED'}`);
    
    // Log failed tests
    const failedTests = result.results.filter(r => !r.passed);
    if (failedTests.length > 0) {
      logger.warn(`❌ Failed Tests (${failedTests.length}):`);
      failedTests.forEach(test => {
        logger.warn(`   - ${test.testName}: ${test.details}`);
        test.errors.forEach(error => logger.warn(`     Error: ${error}`));
      });
    }
    
    // Log warnings
    const testsWithWarnings = result.results.filter(r => r.warnings.length > 0);
    if (testsWithWarnings.length > 0) {
      logger.warn(`⚠️ Tests with Warnings (${testsWithWarnings.length}):`);
      testsWithWarnings.forEach(test => {
        test.warnings.forEach(warning => logger.warn(`   - ${test.testName}: ${warning}`));
      });
    }
    
    return result;
    
  } catch (error) {
    logger.error('❌ Migration validation failed:', error);
    throw error;
  }
}

/**
 * Run migration validation and generate a detailed report
 */
export async function generateMigrationValidationReport(): Promise<string> {
  try {
    const result = await migrationValidationSuite.runCompleteValidationSuite();
    const report = migrationValidationSuite.generateValidationReport(result);
    
    logger.info('📄 Migration validation report generated');
    console.log('\n' + report);
    
    return report;
    
  } catch (error) {
    logger.error('❌ Failed to generate migration validation report:', error);
    throw error;
  }
}

/**
 * Run quick validation check (subset of tests)
 */
export async function runQuickMigrationCheck(): Promise<{
  passed: boolean;
  summary: string;
}> {
  try {
    logger.info('⚡ Running quick migration check...');
    
    // Run full validation but return simplified result
    const result = await migrationValidationSuite.runCompleteValidationSuite();
    
    const summary = `${result.passedTests}/${result.totalTests} tests passed in ${result.totalDuration}ms`;
    
    logger.info(`⚡ Quick check complete: ${result.overallPassed ? 'PASSED' : 'FAILED'} (${summary})`);
    
    return {
      passed: result.overallPassed,
      summary
    };
    
  } catch (error) {
    logger.error('❌ Quick migration check failed:', error);
    return {
      passed: false,
      summary: `Check failed: ${error}`
    };
  }
}

/**
 * Validate specific category of tests
 */
export async function validateMigrationCategory(category: 'component' | 'data' | 'completeness' | 'performance'): Promise<{
  passed: boolean;
  details: string;
}> {
  try {
    logger.info(`🔍 Validating ${category} migration...`);
    
    const result = await migrationValidationSuite.runCompleteValidationSuite();
    
    let categoryPassed = false;
    let categoryDetails = '';
    
    switch (category) {
      case 'component':
        categoryPassed = result.summary.componentValidation;
        categoryDetails = `Component validation: ${categoryPassed ? 'PASSED' : 'FAILED'}`;
        break;
      case 'data':
        categoryPassed = result.summary.dataConsistency;
        categoryDetails = `Data consistency: ${categoryPassed ? 'PASSED' : 'FAILED'}`;
        break;
      case 'completeness':
        categoryPassed = result.summary.migrationCompleteness;
        categoryDetails = `Migration completeness: ${categoryPassed ? 'PASSED' : 'FAILED'}`;
        break;
      case 'performance':
        categoryPassed = result.summary.performanceValidation;
        categoryDetails = `Performance validation: ${categoryPassed ? 'PASSED' : 'FAILED'}`;
        break;
    }
    
    logger.info(`🔍 ${category} validation: ${categoryPassed ? 'PASSED' : 'FAILED'}`);
    
    return {
      passed: categoryPassed,
      details: categoryDetails
    };
    
  } catch (error) {
    logger.error(`❌ ${category} validation failed:`, error);
    return {
      passed: false,
      details: `Validation failed: ${error}`
    };
  }
}

/**
 * Export validation results to console (for development)
 */
export async function exportValidationResults(): Promise<void> {
  try {
    const result = await migrationValidationSuite.runCompleteValidationSuite();
    
    console.group('🧪 Migration Validation Results');
    console.log('Overall Status:', result.overallPassed ? '✅ PASSED' : '❌ FAILED');
    console.log('Tests:', `${result.passedTests}/${result.totalTests} passed`);
    console.log('Duration:', `${result.totalDuration}ms`);
    
    console.group('📊 Summary by Category');
    console.log('Component Validation:', result.summary.componentValidation ? '✅' : '❌');
    console.log('Data Consistency:', result.summary.dataConsistency ? '✅' : '❌');
    console.log('Migration Completeness:', result.summary.migrationCompleteness ? '✅' : '❌');
    console.log('Performance Validation:', result.summary.performanceValidation ? '✅' : '❌');
    console.groupEnd();
    
    console.group('📋 Detailed Results');
    result.results.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`${status} ${test.testName} (${test.duration}ms)`);
      console.log(`   ${test.details}`);
      
      if (test.errors.length > 0) {
        console.group('❌ Errors');
        test.errors.forEach(error => console.log(error));
        console.groupEnd();
      }
      
      if (test.warnings.length > 0) {
        console.group('⚠️ Warnings');
        test.warnings.forEach(warning => console.log(warning));
        console.groupEnd();
      }
    });
    console.groupEnd();
    
    console.groupEnd();
    
  } catch (error) {
    console.error('❌ Failed to export validation results:', error);
  }
}

// Development helper: Auto-run validation in development mode
if (import.meta.env.DEV) {
  // Auto-run validation after a delay to allow app initialization
  setTimeout(() => {
    runQuickMigrationCheck().catch(console.error);
  }, 5000);
}