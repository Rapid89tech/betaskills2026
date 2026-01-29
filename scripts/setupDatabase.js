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

async function setupDatabase() {
  try {
    console.log('Setting up database tables...');
    
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (profilesError) {
      console.error('Error creating profiles table:', profilesError);
    } else {
      console.log('Profiles table created successfully');
    }

    // Create enrollments table
    const { error: enrollmentsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.enrollments (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL,
          user_email TEXT NOT NULL,
          course_id TEXT NOT NULL,
          course_title TEXT NOT NULL,
          proof_of_payment TEXT,
          payment_ref TEXT,
          payment_date TEXT,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
          enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          approved_at TIMESTAMP WITH TIME ZONE,
          progress INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (enrollmentsError) {
      console.error('Error creating enrollments table:', enrollmentsError);
    } else {
      console.log('Enrollments table created successfully');
    }

    // Create or update user john.doe@gmail.com with instructor role
    console.log('Creating/updating john.doe@gmail.com as instructor...');
    
    // First, check if user exists in auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return;
    }

    const johnDoeUser = users.find(user => user.email === 'john.doe@gmail.com');
    
    if (johnDoeUser) {
      console.log('Found john.doe@gmail.com in auth, updating profile...');
      
      // Update or create profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: johnDoeUser.id,
          email: 'john.doe@gmail.com',
          first_name: 'John',
          last_name: 'Doe',
          role: 'instructor',
          approved: true,
          approval_status: 'approved'
        })
        .select()
        .single();

      if (profileError) {
        console.error('Error updating profile:', profileError);
      } else {
        console.log('Successfully updated john.doe@gmail.com to instructor role:', profile);
      }
    } else {
      console.log('john.doe@gmail.com not found in auth users');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupDatabase();
