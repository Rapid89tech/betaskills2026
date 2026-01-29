# Grant Full Course Access to maxmon2@gmail.com

## Quick Instructions

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `grant-access-maxmon2-simple.sql`
4. Click **Run** to execute the script

### Option 2: Using Supabase CLI

```bash
# Make sure you're logged in to Supabase
supabase login

# Run the SQL script
supabase db execute -f scripts/grant-access-maxmon2-simple.sql
```

## What This Does

The script will:
- ✅ Grant access to ALL 22 courses for maxmon2@gmail.com
- ✅ Set enrollment status to 'active'
- ✅ Set payment status to 'completed'
- ✅ Initialize progress to 0%
- ✅ Handle conflicts (won't duplicate if already enrolled)

## Courses Included

1. Cybersecurity 101
2. Emotional Intelligence
3. Prophet (NEW!)
4. Entrepreneurship Final
5. AI-Assisted Programming
6. AI-Assisted Web Development
7. Christian Teacher
8. Podcast Management 101
9. Sound Engineering 102
10. Computer Repairs
11. Roofing
12. Plumbing
13. Tiling 101
14. Hair Dressing
15. Nail Technician
16. Petrol Motor Mechanic
17. Diesel Motor Mechanic
18. Landscaping
19. Social Media Marketing 101
20. Master Electrician Online
21. Beauty Therapy 101
22. Dog Grooming 101

## Button Behavior

Once the enrollments are created:
- ✅ Course cards will automatically show **"Continue"** button instead of "Enroll Now"
- ✅ User can access all course content immediately
- ✅ Progress tracking will be enabled for all courses

## Verification

After running the script, you can verify by running:

```sql
SELECT 
    u.email,
    COUNT(e.course_id) as enrolled_courses,
    array_agg(e.course_id ORDER BY e.course_id) as courses
FROM public.enrollments e
JOIN auth.users u ON e.user_id = u.id
WHERE u.email = 'maxmon2@gmail.com'
GROUP BY u.email;
```

This should show 22 enrolled courses.

## Troubleshooting

If the user doesn't exist:
```sql
-- Check if user exists
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'maxmon2@gmail.com';
```

If no results, the user needs to sign up first at https://betaskills.co.za
