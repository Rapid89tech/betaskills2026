# EnrollmentManager Service Documentation

## Overview

The `EnrollmentManager` is a central service that handles all enrollment operations in the real-time enrollment system. It provides methods for processing EFT and card payments, managing admin approval workflows, and broadcasting real-time updates across the application.

## Features

- **EFT Payment Processing**: Creates pending enrollments that require admin approval
- **Card Payment Processing**: Provides immediate access upon successful payment
- **Real-time Updates**: Broadcasts enrollment status changes via WebSocket connections
- **Admin Operations**: Approval and rejection workflows with proper notifications
- **Cross-tab Synchronization**: Ensures consistent state across browser tabs
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Subscription System**: Event-driven updates for UI components

## Installation & Setup

```typescript
import { enrollmentManager } from '@/services/EnrollmentManager';
```

The service is implemented as a singleton and automatically initializes real-time subscriptions when first accessed.

## API Reference

### Core Methods

#### `processEFTEnrollment(userId: string, courseId: string, paymentDetails?: PaymentDetails): Promise<EnrollmentResult>`

Creates a pending enrollment for EFT payments that requires admin approval.

**Parameters:**
- `userId`: The ID of the user enrolling
- `courseId`: The ID of the course to enroll in
- `paymentDetails`: Optional payment information (amount, currency, reference)

**Returns:** `Promise<EnrollmentResult>` with success status and enrollment data

**Example:**
```typescript
const result = await enrollmentManager.processEFTEnrollment('user123', 'course456', {
  amount: 500,
  currency: 'ZAR',
  reference: 'EFT123456'
});

if (result.success) {
  console.log('EFT enrollment created:', result.enrollment);
} else {
  console.error('Error:', result.error);
}
```

#### `processCardEnrollment(userId: string, courseId: string, paymentDetails: PaymentDetails): Promise<EnrollmentResult>`

Processes card payment and creates approved enrollment with immediate access.

**Parameters:**
- `userId`: The ID of the user enrolling
- `courseId`: The ID of the course to enroll in
- `paymentDetails`: Payment information (amount, currency)

**Returns:** `Promise<EnrollmentResult>` with success status and enrollment data

**Example:**
```typescript
const result = await enrollmentManager.processCardEnrollment('user123', 'course456', {
  amount: 500,
  currency: 'ZAR'
});

if (result.success) {
  console.log('Card enrollment approved:', result.enrollment);
  // User now has immediate access to course
}
```

#### `approveEnrollment(enrollmentId: string, adminId: string): Promise<void>`

Approves a pending enrollment (admin operation).

**Parameters:**
- `enrollmentId`: The ID of the enrollment to approve
- `adminId`: The ID of the admin performing the approval

**Example:**
```typescript
try {
  await enrollmentManager.approveEnrollment('enrollment123', 'admin456');
  console.log('Enrollment approved successfully');
} catch (error) {
  console.error('Failed to approve enrollment:', error);
}
```

#### `rejectEnrollment(enrollmentId: string, adminId: string, reason: string): Promise<void>`

Rejects a pending enrollment with a reason (admin operation).

**Parameters:**
- `enrollmentId`: The ID of the enrollment to reject
- `adminId`: The ID of the admin performing the rejection
- `reason`: The reason for rejection

**Example:**
```typescript
try {
  await enrollmentManager.rejectEnrollment('enrollment123', 'admin456', 'Invalid payment proof');
  console.log('Enrollment rejected successfully');
} catch (error) {
  console.error('Failed to reject enrollment:', error);
}
```

### Query Methods

#### `getEnrollmentStatus(userId: string, courseId: string): Promise<Enrollment | null>`

Gets the enrollment status for a specific user and course.

**Returns:** `Promise<Enrollment | null>` - The enrollment object or null if not found

#### `getPendingEFTEnrollments(): Promise<Enrollment[]>`

Gets all pending EFT enrollments (admin function).

**Returns:** `Promise<Enrollment[]>` - Array of pending EFT enrollments

#### `getUserEnrollments(userId: string): Promise<Enrollment[]>`

Gets all enrollments for a specific user.

**Returns:** `Promise<Enrollment[]>` - Array of user enrollments

### Subscription Methods

#### `subscribeToEnrollmentUpdates(callback: EnrollmentUpdateCallback): () => void`

Subscribes to enrollment status updates.

**Parameters:**
- `callback`: Function to call when enrollment updates occur

**Returns:** Unsubscribe function

**Example:**
```typescript
const unsubscribe = enrollmentManager.subscribeToEnrollmentUpdates((update) => {
  console.log('Enrollment update:', update);
  
  if (update.status === EnrollmentStatus.APPROVED) {
    // Handle approval
    showSuccessNotification('Enrollment approved!');
  }
});

// Later, unsubscribe
unsubscribe();
```

#### `subscribeToAdminUpdates(callback: AdminUpdateCallback): () => void`

Subscribes to admin-relevant updates (new enrollments, etc.).

**Parameters:**
- `callback`: Function to call when admin updates occur

**Returns:** Unsubscribe function

## Real-time Updates

The EnrollmentManager automatically handles real-time updates through WebSocket connections. When enrollment status changes occur, all subscribed components receive immediate notifications.

### Update Types

- `ENROLLMENT_CREATED`: New enrollment created
- `ENROLLMENT_APPROVED`: Enrollment approved by admin
- `ENROLLMENT_REJECTED`: Enrollment rejected by admin

### Cross-tab Synchronization

