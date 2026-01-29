// Utility to create sample enrollment data for testing the dashboard
export const createSampleEnrollmentData = (userId: string) => {
  const sampleEnrollments = [
    {
      course_id: 'roofing',
      user_id: userId,
      course_title: 'Professional Roofing Certification',
      progress: 0.75, // 75%
      status: 'approved',
      enrolled_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    },
    {
      course_id: 'plumbing',
      user_id: userId,
      course_title: 'Professional Plumbing Training Program',
      progress: 0.45, // 45%
      status: 'approved',
      enrolled_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      course_id: 'podcast-management',
      user_id: userId,
      course_title: 'Mastering Podcast Management',
      progress: 1.0, // 100% - completed
      status: 'approved',
      enrolled_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    },
  ];

  return sampleEnrollments;
};

// Function to populate sample data if no enrollments exist
export const ensureSampleEnrollmentData = (userId: string) => {
  // Check if any enrollment data exists
  const hasEnrollments = 
    localStorage.getItem('enrollments') ||
    localStorage.getItem(`user-enrollments-${userId}`) ||
    localStorage.getItem('emergency-enrollments');

  if (!hasEnrollments) {
    console.log('📝 No enrollment data found, creating sample data for testing...');
    const sampleData = createSampleEnrollmentData(userId);
    
    // Save sample data to localStorage
    localStorage.setItem('enrollments', JSON.stringify(sampleData));
    localStorage.setItem(`user-enrollments-${userId}`, JSON.stringify(sampleData));
    
    // Also create some progress data
    sampleData.forEach(enrollment => {
      const progressPercent = Math.round(enrollment.progress * 100);
      localStorage.setItem(`course-progress-${enrollment.course_id}`, progressPercent.toString());
      
      // Create some completed lessons based on progress
      const estimatedLessons = 20; // Rough estimate
      const completedCount = Math.floor((enrollment.progress) * estimatedLessons);
      const completedLessons = Array.from({ length: completedCount }, (_, i) => i);
      localStorage.setItem(`completed-lessons-${enrollment.course_id}`, JSON.stringify(completedLessons));
    });
    
    console.log('✅ Sample enrollment data created:', sampleData);
    return true;
  }

  return false;
};

// Make available globally for testing (development only)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).createSampleEnrollmentData = createSampleEnrollmentData;
  (window as any).ensureSampleEnrollmentData = ensureSampleEnrollmentData;
}
