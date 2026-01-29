/**
 * React Hook for Navigation Monitoring
 * Provides easy access to navigation monitoring in React components
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { courseNavigationMonitor } from '../services/CourseNavigationMonitor';
import { NavigationErrorType } from '../types/navigationError';

interface NavigationMetrics {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  successRate: number;
  averageNavigationTime: number;
  errorBreakdown: Map<NavigationErrorType, number>;
  performanceMetrics: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  };
  timeRange: {
    start: Date;
    end: Date;
  };
}

interface NavigationAlert {
  id: string;
  type: 'high_failure_rate' | 'slow_performance' | 'error_spike' | 'system_degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: Record<string, any>;
  timestamp: Date;
  acknowledged: boolean;
}

interface UseNavigationMonitoringReturn {
  // Tracking methods
  startNavigation: (courseId: string, route: string, component: string, userId?: string) => string;
  recordSuccess: (attemptId: string) => void;
  recordFailure: (attemptId: string, errorType: NavigationErrorType) => void;
  recordTimeout: (attemptId: string) => void;
  
  // Metrics
  metrics: NavigationMetrics | null;
  courseMetrics: (courseId: string, timeRangeMinutes?: number) => NavigationMetrics;
  refreshMetrics: () => void;
  
  // Alerts
  alerts: NavigationAlert[];
  acknowledgeAlert: (alertId: string) => void;
  
  // Performance summary
  performanceSummary: {
    currentSuccessRate: number;
    averageResponseTime: number;
    errorTrends: { type: NavigationErrorType; count: number; trend: 'up' | 'down' | 'stable' }[];
    recommendations: string[];
  } | null;
  
  // Auto-tracking for current component
  isTracking: boolean;
  currentAttemptId: string | null;
}

export const useNavigationMonitoring = (
  componentName: string,
  autoTrack: boolean = false,
  metricsRefreshInterval: number = 30000 // 30 seconds
): UseNavigationMonitoringReturn => {
  const [metrics, setMetrics] = useState<NavigationMetrics | null>(null);
  const [alerts, setAlerts] = useState<NavigationAlert[]>([]);
  const [performanceSummary, setPerformanceSummary] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentAttemptId, setCurrentAttemptId] = useState<string | null>(null);
  
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionId = useRef<string>(
    sessionStorage.getItem('sessionId') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  /**
   * Start navigation tracking
   */
  const startNavigation = useCallback((
    courseId: string,
    route: string,
    component: string,
    userId?: string
  ): string => {
    const attemptId = courseNavigationMonitor.startNavigation(
      courseId,
      route,
      component,
      userId,
      sessionId.current
    );
    
    if (autoTrack) {
      setCurrentAttemptId(attemptId);
      setIsTracking(true);
    }
    
    return attemptId;
  }, [autoTrack]);

  /**
   * Record successful navigation
   */
  const recordSuccess = useCallback((attemptId: string) => {
    courseNavigationMonitor.recordSuccess(attemptId);
    
    if (autoTrack && attemptId === currentAttemptId) {
      setIsTracking(false);
      setCurrentAttemptId(null);
    }
  }, [autoTrack, currentAttemptId]);

  /**
   * Record navigation failure
   */
  const recordFailure = useCallback((attemptId: string, errorType: NavigationErrorType) => {
    courseNavigationMonitor.recordFailure(attemptId, errorType);
    
    if (autoTrack && attemptId === currentAttemptId) {
      setIsTracking(false);
      setCurrentAttemptId(null);
    }
  }, [autoTrack, currentAttemptId]);

  /**
   * Record navigation timeout
   */
  const recordTimeout = useCallback((attemptId: string) => {
    courseNavigationMonitor.recordTimeout(attemptId);
    
    if (autoTrack && attemptId === currentAttemptId) {
      setIsTracking(false);
      setCurrentAttemptId(null);
    }
  }, [autoTrack, currentAttemptId]);

  /**
   * Get metrics for specific course
   */
  const courseMetrics = useCallback((courseId: string, timeRangeMinutes: number = 60): NavigationMetrics => {
    return courseNavigationMonitor.getCourseMetrics(courseId, timeRangeMinutes);
  }, []);

  /**
   * Refresh all metrics
   */
  const refreshMetrics = useCallback(() => {
    const newMetrics = courseNavigationMonitor.getMetrics();
    const newAlerts = courseNavigationMonitor.getActiveAlerts();
    const newSummary = courseNavigationMonitor.getPerformanceSummary();
    
    setMetrics(newMetrics);
    setAlerts(newAlerts);
    setPerformanceSummary(newSummary);
  }, []);

  /**
   * Acknowledge alert
   */
  const acknowledgeAlert = useCallback((alertId: string) => {
    courseNavigationMonitor.acknowledgeAlert(alertId);
    refreshMetrics(); // Refresh to update alert status
  }, [refreshMetrics]);

  /**
   * Auto-start tracking when component mounts (if autoTrack is enabled)
   */
  useEffect(() => {
    if (autoTrack && !isTracking) {
      const route = window.location.pathname;
      const courseId = extractCourseIdFromRoute(route);
      
      if (courseId) {
        const attemptId = startNavigation(courseId, route, componentName);
        console.log('🔄 Auto-started navigation tracking:', { attemptId, courseId, component: componentName });
      }
    }
  }, [autoTrack, isTracking, componentName, startNavigation]);

  /**
   * Auto-complete tracking on unmount (if still tracking)
   */
  useEffect(() => {
    return () => {
      if (isTracking && currentAttemptId) {
        // Record as timeout since component unmounted before completion
        recordTimeout(currentAttemptId);
        console.log('⏰ Auto-completed navigation tracking on unmount:', currentAttemptId);
      }
    };
  }, [isTracking, currentAttemptId, recordTimeout]);

  /**
   * Set up metrics refresh interval
   */
  useEffect(() => {
    // Initial load
    refreshMetrics();
    
    // Set up interval
    refreshIntervalRef.current = setInterval(refreshMetrics, metricsRefreshInterval);
    
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [refreshMetrics, metricsRefreshInterval]);

  /**
   * Listen for navigation alerts
   */
  useEffect(() => {
    const handleNavigationAlert = (event: CustomEvent) => {
      console.log('🚨 Navigation alert received:', event.detail);
      refreshMetrics(); // Refresh to get new alert
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('navigationAlert', handleNavigationAlert as EventListener);
      
      return () => {
        window.removeEventListener('navigationAlert', handleNavigationAlert as EventListener);
      };
    }
  }, [refreshMetrics]);

  return {
    // Tracking methods
    startNavigation,
    recordSuccess,
    recordFailure,
    recordTimeout,
    
    // Metrics
    metrics,
    courseMetrics,
    refreshMetrics,
    
    // Alerts
    alerts,
    acknowledgeAlert,
    
    // Performance summary
    performanceSummary,
    
    // Auto-tracking state
    isTracking,
    currentAttemptId
  };
};

/**
 * Helper function to extract course ID from route
 */
function extractCourseIdFromRoute(route: string): string | null {
  const courseMatch = route.match(/\/course\/([^\/]+)/);
  return courseMatch ? courseMatch[1] : null;
}

export default useNavigationMonitoring;