/**
 * UnifiedEnrollmentValidator Usage Examples
 * 
 * This file demonstrates how to use the UnifiedEnrollmentValidator
 * in different scenarios to check enrollment status reliably.
 */

import { unifiedEnrollmentValidator } from '@/services/UnifiedEnrollmentValidator';
import { logger } from '@/utils/logger';

/**
 * Example 1: Basic enrollment validation
 * This is the most common use case - checking if a user is enrolled in a course
 */
export const basicEnrollmentCheck = async () => {
  console.log('🔍 Example 1: Basic Enrollment Check');
  
  const userId = 'user123';
  const courseId = 'course456';
  
  try {
    const result = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId);
    
    console.log('📊 Validation Result:', {
      isEnrolled: result.status === 'enrolled',
      status: result.status,
      confidence: Math.round(result.confidence * 100) + '%',
      sources: result.sources.length,
      processingTime: result.metadata.processingTimeMs + 'ms'
    });
    
    // Use the result for navigation decisions
    if (result.status === 'enrolled' && result.confidence > 0.7) {
      console.log('✅ User can access course content');
      return true;
    } else if (result.status === 'pending') {
      console.log('⏳ Enrollment is pending approval');
      return false;
    } else {
      console.log('❌ User needs to enroll first');
      return false;
    }
  } catch (error) {
    console.error('❌ Validation failed:', error);
    return false;
  }
};

/**
 * Example 2: High-confidence validation for critical operations
 * Use this when you need to be very sure about enrollment status
 */
export const highConfidenceValidation = async () => {
  console.log('🔍 Example 2: High-Confidence Validation');
  
  const userId = 'user123';
  const courseId = 'course456';
  
  try {
    const result = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId, {
      minConfidence: 0.8, // Require high confidence
      includeApiCheck: true // Include API verification if available
    });
    
    console.log('📊 High-Confidence Result:', {
      status: result.status,
      confidence: Math.round(result.confidence * 100) + '%',
      primarySource: result.primarySource?.name,
      conflicts: result.conflicts.length
    });
    
    if (result.confidence >= 0.8) {
      console.log('✅ High confidence - safe to proceed');
      return result.status === 'enrolled';
    } else {
      console.log('⚠️ Low confidence - manual verification needed');
      return false;
    }
  } catch (error) {
    console.error('❌ High-confidence validation failed:', error);
    return false;
  }
};

/**
 * Example 3: Detailed validation with conflict analysis
 * Use this for debugging enrollment issues
 */
export const detailedValidationAnalysis = async () => {
  console.log('🔍 Example 3: Detailed Validation Analysis');
  
  const userId = 'user123';
  const courseId = 'course456';
  
  try {
    const result = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId, {
      useCache: false // Force fresh validation
    });
    
    console.log('📊 Detailed Analysis:');
    console.log('  Status:', result.status);
    console.log('  Confidence:', Math.round(result.confidence * 100) + '%');
    console.log('  Sources found:', result.sources.length);
    
    // Analyze each source
    console.log('\n📋 Source Analysis:');
    result.sources.forEach((source, index) => {
      console.log(`  ${index + 1}. ${source.name}:`);
      console.log(`     Type: ${source.type}`);
      console.log(`     Priority: ${source.priority}`);
      console.log(`     Confidence: ${Math.round(source.confidence * 100)}%`);
      console.log(`     Status: ${source.data?.status || 'N/A'}`);
      if (source.key) {
        console.log(`     Key: ${source.key}`);
      }
    });
    
    // Analyze conflicts
    if (result.conflicts.length > 0) {
      console.log('\n⚠️ Conflicts Detected:');
      result.conflicts.forEach((conflict, index) => {
        console.log(`  ${index + 1}. ${conflict.conflictType} (${conflict.severity}):`);
        console.log(`     ${conflict.description}`);
        console.log(`     Between: ${conflict.source1.name} and ${conflict.source2.name}`);
      });
    } else {
      console.log('\n✅ No conflicts detected');
    }
    
    // Primary source info
    if (result.primarySource) {
      console.log('\n🎯 Primary Source:');
      console.log(`  Name: ${result.primarySource.name}`);
      console.log(`  Confidence: ${Math.round(result.primarySource.confidence * 100)}%`);
      console.log(`  Data: ${JSON.stringify(result.primarySource.data, null, 2)}`);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Detailed validation failed:', error);
    return null;
  }
};

