-- Quick check and populate enrollments
-- This script will check current enrollments and create some if needed

-- 1. Check current enrollments
SELECT 
  'Current Enrollments' as status,
  COUNT(*) as count
FROM public.enrollments;

-- 2. If no enrollments exist, create some basic ones
INSERT INTO public.enrollments (
  id,
  user_id,
  user_email,
  course_id,
  course_title,
  status,
  enrolled_at,
  approved_at,
  progress,
  proof_of_payment,
  payment_ref,
  payment_date
)
SELECT 
  gen_random_uuid() as id,
  p.id as user_id,
  p.email as user_email,
  'christian-teacher' as course_id,
  'Christian Teacher Training' as course_title,
  CASE 
    WHEN random() < 0.4 THEN 'pending'
    WHEN random() < 0.7 THEN 'approved'
    ELSE 'rejected'
  END as status,
  (p.created_at + interval '1 day') as enrolled_at,
  CASE 
    WHEN random() < 0.7 THEN (p.created_at + interval '2 days')
    ELSE NULL
  END as approved_at,
  floor(random() * 100) as progress,
  'payment_proof_123.jpg' as proof_of_payment,
  'PAY-123456' as payment_ref,
  (p.created_at + interval '1 day') as payment_date
FROM public.profiles p
WHERE p.role = 'student'
  AND NOT EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = p.id)
LIMIT 10;

-- 3. Show final count
SELECT 
  'Final Enrollments' as status,
  COUNT(*) as count
FROM public.enrollments
UNION ALL
SELECT 
  'Pending' as status,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'pending'
UNION ALL
SELECT 
  'Approved' as status,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'approved'
UNION ALL
SELECT 
  'Rejected' as status,
  COUNT(*) as count
FROM public.enrollments
WHERE status = 'rejected';
