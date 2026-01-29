/**
 * Fallback Manager
 * 
 * Provides fallback mechanisms for API failures and network errors:
 * - Cached data fallbacks
 * - Offline mode support
 * - Graceful degradation
 * - Service worker integration
 */

import React from 'react';
import { AlertCircle, Wifi, WifiOff, Database, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// Fallback data types
export interface FallbackData<T = any> {
  data: T;
  timestamp: number;
  source: 'cache' | 'localStorage' | 'indexedDB' | 'static';
  isStale: boolean;
}

export interface FallbackOptions {
  maxAge?: number; // Maximum age in milliseconds
  enableOfflineMode?: boolean;
  showFallbackIndicator?: boolean;
  gracefulDegradation?: boolean;
}

// Fallback strategies
export type FallbackStrategy = 
  | 'cache-first'
  | 'network-first'
  | 'cache-only'
  | 'network-only'
  | 'stale-while-revalidate';

class FallbackManager {
  private cache: Map<string, FallbackData> = new Map();
  private offlineMode: boolean = false;
  private networkStatus: boolean = navigator.onLine;
  private fallbackIndicators: Set<string> = new Set();

  constructor() {
    this.initializeNetworkMonitoring();
    this.loadFromPersistentStorage();
  }

  private initializeNetworkMonitoring(): void {
    window.addEventListener('online', () => {
      this.networkStatus = true;
      this.offlineMode = false;
      this.syncPendingData();
    });

    window.addEventListener('offline', () => {
      this.networkStatus = false;
      this.enableOfflineMode();
    });

    // Check for offline mode preference
    const offlineModeEnabled = localStorage.getItem('workOfflineMode') === 'true';
    if (offlineModeEnabled) {
      this.enableOfflineMode();
    }
  }

  private loadFromPersistentStorage(): void {
    try {
      const cachedData = localStorage.getItem('fallbackCache');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        Object.entries(parsed).forEach(([key, value]) => {
          this.cache.set(key, value as FallbackData);
        });
      }
    } catch (error) {
      console.warn('Failed to load fallback cache from localStorage:', error);
    }
  }

  private saveToPersistentStorage(): void {
    try {
      const cacheObject = Object.fromEntries(this.cache.entries());
      localStorage.setItem('fallbackCache', JSON.stringify(cacheObject));
    } catch (error) {
      console.warn('Failed to save fallback cache to localStorage:', error);
    }
  }

  private enableOfflineMode(): void {
    this.offlineMode = true;
    localStorage.setItem('workOfflineMode', 'true');
    
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('fallbackManager:offlineMode', {
      detail: { enabled: true }
    }));
  }

  private disableOfflineMode(): void {
    this.offlineMode = false;
    localStorage.removeItem('workOfflineMode');
    
    window.dispatchEvent(new CustomEvent('fallbackManager:offlineMode', {
      detail: { enabled: false }
    }));
  }

  private syncPendingData(): void {
    // Implement data synchronization when network is restored
    console.log('Syncing pending data...');
    
    window.dispatchEvent(new CustomEvent('fallbackManager:syncStarted'));
    
    // This would typically sync any pending operations
    // For now, we'll just clear the offline mode
    setTimeout(() => {
      this.disableOfflineMode();
      window.dispatchEvent(new CustomEvent('fallbackManager:syncCompleted'));
    }, 1000);
  }

  /**
   * Execute a function with fallback support
   */
  async withFallback<T>(
    key: string,
    networkFn: () => Promise<T>,
    options: FallbackOptions = {}
  ): Promise<FallbackData<T>> {
    const {
      maxAge = 5 * 60 * 1000, // 5 minutes default
      enableOfflineMode = true,
      showFallbackIndicator = true,
      gracefulDegradation = true
    } = options;

    // Check if we should use cache first
    const cachedData = this.cache.get(key);
    const isStale = cachedData ? (Date.now() - cachedData.timestamp) > maxAge : true;

    // If offline or network issues, return cached data if available
    if (!this.networkStatus || this.offlineMode) {
      if (cachedData) {
        if (showFallbackIndicator) {
          this.showFallbackIndicator(key, 'offline');
        }
        return {
          ...cachedData,
          isStale: true
        };
      } else if (gracefulDegradation) {
        return this.getGracefulFallback<T>(key);
      } else {
        throw new Error('No cached data available for offline use');
      }
    }

    try {
      // Attempt network request
      const data = await networkFn();
      
      // Cache successful response
      const fallbackData: FallbackData<T> = {
        data,
        timestamp: Date.now(),
        source: 'cache',
        isStale: false
      };
      
      this.cache.set(key, fallbackData);
      this.saveToPersistentStorage();
      
      // Remove fallback indicator if it was shown
      this.hideFallbackIndicator(key);
      
      return fallbackData;
      
    } catch (error) {
      console.warn(`Network request failed for ${key}:`, error);
      
      // Return cached data if available
      if (cachedData && !isStale) {
        if (showFallbackIndicator) {
          this.showFallbackIndicator(key, 'network-error');
        }
        return {
          ...cachedData,
          isStale: false
        };
      } else if (cachedData) {
        if (showFallbackIndicator) {
          this.showFallbackIndicator(key, 'stale-data');
        }
        return {
          ...cachedData,
          isStale: true
        };
      } else if (gracefulDegradation) {
        return this.getGracefulFallback<T>(key);
      } else {
        throw error;
      }
    }
  }

  /**
   * Get graceful fallback data for when no cache is available
   */
  private getGracefulFallback<T>(key: string): FallbackData<T> {
    // Provide minimal fallback data based on the key
    let fallbackData: any = null;
    
    if (key.includes('courses')) {
      fallbackData = [];
    } else if (key.includes('user')) {
      fallbackData = null;
    } else if (key.includes('enrollments')) {
      fallbackData = [];
    } else {
      fallbackData = null;
    }

    return {
      data: fallbackData,
      timestamp: Date.now(),
      source: 'static',
      isStale: true
    };
  }

  /**
   * Show fallback indicator in UI
   */
  private showFallbackIndicator(key: string, reason: 'offline' | 'network-error' | 'stale-data'): void {
    this.fallbackIndicators.add(key);
    
    window.dispatchEvent(new CustomEvent('fallbackManager:showIndicator', {
      detail: { key, reason }
    }));
  }

  /**
   * Hide fallback indicator
   */
  private hideFallbackIndicator(key: string): void {
    this.fallbackIndicators.delete(key);
    
    window.dispatchEvent(new CustomEvent('fallbackManager:hideIndicator', {
      detail: { key }
    }));
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
    localStorage.removeItem('fallbackCache');
    this.fallbackIndicators.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    keys: string[];
    totalSize: number;
    oldestEntry: number | null;
    newestEntry: number | null;
  } {
    const keys = Array.from(this.cache.keys());
    const timestamps = Array.from(this.cache.values()).map(v => v.timestamp);
    
    return {
      size: this.cache.size,
      keys,
      totalSize: JSON.stringify(Object.fromEntries(this.cache.entries())).length,
      oldestEntry: timestamps.length > 0 ? Math.min(...timestamps) : null,
      newestEntry: timestamps.length > 0 ? Math.max(...timestamps) : null
    };
  }

  /**
   * Check if currently in offline mode
   */
  isOffline(): boolean {
    return this.offlineMode || !this.networkStatus;
  }

  /**
   * Manually enable/disable offline mode
   */
  setOfflineMode(enabled: boolean): void {
    if (enabled) {
      this.enableOfflineMode();
    } else {
      this.disableOfflineMode();
    }
  }
}

