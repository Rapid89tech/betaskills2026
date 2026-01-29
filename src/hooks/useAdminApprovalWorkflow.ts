/**
 * useAdminApprovalWorkflow Hook
 * 
 * React hook for managing admin approval workflow functionality,
 * including real-time updates, enrollment management, and audit trails.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { adminApprovalWorkflow } from '../services/AdminApprovalWorkflow';

interface PendingEnrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  payment_type: 'eft' | 'card' | 'manual';
  payment_status: string;
  amount?: number;
  currency?: string;
  created_at: string;
  updated_at: string;
  ikhokha_payment_id?: string;
  payment_reference?: string;
}

interface EnrollmentDetails extends PendingEnrollment {
  user_profile?: {
    full_name?: string;
    phone?: string;
  };
  course_details?: {
    description?: string;
    price?: number;
    duration?: string;
  };
  payment_history?: Array<{
    id: string;
    status: string;
    timestamp: string;
    notes?: string;
    processed_by?: string;
  }>;
}

interface WorkflowStatistics {
  pendingCount: number;
  approvedToday: number;
  rejectedToday: number;
  averageApprovalTime: number;
}

interface ApprovalResult {
  success: boolean;
  enrollmentId: string;
  message: string;
  timestamp: Date;
  approvedBy: string;
}

interface RejectionResult {
  success: boolean;
  enrollmentId: string;
  reason: string;
  timestamp: Date;
  rejectedBy: string;
}

interface BulkApprovalResult {
  totalProcessed: number;
  successful: string[];
  failed: Array<{
    enrollmentId: string;
    error: string;
  }>;
  timestamp: Date;
  approvedBy: string;
}

interface UseAdminApprovalWorkflowOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  enableRealTimeUpdates?: boolean;
}

interface UseAdminApprovalWorkflowReturn {
  // State
  pendingEnrollments: PendingEnrollment[];
  selectedEnrollment: EnrollmentDetails | null;
  statistics: WorkflowStatistics | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  refreshPendingEnrollments: () => Promise<void>;
  selectEnrollment: (enrollmentId: string) => Promise<void>;
  approveEnrollment: (enrollmentId: string, adminId: string, notes?: string) => Promise<ApprovalResult>;
  rejectEnrollment: (enrollmentId: string, reason: string, adminId: string) => Promise<RejectionResult>;
  bulkApproveEnrollments: (enrollmentIds: string[], adminId: string) => Promise<BulkApprovalResult>;
  refreshStatistics: () => Promise<void>;
  
  // Real-time status
  isRealTimeConnected: boolean;
  newEnrollmentCount: number;
  
  // Cleanup
  cleanup: () => void;
}

export function useAdminApprovalWorkflow(
  options: UseAdminApprovalWorkflowOptions = {}
): UseAdminApprovalWorkflowReturn {
  const {
    autoRefresh = true,
    refreshInterval = 30000, // 30 seconds
    enableRealTimeUpdates = true
  } = options;

  // State
  const [pendingEnrollments, setPendingEnrollments] = useState<PendingEnrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentDetails | null>(null);
  const [statistics, setStatistics] = useState<WorkflowStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);
  const [newEnrollmentCount, setNewEnrollmentCount] = useState(0);

  // Refs for cleanup
  const unsubscribeNewEnrollments = useRef<(() => void) | null>(null);
  const unsubscribeProcessed = useRef<(() => void) | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Initialize the workflow service
   */
  const initializeWorkflow = useCallback(async () => {
    try {
      await adminApprovalWorkflow.initialize();
      setIsRealTimeConnected(true);
      setError(null);
    } catch (err) {
      console.error('Failed to initialize admin workflow:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize workflow');
      setIsRealTimeConnected(false);
    }
  }, []);

  /**
   * Fetch pending enrollments
   */
  const refreshPendingEnrollments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const enrollments = await adminApprovalWorkflow.getPendingEnrollments();
      setPendingEnrollments(enrollments);
      
    } catch (err) {
      console.error('Error fetching pending enrollments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch enrollments');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Select and fetch detailed enrollment information
   */
  const selectEnrollment = useCallback(async (enrollmentId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const details = await adminApprovalWorkflow.getEnrollmentDetails(enrollmentId);
      setSelectedEnrollment(details);
      
    } catch (err) {
      console.error('Error fetching enrollment details:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch enrollment details');
      setSelectedEnrollment(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Approve an enrollment
   */
  const approveEnrollment = useCallback(async (
    enrollmentId: string,
    adminId: string,
    notes?: string
  ): Promise<ApprovalResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await adminApprovalWorkflow.approveEnrollment(enrollmentId, adminId, notes);
      
      if (result.success) {
        // Remove from pending list
        setPendingEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
        
        // Clear selected if it was the approved one
        if (selectedEnrollment?.id === enrollmentId) {
          setSelectedEnrollment(null);
        }
        
        // Refresh statistics
        await refreshStatistics();
      } else {
        setError(result.message);
      }
      
      return result;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve enrollment';
      setError(errorMessage);
      
      return {
        success: false,
        enrollmentId,
        message: errorMessage,
        timestamp: new Date(),
        approvedBy: adminId
      };
    } finally {
      setIsLoading(false);
    }
  }, [selectedEnrollment?.id]);

  /**
   * Reject an enrollment
   */
  const rejectEnrollment = useCallback(async (
    enrollmentId: string,
    reason: string,
    adminId: string
  ): Promise<RejectionResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await adminApprovalWorkflow.rejectEnrollment(enrollmentId, reason, adminId);
      
      if (result.success) {
        // Remove from pending list
        setPendingEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
        
        // Clear selected if it was the rejected one
        if (selectedEnrollment?.id === enrollmentId) {
          setSelectedEnrollment(null);
        }
        
        // Refresh statistics
        await refreshStatistics();
      } else {
        setError(result.reason);
      }
      
      return result;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reject enrollment';
      setError(errorMessage);
      
      return {
        success: false,
        enrollmentId,
        reason: errorMessage,
        timestamp: new Date(),
        rejectedBy: adminId
      };
    } finally {
      setIsLoading(false);
    }
  }, [selectedEnrollment?.id]);

  /**
   * Bulk approve enrollments
   */
  const bulkApproveEnrollments = useCallback(async (
    enrollmentIds: string[],
    adminId: string
  ): Promise<BulkApprovalResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await adminApprovalWorkflow.bulkApproveEnrollments(enrollmentIds, adminId);
      
      // Remove successful approvals from pending list
      if (result.successful.length > 0) {
        setPendingEnrollments(prev => 
          prev.filter(e => !result.successful.includes(e.id))
        );
        
        // Clear selected if it was one of the approved ones
        if (selectedEnrollment && result.successful.includes(selectedEnrollment.id)) {
          setSelectedEnrollment(null);
        }
      }
      
      // Show error for failed ones
      if (result.failed.length > 0) {
        const failedMessages = result.failed.map(f => `${f.enrollmentId}: ${f.error}`).join(', ');
        setError(`Some approvals failed: ${failedMessages}`);
      }
      
      // Refresh statistics
      await refreshStatistics();
      
      return result;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to bulk approve enrollments';
      setError(errorMessage);
      
      return {
        totalProcessed: enrollmentIds.length,
        successful: [],
        failed: enrollmentIds.map(id => ({ enrollmentId: id, error: errorMessage })),
        timestamp: new Date(),
        approvedBy: adminId
      };
    } finally {
      setIsLoading(false);
    }
  }, [selectedEnrollment]);

  /**
   * Refresh workflow statistics
   */
  const refreshStatistics = useCallback(async () => {
    try {
      const stats = await adminApprovalWorkflow.getWorkflowStatistics();
      setStatistics(stats);
    } catch (err) {
      console.error('Error fetching statistics:', err);
      // Don't set error for statistics as it's not critical
    }
  }, []);

  /**
   * Setup real-time subscriptions
   */
  const setupRealTimeSubscriptions = useCallback(() => {
    if (!enableRealTimeUpdates) return;

    try {
      // Subscribe to new enrollments
      unsubscribeNewEnrollments.current = adminApprovalWorkflow.subscribeToNewEnrollments((enrollment) => {
        setPendingEnrollments(prev => {
          // Check if enrollment already exists
          const exists = prev.some(e => e.id === enrollment.id);
          if (exists) return prev;
          
          // Add new enrollment to the beginning of the list
          return [enrollment, ...prev];
        });
        
        // Increment new enrollment count
        setNewEnrollmentCount(prev => prev + 1);
        
        // Refresh statistics
        refreshStatistics();
      });

      // Subscribe to processed enrollments
      unsubscribeProcessed.current = adminApprovalWorkflow.subscribeToEnrollmentProcessed((enrollmentId, action) => {
        // Remove from pending list
        setPendingEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
        
        // Clear selected if it was processed
        if (selectedEnrollment?.id === enrollmentId) {
          setSelectedEnrollment(null);
        }
        
        // Refresh statistics
        refreshStatistics();
      });

      console.log('Real-time subscriptions setup successfully');
      
    } catch (err) {
      console.error('Error setting up real-time subscriptions:', err);
      setIsRealTimeConnected(false);
    }
  }, [enableRealTimeUpdates, selectedEnrollment?.id, refreshStatistics]);

  /**
   * Setup auto-refresh
   */
  const setupAutoRefresh = useCallback(() => {
    if (!autoRefresh) return;

    refreshIntervalRef.current = setInterval(() => {
      refreshPendingEnrollments();
      refreshStatistics();
    }, refreshInterval);

    console.log(`Auto-refresh setup with ${refreshInterval}ms interval`);
  }, [autoRefresh, refreshInterval, refreshPendingEnrollments, refreshStatistics]);

  /**
   * Cleanup function
   */
  const cleanup = useCallback(() => {
    // Unsubscribe from real-time updates
    if (unsubscribeNewEnrollments.current) {
      unsubscribeNewEnrollments.current();
      unsubscribeNewEnrollments.current = null;
    }
    
    if (unsubscribeProcessed.current) {
      unsubscribeProcessed.current();
      unsubscribeProcessed.current = null;
    }
    
    // Clear auto-refresh interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
    
    // Cleanup the service
    adminApprovalWorkflow.cleanup();
    
    console.log('Admin approval workflow hook cleaned up');
  }, []);

  /**
   * Reset new enrollment count
   */
  const resetNewEnrollmentCount = useCallback(() => {
    setNewEnrollmentCount(0);
  }, []);

  // Initialize on mount
  useEffect(() => {
    const initialize = async () => {
      await initializeWorkflow();
      await refreshPendingEnrollments();
      await refreshStatistics();
      setupRealTimeSubscriptions();
      setupAutoRefresh();
    };

    initialize();

    // Cleanup on unmount
    return cleanup;
  }, [initializeWorkflow, refreshPendingEnrollments, refreshStatistics, setupRealTimeSubscriptions, setupAutoRefresh, cleanup]);

  // Reset new enrollment count when pending enrollments are viewed
  useEffect(() => {
    if (pendingEnrollments.length > 0) {
      // Reset count after a short delay to allow user to see the notification
      const timer = setTimeout(resetNewEnrollmentCount, 2000);
      return () => clearTimeout(timer);
    }
  }, [pendingEnrollments.length, resetNewEnrollmentCount]);

  return {
    // State
    pendingEnrollments,
    selectedEnrollment,
    statistics,
    isLoading,
    error,
    
    // Actions
    refreshPendingEnrollments,
    selectEnrollment,
    approveEnrollment,
    rejectEnrollment,
    bulkApproveEnrollments,
    refreshStatistics,
    
    // Real-time status
    isRealTimeConnected,
    newEnrollmentCount,
    
    // Cleanup
    cleanup
  };
}

export default useAdminApprovalWorkflow;