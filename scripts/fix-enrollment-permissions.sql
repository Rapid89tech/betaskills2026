-- FIX ENROLLMENT PERMISSIONS
-- This will ensure enrollments can be created and read properly

-- 1. Disable RLS temporarily for testing
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- 2. Grant all permissions to authenticated users
GRANT ALL ON public.enrollments TO authenticated;
GRANT ALL ON public.enrollments TO anon;

-- 3. Create a simple policy for enrollments
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON public.enrollments;
CREATE POLICY "Enable all operations for authenticated users" ON public.enrollments
    FOR ALL USING (true) WITH CHECK (true);

-- 4. Verify the table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Test insert permission
-- This will be commented out to avoid creating test data
-- INSERT INTO public.enrollments (user_id, user_email, course_id, course_title, status, enrolled_at, progress)
-- VALUES ('test-user', 'test@example.com', 'test-course', 'Test Course', 'pending', NOW(), 0);

-- 6. Show current enrollments
SELECT 
  'Current Enrollments' as info,
  COUNT(*) as count
FROM public.enrollments;
