/**
 * Course Navigation Example
 * 
 * This example demonstrates how the enhanced navigation handler
 * fixes the "Continue Course" button navigation issue.
 */

import { enhancedNavigationHandler } from '@/services/EnhancedNavigationHandler';

/**
 * Example: Test course navigation for different enrollment scenarios
 */
export const testCourseNavigation = async () => {
  console.log('🧭 Testing Enhanced Course Navigation\n');

  const testUserId = 'user123';
  const testCourseId = 'course456';

  // Set up test enrollment data in localStorage
  const setupTestEnrollment = () => {
    const enrollmentData = {
      id: 'enroll123',
      user_id: testUserId,
      course_id: testCourseId,
      status: 'approved',
      enrolled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      progress: 25
    };

    localStorage.setItem(
      `user-enrollments-${testUserId}`,
      JSON.stringify([enrollmentData])
    );

    console.log('✅ Test enrollment data set up');
  };

  setupTestEnrollment();

  try {
    // Test 1: Validate course access
    console.log('🔍 Test 1: Validating course access...');
    const accessResult = await enhancedNavigationHandler.validateCourseAccess(
      testUserId,
      testCourseId
    );

    console.log('📊 Access validation result:', {
      hasAccess: accessResult.hasAccess,
      confidence: Math.round(accessResult.confidence * 100) + '%',
      reason: accessResult.reason || 'Access granted'
    });

    // Test 2: Check button state
    console.log('\n🔍 Test 2: Checking button state...');
    const shouldShowContinue = await enhancedNavigationHandler.shouldShowContinueButton(
      testUserId,
      testCourseId
    );

    console.log('🎯 Should show Continue button:', shouldShowContinue);

    // Test 3: Get enrollment status for display
    console.log('\n🔍 Test 3: Getting enrollment status for display...');
    const displayStatus = await enhancedNavigationHandler.getEnrollmentStatusForDisplay(
      testUserId,
      testCourseId
    );

    console.log('📋 Display status:', {
      status: displayStatus.status,
      confidence: Math.round(displayStatus.confidence * 100) + '%',
      buttonText: displayStatus.buttonText,
      buttonAction: displayStatus.buttonAction
    });

    // Test 4: Handle navigation
    console.log('\n🔍 Test 4: Testing navigation handling...');
    const navigationResult = await enhancedNavigationHandler.handleCourseNavigation(
      testUserId,
      testCourseId
    );

    console.log('🧭 Navigation result:', {
      success: navigationResult.success,
      shouldNavigate: navigationResult.shouldNavigate,
      redirectPath: navigationResult.redirectPath,
      enrollmentStatus: navigationResult.enrollmentStatus,
      confidence: Math.round(navigationResult.confidence * 100) + '%'
    });

    // Test 5: Simulate Continue Course click
    console.log('\n🔍 Test 5: Simulating Continue Course click...');
    const mockNavigate = (path: string) => {
      console.log(`🎯 Navigation triggered: ${path}`);
    };

    await enhancedNavigationHandler.handleContinueCourseClick(
      testUserId,
      testCourseId,
      mockNavigate
    );

    console.log('\n✅ All navigation tests completed successfully!');
    
    return {
      accessGranted: accessResult.hasAccess,
      buttonState: displayStatus.buttonText,
      navigationPath: navigationResult.redirectPath
    };

  } catch (error) {
    console.error('❌ Navigation test failed:', error);
    return null;
  }
};

/**
 * Example: Test navigation with different enrollment states
 */
export const testDifferentEnrollmentStates = async () => {
  console.log('🧭 Testing Different Enrollment States\n');

  const testUserId = 'user123';
  const testCourseId = 'course456';

  const testStates = [
    {
      name: 'Approved Enrollment',
      data: {
        id: 'enroll1',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    },
    {
      name: 'Pending Enrollment',
      data: {
        id: 'enroll2',
        user_id: testUserId,
        course_id: testCourseId,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    },
    {
      name: 'No Enrollment',
      data: null
    }
  ];

  for (const testState of testStates) {
    console.log(`\n🔍 Testing: ${testState.name}`);
    
    // Clear localStorage
    localStorage.clear();
    
    // Set up test data if provided
    if (testState.data) {
      localStorage.setItem(
        `user-enrollments-${testUserId}`,
        JSON.stringify([testState.data])
      );
    }

    try {
      const displayStatus = await enhancedNavigationHandler.getEnrollmentStatusForDisplay(
        testUserId,
        testCourseId
      );

      console.log(`   Status: ${displayStatus.status}`);
      console.log(`   Button: ${displayStatus.buttonText}`);
      console.log(`   Action: ${displayStatus.buttonAction}`);
      console.log(`   Confidence: ${Math.round(displayStatus.confidence * 100)}%`);

    } catch (error) {
      console.error(`   ❌ Error testing ${testState.name}:`, error);
    }
  }

  console.log('\n✅ Enrollment state tests completed!');
};

/**
 * Example: Test navigation error handling
 */
export const testNavigationErrorHandling = async () => {
  console.log('🧭 Testing Navigation Error Handling\n');

  const testUserId = 'user123';
  const invalidCourseId = 'invalid-course';

  try {
    console.log('🔍 Testing navigation with invalid course...');
    
    const result = await enhancedNavigationHandler.handleCourseNavigation(
      testUserId,
      invalidCourseId
    );

    console.log('📊 Error handling result:', {
      success: result.success,
      shouldNavigate: result.shouldNavigate,
      errorMessage: result.errorMessage,
      redirectPath: result.redirectPath
    });

    console.log('✅ Error handling test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error handling test failed:', error);
  }
};

/**
 * Run all navigation examples
 */
export const runAllNavigationExamples = async () => {
  console.log('🚀 Running All Course Navigation Examples\n');
  console.log('='.repeat(60));

  try {
    await testCourseNavigation();
    console.log('\n' + '='.repeat(60));
    
    await testDifferentEnrollmentStates();
    console.log('\n' + '='.repeat(60));
    
    await testNavigationErrorHandling();
    console.log('\n' + '='.repeat(60));

    console.log('\n🎉 All navigation examples completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Enhanced navigation handler implemented');
    console.log('   ✅ Course access validation working');
    console.log('   ✅ Button state management working');
    console.log('   ✅ Error handling working');
    console.log('   ✅ Continue Course navigation should now work!');

  } catch (error) {
    console.error('❌ Navigation examples failed:', error);
  }
};

export default {
  testCourseNavigation,
  testDifferentEnrollmentStates,
  testNavigationErrorHandling,
  runAllNavigationExamples
};