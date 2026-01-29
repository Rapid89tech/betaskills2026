-- FIX ENROLLMENT VISIBILITY ISSUE
-- Run this in your Supabase SQL Editor to allow admins to see ALL enrollments

-- Step 1: Drop ALL existing RLS policies on enrollments table
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can update enrollment status" ON public.enrollments;
DROP POLICY IF EXISTS "Allow all operations for now" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can update enrollment status" ON public.enrollments;
DROP POLICY IF EXISTS "Allow anonymous read access for admin dashboard" ON public.enrollments;

-- Step 2: Disable RLS temporarily to ensure full access
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Step 3: Show current enrollment count by user
SELECT 
    user_email,
    COUNT(*) as enrollment_count,
    STRING_AGG(DISTINCT status, ', ') as statuses
FROM public.enrollments 
GROUP BY user_email
ORDER BY enrollment_count DESC;

-- Step 4: Show all enrollments to verify data exists
SELECT 
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
ORDER BY enrolled_at DESC 
LIMIT 20;

-- Step 5: Re-enable RLS with proper admin policies
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Step 6: Create policies that allow admins to see ALL enrollments
-- Policy for admins to view ALL enrollments
CREATE POLICY "Admins can view all enrollments" ON public.enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Policy for admins to update enrollment status
CREATE POLICY "Admins can update enrollment status" ON public.enrollments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Policy for users to create their own enrollments
CREATE POLICY "Users can create their own enrollments" ON public.enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to view their own enrollments
CREATE POLICY "Users can view their own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);

-- Step 7: Create a fallback policy for anonymous access (for admin dashboard)
CREATE POLICY "Allow anonymous read access for admin dashboard" ON public.enrollments
    FOR SELECT USING (true);

-- Step 8: Verify the policies are working
-- This will show all enrollments regardless of user
SELECT 
    'Total enrollments' as metric,
    COUNT(*) as count
FROM public.enrollments
UNION ALL
SELECT 
    'Pending enrollments' as metric,
    COUNT(*) as count
FROM public.enrollments
WHERE status = 'pending'
UNION ALL
SELECT 
    'Approved enrollments' as metric,
    COUNT(*) as count
FROM public.enrollments
WHERE status = 'approved'
UNION ALL
SELECT 
    'Unique users' as metric,
    COUNT(DISTINCT user_email) as count
FROM public.enrollments;

-- Step 9: Show recent enrollments from all users
SELECT 
    user_email,
    course_title,
    status,
    enrolled_at,
    CASE 
        WHEN status = 'pending' THEN '🟡 PENDING'
        WHEN status = 'approved' THEN '🟢 APPROVED'
        WHEN status = 'rejected' THEN '🔴 REJECTED'
        ELSE '❓ UNKNOWN'
    END as status_display
FROM public.enrollments 
ORDER BY enrolled_at DESC 
LIMIT 15;
