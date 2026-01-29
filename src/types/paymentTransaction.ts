/**
 * Payment Transaction Types
 * 
 * TypeScript interfaces for the payment transactions system.
 * Implements requirements 5.4 and 5.5 from the production payment validation fix.
 */

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'approved' 
  | 'declined' 
  | 'failed' 
  | 'cancelled' 
  | 'refunded';

export type PaymentMethod = 'card' | 'eft' | 'bank_transfer';

export type GatewayProvider = 'ikhokha' | 'payfast' | 'stripe';

export interface PaymentTransaction {
  id: string;
  
  // Transaction identification
  transaction_id: string;
  gateway_transaction_id?: string;
  bank_transaction_id?: string;
  reference_number: string;
  
  // User and course information
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  
  // Payment details
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  gateway_provider: GatewayProvider;
  
  // Transaction status and lifecycle
  status: PaymentStatus;
  
  // Card information (masked for security)
  card_last_four?: string;
  card_type?: string;
  card_brand?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  processed_at?: string;
  verified_at?: string;
  completed_at?: string;
  
  // Failure and error information
  failure_reason?: string;
  failure_code?: string;
  gateway_error_code?: string;
  gateway_error_message?: string;
  
  // Security and fraud prevention
  ip_address?: string;
  user_agent?: string;
  session_id?: string;
  device_fingerprint?: string;
  risk_score: number;
  fraud_flags: string[];
  
  // Validation and verification
  validation_checks: ValidationChecks;
  gateway_response: Record<string, any>;
  webhook_data: Record<string, any>;
  
  // Audit and compliance
  attempt_number: number;
  retry_count: number;
  is_test_transaction: boolean;
  compliance_flags: string[];
  
  // Metadata for additional information
  metadata: Record<string, any>;
  
  // Soft delete support
  deleted_at?: string;
  deleted_by?: string;
}

export interface ValidationChecks {
  luhn_algorithm?: boolean;
  expiry_date?: boolean;
  cvv_format?: boolean;
  cardholder_name?: boolean;
  card_type?: string;
  issuer_country?: string;
  is_debit?: boolean;
  validation_score?: number;
}

export interface PaymentTransactionSummary {
  id: string;
  transaction_id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  gateway_provider: GatewayProvider;
  status: PaymentStatus;
  card_last_four?: string;
  card_type?: string;
  created_at: string;
  updated_at: string;
  processed_at?: string;
  verified_at?: string;
  completed_at?: string;
  failure_reason?: string;
  attempt_number: number;
  retry_count: number;
  is_test_transaction: boolean;
}

export interface CreatePaymentTransactionRequest {
  // Transaction identification
  transaction_id: string;
  reference_number: string;
  
  // User and course information
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  
  // Payment details
  amount: number;
  currency?: string;
  payment_method?: PaymentMethod;
  gateway_provider?: GatewayProvider;
  
  // Card information (masked)
  card_last_four?: string;
  card_type?: string;
  card_brand?: string;
  
  // Security information
  ip_address?: string;
  user_agent?: string;
  session_id?: string;
  device_fingerprint?: string;
  
  // Validation results
  validation_checks?: ValidationChecks;
  
  // Additional metadata
  metadata?: Record<string, any>;
  
  // Test transaction flag
  is_test_transaction?: boolean;
}

export interface UpdatePaymentTransactionRequest {
  // Status updates
  status?: PaymentStatus;
  
  // Gateway information
  gateway_transaction_id?: string;
  bank_transaction_id?: string;
  
  // Timestamps
  processed_at?: string;
  verified_at?: string;
  completed_at?: string;
  
  // Failure information
  failure_reason?: string;
  failure_code?: string;
  gateway_error_code?: string;
  gateway_error_message?: string;
  
  // Gateway response data
  gateway_response?: Record<string, any>;
  webhook_data?: Record<string, any>;
  
  // Fraud and risk updates
  risk_score?: number;
  fraud_flags?: string[];
  
  // Retry information
  retry_count?: number;
  
  // Compliance flags
  compliance_flags?: string[];
  
  // Additional metadata
  metadata?: Record<string, any>;
}

export interface PaymentTransactionStats {
  total_transactions: number;
  successful_transactions: number;
  failed_transactions: number;
  total_amount: number;
  success_rate: number;
  average_amount: number;
}

export interface PaymentTransactionFilters {
  user_id?: string;
  course_id?: string;
  status?: PaymentStatus | PaymentStatus[];
  payment_method?: PaymentMethod;
  gateway_provider?: GatewayProvider;
  start_date?: string;
  end_date?: string;
  min_amount?: number;
  max_amount?: number;
  is_test_transaction?: boolean;
  has_fraud_flags?: boolean;
  risk_score_min?: number;
  risk_score_max?: number;
}

export interface PaymentTransactionQuery {
  filters?: PaymentTransactionFilters;
  sort_by?: 'created_at' | 'updated_at' | 'amount' | 'status';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface PaymentTransactionResponse {
  transactions: PaymentTransaction[];
  total_count: number;
  has_more: boolean;
  stats?: PaymentTransactionStats;
}

// Event types for real-time updates
export interface PaymentTransactionStatusChangeEvent {
  transaction_id: string;
  user_id: string;
  old_status: PaymentStatus;
  new_status: PaymentStatus;
  updated_at: string;
}

export interface PaymentTransactionCreatedEvent {
  transaction_id: string;
  user_id: string;
  amount: number;
  status: PaymentStatus;
  created_at: string;
}

// Error types
export class PaymentTransactionError extends Error {
  constructor(
    message: string,
    public code: string,
    public transaction_id?: string
  ) {
    super(message);
    this.name = 'PaymentTransactionError';
  }
}

export class PaymentTransactionNotFoundError extends PaymentTransactionError {
  constructor(transaction_id: string) {
    super(`Payment transaction not found: ${transaction_id}`, 'TRANSACTION_NOT_FOUND', transaction_id);
    this.name = 'PaymentTransactionNotFoundError';
  }
}

export class PaymentTransactionValidationError extends PaymentTransactionError {
  constructor(message: string, transaction_id?: string) {
    super(message, 'VALIDATION_ERROR', transaction_id);
    this.name = 'PaymentTransactionValidationError';
  }
}

// Utility types
export type PaymentTransactionCreateResult = {
  success: true;
  transaction: PaymentTransaction;
} | {
  success: false;
  error: string;
  code: string;
};

export type PaymentTransactionUpdateResult = {
  success: true;
  transaction: PaymentTransaction;
} | {
  success: false;
  error: string;
  code: string;
};

// Constants
export const PAYMENT_STATUSES: PaymentStatus[] = [
  'pending',
  'processing', 
  'approved',
  'declined',
  'failed',
  'cancelled',
  'refunded'
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  'card',
  'eft',
  'bank_transfer'
];

export const GATEWAY_PROVIDERS: GatewayProvider[] = [
  'ikhokha',
  'payfast',
  'stripe'
];

// Status groups for easier filtering
export const SUCCESSFUL_STATUSES: PaymentStatus[] = ['approved'];
export const FAILED_STATUSES: PaymentStatus[] = ['declined', 'failed', 'cancelled'];
export const PENDING_STATUSES: PaymentStatus[] = ['pending', 'processing'];
export const FINAL_STATUSES: PaymentStatus[] = ['approved', 'declined', 'failed', 'cancelled', 'refunded'];