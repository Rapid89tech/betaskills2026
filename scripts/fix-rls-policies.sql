-- Fix RLS Policies for Admin Dashboard Access
-- Run this script in your Supabase SQL Editor

-- Step 1: Temporarily disable RLS for development (remove this in production)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Step 2: Or, if you want to keep RLS enabled, create more permissive policies
-- First, drop existing policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can update enrollment status" ON public.enrollments;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;

-- Step 3: Create more permissive policies for development
-- Allow all authenticated users to view profiles (for admin dashboard)
CREATE POLICY "Allow authenticated users to view profiles" ON public.profiles
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow all authenticated users to view enrollments (for admin dashboard)
CREATE POLICY "Allow authenticated users to view enrollments" ON public.enrollments
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update enrollments (for admin actions)
CREATE POLICY "Allow authenticated users to update enrollments" ON public.enrollments
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to update profiles (for admin actions)
CREATE POLICY "Allow authenticated users to update profiles" ON public.profiles
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Step 4: Re-enable RLS (uncomment if you want to keep RLS enabled)
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Step 5: Verify the data is accessible
SELECT 'Profiles accessible:' as info, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'Enrollments accessible:', COUNT(*) FROM public.enrollments;
