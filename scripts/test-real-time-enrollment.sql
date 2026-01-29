-- Test Real-Time Enrollment System
-- This script will help verify that the enrollment system is working properly

-- 1. Check current enrollment counts by status
SELECT 
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM public.enrollments
GROUP BY status
ORDER BY count DESC;

-- 2. Show recent enrollments (last 10)
SELECT 
  e.course_title,
  e.user_email,
  e.status,
  e.enrolled_at,
  e.approved_at,
  p.first_name || ' ' || p.last_name as student_name
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
ORDER BY e.enrolled_at DESC
LIMIT 10;

-- 3. Show pending enrollments that need admin approval
SELECT 
  e.course_title,
  e.user_email,
  e.enrolled_at,
  p.first_name || ' ' || p.last_name as student_name,
  e.payment_ref,
  e.id as enrollment_id
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
WHERE e.status = 'pending'
ORDER BY e.enrolled_at DESC;

-- 4. Check enrollment activity by hour (last 24 hours)
SELECT 
  DATE_TRUNC('hour', enrolled_at) as hour,
  COUNT(*) as enrollments
FROM public.enrollments
WHERE enrolled_at >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', enrolled_at)
ORDER BY hour DESC;

-- 5. Show enrollment statistics
SELECT 
  'Total Enrollments' as metric,
  COUNT(*) as value
FROM public.enrollments
UNION ALL
SELECT 
  'Pending Enrollments' as metric,
  COUNT(*) as value
FROM public.enrollments
WHERE status = 'pending'
UNION ALL
SELECT 
  'Approved Enrollments' as metric,
  COUNT(*) as value
FROM public.enrollments
WHERE status = 'approved'
UNION ALL
SELECT 
  'Rejected Enrollments' as metric,
  COUNT(*) as value
FROM public.enrollments
WHERE status = 'rejected'
UNION ALL
SELECT 
  'Today\'s Enrollments' as metric,
  COUNT(*) as value
FROM public.enrollments
WHERE DATE(enrolled_at) = CURRENT_DATE;
