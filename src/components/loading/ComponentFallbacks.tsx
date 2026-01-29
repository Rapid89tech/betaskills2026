/**
 * Component Fallbacks
 * 
 * Provides fallback components for failed lazy loading scenarios.
 * These components are used when the main component fails to load,
 * providing a graceful degradation experience for users.
 */

import React from 'react';
import { AlertCircle, RefreshCw, Home, User, BookOpen, Settings, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Generic fallback props
interface FallbackProps {
  error?: Error;
  retry?: () => void;
  componentName?: string;
  className?: string;
}

// Loading fallback component
export const LoadingFallback: React.FC<FallbackProps> = ({ 
  componentName = 'component',
  className = '' 
}) => (
  <div className={`flex items-center justify-center p-8 ${className}`}>
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <div className="text-center">
        <p className="text-gray-600 font-medium">Loading {componentName}...</p>
        <p className="text-sm text-gray-500 mt-1">Please wait while we prepare your content</p>
      </div>
    </div>
  </div>
);

// Generic error fallback component
export const ErrorFallback: React.FC<FallbackProps> = ({ 
  error, 
  retry, 
  componentName = 'component',
  className = '' 
}) => (
  <div className={`flex items-center justify-center p-8 ${className}`}>
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <CardTitle className="text-red-800">Component Failed to Load</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          The {componentName} could not be loaded. This might be due to a network issue or temporary problem.
        </p>
        
        {error && (
          <Alert className="text-left">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Error:</strong> {error.message}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {retry && (
            <Button onClick={retry} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Dashboard fallback component
export const DashboardFallback: React.FC<FallbackProps> = ({ 
  error, 
  retry, 
  className = '' 
}) => (
  <div className={`p-6 ${className}`}>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Home className="h-4 w-4 text-blue-600" />
          </div>
          <CardTitle>Dashboard Unavailable</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          The dashboard is temporarily unavailable. You can still access other parts of the application.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            View Courses
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </Button>
        </div>
        
        {retry && (
          <Button onClick={retry} className="w-full flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reload Dashboard
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);

// Course content fallback
export const CourseContentFallback: React.FC<FallbackProps> = ({ 
  error, 
  retry, 
  className = '' 
}) => (
  <div className={`p-6 ${className}`}>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-green-600" />
          </div>
          <CardTitle>Course Content Unavailable</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          The course content could not be loaded. This might be a temporary issue.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">What you can do:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Contact support if the problem persists</li>
          </ul>
        </div>
        
        {retry && (
          <Button onClick={retry} className="w-full flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reload Course Content
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);

// Admin panel fallback
export const AdminPanelFallback: React.FC<FallbackProps> = ({ 
  error, 
  retry, 
  className = '' 
}) => (
  <div className={`p-6 ${className}`}>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Settings className="h-4 w-4 text-purple-600" />
          </div>
          <CardTitle>Admin Panel Unavailable</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          The admin panel could not be loaded. Please try again or contact technical support.
        </p>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            If you're experiencing repeated issues, please check your admin permissions or contact support.
          </AlertDescription>
        </Alert>
        
        {retry && (
          <Button onClick={retry} className="w-full flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reload Admin Panel
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);

// User profile fallback
export const UserProfileFallback: React.FC<FallbackProps> = ({ 
  error, 
  retry, 
  className = '' 
}) => (
  <div className={`p-6 ${className}`}>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <User className="h-4 w-4 text-indigo-600" />
          </div>
          <CardTitle>Profile Unavailable</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          Your profile information could not be loaded at this time.
        </p>
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Button>
          {retry && (
            <Button onClick={retry} className="w-full flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Reload Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Form fallback component
export const FormFallback: React.FC<FallbackProps> = ({ 
  error, 
  retry, 
  componentName = 'form',
  className = '' 
}) => (
  <div className={`p-6 ${className}`}>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <FileText className="h-4 w-4 text-orange-600" />
          </div>
          <CardTitle>Form Unavailable</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          The {componentName} could not be loaded. Please try again.
        </p>
        
        {error && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Technical details: {error.message}
            </AlertDescription>
          </Alert>
        )}
        
        {retry && (
          <Button onClick={retry} className="w-full flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reload Form
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);

// List/Table fallback component
export const ListFallback: React.FC<FallbackProps> = ({ 
  error, 
  retry, 
  componentName = 'list',
  className = '' 
}) => (
  <div className={`p-6 ${className}`}>
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
            <Users className="h-4 w-4 text-teal-600" />
          </div>
          <CardTitle>Content Unavailable</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          The {componentName} could not be loaded. This might be due to a network issue.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        
        {retry && (
          <Button onClick={retry} className="w-full flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reload Content
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);

// Minimal fallback for critical components
export const MinimalFallback: React.FC<FallbackProps> = ({ 
  componentName = 'component',
  className = '' 
}) => (
  <div className={`flex items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded ${className}`}>
    <div className="text-center">
      <AlertCircle className="h-6 w-6 text-gray-400 mx-auto mb-2" />
      <p className="text-sm text-gray-600">{componentName} unavailable</p>
    </div>
  </div>
);

// Skeleton fallback for loading states
export const SkeletonFallback: React.FC<{ 
  lines?: number; 
  className?: string;
}> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`animate-pulse space-y-3 p-4 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

// Export all fallback components
export const ComponentFallbacks = {
  Loading: LoadingFallback,
  Error: ErrorFallback,
  Dashboard: DashboardFallback,
  CourseContent: CourseContentFallback,
  AdminPanel: AdminPanelFallback,
  UserProfile: UserProfileFallback,
  Form: FormFallback,
  List: ListFallback,
  Minimal: MinimalFallback,
  Skeleton: SkeletonFallback
};

export default ComponentFallbacks;