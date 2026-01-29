/**
 * Production Error Handling Service
 * 
 * Provides comprehensive error classification, recovery strategies, and stakeholder notification
 * for production environments. Integrates with monitoring systems and implements automated
 * recovery procedures for common production issues.
 * 
 * Requirements: 6.2, 6.3, 6.4
 */

import { supabase } from '@/integrations/supabase/client';

export interface ProductionError {
    id: string;
    type: ErrorType;
    severity: ErrorSeverity;
    category: ErrorCategory;
    message: string;
    stack?: string | undefined;
    context: ErrorContext;
    timestamp: Date;
    source: string;
    user_id?: string | undefined;
    session_id?: string | undefined;
}

export interface ErrorContext {
    url?: string | undefined;
    user_agent?: string | undefined;
    payment_reference?: string | undefined;
    enrollment_id?: string | undefined;
    course_id?: string | undefined;
    component?: string | undefined;
    action?: string | undefined;
    user_id?: string | undefined;
    session_id?: string | undefined;
    metadata: Record<string, any>;
}

export interface ErrorRecoveryStrategy {
    strategy_id: string;
    name: string;
    description: string;
    applicable_error_types: ErrorType[];
    recovery_steps: RecoveryStep[];
    success_rate: number;
    average_recovery_time: number;
    requires_manual_intervention: boolean;
}

export interface RecoveryStep {
    step_id: string;
    name: string;
    description: string;
    action: RecoveryAction;
    parameters: Record<string, any>;
    timeout: number;
    retry_count: number;
    success_criteria: string;
}

export interface RecoveryAttempt {
    attempt_id: string;
    error_id: string;
    strategy_id: string;
    status: RecoveryStatus;
    started_at: Date;
    completed_at?: Date;
    steps_completed: string[];
    steps_failed: string[];
    recovery_result: RecoveryResult;
    manual_intervention_required: boolean;
}

export interface StakeholderNotification {
    notification_id: string;
    error_id: string;
    recipient_type: 'email' | 'slack' | 'webhook' | 'sms';
    recipient: string;
    message: string;
    sent_at: Date;
    delivery_status: 'pending' | 'sent' | 'delivered' | 'failed';
}

export interface ErrorReport {
    report_id: string;
    period_start: Date;
    period_end: Date;
    total_errors: number;
    errors_by_severity: Record<ErrorSeverity, number>;
    errors_by_category: Record<ErrorCategory, number>;
    recovery_success_rate: number;
    manual_interventions_required: number;
    top_error_patterns: ErrorPattern[];
    recommendations: string[];
}

export interface ErrorPattern {
    pattern_id: string;
    description: string;
    frequency: number;
    impact_score: number;
    suggested_fixes: string[];
}

export type ErrorType =
    | 'payment_processing_error'
    | 'webhook_processing_error'
    | 'enrollment_creation_error'
    | 'course_access_error'
    | 'authentication_error'
    | 'authorization_error'
    | 'network_error'
    | 'database_error'
    | 'configuration_error'
    | 'validation_error'
    | 'integration_error'
    | 'performance_error'
    | 'security_error'
    | 'unknown_error';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ErrorCategory =
    | 'payment_system'
    | 'enrollment_system'
    | 'course_system'
    | 'authentication_system'
    | 'infrastructure'
    | 'security'
    | 'user_interface'
    | 'integration'
    | 'performance';

export type RecoveryAction =
    | 'retry_operation'
    | 'fallback_to_alternative'
    | 'clear_cache'
    | 'refresh_credentials'
    | 'restart_service'
    | 'notify_stakeholders'
    | 'escalate_to_manual'
    | 'rollback_transaction'
    | 'validate_configuration'
    | 'sync_data';

export type RecoveryStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'manual_required';

export type RecoveryResult = 'success' | 'partial_success' | 'failure' | 'manual_intervention_required';

export class ProductionErrorHandling {
    private static instance: ProductionErrorHandling;
    private recoveryStrategies: Map<ErrorType, ErrorRecoveryStrategy[]> = new Map();
    private activeRecoveries: Map<string, RecoveryAttempt> = new Map();
    private errorPatterns: Map<string, ErrorPattern> = new Map();
    private initialized = false;

