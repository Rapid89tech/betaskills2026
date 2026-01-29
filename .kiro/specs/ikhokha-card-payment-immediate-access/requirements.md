# Requirements Document

## Introduction

This feature addresses the critical issue where users making successful card payments through Ikhokha are not receiving immediate access to course content. The system must ensure that card payments result in instant enrollment approval and course access, while maintaining the existing EFT payment approval workflow. This is essential for user experience and business operations, as paying customers expect immediate access to their purchased courses.

## Requirements

### Requirement 1

**User Story:** As a student, I want to receive immediate access to course content after completing a successful card payment, so that I can start learning right away without waiting for manual approval.

#### Acceptance Criteria

1. WHEN I complete a card payment successfully THEN the system SHALL immediately update my enrollment status to "approved"
2. WHEN my enrollment is approved via card payment THEN the course card SHALL change from "Enroll Now" to "Continue Course" within 2 seconds
3. WHEN I click "Continue Course" after card payment THEN I SHALL be taken directly to the course lessons
4. WHEN my card payment is processed THEN the system SHALL grant course access without requiring admin approval

### Requirement 2

**User Story:** As a student, I want the payment webhook to automatically approve my enrollment for card payments, so that there's no delay between payment and access.

#### Acceptance Criteria

1. WHEN Ikhokha sends a successful payment webhook for a card payment THEN the system SHALL automatically approve the enrollment
2. WHEN the webhook processes a card payment THEN the enrollment status SHALL change from "pending" to "approved" immediately
3. WHEN the webhook handler receives a card payment notification THEN it SHALL bypass the admin approval workflow
4. WHEN the enrollment is auto-approved THEN the system SHALL log the automatic approval for audit purposes

### Requirement 3

**User Story:** As a student, I want real-time updates across all my browser tabs when my card payment is processed, so that I see the access granted immediately everywhere.

#### Acceptance Criteria

1. WHEN my card payment is processed THEN all my open browser tabs SHALL update to show "Continue Course" within 2 seconds
2. WHEN my enrollment status changes to approved THEN the system SHALL broadcast the update across all my sessions
3. WHEN I have multiple tabs open THEN the course access update SHALL be synchronized across all tabs
4. WHEN the real-time update occurs THEN the course card SHALL reflect the new status without requiring a page refresh

### Requirement 4

**User Story:** As a system administrator, I want to distinguish between card payments (auto-approve) and EFT payments (manual approval) in the webhook processing, so that the correct workflow is applied.

#### Acceptance Criteria

1. WHEN a webhook is received THEN the system SHALL determine if it's a card payment or EFT payment
2. WHEN the payment is identified as a card payment THEN the system SHALL automatically approve the enrollment
3. WHEN the payment is identified as an EFT payment THEN the system SHALL route it to the admin approval workflow
4. WHEN payment type detection fails THEN the system SHALL default to manual approval for safety

### Requirement 5

**User Story:** As a student, I want the enrollment persistence system to immediately reflect my approved status after card payment, so that refreshing the page doesn't lose my access.

#### Acceptance Criteria

1. WHEN my card payment is approved THEN the enrollment status SHALL be persisted in localStorage immediately
2. WHEN I refresh the page after card payment THEN my course access SHALL remain active
3. WHEN the enrollment status is updated THEN it SHALL be synchronized with the database immediately
4. WHEN there's a conflict between local and remote enrollment status THEN the system SHALL prioritize the approved status

### Requirement 6

**User Story:** As a developer, I want comprehensive logging of the card payment approval process, so that I can troubleshoot any issues with immediate access.

#### Acceptance Criteria

1. WHEN a card payment webhook is processed THEN the system SHALL log each step of the approval process
2. WHEN enrollment status is updated THEN the system SHALL log the status change with timestamp
3. WHEN real-time updates are broadcast THEN the system SHALL log the broadcast events
4. WHEN there's an error in the approval process THEN the system SHALL log detailed error information for debugging

### Requirement 7

**User Story:** As a student, I want the course access validation to work correctly after card payment, so that I can access all course content immediately.

#### Acceptance Criteria

1. WHEN I access a course after card payment THEN the system SHALL validate my enrollment status correctly
2. WHEN my enrollment is approved THEN all course lessons SHALL be accessible immediately
3. WHEN I navigate to course content THEN the system SHALL not show any access restrictions
4. WHEN course access is granted THEN it SHALL persist across browser sessions

### Requirement 8

**User Story:** As a system administrator, I want the webhook signature validation to work correctly for production card payments, so that only legitimate payment notifications are processed.

#### Acceptance Criteria

1. WHEN a webhook is received THEN the system SHALL validate the Ikhokha signature correctly
2. WHEN the signature is valid THEN the webhook SHALL be processed for enrollment approval
3. WHEN the signature is invalid THEN the webhook SHALL be rejected and logged as a security event
4. WHEN webhook validation fails THEN the system SHALL not update any enrollment status