import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SimpleProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  approved?: boolean;
  approval_status?: string;
  contact_number?: string;
  created_at: string;
}

interface SimpleEnrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: string;
  enrolled_at: string;
  approved_at?: string;
  progress: number;
}

const SimpleDataFetch = () => {
  const [profiles, setProfiles] = useState<SimpleProfile[]>([]);
  const [enrollments, setEnrollments] = useState<SimpleEnrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 SimpleDataFetch: Starting to fetch data...');
      
      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 SimpleDataFetch: Profiles result:', { data: profilesData?.length, error: profilesError });
      
      if (profilesError) {
        throw new Error(`Profiles error: ${profilesError.message}`);
      }
      
      // Fetch enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      console.log('📊 SimpleDataFetch: Enrollments result:', { data: enrollmentsData?.length, error: enrollmentsError });
      
      if (enrollmentsError) {
        throw new Error(`Enrollments error: ${enrollmentsError.message}`);
      }
      
      setProfiles(profilesData || []);
      setEnrollments(enrollmentsData || []);
      
      console.log('✅ SimpleDataFetch: Data fetched successfully:', { 
        profiles: profilesData?.length, 
        enrollments: enrollmentsData?.length 
      });
      
    } catch (err) {
      console.error('❌ SimpleDataFetch: Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approvedUsers = profiles.filter(p => p.approval_status === 'approved').length;
  const pendingUsers = profiles.filter(p => p.approval_status === 'pending').length;
  const approvedEnrollments = enrollments.filter(e => e.status === 'approved').length;
  const pendingEnrollments = enrollments.filter(e => e.status === 'pending').length;
  const rejectedEnrollments = enrollments.filter(e => e.status === 'rejected').length;

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Simple Data Fetch (Working)</h3>
      
      {loading && (
        <div className="text-green-700">Fetching data...</div>
      )}
      
      {error && (
        <div className="text-red-700 mb-2">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {!loading && !error && (
        <div className="text-green-700 space-y-1">
          <div><strong>Profiles:</strong> {profiles.length}</div>
          <div><strong>Enrollments:</strong> {enrollments.length}</div>
          <div><strong>Approved Users:</strong> {approvedUsers}</div>
          <div><strong>Pending Users:</strong> {pendingUsers}</div>
          <div><strong>Approved Enrollments:</strong> {approvedEnrollments}</div>
          <div><strong>Pending Enrollments:</strong> {pendingEnrollments}</div>
          <div><strong>Rejected Enrollments:</strong> {rejectedEnrollments}</div>
        </div>
      )}
      
      <button 
        onClick={fetchData}
        className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default SimpleDataFetch;
