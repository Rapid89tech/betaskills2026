// Utility to clear all fake enrollment data from localStorage
export const clearFakeEnrollmentData = () => {
  console.log('🧹 Clearing fake enrollment data from localStorage...');
  
  try {
    // Clear sample data indicators
    localStorage.removeItem('sample-data-created');
    localStorage.removeItem('test-data-created');
    
    // Clear emergency enrollments (these are usually fake)
    localStorage.removeItem('emergency-enrollments');
    
    console.log('✅ Fake enrollment data cleared from localStorage');
    return true;
  } catch (error) {
    console.error('❌ Error clearing fake enrollment data:', error);
    return false;
  }
};

// Function to check if data is fake/sample
export const isFakeEnrollment = (enrollment: any): boolean => {
  if (!enrollment) return true;
  
  // Check for sample user IDs (obvious fake data)
  const sampleUserIds = ['sample-user-1', 'sample-user-2', 'sample-user-3', 'sample-user-4'];
  if (sampleUserIds.includes(enrollment.user_id)) return true;
  
  // Check for sample emails (obvious fake data)
  const sampleEmails = ['student1@example.com', 'student2@example.com', 'student3@example.com', 'student4@example.com'];
  if (sampleEmails.includes(enrollment.user_email)) return true;
  
  // Check for mock/fake status (obvious fake data)
  if (enrollment.status === 'mock' || enrollment.status === 'fake') return true;
  
  // Check for sample payment references (obvious fake data)
  const samplePaymentRefs = ['PAY-001', 'PAY-002', 'PAY-003', 'PAY-004'];
  if (samplePaymentRefs.includes(enrollment.payment_ref)) return true;
  
  // Check for obvious test data patterns
  if (enrollment.user_id === 'user-local' && !enrollment.user_email) return true;
  
  // Check for enrollment data without proper structure
  if (!enrollment.course_id && !enrollment.courseId) return true;
  
  return false;
};

// Function to filter out fake enrollments
export const filterRealEnrollments = (enrollments: any[]): any[] => {
  return enrollments.filter(enrollment => !isFakeEnrollment(enrollment));
};

// Function to get all enrollments for instructor view (including pending ones)
export const getAllEnrollmentsForInstructor = (): any[] => {
  try {
    const allEnrollments: any[] = [];
    
    // Get from general localStorage
    const localEnrollments = localStorage.getItem('enrollments');
    if (localEnrollments) {
      const parsed = JSON.parse(localEnrollments);
      allEnrollments.push(...parsed);
    }
    
    // Get from user-specific caches
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('user-enrollments-')) {
        try {
          const userEnrollments = JSON.parse(localStorage.getItem(key) || '[]');
          allEnrollments.push(...userEnrollments);
        } catch (error) {
          console.warn('Error parsing user enrollments:', error);
        }
      }
    });
    
    // Filter out only obvious fake data, preserve real enrollments
    const realEnrollments = filterRealEnrollments(allEnrollments);
    
    // Remove duplicates
    const uniqueEnrollments = realEnrollments.filter((enrollment, index, self) => 
      index === self.findIndex(e => e.id === enrollment.id)
    );
    
    return uniqueEnrollments;
  } catch (error) {
    console.error('Error getting all enrollments for instructor:', error);
    return [];
  }
};

// Make available globally for debugging (development only)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).clearFakeEnrollmentData = clearFakeEnrollmentData;
  (window as any).isFakeEnrollment = isFakeEnrollment;
  (window as any).filterRealEnrollments = filterRealEnrollments;
  (window as any).getAllEnrollmentsForInstructor = getAllEnrollmentsForInstructor;
}
