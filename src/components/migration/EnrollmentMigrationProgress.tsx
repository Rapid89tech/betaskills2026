import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, RefreshCw, Database, Clock, XCircle } from 'lucide-react';
import { MigrationStatus, MigrationError } from '@/utils/enrollmentMigration';

interface EnrollmentMigrationProgressProps {
  status: MigrationStatus;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const EnrollmentMigrationProgress: React.FC<EnrollmentMigrationProgressProps> = ({
  status,
  onRetry,
  onDismiss,
  className = ''
}) => {
  const hasErrors = status.errors.length > 0;
  const hasRetryableErrors = status.errors.some(error => error.retryable);
  const isCompleted = !status.isRunning && status.progress === 100;
  const isFailed = !status.isRunning && hasErrors && !isCompleted;

  // Don't render if not running and no errors
  if (!status.isRunning && !hasErrors && !isCompleted) {
    return null;
  }

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (isFailed) return <XCircle className="w-6 h-6 text-red-600" />;
    if (hasErrors) return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <Database className="w-6 h-6 text-blue-600 animate-pulse" />;
  };

  const getStatusTitle = () => {
    if (isCompleted) return 'Migration Completed Successfully!';
    if (isFailed) return 'Migration Failed';
    if (hasErrors) return 'Migration Completed with Warnings';
    return 'Migrating Enrollment Data...';
  };

  const getStatusDescription = () => {
    if (isCompleted) return 'Your enrollment data has been successfully migrated to the new system.';
    if (isFailed) return 'There was an error during migration. You can retry or continue without migration.';
    if (hasErrors) return 'Migration completed but some data could not be migrated. Check the details below.';
    return status.currentStep || 'Processing enrollment data...';
  };

  const formatDuration = (startTime?: Date, endTime?: Date) => {
    if (!startTime) return '';
    
    const end = endTime || new Date();
    const duration = end.getTime() - startTime.getTime();
    const seconds = Math.floor(duration / 1000);
    
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className={`border-2 ${isCompleted ? 'border-green-200 bg-green-50' : isFailed ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <CardTitle className={`text-lg ${isCompleted ? 'text-green-800' : isFailed ? 'text-red-800' : 'text-blue-800'}`}>
                {getStatusTitle()}
              </CardTitle>
              {status.startTime && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(status.startTime, status.endTime)}</span>
                </div>
              )}
            </div>
          </div>
          
          {onDismiss && (isCompleted || isFailed) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {status.isRunning && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Progress</span>
              <span className="text-gray-500">{status.progress}%</span>
            </div>
            <Progress value={status.progress} className="h-2" />
            <p className="text-sm text-gray-600">{status.currentStep}</p>
          </div>
        )}

        {/* Status Description */}
        <p className={`text-sm ${isCompleted ? 'text-green-700' : isFailed ? 'text-red-700' : 'text-blue-700'}`}>
          {getStatusDescription()}
        </p>

        {/* Error Details */}
        {hasErrors && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">
              {hasRetryableErrors ? 'Issues Found:' : 'Errors:'}
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {status.errors.map((error, index) => (
                <Alert key={index} className={`py-2 ${error.retryable ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}`}>
                  <AlertCircle className={`w-4 h-4 ${error.retryable ? 'text-yellow-600' : 'text-red-600'}`} />
                  <AlertDescription className="text-xs">
                    <div className="font-medium">{error.step}</div>
                    <div className="text-gray-600">{error.error}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {error.timestamp.toLocaleTimeString()}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isFailed && hasRetryableErrors && onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Migration
            </Button>
          )}
          
          {isCompleted && (
            <Button
              onClick={onDismiss}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue
            </Button>
          )}
          
          {isFailed && (
            <Button
              onClick={onDismiss}
              variant="outline"
              size="sm"
            >
              Continue Without Migration
            </Button>
          )}
        </div>

        {/* Migration Stats */}
        {isCompleted && status.startTime && status.endTime && (
          <div className="text-xs text-gray-500 pt-2 border-t">
            Migration completed in {formatDuration(status.startTime, status.endTime)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
