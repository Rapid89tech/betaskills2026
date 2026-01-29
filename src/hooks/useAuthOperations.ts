import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export const useAuthOperations = () => {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, firstName: string, lastName: string, role: string) => {
    try {
      console.log('Starting signup process for role:', role);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Create user profile in Firestore
      await setDoc(doc(db, 'profiles', user.uid), {
        email,
        first_name: firstName,
        last_name: lastName,
        role,
        created_at: new Date().toISOString(),
      });
      toast({
        title: 'Success!',
        description: 'Account created successfully. Please wait for admin approval.',
      });
      return user;
    } catch (error: any) {
      console.error('Auth error details:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting signin process');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Welcome back!',
        description: 'You have been logged in successfully.',
      });
      return userCredential.user;
    } catch (error: any) {
      console.error('Signin error details:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting signout process');
      await firebaseSignOut(auth);
      toast({
        title: 'Signed out',
        description: 'You have been logged out successfully.',
      });
      window.location.href = '/';
    } catch (error: any) {
      console.error('Signout error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Reset email sent',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send reset email',
        variant: 'destructive',
      });
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    resetPassword
  };
};
