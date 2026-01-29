import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function populateDatabaseDirect() {
  try {
    console.log('🚀 Starting direct database population...');
    
    // Create profiles
    console.log('👥 Creating user profiles...');
    
    const profiles = [
      // Admin Users
      { id: 'admin-001', email: 'admin@betaskill.com', first_name: 'Dr. Russon', last_name: 'Nkuna', role: 'admin', approved: true, approval_status: 'approved', contact_number: '+27 82 123 4567' },
      { id: 'admin-002', email: 'manager@betaskill.com', first_name: 'Sarah', last_name: 'Johnson', role: 'admin', approved: true, approval_status: 'approved', contact_number: '+27 82 234 5678' },
      
      // Instructors
      { id: 'instructor-001', email: 'instructor.tech@betaskill.com', first_name: 'Michael', last_name: 'Chen', role: 'instructor', approved: true, approval_status: 'approved', contact_number: '+27 82 345 6789' },
      { id: 'instructor-002', email: 'instructor.business@betaskill.com', first_name: 'Lisa', last_name: 'Thompson', role: 'instructor', approved: true, approval_status: 'approved', contact_number: '+27 82 456 7890' },
      { id: 'instructor-003', email: 'instructor.trades@betaskill.com', first_name: 'David', last_name: 'Williams', role: 'instructor', approved: true, approval_status: 'approved', contact_number: '+27 82 567 8901' },
      
      // Students (Approved)
      { id: 'student-001', email: 'john.doe@gmail.com', first_name: 'John', last_name: 'Doe', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 678 9012' },
      { id: 'student-002', email: 'jane.smith@gmail.com', first_name: 'Jane', last_name: 'Smith', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 789 0123' },
      { id: 'student-003', email: 'mike.wilson@gmail.com', first_name: 'Mike', last_name: 'Wilson', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 890 1234' },
      { id: 'student-004', email: 'sarah.brown@gmail.com', first_name: 'Sarah', last_name: 'Brown', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 901 2345' },
      { id: 'student-005', email: 'alex.jones@gmail.com', first_name: 'Alex', last_name: 'Jones', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 012 3456' },
      { id: 'student-006', email: 'emma.davis@gmail.com', first_name: 'Emma', last_name: 'Davis', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 123 4567' },
      { id: 'student-007', email: 'james.miller@gmail.com', first_name: 'James', last_name: 'Miller', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 234 5678' },
      { id: 'student-008', email: 'olivia.garcia@gmail.com', first_name: 'Olivia', last_name: 'Garcia', role: 'student', approved: true, approval_status: 'approved', contact_number: '+27 82 345 6789' },
      
      // Students (Pending)
      { id: 'student-009', email: 'robert.taylor@gmail.com', first_name: 'Robert', last_name: 'Taylor', role: 'student', approved: false, approval_status: 'pending', contact_number: '+27 82 456 7890' },
      { id: 'student-010', email: 'sophia.anderson@gmail.com', first_name: 'Sophia', last_name: 'Anderson', role: 'student', approved: false, approval_status: 'pending', contact_number: '+27 82 567 8901' },
      { id: 'student-011', email: 'william.thomas@gmail.com', first_name: 'William', last_name: 'Thomas', role: 'student', approved: false, approval_status: 'pending', contact_number: '+27 82 678 9012' },
      { id: 'student-012', email: 'ava.jackson@gmail.com', first_name: 'Ava', last_name: 'Jackson', role: 'student', approved: false, approval_status: 'pending', contact_number: '+27 82 789 0123' },
      
      // Students (Rejected)
      { id: 'student-013', email: 'daniel.white@gmail.com', first_name: 'Daniel', last_name: 'White', role: 'student', approved: false, approval_status: 'rejected', contact_number: '+27 82 890 1234' },
      { id: 'student-014', email: 'mia.martin@gmail.com', first_name: 'Mia', last_name: 'Martin', role: 'student', approved: false, approval_status: 'rejected', contact_number: '+27 82 901 2345' }
    ];
    
    for (const profile of profiles) {
      const { error } = await supabase
        .from('profiles')
        .upsert(profile, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Error inserting profile ${profile.email}:`, error);
      } else {
        console.log(`✅ Profile created: ${profile.first_name} ${profile.last_name}`);
      }
    }
    
    // Create enrollments
    console.log('\n📚 Creating course enrollments...');
    
    const enrollments = [
      // Approved Enrollments
      { id: 'enrollment-001', user_id: 'student-001', user_email: 'john.doe@gmail.com', course_id: 'entrepreneurship-final', course_title: 'Entrepreneurship', status: 'approved', progress: 75, proof_of_payment: 'https://example.com/payment1.pdf', payment_ref: 'PAY001' },
      { id: 'enrollment-002', user_id: 'student-002', user_email: 'jane.smith@gmail.com', course_id: 'ai-human-relations', course_title: 'AI and Human Relations', status: 'approved', progress: 45, proof_of_payment: 'https://example.com/payment2.pdf', payment_ref: 'PAY002' },
      { id: 'enrollment-003', user_id: 'student-003', user_email: 'mike.wilson@gmail.com', course_id: 'roofing101', course_title: 'Roofing 101', status: 'approved', progress: 90, proof_of_payment: 'https://example.com/payment3.pdf', payment_ref: 'PAY003' },
      { id: 'enrollment-004', user_id: 'student-004', user_email: 'sarah.brown@gmail.com', course_id: 'plumbing101', course_title: 'Plumbing 101', status: 'approved', progress: 30, proof_of_payment: 'https://example.com/payment4.pdf', payment_ref: 'PAY004' },
      { id: 'enrollment-005', user_id: 'student-005', user_email: 'alex.jones@gmail.com', course_id: 'podcast-management-101', course_title: 'Mastering Podcast Management', status: 'approved', progress: 60, proof_of_payment: 'https://example.com/payment5.pdf', payment_ref: 'PAY005' },
      
      // Pending Enrollments
      { id: 'enrollment-006', user_id: 'student-009', user_email: 'robert.taylor@gmail.com', course_id: 'computer-repairs', course_title: 'Computer & Laptop Repairs', status: 'pending', progress: 0, proof_of_payment: 'https://example.com/payment6.pdf', payment_ref: 'PAY006' },
      { id: 'enrollment-007', user_id: 'student-010', user_email: 'sophia.anderson@gmail.com', course_id: 'hair-dressing', course_title: 'Hair Dressing', status: 'pending', progress: 0, proof_of_payment: 'https://example.com/payment7.pdf', payment_ref: 'PAY007' },
      { id: 'enrollment-008', user_id: 'student-011', user_email: 'william.thomas@gmail.com', course_id: 'nail-technician', course_title: 'Nail Technician', status: 'pending', progress: 0, proof_of_payment: 'https://example.com/payment8.pdf', payment_ref: 'PAY008' },
      { id: 'enrollment-009', user_id: 'student-012', user_email: 'ava.jackson@gmail.com', course_id: 'sound-engineering', course_title: 'Sound Engineering', status: 'pending', progress: 0, proof_of_payment: 'https://example.com/payment9.pdf', payment_ref: 'PAY009' },
      
      // Rejected Enrollments
      { id: 'enrollment-010', user_id: 'student-013', user_email: 'daniel.white@gmail.com', course_id: 'tiling-101', course_title: 'Tiling 101', status: 'rejected', progress: 0, proof_of_payment: 'https://example.com/payment10.pdf', payment_ref: 'PAY010' },
      { id: 'enrollment-011', user_id: 'student-014', user_email: 'mia.martin@gmail.com', course_id: 'motor-mechanic-petrol-02', course_title: 'Motor Mechanic (Petrol) - Advanced', status: 'rejected', progress: 0, proof_of_payment: 'https://example.com/payment11.pdf', payment_ref: 'PAY011' }
    ];
    
    for (const enrollment of enrollments) {
      const { error } = await supabase
        .from('enrollments')
        .upsert(enrollment, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Error inserting enrollment ${enrollment.id}:`, error);
      } else {
        console.log(`✅ Enrollment created: ${enrollment.course_title} - ${enrollment.user_email}`);
      }
    }
    
    console.log('\n🎉 Database population completed successfully!');
    console.log('You can now access your admin dashboard with real data.');
    
  } catch (error) {
    console.error('❌ Error populating database:', error);
    process.exit(1);
  }
}

// Run the population
populateDatabaseDirect();
