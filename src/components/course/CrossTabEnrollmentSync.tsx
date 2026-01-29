/**
 * CrossTabEnrollmentSync Component
 * 
 * Example integration of cross-tab synchronization for course enrollment buttons.
 * This component demonstrates how to use cross-tab sync to:
 * - Update enrollment button states in real-time across tabs
 * - Handle enrollment status changes from admin approvals
 * - Provide immediate feedback when enrollments are processed
 * 
 * Requirements: 6.3, 6.4, 3.2
 */

import React, { useEffect, useState } from 'react';
import { useCrossTabSync } from '@/hooks/useCrossTabSync';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  EnrollmentStatus, 
  EnrollmentUpdateType,
  type EnrollmentUpdate,
  type Enrollment 
} from '@/types/enrollment';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  BookOpen,
  Loader2
} from 'lucide-react';

interface CrossTabEnrollmentSyncProps {
  userId: string;
  courseId: string;
  courseTitle: string;
  onEnrollmentChange?: (enrollment: Enrollment | null) => void;
  className?: string;
}

/**
 * CrossTabEnrollmentSync Component
 */
export const CrossTabEnrollmentSync: React.FC<CrossTabEnrollmentSyncProps> = ({
  userId,
  courseId,
  courseTitle,
  onEnrollmentChange,
  className = ''
}) => {
  const [currentEnrollment, setCurrentEnrollment] = useState<Enrollment | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize cross-tab sync for student interface
  const {
    isInitialized,
    localState,
    subscribeToUpdates
  } = useCrossTabSync({
    autoResolveConflicts: true, // Auto-resolve for students
    conflictResolutionStrategy: 'admin-priority' as any,
    syncOnFocus: true,
    enableLogging: false // Disable logging for student interface
  });

  /**
   * Get enrollment for this user and course
   */
  const getEnrollment = (): Enrollment | null => {
    if (!localState) return null;
    
    const enrollmentKey = `${userId}-${courseId}`;
    return localState.enrollments[enrollmentKey] || null;
  };

  /**
   * Update current enrollment state
   */
  useEffect(() => {
    const enrollment = getEnrollment();
    setCurrentEnrollment(enrollment);
    
    if (onEnrollmentChange) {
      onEnrollmentChange(enrollment);
    }
  }, [localState, userId, courseId, onEnrollmentChange]);

  /**
   * Listen for cross-tab enrollment updates
   */
  useEffect(() => {
    if (!isInitialized) return;

    const unsubscribe = subscribeToUpdates((update: EnrollmentUpdate) => {
      // Only handle updates for this user and course
      if (update.userId === userId && update.courseId === courseId) {
        console.log('📨 Enrollment update received for this course:', update);
        
        // Update local state
        const enrollment = getEnrollment();
        setCurrentEnrollment(enrollment);
        
        // Stop processing state
        setIsProcessing(false);
        
        // Notify parent component
        if (onEnrollmentChange) {
          onEnrollmentChange(enrollment);
        }
        
        // Handle different update types
        switch (update.type) {
          case EnrollmentUpdateType.ENROLLMENT_APPROVED:
            console.log('✅ Your enrollment has been approved!');
            // Could show a toast notification here
            break;
            
          case EnrollmentUpdateType.ENROLLMENT_REJECTED:
            console.log('❌ Your enrollment has been rejected');
            // Could show a toast notification here
            break;
            
          case EnrollmentUpdateType.ENROLLMENT_CREATED:
            console.log('🆕 Enrollment created');
            break;
        }
      }
    });

    return unsubscribe;
  }, [isInitialized, subscribeToUpdates, userId, courseId, onEnrollmentChange]);

  /**
   * Handle enrollment action
   */
  const handleEnrollment = async () => {
    setIsProcessing(true);
    
    try {
      // In a real implementation, this would call the enrollment service
      console.log('🎓 Starting enrollment process for:', { userId, courseId, courseTitle });
      
      // Simulate enrollment process
      // The actual enrollment would be handled by EnrollmentManager
      // and would trigger cross-tab updates automatically
      
    } catch (error) {
      console.error('❌ Enrollment failed:', error);
      setIsProcessing(false);
    }
  };

  /**
   * Get button text based on enrollment status
   */
  const getButtonText = (): string => {
    if (isProcessing) return 'Processing...';
    
    if (!currentEnrollment) return 'Enroll Now';
    
    switch (currentEnrollment.status) {
      case EnrollmentStatus.PENDING:
        return 'Enrollment Pending';
      case EnrollmentStatus.APPROVED:
        return 'Continue Course';
      case EnrollmentStatus.REJECTED:
        return 'Enroll Again';
      default:
        return 'Enroll Now';
    }
  };

  /**
   * Get button variant based on enrollment status
   */
  const getButtonVariant = () => {
    if (!currentEnrollment) return 'default';
    
    switch (currentEnrollment.status) {
      case EnrollmentStatus.PENDING:
        return 'secondary';
      case EnrollmentStatus.APPROVED:
        return 'default';
      case EnrollmentStatus.REJECTED:
        return 'destructive';
      default:
        return 'default';
    }
  };

  /**
   * Get status icon
   */
  const getStatusIcon = () => {
    if (isProcessing) return <Loader2 className="h-4 w-4 animate-spin" />;
    
    if (!currentEnrollment) return <BookOpen className="h-4 w-4" />;
    
    switch (currentEnrollment.status) {
      case EnrollmentStatus.PENDING:
        return <Clock className="h-4 w-4" />;
      case EnrollmentStatus.APPROVED:
        return <CheckCircle className="h-4 w-4" />;
      case EnrollmentStatus.REJECTED:
        return <XCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  /**
   * Check if button should be disabled
   */
  const isButtonDisabled = (): boolean => {
    return isProcessing || 
           !isInitialized || 
           currentEnrollment?.status === EnrollmentStatus.PENDING;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Enrollment Button */}
      <Button
        onClick={handleEnrollment}
        disabled={isButtonDisabled()}
        variant={getButtonVariant() as any}
        className="w-full flex items-center gap-2"
      >
        {getStatusIcon()}
        {getButtonText()}
      </Button>
      
      {/* Status Badge */}
      {currentEnrollment && (
        <div className="flex justify-center">
          <Badge 
            variant={
              currentEnrollment.status === EnrollmentStatus.APPROVED ? 'default' :
              currentEnrollment.status === EnrollmentStatus.PENDING ? 'secondary' :
              currentEnrollment.status === EnrollmentStatus.REJECTED ? 'destructive' :
              'outline'
            }
            className="text-xs"
          >
            {currentEnrollment.status}
          </Badge>
        </div>
      )}
      
      {/* Sync Status (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-muted-foreground text-center">
          Cross-tab sync: {isInitialized ? 'Active' : 'Initializing'}
          {currentEnrollment && (
            <div>Enrollment ID: {currentEnrollment.id}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrossTabEnrollmentSync;