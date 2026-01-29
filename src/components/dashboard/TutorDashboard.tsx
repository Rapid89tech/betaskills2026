import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  proof_of_payment: string;
  payment_ref: string;
  payment_date: string;
  enrolled_at: string;
  status: string;
}

export default function TutorDashboard() {
  const [pendingEnrollments, setPendingEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchPending() {
    setLoading(true);
    setError('');
    try {
      // Try Supabase first
      const { data: pendingEnrollments, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('status', 'pending')
        .order('enrolled_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching enrollments from Supabase:', error);
        // Fallback to localStorage
        const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const pendingLocalEnrollments = localEnrollments.filter(e => e.status === 'pending');
        setPendingEnrollments(pendingLocalEnrollments);
        setError(`Using localStorage fallback. Supabase error: ${error.message}`);
      } else {
        setPendingEnrollments(pendingEnrollments || []);
      }
    } catch (e: any) {
      console.error('Error in fetchPending:', e);
      // Final fallback to localStorage
      const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const pendingLocalEnrollments = localEnrollments.filter(e => e.status === 'pending');
      setPendingEnrollments(pendingLocalEnrollments);
      setError(`Using localStorage fallback. Error: ${e.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPending();
    
    // Refresh every 10 seconds
    const interval = setInterval(() => {
      fetchPending();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function handleApprove(id: string) {
    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('enrollments')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Error approving enrollment in Supabase:', error);
        // Fallback to localStorage
        const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const updatedEnrollments = allEnrollments.map(e => 
          e.id === id 
            ? { ...e, status: 'approved', approved_at: new Date().toISOString() }
            : e
        );
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
      }
      
      fetchPending(); // Refresh the list
    } catch (e: any) {
      console.error('Error approving enrollment:', e);
      setError(`Error approving enrollment: ${e.message}`);
    }
  }

  async function handleReject(id: string) {
    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('enrollments')
        .update({ 
          status: 'rejected',
          rejected_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Error rejecting enrollment in Supabase:', error);
        // Fallback to localStorage
        const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        const updatedEnrollments = allEnrollments.map(e => 
          e.id === id 
            ? { ...e, status: 'rejected', rejected_at: new Date().toISOString() }
            : e
        );
        localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
      }
      
      fetchPending(); // Refresh the list
    } catch (e: any) {
      console.error('Error rejecting enrollment:', e);
      setError(`Error rejecting enrollment: ${e.message}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage pending course enrollments</p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading pending enrollments...</p>
          </div>
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}

        {pendingEnrollments.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Enrollments</h3>
              <p className="text-gray-500">All enrollment requests have been processed.</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {pendingEnrollments.map(enrollment => (
            <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{enrollment.course_title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{enrollment.user_email}</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Pending Approval
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Payment Reference</p>
                    <p className="text-sm text-gray-900">{enrollment.payment_ref || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Payment Date</p>
                    <p className="text-sm text-gray-900">{enrollment.payment_date || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Enrolled At</p>
                    <p className="text-sm text-gray-900">
                      {new Date(enrollment.enrolled_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Proof of Payment</p>
                    <p className="text-sm text-gray-900">{enrollment.proof_of_payment}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleApprove(enrollment.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Approve Enrollment
                  </Button>
                  <Button 
                    onClick={() => handleReject(enrollment.id)}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Reject Enrollment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 