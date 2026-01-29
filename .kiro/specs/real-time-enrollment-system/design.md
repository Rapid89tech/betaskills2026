# Design Document

## Overview

The real-time enrollment system implements a comprehensive solution for handling EFT and card payment enrollments with immediate UI updates, proper user routing, and course prioritization. The system uses WebSocket connections for real-time communication, optimistic UI updates for immediate feedback, and a centralized state management approach to ensure consistency across all user interfaces.

## Architecture

### Core Components

1. **EnrollmentManager**: Central service managing all enrollment operations and state
2. **RealTimeService**: WebSocket-based service for real-time updates across sessions
3. **PaymentHandler**: Handles different payment types (EFT vs Card) with appropriate workflows
4. **UserRouter**: Intelligent routing system based on user roles and preferences
5. **CourseOrganizer**: Manages course list prioritization and sorting logic

### Data Flow

```
User Action → PaymentHandler → EnrollmentManager → RealTimeService → UI Updates
     ↓              ↓               ↓                ↓              ↓
Payment Type → Enrollment State → WebSocket Broadcast → Cross-tab Sync → Visual Updates
```

## Components and Interfaces

### EnrollmentManager Interface

```typescript
interface EnrollmentManager {
  processEFTEnrollment(userId: string, courseId: string): Promise<EnrollmentResult>
  processCardEnrollment(userId: string, courseId: string): Promise<EnrollmentResult>
  approveEnrollment(enrollmentId: string, adminId: string): Promise<void>
  rejectEnrollment(enrollmentId: string, adminId: string, reason: string): Promise<void>
  getEnrollmentStatus(userId: string, courseId: string): EnrollmentStatus
  subscribeToEnrollmentUpdates(callback: EnrollmentUpdateCallback): void
}
```

### RealTimeService Interface

```typescript
interface RealTimeService {
  connect(): Promise<void>
  disconnect(): void
  subscribeToEnrollments(callback: EnrollmentUpdateCallback): void
  subscribeToAdminUpdates(callback: AdminUpdateCallback): void
  broadcastEnrollmentUpdate(update: EnrollmentUpdate): void
  syncCrossTab(): void
}
```

### PaymentHandler Interface

```typescript
interface PaymentHandler {
  processPayment(type: 'EFT' | 'CARD', details: PaymentDetails): Promise<PaymentResult>
  validatePayment(paymentId: string): Promise<boolean>
  handlePaymentCallback(callback: PaymentCallback): void
}
```

## Data Models

### Enrollment Model

```typescript
interface Enrollment {
  id: string
  userId: string
  courseId: string
  paymentType: 'EFT' | 'CARD'
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED'
  createdAt: Date
  updatedAt: Date
  approvedBy?: string
  approvedAt?: Date
  rejectionReason?: string
}
```

### Course Priority Model

```typescript
interface CoursePriority {
  courseId: string
  userId: string
  priority: number
  enrollmentStatus: 'ENROLLED' | 'PENDING' | 'NONE'
  lastUpdated: Date
}
```

### Real-time Update Model

```typescript
interface EnrollmentUpdate {
  type: 'ENROLLMENT_CREATED' | 'ENROLLMENT_APPROVED' | 'ENROLLMENT_REJECTED'
  enrollmentId: string
  userId: string
  courseId: string
  status: EnrollmentStatus
  timestamp: Date
  metadata?: Record<string, any>
}
```

## Error Handling

### Payment Processing Errors

- **Card Payment Failures**: Immediate user feedback with retry options, no enrollment record created
- **EFT Processing Errors**: Create enrollment with error status, notify admin for manual review
- **Network Failures**: Queue operations locally, sync when connection restored
- **Validation Errors**: Prevent enrollment creation, show specific error messages

### Real-time Communication Errors

- **WebSocket Disconnection**: Automatic reconnection with exponential backoff
- **Message Delivery Failures**: Store updates locally, resend on reconnection
- **Cross-tab Sync Issues**: Use localStorage events as fallback mechanism
- **Admin Notification Failures**: Log for manual admin review, show system alerts

### User Routing Errors

- **Role Detection Failures**: Default to student dashboard with manual role selection
- **Dashboard Loading Errors**: Show error boundary with refresh and support options
- **Permission Errors**: Redirect to appropriate dashboard with error notification

## Testing Strategy

### Unit Testing

- **EnrollmentManager**: Test all enrollment workflows, state transitions, and error conditions
- **PaymentHandler**: Mock payment gateways, test success/failure scenarios
- **RealTimeService**: Mock WebSocket connections, test message handling and reconnection
- **UserRouter**: Test role-based routing logic and fallback mechanisms

### Integration Testing

- **End-to-End Enrollment Flow**: Test complete EFT and card payment workflows
- **Real-time Updates**: Test cross-session and cross-tab synchronization
- **Admin Approval Workflow**: Test admin actions and student UI updates
- **Course Prioritization**: Test sorting and reordering logic

### Performance Testing

- **WebSocket Load Testing**: Test with multiple concurrent admin and student sessions
- **Database Performance**: Test enrollment queries with large datasets
- **UI Responsiveness**: Test real-time updates with high frequency changes
- **Memory Usage**: Test for memory leaks in long-running sessions

## Security Considerations

### Payment Security

- **PCI Compliance**: Ensure card payment handling meets PCI DSS requirements
- **EFT Validation**: Implement secure EFT reference validation and verification
- **Payment Fraud Prevention**: Add rate limiting and suspicious activity detection

### Real-time Security

- **WebSocket Authentication**: Validate user sessions for all real-time connections
- **Message Validation**: Sanitize and validate all real-time messages
- **Cross-tab Security**: Prevent unauthorized access to enrollment data

### Admin Security

- **Approval Authorization**: Verify admin permissions for enrollment approvals
- **Audit Logging**: Log all admin actions for compliance and security review
- **Session Management**: Implement secure admin session handling

## Performance Optimizations

### Database Optimizations

- **Enrollment Indexing**: Create indexes on userId, courseId, status, and updatedAt
- **Query Optimization**: Use efficient queries for enrollment status checks
- **Caching Strategy**: Cache frequently accessed enrollment data

### Real-time Optimizations

- **Message Batching**: Batch multiple updates to reduce WebSocket traffic
- **Selective Updates**: Only send updates to relevant users and admins
- **Connection Pooling**: Efficiently manage WebSocket connections

### UI Optimizations

- **Optimistic Updates**: Update UI immediately, rollback on errors
- **Lazy Loading**: Load enrollment details on demand
- **Virtual Scrolling**: Handle large enrollment lists efficiently