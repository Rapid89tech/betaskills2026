// Script to grant full access to maxmon2@gmail.com
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const courses = [
  'cybersecurity101',
  'emotional-intelligence',
  'prophet',
  'entrepreneurship-final',
  'ai-assisted-programming',
  'ai-assisted-web-development',
  'christian-teacher',
  'podcast-management-101',
  'sound-engineering-102',
  'computer-repairs',
  'roofing',
  'plumbing',
  'tiling-101',
  'hair-dressing',
  'nail-technician',
  'petrol-motor-mechanic',
  'diesel-motor-mechanic',
  'landscaping',
  'social-media-marketing-101',
  'master-electrician-online',
  'beauty-therapy-101',
  'dog-grooming-101'
];

async function grantFullAccess() {
  console.log('🔍 Looking up user: maxmon2@gmail.com...');
  
  // Get user ID
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', 'maxmon2@gmail.com')
    .limit(1);

  if (userError) {
    console.error('❌ Error finding user:', userError);
    
    // Try auth.users table
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error accessing auth users:', authError);
      return;
    }
    
    const user = authData.users.find(u => u.email === 'maxmon2@gmail.com');
    
    if (!user) {
      console.error('❌ User maxmon2@gmail.com not found');
      return;
    }
    
    console.log('✅ Found user:', user.id);
    await enrollUserInCourses(user.id);
    return;
  }

  if (!users || users.length === 0) {
    console.error('❌ User maxmon2@gmail.com not found');
    return;
  }

  const userId = users[0].id;
  console.log('✅ Found user:', userId);
  
  await enrollUserInCourses(userId);
}

async function enrollUserInCourses(userId) {
  console.log(`\n📚 Enrolling user in ${courses.length} courses...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const courseId of courses) {
    const { data, error } = await supabase
      .from('enrollments')
      .upsert({
        user_id: userId,
        course_id: courseId,
        status: 'active',
        enrolled_at: new Date().toISOString(),
        progress: 0,
        payment_status: 'completed'
      }, {
        onConflict: 'user_id,course_id'
      });

    if (error) {
      console.error(`❌ Error enrolling in ${courseId}:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Enrolled in: ${courseId}`);
      successCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount} courses`);
  console.log(`   ❌ Errors: ${errorCount} courses`);
  console.log(`\n🎉 Done! User maxmon2@gmail.com now has access to all courses.`);
  console.log(`   Course cards will show "Continue" button instead of "Enroll Now"`);
}

// Run the script
grantFullAccess().catch(console.error);
