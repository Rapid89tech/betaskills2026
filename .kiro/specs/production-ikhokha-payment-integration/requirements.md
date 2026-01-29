# Requirements Document

## Introduction

This feature completes the production-ready iKhokha payment gateway integration for the online learning platform. The system must enable real payments, handle enrollment logic correctly, and provide seamless user experience from course enrollment through payment completion to course access. The integration must support both card payments (instant access) and EFT payments (admin approval required) while maintaining real-time updates across the platform.

## Requirements

### Requirement 1

**User Story:** As a student, I want to see an "Enroll Now" button when I'm not logged in or enrolled, so that I can easily start the enrollment process for any course.

#### Acceptance Criteria

1. WHEN I am not logged in THEN the course card SHALL display "Register To Enroll" button
2. WHEN I am logged in but not enrolled THEN the course card SHALL display "Enroll Now" button
3. WHEN I click "Enroll Now" THEN the system SHALL initiate the payment process with iKhokha
4. WHEN the payment process starts THEN the system SHALL create a pending enrollment record

### Requirement 2

**User Story:** As a student, I want to make real payments through iKhokha for course enrollment, so that I can access the course content immediately after successful payment.

#### Acceptance Criteria

1. WHEN I complete a card payment successfully THEN the system SHALL immediately grant me access to the course content
2. WHEN I complete a card payment successfully THEN the course card button SHALL change to "Continue Course"
3. WHEN I make an EFT payment THEN the system SHALL mark my enrollment as "pending" for admin approval
4. WHEN I make an EFT payment THEN the course card button SHALL change to "Pending Approval"

### Requirement 3

**User Story:** As a student, I want real-time updates on my enrollment status, so that I know immediately when my payment is processed or when admin approves my EFT payment.

#### Acceptance Criteria

1. WHEN my payment status changes THEN the course card SHALL update in real-time without page refresh
2. WHEN admin approves my EFT payment THEN the course card SHALL change from "Pending Approval" to "Continue Course" within 2 seconds
3. WHEN my enrollment status changes THEN the system SHALL sync the update across all my open browser tabs
4. WHEN I have approved enrollment THEN clicking "Continue Course" SHALL take me directly to the lesson content

### Requirement 4

**User Story:** As an administrator, I want to see EFT payment enrollments in the admin dashboard under "Pending Enrollments" in real-time, so that I can approve them immediately.

#### Acceptance Criteria

1. WHEN a student completes an EFT payment THEN the enrollment SHALL appear in "Pending Enrollments" within 1 second
2. WHEN I approve an enrollment THEN the student's course access SHALL be granted immediately
3. WHEN I approve an enrollment THEN the system SHALL update the student's interface in real-time
4. WHEN I approve an enrollment THEN the enrollment SHALL be removed from "Pending Enrollments" list

### Requirement 5

**User Story:** As a system administrator, I want all payments to be processed through real iKhokha API in production mode, so that actual money transactions occur and no mock data is used.

#### Acceptance Criteria

1. WHEN the system is in production mode THEN all payments SHALL be processed through live iKhokha API
2. WHEN a payment is made THEN real money SHALL be charged to the customer's payment method
3. WHEN the system starts in production THEN it SHALL validate that no test mode or mock data is being used
4. WHEN payment webhooks are received THEN they SHALL be validated with proper iKhokha signatures

### Requirement 6

**User Story:** As a student, I want the enrollment logic to work correctly based on my login status and payment completion, so that I have a smooth experience from discovery to course access.

#### Acceptance Criteria

1. WHEN I am not logged in THEN I SHALL see "Register To Enroll" and be redirected to authentication
2. WHEN I am logged in but not enrolled THEN I SHALL see "Enroll Now" button
3. WHEN I have pending enrollment THEN I SHALL see "Pending Approval" button (disabled)
4. WHEN I have approved enrollment THEN I SHALL see "Continue Course" button that takes me to lessons

### Requirement 7

**User Story:** As a student, I want the system to handle payment failures gracefully, so that I can retry payment or understand what went wrong.

#### Acceptance Criteria

1. WHEN my payment fails THEN the system SHALL display a clear error message with retry option
2. WHEN my payment fails THEN my enrollment status SHALL remain as "pending" until successful payment
3. WHEN I retry a failed payment THEN the system SHALL use the same enrollment record
4. WHEN payment processing takes time THEN I SHALL see appropriate loading indicators

### Requirement 8

**User Story:** As an administrator, I want webhook notifications from iKhokha to update enrollment statuses automatically, so that the system stays synchronized with payment status.

#### Acceptance Criteria

1. WHEN iKhokha sends a payment success webhook THEN the enrollment status SHALL be updated automatically
2. WHEN iKhokha sends a payment failure webhook THEN the enrollment SHALL remain pending with failure reason
3. WHEN webhook processing fails THEN the system SHALL log the error and retry processing
4. WHEN webhook signature is invalid THEN the system SHALL reject the webhook and log security alert