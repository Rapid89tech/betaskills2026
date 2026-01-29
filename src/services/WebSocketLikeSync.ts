/**
 * WebSocket-Like Synchronization Service
 * 
 * Provides WebSocket-like functionality using polling, BroadcastChannel,
 * and localStorage events for real-time enrollment synchronization.
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 7.3
 */

import { logger } from '@/utils/logger';

export interface SyncMessage {
  type: 'enrollment_update' | 'payment_confirmation' | 'admin_action' | 'heartbeat';
  data: any;
  timestamp: number;
  sessionId: string;
  messageId: string;
}

export interface SyncConnection {
  id: string;
  sessionId: string;
  lastHeartbeat: number;
  isActive: boolean;
  messageQueue: SyncMessage[];
}

export interface SyncOptions {
  pollInterval: number;
  heartbeatInterval: number;
  messageRetention: number;
  maxRetries: number;
  enableBroadcastChannel: boolean;
  enableStorageSync: boolean;
  enablePolling: boolean;
}

/**
 * WebSocket-Like Synchronization Service
 */
export class WebSocketLikeSync {
  private static instance: WebSocketLikeSync;
  private sessionId: string;
  private connectionId: string;
  private broadcastChannel?: BroadcastChannel;
  private pollInterval?: NodeJS.Timeout;
  private heartbeatInterval?: NodeJS.Timeout;
  private messageHandlers: Map<string, Function[]> = new Map();
  private messageQueue: SyncMessage[] = [];
  private lastSyncTimestamp: number = 0;
  private options: SyncOptions;
  private isConnected: boolean = false;
  private retryCount: number = 0;

  constructor(options: Partial<SyncOptions> = {}) {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.connectionId = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.options = {
      pollInterval: 2000, // 2 seconds for responsive updates
      heartbeatInterval: 10000, // 10 seconds
      messageRetention: 300000, // 5 minutes
      maxRetries: 5,
      enableBroadcastChannel: true,
      enableStorageSync: true,
      enablePolling: true,
      ...options
    };

    this.initializeConnection();
  }

  static getInstance(options?: Partial<SyncOptions>): WebSocketLikeSync {
    if (!WebSocketLikeSync.instance) {
      WebSocketLikeSync.instance = new WebSocketLikeSync(options);
    }
    return WebSocketLikeSync.instance;
  }

  /**
   * Initialize the sync connection
   */
  private async initializeConnection(): Promise<void> {
    logger.info('🔌 WebSocketLikeSync: Initializing connection', {
      sessionId: this.sessionId,
      connectionId: this.connectionId,
      options: this.options
    });

    try {
      // Initialize BroadcastChannel for cross-tab communication
      if (this.options.enableBroadcastChannel && typeof BroadcastChannel !== 'undefined') {
        this.broadcastChannel = new BroadcastChannel('enrollment-websocket-sync');
        this.broadcastChannel.addEventListener('message', this.handleBroadcastMessage.bind(this));
        logger.info('✅ BroadcastChannel initialized');
      }

      // Initialize storage event listener
      if (this.options.enableStorageSync) {
        window.addEventListener('storage', this.handleStorageEvent.bind(this));
        logger.info('✅ Storage event listener initialized');
      }

      // Start polling mechanism
      if (this.options.enablePolling) {
        this.startPolling();
      }

      // Start heartbeat
      this.startHeartbeat();

      // Register connection
      await this.registerConnection();

      this.isConnected = true;
      this.retryCount = 0;

      // Emit connection event
      this.emit('connected', {
        sessionId: this.sessionId,
        connectionId: this.connectionId,
        timestamp: Date.now()
      });

      logger.info('✅ WebSocketLikeSync: Connection established');

    } catch (error) {
      logger.error('❌ Failed to initialize WebSocketLikeSync connection:', error);
      this.handleConnectionError(error);
    }
  }

  /**
   * Start polling for messages
   */
  private startPolling(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }

    this.pollInterval = setInterval(async () => {
      try {
        await this.pollForMessages();
      } catch (error) {
        logger.error('❌ Polling error:', error);
        this.handleConnectionError(error);
      }
    }, this.options.pollInterval);

