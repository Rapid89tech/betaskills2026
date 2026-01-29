import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { GraduationCap, Users, BookOpen, TrendingUp } from 'lucide-react';

interface EnhancedDashboardSkeletonProps {
  variant?: 'student' | 'admin' | 'instructor';
  animated?: boolean;
}

const EnhancedDashboardSkeleton: React.FC<EnhancedDashboardSkeletonProps> = ({
  variant = 'student',
  animated = true
}) => {
  const animationClass = animated ? 'animate-pulse' : '';

  const renderStudentSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className={`h-12 w-12 rounded-full ${animationClass}`} />
            <div className="space-y-2">
              <Skeleton className={`h-6 w-48 ${animationClass}`} />
              <Skeleton className={`h-4 w-32 ${animationClass}`} />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className={`h-8 w-8 rounded ${animationClass}`} />
                <Skeleton className={`h-6 w-16 ${animationClass}`} />
              </div>
              <Skeleton className={`h-4 w-24 mb-2 ${animationClass}`} />
              <Skeleton className={`h-8 w-12 ${animationClass}`} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <Skeleton className={`h-6 w-32 ${animationClass}`} />
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Skeleton className={`h-16 w-16 rounded ${animationClass}`} />
                    <div className="flex-1 space-y-2">
                      <Skeleton className={`h-5 w-3/4 ${animationClass}`} />
                      <Skeleton className={`h-4 w-1/2 ${animationClass}`} />
                      <div className="flex items-center gap-2">
                        <Skeleton className={`h-2 w-32 rounded-full ${animationClass}`} />
                        <Skeleton className={`h-4 w-8 ${animationClass}`} />
                      </div>
                    </div>
                    <Skeleton className={`h-8 w-20 rounded ${animationClass}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <Skeleton className={`h-5 w-28 ${animationClass}`} />
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className={`h-8 w-8 rounded-full ${animationClass}`} />
                    <div className="flex-1 space-y-1">
                      <Skeleton className={`h-4 w-full ${animationClass}`} />
                      <Skeleton className={`h-3 w-16 ${animationClass}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Skeleton className={`h-5 w-24 mb-4 ${animationClass}`} />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className={`h-10 w-full rounded ${animationClass}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminSkeleton = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="space-y-2">
              <Skeleton className={`h-8 w-48 ${animationClass}`} />
              <Skeleton className={`h-4 w-32 ${animationClass}`} />
            </div>
            <Skeleton className={`h-10 w-24 rounded ${animationClass}`} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[Users, GraduationCap, BookOpen, TrendingUp].map((Icon, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4 space-y-2">
                  <Skeleton className={`h-4 w-20 ${animationClass}`} />
                  <Skeleton className={`h-6 w-8 ${animationClass}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <Skeleton className={`h-6 w-16 ${animationClass}`} />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Skeleton className={`h-10 w-10 rounded-full ${animationClass}`} />
                      <div className="space-y-2">
                        <Skeleton className={`h-4 w-32 ${animationClass}`} />
                        <Skeleton className={`h-3 w-48 ${animationClass}`} />
                        <Skeleton className={`h-3 w-28 ${animationClass}`} />
                      </div>
                    </div>
                    <Skeleton className={`h-6 w-16 rounded-full ${animationClass}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enrollments List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <Skeleton className={`h-6 w-32 ${animationClass}`} />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="space-y-2">
                        <Skeleton className={`h-4 w-40 ${animationClass}`} />
                        <Skeleton className={`h-3 w-32 ${animationClass}`} />
                      </div>
                      <Skeleton className={`h-6 w-16 rounded-full ${animationClass}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className={`h-8 w-16 rounded ${animationClass}`} />
                      <Skeleton className={`h-8 w-16 rounded ${animationClass}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstructorSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-12 h-12 text-red-600 mr-4" />
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
          <Skeleton className={`h-8 w-64 mx-auto mb-2 ${animationClass}`} />
          <Skeleton className={`h-4 w-48 mx-auto ${animationClass}`} />
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center space-y-2 mb-8">
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Authentication: Active</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Loading dashboard data...</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <Skeleton className={`h-6 w-48 mb-4 ${animationClass}`} />
                <div className="space-y-3">
                  <Skeleton className={`h-4 w-full ${animationClass}`} />
                  <Skeleton className={`h-4 w-5/6 ${animationClass}`} />
                  <Skeleton className={`h-4 w-4/6 ${animationClass}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Skeleton className={`h-6 w-32 mb-4 ${animationClass}`} />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className={`h-10 w-full rounded ${animationClass}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'admin':
      return renderAdminSkeleton();
    case 'instructor':
      return renderInstructorSkeleton();
    case 'student':
    default:
      return renderStudentSkeleton();
  }
};

export default EnhancedDashboardSkeleton;