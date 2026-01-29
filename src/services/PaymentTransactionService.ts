/**
 * Payment Transaction Service
 * 
 * Service for managing payment transactions with comprehensive logging,
 * audit trails, and compliance features.
 * Implements requirements 5.4 and 5.5 from the production payment validation fix.
 */

import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import {
  PaymentTransaction,
  PaymentTransactionSummary,
  CreatePaymentTransactionRequest,
  UpdatePaymentTransactionRequest,
  PaymentTransactionQuery,
  PaymentTransactionResponse,
  PaymentTransactionStats,
  PaymentTransactionCreateResult,
  PaymentTransactionUpdateResult,
  PaymentTransactionError,
  PaymentTransactionNotFoundError,
  PaymentTransactionValidationError,
  PaymentStatus,
  FINAL_STATUSES
} from '@/types/paymentTransaction';

export class PaymentTransactionService {
  
  /**
   * Create a new payment transaction
   */
  async createTransaction(request: CreatePaymentTransactionRequest): Promise<PaymentTransactionCreateResult> {
    try {
      // Validate required fields
      this.validateCreateRequest(request);
      
      // Generate session ID if not provided
      const sessionId = request.session_id || this.generateSessionId();
      
      // Prepare transaction data
      const transactionData = {
        transaction_id: request.transaction_id,
        reference_number: request.reference_number,
        user_id: request.user_id,
        user_email: request.user_email,
        course_id: request.course_id,
        course_title: request.course_title,
        amount: request.amount,
        currency: request.currency || 'ZAR',
        payment_method: request.payment_method || 'card',
        gateway_provider: request.gateway_provider || 'ikhokha',
        status: 'pending' as PaymentStatus,
        card_last_four: request.card_last_four,
        card_type: request.card_type,
        card_brand: request.card_brand,
        ip_address: request.ip_address,
        user_agent: request.user_agent,
        session_id: sessionId,
        device_fingerprint: request.device_fingerprint,
        risk_score: 0,
        fraud_flags: [],
        validation_checks: request.validation_checks || {},
        gateway_response: {},
        webhook_data: {},
        attempt_number: 1,
        retry_count: 0,
        is_test_transaction: request.is_test_transaction || false,
        compliance_flags: [],
        metadata: request.metadata || {}
      };
      
      // Insert transaction into database
      const { data, error } = await supabase
        .from('payment_transactions')
        .insert(transactionData)
        .select()
        .single();
      
      if (error) {
        logger.error('Failed to create payment transaction:', error);
        return {
          success: false,
          error: `Failed to create transaction: ${error.message}`,
          code: 'CREATE_FAILED'
        };
      }
      
      logger.info('Payment transaction created:', {
        transaction_id: data.transaction_id,
        user_id: data.user_id,
        amount: data.amount
      });
      
      return {
        success: true,
        transaction: data as PaymentTransaction
      };
      
    } catch (error) {
      logger.error('Error creating payment transaction:', error);
      
      if (error instanceof PaymentTransactionValidationError) {
        return {
          success: false,
          error: error.message,
          code: error.code
        };
      }
      
      return {
        success: false,
        error: 'Internal error creating transaction',
        code: 'INTERNAL_ERROR'
      };
    }
  }
  
