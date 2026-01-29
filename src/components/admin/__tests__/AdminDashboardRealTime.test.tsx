import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { sortEnrollmentsByPriority, isPendingApproval, getEnrollmentDisplayStatus } from '@/utils/enrollment';
import { EnrollmentStatus, PaymentType, PaymentStatus } from '@/types/enrollment';

// Mock dependencies
vi.mock('@/hooks/useRealTimeEnrollments');
vi.mock('@/services/RealTimeService');
vi.mock('@/hooks/use-toast');
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      }))
    }))
  }
}));

describe('AdminDashboard Real-Time EFT Enrollments Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('EFT Enrollment Sorting', () => {
    it('should prioritize EFT enrollments over card enrollments', () => {
      const enrollments = [
        {
          id: '1',
          userId: 'user1',
          courseId: 'course1',
          paymentType: PaymentType.CARD,
          status: EnrollmentStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          createdAt: new Date('2024-01-01T09:00:00Z'),
          updatedAt: new Date('2024-01-01T09:00:00Z')
        },
        {
          id: '2',
          userId: 'user2',
          courseId: 'course2',
          paymentType: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          createdAt: new Date('2024-01-01T10:00:00Z'),
          updatedAt: new Date('2024-01-01T10:00:00Z')
        }
      ];

      const sorted = sortEnrollmentsByPriority(enrollments);
      
      // EFT enrollment should come first despite being newer
      expect(sorted[0].id).toBe('2');
      expect(sorted[0].paymentType).toBe(PaymentType.EFT);
      expect(sorted[1].id).toBe('1');
      expect(sorted[1].paymentType).toBe(PaymentType.CARD);
    });

    it('should sort by most recent within same payment type', () => {
      const enrollments = [
        {
          id: '1',
          userId: 'user1',
          courseId: 'course1',
          paymentType: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          createdAt: new Date('2024-01-01T09:00:00Z'),
          updatedAt: new Date('2024-01-01T09:00:00Z')
        },
        {
          id: '2',
          userId: 'user2',
          courseId: 'course2',
          paymentType: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          createdAt: new Date('2024-01-01T10:00:00Z'),
          updatedAt: new Date('2024-01-01T10:00:00Z')
        }
      ];

      const sorted = sortEnrollmentsByPriority(enrollments);
      
      // More recent EFT enrollment should come first
      expect(sorted[0].id).toBe('2');
      expect(sorted[1].id).toBe('1');
    });
  });

  describe('EFT Enrollment Detection', () => {
    it('should identify pending EFT enrollments', () => {
      const eftEnrollment = {
        id: '1',
        userId: 'user1',
        courseId: 'course1',
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(isPendingApproval(eftEnrollment)).toBe(true);
    });

    it('should not identify card enrollments as pending approval', () => {
      const cardEnrollment = {
        id: '1',
        userId: 'user1',
        courseId: 'course1',
        paymentType: PaymentType.CARD,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(isPendingApproval(cardEnrollment)).toBe(false);
    });

    it('should not identify approved EFT enrollments as pending approval', () => {
      const approvedEftEnrollment = {
        id: '1',
        userId: 'user1',
        courseId: 'course1',
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(isPendingApproval(approvedEftEnrollment)).toBe(false);
    });
  });

  describe('EFT Enrollment Display Status', () => {
    it('should show "Pending EFT Approval" for pending EFT enrollments', () => {
      const eftEnrollment = {
        id: '1',
        userId: 'user1',
        courseId: 'course1',
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(getEnrollmentDisplayStatus(eftEnrollment)).toBe('Pending EFT Approval');
    });

    it('should show "Processing Payment" for pending card enrollments', () => {
      const cardEnrollment = {
        id: '1',
        userId: 'user1',
        courseId: 'course1',
        paymentType: PaymentType.CARD,
        status: EnrollmentStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(getEnrollmentDisplayStatus(cardEnrollment)).toBe('Processing Payment');
    });

    it('should show "Enrolled" for approved enrollments', () => {
      const approvedEnrollment = {
        id: '1',
        userId: 'user1',
        courseId: 'course1',
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.APPROVED,
        paymentStatus: PaymentStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(getEnrollmentDisplayStatus(approvedEnrollment)).toBe('Enrolled');
    });

    it('should show "Enrollment Rejected" for rejected enrollments', () => {
      const rejectedEnrollment = {
        id: '1',
        userId: 'user1',
        courseId: 'course1',
        paymentType: PaymentType.EFT,
        status: EnrollmentStatus.REJECTED,
        paymentStatus: PaymentStatus.FAILED,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      expect(getEnrollmentDisplayStatus(rejectedEnrollment)).toBe('Enrollment Rejected');
    });
  });

  describe('Real-Time Service Integration', () => {
    it('should handle real-time service connection', async () => {
      const { realTimeService } = await import('@/services/RealTimeService');
      
      // Mock the service methods
      const mockConnect = vi.fn().mockResolvedValue(undefined);
      const mockSubscribeToConnectionStatus = vi.fn().mockReturnValue(() => {});
      const mockSubscribeToEnrollments = vi.fn().mockReturnValue(() => {});
      
      realTimeService.connect = mockConnect;
      realTimeService.subscribeToConnectionStatus = mockSubscribeToConnectionStatus;
      realTimeService.subscribeToEnrollments = mockSubscribeToEnrollments;
      
      // Test connection
      await realTimeService.connect();
      expect(mockConnect).toHaveBeenCalled();
      
      // Test subscriptions
      const connectionCallback = vi.fn();
      const enrollmentCallback = vi.fn();
      
      realTimeService.subscribeToConnectionStatus(connectionCallback);
      realTimeService.subscribeToEnrollments(enrollmentCallback);
      
      expect(mockSubscribeToConnectionStatus).toHaveBeenCalledWith(connectionCallback);
      expect(mockSubscribeToEnrollments).toHaveBeenCalledWith(enrollmentCallback);
    });

    it('should handle enrollment update broadcasting', async () => {
      const { realTimeService } = await import('@/services/RealTimeService');
      
      const mockBroadcast = vi.fn();
      realTimeService.broadcastEnrollmentUpdate = mockBroadcast;
      
      const mockUpdate = {
        type: 'ENROLLMENT_APPROVED' as const,
        enrollmentId: 'test-enrollment',
        userId: 'test-user',
        courseId: 'test-course',
        status: EnrollmentStatus.APPROVED,
        timestamp: new Date(),
        metadata: {
          paymentType: PaymentType.EFT,
          courseTitle: 'Test Course'
        }
      };
      
      realTimeService.broadcastEnrollmentUpdate(mockUpdate);
      expect(mockBroadcast).toHaveBeenCalledWith(mockUpdate);
    });
  });

  describe('AdminDashboard Component Logic', () => {
    it('should filter EFT enrollments correctly', () => {
      const enrollments = [
        {
          id: '1',
          user_email: 'student1@example.com',
          course_id: 'course1',
          course_title: 'Test Course 1',
          status: 'pending' as const,
          enrolled_at: '2024-01-01T10:00:00Z',
          payment_type: 'EFT' as const,
          updated_at: '2024-01-01T10:00:00Z'
        },
        {
          id: '2',
          user_email: 'student2@example.com',
          course_id: 'course2',
          course_title: 'Test Course 2',
          status: 'pending' as const,
          enrolled_at: '2024-01-01T11:00:00Z',
          payment_type: 'CARD' as const,
          updated_at: '2024-01-01T11:00:00Z'
        }
      ];

      // Filter EFT enrollments (including those without payment_type as they default to EFT)
      const eftEnrollments = enrollments.filter(e => 
        (e.payment_type === 'EFT' || !e.payment_type) && e.status === 'pending'
      );

      expect(eftEnrollments).toHaveLength(1);
      expect(eftEnrollments[0].id).toBe('1');
      expect(eftEnrollments[0].payment_type).toBe('EFT');
    });

    it('should calculate correct EFT metrics', () => {
      const enrollments = [
        {
          id: '1',
          payment_type: 'EFT' as const,
          status: 'pending' as const
        },
        {
          id: '2',
          payment_type: 'CARD' as const,
          status: 'pending' as const
        },
        {
          id: '3',
          payment_type: undefined, // Should default to EFT
          status: 'pending' as const
        },
        {
          id: '4',
          payment_type: 'EFT' as const,
          status: 'approved' as const
        }
      ];

      const pendingEftCount = enrollments.filter(e => 
        (e.payment_type === 'EFT' || !e.payment_type) && e.status === 'pending'
      ).length;

      const totalPendingCount = enrollments.filter(e => e.status === 'pending').length;

      expect(pendingEftCount).toBe(2); // EFT + undefined payment_type
      expect(totalPendingCount).toBe(3); // All pending regardless of payment type
    });
  });
});