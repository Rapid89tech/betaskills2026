import { logger } from '@/utils/logger';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  sanitizedData?: any;
}

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'email' | 'phone' | 'number' | 'boolean' | 'date';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => string | null;
  sanitizer?: (value: any) => any;
}

export interface UserValidationData {
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  contact_number?: string;
  approval_status?: string;
  password?: string;
}

export class DataValidationService {
  // Common validation patterns
  private static readonly PATTERNS = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE: /^[\+]?[1-9][\d]{0,15}$/,
    NAME: /^[a-zA-Z\s\-'\.]{1,50}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    SAFE_STRING: /^[a-zA-Z0-9\s\-_\.@]+$/
  };

  // User validation rules
  private static readonly USER_VALIDATION_RULES: ValidationRule[] = [
    {
      field: 'first_name',
      required: true,
      type: 'string',
      minLength: 1,
      maxLength: 50,
      pattern: DataValidationService.PATTERNS.NAME,
      sanitizer: (value: string) => DataValidationService.sanitizeString(value?.trim())
    },
    {
      field: 'last_name',
      required: true,
      type: 'string',
      minLength: 1,
      maxLength: 50,
      pattern: DataValidationService.PATTERNS.NAME,
      sanitizer: (value: string) => DataValidationService.sanitizeString(value?.trim())
    },
    {
      field: 'email',
      required: true,
      type: 'email',
      maxLength: 255,
      pattern: DataValidationService.PATTERNS.EMAIL,
      sanitizer: (value: string) => value?.toLowerCase().trim(),
      customValidator: (value: string) => {
        if (value && value.includes('..')) {
          return 'Email cannot contain consecutive dots';
        }
        if (value && (value.startsWith('.') || value.endsWith('.'))) {
          return 'Email cannot start or end with a dot';
        }
        return null;
      }
    },
    {
      field: 'role',
      required: true,
      type: 'string',
      customValidator: (value: string) => {
        const validRoles = ['student', 'instructor', 'admin'];
        if (!validRoles.includes(value)) {
          return `Role must be one of: ${validRoles.join(', ')}`;
        }
        return null;
      }
    },
    {
      field: 'contact_number',
      required: false,
      type: 'phone',
      minLength: 10,
      maxLength: 15,
      sanitizer: (value: string) => value?.replace(/[^\d\+]/g, ''),
      customValidator: (value: string) => {
        if (value && value.length < 10) {
          return 'Contact number must be at least 10 digits';
        }
        if (value && value.length > 15) {
          return 'Contact number cannot exceed 15 digits';
        }
        return null;
      }
    },
    {
      field: 'approval_status',
      required: false,
      type: 'string',
      customValidator: (value: string) => {
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (value && !validStatuses.includes(value)) {
          return `Approval status must be one of: ${validStatuses.join(', ')}`;
        }
        return null;
      }
    }
  ];

  /**
   * Validate user data for creation or update
   */
  static validateUserData(userData: UserValidationData, isUpdate = false): ValidationResult {
    try {
      const errors: string[] = [];
      const warnings: string[] = [];
      const sanitizedData: any = {};

      logger.info('Validating user data:', { 
        fields: Object.keys(userData), 
        isUpdate 
      });

      // Apply validation rules
      for (const rule of this.USER_VALIDATION_RULES) {
        const value = userData[rule.field as keyof UserValidationData];
        const fieldResult = this.validateField(value, rule, isUpdate);

        if (fieldResult.errors.length > 0) {
          errors.push(...fieldResult.errors.map(err => `${rule.field}: ${err}`));
        }

        if (fieldResult.warnings.length > 0) {
          warnings.push(...fieldResult.warnings.map(warn => `${rule.field}: ${warn}`));
        }

        if (fieldResult.sanitizedValue !== undefined) {
          sanitizedData[rule.field] = fieldResult.sanitizedValue;
        }
      }

      // Additional cross-field validation
      const crossFieldErrors = this.validateCrossFields(userData);
      errors.push(...crossFieldErrors);

      // Security validation
      const securityErrors = this.validateSecurity(userData);
      errors.push(...securityErrors);

      const result: ValidationResult = {
        isValid: errors.length === 0,
        errors,
        warnings,
        sanitizedData
      };

      logger.info('User data validation completed:', {
        isValid: result.isValid,
        errorCount: errors.length,
        warningCount: warnings.length
      });

      return result;

    } catch (error: any) {
      logger.error('Error during user data validation:', error);
      return {
        isValid: false,
        errors: ['Validation process failed'],
        warnings: []
      };
    }
  }