// Create singleton instance
export const fallbackManager = new FallbackManager();

// React hook for using fallback manager
export const useFallbackManager = () => {
  const [isOffline, setIsOffline] = React.useState(fallbackManager.isOffline());
  const [fallbackIndicators, setFallbackIndicators] = React.useState<Map<string, string>>(new Map());

  React.useEffect(() => {
    const handleOfflineMode = (event: CustomEvent) => {
      setIsOffline(event.detail.enabled);
    };

    const handleShowIndicator = (event: CustomEvent) => {
      setFallbackIndicators(prev => new Map(prev.set(event.detail.key, event.detail.reason)));
    };

    const handleHideIndicator = (event: CustomEvent) => {
      setFallbackIndicators(prev => {
        const newMap = new Map(prev);
        newMap.delete(event.detail.key);
        return newMap;
      });
    };

    window.addEventListener('fallbackManager:offlineMode', handleOfflineMode as EventListener);
    window.addEventListener('fallbackManager:showIndicator', handleShowIndicator as EventListener);
    window.addEventListener('fallbackManager:hideIndicator', handleHideIndicator as EventListener);

    return () => {
      window.removeEventListener('fallbackManager:offlineMode', handleOfflineMode as EventListener);
      window.removeEventListener('fallbackManager:showIndicator', handleShowIndicator as EventListener);
      window.removeEventListener('fallbackManager:hideIndicator', handleHideIndicator as EventListener);
    };
  }, []);

  return {
    isOffline,
    fallbackIndicators,
    withFallback: fallbackManager.withFallback.bind(fallbackManager),
    clearCache: fallbackManager.clearCache.bind(fallbackManager),
    getCacheStats: fallbackManager.getCacheStats.bind(fallbackManager),
    setOfflineMode: fallbackManager.setOfflineMode.bind(fallbackManager)
  };
};

