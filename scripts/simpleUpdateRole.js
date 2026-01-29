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
    console.log('Attempting to update john.doe@gmail.com to instructor role...');
    
    // First, let's check what tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (tablesError) {
      console.error('Error checking tables:', tablesError);
      return;
    }

    console.log('Available tables:', tables?.map(t => t.table_name));

    // Try to find the user in profiles table
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'john.doe@gmail.com')
      .single();

    if (userError) {
      console.error('Error finding user:', userError);
      
      // If profiles table doesn't exist, let's create it
      if (userError.code === '42P01') {
        console.log('Profiles table does not exist. Creating it...');
        
        // We'll need to run this SQL directly in Supabase dashboard
        console.log(`
          Please run this SQL in your Supabase SQL Editor:
          
          CREATE TABLE IF NOT EXISTS public.profiles (
            id UUID PRIMARY KEY,
            email TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT,
            role TEXT DEFAULT 'student',
            approved BOOLEAN DEFAULT false,
            approval_status TEXT DEFAULT 'pending',
            avatar_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          -- Then insert john.doe@gmail.com as instructor
          INSERT INTO public.profiles (id, email, first_name, last_name, role, approved, approval_status)
          VALUES (gen_random_uuid(), 'john.doe@gmail.com', 'John', 'Doe', 'instructor', true, 'approved')
          ON CONFLICT (email) DO UPDATE SET 
            role = 'instructor',
            approved = true,
            approval_status = 'approved';
        `);
      }
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
