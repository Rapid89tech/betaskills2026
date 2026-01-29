/**
 * Environment-aware logging utility
 * Only logs in development mode, silent in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private isDevelopment: boolean;
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 100;

  constructor() {
    this.isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  }

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  private addToHistory(entry: LogEntry): void {
    this.logHistory.unshift(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory = this.logHistory.slice(0, this.maxHistorySize);
    }
  }

  debug(message: string, data?: any): void {
    const entry = this.createLogEntry('debug', message, data);
    this.addToHistory(entry);
    
    if (this.isDevelopment) {
      if (data !== undefined) {
        console.log(`🐛 ${message}`, data);
      } else {
        console.log(`🐛 ${message}`);
      }
    }
  }

  info(message: string, data?: any): void {
    const entry = this.createLogEntry('info', message, data);
    this.addToHistory(entry);
    
    if (this.isDevelopment) {
      if (data !== undefined) {
        console.log(`ℹ️ ${message}`, data);
      } else {
        console.log(`ℹ️ ${message}`);
      }
    }
  }

  warn(message: string, data?: any): void {
    const entry = this.createLogEntry('warn', message, data);
    this.addToHistory(entry);
    
    if (this.isDevelopment) {
      if (data !== undefined) {
        console.warn(`⚠️ ${message}`, data);
      } else {
        console.warn(`⚠️ ${message}`);
      }
    }
  }

  error(message: string, data?: any): void {
    const entry = this.createLogEntry('error', message, data);
    this.addToHistory(entry);
    
    // Always log errors, even in production (but without console.log)
    if (this.isDevelopment) {
      if (data !== undefined) {
        console.error(`❌ ${message}`, data);
      } else {
        console.error(`❌ ${message}`);
      }
    } else {
      // In production, we could send to an error reporting service
      // For now, we'll store in history only
    }
  }

  group(label: string): void {
    if (this.isDevelopment) {
      console.group(label);
    }
  }

  groupCollapsed(label: string): void {
    if (this.isDevelopment) {
      console.groupCollapsed(label);
    }
  }

  groupEnd(): void {
    if (this.isDevelopment) {
      console.groupEnd();
    }
  }

  /**
   * Get recent log history (useful for debugging)
   */
  getHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  /**
   * Clear log history
   */
  clearHistory(): void {
    this.logHistory = [];
  }

  /**
   * Check if we're in development mode
   */
  isDev(): boolean {
    return this.isDevelopment;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export type for external use
export type { LogLevel, LogEntry };