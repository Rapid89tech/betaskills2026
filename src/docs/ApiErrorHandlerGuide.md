# API Error Handler Integration Guide

This guide explains how to use the centralized API error handling system with retry logic, network connectivity detection, and offline support.

## Overview

The API Error Handler provides:
- **Automatic retry with exponential backoff** for transient failures
- **Network connectivity detection** and offline handling
- **Request queuing** when offline with automatic sync when online
- **User-friendly error messages** converted from technical errors
- **Enhanced Supabase integration** with centralized error handling

## Components

### 1. ApiErrorHandler (`src/utils/ApiErrorHandler.ts`)
Core utility that handles API requests with retry logic and error handling.

### 2. ApiService (`src/services/apiService.ts`)
Service layer that integrates ApiErrorHandler with Supabase operations.

### 3. EnhancedEnrollmentService (`src/services/enhancedEnrollmentService.ts`)
Example service showing how to use the API error handling in practice.

## Basic Usage

### Using ApiErrorHandler directly

```typescript
import { apiErrorHandler } from '@/utils/ApiErrorHandler';

// Simple fetch with retry
try {
  const response = await apiErrorHandler.fetchWithRetry('/api/data');
  const data = await response.json();
} catch (error) {
  // Error is automatically handled with user-friendly messages
  console.error('Request failed:', error);
}

// Custom retry configuration
const response = await apiErrorHandler.fetchWithRetry('/api/data', {
  method: 'POST',
  body: JSON.stringify({ data: 'example' })
}, {
  maxRetries: 5,
  baseDelay: 2000,
  maxDelay: 30000,
  backoffMultiplier: 1.5
});
```

### Using ApiService for Supabase operations

```typescript
import { apiService } from '@/services/apiService';

// Enhanced select with retry
const result = await apiService.select('users', 'id, name, email');
if (result.error) {
  // Error contains user-friendly message
  console.error('User-friendly error:', result.error.userMessage);
} else {
  console.log('Users:', result.data);
}

// Enhanced insert (automatically skips retry to avoid duplicates)
const newUser = await apiService.insert('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Enhanced update with custom retry config
const updatedUser = await apiService.update(
  'users',
  { name: 'Jane Doe' },
  { column: 'id', value: userId },
  {
    retryConfig: {
      maxRetries: 2,
      baseDelay: 1500
    }
  }
);
```

### Using Enhanced Services

```typescript
import { enhancedEnrollmentService } from '@/services/enhancedEnrollmentService';

// Create enrollment with error handling
try {
  const result = await enhancedEnrollmentService.createEnrollment({
    user_id: 'user123',
    user_email: 'user@example.com',
    course_id: 'course456',
    course_title: 'Example Course',
    status: 'pending'
  });
  
  if (result.success) {
    console.log('Enrollment created:', result.data);
  }
} catch (error) {
  // Error is user-friendly and actionable
  console.error('Enrollment failed:', error.message);
}

// Get enrollments with offline fallback
const enrollments = await enhancedEnrollmentService.getUserEnrollments('user123');
// Returns cached data if API fails
```

## Network Status Monitoring

```typescript
import { enhancedEnrollmentService } from '@/services/enhancedEnrollmentService';

// Get current network status
const networkInfo = enhancedEnrollmentService.getNetworkInfo();
console.log('Online:', networkInfo.isOnline);
console.log('Queued requests:', networkInfo.retryQueueLength);

// Listen for network events
window.addEventListener('online', () => {
  console.log('Connection restored - queued requests will be processed');
});

window.addEventListener('offline', () => {
  console.log('Connection lost - requests will be queued');
});
```

## Error Handling Patterns

### Retryable vs Non-Retryable Operations

```typescript
// Retryable operations (reads, updates)
const data = await apiService.select('table', '*', {
  retryConfig: { maxRetries: 3 }
});

// Non-retryable operations (inserts, deletes)
const result = await apiService.insert('table', data, {
  skipRetry: true // Prevents duplicate inserts
});
```

