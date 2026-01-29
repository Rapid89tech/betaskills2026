/**
 * Comprehensive Migration Validation and Testing Suite
 * 
 * This suite provides automated tests to verify all components use unified data access,
 * integration tests for data consistency, validation utilities for migration completeness,
 * and performance tests to ensure migration doesn't degrade performance.
 */

import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { legacyAccessMonitor } from './legacyAccessMonitor';
import { automaticEnrollmentMigration } from './automaticEnrollmentMigration';
import { isLegacyMigrationCompleted } from './completeMigration';
import { logger } from './logger';

export interface ValidationResult {
  passed: boolean;
  testName: string;
  details: string;
  duration: number;
  errors: string[];
  warnings: string[];
}

export interface ValidationSuiteResult {
  overallPassed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  totalDuration: number;
  results: ValidationResult[];
  summary: {
    componentValidation: boolean;
    dataConsistency: boolean;
    migrationCompleteness: boolean;
    performanceValidation: boolean;
  };
}

class MigrationValidationSuite {
  private static instance: MigrationValidationSuite;

  public static getInstance(): MigrationValidationSuite {
    if (!MigrationValidationSuite.instance) {
      MigrationValidationSuite.instance = new MigrationValidationSuite();
    }
    return MigrationValidationSuite.instance;
  }

  /**
   * Run the complete validation suite
   */
  public async runCompleteValidationSuite(): Promise<ValidationSuiteResult> {
    logger.info('🧪 Starting comprehensive migration validation suite...');
    
    const startTime = Date.now();
    const results: ValidationResult[] = [];

    try {
      // 1. Component validation tests
      const componentTests = await this.runComponentValidationTests();
      results.push(...componentTests);

      // 2. Data consistency tests
      const dataConsistencyTests = await this.runDataConsistencyTests();
      results.push(...dataConsistencyTests);

      // 3. Migration completeness tests
      const completenessTests = await this.runMigrationCompletenessTests();
      results.push(...completenessTests);

      // 4. Performance validation tests
      const performanceTests = await this.runPerformanceValidationTests();
      results.push(...performanceTests);

      // Calculate summary
      const totalDuration = Date.now() - startTime;
      const passedTests = results.filter(r => r.passed).length;
      const failedTests = results.length - passedTests;

      const summary = {
        componentValidation: componentTests.every(t => t.passed),
        dataConsistency: dataConsistencyTests.every(t => t.passed),
        migrationCompleteness: completenessTests.every(t => t.passed),
        performanceValidation: performanceTests.every(t => t.passed)
      };

      const suiteResult: ValidationSuiteResult = {
        overallPassed: failedTests === 0,
        totalTests: results.length,
        passedTests,
        failedTests,
        totalDuration,
        results,
        summary
      };

      logger.info(`✅ Validation suite completed in ${totalDuration}ms`);
      logger.info(`   Tests: ${passedTests}/${results.length} passed`);
      logger.info(`   Overall: ${suiteResult.overallPassed ? 'PASSED' : 'FAILED'}`);

      return suiteResult;

    } catch (error) {
      logger.error('❌ Validation suite failed:', error);
      throw error;
    }
  }

  /**
   * Run component validation tests
   */
  private async runComponentValidationTests(): Promise<ValidationResult[]> {
    const tests: ValidationResult[] = [];

    // Test 1: Verify all components are marked as migrated
    tests.push(await this.testAllComponentsMigrated());

    // Test 2: Verify no legacy localStorage access patterns
    tests.push(await this.testNoLegacyLocalStorageAccess());

    // Test 3: Verify UnifiedEnrollmentManager integration
    tests.push(await this.testUnifiedEnrollmentManagerIntegration());

    // Test 4: Verify useDataManager hook functionality
    tests.push(await this.testUseDataManagerFunctionality());

    return tests;
  }

