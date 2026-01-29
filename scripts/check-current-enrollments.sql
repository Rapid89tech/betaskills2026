-- CHECK CURRENT ENROLLMENTS - DEBUG REAL-TIME ISSUE
-- This script will help us understand why new enrollments aren't showing in admin dashboard

-- 1. Check total enrollments
SELECT 
  'Total Enrollments' as info,
  COUNT(*) as count
FROM public.enrollments;

-- 2. Check enrollments by status
SELECT 
  status,
  COUNT(*) as count
FROM public.enrollments
GROUP BY status
ORDER BY status;

-- 3. Check recent enrollments (last 24 hours)
SELECT 
  'Recent Enrollments (Last 24h)' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE enrolled_at >= NOW() - INTERVAL '24 hours';

-- 4. Show all enrollments with details
SELECT 
  id,
  user_email,
  course_title,
  status,
  enrolled_at,
  approved_at,
  created_at
FROM public.enrollments
ORDER BY enrolled_at DESC
LIMIT 10;

-- 5. Check for any enrollments with future dates (should be none)
SELECT 
  'Future Date Enrollments' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE enrolled_at > NOW();

-- 6. Check for pending enrollments specifically
SELECT 
  'Pending Enrollments' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'pending';