/**
 * Example 4: Course navigation helper
 * This shows how to integrate the validator into course navigation logic
 */
export const courseNavigationHelper = async (userId: string, courseId: string) => {
  console.log('🔍 Example 4: Course Navigation Helper');
  
  try {
    const result = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId);
    
    // Navigation decision logic
    const navigationDecision = {
      canAccess: false,
      redirectTo: '',
      message: '',
      confidence: result.confidence
    };
    
    switch (result.status) {
      case 'enrolled':
        if (result.confidence >= 0.6) {
          navigationDecision.canAccess = true;
          navigationDecision.redirectTo = `/course/${courseId}`;
          navigationDecision.message = 'Access granted - redirecting to course';
        } else {
          navigationDecision.canAccess = false;
          navigationDecision.redirectTo = `/course/${courseId}/verify`;
          navigationDecision.message = 'Low confidence - verification needed';
        }
        break;
        
      case 'pending':
        navigationDecision.canAccess = false;
        navigationDecision.redirectTo = `/enrollment/${courseId}/pending`;
        navigationDecision.message = 'Enrollment pending approval';
        break;
        
      case 'rejected':
        navigationDecision.canAccess = false;
        navigationDecision.redirectTo = `/enrollment/${courseId}/rejected`;
        navigationDecision.message = 'Enrollment was rejected';
        break;
        
      default: // unenrolled
        navigationDecision.canAccess = false;
        navigationDecision.redirectTo = `/course/${courseId}/enroll`;
        navigationDecision.message = 'Please enroll to access this course';
        break;
    }
    
    console.log('🧭 Navigation Decision:', navigationDecision);
    return navigationDecision;
  } catch (error) {
    console.error('❌ Navigation helper failed:', error);
    return {
      canAccess: false,
      redirectTo: '/courses',
      message: 'Error checking enrollment - please try again',
      confidence: 0
    };
  }
};

/**
 * Example 5: Batch validation for multiple courses
 * Useful for dashboard or course list views
 */
export const batchCourseValidation = async (userId: string, courseIds: string[]) => {
  console.log('🔍 Example 5: Batch Course Validation');
  
  const results = new Map();
  
  try {
    // Validate all courses in parallel
    const validationPromises = courseIds.map(async (courseId) => {
      const result = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId);
      return { courseId, result };
    });
    
    const validationResults = await Promise.all(validationPromises);
    
    // Process results
    validationResults.forEach(({ courseId, result }) => {
      results.set(courseId, {
        status: result.status,
        confidence: result.confidence,
        canAccess: result.status === 'enrolled' && result.confidence >= 0.6
      });
    });
    
    console.log('📊 Batch Validation Results:');
    results.forEach((result, courseId) => {
      console.log(`  ${courseId}: ${result.status} (${Math.round(result.confidence * 100)}%)`);
    });
    
    return results;
  } catch (error) {
    console.error('❌ Batch validation failed:', error);
    return results;
  }
};

/**
 * Example 6: Real-time validation with caching
 * Shows how to use the validator efficiently in real-time scenarios
 */
export const realTimeValidation = async (userId: string, courseId: string) => {
  console.log('🔍 Example 6: Real-Time Validation');
  
  try {
    // First call - will check all sources and cache result
    console.log('📡 First validation (full check)...');
    const startTime = Date.now();
    const result1 = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId);
    const firstCallTime = Date.now() - startTime;
    
    console.log(`✅ First call completed in ${firstCallTime}ms`);
    console.log(`   Status: ${result1.status}, Confidence: ${Math.round(result1.confidence * 100)}%`);
    
    // Second call - should use cached result
    console.log('📡 Second validation (cached)...');
    const startTime2 = Date.now();
    const result2 = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId);
    const secondCallTime = Date.now() - startTime2;
    
    console.log(`✅ Second call completed in ${secondCallTime}ms`);
    console.log(`   Status: ${result2.status}, Confidence: ${Math.round(result2.confidence * 100)}%`);
    console.log(`   Speed improvement: ${Math.round((firstCallTime / secondCallTime) * 100)}%`);
    
    // Show cache statistics
    const cacheStats = unifiedEnrollmentValidator.getCacheStats();
    console.log('💾 Cache Stats:', cacheStats);
    
    return result2;
  } catch (error) {
    console.error('❌ Real-time validation failed:', error);
    return null;
  }
};

