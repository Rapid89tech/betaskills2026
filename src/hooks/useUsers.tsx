import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Define Profile interface locally since it's not exported from types/auth
interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  approved?: boolean;
  approval_status?: string;
  contactNumber?: string;
  created_at: string;
  updated_at: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: string;
  enrolled_at: string;
  approved_at?: string;
  progress: number;
  proof_of_payment?: string;
  payment_ref?: string;
  payment_date?: string;
}

interface EnhancedProfile extends Profile {
  enrollments?: Enrollment[];
  totalCourses?: number;
  completedCourses?: number;
  averageProgress?: number;
}

export const useUsers = () => {
  const [users, setUsers] = useState<EnhancedProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const fetchEnrollments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      return [];
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      console.log('🔍 useUsers: Starting to fetch users...');
      
      // Try a simpler query first to test connection
      console.log('🔍 useUsers: Testing basic connection...');
      const { data: testData, error: testError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      console.log('📊 useUsers: Test query result:', { testData: testData?.length, testError });
      
      if (testError) {
        console.error('❌ useUsers: Test query failed:', testError);
        throw testError;
      }
      
      // If test passes, fetch full data
      console.log('🔍 useUsers: Test passed, fetching full data...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*, approved, approval_status')
        .order('created_at', { ascending: false });

      console.log('📊 useUsers: Fetch users result:', { data: data?.length, error });

      if (error) {
        console.error('❌ useUsers: Error fetching users:', error);
        throw error;
      }
      
      // Fetch enrollments
      console.log('🔍 useUsers: Fetching enrollments...');
      const enrollmentData = await fetchEnrollments();
      console.log('📊 useUsers: Enrollment data:', enrollmentData?.length);
      
      // Enhance users with enrollment data
      const enhancedUsers = (data as Profile[] || []).map(user => {
        const userEnrollments = enrollmentData.filter(e => e.user_id === user.id);
        const totalCourses = userEnrollments.length;
        const completedCourses = userEnrollments.filter(e => e.progress === 100).length;
        const averageProgress = totalCourses > 0 
          ? Math.round(userEnrollments.reduce((sum, e) => sum + e.progress, 0) / totalCourses)
          : 0;

        return {
          ...user,
          enrollments: userEnrollments,
          totalCourses,
          completedCourses,
          averageProgress
        };
      });
      
      console.log('✅ useUsers: Enhanced users:', enhancedUsers.length);
      setUsers(enhancedUsers);
    } catch (error) {
      console.error('❌ useUsers: Error fetching users:', error);
      // Set empty array on error to prevent infinite loading
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [fetchEnrollments]);

  const createUser = useCallback(async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
    contactNumber?: string;
  }) => {
    try {
      // Create user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
            contactNumber: userData.contactNumber || ''
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile manually if needed
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
            contactNumber: userData.contactNumber || '',
            approved: true,
            approval_status: 'approved'
          });

        if (profileError) throw profileError;

        // Refresh users list
        await fetchUsers();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (userId: string, userData: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', userId);

      if (error) throw error;

      // Refresh users list
      await fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      // Delete user's enrollments first
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .delete()
        .eq('user_id', userId);

      if (enrollmentError) {
        console.warn('Error deleting user enrollments:', enrollmentError);
      }

      // Delete user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      // Refresh users list
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }, [fetchUsers]);

  const approveUser = useCallback(async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          approved: true, 
          approval_status: 'approved' 
        })
        .eq('id', userId);

      if (error) throw error;

      // Refresh users list
      await fetchUsers();
    } catch (error) {
      console.error('Error approving user:', error);
      throw error;
    }
  }, [fetchUsers]);

  const rejectUser = useCallback(async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          approved: false, 
          approval_status: 'rejected' 
        })
        .eq('id', userId);

      if (error) throw error;

      // Refresh users list
      await fetchUsers();
    } catch (error) {
      console.error('Error rejecting user:', error);
      throw error;
    }
  }, [fetchUsers]);

  const approveEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ 
          status: 'approved', 
          approved_at: new Date().toISOString() 
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      // Refresh data
      await fetchUsers();
    } catch (error) {
      console.error('Error approving enrollment:', error);
      throw error;
    }
  }, [fetchUsers]);

  const rejectEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ 
          status: 'rejected', 
          approved_at: new Date().toISOString() 
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      // Refresh data
      await fetchUsers();
    } catch (error) {
      console.error('Error rejecting enrollment:', error);
      throw error;
    }
  }, [fetchUsers]);

  return {
    users,
    enrollments,
    loading,
    fetchUsers,
    fetchEnrollments,
    createUser,
    updateUser,
    deleteUser,
    approveUser,
    rejectUser,
    approveEnrollment,
    rejectEnrollment
  };
};