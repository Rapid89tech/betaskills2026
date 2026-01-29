/**
 * End-to-End Production Payment Flow Tests
 * 
 * Comprehensive testing suite for production payment workflows including:
 * - Complete enrollment and payment workflows
 * - Real-time status synchronization
 * - Webhook processing with signature validation
 * - Admin approval workflows with real-time updates
 * 
 * Requirements: 2.1, 3.1, 4.1, 5.1
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductionPaymentOrchestrator } from '@/services/ProductionPaymentOrchestrator';
import { WebhookHandler } from '@/services/WebhookHandler';
import { RealTimePaymentSync } from '@/services/RealTimePaymentSync';
import { AdminApprovalWorkflow } from '@/services/AdminApprovalWorkflow';
import { EnrollmentStateManager } from '@/services/EnrollmentStateManager';
import { PaymentMethodRouter } from '@/services/PaymentMethodRouter';
import { CourseAccessController } from '@/services/CourseAccessController';
import { 
  IkhokhaWebhook, 
  PaymentStatus, 
  EnrollmentStatus, 
  PaymentType,
  EnrollmentResult,
  PaymentRequest 
} from '@/types/ikhokha';

// Mock Supabase with comprehensive production-like behavior
const mockDatabase = new Map();
const mockRealtimeSubscriptions = new Map();
const mockAuditLogs: any[] = [];

const createProductionMockSupabase = () => {
  const mockChannel = {
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockImplementation((callback) => {
      setTimeout(() => callback('SUBSCRIBED'), 10);
      return mockChannel;
    }),
    unsubscribe: vi.fn()
  };

  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockImplementation(() => {
      const key = mockQuery._lastEqValue;
      const data = mockDatabase.get(key);
      return Promise.resolve({
        data: data || null,
        error: data ? null : { message: 'Not found' }
      });
    }),
    insert: vi.fn().mockImplementation((insertData) => {
      const id = insertData.id || `generated_${Date.now()}_${Math.random()}`;
      const dataWithId = { ...insertData, id };
      mockDatabase.set(id, dataWithId);
      
      // Simulate real-time INSERT event
      setTimeout(() => {
        const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
        handlers.forEach((handler: any) => {
          handler({
            eventType: 'INSERT',
            new: dataWithId
          });
        });
      }, 5);
      
      return Promise.resolve({ data: dataWithId, error: null });
    }),
    update: vi.fn().mockImplementation((updateData) => {
      const key = mockQuery._lastEqValue;
      const existingData = mockDatabase.get(key);
      if (existingData) {
        const updatedData = { ...existingData, ...updateData, updated_at: new Date().toISOString() };
        mockDatabase.set(key, updatedData);

        // Simulate real-time UPDATE event
        setTimeout(() => {
          const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
          handlers.forEach((handler: any) => {
            handler({
              eventType: 'UPDATE',
              new: updatedData,
              old: existingData
            });
          });
        }, 5);

        return Promise.resolve({ data: updatedData, error: null });
      }
      return Promise.resolve({ data: null, error: { message: 'Not found' } });
    }),
    delete: vi.fn().mockImplementation(() => {
      const key = mockQuery._lastEqValue;
      const existingData = mockDatabase.get(key);
      if (existingData) {
        mockDatabase.delete(key);
        return Promise.resolve({ data: existingData, error: null });
      }
      return Promise.resolve({ data: null, error: { message: 'Not found' } });
    }),
    _lastEqValue: null as any
  };

  // Override eq to capture values for mocking
  const originalEq = mockQuery.eq;
  mockQuery.eq = vi.fn().mockImplementation((column, value) => {
    mockQuery._lastEqValue = value;
    return originalEq.call(mockQuery, column, value);
  });

  const mockSupabase = {
    from: vi.fn().mockReturnValue(mockQuery),
    channel: vi.fn().mockImplementation((channelName) => {
      const handlers: any[] = [];
      mockRealtimeSubscriptions.set(channelName, handlers);

      return {
        ...mockChannel,
        on: vi.fn().mockImplementation((event, config, handler) => {
          handlers.push(handler);
          return mockChannel;
        })
      };
    })
  };

  return { mockSupabase, mockQuery, mockChannel };
};

// Mock crypto for webhook signature validation
const mockCrypto = {
  subtle: {
    importKey: vi.fn().mockResolvedValue('mock-key'),
    sign: vi.fn().mockImplementation(() => {
      const mockSignature = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
      return Promise.resolve(mockSignature.buffer);
    })
  }
};

describe('Production Payment Flows E2E Tests', () => {
  let orchestrator: ProductionPaymentOrchestrator;
  let webhookHandler: WebhookHandler;
  let realTimeSync: RealTimePaymentSync;
  let adminWorkflow: AdminApprovalWorkflow;
  let enrollmentStateManager: EnrollmentStateManager;
  let paymentRouter: PaymentMethodRouter;
  let accessController: CourseAccessController;
  let mockSupabase: any;

  beforeEach(async () => {
    // Clear all mocks and data
    vi.clearAllMocks();
    mockDatabase.clear();
    mockRealtimeSubscriptions.clear();
    mockAuditLogs.length = 0;

    // Setup production-like mocks
    const { mockSupabase: supabase } = createProductionMockSupabase();
    mockSupabase = supabase;

    // Mock crypto for signature validation
    global.crypto = mockCrypto as any;

    // Mock Supabase import
    vi.doMock('@/integrations/supabase/client', () => ({
      supabase: mockSupabase
    }));

    // Initialize all services
    orchestrator = ProductionPaymentOrchestrator.getInstance();
    webhookHandler = WebhookHandler.getInstance();
    realTimeSync = RealTimePaymentSync.getInstance();
    adminWorkflow = AdminApprovalWorkflow.getInstance();
    enrollmentStateManager = EnrollmentStateManager.getInstance();
    paymentRouter = PaymentMethodRouter.getInstance();
    accessController = CourseAccessController.getInstance();

    await Promise.all([
      orchestrator.initialize(),
      webhookHandler.initialize(),
      realTimeSync.initialize(),
      adminWorkflow.initialize(),
      enrollmentStateManager.initialize(),
      paymentRouter.initialize(),
      accessController.initialize()
    ]);
  });

  afterEach(() => {
    // Cleanup all services
    orchestrator.cleanup();
    webhookHandler.cleanup();
    realTimeSync.cleanup();
    adminWorkflow.cleanup();
    enrollmentStateManager.cleanup();
    paymentRouter.cleanup();
    accessController.cleanup();
    
    vi.restoreAllMocks();
  });

  describe('Complete Card Payment Workflow (Requirement 2.1)', () => {
    it('should complete full card payment enrollment with immediate access', async () => {
      const workflowEvents: any[] = [];
      const realTimeUpdates: any[] = [];

      // Setup monitoring
      realTimeSync.subscribeToStatusUpdates((update) => {
        realTimeUpdates.push(update);
      });

      // Step 1: User initiates enrollment
      workflowEvents.push({ step: 'initiate_enrollment', timestamp: new Date() });
      
      const enrollmentResult = await orchestrator.initiateEnrollment('course-123', 'user-456');
      
      expect(enrollmentResult.success).toBe(true);
      expect(enrollmentResult.enrollment_id).toBeDefined();
      expect(enrollmentResult.payment_url).toBeDefined();
      
      workflowEvents.push({ 
        step: 'enrollment_created', 
        enrollmentId: enrollmentResult.enrollment_id,
        timestamp: new Date() 
      });

      // Step 2: Simulate successful card payment webhook
      const cardWebhook: IkhokhaWebhook = {
        transaction_id: 'card_txn_789',
        reference: enrollmentResult.payment_reference!,
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature',
        response_code: '00',
        response_message: 'Transaction approved',
        card_type: 'VISA',
        masked_card_number: '****1234',
        auth_code: 'AUTH123'
      };

      workflowEvents.push({ step: 'webhook_received', timestamp: new Date() });

      const webhookResult = await webhookHandler.processWebhook(
        cardWebhook,
        'sha256=valid_signature_hash',
        cardWebhook.timestamp
      );

      expect(webhookResult.processed).toBe(true);
      expect(webhookResult.payment_updated).toBe(true);
      expect(webhookResult.enrollment_updated).toBe(true);

      workflowEvents.push({ step: 'webhook_processed', timestamp: new Date() });

      // Step 3: Wait for real-time updates
      await new Promise(resolve => setTimeout(resolve, 50));

      // Step 4: Verify enrollment status
      const enrollmentStatus = await orchestrator.getEnrollmentStatus('course-123', 'user-456');
      
      expect(enrollmentStatus.status).toBe(EnrollmentStatus.APPROVED);
      expect(enrollmentStatus.payment_status).toBe(PaymentStatus.COMPLETED);
      expect(enrollmentStatus.course_access_granted).toBe(true);

      workflowEvents.push({ step: 'access_granted', timestamp: new Date() });

      // Step 5: Verify course access
      const hasAccess = await accessController.canAccessCourse('course-123', 'user-456');
      expect(hasAccess).toBe(true);

      // Step 6: Verify real-time updates were sent
      expect(realTimeUpdates.length).toBeGreaterThan(0);
      expect(realTimeUpdates.some(u => u.new_status === EnrollmentStatus.APPROVED)).toBe(true);

      // Verify complete workflow timing
      const totalTime = workflowEvents[workflowEvents.length - 1].timestamp.getTime() - 
                       workflowEvents[0].timestamp.getTime();
      expect(totalTime).toBeLessThan(5000); // Should complete within 5 seconds

      workflowEvents.push({ step: 'workflow_complete', totalTime, timestamp: new Date() });
    });

    it('should handle card payment failure and provide retry options', async () => {
      // Step 1: Create enrollment
      const enrollmentResult = await orchestrator.initiateEnrollment('course-456', 'user-789');
      
      // Step 2: Simulate failed card payment
      const failedCardWebhook: IkhokhaWebhook = {
        transaction_id: 'failed_card_txn_123',
        reference: enrollmentResult.payment_reference!,
        amount: 299.99,
        currency: 'ZAR',
        status: 'failed',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature',
        response_code: '05',
        response_message: 'Transaction declined - insufficient funds'
      };

      const webhookResult = await webhookHandler.processWebhook(
        failedCardWebhook,
        'sha256=valid_signature_hash',
        failedCardWebhook.timestamp
      );

      expect(webhookResult.processed).toBe(true);

      // Step 3: Verify enrollment remains pending with failure reason
      const enrollmentStatus = await orchestrator.getEnrollmentStatus('course-456', 'user-789');
      
      expect(enrollmentStatus.status).toBe(EnrollmentStatus.PENDING);
      expect(enrollmentStatus.payment_status).toBe(PaymentStatus.FAILED);
      expect(enrollmentStatus.course_access_granted).toBe(false);
      expect(enrollmentStatus.rejection_reason).toContain('insufficient funds');

      // Step 4: Verify retry is possible
      const retryResult = await orchestrator.retryPayment(enrollmentResult.enrollment_id!);
      expect(retryResult.success).toBe(true);
      expect(retryResult.payment_url).toBeDefined();
    });
  });

  describe('Complete EFT Payment Workflow (Requirement 2.1)', () => {
    it('should complete full EFT payment workflow with admin approval', async () => {
      const adminUpdates: any[] = [];
      const userUpdates: any[] = [];

      // Setup monitoring
      realTimeSync.subscribeToAdminUpdates((update) => {
        adminUpdates.push(update);
      });

      realTimeSync.subscribeToUserUpdates('user-eft-123', (update) => {
        userUpdates.push(update);
      });

      // Step 1: User initiates EFT enrollment
      const enrollmentResult = await orchestrator.initiateEnrollment('course-eft-789', 'user-eft-123');
      
      expect(enrollmentResult.success).toBe(true);
      expect(enrollmentResult.requires_approval).toBe(true);

      // Step 2: Simulate successful EFT payment webhook
      const eftWebhook: IkhokhaWebhook = {
        transaction_id: 'eft_txn_456',
        reference: enrollmentResult.payment_reference!,
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature',
        response_code: '00',
        response_message: 'EFT transfer completed',
        metadata: { payment_method: 'eft' }
      };

      await webhookHandler.processWebhook(
        eftWebhook,
        'sha256=valid_signature_hash',
        eftWebhook.timestamp
      );

      // Step 3: Wait for admin notification
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify admin was notified
      expect(adminUpdates.length).toBeGreaterThan(0);
      expect(adminUpdates.some(u => u.type === 'new_eft_enrollment')).toBe(true);

      // Step 4: Admin approves enrollment
      const approvalResult = await adminWorkflow.approveEnrollment(
        enrollmentResult.enrollment_id!,
        'admin-123'
      );

      expect(approvalResult.success).toBe(true);

      // Step 5: Wait for user notification
      await new Promise(resolve => setTimeout(resolve, 50));

      // Step 6: Verify user was notified and access granted
      expect(userUpdates.length).toBeGreaterThan(0);
      expect(userUpdates.some(u => u.new_status === EnrollmentStatus.APPROVED)).toBe(true);

      const finalStatus = await orchestrator.getEnrollmentStatus('course-eft-789', 'user-eft-123');
      expect(finalStatus.status).toBe(EnrollmentStatus.APPROVED);
      expect(finalStatus.course_access_granted).toBe(true);
      expect(finalStatus.approved_by).toBe('admin-123');
    });

    it('should handle admin rejection with proper notifications', async () => {
      const userUpdates: any[] = [];

      realTimeSync.subscribeToUserUpdates('user-reject-456', (update) => {
        userUpdates.push(update);
      });

      // Step 1: Create EFT enrollment
      const enrollmentResult = await orchestrator.initiateEnrollment('course-reject-123', 'user-reject-456');

      // Step 2: Process EFT payment
      const eftWebhook: IkhokhaWebhook = {
        transaction_id: 'eft_reject_txn',
        reference: enrollmentResult.payment_reference!,
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature',
        response_code: '00',
        response_message: 'EFT transfer completed'
      };

      await webhookHandler.processWebhook(eftWebhook, 'sha256=valid_signature_hash', eftWebhook.timestamp);

      // Step 3: Admin rejects enrollment
      const rejectionResult = await adminWorkflow.rejectEnrollment(
        enrollmentResult.enrollment_id!,
        'Duplicate enrollment detected',
        'admin-456'
      );

      expect(rejectionResult.success).toBe(true);

      // Step 4: Wait for user notification
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify user was notified of rejection
      expect(userUpdates.some(u => u.new_status === EnrollmentStatus.REJECTED)).toBe(true);

      const finalStatus = await orchestrator.getEnrollmentStatus('course-reject-123', 'user-reject-456');
      expect(finalStatus.status).toBe(EnrollmentStatus.REJECTED);
      expect(finalStatus.course_access_granted).toBe(false);
      expect(finalStatus.rejection_reason).toBe('Duplicate enrollment detected');
    });
  });

  describe('Real-Time Status Synchronization (Requirement 3.1)', () => {
    it('should synchronize status updates across multiple components', async () => {
      const componentAUpdates: any[] = [];
      const componentBUpdates: any[] = [];
      const componentCUpdates: any[] = [];

      // Simulate multiple components listening for updates
      realTimeSync.subscribeToStatusUpdates((update) => {
        componentAUpdates.push({ component: 'A', ...update });
      });

      realTimeSync.subscribeToStatusUpdates((update) => {
        componentBUpdates.push({ component: 'B', ...update });
      });

      realTimeSync.subscribeToUserUpdates('sync-user-123', (update) => {
        componentCUpdates.push({ component: 'C', ...update });
      });

      // Trigger status change
      await realTimeSync.syncEnrollmentStatus('enrollment-sync-456', EnrollmentStatus.APPROVED);

      // Wait for propagation
      await new Promise(resolve => setTimeout(resolve, 30));

      // Verify all components received updates
      expect(componentAUpdates.length).toBeGreaterThan(0);
      expect(componentBUpdates.length).toBeGreaterThan(0);
      expect(componentCUpdates.length).toBeGreaterThan(0);

      // Verify update consistency
      const statusUpdate = componentAUpdates.find(u => u.new_status === EnrollmentStatus.APPROVED);
      expect(statusUpdate).toBeDefined();
      expect(componentBUpdates.some(u => 
        u.new_status === EnrollmentStatus.APPROVED && 
        u.enrollment_id === statusUpdate.enrollment_id
      )).toBe(true);
    });

    it('should handle cross-tab synchronization', async () => {
      const crossTabEvents: any[] = [];

      // Mock BroadcastChannel
      class MockBroadcastChannel {
        name: string;
        private static instances: MockBroadcastChannel[] = [];
        private listeners: ((event: MessageEvent) => void)[] = [];

        constructor(name: string) {
          this.name = name;
          MockBroadcastChannel.instances.push(this);
        }

        postMessage(data: any) {
          MockBroadcastChannel.instances
            .filter(instance => instance.name === this.name && instance !== this)
            .forEach(instance => {
              instance.listeners.forEach(listener => {
                setTimeout(() => listener({ data } as MessageEvent), 0);
              });
            });
        }

        addEventListener(type: string, listener: (event: MessageEvent) => void) {
          if (type === 'message') {
            this.listeners.push(listener);
          }
        }

        close() {
          const index = MockBroadcastChannel.instances.indexOf(this);
          if (index > -1) {
            MockBroadcastChannel.instances.splice(index, 1);
          }
        }
      }

      global.BroadcastChannel = MockBroadcastChannel as any;

      // Create second service instance (simulating another tab)
      const secondTabSync = RealTimePaymentSync.getInstance();
      await secondTabSync.initialize();

      secondTabSync.subscribeToUserUpdates('cross-tab-user', (update) => {
        crossTabEvents.push(update);
      });

      // Sync from first tab
      const syncData = {
        userId: 'cross-tab-user',
        enrollmentId: 'cross-tab-enrollment',
        courseId: 'cross-tab-course',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        source: 'admin_action'
      };

      realTimeSync.syncAcrossTabs('cross-tab-user', syncData);

      // Wait for cross-tab message
      await new Promise(resolve => setTimeout(resolve, 20));

      expect(crossTabEvents.length).toBeGreaterThan(0);
      expect(crossTabEvents[0]).toMatchObject({
        enrollmentId: 'cross-tab-enrollment',
        status: EnrollmentStatus.APPROVED
      });

      secondTabSync.cleanup();
    });
  });

  describe('Webhook Processing with Signature Validation (Requirement 5.1)', () => {
    it('should validate webhook signatures correctly', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'signature_test_txn',
        reference: 'signature_test_ref',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      };

      // Test valid signature
      const validResult = await webhookHandler.processWebhook(
        webhookData,
        'sha256=valid_signature_hash',
        webhookData.timestamp
      );

      expect(validResult.processed).toBe(true);
      expect(validResult.security_validated).toBe(true);

      // Test invalid signature
      const invalidResult = await webhookHandler.processWebhook(
        webhookData,
        'sha256=invalid_signature_hash',
        webhookData.timestamp
      );

      expect(invalidResult.processed).toBe(false);
      expect(invalidResult.error).toContain('security validation failed');
    });

    it('should reject expired webhooks', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'expired_test_txn',
        reference: 'expired_test_ref',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      };

      // Use timestamp from 10 minutes ago
      const expiredTimestamp = new Date(Date.now() - 10 * 60 * 1000).toISOString();

      const result = await webhookHandler.processWebhook(
        webhookData,
        'sha256=valid_signature_hash',
        expiredTimestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('security validation failed');
    });

    it('should handle webhook retry mechanism', async () => {
      let attemptCount = 0;
      const originalUpdate = mockSupabase.from().update;
      
      // Mock first attempt to fail, second to succeed
      mockSupabase.from().update = vi.fn().mockImplementation((data) => {
        attemptCount++;
        if (attemptCount === 1) {
          return Promise.reject(new Error('Database connection timeout'));
        }
        return originalUpdate(data);
      });

      const webhookData: IkhokhaWebhook = {
        transaction_id: 'retry_test_txn',
        reference: 'retry_test_ref',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      };

      // Add enrollment to database
      mockDatabase.set('retry_test_ref', {
        id: 'enrollment-retry-123',
        payment_reference: 'retry_test_ref',
        user_id: 'user-retry-123',
        course_id: 'course-retry-123'
      });

      const result = await webhookHandler.processWebhook(
        webhookData,
        'sha256=valid_signature_hash',
        webhookData.timestamp
      );

      expect(result.processed).toBe(true);
      expect(attemptCount).toBe(2); // Verify retry occurred
    });
  });

  describe('Admin Approval Workflow with Real-Time Updates (Requirement 4.1)', () => {
    it('should provide real-time admin dashboard updates', async () => {
      const adminDashboardUpdates: any[] = [];
      const pendingEnrollments: any[] = [];

      // Setup admin monitoring
      realTimeSync.subscribeToAdminUpdates((update) => {
        adminDashboardUpdates.push(update);
        if (update.type === 'new_eft_enrollment') {
          pendingEnrollments.push(update);
        }
      });

      // Create multiple EFT enrollments
      const enrollments = [];
      for (let i = 0; i < 3; i++) {
        const result = await orchestrator.initiateEnrollment(`course-admin-${i}`, `user-admin-${i}`);
        enrollments.push(result);

        // Process EFT payment
        const eftWebhook: IkhokhaWebhook = {
          transaction_id: `admin_eft_txn_${i}`,
          reference: result.payment_reference!,
          amount: 299.99,
          currency: 'ZAR',
          status: 'completed',
          timestamp: new Date().toISOString(),
          signature: 'valid_signature',
          response_code: '00',
          response_message: 'EFT transfer completed'
        };

        await webhookHandler.processWebhook(eftWebhook, 'sha256=valid_signature_hash', eftWebhook.timestamp);
      }

      // Wait for admin notifications
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify admin received all notifications
      expect(pendingEnrollments).toHaveLength(3);

      // Test bulk approval
      const enrollmentIds = enrollments.map(e => e.enrollment_id!);
      const bulkApprovalResult = await adminWorkflow.bulkApproveEnrollments(enrollmentIds, 'admin-bulk-123');

      expect(bulkApprovalResult.success).toBe(true);
      expect(bulkApprovalResult.approved_count).toBe(3);

      // Wait for user notifications
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify all enrollments were approved
      for (let i = 0; i < 3; i++) {
        const status = await orchestrator.getEnrollmentStatus(`course-admin-${i}`, `user-admin-${i}`);
        expect(status.status).toBe(EnrollmentStatus.APPROVED);
        expect(status.approved_by).toBe('admin-bulk-123');
      }
    });

    it('should handle concurrent admin actions', async () => {
      // Create enrollment
      const enrollmentResult = await orchestrator.initiateEnrollment('course-concurrent-123', 'user-concurrent-456');

      // Process EFT payment
      const eftWebhook: IkhokhaWebhook = {
        transaction_id: 'concurrent_eft_txn',
        reference: enrollmentResult.payment_reference!,
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature',
        response_code: '00',
        response_message: 'EFT transfer completed'
      };

      await webhookHandler.processWebhook(eftWebhook, 'sha256=valid_signature_hash', eftWebhook.timestamp);

      // Simulate concurrent admin actions
      const approvalPromise = adminWorkflow.approveEnrollment(enrollmentResult.enrollment_id!, 'admin-1');
      const rejectionPromise = adminWorkflow.rejectEnrollment(enrollmentResult.enrollment_id!, 'Duplicate', 'admin-2');

      const results = await Promise.allSettled([approvalPromise, rejectionPromise]);

      // One should succeed, one should fail due to race condition
      const successCount = results.filter(r => r.status === 'fulfilled' && (r.value as any).success).length;
      expect(successCount).toBe(1);

      // Verify final state is consistent
      const finalStatus = await orchestrator.getEnrollmentStatus('course-concurrent-123', 'user-concurrent-456');
      expect([EnrollmentStatus.APPROVED, EnrollmentStatus.REJECTED]).toContain(finalStatus.status);
    });
  });

  describe('Production Security and Compliance', () => {
    it('should maintain audit trail for all operations', async () => {
      const auditEvents: any[] = [];

      // Mock audit logging
      const originalInsert = mockSupabase.from().insert;
      mockSupabase.from().insert = vi.fn().mockImplementation((data) => {
        if (data.event_type) {
          auditEvents.push(data);
        }
        return originalInsert(data);
      });

      // Perform complete workflow
      const enrollmentResult = await orchestrator.initiateEnrollment('audit-course-123', 'audit-user-456');

      const webhook: IkhokhaWebhook = {
        transaction_id: 'audit_txn_123',
        reference: enrollmentResult.payment_reference!,
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature',
        response_code: '00',
        response_message: 'Success'
      };

      await webhookHandler.processWebhook(webhook, 'sha256=valid_signature_hash', webhook.timestamp);

      // Verify audit events were logged
      expect(auditEvents.length).toBeGreaterThan(0);
      expect(auditEvents.some(e => e.event_type === 'enrollment_created')).toBe(true);
      expect(auditEvents.some(e => e.event_type === 'payment_processed')).toBe(true);
    });

    it('should handle production configuration validation', async () => {
      // Test production readiness validation
      const validationResult = orchestrator.validateProductionReadiness();

      expect(validationResult.ready).toBe(true);
      expect(validationResult.ikhokha_config_valid).toBe(true);
      expect(validationResult.webhook_config_valid).toBe(true);
      expect(validationResult.database_config_valid).toBe(true);
      expect(validationResult.security_config_valid).toBe(true);
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle high-volume concurrent enrollments', async () => {
      const concurrentEnrollments = 20;
      const enrollmentPromises = [];

      // Create multiple concurrent enrollments
      for (let i = 0; i < concurrentEnrollments; i++) {
        enrollmentPromises.push(
          orchestrator.initiateEnrollment(`course-perf-${i}`, `user-perf-${i}`)
        );
      }

      const results = await Promise.all(enrollmentPromises);

      // Verify all enrollments succeeded
      expect(results.every(r => r.success)).toBe(true);
      expect(results.length).toBe(concurrentEnrollments);

      // Verify unique enrollment IDs
      const enrollmentIds = results.map(r => r.enrollment_id);
      const uniqueIds = new Set(enrollmentIds);
      expect(uniqueIds.size).toBe(concurrentEnrollments);
    });

    it('should maintain performance under load', async () => {
      const startTime = Date.now();
      const operations = [];

      // Perform multiple operations simultaneously
      for (let i = 0; i < 10; i++) {
        operations.push(orchestrator.initiateEnrollment(`load-course-${i}`, `load-user-${i}`));
        operations.push(realTimeSync.syncPaymentStatus(`load-payment-${i}`, PaymentStatus.COMPLETED));
        operations.push(adminWorkflow.getPendingEnrollments());
      }

      await Promise.all(operations);

      const totalTime = Date.now() - startTime;
      
      // Should complete within reasonable time (5 seconds for 30 operations)
      expect(totalTime).toBeLessThan(5000);
    });
  });
});