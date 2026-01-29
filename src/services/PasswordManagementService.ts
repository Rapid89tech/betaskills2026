import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export interface PasswordValidation {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  score: number; // 0-100
  errors: string[];
  suggestions: string[];
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  forbidCommonPasswords: boolean;
  forbidUserInfo: boolean;
}

export class PasswordManagementService {
  private static readonly DEFAULT_POLICY: PasswordPolicy = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    forbidCommonPasswords: true,
    forbidUserInfo: true
  };

  private static readonly COMMON_PASSWORDS = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
    'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'iloveyou',
    'princess', 'rockyou', '1234567', '12345678', 'sunshine', 'password1'
  ];

  private static readonly SPECIAL_CHARS = '!@#$%^&*(),.?":{}|<>';

  /**
   * Validate password against policy
   */
  static validatePassword(
    password: string, 
    policy: Partial<PasswordPolicy> = {},
    userInfo?: { email?: string; firstName?: string; lastName?: string }
  ): PasswordValidation {
    const activePolicy = { ...this.DEFAULT_POLICY, ...policy };
    const errors: string[] = [];
    const suggestions: string[] = [];
    let score = 0;

    // Length check
    if (password.length < activePolicy.minLength) {
      errors.push(`Password must be at least ${activePolicy.minLength} characters long`);
    } else {
      score += Math.min(25, (password.length - activePolicy.minLength) * 2);
    }

    // Character type checks
    if (activePolicy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
      suggestions.push('Add uppercase letters (A-Z)');
    } else if (/[A-Z]/.test(password)) {
      score += 15;
    }

    if (activePolicy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
      suggestions.push('Add lowercase letters (a-z)');
    } else if (/[a-z]/.test(password)) {
      score += 15;
    }

    if (activePolicy.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
      suggestions.push('Add numbers (0-9)');
    } else if (/\d/.test(password)) {
      score += 15;
    }

    if (activePolicy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
      suggestions.push('Add special characters (!@#$%^&*)');
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 15;
    }

    // Common password check
    if (activePolicy.forbidCommonPasswords) {
      const lowerPassword = password.toLowerCase();
      if (this.COMMON_PASSWORDS.includes(lowerPassword)) {
        errors.push('Password is too common and easily guessable');
        suggestions.push('Use a unique password that is not commonly used');
        score = Math.max(0, score - 30);
      }
    }

    // User info check
    if (activePolicy.forbidUserInfo && userInfo) {
      const lowerPassword = password.toLowerCase();
      if (userInfo.email && lowerPassword.includes(userInfo.email.split('@')[0]?.toLowerCase() || '')) {
        errors.push('Password should not contain your email username');
        suggestions.push('Avoid using your email or personal information');
        score = Math.max(0, score - 20);
      }
      if (userInfo.firstName && lowerPassword.includes(userInfo.firstName.toLowerCase())) {
        errors.push('Password should not contain your first name');
        suggestions.push('Avoid using your name or personal information');
        score = Math.max(0, score - 20);
      }
      if (userInfo.lastName && lowerPassword.includes(userInfo.lastName.toLowerCase())) {
        errors.push('Password should not contain your last name');
        suggestions.push('Avoid using your name or personal information');
        score = Math.max(0, score - 20);
      }
    }

    // Additional complexity checks
    if (password.length >= 12) {
      score += 10;
    }
    if (/[A-Z].*[A-Z]/.test(password)) {
      score += 5; // Multiple uppercase
    }
    if (/\d.*\d/.test(password)) {
      score += 5; // Multiple numbers
    }
    if (/[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 10; // Multiple special chars
    }

    // Repetition penalty
    if (/(.)\1{2,}/.test(password)) {
      score = Math.max(0, score - 15); // Repeated characters
      suggestions.push('Avoid repeating the same character multiple times');
    }

    // Sequential characters penalty
    if (this.hasSequentialChars(password)) {
      score = Math.max(0, score - 10);
      suggestions.push('Avoid sequential characters (abc, 123)');
    }

    // Determine strength
    let strength: 'weak' | 'medium' | 'strong';
    if (score >= 80 && errors.length === 0) {
      strength = 'strong';
    } else if (score >= 50 && errors.length <= 1) {
      strength = 'medium';
    } else {
      strength = 'weak';
    }

    return {
      isValid: errors.length === 0,
      strength,
      score: Math.min(100, score),
      errors,
      suggestions
    };
  }

  /**
   * Generate a secure password
   */
  static generateSecurePassword(options: {
    length?: number;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSpecialChars?: boolean;
    excludeSimilar?: boolean;
  } = {}): string {
    const {
      length = 12,
      includeUppercase = true,
      includeLowercase = true,
      includeNumbers = true,
      includeSpecialChars = true,
      excludeSimilar = true
    } = options;

    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercase = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let specialChars = this.SPECIAL_CHARS;

    // Exclude similar looking characters
    if (excludeSimilar) {
      uppercase = uppercase.replace(/[O]/g, '');
      lowercase = lowercase.replace(/[ol]/g, '');
      numbers = numbers.replace(/[01]/g, '');
      specialChars = specialChars.replace(/[|]/g, '');
    }

    let charset = '';
    let requiredChars = '';

    if (includeUppercase) {
      charset += uppercase;
      requiredChars += uppercase[Math.floor(Math.random() * uppercase.length)];
    }
    if (includeLowercase) {
      charset += lowercase;
      requiredChars += lowercase[Math.floor(Math.random() * lowercase.length)];
    }
    if (includeNumbers) {
      charset += numbers;
      requiredChars += numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (includeSpecialChars) {
      charset += specialChars;
      requiredChars += specialChars[Math.floor(Math.random() * specialChars.length)];
    }

    if (charset === '') {
      throw new Error('At least one character type must be included');
    }

    let password = requiredChars;

    // Fill the rest of the password
    for (let i = requiredChars.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password to avoid predictable patterns
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Update user password with validation
   */
  static async updateUserPassword(
    userId: string, 
    newPassword: string,
    userInfo?: { email?: string; firstName?: string; lastName?: string }
  ): Promise<{ success: boolean; validation: PasswordValidation }> {
    try {
      // Validate the new password
      const validation = this.validatePassword(newPassword, {}, userInfo);
      
      if (!validation.isValid) {
        return { success: false, validation };
      }

      logger.info('Updating user password:', { userId });

      // Update password in Supabase Auth
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        password: newPassword
      });

      if (error) {
        logger.error('Password update failed:', error);
        throw new Error(`Failed to update password: ${error.message}`);
      }

      // Update the profile's updated_at timestamp
      await supabase
        .from('profiles')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', userId);

      logger.info('Password updated successfully:', { userId });
      return { success: true, validation };

    } catch (error: any) {
      logger.error('Error updating password:', error);
      throw error;
    }
  }

  /**
   * Generate multiple password options
   */
  static generatePasswordOptions(count: number = 3): string[] {
    const options = [];
    
    for (let i = 0; i < count; i++) {
      const length = 12 + Math.floor(Math.random() * 4); // 12-15 characters
      options.push(this.generateSecurePassword({ length }));
    }
    
    return options;
  }

  /**
   * Check for sequential characters
   */
  private static hasSequentialChars(password: string): boolean {
    const sequences = [
      'abcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '0123456789',
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm'
    ];

    for (const sequence of sequences) {
      for (let i = 0; i <= sequence.length - 3; i++) {
        const subseq = sequence.substring(i, i + 3);
        if (password.toLowerCase().includes(subseq)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Get password strength color for UI
   */
  static getPasswordStrengthColor(strength: 'weak' | 'medium' | 'strong'): string {
    switch (strength) {
      case 'strong': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'weak': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  }

  /**
   * Get password strength text color for UI
   */
  static getPasswordStrengthTextColor(strength: 'weak' | 'medium' | 'strong'): string {
    switch (strength) {
      case 'strong': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'weak': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  /**
   * Estimate time to crack password (simplified)
   */
  static estimateCrackTime(password: string): string {
    const charset = this.getCharsetSize(password);
    const combinations = Math.pow(charset, password.length);
    
    // Assume 1 billion guesses per second
    const secondsToCrack = combinations / (2 * 1000000000);
    
    if (secondsToCrack < 60) {
      return 'Less than a minute';
    } else if (secondsToCrack < 3600) {
      return `${Math.ceil(secondsToCrack / 60)} minutes`;
    } else if (secondsToCrack < 86400) {
      return `${Math.ceil(secondsToCrack / 3600)} hours`;
    } else if (secondsToCrack < 31536000) {
      return `${Math.ceil(secondsToCrack / 86400)} days`;
    } else if (secondsToCrack < 31536000000) {
      return `${Math.ceil(secondsToCrack / 31536000)} years`;
    } else {
      return 'Centuries';
    }
  }

  /**
   * Get character set size for password
   */
  private static getCharsetSize(password: string): number {
    let size = 0;
    
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/\d/.test(password)) size += 10;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) size += this.SPECIAL_CHARS.length;
    
    return size;
  }
}