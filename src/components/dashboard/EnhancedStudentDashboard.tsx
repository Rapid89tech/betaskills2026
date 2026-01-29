import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, Calendar, CheckCircle, Clock, Users, Star, PieChart, Inbox, MessageCircle, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLoadingState } from '@/hooks/useLoadingState';
import { UnifiedLoadingComponent } from '@/components/loading';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useBulletproofDashboard } from '@/hooks/useBulletproofDashboard';

interface EnhancedStudentDashboardProps {
  profile: any;
  enrollments: any[];
  courses: any[];
  userId: string;
}

const EnhancedStudentDashboard: React.FC<EnhancedStudentDashboardProps> = ({
  profile,
  enrollments,
  courses,
  userId
}) => {
  const { setLoading, withLoading } = useLoadingState('student-dashboard');
  const { setLoading: setEnrollmentsLoading } = useLoadingState('dashboard-enrollments');
  const { setLoading: setStatsLoading } = useLoadingState('dashboard-stats');
  
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    recentActivities: null,
    upcomingTasks: null
  });

  // Simulate loading dashboard data
  const loadDashboardData = async () => {
    return withLoading(async () => {
      // Simulate loading different sections with individual loading states
      setStatsLoading(true, 'Loading statistics...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEnrollmentsLoading(true, 'Loading enrollments...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate data loading
      const stats = {
        totalCourses: enrollments.length,
        completedCourses: enrollments.filter(e => e.progress === 100).length,
        inProgressCourses: enrollments.filter(e => e.progress > 0 && e.progress < 100).length,
        averageProgress: enrollments.reduce((acc, e) => acc + (e.progress || 0), 0) / enrollments.length || 0
      };

      setDashboardData({
        stats,
        recentActivities: [],
        upcomingTasks: []
      });

      setStatsLoading(false);
      setEnrollmentsLoading(false);
    }, 'Loading dashboard...');
  };

  useEffect(() => {
    loadDashboardData();
  }, [enrollments]);

  const sidebarLinks = [
    { label: 'Dashboard', icon: BookOpen, to: '/dashboard' },
    { label: 'Courses', icon: BookOpen, to: '/courses' },
    { label: 'Students', icon: Users },
    { label: 'Exam', icon: Star },
    { label: 'Projects', icon: PieChart },
    { label: 'Policies', icon: Calendar },
    { label: 'My Folder', icon: Inbox },
    { label: 'Payrolls', icon: Award },
    { label: 'Reports', icon: MessageCircle },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <UnifiedLoadingComponent
      componentId="student-dashboard"
      fallbackType="skeleton"
      skeletonType="dashboard"
      skeletonVariant="student"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Beta Skill</h2>
                  <p className="text-sm text-gray-500">Learning Platform</p>
                </div>
              </div>

              <nav className="space-y-2">
                {sidebarLinks.map((link, index) => (
                  <div key={index}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        <link.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed rounded-lg">
                        <link.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {profile.first_name}!
                </h1>
                <p className="text-gray-600">
                  Continue your learning journey and track your progress
                </p>
              </motion.div>
            </div>

            {/* Stats Cards */}
            <UnifiedLoadingComponent
              componentId="dashboard-stats"
              fallbackType="spinner"
              className="mb-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {dashboardData.stats?.totalCourses || 0}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">Total Courses</h3>
                  <p className="text-sm text-gray-500">Enrolled courses</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {dashboardData.stats?.completedCourses || 0}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">Completed</h3>
                  <p className="text-sm text-gray-500">Finished courses</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {dashboardData.stats?.inProgressCourses || 0}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">In Progress</h3>
                  <p className="text-sm text-gray-500">Active learning</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.round(dashboardData.stats?.averageProgress || 0)}%
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">Avg Progress</h3>
                  <p className="text-sm text-gray-500">Overall completion</p>
                </div>
              </motion.div>
            </UnifiedLoadingComponent>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enrolled Courses */}
              <div className="lg:col-span-2">
                <UnifiedLoadingComponent
                  componentId="dashboard-enrollments"
                  fallbackType="spinner"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-sm border"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                      <Link to="/courses">
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {enrollments.slice(0, 3).map((enrollment, index) => (
                        <motion.div
                          key={enrollment.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">
                              {enrollment.course_title}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Progress value={enrollment.progress || 0} className="flex-1" />
                              <span className="text-sm text-gray-500">
                                {enrollment.progress || 0}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              Status: {enrollment.status}
                            </p>
                          </div>
                          <Link to={`/course/${enrollment.course_id}`}>
                            <Button size="sm">Continue</Button>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {enrollments.length === 0 && (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No courses yet
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Start your learning journey by enrolling in a course
                        </p>
                        <Link to="/courses">
                          <Button>Browse Courses</Button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </UnifiedLoadingComponent>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/courses">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Browse Courses
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start" disabled>
                      <Award className="h-4 w-4 mr-2" />
                      View Certificates
                    </Button>
                    <Button variant="outline" className="w-full justify-start" disabled>
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="text-center py-4">
                      <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No recent activity</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLoadingComponent>
  );
};

export default EnhancedStudentDashboard;