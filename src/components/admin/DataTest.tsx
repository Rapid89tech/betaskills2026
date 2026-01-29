import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DataTest = () => {
  const [profilesCount, setProfilesCount] = useState<number | null>(null);
  const [enrollmentsCount, setEnrollmentsCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testDataAccess = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🧪 Testing data access...');
      
      // Test profiles access
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      console.log('📊 Profiles test result:', { data: profilesData?.length, error: profilesError });
      
      if (profilesError) {
        throw new Error(`Profiles error: ${profilesError.message}`);
      }
      
      // Test enrollments access
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('id')
        .limit(1);
      
      console.log('📊 Enrollments test result:', { data: enrollmentsData?.length, error: enrollmentsError });
      
      if (enrollmentsError) {
        throw new Error(`Enrollments error: ${enrollmentsError.message}`);
      }
      
      // Get actual counts
      const { count: profilesCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      const { count: enrollmentsCount } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true });
      
      setProfilesCount(profilesCount);
      setEnrollmentsCount(enrollmentsCount);
      
      console.log('✅ Data test successful:', { profilesCount, enrollmentsCount });
      
    } catch (err) {
      console.error('❌ Data test failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testDataAccess();
  }, []);

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔧 Data Access Test</h3>
      
      {loading && (
        <div className="text-yellow-700">Testing data access...</div>
      )}
      
      {error && (
        <div className="text-red-700 mb-2">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {profilesCount !== null && enrollmentsCount !== null && (
        <div className="text-green-700">
          <div><strong>Profiles:</strong> {profilesCount}</div>
          <div><strong>Enrollments:</strong> {enrollmentsCount}</div>
        </div>
      )}
      
      <button 
        onClick={testDataAccess}
        className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
      >
        Retest
      </button>
    </div>
  );
};

export default DataTest;
