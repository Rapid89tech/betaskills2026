-- Complete Database Setup and Population Script
-- Run this ENTIRE script in your Supabase SQL Editor

-- Step 1: Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'student',
    approved BOOLEAN DEFAULT false,
    approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    contact_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create enrollments table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    user_email TEXT NOT NULL,
    course_id TEXT NOT NULL,
    course_title TEXT NOT NULL,
    proof_of_payment TEXT,
    payment_ref TEXT,
    payment_date TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);

-- Step 4: Enable Row Level Security
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for enrollments
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
CREATE POLICY "Users can view their own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own enrollments" ON public.enrollments;
CREATE POLICY "Users can create their own enrollments" ON public.enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Instructors and admins can view all enrollments" ON public.enrollments;
CREATE POLICY "Instructors and admins can view all enrollments" ON public.enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('instructor', 'admin')
        )
    );

DROP POLICY IF EXISTS "Instructors and admins can update enrollment status" ON public.enrollments;
CREATE POLICY "Instructors and admins can update enrollment status" ON public.enrollments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('instructor', 'admin')
        )
    );

-- Step 6: Create RLS policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
CREATE POLICY "Admins can update profiles" ON public.profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Step 7: Clear existing data (optional - comment out if you want to keep existing data)
DELETE FROM public.enrollments;
DELETE FROM public.profiles;

-- Step 8: Insert real user profiles with proper UUIDs
INSERT INTO public.profiles (id, email, first_name, last_name, role, approved, approval_status, contact_number, created_at, updated_at)
VALUES 
  -- Admin Users
  (gen_random_uuid(), 'admin@betaskill.com', 'Dr. Russon', 'Nkuna', 'admin', true, 'approved', '+27 82 123 4567', NOW() - INTERVAL '30 days', NOW()),
  (gen_random_uuid(), 'manager@betaskill.com', 'Sarah', 'Johnson', 'admin', true, 'approved', '+27 82 234 5678', NOW() - INTERVAL '25 days', NOW()),
  
  -- Instructors
  (gen_random_uuid(), 'instructor.tech@betaskill.com', 'Michael', 'Chen', 'instructor', true, 'approved', '+27 82 345 6789', NOW() - INTERVAL '20 days', NOW()),
  (gen_random_uuid(), 'instructor.business@betaskill.com', 'Lisa', 'Thompson', 'instructor', true, 'approved', '+27 82 456 7890', NOW() - INTERVAL '18 days', NOW()),
  (gen_random_uuid(), 'instructor.trades@betaskill.com', 'David', 'Williams', 'instructor', true, 'approved', '+27 82 567 8901', NOW() - INTERVAL '15 days', NOW()),
  
  -- Students (Approved)
  (gen_random_uuid(), 'john.doe@gmail.com', 'John', 'Doe', 'student', true, 'approved', '+27 82 678 9012', NOW() - INTERVAL '14 days', NOW()),
  (gen_random_uuid(), 'jane.smith@gmail.com', 'Jane', 'Smith', 'student', true, 'approved', '+27 82 789 0123', NOW() - INTERVAL '12 days', NOW()),
  (gen_random_uuid(), 'mike.wilson@gmail.com', 'Mike', 'Wilson', 'student', true, 'approved', '+27 82 890 1234', NOW() - INTERVAL '10 days', NOW()),
  (gen_random_uuid(), 'sarah.brown@gmail.com', 'Sarah', 'Brown', 'student', true, 'approved', '+27 82 901 2345', NOW() - INTERVAL '8 days', NOW()),
  (gen_random_uuid(), 'alex.jones@gmail.com', 'Alex', 'Jones', 'student', true, 'approved', '+27 82 012 3456', NOW() - INTERVAL '6 days', NOW()),
  (gen_random_uuid(), 'emma.davis@gmail.com', 'Emma', 'Davis', 'student', true, 'approved', '+27 82 123 4567', NOW() - INTERVAL '5 days', NOW()),
  (gen_random_uuid(), 'james.miller@gmail.com', 'James', 'Miller', 'student', true, 'approved', '+27 82 234 5678', NOW() - INTERVAL '4 days', NOW()),
  (gen_random_uuid(), 'olivia.garcia@gmail.com', 'Olivia', 'Garcia', 'student', true, 'approved', '+27 82 345 6789', NOW() - INTERVAL '3 days', NOW()),
  
  -- Students (Pending Approval)
  (gen_random_uuid(), 'robert.taylor@gmail.com', 'Robert', 'Taylor', 'student', false, 'pending', '+27 82 456 7890', NOW() - INTERVAL '2 days', NOW()),
  (gen_random_uuid(), 'sophia.anderson@gmail.com', 'Sophia', 'Anderson', 'student', false, 'pending', '+27 82 567 8901', NOW() - INTERVAL '1 day', NOW()),
  (gen_random_uuid(), 'william.thomas@gmail.com', 'William', 'Thomas', 'student', false, 'pending', '+27 82 678 9012', NOW() - INTERVAL '12 hours', NOW()),
  (gen_random_uuid(), 'ava.jackson@gmail.com', 'Ava', 'Jackson', 'student', false, 'pending', '+27 82 789 0123', NOW() - INTERVAL '6 hours', NOW()),
  
  -- Students (Rejected)
  (gen_random_uuid(), 'daniel.white@gmail.com', 'Daniel', 'White', 'student', false, 'rejected', '+27 82 890 1234', NOW() - INTERVAL '5 days', NOW()),
  (gen_random_uuid(), 'mia.martin@gmail.com', 'Mia', 'Martin', 'student', false, 'rejected', '+27 82 901 2345', NOW() - INTERVAL '3 days', NOW())