  /**
   * Run data consistency tests
   */
  private async runDataConsistencyTests(): Promise<ValidationResult[]> {
    const tests: ValidationResult[] = [];

    // Test 1: Verify enrollment data integrity
    tests.push(await this.testEnrollmentDataIntegrity());

    // Test 2: Verify no duplicate enrollments
    tests.push(await this.testNoDuplicateEnrollments());

    // Test 3: Verify data format consistency
    tests.push(await this.testDataFormatConsistency());

    // Test 4: Verify cross-component data consistency
    tests.push(await this.testCrossComponentDataConsistency());

    return tests;
  }

  /**
   * Run migration completeness tests
   */
  private async runMigrationCompletenessTests(): Promise<ValidationResult[]> {
    const tests: ValidationResult[] = [];

    // Test 1: Verify migration completion flag
    tests.push(await this.testMigrationCompletionFlag());

    // Test 2: Verify automatic migration system
    tests.push(await this.testAutomaticMigrationSystem());

    // Test 3: Verify legacy access warnings disabled
    tests.push(await this.testLegacyAccessWarningsDisabled());

    // Test 4: Verify cleanup of legacy data
    tests.push(await this.testLegacyDataCleanup());

    return tests;
  }

  /**
   * Run performance validation tests
   */
  private async runPerformanceValidationTests(): Promise<ValidationResult[]> {
    const tests: ValidationResult[] = [];

    // Test 1: Verify enrollment data access performance
    tests.push(await this.testEnrollmentDataAccessPerformance());

    // Test 2: Verify memory usage optimization
    tests.push(await this.testMemoryUsageOptimization());

    // Test 3: Verify reduced localStorage access
    tests.push(await this.testReducedLocalStorageAccess());

    // Test 4: Verify overall system performance
    tests.push(await this.testOverallSystemPerformance());

    return tests;
  }

  /**
   * Individual test implementations
   */

