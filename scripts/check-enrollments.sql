-- Check Current Enrollment Data
-- This script will help identify what enrollment data exists

-- 1. Check current enrollments table
SELECT 
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
FROM public.enrollments
ORDER BY enrolled_at DESC;

-- 2. Count enrollments by status
SELECT 
  status,
  COUNT(*) as count
FROM public.enrollments
GROUP BY status
ORDER BY count DESC;

-- 3. Check if we have any real users to create enrollments for
SELECT 
  id,
  email,
  first_name,
  last_name,
  role,
  created_at
FROM public.profiles
WHERE role = 'student'
ORDER BY created_at DESC
LIMIT 10;

-- 4. Check total counts
SELECT 
  'Total Profiles' as table_name,
  COUNT(*) as count
FROM public.profiles
UNION ALL
SELECT 
  'Student Profiles' as table_name,
  COUNT(*) as count
FROM public.profiles
WHERE role = 'student'
UNION ALL
SELECT 
  'Total Enrollments' as table_name,
  COUNT(*) as count
FROM public.enrollments;
