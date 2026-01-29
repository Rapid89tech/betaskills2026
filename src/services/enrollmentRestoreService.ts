import { supabase } from '@/integrations/supabase/client';

export interface RestoreResult {
  success: boolean;
  restored: number;
  errors: string[];
  message: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'pending' | 'approved' | 'rejected';
  progress: number;
  created_at: string;
  updated_at: string;
  user_email?: string;
}

class EnrollmentRestoreService {
  /**
   * Get all enrollments from localStorage (public method)
   */
  getAllLocalStorageEnrollments(): any[] {
    const allEnrollments: any[] = [];

    try {
      // Check main enrollments key
      const mainEnrollments = localStorage.getItem('enrollments');
      if (mainEnrollments) {
        const parsed = JSON.parse(mainEnrollments);
        // Ensure parsed is an array before spreading
        if (Array.isArray(parsed)) {
          allEnrollments.push(...parsed);
        } else if (parsed && typeof parsed === 'object') {
          // If it's a single object, wrap it in an array
          allEnrollments.push(parsed);
        }
      }

      // Check user-specific enrollment keys
      const allKeys = Object.keys(localStorage);
      const userEnrollmentKeys = allKeys.filter(key => key.startsWith('user-enrollments-'));
      
      userEnrollmentKeys.forEach(key => {
        try {
          const userEnrollments = localStorage.getItem(key);
          if (userEnrollments) {
            const parsed = JSON.parse(userEnrollments);
            // Ensure parsed is an array before spreading
            if (Array.isArray(parsed)) {
              allEnrollments.push(...parsed);
            } else if (parsed && typeof parsed === 'object') {
              // If it's a single object, wrap it in an array
              allEnrollments.push(parsed);
            }
          }
        } catch (error) {
          console.warn(`Error parsing ${key}:`, error);
        }
      });

      // Remove duplicates based on id
      const uniqueEnrollments = allEnrollments.filter((enrollment, index, self) => 
        index === self.findIndex(e => e.id === enrollment.id)
      );

      return uniqueEnrollments;
    } catch (error) {
      console.error('Error getting localStorage enrollments:', error);
      return [];
    }
  }

