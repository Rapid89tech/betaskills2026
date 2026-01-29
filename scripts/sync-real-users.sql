-- Sync Real Users from auth.users to profiles table
-- This will create profiles for your actual users

-- First, let's clear the sample data from profiles
DELETE FROM public.profiles;

-- Now insert real users from auth.users into profiles
INSERT INTO public.profiles (
  id,
  email,
  first_name,
  last_name,
  role,
  approved,
  approval_status,
  created_at,
  updated_at
)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'first_name', 'User') as first_name,
  COALESCE(au.raw_user_meta_data->>'last_name', '') as last_name,
  COALESCE(au.raw_user_meta_data->>'role', 'student') as role,
  true as approved, -- Auto-approve existing users
  'approved' as approval_status,
  au.created_at,
  au.updated_at
FROM auth.users au
WHERE au.email IS NOT NULL
ORDER BY au.created_at DESC;

-- Verify the sync worked
SELECT 
  'Synced Users' as status,
  COUNT(*) as count
FROM public.profiles
UNION ALL
SELECT 
  'Total Auth Users' as status,
  COUNT(*) as count
FROM auth.users
WHERE email IS NOT NULL;
