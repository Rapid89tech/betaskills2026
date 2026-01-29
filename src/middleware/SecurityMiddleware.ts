import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { productionSecurityService } from '@/services/ProductionSecurityService';

export interface SecurityRequest extends Request {
  securityContext?: {
    threatLevel: 'low' | 'medium' | 'high' | 'critical';
    validationResults: any;
    encryptedPayload?: string;
  };
}

export class SecurityMiddleware {
  /**
   * Rate limiting middleware for API endpoints
   */
  static createRateLimiter(options: {
    windowMs?: number;
    max?: number;
    message?: string;
    skipSuccessfulRequests?: boolean;
  } = {}) {
    return rateLimit({
      windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
      max: options.max || 100, // limit each IP to 100 requests per windowMs
      message: options.message || 'Too many requests from this IP, please try again later.',
      skipSuccessfulRequests: options.skipSuccessfulRequests || false,
      standardHeaders: true,
      legacyHeaders: false,
      handler: async (req: Request, res: Response) => {
        // Log rate limit violation
        await productionSecurityService.detectThreats({
          type: 'rate_limit_violation',
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          path: req.path,
          method: req.method
        });

        res.status(429).json({
          error: 'Rate limit exceeded',
          message: options.message,
          retryAfter: Math.round(options.windowMs! / 1000)
        });
      }
    });
  }

