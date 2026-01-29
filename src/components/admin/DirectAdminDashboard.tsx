import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: string;
  enrolled_at: string;
}

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

const DirectAdminDashboard: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'enrollments' | 'users'>('enrollments');
  const [rlsWarning, setRlsWarning] = useState(false);
  const { toast } = useToast();

  const fetchIdRef = useRef(0);

  const getSupabaseConfig = () => {
    const supabaseUrl =
      (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
      (supabase as any)?.supabaseUrl ||
      'https://jpafcmixtchvtrkhltst.supabase.co';
    const supabaseAnonKey =
      (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
      (supabase as any)?.supabaseKey ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYWZjbWl4dGNodnRya2hsdHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzIzODYsImV4cCI6MjA2OTEwODM4Nn0.dR0-DW8_ekftD9DZjGutGuyh4kiPG338NQ367tC8Pcw';
    return { supabaseUrl, supabaseAnonKey };
  };

  const withTimeoutValue = async <T,>(promise: Promise<T>, ms: number, fallback: T): Promise<T> => {
    let timeoutId: number | undefined;
    try {
      return await Promise.race([
        promise,
        new Promise<T>((resolve) => {
          timeoutId = window.setTimeout(() => resolve(fallback), ms);
        }),
      ]);
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
    }
  };

  const refreshEnrollmentsOnly = async () => {
    const data = await fetchPostgrest<Enrollment>(
      'enrollments?select=id,user_id,user_email,course_id,course_title,status,enrolled_at&order=enrolled_at.desc&limit=100',
      15000,
      'Enrollments'
    );
    setEnrollments(data || []);
  };

  const getAuthHeaders = async () => {
    const { supabaseAnonKey } = getSupabaseConfig();

    const sessionResp = await withTimeoutValue(
      supabase.auth.getSession(),
      3000,
      { data: { session: null }, error: null } as any
    );
    const session = (sessionResp as any)?.data?.session;
    const bearer = session?.access_token || supabaseAnonKey;
    return {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${bearer}`,
    };
  };

  const withTimeout = async <T,>(promise: Promise<T>, ms: number, message: string): Promise<T> => {
    let timeoutId: number | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = window.setTimeout(() => reject(new Error(message)), ms);
    });

    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
    }
  };

  const isLikelyRls = (err: any): boolean => {
    const message = String(err?.message || '');
    const code = String(err?.code || '');
    return (
      code === 'PGRST301' ||
      code === '42501' ||
      /row level security|\brls\b|permission denied|not authorized/i.test(message) ||
      /\((401|403)\)/.test(message)
    );
  };

  const isTimeoutError = (err: any): boolean => {
    const message = typeof err === 'string' ? err : String(err?.message || err || '');
    return /timed out/i.test(message);
  };

  const pingSupabase = async () => {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4000);

    try {
      const headers: Record<string, string> = {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      };

      await fetch(`${supabaseUrl}/auth/v1/health`, {
        method: 'GET',
        headers: Object.keys(headers).length ? headers : undefined,
        signal: controller.signal,
      });
    } catch (e: any) {
      const msg = String(e?.message || e || '');
      if (/aborted|abort/i.test(msg)) {
        throw new Error(
          `Cannot reach the database (timeout). Please check your internet connection and try again. (${supabaseUrl})`
        );
      }
      if (/blocked|ERR_BLOCKED_BY_CLIENT/i.test(msg)) {
        throw new Error(
          `A browser extension appears to be blocking requests to Supabase. Please disable ad blockers/privacy extensions for ${supabaseUrl} and try again.`
        );
      }
      throw new Error(
        `Cannot reach the database. Please check your internet connection and try again. (${supabaseUrl})`
      );
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const fetchPostgrest = async <T,>(pathWithQuery: string, ms: number, label: string): Promise<T[]> => {
    const { supabaseUrl } = getSupabaseConfig();
    const headers = await getAuthHeaders();

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), ms);

    try {
      const resp = await fetch(`${supabaseUrl}/rest/v1/${pathWithQuery}`, {
        method: 'GET',
        headers: {
          ...headers,
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      if (!resp.ok) {
        let detail = '';
        try {
          const json = await resp.json();
          detail = json?.message || json?.hint || json?.details || JSON.stringify(json);
        } catch {
          try {
            detail = await resp.text();
          } catch {
            detail = '';
          }
        }
        throw new Error(`${label} request failed (${resp.status}).${detail ? ` ${detail}` : ''}`);
      }

      return (await resp.json()) as T[];
    } catch (e: any) {
      const msg = String(e?.message || e || '');
      if (/aborted|abort/i.test(msg)) {
        throw new Error(`${label} query timed out. Please check your connection and try again.`);
      }
      if (/failed to fetch|networkerror|load failed/i.test(msg)) {
        throw new Error(`${label} request failed (network). A firewall/VPN or browser extension may be blocking Supabase.`);
      }
      throw e;
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const updateEnrollmentStatus = async (enrollmentId: string, status: 'approved' | 'rejected') => {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      // Use service-role Edge Function to bypass RLS and ensure admin actions work reliably.
      const resp = await fetch(`${supabaseUrl}/functions/v1/get-admin-dashboard-data`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enrollmentId, status }),
        signal: controller.signal,
      });

      const json = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        const msg = json?.error || json?.message || `Update failed (${resp.status})`;
        throw new Error(String(msg));
      }

      if (json?.error) {
        throw new Error(String(json.error));
      }

      return json;
    } catch (e: any) {
      const msg = String(e?.message || e || '');
      if (/aborted|abort/i.test(msg)) {
        throw new Error('Update timed out. Please try again.');
      }
      throw e;
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const fetchData = async () => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setError(null);
    setRlsWarning(false);

    try {
      if (typeof navigator !== 'undefined' && navigator && navigator.onLine === false) {
        setError('You appear to be offline. Please check your internet connection and try again.');
        return;
      }

      await pingSupabase();

      console.log('🔄 Fetching admin dashboard data...');

      const enrollmentsPromise = fetchPostgrest<Enrollment>(
        'enrollments?select=id,user_id,user_email,course_id,course_title,status,enrolled_at&order=enrolled_at.desc&limit=100',
        15000,
        'Enrollments'
      );

      const profilesPromise = fetchPostgrest<Profile>(
        'profiles?select=id,email,first_name,last_name,created_at&order=created_at.desc&limit=100',
        15000,
        'Profiles'
      );

      const [enrollmentsResult, profilesResult] = await withTimeout(
        Promise.allSettled([enrollmentsPromise, profilesPromise]),
        12000,
        'Admin dashboard request timed out. This usually means Supabase is blocked by VPN/firewall/adblock, or the connection is unstable.'
      );

      if (fetchId !== fetchIdRef.current) return;

      let hadRls = false;
      let combinedError: string | null = null;

      if (enrollmentsResult.status === 'fulfilled') {
        const enrollData = enrollmentsResult.value as Enrollment[];
        console.log('✅ Enrollments fetched:', enrollData?.length || 0);
        console.log('🔍 Sample enrollment statuses:', enrollData?.slice(0, 3).map(e => ({ id: e.id, status: e.status })));
        setEnrollments(enrollData || []);
      } else {
        console.error('❌ Enrollment fetch error:', enrollmentsResult.reason);
        if (isLikelyRls(enrollmentsResult.reason)) {
          hadRls = true;
        }
        combinedError = `Enrollments: ${String(enrollmentsResult.reason?.message || enrollmentsResult.reason || 'Failed to load enrollments')}`;
      }

      if (profilesResult.status === 'fulfilled') {
        const profileData = profilesResult.value as Profile[];
        console.log('✅ Profiles fetched:', profileData?.length || 0);
        setUsers(profileData || []);
      } else {
        console.error('❌ Profile fetch error:', profilesResult.reason);
        if (isLikelyRls(profilesResult.reason)) {
          hadRls = true;
        }
        const profileMessage = String(
          profilesResult.reason?.message || profilesResult.reason || 'Failed to load profiles'
        );
        combinedError = combinedError ? `${combinedError}, Profiles: ${profileMessage}` : `Profiles: ${profileMessage}`;
      }

      if (hadRls) {
        setRlsWarning(true);
        if (!combinedError || isTimeoutError(combinedError)) {
          setError('Database access appears to be blocked by RLS policies.');
        } else {
          setError(combinedError);
        }
      } else if (combinedError) {
        if (isTimeoutError(combinedError)) {
          setError(
            'Requests to the database timed out. This usually means you cannot reach Supabase (offline, firewall/VPN, or an extension blocking requests). Please check your connection and click Refresh.'
          );
        } else {
          setError(combinedError);
        }
      }

      if (!combinedError && enrollmentsResult.status === 'fulfilled' && profilesResult.status === 'fulfilled') {
        const enrollDataLen = (enrollmentsResult.value as Enrollment[]).length;
        const profileDataLen = (profilesResult.value as Profile[]).length;
        if (enrollDataLen === 0 && profileDataLen === 0) {
          setRlsWarning(true);
        }
      }

    } catch (err: any) {
      console.error('❌ Fetch error:', err);
      if (fetchId !== fetchIdRef.current) return;
      if (isTimeoutError(err)) {
        setError(err.message || 'Request timed out. Please check your connection and try again.');
      } else {
        setError(err.message || 'Failed to load data');
      }
    } finally {
      if (fetchId === fetchIdRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const safeRefresh = () => {
      refreshEnrollmentsOnly().catch(() => {});
    };

    const onRefreshEvent = () => {
      safeRefresh();
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'admin-dashboard-refresh') {
        safeRefresh();
      }
    };

    let bc: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('admin-dashboard');
        bc.addEventListener('message', (ev: MessageEvent) => {
          const data = (ev as any)?.data;
          if (data?.type === 'refresh-enrollments') {
            safeRefresh();
          }
        });
      }
    } catch {
      bc = null;
    }

    window.addEventListener('refresh-admin-dashboard', onRefreshEvent as any);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('refresh-admin-dashboard', onRefreshEvent as any);
      window.removeEventListener('storage', onStorage);
      try {
        bc?.close();
      } catch {}
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('admin-enrollments-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'enrollments' },
        (payload: any) => {
          const eventType = String(payload?.eventType || '').toUpperCase();
          const next = payload?.new as Enrollment | undefined;
          const prev = payload?.old as Enrollment | undefined;

          if (eventType === 'INSERT' && next?.id) {
            setEnrollments((current) => {
              const filtered = current.filter((e) => e.id !== next.id);
              const merged = [next, ...filtered].sort(
                (a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime()
              );
              return merged.slice(0, 100);
            });
          } else if (eventType === 'UPDATE' && next?.id) {
            setEnrollments((current) =>
              current.map((e) => (e.id === next.id ? { ...e, ...next } : e))
            );
          } else if (eventType === 'DELETE' && prev?.id) {
            setEnrollments((current) => current.filter((e) => e.id !== prev.id));
          } else {
            refreshEnrollmentsOnly();
          }
        }
      )
      .subscribe();

    const pollId = window.setInterval(() => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        refreshEnrollmentsOnly();
      }
    }, 10000);

    return () => {
      window.clearInterval(pollId);
      supabase.removeChannel(channel);
    };
  }, []);

  const handleApprove = async (enrollmentId: string) => {
    try {
      await updateEnrollmentStatus(enrollmentId, 'approved');

      setEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? { ...e, status: 'approved' } : e)
      );

      toast({ title: 'Enrollment approved', description: 'User can now access the course.' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleReject = async (enrollmentId: string) => {
    try {
      await updateEnrollmentStatus(enrollmentId, 'rejected');

      setEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? { ...e, status: 'rejected' } : e)
      );

      toast({ title: 'Enrollment rejected', description: 'User enrollment has been rejected.' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const normalizeEnrollmentStatus = (raw: any): 'pending' | 'approved' | 'rejected' | 'other' => {
    const s = String(raw || '')
      .trim()
      .toLowerCase()
      .replace(/[_-]+/g, ' ');
    if (!s) return 'pending';
    if (s === 'approved' || /\bapproved\b/.test(s) || /\bactive\b/.test(s)) return 'approved';
    if (s === 'rejected' || /\brejected\b/.test(s) || /\bdeclined\b/.test(s)) return 'rejected';
    if (s === 'pending' || /\bpending\b/.test(s) || /\breview\b/.test(s) || /\bawaiting\b/.test(s)) return 'pending';
    return 'other';
  };

  const pendingCount = enrollments.filter((e) => normalizeEnrollmentStatus(e.status) === 'pending').length;
  const approvedCount = enrollments.filter((e) => normalizeEnrollmentStatus(e.status) === 'approved').length;
  console.log('🔍 Admin counts:', { total: enrollments.length, pending: pendingCount, approved: approvedCount });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage enrollments and users</p>
          </div>
          <Button onClick={fetchData} disabled={loading} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {/* RLS Warning */}
        {rlsWarning && (
          <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg">Database Access Issue Detected</h3>
                <p className="mt-1">The admin dashboard cannot load data due to Row Level Security (RLS) policies.</p>
                <div className="mt-3 bg-white p-3 rounded border border-yellow-300">
                  <p className="font-semibold text-sm">To fix this, run this SQL in Supabase SQL Editor:</p>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`-- Disable RLS temporarily for admin access
ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Or create admin policies:
CREATE POLICY "Admin full access enrollments" ON enrollments
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access profiles" ON profiles
  FOR ALL USING (true) WITH CHECK (true);`}
                  </pre>
                </div>
                <Button 
                  onClick={fetchData} 
                  className="mt-3 bg-yellow-600 hover:bg-yellow-700"
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry After Running SQL
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && !rlsWarning && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl md:text-3xl font-bold">{users.length}</p>
                </div>
                <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Total Enrollments</p>
                  <p className="text-2xl md:text-3xl font-bold">{enrollments.length}</p>
                </div>
                <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl md:text-3xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <RefreshCw className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enrollments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Enrollments ({enrollments.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Users ({users.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
            <p className="text-gray-600">Loading data...</p>
          </div>
        ) : activeTab === 'enrollments' ? (
          <Card>
            <CardHeader>
              <CardTitle>Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              {enrollments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No enrollments found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enrollments.map((e) => (
                        (() => {
                          const norm = normalizeEnrollmentStatus(e.status);
                          const badgeClass =
                            norm === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : norm === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : norm === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800';
                          const displayStatus = norm === 'other' ? (e.status || 'unknown') : norm;
                          const showActions = norm === 'pending';
                          return (
                        <tr key={e.id}>
                          <td className="px-4 py-3 text-sm">{e.user_email || 'N/A'}</td>
                          <td className="px-4 py-3 text-sm">{e.course_title || e.course_id}</td>
                          <td className="px-4 py-3">
                            <Badge className={badgeClass}>
                              {displayStatus}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {e.enrolled_at ? new Date(e.enrolled_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-4 py-3">
                            {showActions && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleApprove(e.id)} className="bg-green-500 hover:bg-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleReject(e.id)}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                          );
                        })()
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No users found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td className="px-4 py-3 text-sm">{u.email || 'N/A'}</td>
                          <td className="px-4 py-3 text-sm">{`${u.first_name || ''} ${u.last_name || ''}`.trim() || 'N/A'}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DirectAdminDashboard;
