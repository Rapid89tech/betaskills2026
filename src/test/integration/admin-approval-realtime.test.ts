/**
 * Admin Approval Workflow with Real-Time Updates Tests
 * 
 * Comprehensive testing for admin approval workflows including:
 * - Real-time admin dashboard updates
 * - Instant approval/rejection actions
 * - Bulk approval operations
 * - Cross-component synchronization
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AdminApprovalWorkflow } from '@/services/AdminApprovalWorkflow';
import { RealTimePaymentSync } from '@/services/RealTimePaymentSync';
import { EnrollmentStateManager } from '@/services/EnrollmentStateManager';
import { ProductionPaymentOrchestrator } from '@/services/ProductionPaymentOrchestrator';
import { 
  EnrollmentStatus, 
  PaymentStatus, 
  AdminAction,
  PendingEnrollment,
  ApprovalResult,
  BulkApprovalResult 
} from '@/types/ikhokha';

// Mock WebSocket for real-time admin notifications
class MockAdminWebSocket {
  static instances: MockAdminWebSocket[] = [];
  
  url: string;
  readyState: number = WebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    MockAdminWebSocket.instances.push(this);
    
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      if (this.onopen) {
        this.onopen(new Event('open'));
      }
    }, 10);
  }

  send(data: string) {
    const message = JSON.parse(data);
    MockAdminWebSocket.instances
      .filter(ws => ws !== this && ws.readyState === WebSocket.OPEN)
      .forEach(ws => {
        if (ws.onmessage) {
          setTimeout(() => {
            ws.onmessage!(new MessageEvent('message', { data }));
          }, 5);
        }
      });
  }

  close() {
    this.readyState = WebSocket.CLOSED;
    if (this.onclose) {
      this.onclose(new CloseEvent('close'));
    }
    const index = MockAdminWebSocket.instances.indexOf(this);
    if (index > -1) {
      MockAdminWebSocket.instances.splice(index, 1);
    }
  }

  static clearAll() {
    MockAdminWebSocket.instances.forEach(ws => ws.close());
    MockAdminWebSocket.instances = [];
  }
}

// Mock Supabase with real-time admin capabilities
const mockDatabase = new Map();
const mockRealtimeSubscriptions = new Map();
const mockAuditLogs: any[] = [];

const createAdminMockSupabase = () => {
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
    range: vi.fn().mockReturnThis(),
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
      const dataWithId = Array.isArray(insertData) 
        ? insertData.map(item => ({ ...item, id: item.id || `${id}_${Math.random()}` }))
        : { ...insertData, id };
      
      if (Array.isArray(insertData)) {
        dataWithId.forEach(item => mockDatabase.set(item.id, item));
      } else {
        mockDatabase.set(id, dataWithId);
      }

      // Log audit entries
      if (insertData.event_type || (Array.isArray(insertData) && insertData[0]?.event_type)) {
        const logs = Array.isArray(insertData) ? insertData : [insertData];
        mockAuditLogs.push(...logs);
      }

      // Simulate real-time INSERT event
      setTimeout(() => {
        const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
        const items = Array.isArray(dataWithId) ? dataWithId : [dataWithId];
        items.forEach(item => {
          handlers.forEach((handler: any) => {
            handler({
              eventType: 'INSERT',
              new: item
            });
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

        // Simulate real-time DELETE event
        setTimeout(() => {
          const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
          handlers.forEach((handler: any) => {
            handler({
              eventType: 'DELETE',
              old: existingData
            });
          });
        }, 5);

        return Promise.resolve({ data: existingData, error: null });
      }
      return Promise.resolve({ data: null, error: { message: 'Not found' } });
    }),
    _lastEqValue: null as any,
    _mockReturnData: null as any
  };

  // Override methods to capture values and support mock data
  const originalEq = mockQuery.eq;
  mockQuery.eq = vi.fn().mockImplementation((column, value) => {
    mockQuery._lastEqValue = value;
    return originalEq.call(mockQuery, column, value);
  });

  // Add support for mocking specific query results
  const originalSelect = mockQuery.select;
  mockQuery.select = vi.fn().mockImplementation((columns) => {
    if (mockQuery._mockReturnData) {
      const data = mockQuery._mockReturnData;
      mockQuery._mockReturnData = null;
      return {
        ...mockQuery,
        then: (callback: any) => callback({ data, error: null })
      };
    }
    return originalSelect.call(mockQuery, columns);
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

describe('Admin Approval Workflow with Real-Time Updates', () => {
  let adminWorkflow: AdminApprovalWorkflow;
  let realTimeSync: RealTimePaymentSync;
  let enrollmentStateManager: EnrollmentStateManager;
  let orchestrator: ProductionPaymentOrchestrator;
  let mockSupabase: any;
  let mockQuery: any;

  beforeEach(async () => {
    // Clear all mocks and data
    vi.clearAllMocks();
    mockDatabase.clear();
    mockRealtimeSubscriptions.clear();
    mockAuditLogs.length = 0;
    MockAdminWebSocket.clearAll();

    // Setup global mocks
    global.WebSocket = MockAdminWebSocket as any;

    // Setup Supabase mock
    const { mockSupabase: supabase, mockQuery: query } = createAdminMockSupabase();
    mockSupabase = supabase;
    mockQuery = query;

    vi.doMock('@/integrations/supabase/client', () => ({
      supabase: mockSupabase
    }));

    // Initialize services
    adminWorkflow = AdminApprovalWorkflow.getInstance();
    realTimeSync = RealTimePaymentSync.getInstance();
    enrollmentStateManager = EnrollmentStateManager.getInstance();
    orchestrator = ProductionPaymentOrchestrator.getInstance();

    await Promise.all([
      adminWorkflow.initialize(),
      realTimeSync.initialize(),
      enrollmentStateManager.initialize(),
      orchestrator.initialize()
    ]);

    // Setup test data - pending EFT enrollments
    const pendingEnrollments = [
      {
        id: 'enrollment-eft-1',
        user_id: 'user-1',
        user_email: 'user1@example.com',
        course_id: 'course-1',
        course_title: 'Course 1',
        payment_reference: 'eft_ref_1',
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.COMPLETED,
        payment_type: 'eft',
        requires_approval: true,
        course_access_granted: false,
        amount: 299.99,
        currency: 'ZAR',
        created_at: new Date().toISOString()
      },
      {
        id: 'enrollment-eft-2',
        user_id: 'user-2',
        user_email: 'user2@example.com',
        course_id: 'course-2',
        course_title: 'Course 2',
        payment_reference: 'eft_ref_2',
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.COMPLETED,
        payment_type: 'eft',
        requires_approval: true,
        course_access_granted: false,
        amount: 399.99,
        currency: 'ZAR',
        created_at: new Date().toISOString()
      }
    ];

    pendingEnrollments.forEach(enrollment => {
      mockDatabase.set(enrollment.id, enrollment);
    });
  });

  afterEach(() => {
    adminWorkflow.cleanup();
    realTimeSync.cleanup();
    enrollmentStateManager.cleanup();
    orchestrator.cleanup();
    MockAdminWebSocket.clearAll();
    vi.restoreAllMocks();
  });

  describe('Real-Time Admin Dashboard Updates (Requirement 4.1)', () => {
    it('should display new EFT enrollments in real-time', async () => {
      const adminDashboardUpdates: any[] = [];
      const pendingEnrollmentsList: any[] = [];

      // Setup admin dashboard listeners
      realTimeSync.subscribeToAdminUpdates((update) => {
        adminDashboardUpdates.push(update);
        if (update.type === 'new_eft_enrollment') {
          pendingEnrollmentsList.push(update);
        }
      });

      // Simulate new EFT enrollment creation
      const newEftEnrollment = {
        id: 'enrollment-eft-new',
        user_id: 'user-new',
        user_email: 'newuser@example.com',
        course_id: 'course-new',
        course_title: 'New Course',
        payment_reference: 'eft_ref_new',
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.COMPLETED,
        payment_type: 'eft',
        requires_approval: true,
        course_access_granted: false,
        amount: 199.99,
        currency: 'ZAR',
        created_at: new Date().toISOString()
      };

      // Simulate real-time INSERT event
      const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
      handlers.forEach((handler: any) => {
        handler({
          eventType: 'INSERT',
          new: newEftEnrollment
        });
      });

      // Wait for real-time processing
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify admin dashboard received the update
      expect(adminDashboardUpdates.length).toBeGreaterThan(0);
      expect(pendingEnrollmentsList.length).toBe(1);
      
      const newEnrollmentUpdate = pendingEnrollmentsList[0];
      expect(newEnrollmentUpdate).toMatchObject({
        type: 'new_eft_enrollment',
        enrollmentId: 'enrollment-eft-new',
        userEmail: 'newuser@example.com',
        courseName: 'New Course',
        amount: 199.99
      });

      // Verify update appears within 1 second (requirement)
      const updateTime = new Date(newEnrollmentUpdate.timestamp).getTime();
      const currentTime = Date.now();
      expect(currentTime - updateTime).toBeLessThan(1000);
    });

    it('should update pending enrollments list in real-time', async () => {
      const pendingListUpdates: any[] = [];

      // Setup pending enrollments monitoring
      adminWorkflow.subscribeToPendingEnrollments((enrollments) => {
        pendingListUpdates.push({
          timestamp: new Date(),
          count: enrollments.length,
          enrollments: enrollments.map(e => e.id)
        });
      });

      // Get initial pending enrollments
      const initialPending = await adminWorkflow.getPendingEnrollments();
      expect(initialPending.length).toBe(2);

      // Add new pending enrollment
      const newPendingEnrollment = {
        id: 'enrollment-eft-3',
        user_id: 'user-3',
        user_email: 'user3@example.com',
        course_id: 'course-3',
        course_title: 'Course 3',
        payment_reference: 'eft_ref_3',
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.COMPLETED,
        payment_type: 'eft',
        requires_approval: true,
        course_access_granted: false,
        amount: 499.99,
        currency: 'ZAR',
        created_at: new Date().toISOString()
      };

      mockDatabase.set(newPendingEnrollment.id, newPendingEnrollment);

      // Simulate real-time INSERT
      const handlers = mockRealtimeSubscriptions.get('enrollment_changes') || [];
      handlers.forEach((handler: any) => {
        handler({
          eventType: 'INSERT',
          new: newPendingEnrollment
        });
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify pending list was updated
      expect(pendingListUpdates.length).toBeGreaterThan(0);
      const latestUpdate = pendingListUpdates[pendingListUpdates.length - 1];
      expect(latestUpdate.count).toBe(3);
      expect(latestUpdate.enrollments).toContain('enrollment-eft-3');
    });

    it('should handle multiple admin dashboard instances', async () => {
      const dashboard1Updates: any[] = [];
      const dashboard2Updates: any[] = [];

      // Create two admin dashboard instances
      const adminWorkflow2 = AdminApprovalWorkflow.getInstance();
      await adminWorkflow2.initialize();

      // Setup listeners for both dashboards
      realTimeSync.subscribeToAdminUpdates((update) => {
        dashboard1Updates.push({ dashboard: 1, ...update });
      });

      realTimeSync.subscribeToAdminUpdates((update) => {
        dashboard2Updates.push({ dashboard: 2, ...update });
      });

      // Trigger admin notification
      await realTimeSync.broadcastAdminNotification({
        type: 'new_eft_enrollment',
        enrollmentId: 'enrollment-broadcast-test',
        userEmail: 'broadcast@example.com',
        courseName: 'Broadcast Test Course',
        amount: 299.99,
        timestamp: new Date()
      });

      await new Promise(resolve => setTimeout(resolve, 30));

      // Verify both dashboards received the update
      expect(dashboard1Updates.length).toBeGreaterThan(0);
      expect(dashboard2Updates.length).toBeGreaterThan(0);

      const update1 = dashboard1Updates.find(u => u.enrollmentId === 'enrollment-broadcast-test');
      const update2 = dashboard2Updates.find(u => u.enrollmentId === 'enrollment-broadcast-test');

      expect(update1).toBeDefined();
      expect(update2).toBeDefined();
      expect(update1.type).toBe('new_eft_enrollment');
      expect(update2.type).toBe('new_eft_enrollment');

      adminWorkflow2.cleanup();
    });
  });

  describe('Instant Approval Actions (Requirement 4.2)', () => {
    it('should approve enrollment and update student interface instantly', async () => {
      const userUpdates: any[] = [];
      const adminUpdates: any[] = [];

      // Setup user and admin listeners
      realTimeSync.subscribeToUserUpdates('user-1', (update) => {
        userUpdates.push(update);
      });

      realTimeSync.subscribeToAdminUpdates((update) => {
        adminUpdates.push(update);
      });

      // Admin approves enrollment
      const approvalResult = await adminWorkflow.approveEnrollment('enrollment-eft-1', 'admin-123');

      expect(approvalResult.success).toBe(true);
      expect(approvalResult.enrollment_id).toBe('enrollment-eft-1');

      // Wait for real-time updates
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify student received instant notification
      expect(userUpdates.length).toBeGreaterThan(0);
      const approvalUpdate = userUpdates.find(u => u.new_status === EnrollmentStatus.APPROVED);
      expect(approvalUpdate).toBeDefined();
      expect(approvalUpdate.enrollment_id).toBe('enrollment-eft-1');

      // Verify update was within 2 seconds (requirement)
      const updateTime = new Date(approvalUpdate.timestamp).getTime();
      const approvalTime = new Date(approvalResult.approved_at).getTime();
      expect(updateTime - approvalTime).toBeLessThan(2000);

      // Verify enrollment was updated in database
      const updatedEnrollment = mockDatabase.get('enrollment-eft-1');
      expect(updatedEnrollment.status).toBe(EnrollmentStatus.APPROVED);
      expect(updatedEnrollment.course_access_granted).toBe(true);
      expect(updatedEnrollment.approved_by).toBe('admin-123');
      expect(updatedEnrollment.approved_at).toBeDefined();

      // Verify admin audit log
      const auditLog = mockAuditLogs.find(log => 
        log.event_type === 'enrollment_approved' && 
        log.enrollment_id === 'enrollment-eft-1'
      );
      expect(auditLog).toBeDefined();
      expect(auditLog.admin_id).toBe('admin-123');
    });

    it('should reject enrollment with proper notifications', async () => {
      const userUpdates: any[] = [];

      realTimeSync.subscribeToUserUpdates('user-2', (update) => {
        userUpdates.push(update);
      });

      // Admin rejects enrollment
      const rejectionResult = await adminWorkflow.rejectEnrollment(
        'enrollment-eft-2',
        'Duplicate enrollment detected',
        'admin-456'
      );

      expect(rejectionResult.success).toBe(true);
      expect(rejectionResult.enrollment_id).toBe('enrollment-eft-2');

      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify student received rejection notification
      expect(userUpdates.length).toBeGreaterThan(0);
      const rejectionUpdate = userUpdates.find(u => u.new_status === EnrollmentStatus.REJECTED);
      expect(rejectionUpdate).toBeDefined();
      expect(rejectionUpdate.enrollment_id).toBe('enrollment-eft-2');

      // Verify enrollment was updated
      const updatedEnrollment = mockDatabase.get('enrollment-eft-2');
      expect(updatedEnrollment.status).toBe(EnrollmentStatus.REJECTED);
      expect(updatedEnrollment.course_access_granted).toBe(false);
      expect(updatedEnrollment.rejection_reason).toBe('Duplicate enrollment detected');
      expect(updatedEnrollment.rejected_by).toBe('admin-456');

      // Verify rejection audit log
      const auditLog = mockAuditLogs.find(log => 
        log.event_type === 'enrollment_rejected' && 
        log.enrollment_id === 'enrollment-eft-2'
      );
      expect(auditLog).toBeDefined();
      expect(auditLog.rejection_reason).toBe('Duplicate enrollment detected');
    });

    it('should handle concurrent approval attempts', async () => {
      // Setup concurrent approval scenario
      const approvalPromises = [
        adminWorkflow.approveEnrollment('enrollment-eft-1', 'admin-1'),
        adminWorkflow.approveEnrollment('enrollment-eft-1', 'admin-2')
      ];

      const results = await Promise.allSettled(approvalPromises);

      // One should succeed, one should fail due to race condition
      const successfulResults = results.filter(r => 
        r.status === 'fulfilled' && (r.value as ApprovalResult).success
      );
      const failedResults = results.filter(r => 
        r.status === 'fulfilled' && !(r.value as ApprovalResult).success
      );

      expect(successfulResults.length).toBe(1);
      expect(failedResults.length).toBe(1);

      // Verify final state is consistent
      const finalEnrollment = mockDatabase.get('enrollment-eft-1');
      expect(finalEnrollment.status).toBe(EnrollmentStatus.APPROVED);
      expect(['admin-1', 'admin-2']).toContain(finalEnrollment.approved_by);

      // Verify race condition audit log
      const raceConditionLog = mockAuditLogs.find(log => 
        log.event_type === 'concurrent_approval_attempt'
      );
      expect(raceConditionLog).toBeDefined();
    });
  });

  describe('Bulk Approval Operations (Requirement 4.3)', () => {
    it('should perform bulk approval with real-time updates', async () => {
      const userUpdates = new Map<string, any[]>();
      const adminUpdates: any[] = [];

      // Setup listeners for all users
      ['user-1', 'user-2'].forEach(userId => {
        userUpdates.set(userId, []);
        realTimeSync.subscribeToUserUpdates(userId, (update) => {
          userUpdates.get(userId)!.push(update);
        });
      });

      realTimeSync.subscribeToAdminUpdates((update) => {
        adminUpdates.push(update);
      });

      // Perform bulk approval
      const enrollmentIds = ['enrollment-eft-1', 'enrollment-eft-2'];
      const bulkResult = await adminWorkflow.bulkApproveEnrollments(enrollmentIds, 'admin-bulk-123');

      expect(bulkResult.success).toBe(true);
      expect(bulkResult.approved_count).toBe(2);
      expect(bulkResult.failed_count).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify all users received approval notifications
      userUpdates.forEach((updates, userId) => {
        expect(updates.length).toBeGreaterThan(0);
        const approvalUpdate = updates.find(u => u.new_status === EnrollmentStatus.APPROVED);
        expect(approvalUpdate).toBeDefined();
      });

      // Verify all enrollments were approved
      enrollmentIds.forEach(enrollmentId => {
        const enrollment = mockDatabase.get(enrollmentId);
        expect(enrollment.status).toBe(EnrollmentStatus.APPROVED);
        expect(enrollment.approved_by).toBe('admin-bulk-123');
        expect(enrollment.course_access_granted).toBe(true);
      });

      // Verify bulk approval audit log
      const bulkAuditLog = mockAuditLogs.find(log => 
        log.event_type === 'bulk_enrollment_approval'
      );
      expect(bulkAuditLog).toBeDefined();
      expect(bulkAuditLog.enrollment_count).toBe(2);
      expect(bulkAuditLog.admin_id).toBe('admin-bulk-123');
    });

    it('should handle partial bulk approval failures', async () => {
      // Add invalid enrollment to test partial failure
      const enrollmentIds = ['enrollment-eft-1', 'enrollment-eft-2', 'invalid-enrollment-id'];

      const bulkResult = await adminWorkflow.bulkApproveEnrollments(enrollmentIds, 'admin-partial-123');

      expect(bulkResult.success).toBe(true); // Overall success despite partial failures
      expect(bulkResult.approved_count).toBe(2);
      expect(bulkResult.failed_count).toBe(1);
      expect(bulkResult.failed_enrollments).toContain('invalid-enrollment-id');

      // Verify valid enrollments were still approved
      ['enrollment-eft-1', 'enrollment-eft-2'].forEach(enrollmentId => {
        const enrollment = mockDatabase.get(enrollmentId);
        expect(enrollment.status).toBe(EnrollmentStatus.APPROVED);
      });

      // Verify partial failure audit log
      const partialFailureLog = mockAuditLogs.find(log => 
        log.event_type === 'bulk_approval_partial_failure'
      );
      expect(partialFailureLog).toBeDefined();
      expect(partialFailureLog.failed_enrollments).toContain('invalid-enrollment-id');
    });

    it('should optimize bulk operations for performance', async () => {
      // Create larger dataset for performance testing
      const bulkEnrollments = [];
      for (let i = 3; i <= 20; i++) {
        const enrollment = {
          id: `enrollment-bulk-${i}`,
          user_id: `user-bulk-${i}`,
          user_email: `user${i}@example.com`,
          course_id: `course-bulk-${i}`,
          course_title: `Bulk Course ${i}`,
          payment_reference: `bulk_ref_${i}`,
          status: EnrollmentStatus.PENDING,
          payment_status: PaymentStatus.COMPLETED,
          payment_type: 'eft',
          requires_approval: true,
          course_access_granted: false,
          amount: 299.99,
          currency: 'ZAR',
          created_at: new Date().toISOString()
        };
        
        bulkEnrollments.push(enrollment);
        mockDatabase.set(enrollment.id, enrollment);
      }

      const enrollmentIds = bulkEnrollments.map(e => e.id);
      const startTime = Date.now();

      const bulkResult = await adminWorkflow.bulkApproveEnrollments(enrollmentIds, 'admin-perf-test');

      const processingTime = Date.now() - startTime;

      expect(bulkResult.success).toBe(true);
      expect(bulkResult.approved_count).toBe(18); // 20 - 2 (already processed in previous tests)
      
      // Should process within reasonable time (less than 2 seconds for 18 enrollments)
      expect(processingTime).toBeLessThan(2000);

      // Verify performance metrics were logged
      const perfLog = mockAuditLogs.find(log => 
        log.event_type === 'bulk_operation_performance'
      );
      expect(perfLog).toBeDefined();
      expect(perfLog.processing_time_ms).toBeLessThan(2000);
      expect(perfLog.enrollments_per_second).toBeGreaterThan(5);
    });
  });

  describe('Admin Action Logging and Audit Trail (Requirement 4.4)', () => {
    it('should log all admin actions with complete audit trail', async () => {
      // Perform various admin actions
      await adminWorkflow.approveEnrollment('enrollment-eft-1', 'admin-audit-123');
      await adminWorkflow.rejectEnrollment('enrollment-eft-2', 'Test rejection', 'admin-audit-123');

      // Wait for audit logging
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify approval audit log
      const approvalLog = mockAuditLogs.find(log => 
        log.event_type === 'enrollment_approved' && 
        log.enrollment_id === 'enrollment-eft-1'
      );
      expect(approvalLog).toBeDefined();
      expect(approvalLog).toMatchObject({
        event_type: 'enrollment_approved',
        enrollment_id: 'enrollment-eft-1',
        admin_id: 'admin-audit-123',
        user_id: 'user-1',
        course_id: 'course-1',
        action_timestamp: expect.any(String),
        ip_address: expect.any(String),
        user_agent: expect.any(String)
      });

      // Verify rejection audit log
      const rejectionLog = mockAuditLogs.find(log => 
        log.event_type === 'enrollment_rejected' && 
        log.enrollment_id === 'enrollment-eft-2'
      );
      expect(rejectionLog).toBeDefined();
      expect(rejectionLog).toMatchObject({
        event_type: 'enrollment_rejected',
        enrollment_id: 'enrollment-eft-2',
        admin_id: 'admin-audit-123',
        rejection_reason: 'Test rejection',
        action_timestamp: expect.any(String)
      });
    });

    it('should track admin session and security information', async () => {
      // Mock admin session information
      const adminSession = {
        admin_id: 'admin-security-test',
        session_id: 'session-123',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Admin Dashboard)',
        login_timestamp: new Date().toISOString()
      };

      // Perform action with session context
      await adminWorkflow.approveEnrollmentWithContext(
        'enrollment-eft-1', 
        adminSession
      );

      await new Promise(resolve => setTimeout(resolve, 30));

      // Verify security audit log
      const securityLog = mockAuditLogs.find(log => 
        log.event_type === 'admin_action_security_audit'
      );
      expect(securityLog).toBeDefined();
      expect(securityLog).toMatchObject({
        admin_id: 'admin-security-test',
        session_id: 'session-123',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Admin Dashboard)',
        action_type: 'enrollment_approval',
        security_validated: true
      });
    });

    it('should maintain audit trail integrity', async () => {
      const initialAuditCount = mockAuditLogs.length;

      // Perform multiple admin actions
      const actions = [
        () => adminWorkflow.approveEnrollment('enrollment-eft-1', 'admin-integrity-1'),
        () => adminWorkflow.rejectEnrollment('enrollment-eft-2', 'Integrity test', 'admin-integrity-2'),
        () => adminWorkflow.bulkApproveEnrollments(['enrollment-eft-1'], 'admin-integrity-3')
      ];

      await Promise.all(actions.map(action => action()));

      await new Promise(resolve => setTimeout(resolve, 100));

      const finalAuditCount = mockAuditLogs.length;
      const newAuditLogs = finalAuditCount - initialAuditCount;

      // Verify all actions were logged
      expect(newAuditLogs).toBeGreaterThan(0);

      // Verify audit log integrity
      const auditHashes = mockAuditLogs.map(log => log.integrity_hash).filter(Boolean);
      const uniqueHashes = new Set(auditHashes);
      expect(uniqueHashes.size).toBe(auditHashes.length); // All hashes should be unique

      // Verify chronological ordering
      const timestamps = mockAuditLogs.map(log => new Date(log.action_timestamp).getTime());
      const sortedTimestamps = [...timestamps].sort((a, b) => a - b);
      expect(timestamps).toEqual(sortedTimestamps);
    });

    it('should handle audit log failures gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock audit logging failure
      const originalInsert = mockSupabase.from().insert;
      mockSupabase.from().insert = vi.fn().mockImplementation((data) => {
        if (data.event_type) {
          return Promise.reject(new Error('Audit logging service unavailable'));
        }
        return originalInsert(data);
      });

      // Admin action should still succeed despite audit failure
      const result = await adminWorkflow.approveEnrollment('enrollment-eft-1', 'admin-audit-fail');

      expect(result.success).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to log admin action'),
        expect.any(Error)
      );

      // Verify enrollment was still processed
      const enrollment = mockDatabase.get('enrollment-eft-1');
      expect(enrollment.status).toBe(EnrollmentStatus.APPROVED);

      consoleSpy.mockRestore();
    });
  });

  describe('Real-Time Performance and Scalability', () => {
    it('should handle high-frequency admin notifications', async () => {
      const adminUpdates: any[] = [];
      
      realTimeSync.subscribeToAdminUpdates((update) => {
        adminUpdates.push({ ...update, receivedAt: Date.now() });
      });

      // Generate high-frequency notifications
      const notifications = [];
      for (let i = 0; i < 50; i++) {
        notifications.push({
          type: 'new_eft_enrollment',
          enrollmentId: `high-freq-${i}`,
          userEmail: `user${i}@example.com`,
          courseName: `Course ${i}`,
          amount: 299.99,
          timestamp: new Date()
        });
      }

      const startTime = Date.now();

      // Send all notifications rapidly
      await Promise.all(
        notifications.map(notification => 
          realTimeSync.broadcastAdminNotification(notification)
        )
      );

      await new Promise(resolve => setTimeout(resolve, 200));

      const processingTime = Date.now() - startTime;

      // Verify all notifications were received
      expect(adminUpdates.length).toBe(50);

      // Verify processing was efficient (less than 1 second)
      expect(processingTime).toBeLessThan(1000);

      // Verify notifications were received in order
      const receivedTimes = adminUpdates.map(u => u.receivedAt);
      const sortedTimes = [...receivedTimes].sort((a, b) => a - b);
      expect(receivedTimes).toEqual(sortedTimes);
    });

    it('should maintain real-time performance under load', async () => {
      const performanceMetrics: any[] = [];

      // Monitor performance
      realTimeSync.subscribeToPerformanceMetrics((metrics) => {
        performanceMetrics.push(metrics);
      });

      // Create load scenario
      const loadPromises = [];
      for (let i = 0; i < 20; i++) {
        loadPromises.push(
          adminWorkflow.approveEnrollment(`enrollment-load-${i}`, `admin-load-${i}`)
        );
      }

      const startTime = Date.now();
      await Promise.all(loadPromises);
      const totalTime = Date.now() - startTime;

      // Should handle 20 approvals within 3 seconds
      expect(totalTime).toBeLessThan(3000);

      // Verify performance metrics
      if (performanceMetrics.length > 0) {
        const avgResponseTime = performanceMetrics.reduce((sum, m) => 
          sum + m.response_time_ms, 0
        ) / performanceMetrics.length;
        
        expect(avgResponseTime).toBeLessThan(500); // Average response under 500ms
      }
    });
  });
});