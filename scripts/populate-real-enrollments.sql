-- Populate Real Enrollment Data
-- This script will create realistic enrollment data for your real users

-- First, let's clear any existing enrollment data
DELETE FROM public.enrollments;

-- Define some realistic course data
WITH course_data AS (
  SELECT 
    'christian-teacher' as course_id,
    'Christian Teacher Training' as course_title
  UNION ALL SELECT 'roofing', 'Roofing Installation & Repair'
  UNION ALL SELECT 'entrepreneurship', 'Entrepreneurship Fundamentals'
  UNION ALL SELECT 'plumbing', 'Plumbing Systems & Maintenance'
  UNION ALL SELECT 'motor-mechanic-petrol', 'Petrol Engine Mechanics'
  UNION ALL SELECT 'motor-mechanic-diesel', 'Diesel Engine Mechanics'
  UNION ALL SELECT 'hair-dressing', 'Hair Dressing & Styling'
  UNION ALL SELECT 'nail-technician', 'Nail Technician & Manicure'
  UNION ALL SELECT 'tiling', 'Tiling Installation & Design'
  UNION ALL SELECT 'sound-engineering', 'Sound Engineering & Production'
  UNION ALL SELECT 'podcast-management', 'Podcast Management & Production'
  UNION ALL SELECT 'smart-home-automation', 'Smart Home Automation'
  UNION ALL SELECT 'cellphone-repairs', 'Cellphone Repairs & Maintenance'
  UNION ALL SELECT 'computer-repairs', 'Computer & Laptop Repairs'
  UNION ALL SELECT 'ai-assisted-programming', 'AI Assisted Programming'
  UNION ALL SELECT 'ai-assisted-website-development', 'AI Assisted Website Development'
),
student_profiles AS (
  SELECT 
    id,
    email,
    first_name,
    last_name,
    created_at
  FROM public.profiles
  WHERE role = 'student'
  ORDER BY created_at DESC
  LIMIT 25 -- Limit to first 25 students to avoid too many enrollments
)
-- Insert realistic enrollment data
INSERT INTO public.enrollments (
  id,
  user_id,
  user_email,
  course_id,
  course_title,
  status,
  enrolled_at,
  approved_at,
  progress,
  proof_of_payment,
  payment_ref,
  payment_date
)
SELECT 
  gen_random_uuid() as id,
  sp.id as user_id,
  sp.email as user_email,
  cd.course_id,
  cd.course_title,
  CASE 
    WHEN random() < 0.4 THEN 'pending'
    WHEN random() < 0.7 THEN 'approved'
    ELSE 'rejected'
  END as status,
  (sp.created_at + interval '1 day' + (random() * interval '30 days')) as enrolled_at,
  CASE 
    WHEN random() < 0.7 THEN (sp.created_at + interval '2 days' + (random() * interval '28 days'))
    ELSE NULL
  END as approved_at,
  CASE 
    WHEN random() < 0.3 THEN floor(random() * 100)
    ELSE 0
  END as progress,
  CASE 
    WHEN random() < 0.6 THEN 'payment_proof_' || floor(random() * 1000) || '.jpg'
    ELSE NULL
  END as proof_of_payment,
  CASE 
    WHEN random() < 0.6 THEN 'PAY-' || floor(random() * 1000000)
    ELSE NULL
  END as payment_ref,
  CASE 
    WHEN random() < 0.6 THEN (sp.created_at + interval '1 day' + (random() * interval '5 days'))
    ELSE NULL
  END as payment_date
FROM student_profiles sp
CROSS JOIN course_data cd
WHERE random() < 0.3; -- 30% chance of enrollment per student per course

-- Verify the enrollment data was created
SELECT 
  'Total Enrollments Created' as status,
  COUNT(*) as count
FROM public.enrollments
UNION ALL
SELECT 
  'Pending Enrollments' as status,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'pending'
UNION ALL
SELECT 
  'Approved Enrollments' as status,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'approved'
UNION ALL
SELECT 
  'Rejected Enrollments' as status,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'rejected';

-- Show sample of created enrollments
SELECT 
  e.user_email,
  e.course_title,
  e.status,
  e.enrolled_at,
  e.progress,
  p.first_name || ' ' || p.last_name as student_name
FROM public.enrollments e
JOIN public.profiles p ON e.user_id = p.id
ORDER BY e.enrolled_at DESC
LIMIT 10;
