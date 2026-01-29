/**
 * Disable Problematic Sync Operations
 * This utility helps prevent infinite sync loops and problematic operations
 * that can cause the admin dashboard to get stuck in loading states
 */

// Disable problematic sync operations when on admin pages
export const disableProblematicSync = () => {
  // Check if we're on an admin page
  const isAdminPage = window.location.pathname.includes('/admin') || 
                     window.location.pathname.includes('/simple-admin') ||
                     window.location.pathname.includes('/ultra-simple-admin');

  if (isAdminPage) {
    console.log('🛡️ Admin page detected - COMPLETELY DISABLING all sync operations');
    
    // Disable page visibility API listeners that might cause infinite loops
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = function(type: string, listener: any, options?: any) {
      if (isAdminPage && (type === 'visibilitychange' || type === 'storage')) {
        console.log(`🚫 Blocked ${type} listener on admin page`);
        return;
      }
      return originalAddEventListener.call(this, type, listener, options);
    };

    // Disable window focus/blur events that might trigger sync
    const originalWindowAddEventListener = window.addEventListener;
    window.addEventListener = function(type: string, listener: any, options?: any) {
      if ((type === 'focus' || type === 'blur') && isAdminPage) {
        console.log(`🚫 Blocked ${type} listener on admin page`);
        return;
      }
      return originalWindowAddEventListener.call(this, type, listener, options);
    };

    // Block sync-related intervals but allow admin dashboard intervals
    const originalSetInterval = window.setInterval;
    window.setInterval = function(callback: any, delay: number, ...args: any[]) {
      if (isAdminPage) {
        // Allow longer intervals that might be admin dashboard related
        if (delay >= 30000) { // 30 seconds or more - likely admin dashboard
          return originalSetInterval.call(this, callback, delay, ...args);
        }
        console.log('🚫 BLOCKED sync interval on admin page:', delay);
        return 0; // Return invalid interval ID
      }
      return originalSetInterval.call(this, callback, delay, ...args);
    };

    // Block sync-related timeouts but allow admin dashboard timeouts
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(callback: any, delay: number, ...args: any[]) {
      if (isAdminPage) {
        // Allow longer timeouts that might be admin dashboard related
        if (delay >= 10000) { // 10 seconds or more - likely admin dashboard
          return originalSetTimeout.call(this, callback, delay, ...args);
        }
        console.log('🚫 BLOCKED sync timeout on admin page:', delay);
        return 0; // Return invalid timeout ID
      }
      return originalSetTimeout.call(this, callback, delay, ...args);
    };
  }
};

// Initialize the protection
disableProblematicSync();

// Re-apply protection on navigation
let currentPath = window.location.pathname;
const checkPathChange = () => {
  if (window.location.pathname !== currentPath) {
    currentPath = window.location.pathname;
    disableProblematicSync();
  }
};

// Check for path changes every 2 seconds
setInterval(checkPathChange, 2000);

// Also check on popstate (back/forward navigation)
window.addEventListener('popstate', () => {
  setTimeout(disableProblematicSync, 100);
});

// Check on hashchange
window.addEventListener('hashchange', () => {
  setTimeout(disableProblematicSync, 100);
});
