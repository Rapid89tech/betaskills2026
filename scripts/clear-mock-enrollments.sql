-- Clear Mock Enrollment Data and Prepare for Real Enrollments
-- This script will clear any existing mock data and prepare the table for real user enrollments

-- 1. Clear all existing enrollment data
DELETE FROM public.enrollments;

-- 2. Verify the table is empty
SELECT 
  'Current Enrollments' as status,
  COUNT(*) as count
FROM public.enrollments;

-- 3. Show table structure to ensure it's ready
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Verify RLS policies are in place
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'enrollments' 
AND schemaname = 'public';
