-- ADD MISSING ENROLLMENTS FOR ERICMNISI007@GMAIL.COM
-- Run this in Supabase SQL Editor to add the missing enrollments

-- Step 1: Add the missing enrollments that should be pending
INSERT INTO public.enrollments (
    user_id,
    user_email,
    course_id,
    course_title,
    status,
    enrolled_at,
    progress
) VALUES 
    (gen_random_uuid(), 'ericmnisi007@gmail.com', 'entrepreneurship', 'Entrepreneurship: Creating Your Business', 'pending', now() - interval '2 hours', 0),
    (gen_random_uuid(), 'ericmnisi007@gmail.com', 'ai-human-relations', 'AI and Human Relations', 'pending', now() - interval '2 hours', 0),
    (gen_random_uuid(), 'ericmnisi007@gmail.com', 'roofing', 'Roofing Mastery: Design, Installation, and Maintenance', 'pending', now() - interval '2 hours', 0),
    (gen_random_uuid(), 'ericmnisi007@gmail.com', 'plumbing', 'Plumbing 101: Master Plumbing Fundamentals', 'pending', now() - interval '2 hours', 0),
    (gen_random_uuid(), 'ericmnisi007@gmail.com', 'tiling-course', 'Tiling 101: Mastering the Art & Science of Tiling', 'pending', now() - interval '2 hours', 0),
    (gen_random_uuid(), 'ericmnisi007@gmail.com', 'hair-dressing', 'Hair Dressing: Professional Styling and Salon Management', 'pending', now() - interval '2 hours', 0)
RETURNING *;

-- Step 2: Show all enrollments for ericmnisi007@gmail.com
SELECT 
    id,
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
WHERE user_email = 'ericmnisi007@gmail.com'
ORDER BY enrolled_at DESC;

-- Step 3: Show all pending enrollments
SELECT 
    id,
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
WHERE status = 'pending'
ORDER BY enrolled_at DESC;

-- Step 4: Show enrollment count by user
SELECT 
    user_email,
    COUNT(*) as enrollment_count,
    STRING_AGG(DISTINCT status, ', ') as statuses
FROM public.enrollments 
GROUP BY user_email
ORDER BY enrollment_count DESC;

-- Step 5: Show total enrollment summary
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
