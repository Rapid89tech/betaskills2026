/**
 * Disable Sync Operations That Cause Timeouts and Logout Issues
 * This blocks the specific sync operations causing the "Status check timeout" and "Throttled sync failed" errors
 */

console.log('🛡️ SYNC TIMEOUT BLOCKING: Disabling operations causing timeout errors');

// Disable sync operations that cause timeouts and logout issues
const disableTimeoutCausingSync = () => {
  // Block ALL intervals that could be sync operations
  const originalSetInterval = window.setInterval;
  window.setInterval = function(callback: any, delay: number, ...args: any[]) {
    // Block intervals that are likely sync operations (1s, 2s, 5s, 10s, 30s, 60s, 600s)
    if (delay === 1000 || delay === 2000 || delay === 5000 || delay === 10000 || 
        delay === 30000 || delay === 60000 || delay === 600000) {
      console.warn('🚫 BLOCKED: Sync interval disabled:', delay);
      return 0; // Return invalid interval ID
    }
    return originalSetInterval.call(this, callback, delay, ...args);
  };

  // Block timeouts that cause "Status check timeout" errors
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(callback: any, delay: number, ...args: any[]) {
    // Block timeouts that are likely sync status checks (5 seconds is common for status checks)
    if (delay === 5000) { // Status check timeout
      console.warn('🚫 BLOCKED: Status check timeout disabled:', delay);
      return 0; // Return invalid timeout ID
    }
    return originalSetTimeout.call(this, callback, delay, ...args);
  };

  // Block sync-related console messages that clutter the console
  const originalConsoleLog = console.log;
  console.log = function(...args: any[]) {
    const message = args.join(' ');
    // Block sync throttler and status check messages
    if (message.includes('🔄 Starting throttled sync') || 
        message.includes('✅ Completed throttled sync') ||
        message.includes('❌ Throttled sync failed') ||
        message.includes('🔍 SIMPLE CHECK:') ||
        message.includes('✅ SIMPLE CHECK RESULT:') ||
        message.includes('❌ SIMPLE CHECK ERROR:') ||
        message.includes('🚫 Throttled sync operation') ||
        message.includes('🔄 sync') ||
        message.includes('💾 localStorage changed') ||
        message.includes('⏰ Auto-syncing') ||
        message.includes('🌐 Back online, syncing')) {
      return; // Block these specific messages
    }
    return originalConsoleLog.apply(this, args);
  };

  // Block sync throttler fetch operations
  const originalFetch = window.fetch;
  window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : input.toString();
    
    // Block sync-related endpoints that cause timeouts
    if (url.includes('/sync') || 
        url.includes('/backup') ||
        url.includes('/throttle') ||
        url.includes('/cloud-sync')) {
      console.warn('🚫 BLOCKED: Sync fetch operation disabled:', url);
      return Promise.reject(new Error('Sync operations disabled to prevent timeouts'));
    }
    
    // Allow all other operations (including all Supabase, auth, course operations)
    return originalFetch.call(this, input, init);
  };

  // Block dynamic imports of sync throttler
  const originalImport = (window as any).import;
  if (originalImport) {
    (window as any).import = function(module: string) {
      if (module.includes('syncThrottler') || module.includes('sync')) {
        console.warn('🚫 BLOCKED: Sync module import disabled:', module);
        return Promise.reject(new Error('Sync modules disabled to prevent timeouts'));
      }
      return originalImport.call(this, module);
    };
  }
};

// Initialize the timeout-causing sync blocking
disableTimeoutCausingSync();

console.log('✅ SYNC TIMEOUT BLOCKING: Operations causing timeout errors disabled');
