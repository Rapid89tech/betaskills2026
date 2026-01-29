import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/AuthContext';
import { GraduationCap, Users, BookOpen, DollarSign } from 'lucide-react';

const InstructorDashboardTest = () => {
  const { user, profile } = useAuth();

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <GraduationCap className="w-8 h-8 text-red-600" />
            Instructor Dashboard Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Current User Information:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Email:</strong> {user?.email || 'Not logged in'}
                </div>
                <div>
                  <strong>User ID:</strong> {user?.id || 'N/A'}
                </div>
                <div>
                  <strong>Role:</strong> 
                  <Badge className="ml-2" variant={profile?.role === 'instructor' ? 'default' : 'secondary'}>
                    {profile?.role || 'No role'}
                  </Badge>
                </div>
                <div>
                  <strong>Approved:</strong> 
                  <Badge className="ml-2" variant={profile?.approved ? 'default' : 'destructive'}>
                    {profile?.approved ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ Success!</h3>
              <p className="text-green-700">
                You have successfully accessed the instructor dashboard. This means:
              </p>
              <ul className="list-disc list-inside mt-2 text-green-700">
                <li>Authentication is working correctly</li>
                <li>Role-based access control is functioning</li>
                <li>Profile loading is successful</li>
                <li>Routing is working as expected</li>
              </ul>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-xl font-bold">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Active Courses</p>
                      <p className="text-xl font-bold">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-xl font-bold">R0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
              <Button onClick={() => window.location.href = '/dashboard'}>
                Go to Main Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboardTest;
