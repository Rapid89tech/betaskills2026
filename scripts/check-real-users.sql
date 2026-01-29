-- Check Real Users in Supabase Database
-- This script will help identify your actual users vs sample data

-- 1. Check auth.users table (real users from Supabase Auth)
SELECT 
  id,
  email,
  raw_user_meta_data,
  created_at,
  updated_at
FROM auth.users
ORDER BY created_at DESC;

-- 2. Check profiles table (what we're currently showing)
SELECT 
  id,
  email,
  first_name,
  last_name,
  role,
  approved,
  approval_status,
  created_at
FROM public.profiles
ORDER BY created_at DESC;

-- 3. Compare auth.users with profiles to see missing profiles
SELECT 
  au.id,
  au.email,
  au.created_at as auth_created_at,
  p.id as profile_id,
  p.created_at as profile_created_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ORDER BY au.created_at DESC;

-- 4. Count total users in each table
SELECT 
  'auth.users' as table_name,
  COUNT(*) as user_count
FROM auth.users
UNION ALL
SELECT 
  'public.profiles' as table_name,
  COUNT(*) as user_count
FROM public.profiles;
