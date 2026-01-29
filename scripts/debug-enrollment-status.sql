-- DEBUG ENROLLMENT STATUS ISSUE
-- This will help us understand why pending enrollments aren't showing

-- 1. Check all enrollments with their status
SELECT 
  id,
  user_email,
  course_title,
  status,
  enrolled_at,
  created_at,
  CASE 
    WHEN status = 'pending' THEN '🔴 PENDING'
    WHEN status = 'approved' THEN '🟢 APPROVED'
    WHEN status = 'rejected' THEN '🔴 REJECTED'
    ELSE '❓ UNKNOWN'
  END as status_display
FROM public.enrollments
ORDER BY enrolled_at DESC
LIMIT 20;

-- 2. Count by status
SELECT 
  status,
  COUNT(*) as count,
  CASE 
    WHEN status = 'pending' THEN '🔴 PENDING'
    WHEN status = 'approved' THEN '🟢 APPROVED'
    WHEN status = 'rejected' THEN '🔴 REJECTED'
    ELSE '❓ UNKNOWN'
  END as status_display
FROM public.enrollments
GROUP BY status
ORDER BY status;

-- 3. Check recent enrollments (last 1 hour)
SELECT 
  'Recent Enrollments (Last 1h)' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE enrolled_at >= NOW() - INTERVAL '1 hour';

-- 4. Check enrollments created today
SELECT 
  'Enrollments Created Today' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE DATE(created_at) = CURRENT_DATE;

-- 5. Show the most recent enrollment
SELECT 
  'Most Recent Enrollment' as info,
  id,
  user_email,
  course_title,
  status,
  enrolled_at,
  created_at
FROM public.enrollments
ORDER BY created_at DESC
LIMIT 1;
