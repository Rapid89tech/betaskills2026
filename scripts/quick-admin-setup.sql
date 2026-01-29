-- Quick Admin Setup for Sam Cook / ericmnisi007@gmail.com
-- Copy and paste this entire script into Supabase SQL Editor

-- Step 1: Make user admin
UPDATE profiles 
SET role = 'admin', approved = true, approval_status = 'approved'
WHERE email = 'ericmnisi007@gmail.com' OR email = 'samcook@example.com';

-- Step 2: Grant access to all courses
WITH admin_user AS (
    SELECT id FROM profiles WHERE email = 'ericmnisi007@gmail.com' OR email = 'samcook@example.com'
),
courses AS (
    SELECT unnest(ARRAY[
        'entrepreneurship-final', 'ai-human-relations', 'roofing101', 'plumbing101',
        'tiling-101', 'hair-dressing', 'nail-technician', 'motor-mechanic-petrol-02',
        'motor-mechanic-diesel', 'landscaping101', 'social-media-marketing-101',
        'electrician101', 'solar101', 'carpentry101', 'podcast-management-101',
        'computer-repairs', 'cellphone-repairs-101', 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5',
        'masterchef101', 'cybersecurity101', 'doggrooming101', 'beautyTherapy101',
        'emotional-intelligence'
    ]) AS course_id
)
INSERT INTO enrollments (user_id, course_id, status, enrolled_at, approved_at, payment_type, progress)
SELECT admin_user.id, courses.course_id, 'approved', NOW(), NOW(), 'manual', 0
FROM admin_user, courses
ON CONFLICT (user_id, course_id) DO UPDATE SET
    status = 'approved', approved_at = NOW(), payment_type = 'manual';

-- Step 3: Verify
SELECT 
    p.email, p.role, p.approved,
    COUNT(e.id) as total_courses,
    COUNT(CASE WHEN e.status = 'approved' THEN 1 END) as approved_courses
FROM profiles p
LEFT JOIN enrollments e ON p.id = e.user_id
WHERE p.email = 'ericmnisi007@gmail.com' OR p.email = 'samcook@example.com'
GROUP BY p.email, p.role, p.approved;
