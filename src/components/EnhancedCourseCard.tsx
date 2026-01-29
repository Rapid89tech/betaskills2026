/**
 * 🚀 ENHANCED COURSE CARD WITH REAL-TIME UPDATES
 * Course card component with immediate UI feedback, optimistic updates, and cross-tab sync
 * Integrates with the enhanced real-time sync system for instant access feedback
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/AuthContext';
import { useEnhancedRealTimeSync } from '@/hooks/useEnhancedRealTimeSync';
import { UIComponent, UIAction } from '@/services/EnhancedRealTimeSync';
import { logger } from '@/utils/logger';
import { CheckCircle, Clock, AlertCircle, Play, Loader2 } from 'lucide-react';

export interface EnhancedCourseCardProps {
  courseId: string;
  title: string;
  description: string;
  imageUrl?: string;
  initialEnrollmentStatus?: 'enrolled' | 'pending' | 'rejected' | 'unenrolled';
  initialProgress?: number;
  onEnroll?: (courseId: string) => Promise<void>;
  onContinue?: (courseId: string) => void;
  enableOptimisticUpdates?: boolean;
  enableRealTimeSync?: boolean;
}

interface CardState {
  enrollmentStatus: 'enrolled' | 'pending' | 'rejected' | 'unenrolled';
  progress: number;
  isLoading: boolean;
  isOptimistic: boolean;
  optimisticUpdateId?: string;
  lastUpdated?: Date;
  accessGranted: boolean;
}

/**
 * Enhanced Course Card with real-time updates and optimistic UI
 */
