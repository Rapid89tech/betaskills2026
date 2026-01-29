import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

export const useProfileData = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (userId: string) => {
    setLoading(true);
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*, approved, approval_status')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        
        // If profile not found, try to create it from user metadata
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.id !== userId) {
          console.error('User not found or ID mismatch');
          setLoading(false);
          return;
        }

        console.log('Profile not found, waiting for database trigger to create it...');
        
        // Wait a moment for the trigger to create the profile, then retry
        setTimeout(async () => {
          console.log('Retrying profile fetch after trigger delay...');
          const { data: retryData, error: retryError } = await supabase
            .from('profiles')
            .select('*, approved, approval_status')
            .eq('id', userId)
            .single();

          if (retryError) {
            console.error('Profile still not found after retry:', retryError);
            // Create a temporary profile from user metadata as fallback
            const userMetadata = user.user_metadata;
            const tempProfile: Profile = {
              id: user.id,
              email: user.email || '',
              first_name: userMetadata?.first_name || 'User',
              last_name: userMetadata?.last_name || '',
              role: (userMetadata?.role || 'student') as 'student' | 'instructor' | 'admin',
              avatar_url: userMetadata?.avatar_url || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              approved: true,
              approval_status: 'approved'
            };
            setProfile(tempProfile);
          } else {
            console.log('Profile found after retry:', retryData);
            const profileData: Profile = {
              ...retryData,
              role: retryData.role as 'student' | 'instructor' | 'admin'
            };
            setProfile(profileData);
          }
        }, 1000); // Wait 1 second for trigger

        setLoading(false);
        return;
      }

      if (data) {
        console.log('Profile fetched successfully:', data);
        // Ensure role is properly typed when setting profile
        const profileData: Profile = {
          ...data,
          role: data.role as 'student' | 'instructor' | 'admin'
        };

        setProfile(profileData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      // As a last resort, try to get user data and create a minimal profile
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.id === userId) {
          console.log('Creating fallback profile from auth user');
          const userMetadata = user.user_metadata;
          const fallbackProfile: Profile = {
            id: user.id,
            email: user.email || '',
            first_name: userMetadata?.first_name || 'User',
            last_name: userMetadata?.last_name || '',
            role: (userMetadata?.role || 'student') as 'student' | 'instructor' | 'admin',
            avatar_url: userMetadata?.avatar_url || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            approved: true,
            approval_status: 'approved'
          };
          setProfile(fallbackProfile);
        }
      } catch (fallbackError) {
        console.error('Fallback profile creation failed:', fallbackError);
      }
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setProfile(null);
    // Clear any cached profile data
    localStorage.removeItem('profile');
  };

  const refreshProfile = async (userId: string) => {
    console.log('Refreshing profile for user:', userId);
    await fetchProfile(userId);
  };

  return {
    profile,
    fetchProfile,
    clearProfile,
    setProfile,
    refreshProfile,
    loading
  };
};
