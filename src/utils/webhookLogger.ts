// Enhanced webhook logging utility

export interface WebhookLogEntry {
  id: string;
  timestamp: string;
  type: 'webhook_sent' | 'webhook_retry' | 'webhook_failed';
  action: string;
  invoice_id?: string;
  user_id?: string;
  payload: any;
  status: 'pending' | 'success' | 'failed';
  processing_time_ms: number;
  error?: string;
  retry_count?: number;
  user_agent: string;
  session_id: string;
  environment: string;
}

class WebhookLogger {
  private static readonly LOG_KEY = 'webhook_logs';
  private static readonly MAX_LOGS = 100;

  static log(entry: Omit<WebhookLogEntry, 'timestamp' | 'session_id' | 'user_agent' | 'environment'>): string {
    const logEntry: WebhookLogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      session_id: sessionStorage.getItem('session_id') || this.generateSessionId(),
      user_agent: navigator.userAgent,
      environment: process.env.NODE_ENV || 'development'
    };

    this.saveLog(logEntry);
    this.printConsoleLog(logEntry);
    
    return logEntry.id;
  }

  static updateStatus(logId: string, status: 'success' | 'failed', error?: string, processingTime?: number): void {
    const logs = this.getLogs();
    const logIndex = logs.findIndex(log => log.id === logId);
    
    if (logIndex !== -1) {
      logs[logIndex].status = status;
      if (error) logs[logIndex].error = error;
      if (processingTime) logs[logIndex].processing_time_ms = processingTime;
      
      localStorage.setItem(this.LOG_KEY, JSON.stringify(logs));
      this.printConsoleLog(logs[logIndex]);
    }
  }

  static getLogs(): WebhookLogEntry[] {
    try {
      return JSON.parse(localStorage.getItem(this.LOG_KEY) || '[]');
    } catch {
      return [];
    }
  }

  static clearLogs(): void {
    localStorage.removeItem(this.LOG_KEY);
    console.log('🧹 Webhook logs cleared');
  }

  static exportLogs(): string {
    return JSON.stringify(this.getLogs(), null, 2);
  }

  static getStatistics() {
    const logs = this.getLogs();
    return {
      total: logs.length,
      success: logs.filter(log => log.status === 'success').length,
      failed: logs.filter(log => log.status === 'failed').length,
      pending: logs.filter(log => log.status === 'pending').length,
      averageProcessingTime: logs.reduce((sum, log) => sum + log.processing_time_ms, 0) / logs.length || 0,
      lastHour: logs.filter(log => 
        new Date(log.timestamp).getTime() > Date.now() - 60 * 60 * 1000
      ).length
    };
  }

  private static saveLog(entry: WebhookLogEntry): void {
    const logs = this.getLogs();
    logs.unshift(entry);
    
    // Keep only the latest logs
    if (logs.length > this.MAX_LOGS) {
      logs.splice(this.MAX_LOGS);
    }
    
    localStorage.setItem(this.LOG_KEY, JSON.stringify(logs));
  }

  private static printConsoleLog(entry: WebhookLogEntry): void {
    const emoji = this.getStatusEmoji(entry.status);
    const timeFormatted = new Date(entry.timestamp).toLocaleTimeString();
    
    console.groupCollapsed(`${emoji} [${entry.id}] ${entry.action} - ${entry.status} (${entry.processing_time_ms}ms)`);
    console.log('📅 Time:', timeFormatted);
    console.log('🎯 Action:', entry.action);
    console.log('📊 Status:', entry.status);
    console.log('⏱️  Processing Time:', `${entry.processing_time_ms}ms`);
    
    if (entry.invoice_id) console.log('🧾 Invoice ID:', entry.invoice_id);
    if (entry.user_id) console.log('👤 User ID:', entry.user_id);
    if (entry.error) console.log('❌ Error:', entry.error);
    if (entry.retry_count) console.log('🔄 Retry Count:', entry.retry_count);
    
    console.log('📦 Payload:', entry.payload);
    console.groupEnd();
  }

  private static getStatusEmoji(status: string): string {
    switch (status) {
      case 'success': return '✅';
      case 'failed': return '❌';
      case 'pending': return '⏳';
      default: return '🔵';
    }
  }

  private static generateSessionId(): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
    return sessionId;
  }
}

export default WebhookLogger;
