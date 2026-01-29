-- Grant full access to all courses for maxmon2@gmail.com
-- This script will create enrollment records for all available courses

-- First, get the user ID for maxmon2@gmail.com
DO $$
DECLARE
    v_user_id UUID;
    v_course_record RECORD;
BEGIN
    -- Get the user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'maxmon2@gmail.com';

    -- Check if user exists
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User maxmon2@gmail.com not found';
    END IF;

    -- List of all course IDs to grant access to
    FOR v_course_record IN 
        SELECT unnest(ARRAY[
            'cybersecurity101',
            'emotional-intelligence',
            'prophet',
            'entrepreneurship-final',
            'ai-assisted-programming',
            'ai-assisted-web-development',
            'christian-teacher',
            'podcast-management-101',
            'sound-engineering-102',
            'computer-repairs',
            'roofing',
            'plumbing',
            'tiling-101',
            'hair-dressing',
            'nail-technician',
            'petrol-motor-mechanic',
            'diesel-motor-mechanic',
            'landscaping',
            'social-media-marketing-101',
            'master-electrician-online',
            'beauty-therapy-101',
            'dog-grooming-101'
        ]) AS course_id
    LOOP
        -- Insert or update enrollment for each course
        INSERT INTO public.enrollments (
            user_id,
            course_id,
            status,
            enrolled_at,
            progress,
            payment_status
        )
        VALUES (
            v_user_id,
            v_course_record.course_id,
            'active',
            NOW(),
            0,
            'completed'
        )
        ON CONFLICT (user_id, course_id) 
        DO UPDATE SET
            status = 'active',
            payment_status = 'completed',
            enrolled_at = COALESCE(enrollments.enrolled_at, NOW());

        RAISE NOTICE 'Granted access to course: %', v_course_record.course_id;
    END LOOP;

    RAISE NOTICE 'Successfully granted full access to all courses for maxmon2@gmail.com';
END $$;

-- Verify the enrollments
SELECT 
    u.email,
    e.course_id,
    e.status,
    e.payment_status,
    e.enrolled_at
FROM public.enrollments e
JOIN auth.users u ON e.user_id = u.id
WHERE u.email = 'maxmon2@gmail.com'
ORDER BY e.course_id;
