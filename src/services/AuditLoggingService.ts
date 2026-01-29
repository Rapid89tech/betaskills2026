import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import type { 
  SecurityEvent, 
  WebhookSecurityEvent, 
  WebhookSecurityValidationResult 
} from './ProductionWebhookSecurity';
import type { 
  ValidationError, 
  ValidationWarning, 
  CompleteValidation 
} from './ProductionEnvironmentValidator';
import type { 
  SecurityAuditResult 
} from './ProductionSecurityValidator';

export interface AuditLogEntry {
  id?: string;
  admin_id: string;
  action_type: string;
  target_type: 'user' | 'enrollment' | 'system';
  target_id?: string;
  action_details: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
  session_id?: string;
}

export interface UserManagementAuditData {
  userId?: string;
  changes?: Record<string, { old: any; new: any }>;
  userData?: Record<string, any>;
  reason?: string;
}

export interface EnrollmentAuditData {
  enrollmentId: string;
  userId?: string;
  courseId?: string;
  previousStatus?: string;
  newStatus?: string;
  reason?: string;
  paymentInfo?: Record<string, any>;
}

export interface ProductionSecurityAuditData {
  validationType: 'environment' | 'security' | 'webhook' | 'configuration' | 'deployment';
  validationResult: CompleteValidation | SecurityAuditResult | WebhookSecurityValidationResult;
  securityScore?: number;
  threatLevel?: 'low' | 'medium' | 'high' | 'critical';
  violations?: string[];
  recommendations?: string[];
}

export interface ProductionValidationAuditData {
  validationId: string;
  validationType: string;
  validationStatus: 'passed' | 'failed' | 'warning';
  errors: ValidationError[];
  warnings: ValidationWarning[];
  deploymentReady: boolean;
  environmentInfo?: Record<string, any>;
}

export interface ThreatDetectionAuditData {
  threatType: 'webhook_security' | 'credential_compromise' | 'unauthorized_access' | 'configuration_tampering' | 'replay_attack';
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourceIP?: string;
  userAgent?: string;
  detectionMethod: string;
  mitigationActions: string[];
  affectedSystems: string[];
}

export class AuditLoggingService {
  private static readonly MAX_DETAIL_LENGTH = 5000;
  private static readonly SENSITIVE_FIELDS = ['password', 'token', 'secret', 'key', 'credential'];

  /**
   * Create an audit log entry
   */
  private static async createAuditLog(entry: AuditLogEntry): Promise<void> {
    try {
      // Sanitize sensitive data
      const sanitizedDetails = this.sanitizeAuditDetails(entry.action_details);
      
      // Get client information
      const clientInfo = this.getClientInfo();
      
      const auditEntry = {
        ...entry,
        action_details: sanitizedDetails,
        ip_address: entry.ip_address || clientInfo.ipAddress,
        user_agent: entry.user_agent || clientInfo.userAgent,
        session_id: entry.session_id || clientInfo.sessionId,
        timestamp: entry.timestamp || new Date().toISOString()
      };

      // Store in database
      const { error } = await supabase
        .from('audit_logs')
        .insert(auditEntry);

      if (error) {
        logger.error('Failed to create audit log:', error);
        // Don't throw error to avoid breaking the main operation
      } else {
        logger.info('Audit log created:', {
          action: entry.action_type,
          target: entry.target_type,
          admin: entry.admin_id
        });
      }

    } catch (error: any) {
      logger.error('Error creating audit log:', error);
      // Don't throw error to avoid breaking the main operation
    }
  }

