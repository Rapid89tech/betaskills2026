-- VERIFY REAL ENROLLMENTS ONLY
-- This script will check that only real user enrollments exist

-- 1. Check total enrollments (should be 0 after clearing mock data)
SELECT 
  'Total Enrollments' as metric,
  COUNT(*) as count
FROM public.enrollments;

-- 2. If there are any enrollments, show their details to verify they're real
SELECT 
  e.course_title,
  e.user_email,
  e.status,
  e.enrolled_at,
  p.first_name || ' ' || p.last_name as student_name,
  p.email as profile_email
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
ORDER BY e.enrolled_at DESC;

-- 3. Check for any enrollments with fake dates (future dates)
SELECT 
  'Fake Date Check' as check_type,
  COUNT(*) as count
FROM public.enrollments
WHERE enrolled_at > NOW();

-- 4. Show enrollment dates to verify they're realistic
SELECT 
  'Date Analysis' as info,
  MIN(enrolled_at) as earliest_enrollment,
  MAX(enrolled_at) as latest_enrollment,
  COUNT(*) as total_enrollments
FROM public.enrollments;
