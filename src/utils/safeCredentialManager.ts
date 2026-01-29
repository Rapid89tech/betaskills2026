/**
 * Safe Credential Manager Wrapper
 * 
 * This utility provides safe access to production credentials
 * without crashing the app if they're not properly configured.
 */

import { logger } from './logger';

export interface SafeCredentials {
  api_key: string;
  api_secret: string;
  webhook_secret: string;
  node_env: string;
  test_mode: boolean;
  api_url: string;
  timeout: number;
  retry_attempts: number;
  retry_delay: number;
  webhook_validation: boolean;
  https_required: boolean;
  payment_logging: boolean;
}

/**
 * Create fallback credentials for development
 */
const createFallbackCredentials = (): SafeCredentials => {
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  
  return {
    api_key: isDevelopment ? 'dev_api_key_placeholder' : '',
    api_secret: isDevelopment ? 'dev_api_secret_placeholder' : '',
    webhook_secret: isDevelopment ? 'dev_webhook_secret_placeholder' : '',
    node_env: isDevelopment ? 'development' : 'production',
    test_mode: isDevelopment,
    api_url: isDevelopment ? 'https://pay.ikhokha.com' : 'https://api.ikhokha.com',
    timeout: 30000,
    retry_attempts: 3,
    retry_delay: 1000,
    webhook_validation: !isDevelopment,
    https_required: !isDevelopment,
    payment_logging: true
  };
};

/**
 * Safely load production credentials without crashing the app
 */
export const safeLoadProductionCredentials = async (): Promise<SafeCredentials> => {
  try {
    // Try to load the real production credential manager
    const { productionCredentialManager } = await import('@/services/ProductionCredentialManager');
    const credentials = productionCredentialManager.loadProductionCredentials();
    
    logger.info('Production credentials loaded successfully');
    return credentials as SafeCredentials;
  } catch (error) {
    logger.warn('Failed to load production credentials, using fallback:', error);
    return createFallbackCredentials();
  }
};

/**
 * Safely validate credentials without throwing errors
 */
export const safeValidateCredentials = async (credentials: SafeCredentials) => {
  try {
    const { productionCredentialManager } = await import('@/services/ProductionCredentialManager');
    return productionCredentialManager.validateCredentialFormat(credentials as any);
  } catch (error) {
    logger.warn('Failed to validate credentials:', error);
    return {
      is_valid: false,
      errors: ['Credential validation unavailable'],
      warnings: ['Using fallback validation']
    };
  }
};

/**
 * Safely mask sensitive data
 */
export const safeMaskCredentials = (credentials: SafeCredentials) => {
  return {
    ...credentials,
    api_key: credentials.api_key ? `${credentials.api_key.substring(0, 8)}...` : 'not_set',
    api_secret: credentials.api_secret ? '***' : 'not_set',
    webhook_secret: credentials.webhook_secret ? '***' : 'not_set'
  };
};