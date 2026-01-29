import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Award,
  BookOpen,
  Target,
  Calendar,
  BarChart3
} from 'lucide-react';
import type { ProgressData } from '@/services/ProgressTrackingService';

interface ProgressDisplayProps {
  progressPercentage: number;
  progressData?: ProgressData | null;
  loading?: boolean;
  error?: string | null;
  compact?: boolean;
  showDetails?: boolean;
}

export const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  progressPercentage,
  progressData,
  loading = false,
  error = null,
  compact = false,
  showDetails = false
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse bg-gray-200 h-2 w-16 rounded"></div>
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-500">
        <span className="text-sm">Error loading progress</span>
      </div>
    );
  }



  // Get progress status
  const getProgressStatus = (percentage: number): { label: string; color: string } => {
    if (percentage === 100) return { label: 'Completed', color: 'bg-green-100 text-green-800' };
    if (percentage >= 75) return { label: 'Nearly Done', color: 'bg-blue-100 text-blue-800' };
    if (percentage >= 50) return { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' };
    if (percentage >= 25) return { label: 'Getting Started', color: 'bg-orange-100 text-orange-800' };
    if (percentage > 0) return { label: 'Just Started', color: 'bg-gray-100 text-gray-800' };
    return { label: 'Not Started', color: 'bg-gray-100 text-gray-600' };
  };

  const progressStatus = getProgressStatus(progressPercentage);

  // Compact view for table cells
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 min-w-[120px]">
              <Progress 
                value={progressPercentage} 
                className="flex-1 h-2"
              />
              <span className="text-sm font-medium min-w-[35px]">
                {progressPercentage}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2">
              <div className="font-medium">Course Progress</div>
              <div className="text-sm">
                <div>Overall: {progressPercentage}%</div>
                {progressData && (
                  <>
                    <div>Completed Lessons: {progressData.completedLessons.length}</div>
                    <div>Time Spent: {Math.round(progressData.timeSpent / 60)}h {progressData.timeSpent % 60}m</div>
                    {progressData.averageScore > 0 && (
                      <div>Average Score: {Math.round(progressData.averageScore)}%</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Detailed view
  if (showDetails && progressData) {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Course Progress</h3>
          </div>
          <Badge className={progressStatus.color}>
            {progressStatus.label}
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-bold">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Progress Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-500" />
            <div className="text-sm">
              <div className="font-medium">{progressData.completedLessons.length}</div>
              <div className="text-muted-foreground">Lessons Done</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div className="text-sm">
              <div className="font-medium">{progressData.completedModules.length}</div>
              <div className="text-muted-foreground">Modules Done</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <div className="text-sm">
              <div className="font-medium">
                {Math.round(progressData.timeSpent / 60)}h {progressData.timeSpent % 60}m
              </div>
              <div className="text-muted-foreground">Time Spent</div>
            </div>
          </div>
          
          {progressData.averageScore > 0 && (
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              <div className="text-sm">
                <div className="font-medium">{Math.round(progressData.averageScore)}%</div>
                <div className="text-muted-foreground">Avg Score</div>
              </div>
            </div>
          )}
        </div>

        {/* Module Progress */}
        {progressData.moduleProgress.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Module Progress</h4>
            <div className="space-y-2">
              {progressData.moduleProgress.map((module) => (
                <div key={module.moduleId} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{module.moduleName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {module.lessonsCompleted}/{module.totalLessons}
                      </span>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                  </div>
                  <Progress value={module.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Last accessed: {progressData.lastAccessed.toLocaleDateString()}</span>
          </div>
          
          {progressData.certificateEligible && (
            <div className="flex items-center gap-2 text-green-600">
              <Award className="h-4 w-4" />
              <span>Certificate Ready</span>
            </div>
          )}
          
          {progressData.estimatedCompletion && (
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Est. completion: {progressData.estimatedCompletion.toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard view
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={progressStatus.color} variant="secondary">
            {progressStatus.label}
          </Badge>
          <span className="text-sm font-bold">{progressPercentage}%</span>
        </div>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2"
      />
      
      {progressData && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{progressData.completedLessons.length} lessons completed</span>
          <span>{Math.round(progressData.timeSpent / 60)}h {progressData.timeSpent % 60}m spent</span>
        </div>
      )}
    </div>
  );
};

export default ProgressDisplay;