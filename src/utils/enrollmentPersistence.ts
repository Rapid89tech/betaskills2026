// 🛡️ ENHANCED ENROLLMENT PERSISTENCE UTILITY
// This utility ensures enrollment status and progress are NEVER lost across page refreshes
// Enhanced with immediate updates, multiple backup strategies, conflict resolution, and recovery

import { logger } from './logger';
import { EnrollmentStatus, PaymentType } from '../types/enrollment';

export interface EnrollmentData {
  id: string;
  user_id: string;
  user_email?: string;
  course_id: string;
  course_title?: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  approved_at?: string;
  updated_at: string;
  progress: number;
  // Enhanced fields for immediate updates
  payment_type?: PaymentType;
  approval_source?: 'webhook_card_payment' | 'admin_approval' | 'system_automatic';
  sync_version?: number;
  last_synced_at?: string;
}

export interface ImmediateUpdateOptions {
  source: 'webhook_card_payment' | 'admin_approval' | 'system_automatic';
  skipConflictResolution?: boolean;
  forceUpdate?: boolean;
  broadcastUpdate?: boolean;
}

export interface StorageStrategy {
  name: string;
  priority: number;
  store: (key: string, data: any) => Promise<boolean>;
  retrieve: (key: string) => Promise<any>;
  remove: (key: string) => Promise<boolean>;
}

export interface ConflictResolutionResult {
  resolved: boolean;
  finalData: EnrollmentData;
  strategy: 'local_wins' | 'remote_wins' | 'merge' | 'approved_priority';
  conflicts: string[];
}

export interface RecoveryResult {
  success: boolean;
  recoveredEnrollments: EnrollmentData[];
  sources: string[];
  conflicts: ConflictResolutionResult[];
}

export interface UserProgressData {
  [courseId: string]: {
    progress: number;
    completedLessons: number[];
    lastUpdated: string;
  };
}

// 🔄 MULTIPLE BACKUP STORAGE STRATEGIES
// Implements redundant storage across multiple mechanisms for bulletproof persistence

/**
 * Store data in multiple storage locations for redundancy
 */
const storeInMultipleLocations = (key: string, data: any): boolean => {
  let successCount = 0;

  // Store in localStorage
  try {
    localStorage.setItem(key, JSON.stringify(data));
    successCount++;
  } catch (error) {
    logger.warn(`Failed to store in localStorage for key ${key}:`, error);
  }

  // Store in sessionStorage
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
    successCount++;
  } catch (error) {
    logger.warn(`Failed to store in sessionStorage for key ${key}:`, error);
  }

  return successCount > 0;
};

/**
 * Retrieve data from multiple storage locations with fallback
 */
const retrieveFromMultipleLocations = (key: string): any => {
  // Try localStorage first
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    logger.debug(`Failed to retrieve from localStorage for key ${key}:`, error);
  }

  // Fallback to sessionStorage
  try {
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    logger.debug(`Failed to retrieve from sessionStorage for key ${key}:`, error);
  }

  return null;
};

// 🚀 IMMEDIATE UPDATE METHODS
// Provides instant enrollment status updates with multiple backup strategies

/**
 * Immediately update enrollment status with multiple backup strategies
 * Used for card payment approvals that need instant persistence
 */
