import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserRouter } from '@/hooks/useUserRouter';
import { useAuth } from '@/hooks/AuthContext';

/**
 * Demo component to showcase UserRouter functionality
 * This component allows testing different routing scenarios
 */
export const UserRouterDemo: React.FC = () => {
  const { 
    routeToUserDashboard, 
    getDashboardPreference, 
    setDashboardPreference,
    validateRouteAccess,
    getRoutingHistory,
    clearRoutingHistory,
    currentProfile 
  } = useUserRouter();
  
  const { user } = useAuth();

  const handleRouteToStudentDashboard = () => {
    if (currentProfile) {
      const result = routeToUserDashboard({
        ...currentProfile,
        dashboard_preference: 'student'
      });
      console.log('Route to student dashboard result:', result);
    }
  };

  const handleRouteToInstructorDashboard = () => {
    if (currentProfile) {
      const result = routeToUserDashboard({
        ...currentProfile,
        dashboard_preference: 'instructor'
      });
      console.log('Route to instructor dashboard result:', result);
    }
  };

  const handleRouteToAdminDashboard = () => {
    if (currentProfile) {
      const result = routeToUserDashboard({
        ...currentProfile,
        dashboard_preference: 'admin'
      });
      console.log('Route to admin dashboard result:', result);
    }
  };

  const handleSetPreference = async (preference: 'student' | 'instructor' | 'admin') => {
    const success = await setDashboardPreference(preference);
    console.log(`Set preference to ${preference}:`, success);
  };

  const currentPreference = currentProfile ? getDashboardPreference() : null;
  const routingHistory = getRoutingHistory();

  if (!user || !currentProfile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>UserRouter Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please log in to test UserRouter functionality.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>UserRouter Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Current User Info</h3>
            <p><strong>Email:</strong> {currentProfile.email}</p>
            <p><strong>Role:</strong> {currentProfile.role}</p>
            <p><strong>Current Preference:</strong> {currentPreference || 'None'}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Route to Dashboard</h3>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleRouteToStudentDashboard} variant="outline">
                Student Dashboard
              </Button>
              <Button onClick={handleRouteToInstructorDashboard} variant="outline">
                Instructor Dashboard
              </Button>
              <Button onClick={handleRouteToAdminDashboard} variant="outline">
                Admin Dashboard
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Set Dashboard Preference</h3>
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={() => handleSetPreference('student')} 
                variant={currentPreference === 'student' ? 'default' : 'outline'}
                size="sm"
              >
                Prefer Student
              </Button>
              <Button 
                onClick={() => handleSetPreference('instructor')} 
                variant={currentPreference === 'instructor' ? 'default' : 'outline'}
                size="sm"
              >
                Prefer Instructor
              </Button>
              <Button 
                onClick={() => handleSetPreference('admin')} 
                variant={currentPreference === 'admin' ? 'default' : 'outline'}
                size="sm"
              >
                Prefer Admin
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Route Access Validation</h3>
            <div className="text-sm space-y-1">
              <p>Can access /dashboard: {validateRouteAccess('/dashboard') ? '✅' : '❌'}</p>
              <p>Can access /instructor-dashboard: {validateRouteAccess('/instructor-dashboard') ? '✅' : '❌'}</p>
              <p>Can access /admin-dashboard: {validateRouteAccess('/admin-dashboard') ? '✅' : '❌'}</p>
              <p>Can access /course/123: {validateRouteAccess('/course/123') ? '✅' : '❌'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Routing History</h3>
            <div className="text-sm space-y-1 max-h-32 overflow-y-auto">
              {routingHistory.length > 0 ? (
                routingHistory.slice(-5).map((entry, index) => (
                  <p key={index} className={entry.success ? 'text-green-600' : 'text-red-600'}>
                    {entry.timestamp.toLocaleTimeString()}: {entry.route} {entry.success ? '✅' : '❌'}
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No routing history</p>
              )}
            </div>
            <Button onClick={clearRoutingHistory} variant="outline" size="sm" className="mt-2">
              Clear History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};