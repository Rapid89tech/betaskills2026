-- EMERGENCY: Check for John Doe enrollments and all recent enrollments
-- Run this in Supabase SQL editor to see what's actually in the database

-- 1. Check if John Doe user exists
SELECT 
    id,
    email,
    first_name,
    last_name,
    role,
    created_at
FROM public.profiles 
WHERE email ILIKE '%john.doe%'
ORDER BY created_at DESC;

-- 2. Check ALL enrollments for John Doe
SELECT 
    e.*,
    p.first_name,
    p.last_name,
    p.email as profile_email
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
WHERE e.user_email ILIKE '%john.doe%'
ORDER BY e.enrolled_at DESC;

-- 3. Check recent enrollments (last 24 hours)
SELECT 
    e.id,
    e.user_email,
    e.course_id,
    e.course_title,
    e.status,
    e.enrolled_at,
    e.payment_ref,
    p.first_name,
    p.last_name
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
WHERE e.enrolled_at >= NOW() - INTERVAL '24 hours'
ORDER BY e.enrolled_at DESC;

-- 4. Check ALL enrollments (last 10)
SELECT 
    e.id,
    e.user_email,
    e.course_id,
    e.course_title,
    e.status,
    e.enrolled_at,
    e.payment_ref,
    p.first_name,
    p.last_name
FROM public.enrollments e
LEFT JOIN public.profiles p ON e.user_id = p.id
ORDER BY e.enrolled_at DESC
LIMIT 10;

-- 5. Check RLS policies on enrollments table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'enrollments';

-- 6. Count total enrollments
SELECT COUNT(*) as total_enrollments FROM public.enrollments;

-- 7. Count enrollments by status
SELECT 
    status,
    COUNT(*) as count
FROM public.enrollments
GROUP BY status;

-- 8. Check if there are any card payment enrollments
SELECT 
    e.*
FROM public.enrollments e
WHERE e.payment_ref IS NOT NULL
   OR e.payment_ref ILIKE '%card%'
   OR e.payment_ref ILIKE '%ikhokha%'
ORDER BY e.enrolled_at DESC
LIMIT 5;