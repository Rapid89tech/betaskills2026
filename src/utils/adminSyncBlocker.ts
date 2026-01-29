/**
 * Admin Sync Blocker - Completely blocks all sync operations on admin pages
 * This is a more aggressive approach to prevent any sync operations
 * from interfering with admin dashboard loading
 */

// Check if we're on an admin page
const isAdminPage = () => {
  return window.location.pathname.includes('/admin') || 
         window.location.pathname.includes('/simple-admin') ||
         window.location.pathname.includes('/ultra-simple-admin');
};

// Block all sync-related functions on admin pages
export const blockAdminSync = () => {
  if (!isAdminPage()) return;

  console.log('🛡️ ADMIN SYNC BLOCKER: Completely blocking all sync operations');

  // Block all cloud sync operations
  const originalConsoleLog = console.log;
  console.log = function(...args: any[]) {
    const message = args.join(' ');
    if (message.includes('Auto-syncing to cloud') || 
        message.includes('Starting cloud sync') ||
        message.includes('localStorage changed, triggering') ||
        message.includes('Page became visible, checking') ||
        message.includes('Back online, syncing')) {
      console.warn('🚫 BLOCKED sync operation on admin page:', message);
      return;
    }
    return originalConsoleLog.apply(this, args);
  };

  // Block sync-related fetch operations but allow admin dashboard data fetching
  const originalFetch = window.fetch;
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    if (isAdminPage()) {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Allow admin dashboard data fetching (profiles and enrollments for admin)
      if (url.includes('supabase') && 
          (url.includes('profiles') || url.includes('enrollments')) &&
          !url.includes('user_progress')) {
        // This is admin dashboard data fetching - allow it
        return originalFetch.call(this, input, init);
      }
      
      // Block sync-related operations
      if (url.includes('supabase') && 
          (url.includes('user_progress') || url.includes('sync') || url.includes('backup'))) {
        console.warn('🚫 BLOCKED sync fetch operation on admin page:', url);
        return Promise.reject(new Error('Blocked sync operation on admin page'));
      }
    }
    return originalFetch.call(this, input, init);
  };

  // Block sync-related localStorage operations but allow admin dashboard operations
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key: string, value: string) {
    if (isAdminPage()) {
      // Block sync-related localStorage operations
      if (key.includes('progress') || key.includes('user-') || key.includes('sync') || key.includes('backup')) {
        console.warn('🚫 BLOCKED sync localStorage.setItem on admin page:', key);
        return;
      }
      
      // Allow admin dashboard localStorage operations (like auth tokens, etc.)
      if (key.includes('enrollments') || key.includes('admin') || key.includes('auth')) {
        // This might be admin dashboard data - allow it
        return originalSetItem.call(this, key, value);
      }
    }
    return originalSetItem.call(this, key, value);
  };

  // Block all addEventListener calls for sync-related events
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type: string, listener: any, options?: any) {
    if (isAdminPage() && 
        (type === 'storage' || type === 'visibilitychange' || type === 'online' || type === 'offline')) {
      console.warn('🚫 BLOCKED addEventListener on admin page:', type);
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
};

// Initialize the blocker
blockAdminSync();

// Re-apply on navigation
let currentPath = window.location.pathname;
const checkPathChange = () => {
  if (window.location.pathname !== currentPath) {
    currentPath = window.location.pathname;
    blockAdminSync();
  }
};

// Check for path changes every 2 seconds
setInterval(checkPathChange, 2000);

// Also check on popstate (back/forward navigation)
window.addEventListener('popstate', () => {
  setTimeout(blockAdminSync, 100);
});

// Check on hashchange
window.addEventListener('hashchange', () => {
  setTimeout(blockAdminSync, 100);
});
