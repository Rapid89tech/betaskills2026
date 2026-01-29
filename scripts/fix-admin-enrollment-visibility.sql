-- Fix admin enrollment visibility issue
-- This script ensures admins can see ALL enrollments in the dashboard

-- First, let's check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'enrollments';

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors can update enrollment status" ON public.enrollments;

-- Create comprehensive policies that work for all user types

-- 1. Allow users to view their own enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments
    FOR SELECT USING (
        auth.uid() = user_id
    );

-- 2. Allow admins and instructors to view ALL enrollments
CREATE POLICY "Admins and instructors can view all enrollments" ON public.enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'instructor')
        )
    );

-- 3. Allow admins and instructors to update enrollment status
CREATE POLICY "Admins and instructors can update enrollments" ON public.enrollments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'instructor')
        )
    );

-- 4. Allow users to insert their own enrollments
CREATE POLICY "Users can insert own enrollments" ON public.enrollments
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
    );

-- 5. Allow service role to do everything (for system operations)
CREATE POLICY "Service role full access" ON public.enrollments
    FOR ALL USING (
        current_setting('role') = 'service_role'
    );

-- Ensure john.doe@gmail.com has instructor role for testing
UPDATE public.profiles 
SET role = 'instructor', approved = true, approval_status = 'approved'
WHERE email = 'john.doe@gmail.com';

-- Check if John Doe has any enrollments
SELECT 
    e.*,
    p.first_name,
    p.last_name,
    p.role
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
WHERE e.user_email ILIKE '%john.doe%'
ORDER BY e.enrolled_at DESC;

-- Show all enrollments for debugging
SELECT 
    e.id,
    e.user_email,
    e.course_title,
    e.status,
    e.enrolled_at,
    p.first_name,
    p.last_name,
    p.role
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
ORDER BY e.enrolled_at DESC
LIMIT 20;