import React, { useState } from 'react';
import { useUnifiedEnrollments } from '@/hooks/useUnifiedEnrollments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { logger } from '@/utils/logger';

/**
 * Example component demonstrating the Unified Enrollment System
 * 
 * This component shows how to:
 * - Use the useUnifiedEnrollments hook
 * - Handle loading states and errors
 * - Perform CRUD operations on enrollments
 * - Monitor online/offline status
 * - Force synchronization
 */

interface UnifiedEnrollmentExampleProps {
  userId?: string;
  showAdminFeatures?: boolean;
}

export const UnifiedEnrollmentExample: React.FC<UnifiedEnrollmentExampleProps> = ({
  userId,
  showAdminFeatures = false
}) => {
  const {
    enrollments,
    loading,
    error,
    isOnline,
    lastSyncTime,
    refreshEnrollments,
    updateEnrollmentStatus,
    updateEnrollmentProgress,
    createEnrollment,
    isEnrolledInCourse,
    getEnrollmentForCourse,
    forceSynchronization,
    getStatistics
  } = useUnifiedEnrollments({ userId });

  const [isCreating, setIsCreating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);

  // Handle creating a test enrollment
  const handleCreateTestEnrollment = async () => {
    setIsCreating(true);
    try {
      await createEnrollment({
        course_id: `test-course-${Date.now()}`,
        course_title: `Test Course ${new Date().toLocaleTimeString()}`,
        status: 'pending'
      });
      logger.info('Test enrollment created successfully');
    } catch (error) {
      logger.error('Failed to create test enrollment:', error);
    } finally {
      setIsCreating(false);
    }
  };

  // Handle updating enrollment status
  const handleUpdateStatus = async (enrollmentId: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      await updateEnrollmentStatus(enrollmentId, newStatus);
      logger.info(`Enrollment ${enrollmentId} status updated to ${newStatus}`);
    } catch (error) {
      logger.error('Failed to update enrollment status:', error);
    }
  };

  // Handle updating progress
  const handleUpdateProgress = async (courseId: string, progress: number) => {
    try {
      await updateEnrollmentProgress(courseId, progress);
      logger.info(`Progress updated for course ${courseId}: ${progress}%`);
    } catch (error) {
      logger.error('Failed to update progress:', error);
    }
  };

  // Handle force synchronization
  const handleForceSynchronization = async () => {
    setIsSyncing(true);
    try {
      await forceSynchronization();
      logger.info('Synchronization completed successfully');
    } catch (error) {
      logger.error('Failed to force synchronization:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle getting statistics
  const handleGetStatistics = async () => {
    try {
      const stats = await getStatistics();
      setStatistics(stats);
      logger.info('Statistics retrieved:', stats);
    } catch (error) {
      logger.error('Failed to get statistics:', error);
    }
  };

  // Get status badge color
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Unified Enrollment System Example
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </CardTitle>
          <CardDescription>
            Demonstrating the unified data management layer for enrollments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              onClick={refreshEnrollments}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </Button>
            
            <Button
              onClick={handleForceSynchronization}
              disabled={isSyncing || !isOnline}
              variant="outline"
              size="sm"
            >
              {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Force Sync'}
            </Button>
            
            <Button
              onClick={handleCreateTestEnrollment}
              disabled={isCreating}
              size="sm"
            >
              {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Test Enrollment'}
            </Button>

            {showAdminFeatures && (
              <Button
                onClick={handleGetStatistics}
                variant="outline"
                size="sm"
              >
                Get Statistics
              </Button>
            )}
          </div>

          {/* Status Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{enrollments.length}</div>
              <div className="text-sm text-muted-foreground">Total Enrollments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {enrollments.filter(e => e.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {enrollments.filter(e => e.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {isOnline ? 'Online' : 'Offline'}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
          </div>

          {lastSyncTime && (
            <div className="text-sm text-muted-foreground mb-4">
              Last sync: {lastSyncTime.toLocaleString()}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <div className="text-red-800 text-sm">{error}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enrollments List */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollments ({enrollments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && enrollments.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading enrollments...
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No enrollments found. Create a test enrollment to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{enrollment.course_title || enrollment.course_id}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {enrollment.id}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Progress: {enrollment.progress}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated: {new Date(enrollment.updated_at).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadgeVariant(enrollment.status)}>
                      {enrollment.status}
                    </Badge>
                    
                    <div className="flex gap-1">
                      {enrollment.status !== 'approved' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(enrollment.id, 'approved')}
                        >
                          Approve
                        </Button>
                      )}
                      
                      {enrollment.status !== 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateStatus(enrollment.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateProgress(enrollment.course_id, Math.min(100, enrollment.progress + 25))}
                      >
                        +25% Progress
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics (Admin Features) */}
      {showAdminFeatures && statistics && (
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{statistics.approved}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{statistics.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{statistics.rejected}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Enrollment Check */}
      <Card>
        <CardHeader>
          <CardTitle>Course Enrollment Check</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {['test-course-1', 'test-course-2', 'test-course-3'].map((courseId) => {
              const isEnrolled = isEnrolledInCourse(courseId);
              const enrollment = getEnrollmentForCourse(courseId);
              
              return (
                <div key={courseId} className="flex items-center justify-between p-2 border rounded">
                  <span className="font-medium">{courseId}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={isEnrolled ? 'default' : 'outline'}>
                      {isEnrolled ? 'Enrolled' : 'Not Enrolled'}
                    </Badge>
                    {enrollment && (
                      <Badge variant="secondary">
                        {enrollment.status}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedEnrollmentExample;