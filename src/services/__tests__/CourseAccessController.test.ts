import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CourseAccessController } from '../CourseAccessController';
import { supabase } from '@/integrations/supabase/client';
import { EnrollmentStatus, PaymentStatus } from '@/types/ikhokha';

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

describe('CourseAccessController', () => {
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

  describe('canAccessCourse', () => {
    it('should grant access for approved enrollment with completed payment', async () => {
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

      const result = await controller.canAccessCourse(mockCourseId, mockUserId);

      expect(result.hasAccess).toBe(true);
      expect(result.enrollmentStatus).toBe(EnrollmentStatus.APPROVED);
      expect(result.paymentStatus).toBe(PaymentStatus.COMPLETED);
    });

    it('should deny access for pending enrollment', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.PENDING,
        course_access_granted: false
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

      const result = await controller.canAccessCourse(mockCourseId, mockUserId);

      expect(result.hasAccess).toBe(false);
      expect(result.reason).toBe('Enrollment pending approval');
      expect(result.enrollmentStatus).toBe(EnrollmentStatus.PENDING);
    });

    it('should deny access for rejected enrollment', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.REJECTED,
        payment_status: PaymentStatus.FAILED,
        course_access_granted: false,
        rejection_reason: 'Payment failed'
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

      const result = await controller.canAccessCourse(mockCourseId, mockUserId);

      expect(result.hasAccess).toBe(false);
      expect(result.reason).toBe('Payment failed');
      expect(result.enrollmentStatus).toBe(EnrollmentStatus.REJECTED);
    });

    it('should deny access when no enrollment exists', async () => {
      const mockSupabaseChain = {
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { code: 'PGRST116', message: 'No rows found' } 
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

      expect(result.hasAccess).toBe(false);
      expect(result.reason).toBe('No enrollment found');
    });

    it('should deny access for approved enrollment with incomplete payment', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.APPROVED,
        payment_status: PaymentStatus.PENDING,
        course_access_granted: false
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

      const result = await controller.canAccessCourse(mockCourseId, mockUserId);

      expect(result.hasAccess).toBe(false);
      expect(result.reason).toBe('Payment not completed');
      expect(result.enrollmentStatus).toBe(EnrollmentStatus.APPROVED);
      expect(result.paymentStatus).toBe(PaymentStatus.PENDING);
    });

    it('should handle database errors gracefully', async () => {
      const mockSupabaseChain = {
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { code: 'PGRST500', message: 'Database error' } 
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

      expect(result.hasAccess).toBe(false);
      expect(result.reason).toBe('Database error during validation');
    });
  });

  describe('grantCourseAccess', () => {
    it('should grant access for approved enrollment with completed payment', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.APPROVED,
        payment_status: PaymentStatus.COMPLETED
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

      const result = await controller.grantCourseAccess(mockEnrollmentId);

      expect(result.success).toBe(true);
      expect(result.enrollmentId).toBe(mockEnrollmentId);
      expect(mockUpdateChain.eq).toHaveBeenCalledWith('id', mockEnrollmentId);
    });

    it('should fail to grant access for non-approved enrollment', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.PENDING
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        }))
      } as any);

      const result = await controller.grantCourseAccess(mockEnrollmentId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Enrollment not approved');
    });

    it('should fail to grant access for enrollment with incomplete payment', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.APPROVED,
        payment_status: PaymentStatus.PENDING
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        }))
      } as any);

      const result = await controller.grantCourseAccess(mockEnrollmentId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Payment not completed');
    });

    it('should handle enrollment not found', async () => {
      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { code: 'PGRST116', message: 'No rows found' } 
        })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        }))
      } as any);

      const result = await controller.grantCourseAccess(mockEnrollmentId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Enrollment not found');
    });
  });

  describe('revokeCourseAccess', () => {
    it('should revoke access successfully', async () => {
      const mockEnrollment = {
        id: mockEnrollmentId,
        user_id: mockUserId,
        course_id: mockCourseId,
        status: EnrollmentStatus.REJECTED
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

      const result = await controller.revokeCourseAccess(mockEnrollmentId, 'Test revocation');

      expect(result.success).toBe(true);
      expect(result.enrollmentId).toBe(mockEnrollmentId);
      expect(mockUpdateChain.eq).toHaveBeenCalledWith('id', mockEnrollmentId);
    });

    it('should handle enrollment not found during revocation', async () => {
      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { code: 'PGRST116', message: 'No rows found' } 
        })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        }))
      } as any);

      const result = await controller.revokeCourseAccess(mockEnrollmentId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Enrollment not found');
    });
  });

  describe('bulkGrantAccess', () => {
    it('should handle mixed success and failure results', async () => {
      const enrollmentIds = ['enroll-1', 'enroll-2', 'enroll-3'];
      
      // Mock different responses for different enrollments
      let callCount = 0;
      const mockSelectChain = {
        single: vi.fn().mockImplementation(() => {
          callCount++;
          if (callCount === 1) {
            // First enrollment: success
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

      const result = await controller.bulkGrantAccess(enrollmentIds);

      expect(result.success).toHaveLength(1);
      expect(result.success).toContain('enroll-1');
      expect(result.failed).toHaveLength(2);
      expect(result.failed.find(f => f.id === 'enroll-2')?.error).toBe('Enrollment not approved');
      expect(result.failed.find(f => f.id === 'enroll-3')?.error).toBe('Enrollment not found');
    });
  });

  describe('getUserCourseAccess', () => {
    it('should return access status for multiple courses', async () => {
      const courseIds = ['course-1', 'course-2'];
      
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
          } else {
            return Promise.resolve({
              data: {
                id: 'enroll-2',
                user_id: mockUserId,
                course_id: 'course-2',
                status: EnrollmentStatus.PENDING,
                payment_status: PaymentStatus.PENDING,
                course_access_granted: false
              },
              error: null
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

      const result = await controller.getUserCourseAccess(mockUserId, courseIds);

      expect(result['course-1'].hasAccess).toBe(true);
      expect(result['course-2'].hasAccess).toBe(false);
      expect(result['course-2'].reason).toBe('Enrollment pending approval');
    });
  });

  describe('checkEnrollmentExpiry', () => {
    it('should detect expired enrollment and revoke access', async () => {
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() - 400); // 400 days ago

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

      const isExpired = await controller.checkEnrollmentExpiry(mockEnrollmentId, 365);

      expect(isExpired).toBe(true);
      expect(mockUpdateChain.eq).toHaveBeenCalledWith('id', mockEnrollmentId);
    });

    it('should not revoke access for non-expired enrollment', async () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 30); // 30 days ago

      const mockEnrollment = {
        created_at: recentDate.toISOString(),
        access_granted_at: recentDate.toISOString()
      };

      const mockSelectChain = {
        single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
      };
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => mockSelectChain)
        }))
      } as any);

      const isExpired = await controller.checkEnrollmentExpiry(mockEnrollmentId, 365);

      expect(isExpired).toBe(false);
    });
  });

  describe('cache management', () => {
    it('should cache access results and return cached values', async () => {
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
      await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(mockSupabaseChain.single).toHaveBeenCalledTimes(1);

      // Second call should use cache
      await controller.canAccessCourse(mockCourseId, mockUserId);
      expect(mockSupabaseChain.single).toHaveBeenCalledTimes(1); // Still 1, not 2
    });

    it('should clear cache and provide stats', () => {
      controller.clearAllCache();
      const stats = controller.getCacheStats();
      expect(stats.size).toBe(0);
      expect(stats.keys).toEqual([]);
    });
  });
});