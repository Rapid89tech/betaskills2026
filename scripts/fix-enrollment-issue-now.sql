-- IMMEDIATE FIX FOR ENROLLMENT ISSUE
-- Run this in Supabase SQL Editor RIGHT NOW

-- Step 1: Disable RLS completely on enrollments table
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Step 2: Show current enrollment count by user
SELECT 
    user_email,
    COUNT(*) as enrollment_count,
    STRING_AGG(DISTINCT status, ', ') as statuses
FROM public.enrollments 
GROUP BY user_email
ORDER BY enrollment_count DESC;

-- Step 3: Show all enrollments to verify data exists
SELECT 
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
ORDER BY enrolled_at DESC 
LIMIT 20;

-- Step 4: Show enrollment summary
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

-- Step 5: Show recent enrollments from all users
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
