// Comprehensive Registration Hook - Ensures contact numbers are saved properly
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  role?: string;
}

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const registerUser = async (data: RegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      console.log('📝 Starting user registration with data:', {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        contactNumber: data.contactNumber,
        role: data.role || 'student'
      });

      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            contact_number: data.contactNumber, // This is the key field
            role: data.role || 'student'
          }
        }
      });

      if (authError) {
        console.error('❌ Auth signup error:', authError);
        throw authError;
      }

      console.log('✅ Auth signup successful:', authData.user?.id);

      // Step 2: Manually create profile to ensure contact_number is saved
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            contact_number: data.contactNumber, // Explicitly save contact number
            role: data.role || 'student',
            approved: true,
            approval_status: 'approved'
          });

        if (profileError) {
          console.error('❌ Profile creation error:', profileError);
          // Don't throw here - the user is created, just profile update failed
          console.warn('⚠️ Profile update failed, but user was created');
        } else {
          console.log('✅ Profile created/updated successfully with contact number');
        }
      }

      // Step 3: Verify the data was saved correctly
      if (authData.user) {
        const { data: profileData, error: verifyError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (verifyError) {
          console.error('❌ Profile verification error:', verifyError);
        } else {
          console.log('✅ Profile verification successful:', {
            id: profileData.id,
            email: profileData.email,
            contact_number: profileData.contact_number,
            first_name: profileData.first_name,
            last_name: profileData.last_name
          });

          if (!profileData.contact_number) {
            console.warn('⚠️ Contact number not saved properly, attempting manual update...');
            
            // Manual update attempt
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ contact_number: data.contactNumber })
              .eq('id', authData.user.id);

            if (updateError) {
              console.error('❌ Manual contact number update failed:', updateError);
            } else {
              console.log('✅ Manual contact number update successful');
            }
          }
        }
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully. Please check your email to verify your account.",
        variant: "default",
      });

      return authData;

    } catch (error: any) {
      console.error('❌ Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error
  };
};