export const updateEnrollmentStatusImmediately = async (
  enrollmentData: EnrollmentData,
  options: ImmediateUpdateOptions
): Promise<boolean> => {
  const startTime = Date.now();
  logger.info(`Starting immediate enrollment status update for ${enrollmentData.id}`, {
    source: options.source,
    status: enrollmentData.status,
    courseId: enrollmentData.course_id
  });

  try {
    // Enhance enrollment data with immediate update metadata
    const enhancedData: EnrollmentData = {
      ...enrollmentData,
      updated_at: new Date().toISOString(),
      approval_source: options.source,
      sync_version: (enrollmentData.sync_version || 0) + 1,
      last_synced_at: new Date().toISOString()
    };

    // If this is a card payment approval, set approved_at timestamp
    if (options.source === 'webhook_card_payment' && enhancedData.status === 'approved') {
      enhancedData.approved_at = new Date().toISOString();
    }

    let successCount = 0;

    // Store in localStorage (priority 1 - most reliable)
    try {
      const keys = [
        `enrollment-${enhancedData.id}`,
        `user-enrollment-${enhancedData.user_id}-${enhancedData.course_id}`,
        `immediate-update-${enhancedData.course_id}-${enhancedData.user_id}`
      ];

      for (const key of keys) {
        localStorage.setItem(key, JSON.stringify(enhancedData));
      }
      successCount++;
    } catch (error) {
      logger.warn('localStorage storage failed:', error);
    }

    // Store in sessionStorage (priority 2)
    try {
      const keys = [
        `enrollment-${enhancedData.id}`,
        `user-enrollment-${enhancedData.user_id}-${enhancedData.course_id}`
      ];

      for (const key of keys) {
        sessionStorage.setItem(key, JSON.stringify(enhancedData));
      }
      successCount++;
    } catch (error) {
      logger.warn('sessionStorage storage failed:', error);
    }

    // Update user-specific enrollments list
    updateUserEnrollmentsList(enhancedData);

    // Update global enrollments list
    updateGlobalEnrollmentsList(enhancedData);

    // Broadcast update if requested
    if (options.broadcastUpdate !== false) {
      broadcastEnrollmentUpdate(enhancedData, options.source);
    }

    const processingTime = Date.now() - startTime;
    logger.info(`Immediate enrollment update completed in ${processingTime}ms`, {
      enrollmentId: enhancedData.id,
      successfulStrategies: successCount,
      source: options.source
    });

    return successCount > 0;
  } catch (error) {
    logger.error('Immediate enrollment status update failed:', error);
    return false;
  }
};

/**
 * Resolve conflicts between local and remote enrollment data
 * Prioritizes approved status as per requirement 5.4
 */
export const resolveEnrollmentConflicts = (
  localData: EnrollmentData,
  remoteData: EnrollmentData
): ConflictResolutionResult => {
  const conflicts: string[] = [];
  let strategy: ConflictResolutionResult['strategy'] = 'merge';

  // Check for conflicts
  if (localData.status !== remoteData.status) {
    conflicts.push(`Status mismatch: local=${localData.status}, remote=${remoteData.status}`);
  }

  if (localData.updated_at !== remoteData.updated_at) {
    conflicts.push(`Update time mismatch: local=${localData.updated_at}, remote=${remoteData.updated_at}`);
  }

  if (localData.sync_version !== remoteData.sync_version) {
    conflicts.push(`Version mismatch: local=${localData.sync_version}, remote=${remoteData.sync_version}`);
  }

  // Resolution strategy based on requirement 5.4: prioritize approved status
  let finalData: EnrollmentData;

  if (localData.status === 'approved' || remoteData.status === 'approved') {
    // Always prioritize approved status
    strategy = 'approved_priority';
    finalData = localData.status === 'approved' ? localData : remoteData;
    
    // Merge non-conflicting fields from both
    finalData = {
      ...finalData,
      progress: Math.max(localData.progress || 0, remoteData.progress || 0),
      sync_version: Math.max(localData.sync_version || 0, remoteData.sync_version || 0),
      updated_at: new Date().toISOString()
    };
  } else {
    // Use most recent data for non-approved statuses
    const localTime = new Date(localData.updated_at).getTime();
    const remoteTime = new Date(remoteData.updated_at).getTime();
    
    if (localTime > remoteTime) {
      strategy = 'local_wins';
      finalData = localData;
    } else if (remoteTime > localTime) {
      strategy = 'remote_wins';
      finalData = remoteData;
    } else {
      // Same timestamp, merge data
      strategy = 'merge';
      finalData = {
        ...localData,
        ...remoteData,
        progress: Math.max(localData.progress || 0, remoteData.progress || 0),
        sync_version: Math.max(localData.sync_version || 0, remoteData.sync_version || 0),
        updated_at: new Date().toISOString()
      };
    }
  }

  logger.info(`Enrollment conflict resolved using ${strategy}`, {
    enrollmentId: localData.id,
    conflicts: conflicts.length,
    finalStatus: finalData.status
  });

  return {
    resolved: true,
    finalData,
    strategy,
    conflicts
  };
};

/**
 * Update user-specific enrollments list across storage strategies
 */
