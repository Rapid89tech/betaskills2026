/**
 * AdminDataExample
 * 
 * Example component demonstrating how to use the AdminDataManager
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Users, BookOpen, CreditCard, BarChart3 } from 'lucide-react';
import { useAdminData, useAdminEnrollments, useAdminUsers, useAdminPayments, useAdminStats } from '@/hooks/useAdminData';

/**
 * Example using the full admin data hook
 */
export function AdminDataExample() {
  const {
    enrollments,
    users,
    payments,
    stats,
    loading,
    error,
    refresh,
    invalidateCache,
    metrics
  } = useAdminData({
    useCache: true,
    prefetch: true,
    autoRefresh: true,
    refreshInterval: 30000
  });

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-600 font-medium">Error loading admin data</p>
            <p className="text-sm text-red-500 mt-1">{error}</p>
            <Button onClick={refresh} className="mt-4">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                  <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
              <Badge variant="outline" className="mt-2">
                {stats.pendingEnrollments} pending
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <Badge variant="outline" className="mt-2">
                {stats.activeUsers} active
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">R{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-yellow-500" />
              </div>
              <Badge variant="outline" className="mt-2">
                R{stats.monthlyRevenue.toLocaleString()} this month
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Enrollment Time</p>
                  <p className="text-2xl font-bold">
                    {Math.round(stats.averageEnrollmentTime / (1000 * 60 * 60))}h
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={refresh} disabled={loading.enrollments}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading.enrollments ? 'animate-spin' : ''}`} />
          Refresh All
        </Button>
        
        <Button variant="outline" onClick={() => invalidateCache()}>
          Clear Cache
        </Button>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{(metrics.cacheHitRate * 100).toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Cache Hit Rate</p>
            </div>
            
            <div>
              <p className="text-2xl font-bold">{metrics.averageQueryTime.toFixed(0)}ms</p>
              <p className="text-sm text-muted-foreground">Avg Query Time</p>
            </div>
            
            <div>
              <p className="text-2xl font-bold">{metrics.totalQueries}</p>
              <p className="text-sm text-muted-foreground">Total Queries</p>
            </div>
            
            <div>
              <p className="text-2xl font-bold">{metrics.cacheSize}</p>
              <p className="text-sm text-muted-foreground">Cache Entries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            {loading.enrollments ? (
              <div className="text-center py-4">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">Loading enrollments...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {enrollments.slice(0, 5).map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{enrollment.user?.full_name || 'Unknown User'}</p>
                      <p className="text-sm text-muted-foreground">{enrollment.course?.title}</p>
                    </div>
                    <Badge variant={enrollment.status === 'approved' ? 'default' : 'secondary'}>
                      {enrollment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading.users ? (
              <div className="text-center py-4">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">Loading users...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Example using individual hooks for specific data types
 */
export function IndividualHooksExample() {
  const enrollments = useAdminEnrollments({
    useCache: true,
    autoRefresh: true,
    refreshInterval: 60000 // 1 minute
  });

  const users = useAdminUsers({
    useCache: true,
    autoRefresh: false
  });

  const payments = useAdminPayments({
    useCache: true,
    autoRefresh: true,
    refreshInterval: 120000 // 2 minutes
  });

  const stats = useAdminStats({
    useCache: true,
    autoRefresh: true,
    refreshInterval: 30000 // 30 seconds
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button onClick={enrollments.refresh} disabled={enrollments.loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${enrollments.loading ? 'animate-spin' : ''}`} />
          Refresh Enrollments
        </Button>
        
        <Button onClick={users.refresh} disabled={users.loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${users.loading ? 'animate-spin' : ''}`} />
          Refresh Users
        </Button>
        
        <Button onClick={payments.refresh} disabled={payments.loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${payments.loading ? 'animate-spin' : ''}`} />
          Refresh Payments
        </Button>
        
        <Button onClick={stats.refresh} disabled={stats.loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${stats.loading ? 'animate-spin' : ''}`} />
          Refresh Stats
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Enrollments ({enrollments.enrollments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {enrollments.loading ? (
              <div className="text-center py-4">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
              </div>
            ) : (
              <div className="space-y-2">
                {enrollments.enrollments.slice(0, 3).map((enrollment) => (
                  <div key={enrollment.id} className="p-2 border rounded">
                    <p className="font-medium">{enrollment.user?.full_name}</p>
                    <p className="text-sm text-muted-foreground">{enrollment.course?.title}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users ({users.users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {users.loading ? (
              <div className="text-center py-4">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
              </div>
            ) : (
              <div className="space-y-2">
                {users.users.slice(0, 3).map((user) => (
                  <div key={user.id} className="p-2 border rounded">
                    <p className="font-medium">{user.full_name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
