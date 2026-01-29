import { migrationValidator } from './migrationValidation';
import { legacyAccessMonitor } from './legacyAccessMonitor';
import { logger } from './logger';

/**
 * Migration Test Runner
 * 
 * Utility to run comprehensive migration tests and validation
 * in development and production environments.
 */

export interface TestSuiteResult {
  validation: {
    passed: boolean;
    errors: string[];
    warnings: string[];
    performance: number;
  };
  components: {
    total: number;
    migrated: number;
    pending: number;
  };
  dataConsistency: {
    isConsistent: boolean;
    issues: string[];
  };
  performance: {
    score: number;
    responseTime: number;
    memoryUsage: number;
  };
  overall: {
    passed: boolean;
    score: number;
    recommendations: string[];
  };
}

export class MigrationTestRunner {
  private static instance: MigrationTestRunner;

  public static getInstance(): MigrationTestRunner {
    if (!MigrationTestRunner.instance) {
      MigrationTestRunner.instance = new MigrationTestRunner();
    }
    return MigrationTestRunner.instance;
  }

  /**
   * Run comprehensive migration test suite
   */
  public async runTestSuite(): Promise<TestSuiteResult> {
    logger.info('🧪 Starting comprehensive migration test suite...');

    const startTime = Date.now();
    const recommendations: string[] = [];

    try {
      // 1. Run migration validation
      logger.info('📋 Running migration validation...');
      const validationResult = await migrationValidator.validateMigration();

      // 2. Get component migration status
      logger.info('🔍 Checking component migration status...');
      const migrationReport = legacyAccessMonitor.getMigrationReport();

      // 3. Analyze results
      const validationPassed = validationResult.isValid;
      const componentMigrationComplete = migrationReport.allMigrated;
      const dataConsistent = validationResult.dataConsistency.isConsistent;
      const performanceAcceptable = validationResult.performance.performanceScore >= 80;

      // 4. Generate recommendations
      if (!validationPassed) {
        recommendations.push('Fix validation errors to complete migration');
      }
      if (!componentMigrationComplete) {
        recommendations.push(`Migrate remaining ${migrationReport.pendingComponents.length} components`);
      }
      if (!dataConsistent) {
        recommendations.push('Resolve data consistency issues');
      }
      if (!performanceAcceptable) {
        recommendations.push('Optimize performance to meet requirements');
      }
      if (validationResult.errors.length > 0) {
        recommendations.push('Address critical errors before deployment');
      }
      if (validationResult.warnings.length > 0) {
        recommendations.push('Review and resolve warnings');
      }

      // 5. Calculate overall score
      const overallScore = this.calculateOverallScore(
        validationResult,
        migrationReport,
        performanceAcceptable
      );

      const result: TestSuiteResult = {
        validation: {
          passed: validationPassed,
          errors: validationResult.errors,
          warnings: validationResult.warnings,
          performance: validationResult.performance.performanceScore
        },
        components: {
          total: migrationReport.totalComponents,
          migrated: migrationReport.migratedComponents.length,
          pending: migrationReport.pendingComponents.length
        },
        dataConsistency: {
          isConsistent: dataConsistent,
          issues: validationResult.dataConsistency.inconsistencies.map(i => i.description)
        },
        performance: {
          score: validationResult.performance.performanceScore,
          responseTime: validationResult.performance.averageResponseTime,
          memoryUsage: validationResult.performance.memoryUsage
        },
        overall: {
          passed: validationPassed && componentMigrationComplete && dataConsistent && performanceAcceptable,
          score: overallScore,
          recommendations
        }
      };

      const duration = Date.now() - startTime;
      logger.info(`✅ Test suite completed in ${duration}ms`);
      logger.info(`   Overall Score: ${overallScore}/100`);
      logger.info(`   Passed: ${result.overall.passed}`);
      logger.info(`   Recommendations: ${recommendations.length}`);

      return result;

    } catch (error) {
      logger.error('❌ Test suite failed:', error);
      throw error;
    }
  }

  /**
   * Calculate overall migration score
   */
  private calculateOverallScore(
    validationResult: any,
    migrationReport: any,
    performanceAcceptable: boolean
  ): number {
    let score = 100;

    // Deduct for validation errors
    score -= validationResult.errors.length * 10;
    score -= validationResult.warnings.length * 2;

    // Deduct for unmigrated components
    const migrationPercentage = migrationReport.migratedComponents.length / migrationReport.totalComponents;
    score -= (1 - migrationPercentage) * 30;

    // Deduct for data consistency issues
    if (!validationResult.dataConsistency.isConsistent) {
      score -= validationResult.dataConsistency.inconsistencies.length * 5;
    }

    // Deduct for performance issues
    if (!performanceAcceptable) {
      score -= 20;
    }

    return Math.max(0, score);
  }

