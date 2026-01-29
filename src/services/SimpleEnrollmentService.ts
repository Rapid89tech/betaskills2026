import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface EnrollmentRequest {
  userId: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
}

export class SimpleEnrollmentService {
  private static instance: SimpleEnrollmentService;

  static getInstance(): SimpleEnrollmentService {
    if (!SimpleEnrollmentService.instance) {
      SimpleEnrollmentService.instance = new SimpleEnrollmentService();
    }
    return SimpleEnrollmentService.instance;
  }

  /**
   * Create a new enrollment request
   */
  async createEnrollment(request: EnrollmentRequest): Promise<{ success: boolean; error?: string }> {
    try {
      const enrollmentId = uuidv4();
      const now = new Date().toISOString();

      const { error } = await supabase
        .from('enrollments')
        .insert({
          id: enrollmentId,
          user_id: request.userId,
          user_email: request.userEmail,
          course_id: request.courseId,
          course_title: request.courseTitle,
          status: 'pending',
          enrolled_at: now,
          updated_at: now,
          progress: 0
        });

      if (error) {
        console.error('Enrollment creation error:', error);
        return { success: false, error: error.message };
      }

      // Dispatch success event
      window.dispatchEvent(new CustomEvent('enrollment-created', {
        detail: {
          enrollmentId,
          courseId: request.courseId,
          status: 'pending'
        }
      }));

      return { success: true };
    } catch (error: any) {
      console.error('Enrollment service error:', error);
      return { success: false, error: error.message || 'Failed to create enrollment' };
    }
  }

  /**
   * Check if user is already enrolled in a course
   */
  async checkEnrollmentStatus(userId: string, courseId: string): Promise<{
    isEnrolled: boolean;
    status?: 'pending' | 'approved' | 'rejected';
    enrollmentId?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id, status')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .order('enrolled_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking enrollment status:', error);
        return { isEnrolled: false };
      }

      if (data && data.length > 0) {
        const enrollment = data[0];
        return {
          isEnrolled: true,
          status: enrollment.status,
          enrollmentId: enrollment.id
        };
      }

      return { isEnrolled: false };
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      return { isEnrolled: false };
    }
  }

  /**
   * Get user's enrollments
   */
  async getUserEnrollments(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('Error fetching user enrollments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user enrollments:', error);
      return [];
    }
  }
}

export const simpleEnrollmentService = SimpleEnrollmentService.getInstance();