  /**
   * Validate a single field against its rule
   */
  private static validateField(
    value: any, 
    rule: ValidationRule, 
    isUpdate: boolean
  ): { errors: string[]; warnings: string[]; sanitizedValue?: any } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let sanitizedValue = value;

    // Handle required fields
    if (rule.required && !isUpdate && (value === undefined || value === null || value === '')) {
      errors.push('is required');
      return { errors, warnings };
    }

    // Skip validation for empty optional fields
    if (!rule.required && (value === undefined || value === null || value === '')) {
      return { errors, warnings };
    }

    // Apply sanitizer if provided
    if (rule.sanitizer && value !== undefined && value !== null) {
      try {
        sanitizedValue = rule.sanitizer(value);
      } catch (error) {
        errors.push('failed to sanitize');
        return { errors, warnings };
      }
    }

    // Type validation
    if (rule.type && sanitizedValue !== undefined && sanitizedValue !== null) {
      const typeError = this.validateType(sanitizedValue, rule.type);
      if (typeError) {
        errors.push(typeError);
      }
    }

    // Length validation
    if (sanitizedValue && typeof sanitizedValue === 'string') {
      if (rule.minLength && sanitizedValue.length < rule.minLength) {
        errors.push(`must be at least ${rule.minLength} characters`);
      }
      if (rule.maxLength && sanitizedValue.length > rule.maxLength) {
        errors.push(`cannot exceed ${rule.maxLength} characters`);
      }
    }

    // Pattern validation
    if (rule.pattern && sanitizedValue && typeof sanitizedValue === 'string') {
      if (!rule.pattern.test(sanitizedValue)) {
        errors.push('contains invalid characters or format');
      }
    }

    // Custom validation
    if (rule.customValidator && sanitizedValue !== undefined && sanitizedValue !== null) {
      const customError = rule.customValidator(sanitizedValue);
      if (customError) {
        errors.push(customError);
      }
    }

