// Comprehensive Enrollment Service - Saves everything directly to Supabase
import { supabase } from '@/integrations/supabase/client';

export interface EnrollmentData {
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  progress?: number;
  enrolled_at?: string;
  payment_ref?: string;
  proof_of_payment?: string;
  payment_date?: string;
}

export interface UserProgressData {
  user_id: string;
  course_id: string;
  current_module: number;
  current_lesson: number;
  completed_lessons: string[];
  quiz_scores: Record<string, number>;
  progress_percentage: number;
  total_time_spent: number;
  last_visited: string;
}

class EnrollmentService {
  // Create enrollment - prevents duplicates by checking existing enrollments first
  async createEnrollment(enrollmentData: EnrollmentData): Promise<any> {
    try {
      console.log('📝 Creating enrollment in Supabase:', enrollmentData);
      
      // CRITICAL: Check if user already has an enrollment for this course
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', enrollmentData.user_id)
        .eq('course_id', enrollmentData.course_id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is what we want
        console.error('❌ Error checking existing enrollment:', checkError);
        throw checkError;
      }

      if (existingEnrollment) {
        console.log('⚠️ User already enrolled in this course:', existingEnrollment);
        
        // If existing enrollment is rejected, allow re-enrollment
        if (existingEnrollment.status === 'rejected') {
          console.log('🔄 Existing enrollment is rejected, updating to pending...');
          
          const { data, error } = await supabase
            .from('enrollments')
            .update({
              status: 'pending',
              enrolled_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', existingEnrollment.id)
            .select()
            .single();

          if (error) {
            console.error('❌ Error updating rejected enrollment:', error);
            throw error;
          }

          console.log('✅ Rejected enrollment updated to pending:', data);
          return data;
        } else {
          // User already has a pending or approved enrollment
          console.log('✅ User already enrolled, returning existing enrollment');
          return existingEnrollment;
        }
      }

      // No existing enrollment, create new one
      console.log('🆕 Creating new enrollment...');
      const { data, error } = await supabase
        .from('enrollments')
        .insert([{
          user_id: enrollmentData.user_id,
          user_email: enrollmentData.user_email,
          course_id: enrollmentData.course_id,
          course_title: enrollmentData.course_title,
          status: enrollmentData.status || 'pending',
          progress: enrollmentData.progress || 0,
          enrolled_at: enrollmentData.enrolled_at || new Date().toISOString(),
          payment_ref: enrollmentData.payment_ref || null,
          proof_of_payment: enrollmentData.proof_of_payment || null,
          payment_date: enrollmentData.payment_date || null
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating enrollment:', error);
        throw error;
      }

      console.log('✅ New enrollment created successfully:', data);
      return data;
    } catch (error: any) {
      console.error('❌ Enrollment service error:', error);
      throw error;
    }
  }

  // Get user enrollments - fetches from Supabase only
  async getUserEnrollments(userId: string): Promise<EnrollmentData[]> {
    try {
      console.log('🔍 Fetching enrollments for user:', userId);
      
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching enrollments:', error);
        throw error;
      }

      console.log('✅ Enrollments fetched:', data);
      return data || [];
    } catch (error) {
      console.error('❌ Error in getUserEnrollments:', error);
      return [];
    }
  }

  // Get all enrollments - for admin panel
  async getAllEnrollments(): Promise<EnrollmentData[]> {
    try {
      console.log('🔍 Fetching all enrollments...');
      
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching all enrollments:', error);
        throw error;
      }

      console.log('✅ All enrollments fetched:', data);
      return data || [];
    } catch (error) {
      console.error('❌ Error in getAllEnrollments:', error);
      return [];
    }
  }

  // Update enrollment status
  async updateEnrollmentStatus(enrollmentId: string, status: 'pending' | 'approved' | 'rejected'): Promise<any> {
    try {
      console.log('📝 Updating enrollment status:', enrollmentId, status);
      
      const { data, error } = await supabase
        .from('enrollments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating enrollment status:', error);
        throw error;
      }

      console.log('✅ Enrollment status updated:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in updateEnrollmentStatus:', error);
      throw error;
    }
  }

  // Save user progress - saves directly to Supabase
  async saveUserProgress(progressData: UserProgressData): Promise<any> {
    try {
      console.log('📝 Saving user progress:', progressData);
      
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: progressData.user_id,
          course_id: progressData.course_id,
          current_module: progressData.current_module,
          current_lesson: progressData.current_lesson,
          completed_lessons: progressData.completed_lessons,
          quiz_scores: progressData.quiz_scores,
          progress_percentage: progressData.progress_percentage,
          total_time_spent: progressData.total_time_spent,
          last_visited: progressData.last_visited,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,course_id'
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error saving user progress:', error);
        throw error;
      }

      console.log('✅ User progress saved:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in saveUserProgress:', error);
      throw error;
    }
  }

  // Get user progress
  async getUserProgress(userId: string, courseId?: string): Promise<UserProgressData[]> {
    try {
      console.log('🔍 Fetching user progress:', userId, courseId);
      
      let query = supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (courseId) {
        query = query.eq('course_id', courseId);
      }

      const { data, error } = await query.order('updated_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching user progress:', error);
        throw error;
      }

      console.log('✅ User progress fetched:', data);
      return data || [];
    } catch (error) {
      console.error('❌ Error in getUserProgress:', error);
      return [];
    }
  }

  // Update enrollment progress
  async updateEnrollmentProgress(enrollmentId: string, progress: number): Promise<any> {
    try {
      console.log('📝 Updating enrollment progress:', enrollmentId, progress);
      
      const { data, error } = await supabase
        .from('enrollments')
        .update({ 
          progress,
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating enrollment progress:', error);
        throw error;
      }

      console.log('✅ Enrollment progress updated:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in updateEnrollmentProgress:', error);
      throw error;
    }
  }

  // Sync localStorage data to Supabase (one-time migration)
  async syncLocalStorageToSupabase(): Promise<void> {
    try {
      console.log('🔄 Syncing localStorage data to Supabase...');
      
      // Get localStorage enrollments
      const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      
      for (const enrollment of localEnrollments) {
        try {
          // Check if enrollment already exists in Supabase
          const { data: existing } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', enrollment.user_id)
            .eq('course_id', enrollment.course_id)
            .single();

          if (!existing) {
            // Create enrollment in Supabase
            await this.createEnrollment({
              user_id: enrollment.user_id,
              user_email: enrollment.user_email,
              course_id: enrollment.course_id,
              course_title: enrollment.course_title,
              status: enrollment.status || 'pending',
              progress: enrollment.progress || 0,
              enrolled_at: enrollment.enrolled_at,
              payment_ref: enrollment.payment_ref,
              proof_of_payment: enrollment.proof_of_payment,
              payment_date: enrollment.payment_date
            });
          }
        } catch (error) {
          console.warn('⚠️ Error syncing enrollment:', enrollment, error);
        }
      }

      console.log('✅ localStorage sync completed');
    } catch (error) {
      console.error('❌ Error in syncLocalStorageToSupabase:', error);
    }
  }
}

export const enrollmentService = new EnrollmentService();
