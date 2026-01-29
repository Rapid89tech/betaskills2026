import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Clock, Users, Star, Play } from 'lucide-react';

interface EnhancedCourseSkeletonProps {
  variant?: 'grid' | 'detail' | 'content';
  animated?: boolean;
  count?: number;
}

const EnhancedCourseSkeleton: React.FC<EnhancedCourseSkeletonProps> = ({
  variant = 'grid',
  animated = true,
  count = 6
}) => {
  const animationClass = animated ? 'animate-pulse' : '';

  const renderGridSkeleton = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className={`h-12 w-64 mx-auto mb-4 ${animationClass}`} />
          <Skeleton className={`h-6 w-96 mx-auto mb-6 ${animationClass}`} />
          
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Skeleton className={`h-10 w-48 rounded-lg ${animationClass}`} />
            <Skeleton className={`h-10 w-32 rounded-lg ${animationClass}`} />
            <Skeleton className={`h-10 w-28 rounded-lg ${animationClass}`} />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Course Image */}
              <Skeleton className={`h-48 w-full ${animationClass}`} />
              
              {/* Course Content */}
              <div className="p-6">
                {/* Category Badge */}
                <Skeleton className={`h-5 w-20 rounded-full mb-3 ${animationClass}`} />
                
                {/* Title */}
                <Skeleton className={`h-6 w-full mb-2 ${animationClass}`} />
                <Skeleton className={`h-6 w-3/4 mb-4 ${animationClass}`} />
                
                {/* Description */}
                <div className="space-y-2 mb-4">
                  <Skeleton className={`h-4 w-full ${animationClass}`} />
                  <Skeleton className={`h-4 w-5/6 ${animationClass}`} />
                  <Skeleton className={`h-4 w-4/6 ${animationClass}`} />
                </div>
                
                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <Skeleton className={`h-4 w-12 ${animationClass}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <Skeleton className={`h-4 w-8 ${animationClass}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <Skeleton className={`h-4 w-6 ${animationClass}`} />
                  </div>
                </div>
                
                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <Skeleton className={`h-6 w-16 ${animationClass}`} />
                  <Skeleton className={`h-10 w-24 rounded ${animationClass}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDetailSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className={`h-4 w-16 ${animationClass}`} />
            <span className="text-gray-400">/</span>
            <Skeleton className={`h-4 w-20 ${animationClass}`} />
            <span className="text-gray-400">/</span>
            <Skeleton className={`h-4 w-32 ${animationClass}`} />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <Skeleton className={`h-6 w-24 rounded-full mb-4 ${animationClass}`} />
                <Skeleton className={`h-10 w-full mb-2 ${animationClass}`} />
                <Skeleton className={`h-10 w-3/4 mb-6 ${animationClass}`} />
                
                {/* Course Image/Video */}
                <div className="relative mb-6">
                  <Skeleton className={`h-64 w-full rounded-lg ${animationClass}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                
                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="text-center">
                      <Skeleton className={`h-8 w-8 mx-auto mb-2 rounded ${animationClass}`} />
                      <Skeleton className={`h-4 w-12 mx-auto mb-1 ${animationClass}`} />
                      <Skeleton className={`h-3 w-16 mx-auto ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Description */}
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <Skeleton className={`h-6 w-32 mb-4 ${animationClass}`} />
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className={`h-4 w-${i % 2 === 0 ? 'full' : '5/6'} ${animationClass}`} />
                  ))}
                </div>
              </div>

              {/* Course Modules */}
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <Skeleton className={`h-6 w-40 mb-6 ${animationClass}`} />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Skeleton className={`h-12 w-12 rounded ${animationClass}`} />
                      <div className="flex-1 space-y-2">
                        <Skeleton className={`h-5 w-3/4 ${animationClass}`} />
                        <Skeleton className={`h-4 w-1/2 ${animationClass}`} />
                      </div>
                      <Skeleton className={`h-8 w-16 rounded ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-6">
                <Skeleton className={`h-8 w-20 mb-4 ${animationClass}`} />
                <Skeleton className={`h-12 w-full rounded mb-4 ${animationClass}`} />
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <Skeleton className={`h-4 w-16 ${animationClass}`} />
                    <Skeleton className={`h-4 w-12 ${animationClass}`} />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className={`h-4 w-20 ${animationClass}`} />
                    <Skeleton className={`h-4 w-16 ${animationClass}`} />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className={`h-4 w-14 ${animationClass}`} />
                    <Skeleton className={`h-4 w-10 ${animationClass}`} />
                  </div>
                </div>
                
                <Skeleton className={`h-12 w-full rounded ${animationClass}`} />
              </div>

              {/* Course Features */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <Skeleton className={`h-5 w-28 mb-4 ${animationClass}`} />
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className={`h-5 w-5 rounded ${animationClass}`} />
                      <Skeleton className={`h-4 w-32 ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Info */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <Skeleton className={`h-5 w-24 mb-4 ${animationClass}`} />
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className={`h-12 w-12 rounded-full ${animationClass}`} />
                  <div className="space-y-2">
                    <Skeleton className={`h-4 w-24 ${animationClass}`} />
                    <Skeleton className={`h-3 w-20 ${animationClass}`} />
                  </div>
                </div>
                <Skeleton className={`h-4 w-full ${animationClass}`} />
                <Skeleton className={`h-4 w-3/4 ${animationClass}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentSkeleton = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Course Header */}
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className={`h-10 w-10 rounded ${animationClass}`} />
              <div className="flex-1 space-y-2">
                <Skeleton className={`h-6 w-3/4 ${animationClass}`} />
                <Skeleton className={`h-4 w-1/2 ${animationClass}`} />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <Skeleton className={`h-4 w-16 ${animationClass}`} />
                <Skeleton className={`h-4 w-8 ${animationClass}`} />
              </div>
              <Skeleton className={`h-2 w-full rounded-full ${animationClass}`} />
            </div>
          </div>

          {/* Video Player */}
          <div className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
            <div className="relative">
              <Skeleton className={`h-96 w-full ${animationClass}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-20 w-20 text-gray-400" />
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className={`h-8 w-8 rounded ${animationClass}`} />
                  <Skeleton className={`h-4 w-24 ${animationClass}`} />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className={`h-8 w-8 rounded ${animationClass}`} />
                  <Skeleton className={`h-8 w-8 rounded ${animationClass}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <Skeleton className={`h-6 w-48 mb-4 ${animationClass}`} />
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className={`h-4 w-${i % 3 === 0 ? 'full' : i % 3 === 1 ? '5/6' : '4/6'} ${animationClass}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Module Navigation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <Skeleton className={`h-5 w-32 mb-4 ${animationClass}`} />
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className={`h-6 w-6 rounded ${animationClass}`} />
                      <Skeleton className={`h-4 w-full ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <Skeleton className={`h-5 w-24 mb-4 ${animationClass}`} />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className={`h-8 w-8 rounded ${animationClass}`} />
                      <Skeleton className={`h-4 w-28 ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'detail':
      return renderDetailSkeleton();
    case 'content':
      return renderContentSkeleton();
    case 'grid':
    default:
      return renderGridSkeleton();
  }
};

export default EnhancedCourseSkeleton;