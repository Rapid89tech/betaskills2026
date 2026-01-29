import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, Calendar, CheckCircle, Clock, Inbox, MessageCircle, PieChart, Settings, Star, Users, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useStableProgress } from '@/hooks/useStableProgress';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useBulletproofDashboard } from '@/hooks/useBulletproofDashboard';
import { filterRealEnrollments } from '@/utils/clearFakeData';
import globalDataRecovery from '@/utils/globalDataRecovery';
import EnrolledCoursesList from './EnrolledCoursesList';
import RecentActivities from './RecentActivities';
import DashboardEnrollmentLoader from './DashboardEnrollmentLoader';

// Helper for animated confetti
// REMOVE Confetti component definition and all references to <Confetti />

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

const mockInbox = [
  { name: 'Michael Wong', message: 'Don’t forget to work on assignment page 36 in...', time: '09:32', file: 'Exam-Science.xls' },
  { name: 'Cindy Chen', message: 'Have you made history assignments?', time: '11:32', file: 'Algebra.pdf' },
];

const mockFriends = [
  { name: 'Francis Tran', status: 'Health is not good.', time: '05 Minutes Ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Elliana Palacios', status: 'Health is not good.', time: '23 Minutes Ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Katherine Webster', status: 'Going on trip with my fam...', time: '10 Minutes Ago', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Avalon Carey', status: 'Going on trip with my fam...', time: '10 Minutes Ago', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
];

const mockTasks = [
  { title: 'Discussion Algorithm', time: '08:00 AM - 12:00 PM', icon: 'A', color: 'bg-orange-100 text-orange-600' },
  { title: 'Fundamental Math', time: '12:00 PM - 15:00 PM', icon: 'M', color: 'bg-yellow-100 text-yellow-600' },
  { title: 'DNA Modifications in Humans', time: 'Ongoing', icon: 'H', color: 'bg-blue-100 text-blue-600' },
];

const StudentDashboard = ({ profile, enrollments = [], courses = [], userId }: any) => {
  const location = useLocation();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    imageUrl: profile?.imageUrl || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  // Use bulletproof dashboard hook for real user-specific data
  const {
    dashboardData,
    enrichedCourses,
    recentActivities,
    dashboardStats,
    loading: dashboardLoading,
    error: dashboardError,
    isInitialized,
    updateCourseProgress,
    addActivity,
    updatePreferences,
  } = useBulletproofDashboard();
  
  // Use real enrollments hook to get latest data
  const { enrollments: enrollmentsFromHook, isEnrolled } = useEnrollments();
  
  // Debug logging to see what data we have
  React.useEffect(() => {
    console.log('📊 Bulletproof Dashboard Data:', {
      isInitialized,
      dashboardData: !!dashboardData,
      enrichedCourses: enrichedCourses?.length || 0,
      recentActivities: recentActivities?.length || 0,
      dashboardStats,
      userId,
      profile: profile?.email
    });
  }, [isInitialized, dashboardData, enrichedCourses, recentActivities, dashboardStats, userId, profile]);

  // Listen for enrollment status updates to refresh data
  React.useEffect(() => {
    const handleEnrollmentStatusUpdate = (event: CustomEvent) => {
      console.log('🔄 Enrollment status update received in student dashboard:', event.detail);
      // Force refresh of enrollment data
      window.location.reload();
    };

    window.addEventListener('enrollment-status-updated', handleEnrollmentStatusUpdate as EventListener);
    
    return () => {
      window.removeEventListener('enrollment-status-updated', handleEnrollmentStatusUpdate as EventListener);
    };
  }, []);
  
  // Use ONLY real enrollments from the database - filter out any fake data
  const userEnrollments = filterRealEnrollments(enrollmentsFromHook || []);

  // Get actual student name with better fallbacks
  const studentName = React.useMemo(() => {
    // Use bulletproof data if available
    if (dashboardData?.profile?.first_name && dashboardData?.profile?.last_name) {
      return `${dashboardData.profile.first_name} ${dashboardData.profile.last_name}`;
    }
    if (dashboardData?.profile?.first_name) {
      return dashboardData.profile.first_name;
    }
    
    // Fallback to profile data
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (profile?.email) {
      const emailName = profile.email.split('@')[0];
      // Capitalize first letter and replace dots/underscores with spaces
      return emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._]/g, ' ');
    }
    return 'Student';
  }, [dashboardData, profile]);

  // Map ONLY real enrollments to course progress and completion
  const enrolledCourses = userEnrollments.map((enrollment: any) => {
    const course = courses.find((c: any) => c.id === enrollment.course_id || c.id === enrollment.id);
    const progress = Math.round((enrollment.progress || 0)); // Already in percentage
    return {
      id: course?.id || enrollment.course_id || enrollment.id,
      title: course?.title || enrollment.course_title || enrollment.title || 'Untitled Course',
      progress: progress,
      completed: progress >= 100,
      certificateUrl: enrollment.certificate_url || enrollment.certificateUrl || '#',
      status: enrollment.status,
      enrolled_at: enrollment.enrolled_at,
      last_accessed: enrollment.last_accessed,
      timeSpent: enrollment.timeSpent || 0,
    };
  });

  // Calculate overall progress based on real enrollments only
  const overallProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;

  // Use ONLY real activities from bulletproof system - no mock activities
  const activities = recentActivities || [];

  // Generate goals based on REAL enrolled courses only
  const goals = enrolledCourses.map((course, i) => ({
    goal: `Complete ${Math.min(3 + i, 5)} lessons in ${course.title}`,
    status: course.progress < 100 ? 'In Progress' : 'Completed',
    progress: course.progress
  }));

  // Generate upcoming tasks based on REAL enrolled courses only
  const upcomingTasks = enrolledCourses.slice(0, 3).map((course, i) => {
    const taskTypes = ['Assignment', 'Quiz', 'Project'];
    const colors = ['bg-orange-100 text-orange-600', 'bg-yellow-100 text-yellow-600', 'bg-blue-100 text-blue-600'];
    const icons = ['A', 'Q', 'P'];
    const times = ['09:00 AM - 11:00 AM', '02:00 PM - 04:00 PM', 'Ongoing'];
    
    return {
      title: `${taskTypes[i % 3]} - ${course.title}`,
      time: times[i % 3],
      icon: icons[i % 3],
      color: colors[i % 3]
    };
  });

  // Save profile changes to Supabase and bulletproof system
  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editProfile.first_name,
          last_name: editProfile.last_name,
          imageUrl: editProfile.imageUrl,
        })
        .eq('id', userId);

      if (error) throw error;

      // Update in bulletproof system
      if (dashboardData) {
        await updatePreferences({
          lastDashboardView: 'profile_updated',
        });
      }

      setShowProfileModal(false);
    } catch (e) {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };



  // Animation variants
  const fadeSlideIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    exit: { opacity: 0, y: 40, transition: { duration: 0.4, ease: 'easeIn' } },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  return (
    <motion.div
      className="flex min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeSlideIn}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4 animate-slide-in-left">
        {/* Profile section */}
        <div
          className="flex items-center gap-3 mb-6 cursor-pointer hover:bg-red-50 rounded-lg p-2 transition"
          onClick={() => setShowProfileModal(true)}
        >
          {profile?.imageUrl ? (
            <img src={profile.imageUrl} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-red-600" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-white font-bold text-xl">
              {profile?.first_name ? profile.first_name[0].toUpperCase() : 'S'}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-wide text-red-700">{studentName}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit Profile</span>
          </div>
        </div>

        {/* Data Recovery Button */}
        <Button
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white text-sm"
          onClick={async () => {
            if (profile?.email) {
              console.log('🔄 Manual data recovery triggered...');
              const wasRecovered = await globalDataRecovery.forceRecovery(profile.email);
              if (wasRecovered) {
                alert('✅ Data recovered successfully! Page will reload...');
                setTimeout(() => window.location.reload(), 1000);
              } else {
                alert('❌ No data to recover or recovery failed');
              }
            }
          }}
        >
          🔄 Recover Data
        </Button>

        
        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fade-in-up">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setShowProfileModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4 text-red-700">Edit Profile</h2>
              <div className="flex flex-col items-center gap-4 mb-4">
                {editProfile.imageUrl ? (
                  <img src={editProfile.imageUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-red-600" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-white font-bold text-3xl">
                    {editProfile.first_name ? editProfile.first_name[0].toUpperCase() : 'S'}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editProfile.imageUrl}
                  onChange={e => setEditProfile({ ...editProfile, imageUrl: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editProfile.first_name}
                  onChange={e => setEditProfile({ ...editProfile, first_name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editProfile.last_name}
                  onChange={e => setEditProfile({ ...editProfile, last_name: e.target.value })}
                />
              </div>
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <Button className="w-full bg-purple-600 text-white font-bold" onClick={handleSaveProfile} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        )}
        <nav className="flex-1 space-y-2">
          {sidebarLinks.map(link => (
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium text-gray-700 hover:bg-purple-50 ${location.pathname === link.to ? 'bg-purple-100 text-purple-700 font-bold' : ''}`}
              >
                <link.icon className="h-5 w-5 text-purple-400" />
                <span>{link.label}</span>
              </Link>
            ) : (
              <div key={link.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed opacity-60">
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </div>
            )
          ))}
        </nav>
        <div className="mt-10 text-xs text-gray-400">Settings</div>
      </aside>

      {/* Main Content */}
      <motion.main
        className="flex-1 p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeSlideIn}
      >
        {/* Welcome Card with Real User Data */}
        <motion.div
          className="relative rounded-2xl p-8 mb-8 overflow-hidden shadow-lg"
          style={{ backgroundImage: `url(/images/generation-f4a1277d-3867-48ad-9ca4-d8d9965d2670.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-black/90 z-0" />
          <div className="relative z-10">
            <h2 className="text-white text-2xl font-bold mb-2">WELCOME BACK! {studentName}</h2>
            
                         {/* Real User Statistics */}
             {dashboardLoading ? (
               <div className="text-white/80 text-sm">Loading your data...</div>
             ) : (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                 <div className="text-center">
                   <div className="text-white text-2xl font-bold">{enrolledCourses.length}</div>
                   <div className="text-white/80 text-xs">Enrolled Courses</div>
                 </div>
                 <div className="text-center">
                   <div className="text-white text-2xl font-bold">{enrolledCourses.filter(c => c.completed).length}</div>
                   <div className="text-white/80 text-xs">Completed</div>
                 </div>
                 <div className="text-center">
                   <div className="text-white text-2xl font-bold">{overallProgress}%</div>
                   <div className="text-white/80 text-xs">Avg Progress</div>
                 </div>
                 <div className="text-center">
                   <div className="text-white text-2xl font-bold">{activities.length}</div>
                   <div className="text-white/80 text-xs">Activities</div>
                 </div>
               </div>
             )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses & Progress */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <DashboardEnrollmentLoader courses={courses} />
            
            {/* Goals for the Week */}
            <div>
              <h3 className="font-bold text-lg mb-4">Goals for the Week</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goals.length === 0 && (
                  <div className="col-span-full text-center py-6 text-gray-500 bg-white rounded-xl shadow">
                    <Star className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p>No goals set yet.</p>
                  </div>
                )}
                {goals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="flex-shrink-0">
                      <span className={`w-3 h-3 rounded-full ${goal.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-700 truncate">{goal.goal}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{goal.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activities & Upcoming Tasks */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            {/* Recent Activities now handled by DashboardEnrollmentLoader */}

            {/* Upcoming Tasks */}
            <div>
              <h3 className="font-bold text-lg mb-4">Upcoming Tasks</h3>
              <div className="space-y-3">
                {upcomingTasks.length === 0 && (
                  <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow">
                    <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p>No upcoming tasks.</p>
                  </div>
                )}
                {upcomingTasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${task.color}`}>{task.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">{task.title}</div>
                      <div className="text-xs text-gray-500">{task.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          
        </div>
      </motion.main>
    </motion.div>
  );
};

export default StudentDashboard;
