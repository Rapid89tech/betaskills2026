import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Download,
  RefreshCw,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { realTimeEnrollmentSync } from '@/services/RealTimeEnrollmentSync';
import { webSocketLikeSync } from '@/services/WebSocketLikeSync';
import { crossSessionEnrollmentSync } from '@/services/CrossSessionEnrollmentSync';
import { useProgressTracking } from '@/hooks/useProgressTracking';

import { AuditLoggingService } from '@/services/AuditLoggingService';
import { supabase } from '@/integrations/supabase/client';
import { PaymentProofViewer } from '@/components/admin/PaymentProofViewer';
import WorkingEnrollmentModal from '@/components/admin/WorkingEnrollmentModal';

interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  approved_at?: string;
  progress: number;
  proof_of_payment?: string;
  payment_ref?: string;
  payment_date?: string;
  payment_type?: 'card' | 'eft' | 'manual';
  last_updated?: string;
  metadata?: any;
  user?: {
    first_name: string;
    last_name: string;
    role: string;
  };
}

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [previousEnrollmentCount, setPreviousEnrollmentCount] = useState(0);
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);
  const [isPaymentProofViewerOpen, setIsPaymentProofViewerOpen] = useState(false);
  const { toast } = useToast();

  // Get current admin user for audit logging
  useEffect(() => {
    const getCurrentAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentAdminId(user.id);
        }
      } catch (error) {
        console.error('Error getting current admin:', error);
      }
    };
    
    getCurrentAdmin();
  }, []);
  
  // Progress tracking hook
  const {
    getEnrollmentProgressBatch,
    isInitialized: progressInitialized
  } = useProgressTracking();

  // Create Supabase client with environment variables
  const createSupabaseClient = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Missing Supabase environment variables');
      throw new Error('Supabase configuration is missing');
    }
    
    return createClient(supabaseUrl, supabaseAnonKey);
  };

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      console.log('🔍 EnrollmentManagement: Starting to fetch enrollments...');
      
      const supabaseClient = createSupabaseClient();
      
      // First fetch enrollments with detailed logging
      console.log('🔍 Fetching enrollments from Supabase...');
      const { data: enrollmentsData, error: enrollmentsError } = await supabaseClient
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      console.log('📊 Raw Supabase response:', { data: enrollmentsData, error: enrollmentsError });

      if (enrollmentsError) {
        console.error('❌ EnrollmentManagement: Error fetching enrollments:', enrollmentsError);
        throw enrollmentsError;
      }

      console.log('📊 EnrollmentManagement: Raw enrollments from Supabase:', enrollmentsData);

      // Then fetch profiles for the user_ids
      const userIds = enrollmentsData?.map(e => e.user_id) || [];
      let profilesData: any[] = [];
      
      if (userIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabaseClient
          .from('profiles')
          .select('id, first_name, last_name, role')
          .in('id', userIds);

        if (profilesError) {
          console.error('❌ EnrollmentManagement: Error fetching profiles:', profilesError);
        } else {
          profilesData = profiles || [];
        }
      }

      console.log('📊 EnrollmentManagement: Profiles data:', profilesData);

      // Combine the data and detect payment types
      const combinedData = enrollmentsData?.map(enrollment => {
        const enhancedEnrollment: Enrollment = {
          ...enrollment,
          user: profilesData.find(p => p.id === enrollment.user_id) || {
            first_name: enrollment.user_email?.split('@')[0] || 'User',
            last_name: '',
            role: 'student'
          },
          // Detect payment type based on enrollment data
          payment_type: detectEnrollmentPaymentType(enrollment),
          // Add real-time update timestamp
          last_updated: new Date().toISOString(),
          // Ensure required fields are present
          status: enrollment.status as 'pending' | 'approved' | 'rejected' || 'pending'
        };

        // Auto-approve card payments if they're still pending
        if (enhancedEnrollment.payment_type === 'card' && enhancedEnrollment.status === 'pending') {
          console.log('🔄 Auto-approving card payment enrollment:', enhancedEnrollment.id);
          // Update status in background (don't wait for it)
          if (enhancedEnrollment.id) {
            handleApproveEnrollment(enhancedEnrollment.id);
          }
          enhancedEnrollment.status = 'approved'; // Optimistically update UI
        }

        return enhancedEnrollment;
      }) || [];

      const data = combinedData;

      console.log('📊 EnrollmentManagement: Enhanced data with payment types:', data);
      
      // Check if we have new enrollments and notify admin with payment type context
      if (data && data.length > previousEnrollmentCount && previousEnrollmentCount > 0) {
        const newEnrollments = data.length - previousEnrollmentCount;
        const newCardPayments = data.slice(0, newEnrollments).filter(e => e.payment_type === 'card').length;
        const newEFTPayments = data.slice(0, newEnrollments).filter(e => e.payment_type === 'eft').length;
        
        let notificationMessage = `${newEnrollments} new enrollment(s) received.`;
        if (newCardPayments > 0) {
          notificationMessage += ` ${newCardPayments} card payment(s) auto-approved!`;
        }
        if (newEFTPayments > 0) {
          notificationMessage += ` ${newEFTPayments} EFT payment(s) pending approval.`;
        }
        
        toast({
          title: "🎉 New Enrollment(s)!",
          description: notificationMessage,
        });
      }
      
      setEnrollments(data || []);
      setPreviousEnrollmentCount(data?.length || 0);
      
      // Load progress data for approved enrollments
      if (progressInitialized && data && data.length > 0) {
        const approvedEnrollments = data.filter(e => e.status === 'approved');
        if (approvedEnrollments.length > 0) {
          console.log('📊 Loading progress data for approved enrollments...');
          try {
            const progressMap = await getEnrollmentProgressBatch(approvedEnrollments);
            setEnrollments(prev => prev.map(enrollment => {
              const progress = progressMap.get(enrollment.id)?.progressPercentage;
              if (typeof progress !== 'number' || Number.isNaN(progress)) return enrollment;
              return {
                ...enrollment,
                progress: Math.max(0, Math.min(100, Math.round(progress)))
              };
            }));
          } catch (error) {
            console.error('Error loading progress data:', error);
          }
        }
      }
    } catch (error) {
      console.error('❌ EnrollmentManagement: Error fetching enrollments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch enrollments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to detect payment type from enrollment data
  const detectEnrollmentPaymentType = (enrollment: any): 'card' | 'eft' | 'manual' => {
    // Check for card payment indicators
    if (enrollment.payment_ref && 
        (enrollment.payment_ref.toLowerCase().includes('card') ||
         enrollment.payment_ref.toLowerCase().includes('ikhokha') ||
         enrollment.payment_ref.toLowerCase().includes('cc'))) {
      return 'card';
    }

    // Check for EFT payment indicators
    if (enrollment.proof_of_payment || 
        (enrollment.payment_ref && 
         (enrollment.payment_ref.toLowerCase().includes('eft') ||
          enrollment.payment_ref.toLowerCase().includes('transfer') ||
          enrollment.payment_ref.toLowerCase().includes('bank')))) {
      return 'eft';
    }

    // Check metadata for payment type hints
    if (enrollment.metadata) {
      const metadataStr = JSON.stringify(enrollment.metadata).toLowerCase();
      if (metadataStr.includes('card') || metadataStr.includes('ikhokha')) {
        return 'card';
      }
      if (metadataStr.includes('eft') || metadataStr.includes('bank')) {
        return 'eft';
      }
    }

    // Default to manual if no clear indicators
    return 'manual';
  };

  useEffect(() => {
    fetchEnrollments();
    
    // Removed auto-refresh to prevent instability - manual refresh available
    
    return () => {
      // Cleanup function - no intervals to clear
    };
  }, []);

  // Enhanced cross-session real-time synchronization
  useEffect(() => {
    console.log('🔄 EnrollmentManagement: Setting up enhanced cross-session sync');

    // Subscribe to cross-session enrollment updates
    const unsubscribeEnrollmentUpdate = crossSessionEnrollmentSync.subscribe('enrollment-update', (update: any) => {
      console.log('🔄 Cross-session enrollment update received:', update);
      
      setEnrollments(prev => {
        const existingIndex = prev.findIndex(e => e.id === update.enrollmentId);
        
        if (existingIndex >= 0) {
          // Update existing enrollment
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: update.status as 'pending' | 'approved' | 'rejected',
            payment_type: update.paymentType as 'card' | 'eft' | 'manual',
            approved_at: update.status === 'approved' ? new Date().toISOString() : updated[existingIndex].approved_at,
            last_updated: new Date().toISOString()
          };
          return updated;
        } else if (update.metadata?.enrollment) {
          // Add new enrollment from cross-session update
          const enrollmentData = update.metadata.enrollment;
          const newEnrollment: Enrollment = {
            ...enrollmentData,
            payment_type: update.paymentType as 'card' | 'eft' | 'manual',
            last_updated: new Date().toISOString(),
            status: enrollmentData.status as 'pending' | 'approved' | 'rejected' || 'pending',
            user: enrollmentData.profiles || {
              first_name: enrollmentData.user_email?.split('@')[0] || 'User',
              last_name: '',
              role: 'student'
            }
          };
          return [newEnrollment, ...prev];
        }
        return prev;
      });
    });

    // Subscribe to card payment approvals across sessions
    const unsubscribeCardPayment = crossSessionEnrollmentSync.subscribe('card-payment-approved', (update: any) => {
      console.log('💳 Cross-session card payment approval received:', update);
      
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.id === update.enrollmentId 
          ? { 
              ...enrollment, 
              status: 'approved', 
              approved_at: new Date().toISOString(),
              payment_type: 'card',
              last_updated: new Date().toISOString()
            }
          : enrollment
      ));

      toast({
        title: "💳 Card Payment Approved!",
        description: `Enrollment automatically approved across all sessions.`,
      });
    });

    // Subscribe to EFT payment submissions
    const unsubscribeEFTPayment = realTimeEnrollmentSync.subscribe('eft-payment-submitted', (update: any) => {
      console.log('🏦 EFT payment submission received:', update);
      
      setEnrollments(prev => {
        // Check if enrollment already exists
        const exists = prev.some(e => e.id === update.id);
        if (!exists) {
          const newEnrollment: Enrollment = {
            id: update.id,
            user_id: update.userId,
            course_id: update.courseId,
            status: 'pending',
            payment_type: 'eft',
            enrolled_at: update.timestamp.toISOString(),
            last_updated: new Date().toISOString(),
            progress: 0,
            user_email: 'user@example.com', // This would come from the update
            course_title: 'Course Title', // This would come from the update
            proof_of_payment: update.metadata?.proofOfPayment,
            user: {
              first_name: 'User',
              last_name: 'Name',
              role: 'student'
            }
          };
          
          toast({
            title: "🏦 New EFT Payment!",
            description: `EFT payment enrollment received and pending approval.`,
          });
          
          return [newEnrollment, ...prev];
        }
        return prev;
      });
    });

    // Subscribe to admin status changes
    const unsubscribeAdminChange = realTimeEnrollmentSync.subscribe('admin-status-change', (update: any) => {
      console.log('👨‍💼 Admin status change received:', update);
      
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.id === update.id 
          ? { 
              ...enrollment, 
              status: update.status as 'pending' | 'approved' | 'rejected',
              approved_at: update.status === 'approved' ? new Date().toISOString() : enrollment.approved_at,
              last_updated: new Date().toISOString()
            }
          : enrollment
      ));
    });

    // WebSocket-like sync integration for cross-session synchronization
    const unsubscribeWebSocketSync = webSocketLikeSync.on('enrollment_update', (data: any) => {
      console.log('🌐 WebSocket-like sync enrollment update:', data);
      
      setEnrollments(prev => {
        const existingIndex = prev.findIndex(e => e.id === data.enrollmentId);
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: data.status as 'pending' | 'approved' | 'rejected',
            payment_type: data.paymentType as 'card' | 'eft' | 'manual',
            approved_at: data.status === 'approved' ? new Date().toISOString() : updated[existingIndex].approved_at,
            last_updated: new Date().toISOString()
          };
          return updated;
        }
        return prev;
      });
    });

    const unsubscribePaymentConfirmation = webSocketLikeSync.on('payment_confirmation', (data: any) => {
      console.log('💳 WebSocket-like sync payment confirmation:', data);
      
      if (data.paymentType === 'card') {
        setEnrollments(prev => prev.map(enrollment => 
          enrollment.id === data.enrollmentId 
            ? { 
                ...enrollment, 
                status: 'approved' as const, 
                approved_at: new Date().toISOString(),
                payment_type: 'card' as const,
                last_updated: new Date().toISOString()
              }
            : enrollment
        ));

        toast({
          title: "💳 Card Payment Confirmed!",
          description: `Payment confirmed via cross-session sync.`,
        });
      }
    });

    const unsubscribeAdminAction = webSocketLikeSync.on('admin_action', (data: any) => {
      console.log('👨‍💼 WebSocket-like sync admin action:', data);
      
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.id === data.enrollmentId 
          ? { 
              ...enrollment, 
              status: data.newStatus as 'pending' | 'approved' | 'rejected',
              approved_at: data.newStatus === 'approved' ? new Date().toISOString() : enrollment.approved_at,
              last_updated: new Date().toISOString()
            }
          : enrollment
      ));
    });

    // Legacy DOM event listeners for backward compatibility
    const handleRealTimeUpdate = (event: CustomEvent) => {
      console.log('🔄 Legacy real-time update received:', event.detail);
      fetchEnrollments(); // Full refresh for legacy events
    };

    window.addEventListener('enrollment-real-time-update', handleRealTimeUpdate as EventListener);
    window.addEventListener('refresh-enrollment-management', handleRealTimeUpdate as EventListener);
    
    console.log('✅ EnrollmentManagement: Real-time sync integration complete');
    
    return () => {
      // Unsubscribe from real-time sync
      unsubscribeEnrollmentUpdate();
      unsubscribeCardPayment();
      unsubscribeEFTPayment();
      unsubscribeAdminChange();
      
      // Unsubscribe from WebSocket-like sync
      unsubscribeWebSocketSync();
      unsubscribePaymentConfirmation();
      unsubscribeAdminAction();
      
      // Remove legacy event listeners
      window.removeEventListener('enrollment-real-time-update', handleRealTimeUpdate as EventListener);
      window.removeEventListener('refresh-enrollment-management', handleRealTimeUpdate as EventListener);
    };
  }, []);

  // Listen for refresh events
  useEffect(() => {
    const handleRefresh = (event: CustomEvent) => {
      console.log('🔄 EnrollmentManagement: Received refresh event:', event.type);
      console.log('🔄 Event detail:', event.detail);
      console.log('🔄 Triggering fetchEnrollments...');
      fetchEnrollments();
    };

    // Listen for both specific and general refresh events
    window.addEventListener('refresh-enrollment-management', handleRefresh as EventListener);
    window.addEventListener('refresh-admin-dashboard', handleRefresh as EventListener);
    
    console.log('✅ EnrollmentManagement: Event listeners set up for refresh events');
    
    return () => {
      window.removeEventListener('refresh-enrollment-management', handleRefresh as EventListener);
      window.removeEventListener('refresh-admin-dashboard', handleRefresh as EventListener);
    };
  }, []);

  const handleApproveEnrollment = async (enrollmentId: string) => {
    try {
      const supabaseClient = createSupabaseClient();
      
      // Get enrollment details for audit logging
      const enrollment = enrollments.find(e => e.id === enrollmentId);
      const previousStatus = enrollment?.status;
      
      const { error } = await supabaseClient
        .from('enrollments')
        .update({ 
          status: 'approved', 
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      // Log the approval action
      if (currentAdminId && enrollment && previousStatus) {
        await AuditLoggingService.logEnrollmentApproval(currentAdminId, {
          enrollmentId,
          userId: enrollment.user_id,
          courseId: enrollment.course_id,
          previousStatus,
          newStatus: 'approved',
          paymentInfo: {
            payment_type: enrollment.payment_type,
            payment_ref: enrollment.payment_ref,
            payment_date: enrollment.payment_date
          },
          reason: 'Manual admin approval'
        });
      }

      // Broadcast cross-session update to all admin sessions
      await crossSessionEnrollmentSync.forceSyncEnrollmentStatus(enrollmentId, 'approved', 'admin-user');

      toast({
        title: 'Enrollment Approved',
        description: 'The enrollment has been approved successfully.',
      });

      // Optimistically update local state
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.id === enrollmentId 
          ? { 
              ...enrollment, 
              status: 'approved' as const, 
              approved_at: new Date().toISOString(),
              last_updated: new Date().toISOString()
            }
          : enrollment
      ));

    } catch (error) {
      console.error('Error approving enrollment:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve enrollment.',
        variant: 'destructive',
      });
      // Refresh on error to ensure consistency
      fetchEnrollments();
    }
  };

  const handleRejectEnrollment = async (enrollmentId: string, reason?: string) => {
    try {
      const supabaseClient = createSupabaseClient();
      
      // Get enrollment details for audit logging
      const enrollment = enrollments.find(e => e.id === enrollmentId);
      const previousStatus = enrollment?.status;
      
      const { error } = await supabaseClient
        .from('enrollments')
        .update({ 
          status: 'rejected', 
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      // Log the rejection action
      if (currentAdminId && enrollment && previousStatus) {
        await AuditLoggingService.logEnrollmentRejection(currentAdminId, {
          enrollmentId,
          userId: enrollment.user_id,
          courseId: enrollment.course_id,
          previousStatus,
          newStatus: 'rejected',
          reason: reason || 'Manual admin rejection'
        });
      }

      // Broadcast cross-session update to all admin sessions
      await crossSessionEnrollmentSync.forceSyncEnrollmentStatus(enrollmentId, 'rejected', 'admin-user');

      toast({
        title: 'Enrollment Rejected',
        description: 'The enrollment has been rejected.',
      });

      // Optimistically update local state
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.id === enrollmentId 
          ? { 
              ...enrollment, 
              status: 'rejected' as const, 
              approved_at: new Date().toISOString(),
              last_updated: new Date().toISOString()
            }
          : enrollment
      ));

    } catch (error) {
      console.error('Error rejecting enrollment:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject enrollment.',
        variant: 'destructive',
      });
      // Refresh on error to ensure consistency
      fetchEnrollments();
    }
  };

  // Filter enrollments with enhanced payment type filtering
  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = !searchTerm || 
      enrollment.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${enrollment.user?.first_name} ${enrollment.user?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || enrollment.course_id === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Categorize enrollments by payment type and status for enhanced display
  const categorizedEnrollments = {
    all: filteredEnrollments,
    pending: filteredEnrollments.filter(e => e.status === 'pending'),
    approved: filteredEnrollments.filter(e => e.status === 'approved'),
    rejected: filteredEnrollments.filter(e => e.status === 'rejected'),
    cardPayments: filteredEnrollments.filter(e => e.payment_type === 'card'),
    eftPayments: filteredEnrollments.filter(e => e.payment_type === 'eft'),
    cardApproved: filteredEnrollments.filter(e => e.payment_type === 'card' && e.status === 'approved'),
    eftPending: filteredEnrollments.filter(e => e.payment_type === 'eft' && e.status === 'pending')
  };

  // Get unique courses for filter
  const uniqueCourses = Array.from(new Set(enrollments.map(e => e.course_id)));

  // Get enhanced stats with payment type breakdown
  const stats = {
    total: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    approved: enrollments.filter(e => e.status === 'approved').length,
    rejected: enrollments.filter(e => e.status === 'rejected').length,
    cardPayments: enrollments.filter(e => e.payment_type === 'card').length,
    eftPayments: enrollments.filter(e => e.payment_type === 'eft').length,
    cardApproved: enrollments.filter(e => e.payment_type === 'card' && e.status === 'approved').length,
    eftPending: enrollments.filter(e => e.payment_type === 'eft' && e.status === 'pending').length,
  };

  // If no enrollments, show empty state
  if (enrollments.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Enrollment Management</h1>
            <p className="text-muted-foreground">Manage course enrollment requests and approvals</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchEnrollments} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              onClick={() => {
                console.log('🔄 Manual refresh triggered');
                fetchEnrollments();
              }} 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
            >
              🔄 Force Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards - All Zero */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Total Enrollments</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Approved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-8 w-8 text-red-500" />
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-muted-foreground">Rejected</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No Real Enrollments Yet</h3>
          <p className="text-gray-600 mb-6">
            The enrollment table is empty and ready for real user enrollments.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-blue-800 mb-4">
              <strong>To test real enrollments:</strong>
            </p>
            <ol className="text-sm text-blue-700 space-y-2 text-left max-w-md mx-auto">
              <li>1. Go to <code className="bg-blue-100 px-2 py-1 rounded">/test-enrollment</code></li>
              <li>2. Log in with a real user account</li>
              <li>3. Click "Enroll Now" on any course</li>
              <li>4. Submit the enrollment form</li>
              <li>5. Watch this dashboard for real-time updates!</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Export data
  const exportData = () => {
    if (filteredEnrollments.length === 0) {
      toast({
        title: 'No Data',
        description: 'No enrollment data to export',
        variant: 'destructive',
      });
      return;
    }

    const data = filteredEnrollments.map(enrollment => ({
      course: enrollment.course_title,
      student: `${enrollment.user?.first_name || ''} ${enrollment.user?.last_name || ''}`,
      email: enrollment.user_email,
      status: enrollment.status,
      enrolled: new Date(enrollment.enrolled_at).toLocaleDateString(),
      approved: enrollment.approved_at ? new Date(enrollment.approved_at).toLocaleDateString() : 'N/A',
      progress: `${enrollment.progress}%`
    }));

    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row || {}).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enrollments-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enrollment Management</h1>
          <p className="text-muted-foreground">Manage course enrollment requests and approvals</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchEnrollments} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Enrollments</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{stats.approved}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">{stats.rejected}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by course, student name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Courses</option>
                {uniqueCourses.map(courseId => (
                  <option key={courseId} value={courseId}>
                    {enrollments.find(e => e.course_id === courseId)?.course_title || courseId}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Enrollments List with Payment Type Categorization */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({categorizedEnrollments.all.length})</TabsTrigger>
          <TabsTrigger value="pending" className="text-yellow-700">
            Pending ({stats.pending})
            {stats.eftPending > 0 && (
              <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-1 rounded">
                {stats.eftPending} EFT
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-green-700">
            Approved ({stats.approved})
            {stats.cardApproved > 0 && (
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-1 rounded">
                {stats.cardApproved} Card
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
          <TabsTrigger value="card-payments" className="text-green-600">💳 Card ({stats.cardPayments})</TabsTrigger>
          <TabsTrigger value="eft-payments" className="text-blue-600">🏦 EFT ({stats.eftPayments})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Real-time Enrollment Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Card Payments: {stats.cardPayments} (Auto-approved)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>EFT Payments: {stats.eftPayments} (Manual approval)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Pending: {stats.pending}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span>Total: {stats.total}</span>
              </div>
            </div>
          </div>
          <EnrollmentList 
            enrollments={categorizedEnrollments.all}
            onApprove={handleApproveEnrollment}
            onReject={handleRejectEnrollment}
            onViewDetails={setSelectedEnrollment}
            onViewProof={(enrollment) => {
              setSelectedEnrollment(enrollment);
              setIsPaymentProofViewerOpen(true);
            }}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">🏦 EFT Payments Awaiting Approval</h3>
            <p className="text-sm text-yellow-700">
              These enrollments require manual approval. EFT payments are shown here for review.
              Card payments are automatically approved and appear in the Approved tab.
            </p>
          </div>
          <EnrollmentList 
            enrollments={categorizedEnrollments.pending}
            onApprove={handleApproveEnrollment}
            onReject={handleRejectEnrollment}
            onViewDetails={setSelectedEnrollment}
            onViewProof={(enrollment) => {
              setSelectedEnrollment(enrollment);
              setIsPaymentProofViewerOpen(true);
            }}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">💳 Approved Enrollments</h3>
            <p className="text-sm text-green-700">
              Card payments appear here immediately upon successful payment. 
              EFT payments appear here after manual approval.
            </p>
          </div>
          <EnrollmentList 
            enrollments={categorizedEnrollments.approved}
            onApprove={handleApproveEnrollment}
            onReject={handleRejectEnrollment}
            onViewDetails={setSelectedEnrollment}
            onViewProof={(enrollment) => {
              setSelectedEnrollment(enrollment);
              setIsPaymentProofViewerOpen(true);
            }}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <EnrollmentList 
            enrollments={categorizedEnrollments.rejected}
            onApprove={handleApproveEnrollment}
            onReject={handleRejectEnrollment}
            onViewDetails={setSelectedEnrollment}
            onViewProof={(enrollment) => {
              setSelectedEnrollment(enrollment);
              setIsPaymentProofViewerOpen(true);
            }}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="card-payments" className="space-y-4">
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">💳 Card Payment Enrollments</h3>
            <p className="text-sm text-green-700">
              All card payment enrollments are automatically approved and grant immediate course access.
              Real-time updates ensure these appear instantly upon payment confirmation.
            </p>
          </div>
          <EnrollmentList 
            enrollments={categorizedEnrollments.cardPayments}
            onApprove={handleApproveEnrollment}
            onReject={handleRejectEnrollment}
            onViewDetails={setSelectedEnrollment}
            onViewProof={(enrollment) => {
              setSelectedEnrollment(enrollment);
              setIsPaymentProofViewerOpen(true);
            }}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="eft-payments" className="space-y-4">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🏦 EFT Payment Enrollments</h3>
            <p className="text-sm text-blue-700">
              EFT payments require manual verification and approval. Students receive course access after approval.
              Use the Approve/Reject buttons to process these enrollments.
            </p>
          </div>
          <EnrollmentList 
            enrollments={categorizedEnrollments.eftPayments}
            onApprove={handleApproveEnrollment}
            onReject={handleRejectEnrollment}
            onViewDetails={setSelectedEnrollment}
            onViewProof={(enrollment) => {
              setSelectedEnrollment(enrollment);
              setIsPaymentProofViewerOpen(true);
            }}
            loading={loading}
          />
        </TabsContent>
      </Tabs>

      {/* Enrollment Details Modal */}
      <WorkingEnrollmentModal
        enrollment={selectedEnrollment}
        isOpen={!!selectedEnrollment && !isPaymentProofViewerOpen}
        onClose={() => setSelectedEnrollment(null)}
        onApprove={(id) => handleApproveEnrollment(id)}
        onReject={(id) => handleRejectEnrollment(id)}
        onViewProof={(enrollment) => {
          setSelectedEnrollment(enrollment);
          setIsPaymentProofViewerOpen(true);
        }}
      />

      {/* Payment Proof Viewer Modal */}
      <PaymentProofViewer
        enrollment={selectedEnrollment}
        isOpen={isPaymentProofViewerOpen}
        onClose={() => {
          setIsPaymentProofViewerOpen(false);
          setSelectedEnrollment(null);
        }}
        onApprove={async (id) => handleApproveEnrollment(id)}
        onReject={async (id, reason) => handleRejectEnrollment(id, reason)}
      />
    </div>
  );
};

// Enrollment List Component
const EnrollmentList = ({ 
  enrollments, 
  onApprove, 
  onReject, 
  onViewDetails, 
  onViewProof,
  loading 
}: {
  enrollments: Enrollment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (enrollment: Enrollment) => void;
  onViewProof: (enrollment: Enrollment) => void;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading enrollments...</p>
        </div>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold mb-2">No Real Enrollments Yet</h3>
        <p className="text-gray-600 mb-4">
          The enrollment table is empty and ready for real user enrollments.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            <strong>To test real enrollments:</strong>
          </p>
          <ol className="text-sm text-blue-700 mt-2 space-y-1 text-left">
            <li>1. Go to <code className="bg-blue-100 px-1 rounded">/test-enrollment</code></li>
            <li>2. Log in with a real user account</li>
            <li>3. Click "Enroll Now" on any course</li>
            <li>4. Submit the enrollment form</li>
            <li>5. Watch this dashboard for real-time updates!</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {enrollments.map((enrollment) => (
        <Card key={enrollment.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {enrollment.user?.first_name?.[0] || enrollment.user_email[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{enrollment.course_title}</div>
                    <div className="text-sm text-muted-foreground">
                      {enrollment.user?.first_name} {enrollment.user?.last_name} • {enrollment.user_email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(enrollment.enrolled_at).toLocaleDateString()}
                  </span>
                  {enrollment.approved_at && (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {new Date(enrollment.approved_at).toLocaleDateString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {enrollment.user?.role || 'Student'}
                  </span>
                  {/* Payment Type Indicator */}
                  {enrollment.payment_type && (
                    <span className="flex items-center gap-1">
                      {enrollment.payment_type === 'card' ? (
                        <>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-600 font-medium">Card Payment</span>
                        </>
                      ) : enrollment.payment_type === 'eft' ? (
                        <>
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-blue-600 font-medium">EFT Payment</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span className="text-gray-600 font-medium">Manual</span>
                        </>
                      )}
                    </span>
                  )}
                </div>
                
                {/* Progress Display for Approved Enrollments */}
                {enrollment.status === 'approved' && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Progress:</span> {enrollment.progress}%
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(enrollment.progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Payment Type Badge */}
                {enrollment.payment_type === 'card' && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    💳 Card
                  </Badge>
                )}
                {enrollment.payment_type === 'eft' && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    🏦 EFT
                  </Badge>
                )}
                <Badge 
                  variant={
                    enrollment.status === 'approved' ? 'default' :
                    enrollment.status === 'rejected' ? 'destructive' : 'secondary'
                  }
                >
                  {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                </Badge>
                {/* Real-time update indicator */}
                {enrollment.last_updated && new Date(enrollment.last_updated).getTime() > Date.now() - 10000 && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 animate-pulse">
                    🔄 Updated
                  </Badge>
                )}
              </div>
            </div>

            {/* Enhanced Payment Information Section */}
            {(enrollment.proof_of_payment || enrollment.payment_type === 'eft' || enrollment.payment_ref) && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Payment Information</span>
                  {enrollment.payment_type === 'eft' && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      🏦 EFT Payment
                    </Badge>
                  )}
                  {enrollment.payment_type === 'card' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      💳 Card Payment
                    </Badge>
                  )}
                </div>
                
                {enrollment.payment_ref && (
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Reference:</span> {enrollment.payment_ref}
                  </div>
                )}
                
                {enrollment.payment_date && (
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Payment Date:</span> {new Date(enrollment.payment_date).toLocaleDateString()}
                  </div>
                )}
                
                {enrollment.proof_of_payment && (
                  <div className="flex gap-2">
                    <a 
                      href={enrollment.proof_of_payment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                    >
                      <FileText className="h-3 w-3" />
                      View Payment Proof
                    </a>
                    <button
                      onClick={() => {
                        // This will be handled by the parent component
                        console.log('View proof clicked for enrollment:', enrollment.id);
                      }}
                      className="text-xs h-6 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded inline-flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      View Proof
                    </button>
                  </div>
                )}
                
                {enrollment.payment_type === 'eft' && enrollment.status === 'pending' && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                    <strong>⏳ Awaiting Approval:</strong> This EFT payment requires manual verification before course access is granted.
                  </div>
                )}
                
                {enrollment.payment_type === 'card' && enrollment.status === 'approved' && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-800">
                    <strong>✅ Auto-Approved:</strong> Card payment was automatically verified and approved.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Progress:</span>
                <div className="w-24">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min(enrollment.progress, 100)}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm">{enrollment.progress}%</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewDetails(enrollment)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Details
                </Button>
                {enrollment.proof_of_payment && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewProof(enrollment)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Proof
                  </Button>
                )}
                {enrollment.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => onApprove(enrollment.id)}
                      className={`${
                        enrollment.payment_type === 'eft' 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {enrollment.payment_type === 'eft' ? 'Approve EFT' : 'Approve'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onReject(enrollment.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                
                {enrollment.status === 'approved' && enrollment.payment_type === 'card' && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    ⚡ Auto-Approved
                  </Badge>
                )}
                
                {enrollment.status === 'approved' && enrollment.payment_type === 'eft' && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    ✅ EFT Approved
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Enrollment Details Modal
const EnrollmentDetailsModal = ({ 
  enrollment, 
  onClose, 
  onApprove, 
  onReject 
}: {
  enrollment: Enrollment;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const [showPaymentProof, setShowPaymentProof] = useState(false);

  return (
    <>
      {/* Main Details Modal */}
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enrollment Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">

            {/* Course Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Course Information
              </h3>
              <div className="space-y-2">
                <div><span className="font-medium">Course:</span> {enrollment.course_title}</div>
                <div><span className="font-medium">Course ID:</span> {enrollment.course_id}</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span> 
                  <Badge variant={
                    enrollment.status === 'approved' ? 'default' :
                    enrollment.status === 'rejected' ? 'destructive' : 'secondary'
                  }>
                    {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Student Information
              </h3>
              <div className="space-y-2">
                <div><span className="font-medium">Name:</span> {enrollment.user?.first_name} {enrollment.user?.last_name}</div>
                <div><span className="font-medium">Email:</span> {enrollment.user_email}</div>
                <div><span className="font-medium">Role:</span> {enrollment.user?.role || 'Student'}</div>
              </div>
            </div>

            {/* Enrollment Details */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Enrollment Details
              </h3>
              <div className="space-y-2">
                <div><span className="font-medium">Enrolled:</span> {new Date(enrollment.enrolled_at).toLocaleString()}</div>
                {enrollment.approved_at && (
                  <div><span className="font-medium">Approved:</span> {new Date(enrollment.approved_at).toLocaleString()}</div>
                )}
                <div><span className="font-medium">Progress:</span> {enrollment.progress}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(enrollment.progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Payment Information
              </h3>
              <div className="space-y-2">
                <div><span className="font-medium">Payment Type:</span> 
                  <Badge className="ml-2" variant="outline">
                    {enrollment.payment_type?.toUpperCase() || 'MANUAL'}
                  </Badge>
                </div>
                <div><span className="font-medium">Payment Reference:</span> {enrollment.payment_ref || 'N/A'}</div>
                <div><span className="font-medium">Payment Date:</span> {enrollment.payment_date || 'N/A'}</div>
                
                {enrollment.proof_of_payment && (
                  <div className="flex items-center gap-3 mt-3">
                    <span className="font-medium">Proof of Payment:</span>
                    <div className="flex gap-2">
                      <a 
                        href={enrollment.proof_of_payment} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Document
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowPaymentProof(true)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Proof
                      </Button>
                    </div>
                  </div>
                )}
                
                {!enrollment.proof_of_payment && (
                  <div className="text-sm text-gray-500 italic">No proof of payment attached</div>
                )}
              </div>
            </div>

            {/* Actions */}
            {enrollment.status === 'pending' && (
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => onApprove(enrollment.id)}
                  className="bg-green-600 hover:bg-green-700 flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Enrollment
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onReject(enrollment.id)}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Enrollment
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Proof Viewer Modal */}
      {showPaymentProof && (
        <PaymentProofViewer
          enrollment={enrollment}
          isOpen={showPaymentProof}
          onClose={() => setShowPaymentProof(false)}
          onApprove={async (id) => onApprove(id)}
          onReject={async (id, reason) => onReject(id)}
        />
      )}
    </>
  );
};

export default EnrollmentManagement;