  /**
   * Log user creation action
   */
  static async logUserCreation(
    adminId: string, 
    newUserId: string, 
    userData: UserManagementAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'USER_CREATED',
      target_type: 'user',
      target_id: newUserId,
      action_details: {
        user_data: this.sanitizeUserData(userData.userData || {}),
        created_at: new Date().toISOString(),
        reason: userData.reason || 'Admin user creation'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log user update action
   */
  static async logUserUpdate(
    adminId: string, 
    userId: string, 
    changes: UserManagementAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'USER_UPDATED',
      target_type: 'user',
      target_id: userId,
      action_details: {
        changes: this.sanitizeChanges(changes.changes || {}),
        updated_at: new Date().toISOString(),
        reason: changes.reason || 'Admin user update'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log user deletion action
   */
  static async logUserDeletion(
    adminId: string, 
    deletedUserId: string, 
    userData: UserManagementAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'USER_DELETED',
      target_type: 'user',
      target_id: deletedUserId,
      action_details: {
        deleted_user_data: this.sanitizeUserData(userData.userData || {}),
        deleted_at: new Date().toISOString(),
        reason: userData.reason || 'Admin user deletion'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log password change action
   */
  static async logPasswordChange(
    adminId: string, 
    targetUserId: string, 
    isReset: boolean = false
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: isReset ? 'PASSWORD_RESET' : 'PASSWORD_CHANGED',
      target_type: 'user',
      target_id: targetUserId,
      action_details: {
        is_admin_action: true,
        is_reset: isReset,
        changed_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log enrollment approval action
   */
  static async logEnrollmentApproval(
    adminId: string, 
    enrollmentData: EnrollmentAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'ENROLLMENT_APPROVED',
      target_type: 'enrollment',
      target_id: enrollmentData.enrollmentId,
      action_details: {
        enrollment_id: enrollmentData.enrollmentId,
        user_id: enrollmentData.userId,
        course_id: enrollmentData.courseId,
        previous_status: enrollmentData.previousStatus,
        new_status: enrollmentData.newStatus || 'approved',
        payment_info: this.sanitizePaymentInfo(enrollmentData.paymentInfo || {}),
        approved_at: new Date().toISOString(),
        reason: enrollmentData.reason || 'Admin approval'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log enrollment rejection action
   */
  static async logEnrollmentRejection(
    adminId: string, 
    enrollmentData: EnrollmentAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'ENROLLMENT_REJECTED',
      target_type: 'enrollment',
      target_id: enrollmentData.enrollmentId,
      action_details: {
        enrollment_id: enrollmentData.enrollmentId,
        user_id: enrollmentData.userId,
        course_id: enrollmentData.courseId,
        previous_status: enrollmentData.previousStatus,
        new_status: enrollmentData.newStatus || 'rejected',
        rejected_at: new Date().toISOString(),
        reason: enrollmentData.reason || 'Admin rejection'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log enrollment status change
   */
  static async logEnrollmentStatusChange(
    adminId: string, 
    enrollmentData: EnrollmentAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'ENROLLMENT_STATUS_CHANGED',
      target_type: 'enrollment',
      target_id: enrollmentData.enrollmentId,
      action_details: {
        enrollment_id: enrollmentData.enrollmentId,
        user_id: enrollmentData.userId,
        course_id: enrollmentData.courseId,
        previous_status: enrollmentData.previousStatus,
        new_status: enrollmentData.newStatus,
        changed_at: new Date().toISOString(),
        reason: enrollmentData.reason || 'Admin status change'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log admin login action
   */
  static async logAdminLogin(adminId: string): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'ADMIN_LOGIN',
      target_type: 'system',
      action_details: {
        login_at: new Date().toISOString(),
        login_method: 'dashboard'
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log admin logout action
   */
  static async logAdminLogout(adminId: string): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'ADMIN_LOGOUT',
      target_type: 'system',
      action_details: {
        logout_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log security event
   */
  static async logSecurityEvent(
    adminId: string, 
    eventType: string, 
    details: Record<string, any>
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: `SECURITY_${eventType.toUpperCase()}`,
      target_type: 'system',
      action_details: {
        event_type: eventType,
        details: this.sanitizeAuditDetails(details),
        detected_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log production security audit events
   * Requirements: 5.3, 5.4
   */
  static async logProductionSecurityAudit(
    adminId: string,
    auditData: ProductionSecurityAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'PRODUCTION_SECURITY_AUDIT',
      target_type: 'system',
      action_details: {
        validation_type: auditData.validationType,
        security_score: auditData.securityScore,
        threat_level: auditData.threatLevel,
        violations: auditData.violations || [],
        recommendations: auditData.recommendations || [],
        validation_result: this.sanitizeValidationResult(auditData.validationResult),
        audit_timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log production environment validation events
   * Requirements: 6.1, 6.4
   */
  static async logProductionValidation(
    adminId: string,
    validationData: ProductionValidationAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'PRODUCTION_VALIDATION',
      target_type: 'system',
      action_details: {
        validation_id: validationData.validationId,
        validation_type: validationData.validationType,
        validation_status: validationData.validationStatus,
        deployment_ready: validationData.deploymentReady,
        errors_count: validationData.errors.length,
        warnings_count: validationData.warnings.length,
        critical_errors: validationData.errors.filter(e => e.severity === 'critical').map(e => e.message),
        warnings: validationData.warnings.map(w => w.message),
        environment_info: this.sanitizeAuditDetails(validationData.environmentInfo || {}),
        validated_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log webhook security validation events
   * Requirements: 5.4, 5.5
   */
  static async logWebhookSecurityValidation(
    adminId: string,
    webhookEvent: WebhookSecurityEvent
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'WEBHOOK_SECURITY_VALIDATION',
      target_type: 'system',
      action_details: {
        event_id: webhookEvent.id,
        event_type: webhookEvent.eventType,
        severity: webhookEvent.severity,
        description: webhookEvent.description,
        source_ip: webhookEvent.sourceIP,
        user_agent: webhookEvent.userAgent,
        validation_result: {
          valid: webhookEvent.validationResult.valid,
          signature_valid: webhookEvent.validationResult.signatureValid,
          timestamp_valid: webhookEvent.validationResult.timestampValid,
          source_valid: webhookEvent.validationResult.sourceValid,
          violations_count: webhookEvent.validationResult.securityViolations.length,
          processing_time_ms: webhookEvent.validationResult.processingTimeMs
        },
        webhook_data: this.sanitizeWebhookData(webhookEvent.webhookData),
        metadata: this.sanitizeAuditDetails(webhookEvent.metadata),
        validated_at: webhookEvent.timestamp.toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log threat detection events
   * Requirements: 5.5, 6.4
   */
  static async logThreatDetection(
    adminId: string,
    threatData: ThreatDetectionAuditData
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'THREAT_DETECTED',
      target_type: 'system',
      action_details: {
        threat_type: threatData.threatType,
        severity: threatData.severity,
        source_ip: threatData.sourceIP,
        user_agent: threatData.userAgent,
        detection_method: threatData.detectionMethod,
        mitigation_actions: threatData.mitigationActions,
        affected_systems: threatData.affectedSystems,
        detected_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log production configuration changes
   * Requirements: 6.1, 6.4
   */
  static async logProductionConfigurationChange(
    adminId: string,
    configType: string,
    changes: Record<string, { old: any; new: any }>,
    reason?: string
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: 'PRODUCTION_CONFIG_CHANGED',
      target_type: 'system',
      action_details: {
        configuration_type: configType,
        changes: this.sanitizeConfigurationChanges(changes),
        reason: reason || 'Production configuration update',
        changed_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log production deployment events
   * Requirements: 6.1, 6.4
   */
  static async logProductionDeployment(
    adminId: string,
    deploymentType: 'pre_deployment' | 'deployment' | 'post_deployment' | 'rollback',
    deploymentData: {
      deploymentId?: string;
      version?: string;
      environment?: string;
      validationResults?: Record<string, any>;
      healthChecks?: Record<string, any>;
      status: 'success' | 'failure' | 'warning';
      details?: Record<string, any>;
    }
  ): Promise<void> {
    await this.createAuditLog({
      admin_id: adminId,
      action_type: `PRODUCTION_DEPLOYMENT_${deploymentType.toUpperCase()}`,
      target_type: 'system',
      action_details: {
        deployment_id: deploymentData.deploymentId,
        deployment_type: deploymentType,
        version: deploymentData.version,
        environment: deploymentData.environment,
        status: deploymentData.status,
        validation_results: this.sanitizeAuditDetails(deploymentData.validationResults || {}),
        health_checks: this.sanitizeAuditDetails(deploymentData.healthChecks || {}),
        deployment_details: this.sanitizeAuditDetails(deploymentData.details || {}),
        deployed_at: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Aggregate production validation events for reporting
   * Requirements: 6.1, 6.4
   */
  static async getProductionValidationReport(
    startDate: string,
    endDate: string,
    validationType?: string
  ): Promise<{
    summary: {
      total_validations: number;
      successful_validations: number;
      failed_validations: number;
      security_violations: number;
      threat_detections: number;
    };
    validations: AuditLogEntry[];
    securityEvents: AuditLogEntry[];
    threatEvents: AuditLogEntry[];
  }> {
    try {
      // Build query for production validation events
      let query = supabase
        .from('audit_logs')
        .select('*')
        .in('action_type', [
          'PRODUCTION_SECURITY_AUDIT',
          'PRODUCTION_VALIDATION',
          'WEBHOOK_SECURITY_VALIDATION',
          'THREAT_DETECTED',
          'PRODUCTION_CONFIG_CHANGED',
          'PRODUCTION_DEPLOYMENT_PRE_DEPLOYMENT',
          'PRODUCTION_DEPLOYMENT_DEPLOYMENT',
          'PRODUCTION_DEPLOYMENT_POST_DEPLOYMENT',
          'PRODUCTION_DEPLOYMENT_ROLLBACK'
        ])
        .gte('timestamp', startDate)
        .lte('timestamp', endDate)
        .order('timestamp', { ascending: false });

      if (validationType) {
        query = query.ilike('action_details->validation_type', `%${validationType}%`);
      }

      const { data: logs, error } = await query;

      if (error) {
        logger.error('Error fetching production validation report:', error);
        throw new Error(`Failed to fetch validation report: ${error.message}`);
      }

      const allLogs = (logs || []) as AuditLogEntry[];

      // Categorize logs
      const validations = allLogs.filter(log => 
        ['PRODUCTION_SECURITY_AUDIT', 'PRODUCTION_VALIDATION', 'WEBHOOK_SECURITY_VALIDATION'].includes(log.action_type)
      );

      const securityEvents = allLogs.filter(log => 
        log.action_type.startsWith('SECURITY_') || log.action_type === 'WEBHOOK_SECURITY_VALIDATION'
      );

      const threatEvents = allLogs.filter(log => 
        log.action_type === 'THREAT_DETECTED'
      );

      // Calculate summary statistics
      const successfulValidations = validations.filter(log => {
        const details = log.action_details as any;
        return details.validation_status === 'passed' || 
               details.validation_result?.valid === true ||
               details.deployment_ready === true;
      }).length;

      const failedValidations = validations.filter(log => {
        const details = log.action_details as any;
        return details.validation_status === 'failed' || 
               details.validation_result?.valid === false ||
               details.deployment_ready === false;
      }).length;

      return {
        summary: {
          total_validations: validations.length,
          successful_validations: successfulValidations,
          failed_validations: failedValidations,
          security_violations: securityEvents.length,
          threat_detections: threatEvents.length
        },
        validations,
        securityEvents,
        threatEvents
      };

    } catch (error: any) {
      logger.error('Error generating production validation report:', error);
      throw error;
    }
  }

  /**
   * Get production security metrics for monitoring dashboard
   * Requirements: 6.1, 6.4
   */
  static async getProductionSecurityMetrics(
    timeRange: '1h' | '24h' | '7d' | '30d' = '24h'
  ): Promise<{
    securityScore: number;
    threatLevel: string;
    validationSuccess: number;
    securityViolations: number;
    recentThreats: AuditLogEntry[];
    trendData: Array<{
      timestamp: string;
      validations: number;
      violations: number;
      threats: number;
    }>;
  }> {
    try {
      const now = new Date();
      const timeRangeMs = {
        '1h': 60 * 60 * 1000,
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000
      };

      const startTime = new Date(now.getTime() - timeRangeMs[timeRange]);

      const { data: logs, error } = await supabase
        .from('audit_logs')
        .select('*')
        .in('action_type', [
          'PRODUCTION_SECURITY_AUDIT',
          'PRODUCTION_VALIDATION',
          'WEBHOOK_SECURITY_VALIDATION',
          'THREAT_DETECTED'
        ])
        .gte('timestamp', startTime.toISOString())
        .order('timestamp', { ascending: false });

      if (error) {
        logger.error('Error fetching production security metrics:', error);
        throw new Error(`Failed to fetch security metrics: ${error.message}`);
      }

      const allLogs = (logs || []) as AuditLogEntry[];

      // Calculate metrics
      const validationLogs = allLogs.filter(log => 
        ['PRODUCTION_SECURITY_AUDIT', 'PRODUCTION_VALIDATION', 'WEBHOOK_SECURITY_VALIDATION'].includes(log.action_type)
      );

      const threatLogs = allLogs.filter(log => log.action_type === 'THREAT_DETECTED');

      const successfulValidations = validationLogs.filter(log => {
        const details = log.action_details as any;
        return details.validation_result?.valid === true || details.validation_status === 'passed';
      }).length;

      const validationSuccess = validationLogs.length > 0 ? 
        Math.round((successfulValidations / validationLogs.length) * 100) : 100;

      // Calculate average security score
      const securityScores = allLogs
        .map(log => (log.action_details as any)?.security_score)
        .filter(score => typeof score === 'number');
      
      const securityScore = securityScores.length > 0 ? 
        Math.round(securityScores.reduce((sum, score) => sum + score, 0) / securityScores.length) : 100;

      // Determine threat level
      const criticalThreats = threatLogs.filter(log => 
        (log.action_details as any)?.severity === 'critical'
      ).length;
      
      const highThreats = threatLogs.filter(log => 
        (log.action_details as any)?.severity === 'high'
      ).length;

      let threatLevel = 'low';
      if (criticalThreats > 0) threatLevel = 'critical';
      else if (highThreats > 2) threatLevel = 'high';
      else if (highThreats > 0 || threatLogs.length > 5) threatLevel = 'medium';

      // Get recent threats (last 10)
      const recentThreats = threatLogs.slice(0, 10);

      // Generate trend data (simplified for now)
      const trendData = this.generateTrendData(allLogs, timeRange);

      return {
        securityScore,
        threatLevel,
        validationSuccess,
        securityViolations: allLogs.filter(log => 
          log.action_type.includes('SECURITY') && 
          (log.action_details as any)?.severity === 'high' || 
          (log.action_details as any)?.severity === 'critical'
        ).length,
        recentThreats,
        trendData
      };

    } catch (error: any) {
      logger.error('Error getting production security metrics:', error);
      throw error;
    }
  }

  /**
   * Get audit logs with filtering and pagination
   */
  static async getAuditLogs(options: {
    adminId?: string;
    actionType?: string;
    targetType?: 'user' | 'enrollment' | 'system';
    targetId?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<AuditLogEntry[]> {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      // Apply filters
      if (options.adminId) {
        query = query.eq('admin_id', options.adminId);
      }

      if (options.actionType) {
        query = query.eq('action_type', options.actionType);
      }

      if (options.targetType) {
        query = query.eq('target_type', options.targetType);
      }

      if (options.targetId) {
        query = query.eq('target_id', options.targetId);
      }

      if (options.startDate) {
        query = query.gte('timestamp', options.startDate);
      }

      if (options.endDate) {
        query = query.lte('timestamp', options.endDate);
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('Error fetching audit logs:', error);
        throw new Error(`Failed to fetch audit logs: ${error.message}`);
      }

      return (data || []) as AuditLogEntry[];

    } catch (error: any) {
      logger.error('Error getting audit logs:', error);
      throw error;
    }
  }

  /**
   * Generate audit report for a date range
   */
  static async generateAuditReport(
    startDate: string, 
    endDate: string, 
    adminId?: string
  ): Promise<{
    summary: Record<string, number>;
    logs: AuditLogEntry[];
    totalCount: number;
  }> {
    try {
      const options: {
        startDate: string;
        endDate: string;
        adminId?: string;
        limit: number;
      } = {
        startDate,
        endDate,
        limit: 1000
      };

      if (adminId) {
        options.adminId = adminId;
      }

      const logs = await this.getAuditLogs(options);

      // Generate summary statistics
      const summary = logs.reduce((acc, log) => {
        acc[log.action_type] = (acc[log.action_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        summary,
        logs,
        totalCount: logs.length
      };

    } catch (error: any) {
      logger.error('Error generating audit report:', error);
      throw error;
    }
  }

  /**
   * Sanitize audit details to remove sensitive information
   */
  private static sanitizeAuditDetails(details: Record<string, any>): Record<string, any> {
    const sanitized = { ...details };

    // Remove sensitive fields
    for (const field of this.SENSITIVE_FIELDS) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    // Recursively sanitize nested objects
    for (const [key, value] of Object.entries(sanitized)) {
      if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeAuditDetails(value);
      }
    }

    // Limit the size of the details
    const detailsString = JSON.stringify(sanitized);
    if (detailsString.length > this.MAX_DETAIL_LENGTH) {
      return {
        ...sanitized,
        _truncated: true,
        _original_size: detailsString.length
      };
    }

    return sanitized;
  }

  /**
   * Sanitize user data for audit logging
   */
  private static sanitizeUserData(userData: Record<string, any>): Record<string, any> {
    const sanitized = { ...userData };
    
    // Remove sensitive fields
    delete sanitized.password;
    delete sanitized.password_hash;
    
    return sanitized;
  }

  /**
   * Sanitize changes data for audit logging
   */
  private static sanitizeChanges(changes: Record<string, { old: any; new: any }>): Record<string, { old: any; new: any }> {
    const sanitized = { ...changes };
    
    // Redact password changes
    if (sanitized.password) {
      sanitized.password = {
        old: '[REDACTED]',
        new: '[REDACTED]'
      };
    }
    
    return sanitized;
  }

  /**
   * Sanitize payment information for audit logging
   */
  private static sanitizePaymentInfo(paymentInfo: Record<string, any>): Record<string, any> {
    const sanitized = { ...paymentInfo };
    
    // Redact sensitive payment fields
    if (sanitized.card_number) {
      sanitized.card_number = this.maskCardNumber(sanitized.card_number);
    }
    
    if (sanitized.cvv) {
      sanitized.cvv = '[REDACTED]';
    }
    
    return sanitized;
  }

  /**
   * Mask card number for logging
   */
  private static maskCardNumber(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 4) {
      return '[REDACTED]';
    }
    
    const lastFour = cardNumber.slice(-4);
    return `****-****-****-${lastFour}`;
  }

  /**
   * Get client information for audit logging
   */
  private static getClientInfo(): {
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
  } {
    try {
      const result: {
        ipAddress?: string;
        userAgent?: string;
        sessionId?: string;
      } = {
        sessionId: this.generateSessionId()
      };

      if (typeof navigator !== 'undefined') {
        result.userAgent = navigator.userAgent;
      }

      return result;
    } catch (error) {
      return {};
    }
  }

  /**
   * Generate a session ID for tracking
   */
  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clean up old audit logs (should be run periodically)
   */
  static async cleanupOldLogs(retentionDays: number = 365): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      const { error } = await supabase
        .from('audit_logs')
        .delete()
        .lt('timestamp', cutoffDate.toISOString());

      if (error) {
        logger.error('Error cleaning up old audit logs:', error);
        throw new Error(`Failed to cleanup old logs: ${error.message}`);
      }

      logger.info('Old audit logs cleaned up successfully', {
        cutoffDate: cutoffDate.toISOString(),
        retentionDays
      });

    } catch (error: any) {
      logger.error('Error during audit log cleanup:', error);
      throw error;
    }
  }
}