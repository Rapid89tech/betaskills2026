import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '../integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { setUser as setDataPersistenceUser } from '@/utils/comprehensiveDataPersistence';

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  approved: boolean | null;
  approval_status: string | null;
  contact_number?: string;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: string, contactNumber?: string) => Promise<any>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true); // Start with true to show loading until auth is confirmed
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('🚨 FETCHING PROFILE for userId:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.log('🚨 FETCH PROFILE ERROR:', error.code, error.message);
        return null;
      }
      
      console.log('🚨 PROFILE FETCHED SUCCESSFULLY:', data);
      return data;
    } catch (err) {
      console.error('🚨 FETCH PROFILE CATCH ERROR:', err);
      return null;
    }
  };

  const createProfile = async (user: any) => {
    try {
      console.log('🚨 CREATING PROFILE for user:', user.email);
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          first_name: user.user_metadata?.first_name || 'Student',
          last_name: user.user_metadata?.last_name || 'User',
          role: user.user_metadata?.role || 'student',
          approved: true,
          approval_status: 'approved'
        })
        .select()
        .single();

      if (error) {
        console.error('🚨 CREATE PROFILE ERROR:', error);
        return null;
      }

      console.log('🚨 PROFILE CREATED SUCCESSFULLY:', data);
      return data;
    } catch (err) {
      console.error('🚨 CREATE PROFILE CATCH ERROR:', err);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set a timeout to stop loading after 10 seconds (reduced for better UX)
    const timeoutId = setTimeout(() => {
      if (mounted) {
        console.log('⏰ Auth loading timeout - forcing stop');
        setLoading(false);
      }
    }, 10000);

    const getUser = async () => {
      try {
        // Check for cached session first
        const cachedSession = localStorage.getItem('supabase-auth-session');
        if (cachedSession) {
          try {
            const sessionData = JSON.parse(cachedSession);
            if (sessionData?.user) {
              console.log('📦 Loading cached session for:', sessionData.user.email);
              setUser(sessionData.user);
              setLoading(false);
            }
          } catch (error) {
            console.warn('Error parsing cached session:', error);
          }
        }
        
        // Get current session immediately
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        // Set user immediately if session exists
        if (session?.user) {
          console.log('🚨 Session found, user:', session.user.email);
          setUser(session.user);
          
          // Set up comprehensive data persistence
          setDataPersistenceUser(session.user.id, session.user.email || 'unknown@example.com');
          
          setLoading(false); // Stop loading immediately when we have a user
          clearTimeout(timeoutId); // Clear timeout since we have user data
          
          // Try to get profile from cache first for faster loading
          const cachedProfile = localStorage.getItem(`user-profile-${session.user.id}`);
          if (cachedProfile) {
            try {
              const profileData = JSON.parse(cachedProfile);
              console.log('📦 Loading cached profile:', profileData);
              setProfile(profileData);
              setLoading(false); // Stop loading with cached data
              clearTimeout(timeoutId); // Clear timeout since we have data
            } catch (error) {
              console.warn('Error parsing cached profile:', error);
            }
          } else {
            // Create a temporary profile immediately to prevent timeout
            console.log('🚨 No cached profile, creating temporary profile for enrollment system');
            const tempProfile = {
              id: session.user.id,
              email: session.user.email || '',
              first_name: session.user.user_metadata?.first_name || session.user.email?.split('@')[0] || 'Student',
              last_name: session.user.user_metadata?.last_name || '',
              role: (session.user.user_metadata?.role || 'student') as 'student' | 'instructor' | 'admin',
              approved: true,
              approval_status: 'approved',
              avatar_url: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            setProfile(tempProfile);
            setLoading(false); // Stop loading with temporary profile
            clearTimeout(timeoutId); // Clear timeout since we have data
          }
          
          // Fetch fresh profile data
          console.log('🚨 Fetching fresh profile...');
          let profileData = await fetchProfile(session.user.id);
          
          // If profile fetch fails, create a temporary profile for enrollment system
          if (!profileData) {
            console.log('🚨 Profile fetch failed, creating temporary profile for enrollment system');
            profileData = {
              id: session.user.id,
              email: session.user.email || '',
              first_name: session.user.user_metadata?.first_name || session.user.email?.split('@')[0] || 'Student',
              last_name: session.user.user_metadata?.last_name || '',
              role: (session.user.user_metadata?.role || 'student') as 'student' | 'instructor' | 'admin',
              approved: true,
              approval_status: 'approved',
              avatar_url: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
          }
          
          // Special handling for john.doe@gmail.com to ensure instructor role
          if (session.user.email === 'john.doe@gmail.com') {
            console.log('🔧 Special handling for john.doe@gmail.com - ensuring instructor role');
            
            // Force update or create profile with instructor role
            const { data: updatedProfile, error: updateError } = await supabase
              .from('profiles')
              .upsert({
                id: session.user.id,
                email: session.user.email,
                first_name: 'John',
                last_name: 'Doe',
                role: 'instructor',
                approved: true,
                approval_status: 'approved'
              })
              .select()
              .single();
            
            if (!updateError && updatedProfile) {
              profileData = updatedProfile;
              console.log('✅ Updated john.doe@gmail.com to instructor role:', updatedProfile);
            } else {
              console.error('❌ Error updating john.doe@gmail.com profile:', updateError);
            }
          }
          
          // If NO profile found, force create one
          if (!profileData) {
            console.log('🚨 NO PROFILE FOUND - FORCE CREATING...');
            profileData = await createProfile(session.user);
          }
          
          if (mounted && profileData) {
            console.log('🚨 Final profile data:', profileData);
            setProfile(profileData);
            setLoading(false); // Stop loading after profile is loaded
            clearTimeout(timeoutId); // Clear timeout since we have complete data
            
            // Cache the profile
            localStorage.setItem(`user-profile-${session.user.id}`, JSON.stringify(profileData));
            
            // ✅ Comprehensive data persistence already initialized above
          }
        } else {
          console.log('🚨 No session found');
          setLoading(false); // Stop loading when no session
          clearTimeout(timeoutId); // Clear timeout since we have no session
        }
      } catch (error) {
        console.error('🚨 Error in getUser:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('🚨 Auth state change event:', event, session?.user?.email);
      setUser(session?.user ?? null);
      
      // Cache session for persistence
      if (session) {
        localStorage.setItem('supabase-auth-session', JSON.stringify(session));
      } else {
        localStorage.removeItem('supabase-auth-session');
      }
      
      if (session?.user) {
        console.log('🚨 Auth state change - getting profile...');
        let profileData = await fetchProfile(session.user.id);
        
        // If NO profile found, force create one
        if (!profileData) {
          console.log('🚨 AUTH CHANGE - NO PROFILE FOUND - FORCE CREATING...');
          profileData = await createProfile(session.user);
        }
        
        if (mounted && profileData) {
          console.log('🚨 Auth change final profile data:', profileData);
          setProfile(profileData);
          
          // Cache the profile
          localStorage.setItem(`user-profile-${session.user.id}`, JSON.stringify(profileData));
          
          // ✅ Comprehensive data persistence already initialized above
        }
      } else {
        if (mounted) {
          setProfile(null);
          // Clear cached profile on logout
          const keys = Object.keys(localStorage);
          keys.forEach(key => {
            if (key.startsWith('user-profile-')) {
              localStorage.removeItem(key);
            }
          });
        }
      }
      
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        setError(error.message);
        throw error;
      }

      // ✅ Comprehensive data persistence already initialized above
      
      return data;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, role: string, contactNumber?: string) => {
    try {
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
            contact_number: contactNumber || ''
          }
        }
      });
      
      if (error) {
        setError(error.message);
        throw error;
      }
      
      return data;
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      throw err;
    }
  };

  const signOut = async () => {
    console.log('🚪 Starting enhanced logout process...');
    
    const currentUserId = user?.id;
    
    // Clear user state IMMEDIATELY for responsive UI
    setUser(null);
    setProfile(null);
    setError(null);
    
    // Enhanced logout with UserRouter session cleanup
    const forceLogout = async () => {
      console.log('🚪 Executing enhanced logout...');
      
      try {
        // UserRouter session cleanup temporarily disabled to prevent circular dependencies
        // TODO: Implement proper session cleanup without circular dependencies
        if (currentUserId) {
          console.log('✅ Session cleanup skipped to prevent circular dependencies');
        }
      } catch (routerError) {
        console.warn('⚠️ UserRouter cleanup failed (continuing):', routerError);
      }
      
      // Clear ALL user-specific data EXCEPT bulletproof data
      try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith('user-profile-') || 
              key.startsWith('user-enrollments-') ||
              key.startsWith('user-session-') ||
              key.startsWith('dashboard-preference-') ||
              key.startsWith('fallback-profile-') ||
              key.startsWith('SupabaseAuth')) {
            localStorage.removeItem(key);
          }
          // DO NOT clear bulletproof data - it persists across sessions
        });
        
        // Clear session storage too
        sessionStorage.clear();
        
        console.log('🗑️ Enhanced session cleanup completed (bulletproof data preserved)');
      } catch (cleanupError) {
        console.warn('Error during cleanup (continuing anyway):', cleanupError);
      }
      
      // Force redirect to auth page
      console.log('🔄 Redirecting to auth page...');
      window.location.replace('/auth');
    };
    
    // Set up timeout protection (3 seconds max)
    const timeoutId = setTimeout(() => {
      console.warn('⏰ Logout timeout reached, forcing logout...');
      forceLogout();
    }, 3000);
    
    try {
      // Try to sign out from Supabase with timeout
      const supabaseSignoutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Supabase signout timeout')), 2000);
      });
      
      await Promise.race([supabaseSignoutPromise, timeoutPromise]);
      console.log('✅ Supabase signout completed');
      
    } catch (supabaseError) {
      console.warn('Supabase signout failed (continuing anyway):', supabaseError);
    }
    
    // Clear the timeout since we completed successfully
    clearTimeout(timeoutId);
    
    // Execute enhanced logout
    await forceLogout();
  };

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };

  // Always render children, but let individual components handle loading states
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
