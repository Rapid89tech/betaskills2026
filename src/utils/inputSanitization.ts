import { logger } from '@/utils/logger';

export interface SanitizationOptions {
  allowHTML?: boolean;
  maxLength?: number;
  trimWhitespace?: boolean;
  removeSpecialChars?: boolean;
  preserveNewlines?: boolean;
}

export class InputSanitizer {
  /**
   * Sanitize user input to prevent XSS and other security issues
   */
  static sanitizeInput(
    input: any, 
    options: SanitizationOptions = {}
  ): string {
    if (input === null || input === undefined) {
      return '';
    }

    let sanitized = String(input);

    // Trim whitespace by default
    if (options.trimWhitespace !== false) {
      sanitized = sanitized.trim();
    }

    // Remove or escape HTML if not allowed
    if (!options.allowHTML) {
      sanitized = this.escapeHTML(sanitized);
    } else {
      sanitized = this.sanitizeHTML(sanitized);
    }

    // Remove special characters if requested
    if (options.removeSpecialChars) {
      sanitized = this.removeSpecialCharacters(sanitized);
    }

    // Handle newlines
    if (!options.preserveNewlines) {
      sanitized = sanitized.replace(/[\r\n]/g, ' ');
    }

    // Limit length
    if (options.maxLength && sanitized.length > options.maxLength) {
      sanitized = sanitized.substring(0, options.maxLength);
      logger.warn('Input truncated due to length limit:', {
        originalLength: String(input).length,
        maxLength: options.maxLength
      });
    }

    return sanitized;
  }

  /**
   * Escape HTML characters to prevent XSS
   */
  static escapeHTML(input: string): string {
    const htmlEscapes: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };

    return input.replace(/[&<>"'/]/g, (match) => htmlEscapes[match] || match);
  }

  /**
   * Sanitize HTML content while preserving safe tags
   */
  static sanitizeHTML(input: string): string {
    // Remove dangerous tags and attributes
    let sanitized = input
      // Remove script tags and content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove iframe tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      // Remove object and embed tags
      .replace(/<(object|embed|applet|form)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '')
      // Remove javascript: protocol
      .replace(/javascript:/gi, '')
      // Remove event handlers
      .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
      // Remove style attributes that could contain expressions
      .replace(/\sstyle\s*=\s*["'][^"']*expression[^"']*["']/gi, '');

    return sanitized;
  }

  /**
   * Remove special characters that could be used in attacks
   */
  static removeSpecialCharacters(input: string): string {
    // Keep only alphanumeric, spaces, and common punctuation
    return input.replace(/[^\w\s\-_.,!?@#$%^&*()+=\[\]{}|;:'"<>]/g, '');
  }

  /**
   * Sanitize email input
   */
  static sanitizeEmail(email: string): string {
    if (!email || typeof email !== 'string') {
      return '';
    }

    return email
      .toLowerCase()
      .trim()
      .replace(/[^\w@.-]/g, '') // Keep only valid email characters
      .substring(0, 255); // Limit length
  }

  /**
   * Sanitize phone number input
   */
  static sanitizePhoneNumber(phone: string): string {
    if (!phone || typeof phone !== 'string') {
      return '';
    }

    return phone
      .replace(/[^\d+\-\s()]/g, '') // Keep only digits, +, -, spaces, parentheses
      .trim()
      .substring(0, 20); // Limit length
  }

  /**
   * Sanitize name input (first name, last name)
   */
  static sanitizeName(name: string): string {
    if (!name || typeof name !== 'string') {
      return '';
    }

    return name
      .trim()
      .replace(/[^\w\s\-'\.]/g, '') // Keep only letters, spaces, hyphens, apostrophes, dots
      .replace(/\s+/g, ' ') // Normalize whitespace
      .substring(0, 50); // Limit length
  }

  /**
   * Sanitize search query input
   */
  static sanitizeSearchQuery(query: string): string {
    if (!query || typeof query !== 'string') {
      return '';
    }

    return query
      .trim()
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript protocol
      .replace(/['"]/g, '') // Remove quotes to prevent injection
      .substring(0, 100); // Limit length
  }

  /**
   * Sanitize URL input
   */
  static sanitizeURL(url: string): string {
    if (!url || typeof url !== 'string') {
      return '';
    }

    // Remove javascript: and data: protocols
    let sanitized = url
      .trim()
      .replace(/^javascript:/gi, '')
      .replace(/^data:/gi, '')
      .replace(/^vbscript:/gi, '');

    // Ensure it starts with http:// or https:// if it looks like a URL
    if (sanitized && !sanitized.match(/^https?:\/\//i) && sanitized.includes('.')) {
      sanitized = 'https://' + sanitized;
    }

    return sanitized.substring(0, 2048); // Limit length
  }

  /**
   * Sanitize file name input
   */
  static sanitizeFileName(fileName: string): string {
    if (!fileName || typeof fileName !== 'string') {
      return '';
    }

    return fileName
      .trim()
      .replace(/[<>:"/\\|?*]/g, '') // Remove invalid file name characters
      .replace(/\.\./g, '') // Remove directory traversal attempts
      .substring(0, 255); // Limit length
  }

  /**
   * Sanitize JSON input
   */
  static sanitizeJSON(input: string): any {
    try {
      const parsed = JSON.parse(input);
      return this.sanitizeObject(parsed);
    } catch (error) {
      logger.warn('Invalid JSON input provided for sanitization');
      return null;
    }
  }

  /**
   * Recursively sanitize object properties
   */
  static sanitizeObject(obj: any, maxDepth = 10): any {
    if (maxDepth <= 0) {
      logger.warn('Maximum sanitization depth reached');
      return null;
    }

    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'string') {
      return this.sanitizeInput(obj);
    }

    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item, maxDepth - 1));
    }

    if (typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const sanitizedKey = this.sanitizeInput(key, { maxLength: 100 });
        sanitized[sanitizedKey] = this.sanitizeObject(value, maxDepth - 1);
      }
      return sanitized;
    }

    return obj;
  }

  /**
   * Validate and sanitize form data
   */
  static sanitizeFormData(formData: { [key: string]: any }): { [key: string]: any } {
    const sanitized: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(formData)) {
      const sanitizedKey = this.sanitizeInput(key, { maxLength: 100 });
      
      if (typeof value === 'string') {
        // Apply field-specific sanitization
        switch (sanitizedKey.toLowerCase()) {
          case 'email':
            sanitized[sanitizedKey] = this.sanitizeEmail(value);
            break;
          case 'phone':
          case 'contact_number':
            sanitized[sanitizedKey] = this.sanitizePhoneNumber(value);
            break;
          case 'first_name':
          case 'last_name':
          case 'name':
            sanitized[sanitizedKey] = this.sanitizeName(value);
            break;
          case 'url':
          case 'website':
            sanitized[sanitizedKey] = this.sanitizeURL(value);
            break;
          default:
            sanitized[sanitizedKey] = this.sanitizeInput(value, { maxLength: 1000 });
        }
      } else {
        sanitized[sanitizedKey] = this.sanitizeObject(value);
      }
    }

    return sanitized;
  }

  /**
   * Check if input contains potentially dangerous content
   */
  static isDangerous(input: string): boolean {
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /eval\s*\(/i,
      /expression\s*\(/i,
      /vbscript:/i,
      /data:text\/html/i,
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i
    ];

    return dangerousPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Log sanitization events for security monitoring
   */
  static logSanitization(
    originalInput: string, 
    sanitizedInput: string, 
    context: string
  ): void {
    if (originalInput !== sanitizedInput) {
      logger.info('Input sanitized:', {
        context,
        originalLength: originalInput.length,
        sanitizedLength: sanitizedInput.length,
        containedDangerousContent: this.isDangerous(originalInput)
      });

      // Log potential security threats
      if (this.isDangerous(originalInput)) {
        logger.warn('Potentially dangerous input detected and sanitized:', {
          context,
          inputPreview: originalInput.substring(0, 100) + '...'
        });
      }
    }
  }
}

// Export utility functions for backward compatibility
export const sanitizeInput = InputSanitizer.sanitizeInput;
export const escapeHTML = InputSanitizer.escapeHTML;
export const sanitizeHTML = InputSanitizer.sanitizeHTML;
export const sanitizeEmail = InputSanitizer.sanitizeEmail;
export const sanitizePhoneNumber = InputSanitizer.sanitizePhoneNumber;
export const sanitizeName = InputSanitizer.sanitizeName;
export const sanitizeFormData = InputSanitizer.sanitizeFormData;