-- Disable RLS for testing
-- Run this in your Supabase SQL Editor

-- Disable RLS on both tables
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Verify the data is accessible
SELECT 'Profiles count:' as info, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'Enrollments count:', COUNT(*) FROM public.enrollments;
