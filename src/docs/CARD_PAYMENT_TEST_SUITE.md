# Card Payment Flow Test Suite Documentation

## Overview

This comprehensive test suite validates the complete card payment flow from webhook receipt to course access granting. The test suite ensures that card payments result in immediate enrollment approval and course access, meeting all performance and reliability requirements.

## Test Categories

### 1. End-to-End Workflow Tests (`src/test/e2e/card-payment-flow.e2e.test.ts`)

**Purpose**: Validates the complete card payment workflow from webhook to course access.

**Test Scenarios**:
- Complete card payment processing workflow
- Immediate UI updates after card payment
- Enrollment status persistence across browser sessions
- Error handling for webhook validation failures
- Fallback to manual approval when payment type detection fails
- Recovery from real-time sync failures
- Performance requirements (under 2 seconds processing)
- Concurrent card payment handling
- Cross-tab synchronization

**Requirements Covered**: 1.1, 2.1, 3.1, 4.1

### 2. Webhook Simulation Tests (`src/test/webhook/webhook-simulation.test.ts`)

**Purpose**: Tests various webhook delivery scenarios and payment types.

**Test Scenarios**:
- Different card types (Visa, Mastercard, Amex)
- Various payment amounts (small, large)
- EFT payment detection and routing
- Webhook timing scenarios (immediate, delayed)
- Edge cases (missing metadata, invalid status, unknown card brands)
- Webhook retry scenarios (duplicates, timeouts)
- Concurrent webhook processing

**Requirements Covered**: 2.1, 4.1

### 3. Multi-Tab Real-Time Sync Tests (`src/test/realtime/multi-tab-sync.test.ts`)

**Purpose**: Validates real-time synchronization across multiple browser tabs.

**Test Scenarios**:
- Cross-tab enrollment status synchronization
- Enrollment status conflict resolution
- Rapid status change consistency
- Course access synchronization
- UI state consistency across tabs
- Button state changes coordination
- Performance under multiple tabs (10 simultaneous tabs)
- Network connectivity scenarios (offline/online transitions)
- Data consistency verification

**Requirements Covered**: 3.1, 3.2, 3.3

### 4. High-Volume Performance Tests (`src/test/performance/high-volume-processing.test.ts`)

**Purpose**: Validates system performance under high load conditions.

**Test Scenarios**:
- 100 concurrent card payments
- Sustained load testing (5 batches of 50 payments)
- Burst traffic patterns
- Memory usage stability during extended processing
- Memory pressure handling
- Response time consistency under varying load
- Timeout scenario handling
- Minimum throughput requirements (20 payments/second)
- Throughput scaling with concurrency
- Error handling performance under load
- Recovery from temporary failures

**Requirements Covered**: 1.1, 2.1, 4.1

## Running the Tests

### Complete Test Suite
```bash
npm run test:card-payment
```

### Individual Test Categories
```bash
# End-to-End Tests
npm run test:card-payment:e2e

# Webhook Simulation Tests
npm run test:card-payment:webhook

# Real-Time Sync Tests
npm run test:card-payment:realtime

# Performance Tests
npm run test:card-payment:performance
```

### With Coverage
```bash
npm run test:card-payment:coverage
```

## Test Configuration

The test suite uses a specialized Vitest configuration (`vitest.config.card-payment.ts`) optimized for:
- Extended timeouts for performance tests (30 seconds)
- Proper concurrency settings for load testing
- Coverage reporting for card payment services
- Performance monitoring and heap usage tracking

## Performance Requirements

The test suite validates the following performance requirements:

| Metric | Requirement | Validation |
|--------|-------------|------------|
| Processing Time | < 2 seconds per payment | ✅ E2E Tests |
| Throughput | > 10 payments/second | ✅ Performance Tests |
| Concurrent Processing | 100 simultaneous payments | ✅ Performance Tests |
| Memory Growth | < 100MB for extended processing | ✅ Performance Tests |
| Success Rate | > 95% under normal load | ✅ All Tests |
| Cross-Tab Sync | < 2 seconds update propagation | ✅ Real-Time Tests |

## Test Reports

After running the complete test suite, reports are generated in:
- `reports/card-payment/test-report.json` - Structured test results
- `reports/card-payment/test-report.md` - Human-readable report
- `reports/card-payment/performance-report.json` - Performance metrics
- `coverage/card-payment/` - Code coverage reports

## Services Under Test

The test suite validates the following services:

### PaymentTypeDetector
- Card payment detection accuracy
- EFT payment identification
- Confidence scoring system
- Edge case handling

### CardPaymentFastTrack
- Immediate enrollment approval
- Fast-track processing workflow
- Error handling and recovery
- Audit trail logging

### EnhancedRealTimeSync
- Cross-tab synchronization
- Real-time status broadcasting
- UI update coordination
- Conflict resolution

### CourseAccessController
- Immediate access granting
- Access validation
- Persistence across sessions
- Security measures

## Mock Strategy

The test suite uses comprehensive mocking for:
- **localStorage/sessionStorage**: For persistence testing
- **BroadcastChannel**: For cross-tab communication
- **Network requests**: For webhook simulation
- **Time-based operations**: For performance measurement
- **Memory monitoring**: For resource usage tracking

## Error Scenarios Tested

1. **Webhook Validation Failures**
   - Invalid signatures
   - Malformed payloads
   - Missing required fields

2. **Payment Processing Errors**
   - Failed payment status
   - Network timeouts
   - Database connection issues

3. **Real-Time Sync Failures**
   - Broadcast channel failures
   - Cross-tab conflicts
   - Network connectivity issues

4. **Performance Degradation**
   - Memory pressure scenarios
   - High concurrency stress
   - Sustained load conditions

## Continuous Integration

The test suite is designed for CI/CD integration with:
- Structured JSON output for automated parsing
- Exit codes indicating success/failure
- Performance benchmarking for regression detection
- Coverage thresholds enforcement

## Troubleshooting

### Common Issues

1. **Test Timeouts**
   - Increase timeout in `vitest.config.card-payment.ts`
   - Check system resources during performance tests

2. **Memory Issues**
   - Monitor heap usage during tests
   - Ensure proper cleanup in test teardown

3. **Flaky Tests**
   - Tests include retry configuration (2 retries)
   - Check for race conditions in async operations

4. **Coverage Issues**
   - Ensure all services are properly imported
   - Check exclude patterns in coverage configuration

### Debug Mode

For detailed debugging, run tests with:
```bash
DEBUG=1 npm run test:card-payment
```

This enables verbose logging and detailed error reporting.

## Future Enhancements

Planned improvements to the test suite:
1. Visual regression testing for UI components
2. Integration with production monitoring
3. Automated performance regression detection
4. Load testing with realistic user patterns
5. Security penetration testing scenarios

## Contributing

When adding new tests:
1. Follow the existing test structure and naming conventions
2. Include proper documentation and comments
3. Ensure tests are deterministic and not flaky
4. Add appropriate performance assertions
5. Update this documentation with new test scenarios