const updateUserEnrollmentsList = (enrollment: EnrollmentData): void => {
  const userKey = `user-enrollments-${enrollment.user_id}`;
  
  // Update in localStorage
  try {
    const existingData = localStorage.getItem(userKey);
    const existingEnrollments = existingData ? JSON.parse(existingData) : [];
    const updatedEnrollments = Array.isArray(existingEnrollments) 
      ? existingEnrollments.filter((e: EnrollmentData) => e.id !== enrollment.id)
      : [];
    
    updatedEnrollments.push(enrollment);
    localStorage.setItem(userKey, JSON.stringify(updatedEnrollments));
  } catch (error) {
    logger.warn(`Failed to update user enrollments list in localStorage:`, error);
  }

  // Update in sessionStorage
  try {
    const existingData = sessionStorage.getItem(userKey);
    const existingEnrollments = existingData ? JSON.parse(existingData) : [];
    const updatedEnrollments = Array.isArray(existingEnrollments) 
      ? existingEnrollments.filter((e: EnrollmentData) => e.id !== enrollment.id)
      : [];
    
    updatedEnrollments.push(enrollment);
    sessionStorage.setItem(userKey, JSON.stringify(updatedEnrollments));
  } catch (error) {
    logger.warn(`Failed to update user enrollments list in sessionStorage:`, error);
  }
};

/**
 * Update global enrollments list across storage strategies
 */
const updateGlobalEnrollmentsList = (enrollment: EnrollmentData): void => {
  const globalKey = 'enrollments';
  
  // Update in localStorage
  try {
    const existingData = localStorage.getItem(globalKey);
    const existingEnrollments = existingData ? JSON.parse(existingData) : [];
    const updatedEnrollments = Array.isArray(existingEnrollments)
      ? existingEnrollments.filter((e: EnrollmentData) => e.id !== enrollment.id)
      : [];
    
    updatedEnrollments.push(enrollment);
    localStorage.setItem(globalKey, JSON.stringify(updatedEnrollments));
  } catch (error) {
    logger.warn(`Failed to update global enrollments list in localStorage:`, error);
  }

  // Update in sessionStorage
  try {
    const existingData = sessionStorage.getItem(globalKey);
    const existingEnrollments = existingData ? JSON.parse(existingData) : [];
    const updatedEnrollments = Array.isArray(existingEnrollments)
      ? existingEnrollments.filter((e: EnrollmentData) => e.id !== enrollment.id)
      : [];
    
    updatedEnrollments.push(enrollment);
    sessionStorage.setItem(globalKey, JSON.stringify(updatedEnrollments));
  } catch (error) {
    logger.warn(`Failed to update global enrollments list in sessionStorage:`, error);
  }
};

/**
 * Broadcast enrollment update across tabs and components
 */
const broadcastEnrollmentUpdate = (enrollment: EnrollmentData, source: string): void => {
  try {
    // Dispatch custom event for real-time updates
    const event = new CustomEvent('enrollment-status-updated', {
      detail: {
        enrollmentId: enrollment.id,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status: enrollment.status,
        source,
        timestamp: new Date().toISOString()
      }
    });
    
    window.dispatchEvent(event);

    // Also dispatch legacy events for backward compatibility
    window.dispatchEvent(new CustomEvent('enrollment-status-refresh', {
      detail: { 
        courseId: enrollment.course_id, 
        timestamp: new Date().toISOString() 
      }
    }));

    logger.info(`Broadcasted enrollment update for ${enrollment.id}`, { source });
  } catch (error) {
    logger.error('Failed to broadcast enrollment update:', error);
  }
};

/**
 * Get all enrollments from localStorage with fallback strategies
 */
export const getStoredEnrollments = (userId?: string): EnrollmentData[] => {
  try {
    // Try multiple localStorage keys for maximum compatibility
    const keys = ['enrollments', `user-enrollments-${userId}`, 'user-enrollments'];
    
    for (const key of keys) {
      const data = localStorage.getItem(key);
      if (data) {
        const enrollments = JSON.parse(data);
        if (Array.isArray(enrollments) && enrollments.length > 0) {
          logger.info(`Retrieved ${enrollments.length} enrollments from ${key}`);
          return enrollments.map(normalizeEnrollment);
        }
      }
    }
    
    return [];
  } catch (error) {
    logger.error('Error retrieving stored enrollments:', error);
    return [];
  }
};

/**
 * Get enrollment status for a specific course with multiple fallback strategies
 */