  private async testAllComponentsMigrated(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const report = legacyAccessMonitor.getMigrationReport();
      
      if (!report.allMigrated) {
        errors.push(`${report.pendingComponents.length} components still pending migration: ${report.pendingComponents.join(', ')}`);
      }

      if (report.migratedComponents.length !== report.totalComponents) {
        errors.push(`Expected ${report.totalComponents} migrated components, found ${report.migratedComponents.length}`);
      }

      return {
        passed: errors.length === 0,
        testName: 'All Components Migrated',
        details: `${report.migratedComponents.length}/${report.totalComponents} components migrated`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'All Components Migrated',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testNoLegacyLocalStorageAccess(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check for legacy localStorage keys
      const legacyKeys = Object.keys(localStorage).filter(key => 
        key.includes('enrollments') && 
        !key.includes('migration') && 
        !key.includes('unified') &&
        !key.includes('emergency-restored') // Keep emergency backups
      );

      if (legacyKeys.length > 0) {
        warnings.push(`Found ${legacyKeys.length} legacy localStorage keys: ${legacyKeys.join(', ')}`);
      }

      // Check if legacy access warnings are disabled
      const migrationCompleted = isLegacyMigrationCompleted();
      if (!migrationCompleted) {
        errors.push('Legacy migration not marked as completed');
      }

      return {
        passed: errors.length === 0,
        testName: 'No Legacy localStorage Access',
        details: `Found ${legacyKeys.length} legacy keys, migration completed: ${migrationCompleted}`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'No Legacy localStorage Access',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testUnifiedEnrollmentManagerIntegration(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Test basic UnifiedEnrollmentManager functionality
      const testUserId = 'test-user-validation';
      
      // Test getUserEnrollments
      const enrollments = await unifiedEnrollmentManager.getUserEnrollments(testUserId);
      if (!Array.isArray(enrollments)) {
        errors.push('getUserEnrollments did not return an array');
      }

      // Test getAllEnrollments
      const allEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
      if (!Array.isArray(allEnrollments)) {
        errors.push('getAllEnrollments did not return an array');
      }

      // Test getEnrollmentStatistics
      const stats = await unifiedEnrollmentManager.getEnrollmentStatistics();
      if (typeof stats !== 'object' || stats === null) {
        errors.push('getEnrollmentStatistics did not return an object');
      }

      return {
        passed: errors.length === 0,
        testName: 'UnifiedEnrollmentManager Integration',
        details: `Tested basic functionality, found ${allEnrollments.length} total enrollments`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'UnifiedEnrollmentManager Integration',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testUseDataManagerFunctionality(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // This test would typically involve testing the useDataManager hook
      // Since we can't directly test React hooks in this context, we'll test
      // the underlying functionality it depends on

      // Test that UnifiedEnrollmentManager methods exist and are callable
      const requiredMethods = [
        'getUserEnrollments',
        'getAllEnrollments',
        'createEnrollment',
        'updateEnrollment',
        'updateEnrollmentStatus',
        'updateEnrollmentProgress',
        'isUserEnrolledInCourse',
        'getUserEnrollmentForCourse',
        'getEnrollmentStatistics',
        'forceSynchronization'
      ];

      for (const method of requiredMethods) {
        if (typeof (unifiedEnrollmentManager as any)[method] !== 'function') {
          errors.push(`UnifiedEnrollmentManager missing method: ${method}`);
        }
      }

      return {
        passed: errors.length === 0,
        testName: 'useDataManager Functionality',
        details: `Verified ${requiredMethods.length} required methods exist`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'useDataManager Functionality',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testEnrollmentDataIntegrity(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const allEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
      
      // Check required fields
      const requiredFields = ['user_id', 'user_email', 'course_id', 'status'];
      let invalidEnrollments = 0;

      for (const enrollment of allEnrollments) {
        for (const field of requiredFields) {
          if (!enrollment[field]) {
            invalidEnrollments++;
            break;
          }
        }
      }

      if (invalidEnrollments > 0) {
        errors.push(`${invalidEnrollments} enrollments missing required fields`);
      }

      // Check status values
      const validStatuses = ['pending', 'approved', 'rejected'];
      const invalidStatuses = allEnrollments.filter(e => 
        e.status && !validStatuses.includes(e.status)
      );

      if (invalidStatuses.length > 0) {
        errors.push(`${invalidStatuses.length} enrollments have invalid status values`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Enrollment Data Integrity',
        details: `Validated ${allEnrollments.length} enrollments`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Enrollment Data Integrity',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testNoDuplicateEnrollments(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const allEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
      
      // Check for duplicate IDs
      const ids = allEnrollments.map(e => e.id).filter(Boolean);
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
      
      if (duplicateIds.length > 0) {
        errors.push(`Found ${duplicateIds.length} duplicate enrollment IDs`);
      }

      // Check for duplicate user-course combinations
      const userCourseCombos = allEnrollments.map(e => `${e.user_id}_${e.course_id}`);
      const duplicateCombos = userCourseCombos.filter((combo, index) => 
        userCourseCombos.indexOf(combo) !== index
      );

      if (duplicateCombos.length > 0) {
        warnings.push(`Found ${duplicateCombos.length} duplicate user-course combinations (may be intentional for different statuses)`);
      }

      return {
        passed: errors.length === 0,
        testName: 'No Duplicate Enrollments',
        details: `Checked ${allEnrollments.length} enrollments for duplicates`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'No Duplicate Enrollments',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testDataFormatConsistency(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const allEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
      let formatIssues = 0;

      for (const enrollment of allEnrollments) {
        // Check email format
        if (enrollment.user_email && !this.isValidEmail(enrollment.user_email)) {
          formatIssues++;
        }

        // Check progress range
        if (enrollment.progress && (enrollment.progress < 0 || enrollment.progress > 100)) {
          formatIssues++;
        }

        // Check date formats
        if (enrollment.enrolled_at && !this.isValidISODate(enrollment.enrolled_at)) {
          formatIssues++;
        }
      }

      if (formatIssues > 0) {
        errors.push(`${formatIssues} enrollments have format issues`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Data Format Consistency',
        details: `Validated format of ${allEnrollments.length} enrollments`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Data Format Consistency',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testCrossComponentDataConsistency(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Test that data is consistent across different access methods
      const testUserId = 'consistency-test-user';
      
      // Get enrollments via different methods
      const userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(testUserId);
      const allEnrollments = await unifiedEnrollmentManager.getAllEnrollments();
      const userEnrollmentsFromAll = allEnrollments.filter(e => e.user_id === testUserId);

      // Compare results
      if (userEnrollments.length !== userEnrollmentsFromAll.length) {
        errors.push(`Inconsistent enrollment counts: getUserEnrollments returned ${userEnrollments.length}, filtered getAllEnrollments returned ${userEnrollmentsFromAll.length}`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Cross-Component Data Consistency',
        details: `Tested data consistency across access methods`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Cross-Component Data Consistency',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testMigrationCompletionFlag(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const migrationCompleted = isLegacyMigrationCompleted();
      const automaticMigrationCompleted = automaticEnrollmentMigration.isMigrationCompleted();

      if (!migrationCompleted) {
        errors.push('Legacy migration not marked as completed');
      }

      if (!automaticMigrationCompleted) {
        warnings.push('Automatic enrollment migration not marked as completed');
      }

      return {
        passed: errors.length === 0,
        testName: 'Migration Completion Flag',
        details: `Legacy: ${migrationCompleted}, Automatic: ${automaticMigrationCompleted}`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Migration Completion Flag',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testAutomaticMigrationSystem(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const migrationStatus = automaticEnrollmentMigration.getMigrationStatus();
      
      if (!migrationStatus.completed) {
        warnings.push('Automatic migration system reports not completed');
      }

      if (migrationStatus.inProgress) {
        warnings.push('Migration appears to be in progress');
      }

      return {
        passed: errors.length === 0,
        testName: 'Automatic Migration System',
        details: `Status: ${migrationStatus.completed ? 'completed' : 'pending'}`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Automatic Migration System',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testLegacyAccessWarningsDisabled(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Test that legacy access warnings are disabled
      const report = legacyAccessMonitor.getMigrationReport();
      
      if (!report.allMigrated) {
        errors.push('Not all components marked as migrated');
      }

      // Check localStorage for completion flag
      const completionFlag = localStorage.getItem('legacy-migration-completed');
      if (completionFlag !== 'true') {
        errors.push('Legacy migration completion flag not set');
      }

      return {
        passed: errors.length === 0,
        testName: 'Legacy Access Warnings Disabled',
        details: `All migrated: ${report.allMigrated}, completion flag: ${completionFlag}`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Legacy Access Warnings Disabled',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testLegacyDataCleanup(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check for cleaned up legacy data
      const legacyKeys = Object.keys(localStorage).filter(key => 
        (key === 'enrollments' || key.startsWith('user-enrollments-')) &&
        !key.includes('emergency-restored') // Emergency backups should remain
      );

      if (legacyKeys.length > 0) {
        warnings.push(`Found ${legacyKeys.length} legacy keys that could be cleaned up: ${legacyKeys.join(', ')}`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Legacy Data Cleanup',
        details: `Found ${legacyKeys.length} legacy keys remaining`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Legacy Data Cleanup',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testEnrollmentDataAccessPerformance(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Test performance of enrollment data access
      const performanceStartTime = Date.now();
      
      await unifiedEnrollmentManager.getAllEnrollments();
      
      const accessTime = Date.now() - performanceStartTime;
      
      // Performance thresholds
      if (accessTime > 2000) {
        errors.push(`Enrollment data access too slow: ${accessTime}ms (threshold: 2000ms)`);
      } else if (accessTime > 1000) {
        warnings.push(`Enrollment data access slower than optimal: ${accessTime}ms`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Enrollment Data Access Performance',
        details: `Access time: ${accessTime}ms`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Enrollment Data Access Performance',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testMemoryUsageOptimization(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Test memory usage (if available)
      const memoryBefore = this.getMemoryUsage();
      
      // Perform some enrollment operations
      await unifiedEnrollmentManager.getAllEnrollments();
      await unifiedEnrollmentManager.getEnrollmentStatistics();
      
      const memoryAfter = this.getMemoryUsage();
      const memoryDiff = memoryAfter - memoryBefore;

      // Memory usage thresholds (in bytes)
      if (memoryDiff > 10000000) { // 10MB
        warnings.push(`High memory usage detected: ${memoryDiff} bytes`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Memory Usage Optimization',
        details: `Memory usage: ${memoryDiff} bytes`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Memory Usage Optimization',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testReducedLocalStorageAccess(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Count localStorage keys related to enrollments
      const enrollmentKeys = Object.keys(localStorage).filter(key => 
        key.includes('enrollment') && !key.includes('migration')
      );

      // After migration, we should have minimal localStorage usage
      if (enrollmentKeys.length > 5) {
        warnings.push(`High number of enrollment-related localStorage keys: ${enrollmentKeys.length}`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Reduced localStorage Access',
        details: `Found ${enrollmentKeys.length} enrollment-related localStorage keys`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Reduced localStorage Access',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  private async testOverallSystemPerformance(): Promise<ValidationResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Test overall system performance with multiple operations
      const operationStartTime = Date.now();
      
      // Simulate typical user operations
      await unifiedEnrollmentManager.getAllEnrollments();
      await unifiedEnrollmentManager.getEnrollmentStatistics();
      await unifiedEnrollmentManager.getUserEnrollments('test-user');
      
      const totalOperationTime = Date.now() - operationStartTime;
      
      // Performance thresholds for multiple operations
      if (totalOperationTime > 5000) {
        errors.push(`Overall system performance too slow: ${totalOperationTime}ms (threshold: 5000ms)`);
      } else if (totalOperationTime > 3000) {
        warnings.push(`Overall system performance slower than optimal: ${totalOperationTime}ms`);
      }

      return {
        passed: errors.length === 0,
        testName: 'Overall System Performance',
        details: `Total operation time: ${totalOperationTime}ms`,
        duration: Date.now() - startTime,
        errors,
        warnings
      };
    } catch (error) {
      return {
        passed: false,
        testName: 'Overall System Performance',
        details: 'Test failed with exception',
        duration: Date.now() - startTime,
        errors: [`Test exception: ${error}`],
        warnings
      };
    }
  }

  /**
   * Helper methods
   */

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidISODate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && dateString.includes('T');
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Generate validation report
   */
  public generateValidationReport(result: ValidationSuiteResult): string {
    let report = '🧪 MIGRATION VALIDATION REPORT\n';
    report += '================================\n\n';
    
    // Overall status
    report += `Overall Status: ${result.overallPassed ? '✅ PASSED' : '❌ FAILED'}\n`;
    report += `Tests: ${result.passedTests}/${result.totalTests} passed\n`;
    report += `Duration: ${result.totalDuration}ms\n\n`;
    
    // Summary by category
    report += 'CATEGORY SUMMARY:\n';
    report += '================\n';
    report += `Component Validation: ${result.summary.componentValidation ? '✅' : '❌'}\n`;
    report += `Data Consistency: ${result.summary.dataConsistency ? '✅' : '❌'}\n`;
    report += `Migration Completeness: ${result.summary.migrationCompleteness ? '✅' : '❌'}\n`;
    report += `Performance Validation: ${result.summary.performanceValidation ? '✅' : '❌'}\n\n`;
    
    // Individual test results
    report += 'DETAILED RESULTS:\n';
    report += '================\n';
    
    result.results.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      report += `${status} ${test.testName} (${test.duration}ms)\n`;
      report += `   ${test.details}\n`;
      
      if (test.errors.length > 0) {
        test.errors.forEach(error => report += `   ❌ ${error}\n`);
      }
      
      if (test.warnings.length > 0) {
        test.warnings.forEach(warning => report += `   ⚠️ ${warning}\n`);
      }
      
      report += '\n';
    });
    
    return report;
  }
}

// Export singleton instance
export const migrationValidationSuite = MigrationValidationSuite.getInstance();

// Export types
export type { ValidationResult, ValidationSuiteResult };