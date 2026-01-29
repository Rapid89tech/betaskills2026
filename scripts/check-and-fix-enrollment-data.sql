-- CHECK AND FIX ENROLLMENT DATA ISSUE
-- Run this in Supabase SQL Editor to see what's actually in the database

-- Step 1: Check if there are actually other users' enrollments in the database
SELECT 
    'CHECKING ALL ENROLLMENTS' as step,
    COUNT(*) as total_count
FROM public.enrollments;

-- Step 2: Show ALL enrollments without any filters
SELECT 
    id,
    user_email,
    course_title,
    status,
    enrolled_at,
    created_at
FROM public.enrollments 
ORDER BY enrolled_at DESC;

-- Step 3: Check if there are enrollments for other users
SELECT 
    user_email,
    COUNT(*) as enrollment_count
FROM public.enrollments 
GROUP BY user_email
ORDER BY enrollment_count DESC;

-- Step 4: Check if there are any enrollments for ericmnisi007@gmail.com specifically
SELECT 
    'ERICMNISI ENROLLMENTS' as check_type,
    COUNT(*) as count
FROM public.enrollments 
WHERE user_email = 'ericmnisi007@gmail.com';

-- Step 5: Show any enrollments for ericmnisi007@gmail.com
SELECT 
    id,
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
WHERE user_email = 'ericmnisi007@gmail.com'
ORDER BY enrolled_at DESC;

-- Step 6: Check if there are any pending enrollments at all
SELECT 
    'PENDING ENROLLMENTS' as check_type,
    COUNT(*) as count
FROM public.enrollments 
WHERE status = 'pending';

-- Step 7: Show all pending enrollments
SELECT 
    id,
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
WHERE status = 'pending'
ORDER BY enrolled_at DESC;

-- Step 8: Check table structure to make sure it's correct
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 9: Check if there are any triggers that might be affecting the data
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'enrollments'
AND event_object_schema = 'public';

-- Step 10: Check RLS policies
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
