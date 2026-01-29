/**
 * Enrollment Diagnostic Utility
 * Helps identify issues with the enrollment flow
 */

export const diagnoseEnrollmentIssue = (courseId: string, user: any, courses: any[]) => {
  console.log('🔍 ENROLLMENT DIAGNOSTIC START');
  console.log('================================');
  
  // Check course ID
  console.log('📋 Course ID:', courseId);
  console.log('📋 Course ID type:', typeof courseId);
  console.log('📋 Course ID length:', courseId?.length);
  
  // Check if course exists
  const course = courses?.find(c => c.id === courseId);
  console.log('📋 Course found:', !!course);
  if (course) {
    console.log('📋 Course title:', course.title);
    console.log('📋 Course price:', course.price);
  } else {
    console.log('❌ Available course IDs:', courses?.map(c => c.id));
  }
  
  // Check user
  console.log('👤 User logged in:', !!user);
  if (user) {
    console.log('👤 User ID:', user.id);
    console.log('👤 User email:', user.email);
  }
  
  // Check URL construction
  const paymentUrl = `/payment/${courseId}`;
  console.log('🔗 Payment URL:', paymentUrl);
  
  // Check for special characters that might cause issues
  const hasSpecialChars = /[^a-zA-Z0-9-_]/.test(courseId);
  console.log('⚠️ Course ID has special characters:', hasSpecialChars);
  
  console.log('================================');
  console.log('🔍 ENROLLMENT DIAGNOSTIC END');
  
  return {
    courseId,
    courseExists: !!course,
    userLoggedIn: !!user,
    paymentUrl,
    hasSpecialChars,
    course
  };
};