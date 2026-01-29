import React, { useState, useCallback } from 'react';
import { useFastDashboard } from '@/hooks/useFastDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Users, BookOpen, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CriticalSectionErrorBoundary from '@/components/CriticalSectionErrorBoundary';
import { useMonitoring } from '@/hooks/useMonitoring';

const FastAdminDashboard: React.FC = () => {
  const {
    allEnrollments,
    allUsers,
    pendingEnrollments,
    loading,
    error,
    retryCount,
    isRetrying,
    approveEnrollment,
    rejectEnrollment,
    refresh,
    clearError
  } = useFastDashboard();

  const { toast } = useToast();
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [actionErrors, setActionErrors] = useState<Map<string, string>>(new Map());
  
  // Initialize monitoring for admin dashboard
  const { logAdminAction, logError, measureFunction } = useMonitoring({
    pageName: 'admin-dashboard',
    enablePerformanceMonitoring: true,
    enableErrorBoundary: true
  });
  const [retryAttempts, setRetryAttempts] = useState<Map<string, number>>(new Map());
  const [selectedEnrollments, setSelectedEnrollments] = useState<Set<string>>(new Set());
  const [bulkProcessing, setBulkProcessing] = useState(false);

  // Clear action error for specific enrollment
  const clearActionError = useCallback((enrollmentId: string) => {
    setActionErrors(prev => {
      const newMap = new Map(prev);
      newMap.delete(enrollmentId);
      return newMap;
    });
  }, []);

  // Enhanced approve handler with better error handling and user feedback
  const handleApprove = useCallback(async (enrollmentId: string) => {
    // Clear any previous errors
    clearActionError(enrollmentId);
    
    // Log admin action
    logAdminAction('enrollment_approval_initiated', { enrollmentId });
    setProcessingIds(prev => new Set(prev).add(enrollmentId));
    
    try {
      const success = await measureFunction(
        'admin_enrollment_approval',
        () => approveEnrollment(enrollmentId),
        { enrollmentId }
      );
      if (success) {
        logAdminAction('enrollment_approved', { enrollmentId });
        toast({
          title: "✅ Enrollment Approved",
          description: "The enrollment has been approved successfully. The student can now access the course.",
          duration: 5000,
        });
        
        // Clear retry attempts on success
        setRetryAttempts(prev => {
          const newMap = new Map(prev);
          newMap.delete(enrollmentId);
          return newMap;
        });
      } else {
        throw new Error("Approval operation returned false - please check your permissions and try again");
      }
    } catch (error: any) {
      console.error('Error in handleApprove:', error);
      
      // Log error with monitoring service
      logError('Admin enrollment approval failed', error, { enrollmentId });
      logAdminAction('enrollment_approval_failed', { enrollmentId, error: error.message }, 'error');
      
      const errorMessage = error.message || "Failed to approve enrollment. Please try again.";
      
      // Set action-specific error
      setActionErrors(prev => new Map(prev).set(enrollmentId, errorMessage));
      
      // Track retry attempts
      const currentAttempts = retryAttempts.get(enrollmentId) || 0;
      setRetryAttempts(prev => new Map(prev).set(enrollmentId, currentAttempts + 1));
      
      // Show different messages based on retry attempts
      const isRetry = currentAttempts > 0;
      toast({
        title: isRetry ? "Still Having Issues" : "Approval Failed",
        description: isRetry 
          ? `This is attempt ${currentAttempts + 1}. ${errorMessage}` 
          : errorMessage,
        variant: "destructive",
        duration: 7000,
        action: currentAttempts < 2 ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleApprove(enrollmentId)}
            className="ml-2"
          >
            Retry
          </Button>
        ) : undefined,
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(enrollmentId);
        return newSet;
      });
    }
  }, [approveEnrollment, toast, clearActionError, retryAttempts]);

  // Enhanced reject handler with better error handling and user feedback
  const handleReject = useCallback(async (enrollmentId: string) => {
    // Clear any previous errors
    clearActionError(enrollmentId);
    
    // Log admin action
    logAdminAction('enrollment_rejection_initiated', { enrollmentId });
    setProcessingIds(prev => new Set(prev).add(enrollmentId));
    
    try {
      const success = await measureFunction(
        'admin_enrollment_rejection',
        () => rejectEnrollment(enrollmentId),
        { enrollmentId }
      );
      if (success) {
        logAdminAction('enrollment_rejected', { enrollmentId });
        toast({
          title: "❌ Enrollment Rejected",
          description: "The enrollment has been rejected. The student has been notified.",
          duration: 5000,
        });
        
        // Clear retry attempts on success
        setRetryAttempts(prev => {
          const newMap = new Map(prev);
          newMap.delete(enrollmentId);
          return newMap;
        });
      } else {
        throw new Error("Rejection operation returned false - please check your permissions and try again");
      }
    } catch (error: any) {
      console.error('Error in handleReject:', error);
      
      // Log error with monitoring service
      logError('Admin enrollment rejection failed', error, { enrollmentId });
      logAdminAction('enrollment_rejection_failed', { enrollmentId, error: error.message }, 'error');
      
      const errorMessage = error.message || "Failed to reject enrollment. Please try again.";
      
      // Set action-specific error
      setActionErrors(prev => new Map(prev).set(enrollmentId, errorMessage));
      
      // Track retry attempts
      const currentAttempts = retryAttempts.get(enrollmentId) || 0;
      setRetryAttempts(prev => new Map(prev).set(enrollmentId, currentAttempts + 1));
      
      // Show different messages based on retry attempts
      const isRetry = currentAttempts > 0;
      toast({
        title: isRetry ? "Still Having Issues" : "Rejection Failed",
        description: isRetry 
          ? `This is attempt ${currentAttempts + 1}. ${errorMessage}` 
          : errorMessage,
        variant: "destructive",
        duration: 7000,
        action: currentAttempts < 2 ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleReject(enrollmentId)}
            className="ml-2"
          >
            Retry
          </Button>
        ) : undefined,
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(enrollmentId);
        return newSet;
      });
    }
  }, [rejectEnrollment, toast, clearActionError, retryAttempts]);

  // Bulk approve selected enrollments
  const handleBulkApprove = useCallback(async () => {
    if (selectedEnrollments.size === 0) return;
    
    setBulkProcessing(true);
    const enrollmentIds = Array.from(selectedEnrollments);
    let successCount = 0;
    let failureCount = 0;
    
    try {
      // Process enrollments in parallel with a limit to avoid overwhelming the server
      const batchSize = 3;
      for (let i = 0; i < enrollmentIds.length; i += batchSize) {
        const batch = enrollmentIds.slice(i, i + batchSize);
        
        await Promise.allSettled(
          batch.map(async (enrollmentId) => {
            try {
              await handleApprove(enrollmentId);
              successCount++;
            } catch (error) {
              failureCount++;
              console.error(`Failed to approve enrollment ${enrollmentId}:`, error);
            }
          })
        );
      }
      
      // Clear selection on completion
      setSelectedEnrollments(new Set());
      
      toast({
        title: "Bulk Approval Complete",
        description: `${successCount} enrollments approved successfully${failureCount > 0 ? `, ${failureCount} failed` : ''}.`,
        variant: failureCount > 0 ? "destructive" : "default",
        duration: 6000,
      });
      
    } finally {
      setBulkProcessing(false);
    }
  }, [selectedEnrollments, handleApprove, toast]);

  // Bulk reject selected enrollments
  const handleBulkReject = useCallback(async () => {
    if (selectedEnrollments.size === 0) return;
    
    setBulkProcessing(true);
    const enrollmentIds = Array.from(selectedEnrollments);
    let successCount = 0;
    let failureCount = 0;
    
    try {
      // Process enrollments in parallel with a limit
      const batchSize = 3;
      for (let i = 0; i < enrollmentIds.length; i += batchSize) {
        const batch = enrollmentIds.slice(i, i + batchSize);
        
        await Promise.allSettled(
          batch.map(async (enrollmentId) => {
            try {
              await handleReject(enrollmentId);
              successCount++;
            } catch (error) {
              failureCount++;
              console.error(`Failed to reject enrollment ${enrollmentId}:`, error);
            }
          })
        );
      }
      
      // Clear selection on completion
      setSelectedEnrollments(new Set());
      
      toast({
        title: "Bulk Rejection Complete",
        description: `${successCount} enrollments rejected successfully${failureCount > 0 ? `, ${failureCount} failed` : ''}.`,
        variant: failureCount > 0 ? "destructive" : "default",
        duration: 6000,
      });
      
    } finally {
      setBulkProcessing(false);
    }
  }, [selectedEnrollments, handleReject, toast]);

  // Toggle enrollment selection
  const toggleEnrollmentSelection = useCallback((enrollmentId: string) => {
    setSelectedEnrollments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(enrollmentId)) {
        newSet.delete(enrollmentId);
      } else {
        newSet.add(enrollmentId);
      }
      return newSet;
    });
  }, []);

  // Select all pending enrollments
  const selectAllPending = useCallback(() => {
    const pendingIds = pendingEnrollments.map(e => e.id);
    setSelectedEnrollments(new Set(pendingIds));
  }, [pendingEnrollments]);

  // Clear all selections
  const clearSelection = useCallback(() => {
    setSelectedEnrollments(new Set());
  }, []);

  if (error && !loading && allEnrollments.length === 0 && allUsers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{error}</p>
            {retryCount > 0 && (
              <p className="text-sm text-orange-600">
                Retry attempt {retryCount}/3 {isRetrying && '(retrying...)'}
              </p>
            )}
            <div className="flex gap-2">
              <Button onClick={refresh} className="flex-1" disabled={loading || isRetrying}>
                <RefreshCw className={`w-4 h-4 mr-2 ${(loading || isRetrying) ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying...' : 'Retry'}
              </Button>
              <Button onClick={clearError} variant="outline" className="flex-1">
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <CriticalSectionErrorBoundary 
      section="admin"
      allowRetry={true}
      maxRetries={3}
      showFallback={true}
      requiresAuth={true}
      criticalData={['admin-enrollments', 'admin-users']}
    >
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage users and enrollments</p>
              {error && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-sm text-red-600">
                    Connection issues detected {isRetrying && '(auto-retrying...)'}
                  </p>
                  <Button
                    onClick={clearError}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 p-1 h-auto"
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {retryCount > 0 && (
                <span className="text-sm text-orange-600">
                  Retry {retryCount}/3
                </span>
              )}
              <Button
                onClick={refresh}
                disabled={loading || isRetrying}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${(loading || isRetrying) ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allUsers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allEnrollments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingEnrollments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {allEnrollments.filter(e => e.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Enrollments</CardTitle>
                  {pendingEnrollments.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {selectedEnrollments.size > 0 && `${selectedEnrollments.size} selected`}
                      </span>
                      {selectedEnrollments.size > 0 ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleBulkApprove}
                            disabled={bulkProcessing}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {bulkProcessing ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-1" />
                            )}
                            Approve Selected
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleBulkReject}
                            disabled={bulkProcessing}
                          >
                            {bulkProcessing ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-1" />
                            )}
                            Reject Selected
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={clearSelection}
                            disabled={bulkProcessing}
                          >
                            Clear
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={selectAllPending}
                          disabled={bulkProcessing}
                        >
                          Select All Pending
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                    Loading enrollments...
                  </div>
                ) : allEnrollments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No enrollments found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allEnrollments.slice(0, 20).map((enrollment) => {
                      const isProcessing = processingIds.has(enrollment.id);
                      const actionError = actionErrors.get(enrollment.id);
                      const attempts = retryAttempts.get(enrollment.id) || 0;
                      
                      return (
                        <div
                          key={enrollment.id}
                          className={`border rounded-lg transition-all duration-200 ${
                            isProcessing ? 'bg-blue-50 border-blue-200' : 
                            actionError ? 'bg-red-50 border-red-200' : 
                            selectedEnrollments.has(enrollment.id) ? 'bg-blue-50 border-blue-300' :
                            'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between p-4">
                            {/* Selection checkbox for pending enrollments */}
                            {enrollment.status === 'pending' && (
                              <div className="flex items-center mr-3">
                                <input
                                  type="checkbox"
                                  checked={selectedEnrollments.has(enrollment.id)}
                                  onChange={() => toggleEnrollmentSelection(enrollment.id)}
                                  disabled={isProcessing || bulkProcessing}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div>
                                  <p className="font-medium">{enrollment.user_email}</p>
                                  <p className="text-sm text-gray-500">{enrollment.course_title}</p>
                                </div>
                                {isProcessing && (
                                  <div className="flex items-center gap-2 text-blue-600">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Processing...</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                                {attempts > 0 && (
                                  <span className="ml-2 text-orange-600">
                                    • {attempts} attempt{attempts > 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge
                                variant={
                                  enrollment.status === 'approved'
                                    ? 'default'
                                    : enrollment.status === 'pending'
                                    ? 'secondary'
                                    : 'destructive'
                                }
                                className={isProcessing ? 'opacity-50' : ''}
                              >
                                {isProcessing ? (
                                  <div className="flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    updating...
                                  </div>
                                ) : (
                                  enrollment.status
                                )}
                              </Badge>

                              {enrollment.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(enrollment.id)}
                                    disabled={isProcessing}
                                    className={`bg-green-600 hover:bg-green-700 transition-all duration-200 ${
                                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                  >
                                    {isProcessing ? (
                                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                    ) : (
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                    )}
                                    {isProcessing ? 'Approving...' : 'Approve'}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleReject(enrollment.id)}
                                    disabled={isProcessing}
                                    className={`transition-all duration-200 ${
                                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                  >
                                    {isProcessing ? (
                                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                    ) : (
                                      <XCircle className="w-4 h-4 mr-1" />
                                    )}
                                    {isProcessing ? 'Rejecting...' : 'Reject'}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Action Error Display */}
                          {actionError && (
                            <div className="px-4 pb-4">
                              <Alert variant="destructive" className="bg-red-50 border-red-200">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="flex items-center justify-between">
                                  <span className="text-sm">{actionError}</span>
                                  <div className="flex gap-2 ml-4">
                                    {attempts < 3 && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => enrollment.status === 'pending' ? handleApprove(enrollment.id) : handleReject(enrollment.id)}
                                        className="h-6 text-xs"
                                      >
                                        Retry
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => clearActionError(enrollment.id)}
                                      className="h-6 text-xs"
                                    >
                                      Dismiss
                                    </Button>
                                  </div>
                                </AlertDescription>
                              </Alert>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                    Loading users...
                  </div>
                ) : allUsers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No users found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allUsers.slice(0, 20).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.first_name?.[0]}{user.last_name?.[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-400">
                              Joined: {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge
                            variant={user.approval_status === 'approved' ? 'default' : 'secondary'}
                          >
                            {user.approval_status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </CriticalSectionErrorBoundary>
  );
};

export default FastAdminDashboard;