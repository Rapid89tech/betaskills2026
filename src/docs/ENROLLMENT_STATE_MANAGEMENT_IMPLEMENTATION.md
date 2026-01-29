# Enrollment State Management Implementation

## Overview

This document summarizes the implementation of Task 9: "Enhance enrollment state management with business logic" from the production iKhokha payment integration specification.

## Requirements Addressed

- **Requirement 6.1**: Proper enrollment creation based on login status
- **Requirement 6.2**: Proper state transitions for approved enrollments  
- **Requirement 6.3**: Proper handling of rejected enrollments
- **Requirement 6.4**: Proper button states based on enrollment status

## Components Implemented

### 1. EnrollmentStateManager Service (`src/services/EnrollmentStateManager.ts`)

A centralized singleton service that manages all enrollment state logic and business rules.

**Key Features:**
- **Centralized enrollment logic**: Single source of truth for enrollment state management
- **State transition validation**: Enforces business rules for status changes
- **Business rule enforcement**: Validates payment types, approval requirements, and access control
- **Enrollment persistence**: Handles database operations with caching
- **Audit trail**: Tracks all enrollment status changes with history
- **Real-time updates**: Publishes status changes to subscribers

**Core Methods:**
- `createPendingEnrollment()`: Creates new enrollments with proper validation
- `approveEnrollment()`: Approves enrollments with audit trail
- `rejectEnrollment()`: Rejects enrollments with reason tracking
- `getEnrollmentState()`: Returns UI state based on enrollment status
- `canAccessCourse()`: Validates course access permissions
- `updatePaymentStatus()`: Updates payment status with auto-approval logic

### 2. useEnrollmentState Hook (`src/hooks/useEnrollmentState.ts`)

React hook that provides enrollment state management with real-time updates.

**Key Features:**
- **Real-time synchronization**: Automatically updates when enrollment status changes
- **Cross-tab synchronization**: Updates across multiple browser tabs
- **Auto-refresh**: Configurable automatic state refresh
- **Error handling**: Graceful error handling with user-friendly messages
- **Loading states**: Proper loading indicators during operations

**Convenience Hooks:**
- `useCourseCardState()`: Optimized for course card components (10s refresh)
- `useAdminEnrollmentState()`: Optimized for admin dashboard (5s refresh)
- `useCourseAccess()`: Simplified course access checking

### 3. Example Components (`src/examples/EnrollmentStateExample.tsx`)

Comprehensive example implementations showing how to use the enrollment state system.

**Components:**
- `EnrollmentStateExample`: Complete course card with enrollment logic
- `CourseListingExample`: Course listing page implementation
- `AdminEnrollmentExample`: Admin approval interface

## Business Logic Implementation

### Payment Type Determination
```typescript
determinePaymentType(paymentMethod: string): PaymentType {
  // Card: credit_card, debit_card, card
  // EFT: eft, bank_transfer, bank
  // Manual: cash, unknown, etc.
}
```

### Approval Requirements
```typescript
shouldRequireApproval(paymentType: PaymentType): boolean {
  // Card payments: No approval required (instant access)
  // EFT payments: Approval required (admin review)
  // Manual payments: Approval required (admin review)
}
```

### Button State Logic
The system determines button text and actions based on:
- User login status
- Enrollment existence and status
- Payment type and status
- Course access permissions

**State Mapping:**
- Not logged in → "Register To Enroll" (redirect to auth)
- Logged in, no enrollment → "Enroll Now" (initiate enrollment)
- Pending EFT payment → "Pending Approval" (disabled, waiting for admin)
- Approved enrollment → "Continue Course" (access course content)
- Failed payment → "Retry Payment" (retry payment flow)

## Database Schema

### Enrollments Table
```sql
CREATE TABLE enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_email TEXT,
  course_id TEXT NOT NULL,
  course_title TEXT,
  status TEXT NOT NULL, -- pending, approved, rejected
  payment_type TEXT, -- card, eft, manual
  payment_status TEXT, -- pending, processing, completed, failed
  payment_reference TEXT,
  ikhokha_transaction_id TEXT,
  requires_approval BOOLEAN DEFAULT FALSE,
  approved_by TEXT,
  approved_at TIMESTAMP,
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  course_access_granted BOOLEAN DEFAULT FALSE,
  access_granted_at TIMESTAMP
);
```

