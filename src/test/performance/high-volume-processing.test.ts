import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentTypeDetector } from '../../services/PaymentTypeDetector';
import { CardPaymentFastTrack } from '../../services/CardPaymentFastTrack';
import { EnhancedRealTimeSync } from '../../services/EnhancedRealTimeSync';
import { CourseAccessController } from '../../services/CourseAccessController';
import type { IkhokhaWebhook, EnrollmentData } from '../../types/ikhokha';

/**
 * Performance Tests for High-Volume Card Payment Processing
 * 
 * These tests verify system performance under high load:
 * 1. Concurrent webhook processing
 * 2. Memory usage under sustained load
 * 3. Response time consistency
 * 4. Throughput measurements
 * 5. Resource utilization monitoring
 * 
 * Requirements: 1.1, 2.1, 4.1
 */
describe('High-Volume Card Payment Processing Tests', () => {
  let paymentDetector: PaymentTypeDetector;
  let fastTrack: CardPaymentFastTrack;
  let realTimeSync: EnhancedRealTimeSync;
  let accessController: CourseAccessController;

  // Performance metrics tracking
  interface PerformanceMetrics {
    totalProcessed: number;
    successfulProcessed: number;
    failedProcessed: number;
    averageProcessingTime: number;
    minProcessingTime: number;
    maxProcessingTime: number;
    throughputPerSecond: number;
    memoryUsage: number;
    errors: Error[];
  }

  const createMockWebhook = (id: string, userId: string, courseId: string): IkhokhaWebhook => ({
    id: `wh_perf_${id}`,
    type: 'payment.success',
    data: {
      id: `pay_perf_${id}`,
      amount: 29900,
      currency: 'ZAR',
      status: 'completed',
      payment_method: {
        type: 'card',
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2025
        }
      },
      metadata: {
        user_email: `user${userId}@example.com`,
        course_id: courseId,
        enrollment_id: `enroll_${id}`
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    created_at: new Date().toISOString()
  });

  const createMockEnrollment = (id: string, userId: string, courseId: string): EnrollmentData => ({
    id: `enroll_${id}`,
    user_id: userId,
    user_email: `user${userId}@example.com`,
    course_id: courseId,
    course_title: `Course ${courseId}`,
    status: 'pending',
    payment_type: 'unknown',
    payment_status: 'pending',
    payment_reference: `pay_perf_${id}`,
    approval_type: 'manual_admin_approval',
    approved_by: '',
    approval_source: 'webhook_card_payment',
    course_access_granted: false,
    access_level: 'none',
    status_history: [],
    last_updated_by: 'system_automatic',
    created_at: new Date(),
    updated_at: new Date(),
    sync_version: 1,
    last_synced_at: new Date()
  });

  const measurePerformance = async <T>(
    operation: () => Promise<T>,
    iterations: number
  ): Promise<PerformanceMetrics> => {
    const metrics: PerformanceMetrics = {
      totalProcessed: 0,
      successfulProcessed: 0,
      failedProcessed: 0,
      averageProcessingTime: 0,
      minProcessingTime: Infinity,
      maxProcessingTime: 0,
      throughputPerSecond: 0,
      memoryUsage: 0,
      errors: []
    };

    const processingTimes: number[] = [];
    const startTime = Date.now();
    const initialMemory = process.memoryUsage().heapUsed;

    for (let i = 0; i < iterations; i++) {
      const operationStart = Date.now();
      
      try {
        await operation();
        const operationTime = Date.now() - operationStart;
        
        processingTimes.push(operationTime);
        metrics.successfulProcessed++;
        metrics.minProcessingTime = Math.min(metrics.minProcessingTime, operationTime);
        metrics.maxProcessingTime = Math.max(metrics.maxProcessingTime, operationTime);
      } catch (error) {
        metrics.failedProcessed++;
        metrics.errors.push(error as Error);
      }
      
      metrics.totalProcessed++;
    }

    const totalTime = Date.now() - startTime;
    const finalMemory = process.memoryUsage().heapUsed;

    metrics.averageProcessingTime = processingTimes.reduce((a, b) => a + b, 0) / processingTimes.length || 0;
    metrics.throughputPerSecond = (metrics.successfulProcessed / totalTime) * 1000;
    metrics.memoryUsage = finalMemory - initialMemory;

    return metrics;
  };

  beforeEach(() => {
    paymentDetector = new PaymentTypeDetector();
    fastTrack = new CardPaymentFastTrack();
    realTimeSync = new EnhancedRealTimeSync();
    accessController = new CourseAccessController();

    // Mock storage for performance tests
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    global.BroadcastChannel = vi.fn().mockImplementation(() => ({
      postMessage: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      close: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Concurrent Processing Performance', () => {
    it('should handle 100 concurrent card payments efficiently', async () => {
      const concurrentCount = 100;
      const webhooks = Array.from({ length: concurrentCount }, (_, i) => 
        createMockWebhook(i.toString(), `user${i}`, `course${i % 10}`)
      );
      const enrollments = Array.from({ length: concurrentCount }, (_, i) => 
        createMockEnrollment(i.toString(), `user${i}`, `course${i % 10}`)
      );

      const startTime = Date.now();
      
      const results = await Promise.all(
        webhooks.map((webhook, i) => 
          fastTrack.processCardPayment(webhook, enrollments[i])
        )
      );
      
      const totalTime = Date.now() - startTime;
      const successfulResults = results.filter(r => r.success);

      // Performance assertions
      expect(successfulResults.length).toBeGreaterThan(95); // 95% success rate
      expect(totalTime).toBeLessThan(10000); // Under 10 seconds for 100 payments
      
      // Throughput should be at least 10 payments per second
      const throughput = (successfulResults.length / totalTime) * 1000;
      expect(throughput).toBeGreaterThan(10);

      // Individual processing times should be reasonable
      results.forEach(result => {
        if (result.success) {
          expect(result.processingTimeMs).toBeLessThan(2000);
        }
      });
    });

    it('should maintain performance under sustained load', async () => {
      const batchSize = 50;
      const batchCount = 5;
      const totalPayments = batchSize * batchCount;

      const allMetrics: PerformanceMetrics[] = [];

      for (let batch = 0; batch < batchCount; batch++) {
        const batchWebhooks = Array.from({ length: batchSize }, (_, i) => {
          const id = batch * batchSize + i;
          return createMockWebhook(id.toString(), `user${id}`, `course${id % 10}`);
        });
        
        const batchEnrollments = Array.from({ length: batchSize }, (_, i) => {
          const id = batch * batchSize + i;
          return createMockEnrollment(id.toString(), `user${id}`, `course${id % 10}`);
        });

        const batchMetrics = await measurePerformance(async () => {
          const results = await Promise.all(
            batchWebhooks.map((webhook, i) => 
              fastTrack.processCardPayment(webhook, batchEnrollments[i])
            )
          );
          return results;
        }, 1);

        allMetrics.push(batchMetrics);

        // Small delay between batches to simulate real-world timing
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Verify performance doesn't degrade over time
      const firstBatchThroughput = allMetrics[0].throughputPerSecond;
      const lastBatchThroughput = allMetrics[allMetrics.length - 1].throughputPerSecond;
      
      // Throughput shouldn't degrade by more than 20%
      expect(lastBatchThroughput).toBeGreaterThan(firstBatchThroughput * 0.8);

      // Memory usage shouldn't grow excessively
      const totalMemoryGrowth = allMetrics.reduce((sum, metrics) => sum + metrics.memoryUsage, 0);
      expect(totalMemoryGrowth).toBeLessThan(100 * 1024 * 1024); // Less than 100MB growth
    });

    it('should handle burst traffic patterns', async () => {
      // Simulate burst pattern: quiet -> burst -> quiet -> burst
      const quietPeriodCount = 5;
      const burstPeriodCount = 50;

      // Quiet period
      const quietMetrics = await measurePerformance(async () => {
        const webhook = createMockWebhook('quiet', 'user_quiet', 'course_quiet');
        const enrollment = createMockEnrollment('quiet', 'user_quiet', 'course_quiet');
        return fastTrack.processCardPayment(webhook, enrollment);
      }, quietPeriodCount);

      // Burst period
      const burstWebhooks = Array.from({ length: burstPeriodCount }, (_, i) => 
        createMockWebhook(`burst${i}`, `user_burst${i}`, `course_burst${i % 5}`)
      );
      const burstEnrollments = Array.from({ length: burstPeriodCount }, (_, i) => 
        createMockEnrollment(`burst${i}`, `user_burst${i}`, `course_burst${i % 5}`)
      );

      const burstStartTime = Date.now();
      const burstResults = await Promise.all(
        burstWebhooks.map((webhook, i) => 
          fastTrack.processCardPayment(webhook, burstEnrollments[i])
        )
      );
      const burstTime = Date.now() - burstStartTime;

      // Another quiet period
      const quietMetrics2 = await measurePerformance(async () => {
        const webhook = createMockWebhook('quiet2', 'user_quiet2', 'course_quiet2');
        const enrollment = createMockEnrollment('quiet2', 'user_quiet2', 'course_quiet2');
        return fastTrack.processCardPayment(webhook, enrollment);
      }, quietPeriodCount);

      // Assertions
      expect(quietMetrics.successfulProcessed).toBe(quietPeriodCount);
      expect(burstResults.filter(r => r.success).length).toBeGreaterThan(burstPeriodCount * 0.9);
      expect(quietMetrics2.successfulProcessed).toBe(quietPeriodCount);
      
      // Burst should complete in reasonable time
      expect(burstTime).toBeLessThan(15000); // 15 seconds for 50 payments

      // System should recover quickly after burst
      expect(quietMetrics2.averageProcessingTime).toBeLessThan(quietMetrics.averageProcessingTime * 1.5);
    });
  });

  describe('Memory Usage and Resource Management', () => {
    it('should maintain stable memory usage during extended processing', async () => {
      const iterations = 200;
      const memorySnapshots: number[] = [];

      for (let i = 0; i < iterations; i++) {
        const webhook = createMockWebhook(i.toString(), `user${i}`, `course${i % 20}`);
        const enrollment = createMockEnrollment(i.toString(), `user${i}`, `course${i % 20}`);
        
        await fastTrack.processCardPayment(webhook, enrollment);
        
        // Take memory snapshot every 20 iterations
        if (i % 20 === 0) {
          memorySnapshots.push(process.memoryUsage().heapUsed);
        }
      }

      // Memory shouldn't grow linearly with processing count
      const initialMemory = memorySnapshots[0];
      const finalMemory = memorySnapshots[memorySnapshots.length - 1];
      const memoryGrowth = finalMemory - initialMemory;
      
      // Memory growth should be reasonable (less than 50MB for 200 operations)
      expect(memoryGrowth).toBeLessThan(50 * 1024 * 1024);

      // Memory usage should stabilize (not continuously growing)
      const lastThreeSnapshots = memorySnapshots.slice(-3);
      const memoryVariation = Math.max(...lastThreeSnapshots) - Math.min(...lastThreeSnapshots);
      expect(memoryVariation).toBeLessThan(10 * 1024 * 1024); // Less than 10MB variation
    });

    it('should handle memory pressure gracefully', async () => {
      // Simulate memory pressure by creating large objects
      const largeObjects: any[] = [];
      
      try {
        // Create some memory pressure
        for (let i = 0; i < 100; i++) {
          largeObjects.push(new Array(10000).fill(`memory_pressure_${i}`));
        }

        // Process payments under memory pressure
        const webhooks = Array.from({ length: 20 }, (_, i) => 
          createMockWebhook(`pressure${i}`, `user_pressure${i}`, `course_pressure${i % 5}`)
        );
        const enrollments = Array.from({ length: 20 }, (_, i) => 
          createMockEnrollment(`pressure${i}`, `user_pressure${i}`, `course_pressure${i % 5}`)
        );

        const results = await Promise.all(
          webhooks.map((webhook, i) => 
            fastTrack.processCardPayment(webhook, enrollments[i])
          )
        );

        // Should still process successfully under memory pressure
        const successfulResults = results.filter(r => r.success);
        expect(successfulResults.length).toBeGreaterThan(15); // At least 75% success rate

      } finally {
        // Clean up memory pressure
        largeObjects.length = 0;
      }
    });
  });

  describe('Response Time Consistency', () => {
    it('should maintain consistent response times under varying load', async () => {
      const loadLevels = [1, 5, 10, 25, 50];
      const responseTimeResults: { load: number; avgTime: number; maxTime: number }[] = [];

      for (const load of loadLevels) {
        const webhooks = Array.from({ length: load }, (_, i) => 
          createMockWebhook(`load${load}_${i}`, `user${i}`, `course${i % 3}`)
        );
        const enrollments = Array.from({ length: load }, (_, i) => 
          createMockEnrollment(`load${load}_${i}`, `user${i}`, `course${i % 3}`)
        );

        const startTime = Date.now();
        const results = await Promise.all(
          webhooks.map((webhook, i) => 
            fastTrack.processCardPayment(webhook, enrollments[i])
          )
        );
        const totalTime = Date.now() - startTime;

        const successfulResults = results.filter(r => r.success);
        const avgProcessingTime = successfulResults.reduce((sum, r) => sum + r.processingTimeMs, 0) / successfulResults.length;
        const maxProcessingTime = Math.max(...successfulResults.map(r => r.processingTimeMs));

        responseTimeResults.push({
          load,
          avgTime: avgProcessingTime,
          maxTime: maxProcessingTime
        });
      }

      // Response times shouldn't increase dramatically with load
      const baselineAvg = responseTimeResults[0].avgTime;
      const highLoadAvg = responseTimeResults[responseTimeResults.length - 1].avgTime;
      
      // Average response time shouldn't increase by more than 3x under 50x load
      expect(highLoadAvg).toBeLessThan(baselineAvg * 3);

      // Maximum response time should stay under 5 seconds even at high load
      responseTimeResults.forEach(result => {
        expect(result.maxTime).toBeLessThan(5000);
      });
    });

    it('should handle timeout scenarios gracefully', async () => {
      // Mock slow processing
      const originalProcessCardPayment = fastTrack.processCardPayment;
      let slowCallCount = 0;

      vi.spyOn(fastTrack, 'processCardPayment').mockImplementation(async (webhook, enrollment) => {
        slowCallCount++;
        
        // Make every 5th call slow
        if (slowCallCount % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay
        }
        
        return originalProcessCardPayment.call(fastTrack, webhook, enrollment);
      });

      const webhooks = Array.from({ length: 20 }, (_, i) => 
        createMockWebhook(`timeout${i}`, `user_timeout${i}`, `course_timeout${i % 4}`)
      );
      const enrollments = Array.from({ length: 20 }, (_, i) => 
        createMockEnrollment(`timeout${i}`, `user_timeout${i}`, `course_timeout${i % 4}`)
      );

      const startTime = Date.now();
      const results = await Promise.all(
        webhooks.map((webhook, i) => 
          fastTrack.processCardPayment(webhook, enrollments[i])
        )
      );
      const totalTime = Date.now() - startTime;

      // Should complete all operations even with some slow ones
      const successfulResults = results.filter(r => r.success);
      expect(successfulResults.length).toBe(20);

      // Total time should be reasonable (not 20 * 3 seconds)
      expect(totalTime).toBeLessThan(15000); // Should benefit from concurrency
    });
  });

  describe('Throughput Measurements', () => {
    it('should achieve minimum throughput requirements', async () => {
      const targetThroughput = 20; // payments per second
      const testDuration = 5000; // 5 seconds
      const expectedMinimumProcessed = Math.floor((targetThroughput * testDuration) / 1000);

      let processedCount = 0;
      const startTime = Date.now();

      // Process payments continuously for the test duration
      const processingPromises: Promise<any>[] = [];
      
      while (Date.now() - startTime < testDuration) {
        const webhook = createMockWebhook(processedCount.toString(), `user${processedCount}`, `course${processedCount % 10}`);
        const enrollment = createMockEnrollment(processedCount.toString(), `user${processedCount}`, `course${processedCount % 10}`);
        
        const promise = fastTrack.processCardPayment(webhook, enrollment)
          .then(() => { processedCount++; })
          .catch(() => { /* Handle errors gracefully */ });
        
        processingPromises.push(promise);
        
        // Small delay to prevent overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Wait for all processing to complete
      await Promise.all(processingPromises);

      const actualThroughput = (processedCount / testDuration) * 1000;
      
      expect(processedCount).toBeGreaterThan(expectedMinimumProcessed);
      expect(actualThroughput).toBeGreaterThan(targetThroughput);
    });

    it('should scale throughput with available resources', async () => {
      // Test with different concurrency levels
      const concurrencyLevels = [1, 5, 10, 20];
      const throughputResults: { concurrency: number; throughput: number }[] = [];

      for (const concurrency of concurrencyLevels) {
        const paymentsPerLevel = 50;
        const webhooks = Array.from({ length: paymentsPerLevel }, (_, i) => 
          createMockWebhook(`scale${concurrency}_${i}`, `user${i}`, `course${i % 5}`)
        );
        const enrollments = Array.from({ length: paymentsPerLevel }, (_, i) => 
          createMockEnrollment(`scale${concurrency}_${i}`, `user${i}`, `course${i % 5}`)
        );

        const startTime = Date.now();
        
        // Process in batches based on concurrency level
        const batches: Promise<any>[][] = [];
        for (let i = 0; i < paymentsPerLevel; i += concurrency) {
          const batch = webhooks.slice(i, i + concurrency).map((webhook, j) => 
            fastTrack.processCardPayment(webhook, enrollments[i + j])
          );
          batches.push(batch);
        }

        // Process all batches
        for (const batch of batches) {
          await Promise.all(batch);
        }

        const totalTime = Date.now() - startTime;
        const throughput = (paymentsPerLevel / totalTime) * 1000;

        throughputResults.push({ concurrency, throughput });
      }

      // Throughput should generally increase with concurrency (up to a point)
      expect(throughputResults[1].throughput).toBeGreaterThan(throughputResults[0].throughput);
      expect(throughputResults[2].throughput).toBeGreaterThan(throughputResults[1].throughput);
    });
  });

  describe('Error Handling Under Load', () => {
    it('should maintain error handling performance under high load', async () => {
      const totalRequests = 100;
      const errorRate = 0.1; // 10% error rate
      
      const webhooks = Array.from({ length: totalRequests }, (_, i) => {
        const webhook = createMockWebhook(i.toString(), `user${i}`, `course${i % 10}`);
        
        // Introduce errors in 10% of webhooks
        if (i % 10 === 0) {
          webhook.data.status = 'failed';
        }
        
        return webhook;
      });
      
      const enrollments = Array.from({ length: totalRequests }, (_, i) => 
        createMockEnrollment(i.toString(), `user${i}`, `course${i % 10}`)
      );

      const startTime = Date.now();
      const results = await Promise.all(
        webhooks.map((webhook, i) => 
          fastTrack.processCardPayment(webhook, enrollments[i])
        )
      );
      const totalTime = Date.now() - startTime;

      const successfulResults = results.filter(r => r.success);
      const failedResults = results.filter(r => !r.success);

      // Should handle expected error rate
      expect(failedResults.length).toBeCloseTo(totalRequests * errorRate, 2);
      expect(successfulResults.length).toBeCloseTo(totalRequests * (1 - errorRate), 2);

      // Error handling shouldn't significantly impact performance
      expect(totalTime).toBeLessThan(15000); // Should complete in reasonable time

      // Failed requests should have proper error information
      failedResults.forEach(result => {
        expect(result.error).toBeDefined();
        expect(result.error?.type).toBeDefined();
      });
    });

    it('should recover quickly from temporary failures', async () => {
      let failureCount = 0;
      const maxFailures = 10;

      // Mock temporary failures
      const originalProcessCardPayment = fastTrack.processCardPayment;
      vi.spyOn(fastTrack, 'processCardPayment').mockImplementation(async (webhook, enrollment) => {
        failureCount++;
        
        // Fail the first 10 requests, then succeed
        if (failureCount <= maxFailures) {
          throw new Error('Temporary failure');
        }
        
        return originalProcessCardPayment.call(fastTrack, webhook, enrollment);
      });

      const totalRequests = 50;
      const webhooks = Array.from({ length: totalRequests }, (_, i) => 
        createMockWebhook(i.toString(), `user${i}`, `course${i % 10}`)
      );
      const enrollments = Array.from({ length: totalRequests }, (_, i) => 
        createMockEnrollment(i.toString(), `user${i}`, `course${i % 10}`)
      );

      const results = await Promise.allSettled(
        webhooks.map((webhook, i) => 
          fastTrack.processCardPayment(webhook, enrollments[i])
        )
      );

      const successfulResults = results.filter(r => r.status === 'fulfilled');
      const failedResults = results.filter(r => r.status === 'rejected');

      // Should have expected number of failures and successes
      expect(failedResults.length).toBe(maxFailures);
      expect(successfulResults.length).toBe(totalRequests - maxFailures);
    });
  });
});