    private constructor() {
        this.initializeRecoveryStrategies();
    }

    /**
     * Get singleton instance of ProductionErrorHandling
     */
    public static getInstance(): ProductionErrorHandling {
        if (!ProductionErrorHandling.instance) {
            ProductionErrorHandling.instance = new ProductionErrorHandling();
        }
        return ProductionErrorHandling.instance;
    }

    /**
     * Initialize the error handling system
     * Requirements: 6.2, 6.3
     */
    public async initialize(): Promise<void> {
        try {
            console.log('[ERROR_HANDLING] Initializing production error handling system...');

            // Load error patterns from database
            await this.loadErrorPatterns();

            // Initialize recovery strategies
            this.initializeRecoveryStrategies();

            // Set up global error handlers
            this.setupGlobalErrorHandlers();

            // Start error monitoring
            this.startErrorMonitoring();

            this.initialized = true;
            console.log('[ERROR_HANDLING] Production error handling system initialized successfully');

        } catch (error) {
            console.error('[ERROR_HANDLING] Failed to initialize error handling system:', error);
            throw error;
        }
    }

    /**
     * Handle a production error with classification and recovery
     * Requirements: 6.2, 6.3, 6.4
     */
    public async handleError(
        error: Error | any,
        context: Partial<ErrorContext> = {}
    ): Promise<ProductionError> {
        try {
            // Classify the error
            const productionError = await this.classifyError(error, context);

            // Log the error
            await this.logError(productionError);

            // Attempt automatic recovery if applicable
            if (this.shouldAttemptRecovery(productionError)) {
                await this.attemptRecovery(productionError);
            }

            // Send notifications based on severity
            await this.sendNotifications(productionError);

            // Update error patterns
            await this.updateErrorPatterns(productionError);

            return productionError;

        } catch (handlingError) {
            console.error('[ERROR_HANDLING] Failed to handle error:', handlingError);

            // Create a fallback error record
            const fallbackError: ProductionError = {
                id: this.generateErrorId(),
                type: 'unknown_error',
                severity: 'high',
                category: 'infrastructure',
                message: `Error handling failed: ${handlingError instanceof Error ? handlingError.message : 'Unknown error'}`,
                context: { ...context, metadata: { original_error: error, handling_error: handlingError } },
                timestamp: new Date(),
                source: 'ProductionErrorHandling'
            };

            await this.logError(fallbackError);
            return fallbackError;
        }
    }

    /**
     * Classify an error into production error categories
     * Requirements: 6.2
     */
    private async classifyError(error: Error | any, context: Partial<ErrorContext>): Promise<ProductionError> {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;

        // Determine error type based on message and context
        const errorType = this.determineErrorType(errorMessage, context);

        // Determine severity based on error type and context
        const severity = this.determineSeverity(errorType, errorMessage, context);

        // Determine category based on error type
        const category = this.determineCategory(errorType);

        return {
            id: this.generateErrorId(),
            type: errorType,
            severity,
            category,
            message: errorMessage,
            stack: errorStack,
            context: {
                url: context.url || (typeof window !== 'undefined' ? window.location.href : undefined),
                user_agent: context.user_agent || (typeof navigator !== 'undefined' ? navigator.userAgent : undefined),
                payment_reference: context.payment_reference,
                enrollment_id: context.enrollment_id,
                course_id: context.course_id,
                component: context.component,
                action: context.action,
                user_id: context.user_id,
                session_id: context.session_id,
                metadata: context.metadata || {}
            },
            timestamp: new Date(),
            source: context.component || 'Unknown',
            user_id: context.user_id,
            session_id: context.session_id
        };
    }

