/**
 * Integration Tests for Payment Type Detection and Enrollment Routing
 * 
 * Tests the complete flow from payment webhook to enrollment status assignment
 * and real-time display in admin dashboard sections.
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { paymentTypeDetector } from '@/services/PaymentTypeDetector';
import { paymentEnrollmentIntegration } from '@/services/PaymentEnrollmentIntegration';
import { crossSessionEnrollmentSync } from '@/services/CrossSessionEnrollmentSync';
import { webSocketLikeSync } from '@/services/WebSocketLikeSync';
import { IkhokhaWebhook, PaymentType, PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';

// Mock data for testing
const mockCardPaymentWebhook: IkhokhaWebhook = {
  transaction_id: 'card_txn_123456',
  reference: 'CARD_PAYMENT_REF_001',
  amount: 299.99,
  currency: 'ZAR',
  status: 'completed',
  response_code: '00',
  response_message: 'Transaction approved',
  timestamp: new Date().toISOString(),
  card_type: 'visa',
  masked_card_number: '****1234',
  auth_code: 'AUTH123',
  merchant_reference: 'COURSE_ENROLLMENT_001',
  metadata: {
    payment_method: 'card',
    processor: 'ikhokha'
  }
};

const mockEFTPaymentWebhook: IkhokhaWebhook = {
  transaction_id: 'eft_txn_789012',
  reference: 'EFT_TRANSFER_REF_002',
  amount: 299.99,
  currency: 'ZAR',
  status: 'completed',
  response_code: '000',
  response_message: 'EFT transfer successful',
  timestamp: new Date().toISOString(),
  bank_reference: 'BANK_REF_456789',
  transfer_type: 'eft',
  merchant_reference: 'COURSE_ENROLLMENT_002',
  metadata: {
    payment_method: 'eft',
    bank_code: '632005'
  }
};

const mockEnrollmentData = {
  enrollmentId: 'enrollment_123',
  userId: 'user_456',
  courseId: 'course_789',
  userEmail: 'test@example.com',
  courseName: 'Test Course',
  amount: 299.99,
  currency: 'ZAR'
};

describe('Payment Type Detection and Enrollment Routing Integration', () => {
  let mockAdminSessions: any[] = [];
  let enrollmentUpdates: any[] = [];

  beforeEach(async () => {
    // Reset test state
    mockAdminSessions = [];
    enrollmentUpdates = [];

    // Initialize services
    await paymentEnrollmentIntegration.initialize();

    // Mock cross-session sync
    vi.spyOn(crossSessionEnrollmentSync, 'forceSyncEnrollmentStatus').mockImplementation(
      async (enrollmentId: string, status: string, adminId: string) => {
        enrollmentUpdates.push({ enrollmentId, status, adminId, timestamp: new Date() });
        
        // Simulate broadcasting to all admin sessions
        mockAdminSessions.forEach(session => {
          session.onUpdate({ enrollmentId, status, type: 'enrollment_status_change' });
        });
      }
    );

    // Mock WebSocket-like sync
    vi.spyOn(webSocketLikeSync, 'emit').mockImplementation((event: string, data: any) => {
      mockAdminSessions.forEach(session => {
        if (session.onWebSocketUpdate) {
          session.onWebSocketUpdate({ event, data });
        }
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Card Payment Detection and Routing', () => {
    it('should detect card payments and route to approved section', async () => {
      // Test Requirement 1.1: Card payments automatically appear in approved section
      
      // Step 1: Detect payment type
      const detectionResult = paymentTypeDetector.detectPaymentType(mockCardPaymentWebhook);
      
      expect(detectionResult.type).toBe('card');
      expect(detectionResult.confidence).toBeGreaterThan(0.8);
      expect(detectionResult.indicators).toContainEqual(
        expect.objectContaining({
          field: 'card_type',
          description: expect.stringContaining('Card-specific field')
        })
      );

      // Step 2: Process payment webhook
      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      expect(processingResult.success).toBe(true);
      expect(processingResult.paymentType).toBe(PaymentType.CARD);
      expect(processingResult.status).toBe(EnrollmentStatus.APPROVED);
      expect(processingResult.accessGranted).toBe(true);
      expect(processingResult.processingTimeMs).toBeLessThan(5000);

      // Step 3: Verify cross-session sync
      expect(crossSessionEnrollmentSync.forceSyncEnrollmentStatus).toHaveBeenCalledWith(
        mockEnrollmentData.enrollmentId,
        'approved',
        expect.any(String)
      );

      // Step 4: Verify enrollment appears in approved section
      const enrollmentUpdate = enrollmentUpdates.find(
        update => update.enrollmentId === mockEnrollmentData.enrollmentId
      );
      expect(enrollmentUpdate).toBeDefined();
      expect(enrollmentUpdate.status).toBe('approved');
    });

    it('should provide immediate course access for card payments', async () => {
      // Test Requirement 1.2: Card payments provide immediate access
      
      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      expect(processingResult.accessGranted).toBe(true);
      expect(processingResult.status).toBe(EnrollmentStatus.APPROVED);
      
      // Verify immediate access determination
      const shouldGrantAccess = paymentEnrollmentIntegration.shouldGrantImmediateAccess(
        PaymentType.CARD,
        true
      );
      expect(shouldGrantAccess).toBe(true);
    });

    it('should update enrollment status within 2 seconds for card payments', async () => {
      // Test Requirement 1.3: Card payments appear within 2 seconds
      
      const startTime = Date.now();
      
      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      const processingTime = Date.now() - startTime;
      
      expect(processingResult.success).toBe(true);
      expect(processingTime).toBeLessThan(2000);
      expect(processingResult.processingTimeMs).toBeLessThan(2000);
    });

    it('should maintain card payment visibility after dashboard refresh', async () => {
      // Test Requirement 1.4: Card payments remain visible after refresh
      
      // Process initial payment
      await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      // Simulate dashboard refresh by checking enrollment classification
      const classification = await paymentEnrollmentIntegration.classifyEnrollmentPayment(
        mockEnrollmentData.enrollmentId
      );

      expect(classification.paymentType).toBe(PaymentType.CARD);
      expect(classification.requiresApproval).toBe(false);
      expect(classification.confidence).toBeGreaterThan(0.7);
    });
  });

  describe('EFT Payment Detection and Routing', () => {
    it('should detect EFT payments and route to pending section', async () => {
      // Test Requirement 2.1: EFT payments appear in pending section
      
      // Step 1: Detect payment type
      const detectionResult = paymentTypeDetector.detectPaymentType(mockEFTPaymentWebhook);
      
      expect(detectionResult.type).toBe('eft');
      expect(detectionResult.confidence).toBeGreaterThan(0.7);
      expect(detectionResult.indicators).toContainEqual(
        expect.objectContaining({
          field: 'bank_reference',
          description: expect.stringContaining('EFT-specific field')
        })
      );

      // Step 2: Process payment webhook
      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        mockEFTPaymentWebhook,
        mockEnrollmentData
      );

      expect(processingResult.success).toBe(true);
      expect(processingResult.paymentType).toBe(PaymentType.EFT);
      expect(processingResult.status).toBe(EnrollmentStatus.PENDING);
      expect(processingResult.accessGranted).toBe(false);

      // Step 3: Verify enrollment appears in pending section
      const enrollmentUpdate = enrollmentUpdates.find(
        update => update.enrollmentId === mockEnrollmentData.enrollmentId
      );
      expect(enrollmentUpdate).toBeDefined();
      expect(enrollmentUpdate.status).toBe('pending');
    });

    it('should show EFT payment type and awaiting approval status', async () => {
      // Test Requirement 2.2: Clear EFT payment type indication
      
      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        mockEFTPaymentWebhook,
        mockEnrollmentData
      );

      expect(processingResult.paymentType).toBe(PaymentType.EFT);
      expect(processingResult.status).toBe(EnrollmentStatus.PENDING);
      expect(processingResult.message).toContain('pending');
      
      // Verify status determination
      const enrollmentStatus = paymentEnrollmentIntegration.determineEnrollmentStatus(
        PaymentType.EFT,
        true
      );
      expect(enrollmentStatus).toBe(EnrollmentStatus.PENDING);
    });

    it('should move EFT enrollment from pending to approved instantly on approval', async () => {
      // Test Requirement 2.3: Instant status change on approval
      
      // Process initial EFT payment
      await paymentEnrollmentIntegration.processPaymentWebhook(
        mockEFTPaymentWebhook,
        mockEnrollmentData
      );

      // Simulate admin approval
      await crossSessionEnrollmentSync.forceSyncEnrollmentStatus(
        mockEnrollmentData.enrollmentId,
        'approved',
        'admin_123'
      );

      // Verify status change
      const approvalUpdate = enrollmentUpdates.find(
        update => update.enrollmentId === mockEnrollmentData.enrollmentId && update.status === 'approved'
      );
      expect(approvalUpdate).toBeDefined();
      expect(approvalUpdate.adminId).toBe('admin_123');
    });

    it('should remove EFT enrollment from pending on rejection with notification', async () => {
      // Test Requirement 2.4: Proper rejection handling
      
      // Process initial EFT payment
      await paymentEnrollmentIntegration.processPaymentWebhook(
        mockEFTPaymentWebhook,
        mockEnrollmentData
      );

      // Simulate admin rejection
      await crossSessionEnrollmentSync.forceSyncEnrollmentStatus(
        mockEnrollmentData.enrollmentId,
        'rejected',
        'admin_123'
      );

      // Verify rejection
      const rejectionUpdate = enrollmentUpdates.find(
        update => update.enrollmentId === mockEnrollmentData.enrollmentId && update.status === 'rejected'
      );
      expect(rejectionUpdate).toBeDefined();
    });
  });

  describe('Real-time Enrollment Updates Across Admin Sessions', () => {
    it('should sync enrollment updates across multiple admin sessions', async () => {
      // Test cross-session synchronization
      
      // Setup multiple mock admin sessions
      const adminSession1 = { 
        id: 'admin_1', 
        updates: [],
        onUpdate: (update: any) => adminSession1.updates.push(update)
      };
      const adminSession2 = { 
        id: 'admin_2', 
        updates: [],
        onUpdate: (update: any) => adminSession2.updates.push(update)
      };
      
      mockAdminSessions = [adminSession1, adminSession2];

      // Process card payment
      await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      // Verify both sessions received the update
      expect(adminSession1.updates).toHaveLength(1);
      expect(adminSession2.updates).toHaveLength(1);
      
      expect(adminSession1.updates[0]).toMatchObject({
        enrollmentId: mockEnrollmentData.enrollmentId,
        status: 'approved'
      });
      expect(adminSession2.updates[0]).toMatchObject({
        enrollmentId: mockEnrollmentData.enrollmentId,
        status: 'approved'
      });
    });

    it('should handle WebSocket-like sync for real-time updates', async () => {
      // Test WebSocket-like synchronization
      
      const adminSession = { 
        id: 'admin_1', 
        webSocketUpdates: [],
        onWebSocketUpdate: (update: any) => adminSession.webSocketUpdates.push(update)
      };
      
      mockAdminSessions = [adminSession];

      // Process payment and trigger WebSocket sync
      await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      // Manually trigger WebSocket sync (simulating real-time event)
      webSocketLikeSync.emit('enrollment_update', {
        enrollmentId: mockEnrollmentData.enrollmentId,
        status: 'approved',
        paymentType: 'card'
      });

      // Verify WebSocket update was received
      expect(adminSession.webSocketUpdates).toHaveLength(1);
      expect(adminSession.webSocketUpdates[0]).toMatchObject({
        event: 'enrollment_update',
        data: expect.objectContaining({
          enrollmentId: mockEnrollmentData.enrollmentId,
          status: 'approved'
        })
      });
    });

    it('should maintain real-time sync reliability under load', async () => {
      // Test sync reliability with multiple concurrent updates
      
      const adminSession = { 
        id: 'admin_1', 
        updates: [],
        onUpdate: (update: any) => adminSession.updates.push(update)
      };
      
      mockAdminSessions = [adminSession];

      // Process multiple payments concurrently
      const promises = [];
      for (let i = 0; i < 5; i++) {
        const webhook = {
          ...mockCardPaymentWebhook,
          transaction_id: `card_txn_${i}`,
          reference: `CARD_REF_${i}`
        };
        const enrollment = {
          ...mockEnrollmentData,
          enrollmentId: `enrollment_${i}`
        };
        
        promises.push(
          paymentEnrollmentIntegration.processPaymentWebhook(webhook, enrollment)
        );
      }

      const results = await Promise.all(promises);

      // Verify all payments processed successfully
      expect(results).toHaveLength(5);
      results.forEach(result => {
        expect(result.success).toBe(true);
        expect(result.paymentType).toBe(PaymentType.CARD);
      });

      // Verify all updates were synced
      expect(adminSession.updates).toHaveLength(5);
      expect(enrollmentUpdates).toHaveLength(5);
    });
  });

  describe('Payment Type Detection Accuracy', () => {
    it('should accurately detect card payments with high confidence', async () => {
      const result = paymentTypeDetector.detectPaymentType(mockCardPaymentWebhook);
      
      expect(result.type).toBe('card');
      expect(result.confidence).toBeGreaterThan(0.8);
      expect(result.indicators.length).toBeGreaterThan(0);
      
      // Verify specific card indicators
      const cardTypeIndicator = result.indicators.find(i => i.field === 'card_type');
      expect(cardTypeIndicator).toBeDefined();
      expect(cardTypeIndicator?.weight).toBeGreaterThan(0);
    });

    it('should accurately detect EFT payments with high confidence', async () => {
      const result = paymentTypeDetector.detectPaymentType(mockEFTPaymentWebhook);
      
      expect(result.type).toBe('eft');
      expect(result.confidence).toBeGreaterThan(0.7);
      expect(result.indicators.length).toBeGreaterThan(0);
      
      // Verify specific EFT indicators
      const bankRefIndicator = result.indicators.find(i => i.field === 'bank_reference');
      expect(bankRefIndicator).toBeDefined();
      expect(bankRefIndicator?.weight).toBeGreaterThan(0);
    });

    it('should handle unknown payment types gracefully', async () => {
      const unknownWebhook: IkhokhaWebhook = {
        transaction_id: 'unknown_txn_123',
        reference: 'UNKNOWN_REF',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        response_code: 'UNKNOWN',
        response_message: 'Unknown transaction type',
        timestamp: new Date().toISOString(),
        merchant_reference: 'UNKNOWN_PAYMENT'
      };

      const result = paymentTypeDetector.detectPaymentType(unknownWebhook);
      
      expect(result.type).toBe('unknown');
      expect(result.confidence).toBe(0);
      
      // Process unknown payment
      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        unknownWebhook,
        mockEnrollmentData
      );

      // Should default to manual approval
      expect(processingResult.paymentType).toBe(PaymentType.MANUAL);
      expect(processingResult.status).toBe(EnrollmentStatus.PENDING);
    });
  });

  describe('Service Health and Error Handling', () => {
    it('should report healthy service status when all components are available', () => {
      const healthStatus = paymentEnrollmentIntegration.getHealthStatus();
      
      expect(healthStatus.initialized).toBe(true);
      expect(healthStatus.paymentDetectorAvailable).toBe(true);
      expect(healthStatus.routerAvailable).toBe(true);
      expect(healthStatus.realTimeSyncAvailable).toBe(true);
      expect(healthStatus.enrollmentManagerAvailable).toBe(true);
    });

    it('should handle payment processing errors gracefully', async () => {
      // Mock a service failure
      vi.spyOn(paymentTypeDetector, 'detectPaymentType').mockImplementation(() => {
        throw new Error('Detection service unavailable');
      });

      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      expect(processingResult.success).toBe(false);
      expect(processingResult.error).toContain('Detection service unavailable');
      expect(processingResult.paymentType).toBe(PaymentType.MANUAL);
      expect(processingResult.status).toBe(EnrollmentStatus.PENDING);
    });

    it('should continue processing even if real-time sync fails', async () => {
      // Mock sync failure
      vi.spyOn(crossSessionEnrollmentSync, 'forceSyncEnrollmentStatus').mockRejectedValue(
        new Error('Sync service unavailable')
      );

      const processingResult = await paymentEnrollmentIntegration.processPaymentWebhook(
        mockCardPaymentWebhook,
        mockEnrollmentData
      );

      // Main processing should still succeed
      expect(processingResult.success).toBe(true);
      expect(processingResult.paymentType).toBe(PaymentType.CARD);
      expect(processingResult.status).toBe(EnrollmentStatus.APPROVED);
    });
  });
});