export const getEnrollmentStatus = (courseId: string, userId?: string): 'enrolled' | 'pending' | 'rejected' | 'unenrolled' => {
  try {
    // CRITICAL: If no userId provided, always return unenrolled
    // This prevents showing enrollment status when user is not logged in
    if (!userId) {
      logger.debug('getEnrollmentStatus: No userId provided, returning unenrolled');
      return 'unenrolled';
    }

    // 0. Check for recent enrollment success flag (highest priority - 30 minute window)
    const enrollmentSuccessKey = `enrollment-success-${userId}-${courseId}`;
    const enrollmentSuccessFlag = localStorage.getItem(enrollmentSuccessKey);
    if (enrollmentSuccessFlag) {
      try {
        const successData = JSON.parse(enrollmentSuccessFlag);
        const successTime = new Date(successData.timestamp).getTime();
        const now = Date.now();
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes
        
        if (now - successTime < thirtyMinutes && successData.status === 'approved') {
          logger.debug(`getEnrollmentStatus: Found recent enrollment success flag for ${courseId}: enrolled`);
          return 'enrolled';
        }
      } catch (e) {
        // Continue to other checks
      }
    }

    // 0.1. Check for bulletproof enrollment flag (payment success navigation)
    const bulletproofKey = `bulletproof-enrollment-${courseId}`;
    const bulletproofFlag = localStorage.getItem(bulletproofKey);
    if (bulletproofFlag) {
      try {
        const bulletproofData = JSON.parse(bulletproofFlag);
        const bulletproofTime = new Date(bulletproofData.timestamp).getTime();
        const now = Date.now();
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes
        
        if (now - bulletproofTime < thirtyMinutes && bulletproofData.status === 'approved') {
          logger.debug(`getEnrollmentStatus: Found bulletproof enrollment flag for ${courseId}: enrolled`);
          return 'enrolled';
        }
      } catch (e) {
        // Continue to other checks
      }
    }

    // 0.2. Check for recent payment flag (extended window)
    const recentPaymentKey = `recent-payment-${userId}-${courseId}`;
    const recentPaymentFlag = localStorage.getItem(recentPaymentKey);
    if (recentPaymentFlag) {
      try {
        const paymentData = JSON.parse(recentPaymentFlag);
        const paymentTime = new Date(paymentData.timestamp).getTime();
        const now = Date.now();
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes
        
        if (now - paymentTime < thirtyMinutes) {
          logger.debug(`getEnrollmentStatus: Found recent payment flag for ${courseId}: enrolled`);
          return 'enrolled';
        }
      } catch (e) {
        // Continue to other checks
      }
    }

    // 1. Check user-specific enrollments first
    const userEnrollments = getStoredEnrollments(userId);
    const enrollment = userEnrollments.find(e => 
      e.course_id === courseId && (e.user_id === userId || e.user_email === userId)
    );
    
    if (enrollment) {
      const status = enrollment.status === 'approved' ? 'enrolled' : enrollment.status as 'pending' | 'rejected';
      logger.debug(`getEnrollmentStatus: Found user enrollment for ${courseId}:`, status);
      return status;
    }

    // 2. Check legacy formats (only for the specific user)
    const legacyKeys = [
      `user-enrollment-${userId}-${courseId}`,
      `enrollment-${courseId}` // Only check this if it matches the user
    ];

    for (const key of legacyKeys) {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const enrollment = JSON.parse(data);
          // Ensure the enrollment belongs to the current user
          if (enrollment.status && (enrollment.user_id === userId || enrollment.user_email === userId)) {
            const status = enrollment.status === 'approved' ? 'enrolled' : enrollment.status as 'pending' | 'rejected';
            logger.debug(`getEnrollmentStatus: Found legacy enrollment for ${courseId}:`, status);
            return status;
          }
        } catch (e) {
          // Continue to next key
        }
      }
    }

    logger.debug(`getEnrollmentStatus: No enrollment found for user ${userId} in course ${courseId}`);
    return 'unenrolled';
  } catch (error) {
    logger.error('Error getting enrollment status:', error);
    return 'unenrolled';
  }
};

/**
 * Get progress for a specific course with multiple fallback strategies
 */
