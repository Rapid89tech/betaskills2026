import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/AuthContext';

const TestAdminDashboard: React.FC = () => {
  const { user: authUser } = useAuth();
  const [status, setStatus] = useState('Initializing...');
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        addLog('🚀 Component mounted');
        
        if (!authUser) {
          addLog('❌ No user from AuthContext');
          setError('Not authenticated');
          setStatus('Error: Not authenticated');
          return;
        }

        addLog(`✅ User from AuthContext: ${authUser.email}`);
        setStatus('Fetching enrollments...');

        // Test enrollments query
        const { data: enrollData, error: enrollError, count } = await supabase
          .from('enrollments')
          .select('*', { count: 'exact' });

        if (enrollError) {
          addLog(`❌ Enrollment error: ${enrollError.message}`);
          addLog(`   Details: ${enrollError.details}`);
          addLog(`   Hint: ${enrollError.hint}`);
          addLog(`   Code: ${enrollError.code}`);
          setError(`Enrollment error: ${enrollError.message}`);
        } else {
          addLog(`✅ Enrollments fetched: ${enrollData?.length || 0} records`);
          setEnrollmentCount(enrollData?.length || 0);
        }

        setStatus('Fetching profiles...');

        // Test profiles query
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' });

        if (profileError) {
          addLog(`❌ Profile error: ${profileError.message}`);
          addLog(`   Details: ${profileError.details}`);
          addLog(`   Hint: ${profileError.hint}`);
          addLog(`   Code: ${profileError.code}`);
          setError(`Profile error: ${profileError.message}`);
        } else {
          addLog(`✅ Profiles fetched: ${profileData?.length || 0} records`);
          setUserCount(profileData?.length || 0);
        }

        setStatus('Complete');
        addLog('✅ All queries complete');

      } catch (err: any) {
        addLog(`❌ Unexpected error: ${err.message}`);
        addLog(`   Stack: ${err.stack}`);
        setError(`Unexpected error: ${err.message}`);
        setStatus('Error');
      }
    };

    addLog('🎬 Starting testConnection...');
    testConnection().catch(err => {
      addLog(`❌ Promise rejection: ${err.message}`);
      setError(`Promise rejection: ${err.message}`);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600">Enrollments</p>
              <p className="text-3xl font-bold">{enrollmentCount}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-600">Users</p>
              <p className="text-3xl font-bold">{userCount}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAdminDashboard;
