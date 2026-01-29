import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CacheControlButton } from '@/components/CacheManager';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  created_at: string;
  role?: string;
  approved?: boolean;
  approval_status?: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  enrolled_at: string;
}

interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  course_title?: string;
  status: string;
  progress?: number;
  enrolled_at: string;
  approved_at?: string;
  last_accessed?: string;
  timeSpent?: number;
  completedLessons?: string[];
  quizScores?: Record<string, number>;
}

interface UserDetails {
  user: User;
  enrollments: Enrollment[];
  progress: UserProgress[];
}

const UltraSimpleAdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [userDetailsLoading, setUserDetailsLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    // Set a reasonable timeout to prevent infinite loading (reduced to 20 seconds)
    const timeout = setTimeout(() => {
      console.warn('⚠️ Ultra Admin dashboard loading timeout - forcing stop');
      setLoading(false);
      setError('Loading is taking longer than expected. Please try refreshing the page.');
    }, 20000); // 20 second timeout - more reasonable for real-world conditions

    setLoadingTimeout(timeout);
    
    try {
      console.log('🔄 Ultra Simple Admin: Fetching data...');
      
      // Simple fetch without aggressive timeouts - let the network handle it naturally
      const [usersResult, enrollmentsResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50), // Limit to 50 users for faster loading
        supabase
          .from('enrollments')
          .select('*')
          .eq('status', 'pending')
          .order('enrolled_at', { ascending: false })
          .limit(20) // Limit to 20 enrollments for faster loading
      ]);

      if (usersResult.error) {
        console.error('❌ Users error:', usersResult.error);
        throw new Error(`Users error: ${usersResult.error.message}`);
      }

      if (enrollmentsResult.error) {
        console.error('❌ Enrollments error:', enrollmentsResult.error);
        throw new Error(`Enrollments error: ${enrollmentsResult.error.message}`);
      }

      console.log('✅ Ultra Simple Admin: Data fetched successfully');
      setUsers(usersResult.data || []);
      setEnrollments(enrollmentsResult.data || []);
      
    } catch (error: any) {
      console.error('❌ Ultra Simple Admin Error:', error);
      setError(error.message || 'Failed to load data');
    } finally {
      // Clear the timeout
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        setLoadingTimeout(null);
      }
      setLoading(false);
    }
  };

  const approveEnrollment = async (enrollmentId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status: 'approved' })
        .eq('id', enrollmentId);

      if (error) throw error;
      
      // Refresh data
      await fetchData();
      alert('Enrollment approved successfully!');
    } catch (error: any) {
      console.error('Error approving enrollment:', error);
      alert('Failed to approve enrollment');
    }
  };

  const rejectEnrollment = async (enrollmentId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status: 'rejected' })
        .eq('id', enrollmentId);

      if (error) throw error;
      
      // Refresh data
      await fetchData();
      alert('Enrollment rejected successfully!');
    } catch (error: any) {
      console.error('Error rejecting enrollment:', error);
      alert('Failed to reject enrollment');
    }
  };

  const fetchUserDetails = async (userId: string) => {
    setUserDetailsLoading(true);
    try {
      console.log('🔄 Fetching user details for:', userId);
      
      // Fetch user enrollments
      const { data: userEnrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (enrollmentsError) {
        console.error('❌ User enrollments error:', enrollmentsError);
      }

      // Fetch user progress from enrollments table (where the real progress is stored)
      const { data: userProgress, error: progressError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'approved');

      if (progressError) {
        console.error('❌ User progress error:', progressError);
      } else {
        console.log('✅ User progress data from enrollments:', userProgress);
      }

      // Also check localStorage for real progress data (same as user dashboard)
      const enrichedProgress = userProgress?.map((enrollment: any) => {
        // Check localStorage for real progress data (same keys as user dashboard)
        const progressKey = `course-progress-${enrollment.course_id}`;
        const completedKey = `completed-lessons-${enrollment.course_id}`;
        const legacyProgressKey = `progress-${enrollment.course_id}`;
        const legacyCompletedKey = `completedLessons-${enrollment.course_id}`;
        
        // Try to get progress from localStorage (same as useStableProgress)
        let realProgress = enrollment.progress || 0;
        let completedLessons: string[] = [];
        
        try {
          // Check current localStorage keys
          const savedProgress = localStorage.getItem(progressKey);
          const savedCompleted = localStorage.getItem(completedKey);
          
          if (savedProgress && savedCompleted) {
            realProgress = parseInt(savedProgress);
            completedLessons = JSON.parse(savedCompleted);
            console.log(`✅ Found real progress in localStorage for ${enrollment.course_id}:`, realProgress);
          } else {
            // Check legacy keys
            const legacyProgress = localStorage.getItem(legacyProgressKey);
            const legacyCompleted = localStorage.getItem(legacyCompletedKey);
            
            if (legacyProgress && legacyCompleted) {
              realProgress = parseInt(legacyProgress);
              completedLessons = JSON.parse(legacyCompleted);
              console.log(`✅ Found legacy progress in localStorage for ${enrollment.course_id}:`, realProgress);
            }
          }
        } catch (error) {
          console.warn('Error reading localStorage progress:', error);
        }
        
        return {
          ...enrollment,
          progress: realProgress,
          completedLessons: completedLessons,
          timeSpent: enrollment.timeSpent || 0,
          quizScores: enrollment.quizScores || {}
        };
      }) || [];

      // Get the user from the users array
      const user = users.find(u => u.id === userId);
      if (!user) {
        throw new Error('User not found');
      }

      const userDetails: UserDetails = {
        user,
        enrollments: userEnrollments || [],
        progress: enrichedProgress || []
      };

      setSelectedUser(userDetails);
      console.log('✅ User details fetched successfully:', userDetails);
      
    } catch (error: any) {
      console.error('❌ Error fetching user details:', error);
      alert('Failed to fetch user details');
    } finally {
      setUserDetailsLoading(false);
    }
  };

  const closeUserPopup = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    // Simple fetch without any complex dependencies
    fetchData();
    
    // Cleanup timeout on unmount
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, []);

  // Cleanup timeout when component unmounts
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Ultra Admin Dashboard</h3>
          <p className="text-gray-600 mb-4">Please wait while we load the data...</p>
          <div className="space-y-2">
            <button
              onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Retry Loading
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm ml-2"
            >
              Force Refresh
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            If loading takes too long, try refreshing the page. The application will handle cache management automatically.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h3 className="font-bold">Error Loading Dashboard</h3>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ultra Simple Admin Dashboard</h1>
              <p className="text-gray-600">Fast and reliable admin panel</p>
            </div>
            <div className="flex space-x-2">
              <CacheControlButton />
              <button
                onClick={fetchData}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Enrollments</p>
                <p className="text-2xl font-semibold text-gray-900">{enrollments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users and Enrollments Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registered Users */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Registered Users</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {users.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No registered users
                </div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer" onClick={() => fetchUserDetails(user.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.contact_number}</p>
                        <p className="text-sm text-gray-500">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending Enrollments */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Pending Enrollments</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {enrollments.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No pending enrollments
                </div>
              ) : (
                enrollments.map((enrollment) => {
                  // Try multiple ways to find the user
                  let user = users.find(u => u.id === enrollment.user_id);
                  
                  // If not found by ID, try by email
                  if (!user && enrollment.user_email) {
                    user = users.find(u => u.email === enrollment.user_email);
                  }
                  
                  // If still not found, try by user_id field (some enrollments might have user_id as a different field)
                  if (!user) {
                    user = users.find(u => u.user_id === enrollment.user_id);
                  }
                  
                  // Debug logging to see what's happening
                  console.log('🔍 Enrollment:', {
                    enrollmentId: enrollment.id,
                    enrollmentUserId: enrollment.user_id,
                    userEmail: enrollment.user_email,
                    foundUser: user ? `${user.first_name} ${user.last_name}` : 'NOT FOUND',
                    allUserIds: users.map(u => ({ id: u.id, email: u.email, user_id: u.user_id }))
                  });
                  
                  return (
                    <div key={enrollment.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user ? `${user.first_name} ${user.last_name}` : (enrollment.user_email || 'Unknown User')}
                          </p>
                          <p className="text-sm text-gray-500">{user?.email || enrollment.user_email || 'No email available'}</p>
                          <p className="text-sm text-gray-500">Course ID: {enrollment.course_id}</p>
                          <p className="text-sm text-gray-500">
                            Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => approveEnrollment(enrollment.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectEnrollment(enrollment.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Details Popup */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                User Details: {selectedUser.user.first_name} {selectedUser.user.last_name}
              </h3>
              <button
                onClick={closeUserPopup}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {userDetailsLoading ? (
              <div className="px-6 py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Loading user details...</p>
              </div>
            ) : (
              <div className="px-6 py-4 space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.user.first_name} {selectedUser.user.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.user.contact_number}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.user.role || 'Student'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Registration Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedUser.user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Status</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.user.approved ? 'Approved' : 'Pending Approval'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Enrollments */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Course Enrollments</h4>
                  {selectedUser.enrollments.length === 0 ? (
                    <p className="text-sm text-gray-500">No enrollments found</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedUser.enrollments.map((enrollment) => (
                        <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Course ID: {enrollment.course_id}</p>
                              <p className="text-sm text-gray-500">Status: {enrollment.status}</p>
                              <p className="text-sm text-gray-500">
                                Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                              enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {enrollment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Course Progress */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Course Progress</h4>
                  {selectedUser.progress.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">No progress data found</p>
                      <p className="text-xs text-gray-400">Progress will appear when the user starts taking lessons and quizzes</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedUser.progress.map((progress, index) => (
                        <div key={progress.id || index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Course: {progress.course_title || progress.course_id}</p>
                              <p className="text-xs text-gray-500">Status: {progress.status}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-blue-600">
                                {Math.round(progress.progress || 0)}%
                              </span>
                              <p className="text-xs text-gray-500">Complete</p>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-in-out" 
                              style={{ width: `${Math.min(progress.progress || 0, 100)}%` }}
                            ></div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-600">Completed Lessons:</span>
                              <span className="font-medium text-gray-900">{progress.completedLessons?.length || 0}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">Time Spent:</span>
                              <span className="font-medium text-gray-900">{progress.timeSpent || 0} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-gray-600">Quiz Scores:</span>
                              <span className="font-medium text-gray-900">{Object.keys(progress.quizScores || {}).length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-600">Last Accessed:</span>
                              <span className="font-medium text-gray-900">{progress.last_accessed ? new Date(progress.last_accessed).toLocaleDateString() : 'Never'}</span>
                            </div>
                          </div>
                          
                          {/* Quiz Scores Display */}
                          {progress.quizScores && Object.keys(progress.quizScores).length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-xs font-medium text-gray-700 mb-2">Quiz Scores:</p>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(progress.quizScores).map(([quizId, score]) => (
                                  <span key={quizId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {quizId}: {score}%
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UltraSimpleAdminDashboard;