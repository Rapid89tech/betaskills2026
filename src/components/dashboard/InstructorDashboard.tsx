import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users,
  BookOpen, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Download,
  DollarSign,
  Settings,
  Plus,
  Trash2,
  Bell,
  UserCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addSampleEnrollmentData, clearSampleData } from '@/utils/sampleEnrollmentData';

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  approved?: boolean;
  approval_status?: string;
}

interface InstructorDashboardProps {
  profile: Profile;
  enrollments: any[];
  courses: any[];
  userId?: string;
}

const InstructorDashboard = ({ profile, enrollments = [], courses = [], userId }: InstructorDashboardProps) => {
  const { toast } = useToast();
  const [allEnrollments, setAllEnrollments] = useState<any[]>(enrollments);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'enrollments' | 'courses' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [dashboardStats, setDashboardStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0
  });
  const [newEnrollmentCount, setNewEnrollmentCount] = useState(0);

  // Main instructor email
  const MAIN_INSTRUCTOR_EMAIL = 'rapid.rws1111@gmail.com';
  
  // Direct approval function for all pending enrollments
  const approveAllPendingEnrollments = () => {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    let approvedCount = 0;
    
    const updatedEnrollments = enrollments.map((enrollment: any) => {
      if (enrollment.status === 'pending') {
        approvedCount++;
        return {
          ...enrollment,
          status: 'approved',
          approved_at: new Date().toISOString()
        };
      }
      return enrollment;
    });
    
    localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
    setAllEnrollments(updatedEnrollments);
    
    toast({
      title: "✅ All Pending Enrollments Approved!",
      description: `Approved ${approvedCount} pending enrollments for all users`,
    });
  };
  
  // Check if current user is the main instructor
  const isMainInstructor = profile?.role === 'instructor' || profile?.email === MAIN_INSTRUCTOR_EMAIL || profile?.email === 'john.doe@gmail.com' || profile?.email === 'maxmon@gmail.com';

  // Load enrollments from localStorage on component mount
  useEffect(() => {
    // Load existing enrollments from localStorage - check ALL possible keys
    let allEnrollmentsFromStorage: any[] = [];
    
    // Check main enrollments key
    const mainEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    console.log('📊 Main enrollments key:', mainEnrollments.length);
    allEnrollmentsFromStorage.push(...mainEnrollments);
    
    // Check user-specific enrollment keys
    const allKeys = Object.keys(localStorage);
    const userEnrollmentKeys = allKeys.filter(key => key.startsWith('user-enrollments-'));
    console.log('📊 User enrollment keys found:', userEnrollmentKeys);
    
    userEnrollmentKeys.forEach(key => {
      try {
        const userEnrollments = JSON.parse(localStorage.getItem(key) || '[]');
        console.log(`📊 ${key}:`, userEnrollments.length, 'enrollments');
        allEnrollmentsFromStorage.push(...userEnrollments);
      } catch (error) {
        console.error(`Error parsing ${key}:`, error);
      }
    });
    
    // Remove duplicates based on id
    const uniqueEnrollments = allEnrollmentsFromStorage.filter((enrollment, index, self) => 
      index === self.findIndex(e => e.id === enrollment.id)
    );
    
    console.log('📊 Total unique enrollments found:', uniqueEnrollments.length);
    console.log('📊 Raw enrollments data:', uniqueEnrollments);
    
    // Normalize enrollment structure
    const normalizedEnrollments = uniqueEnrollments.map((enrollment: any) => ({
      id: enrollment.id || `enrollment_${Date.now()}_${Math.random()}`,
      user_id: enrollment.user_id || enrollment.userId,
      user_email: enrollment.user_email,
      course_id: enrollment.course_id || enrollment.courseId,
      course_title: enrollment.course_title,
      status: enrollment.status || 'pending',
      enrolled_at: enrollment.enrolled_at || enrollment.enrollment_date || new Date().toISOString(),
      progress: enrollment.progress || 0
    }));
    
    setAllEnrollments(normalizedEnrollments);
    setLoading(false);
    
    console.log('✅ Loaded enrollments:', normalizedEnrollments.length);
    console.log('✅ Normalized enrollments:', normalizedEnrollments);
  }, []); // Run only once on mount

  // Calculate basic stats from provided data
  useEffect(() => {
    console.log('📊 Calculating stats for', allEnrollments.length, 'enrollments');
    if (allEnrollments.length > 0) {
      const uniqueCourses = new Set(allEnrollments.map(e => e.course_id));
      const uniqueStudents = new Set(allEnrollments.map(e => e.user_id));
      const approvedEnrollments = allEnrollments.filter(e => e.status === 'approved');
      const pendingEnrollments = allEnrollments.filter(e => e.status === 'pending');
      
      console.log('📊 Stats breakdown:', {
        total: allEnrollments.length,
        pending: pendingEnrollments.length,
        approved: approvedEnrollments.length,
        uniqueCourses: uniqueCourses.size,
        uniqueStudents: uniqueStudents.size
      });
      
      setDashboardStats({
        totalCourses: uniqueCourses.size,
        totalStudents: uniqueStudents.size,
        totalRevenue: approvedEnrollments.length * 250,
        pendingCount: pendingEnrollments.length,
        approvedCount: approvedEnrollments.length,
        rejectedCount: allEnrollments.filter(e => e.status === 'rejected').length
      });
    } else {
      console.log('📊 No enrollments found for stats calculation');
    }
  }, [allEnrollments]);



  // Set up real-time subscription for new enrollments
  useEffect(() => {
    if (!isMainInstructor) return;

    console.log('🎧 Setting up real-time enrollment subscription...');
    
    // Listen for localStorage enrollment events (for immediate updates)
    const handleEnrollmentEvent = (event: CustomEvent) => {
      console.log('🔄 localStorage enrollment event received:', event.detail);
      
      if (event.detail.type === 'enrollment-submitted' || event.detail.type === 'manual_approval') {
        // New enrollment submitted
        const newEnrollment = event.detail.enrollmentData;
        setAllEnrollments(prev => [newEnrollment, ...prev]);
            
            // Show notification
            toast({
              title: "🎉 New Enrollment Request!",
          description: `${newEnrollment.user_email} has enrolled in ${newEnrollment.course_title}`,
        });
        
        // Update stats
        setNewEnrollmentCount(prev => prev + 1);
      }
    };

    // Listen for enrollment success events
    const handleEnrollmentSuccess = (event: CustomEvent) => {
      console.log('✅ Enrollment success event received:', event.detail);
      // Refresh enrollments to get latest data
      const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      setAllEnrollments(localEnrollments);
    };

    // Listen for manual instructor dashboard refresh
    const handleInstructorDashboardRefresh = (event: CustomEvent) => {
      console.log('🔄 Manual instructor dashboard refresh triggered:', event.detail);
      console.log('📋 Event type:', event.type);
      console.log('📋 Event detail:', event.detail);
      console.log('📋 Current allEnrollments count before update:', allEnrollments.length);
      console.log('📋 Event received at:', new Date().toISOString());
      
      const { newEnrollment } = event.detail;
      console.log('📋 New enrollment data:', newEnrollment);
      
      // Ensure the enrollment has the correct structure
      const enrollmentWithDefaults = {
        id: newEnrollment.id || `enrollment_${Date.now()}`,
        user_id: newEnrollment.user_id || newEnrollment.userId,
        user_email: newEnrollment.user_email,
        course_id: newEnrollment.course_id || newEnrollment.courseId,
        course_title: newEnrollment.course_title,
        status: newEnrollment.status || 'pending',
        enrolled_at: newEnrollment.enrolled_at || newEnrollment.enrollment_date || new Date().toISOString(),
        progress: newEnrollment.progress || 0
      };
      
      // Add the new enrollment to the top of the list immediately
      setAllEnrollments(prev => {
        console.log('📦 Previous enrollments count:', prev.length);
        // Check if enrollment already exists to avoid duplicates
        const exists = prev.find(e => e.id === enrollmentWithDefaults.id);
        if (exists) {
          console.log('📦 Enrollment already exists, updating instead');
          return prev.map(e => e.id === enrollmentWithDefaults.id ? enrollmentWithDefaults : e);
        }
        const updated = [enrollmentWithDefaults, ...prev];
        console.log('📦 Updated enrollments count:', updated.length);
        console.log('📦 New enrollment added:', enrollmentWithDefaults);
        return updated;
      });
      
      // Show notification
      toast({
        title: "🎉 New Enrollment Request!",
        description: `${enrollmentWithDefaults.user_email} has enrolled in ${enrollmentWithDefaults.course_title}`,
      });
      
      // Update stats
          setNewEnrollmentCount(prev => prev + 1);
          
      console.log('✅ Event handler completed successfully');
    };

    // Listen for Supabase enrollment save
    const handleSupabaseEnrollmentSave = (event: CustomEvent) => {
      console.log('✅ Supabase enrollment save event received:', event.detail);
      const { enrollment } = event.detail;
      
      // Add the new enrollment to the top of the list immediately
      setAllEnrollments(prev => [enrollment, ...prev]);
      
      // Show notification
          toast({
            title: "🎉 New Enrollment Request!",
        description: `${enrollment.user_email} has enrolled in ${enrollment.course_title}`,
      });
      
      // Update stats
      setNewEnrollmentCount(prev => prev + 1);
    };

    // Add event listeners for localStorage events
    window.addEventListener('enrollment-submitted', handleEnrollmentEvent as EventListener);
    window.addEventListener('enrollment-success', handleEnrollmentSuccess as EventListener);
    window.addEventListener('refresh-instructor-dashboard', handleInstructorDashboardRefresh as EventListener);
    window.addEventListener('enrollment-saved-to-supabase', handleSupabaseEnrollmentSave as EventListener);
    
    // Listen for localStorage changes (for immediate updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'enrollments') {
        console.log('🔄 localStorage enrollment change detected');
        try {
          const newEnrollments = JSON.parse(e.newValue || '[]');
          console.log('📦 New enrollments from localStorage:', newEnrollments.length);
          console.log('📦 ALL ENROLLMENTS (including pending):', newEnrollments);
          
          // Ensure all enrollments have the correct structure
          const normalizedEnrollments = newEnrollments.map((enrollment: any) => ({
            id: enrollment.id || `enrollment_${Date.now()}_${Math.random()}`,
            user_id: enrollment.user_id || enrollment.userId,
            user_email: enrollment.user_email,
            course_id: enrollment.course_id || enrollment.courseId,
            course_title: enrollment.course_title,
            status: enrollment.status || 'pending',
            enrolled_at: enrollment.enrolled_at || enrollment.enrollment_date || new Date().toISOString(),
            progress: enrollment.progress || 0
          }));
          
          setAllEnrollments(normalizedEnrollments);
          
          // Show notification for new enrollments
          const pendingCount = normalizedEnrollments.filter((e: any) => e.status === 'pending').length;
          if (pendingCount > 0) {
            toast({
              title: "🔄 Enrollments Updated",
              description: `Found ${normalizedEnrollments.length} total enrollments (${pendingCount} pending)`,
            });
          }
          } catch (error) {
          console.error('Error parsing localStorage enrollments:', error);
          }
        }
    };

    // Listen for enrollment status updates
    const handleEnrollmentStatusUpdate = (event: CustomEvent) => {
      console.log('🔄 Enrollment status update event:', event.detail);
      const { enrollmentId, status } = event.detail;
      
      setAllEnrollments(prev => 
        prev.map(enrollment => 
          enrollment.id === enrollmentId 
            ? { ...enrollment, status, approved_at: status === 'approved' ? new Date().toISOString() : null }
            : enrollment
        )
      );
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('enrollment-status-updated', handleEnrollmentStatusUpdate as EventListener);
    
    // Set up real-time subscription for new enrollments (simplified)
    console.log('🎧 Setting up real-time subscription...');
    
    try {
      const subscription = supabase
        .channel('enrollment-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'enrollments'
          },
          (payload) => {
            console.log('✅ New enrollment detected via real-time:', payload.new);
            setAllEnrollments(prev => [payload.new, ...prev]);
            
            // Show notification
            toast({
              title: "🎉 New Enrollment Request!",
              description: `${payload.new.user_email} has enrolled in ${payload.new.course_title}`,
            });
            
            // Update stats
            setNewEnrollmentCount(prev => prev + 1);
          }
        )
        .subscribe((status) => {
          console.log('🎧 Real-time subscription status:', status);
          if (status === 'SUBSCRIBED') {
            console.log('✅ Real-time subscription active for enrollments');
          } else {
            console.warn('⚠️ Real-time subscription failed:', status);
            console.log('🔄 Falling back to localStorage-only mode');
          }
        });

    return () => {
      console.log('🎧 Cleaning up real-time subscription and event listeners');
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('enrollment-submitted', handleEnrollmentEvent as EventListener);
        window.removeEventListener('enrollment-success', handleEnrollmentSuccess as EventListener);
        window.removeEventListener('refresh-instructor-dashboard', handleInstructorDashboardRefresh as EventListener);
        window.removeEventListener('enrollment-saved-to-supabase', handleSupabaseEnrollmentSave as EventListener);
      window.removeEventListener('enrollment-status-updated', handleEnrollmentStatusUpdate as EventListener);
    };
    } catch (error) {
      console.error('❌ Error setting up real-time subscription:', error);
      console.log('🔄 Continuing with localStorage-only mode');
      
      return () => {
        console.log('🎧 Cleaning up event listeners (no real-time subscription)');
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('enrollment-submitted', handleEnrollmentEvent as EventListener);
        window.removeEventListener('enrollment-success', handleEnrollmentSuccess as EventListener);
        window.removeEventListener('refresh-instructor-dashboard', handleInstructorDashboardRefresh as EventListener);
        window.removeEventListener('enrollment-saved-to-supabase', handleSupabaseEnrollmentSave as EventListener);
        window.removeEventListener('enrollment-status-updated', handleEnrollmentStatusUpdate as EventListener);
      };
    }
  }, [isMainInstructor, toast]);

  // Success notification when dashboard loads
  useEffect(() => {
    if (allEnrollments.length > 0 && !loading) {
      toast({
        title: "Dashboard Loaded Successfully",
        description: `Full instructor dashboard loaded with ${allEnrollments.length} enrollments`,
      });
    }
    
    // Log dashboard readiness
    console.log('🎯 Instructor Dashboard Status:', {
      loading,
      allEnrollmentsCount: allEnrollments.length,
      isMainInstructor,
      profileEmail: profile?.email,
      ready: !loading && isMainInstructor
    });
  }, [allEnrollments.length, loading, toast, isMainInstructor, profile]);

  // Handle enrollment approval/rejection
  const handleEnrollmentAction = async (enrollmentId: string, action: 'approve' | 'reject') => {
    try {
      console.log(`🔄 Starting enrollment ${action} for ID:`, enrollmentId);
      
      // First, update localStorage (primary storage)
      const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const enrollmentIndex = existingEnrollments.findIndex((e: any) => e.id === enrollmentId);
      
      if (enrollmentIndex !== -1) {
        existingEnrollments[enrollmentIndex].status = action === 'approve' ? 'approved' : 'rejected';
        existingEnrollments[enrollmentIndex].approved_at = action === 'approve' ? new Date().toISOString() : null;
        localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));
        
        // Update local state immediately
        setAllEnrollments(prev => prev.map(e => 
          e.id === enrollmentId 
            ? { ...e, status: action === 'approve' ? 'approved' : 'rejected', approved_at: action === 'approve' ? new Date().toISOString() : null }
            : e
        ));
        
        console.log(`✅ Enrollment ${action}ed in localStorage and local state`);
        
        // Show success message immediately
        toast({
          title: `Enrollment ${action === 'approve' ? 'Approved' : 'Rejected'}`,
          description: `The enrollment has been ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
        });
      } else {
        console.warn(`⚠️ Enrollment not found in localStorage: ${enrollmentId}`);
      }

      // Then try to update Supabase (for real-time features)
      try {
        const { error } = await supabase
          .from('enrollments')
          .update({
            status: action === 'approve' ? 'approved' : 'rejected',
            approved_at: action === 'approve' ? new Date().toISOString() : null
          })
          .eq('id', enrollmentId);

        if (error) {
          console.warn('⚠️ Supabase update failed (enrollment still updated via localStorage):', error);
        } else {
          console.log(`✅ Enrollment also ${action}ed in Supabase`);
        }
      } catch (supabaseError) {
        console.warn('⚠️ Supabase update failed (enrollment still updated via localStorage):', supabaseError);
      }

      // Show success message
      toast({
        title: `Enrollment ${action === 'approve' ? 'Approved' : 'Rejected'}`,
        description: `The enrollment has been ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      });

      // Get the course ID from the enrollment
      const enrollment = existingEnrollments[enrollmentIndex];
      const courseId = enrollment?.course_id || enrollment?.courseId;
      
      console.log('🚀 Dispatching enrollment status update event:', {
        enrollmentId,
        courseId,
        status: action === 'approve' ? 'approved' : 'rejected',
        enrollment
      });

      // Dispatch event to update UI across the app
      window.dispatchEvent(new CustomEvent('enrollment-status-updated', {
        detail: { 
          enrollmentId, 
          courseId,
          status: action === 'approve' ? 'approved' : 'rejected',
          enrollment
        }
      }));

    } catch (error) {
      console.error('Error in handleEnrollmentAction:', error);
      toast({
        title: "Error",
        description: "Failed to update enrollment status",
        variant: "destructive",
      });
    }
  };

  // Filter enrollments based on search and filters
  const filteredEnrollments = allEnrollments.filter(enrollment => {
    const matchesSearch = enrollment.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.course_title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || enrollment.course_id === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Debug: Log all enrollments with detailed status info
  console.log('🔍 All enrollments:', allEnrollments);
  console.log('🔍 Status breakdown:', {
    total: allEnrollments.length,
    pending: allEnrollments.filter(e => e.status === 'pending').length,
    approved: allEnrollments.filter(e => e.status === 'approved').length,
    rejected: allEnrollments.filter(e => e.status === 'rejected').length
  });
  console.log('🔍 Current filters:', { searchTerm, statusFilter, courseFilter });
  console.log('🔍 Filtered enrollments:', filteredEnrollments);
  console.log('🔍 Pending enrollments being filtered out?:', 
    allEnrollments.filter(e => e.status === 'pending').length - 
    filteredEnrollments.filter(e => e.status === 'pending').length
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'enrollments', label: 'Enrollments', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-red-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile?.role === 'admin' ? 'Admin Dashboard' : 'Instructor Dashboard'}</h1>
                  <p className="text-sm text-gray-500">Welcome back, {profile?.first_name || (profile?.role === 'admin' ? 'Admin' : 'Instructor')}</p>
                </div>
              </div>
              

            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live
              </Badge>
              
              {newEnrollmentCount > 0 && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  {newEnrollmentCount} New
                </Badge>
              )}
              

              
              <Button
                onClick={() => {
                  localStorage.removeItem('use-full-dashboard');
                  window.location.reload();
                }}
                variant="outline"
                size="sm"
              >
                Switch to Simple
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  data-tab-id={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Students</p>
                        <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalStudents}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Courses</p>
                        <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalCourses}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">R{dashboardStats.totalRevenue}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                        <p className="text-2xl font-bold text-gray-900">{dashboardStats.pendingCount}</p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={async () => {
                        try {
                          await addSampleEnrollmentData();
                          toast({
                            title: "Sample Data Added",
                            description: "Sample enrollment data has been added successfully",
                          });
                          // Refresh the page to show new data
                          window.location.reload();
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: "Failed to add sample data",
                            variant: "destructive",
                          });
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Sample Data
                    </Button>

                    <Button
                      onClick={async () => {
                        try {
                          await clearSampleData();
                          toast({
                            title: "Data Cleared",
                            description: "Sample data has been cleared successfully",
                          });
                          window.location.reload();
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: "Failed to clear data",
                            variant: "destructive",
                          });
                        }
                      }}
                      variant="outline"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Sample Data
                    </Button>

                    <Button
                      onClick={() => {
                        toast({
                          title: "Test Notification",
                          description: "This is a test notification from the instructor dashboard",
                        });
                      }}
                      variant="outline"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Test Notifications
                    </Button>

                    <Button
                      onClick={async () => {
                        setLoading(true);
                        try {
                          // Force refresh enrollments from both sources
                          const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                          console.log('🔄 Manual refresh - localStorage enrollments:', localEnrollments.length);
                          
                          if (isMainInstructor) {
                            try {
                              const { data, error } = await supabase
                                .from('enrollments')
                                .select('*')
                                .order('enrolled_at', { ascending: false });
                              
                              if (error) {
                                console.error('Supabase refresh error:', error);
                                setAllEnrollments(localEnrollments);
                              } else {
                                console.log('🔄 Manual refresh - Supabase enrollments:', data?.length || 0);
                                const mergedEnrollments = [...(data || []), ...localEnrollments];
                                const uniqueEnrollments = mergedEnrollments.filter((enrollment, index, self) => 
                                  index === self.findIndex(e => e.id === enrollment.id)
                                );
                                setAllEnrollments(uniqueEnrollments);
                              }
                            } catch (supabaseError) {
                              console.error('Supabase refresh error:', supabaseError);
                              setAllEnrollments(localEnrollments);
                            }
                          } else {
                            setAllEnrollments(localEnrollments);
                          }
                          
                          toast({
                            title: "Enrollments Refreshed",
                            description: `Loaded ${localEnrollments.length} enrollments from localStorage`,
                          });
                        } catch (error) {
                          console.error('Manual refresh error:', error);
                          toast({
                            title: "Refresh Error",
                            description: "Failed to refresh enrollments",
                            variant: "destructive",
                          });
                        } finally {
                          setLoading(false);
                        }
                      }}
                      variant="outline"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Enrollments
                    </Button>

                    <Button
                      onClick={() => {
                        // Create a test enrollment to verify real-time updates
                        const testEnrollment = {
                          id: `test_${Date.now()}`,
                          user_id: 'test-user',
                          user_email: 'test@example.com',
                          course_id: 'test-course',
                          course_title: 'Test Course',
                          course_category: 'Test',
                          course_level: 'Beginner',
                          course_duration: '4 weeks',
                          status: 'pending',
                          enrolled_at: new Date().toISOString(),
                          progress: 0,
                          request_type: 'manual_approval',
                          instructor_notified: false
                        };
                        
                        // Add to localStorage
                        const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                        existingEnrollments.push(testEnrollment);
                        localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));
                        
                        // Add to current state
                        setAllEnrollments(prev => [testEnrollment, ...prev]);
                        
                        // Show notification
                        toast({
                          title: "🧪 Test Enrollment Added",
                          description: "A test enrollment has been added to verify real-time updates",
                        });
                      }}
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Test Enrollment
                    </Button>

                    <Button
                      onClick={() => {
                        const localEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                        console.log('🔍 Debug Info:', {
                          allEnrollments: allEnrollments.length,
                          localStorage: localEnrollments.length,
                          loading,
                          isMainInstructor,
                          profile: profile?.email
                        });
                        
                        toast({
                          title: "🔍 Debug Info",
                          description: `Memory: ${allEnrollments.length}, localStorage: ${localEnrollments.length}, Loading: ${loading}`,
                        });
                      }}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Debug Info
                    </Button>

                    <Button
                      onClick={() => {
                        // Clear all existing enrollments and start fresh
                        localStorage.removeItem('enrollments');
                        setAllEnrollments([]);
                        
                        toast({
                          title: "🗑️ All Enrollments Cleared",
                          description: "Cleared all existing enrollments. New enrollments will appear as pending.",
                        });
                        
                        console.log('🧹 Cleared all enrollments for fresh testing');
                      }}
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All Enrollments
                    </Button>

                                          <Button
                        onClick={() => {
                          // Create test enrollments for multiple users
                          const testEnrollments = [
                            {
                              id: `test_user1_${Date.now()}`,
                              user_id: 'user-1',
                              user_email: 'user1@example.com',
                              course_id: 'ai-human-relations',
                              course_title: 'AI and Human Relations',
                              status: 'pending',
                              enrolled_at: new Date().toISOString(),
                              progress: 0
                            },
                            {
                              id: `test_user2_${Date.now()}`,
                              user_id: 'user-2',
                              user_email: 'user2@example.com',
                              course_id: 'roofing101',
                              course_title: 'Roofing',
                              status: 'pending',
                              enrolled_at: new Date().toISOString(),
                              progress: 0
                            },
                            {
                              id: `test_user3_${Date.now()}`,
                              user_id: 'user-3',
                              user_email: 'user3@example.com',
                              course_id: 'plumbing101',
                              course_title: 'Plumbing',
                              status: 'pending',
                              enrolled_at: new Date().toISOString(),
                              progress: 0
                            }
                          ];
                          
                          console.log('🧪 Creating test enrollments for multiple users:', testEnrollments);
                          
                          // Add to localStorage
                          const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                          existingEnrollments.push(...testEnrollments);
                          localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));
                          
                          // Add to current state
                          setAllEnrollments(prev => [...testEnrollments, ...prev]);
                          
                          toast({
                            title: "🧪 Test Enrollments Added",
                            description: `Added ${testEnrollments.length} test enrollments for different users`,
                          });
                        }}
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Multi-User Test
                      </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Enrollments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Recent Enrollment Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {allEnrollments.length > 0 ? (
                    <div className="space-y-4">
                      {allEnrollments.slice(0, 5).map((enrollment) => (
                        <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                              <UserCheck className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{enrollment.user_email}</p>
                              <p className="text-sm text-gray-500">{enrollment.course_title}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                enrollment.status === 'approved' ? 'default' :
                                enrollment.status === 'rejected' ? 'destructive' : 'secondary'
                              }
                            >
                              {enrollment.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(enrollment.enrolled_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No enrollments found</p>
                      <p className="text-sm text-gray-400">Add sample data to see enrollment requests</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'enrollments' && (
            <motion.div
              key="enrollments"
              data-tab="enrollments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    All Enrollments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search by email or course..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    

                  </div>

                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                      <p className="text-gray-500">Loading enrollments...</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Found {allEnrollments.length} enrollments in memory
                      </p>
                    </div>
                  ) : filteredEnrollments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredEnrollments.map((enrollment) => (
                        <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                              <UserCheck className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{enrollment.user_email}</p>
                              <p className="text-sm text-gray-500">{enrollment.course_title}</p>
                              <p className="text-xs text-gray-400">
                                Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant={
                                enrollment.status === 'approved' ? 'default' :
                                enrollment.status === 'rejected' ? 'destructive' : 'secondary'
                              }
                            >
                              {enrollment.status}
                            </Badge>
                            
                            {enrollment.status === 'pending' && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleEnrollmentAction(enrollment.id, 'approve')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEnrollmentAction(enrollment.id, 'reject')}
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No enrollments found</p>
                      <p className="text-sm text-gray-400">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'Try adjusting your search or filters' 
                          : 'Add sample data to see enrollment requests'
                        }
                      </p>
                      {/* Legacy debug button removed - using unified enrollment system */}
                      <Button
                        onClick={() => {
                          // Show ALL enrollments without any filtering
                          console.log('🔍 SHOWING ALL ENROLLMENTS:');
                          console.log('🔍 allEnrollments (unfiltered):', allEnrollments);
                          console.log('🔍 filteredEnrollments:', filteredEnrollments);
                          
                          // Temporarily set allEnrollments to show everything
                          setAllEnrollments(allEnrollments);
                          setSearchTerm('');
                          setStatusFilter('all');
                          setCourseFilter('all');
                          
                          alert(`ALL Enrollments: ${allEnrollments.length}\nFiltered: ${filteredEnrollments.length}\nUsers: ${[...new Set(allEnrollments.map(e => e.user_email))].join(', ')}`);
                        }}
                        variant="outline"
                        size="sm"
                        className="mt-4 mr-2"
                      >
                        Show ALL Enrollments
                      </Button>
                      <Button
                        onClick={() => {
                          const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                          const normalizedEnrollments = enrollments.map((enrollment: any) => ({
                            id: enrollment.id || `enrollment_${Date.now()}_${Math.random()}`,
                            user_id: enrollment.user_id || enrollment.userId,
                            user_email: enrollment.user_email,
                            course_id: enrollment.course_id || enrollment.courseId,
                            course_title: enrollment.course_title,
                            status: enrollment.status || 'pending',
                            enrolled_at: enrollment.enrolled_at || enrollment.enrollment_date || new Date().toISOString(),
                            progress: enrollment.progress || 0
                          }));
                          setAllEnrollments(normalizedEnrollments);
                          console.log('🔄 Manually refreshed enrollments:', normalizedEnrollments.length);
                        }}
                        variant="outline"
                        size="sm"
                        className="mt-4"
                      >
                        Refresh Enrollments
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Available Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Course management coming soon</p>
                    <p className="text-sm text-gray-400">This section will show all available courses</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Analytics Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Analytics coming soon</p>
                    <p className="text-sm text-gray-400">This section will show detailed analytics and reports</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InstructorDashboard;