/**
 * Enrollment Validation Utilities
 * 
 * Helper functions for checking localStorage enrollment data, API enrollment status verification,
 * and enrollment context data validation. These utilities support the UnifiedEnrollmentValidator
 * with specific validation tasks.
 */

import { logger } from '@/utils/logger';
import { EnrollmentData } from '@/utils/enrollmentPersistence';

export interface LocalStorageValidationResult {
  found: boolean;
  data: EnrollmentData | null;
  source: string;
  confidence: number;
  age: number; // in milliseconds
}

export interface APIValidationResult {
  success: boolean;
  data: EnrollmentData | null;
  error?: string;
  responseTime: number;
}

export interface ContextValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completeness: number; // 0-1 score
}

/**
 * Check localStorage for enrollment data with comprehensive fallback strategies
 */
export const checkLocalStorageEnrollment = (
  userId: string,
  courseId: string
): LocalStorageValidationResult[] => {
  const results: LocalStorageValidationResult[] = [];
  
  logger.debug(`🔍 Checking localStorage enrollment for user ${userId}, course ${courseId}`);

  // Define all possible localStorage keys to check
  const keysToCheck = [
    // Recent enrollment flags (highest priority)
    `enrollment-success-${userId}-${courseId}`,
    `recent-payment-${userId}-${courseId}`,
    `bulletproof-enrollment-${courseId}`,
    
    // Direct enrollment keys
    `user-enrollment-${userId}-${courseId}`,
    `enrollment-${courseId}`,
    
    // List-based keys
    `user-enrollments-${userId}`,
    'enrollments',
    'user-enrollments',
    
    // Legacy keys
    `course-enrollment-${courseId}`,
    `enrollment-${userId}-${courseId}`,
    `progress-${courseId}` // Sometimes contains enrollment info
  ];

  for (const key of keysToCheck) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        const enrollmentData = extractEnrollmentFromData(parsed, userId, courseId, key);
        
        if (enrollmentData) {
          const age = Date.now() - new Date(enrollmentData.updated_at).getTime();
          const confidence = calculateLocalStorageConfidence(key, enrollmentData, age);
          
          results.push({
            found: true,
            data: enrollmentData,
            source: key,
            confidence,
            age
          });
          
          logger.debug(`✅ Found enrollment data in ${key}:`, {
            status: enrollmentData.status,
            confidence,
            age: Math.round(age / 1000) + 's'
          });
        }
      }
    } catch (error) {
      logger.debug(`❌ Error checking localStorage key ${key}:`, error);
    }
  }

  // Sort results by confidence (highest first)
  results.sort((a, b) => b.confidence - a.confidence);
  
  logger.info(`🔍 localStorage check completed: ${results.length} sources found`);
  return results;
};

/**
 * Extract enrollment data from various data formats
 */
const extractEnrollmentFromData = (
  data: any,
  userId: string,
  courseId: string,
  sourceKey: string
): EnrollmentData | null => {
  if (!data) return null;

  try {
    // Handle array data (enrollment lists)
    if (Array.isArray(data)) {
      const enrollment = data.find((item: any) => 
        (item.course_id === courseId || item.courseId === courseId) &&
        (item.user_id === userId || item.user_email === userId || item.userEmail === userId)
      );
      
      if (enrollment) {
        return normalizeEnrollmentData(enrollment, userId, courseId);
      }
      return null;
    }

    // Handle direct enrollment data
    if (data.course_id === courseId || data.courseId === courseId) {
      // Verify user matches
      if (data.user_id === userId || data.user_email === userId || 
          data.userEmail === userId || data.userId === userId) {
        return normalizeEnrollmentData(data, userId, courseId);
      }
    }

    // Handle flag-style data (payment success, etc.)
    if (sourceKey.includes('enrollment-success') || sourceKey.includes('recent-payment') || 
        sourceKey.includes('bulletproof-enrollment')) {
      if (data.status === 'approved' || data.courseId === courseId) {
        return normalizeEnrollmentData(data, userId, courseId);
      }
    }

    return null;
  } catch (error) {
    logger.warn(`Error extracting enrollment from ${sourceKey}:`, error);
    return null;
  }
};

/**
 * Normalize enrollment data to consistent format
 */
