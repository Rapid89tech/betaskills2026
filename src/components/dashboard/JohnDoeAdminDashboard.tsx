import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users,
  Check,
  XCircle,
  Search,
  UserCheck
} from 'lucide-react';

const JohnDoeAdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [allEnrollments, setAllEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Only show this dashboard for john.doe@gmail.com
  console.log('🔍 JohnDoeAdminDashboard: user email check:', user?.email);
  if (user?.email !== 'john.doe@gmail.com') {
    console.log('🔍 JohnDoeAdminDashboard: User is not john.doe@gmail.com, returning null');
    return null;
  }
  console.log('🔍 JohnDoeAdminDashboard: User is john.doe@gmail.com, showing dashboard');

  // Load all enrollments from localStorage
  useEffect(() => {
    const loadAllEnrollments = () => {
      setLoading(true);
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      console.log('🔍 john.doe@gmail.com loading all enrollments:', enrollments);
      console.log('🔍 john.doe@gmail.com enrollments length:', enrollments.length);
      console.log('🔍 john.doe@gmail.com user email check:', user?.email);
      setAllEnrollments(enrollments);
      setLoading(false);
    };

    loadAllEnrollments();

    // Listen for enrollment changes
    const handleStorageChange = () => {
      console.log('🔍 john.doe@gmail.com storage change detected');
      loadAllEnrollments();
    };

    // Also listen for the specific enrollment event
    const handleEnrollmentSubmitted = (event: any) => {
      console.log('🔍 john.doe@gmail.com enrollment submitted event:', event.detail);
      loadAllEnrollments();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('refresh-instructor-dashboard', handleStorageChange);
    window.addEventListener('enrollment-submitted', handleEnrollmentSubmitted);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refresh-instructor-dashboard', handleStorageChange);
      window.removeEventListener('enrollment-submitted', handleEnrollmentSubmitted);
    };
  }, [user?.email]);

  // Handle enrollment approval/rejection
  const handleEnrollmentAction = async (enrollmentId: string, action: 'approve' | 'reject') => {
    try {
      console.log(`🔄 ${action}ing enrollment:`, enrollmentId);
      
      // Update localStorage
      const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const enrollmentIndex = existingEnrollments.findIndex((e: any) => e.id === enrollmentId);
      
      if (enrollmentIndex !== -1) {
        existingEnrollments[enrollmentIndex].status = action === 'approve' ? 'approved' : 'rejected';
        existingEnrollments[enrollmentIndex].approved_at = action === 'approve' ? new Date().toISOString() : null;
        
        localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));
        setAllEnrollments(existingEnrollments);
        
        toast({
          title: `✅ Enrollment ${action}d!`,
          description: `Successfully ${action}d the enrollment request`,
        });
      }
    } catch (error) {
      console.error('Error updating enrollment:', error);
      toast({
        title: "❌ Error",
        description: `Failed to ${action} enrollment`,
        variant: "destructive",
      });
    }
  };

  // Filter enrollments based on search
  const filteredEnrollments = allEnrollments.filter(enrollment => {
    const matchesSearch = enrollment.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.course_title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const pendingEnrollments = filteredEnrollments.filter(e => e.status === 'pending');
  const approvedEnrollments = filteredEnrollments.filter(e => e.status === 'approved');
  const rejectedEnrollments = filteredEnrollments.filter(e => e.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all enrollment requests from users</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredEnrollments.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingEnrollments.length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{approvedEnrollments.length}</p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedEnrollments.length}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

                 {/* Search and Debug */}
         <div className="mb-6 flex gap-4">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
             <Input
               type="text"
               placeholder="Search by email or course..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="pl-10"
             />
           </div>
           <Button
             onClick={() => {
               const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
               console.log('🔍 DEBUG: localStorage enrollments:', enrollments);
               console.log('🔍 DEBUG: allEnrollments state:', allEnrollments);
               alert(`localStorage: ${enrollments.length} enrollments\nState: ${allEnrollments.length} enrollments\nUser: ${user?.email}`);
             }}
             variant="outline"
             size="sm"
           >
             Debug localStorage
           </Button>
         </div>

        {/* Enrollments List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Enrollment Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading enrollments...</p>
              </div>
            ) : filteredEnrollments.length > 0 ? (
              <div className="space-y-4">
                {filteredEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{enrollment.user_email}</p>
                        <p className="text-sm text-gray-500">{enrollment.course_title}</p>
                        <p className="text-xs text-gray-400">
                          Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={
                          enrollment.status === 'approved' ? 'default' :
                          enrollment.status === 'rejected' ? 'destructive' : 'secondary'
                        }
                      >
                        {enrollment.status}
                      </Badge>
                      
                      {enrollment.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleEnrollmentAction(enrollment.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEnrollmentAction(enrollment.id, 'reject')}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No enrollments found</p>
                <p className="text-sm text-gray-400">
                  {searchTerm ? 'Try adjusting your search' : 'No enrollment requests yet'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JohnDoeAdminDashboard;
