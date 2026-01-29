import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CourseAccessController } from '@/services/CourseAccessController';
import { EnrollmentStatus, PaymentStatus } from '@/types/ikhokha';
import { supabase } from '@/integrations/supabase/client';

// Mock supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  }
}));

// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

describe('Course Access Control Integration', () => {
  let controller: CourseAccessController;
  const mockUserId = 'user-123';
  const mockCourseId = 'course-456';
  const mockEnrollmentId = 'enrollment-789';

  beforeEach(() => {
    controller = CourseAccessController.getInstance();
    controller.clearAllCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete enrollment and payment flow', () => {
    it('should handle card payment flow with immediate access', async () => {
      // Simulate approved enrollment with completed card payment
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.APPROVED,
        payment_status: PaymentStatus.COMPLETED,
        payment_type: 'card',
        course_access_granted: false, // Not yet granted
        requires_approval: false
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };

      const mockUpdateChain = {
        eq: vi.fn().mockResolvedValue({ error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        })),
        update: vi.fn(() => mockUpdateChain)
      } as any);

      // Step 1: Check initial access (should be granted based on status)
      const initialAccess = await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(initialAccess.hasAccess).toBe(true);
      expect(initialAccess.enrollmentStatus).toBe(EnrollmentStatus.APPROVED);
      expect(initialAccess.paymentStatus).toBe(PaymentStatus.COMPLETED);

      // Step 2: Explicitly grant access (updates database)
      const grantResult = await controller.grantCourseAccess(mockEnrollmentId);
      expect(grantResult.success).toBe(true);
      expect(mockUpdateChain.eq).toHaveBeenCalledWith('id', mockEnrollmentId);

      // Verify update call included access grant
      const updateCall = vi.mocked(supabase.from().update);
      expect(updateCall).toHaveBeenCalledWith(
        expect.objectContaining({
          course_access_granted: true,
          access_granted_at: expect.any(String),
          updated_at: expect.any(String)
        })
      );
    });

    it('should handle EFT payment flow requiring admin approval', async () => {
      // Simulate pending enrollment with completed EFT payment awaiting approval
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.COMPLETED,
        payment_type: 'eft',
        course_access_granted: false,
        requires_approval: true
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        }))
      } as any);

      // Step 1: Check access while pending approval
      const pendingAccess = await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(pendingAccess.hasAccess).toBe(false);
      expect(pendingAccess.reason).toBe('Enrollment pending approval');
      expect(pendingAccess.enrollmentStatus).toBe(EnrollmentStatus.PENDING);
      expect(pendingAccess.paymentStatus).toBe(PaymentStatus.COMPLETED);

      // Step 2: Simulate admin approval (update enrollment status)
      mockEnrollment.status = EnrollmentStatus.APPROVED;
      
      const mockUpdateChain = {
        eq: vi.fn().mockResolvedValue({ error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        })),
        update: vi.fn(() => mockUpdateChain)
      } as any);

      // Step 3: Grant access after approval
      const grantResult = await controller.grantCourseAccess(mockEnrollmentId);
      expect(grantResult.success).toBe(true);

      // Step 4: Verify access is now granted
      controller.clearAllCache(); // Clear cache to force fresh check
      const approvedAccess = await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(approvedAccess.hasAccess).toBe(true);
    });

    it('should handle payment failure and rejection flow', async () => {
      // Simulate rejected enrollment due to payment failure
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.REJECTED,
        payment_status: PaymentStatus.FAILED,
        course_access_granted: false,
        rejection_reason: 'Payment processing failed'
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        }))
      } as any);

      // Check access for rejected enrollment
      const rejectedAccess = await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(rejectedAccess.hasAccess).toBe(false);
      expect(rejectedAccess.reason).toBe('Payment processing failed');
      expect(rejectedAccess.enrollmentStatus).toBe(EnrollmentStatus.REJECTED);
      expect(rejectedAccess.paymentStatus).toBe(PaymentStatus.FAILED);
    });
  });

  describe('Access revocation scenarios', () => {
    it('should revoke access for rejected enrollments', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.APPROVED,
        course_access_granted: true
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };

      const mockUpdateChain = {
        eq: vi.fn().mockResolvedValue({ error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        })),
        update: vi.fn(() => mockUpdateChain)
      } as any);

      // Revoke access
      const revokeResult = await controller.revokeCourseAccess(mockEnrollmentId, 'Admin decision');
      expect(revokeResult.success).toBe(true);

      // Verify revocation update
      const updateCall = vi.mocked(supabase.from().update);
      expect(updateCall).toHaveBeenCalledWith(
        expect.objectContaining({
          course_access_granted: false,
          access_granted_at: null,
          updated_at: expect.any(String),
          rejection_reason: 'Admin decision'
        })
      );
    });

    it('should handle enrollment expiry', async () => {
      // Create enrollment that's 400 days old (expired)
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() - 400);

      const mockEnrollment = {
        created_at: expiredDate.toISOString(),
        access_granted_at: expiredDate.toISOString()
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };

      const mockUpdateChain = {
        eq: vi.fn().mockResolvedValue({ error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        })),
        update: vi.fn(() => mockUpdateChain)
      } as any);

      // Check expiry (365 day limit)
      const isExpired = await controller.checkEnrollmentExpiry(mockEnrollmentId, 365);
      expect(isExpired).toBe(true);

      // Verify automatic revocation
      expect(mockUpdateChain.eq).toHaveBeenCalledWith('id', mockEnrollmentId);
    });
  });

  describe('Bulk operations', () => {
    it('should handle bulk access granting with mixed results', async () => {
      const enrollmentIds = ['enroll-1', 'enroll-2', 'enroll-3'];
      
      // Mock different responses for different enrollments
      let callCount = 0;
      const mockSelectChain = {
        single: vi.fn().mockImplementation(() => {
          callCount++;
          if (callCount === 1) {
            // First enrollment: success case
            return Promise.resolve({
              data: {
                id: 'enroll-1',
                user_id: mockUserId,
                course_id: mockCourseId,
                status: EnrollmentStatus.APPROVED,
                payment_status: PaymentStatus.COMPLETED
              },
              error: null
            });
          } else if (callCount === 2) {
            // Second enrollment: not approved
            return Promise.resolve({
              data: {
                id: 'enroll-2',
                user_id: mockUserId,
                course_id: mockCourseId,
                status: EnrollmentStatus.PENDING,
                payment_status: PaymentStatus.PENDING
              },
              error: null
            });
          } else {
            // Third enrollment: not found
            return Promise.resolve({
              data: null,
              error: { code: 'PGRST116', message: 'No rows found' }
            });
          }
        })
      };

      const mockUpdateChain = {
        eq: vi.fn().mockResolvedValue({ error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        })),
        update: vi.fn(() => mockUpdateChain)
      } as any);

      // Perform bulk grant
      const bulkResult = await controller.bulkGrantAccess(enrollmentIds);

      expect(bulkResult.success).toHaveLength(1);
      expect(bulkResult.success).toContain('enroll-1');
      expect(bulkResult.failed).toHaveLength(2);
      
      const failedIds = bulkResult.failed.map(f => f.id);
      expect(failedIds).toContain('enroll-2');
      expect(failedIds).toContain('enroll-3');
    });
  });

  describe('Multiple course access', () => {
    it('should check access for multiple courses efficiently', async () => {
      const courseIds = ['course-1', 'course-2', 'course-3'];
      
      // Mock different access results for different courses
      let callCount = 0;
      const mockSupabaseChain = {
        single: vi.fn().mockImplementation(() => {
          callCount++;
          if (callCount === 1) {
            return Promise.resolve({
              data: {
                id: 'enroll-1',
                user_id: mockUserId,
                course_id: 'course-1',
                status: EnrollmentStatus.APPROVED,
                payment_status: PaymentStatus.COMPLETED,
                course_access_granted: true
              },
              error: null
            });
          } else if (callCount === 2) {
            return Promise.resolve({
              data: {
                id: 'enroll-2',
                user_id: mockUserId,
                course_id: 'course-2',
                status: EnrollmentStatus.PENDING,
                payment_status: PaymentStatus.COMPLETED,
                course_access_granted: false
              },
              error: null
            });
          } else {
            return Promise.resolve({
              data: null,
              error: { code: 'PGRST116', message: 'No rows found' }
            });
          }
        })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => mockSupabaseChain)
          }))
        }))
      } as any);

      // Check multiple course access
      const accessResults = await controller.getUserCourseAccess(mockUserId, courseIds);

      expect(accessResults['course-1'].hasAccess).toBe(true);
      expect(accessResults['course-2'].hasAccess).toBe(false);
      expect(accessResults['course-2'].reason).toBe('Enrollment pending approval');
      expect(accessResults['course-3'].hasAccess).toBe(false);
      expect(accessResults['course-3'].reason).toBe('No enrollment found');
    });
  });

  describe('Cache behavior', () => {
    it('should cache access results and clear cache appropriately', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.APPROVED,
        payment_status: PaymentStatus.COMPLETED,
        course_access_granted: true
      };

      const mockSupabaseChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => mockSupabaseChain)
          }))
        }))
      } as any);

      // First call should hit database
      const firstResult = await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(firstResult.hasAccess).toBe(true);
      expect(mockSupabaseChain.single).toHaveBeenCalledTimes(1);

      // Second call should use cache (within cache timeout)
      const secondResult = await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(secondResult.hasAccess).toBe(true);
      expect(mockSupabaseChain.single).toHaveBeenCalledTimes(1); // Still 1, not 2

      // Clear cache and check again
      controller.clearAllCache();
      const thirdResult = await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(thirdResult.hasAccess).toBe(true);
      expect(mockSupabaseChain.single).toHaveBeenCalledTimes(2); // Now 2

      // Verify cache stats
      const stats = controller.getCacheStats();
      expect(stats.size).toBe(1);
      expect(stats.keys).toContain(`${mockUserId}-${mockCourseId}`);
    });
  });

  describe('Error handling and resilience', () => {
    it('should handle database connection errors gracefully', async () => {
      const mockSupabaseChain = {
        single: vi.fn().mockRejectedValue(new Error('Connection timeout'))
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => mockSupabaseChain)
          }))
        }))
      } as any);

      const result = await controller.canAccessCourse(mockCourseId, mockUserId);
      
      expect(result.hasAccess).toBe(false);
      expect(result.reason).toBe('System error checking access');
    });

    it('should handle malformed enrollment data', async () => {
      const mockSupabaseChain = {
        single: vi.fn().mockResolvedValue({ 
          data: { 
            // Missing required fields
            id: mockEnrollmentId,
            user_id: mockUserId
            // Missing course_id, status, etc.
          }, 
          error: null 
        })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => mockSupabaseChain)
          }))
        }))
      } as any);

      const result = await controller.canAccessCourse(mockCourseId, mockUserId);
      
      // Should handle gracefully even with malformed data
      expect(result.hasAccess).toBe(false);
    });
  });
});