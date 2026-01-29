# Payment Success "Course Not Found" Error - Fix Documentation

## Problem

After completing a payment, users see "Payment Successful" but then get redirected to a "Course not found" error page.

## Root Causes Identified

1. **Invalid or Malformed Course ID**: The courseId from the payment URL might be corrupted or not match any course in the system
2. **Course Not Loaded**: The course might not have a loader defined in `useCourseData.tsx`
3. **Timing Issue**: The enrollment data might not be persisted before the redirect happens
4. **URL Parameter Issues**: Extra parameters or special characters in the courseId

## Fixes Implemented

### 1. Enhanced Course ID Validation (PaymentSuccess.tsx)

```typescript
// Clean and validate courseId
const courseId = courseIdRaw ? courseIdRaw.split('?')[0].trim() : null;

// Validate before redirecting
if (courseId.includes('/') || courseId.includes('\\') || courseId.length > 100) {
  console.error('❌ Invalid courseId format:', courseId);
  toast({ title: "Invalid Course ID", variant: "destructive" });
  navigate('/courses');
  return;
}
```

### 2. Added Debugging Logs

```typescript
React.useEffect(() => {
  console.log('🔍 PaymentSuccess: URL Parameters:', {
    courseIdRaw,
    courseId,
    paymentId,
    allParams: Object.fromEntries(searchParams.entries())
  });
}, [courseIdRaw, courseId, paymentId, searchParams]);
```

### 3. Improved Course Not Found Handling (Course.tsx)

```typescript
if (!course) {
  // Auto-redirect after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/courses');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Course Not Found</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Redirecting you to the courses page...</p>
        <Button onClick={() => navigate('/courses')}>
          Go to Courses Now
        </Button>
      </CardContent>
    </Card>
  );
}
```

### 4. Added Delay Before Redirect

```typescript
const handleContinue = () => {
  if (courseId) {
    // Add 500ms delay to ensure enrollment data is persisted
    setTimeout(() => {
      navigate(`/course/${courseId}?from_payment=true`);
    }, 500);
  }
};
```

## How to Debug

### 1. Check Browser Console

After payment, check the console for these logs:

```
🔍 PaymentSuccess: URL Parameters: { courseIdRaw, courseId, paymentId, ... }
🚀 InstantPaymentSuccess: Creating direct enrollment for user: ...
✅ InstantPaymentSuccess: Supabase enrollment created: ...
✅ InstantPaymentSuccess: Enrollment saved to localStorage: ...
🎯 PaymentSuccess: Redirecting to course with payment flag: ...
```

### 2. Check localStorage

Open DevTools > Application > Local Storage and verify:

- `enrollment-{courseId}` exists
- `user-enrollment-{userId}-{courseId}` exists
- `recent-payment-{userId}-{courseId}` exists
- `enrollments` array contains the new enrollment

### 3. Verify Course ID

The courseId should match one of these formats:
- `plumbing101`
- `roofing101`
- `ai-human-relations`
- `entrepreneurship-final`
- etc.

Check `src/hooks/useCourseData.tsx` for the full list of valid course IDs in the `courseLoaders` object.

## Common Issues and Solutions

### Issue 1: Course ID Not in Course Loaders

**Symptom**: Course not found even with valid-looking ID

**Solution**: Add the course to the `courseLoaders` object in `useCourseData.tsx`:

```typescript
const courseLoaders: Record<string, () => Promise<...>> = {
  'your-course-id': () => import('@/data/yourCourse').then(m => ({ default: m.yourCourse })),
  // ... other courses
};
```

### Issue 2: Enrollment Not Persisting

**Symptom**: Payment succeeds but enrollment not showing

**Solution**: Check `InstantPaymentSuccess.tsx` is saving to all required localStorage keys:
- `enrollment-{courseId}`
- `user-enrollment-{userId}-{courseId}`
- `enrollments` (global array)
- `user-enrollments-{userId}` (user-specific array)
- `recent-payment-{userId}-{courseId}` (flag for immediate access)

### Issue 3: Timing Issues

**Symptom**: Sometimes works, sometimes doesn't

**Solution**: Increase the delay before redirect in `PaymentSuccess.tsx`:

```typescript
setTimeout(() => {
  navigate(`/course/${courseId}?from_payment=true`);
}, 1000); // Increase from 500ms to 1000ms
```

### Issue 4: URL Parameters Corrupted

**Symptom**: courseId contains extra characters or parameters

**Solution**: The fix already handles this by splitting on '?' and trimming:

```typescript
const courseId = courseIdRaw ? courseIdRaw.split('?')[0].trim() : null;
```

## Testing Checklist

- [ ] Make a test payment
- [ ] Check console logs for courseId
- [ ] Verify enrollment is created in Supabase
- [ ] Verify enrollment is saved to localStorage
- [ ] Confirm redirect to correct course page
- [ ] Verify course loads without "not found" error
- [ ] Check enrollment status shows as "approved"
- [ ] Verify course content is accessible

## Fallback Behavior

If course is not found:
1. Show "Course Not Found" message
2. Display "Redirecting..." text
3. Auto-redirect to `/courses` after 3 seconds
4. Provide manual "Go to Courses Now" button
5. User can find their enrolled course in the courses list

## Prevention

To prevent this issue in the future:

1. **Always validate courseId** before creating payment links
2. **Ensure course exists** in `courseLoaders` before allowing enrollment
3. **Test payment flow** for each new course added
4. **Monitor console logs** in production for courseId errors
5. **Add course ID validation** in the payment initiation flow

## Related Files

- `src/pages/PaymentSuccess.tsx` - Payment success page with redirect logic
- `src/pages/Course.tsx` - Course page with "not found" handling
- `src/hooks/useCourseData.tsx` - Course loading logic with courseLoaders
- `src/components/InstantPaymentSuccess.tsx` - Enrollment creation and persistence
- `src/services/directEnrollmentService.ts` - Direct enrollment service

## Support

If users continue to experience this issue:

1. Ask for the courseId from the URL
2. Check if course exists in courseLoaders
3. Verify enrollment was created in Supabase
4. Check localStorage for enrollment data
5. Manually grant access if needed through admin dashboard
