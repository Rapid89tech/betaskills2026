-- CLEAR ALL MOCK DATA - PREPARE FOR REAL ENROLLMENTS ONLY
-- This script will remove ALL fake/mock enrollment data

-- 1. DELETE ALL EXISTING ENROLLMENTS (they are all fake/mock data)
DELETE FROM public.enrollments;

-- 2. Verify the table is completely empty
SELECT 
  'Current Enrollments After Clear' as status,
  COUNT(*) as count
FROM public.enrollments;

-- 3. Show table is ready for real enrollments
SELECT 
  'Table Status' as info,
  'Ready for real user enrollments' as status;

-- 4. Verify the table structure is correct for real enrollments
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
AND table_schema = 'public'
ORDER BY ordinal_position;