The service automatically synchronizes enrollment status across browser tabs using custom events:

```typescript
// These events are automatically dispatched
window.addEventListener('enrollment-created', (event) => {
  console.log('New enrollment:', event.detail);
});

window.addEventListener('enrollment-approved', (event) => {
  console.log('Enrollment approved:', event.detail);
});

window.addEventListener('enrollment-rejected', (event) => {
  console.log('Enrollment rejected:', event.detail);
});
```

## Error Handling

The service provides comprehensive error handling with specific error codes:

```typescript
import { ENROLLMENT_ERROR_CODES } from '@/constants/enrollment';

const result = await enrollmentManager.processEFTEnrollment(userId, courseId);

if (!result.success) {
  switch (result.errorCode) {
    case ENROLLMENT_ERROR_CODES.DUPLICATE_ENROLLMENT:
      // Handle duplicate enrollment
      break;
    case ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED:
      // Handle payment failure
      break;
    case ENROLLMENT_ERROR_CODES.NETWORK_ERROR:
      // Handle network issues
      break;
    default:
      // Handle other errors
      break;
  }
}
```

## React Integration

### Basic Usage in Components

```typescript
import React, { useState, useEffect } from 'react';
import { enrollmentManager } from '@/services/EnrollmentManager';
import { Enrollment, EnrollmentUpdate } from '@/types/enrollment';

const CourseCard: React.FC<{ userId: string; courseId: string }> = ({ userId, courseId }) => {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(false);

  // Load initial enrollment status
  useEffect(() => {
    enrollmentManager.getEnrollmentStatus(userId, courseId)
      .then(setEnrollment)
      .catch(console.error);
  }, [userId, courseId]);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = enrollmentManager.subscribeToEnrollmentUpdates((update) => {
      if (update.userId === userId && update.courseId === courseId) {
        // Reload enrollment status
        enrollmentManager.getEnrollmentStatus(userId, courseId)
          .then(setEnrollment)
          .catch(console.error);
      }
    });

    return unsubscribe;
  }, [userId, courseId]);

  const handleEnroll = async (paymentType: 'EFT' | 'CARD') => {
    setLoading(true);
    try {
      const paymentDetails = { amount: 500, currency: 'ZAR' };
      
      const result = paymentType === 'EFT' 
        ? await enrollmentManager.processEFTEnrollment(userId, courseId, paymentDetails)
        : await enrollmentManager.processCardEnrollment(userId, courseId, paymentDetails);

      if (result.success) {
        setEnrollment(result.enrollment!);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {enrollment ? (
        <div>Status: {enrollment.status}</div>
      ) : (
        <div>
          <button onClick={() => handleEnroll('EFT')} disabled={loading}>
            EFT Payment
          </button>
          <button onClick={() => handleEnroll('CARD')} disabled={loading}>
            Card Payment
          </button>
        </div>
      )}
    </div>
  );
};
```

### Custom Hook

```typescript
import { useState, useEffect } from 'react';
import { enrollmentManager } from '@/services/EnrollmentManager';
import { Enrollment } from '@/types/enrollment';

export const useEnrollmentStatus = (userId: string, courseId: string) => {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEnrollment = async () => {
      try {
        setLoading(true);
        setError(null);
        const status = await enrollmentManager.getEnrollmentStatus(userId, courseId);
        setEnrollment(status);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEnrollment();

    // Subscribe to real-time updates
    const unsubscribe = enrollmentManager.subscribeToEnrollmentUpdates((update) => {
      if (update.userId === userId && update.courseId === courseId) {
        loadEnrollment();
      }
    });

    return unsubscribe;
  }, [userId, courseId]);

  return { enrollment, loading, error };
};
```

## Testing

The service includes comprehensive unit tests covering all functionality:

```bash
npm run test:run -- src/services/__tests__/EnrollmentManager.test.ts
```

Test coverage includes:
- EFT enrollment processing
- Card enrollment processing
- Admin operations (approve/reject)
- Real-time subscription system
- Error handling scenarios
- Singleton pattern verification
- Resource cleanup

## Performance Considerations

- **Singleton Pattern**: Single instance reduces memory usage
- **Event-driven Updates**: Efficient real-time synchronization
- **Optimistic UI**: Immediate feedback with rollback on errors
- **Connection Management**: Automatic WebSocket reconnection
- **Error Recovery**: Graceful handling of network issues

## Security

- **Input Validation**: All inputs are validated before processing
- **Admin Authorization**: Admin operations require proper permissions
- **Payment Security**: Secure handling of payment information
- **Audit Logging**: All operations are logged for security review

## Migration from Legacy Services

If migrating from existing enrollment services:

1. Replace direct Supabase calls with EnrollmentManager methods
2. Update components to use the subscription system
3. Remove manual real-time subscription setup
4. Update error handling to use new error codes
5. Test cross-tab synchronization functionality

## Troubleshooting

### Common Issues

1. **Real-time updates not working**: Check WebSocket connection and subscription setup
2. **Duplicate enrollments**: Ensure proper duplicate checking logic
3. **Payment processing failures**: Verify payment gateway integration
4. **Cross-tab sync issues**: Check browser event handling

### Debug Mode

Enable debug logging:

```typescript
// In development, the service logs all operations to console
console.log('EnrollmentManager operations are logged in development mode');
```

## Future Enhancements

- Payment gateway integration
- Offline support with queue management
- Advanced analytics and reporting
- Bulk enrollment operations
- Custom notification preferences