/**
 * Example 7: Integration with existing enrollment hooks
 * Shows how to integrate the validator with React hooks
 */
export const integrationExample = async (userId: string, courseId: string) => {
  console.log('🔍 Example 7: Integration Example');
  
  try {
    // Simulate existing enrollment check
    const legacyEnrollmentCheck = () => {
      // This represents existing fragmented enrollment logic
      const enrollmentData = localStorage.getItem(`enrollment-${courseId}`);
      if (enrollmentData) {
        try {
          const parsed = JSON.parse(enrollmentData);
          return parsed.status === 'approved';
        } catch {
          return false;
        }
      }
      return false;
    };
    
    // Compare legacy vs unified validator
    const legacyResult = legacyEnrollmentCheck();
    const unifiedResult = await unifiedEnrollmentValidator.validateEnrollment(userId, courseId);
    
    console.log('📊 Comparison:');
    console.log(`  Legacy check: ${legacyResult ? 'enrolled' : 'not enrolled'}`);
    console.log(`  Unified validator: ${unifiedResult.status} (${Math.round(unifiedResult.confidence * 100)}% confidence)`);
    console.log(`  Sources checked: ${unifiedResult.sources.length}`);
    console.log(`  Conflicts found: ${unifiedResult.conflicts.length}`);
    
    // Recommendation
    if (legacyResult !== (unifiedResult.status === 'enrolled')) {
      console.log('⚠️ Results differ - unified validator provides more reliable result');
    } else {
      console.log('✅ Results match - unified validator confirms legacy result');
    }
    
    return {
      legacy: legacyResult,
      unified: unifiedResult.status === 'enrolled',
      confidence: unifiedResult.confidence,
      recommendation: unifiedResult.confidence >= 0.7 ? unifiedResult.status : 'verify_manually'
    };
  } catch (error) {
    console.error('❌ Integration example failed:', error);
    return null;
  }
};

/**
 * Run all examples
 */
export const runAllExamples = async () => {
  console.log('🚀 Running UnifiedEnrollmentValidator Examples\n');
  
  // Set up some test data in localStorage
  const setupTestData = () => {
    const userId = 'user123';
    const courseId = 'course456';
    
    // Add enrollment success flag
    localStorage.setItem(`enrollment-success-${userId}-${courseId}`, JSON.stringify({
      status: 'approved',
      courseId,
      userEmail: userId,
      timestamp: new Date().toISOString()
    }));
    
    // Add user enrollments list
    localStorage.setItem(`user-enrollments-${userId}`, JSON.stringify([
      {
        id: 'enroll123',
        user_id: userId,
        course_id: courseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 25
      }
    ]));
    
    console.log('📝 Test data set up in localStorage\n');
  };
  
  setupTestData();
  
  try {
    await basicEnrollmentCheck();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await highConfidenceValidation();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await detailedValidationAnalysis();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await courseNavigationHelper('user123', 'course456');
    console.log('\n' + '='.repeat(50) + '\n');
    
    await batchCourseValidation('user123', ['course456', 'course789', 'course101']);
    console.log('\n' + '='.repeat(50) + '\n');
    
    await realTimeValidation('user123', 'course456');
    console.log('\n' + '='.repeat(50) + '\n');
    
    await integrationExample('user123', 'course456');
    
    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Examples failed:', error);
  }
};

// Export individual examples for selective testing
export default {
  basicEnrollmentCheck,
  highConfidenceValidation,
  detailedValidationAnalysis,
  courseNavigationHelper,
  batchCourseValidation,
  realTimeValidation,
  integrationExample,
  runAllExamples
};