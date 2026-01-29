// Cloud Sync Setup and Debugging Utilities

export const checkCloudSyncStatus = () => {
  console.log('🔍 Cloud Sync Status Check:');
  
  // Check if user is logged in
  const userEmail = localStorage.getItem('user-email');
  console.log('👤 User Email:', userEmail);
  
  // Check local enrollments
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
  console.log('📦 Local Enrollments:', enrollments.length);
  
  // Check course progress
  const progressKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('course-progress-')
  );
  console.log('📊 Course Progress Keys:', progressKeys);
  
  // Check if tables exist (this will show in console)
  console.log('🔧 To create database tables, run the SQL script in Supabase SQL Editor');
  console.log('📋 Copy the contents of setup-cloud-sync.sql and run it in Supabase');
  
  return {
    userEmail,
    enrollmentsCount: enrollments.length,
    progressKeysCount: progressKeys.length,
  };
};

export const forceCloudSync = async () => {
  console.log('🔄 Force Cloud Sync Started');
  
  // Dispatch a custom event to trigger sync
  window.dispatchEvent(new CustomEvent('force-cloud-sync', {
    detail: { timestamp: new Date().toISOString() }
  }));
  
  // Also try to trigger sync through localStorage change
  const currentEnrollments = localStorage.getItem('enrollments') || '[]';
  localStorage.setItem('enrollments', currentEnrollments);
  
  console.log('✅ Force sync event dispatched');
};

export const clearLocalData = () => {
  console.log('🗑️ Clearing local data...');
  
  // Clear all course progress
  const progressKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('course-progress-')
  );
  progressKeys.forEach(key => localStorage.removeItem(key));
  
  // Clear enrollments
  localStorage.removeItem('enrollments');
  
  console.log('✅ Local data cleared. Refresh the page to reload from cloud.');
};

export const setupInstructions = () => {
  console.log(`
🔧 CLOUD SYNC SETUP INSTRUCTIONS:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your Beta Skills project
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the entire contents of setup-cloud-sync.sql
6. Click "Run" to execute the script
7. You should see: "Cloud sync tables created successfully!"

After running the script:
- Refresh your browser
- The cloud sync status should change from "Tables not created" to "Last synced: [time]"
- Your data will now sync across all devices

Need help? Check the console for any error messages.
  `);
};

// Add these functions to window for easy access
if (typeof window !== 'undefined') {
  (window as any).checkCloudSyncStatus = checkCloudSyncStatus;
  (window as any).forceCloudSync = forceCloudSync;
  (window as any).clearLocalData = clearLocalData;
  (window as any).setupInstructions = setupInstructions;
  
  console.log(`
🛠️ Cloud Sync Debug Tools Available:

• checkCloudSyncStatus() - Check current sync status
• forceCloudSync() - Force immediate sync
• clearLocalData() - Clear local data (refresh to reload from cloud)
• setupInstructions() - Show setup instructions

Run any of these functions in the console to debug cloud sync issues.
  `);
}