export const getCourseProgress = (courseId: string, userId?: string): number => {
  try {
    // 1. Try course-specific progress key
    const progressKey = `course-progress-${courseId}`;
    const savedProgress = localStorage.getItem(progressKey);
    if (savedProgress) {
      const progress = parseInt(savedProgress);
      if (!isNaN(progress) && progress >= 0 && progress <= 100) {
        return progress;
      }
    }

    // 2. Try user-specific progress
    if (userId) {
      const userProgressKey = `user-progress-${userId}`;
      const userProgress = localStorage.getItem(userProgressKey);
      if (userProgress) {
        try {
          const progressData = JSON.parse(userProgress);
          if (progressData[courseId] && progressData[courseId].progress !== undefined) {
            return Math.round(progressData[courseId].progress);
          }
        } catch (e) {
          // Continue to next method
        }
      }
    }

    // 3. Try enrollment data
    const enrollment = getStoredEnrollments(userId).find(e => e.course_id === courseId);
    if (enrollment && enrollment.progress !== undefined) {
      return Math.round(enrollment.progress);
    }

    // 4. Try legacy progress keys
    const legacyKeys = [
      `progress-${courseId}`,
      `course-progress-${userId}-${courseId}`,
      `lesson-progress-${courseId}`
    ];

    for (const key of legacyKeys) {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const progress = parseInt(data);
          if (!isNaN(progress) && progress >= 0 && progress <= 100) {
            return progress;
          }
        } catch (e) {
          // Continue to next key
        }
      }
    }

    return 0;
  } catch (error) {
    logger.error('Error getting course progress:', error);
    return 0;
  }
};

/**
 * Save enrollment data with enhanced multiple backup strategies
 * Now uses the new immediate update system for better reliability
 */
export const saveEnrollment = async (enrollment: EnrollmentData): Promise<boolean> => {
  try {
    // Use the immediate update system for enhanced reliability
    const success = await updateEnrollmentStatusImmediately(enrollment, {
      source: 'system_automatic',
      broadcastUpdate: true
    });

    if (success) {
      logger.info(`Saved enrollment ${enrollment.id} with enhanced backup strategies`);
    } else {
      logger.warn(`Partial failure saving enrollment ${enrollment.id}, attempting fallback`);
      
      // Fallback to legacy method if immediate update fails
      await saveLegacyEnrollment(enrollment);
    }

    return success;
  } catch (error) {
    logger.error('Error saving enrollment:', error);
    
    // Final fallback to legacy method
    try {
      await saveLegacyEnrollment(enrollment);
      return true;
    } catch (fallbackError) {
      logger.error('Legacy fallback also failed:', fallbackError);
      return false;
    }
  }
};

/**
 * Legacy enrollment save method for fallback scenarios
 */
const saveLegacyEnrollment = async (enrollment: EnrollmentData): Promise<void> => {
  // 1. Save to user-specific cache
  const userKey = `user-enrollments-${enrollment.user_id}`;
  const existingUserEnrollments = getStoredEnrollments(enrollment.user_id);
  const updatedUserEnrollments = existingUserEnrollments.filter(e => e.id !== enrollment.id);
  updatedUserEnrollments.push(enrollment);
  localStorage.setItem(userKey, JSON.stringify(updatedUserEnrollments));

  // 2. Save to global enrollments
  const existingGlobalEnrollments = getStoredEnrollments();
  const updatedGlobalEnrollments = existingGlobalEnrollments.filter(e => e.id !== enrollment.id);
  updatedGlobalEnrollments.push(enrollment);
  localStorage.setItem('enrollments', JSON.stringify(updatedGlobalEnrollments));

  // 3. Save individual enrollment as backup
  localStorage.setItem(`enrollment-${enrollment.course_id}`, JSON.stringify(enrollment));

  logger.info(`Saved enrollment ${enrollment.id} using legacy method`);
};

/**
 * Save course progress with multiple backup strategies
 */
export const saveCourseProgress = (courseId: string, progress: number, userId?: string): void => {
  try {
    // 1. Save to course-specific key
    localStorage.setItem(`course-progress-${courseId}`, progress.toString());

    // 2. Save to user-specific progress if userId provided
    if (userId) {
      const userProgressKey = `user-progress-${userId}`;
      const existingProgress = localStorage.getItem(userProgressKey);
      let progressData: UserProgressData = {};
      
      if (existingProgress) {
        try {
          progressData = JSON.parse(existingProgress);
        } catch (e) {
          // Start fresh if corrupted
          progressData = {};
        }
      }

      progressData[courseId] = {
        progress,
        completedLessons: [], // Will be updated separately
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(userProgressKey, JSON.stringify(progressData));
    }

    // 3. Save to legacy key for compatibility
    localStorage.setItem(`progress-${courseId}`, progress.toString());

    // 4. Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('progress-updated', {
      detail: { courseId, progress, userId }
    }));

    logger.info(`Saved progress ${progress}% for course ${courseId}`);
  } catch (error) {
    logger.error('Error saving course progress:', error);
  }
};

