-- Grant full access to all courses for maxmon2@gmail.com
-- Fixed version for Supabase SQL Editor

WITH course_list AS (
  SELECT 'cybersecurity101' AS course_id
  UNION ALL SELECT 'emotional-intelligence'
  UNION ALL SELECT 'prophet'
  UNION ALL SELECT 'entrepreneurship-final'
  UNION ALL SELECT 'ai-assisted-programming'
  UNION ALL SELECT 'ai-assisted-web-development'
  UNION ALL SELECT 'christian-teacher'
  UNION ALL SELECT 'podcast-management-101'
  UNION ALL SELECT 'sound-engineering-102'
  UNION ALL SELECT 'computer-repairs'
  UNION ALL SELECT 'roofing'
  UNION ALL SELECT 'plumbing'
  UNION ALL SELECT 'tiling-101'
  UNION ALL SELECT 'hair-dressing'
  UNION ALL SELECT 'nail-technician'
  UNION ALL SELECT 'petrol-motor-mechanic'
  UNION ALL SELECT 'diesel-motor-mechanic'
  UNION ALL SELECT 'landscaping'
  UNION ALL SELECT 'social-media-marketing-101'
  UNION ALL SELECT 'master-electrician-online'
  UNION ALL SELECT 'beauty-therapy-101'
  UNION ALL SELECT 'dog-grooming-101'
)
INSERT INTO public.enrollments (user_id, course_id, status, enrolled_at, progress, payment_status)
SELECT 
    (SELECT id FROM auth.users WHERE email = 'maxmon2@gmail.com'),
    course_id,
    'active',
    NOW(),
    0,
    'completed'
FROM course_list
ON CONFLICT (user_id, course_id) 
DO UPDATE SET
    status = 'active',
    payment_status = 'completed',
    enrolled_at = COALESCE(enrollments.enrolled_at, NOW());