const normalizeEnrollmentData = (data: any, userId: string, courseId: string): EnrollmentData => {
  const now = new Date().toISOString();
  
  return {
    id: data.id || data.enrollmentId || `enrollment_${Date.now()}_${Math.random()}`,
    user_id: data.user_id || data.userId || userId,
    user_email: data.user_email || data.userEmail || data.email,
    course_id: data.course_id || data.courseId || courseId,
    course_title: data.course_title || data.courseTitle || data.title,
    status: normalizeStatus(data.status || data.enrollment_status || 'pending'),
    enrolled_at: data.enrolled_at || data.enrolledAt || data.created_at || data.timestamp || now,
    approved_at: data.approved_at || data.approvedAt || (data.status === 'approved' ? data.timestamp : undefined),
    updated_at: data.updated_at || data.updatedAt || data.timestamp || now,
    progress: data.progress || 0
  };
};

/**
 * Normalize status values to consistent format
 */
const normalizeStatus = (status: string): 'pending' | 'approved' | 'rejected' => {
  const normalizedStatus = status.toLowerCase().trim();
  
  switch (normalizedStatus) {
    case 'approved':
    case 'enrolled':
    case 'active':
    case 'confirmed':
      return 'approved';
    case 'pending':
    case 'waiting':
    case 'submitted':
      return 'pending';
    case 'rejected':
    case 'denied':
    case 'cancelled':
    case 'inactive':
      return 'rejected';
    default:
      return 'pending';
  }
};

/**
 * Calculate confidence score for localStorage data
 */
const calculateLocalStorageConfidence = (
  key: string,
  data: EnrollmentData,
  age: number
): number => {
  let confidence = 0.5; // Base confidence

  // Key-based confidence adjustments
  if (key.includes('enrollment-success')) {
    confidence += 0.4; // Very high confidence for success flags
  } else if (key.includes('recent-payment')) {
    confidence += 0.35; // High confidence for payment flags
  } else if (key.includes('bulletproof-enrollment')) {
    confidence += 0.3; // High confidence for bulletproof flags
  } else if (key.includes('user-enrollment')) {
    confidence += 0.25; // Good confidence for user-specific data
  } else if (key === 'enrollments') {
    confidence += 0.2; // Moderate confidence for global list
  } else {
    confidence += 0.1; // Lower confidence for other keys
  }

  // Age-based confidence adjustments
  const ageInHours = age / (1000 * 60 * 60);
  if (ageInHours < 1) {
    confidence += 0.1; // Recent data is more reliable
  } else if (ageInHours > 24) {
    confidence -= 0.1; // Old data is less reliable
  }

  // Status-based confidence adjustments
  if (data.status === 'approved') {
    confidence += 0.05; // Approved status is more definitive
  }

  // Data completeness adjustments
  const requiredFields = ['id', 'user_id', 'course_id', 'status'];
  const presentFields = requiredFields.filter(field => data[field as keyof EnrollmentData]);
  const completeness = presentFields.length / requiredFields.length;
  confidence += (completeness - 0.5) * 0.1; // Adjust based on completeness

  return Math.min(1, Math.max(0, confidence));
};

/**
 * Verify enrollment status via API (placeholder for future implementation)
 */
export const verifyEnrollmentViaAPI = async (
  userId: string,
  courseId: string
): Promise<APIValidationResult> => {
  const startTime = Date.now();
  
  try {
    // TODO: Implement actual API call when available
    // This is a placeholder for future API integration
    
    logger.debug(`🌐 API enrollment verification for user ${userId}, course ${courseId}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // For now, return no data found
    return {
      success: true,
      data: null,
      responseTime: Date.now() - startTime
    };
    
    // Future implementation would look like:
    /*
    const response = await fetch(`/api/enrollments/${userId}/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const apiData = await response.json();
    
    return {
      success: true,
      data: apiData ? normalizeEnrollmentData(apiData, userId, courseId) : null,
      responseTime: Date.now() - startTime
    };
    */
  } catch (error) {
    logger.error('API enrollment verification failed:', error);
    
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown API error',
      responseTime: Date.now() - startTime
    };
  }
};

/**
 * Validate enrollment context data for completeness and consistency
 */
