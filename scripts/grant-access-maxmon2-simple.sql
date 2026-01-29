-- Simple script to grant full access to maxmon2@gmail.com
-- Run this in your Supabase SQL Editor

-- Insert enrollments for all courses
INSERT INTO public.enrollments (user_id, course_id, status, enrolled_at, progress, payment_status)
SELECT 
    (SELECT id FROM auth.users WHERE email = 'maxmon2@gmail.com'),
    course_id,
    'active',
    NOW(),
    0,
    'completed'
FROM (
    VALUES 
        ('cybersecurity101'),
        ('emotional-intelligence'),
        ('prophet'),
        ('entrepreneurship-final'),
        ('ai-assisted-programming'),
        ('ai-assisted-web-development'),
        ('christian-teacher'),
        ('podcast-management-101'),
        ('sound-engineering-102'),
        ('computer-repairs'),
        ('roofing'),
        ('plumbing'),
        ('tiling-101'),
        ('hair-dressing'),
        ('nail-technician'),
        ('petrol-motor-mechanic'),
        ('diesel-motor-mechanic'),
        ('landscaping'),
        ('social-media-marketing-101'),
        ('master-electrician-online'),
        ('beauty-therapy-101'),
        ('dog-grooming-101')
) AS courses(course_id)
ON CONFLICT (user_id, course_id) 
DO UPDATE SET
    status = 'active',
    payment_status = 'completed',
    enrolled_at = COALESCE(enrollments.enrolled_at, NOW());