  /**
   * Update an existing payment transaction
   */
  async updateTransaction(
    transactionId: string, 
    updates: UpdatePaymentTransactionRequest
  ): Promise<PaymentTransactionUpdateResult> {
    try {
      // Get existing transaction
      const existing = await this.getTransactionById(transactionId);
      if (!existing) {
        return {
          success: false,
          error: `Transaction not found: ${transactionId}`,
          code: 'TRANSACTION_NOT_FOUND'
        };
      }
      
      // Validate status transitions
      if (updates.status && !this.isValidStatusTransition(existing.status, updates.status)) {
        return {
          success: false,
          error: `Invalid status transition from ${existing.status} to ${updates.status}`,
          code: 'INVALID_STATUS_TRANSITION'
        };
      }
      
      // Prepare update data
      const updateData: Partial<PaymentTransaction> = {
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      // Set completion timestamp for final statuses
      if (updates.status && FINAL_STATUSES.includes(updates.status) && !existing.completed_at) {
        updateData.completed_at = new Date().toISOString();
      }
      
      // Update transaction in database
      const { data, error } = await supabase
        .from('payment_transactions')
        .update(updateData)
        .eq('transaction_id', transactionId)
        .select()
        .single();
      
      if (error) {
        logger.error('Failed to update payment transaction:', error);
        return {
          success: false,
          error: `Failed to update transaction: ${error.message}`,
          code: 'UPDATE_FAILED'
        };
      }
      
      logger.info('Payment transaction updated:', {
        transaction_id: transactionId,
        updates: Object.keys(updates)
      });
      
      return {
        success: true,
        transaction: data as PaymentTransaction
      };
      
    } catch (error) {
      logger.error('Error updating payment transaction:', error);
      return {
        success: false,
        error: 'Internal error updating transaction',
        code: 'INTERNAL_ERROR'
      };
    }
  }
  
  /**
   * Get a transaction by ID
   */
  async getTransactionById(transactionId: string): Promise<PaymentTransaction | null> {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select('*')
        .eq('transaction_id', transactionId)
        .is('deleted_at', null)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        logger.error('Error fetching payment transaction:', error);
        throw new PaymentTransactionError('Failed to fetch transaction', 'FETCH_FAILED');
      }
      
      return data as PaymentTransaction;
      
    } catch (error) {
      logger.error('Error getting payment transaction by ID:', error);
      throw error;
    }
  }
  
  /**
   * Get transactions by user ID
   */
  async getTransactionsByUserId(userId: string, limit: number = 50): Promise<PaymentTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        logger.error('Error fetching user payment transactions:', error);
        throw new PaymentTransactionError('Failed to fetch user transactions', 'FETCH_FAILED');
      }
      
      return (data || []) as PaymentTransaction[];
      
    } catch (error) {
      logger.error('Error getting transactions by user ID:', error);
      throw error;
    }
  }
  
  /**
   * Query transactions with filters and pagination
   */
  async queryTransactions(query: PaymentTransactionQuery = {}): Promise<PaymentTransactionResponse> {
    try {
      let supabaseQuery = supabase
        .from('payment_transactions')
        .select('*', { count: 'exact' })
        .is('deleted_at', null);
      
      // Apply filters
      if (query.filters) {
        const filters = query.filters;
        
        if (filters.user_id) {
          supabaseQuery = supabaseQuery.eq('user_id', filters.user_id);
        }
        
        if (filters.course_id) {
          supabaseQuery = supabaseQuery.eq('course_id', filters.course_id);
        }
        
        if (filters.status) {
          if (Array.isArray(filters.status)) {
            supabaseQuery = supabaseQuery.in('status', filters.status);
          } else {
            supabaseQuery = supabaseQuery.eq('status', filters.status);
          }
        }
        
        if (filters.payment_method) {
          supabaseQuery = supabaseQuery.eq('payment_method', filters.payment_method);
        }
        
        if (filters.gateway_provider) {
          supabaseQuery = supabaseQuery.eq('gateway_provider', filters.gateway_provider);
        }
        
        if (filters.start_date) {
          supabaseQuery = supabaseQuery.gte('created_at', filters.start_date);
        }
        
        if (filters.end_date) {
          supabaseQuery = supabaseQuery.lte('created_at', filters.end_date);
        }
        
        if (filters.min_amount !== undefined) {
          supabaseQuery = supabaseQuery.gte('amount', filters.min_amount);
        }
        
        if (filters.max_amount !== undefined) {
          supabaseQuery = supabaseQuery.lte('amount', filters.max_amount);
        }
        
        if (filters.is_test_transaction !== undefined) {
          supabaseQuery = supabaseQuery.eq('is_test_transaction', filters.is_test_transaction);
        }
        
        if (filters.has_fraud_flags) {
          supabaseQuery = supabaseQuery.not('fraud_flags', 'eq', '[]');
        }
        
        if (filters.risk_score_min !== undefined) {
          supabaseQuery = supabaseQuery.gte('risk_score', filters.risk_score_min);
        }
        
        if (filters.risk_score_max !== undefined) {
          supabaseQuery = supabaseQuery.lte('risk_score', filters.risk_score_max);
        }
      }
      
      // Apply sorting
      const sortBy = query.sort_by || 'created_at';
      const sortOrder = query.sort_order || 'desc';
      supabaseQuery = supabaseQuery.order(sortBy, { ascending: sortOrder === 'asc' });
      
      // Apply pagination
      const limit = query.limit || 50;
      const offset = query.offset || 0;
      supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);
      
      const { data, error, count } = await supabaseQuery;
      
      if (error) {
        logger.error('Error querying payment transactions:', error);
        throw new PaymentTransactionError('Failed to query transactions', 'QUERY_FAILED');
      }
      
      const totalCount = count || 0;
      const hasMore = offset + limit < totalCount;
      
      return {
        transactions: (data || []) as PaymentTransaction[],
        total_count: totalCount,
        has_more: hasMore
      };
      
    } catch (error) {
      logger.error('Error querying payment transactions:', error);
      throw error;
    }
  }
  
  /**
   * Get transaction statistics
   */
  async getTransactionStats(
    startDate?: string, 
    endDate?: string
  ): Promise<PaymentTransactionStats> {
    try {
      const { data, error } = await supabase
        .rpc('get_payment_transaction_stats', {
          start_date: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end_date: endDate || new Date().toISOString()
        });
      
      if (error) {
        logger.error('Error getting payment transaction stats:', error);
        throw new PaymentTransactionError('Failed to get transaction stats', 'STATS_FAILED');
      }
      
      return data[0] as PaymentTransactionStats;
      
    } catch (error) {
      logger.error('Error getting transaction stats:', error);
      throw error;
    }
  }
  
  /**
   * Mark transaction as fraud
   */
  async markAsFraud(transactionId: string, reason: string): Promise<PaymentTransactionUpdateResult> {
    return this.updateTransaction(transactionId, {
      status: 'failed',
      failure_reason: `Fraud detected: ${reason}`,
      failure_code: 'FRAUD_DETECTED',
      fraud_flags: ['manual_fraud_flag'],
      risk_score: 100
    });
  }
  
  /**
   * Retry a failed transaction
   */
  async retryTransaction(transactionId: string): Promise<PaymentTransactionUpdateResult> {
    try {
      const existing = await this.getTransactionById(transactionId);
      if (!existing) {
        return {
          success: false,
          error: `Transaction not found: ${transactionId}`,
          code: 'TRANSACTION_NOT_FOUND'
        };
      }
      
      if (!['failed', 'declined'].includes(existing.status)) {
        return {
          success: false,
          error: 'Can only retry failed or declined transactions',
          code: 'INVALID_RETRY_STATUS'
        };
      }
      
      const updateData: UpdatePaymentTransactionRequest = {
        status: 'pending',
        retry_count: existing.retry_count + 1
      };
      
      // Clear failure fields by explicitly setting them
      if (existing.failure_reason) {
        updateData.failure_reason = '';
      }
      if (existing.failure_code) {
        updateData.failure_code = '';
      }
      if (existing.gateway_error_code) {
        updateData.gateway_error_code = '';
      }
      if (existing.gateway_error_message) {
        updateData.gateway_error_message = '';
      }
      
      return this.updateTransaction(transactionId, updateData);
      
    } catch (error) {
      logger.error('Error retrying transaction:', error);
      return {
        success: false,
        error: 'Internal error retrying transaction',
        code: 'INTERNAL_ERROR'
      };
    }
  }
  
  /**
   * Soft delete a transaction
   */
  async deleteTransaction(transactionId: string, deletedBy: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('payment_transactions')
        .update({
          deleted_at: new Date().toISOString(),
          deleted_by: deletedBy
        })
        .eq('transaction_id', transactionId);
      
      if (error) {
        logger.error('Error deleting payment transaction:', error);
        return false;
      }
      
      logger.info('Payment transaction deleted:', { transaction_id: transactionId, deleted_by: deletedBy });
      return true;
      
    } catch (error) {
      logger.error('Error deleting transaction:', error);
      return false;
    }
  }
  
  /**
   * Clean up old transactions (data retention)
   */
  async cleanupOldTransactions(retentionDays: number = 2555): Promise<number> {
    try {
      const { data, error } = await supabase
        .rpc('cleanup_old_payment_transactions', { retention_days: retentionDays });
      
      if (error) {
        logger.error('Error cleaning up old transactions:', error);
        throw new PaymentTransactionError('Failed to cleanup old transactions', 'CLEANUP_FAILED');
      }
      
      const deletedCount = data || 0;
      logger.info('Old payment transactions cleaned up:', { deleted_count: deletedCount });
      
      return deletedCount;
      
    } catch (error) {
      logger.error('Error cleaning up old transactions:', error);
      throw error;
    }
  }
  
  /**
   * Subscribe to transaction status changes
   */
  subscribeToStatusChanges(
    callback: (payload: any) => void
  ): () => void {
    const channel = supabase
      .channel('payment_transaction_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'payment_transactions',
          filter: 'deleted_at=is.null'
        },
        callback
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }
  
  // Private helper methods
  
  private validateCreateRequest(request: CreatePaymentTransactionRequest): void {
    if (!request.transaction_id) {
      throw new PaymentTransactionValidationError('Transaction ID is required');
    }
    
    if (!request.reference_number) {
      throw new PaymentTransactionValidationError('Reference number is required');
    }
    
    if (!request.user_id) {
      throw new PaymentTransactionValidationError('User ID is required');
    }
    
    if (!request.user_email) {
      throw new PaymentTransactionValidationError('User email is required');
    }
    
    if (!request.course_id) {
      throw new PaymentTransactionValidationError('Course ID is required');
    }
    
    if (!request.course_title) {
      throw new PaymentTransactionValidationError('Course title is required');
    }
    
    if (!request.amount || request.amount <= 0) {
      throw new PaymentTransactionValidationError('Amount must be greater than 0');
    }
  }
  
  private isValidStatusTransition(currentStatus: PaymentStatus, newStatus: PaymentStatus): boolean {
    const validTransitions: Record<PaymentStatus, PaymentStatus[]> = {
      pending: ['processing', 'approved', 'declined', 'failed', 'cancelled'],
      processing: ['approved', 'declined', 'failed', 'cancelled'],
      approved: ['refunded'],
      declined: ['pending'], // Allow retry
      failed: ['pending'], // Allow retry
      cancelled: [],
      refunded: []
    };
    
    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }
  
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const paymentTransactionService = new PaymentTransactionService();