/**
 * Normalize enrollment data to ensure consistent format
 */
const normalizeEnrollment = (enrollment: any): EnrollmentData => {
  return {
    id: enrollment.id || `enrollment_${Date.now()}_${Math.random()}`,
    user_id: enrollment.user_id || enrollment.userId,
    user_email: enrollment.user_email,
    course_id: enrollment.course_id || enrollment.courseId,
    course_title: enrollment.course_title,
    status: enrollment.status || 'pending',
    enrolled_at: enrollment.enrolled_at || enrollment.enrollment_date || new Date().toISOString(),
    approved_at: enrollment.approved_at,
    updated_at: enrollment.updated_at || new Date().toISOString(),
    progress: enrollment.progress || 0
  };
};

/**
 * Check if user is enrolled in a course (approved status only)
 */
export const isUserEnrolled = (courseId: string, userId?: string): boolean => {
  return getEnrollmentStatus(courseId, userId) === 'enrolled';
};

/**
 * Check if user has any enrollment for a course (any status)
 */
export const hasUserEnrollment = (courseId: string, userId?: string): boolean => {
  const status = getEnrollmentStatus(courseId, userId);
  return status !== 'unenrolled';
};

/**
 * Get all enrolled courses for a user
 */
export const getEnrolledCourses = (userId?: string): string[] => {
  const enrollments = getStoredEnrollments(userId);
  return enrollments
    .filter(e => e.status === 'approved' && (e.user_id === userId || e.user_email === userId))
    .map(e => e.course_id);
};

// 🔧 ENHANCED RECOVERY MECHANISMS
// Comprehensive data recovery across all storage strategies with conflict resolution

/**
 * Enhanced enrollment data recovery with conflict resolution
 * Recovers from multiple storage locations and resolves conflicts
 */
export const recoverEnrollmentDataEnhanced = async (userId: string): Promise<RecoveryResult> => {
  const startTime = Date.now();
  logger.info(`Starting enhanced enrollment data recovery for user ${userId}`);
  
  const recoveredEnrollments: EnrollmentData[] = [];
  const processedIds = new Set<string>();
  const sources: string[] = [];
  const conflicts: ConflictResolutionResult[] = [];

  // Recovery from localStorage and sessionStorage
  const storageTypes = [
    { name: 'localStorage', storage: localStorage },
    { name: 'sessionStorage', storage: sessionStorage }
  ];

  for (const { name, storage } of storageTypes) {
    try {
      const strategyEnrollments = recoverFromStorage(storage, userId);
      sources.push(`${name}: ${strategyEnrollments.length} enrollments`);

      for (const enrollment of strategyEnrollments) {
        const existingIndex = recoveredEnrollments.findIndex(e => e.id === enrollment.id);
        
        if (existingIndex === -1) {
          // New enrollment, add it
          recoveredEnrollments.push(enrollment);
          processedIds.add(enrollment.id);
        } else {
          // Conflict detected, resolve it
          const existing = recoveredEnrollments[existingIndex];
          const resolution = resolveEnrollmentConflicts(existing, enrollment);
          
          recoveredEnrollments[existingIndex] = resolution.finalData;
          conflicts.push(resolution);
          
          logger.info(`Resolved conflict for enrollment ${enrollment.id}`, {
            strategy: resolution.strategy,
            conflicts: resolution.conflicts.length
          });
        }
      }
    } catch (error) {
      logger.warn(`Recovery failed from ${name}:`, error);
    }
  }

  const processingTime = Date.now() - startTime;
  logger.info(`Enhanced recovery completed in ${processingTime}ms`, {
    userId,
    recovered: recoveredEnrollments.length,
    sources: sources.length,
    conflicts: conflicts.length
  });

  return {
    success: true,
    recoveredEnrollments,
    sources,
    conflicts
  };
};

/**
 * Recover enrollments from a specific storage
 */
