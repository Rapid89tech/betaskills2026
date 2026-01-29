-- CLEAR LOCALSTORAGE ENROLLMENTS AND CHECK DATABASE
-- This will help us understand what's actually happening

-- 1. Check current database enrollments
SELECT 
  'Database Enrollments' as info,
  COUNT(*) as count
FROM public.enrollments;

-- 2. Show all database enrollments
SELECT 
  id,
  user_email,
  course_title,
  status,
  enrolled_at,
  created_at
FROM public.enrollments
ORDER BY created_at DESC;

-- 3. Check for any enrollments created today
SELECT 
  'Enrollments Created Today' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE DATE(created_at) = CURRENT_DATE;

-- 4. Check for pending enrollments in database
SELECT 
  'Pending Enrollments in Database' as info,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'pending';

-- 5. Show pending enrollments details
SELECT 
  id,
  user_email,
  course_title,
  status,
  enrolled_at,
  created_at
FROM public.enrollments
WHERE status = 'pending'
ORDER BY created_at DESC;
