/**
 * AdminDataManager Database Queries
 * 
 * Optimized database queries for the AdminDataManager
 */

import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import type { 
  AdminEnrollment, 
  AdminUser, 
  AdminPayment, 
  AdminStats,
  QueryOptions 
} from './adminDataManager';

/**
 * Fetch enrollments with optimized joins
 */
export async function fetchEnrollmentsFromDB(options: QueryOptions): Promise<AdminEnrollment[]> {
  try {
    // Optimized query with joins
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        users:user_id (
          id,
          email,
          full_name,
          created_at,
          last_sign_in_at
        ),
        courses:course_id (
          id,
          title,
          description,
          price,
          status
        )
      `)
      .order('created_at', { ascending: false })
      .limit(1000); // Limit for performance
    
    if (error) {
      throw new Error(`Failed to fetch enrollments: ${error.message}`);
    }
    
    return data.map(enrollment => ({
      ...enrollment,
      user: enrollment.users,
      course: enrollment.courses,
      paymentStatus: determinePaymentStatus(enrollment),
      lastActivity: enrollment.updated_at || enrollment.created_at
    }));
  } catch (error) {
    logger.error('Error fetching enrollments:', error);
    throw error;
  }
}

/**
 * Fetch users with enrollment and payment stats
 */
export async function fetchUsersFromDB(options: QueryOptions): Promise<AdminUser[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        enrollments:enrollments(count),
        payments:payments(sum:amount)
      `)
      .order('created_at', { ascending: false })
      .limit(1000);
    
    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
    
    return data.map(user => ({
      ...user,
      enrollmentCount: user.enrollments?.[0]?.count || 0,
      totalSpent: user.payments?.[0]?.sum || 0,
      status: determineUserStatus(user)
    }));
  } catch (error) {
    logger.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Fetch payments with user and course information
 */
export async function fetchPaymentsFromDB(options: QueryOptions): Promise<AdminPayment[]> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        enrollments:enrollment_id (
          users:user_id(email),
          courses:course_id(title)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(1000);
    
    if (error) {
      throw new Error(`Failed to fetch payments: ${error.message}`);
    }
    
    return data.map(payment => ({
      id: payment.id,
      enrollmentId: payment.enrollment_id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      reference: payment.reference,
      createdAt: payment.created_at,
      processedAt: payment.processed_at,
      userEmail: payment.enrollments?.users?.email,
      courseTitle: payment.enrollments?.courses?.title
    }));
  } catch (error) {
    logger.error('Error fetching payments:', error);
    throw error;
  }
}

/**
 * Fetch comprehensive admin statistics
 */
export async function fetchStatsFromDB(options: QueryOptions): Promise<AdminStats> {
  try {
    // Parallel queries for better performance
    const [
      enrollmentStats,
      userStats,
      revenueStats,
      popularCourses
    ] = await Promise.all([
      getEnrollmentStats(),
      getUserStats(),
      getRevenueStats(),
      getPopularCourses()
    ]);
    
    return {
      totalEnrollments: enrollmentStats.total,
      pendingEnrollments: enrollmentStats.pending,
      completedEnrollments: enrollmentStats.completed,
      totalUsers: userStats.total,
      activeUsers: userStats.active,
      totalRevenue: revenueStats.total,
      monthlyRevenue: revenueStats.monthly,
      averageEnrollmentTime: enrollmentStats.averageTime,
      popularCourses
    };
  } catch (error) {
    logger.error('Error fetching stats:', error);
    throw error;
  }
}

/**
 * Get enrollment statistics using RPC function
 */
async function getEnrollmentStats() {
  try {
    const { data, error } = await supabase.rpc('get_enrollment_stats');
    if (error) throw error;
    return data[0] || { total: 0, pending: 0, completed: 0, averageTime: 0 };
  } catch (error) {
    // Fallback to manual query if RPC doesn't exist
    logger.warn('RPC function not available, using fallback query');
    return await getEnrollmentStatsFallback();
  }
}