const recoverFromStorage = (storage: Storage, userId: string): EnrollmentData[] => {
  const enrollments: EnrollmentData[] = [];
  
  // Try multiple key patterns
  const keyPatterns = [
    'enrollments',
    `user-enrollments-${userId}`,
    'user-enrollments',
    `enrollments-${userId}`,
    'course-enrollments'
  ];

  for (const key of keyPatterns) {
    try {
      const data = storage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          parsed.forEach(enrollment => {
            const normalized = normalizeEnrollment(enrollment);
            if (normalized.user_id === userId || normalized.user_email === userId) {
              enrollments.push(normalized);
            }
          });
        }
      }
    } catch (error) {
      logger.debug(`Failed to recover from storage key ${key}:`, error);
    }
  }

  return enrollments;
};

/**
 * Emergency data recovery - restore from multiple sources (legacy method)
 */
export const recoverEnrollmentData = (userId: string): EnrollmentData[] => {
  logger.info(`Starting legacy enrollment data recovery for user ${userId}`);
  
  const recoveredEnrollments: EnrollmentData[] = [];
  const processedIds = new Set<string>();

  // Try all possible localStorage keys
  const possibleKeys = [
    'enrollments',
    `user-enrollments-${userId}`,
    'user-enrollments',
    `enrollments-${userId}`,
    'course-enrollments'
  ];

  for (const key of possibleKeys) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const enrollments = JSON.parse(data);
        if (Array.isArray(enrollments)) {
          enrollments.forEach(enrollment => {
            const normalized = normalizeEnrollment(enrollment);
            if (!processedIds.has(normalized.id) && 
                (normalized.user_id === userId || normalized.user_email === userId)) {
              recoveredEnrollments.push(normalized);
              processedIds.add(normalized.id);
            }
          });
        }
      }
    } catch (error) {
      logger.warn(`Failed to recover data from key ${key}:`, error);
    }
  }

  logger.info(`Recovered ${recoveredEnrollments.length} enrollments for user ${userId}`);
  return recoveredEnrollments;
};

// 💳 CARD PAYMENT SPECIFIC METHODS
// Specialized methods for immediate card payment approval processing

/**
 * Process immediate card payment approval
 * This is the main method called by the webhook handler for card payments
 */
export const processCardPaymentApproval = async (
  enrollmentId: string,
  userId: string,
  courseId: string,
  paymentReference: string
): Promise<boolean> => {
  logger.info(`Processing immediate card payment approval`, {
    enrollmentId,
    userId,
    courseId,
    paymentReference
  });

  try {
    // 1. Retrieve existing enrollment data
    const existingEnrollment = await getEnrollmentById(enrollmentId, userId);
    
    if (!existingEnrollment) {
      logger.error(`Enrollment ${enrollmentId} not found for card payment approval`);
      return false;
    }

    // 2. Create approved enrollment data
    const approvedEnrollment: EnrollmentData = {
      ...existingEnrollment,
      status: 'approved',
      approved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      payment_type: PaymentType.CARD,
      approval_source: 'webhook_card_payment',
      sync_version: (existingEnrollment.sync_version || 0) + 1,
      last_synced_at: new Date().toISOString()
    };

    // 3. Update immediately with all backup strategies
    const success = await updateEnrollmentStatusImmediately(approvedEnrollment, {
      source: 'webhook_card_payment',
      forceUpdate: true,
      broadcastUpdate: true
    });

    if (success) {
      // 4. Set enrollment success flag for immediate UI feedback
      setEnrollmentSuccessFlag(userId, courseId, paymentReference);
      
      logger.info(`Card payment approval processed successfully for ${enrollmentId}`);
      return true;
    } else {
      logger.error(`Failed to process card payment approval for ${enrollmentId}`);
      return false;
    }
  } catch (error) {
    logger.error('Error processing card payment approval:', error);
    return false;
  }
};

/**
 * Set enrollment success flag for immediate UI feedback
 */
const setEnrollmentSuccessFlag = (
  userId: string,
  courseId: string,
  paymentReference: string
): void => {
  const successData = {
    status: 'approved',
    timestamp: new Date().toISOString(),
    paymentReference,
    source: 'card_payment'
  };

  const flagKey = `enrollment-success-${userId}-${courseId}`;
  
  // Store success flag in localStorage and sessionStorage
  try {
    localStorage.setItem(flagKey, JSON.stringify(successData));
    sessionStorage.setItem(flagKey, JSON.stringify(successData));
  } catch (error) {
    logger.debug(`Failed to set success flag:`, error);
  }

  // Set expiration for the success flag (5 minutes)
  setTimeout(() => {
    try {
      localStorage.removeItem(flagKey);
      sessionStorage.removeItem(flagKey);
    } catch (error) {
      logger.debug(`Failed to remove success flag:`, error);
    }
  }, 5 * 60 * 1000); // 5 minutes
};