ON CONFLICT (email) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role,
  approved = EXCLUDED.approved,
  approval_status = EXCLUDED.approval_status,
  contact_number = EXCLUDED.contact_number,
  updated_at = NOW();

-- Step 9: Insert real course enrollments
INSERT INTO public.enrollments (user_id, user_email, course_id, course_title, status, enrolled_at, approved_at, progress, proof_of_payment, payment_ref, payment_date, created_at, updated_at)
SELECT 
  p.id,
  p.email,
  e.course_id,
  e.course_title,
  e.status,
  e.enrolled_at,
  e.approved_at,
  e.progress,
  e.proof_of_payment,
  e.payment_ref,
  e.payment_date,
  e.created_at,
  e.updated_at
FROM (
  VALUES 
    -- Approved Enrollments with Progress
    ('john.doe@gmail.com', 'entrepreneurship-final', 'Entrepreneurship', 'approved', NOW() - INTERVAL '10 days', NOW() - INTERVAL '8 days', 75, 'https://example.com/payment1.pdf', 'PAY001', '2024-01-15'),
    ('jane.smith@gmail.com', 'ai-human-relations', 'AI and Human Relations', 'approved', NOW() - INTERVAL '8 days', NOW() - INTERVAL '6 days', 45, 'https://example.com/payment2.pdf', 'PAY002', '2024-01-17'),
    ('mike.wilson@gmail.com', 'roofing101', 'Roofing 101', 'approved', NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days', 90, 'https://example.com/payment3.pdf', 'PAY003', '2024-01-18'),
    ('sarah.brown@gmail.com', 'plumbing101', 'Plumbing 101', 'approved', NOW() - INTERVAL '6 days', NOW() - INTERVAL '4 days', 30, 'https://example.com/payment4.pdf', 'PAY004', '2024-01-19'),
    ('alex.jones@gmail.com', 'podcast-management-101', 'Mastering Podcast Management', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days', 60, 'https://example.com/payment5.pdf', 'PAY005', '2024-01-20'),
    
    -- Multiple enrollments for same student
    ('john.doe@gmail.com', 'ai-human-relations', 'AI and Human Relations', 'approved', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days', 40, 'https://example.com/payment6.pdf', 'PAY006', '2024-01-20'),
    ('jane.smith@gmail.com', 'roofing101', 'Roofing 101', 'approved', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day', 20, 'https://example.com/payment7.pdf', 'PAY007', '2024-01-22'),
    
    -- Pending Enrollments
    ('robert.taylor@gmail.com', 'computer-repairs', 'Computer & Laptop Repairs', 'pending', NOW() - INTERVAL '1 day', NULL, 0, 'https://example.com/payment8.pdf', 'PAY008', '2024-01-24'),
    ('sophia.anderson@gmail.com', 'hair-dressing', 'Hair Dressing', 'pending', NOW() - INTERVAL '12 hours', NULL, 0, 'https://example.com/payment9.pdf', 'PAY009', '2024-01-24'),
    ('william.thomas@gmail.com', 'nail-technician', 'Nail Technician', 'pending', NOW() - INTERVAL '6 hours', NULL, 0, 'https://example.com/payment10.pdf', 'PAY010', '2024-01-24'),
    ('ava.jackson@gmail.com', 'sound-engineering', 'Sound Engineering', 'pending', NOW() - INTERVAL '2 hours', NULL, 0, 'https://example.com/payment11.pdf', 'PAY011', '2024-01-24'),
    
    -- Rejected Enrollments
    ('daniel.white@gmail.com', 'tiling-101', 'Tiling 101', 'rejected', NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days', 0, 'https://example.com/payment12.pdf', 'PAY012', '2024-01-20'),
    ('mia.martin@gmail.com', 'motor-mechanic-petrol-02', 'Motor Mechanic (Petrol) - Advanced', 'rejected', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 0, 'https://example.com/payment13.pdf', 'PAY013', '2024-01-22')
) AS e(user_email, course_id, course_title, status, enrolled_at, approved_at, progress, proof_of_payment, payment_ref, payment_date)
JOIN public.profiles p ON p.email = e.user_email;

-- Step 10: Verify the data was inserted
SELECT 'Profiles count:' as info, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'Enrollments count:', COUNT(*) FROM public.enrollments
UNION ALL
SELECT 'Approved users:', COUNT(*) FROM public.profiles WHERE approval_status = 'approved'
UNION ALL
SELECT 'Pending users:', COUNT(*) FROM public.profiles WHERE approval_status = 'pending'
UNION ALL
SELECT 'Rejected users:', COUNT(*) FROM public.profiles WHERE approval_status = 'rejected'
UNION ALL
SELECT 'Approved enrollments:', COUNT(*) FROM public.enrollments WHERE status = 'approved'
UNION ALL
SELECT 'Pending enrollments:', COUNT(*) FROM public.enrollments WHERE status = 'pending'
UNION ALL
SELECT 'Rejected enrollments:', COUNT(*) FROM public.enrollments WHERE status = 'rejected'; 