  /**
   * Security headers middleware
   */
  static securityHeaders() {
    return helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'", "https://api.ikhokha.com", "wss:"],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"]
        }
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      },
      noSniff: true,
      frameguard: { action: 'deny' },
      xssFilter: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
    });
  }

  /**
   * Webhook security validation middleware
   */
  static async validateWebhookSecurity() {
    return async (req: SecurityRequest, res: Response, next: NextFunction) => {
      try {
        const signature = req.get('X-iKhokha-Signature') || '';
        const timestamp = req.get('X-iKhokha-Timestamp') || '';
        const sourceIp = req.ip || req.connection.remoteAddress || '';
        const payload = JSON.stringify(req.body);

        // Validate webhook security
        const validationResult = await productionSecurityService.validateWebhookSecurity(
          payload,
          signature,
          timestamp,
          sourceIp
        );

        if (!validationResult.valid) {
          return res.status(401).json({
            error: 'Webhook validation failed',
            details: validationResult.validation_errors
          });
        }

        // Add security context to request
        req.securityContext = {
          threatLevel: validationResult.threat_detected ? 'high' : 'low',
          validationResults: validationResult
        };

        next();
      } catch (error) {
        console.error('Webhook security validation error:', error);
        res.status(500).json({
          error: 'Security validation failed',
          message: 'Internal security error'
        });
      }
    };
  }

  /**
   * Threat detection middleware
   */
  static async threatDetection() {
    return async (req: SecurityRequest, res: Response, next: NextFunction) => {
      try {
        const threatDetected = await productionSecurityService.detectThreats({
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          path: req.path,
          method: req.method,
          headers: req.headers,
          body: req.body,
          query: req.query,
          params: req.params
        });

        if (threatDetected) {
          return res.status(403).json({
            error: 'Security threat detected',
            message: 'Request blocked for security reasons'
          });
        }

        next();
      } catch (error) {
        console.error('Threat detection error:', error);
        next(); // Continue on error to avoid blocking legitimate requests
      }
    };
  }

  /**
   * Data encryption middleware for sensitive endpoints
   */
  static async encryptSensitiveData() {
    return async (req: SecurityRequest, res: Response, next: NextFunction) => {
      try {
        // Check if request contains sensitive data
        const sensitiveFields = ['card_number', 'cvv', 'account_number', 'ssn'];
        const hasSensitiveData = sensitiveFields.some(field => 
          req.body && req.body[field]
        );

        if (hasSensitiveData) {
          // Encrypt sensitive data
          const encryptedPayload = await productionSecurityService.encryptSensitiveData(req.body);
          
          req.securityContext = {
            ...req.securityContext,
            threatLevel: 'medium',
            encryptedPayload
          };

          // Replace body with encrypted version for logging
          req.body = { encrypted: true, payload: encryptedPayload };
        }

        next();
      } catch (error) {
        console.error('Data encryption error:', error);
        res.status(500).json({
          error: 'Data encryption failed',
          message: 'Unable to process sensitive data'
        });
      }
    };
  }

  /**
   * API authentication middleware
   */
  static async authenticateApiKey() {
    return async (req: SecurityRequest, res: Response, next: NextFunction) => {
      try {
        const apiKey = req.get('X-API-Key') || req.get('Authorization')?.replace('Bearer ', '');

        if (!apiKey) {
          return res.status(401).json({
            error: 'Missing API key',
            message: 'API key required for this endpoint'
          });
        }

        // Validate API key (implementation would check against secure storage)
        const isValidKey = await this.validateApiKey(apiKey);

        if (!isValidKey) {
          // Log invalid API key attempt
          await productionSecurityService.detectThreats({
            type: 'invalid_api_key',
            ip: req.ip,
            apiKey: apiKey.substring(0, 8) + '...',
            path: req.path
          });

          return res.status(401).json({
            error: 'Invalid API key',
            message: 'The provided API key is invalid or expired'
          });
        }

        next();
      } catch (error) {
        console.error('API authentication error:', error);
        res.status(500).json({
          error: 'Authentication failed',
          message: 'Internal authentication error'
        });
      }
    };
  }

  /**
   * Request logging middleware for audit trail
   */
  static auditLogging() {
    return async (req: SecurityRequest, res: Response, next: NextFunction) => {
      const startTime = Date.now();

      // Log request
      const requestLog = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        contentType: req.get('Content-Type'),
        contentLength: req.get('Content-Length'),
        securityContext: req.securityContext
      };

      console.log('Request:', JSON.stringify(requestLog));

      // Override res.json to log response
      const originalJson = res.json;
      res.json = function(body: any) {
        const responseTime = Date.now() - startTime;
        
        const responseLog = {
          timestamp: new Date().toISOString(),
          statusCode: res.statusCode,
          responseTime,
          path: req.path,
          method: req.method,
          ip: req.ip
        };

        console.log('Response:', JSON.stringify(responseLog));
        
        return originalJson.call(this, body);
      };

      next();
    };
  }

  /**
   * CORS middleware with security considerations
   */
  static secureCors() {
    return (req: Request, res: Response, next: NextFunction) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
      const origin = req.get('Origin');

      if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }

      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-iKhokha-Signature, X-iKhokha-Timestamp');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

      if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
      }

      next();
    };
  }

  /**
   * Input sanitization middleware
   */
  static sanitizeInput() {
    return (req: Request, res: Response, next: NextFunction) => {
      // Sanitize query parameters
      if (req.query) {
        req.query = this.sanitizeObject(req.query);
      }

      // Sanitize body
      if (req.body) {
        req.body = this.sanitizeObject(req.body);
      }

      // Sanitize params
      if (req.params) {
        req.params = this.sanitizeObject(req.params);
      }

      next();
    };
  }

  // Private helper methods
  private static async validateApiKey(apiKey: string): Promise<boolean> {
    // Implementation would validate against secure storage
    // For now, check against environment variable
    const validKeys = process.env.VALID_API_KEYS?.split(',') || [];
    return validKeys.includes(apiKey);
  }

  private static sanitizeObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return this.sanitizeString(String(obj));
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }

    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[this.sanitizeString(key)] = this.sanitizeObject(value);
    }

    return sanitized;
  }

  private static sanitizeString(str: string): string {
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
      .trim();
  }
}

// Rate limiters for different endpoint types
export const paymentRateLimit = SecurityMiddleware.createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 payment attempts per 15 minutes
  message: 'Too many payment attempts, please try again later.'
});

export const webhookRateLimit = SecurityMiddleware.createRateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 webhook calls per minute
  message: 'Webhook rate limit exceeded.'
});

export const apiRateLimit = SecurityMiddleware.createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 API calls per 15 minutes
  message: 'API rate limit exceeded.'
});

export default SecurityMiddleware;