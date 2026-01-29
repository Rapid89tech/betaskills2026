/**
 * Enhanced Navigation Handler
 * 
 * Centralized navigation logic for course access with pre-navigation validation
 * to prevent navigation to broken courses and provide proper error recovery.
 */

import { unifiedEnrollmentValidator } from './UnifiedEnrollmentValidator';
import { logger } from '@/utils/logger';

export interface NavigationResult {
    success: boolean;
    shouldNavigate: boolean;
    redirectPath?: string;
    errorMessage?: string;
    confidence: number;
    enrollmentStatus: 'enrolled' | 'pending' | 'rejected' | 'unenrolled';
}

export interface NavigationOptions {
    minConfidence?: number;
    fallbackPath?: string;
    showLoadingState?: boolean;
    bypassValidation?: boolean;
}

/**
 * Enhanced Navigation Handler for Course Access
 */
export class EnhancedNavigationHandler {
    private static instance: EnhancedNavigationHandler;

    private constructor() { }

    public static getInstance(): EnhancedNavigationHandler {
        if (!EnhancedNavigationHandler.instance) {
            EnhancedNavigationHandler.instance = new EnhancedNavigationHandler();
        }
        return EnhancedNavigationHandler.instance;
    }

    /**
     * Handle course navigation with comprehensive validation
     */
    public async handleCourseNavigation(
        userId: string,
        courseId: string,
        options: NavigationOptions = {}
    ): Promise<NavigationResult> {
        const {
            minConfidence = 0.6,
            fallbackPath = '/courses',
            bypassValidation = false
        } = options;

        logger.info(`🧭 EnhancedNavigationHandler: Handling course navigation`, {
            userId,
            courseId,
            minConfidence
        });

        try {
            // Special bypass for admin users or specific scenarios
            if (bypassValidation) {
                logger.info('🚀 Navigation validation bypassed');
                return {
                    success: true,
                    shouldNavigate: true,
                    redirectPath: `/course/${courseId}`,
                    confidence: 1.0,
                    enrollmentStatus: 'enrolled'
                };
            }

            // Validate enrollment status
            const validationResult = await unifiedEnrollmentValidator.validateEnrollment(
                userId,
                courseId,
                { minConfidence }
            );

            logger.info(`📊 Enrollment validation result:`, {
                status: validationResult.status,
                confidence: validationResult.confidence,
                sources: validationResult.sources.length
            });

            // Determine navigation action based on validation result
            switch (validationResult.status) {
                case 'enrolled':
                    if (validationResult.confidence >= minConfidence) {
                        return {
                            success: true,
                            shouldNavigate: true,
                            redirectPath: `/course/${courseId}`,
                            confidence: validationResult.confidence,
                            enrollmentStatus: 'enrolled'
                        };
                    } else {
                        // Low confidence - show verification page
                        return {
                            success: false,
                            shouldNavigate: false,
                            errorMessage: `Enrollment verification needed (confidence: ${Math.round(validationResult.confidence * 100)}%)`,
                            redirectPath: `/course/${courseId}/verify`,
                            confidence: validationResult.confidence,
                            enrollmentStatus: 'enrolled'
                        };
                    }

                case 'pending':
                    return {
                        success: false,
                        shouldNavigate: false,
                        errorMessage: 'Your enrollment is pending approval. You will be notified once approved.',
                        redirectPath: `/enrollment/${courseId}/pending`,
                        confidence: validationResult.confidence,
                        enrollmentStatus: 'pending'
                    };

                case 'rejected':
                    return {
                        success: false,
                        shouldNavigate: false,
                        errorMessage: 'Your enrollment request was not approved. Please contact support for assistance.',
                        redirectPath: `/enrollment/${courseId}/rejected`,
                        confidence: validationResult.confidence,
                        enrollmentStatus: 'rejected'
                    };

                default: // unenrolled
                    return {
                        success: false,
                        shouldNavigate: false,
                        errorMessage: 'You need to enroll in this course to access the content.',
                        redirectPath: `/course/${courseId}/enroll`,
                        confidence: validationResult.confidence,
                        enrollmentStatus: 'unenrolled'
                    };
            }
        } catch (error) {
            logger.error('❌ Navigation validation failed:', error);

            return {
                success: false,
                shouldNavigate: false,
                errorMessage: 'Unable to verify course access. Please try again.',
                redirectPath: fallbackPath,
                confidence: 0,
                enrollmentStatus: 'unenrolled'
            };
        }
    }

