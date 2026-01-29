-- Simple admin setup for ericmnisi007@gmail.com
-- Run this in Supabase SQL Editor

-- 1. Update user role to admin
UPDATE profiles 
SET 
    role = 'admin', 
    approved = true, 
    approval_status = 'approved'
WHERE email = 'ericmnisi007@gmail.com';

-- 2. Grant access to all courses (run after getting user_id from step 1)
-- Replace 'USER_ID_HERE' with the actual user ID from the profiles table

-- First, check if user exists and get their ID:
SELECT id, email, role FROM profiles WHERE email = 'ericmnisi007@gmail.com';

-- Then run this with the actual user_id:
-- INSERT INTO enrollments (user_id, course_id, status, enrolled_at, approved_at, payment_type, progress)
-- SELECT 
--     'USER_ID_HERE'::uuid,
--     course_id,
--     'approved',
--     NOW(),
--     NOW(),
--     'manual',
--     0
-- FROM unnest(ARRAY[
--     'entrepreneurship-final',
--     'ai-human-relations',
--     'roofing101',
--     'plumbing101',
--     'tiling-101',
--     'hair-dressing',
--     'nail-technician',
--     'motor-mechanic-petrol-02',
--     'motor-mechanic-diesel',
--     'landscaping101',
--     'social-media-marketing-101',
--     'electrician101',
--     'solar101',
--     'carpentry101',
--     'podcast-management-101',
--     'computer-repairs',
--     'cellphone-repairs-101',
--     'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5',
--     'masterchef101',
--     'cybersecurity101',
--     'doggrooming101',
--     'beautyTherapy101',
--     'emotional-intelligence'
-- ]) AS course_id
-- ON CONFLICT (user_id, course_id) DO UPDATE SET
--     status = 'approved',
--     approved_at = NOW();