export const validateEnrollmentContext = (
  enrollmentData: EnrollmentData,
  expectedUserId: string,
  expectedCourseId: string
): ContextValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let completeness = 0;

  // Required field validation
  const requiredFields = [
    { field: 'id', value: enrollmentData.id },
    { field: 'user_id', value: enrollmentData.user_id },
    { field: 'course_id', value: enrollmentData.course_id },
    { field: 'status', value: enrollmentData.status }
  ];

  let presentFields = 0;
  for (const { field, value } of requiredFields) {
    if (value && value.toString().trim() !== '') {
      presentFields++;
    } else {
      errors.push(`Missing required field: ${field}`);
    }
  }

  completeness = presentFields / requiredFields.length;

  // User ID validation
  if (enrollmentData.user_id !== expectedUserId && enrollmentData.user_email !== expectedUserId) {
    errors.push(`User ID mismatch: expected ${expectedUserId}, got ${enrollmentData.user_id}`);
  }

  // Course ID validation
  if (enrollmentData.course_id !== expectedCourseId) {
    errors.push(`Course ID mismatch: expected ${expectedCourseId}, got ${enrollmentData.course_id}`);
  }

  // Status validation
  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(enrollmentData.status)) {
    errors.push(`Invalid status: ${enrollmentData.status}`);
  }

  // Date validation
  try {
    const enrolledDate = new Date(enrollmentData.enrolled_at);
    if (isNaN(enrolledDate.getTime())) {
      warnings.push('Invalid enrolled_at date format');
    }
  } catch {
    warnings.push('Invalid enrolled_at date format');
  }

  try {
    const updatedDate = new Date(enrollmentData.updated_at);
    if (isNaN(updatedDate.getTime())) {
      warnings.push('Invalid updated_at date format');
    }
  } catch {
    warnings.push('Invalid updated_at date format');
  }

  // Progress validation
  if (enrollmentData.progress < 0 || enrollmentData.progress > 100) {
    warnings.push(`Progress out of range: ${enrollmentData.progress}`);
  }

  // Optional field completeness bonus
  const optionalFields = ['user_email', 'course_title', 'approved_at'];
  const presentOptionalFields = optionalFields.filter(field => 
    enrollmentData[field as keyof EnrollmentData]
  ).length;
  
  completeness += (presentOptionalFields / optionalFields.length) * 0.2; // 20% bonus for optional fields
  completeness = Math.min(1, completeness);

  const isValid = errors.length === 0;

  logger.debug(`📋 Enrollment context validation:`, {
    isValid,
    completeness: Math.round(completeness * 100) + '%',
    errors: errors.length,
    warnings: warnings.length
  });

  return {
    isValid,
    errors,
    warnings,
    completeness
  };
};

/**
 * Check if enrollment data is recent (within specified time window)
 */
export const isEnrollmentDataRecent = (
  enrollmentData: EnrollmentData,
  maxAgeMs: number = 30 * 60 * 1000 // 30 minutes default
): boolean => {
  try {
    const dataAge = Date.now() - new Date(enrollmentData.updated_at).getTime();
    return dataAge <= maxAgeMs;
  } catch {
    return false;
  }
};

/**
 * Get the most reliable enrollment data from multiple sources
 */
export const selectMostReliableEnrollment = (
  enrollmentResults: LocalStorageValidationResult[]
): LocalStorageValidationResult | null => {
  if (enrollmentResults.length === 0) {
    return null;
  }

  // Filter out results with very low confidence
  const reliableResults = enrollmentResults.filter(result => result.confidence >= 0.3);
  
  if (reliableResults.length === 0) {
    return null;
  }

  // Sort by confidence (highest first), then by recency (newest first)
  reliableResults.sort((a, b) => {
    if (a.confidence !== b.confidence) {
      return b.confidence - a.confidence;
    }
    return a.age - b.age; // Lower age (newer) is better
  });

  return reliableResults[0];
};

/**
 * Clean up old enrollment data from localStorage
 */
export const cleanupOldEnrollmentData = (maxAgeMs: number = 7 * 24 * 60 * 60 * 1000): number => {
  let cleanedCount = 0;
  const keysToCheck: string[] = [];

  // Collect all localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.includes('enrollment') || 
      key.includes('recent-payment') || 
      key.includes('bulletproof')
    )) {
      keysToCheck.push(key);
    }
  }

  // Check each key for old data
  for (const key of keysToCheck) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        
        // Check if data has timestamp
        const timestamp = parsed.timestamp || parsed.updated_at || parsed.enrolled_at;
        if (timestamp) {
          const age = Date.now() - new Date(timestamp).getTime();
          if (age > maxAgeMs) {
            localStorage.removeItem(key);
            cleanedCount++;
            logger.debug(`🧹 Cleaned up old enrollment data: ${key}`);
          }
        }
      }
    } catch (error) {
      logger.debug(`Error checking key ${key} for cleanup:`, error);
    }
  }

  if (cleanedCount > 0) {
    logger.info(`🧹 Cleaned up ${cleanedCount} old enrollment data entries`);
  }

  return cleanedCount;
};