/**
 * Fallback enrollment stats query
 */
async function getEnrollmentStatsFallback() {
  const { data, error } = await supabase
    .from('enrollments')
    .select('status, created_at, updated_at');
  
  if (error) throw error;
  
  const total = data.length;
  const pending = data.filter(e => e.status === 'pending').length;
  const completed = data.filter(e => e.status === 'approved').length;
  
  // Calculate average enrollment time
  const completedEnrollments = data.filter(e => e.status === 'approved' && e.updated_at);
  const averageTime = completedEnrollments.length > 0 
    ? completedEnrollments.reduce((sum, e) => {
        const time = new Date(e.updated_at).getTime() - new Date(e.created_at).getTime();
        return sum + time;
      }, 0) / completedEnrollments.length
    : 0;
  
  return { total, pending, completed, averageTime };
}

/**
 * Get user statistics using RPC function
 */
async function getUserStats() {
  try {
    const { data, error } = await supabase.rpc('get_user_stats');
    if (error) throw error;
    return data[0] || { total: 0, active: 0 };
  } catch (error) {
    // Fallback to manual query
    logger.warn('RPC function not available, using fallback query');
    return await getUserStatsFallback();
  }
}

/**
 * Fallback user stats query
 */
async function getUserStatsFallback() {
  const { data, error } = await supabase
    .from('users')
    .select('created_at, last_sign_in_at');
  
  if (error) throw error;
  
  const total = data.length;
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const active = data.filter(user => 
    user.last_sign_in_at && new Date(user.last_sign_in_at) > thirtyDaysAgo
  ).length;
  
  return { total, active };
}

/**
 * Get revenue statistics using RPC function
 */
async function getRevenueStats() {
  try {
    const { data, error } = await supabase.rpc('get_revenue_stats');
    if (error) throw error;
    return data[0] || { total: 0, monthly: 0 };
  } catch (error) {
    // Fallback to manual query
    logger.warn('RPC function not available, using fallback query');
    return await getRevenueStatsFallback();
  }
}

/**
 * Fallback revenue stats query
 */
async function getRevenueStatsFallback() {
  const { data, error } = await supabase
    .from('payments')
    .select('amount, created_at, status')
    .eq('status', 'completed');
  
  if (error) throw error;
  
  const total = data.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Calculate monthly revenue
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const monthly = data
    .filter(payment => new Date(payment.created_at) > thirtyDaysAgo)
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return { total, monthly };
}

/**
 * Get popular courses using RPC function
 */
async function getPopularCourses() {
  try {
    const { data, error } = await supabase.rpc('get_popular_courses');
    if (error) throw error;
    return data || [];
  } catch (error) {
    // Fallback to manual query
    logger.warn('RPC function not available, using fallback query');
    return await getPopularCoursesFallback();
  }
}

/**
 * Fallback popular courses query
 */
async function getPopularCoursesFallback() {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      course_id,
      courses:course_id(title)
    `);
  
  if (error) throw error;
  
  // Group by course and count
  const courseCounts = data.reduce((acc, enrollment) => {
    const courseId = enrollment.course_id;
    const title = enrollment.courses?.title || 'Unknown Course';
    
    if (!acc[courseId]) {
      acc[courseId] = { courseId, title, count: 0 };
    }
    acc[courseId].count++;
    
    return acc;
  }, {} as Record<string, { courseId: string; title: string; count: number }>);
  
  // Sort by count and return top 10
  return Object.values(courseCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

/**
 * Determine payment status from enrollment data
 */
function determinePaymentStatus(enrollment: any): 'pending' | 'completed' | 'failed' | 'refunded' {
  if (enrollment.payment_reference) {
    return 'completed';
  }
  return 'pending';
}

/**
 * Determine user status from user data
 */
function determineUserStatus(user: any): 'active' | 'inactive' | 'suspended' {
  if (user.suspended) return 'suspended';
  if (user.last_sign_in_at && new Date(user.last_sign_in_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
    return 'active';
  }
  return 'inactive';
}
