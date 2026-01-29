import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  approved?: boolean;
  approval_status?: string;
  contact_number?: string;
  created_at: string;
  updated_at: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: string;
  enrolled_at: string;
  approved_at?: string;
  progress: number;
  proof_of_payment?: string;
  payment_ref?: string;
  payment_date?: string;
}

const StandaloneAdminDashboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('users');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 StandaloneAdminDashboard: Starting to fetch data...');
      
      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 StandaloneAdminDashboard: Profiles result:', { data: profilesData?.length, error: profilesError });
      
      if (profilesError) {
        console.error('❌ StandaloneAdminDashboard: Profiles error:', profilesError);
        throw new Error(`Profiles error: ${profilesError.message}`);
      }
      
      // Fetch enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      console.log('📊 StandaloneAdminDashboard: Enrollments result:', { data: enrollmentsData?.length, error: enrollmentsError });
      
      if (enrollmentsError) {
        console.error('❌ StandaloneAdminDashboard: Enrollments error:', enrollmentsError);
        throw new Error(`Enrollments error: ${enrollmentsError.message}`);
      }
      
      setProfiles(profilesData || []);
      setEnrollments(enrollmentsData || []);
      
      console.log('✅ StandaloneAdminDashboard: Data fetched successfully:', { 
        profiles: profilesData?.length, 
        enrollments: enrollmentsData?.length 
      });
      
    } catch (err) {
      console.error('❌ StandaloneAdminDashboard: Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get stats
  const stats = {
    totalUsers: profiles.length,
    approvedUsers: profiles.filter(u => u.approval_status === 'approved').length,
    pendingUsers: profiles.filter(u => u.approval_status === 'pending').length,
    rejectedUsers: profiles.filter(u => u.approval_status === 'rejected').length,
    totalEnrollments: enrollments.length,
    pendingEnrollments: enrollments.filter(e => e.status === 'pending').length,
    approvedEnrollments: enrollments.filter(e => e.status === 'approved').length,
    rejectedEnrollments: enrollments.filter(e => e.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Standalone Admin Dashboard</h1>
              <p className="text-gray-600">Direct database access - no authentication</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={fetchData}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-800">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.approvedUsers}</div>
                <div className="text-sm text-gray-600">Approved Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.pendingUsers}</div>
                <div className="text-sm text-gray-600">Pending Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.rejectedUsers}</div>
                <div className="text-sm text-gray-600">Rejected Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                User Management ({stats.totalUsers})
              </button>
              <button
                onClick={() => setActiveTab('enrollments')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'enrollments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Enrollment Management ({stats.totalEnrollments})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Registered Users</h3>
                <div className="space-y-4">
                  {profiles.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {user.first_name?.[0] || user.email[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.first_name} {user.last_name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                              user.role === 'instructor' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.approval_status === 'approved' ? 'bg-green-100 text-green-800' :
                              user.approval_status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.approval_status || 'pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'enrollments' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Course Enrollments</h3>
                
                {/* Enrollment Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalEnrollments}</div>
                    <div className="text-sm text-blue-600">Total Enrollments</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.approvedEnrollments}</div>
                    <div className="text-sm text-green-600">Approved</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pendingEnrollments}</div>
                    <div className="text-sm text-yellow-600">Pending</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {enrollment.user_email[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{enrollment.course_title}</div>
                          <div className="text-sm text-gray-600">{enrollment.user_email}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                              enrollment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {enrollment.status}
                            </span>
                            <span className="text-sm text-gray-600">
                              Progress: {enrollment.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandaloneAdminDashboard;
