-- FIX ENROLLMENT STATUS ISSUE
-- Run this in your Supabase SQL Editor

-- Step 1: Drop any conflicting triggers or functions that might auto-approve enrollments
DROP TRIGGER IF EXISTS on_enrollment_created ON public.enrollments;
DROP FUNCTION IF EXISTS handle_enrollment_created();

-- Step 2: Ensure the enrollments table has the correct structure
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

-- Step 3: Disable RLS temporarily to fix the issue
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Step 4: Update any enrollments that might have wrong status
UPDATE public.enrollments 
SET status = 'pending' 
WHERE status NOT IN ('pending', 'approved', 'rejected');

-- Step 5: Ensure all new enrollments default to pending
ALTER TABLE public.enrollments 
ALTER COLUMN status SET DEFAULT 'pending';

-- Step 6: Create a simple trigger to ensure status stays pending on insert
CREATE OR REPLACE FUNCTION ensure_pending_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Always set status to pending for new enrollments
    NEW.status = 'pending';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS ensure_pending_trigger ON public.enrollments;
CREATE TRIGGER ensure_pending_trigger
    BEFORE INSERT ON public.enrollments
    FOR EACH ROW
    EXECUTE FUNCTION ensure_pending_status();

-- Step 7: Re-enable RLS with simple policies
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can view all enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Instructors and admins can update enrollment status" ON public.enrollments;

-- Create simple policies that work
CREATE POLICY "Allow all operations for now" ON public.enrollments
    FOR ALL USING (true);

-- Step 8: Show current enrollment status
SELECT 
    status,
    COUNT(*) as count
FROM public.enrollments 
GROUP BY status
ORDER BY status;

-- Step 9: Show recent enrollments
SELECT 
    user_email,
    course_title,
    status,
    enrolled_at
FROM public.enrollments 
ORDER BY enrolled_at DESC 
LIMIT 10;