export const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({
  courseId,
  title,
  description,
  imageUrl,
  initialEnrollmentStatus = 'unenrolled',
  initialProgress = 0,
  onEnroll,
  onContinue,
  enableOptimisticUpdates = true,
  enableRealTimeSync = true
}) => {
  const { user } = useAuth();
  const [cardState, setCardState] = useState<CardState>({
    enrollmentStatus: initialEnrollmentStatus,
    progress: initialProgress,
    isLoading: false,
    isOptimistic: false,
    accessGranted: initialEnrollmentStatus === 'enrolled',
    lastUpdated: new Date()
  });

  const {
    applyOptimisticUpdate,
    listenForUIUpdates,
    listenForImmediateApproval,
    listenForCourseAccessGranted,
    listenForOptimisticRollbacks
  } = useEnhancedRealTimeSync({
    courseId,
    enableOptimisticUpdates,
    enableCrossTabSync: enableRealTimeSync
  });

  /**
   * Handle enrollment button click with optimistic updates
   */
  const handleEnrollClick = useCallback(async () => {
    if (!user || !onEnroll) return;

    try {
      setCardState(prev => ({ ...prev, isLoading: true }));

      // Apply optimistic update if enabled
      let optimisticResult;
      if (enableOptimisticUpdates) {
        optimisticResult = await applyOptimisticUpdate(courseId, 'pending', 'enrollment_click');
        
        setCardState(prev => ({
          ...prev,
          enrollmentStatus: 'pending',
          isOptimistic: true,
          optimisticUpdateId: optimisticResult.updateId,
          isLoading: false
        }));
      }

      // Perform actual enrollment
      await onEnroll(courseId);

      // If optimistic update was applied, confirm it
      if (optimisticResult) {
        // The actual confirmation will come from webhook/real-time updates
        // For now, we'll set a timeout to confirm as 'pending'
        setTimeout(() => {
          optimisticResult.confirm('pending').catch(error => {
            logger.error('Failed to confirm optimistic update:', error);
          });
        }, 1000);
      }

    } catch (error) {
      logger.error('Enrollment failed:', error);
      
      // Rollback optimistic update on error
      if (cardState.optimisticUpdateId) {
        try {
          const optimisticResult = await applyOptimisticUpdate(courseId, 'pending', 'enrollment_click');
          await optimisticResult.rollback('enrollment_failed');
        } catch (rollbackError) {
          logger.error('Failed to rollback optimistic update:', rollbackError);
        }
      }

      setCardState(prev => ({
        ...prev,
        enrollmentStatus: 'unenrolled',
        isLoading: false,
        isOptimistic: false,
        optimisticUpdateId: undefined
      }));
    }
  }, [user, onEnroll, courseId, enableOptimisticUpdates, applyOptimisticUpdate, cardState.optimisticUpdateId]);

  /**
   * Handle continue course button click
   */
  const handleContinueClick = useCallback(() => {
    if (onContinue) {
      onContinue(courseId);
    }
  }, [onContinue, courseId]);

  /**
   * Handle UI updates from the real-time sync service
   */
  const handleUIUpdate = useCallback((action: UIAction, data: any) => {
    logger.debug('Received UI update', { action, data, courseId });

    switch (action) {
      case UIAction.UPDATE_STATUS:
        setCardState(prev => ({
          ...prev,
          enrollmentStatus: data.status,
          isOptimistic: data.optimistic || false,
          optimisticUpdateId: data.optimistic ? data.updateId : undefined,
          lastUpdated: new Date()
        }));
        break;

      case UIAction.SHOW_CONTINUE_BUTTON:
        setCardState(prev => ({
          ...prev,
          enrollmentStatus: 'enrolled',
          accessGranted: true,
          isOptimistic: data.optimistic || false,
          lastUpdated: new Date()
        }));
        break;

      case UIAction.ENABLE_ACCESS:
        setCardState(prev => ({
          ...prev,
          accessGranted: true,
          enrollmentStatus: 'enrolled',
          lastUpdated: new Date()
        }));
        break;

      case UIAction.CHANGE_BUTTON_TEXT:
        // Button text changes are handled by the render logic based on state
        setCardState(prev => ({
          ...prev,
          isLoading: data.text === 'Processing...',
          lastUpdated: new Date()
        }));
        break;

      case UIAction.REFRESH_DATA:
        // Trigger a state refresh
        setCardState(prev => ({
          ...prev,
          lastUpdated: new Date()
        }));
        break;

      case UIAction.ANIMATE_CHANGE:
        // Add animation class or trigger animation
        // Implementation depends on animation library
        break;
    }
  }, [courseId]);

  /**
   * Handle immediate approval updates
   */
  const handleImmediateApproval = useCallback((update) => {
    logger.info('Received immediate approval update', { update, courseId });
    
    setCardState(prev => ({
      ...prev,
      enrollmentStatus: 'enrolled',
      accessGranted: true,
      isOptimistic: false,
      optimisticUpdateId: undefined,
      lastUpdated: new Date()
    }));

    // Show success animation or notification
    // Implementation depends on notification system
  }, [courseId]);

  /**
   * Handle course access granted updates
   */
  const handleCourseAccessGranted = useCallback((update) => {
    logger.info('Received course access granted update', { update, courseId });
    
    setCardState(prev => ({
      ...prev,
      accessGranted: update.accessLevel === 'granted',
      enrollmentStatus: update.accessLevel === 'granted' ? 'enrolled' : prev.enrollmentStatus,
      lastUpdated: new Date()
    }));
  }, [courseId]);

  /**
   * Handle optimistic update rollbacks
   */
  const handleOptimisticRollback = useCallback((data) => {
    logger.info('Received optimistic rollback', { data, courseId });
    
    if (data.updateId === cardState.optimisticUpdateId) {
      setCardState(prev => ({
        ...prev,
        enrollmentStatus: 'unenrolled',
        isOptimistic: false,
        optimisticUpdateId: undefined,
        isLoading: false,
        lastUpdated: new Date()
      }));
    }
  }, [courseId, cardState.optimisticUpdateId]);

  // Set up event listeners
  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    // Listen for UI updates
    cleanupFunctions.push(
      listenForUIUpdates(UIComponent.COURSE_CARD, handleUIUpdate)
    );

    // Listen for immediate approval
    cleanupFunctions.push(
      listenForImmediateApproval(handleImmediateApproval)
    );

    // Listen for course access granted
    cleanupFunctions.push(
      listenForCourseAccessGranted(handleCourseAccessGranted)
    );

    // Listen for optimistic rollbacks
    cleanupFunctions.push(
      listenForOptimisticRollbacks(handleOptimisticRollback)
    );

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [
    listenForUIUpdates,
    listenForImmediateApproval,
    listenForCourseAccessGranted,
    listenForOptimisticRollbacks,
    handleUIUpdate,
    handleImmediateApproval,
    handleCourseAccessGranted,
    handleOptimisticRollback
  ]);

  /**
   * Get status badge component
   */
  const getStatusBadge = () => {
    const { enrollmentStatus, isOptimistic } = cardState;
    
    const badgeProps = {
      className: `transition-all duration-300 ${isOptimistic ? 'animate-pulse' : ''}`
    };

    switch (enrollmentStatus) {
      case 'enrolled':
        return (
          <Badge variant="default" {...badgeProps}>
            <CheckCircle className="w-3 h-3 mr-1" />
            Enrolled
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" {...badgeProps}>
            <Clock className="w-3 h-3 mr-1" />
            {isOptimistic ? 'Processing...' : 'Pending Approval'}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" {...badgeProps}>
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  /**
   * Get action button component
   */
  const getActionButton = () => {
    const { enrollmentStatus, isLoading, accessGranted } = cardState;

    if (enrollmentStatus === 'enrolled' && accessGranted) {
      return (
        <Button 
          onClick={handleContinueClick}
          className="w-full transition-all duration-300 bg-green-600 hover:bg-green-700"
        >
          <Play className="w-4 h-4 mr-2" />
          Continue Course
        </Button>
      );
    }

    if (enrollmentStatus === 'pending') {
      return (
        <Button 
          disabled 
          variant="secondary"
          className="w-full transition-all duration-300"
        >
          <Clock className="w-4 h-4 mr-2" />
          Awaiting Approval
        </Button>
      );
    }

    if (enrollmentStatus === 'rejected') {
      return (
        <Button 
          disabled 
          variant="destructive"
          className="w-full transition-all duration-300"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Enrollment Rejected
        </Button>
      );
    }

    return (
      <Button 
        onClick={handleEnrollClick}
        disabled={isLoading || !user}
        className="w-full transition-all duration-300"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          'Enroll Now'
        )}
      </Button>
    );
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      cardState.isOptimistic ? 'ring-2 ring-blue-200 ring-opacity-50' : ''
    }`}>
      {imageUrl && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {title}
          </CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {cardState.enrollmentStatus === 'enrolled' && cardState.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{cardState.progress}%</span>
            </div>
            <Progress 
              value={cardState.progress} 
              className="transition-all duration-500"
            />
          </div>
        )}

        {getActionButton()}

        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 text-xs text-gray-400 space-y-1">
            <div>Status: {cardState.enrollmentStatus}</div>
            <div>Optimistic: {cardState.isOptimistic ? 'Yes' : 'No'}</div>
            <div>Access: {cardState.accessGranted ? 'Granted' : 'Denied'}</div>
            <div>Updated: {cardState.lastUpdated?.toLocaleTimeString()}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};