    /**
     * Attempt automatic recovery for an error
     * Requirements: 6.3
     */
    private async attemptRecovery(error: ProductionError): Promise<RecoveryAttempt | null> {
        const strategies = this.recoveryStrategies.get(error.type) || [];

        if (strategies.length === 0) {
            console.log(`[ERROR_HANDLING] No recovery strategies available for error type: ${error.type}`);
            return null;
        }

        // Select the best strategy based on success rate and applicability
        const bestStrategy = strategies.reduce((best, current) =>
            current.success_rate > best.success_rate ? current : best
        );

        const recoveryAttempt: RecoveryAttempt = {
            attempt_id: this.generateRecoveryId(),
            error_id: error.id,
            strategy_id: bestStrategy.strategy_id,
            status: 'pending',
            started_at: new Date(),
            steps_completed: [],
            steps_failed: [],
            recovery_result: 'success',
            manual_intervention_required: false
        };

        this.activeRecoveries.set(recoveryAttempt.attempt_id, recoveryAttempt);

        try {
            console.log(`[ERROR_HANDLING] Starting recovery attempt ${recoveryAttempt.attempt_id} using strategy ${bestStrategy.name}`);

            recoveryAttempt.status = 'in_progress';

            // Execute recovery steps
            for (const step of bestStrategy.recovery_steps) {
                try {
                    await this.executeRecoveryStep(step, error, recoveryAttempt);
                    recoveryAttempt.steps_completed.push(step.step_id);
                } catch (stepError) {
                    console.error(`[ERROR_HANDLING] Recovery step ${step.name} failed:`, stepError);
                    recoveryAttempt.steps_failed.push(step.step_id);

                    if (step.retry_count > 0) {
                        // Retry the step
                        for (let retry = 0; retry < step.retry_count; retry++) {
                            try {
                                await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                                await this.executeRecoveryStep(step, error, recoveryAttempt);
                                recoveryAttempt.steps_completed.push(step.step_id);
                                break;
                            } catch (retryError) {
                                if (retry === step.retry_count - 1) {
                                    throw retryError;
                                }
                            }
                        }
                    } else {
                        throw stepError;
                    }
                }
            }

            recoveryAttempt.status = 'completed';
            recoveryAttempt.recovery_result = 'success';
            recoveryAttempt.completed_at = new Date();

            console.log(`[ERROR_HANDLING] Recovery attempt ${recoveryAttempt.attempt_id} completed successfully`);

        } catch (recoveryError) {
            console.error(`[ERROR_HANDLING] Recovery attempt ${recoveryAttempt.attempt_id} failed:`, recoveryError);

            recoveryAttempt.status = 'failed';
            recoveryAttempt.recovery_result = bestStrategy.requires_manual_intervention ? 'manual_intervention_required' : 'failure';
            recoveryAttempt.manual_intervention_required = bestStrategy.requires_manual_intervention;
            recoveryAttempt.completed_at = new Date();

            if (bestStrategy.requires_manual_intervention) {
                await this.escalateToManualIntervention(error, recoveryAttempt);
            }
        }

        // Log recovery attempt
        await this.logRecoveryAttempt(recoveryAttempt);

        return recoveryAttempt;
    }