### Enrollment History Table
```sql
CREATE TABLE enrollment_history (
  id TEXT PRIMARY KEY,
  enrollment_id TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by TEXT NOT NULL,
  change_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## State Transitions

### Valid State Transitions
```
PENDING → APPROVED (admin approval or auto-approval)
PENDING → REJECTED (admin rejection)
PENDING → PAYMENT_REQUIRED (payment needed)
PAYMENT_REQUIRED → PAYMENT_PROCESSING (payment initiated)
PAYMENT_PROCESSING → PENDING_APPROVAL (EFT payment completed)
PAYMENT_PROCESSING → APPROVED (card payment completed)
PAYMENT_PROCESSING → FAILED (payment failed)
PENDING_APPROVAL → APPROVED (admin approval)
PENDING_APPROVAL → REJECTED (admin rejection)
APPROVED → COMPLETED (course completed)
REJECTED → PENDING (re-enrollment allowed)
FAILED → PENDING (retry allowed)
```

## Real-time Updates

### Event System
The system uses multiple channels for real-time updates:

1. **Service-level subscriptions**: Direct callbacks from EnrollmentStateManager
2. **DOM events**: Custom events for backward compatibility
3. **Cross-tab sync**: localStorage and BroadcastChannel API
4. **WebSocket integration**: For instant admin notifications

### Event Types
- `enrollment_created`: New enrollment created
- `enrollment_updated`: Enrollment status changed
- `payment_completed`: Payment processing completed
- `admin_approved`: Admin approved enrollment

## Testing

### Test Coverage
- **Unit tests**: EnrollmentStateManager business logic
- **Hook tests**: React hook functionality
- **Integration tests**: Complete enrollment flow validation
- **Requirements validation**: All specification requirements verified

### Test Files
- `src/services/__tests__/EnrollmentStateManager.simple.test.ts`
- `src/hooks/__tests__/useEnrollmentState.simple.test.ts`
- `src/test/integration/enrollment-state-management.integration.test.ts`

## Usage Examples

### Basic Course Card Implementation
```tsx
const CourseCard = ({ course, user }) => {
  const {
    buttonText,
    buttonAction,
    isButtonDisabled,
    hasAccess,
    createEnrollment
  } = useCourseCardState(course.id, user?.id, user?.isLoggedIn);

  const handleButtonClick = async () => {
    switch (buttonAction) {
      case ButtonAction.INITIATE_ENROLLMENT:
        await createEnrollment(user.email, course.title);
        break;
      case ButtonAction.CONTINUE_COURSE:
        navigateToCourse(course.id);
        break;
      // ... other actions
    }
  };

  return (
    <Button onClick={handleButtonClick} disabled={isButtonDisabled}>
      {buttonText}
    </Button>
  );
};
```

### Admin Approval Interface
```tsx
const AdminApproval = ({ enrollmentId }) => {
  const { approveEnrollment, rejectEnrollment } = useAdminEnrollmentState();

  const handleApprove = () => {
    approveEnrollment(enrollmentId, adminId, 'Manual approval');
  };

  const handleReject = () => {
    rejectEnrollment(enrollmentId, 'Insufficient documentation', adminId);
  };

  return (
    <div>
      <Button onClick={handleApprove}>Approve</Button>
      <Button onClick={handleReject}>Reject</Button>
    </div>
  );
};
```

## Security Considerations

### Access Control
- Course access is strictly controlled based on enrollment status
- Only approved enrollments grant course access
- Admin actions are logged with user identification

### Data Validation
- All enrollment operations validate business rules
- State transitions are validated before execution
- Input sanitization for all user-provided data

### Audit Trail
- Complete history of all enrollment status changes
- Admin actions are logged with reasons
- Timestamps and user identification for all changes

## Performance Optimizations

### Caching Strategy
- In-memory caching of frequently accessed enrollments
- Cache invalidation on status updates
- Efficient database queries with proper indexing

### Real-time Updates
- Debounced status updates to prevent excessive API calls
- Efficient event broadcasting to minimize overhead
- Cross-tab synchronization using lightweight mechanisms

## Integration Points

### Payment System Integration
- Automatic enrollment approval for successful card payments
- EFT payment detection for admin approval workflow
- Payment status synchronization with enrollment status

### Admin Dashboard Integration
- Real-time pending enrollments display
- Bulk approval functionality
- Admin action logging and audit capabilities

### Course Access Integration
- Seamless integration with course content delivery
- Access control validation before content access
- Automatic access granting on enrollment approval

## Conclusion

The enrollment state management system provides a robust, scalable solution for managing course enrollments with proper business logic enforcement, real-time updates, and comprehensive audit capabilities. The implementation satisfies all requirements and provides a solid foundation for the production iKhokha payment integration.