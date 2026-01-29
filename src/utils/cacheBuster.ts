/**
 * Cache Busting Utility
 * Helps prevent browser cache issues by providing versioned URLs and cache invalidation
 */

// Generate a unique cache buster based on build time
export const getCacheBuster = (): string => {
  // Use build timestamp if available, otherwise use current time
  const buildTime = import.meta.env.VITE_BUILD_TIME || new Date().toISOString();
  return buildTime.replace(/[^a-zA-Z0-9]/g, '').slice(-8);
};

// Add cache buster to URLs
export const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${getCacheBuster()}`;
};

// Clear various types of caches
export const clearApplicationCache = async (): Promise<void> => {
  try {
    // Clear localStorage (except for user data)
    const keysToKeep = [
      'user',
      'profile',
      'auth-token',
      'user-preferences',
      'course-progress-',
      'completed-lessons-',
      'progress-',
      'completedLessons-'
    ];
    
    const allKeys = Object.keys(localStorage);
    const keysToRemove = allKeys.filter(key => 
      !keysToKeep.some(keepKey => key.includes(keepKey))
    );
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear IndexedDB if available
    if ('indexedDB' in window) {
      try {
        const databases = await indexedDB.databases();
        await Promise.all(
          databases.map(db => {
            if (db.name) {
              return new Promise<void>((resolve, reject) => {
                const deleteReq = indexedDB.deleteDatabase(db.name);
                deleteReq.onsuccess = () => resolve();
                deleteReq.onerror = () => reject(deleteReq.error);
              });
            }
          })
        );
      } catch (error) {
        console.warn('Could not clear IndexedDB:', error);
      }
    }
    
    // Clear service worker cache if available
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      } catch (error) {
        console.warn('Could not clear service worker cache:', error);
      }
    }
    
    console.log('✅ Application cache cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing application cache:', error);
  }
};

// Force reload with cache busting
export const forceReload = (): void => {
  // Add cache buster to current URL
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('v', getCacheBuster());
  currentUrl.searchParams.set('_t', Date.now().toString());
  
  // Force reload
  window.location.href = currentUrl.toString();
};

// Check if cache needs to be cleared based on build timestamp
export const checkCacheValidity = (): boolean => {
  try {
    const storedBuildTime = localStorage.getItem('app-build-time');
    const currentBuildTime = import.meta.env.VITE_BUILD_TIME || new Date().toISOString();
    
    if (!storedBuildTime) {
      localStorage.setItem('app-build-time', currentBuildTime);
      return true;
    }
    
    // If build times don't match, cache is invalid
    if (storedBuildTime !== currentBuildTime) {
      console.log('🔄 Build time changed, cache may be stale');
      localStorage.setItem('app-build-time', currentBuildTime);
      return false;
    }
    
    return true;
  } catch (error) {
    console.warn('Could not check cache validity:', error);
    return true;
  }
};

// Auto-clear cache on build time change
export const autoClearStaleCache = async (): Promise<void> => {
  if (!checkCacheValidity()) {
    console.log('🧹 Clearing stale cache due to build time change');
    await clearApplicationCache();
  }
};

// Add cache buster to fetch requests
export const fetchWithCacheBuster = async (url: string, options?: RequestInit): Promise<Response> => {
  const bustedUrl = addCacheBuster(url);
  return fetch(bustedUrl, {
    ...options,
    headers: {
      ...options?.headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
};
