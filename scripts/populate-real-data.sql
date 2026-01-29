-- Populate Real Data for Admin Dashboard
-- This script will create real users and enrollments for testing the admin dashboard

-- First, let's create some real user profiles
INSERT INTO public.profiles (id, email, first_name, last_name, role, approved, approval_status, contact_number, created_at, updated_at)
VALUES 
  -- Admin Users
  ('admin-001', 'admin@betaskill.com', 'Dr. Russon', 'Nkuna', 'admin', true, 'approved', '+27 82 123 4567', NOW() - INTERVAL '30 days', NOW()),
  ('admin-002', 'manager@betaskill.com', 'Sarah', 'Johnson', 'admin', true, 'approved', '+27 82 234 5678', NOW() - INTERVAL '25 days', NOW()),
  
  -- Instructors
  ('instructor-001', 'instructor.tech@betaskill.com', 'Michael', 'Chen', 'instructor', true, 'approved', '+27 82 345 6789', NOW() - INTERVAL '20 days', NOW()),
  ('instructor-002', 'instructor.business@betaskill.com', 'Lisa', 'Thompson', 'instructor', true, 'approved', '+27 82 456 7890', NOW() - INTERVAL '18 days', NOW()),
  ('instructor-003', 'instructor.trades@betaskill.com', 'David', 'Williams', 'instructor', true, 'approved', '+27 82 567 8901', NOW() - INTERVAL '15 days', NOW()),
  
  -- Students (Approved)
  ('student-001', 'john.doe@gmail.com', 'John', 'Doe', 'student', true, 'approved', '+27 82 678 9012', NOW() - INTERVAL '14 days', NOW()),
  ('student-002', 'jane.smith@gmail.com', 'Jane', 'Smith', 'student', true, 'approved', '+27 82 789 0123', NOW() - INTERVAL '12 days', NOW()),
  ('student-003', 'mike.wilson@gmail.com', 'Mike', 'Wilson', 'student', true, 'approved', '+27 82 890 1234', NOW() - INTERVAL '10 days', NOW()),
  ('student-004', 'sarah.brown@gmail.com', 'Sarah', 'Brown', 'student', true, 'approved', '+27 82 901 2345', NOW() - INTERVAL '8 days', NOW()),
  ('student-005', 'alex.jones@gmail.com', 'Alex', 'Jones', 'student', true, 'approved', '+27 82 012 3456', NOW() - INTERVAL '6 days', NOW()),
  ('student-006', 'emma.davis@gmail.com', 'Emma', 'Davis', 'student', true, 'approved', '+27 82 123 4567', NOW() - INTERVAL '5 days', NOW()),
  ('student-007', 'james.miller@gmail.com', 'James', 'Miller', 'student', true, 'approved', '+27 82 234 5678', NOW() - INTERVAL '4 days', NOW()),
  ('student-008', 'olivia.garcia@gmail.com', 'Olivia', 'Garcia', 'student', true, 'approved', '+27 82 345 6789', NOW() - INTERVAL '3 days', NOW()),
  
  -- Students (Pending Approval)
  ('student-009', 'robert.taylor@gmail.com', 'Robert', 'Taylor', 'student', false, 'pending', '+27 82 456 7890', NOW() - INTERVAL '2 days', NOW()),
  ('student-010', 'sophia.anderson@gmail.com', 'Sophia', 'Anderson', 'student', false, 'pending', '+27 82 567 8901', NOW() - INTERVAL '1 day', NOW()),
  ('student-011', 'william.thomas@gmail.com', 'William', 'Thomas', 'student', false, 'pending', '+27 82 678 9012', NOW() - INTERVAL '12 hours', NOW()),
  ('student-012', 'ava.jackson@gmail.com', 'Ava', 'Jackson', 'student', false, 'pending', '+27 82 789 0123', NOW() - INTERVAL '6 hours', NOW()),
  
  -- Students (Rejected)
  ('student-013', 'daniel.white@gmail.com', 'Daniel', 'White', 'student', false, 'rejected', '+27 82 890 1234', NOW() - INTERVAL '5 days', NOW()),
  ('student-014', 'mia.martin@gmail.com', 'Mia', 'Martin', 'student', false, 'rejected', '+27 82 901 2345', NOW() - INTERVAL '3 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- Now let's create real course enrollments
INSERT INTO public.enrollments (id, user_id, user_email, course_id, course_title, status, enrolled_at, approved_at, progress, proof_of_payment, payment_ref, payment_date, created_at, updated_at)
VALUES 
  -- Approved Enrollments with Progress
  ('enrollment-001', 'student-001', 'john.doe@gmail.com', 'entrepreneurship-final', 'Entrepreneurship', 'approved', NOW() - INTERVAL '10 days', NOW() - INTERVAL '8 days', 75, 'https://example.com/payment1.pdf', 'PAY001', '2024-01-15', NOW() - INTERVAL '10 days', NOW()),
  ('enrollment-002', 'student-002', 'jane.smith@gmail.com', 'ai-human-relations', 'AI and Human Relations', 'approved', NOW() - INTERVAL '8 days', NOW() - INTERVAL '6 days', 45, 'https://example.com/payment2.pdf', 'PAY002', '2024-01-17', NOW() - INTERVAL '8 days', NOW()),
  ('enrollment-003', 'student-003', 'mike.wilson@gmail.com', 'roofing101', 'Roofing 101', 'approved', NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days', 90, 'https://example.com/payment3.pdf', 'PAY003', '2024-01-18', NOW() - INTERVAL '7 days', NOW()),
  ('enrollment-004', 'student-004', 'sarah.brown@gmail.com', 'plumbing101', 'Plumbing 101', 'approved', NOW() - INTERVAL '6 days', NOW() - INTERVAL '4 days', 30, 'https://example.com/payment4.pdf', 'PAY004', '2024-01-19', NOW() - INTERVAL '6 days', NOW()),
  ('enrollment-005', 'student-005', 'alex.jones@gmail.com', 'podcast-management-101', 'Mastering Podcast Management', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days', 60, 'https://example.com/payment5.pdf', 'PAY005', '2024-01-20', NOW() - INTERVAL '5 days', NOW()),
  ('enrollment-006', 'student-006', 'emma.davis@gmail.com', 'motor-mechanic-petrol', 'Motor Mechanic (Petrol)', 'approved', NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', 15, 'https://example.com/payment6.pdf', 'PAY006', '2024-01-21', NOW() - INTERVAL '4 days', NOW()),
  ('enrollment-007', 'student-007', 'james.miller@gmail.com', 'diesel-mechanic', 'Motor Mechanic (Diesel)', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day', 100, 'https://example.com/payment7.pdf', 'PAY007', '2024-01-22', NOW() - INTERVAL '3 days', NOW()),
  ('enrollment-008', 'student-008', 'olivia.garcia@gmail.com', 'cellphone-repairs', 'Cellphone Repairs and Maintenance', 'approved', NOW() - INTERVAL '2 days', NOW() - INTERVAL '12 hours', 25, 'https://example.com/payment8.pdf', 'PAY008', '2024-01-23', NOW() - INTERVAL '2 days', NOW()),
  
  -- Multiple enrollments for same student
  ('enrollment-009', 'student-001', 'john.doe@gmail.com', 'ai-human-relations', 'AI and Human Relations', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days', 40, 'https://example.com/payment9.pdf', 'PAY009', '2024-01-20', NOW() - INTERVAL '5 days', NOW()),
  ('enrollment-010', 'student-002', 'jane.smith@gmail.com', 'roofing101', 'Roofing 101', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day', 20, 'https://example.com/payment10.pdf', 'PAY010', '2024-01-22', NOW() - INTERVAL '3 days', NOW()),
  
  -- Pending Enrollments
  ('enrollment-011', 'student-009', 'robert.taylor@gmail.com', 'computer-repairs', 'Computer & Laptop Repairs', 'pending', NOW() - INTERVAL '1 day', NULL, 0, 'https://example.com/payment11.pdf', 'PAY011', '2024-01-24', NOW() - INTERVAL '1 day', NOW()),
  ('enrollment-012', 'student-010', 'sophia.anderson@gmail.com', 'hair-dressing', 'Hair Dressing', 'pending', NOW() - INTERVAL '12 hours', NULL, 0, 'https://example.com/payment12.pdf', 'PAY012', '2024-01-24', NOW() - INTERVAL '12 hours', NOW()),
  ('enrollment-013', 'student-011', 'william.thomas@gmail.com', 'nail-technician', 'Nail Technician', 'pending', NOW() - INTERVAL '6 hours', NULL, 0, 'https://example.com/payment13.pdf', 'PAY013', '2024-01-24', NOW() - INTERVAL '6 hours', NOW()),
  ('enrollment-014', 'student-012', 'ava.jackson@gmail.com', 'sound-engineering', 'Sound Engineering', 'pending', NOW() - INTERVAL '2 hours', NULL, 0, 'https://example.com/payment14.pdf', 'PAY014', '2024-01-24', NOW() - INTERVAL '2 hours', NOW()),
  
  -- Rejected Enrollments
  ('enrollment-015', 'student-013', 'daniel.white@gmail.com', 'tiling-101', 'Tiling 101', 'rejected', NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days', 0, 'https://example.com/payment15.pdf', 'PAY015', '2024-01-20', NOW() - INTERVAL '4 days', NOW()),
  ('enrollment-016', 'student-014', 'mia.martin@gmail.com', 'motor-mechanic-petrol-02', 'Motor Mechanic (Petrol) - Advanced', 'rejected', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 0, 'https://example.com/payment16.pdf', 'PAY016', '2024-01-22', NOW() - INTERVAL '2 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- Create some additional enrollments for variety
INSERT INTO public.enrollments (id, user_id, user_email, course_id, course_title, status, enrolled_at, approved_at, progress, proof_of_payment, payment_ref, payment_date, created_at, updated_at)
VALUES 
  -- More approved enrollments
  ('enrollment-017', 'student-003', 'mike.wilson@gmail.com', 'plumbing101', 'Plumbing 101', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day', 55, 'https://example.com/payment17.pdf', 'PAY017', '2024-01-22', NOW() - INTERVAL '3 days', NOW()),
  ('enrollment-018', 'student-004', 'sarah.brown@gmail.com', 'podcast-management-101', 'Mastering Podcast Management', 'approved', NOW() - INTERVAL '2 days', NOW() - INTERVAL '12 hours', 35, 'https://example.com/payment18.pdf', 'PAY018', '2024-01-23', NOW() - INTERVAL '2 days', NOW()),
  ('enrollment-019', 'student-005', 'alex.jones@gmail.com', 'motor-mechanic-petrol', 'Motor Mechanic (Petrol)', 'approved', NOW() - INTERVAL '1 day', NOW() - INTERVAL '6 hours', 80, 'https://example.com/payment19.pdf', 'PAY019', '2024-01-24', NOW() - INTERVAL '1 day', NOW()),
  ('enrollment-020', 'student-006', 'emma.davis@gmail.com', 'diesel-mechanic', 'Motor Mechanic (Diesel)', 'approved', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '2 hours', 10, 'https://example.com/payment20.pdf', 'PAY020', '2024-01-24', NOW() - INTERVAL '12 hours', NOW()),
  
  -- More pending enrollments
  ('enrollment-021', 'student-009', 'robert.taylor@gmail.com', 'roofing101', 'Roofing 101', 'pending', NOW() - INTERVAL '4 hours', NULL, 0, 'https://example.com/payment21.pdf', 'PAY021', '2024-01-24', NOW() - INTERVAL '4 hours', NOW()),
  ('enrollment-022', 'student-010', 'sophia.anderson@gmail.com', 'ai-human-relations', 'AI and Human Relations', 'pending', NOW() - INTERVAL '2 hours', NULL, 0, 'https://example.com/payment22.pdf', 'PAY022', '2024-01-24', NOW() - INTERVAL '2 hours', NOW()),
  ('enrollment-023', 'student-011', 'william.thomas@gmail.com', 'entrepreneurship-final', 'Entrepreneurship', 'pending', NOW() - INTERVAL '1 hour', NULL, 0, 'https://example.com/payment23.pdf', 'PAY023', '2024-01-24', NOW() - INTERVAL '1 hour', NOW()),
  ('enrollment-024', 'student-012', 'ava.jackson@gmail.com', 'cellphone-repairs', 'Cellphone Repairs and Maintenance', 'pending', NOW() - INTERVAL '30 minutes', NULL, 0, 'https://example.com/payment24.pdf', 'PAY024', '2024-01-24', NOW() - INTERVAL '30 minutes', NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify the data was inserted
SELECT 'Profiles count:' as info, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'Enrollments count:', COUNT(*) FROM public.enrollments
UNION ALL
SELECT 'Approved users:', COUNT(*) FROM public.profiles WHERE approval_status = 'approved'
UNION ALL
SELECT 'Pending users:', COUNT(*) FROM public.profiles WHERE approval_status = 'pending'
UNION ALL
SELECT 'Rejected users:', COUNT(*) FROM public.profiles WHERE approval_status = 'rejected'
UNION ALL
SELECT 'Approved enrollments:', COUNT(*) FROM public.enrollments WHERE status = 'approved'
UNION ALL
SELECT 'Pending enrollments:', COUNT(*) FROM public.enrollments WHERE status = 'pending'
UNION ALL
SELECT 'Rejected enrollments:', COUNT(*) FROM public.enrollments WHERE status = 'rejected';
