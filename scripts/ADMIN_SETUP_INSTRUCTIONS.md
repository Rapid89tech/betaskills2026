# Admin User Setup Instructions

## Setting up Sam Cook (ericmnisi007@gmail.com) as Admin

### Prerequisites
1. The user must first register on the platform at `/auth`
2. Access to Supabase SQL Editor

### Step 1: Verify User Registration
First, check if the user exists in the database:

```sql
SELECT id, email, role, approved 
FROM profiles 
WHERE email = 'ericmnisi007@gmail.com';
```

### Step 2: Update User Role to Admin
Run this SQL command in Supabase SQL Editor:

```sql
UPDATE profiles 
SET 
    role = 'admin', 
    approved = true, 
    approval_status = 'approved'
WHERE email = 'ericmnisi007@gmail.com' OR email = 'samcook@example.com';
```

### Step 3: Grant Access to All Courses
Get the user ID from Step 1, then run:

```sql
-- Replace 'USER_ID_HERE' with the actual UUID from Step 1
INSERT INTO enrollments (user_id, course_id, status, enrolled_at, approved_at, payment_type, progress)
SELECT 
    'USER_ID_HERE'::uuid,
    course_id,
    'approved',
    NOW(),
    NOW(),
    'manual',
    0
FROM unnest(ARRAY[
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
ON CONFLICT (user_id, course_id) DO UPDATE SET
    status = 'approved',
    approved_at = NOW(),
    payment_type = 'manual';
```

### Step 4: Verify Setup
Check that everything is set up correctly:

```sql
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
```

Expected result:
- role: 'admin'
- approved: true
- total_enrollments: 23 (or number of available courses)
- approved_enrollments: 23

## Admin Features

Once set up, the admin user will have:

1. **Full Course Access**: Access to all courses without enrollment
2. **Admin Dashboard**: Access to `/admin` route
3. **Special Badge**: Purple "👑 Admin Access" button on course cards
4. **No Payment Required**: Direct access to all course content

## Security Features

The admin dashboard is protected by:
- Authentication check (must be logged in)
- Role-based access control (must have role='admin')
- Automatic redirect to login if not authenticated
- Access denied page if not admin

## Troubleshooting

If the admin user cannot access the dashboard:
1. Verify the user is logged in
2. Check the user's role in the database
3. Clear browser cache and reload
4. Check browser console for errors

If courses don't show as accessible:
1. Verify enrollments were created in Step 3
2. Check that all course IDs match exactly
3. Refresh the page to reload user data
