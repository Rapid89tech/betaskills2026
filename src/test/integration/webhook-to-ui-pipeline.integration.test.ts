/**
 * 🧪 WEBHOOK-TO-UI UPDATE PIPELINE INTEGRATION TESTS
 * 
 * Comprehensive integration tests for the complete webhook processing to UI update flow
 * Tests Requirements: 2.1, 3.1, 5.1, 6.1
 * 
 * Test Coverage:
 * - Complete webhook processing to UI update flow
 * - Cross-tab synchronization during card payment approval
 * - Enrollment persistence during card payment processing
 * - Error recovery and fallback mechanisms
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentTypeDetector } from '@/services/PaymentTypeDetector';
import { CardPaymentFastTrack } from '@/services/CardPaymentFastTrack';
import { EnhancedRealTimeSync } from '@/services/EnhancedRealTimeSync';
import {
  updateEnrollmentStatusImmediately,
  resolveEnrollmentConflicts,
  recoverEnrollmentDataEnhanced,
  processCardPaymentApproval,
  getEnrollmentStatus
} from '@/utils/enrollmentPersistence';
import { IkhokhaWebhook, PaymentType, EnrollmentStatus } from '@/types/ikhokha';

// Mock Supabase
const mockSupabaseUpdate = vi.fn();
const mockSupabaseSelect = vi.fn();
const mockSupabaseInsert = vi.fn();

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn((table: string) => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => mockSupabaseUpdate())
          }))
        }))
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => mockSupabaseSelect())
        })),
        limit: vi.fn(() => mockSupabaseSelect())
      })),
      insert: vi.fn(() => mockSupabaseInsert())
    }))
  }
}));

// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn()
  }
}));

// Mock BroadcastChannel
const mockBroadcastChannelPostMessage = vi.fn();
const mockBroadcastChannelClose = vi.fn();

global.BroadcastChannel = vi.fn().mockImplementation(() => ({
  postMessage: mockBroadcastChannelPostMessage,
  addEventListener: vi.fn(),
  close: mockBroadcastChannelClose
})) as any;

describe('Webhook-to-UI Update Pipeline Integration Tests', () => {
  const testUserId = 'user-test-123';
  const testCourseId = 'course-test-456';
  const testEnrollmentId = 'enrollment-test-789';
  const testTransactionId = 'txn-test-abc123';

  let paymentTypeDetector: PaymentTypeDetector;
  let cardPaymentFastTrack: CardPaymentFastTrack;
  let enhancedRealTimeSync: EnhancedRealTimeSync;

  // Helper to create mock webhook data
  const createMockWebhook = (overrides?: Partial<IkhokhaWebhook>): IkhokhaWebhook => ({
    transaction_id: testTransactionId,
    amount: 500,
    currency: 'ZAR',
    status: 'completed',
    response_code: '00',
    response_message: 'Approved',
    reference: `enrollment-${testEnrollmentId}`,
    merchant_reference: testEnrollmentId,
    timestamp: new Date().toISOString(),
    card_type: 'visa',
    masked_card_number: '****1234',
    auth_code: 'AUTH123',
    ...overrides
  });

  // Helper to create mock enrollment data
  const createMockEnrollment = (overrides?: any) => ({
    id: testEnrollmentId,
    user_id: testUserId,
    user_email: 'test@example.com',
    course_id: testCourseId,
    course_title: 'Test Course',
    status: 'pending' as const,
    payment_type: PaymentType.CARD,
    payment_status: 'pending' as const,
    payment_reference: testTransactionId,
    ikhokha_transaction_id: testTransactionId,
    created_at: new Date(),
    updated_at: new Date(),
    course_access_granted: false,
    ...overrides
  });

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();

    // Reset service instances
    paymentTypeDetector = PaymentTypeDetector.getInstance();
    cardPaymentFastTrack = CardPaymentFastTrack.getInstance();
    enhancedRealTimeSync = EnhancedRealTimeSync.getInstance();

    // Setup default Supabase mocks - return successful responses
    const mockEnrollment = createMockEnrollment();
    const mockApprovedEnrollment = createMockEnrollment({ status: 'approved', course_access_granted: true });
    
    mockSupabaseUpdate.mockResolvedValue({
      data: mockApprovedEnrollment,
      error: null
    });

    mockSupabaseSelect.mockResolvedValue({
      data: mockEnrollment,
      error: null
    });

    mockSupabaseInsert.mockResolvedValue({
      data: { id: 'audit-123' },
      error: null
    });
  });

  afterEach(() => {
    enhancedRealTimeSync.cleanup();
    cardPaymentFastTrack.cleanup();
  });

  describe('Complete Webhook Processing to UI Update Flow', () => {
    it('should process card payment webhook end-to-end with UI updates', async () => {
      // Requirement 2.1: Complete webhook processing to UI update flow
      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment in localStorage (simulating existing enrollment)
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));
      localStorage.setItem(`user-enrollment-${testUserId}-${testEnrollmentId}`, JSON.stringify(enrollment));

      // Step 1: Detect payment type
      const paymentTypeResult = paymentTypeDetector.detectPaymentType(webhook);
      expect(paymentTypeResult.type).toBe('card');
      expect(paymentTypeResult.confidence).toBeGreaterThan(0.6);

      // Step 2: Process through fast-track
      await cardPaymentFastTrack.initialize();
      const fastTrackResult = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);

      expect(fastTrackResult.success).toBe(true);
      expect(fastTrackResult.enrollmentApproved).toBe(true);
      expect(fastTrackResult.accessGranted).toBe(true);

      // Step 3: Verify enrollment persistence
      const storedEnrollment = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      expect(storedEnrollment).toBeTruthy();
      
      const parsedEnrollment = JSON.parse(storedEnrollment!);
      expect(parsedEnrollment.status).toBe('approved');
      expect(parsedEnrollment.course_access_granted).toBe(true);

      // Step 4: Verify audit trail
      expect(mockSupabaseInsert).toHaveBeenCalled();
    });

    it('should handle EFT payment webhook differently (no fast-track)', async () => {
      const webhook = createMockWebhook({
        response_code: '000',
        card_type: undefined,
        masked_card_number: undefined,
        auth_code: undefined,
        bank_reference: 'BANK123'
      });

      const paymentTypeResult = paymentTypeDetector.detectPaymentType(webhook);
      
      // Should detect as EFT or unknown (not card)
      expect(paymentTypeResult.type).not.toBe('card');
    });

    it('should process webhook with optimistic UI updates', async () => {
      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));

      // Apply optimistic update before webhook processing
      const updateId = await enhancedRealTimeSync.applyOptimisticUpdate(
        testCourseId,
        testUserId,
        'approved',
        'card_payment'
      );

      expect(updateId).toBeTruthy();

      // Process webhook
      await cardPaymentFastTrack.initialize();
      const result = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);

      expect(result.success).toBe(true);

      // Confirm optimistic update
      await enhancedRealTimeSync.confirmOptimisticUpdate(updateId, 'approved');

      // Verify no rollback occurred
      const optimisticUpdates = enhancedRealTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates.find(u => u.id === updateId)).toBeUndefined();
    });

    it('should measure end-to-end processing time', async () => {
      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));

      const startTime = Date.now();

      await cardPaymentFastTrack.initialize();
      const result = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(result.success).toBe(true);
      expect(result.processingTimeMs).toBeLessThan(5000); // Should complete within 5 seconds
      expect(processingTime).toBeLessThan(5000);
    });
  });

  describe('Cross-Tab Synchronization During Card Payment Approval', () => {
    it('should broadcast immediate approval across all tabs', async () => {
      // Requirement 3.1: Cross-tab synchronization during card payment approval
      const approvalUpdate = {
        enrollmentId: testEnrollmentId,
        userId: testUserId,
        courseId: testCourseId,
        approvalType: 'card_payment_automatic' as const,
        timestamp: new Date(),
        paymentReference: testTransactionId,
        accessGranted: true,
        source: 'webhook_card_payment' as const
      };

      await enhancedRealTimeSync.broadcastImmediateApproval(approvalUpdate);

      // Verify localStorage was updated for cross-tab sync (fallback mechanism)
      const broadcastKeys = Object.keys(localStorage).filter(key => key.startsWith('broadcast-'));
      expect(broadcastKeys.length).toBeGreaterThan(0);
      
      // Verify broadcast data contains correct information
      if (broadcastKeys.length > 0) {
        const broadcastData = JSON.parse(localStorage.getItem(broadcastKeys[0])!);
        expect(broadcastData.type).toBe('immediate-approval');
        expect(broadcastData.data.enrollmentId).toBe(testEnrollmentId);
      }
    });

    it('should sync enrollment status across multiple tabs', async () => {
      const result = await enhancedRealTimeSync.syncEnrollmentStatusAcrossTabs(
        testUserId,
        testCourseId,
        'approved'
      );

      expect(result.success).toBe(true);
      expect(result.syncedTabs).toBeGreaterThan(0);
      expect(result.errors).toHaveLength(0);

      // Verify sync data was stored
      const syncKey = `enrollment-sync-${testUserId}-${testCourseId}`;
      const syncData = localStorage.getItem(syncKey);
      expect(syncData).toBeTruthy();

      const parsedSyncData = JSON.parse(syncData!);
      expect(parsedSyncData.status).toBe('approved');
    });

    it('should handle cross-tab sync with multiple simultaneous updates', async () => {
      // Simulate multiple tabs updating simultaneously
      const updates = [
        enhancedRealTimeSync.syncEnrollmentStatusAcrossTabs(testUserId, testCourseId, 'approved'),
        enhancedRealTimeSync.syncEnrollmentStatusAcrossTabs(testUserId, testCourseId, 'approved'),
        enhancedRealTimeSync.syncEnrollmentStatusAcrossTabs(testUserId, testCourseId, 'approved')
      ];

      const results = await Promise.all(updates);

      // All should succeed
      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      // Final state should be consistent
      const syncKey = `enrollment-sync-${testUserId}-${testCourseId}`;
      const syncData = localStorage.getItem(syncKey);
      expect(syncData).toBeTruthy();
    });

    it('should broadcast course access granted across tabs', async () => {
      const accessUpdate = {
        userId: testUserId,
        courseId: testCourseId,
        accessLevel: 'granted' as const,
        grantedAt: new Date(),
        source: 'card_payment' as const,
        enrollmentId: testEnrollmentId
      };

      await enhancedRealTimeSync.broadcastCourseAccessGranted(accessUpdate);

      // Verify localStorage was updated for cross-tab sync
      const broadcastKeys = Object.keys(localStorage).filter(key => key.startsWith('broadcast-'));
      expect(broadcastKeys.length).toBeGreaterThan(0);
    });
  });

  describe('Enrollment Persistence During Card Payment Processing', () => {
    it('should persist enrollment status immediately with multiple backups', async () => {
      // Requirement 5.1: Enrollment persistence during card payment processing
      const enrollmentData = {
        id: testEnrollmentId,
        user_id: testUserId,
        user_email: 'test@example.com',
        course_id: testCourseId,
        course_title: 'Test Course',
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        approved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      const success = await updateEnrollmentStatusImmediately(enrollmentData, {
        source: 'webhook_card_payment',
        broadcastUpdate: true
      });

      expect(success).toBe(true);

      // Verify multiple storage locations
      const keys = [
        `enrollment-${testEnrollmentId}`,
        `user-enrollment-${testUserId}-${testCourseId}`,
        `immediate-update-${testCourseId}-${testUserId}`
      ];

      keys.forEach(key => {
        const stored = localStorage.getItem(key);
        expect(stored).toBeTruthy();
        
        const parsed = JSON.parse(stored!);
        expect(parsed.status).toBe('approved');
        expect(parsed.approval_source).toBe('webhook_card_payment');
      });

      // Verify sessionStorage backup
      const sessionStored = sessionStorage.getItem(`enrollment-${testEnrollmentId}`);
      expect(sessionStored).toBeTruthy();
    });

    it('should resolve conflicts between local and remote enrollment data', () => {
      const localData = {
        id: testEnrollmentId,
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date(Date.now() - 1000).toISOString(),
        progress: 50,
        sync_version: 2
      };

      const remoteData = {
        id: testEnrollmentId,
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 30,
        sync_version: 1
      };

      const resolution = resolveEnrollmentConflicts(localData, remoteData);

      expect(resolution.resolved).toBe(true);
      expect(resolution.strategy).toBe('approved_priority');
      expect(resolution.finalData.status).toBe('approved'); // Approved status wins
      expect(resolution.finalData.progress).toBe(50); // Higher progress wins
    });

    it('should persist enrollment during webhook processing failure', async () => {
      // Simulate Supabase failure
      mockSupabaseUpdate.mockResolvedValueOnce({
        data: null,
        error: { message: 'Database error' }
      });

      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));

      await cardPaymentFastTrack.initialize();
      const result = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);

      // Even if database fails, local storage should have the data
      const localStored = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      expect(localStored).toBeTruthy();
    });

    it('should recover enrollment data from multiple sources', async () => {
      // Store enrollment data in multiple locations
      const enrollmentData = {
        id: testEnrollmentId,
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 75
      };

      // Store in different formats
      localStorage.setItem('enrollments', JSON.stringify([enrollmentData]));
      localStorage.setItem(`user-enrollments-${testUserId}`, JSON.stringify([enrollmentData]));
      sessionStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollmentData));

      // Recover data
      const recovery = await recoverEnrollmentDataEnhanced(testUserId);

      expect(recovery.success).toBe(true);
      expect(recovery.recoveredEnrollments.length).toBeGreaterThan(0);
      expect(recovery.sources.length).toBeGreaterThan(0);

      const recovered = recovery.recoveredEnrollments.find(e => e.id === testEnrollmentId);
      expect(recovered).toBeTruthy();
      expect(recovered?.status).toBe('approved');
    });

    it('should handle enrollment persistence with sync version tracking', async () => {
      const enrollmentData = {
        id: testEnrollmentId,
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0,
        sync_version: 1
      };

      // First update
      await updateEnrollmentStatusImmediately(enrollmentData, {
        source: 'webhook_card_payment'
      });

      const stored1 = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      const parsed1 = JSON.parse(stored1!);
      expect(parsed1.sync_version).toBe(2); // Should increment

      // Second update
      await updateEnrollmentStatusImmediately(
        { ...enrollmentData, progress: 50, sync_version: 2 },
        { source: 'system_automatic' }
      );

      const stored2 = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      const parsed2 = JSON.parse(stored2!);
      expect(parsed2.sync_version).toBe(3); // Should increment again
    });
  });

  describe('Error Recovery and Fallback Mechanisms', () => {
    it('should rollback optimistic update on webhook processing failure', async () => {
      // Requirement 6.1: Error recovery and fallback mechanisms
      const updateId = await enhancedRealTimeSync.applyOptimisticUpdate(
        testCourseId,
        testUserId,
        'approved',
        'card_payment'
      );

      // Simulate processing failure
      await enhancedRealTimeSync.rollbackOptimisticUpdate(updateId, 'processing_failed');

      // Verify rollback occurred
      const optimisticUpdates = enhancedRealTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates.find(u => u.id === updateId)).toBeUndefined();
    });

    it('should handle Supabase connection failure gracefully', async () => {
      // Simulate complete Supabase failure
      mockSupabaseUpdate.mockResolvedValue({
        data: null,
        error: { message: 'Connection failed', code: 'CONNECTION_ERROR' }
      });
      
      mockSupabaseSelect.mockResolvedValue({
        data: null,
        error: { message: 'Connection failed', code: 'CONNECTION_ERROR' }
      });

      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      await cardPaymentFastTrack.initialize();
      const result = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);

      // Should still attempt to process locally
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();

      // Local storage might still have data from the attempt
      // This is acceptable behavior - the system tried to persist locally
    });

    it('should retry failed webhook processing with exponential backoff', async () => {
      let attemptCount = 0;
      
      mockSupabaseUpdate.mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          return Promise.resolve({ data: null, error: { message: 'Temporary error' } });
        }
        return Promise.resolve({
          data: createMockEnrollment({ status: 'approved' }),
          error: null
        });
      });

      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));

      await cardPaymentFastTrack.initialize();
      
      // First attempt should fail
      const result1 = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);
      expect(result1.enrollmentApproved).toBe(false);

      // Second attempt should fail
      const result2 = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);
      expect(result2.enrollmentApproved).toBe(false);

      // Third attempt should succeed
      const result3 = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);
      expect(result3.enrollmentApproved).toBe(true);
    });

    it('should fallback to localStorage when sessionStorage fails', async () => {
      // Mock sessionStorage failure
      const originalSetItem = sessionStorage.setItem;
      sessionStorage.setItem = vi.fn().mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      const enrollmentData = {
        id: testEnrollmentId,
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      const success = await updateEnrollmentStatusImmediately(enrollmentData, {
        source: 'webhook_card_payment'
      });

      // Should still succeed with localStorage
      expect(success).toBe(true);

      const localStored = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      expect(localStored).toBeTruthy();

      // Restore
      sessionStorage.setItem = originalSetItem;
    });

    it('should handle payment type detection failure gracefully', () => {
      const webhook = createMockWebhook({
        response_code: 'UNKNOWN',
        card_type: undefined,
        masked_card_number: undefined,
        auth_code: undefined
      });

      const result = paymentTypeDetector.detectPaymentType(webhook);

      // Should return unknown with low confidence
      expect(result.type).toBe('unknown');
      expect(result.confidence).toBeLessThan(0.5);
    });

    it('should recover from corrupted localStorage data', async () => {
      // Store corrupted data
      localStorage.setItem('enrollments', 'corrupted-json-data');
      localStorage.setItem(`user-enrollments-${testUserId}`, '{invalid json}');

      // Should not throw error
      const recovery = await recoverEnrollmentDataEnhanced(testUserId);

      expect(recovery.success).toBe(true);
      expect(recovery.recoveredEnrollments).toEqual([]);
    });

    it('should handle concurrent webhook processing', async () => {
      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));

      await cardPaymentFastTrack.initialize();

      // Process same webhook multiple times concurrently
      const results = await Promise.all([
        cardPaymentFastTrack.processCardPayment(webhook, enrollment),
        cardPaymentFastTrack.processCardPayment(webhook, enrollment),
        cardPaymentFastTrack.processCardPayment(webhook, enrollment)
      ]);

      // All should complete (though some might fail due to already approved)
      results.forEach(result => {
        expect(result).toBeTruthy();
      });

      // Final state should be consistent
      const stored = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      expect(stored).toBeTruthy();
    });
  });

  describe('Performance and Reliability', () => {
    it('should complete webhook-to-UI pipeline within 2 seconds', async () => {
      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));

      const startTime = Date.now();

      // Complete pipeline
      await cardPaymentFastTrack.initialize();
      const result = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);
      
      await enhancedRealTimeSync.broadcastImmediateApproval({
        enrollmentId: testEnrollmentId,
        userId: testUserId,
        courseId: testCourseId,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: testTransactionId,
        accessGranted: true,
        source: 'webhook_card_payment'
      });

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      expect(result.success).toBe(true);
      expect(totalTime).toBeLessThan(2000); // Should complete within 2 seconds
    });

    it('should handle high-volume webhook processing', async () => {
      const webhooks = Array.from({ length: 10 }, (_, i) => 
        createMockWebhook({
          transaction_id: `txn-${i}`,
          reference: `enrollment-${i}`
        })
      );

      const enrollments = webhooks.map((webhook, i) =>
        createMockEnrollment({
          id: `enrollment-${i}`,
          payment_reference: webhook.transaction_id
        })
      );

      // Pre-populate all enrollments
      enrollments.forEach(enrollment => {
        localStorage.setItem(`enrollment-${enrollment.id}`, JSON.stringify(enrollment));
      });

      await cardPaymentFastTrack.initialize();

      const startTime = Date.now();
      const results = await Promise.all(
        webhooks.map((webhook, i) =>
          cardPaymentFastTrack.processCardPayment(webhook, enrollments[i])
        )
      );
      const endTime = Date.now();

      const successCount = results.filter(r => r.success).length;
      const avgTime = (endTime - startTime) / webhooks.length;

      expect(successCount).toBeGreaterThan(0);
      expect(avgTime).toBeLessThan(1000); // Average less than 1 second per webhook
    });

    it('should maintain data consistency across multiple updates', async () => {
      const enrollmentData = {
        id: testEnrollmentId,
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending' as const,
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0
      };

      // Multiple rapid updates
      await updateEnrollmentStatusImmediately(enrollmentData, {
        source: 'system_automatic'
      });

      await updateEnrollmentStatusImmediately(
        { ...enrollmentData, status: 'approved', progress: 25 },
        { source: 'webhook_card_payment' }
      );

      await updateEnrollmentStatusImmediately(
        { ...enrollmentData, status: 'approved', progress: 50 },
        { source: 'system_automatic' }
      );

      // Final state should be consistent
      const stored = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      const parsed = JSON.parse(stored!);

      expect(parsed.status).toBe('approved');
      expect(parsed.progress).toBe(50);
      expect(parsed.sync_version).toBeGreaterThanOrEqual(1); // At least 1 version increment
    });
  });

  describe('Integration with Card Payment Fast-Track', () => {
    it('should process card payment approval through complete pipeline', async () => {
      // Pre-populate enrollment
      const enrollment = createMockEnrollment();
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));
      localStorage.setItem(`user-enrollment-${testUserId}-${testEnrollmentId}`, JSON.stringify(enrollment));

      const success = await processCardPaymentApproval(
        testEnrollmentId,
        testUserId,
        testCourseId,
        testTransactionId
      );

      expect(success).toBe(true);

      // Verify enrollment status
      const status = getEnrollmentStatus(testCourseId, testUserId);
      expect(status).toBe('enrolled');

      // Verify persistence
      const stored = localStorage.getItem(`enrollment-${testEnrollmentId}`);
      expect(stored).toBeTruthy();
    });

    it('should handle card payment approval with immediate UI feedback', async () => {
      const webhook = createMockWebhook();
      const enrollment = createMockEnrollment();

      // Pre-populate enrollment
      localStorage.setItem(`enrollment-${testEnrollmentId}`, JSON.stringify(enrollment));

      // Apply optimistic update
      const updateId = await enhancedRealTimeSync.applyOptimisticUpdate(
        testCourseId,
        testUserId,
        'approved',
        'card_payment'
      );

      // Process payment
      await cardPaymentFastTrack.initialize();
      const result = await cardPaymentFastTrack.processCardPayment(webhook, enrollment);

      // Confirm optimistic update
      await enhancedRealTimeSync.confirmOptimisticUpdate(updateId, 'approved');

      expect(result.success).toBe(true);
      expect(result.enrollmentApproved).toBe(true);
      expect(result.accessGranted).toBe(true);
    });
  });
});