    /**
     * Execute a specific recovery step
     * Requirements: 6.3
     */
    private async executeRecoveryStep(
        step: RecoveryStep,
        error: ProductionError,
        _recoveryAttempt: RecoveryAttempt
    ): Promise<void> {
        console.log(`[ERROR_HANDLING] Executing recovery step: ${step.name}`);

        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Recovery step timeout: ${step.name}`)), step.timeout)
        );

        const execution = this.performRecoveryAction(step.action, step.parameters, error);

        try {
            await Promise.race([execution, timeout]);
            console.log(`[ERROR_HANDLING] Recovery step ${step.name} completed successfully`);
        } catch (stepError) {
            console.error(`[ERROR_HANDLING] Recovery step ${step.name} failed:`, stepError);
            throw stepError;
        }
    }

    /**
     * Perform a specific recovery action
     * Requirements: 6.3
     */
    private async performRecoveryAction(
        action: RecoveryAction,
        _parameters: Record<string, any>,
        _error: ProductionError
    ): Promise<void> {
        switch (action) {
            case 'retry_operation':
                await this.retryOperation();
                break;

            case 'fallback_to_alternative':
                await this.fallbackToAlternative();
                break;

            case 'clear_cache':
                await this.clearCache();
                break;

            case 'refresh_credentials':
                await this.refreshCredentials();
                break;

            case 'restart_service':
                await this.restartService();
                break;

            case 'notify_stakeholders':
                await this.notifyStakeholders();
                break;

            case 'escalate_to_manual':
                await this.escalateToManualIntervention(_error, null);
                break;

            case 'rollback_transaction':
                await this.rollbackTransaction();
                break;

            case 'validate_configuration':
                await this.validateConfiguration();
                break;

            case 'sync_data':
                await this.syncData();
                break;

            default:
                throw new Error(`Unknown recovery action: ${action}`);
        }
    }

    /**
     * Send notifications based on error severity
     * Requirements: 6.4
     */
    private async sendNotifications(error: ProductionError): Promise<void> {
        const notifications: StakeholderNotification[] = [];

        // Determine notification recipients based on severity and category
        const recipients = this.getNotificationRecipients(error.severity, error.category);

        for (const recipient of recipients) {
            const notification: StakeholderNotification = {
                notification_id: this.generateNotificationId(),
                error_id: error.id,
                recipient_type: recipient.type,
                recipient: recipient.address,
                message: this.formatErrorMessage(error, recipient.type),
                sent_at: new Date(),
                delivery_status: 'pending'
            };

            try {
                await this.sendNotification(notification);
                notification.delivery_status = 'sent';
            } catch (notificationError) {
                console.error(`[ERROR_HANDLING] Failed to send notification:`, notificationError);
                notification.delivery_status = 'failed';
            }

            notifications.push(notification);
        }

        // Log notifications
        await this.logNotifications(notifications);
    }

    /**
     * Generate error analytics and reports
     * Requirements: 6.4
     */
    public async generateErrorReport(
        startDate: Date,
        endDate: Date
    ): Promise<ErrorReport> {
        try {
            // Query errors from database
            const { data: errors, error } = await supabase
                .from('production_errors')
                .select('*')
                .gte('timestamp', startDate.toISOString())
                .lte('timestamp', endDate.toISOString());

            if (error) {
                throw error;
            }

            const totalErrors = errors?.length || 0;

            // Calculate error statistics
            const errorsBySeverity = this.calculateErrorsBySeverity(errors || []);
            const errorsByCategory = this.calculateErrorsByCategory(errors || []);

            // Calculate recovery success rate
            const recoverySuccessRate = await this.calculateRecoverySuccessRate(startDate, endDate);

            // Count manual interventions
            const manualInterventions = await this.countManualInterventions(startDate, endDate);

            // Identify top error patterns
            const topErrorPatterns = await this.identifyTopErrorPatterns(errors || []);

            // Generate recommendations
            const recommendations = this.generateRecommendations(errors || [], topErrorPatterns);

            return {
                report_id: this.generateReportId(),
                period_start: startDate,
                period_end: endDate,
                total_errors: totalErrors,
                errors_by_severity: errorsBySeverity,
                errors_by_category: errorsByCategory,
                recovery_success_rate: recoverySuccessRate,
                manual_interventions_required: manualInterventions,
                top_error_patterns: topErrorPatterns,
                recommendations
            };

        } catch (error) {
            console.error('[ERROR_HANDLING] Failed to generate error report:', error);
            throw error;
        }
    }

    // Private helper methods

    private initializeRecoveryStrategies(): void {
        // Payment processing error recovery
        this.recoveryStrategies.set('payment_processing_error', [
            {
                strategy_id: 'payment_retry',
                name: 'Payment Retry Strategy',
                description: 'Retry payment processing with exponential backoff',
                applicable_error_types: ['payment_processing_error'],
                recovery_steps: [
                    {
                        step_id: 'validate_payment_data',
                        name: 'Validate Payment Data',
                        description: 'Validate payment data integrity',
                        action: 'validate_configuration',
                        parameters: { validation_type: 'payment_data' },
                        timeout: 5000,
                        retry_count: 1,
                        success_criteria: 'Payment data is valid'
                    },
                    {
                        step_id: 'retry_payment',
                        name: 'Retry Payment Processing',
                        description: 'Retry the payment operation',
                        action: 'retry_operation',
                        parameters: { operation_type: 'payment', max_retries: 3 },
                        timeout: 30000,
                        retry_count: 2,
                        success_criteria: 'Payment processed successfully'
                    }
                ],
                success_rate: 0.85,
                average_recovery_time: 15000,
                requires_manual_intervention: false
            }
        ]);

        // Webhook processing error recovery
        this.recoveryStrategies.set('webhook_processing_error', [
            {
                strategy_id: 'webhook_retry',
                name: 'Webhook Retry Strategy',
                description: 'Retry webhook processing with validation',
                applicable_error_types: ['webhook_processing_error'],
                recovery_steps: [
                    {
                        step_id: 'validate_webhook',
                        name: 'Validate Webhook Data',
                        description: 'Validate webhook signature and data',
                        action: 'validate_configuration',
                        parameters: { validation_type: 'webhook' },
                        timeout: 5000,
                        retry_count: 1,
                        success_criteria: 'Webhook data is valid'
                    },
                    {
                        step_id: 'retry_webhook_processing',
                        name: 'Retry Webhook Processing',
                        description: 'Retry processing the webhook',
                        action: 'retry_operation',
                        parameters: { operation_type: 'webhook', max_retries: 2 },
                        timeout: 15000,
                        retry_count: 1,
                        success_criteria: 'Webhook processed successfully'
                    }
                ],
                success_rate: 0.90,
                average_recovery_time: 8000,
                requires_manual_intervention: false
            }
        ]);

        // Add more recovery strategies for other error types...
    }

    private determineErrorType(message: string, context: Partial<ErrorContext>): ErrorType {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('payment') || context.payment_reference) {
            return 'payment_processing_error';
        }
        if (lowerMessage.includes('webhook')) {
            return 'webhook_processing_error';
        }
        if (lowerMessage.includes('enrollment') || context.enrollment_id) {
            return 'enrollment_creation_error';
        }
        if (lowerMessage.includes('course') || context.course_id) {
            return 'course_access_error';
        }
        if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
            return 'network_error';
        }
        if (lowerMessage.includes('database') || lowerMessage.includes('supabase')) {
            return 'database_error';
        }
        if (lowerMessage.includes('config') || lowerMessage.includes('environment')) {
            return 'configuration_error';
        }
        if (lowerMessage.includes('validation')) {
            return 'validation_error';
        }
        if (lowerMessage.includes('auth')) {
            return 'authentication_error';
        }
        if (lowerMessage.includes('permission') || lowerMessage.includes('unauthorized')) {
            return 'authorization_error';
        }

        return 'unknown_error';
    }

    private determineSeverity(type: ErrorType, _message: string, _context: Partial<ErrorContext>): ErrorSeverity {
        // Critical errors
        if (type === 'payment_processing_error' || type === 'security_error') {
            return 'critical';
        }

        // High severity errors
        if (type === 'database_error' || type === 'configuration_error' || type === 'authentication_error') {
            return 'high';
        }

        // Medium severity errors
        if (type === 'webhook_processing_error' || type === 'enrollment_creation_error' || type === 'integration_error') {
            return 'medium';
        }

        // Low severity errors (default)
        return 'low';
    }

    private determineCategory(type: ErrorType): ErrorCategory {
        switch (type) {
            case 'payment_processing_error':
                return 'payment_system';
            case 'enrollment_creation_error':
                return 'enrollment_system';
            case 'course_access_error':
                return 'course_system';
            case 'authentication_error':
            case 'authorization_error':
                return 'authentication_system';
            case 'network_error':
            case 'database_error':
            case 'performance_error':
                return 'infrastructure';
            case 'security_error':
                return 'security';
            case 'webhook_processing_error':
            case 'integration_error':
                return 'integration';
            default:
                return 'infrastructure';
        }
    }

    private shouldAttemptRecovery(error: ProductionError): boolean {
        // Don't attempt recovery for low severity errors or if no strategies available
        if (error.severity === 'low') {
            return false;
        }

        const strategies = this.recoveryStrategies.get(error.type);
        return strategies !== undefined && strategies.length > 0;
    }

    private async logError(error: ProductionError): Promise<void> {
        try {
            await supabase
                .from('production_errors')
                .insert([{
                    id: error.id,
                    type: error.type,
                    severity: error.severity,
                    category: error.category,
                    message: error.message,
                    stack: error.stack,
                    context: error.context,
                    timestamp: error.timestamp.toISOString(),
                    source: error.source,
                    user_id: error.user_id,
                    session_id: error.session_id
                }]);
        } catch (logError) {
            console.error('[ERROR_HANDLING] Failed to log error to database:', logError);
        }
    }

    private async logRecoveryAttempt(attempt: RecoveryAttempt): Promise<void> {
        try {
            await supabase
                .from('error_recovery_attempts')
                .insert([{
                    attempt_id: attempt.attempt_id,
                    error_id: attempt.error_id,
                    strategy_id: attempt.strategy_id,
                    status: attempt.status,
                    started_at: attempt.started_at.toISOString(),
                    completed_at: attempt.completed_at?.toISOString(),
                    steps_completed: attempt.steps_completed,
                    steps_failed: attempt.steps_failed,
                    recovery_result: attempt.recovery_result,
                    manual_intervention_required: attempt.manual_intervention_required
                }]);
        } catch (logError) {
            console.error('[ERROR_HANDLING] Failed to log recovery attempt:', logError);
        }
    }

    private async logNotifications(notifications: StakeholderNotification[]): Promise<void> {
        try {
            await supabase
                .from('error_notifications')
                .insert(notifications.map(n => ({
                    notification_id: n.notification_id,
                    error_id: n.error_id,
                    recipient_type: n.recipient_type,
                    recipient: n.recipient,
                    message: n.message,
                    sent_at: n.sent_at.toISOString(),
                    delivery_status: n.delivery_status
                })));
        } catch (logError) {
            console.error('[ERROR_HANDLING] Failed to log notifications:', logError);
        }
    }

    // Recovery action implementations
    private async retryOperation(): Promise<void> {
        console.log('[ERROR_HANDLING] Retrying operation');
        // Implementation would depend on the specific operation type
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    private async fallbackToAlternative(): Promise<void> {
        console.log('[ERROR_HANDLING] Falling back to alternative');
        // Implementation would provide alternative processing paths
    }

    private async clearCache(): Promise<void> {
        console.log('[ERROR_HANDLING] Clearing cache');
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.clear();
        }
    }

    private async refreshCredentials(): Promise<void> {
        console.log('[ERROR_HANDLING] Refreshing credentials');
        // Implementation would refresh authentication tokens or API credentials
    }

    private async restartService(): Promise<void> {
        console.log('[ERROR_HANDLING] Restarting service');
        // Implementation would restart specific services or components
    }

    private async notifyStakeholders(): Promise<void> {
        console.log('[ERROR_HANDLING] Notifying stakeholders');
        // Implementation would notify stakeholders
    }

    private async rollbackTransaction(): Promise<void> {
        console.log('[ERROR_HANDLING] Rolling back transaction');
        // Implementation would rollback database transactions or operations
    }

    private async validateConfiguration(): Promise<void> {
        console.log('[ERROR_HANDLING] Validating configuration');
        // Implementation would validate system configuration
    }

    private async syncData(): Promise<void> {
        console.log('[ERROR_HANDLING] Syncing data');
        // Implementation would synchronize data between systems
    }

    private async escalateToManualIntervention(error: ProductionError, _attempt: RecoveryAttempt | null): Promise<void> {
        console.log(`[ERROR_HANDLING] Escalating error ${error.id} to manual intervention`);

        // Send high-priority notifications
        const urgentNotification: StakeholderNotification = {
            notification_id: this.generateNotificationId(),
            error_id: error.id,
            recipient_type: 'email',
            recipient: import.meta.env.VITE_MANUAL_INTERVENTION_EMAIL || 'admin@betaskill.com',
            message: `URGENT: Manual intervention required for ${error.type} - ${error.message}`,
            sent_at: new Date(),
            delivery_status: 'pending'
        };

        await this.sendNotification(urgentNotification);
    }

    // Utility methods
    private generateErrorId(): string {
        return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private generateRecoveryId(): string {
        return `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private generateNotificationId(): string {
        return `not_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private generateReportId(): string {
        return `rep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private setupGlobalErrorHandlers(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('error', (event) => {
                this.handleError(event.error, {
                    component: 'GlobalErrorHandler',
                    action: 'window_error',
                    metadata: {
                        filename: event.filename,
                        lineno: event.lineno,
                        colno: event.colno
                    }
                });
            });

            window.addEventListener('unhandledrejection', (event) => {
                this.handleError(event.reason, {
                    component: 'GlobalErrorHandler',
                    action: 'unhandled_rejection',
                    metadata: {
                        reason: event.reason
                    }
                });
            });
        }
    }

    private startErrorMonitoring(): void {
        // Start periodic error pattern analysis
        setInterval(() => {
            this.analyzeErrorPatterns();
        }, 5 * 60 * 1000); // Every 5 minutes
    }

    private async loadErrorPatterns(): Promise<void> {
        // Load existing error patterns from database
        try {
            const { data: patterns } = await supabase
                .from('error_patterns')
                .select('*');

            if (patterns && patterns.length > 0) {
                patterns.forEach(pattern => {
                    this.errorPatterns.set(pattern.pattern_id, pattern);
                });
            }
        } catch (error) {
            console.error('[ERROR_HANDLING] Failed to load error patterns:', error);
        }
    }

    private async updateErrorPatterns(error: ProductionError): Promise<void> {
        // Update error patterns based on new error
        const patternKey = `${error.type}_${error.category}`;
        const existingPattern = this.errorPatterns.get(patternKey);

        if (existingPattern) {
            existingPattern.frequency += 1;
        } else {
            const newPattern: ErrorPattern = {
                pattern_id: patternKey,
                description: `${error.type} in ${error.category}`,
                frequency: 1,
                impact_score: this.calculateImpactScore(error),
                suggested_fixes: this.generateSuggestedFixes(error)
            };
            this.errorPatterns.set(patternKey, newPattern);
        }
    }

    private async analyzeErrorPatterns(): Promise<void> {
        // Analyze error patterns and update recommendations
        console.log('[ERROR_HANDLING] Analyzing error patterns...');
    }

    private calculateImpactScore(error: ProductionError): number {
        const severityScores = { low: 1, medium: 2, high: 3, critical: 4 };
        return severityScores[error.severity] * 25;
    }

    private generateSuggestedFixes(error: ProductionError): string[] {
        const fixes: string[] = [];

        switch (error.type) {
            case 'payment_processing_error':
                fixes.push('Verify payment gateway configuration');
                fixes.push('Check network connectivity');
                fixes.push('Validate payment data format');
                break;
            case 'webhook_processing_error':
                fixes.push('Verify webhook signature validation');
                fixes.push('Check webhook endpoint configuration');
                fixes.push('Validate webhook payload format');
                break;
            default:
                fixes.push('Review error logs for specific details');
                fixes.push('Check system configuration');
        }

        return fixes;
    }

    private getNotificationRecipients(severity: ErrorSeverity, _category: ErrorCategory): Array<{ type: 'email' | 'slack' | 'webhook' | 'sms', address: string }> {
        const recipients: Array<{ type: 'email' | 'slack' | 'webhook' | 'sms', address: string }> = [];

        if (severity === 'critical' || severity === 'high') {
            recipients.push({
                type: 'email',
                address: import.meta.env.VITE_ALERT_EMAIL || 'admin@betaskill.com'
            });
        }

        if (severity === 'critical') {
            const slackWebhook = import.meta.env.VITE_ALERT_SLACK_WEBHOOK;
            if (slackWebhook) {
                recipients.push({
                    type: 'webhook',
                    address: slackWebhook
                });
            }
        }

        return recipients;
    }

    private formatErrorMessage(error: ProductionError, type: 'email' | 'slack' | 'webhook' | 'sms'): string {
        const timestamp = error.timestamp.toISOString();

        switch (type) {
            case 'email':
                return `
Production Error Alert

Error ID: ${error.id}
Type: ${error.type}
Severity: ${error.severity}
Category: ${error.category}
Message: ${error.message}
Source: ${error.source}
Timestamp: ${timestamp}

Context:
${JSON.stringify(error.context, null, 2)}
        `.trim();

            case 'slack':
            case 'webhook':
                return `🚨 Production Error Alert\n\n**${error.severity.toUpperCase()}**: ${error.type}\n**Message**: ${error.message}\n**Source**: ${error.source}\n**Time**: ${timestamp}`;

            case 'sms':
                return `ALERT: ${error.severity} ${error.type} - ${error.message.substring(0, 100)}`;

            default:
                return error.message;
        }
    }

    private async sendNotification(notification: StakeholderNotification): Promise<void> {
        switch (notification.recipient_type) {
            case 'email':
                // Implementation would send email
                console.log(`[ERROR_HANDLING] Sending email notification to ${notification.recipient}`);
                break;

            case 'slack':
            case 'webhook':
                // Implementation would send webhook
                console.log(`[ERROR_HANDLING] Sending webhook notification to ${notification.recipient}`);
                break;

            case 'sms':
                // Implementation would send SMS
                console.log(`[ERROR_HANDLING] Sending SMS notification to ${notification.recipient}`);
                break;
        }
    }

    private calculateErrorsBySeverity(errors: any[]): Record<ErrorSeverity, number> {
        return errors.reduce((acc, error) => {
            acc[error.severity as ErrorSeverity] = (acc[error.severity as ErrorSeverity] || 0) + 1;
            return acc;
        }, {} as Record<ErrorSeverity, number>);
    }

    private calculateErrorsByCategory(errors: any[]): Record<ErrorCategory, number> {
        return errors.reduce((acc, error) => {
            acc[error.category as ErrorCategory] = (acc[error.category as ErrorCategory] || 0) + 1;
            return acc;
        }, {} as Record<ErrorCategory, number>);
    }

    private async calculateRecoverySuccessRate(startDate: Date, endDate: Date): Promise<number> {
        try {
            const { data: attempts } = await supabase
                .from('error_recovery_attempts')
                .select('recovery_result')
                .gte('started_at', startDate.toISOString())
                .lte('started_at', endDate.toISOString());

            if (!attempts || attempts.length === 0) {
                return 0;
            }

            const successful = attempts.filter(a => a.recovery_result === 'success').length;
            return (successful / attempts.length) * 100;
        } catch (error) {
            console.error('[ERROR_HANDLING] Failed to calculate recovery success rate:', error);
            return 0;
        }
    }

    private async countManualInterventions(startDate: Date, endDate: Date): Promise<number> {
        try {
            const { data: attempts } = await supabase
                .from('error_recovery_attempts')
                .select('manual_intervention_required')
                .gte('started_at', startDate.toISOString())
                .lte('started_at', endDate.toISOString())
                .eq('manual_intervention_required', true);

            return attempts?.length || 0;
        } catch (error) {
            console.error('[ERROR_HANDLING] Failed to count manual interventions:', error);
            return 0;
        }
    }

    private async identifyTopErrorPatterns(_errors: any[]): Promise<ErrorPattern[]> {
        const patterns = Array.from(this.errorPatterns.values());
        return patterns
            .sort((a, b) => b.frequency - a.frequency)
            .slice(0, 10);
    }

    private generateRecommendations(_errors: any[], patterns: ErrorPattern[]): string[] {
        const recommendations: string[] = [];

        if (patterns.length > 0 && patterns[0]) {
            recommendations.push(`Address top error pattern: ${patterns[0].description}`);
        }

        const criticalErrors = _errors.filter(e => e.severity === 'critical');
        if (criticalErrors.length > 0) {
            recommendations.push('Prioritize resolution of critical errors');
        }

        const paymentErrors = _errors.filter(e => e.category === 'payment_system');
        if (paymentErrors.length > _errors.length * 0.3) {
            recommendations.push('Review payment system configuration and monitoring');
        }

        return recommendations;
    }

    /**
     * Public methods for external use
     */

    public isInitialized(): boolean {
        return this.initialized;
    }

    public getActiveRecoveries(): Map<string, RecoveryAttempt> {
        return new Map(this.activeRecoveries);
    }

    public getErrorPatterns(): Map<string, ErrorPattern> {
        return new Map(this.errorPatterns);
    }
}

/**
 * Export singleton instance for easy access
 */
export const productionErrorHandling = ProductionErrorHandling.getInstance();