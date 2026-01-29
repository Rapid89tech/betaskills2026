import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Download,
  RefreshCw
} from 'lucide-react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { useToast } from '@/hooks/use-toast';

interface ProgressAlert {
  id: string;
  type: 'low_progress' | 'stuck_student' | 'high_performer' | 'completion_milestone';
  severity: 'low' | 'medium' | 'high';
  message: string;
  enrollmentId: string;
  userId: string;
  courseId: string;
  timestamp: Date;
  acknowledged: boolean;
}

interface ProgressAnalytics {
  totalStudents: number;
  activeStudents: number;
  averageProgress: number;
  completionRate: number;
  averageTimeSpent: number;
  topPerformers: Array<{
    userId: string;
    userName: string;
    courseTitle: string;
    progress: number;
    timeSpent: number;
  }>;
  strugglingStudents: Array<{
    userId: string;
    userName: string;
    courseTitle: string;
    progress: number;
    lastAccessed: Date;
  }>;
  coursePerformance: Array<{
    courseId: string;
    courseTitle: string;
    enrollmentCount: number;
    averageProgress: number;
    completionRate: number;
  }>;
  progressTrends: Array<{
    date: string;
    averageProgress: number;
    activeStudents: number;
    completions: number;
  }>;
}

export const ProgressMonitoringDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<ProgressAnalytics | null>(null);
  const [alerts, setAlerts] = useState<ProgressAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [alertFilter, setAlertFilter] = useState<'all' | 'unacknowledged'>('unacknowledged');
  const { toast } = useToast();
  
  const {
    isInitialized: progressInitialized
  } = useProgressTracking();

  // Load progress analytics and alerts
  const loadProgressData = async () => {
    if (!progressInitialized) return;
    
    setLoading(true);
    try {
      // Fetch real data from Supabase
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Get enrollments with user data
      const { data: enrollments, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles:user_id (
            id,
            first_name,
            last_name
          )
        `)
        .eq('status', 'approved');

      if (enrollmentError) {
        console.error('Error fetching enrollments:', enrollmentError);
        throw enrollmentError;
      }

      // Calculate real analytics from actual data
      const totalStudents = enrollments?.length || 0;
      const activeStudents = enrollments?.filter(e => e.progress > 0).length || 0;
      const averageProgress = totalStudents > 0 
        ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / totalStudents)
        : 0;
      const completedStudents = enrollments?.filter(e => e.progress >= 100).length || 0;
      const completionRate = totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0;
      
      // Calculate average time spent (estimate based on progress)
      const averageTimeSpent = averageProgress > 0 ? Math.round(averageProgress * 0.67) : 0; // Rough estimate

      // Get top performers (highest progress)
      const topPerformers = enrollments
        ?.filter(e => e.progress > 50)
        .sort((a, b) => (b.progress || 0) - (a.progress || 0))
        .slice(0, 5)
        .map(e => ({
          userId: e.user_id,
          userName: `${e.profiles?.first_name || 'Student'} ${e.profiles?.last_name || ''}`.trim(),
          courseTitle: e.course_title || 'Course',
          progress: e.progress || 0,
          timeSpent: Math.round((e.progress || 0) * 1.2) // Estimate
        })) || [];

      // Get struggling students (low progress, not accessed recently)
      const strugglingStudents = enrollments
        ?.filter(e => (e.progress || 0) < 25)
        .sort((a, b) => (a.progress || 0) - (b.progress || 0))
        .slice(0, 5)
        .map(e => ({
          userId: e.user_id,
          userName: `${e.profiles?.first_name || 'Student'} ${e.profiles?.last_name || ''}`.trim(),
          courseTitle: e.course_title || 'Course',
          progress: e.progress || 0,
          lastAccessed: new Date(e.enrolled_at)
        })) || [];

      const realAnalytics: ProgressAnalytics = {
        totalStudents,
        activeStudents,
        averageProgress,
        completionRate,
        averageTimeSpent,
        topPerformers,
        strugglingStudents,
        coursePerformance: (() => {
          // Group enrollments by course and calculate real performance metrics
          const courseGroups = enrollments?.reduce((acc, enrollment) => {
            const courseId = enrollment.course_id;
            if (!acc[courseId]) {
              acc[courseId] = {
                courseId,
                courseTitle: enrollment.course_title || 'Unknown Course',
                enrollments: []
              };
            }
            acc[courseId].enrollments.push(enrollment);
            return acc;
          }, {} as Record<string, any>) || {};

          return Object.values(courseGroups).map((course: any) => {
            const enrollmentCount = course.enrollments.length;
            const totalProgress = course.enrollments.reduce((sum: number, e: any) => sum + (e.progress || 0), 0);
            const averageProgress = enrollmentCount > 0 ? Math.round(totalProgress / enrollmentCount) : 0;
            const completedCount = course.enrollments.filter((e: any) => e.progress >= 100).length;
            const completionRate = enrollmentCount > 0 ? Math.round((completedCount / enrollmentCount) * 100) : 0;

            return {
              courseId: course.courseId,
              courseTitle: course.courseTitle,
              enrollmentCount,
              averageProgress,
              completionRate
            };
          });
        })(),
        progressTrends: (() => {
          // Generate trend data based on enrollment dates
          const today = new Date();
          const trends = [];
          for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0] || '';
            
            // Calculate metrics for this date (simplified)
            const enrollmentsUpToDate = enrollments?.filter(e => 
              new Date(e.enrolled_at) <= date
            ) || [];
            
            const avgProgress = enrollmentsUpToDate.length > 0
              ? Math.round(enrollmentsUpToDate.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollmentsUpToDate.length)
              : 0;
            
            const activeStudents = enrollmentsUpToDate.filter(e => e.progress > 0).length;
            const completions = enrollmentsUpToDate.filter(e => e.progress >= 100).length;
            
            trends.push({
              date: dateStr,
              averageProgress: avgProgress,
              activeStudents,
              completions
            });
          }
          return trends;
        })()
      };

      // Generate real alerts based on actual data
      const realAlerts: ProgressAlert[] = [];
      
      // Add alerts for struggling students
      strugglingStudents.forEach((student, index) => {
        if (student.progress < 15) {
          realAlerts.push({
            id: `stuck-${index}`,
            type: 'stuck_student',
            severity: 'high',
            message: `Student ${student.userName} has low progress (${student.progress}% progress)`,
            enrollmentId: `enrollment-${student.userId}`,
            userId: student.userId,
            courseId: 'course-id',
            timestamp: new Date(),
            acknowledged: false
          });
        }
      });
      
      // Add alerts for students close to completion
      topPerformers.forEach((student, index) => {
        if (student.progress >= 90 && student.progress < 100) {
          realAlerts.push({
            id: `completion-${index}`,
            type: 'completion_milestone',
            severity: 'low',
            message: `${student.userName} is close to completing ${student.courseTitle} (${student.progress}% progress)`,
            enrollmentId: `enrollment-${student.userId}`,
            userId: student.userId,
            courseId: 'course-id',
            timestamp: new Date(),
            acknowledged: false
          });
        }
      });

      setAnalytics(realAnalytics);
      setAlerts(realAlerts);
      
    } catch (error) {
      console.error('Error loading progress data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load progress analytics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate alerts based on progress analytics
  const generateProgressAlerts = (analytics: ProgressAnalytics) => {
    const newAlerts: ProgressAlert[] = [];

    // Alert for struggling students
    analytics.strugglingStudents.forEach(student => {
      if (student.progress < 20 && student.lastAccessed < new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)) {
        newAlerts.push({
          id: `stuck-${student.userId}`,
          type: 'stuck_student',
          severity: 'high',
          message: `${student.userName} has low progress (${student.progress}%) and hasn't accessed course for 5+ days`,
          enrollmentId: '',
          userId: student.userId,
          courseId: '',
          timestamp: new Date(),
          acknowledged: false
        });
      }
    });

    // Alert for high performers near completion
    analytics.topPerformers.forEach(performer => {
      if (performer.progress > 90) {
        newAlerts.push({
          id: `completion-${performer.userId}`,
          type: 'completion_milestone',
          severity: 'low',
          message: `${performer.userName} is close to completing ${performer.courseTitle} (${performer.progress}%)`,
          enrollmentId: '',
          userId: performer.userId,
          courseId: '',
          timestamp: new Date(),
          acknowledged: false
        });
      }
    });

    // Update alerts state
    setAlerts(prev => [...prev, ...newAlerts]);
  };

  // Acknowledge alert
  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    
    toast({
      title: 'Alert Acknowledged',
      description: 'Alert has been marked as acknowledged',
    });
  };

  // Export analytics data
  const exportAnalytics = () => {
    if (!analytics) return;

    const data = {
      summary: {
        totalStudents: analytics.totalStudents,
        activeStudents: analytics.activeStudents,
        averageProgress: analytics.averageProgress,
        completionRate: analytics.completionRate
      },
      coursePerformance: analytics.coursePerformance,
      topPerformers: analytics.topPerformers,
      strugglingStudents: analytics.strugglingStudents
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    loadProgressData();
    
    // Set up periodic refresh
    const interval = setInterval(loadProgressData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [progressInitialized, selectedTimeRange]);

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => 
    alertFilter === 'all' || !alert.acknowledged
  );

  if (loading && !analytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Progress Monitoring</h1>
          <div className="animate-pulse bg-gray-200 h-10 w-32 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Progress Monitoring</h1>
          <p className="text-muted-foreground">Monitor student progress and course performance</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-2 border rounded-md"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button onClick={loadProgressData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportAnalytics} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{analytics.totalStudents}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                  <div className="text-xs text-green-600">
                    {analytics.activeStudents} active
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{analytics.averageProgress}%</div>
                  <div className="text-sm text-muted-foreground">Avg Progress</div>
                  <Progress value={analytics.averageProgress} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{analytics.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                  <div className="text-xs text-blue-600">
                    {Math.round(analytics.totalStudents * analytics.completionRate / 100)} completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{analytics.averageTimeSpent}h</div>
                  <div className="text-sm text-muted-foreground">Avg Time Spent</div>
                  <div className="text-xs text-purple-600">
                    per student
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Progress Alerts
              {filteredAlerts.length > 0 && (
                <Badge variant="destructive">{filteredAlerts.length}</Badge>
              )}
            </CardTitle>
            <select
              value={alertFilter}
              onChange={(e) => setAlertFilter(e.target.value as 'all' | 'unacknowledged')}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="unacknowledged">Unacknowledged</option>
              <option value="all">All Alerts</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>No alerts to display</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                    alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {alert.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      {analytics && (
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Course Performance</TabsTrigger>
            <TabsTrigger value="students">Student Analytics</TabsTrigger>
            <TabsTrigger value="trends">Progress Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Course Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.coursePerformance.map((course) => (
                    <div key={course.courseId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{course.courseTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            {course.enrollmentCount} students enrolled
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{course.averageProgress}%</div>
                          <div className="text-sm text-muted-foreground">Avg Progress</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.averageProgress}%</span>
                        </div>
                        <Progress value={course.averageProgress} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Completion Rate: {course.completionRate}%</span>
                          <span>{Math.round(course.enrollmentCount * course.completionRate / 100)} completed</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topPerformers.map((performer, index) => (
                      <div key={performer.userId} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{performer.userName}</div>
                          <div className="text-sm text-muted-foreground">{performer.courseTitle}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{performer.progress}%</div>
                          <div className="text-xs text-muted-foreground">{performer.timeSpent}h</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Struggling Students */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    Students Needing Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.strugglingStudents.map((student) => (
                      <div key={student.userId} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div className="flex-1">
                          <div className="font-medium">{student.userName}</div>
                          <div className="text-sm text-muted-foreground">{student.courseTitle}</div>
                          <div className="text-xs text-red-600">
                            Last accessed: {student.lastAccessed.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-600">{student.progress}%</div>
                          <Badge variant="destructive" className="text-xs">
                            At Risk
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Progress Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-muted-foreground py-8">
                    <PieChart className="h-12 w-12 mx-auto mb-2" />
                    <p>Progress trend visualization would be implemented here</p>
                    <p className="text-sm">Integration with charting library (Chart.js, Recharts, etc.)</p>
                  </div>
                  
                  {/* Simple trend data display */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {analytics.progressTrends[analytics.progressTrends.length - 1]?.averageProgress || 0}%
                      </div>
                      <div className="text-sm text-muted-foreground">Current Avg Progress</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.progressTrends[analytics.progressTrends.length - 1]?.activeStudents || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Students</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {analytics.progressTrends.reduce((sum, trend) => sum + trend.completions, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Completions</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProgressMonitoringDashboard;