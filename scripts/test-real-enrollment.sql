-- TEST REAL ENROLLMENT CREATION
-- This will help us see what's actually happening with enrollments

-- 1. Check total enrollments
SELECT 'Total Enrollments' as info, COUNT(*) as count FROM public.enrollments;

-- 2. Check enrollments by status
SELECT 
  status,
  COUNT(*) as count
FROM public.enrollments
GROUP BY status;

-- 3. Show all enrollments with details
SELECT 
  id,
  user_email,
  course_title,
  status,
  enrolled_at,
  created_at
FROM public.enrollments
ORDER BY created_at DESC;

-- 4. Check for any enrollments created in the last 10 minutes
SELECT 
  'Recent Enrollments (Last 10min)' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE created_at >= NOW() - INTERVAL '10 minutes';

-- 5. Show recent enrollments with full details
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
WHERE created_at >= NOW() - INTERVAL '10 minutes'
ORDER BY created_at DESC;