  /**
   * Restore approved enrollments from localStorage to Supabase
   */
  async restoreApprovedEnrollments(): Promise<RestoreResult> {
    const errors: string[] = [];
    let restored = 0;

    try {
      console.log('Starting enrollment restoration process...');
      
      // Get all enrollments from localStorage
      const localEnrollments = this.getAllLocalStorageEnrollments();
      console.log(`Found ${localEnrollments.length} enrollments in localStorage`);
      
      // Process ALL enrollments, not just approved ones
      const allEnrollments = localEnrollments;
      console.log(`Found ${allEnrollments.length} total enrollments to process`);

      if (allEnrollments.length === 0) {
        return {
          success: true,
          restored: 0,
          errors: [],
          message: 'No enrollments found in localStorage'
        };
      }

      // Process each enrollment (preserving original status)
      for (const enrollment of allEnrollments) {
        try {
          // Ensure user profile exists
          const userProfile = await this.ensureUserProfile(enrollment);
          if (!userProfile) {
            errors.push(`Failed to create user profile for ${enrollment.user_email || enrollment.user_id}`);
            continue;
          }

          // Check if enrollment already exists in Supabase
          const { data: existingEnrollment } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', userProfile.id)
            .eq('course_id', enrollment.course_id)
            .single();

          if (existingEnrollment) {
            // Update existing enrollment (preserve original status)
            const { error: updateError } = await supabase
              .from('enrollments')
              .update({
                status: enrollment.status || 'pending', // Preserve original status
                progress: enrollment.progress || 0,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingEnrollment.id);

            if (updateError) {
              errors.push(`Failed to update enrollment for ${enrollment.course_id}: ${updateError.message}`);
            } else {
              restored++;
              console.log(`✅ Updated enrollment for course ${enrollment.course_id}`);
            }
          } else {
            // Create new enrollment (preserve original status)
            const { error: insertError } = await supabase
              .from('enrollments')
              .insert({
                user_id: userProfile.id,
                course_id: enrollment.course_id,
                status: enrollment.status || 'pending', // Preserve original status
                progress: enrollment.progress || 0,
                created_at: enrollment.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString()
              });

            if (insertError) {
              errors.push(`Failed to create enrollment for ${enrollment.course_id}: ${insertError.message}`);
            } else {
              restored++;
              console.log(`✅ Created enrollment for course ${enrollment.course_id}`);
            }
          }
        } catch (error) {
          errors.push(`Error processing enrollment for ${enrollment.course_id}: ${error}`);
        }
      }

      // Trigger course card refresh
      window.dispatchEvent(new CustomEvent('force-course-card-refresh', {
        detail: { 
          restored,
          timestamp: new Date().toISOString(),
          source: 'enrollment-restore'
        }
      }));

      // Proactively clean up the restored enrollments from localStorage
      this.clearRestoredEnrollmentsFromCache(allEnrollments);

      return {
        success: errors.length === 0,
        restored,
        errors,
        message: `Successfully restored ${restored} enrollments${errors.length > 0 ? ` with ${errors.length} errors` : ''}`
      };

    } catch (error) {
      console.error('Error in restoreApprovedEnrollments:', error);
      return {
        success: false,
        restored,
        errors: [...errors, `General error: ${error}`]
      };
    }
  }

  /**
   * Clears a specific list of enrollments from the localStorage cache.
   */
  private clearRestoredEnrollmentsFromCache(restoredEnrollments: any[]): void {
    if (restoredEnrollments.length === 0) return;

    try {
      const restoredIds = new Set(restoredEnrollments.map(e => e.id));
      const mainEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      
      if (Array.isArray(mainEnrollments)) {
        const updatedEnrollments = mainEnrollments.filter(e => !restoredIds.has(e.id));
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
        console.log(`🧹 Cleaned ${mainEnrollments.length - updatedEnrollments.length} restored enrollments from main cache.`);
      }
    } catch (error) {
      console.error('Error cleaning up restored enrollments from cache:', error);
    }
  }

  /**
   * Ensure user profile exists in Supabase
   */
  private async ensureUserProfile(enrollment: any): Promise<UserProfile | null> {
    try {
      // Try to find existing user by email first
      let userProfile: UserProfile | null = null;
      
      if (enrollment.user_email) {
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', enrollment.user_email)
          .single();

        if (existingUser) {
          userProfile = existingUser;
        }
      }

      // If not found by email, try by user_id
      if (!userProfile && enrollment.user_id) {
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', enrollment.user_id)
          .single();

        if (existingUser) {
          userProfile = existingUser;
        }
      }

      // If user doesn't exist, create a new profile
      if (!userProfile) {
        const newProfile = {
          id: enrollment.user_id || crypto.randomUUID(),
          email: enrollment.user_email || `user-${Date.now()}@example.com`,
          full_name: enrollment.user_name || 'Restored User',
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: createdUser, error } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (error) {
          console.error('Error creating user profile:', error);
          return null;
        }

        userProfile = createdUser;
        console.log(`✅ Created user profile for ${newProfile.email}`);
      }

      return userProfile;
    } catch (error) {
      console.error('Error ensuring user profile:', error);
      return null;
    }
  }

  /**
   * Clear localStorage enrollment data
   */
  clearLocalStorageEnrollments(): void {
    try {
      // Clear main enrollments
      localStorage.removeItem('enrollments');
      
      // Clear user-specific enrollments
      const allKeys = Object.keys(localStorage);
      const userEnrollmentKeys = allKeys.filter(key => key.startsWith('user-enrollments-'));
      
      userEnrollmentKeys.forEach(key => {
        localStorage.removeItem(key);
      });

      console.log('✅ Cleared localStorage enrollment data');
    } catch (error) {
      console.error('Error clearing localStorage enrollments:', error);
    }
  }

  /**
   * Get statistics about localStorage enrollments
   */
  getLocalStorageStats(): { total: number; approved: number; pending: number; rejected: number } {
    const enrollments = this.getAllLocalStorageEnrollments();
    
    return {
      total: enrollments.length,
      approved: enrollments.filter((e: any) => e.status === 'approved').length,
      pending: enrollments.filter((e: any) => e.status === 'pending').length,
      rejected: enrollments.filter((e: any) => e.status === 'rejected').length
    };
  }
}

export const enrollmentRestoreService = new EnrollmentRestoreService();
