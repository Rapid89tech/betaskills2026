import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { logger } from '@/utils/logger';
import { AuditLoggingService } from '@/services/AuditLoggingService';

export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
  contact_number?: string;
  approval_status?: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  contact_number?: string;
  approval_status?: string;
}

export interface UserManagementData extends Profile {
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  login_attempts?: number;
  account_locked?: boolean;
}

export class UserManagementService {
  /**
   * Create a new user with secure password handling and audit logging
   */
  static async createUser(userData: CreateUserData, adminId?: string): Promise<UserManagementData> {
    try {
      logger.info('Creating new user:', { email: userData.email, role: userData.role });

      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
            contact_number: userData.contact_number,
            approval_status: userData.approval_status || 'pending'
          }
        }
      });

      if (authError) {
        logger.error('Auth user creation failed:', authError);
        throw new Error(`Failed to create user account: ${authError.message}`);
      }

      if (!authData.user) {
        throw new Error('User creation failed - no user data returned');
      }

      // Create or update the profile
      const profileData = {
        id: authData.user.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role,
        contact_number: userData.contact_number,
        approval_status: userData.approval_status || 'pending',
        approved: userData.approval_status === 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data: profileResult, error: profileError } = await supabase
        .from('profiles')
        .upsert(profileData)
        .select()
        .single();

      if (profileError) {
        logger.error('Profile creation failed:', profileError);
        // Try to clean up the auth user if profile creation fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error(`Failed to create user profile: ${profileError.message}`);
      }

      // Log the user creation action
      if (adminId) {
        await AuditLoggingService.logUserCreation(adminId, authData.user.id, {
          userData: {
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
            contact_number: userData.contact_number,
            approval_status: userData.approval_status
          },
          reason: 'Admin created new user account'
        });
      }

      logger.info('User created successfully:', { id: authData.user.id, email: userData.email });
      return profileResult as UserManagementData;

    } catch (error: any) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Update an existing user with audit logging
   */
  static async updateUser(userId: string, updates: UpdateUserData, adminId?: string): Promise<UserManagementData> {
    try {
      logger.info('Updating user:', { userId, updates });

      // Get current user data for audit trail
      const currentUser = await this.getUserDetails(userId);
      if (!currentUser) {
        throw new Error('User not found');
      }

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
        approved: updates.approval_status === 'approved'
      };

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('User update failed:', error);
        throw new Error(`Failed to update user: ${error.message}`);
      }

      // Log the user update action
      if (adminId) {
        const changes: Record<string, { old: any; new: any }> = {};
        
        // Track what changed
        Object.keys(updates).forEach(key => {
          const oldValue = currentUser[key as keyof UserManagementData];
          const newValue = updates[key as keyof UpdateUserData];
          if (oldValue !== newValue) {
            changes[key] = { old: oldValue, new: newValue };
          }
        });

        await AuditLoggingService.logUserUpdate(adminId, userId, {
          changes,
          reason: 'Admin updated user information'
        });
      }

      logger.info('User updated successfully:', { userId });
      return data as UserManagementData;

    } catch (error: any) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Delete a user (soft delete by updating status) with audit logging
   */
  static async deleteUser(userId: string, adminId?: string): Promise<boolean> {
    try {
      logger.info('Deleting user:', { userId });

      // Get current user data for audit trail
      const currentUser = await this.getUserDetails(userId);
      if (!currentUser) {
        throw new Error('User not found');
      }

      // First, update the profile to mark as deleted
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          approval_status: 'deleted',
          approved: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) {
        logger.error('Profile deletion failed:', profileError);
        throw new Error(`Failed to delete user profile: ${profileError.message}`);
      }

      // Optionally, you can also delete the auth user completely
      // This is more permanent and should be used carefully
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      
      if (authError) {
        logger.warn('Auth user deletion failed (profile marked as deleted):', authError);
        // Don't throw here as profile is already marked as deleted
      }

      // Log the user deletion action
      if (adminId) {
        await AuditLoggingService.logUserDeletion(adminId, userId, {
          userData: {
            email: currentUser.email,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            role: currentUser.role,
            approval_status: currentUser.approval_status
          },
          reason: 'Admin deleted user account'
        });
      }

      logger.info('User deleted successfully:', { userId });
      return true;

    } catch (error: any) {
      logger.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Get user details with extended information
   */
  static async getUserDetails(userId: string): Promise<UserManagementData | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // User not found
        }
        logger.error('Error fetching user details:', error);
        throw new Error(`Failed to fetch user details: ${error.message}`);
      }

      return data as UserManagementData;

    } catch (error: any) {
      logger.error('Error getting user details:', error);
      throw error;
    }
  }

  /**
   * Get all users with pagination and filtering
   */
  static async getUsers(options: {
    limit?: number;
    offset?: number;
    role?: string;
    status?: string;
    search?: string;
  } = {}): Promise<UserManagementData[]> {
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .neq('approval_status', 'deleted') // Exclude deleted users
        .order('created_at', { ascending: false });

      // Apply filters
      if (options.role) {
        query = query.eq('role', options.role);
      }

      if (options.status) {
        query = query.eq('approval_status', options.status);
      }

      if (options.search) {
        query = query.or(`first_name.ilike.%${options.search}%,last_name.ilike.%${options.search}%,email.ilike.%${options.search}%`);
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('Error fetching users:', error);
        throw new Error(`Failed to fetch users: ${error.message}`);
      }

      return (data || []) as UserManagementData[];

    } catch (error: any) {
      logger.error('Error getting users:', error);
      throw error;
    }
  }

  /**
   * Update user password with enhanced validation
   */
  static async updateUserPassword(
    userId: string, 
    newPassword: string,
    userInfo?: { email?: string; firstName?: string; lastName?: string }
  ): Promise<boolean> {
    try {
      logger.info('Updating user password:', { userId });

      // Use enhanced password management service for validation and update
      const { success } = await import('@/services/PasswordManagementService')
        .then(module => module.PasswordManagementService.updateUserPassword(userId, newPassword, userInfo));

      if (!success) {
        throw new Error('Password validation failed');
      }

      logger.info('Password updated successfully:', { userId });
      return true;

    } catch (error: any) {
      logger.error('Error updating password:', error);
      throw error;
    }
  }

  /**
   * Validate user data
   */
  static validateUserData(userData: Partial<CreateUserData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!userData.first_name?.trim()) {
      errors.push('First name is required');
    }

    if (!userData.last_name?.trim()) {
      errors.push('Last name is required');
    }

    if (!userData.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.push('Invalid email format');
    }

    if (!userData.role) {
      errors.push('Role is required');
    } else if (!['student', 'instructor', 'admin'].includes(userData.role)) {
      errors.push('Invalid role');
    }

    if (userData.contact_number && !/^[\d\s\-\+\(\)]+$/.test(userData.contact_number)) {
      errors.push('Invalid contact number format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate secure password using enhanced service
   */
  static generateSecurePassword(): string {
    // Use dynamic import to avoid circular dependencies
    return require('@/services/PasswordManagementService').PasswordManagementService.generateSecurePassword({
      length: 12,
      excludeSimilar: true
    });
  }
}