import { migrationTestRunner } from './migrationTestRunner';
import { logger } from './logger';

/**
 * Development utility to run migration tests automatically
 * This can be imported in development mode to run comprehensive tests
 */

export const runMigrationTests = async (): Promise<void> => {
  if (!import.meta.env.DEV) {
    logger.info('Migration tests only run in development mode');
    return;
  }

  try {
    logger.info('🚀 Starting automated migration tests...');

    // Run quick health check first
    const healthCheckPassed = await migrationTestRunner.runQuickHealthCheck();
    if (!healthCheckPassed) {
      logger.warn('⚠️ Health check failed, running full test suite...');
    }

    // Run comprehensive test suite
    const testResult = await migrationTestRunner.runTestSuite();

    // Generate and log report
    const report = migrationTestRunner.generateTestReport(testResult);
    console.log(report);

    // Run performance benchmark
    const performanceResult = await migrationTestRunner.runPerformanceBenchmark();
    console.log('\n⚡ PERFORMANCE BENCHMARK:');
    console.log('========================');
    console.log(`Score: ${performanceResult.score}/100`);
    console.log(`Response Time: ${performanceResult.responseTime}ms`);
    console.log(`Memory Usage: ${performanceResult.memoryUsage} bytes`);
    
    if (performanceResult.recommendations.length > 0) {
      console.log('\nPerformance Recommendations:');
      performanceResult.recommendations.forEach(rec => {
        console.log(`  💡 ${rec}`);
      });
    }

    // Display results in console with colors
    if (testResult.overall.passed) {
      console.log('%c🎉 MIGRATION TESTS PASSED! Ready for production.', 'color: green; font-weight: bold; font-size: 16px;');
    } else {
      console.log('%c⚠️ MIGRATION TESTS FAILED! Review issues below.', 'color: orange; font-weight: bold; font-size: 16px;');
      console.log('%cScore: ' + testResult.overall.score + '/100', 'color: orange; font-weight: bold;');
    }

    // Store results for debugging
    (window as any).__migrationTestResults__ = testResult;

  } catch (error) {
    logger.error('❌ Migration tests failed:', error);
    console.error('%c❌ Migration tests failed: ' + error, 'color: red; font-weight: bold;');
  }
};

// Auto-run tests in development mode
if (import.meta.env.DEV) {
  // Run tests after a delay to allow components to initialize
  setTimeout(() => {
    runMigrationTests();
  }, 3000);
}
