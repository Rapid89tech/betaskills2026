import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditCard, FileText, CheckCircle, Clock } from 'lucide-react';

interface EnrollmentSkeletonProps {
  variant?: 'form' | 'status' | 'list';
  animated?: boolean;
  count?: number;
}

const EnrollmentSkeleton: React.FC<EnrollmentSkeletonProps> = ({
  variant = 'form',
  animated = true,
  count = 5
}) => {
  const animationClass = animated ? 'animate-pulse' : '';

  const renderFormSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Skeleton className={`h-8 w-64 mx-auto mb-4 ${animationClass}`} />
            <Skeleton className={`h-5 w-96 mx-auto ${animationClass}`} />
          </div>

          {/* Course Info Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className={`h-16 w-16 rounded ${animationClass}`} />
              <div className="flex-1 space-y-2">
                <Skeleton className={`h-6 w-3/4 ${animationClass}`} />
                <Skeleton className={`h-4 w-1/2 ${animationClass}`} />
              </div>
              <Skeleton className={`h-8 w-20 rounded-full ${animationClass}`} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className={`h-6 w-6 mx-auto mb-2 ${animationClass}`} />
                  <Skeleton className={`h-4 w-12 mx-auto mb-1 ${animationClass}`} />
                  <Skeleton className={`h-3 w-16 mx-auto ${animationClass}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <Skeleton className={`h-6 w-32 ${animationClass}`} />
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <Skeleton className={`h-5 w-40 mb-4 ${animationClass}`} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Skeleton className={`h-4 w-20 mb-2 ${animationClass}`} />
                    <Skeleton className={`h-10 w-full rounded ${animationClass}`} />
                  </div>
                  <div>
                    <Skeleton className={`h-4 w-20 mb-2 ${animationClass}`} />
                    <Skeleton className={`h-10 w-full rounded ${animationClass}`} />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <Skeleton className={`h-5 w-36 mb-4 ${animationClass}`} />
                <div className="space-y-4">
                  <div>
                    <Skeleton className={`h-4 w-16 mb-2 ${animationClass}`} />
                    <Skeleton className={`h-10 w-full rounded ${animationClass}`} />
                  </div>
                  <div>
                    <Skeleton className={`h-4 w-24 mb-2 ${animationClass}`} />
                    <Skeleton className={`h-10 w-full rounded ${animationClass}`} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <Skeleton className={`h-5 w-32 mb-4 ${animationClass}`} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Skeleton className={`h-6 w-6 rounded-full ${animationClass}`} />
                        <Skeleton className={`h-5 w-24 ${animationClass}`} />
                      </div>
                      <Skeleton className={`h-4 w-full ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="border-t pt-6">
                <div className="flex items-start gap-3">
                  <Skeleton className={`h-5 w-5 rounded mt-0.5 ${animationClass}`} />
                  <div className="flex-1 space-y-2">
                    <Skeleton className={`h-4 w-full ${animationClass}`} />
                    <Skeleton className={`h-4 w-3/4 ${animationClass}`} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Skeleton className={`h-12 w-full rounded ${animationClass}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStatusSkeleton = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Skeleton className={`h-8 w-48 mx-auto mb-4 ${animationClass}`} />
            <Skeleton className={`h-5 w-64 mx-auto ${animationClass}`} />
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-lg p-8 shadow-sm border mb-8">
            <Skeleton className={`h-6 w-32 mb-6 ${animationClass}`} />
            
            <div className="space-y-6">
              {[
                { icon: FileText, status: 'submitted' },
                { icon: Clock, status: 'pending' },
                { icon: CheckCircle, status: 'approved' }
              ].map(({ icon: Icon }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${i === 1 ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                    <Icon className={`h-6 w-6 ${i === 1 ? 'text-yellow-600' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Skeleton className={`h-5 w-32 ${animationClass}`} />
                    <Skeleton className={`h-4 w-48 ${animationClass}`} />
                  </div>
                  <Skeleton className={`h-4 w-20 ${animationClass}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Enrollment Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Skeleton className={`h-6 w-28 mb-4 ${animationClass}`} />
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className={`h-16 w-16 rounded ${animationClass}`} />
                  <div className="flex-1 space-y-2">
                    <Skeleton className={`h-5 w-3/4 ${animationClass}`} />
                    <Skeleton className={`h-4 w-1/2 ${animationClass}`} />
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className={`h-4 w-24 ${animationClass}`} />
                      <Skeleton className={`h-4 w-16 ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <Skeleton className={`h-6 w-36 mb-4 ${animationClass}`} />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className={`h-5 w-32 ${animationClass}`} />
                    <Skeleton className={`h-4 w-24 ${animationClass}`} />
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className={`h-4 w-20 ${animationClass}`} />
                      <Skeleton className={`h-4 w-12 ${animationClass}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className={`h-10 w-32 rounded ${animationClass}`} />
              <Skeleton className={`h-10 w-28 rounded ${animationClass}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Skeleton className={`h-12 w-12 rounded ${animationClass}`} />
              <div className="space-y-2">
                <Skeleton className={`h-5 w-48 ${animationClass}`} />
                <Skeleton className={`h-4 w-32 ${animationClass}`} />
              </div>
            </div>
            <Skeleton className={`h-6 w-20 rounded-full ${animationClass}`} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="text-center">
                <Skeleton className={`h-4 w-16 mx-auto mb-1 ${animationClass}`} />
                <Skeleton className={`h-3 w-12 mx-auto ${animationClass}`} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Skeleton className={`h-8 w-16 rounded ${animationClass}`} />
            <Skeleton className={`h-8 w-20 rounded ${animationClass}`} />
          </div>
        </div>
      ))}
    </div>
  );

  switch (variant) {
    case 'status':
      return renderStatusSkeleton();
    case 'list':
      return renderListSkeleton();
    case 'form':
    default:
      return renderFormSkeleton();
  }
};

export default EnrollmentSkeleton;