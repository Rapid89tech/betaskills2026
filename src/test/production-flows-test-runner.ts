/**
 * Production Payment Flows Test Runner
 * 
 * Comprehensive test runner for all production payment flow tests.
 * Executes tests in sequence and provides detailed reporting.
 * 
 * Requirements: 2.1, 3.1, 4.1, 5.1
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface TestResult {
  testFile: string;
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  coverage?: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
}

interface TestSuite {
  name: string;
  file: string;
  description: string;
  requirements: string[];
}

class ProductionFlowsTestRunner {
  private testSuites: TestSuite[] = [
    {
      name: 'End-to-End Production Payment Flows',
      file: 'src/test/integration/production-payment-flows.e2e.test.ts',
      description: 'Complete enrollment and payment workflows with real-time updates',
      requirements: ['2.1', '3.1', '4.1', '5.1']
    },
    {
      name: 'Real-Time Status Synchronization',
      file: 'src/test/integration/real-time-status-sync.integration.test.ts',
      description: 'Cross-component and cross-tab status synchronization',
      requirements: ['3.1', '3.2', '3.3', '3.4']
    },
    {
      name: 'Webhook Processing with Signature Validation',
      file: 'src/test/integration/webhook-signature-validation.test.ts',
      description: 'Production webhook security and signature validation',
      requirements: ['5.1', '8.1', '8.2', '8.3', '8.4']
    },
    {
      name: 'Admin Approval Workflow with Real-Time Updates',
      file: 'src/test/integration/admin-approval-realtime.test.ts',
      description: 'Admin dashboard real-time updates and approval workflows',
      requirements: ['4.1', '4.2', '4.3', '4.4']
    }
  ];

  private results: TestResult[] = [];
  private startTime: number = 0;
  private endTime: number = 0;

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Production Payment Flows Test Suite');
    console.log('=' .repeat(60));
    
    this.startTime = Date.now();

    for (const suite of this.testSuites) {
      await this.runTestSuite(suite);
    }

    this.endTime = Date.now();
    this.generateReport();
  }

  private async runTestSuite(suite: TestSuite): Promise<void> {
    console.log(`\n📋 Running: ${suite.name}`);
    console.log(`📄 Description: ${suite.description}`);
    console.log(`📋 Requirements: ${suite.requirements.join(', ')}`);
    console.log('-'.repeat(50));

    const suiteStartTime = Date.now();

    try {
      // Run the test suite
      const command = `npx vitest run "${suite.file}" --reporter=json --coverage`;
      const output = execSync(command, { 
        encoding: 'utf-8',
        timeout: 120000, // 2 minute timeout per suite
        stdio: 'pipe'
      });

      const suiteEndTime = Date.now();
      const duration = suiteEndTime - suiteStartTime;

      // Parse test results
      const testResults = this.parseTestOutput(output, suite.file, duration);
      this.results.push(...testResults);

      const passedTests = testResults.filter(r => r.status === 'passed').length;
      const failedTests = testResults.filter(r => r.status === 'failed').length;

      console.log(`✅ Passed: ${passedTests}`);
      console.log(`❌ Failed: ${failedTests}`);
      console.log(`⏱️  Duration: ${duration}ms`);

      if (failedTests > 0) {
        console.log('\n❌ Failed Tests:');
        testResults
          .filter(r => r.status === 'failed')
          .forEach(test => {
            console.log(`  - ${test.testName}: ${test.error}`);
          });
      }

    } catch (error) {
      const suiteEndTime = Date.now();
      const duration = suiteEndTime - suiteStartTime;

      console.log(`❌ Test suite failed: ${error}`);
      
      this.results.push({
        testFile: suite.file,
        testName: suite.name,
        status: 'failed',
        duration,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  private parseTestOutput(output: string, testFile: string, duration: number): TestResult[] {
    const results: TestResult[] = [];

    try {
      // Try to parse JSON output from vitest
      const jsonOutput = JSON.parse(output);
      
      if (jsonOutput.testResults) {
        jsonOutput.testResults.forEach((fileResult: any) => {
          if (fileResult.name.includes(testFile)) {
            fileResult.assertionResults.forEach((test: any) => {
              results.push({
                testFile,
                testName: test.title,
                status: test.status === 'passed' ? 'passed' : 'failed',
                duration: test.duration || 0,
                error: test.failureMessages?.[0]
              });
            });
          }
        });
      }
    } catch (parseError) {
      // Fallback: create a single result for the entire suite
      const hasError = output.toLowerCase().includes('error') || 
                      output.toLowerCase().includes('failed');
      
      results.push({
        testFile,
        testName: 'Test Suite Execution',
        status: hasError ? 'failed' : 'passed',
        duration,
        error: hasError ? 'Test execution failed - check logs' : undefined
      });
    }

    return results;
  }

  private generateReport(): void {
    const totalDuration = this.endTime - this.startTime;
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.status === 'passed').length;
    const failedTests = this.results.filter(r => r.status === 'failed').length;
    const skippedTests = this.results.filter(r => r.status === 'skipped').length;

    console.log('\n' + '='.repeat(60));
    console.log('📊 PRODUCTION PAYMENT FLOWS TEST REPORT');
    console.log('='.repeat(60));

    console.log(`\n📈 Summary:`);
    console.log(`  Total Tests: ${totalTests}`);
    console.log(`  ✅ Passed: ${passedTests} (${((passedTests / totalTests) * 100).toFixed(1)}%)`);
    console.log(`  ❌ Failed: ${failedTests} (${((failedTests / totalTests) * 100).toFixed(1)}%)`);
    console.log(`  ⏭️  Skipped: ${skippedTests} (${((skippedTests / totalTests) * 100).toFixed(1)}%)`);
    console.log(`  ⏱️  Total Duration: ${totalDuration}ms (${(totalDuration / 1000).toFixed(2)}s)`);

    // Requirements coverage
    console.log(`\n📋 Requirements Coverage:`);
    const requirementsCovered = new Set<string>();
    this.testSuites.forEach(suite => {
      suite.requirements.forEach(req => requirementsCovered.add(req));
    });

    Array.from(requirementsCovered).sort().forEach(req => {
      const suitesForReq = this.testSuites.filter(s => s.requirements.includes(req));
      const testsForReq = this.results.filter(r => 
        suitesForReq.some(s => r.testFile === s.file)
      );
      const passedForReq = testsForReq.filter(r => r.status === 'passed').length;
      const totalForReq = testsForReq.length;
      
      const coverage = totalForReq > 0 ? ((passedForReq / totalForReq) * 100).toFixed(1) : '0.0';
      console.log(`  Requirement ${req}: ${passedForReq}/${totalForReq} tests passed (${coverage}%)`);
    });

    // Test suite breakdown
    console.log(`\n📋 Test Suite Breakdown:`);
    this.testSuites.forEach(suite => {
      const suiteResults = this.results.filter(r => r.testFile === suite.file);
      const suitePassed = suiteResults.filter(r => r.status === 'passed').length;
      const suiteTotal = suiteResults.length;
      const suiteDuration = suiteResults.reduce((sum, r) => sum + r.duration, 0);

      console.log(`\n  ${suite.name}:`);
      console.log(`    File: ${suite.file}`);
      console.log(`    Tests: ${suitePassed}/${suiteTotal} passed`);
      console.log(`    Duration: ${suiteDuration}ms`);
      console.log(`    Requirements: ${suite.requirements.join(', ')}`);

      if (suiteResults.some(r => r.status === 'failed')) {
        console.log(`    ❌ Failed Tests:`);
        suiteResults
          .filter(r => r.status === 'failed')
          .forEach(test => {
            console.log(`      - ${test.testName}`);
            if (test.error) {
              console.log(`        Error: ${test.error.substring(0, 100)}...`);
            }
          });
      }
    });

    // Performance metrics
    console.log(`\n⚡ Performance Metrics:`);
    const avgTestDuration = totalTests > 0 ? (totalDuration / totalTests) : 0;
    console.log(`  Average test duration: ${avgTestDuration.toFixed(2)}ms`);
    
    const slowestTest = this.results.reduce((slowest, current) => 
      current.duration > slowest.duration ? current : slowest
    , { duration: 0, testName: 'None', testFile: '' });
    
    if (slowestTest.duration > 0) {
      console.log(`  Slowest test: ${slowestTest.testName} (${slowestTest.duration}ms)`);
    }

    // Generate JSON report
    this.generateJSONReport();

    // Final status
    console.log(`\n${failedTests === 0 ? '🎉' : '⚠️'} Test Suite ${failedTests === 0 ? 'PASSED' : 'FAILED'}`);
    
    if (failedTests === 0) {
      console.log('✅ All production payment flow tests passed successfully!');
      console.log('🚀 Production payment integration is ready for deployment.');
    } else {
      console.log(`❌ ${failedTests} test(s) failed. Please review and fix before deployment.`);
    }

    console.log('='.repeat(60));
  }

  private generateJSONReport(): void {
    const report = {
      summary: {
        totalTests: this.results.length,
        passedTests: this.results.filter(r => r.status === 'passed').length,
        failedTests: this.results.filter(r => r.status === 'failed').length,
        skippedTests: this.results.filter(r => r.status === 'skipped').length,
        totalDuration: this.endTime - this.startTime,
        timestamp: new Date().toISOString()
      },
      testSuites: this.testSuites.map(suite => ({
        ...suite,
        results: this.results.filter(r => r.testFile === suite.file)
      })),
      requirements: {
        '2.1': 'Complete enrollment and payment workflows',
        '3.1': 'Real-time status synchronization across components',
        '3.2': 'Cross-tab synchronization',
        '3.3': 'WebSocket real-time updates',
        '3.4': 'Error handling and resilience',
        '4.1': 'Real-time admin dashboard updates',
        '4.2': 'Instant approval actions',
        '4.3': 'Bulk approval operations',
        '4.4': 'Admin action logging and audit trail',
        '5.1': 'Production configuration validation',
        '8.1': 'Production webhook processing',
        '8.2': 'Webhook signature validation',
        '8.3': 'Webhook retry mechanism',
        '8.4': 'Security monitoring and alerting'
      },
      coverage: this.calculateRequirementsCoverage()
    };

    const reportPath = join(process.cwd(), 'test-reports', 'production-flows-report.json');
    
    try {
      // Ensure directory exists
      execSync('mkdir -p test-reports', { stdio: 'ignore' });
      writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 JSON report generated: ${reportPath}`);
    } catch (error) {
      console.log(`⚠️  Failed to generate JSON report: ${error}`);
    }
  }

  private calculateRequirementsCoverage(): Record<string, { passed: number; total: number; percentage: number }> {
    const coverage: Record<string, { passed: number; total: number; percentage: number }> = {};

    this.testSuites.forEach(suite => {
      suite.requirements.forEach(req => {
        if (!coverage[req]) {
          coverage[req] = { passed: 0, total: 0, percentage: 0 };
        }

        const testsForReq = this.results.filter(r => r.testFile === suite.file);
        const passedForReq = testsForReq.filter(r => r.status === 'passed').length;

        coverage[req].passed += passedForReq;
        coverage[req].total += testsForReq.length;
        coverage[req].percentage = coverage[req].total > 0 
          ? (coverage[req].passed / coverage[req].total) * 100 
          : 0;
      });
    });

    return coverage;
  }
}

// CLI execution
if (require.main === module) {
  const runner = new ProductionFlowsTestRunner();
  
  runner.runAllTests()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test runner failed:', error);
      process.exit(1);
    });
}

export { ProductionFlowsTestRunner };