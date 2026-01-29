-- Setup admin user and grant access to all courses
-- User: ericmnisi007@gmail.com

-- Step 1: Update user role to admin
UPDATE profiles 
SET role = 'admin', 
    approved = true, 
    approval_status = 'approved'
WHERE email = 'ericmnisi007@gmail.com';

-- Step 2: Get the user_id for the admin user
DO $$
DECLARE
    admin_user_id UUID;
    course_record RECORD;
BEGIN
    -- Get the admin user's ID
    SELECT id INTO admin_user_id 
    FROM profiles 
    WHERE email = 'ericmnisi007@gmail.com';

    -- If user exists, grant access to all courses
    IF admin_user_id IS NOT NULL THEN
        -- List of all available courses
        FOR course_record IN 
            SELECT unnest(ARRAY[
                'entrepreneurship-final',
                'ai-human-relations',
                'roofing101',
                'plumbing101',
                'tiling-101',
                'hair-dressing',
                'nail-technician',
                'motor-mechanic-petrol-02',
                'motor-mechanic-diesel',
                'landscaping101',
                'social-media-marketing-101',
                'electrician101',
                'solar101',
                'carpentry101',
                'podcast-management-101',
                'computer-repairs',
                'cellphone-repairs-101',
                'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5',
                'masterchef101',
                'cybersecurity101',
                'doggrooming101',
                'beautyTherapy101',
                'emotional-intelligence'
            ]) AS course_id
        LOOP
            -- Insert or update enrollment for each course
            INSERT INTO enrollments (
                user_id,
                course_id,
                status,
                enrolled_at,
                approved_at,
                payment_type,
                progress
            )
            VALUES (
                admin_user_id,
                course_record.course_id,
                'approved',
                NOW(),
                NOW(),
                'manual',
                0
            )
            ON CONFLICT (user_id, course_id) 
            DO UPDATE SET
                status = 'approved',
                approved_at = NOW(),
                payment_type = 'manual';
        END LOOP;

        RAISE NOTICE 'Admin user setup complete for ericmnisi007@gmail.com';
    ELSE
        RAISE NOTICE 'User ericmnisi007@gmail.com not found. Please ensure the user has registered first.';
    END IF;
END $$;

-- Verify the setup
SELECT 
    p.email,
    p.role,
    p.approved,
    COUNT(e.id) as total_enrollments,
    COUNT(CASE WHEN e.status = 'approved' THEN 1 END) as approved_enrollments
FROM profiles p
LEFT JOIN enrollments e ON p.id = e.user_id
WHERE p.email = 'ericmnisi007@gmail.com'
GROUP BY p.email, p.role, p.approved;
