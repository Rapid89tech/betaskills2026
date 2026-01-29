import { supabase } from '@/integrations/supabase/client';

export interface DirectEnrollmentData {
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'approved' | 'pending' | 'rejected';
  payment_ref?: string | undefined;
}

class DirectEnrollmentService {
  async createEnrollment(enrollmentData: DirectEnrollmentData): Promise<any> {
    console.log('🚀 DirectEnrollmentService: Creating enrollment...', enrollmentData);

    const { data, error } = await supabase
      .from('enrollments')
      .insert([
        {
          user_id: enrollmentData.user_id,
          user_email: enrollmentData.user_email,
          course_id: enrollmentData.course_id,
          course_title: enrollmentData.course_title,
          status: enrollmentData.status,
          enrolled_at: new Date().toISOString(),
          payment_ref: enrollmentData.payment_ref,
          progress: 0,
          completed_lessons: [],
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ DirectEnrollmentService: Error creating enrollment', error);
      throw new Error(`Failed to create enrollment: ${error.message}`);
    }

    console.log('✅ DirectEnrollmentService: Enrollment created successfully', data);
    return data;
  }
}

export const directEnrollmentService = new DirectEnrollmentService();