    logger.info(`🔄 Polling started with ${this.options.pollInterval}ms interval`);
  }

  /**
   * Start heartbeat mechanism
   */
  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
    }, this.options.heartbeatInterval);

    logger.debug(`💓 Heartbeat started with ${this.options.heartbeatInterval}ms interval`);
  }

  /**
   * Poll for new messages
   */
  private async pollForMessages(): Promise<void> {
    try {
      const messagesKey = 'websocket-sync-messages';
      const storedMessages = localStorage.getItem(messagesKey);
      
      if (storedMessages) {
        const messages: SyncMessage[] = JSON.parse(storedMessages);
        const newMessages = messages.filter(msg => 
          msg.timestamp > this.lastSyncTimestamp && 
          msg.sessionId !== this.sessionId
        );

        if (newMessages.length > 0) {
          logger.debug(`📥 Received ${newMessages.length} new messages via polling`);
          
          for (const message of newMessages) {
            this.processMessage(message);
          }
          
          this.lastSyncTimestamp = Math.max(...newMessages.map(m => m.timestamp));
        }
      }

      // Clean up old messages
      this.cleanupOldMessages();

    } catch (error) {
      logger.error('❌ Failed to poll for messages:', error);
    }
  }

  /**
   * Send message to all connected sessions
   */
  async send(type: SyncMessage['type'], data: any): Promise<void> {
    const message: SyncMessage = {
      type,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    logger.debug('📤 Sending message', { type, messageId: message.messageId });

    try {
      // Send via BroadcastChannel
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage(message);
        logger.debug('📡 Message sent via BroadcastChannel');
      }

      // Store in localStorage for polling mechanism
      if (this.options.enableStorageSync || this.options.enablePolling) {
        this.storeMessage(message);
        logger.debug('💾 Message stored for polling');
      }

      // Add to local queue for retry mechanism
      this.messageQueue.push(message);

      // Emit local event
      this.emit('message_sent', message);

    } catch (error) {
      logger.error('❌ Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Subscribe to message type
   */
  on(messageType: string, handler: Function): () => void {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, []);
    }
    
    this.messageHandlers.get(messageType)!.push(handler);
    
    logger.debug(`📝 Subscribed to ${messageType} messages`);
    
    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(messageType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  /**
   * Emit event to local handlers
   */
  private emit(eventType: string, data: any): void {
    const handlers = this.messageHandlers.get(eventType);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          logger.error(`❌ Error in ${eventType} handler:`, error);
        }
      });
    }
  }

  /**
   * Handle broadcast messages
   */
  private handleBroadcastMessage(event: MessageEvent): void {
    try {
      const message: SyncMessage = event.data;
      
      // Ignore own messages
      if (message.sessionId === this.sessionId) {
        return;
      }

      logger.debug('📥 Received broadcast message', { 
        type: message.type, 
        messageId: message.messageId 
      });

      this.processMessage(message);
    } catch (error) {
      logger.error('❌ Failed to handle broadcast message:', error);
    }
  }

  /**
   * Handle storage events
   */
  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === 'websocket-sync-trigger' && event.newValue) {
      try {
        const triggerData = JSON.parse(event.newValue);
        
        // Ignore own triggers
        if (triggerData.sessionId === this.sessionId) {
          return;
        }

        logger.debug('📥 Received storage trigger', triggerData);
        
        // Trigger immediate poll
        this.pollForMessages();
      } catch (error) {
        logger.error('❌ Failed to handle storage event:', error);
      }
    }
  }

  /**
   * Process incoming message
   */
  private processMessage(message: SyncMessage): void {
    logger.debug('🔄 Processing message', { 
      type: message.type, 
      messageId: message.messageId 
    });

    // Emit to specific message type handlers
    this.emit(message.type, message.data);
    
    // Emit to general message handlers
    this.emit('message', message);

    // Update last sync timestamp
    this.lastSyncTimestamp = Math.max(this.lastSyncTimestamp, message.timestamp);
  }

  /**
   * Store message in localStorage
   */
  private storeMessage(message: SyncMessage): void {
    try {
      const messagesKey = 'websocket-sync-messages';
      const existingMessages = JSON.parse(localStorage.getItem(messagesKey) || '[]');
      
      existingMessages.push(message);
      
      // Keep only recent messages
      const cutoffTime = Date.now() - this.options.messageRetention;
      const recentMessages = existingMessages.filter((msg: SyncMessage) => 
        msg.timestamp > cutoffTime
      );
      
      localStorage.setItem(messagesKey, JSON.stringify(recentMessages));
      
      // Trigger storage event for other tabs
      const triggerKey = 'websocket-sync-trigger';
      localStorage.setItem(triggerKey, JSON.stringify({
        sessionId: this.sessionId,
        messageId: message.messageId,
        timestamp: Date.now()
      }));
      
      // Clean up trigger after short delay
      setTimeout(() => {
        localStorage.removeItem(triggerKey);
      }, 100);
      
    } catch (error) {
      logger.error('❌ Failed to store message:', error);
    }
  }

  /**
   * Clean up old messages
   */
  private cleanupOldMessages(): void {
    try {
      const messagesKey = 'websocket-sync-messages';
      const existingMessages = JSON.parse(localStorage.getItem(messagesKey) || '[]');
      
      const cutoffTime = Date.now() - this.options.messageRetention;
      const recentMessages = existingMessages.filter((msg: SyncMessage) => 
        msg.timestamp > cutoffTime
      );
      
      if (recentMessages.length !== existingMessages.length) {
        localStorage.setItem(messagesKey, JSON.stringify(recentMessages));
        logger.debug(`🧹 Cleaned up ${existingMessages.length - recentMessages.length} old messages`);
      }
    } catch (error) {
      logger.error('❌ Failed to cleanup old messages:', error);
    }
  }

  /**
   * Send heartbeat
   */
  private sendHeartbeat(): void {
    if (this.isConnected) {
      this.send('heartbeat', {
        sessionId: this.sessionId,
        connectionId: this.connectionId,
        timestamp: Date.now()
      }).catch(error => {
        logger.error('❌ Failed to send heartbeat:', error);
      });
    }
  }

  /**
   * Register connection
   */
  private async registerConnection(): Promise<void> {
    const connectionsKey = 'websocket-sync-connections';
    const connections = JSON.parse(localStorage.getItem(connectionsKey) || '{}');
    
    connections[this.connectionId] = {
      id: this.connectionId,
      sessionId: this.sessionId,
      lastHeartbeat: Date.now(),
      isActive: true,
      messageQueue: []
    };
    
    localStorage.setItem(connectionsKey, JSON.stringify(connections));
  }

  /**
   * Handle connection errors
   */
  private handleConnectionError(error: any): void {
    logger.error('❌ Connection error:', error);
    
    this.isConnected = false;
    this.retryCount++;
    
    if (this.retryCount <= this.options.maxRetries) {
      const retryDelay = Math.min(1000 * Math.pow(2, this.retryCount), 30000);
      logger.info(`🔄 Retrying connection in ${retryDelay}ms (attempt ${this.retryCount}/${this.options.maxRetries})`);
      
      setTimeout(() => {
        this.initializeConnection();
      }, retryDelay);
    } else {
      logger.error('❌ Max retry attempts reached, giving up');
      this.emit('connection_failed', { error, retryCount: this.retryCount });
    }
  }

  /**
   * Get connection status
   */
  getStatus(): any {
    return {
      isConnected: this.isConnected,
      sessionId: this.sessionId,
      connectionId: this.connectionId,
      lastSyncTimestamp: this.lastSyncTimestamp,
      messageQueueSize: this.messageQueue.length,
      retryCount: this.retryCount,
      options: this.options
    };
  }

  /**
   * Disconnect and cleanup
   */
  disconnect(): void {
    logger.info('🔌 Disconnecting WebSocketLikeSync');
    
    this.isConnected = false;
    
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
    
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
    
    window.removeEventListener('storage', this.handleStorageEvent.bind(this));
    
    this.messageHandlers.clear();
    this.messageQueue = [];
    
    this.emit('disconnected', {
      sessionId: this.sessionId,
      connectionId: this.connectionId,
      timestamp: Date.now()
    });
  }
}

// Export singleton instance
export const webSocketLikeSync = WebSocketLikeSync.getInstance();