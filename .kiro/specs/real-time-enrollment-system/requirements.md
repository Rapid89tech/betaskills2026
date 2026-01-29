# Requirements Document

## Introduction

This feature implements a comprehensive real-time enrollment system that handles EFT (Electronic Funds Transfer) payments, provides immediate access for card payments, enables real-time admin approval workflows, and ensures proper user routing and course prioritization. The system addresses current issues where EFT enrollments don't appear on the admin dashboard, users are incorrectly routed to instructor dashboards, and enrolled/pending courses aren't properly prioritized.

## Requirements

### Requirement 1

**User Story:** As a student using EFT payment, I want my enrollment to appear immediately on the admin dashboard so that administrators can process my payment approval without delay.

#### Acceptance Criteria

1. WHEN a user completes EFT enrollment THEN the system SHALL immediately display the enrollment in the admin dashboard with "Pending EFT Approval" status
2. WHEN an EFT enrollment is created THEN the system SHALL send real-time notifications to all active admin sessions
3. WHEN multiple EFT enrollments are pending THEN the system SHALL display them in chronological order with most recent first
4. WHEN an admin views the dashboard THEN the system SHALL show EFT enrollments with distinct visual indicators from card payment enrollments

### Requirement 2

**User Story:** As a student using card payment, I want immediate access to course content after successful payment so that I can start learning right away.

#### Acceptance Criteria

1. WHEN a user completes card payment successfully THEN the system SHALL immediately grant access to course lesson content
2. WHEN card payment is processed THEN the system SHALL update the course card button to "Continue Course" within 2 seconds
3. WHEN a user navigates to their courses after card payment THEN the system SHALL show the enrolled course with full access permissions
4. WHEN card payment fails THEN the system SHALL maintain the original enrollment button state and show appropriate error messaging

### Requirement 3

**User Story:** As an administrator, I want to approve EFT enrollments and have the changes reflect immediately on the student's interface so that approved students can access their courses without delay.

#### Acceptance Criteria

1. WHEN an admin approves an EFT enrollment THEN the system SHALL immediately update the student's course card button to "Continue Course"
2. WHEN an admin approves an enrollment THEN the system SHALL send real-time updates to the student's active sessions
3. WHEN an admin rejects an enrollment THEN the system SHALL update the student's course card to show "Enroll Now" and notify the student
4. WHEN an admin processes an enrollment THEN the system SHALL remove it from the pending list in real-time across all admin sessions

### Requirement 4

**User Story:** As a student, I want to be directed to the appropriate dashboard based on my role so that I see relevant content and functionality.

#### Acceptance Criteria

1. WHEN a student logs in THEN the system SHALL redirect them to the student dashboard, not the instructor dashboard
2. WHEN a user has both student and instructor roles THEN the system SHALL default to the student dashboard with option to switch
3. WHEN login is successful THEN the system SHALL determine the correct dashboard within 1 second of authentication
4. WHEN dashboard loading fails THEN the system SHALL show appropriate error message and retry options

### Requirement 5

**User Story:** As a student, I want my enrolled and pending courses to appear at the top of the course list so that I can easily access my priority courses.

#### Acceptance Criteria

1. WHEN a user views the courses page THEN the system SHALL display enrolled courses at the top of the list
2. WHEN a user has pending enrollments THEN the system SHALL display pending courses immediately after enrolled courses
3. WHEN a user has multiple enrolled/pending courses THEN the system SHALL sort them by most recently updated first
4. WHEN course status changes THEN the system SHALL automatically reorder the course list in real-time

### Requirement 6

**User Story:** As a student, I want real-time updates on my enrollment status so that I know immediately when my EFT payment is approved or if there are any issues.

#### Acceptance Criteria

1. WHEN an admin processes my enrollment THEN the system SHALL notify me in real-time without requiring page refresh
2. WHEN my enrollment status changes THEN the system SHALL update all relevant UI elements simultaneously
3. WHEN I have multiple browser tabs open THEN the system SHALL synchronize enrollment status across all tabs
4. WHEN real-time connection is lost THEN the system SHALL attempt to reconnect and sync status when connection is restored