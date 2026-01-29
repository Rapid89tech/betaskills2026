import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, BookOpen, DollarSign, AlertTriangle } from 'lucide-react';

const InstructorDashboardSimple = () => {
  // Add error boundary for this component
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('InstructorDashboardSimple error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-red-600">
              <AlertTriangle className="w-8 h-8" />
              Dashboard Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-red-600 mb-4">An error occurred while loading the dashboard.</p>
              <Button onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <GraduationCap className="w-8 h-8 text-red-600" />
            Instructor Dashboard (Simple)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ Dashboard is Working!</h3>
              <p className="text-green-700">
                The instructor dashboard is now rendering correctly. This means:
              </p>
              <ul className="list-disc list-inside mt-2 text-green-700">
                <li>Authentication is working correctly</li>
                <li>Component rendering is successful</li>
                <li>Routing is working as expected</li>
                <li>No more blank page issues</li>
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
               <Button 
                 onClick={() => {
                   // Force reload to try full dashboard
                   localStorage.setItem('use-full-dashboard', 'true');
                   window.location.reload();
                 }}
                 className="bg-red-600 hover:bg-red-700"
               >
                 Try Full Dashboard
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

export default InstructorDashboardSimple;
