import React, { lazy, ComponentType } from 'react';
import { performanceManager } from './PerformanceManager';

/**
 * Utility for creating lazy-loaded components with better error handling,
 * loading states, and performance tracking for heavy components
 */
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  chunkName?: string
): T => {
  return performanceManager.createLazyComponent(importFn, chunkName || 'unknown-component') as T;
};

/**
 * Enhanced lazy component creator with preloading support
 */
export const createPreloadableLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string,
  shouldPreload: boolean = false
): T => {
  const lazyComponent = performanceManager.createLazyComponent(importFn, componentName);
  
  // Add to critical components if should preload
  if (shouldPreload) {
    performanceManager.addCriticalComponent(componentName);
  }
  
  return lazyComponent as T;
};

// Heavy admin components - lazy loaded with performance tracking
export const LazyAdminDashboard = createPreloadableLazyComponent(
  () => import(/* webpackChunkName: "admin-heavy" */ '../components/admin/AdminDashboard'),
  'AdminDashboard',
  true // Preload as it's critical for admin users
);

export const LazyEnrollmentManagement = createPreloadableLazyComponent(
  () => import(/* webpackChunkName: "admin-heavy" */ '../components/admin/EnrollmentManagement'),
  'EnrollmentManagement',
  true // Preload as it's critical for admin users
);

export const LazyUserManagementModal = createLazyComponent(
  () => import(/* webpackChunkName: "admin-modals" */ '../components/admin/UserManagementModal'),
  'UserManagementModal'
);

export const LazyInvoiceModal = createLazyComponent(
  () => import(/* webpackChunkName: "admin-modals" */ '../components/admin/InvoiceModal'),
  'InvoiceModal'
);

export const LazyWebhookLogsModal = createLazyComponent(
  () => import(/* webpackChunkName: "admin-modals" */ '../components/admin/WebhookLogsModal'),
  'WebhookLogsModal'
);

// Heavy course components - lazy loaded with performance tracking
export const LazyCourseVideoLearning = createPreloadableLazyComponent(
  () => import(/* webpackChunkName: "course-heavy" */ '../components/course/CourseVideoLearning'),
  'CourseVideoLearning',
  true // Preload as it's critical for course experience
);

export const LazyInteractiveContent = createLazyComponent(
  () => import(/* webpackChunkName: "course-heavy" */ '../components/course/InteractiveContent'),
  'InteractiveContent'
);

export const LazyQuizComponent = createLazyComponent(
  () => import(/* webpackChunkName: "course-heavy" */ '../components/course/QuizComponent'),
  'QuizComponent'
);

export const LazyVideoPlayer = createPreloadableLazyComponent(
  () => import(/* webpackChunkName: "course-heavy" */ '../components/course/VideoPlayer'),
  'VideoPlayer',
  true // Preload as it's critical for course experience
);

export const LazyCertificateGenerator = createLazyComponent(
  () => import(/* webpackChunkName: "course-heavy" */ '../components/course/CertificateGenerator'),
  'CertificateGenerator'
);

// Dashboard components - lazy loaded with performance tracking
export const LazyDashboardStats = createPreloadableLazyComponent(
  () => import(/* webpackChunkName: "dashboard-heavy" */ '../components/dashboard/DashboardStats'),
  'DashboardStats',
  true // Preload as it's critical for dashboard experience
);

export const LazyEnrolledCoursesList = createPreloadableLazyComponent(
  () => import(/* webpackChunkName: "dashboard-heavy" */ '../components/dashboard/EnrolledCoursesList'),
  'EnrolledCoursesList',
  true // Preload as it's critical for dashboard experience
);

export const LazyRecentActivities = createLazyComponent(
  () => import(/* webpackChunkName: "dashboard-heavy" */ '../components/dashboard/RecentActivities'),
  'RecentActivities'
);

// Payment components - lazy loaded
export const LazyPaymentForm = createLazyComponent(
  () => import(/* webpackChunkName: "payment-heavy" */ '../components/PaymentForm'),
  'PaymentForm'
);

export const LazyProofOfPaymentForm = createLazyComponent(
  () => import(/* webpackChunkName: "payment-heavy" */ '../components/ProofOfPaymentForm'),
  'ProofOfPaymentForm'
);