### Offline Support

```typescript
// Operations automatically queue when offline
try {
  await enhancedEnrollmentService.saveUserProgress(progressData);
} catch (error) {
  // Progress is cached locally and will sync when online
  console.log('Progress cached for offline sync');
}

// Manual sync when connection restored
await enhancedEnrollmentService.syncOfflineData();
```

### Custom Error Messages

The system automatically converts technical errors to user-friendly messages:

- **Network errors**: "Unable to connect to the server. Please check your internet connection."
- **Authentication errors**: "Your session has expired. Please log in again."
- **Permission errors**: "You don't have permission to perform this action."
- **Validation errors**: "The data you entered is invalid. Please check your information."
- **Server errors**: "The server is temporarily unavailable. Please try again in a few moments."

## Configuration Options

### Retry Configuration

```typescript
interface RetryConfig {
  maxRetries: number;        // Maximum number of retry attempts (default: 3)
  baseDelay: number;         // Base delay in milliseconds (default: 1000)
  maxDelay: number;          // Maximum delay in milliseconds (default: 30000)
  backoffMultiplier: number; // Exponential backoff multiplier (default: 2)
  retryableStatuses: number[]; // HTTP status codes that trigger retries
}
```

### API Service Configuration

```typescript
interface ApiServiceConfig {
  retryConfig?: Partial<RetryConfig>; // Custom retry settings
  skipRetry?: boolean;                // Skip retry for this operation
  timeout?: number;                   // Request timeout in milliseconds
}
```

## Best Practices

### 1. Use Appropriate Retry Settings
- **Read operations**: Enable retries with reasonable limits
- **Write operations**: Be careful with retries to avoid duplicates
- **Critical operations**: Use higher retry counts and longer delays

### 2. Handle Offline Scenarios
- Cache important data locally
- Provide offline functionality where possible
- Queue operations for sync when online

### 3. Provide User Feedback
- Show loading states during retries
- Display network status to users
- Provide clear error messages with actionable steps

### 4. Monitor and Debug
- Use the demo component to test error handling
- Monitor retry queue length
- Log important events for debugging

## Testing

Use the `ApiErrorHandlerDemo` component to test the error handling system:

```typescript
import ApiErrorHandlerDemo from '@/components/ApiErrorHandlerDemo';

// Add to your development routes
<Route path="/api-demo" element={<ApiErrorHandlerDemo />} />
```

The demo component provides:
- Network status monitoring
- Test buttons for different scenarios
- Real-time retry queue information
- Test result history

## Migration from Existing Code

To migrate existing API calls to use the new error handling:

1. **Replace direct fetch calls**:
   ```typescript
   // Before
   const response = await fetch('/api/data');
   
   // After
   const response = await apiErrorHandler.fetchWithRetry('/api/data');
   ```

2. **Replace direct Supabase calls**:
   ```typescript
   // Before
   const { data, error } = await supabase.from('table').select('*');
   
   // After
   const result = await apiService.select('table', '*');
   ```

3. **Add error handling**:
   ```typescript
   // Before
   if (error) {
     console.error(error);
   }
   
   // After
   if (result.error) {
     // User-friendly error message available
     showToast(result.error.userMessage);
   }
   ```

## Troubleshooting

### Common Issues

1. **Requests not retrying**: Check if the error status is in `retryableStatuses`
2. **Duplicate operations**: Use `skipRetry: true` for insert/delete operations
3. **Offline queue not working**: Ensure localStorage is available and not full
4. **Network detection issues**: Check browser support for online/offline events

### Debug Information

```typescript
// Get current network status
const status = apiErrorHandler.getNetworkStatus();

// Get retry queue length
const queueLength = apiErrorHandler.getRetryQueueLength();

// Clear retry queue for testing
apiErrorHandler.clearRetryQueue();
```