/**
 * Get enrollment by ID with fallback across storage locations
 */
const getEnrollmentById = async (
  enrollmentId: string,
  userId: string
): Promise<EnrollmentData | null> => {
  // Try direct enrollment keys first
  const directKeys = [
    `enrollment-${enrollmentId}`,
    `user-enrollment-${userId}-${enrollmentId}`
  ];

  for (const key of directKeys) {
    const data = retrieveFromMultipleLocations(key);
    if (data && data.id === enrollmentId) {
      return normalizeEnrollment(data);
    }
  }

  // Fallback to searching in enrollment lists
  const storageTypes = [localStorage, sessionStorage];
  
  for (const storage of storageTypes) {
    try {
      const userEnrollments = storage.getItem(`user-enrollments-${userId}`);
      if (userEnrollments) {
        const parsed = JSON.parse(userEnrollments);
        if (Array.isArray(parsed)) {
          const found = parsed.find((e: any) => e.id === enrollmentId);
          if (found) {
            return normalizeEnrollment(found);
          }
        }
      }

      const globalEnrollments = storage.getItem('enrollments');
      if (globalEnrollments) {
        const parsed = JSON.parse(globalEnrollments);
        if (Array.isArray(parsed)) {
          const found = parsed.find((e: any) => e.id === enrollmentId);
          if (found) {
            return normalizeEnrollment(found);
          }
        }
      }
    } catch (error) {
      logger.debug(`Failed to search enrollment lists in storage:`, error);
    }
  }

  return null;
};

/**
 * Verify enrollment persistence across storage locations
 * Used for testing and validation
 */
export const verifyEnrollmentPersistence = async (
  enrollmentId: string,
  userId: string
): Promise<{
  verified: boolean;
  strategies: { name: string; found: boolean; data?: EnrollmentData }[];
}> => {
  const results: { name: string; found: boolean; data?: EnrollmentData }[] = [];
  
  // Check localStorage
  try {
    const enrollment = await getEnrollmentById(enrollmentId, userId);
    results.push({
      name: 'localStorage',
      found: !!enrollment,
      data: enrollment || undefined
    });
  } catch (error) {
    results.push({
      name: 'localStorage',
      found: false
    });
  }

  // Check sessionStorage
  try {
    const directKey = `enrollment-${enrollmentId}`;
    const data = sessionStorage.getItem(directKey);
    const found = !!data;
    results.push({
      name: 'sessionStorage',
      found,
      data: found ? normalizeEnrollment(JSON.parse(data)) : undefined
    });
  } catch (error) {
    results.push({
      name: 'sessionStorage',
      found: false
    });
  }

  const verified = results.some(r => r.found);
  
  logger.info(`Enrollment persistence verification for ${enrollmentId}`, {
    verified,
    foundIn: results.filter(r => r.found).map(r => r.name)
  });

  return { verified, strategies: results };
};

/**
 * Force refresh enrollment status across all components
 */
export const refreshEnrollmentStatus = (courseId?: string): void => {
  const event = new CustomEvent('enrollment-status-refresh', {
    detail: { courseId, timestamp: new Date().toISOString() }
  });
  
  window.dispatchEvent(event);
  logger.info(`Dispatched enrollment status refresh for course ${courseId || 'all courses'}`);
};

/**
 * Enhanced refresh that also triggers immediate sync check
 */
export const refreshEnrollmentStatusEnhanced = async (
  courseId?: string,
  userId?: string
): Promise<void> => {
  // Trigger immediate sync check if user provided
  if (userId && courseId) {
    try {
      const recovery = await recoverEnrollmentDataEnhanced(userId);
      const courseEnrollment = recovery.recoveredEnrollments.find(e => e.course_id === courseId);
      
      if (courseEnrollment) {
        await updateEnrollmentStatusImmediately(courseEnrollment, {
          source: 'system_automatic',
          broadcastUpdate: true
        });
      }
    } catch (error) {
      logger.warn('Enhanced refresh sync check failed:', error);
    }
  }

  // Trigger standard refresh
  refreshEnrollmentStatus(courseId);
};