    return { errors, warnings, sanitizedValue };
  }

  /**
   * Validate data type
   */
  private static validateType(value: any, type: string): string | null {
    switch (type) {
      case 'string':
        if (typeof value !== 'string') {
          return 'must be a string';
        }
        break;
      case 'email':
        if (typeof value !== 'string' || !this.PATTERNS.EMAIL.test(value)) {
          return 'must be a valid email address';
        }
        break;
      case 'phone':
        if (typeof value !== 'string' || !this.PATTERNS.PHONE.test(value.replace(/[^\d\+]/g, ''))) {
          return 'must be a valid phone number';
        }
        break;
      case 'number':
        if (typeof value !== 'number' || isNaN(value)) {
          return 'must be a valid number';
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          return 'must be true or false';
        }
        break;
      case 'date':
        if (!(value instanceof Date) && !Date.parse(value)) {
          return 'must be a valid date';
        }
        break;
    }
    return null;
  }

  /**
   * Validate cross-field relationships
   */
  private static validateCrossFields(userData: UserValidationData): string[] {
    const errors: string[] = [];

    // Check for email uniqueness (this would typically be done at the database level)
    if (userData.email) {
      // Add any cross-field validation logic here
    }

    // Role-specific validations
    if (userData.role === 'admin' && userData.approval_status === 'rejected') {
      errors.push('Admin users cannot have rejected status');
    }

    return errors;
  }

  /**
   * Security validation to prevent common attacks
   */
  private static validateSecurity(userData: UserValidationData): string[] {
    const errors: string[] = [];

    // Check for potential XSS attempts
    for (const [key, value] of Object.entries(userData)) {
      if (typeof value === 'string') {
        if (this.containsXSSPatterns(value)) {
          errors.push(`${key} contains potentially malicious content`);
        }
        if (this.containsSQLInjectionPatterns(value)) {
          errors.push(`${key} contains potentially dangerous SQL patterns`);
        }
      }
    }

    // Check for suspicious email patterns
    if (userData.email) {
      if (this.isSuspiciousEmail(userData.email)) {
        errors.push('Email appears to be from a suspicious domain');
      }
    }

    return errors;
  }

  /**
   * Sanitize string input to prevent XSS and other attacks
   */
  static sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    return input
      .trim()
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/script/gi, '') // Remove script tags
      .substring(0, 1000); // Limit length
  }

  /**
   * Sanitize HTML content
   */
  static sanitizeHTML(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    // Basic HTML sanitization - in production, use a library like DOMPurify
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  /**
   * Check for XSS patterns
   */
  private static containsXSSPatterns(input: string): boolean {
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /eval\s*\(/i,
      /expression\s*\(/i
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Check for SQL injection patterns
   */
  private static containsSQLInjectionPatterns(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
      /('|(\\')|(;)|(--)|(\|)|(\*)|(%)|(\+))/,
      /((\3D)|(\%3D))/i // URL encoded =
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Check for suspicious email domains
   */
  private static isSuspiciousEmail(email: string): boolean {
    const suspiciousDomains = [
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com'
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    return domain ? suspiciousDomains.includes(domain) : false;
  }

  /**
   * Validate enrollment data
   */
  static validateEnrollmentData(enrollmentData: any): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const sanitizedData: any = {};

    try {
      // Validate user ID
      if (!enrollmentData.userId || typeof enrollmentData.userId !== 'string') {
        errors.push('Valid user ID is required');
      } else {
        sanitizedData.userId = this.sanitizeString(enrollmentData.userId);
      }

      // Validate course ID
      if (!enrollmentData.courseId || typeof enrollmentData.courseId !== 'string') {
        errors.push('Valid course ID is required');
      } else {
        sanitizedData.courseId = this.sanitizeString(enrollmentData.courseId);
      }

      // Validate payment type
      const validPaymentTypes = ['card', 'eft', 'manual'];
      if (enrollmentData.paymentType && !validPaymentTypes.includes(enrollmentData.paymentType)) {
        errors.push(`Payment type must be one of: ${validPaymentTypes.join(', ')}`);
      } else if (enrollmentData.paymentType) {
        sanitizedData.paymentType = enrollmentData.paymentType;
      }

      // Validate status
      const validStatuses = ['pending', 'approved', 'rejected'];
      if (enrollmentData.status && !validStatuses.includes(enrollmentData.status)) {
        errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
      } else if (enrollmentData.status) {
        sanitizedData.status = enrollmentData.status;
      }

      // Validate payment amount
      if (enrollmentData.paymentAmount !== undefined) {
        const amount = parseFloat(enrollmentData.paymentAmount);
        if (isNaN(amount) || amount < 0) {
          errors.push('Payment amount must be a valid positive number');
        } else {
          sanitizedData.paymentAmount = amount;
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        sanitizedData
      };

    } catch (error: any) {
      logger.error('Error validating enrollment data:', error);
      return {
        isValid: false,
        errors: ['Enrollment validation failed'],
        warnings: []
      };
    }
  }

  /**
   * Validate and sanitize search queries
   */
  static validateSearchQuery(query: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!query || typeof query !== 'string') {
      return {
        isValid: false,
        errors: ['Search query must be a valid string'],
        warnings: []
      };
    }

    // Sanitize the query
    const sanitizedQuery = this.sanitizeString(query);

    // Check length
    if (sanitizedQuery.length < 2) {
      errors.push('Search query must be at least 2 characters');
    }

    if (sanitizedQuery.length > 100) {
      errors.push('Search query cannot exceed 100 characters');
    }

    // Check for suspicious patterns
    if (this.containsXSSPatterns(sanitizedQuery) || this.containsSQLInjectionPatterns(sanitizedQuery)) {
      errors.push('Search query contains invalid characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitizedData: sanitizedQuery
    };
  }

  /**
   * Generate validation error messages for UI display
   */
  static formatValidationErrors(errors: string[]): string {
    if (errors.length === 0) {
      return '';
    }

    if (errors.length === 1) {
      return errors[0] || '';
    }

    return `Multiple errors found:\n• ${errors.join('\n• ')}`;
  }

  /**
   * Check if data contains sensitive information that should be logged
   */
  static containsSensitiveData(data: any): boolean {
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'credential'];
    const dataString = JSON.stringify(data || {}).toLowerCase();
    
    return sensitiveFields.some(field => dataString.includes(field));
  }
}