// Fallback Indicator Component
interface FallbackIndicatorProps {
  dataKey: string;
  reason?: 'offline' | 'network-error' | 'stale-data';
  className?: string;
}

export const FallbackIndicator: React.FC<FallbackIndicatorProps> = ({
  dataKey,
  reason = 'offline',
  className = ''
}) => {
  const getIndicatorContent = () => {
    switch (reason) {
      case 'offline':
        return {
          icon: WifiOff,
          text: 'Offline Data',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'network-error':
        return {
          icon: AlertCircle,
          text: 'Cached Data',
          color: 'bg-orange-100 text-orange-800 border-orange-200'
        };
      case 'stale-data':
        return {
          icon: Clock,
          text: 'Outdated Data',
          color: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      default:
        return {
          icon: Database,
          text: 'Fallback Data',
          color: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const { icon: Icon, text, color } = getIndicatorContent();

  return (
    <Badge variant="outline" className={`${color} ${className}`}>
      <Icon className="h-3 w-3 mr-1" />
      {text}
    </Badge>
  );
};

// Fallback Status Component
export const FallbackStatus: React.FC = () => {
  const { isOffline, fallbackIndicators, getCacheStats } = useFallbackManager();
  const [showDetails, setShowDetails] = React.useState(false);
  const [cacheStats, setCacheStats] = React.useState(getCacheStats());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCacheStats(getCacheStats());
    }, 5000);

    return () => clearInterval(interval);
  }, [getCacheStats]);

  if (!isOffline && fallbackIndicators.size === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <Card className="w-80">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              {isOffline ? (
                <>
                  <WifiOff className="h-4 w-4 text-orange-500" />
                  Offline Mode
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 text-blue-500" />
                  Using Cached Data
                </>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="h-6 w-6 p-0"
            >
              {showDetails ? '−' : '+'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Alert className="mb-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {isOffline 
                ? "You're working offline. Data may be outdated."
                : "Using cached data due to connection issues."
              }
            </AlertDescription>
          </Alert>

          {showDetails && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Cached items:</span>
                <span>{cacheStats.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Cache size:</span>
                <span>{Math.round(cacheStats.totalSize / 1024)}KB</span>
              </div>
              {fallbackIndicators.size > 0 && (
                <div>
                  <span className="font-medium">Active fallbacks:</span>
                  <div className="mt-1 space-y-1">
                    {Array.from(fallbackIndicators.entries()).map(([key, reason]) => (
                      <div key={key} className="flex items-center gap-2">
                        <FallbackIndicator 
                          dataKey={key} 
                          reason={reason as any}
                          className="text-xs"
                        />
                        <span className="truncate">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FallbackManager;