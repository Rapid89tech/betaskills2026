/**
 * Simple enrollment flow test utility
 */

export const testEnrollmentFlow = (courseId: string, courses: any[], user: any) => {
  console.log('🧪 TESTING ENROLLMENT FLOW');
  console.log('==========================');
  
  // Test 1: Course ID validation
  console.log('Test 1: Course ID validation');
  console.log('- Course ID:', courseId);
  console.log('- Type:', typeof courseId);
  console.log('- Length:', courseId?.length);
  console.log('- Valid format:', /^[a-zA-Z0-9-_]+$/.test(courseId));
  
  // Test 2: Course existence
  console.log('\nTest 2: Course existence');
  const course = courses?.find(c => c.id === courseId);
  console.log('- Course found:', !!course);
  if (course) {
    console.log('- Course title:', course.title);
    console.log('- Course price:', course.price);
  }
  
  // Test 3: User authentication
  console.log('\nTest 3: User authentication');
  console.log('- User logged in:', !!user);
  if (user) {
    console.log('- User ID:', user.id);
    console.log('- User email:', user.email);
  }
  
  // Test 4: URL construction
  console.log('\nTest 4: URL construction');
  const paymentUrl = `/payment/${courseId}`;
  console.log('- Payment URL:', paymentUrl);
  console.log('- URL length:', paymentUrl.length);
  
  // Test 5: Overall readiness
  console.log('\nTest 5: Overall readiness');
  const isReady = !!(courseId && course && user);
  console.log('- Ready for enrollment:', isReady);
  
  console.log('==========================');
  console.log('🧪 ENROLLMENT FLOW TEST COMPLETE');
  
  return {
    courseId,
    courseExists: !!course,
    userLoggedIn: !!user,
    paymentUrl,
    isReady
  };
};