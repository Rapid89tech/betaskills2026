/**
 * Direct Supabase Service - No localStorage, No Sync
 * This service provides direct Supabase operations without any localStorage or sync complications
 */

import { supabase } from '@/integrations/supabase/client';

export class DirectSupabaseService {
  // Get user enrollments directly from Supabase
  static async getUserEnrollments(userId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('❌ Direct Supabase: Error fetching user enrollments:', error);
        return [];
      }

      console.log('✅ Direct Supabase: User enrollments fetched:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('❌ Direct Supabase: Exception fetching user enrollments:', error);
      return [];
    }
  }

  // Get all enrollments (for admin)
  static async getAllEnrollments() {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('❌ Direct Supabase: Error fetching all enrollments:', error);
        return [];
      }

      console.log('✅ Direct Supabase: All enrollments fetched:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('❌ Direct Supabase: Exception fetching all enrollments:', error);
      return [];
    }
  }

  // Get pending enrollments (for admin) - optimized with limit and essential fields
  static async getPendingEnrollments() {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id, user_id, user_email, course_id, course_title, status, enrolled_at, payment_ref, payment_method')
        .eq('status', 'pending')
        .order('enrolled_at', { ascending: false })
        .limit(50); // Limit to 50 most recent pending enrollments

      if (error) {
        console.error('❌ Direct Supabase: Error fetching pending enrollments:', error);
        return [];
      }

      console.log('✅ Direct Supabase: Pending enrollments fetched:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('❌ Direct Supabase: Exception fetching pending enrollments:', error);
      return [];
    }
  }

  // Create enrollment directly in Supabase
  static async createEnrollment(enrollmentData: any) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert([enrollmentData])
        .select()
        .single();

      if (error) {
        console.error('❌ Direct Supabase: Error creating enrollment:', error);
        throw error;
      }

      console.log('✅ Direct Supabase: Enrollment created:', data);
      return data;
    } catch (error) {
      console.error('❌ Direct Supabase: Exception creating enrollment:', error);
      throw error;
    }
  }

  // Update enrollment status directly in Supabase
  static async updateEnrollmentStatus(enrollmentId: string, status: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .update({ 
          status,
          updated_at: new Date().toISOString(),
          ...(status === 'approved' && { approved_at: new Date().toISOString() })
        })
        .eq('id', enrollmentId)
        .select()
        .single();

      if (error) {
        console.error('❌ Direct Supabase: Error updating enrollment status:', error);
        throw error;
      }

      console.log('✅ Direct Supabase: Enrollment status updated:', data);
      return data;
    } catch (error) {
      console.error('❌ Direct Supabase: Exception updating enrollment status:', error);
      throw error;
    }
  }

  // Get user profile directly from Supabase
  static async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Direct Supabase: Error fetching user profile:', error);
        return null;
      }

      console.log('✅ Direct Supabase: User profile fetched:', data);
      return data;
    } catch (error) {
      console.error('❌ Direct Supabase: Exception fetching user profile:', error);
      return null;
    }
  }

  // Get all profiles (for admin) - optimized with limit
  static async getAllProfiles() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100); // Limit to 100 most recent profiles for better performance

      if (error) {
        console.error('❌ Direct Supabase: Error fetching all profiles:', error);
        return [];
      }

      console.log('✅ Direct Supabase: Profiles fetched:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('❌ Direct Supabase: Exception fetching all profiles:', error);
      return [];
    }
  }

  // Check if user is enrolled in a course (direct Supabase check)
  static async isUserEnrolled(userId: string, courseId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id, status')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('status', 'approved')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('❌ Direct Supabase: Error checking enrollment:', error);
        return false;
      }

      const isEnrolled = !!data;
      console.log(`✅ Direct Supabase: Enrollment check for ${courseId}:`, isEnrolled);
      return isEnrolled;
    } catch (error) {
      console.error('❌ Direct Supabase: Exception checking enrollment:', error);
      return false;
    }
  }

  // Get user's enrollment status for a course
  static async getUserEnrollmentStatus(userId: string, courseId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('status')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('❌ Direct Supabase: Error getting enrollment status:', error);
        return 'not_enrolled';
      }

      const status = data?.status || 'not_enrolled';
      console.log(`✅ Direct Supabase: Enrollment status for ${courseId}:`, status);
      return status;
    } catch (error) {
      console.error('❌ Direct Supabase: Exception getting enrollment status:', error);
      return 'not_enrolled';
    }
  }
}

export const directSupabaseService = DirectSupabaseService;