    /**
     * Handle Continue Course button clicks from course grid
     */
    public async handleContinueCourseClick(
        userId: string,
        courseId: string,
        navigate: (path: string) => void
    ): Promise<void> {
        logger.info(`🎯 Continue Course clicked for course ${courseId}`);

        try {
            const result = await this.handleCourseNavigation(userId, courseId, {
                minConfidence: 0.5, // Lower threshold for continue button
                bypassValidation: false
            });

            if (result.shouldNavigate && result.redirectPath) {
                logger.info(`✅ Navigating to course: ${result.redirectPath}`);
                navigate(result.redirectPath);
            } else {
                logger.warn(`❌ Navigation blocked:`, result.errorMessage);

                // Show user-friendly error message
                if (result.errorMessage) {
                    // You could show a toast notification here
                    console.warn('Course access issue:', result.errorMessage);
                }

                // Navigate to appropriate fallback page
                if (result.redirectPath) {
                    navigate(result.redirectPath);
                }
            }
        } catch (error) {
            logger.error('❌ Continue course navigation failed:', error);
            navigate('/courses'); // Fallback to courses page
        }
    }

    /**
     * Validate course access before showing course content
     */
    public async validateCourseAccess(
        userId: string,
        courseId: string
    ): Promise<{
        hasAccess: boolean;
        reason?: string;
        confidence: number;
    }> {
        try {
            const result = await this.handleCourseNavigation(userId, courseId);

            return {
                hasAccess: result.shouldNavigate,
                reason: result.errorMessage || undefined,
                confidence: result.confidence
            };
        } catch (error) {
            logger.error('Course access validation failed:', error);
            return {
                hasAccess: false,
                reason: 'Validation error',
                confidence: 0
            };
        }
    }

    /**
     * Get user-friendly navigation message
     */
    public getNavigationMessage(result: NavigationResult): string {
        if (result.success && result.shouldNavigate) {
            return 'Access granted - loading course...';
        }

        switch (result.enrollmentStatus) {
            case 'pending':
                return 'Your enrollment is awaiting approval. Check back soon!';
            case 'rejected':
                return 'Enrollment not approved. Contact support for help.';
            case 'unenrolled':
                return 'Please enroll to access this course.';
            default:
                return result.errorMessage || 'Unable to access course at this time.';
        }
    }

    /**
     * Check if user should see "Continue Course" vs "Enroll Now" button
     */
    public async shouldShowContinueButton(
        userId: string,
        courseId: string
    ): Promise<boolean> {
        try {
            const validationResult = await unifiedEnrollmentValidator.validateEnrollment(
                userId,
                courseId,
                { minConfidence: 0.3 } // Lower threshold for button display
            );

            // Show continue button for enrolled status, even with low confidence
            return validationResult.status === 'enrolled';
        } catch (error) {
            logger.error('Button state validation failed:', error);
            return false;
        }
    }

    /**
     * Get enrollment status for course card display
     */
    public async getEnrollmentStatusForDisplay(
        userId: string,
        courseId: string
    ): Promise<{
        status: 'enrolled' | 'pending' | 'rejected' | 'unenrolled';
        confidence: number;
        buttonText: string;
        buttonAction: 'continue' | 'enroll' | 'pending' | 'contact';
    }> {
        try {
            const validationResult = await unifiedEnrollmentValidator.validateEnrollment(
                userId,
                courseId
            );

            let buttonText: string;
            let buttonAction: 'continue' | 'enroll' | 'pending' | 'contact';

            switch (validationResult.status) {
                case 'enrolled':
                    buttonText = 'Continue Course';
                    buttonAction = 'continue';
                    break;
                case 'pending':
                    buttonText = 'Pending Approval';
                    buttonAction = 'pending';
                    break;
                case 'rejected':
                    buttonText = 'Contact Support';
                    buttonAction = 'contact';
                    break;
                default:
                    buttonText = 'Enroll Now';
                    buttonAction = 'enroll';
                    break;
            }

            return {
                status: validationResult.status,
                confidence: validationResult.confidence,
                buttonText,
                buttonAction
            };
        } catch (error) {
            logger.error('Status display validation failed:', error);
            return {
                status: 'unenrolled',
                confidence: 0,
                buttonText: 'Enroll Now',
                buttonAction: 'enroll'
            };
        }
    }
}

// Export singleton instance
export const enhancedNavigationHandler = EnhancedNavigationHandler.getInstance();