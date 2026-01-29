import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateUserRole() {
  try {
    console.log('Updating user role for john.doe@gmail.com...');
    
    // First, find the user by email
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'john.doe@gmail.com')
      .single();

    if (userError) {
      console.error('Error finding user:', userError);
      return;
    }

    if (!user) {
      console.log('User john.doe@gmail.com not found in profiles table');
      return;
    }

    console.log('Found user:', user);

    // Update the user's role to instructor
    const { data: updatedUser, error: updateError } = await supabase
      .from('profiles')
      .update({ 
        role: 'instructor',
        approved: true,
        approval_status: 'approved'
      })
      .eq('email', 'john.doe@gmail.com')
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user role:', updateError);
      return;
    }

    console.log('Successfully updated user role to instructor:', updatedUser);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

updateUserRole();
