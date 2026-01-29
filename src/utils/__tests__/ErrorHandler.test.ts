import ErrorHandler, { errorHandler } from '../ErrorHandler';

// Mock window methods
const mockReload = jest.fn();
const mockAlert = jest.fn();
const mockConfirm = jest.fn();

Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload,
    href: '',
    pathname: '/test',
    search: ''
  },
  writable: true,
});

Object.defineProperty(window, 'alert', {
  value: mockAlert,
  writable: true,
});

Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
  writable: true,
});

Object.defineProperty(window, 'history', {
  value: {
    back: jest.fn(),
    length: 2
  },
  writable: true,
});

describe('ErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });
  });

  it('should be a singleton', () => {
    const instance1 = ErrorHandler.getInstance();
    const instance2 = ErrorHandler.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1).toBe(errorHandler);
  });

  it('should handle network errors correctly', () => {
    const networkError = new Error('Network request failed');
    const userFriendlyError = errorHandler.handleApiError({
      ...networkError,
      status: 0
    });

    expect(userFriendlyError.message).toContain('Unable to connect to the server');
    expect(userFriendlyError.severity).toBe('medium');
    expect(userFriendlyError.actions).toHaveLength(2);
    expect(userFriendlyError.actions[0].label).toBe('Retry');
  });

  it('should handle 500 errors correctly', () => {
    const serverError = new Error('Internal server error');
    const userFriendlyError = errorHandler.handleApiError({
      ...serverError,
      status: 500
    });

    expect(userFriendlyError.message).toContain('Server is temporarily unavailable');
    expect(userFriendlyError.severity).toBe('high');
  });

  it('should handle 404 errors correctly', () => {
    const notFoundError = new Error('Not found');
    const userFriendlyError = errorHandler.handleApiError({
      ...notFoundError,
      status: 404
    });

    expect(userFriendlyError.message).toContain('requested resource was not found');
    expect(userFriendlyError.severity).toBe('medium');
  });

  it('should handle 401 errors correctly', () => {
    const unauthorizedError = new Error('Unauthorized');
    const userFriendlyError = errorHandler.handleApiError({
      ...unauthorizedError,
      status: 401
    });

    expect(userFriendlyError.message).toContain('session has expired');
    expect(userFriendlyError.severity).toBe('medium');
  });

  it('should handle 403 errors correctly', () => {
    const forbiddenError = new Error('Forbidden');
    const userFriendlyError = errorHandler.handleApiError({
      ...forbiddenError,
      status: 403
    });

    expect(userFriendlyError.message).toContain("don't have permission");
    expect(userFriendlyError.severity).toBe('medium');
  });

  it('should add and remove error listeners', () => {
    const listener = jest.fn();
    
    errorHandler.addErrorListener(listener);
    errorHandler.handleError(new Error('Test error'), 'Test context');
    
    expect(listener).toHaveBeenCalledWith(
      expect.any(Error),
      'Test context'
    );

    errorHandler.removeErrorListener(listener);
    errorHandler.handleError(new Error('Another error'), 'Test context');
    
    // Should only be called once (from before removal)
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should show error messages with actions', () => {
    mockConfirm.mockReturnValue(true);
    const mockAction = jest.fn();

    errorHandler.showErrorMessage('Test message', [
      { label: 'Test Action', action: mockAction, primary: true }
    ]);

    expect(mockConfirm).toHaveBeenCalledWith(
      expect.stringContaining('Test message')
    );
    expect(mockAction).toHaveBeenCalled();
  });

  it('should show simple alert for messages without actions', () => {
    errorHandler.showErrorMessage('Simple message');
    expect(mockAlert).toHaveBeenCalledWith('Simple message');
  });

  it('should handle offline state correctly', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const offlineError = new Error('Network error');
    const userFriendlyError = errorHandler.handleApiError({
      ...offlineError,
      status: 0
    });

    expect(userFriendlyError.message).toContain('check your internet connection');
  });

  it('should attempt recovery for network errors', async () => {
    const networkError = new Error('Network request failed');
    
    // Mock successful recovery
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const canRecover = await errorHandler.attemptRecovery(networkError);
    expect(canRecover).toBe(true);
  });

  it('should attempt recovery for chunk load errors', async () => {
    const chunkError = new Error('Loading chunk 1 failed');
    
    const canRecover = await errorHandler.attemptRecovery(chunkError);
    expect(canRecover).toBe(true);
    expect(mockReload).toHaveBeenCalled();
  });

  it('should return false for non-recoverable errors', async () => {
    const genericError = new Error('Some other error');
    
    const canRecover = await errorHandler.attemptRecovery(genericError);
    expect(canRecover).toBe(false);
  });
});