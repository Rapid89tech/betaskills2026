# Comprehensive Testing Suite

This directory contains comprehensive tests for the fixed components in the Beta Skill application, covering courses page components, admin dashboard functionality, and payment processing flow.

## Test Structure

### 1. Unit Tests for Courses Page Components

**Location**: `src/pages/__tests__/Courses.test.tsx`, `src/hooks/__tests__/useFastCourses.test.ts`, `src/hooks/__tests__/useCoursePriorities.test.ts`

**Coverage**:
- Course data loading and validation
- Course priority calculation system
- Course filtering and search functionality
- Error handling and fallback mechanisms
- Loading states and user feedback
- Data structure consistency
- Performance optimization

**Key Test Cases**:
- ✅ Course page renders without errors
- ✅ Course data loads correctly from featured courses
- ✅ Course priority calculation based on enrollment status
- ✅ Course filtering by category, availability, and keywords
- ✅ Error handling for invalid course data
- ✅ Loading states during data fetching
- ✅ Empty states when no courses available
- ✅ Performance with large course datasets

### 2. Integration Tests for Admin Dashboard Functionality

**Location**: `src/components/admin/__tests__/FastAdminDashboard.integration.test.tsx`

**Coverage**:
- Admin dashboard data loading and display
- Enrollment management operations
- User management functionality
- Real-time updates and subscriptions
- Error handling and recovery
- Bulk operations for enrollments
- Action feedback and notifications

**Key Test Cases**:
- ✅ Dashboard loads with correct statistics
- ✅ Enrollment approval/rejection functionality
- ✅ Bulk enrollment operations
- ✅ User management and role display
- ✅ Real-time enrollment updates
- ✅ Error states and retry mechanisms
- ✅ Loading states during operations
- ✅ Action feedback with toast notifications

### 3. End-to-End Tests for Payment Processing Flow

**Location**: `src/services/__tests__/PaymentProcessing.e2e.test.ts`

**Coverage**:
- Complete payment flow from initialization to verification
- Production and test mode payment processing
- Webhook handling and validation
- Payment security and validation
- Error recovery and retry logic
- Transaction history and reporting
- Refund processing
- Payment update subscriptions

**Key Test Cases**:
- ✅ Complete payment flow in test mode
- ✅ Complete payment flow in production mode
- ✅ Payment webhook processing
- ✅ Payment validation and security checks
- ✅ Error handling for network failures
- ✅ Transaction history retrieval
- ✅ Refund processing (full and partial)
- ✅ Payment update notifications

## Test Utilities

### Test Runner (`src/test/testRunner.ts`)

Provides utilities for:
- Mock setup for different test environments
- Test data factories for consistent test data
- Performance testing utilities
- Common test assertions
- Network simulation and delay utilities

### Mock Setup

```typescript
import { mockSetup } from '@/test/testRunner';

// Setup all common mocks
mockSetup.setupAllMocks();

// Or setup specific mocks
mockSetup.setupCoursesPageMocks();
mockSetup.setupAdminDashboardMocks();
mockSetup.setupPaymentProcessingMocks();
```

### Test Data Factories

```typescript
import { testDataFactory } from '@/test/testRunner';

// Create mock course data
const mockCourse = testDataFactory.createMockCourse({
  title: 'Custom Course Title',
  price: 399
});

// Create mock enrollment data
const mockEnrollment = testDataFactory.createMockEnrollment({
  status: 'approved'
});
```

## Running Tests

### Run All Tests
```bash
npm run test
```

### Run Specific Test Suites
```bash
# Unit tests only
npm run test -- --testPathPattern="unit"

# Integration tests only
npm run test -- --testPathPattern="integration"

# End-to-end tests only
npm run test -- --testPathPattern="e2e"
```

### Run Tests with Coverage
```bash
npm run test -- --coverage
```

### Run Tests in Watch Mode
```bash
npm run test -- --watch
```

### Run Tests with UI
```bash
npm run test:ui
```

## Test Configuration

Tests are configured with different timeouts and retry policies:

- **Unit Tests**: 10s timeout, 2 retries, coverage enabled
- **Integration Tests**: 30s timeout, 1 retry, coverage enabled
- **End-to-End Tests**: 60s timeout, 0 retries, coverage disabled

## Coverage Requirements

The test suite aims for:
- **Unit Tests**: 90%+ coverage
- **Integration Tests**: 80%+ coverage
- **End-to-End Tests**: Critical path coverage

## Test Environment

Tests run in a controlled environment with:
- Mocked external dependencies
- Simulated network conditions
- Controlled timing for async operations
- Consistent test data

## Debugging Tests

### Enable Debug Logging
```bash
DEBUG=true npm run test
```

### Run Single Test File
```bash
npm run test -- Courses.test.tsx
```

### Run Tests with Verbose Output
```bash
npm run test -- --verbose
```

## Test Maintenance

### Adding New Tests

1. Follow the existing test structure
2. Use test utilities from `testRunner.ts`
3. Include both happy path and error scenarios
4. Add performance tests for critical operations
5. Update this documentation

### Updating Existing Tests

1. Maintain backward compatibility
2. Update test data factories if needed
3. Ensure coverage requirements are met
4. Test both success and failure scenarios

## Performance Testing

Tests include performance assertions to ensure:
- Course loading completes within 5 seconds
- Admin dashboard operations complete within 10 seconds
- Payment processing completes within 30 seconds
- Large datasets are handled efficiently

## Security Testing

Payment processing tests include:
- Input validation testing
- Signature verification testing
- Error handling for security failures
- Production vs test mode validation

## Continuous Integration

Tests are designed to run in CI environments with:
- Deterministic behavior
- No external dependencies
- Consistent timing
- Clear failure reporting

## Troubleshooting

### Common Issues

1. **Timeout Errors**: Increase timeout in test configuration
2. **Mock Failures**: Check mock setup in `beforeEach`
3. **Async Issues**: Use `waitFor` for async operations
4. **Memory Leaks**: Ensure proper cleanup in `afterEach`

### Debug Tips

1. Use `screen.debug()` to inspect rendered components
2. Add `console.log` statements in test utilities
3. Check mock call counts with `expect(mockFn).toHaveBeenCalledTimes(n)`
4. Use `act()` wrapper for state updates

## Contributing

When adding new tests:
1. Follow the existing patterns
2. Include comprehensive error scenarios
3. Add performance assertions where appropriate
4. Update documentation
5. Ensure tests pass in CI environment