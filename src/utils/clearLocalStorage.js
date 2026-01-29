// Clear localStorage enrollments utility
// Run this in browser console to clear localStorage enrollments

export const clearLocalStorageEnrollments = () => {
  console.log('🧹 Clearing localStorage enrollments...');
  
  // Clear enrollments from localStorage
  localStorage.removeItem('enrollments');
  
  // Clear any user-specific enrollment caches
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('user-enrollments-')) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  });
  
  console.log('✅ localStorage enrollments cleared');
  
  // Trigger a page refresh to update all components
  window.location.reload();
};

// Also export a function to check what's in localStorage
export const checkLocalStorageEnrollments = () => {
  console.log('🔍 Checking localStorage enrollments...');
  
  const enrollments = localStorage.getItem('enrollments');
  console.log('📦 enrollments:', enrollments ? JSON.parse(enrollments) : 'null');
  
  const keys = Object.keys(localStorage);
  const userEnrollmentKeys = keys.filter(key => key.startsWith('user-enrollments-'));
  
  userEnrollmentKeys.forEach(key => {
    const data = localStorage.getItem(key);
    console.log(`📦 ${key}:`, data ? JSON.parse(data) : 'null');
  });
  
  return {
    enrollments: enrollments ? JSON.parse(enrollments) : null,
    userEnrollmentKeys
  };
};
