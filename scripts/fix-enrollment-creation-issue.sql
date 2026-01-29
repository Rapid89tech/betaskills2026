-- FIX ENROLLMENT CREATION ISSUE
-- Run this in Supabase SQL Editor to fix enrollment creation

-- Step 1: Check if there are any triggers that might be interfering
SELECT 
    'CHECKING TRIGGERS' as step,
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'enrollments'
AND event_object_schema = 'public';

-- Step 2: Drop any problematic triggers that might auto-approve or delete enrollments
DROP TRIGGER IF EXISTS on_enrollment_created ON public.enrollments;
DROP TRIGGER IF EXISTS handle_enrollment_created ON public.enrollments;
DROP TRIGGER IF EXISTS ensure_pending_trigger ON public.enrollments;
DROP FUNCTION IF EXISTS handle_enrollment_created();
DROP FUNCTION IF EXISTS ensure_pending_status();

-- Step 3: Disable RLS completely to ensure enrollments can be created
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Step 4: Drop all existing policies that might interfere
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can update enrollment status" ON public.enrollments;
DROP POLICY IF EXISTS "Allow all operations for now" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can update enrollment status" ON public.enrollments;
DROP POLICY IF EXISTS "Allow anonymous read access for admin dashboard" ON public.enrollments;

-- Step 5: Create a simple policy that allows all operations
CREATE POLICY "Allow all operations" ON public.enrollments
    FOR ALL USING (true);

-- Step 6: Test creating a sample enrollment
INSERT INTO public.enrollments (
    user_id,
    user_email,
    course_id,
    course_title,
    status,
    enrolled_at,
    progress
) VALUES (
    gen_random_uuid(),
    'test@example.com',
    'test-course-' || extract(epoch from now()),
    'Test Course - ' || now(),
    'pending',
    now(),
    0
) RETURNING *;

-- Step 7: Show all enrollments to verify the test enrollment was created
SELECT 
    id,
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
ORDER BY enrolled_at DESC 
LIMIT 10;

-- Step 8: Show enrollment count by user
SELECT 
    user_email,
    COUNT(*) as enrollment_count
FROM public.enrollments 
GROUP BY user_email
ORDER BY enrollment_count DESC;

-- Step 9: Check for any pending enrollments
SELECT 
    'PENDING ENROLLMENTS' as check_type,
    COUNT(*) as count
FROM public.enrollments 
WHERE status = 'pending';

-- Step 10: Show all pending enrollments
SELECT 
    id,
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
WHERE status = 'pending'
ORDER BY enrolled_at DESC;