  /**
   * Generate detailed test report
   */
  public generateTestReport(result: TestSuiteResult): string {
    let report = '🧪 MIGRATION TEST SUITE REPORT\n';
    report += '================================\n\n';

    // Overall status
    report += `Overall Status: ${result.overall.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
    report += `Overall Score: ${result.overall.score}/100\n\n`;

    // Validation results
    report += 'VALIDATION RESULTS:\n';
    report += '===================\n';
    report += `Status: ${result.validation.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
    report += `Performance Score: ${result.validation.performance}/100\n`;
    report += `Errors: ${result.validation.errors.length}\n`;
    report += `Warnings: ${result.validation.warnings.length}\n\n`;

    if (result.validation.errors.length > 0) {
      report += 'Errors:\n';
      result.validation.errors.forEach(error => {
        report += `  ❌ ${error}\n`;
      });
      report += '\n';
    }

    if (result.validation.warnings.length > 0) {
      report += 'Warnings:\n';
      result.validation.warnings.forEach(warning => {
        report += `  ⚠️ ${warning}\n`;
      });
      report += '\n';
    }

    // Component migration status
    report += 'COMPONENT MIGRATION:\n';
    report += '====================\n';
    report += `Total Components: ${result.components.total}\n`;
    report += `Migrated: ${result.components.migrated}\n`;
    report += `Pending: ${result.components.pending}\n`;
    report += `Migration Progress: ${Math.round((result.components.migrated / result.components.total) * 100)}%\n\n`;

    // Data consistency
    report += 'DATA CONSISTENCY:\n';
    report += '=================\n';
    report += `Status: ${result.dataConsistency.isConsistent ? '✅ CONSISTENT' : '❌ INCONSISTENT'}\n`;
    if (result.dataConsistency.issues.length > 0) {
      report += 'Issues:\n';
      result.dataConsistency.issues.forEach(issue => {
        report += `  ⚠️ ${issue}\n`;
      });
    }
    report += '\n';

    // Performance metrics
    report += 'PERFORMANCE METRICS:\n';
    report += '====================\n';
    report += `Score: ${result.performance.score}/100\n`;
    report += `Response Time: ${result.performance.responseTime}ms\n`;
    report += `Memory Usage: ${result.performance.memoryUsage} bytes\n`;
    report += `Status: ${result.performance.score >= 80 ? '✅ ACCEPTABLE' : '❌ NEEDS IMPROVEMENT'}\n\n`;

    // Recommendations
    if (result.overall.recommendations.length > 0) {
      report += 'RECOMMENDATIONS:\n';
      report += '================\n';
      result.overall.recommendations.forEach(recommendation => {
        report += `  💡 ${recommendation}\n`;
      });
      report += '\n';
    }

    // Summary
    report += 'SUMMARY:\n';
    report += '========\n';
    if (result.overall.passed) {
      report += '🎉 Migration is complete and ready for production!\n';
      report += '✅ All components have been migrated successfully\n';
      report += '✅ Data consistency is maintained\n';
      report += '✅ Performance meets requirements\n';
    } else {
      report += '⚠️ Migration requires additional work before production deployment\n';
      if (result.validation.errors.length > 0) {
        report += '❌ Critical errors must be resolved\n';
      }
      if (result.components.pending > 0) {
        report += `❌ ${result.components.pending} components still need migration\n`;
      }
      if (!result.dataConsistency.isConsistent) {
        report += '❌ Data consistency issues must be resolved\n';
      }
      if (result.performance.score < 80) {
        report += '❌ Performance optimization required\n';
      }
    }

    return report;
  }

  /**
   * Run quick health check
   */
  public async runQuickHealthCheck(): Promise<boolean> {
    try {
      logger.info('🔍 Running quick migration health check...');

      // Check if all components are migrated
      const migrationReport = legacyAccessMonitor.getMigrationReport();
      if (!migrationReport.allMigrated) {
        logger.warn(`⚠️ ${migrationReport.pendingComponents.length} components still pending migration`);
        return false;
      }

      // Check for critical errors
      const validationResult = await migrationValidator.validateMigration();
      if (validationResult.errors.length > 0) {
        logger.warn(`⚠️ ${validationResult.errors.length} validation errors found`);
        return false;
      }

      // Check data consistency
      if (!validationResult.dataConsistency.isConsistent) {
        logger.warn('⚠️ Data consistency issues found');
        return false;
      }

      logger.info('✅ Migration health check passed');
      return true;

    } catch (error) {
      logger.error('❌ Health check failed:', error);
      return false;
    }
  }

  /**
   * Run performance benchmark
   */
  public async runPerformanceBenchmark(): Promise<{
    score: number;
    responseTime: number;
    memoryUsage: number;
    recommendations: string[];
  }> {
    try {
      logger.info('⚡ Running performance benchmark...');

      const validationResult = await migrationValidator.validateMigration();
      const recommendations: string[] = [];

      // Analyze performance metrics
      if (validationResult.performance.averageResponseTime > 500) {
        recommendations.push('Response time is slow, consider optimizing data fetching');
      }
      if (validationResult.performance.memoryUsage > 10 * 1024 * 1024) {
        recommendations.push('Memory usage is high, check for memory leaks');
      }
      if (validationResult.performance.localStorageAccessCount > 0) {
        recommendations.push('localStorage access detected, ensure migration is complete');
      }
      if (validationResult.performance.performanceScore < 80) {
        recommendations.push('Overall performance score is below acceptable threshold');
      }

      const result = {
        score: validationResult.performance.performanceScore,
        responseTime: validationResult.performance.averageResponseTime,
        memoryUsage: validationResult.performance.memoryUsage,
        recommendations
      };

      logger.info(`📊 Performance benchmark completed - Score: ${result.score}/100`);
      return result;

    } catch (error) {
      logger.error('❌ Performance benchmark failed:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const migrationTestRunner = MigrationTestRunner.getInstance();
