/**
 * Error Recovery Utility
 * Handles chunk loading errors and other runtime issues
 */

interface ErrorRecoveryOptions {
  maxRetries?: number;
  retryDelay?: number;
  enableAutoReload?: boolean;
}

class ErrorRecovery {
  private retryCount = 0;
  private maxRetries: number;
  private retryDelay: number;
  private enableAutoReload: boolean;

  constructor(options: ErrorRecoveryOptions = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.enableAutoReload = options.enableAutoReload !== false;
  }

  /**
   * Check if an error is a chunk loading error
   */
  isChunkLoadError(error: Error | string): boolean {
    const message = typeof error === 'string' ? error : error.message;
    return (
      message.includes('Loading chunk') ||
      message.includes('ChunkLoadError') ||
      message.includes('Loading CSS chunk') ||
      (typeof error === 'object' && error.name === 'ChunkLoadError')
    );
  }

  /**
   * Handle chunk loading errors with retry mechanism
   */
  async handleChunkError(error: Error, retryFn?: () => Promise<any>): Promise<void> {
    console.warn('Chunk loading error detected:', error.message);

    if (this.retryCount < this.maxRetries && retryFn) {
      this.retryCount++;
      console.log(`Retrying... Attempt ${this.retryCount}/${this.maxRetries}`);
      
      try {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        await retryFn();
        this.retryCount = 0; // Reset on success
      } catch (retryError) {
        if (this.retryCount >= this.maxRetries) {
          this.handleFinalFailure();
        } else {
          return this.handleChunkError(retryError as Error, retryFn);
        }
      }
    } else {
      this.handleFinalFailure();
    }
  }

  /**
   * Handle final failure after all retries
   */
  private handleFinalFailure(): void {
    console.error('All retry attempts failed. Reloading page...');
    
    if (this.enableAutoReload) {
      // Show user-friendly message before reload
      const message = document.createElement('div');
      message.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          font-family: system-ui, -apple-system, sans-serif;
        ">
          <div style="text-align: center; padding: 20px;">
            <h2 style="margin-bottom: 10px;">Loading Issue Detected</h2>
            <p style="margin-bottom: 20px;">Refreshing the page to fix the issue...</p>
            <div style="
              width: 40px;
              height: 40px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #3498db;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto;
            "></div>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      
      document.body.appendChild(message);
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  /**
   * Reset retry count
   */
  reset(): void {
    this.retryCount = 0;
  }
}

// Export singleton instance
export const errorRecovery = new ErrorRecovery();

/**
 * Wrapper for dynamic imports with retry mechanism
 */
export const retryImport = <T>(
  importFn: () => Promise<T>,
  retries = 3
): Promise<T> => {
  return importFn().catch((error) => {
    if (retries > 0 && errorRecovery.isChunkLoadError(error)) {
      console.warn(`Import failed, retrying... ${retries} attempts left`);
      return new Promise<T>((resolve) => {
        setTimeout(() => {
          resolve(retryImport(importFn, retries - 1));
        }, 1000);
      });
    }
    throw error;
  });
};

/**
 * Setup global error handlers
 */
export const setupGlobalErrorHandlers = (): void => {
  // Handle unhandled errors
  window.addEventListener('error', (event) => {
    if (errorRecovery.isChunkLoadError(event.message)) {
      event.preventDefault();
      errorRecovery.handleChunkError(new Error(event.message));
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (errorRecovery.isChunkLoadError(event.reason)) {
      event.preventDefault();
      errorRecovery.handleChunkError(event.reason);
    }
  });
};