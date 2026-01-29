import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserPlus, 
  Edit, 
  Eye, 
  EyeOff, 
  Key, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { Profile } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { PasswordManagementService } from '@/services/PasswordManagementService';
import { DataValidationService } from '@/services/DataValidationService';
import { InputSanitizer } from '@/utils/inputSanitization';
import { ValidationFeedback, FieldValidation, useFormValidation } from '@/components/ui/ValidationFeedback';

interface UserManagementData extends Profile {
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  login_attempts?: number;
  account_locked?: boolean;
}

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete?: (userId: string) => void;
  user: UserManagementData | null;
  mode: 'view' | 'add' | 'edit';
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
  contact_number: string;
  approval_status: string;
}

interface PasswordValidation {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  score: number;
  errors: string[];
  suggestions: string[];
}

const UserManagementModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onDelete, 
  user, 
  mode 
}: UserManagementModalProps) => {
  const { toast } = useToast();
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);

  // Get current admin user for audit logging
  useEffect(() => {
    const getCurrentAdmin = async () => {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentAdminId(user.id);
        }
      } catch (error) {
        console.error('Error getting current admin:', error);
      }
    };
    
    getCurrentAdmin();
  }, []);
  
  // Enhanced form validation state
  const {
    data: formData,
    errors: fieldErrors,
    warnings: fieldWarnings,
    isValid: formIsValid,
    validateField,
    updateField,
    clearFieldError,
    clearAllErrors,
    setData: setFormData
  } = useFormValidation({
    first_name: '',
    last_name: '',
    email: '',
    role: 'student',
    password: '',
    contact_number: '',
    approval_status: 'pending'
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    isValid: false,
    strength: 'weak',
    score: 0,
    errors: [],
    suggestions: []
  });
  const [validationMessages, setValidationMessages] = useState<{
    errors: string[];
    warnings: string[];
  }>({ errors: [], warnings: [] });

  // Password validation function using enhanced service
  const validatePassword = useCallback((password: string) => {
    const userInfo = user ? {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name
    } : undefined;

    return PasswordManagementService.validatePassword(password, {}, userInfo);
  }, [user]);

  // Generate secure password using enhanced service
  const generateSecurePassword = useCallback(() => {
    return PasswordManagementService.generateSecurePassword({
      length: 12,
      excludeSimilar: true
    });
  }, []);

  // Initialize form data when user or mode changes
  useEffect(() => {
    if (mode === 'add') {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        role: 'student',
        password: '',
        contact_number: '',
        approval_status: 'pending'
      });
      setIsEditing(true);
    } else if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        role: user.role || 'student',
        password: '',
        contact_number: user.contact_number || '',
        approval_status: user.approval_status || 'pending'
      });
      setIsEditing(mode === 'edit');
    }
    
    // Reset UI state
    setShowPassword(false);
    setActiveTab('details');
    setPasswordValidation({ isValid: false, strength: 'weak', score: 0, errors: [], suggestions: [] });
  }, [user, mode]);

  // Validate password when it changes
  useEffect(() => {
    if (formData.password) {
      setPasswordValidation(validatePassword(formData.password));
    } else {
      setPasswordValidation({ isValid: false, strength: 'weak', score: 0, errors: [], suggestions: [] });
    }
  }, [formData.password, validatePassword]);

  // Enhanced form submission with comprehensive validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      clearAllErrors();

      // Comprehensive data validation
      const validationResult = DataValidationService.validateUserData(formData, mode === 'edit');
      
      if (!validationResult.isValid) {
        setValidationMessages({
          errors: validationResult.errors,
          warnings: validationResult.warnings
        });
        
        toast({
          title: "Validation Error",
          description: DataValidationService.formatValidationErrors(validationResult.errors),
          variant: "destructive",
        });
        return;
      }

      // Validate password for new users
      if (mode === 'add' && !passwordValidation.isValid) {
        toast({
          title: "Password Error",
          description: "Please provide a valid password that meets security requirements",
          variant: "destructive",
        });
        return;
      }

      // Sanitize form data before submission
      const sanitizedData = InputSanitizer.sanitizeFormData(validationResult.sanitizedData || formData);

      // Log sanitization for security monitoring
      if (JSON.stringify(sanitizedData) !== JSON.stringify(formData)) {
        InputSanitizer.logSanitization(
          JSON.stringify(formData),
          JSON.stringify(sanitizedData),
          'UserManagementModal.handleSubmit'
        );
      }

      await onSubmit(sanitizedData);
      
      toast({
        title: "Success",
        description: mode === 'add' ? "User created successfully" : "User updated successfully",
      });
      
      clearAllErrors();
      setValidationMessages({ errors: [], warnings: [] });
      onClose();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle user deletion
  const handleDelete = async () => {
    if (!user || !onDelete) return;
    
    if (window.confirm(`Are you sure you want to delete ${user?.first_name || ''} ${user?.last_name || ''}? This action cannot be undone.`)) {
      setLoading(true);
      try {
        await onDelete(user.id);
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete user. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Generate and set password
  const handleGeneratePassword = () => {
    const newPassword = generateSecurePassword();
    if (newPassword) {
      setFormData(prev => ({ ...prev, password: newPassword }));
      setShowPassword(true);
      toast({
        title: "Password Generated",
        description: "A secure password has been generated. Make sure to copy it before saving.",
      });
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return (user.first_name[0] || '') + (user.last_name[0] || '');
    }
    if (user?.first_name) return user.first_name[0] || '';
    if (user?.email) return user.email[0] || '';
    return 'U';
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get password strength color using enhanced service
  const getPasswordStrengthColor = (strength: string) => {
    return PasswordManagementService.getPasswordStrengthColor(strength as 'weak' | 'medium' | 'strong');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'add' && <UserPlus className="h-5 w-5" />}
            {mode === 'edit' && <Edit className="h-5 w-5" />}
            {mode === 'view' && <User className="h-5 w-5" />}
            {mode === 'add' ? 'Add New User' : mode === 'edit' ? 'Edit User' : 'User Details'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Validation Summary */}
          {(validationMessages.errors.length > 0 || validationMessages.warnings.length > 0) && (
            <ValidationFeedback 
              messages={[
                ...validationMessages.errors.map(error => ({ type: 'error' as const, message: error })),
                ...validationMessages.warnings.map(warning => ({ type: 'warning' as const, message: warning }))
              ]}
              className="mb-4"
            />
          )}

          {/* User Avatar and Basic Info */}
          {user && mode !== 'add' && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {getUserInitials()}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{user?.first_name || ''} {user?.last_name || ''}</h3>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge className={getStatusBadgeColor(user.approval_status || 'pending')}>
                    {user.approval_status || 'pending'}
                  </Badge>
                </div>
              </div>
              {mode === 'view' && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {onDelete && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDelete}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tabs for different sections */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">User Details</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => {
                          const sanitizedValue = InputSanitizer.sanitizeName(e.target.value);
                          updateField('first_name', sanitizedValue);
                          
                          // Real-time validation
                          if (sanitizedValue) {
                            validateField('first_name', sanitizedValue, (value) => {
                              const result = DataValidationService.validateUserData({ first_name: value });
                              return {
                                isValid: result.isValid,
                                errors: result.errors.filter(e => e.includes('first_name')),
                                warnings: result.warnings.filter(w => w.includes('first_name'))
                              };
                            });
                          } else {
                            clearFieldError('first_name');
                          }
                        }}
                        disabled={!isEditing}
                        required
                        className={fieldErrors.first_name ? 'border-red-300' : ''}
                      />
                      <FieldValidation 
                        error={fieldErrors.first_name} 
                        warning={fieldWarnings.first_name}
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => {
                          const sanitizedValue = InputSanitizer.sanitizeName(e.target.value);
                          updateField('last_name', sanitizedValue);
                          
                          // Real-time validation
                          if (sanitizedValue) {
                            validateField('last_name', sanitizedValue, (value) => {
                              const result = DataValidationService.validateUserData({ last_name: value });
                              return {
                                isValid: result.isValid,
                                errors: result.errors.filter(e => e.includes('last_name')),
                                warnings: result.warnings.filter(w => w.includes('last_name'))
                              };
                            });
                          } else {
                            clearFieldError('last_name');
                          }
                        }}
                        disabled={!isEditing}
                        required
                        className={fieldErrors.last_name ? 'border-red-300' : ''}
                      />
                      <FieldValidation 
                        error={fieldErrors.last_name} 
                        warning={fieldWarnings.last_name}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          const sanitizedValue = InputSanitizer.sanitizeEmail(e.target.value);
                          updateField('email', sanitizedValue);
                          
                          // Real-time validation
                          if (sanitizedValue) {
                            validateField('email', sanitizedValue, (value) => {
                              const result = DataValidationService.validateUserData({ email: value });
                              return {
                                isValid: result.isValid,
                                errors: result.errors.filter(e => e.includes('email')),
                                warnings: result.warnings.filter(w => w.includes('email'))
                              };
                            });
                          } else {
                            clearFieldError('email');
                          }
                        }}
                        disabled={!isEditing}
                        className={`pl-10 ${fieldErrors.email ? 'border-red-300' : ''}`}
                        required
                      />
                    </div>
                    <FieldValidation 
                      error={fieldErrors.email} 
                      warning={fieldWarnings.email}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_number">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="contact_number"
                        type="tel"
                        value={formData.contact_number}
                        onChange={(e) => {
                          const sanitizedValue = InputSanitizer.sanitizePhoneNumber(e.target.value);
                          updateField('contact_number', sanitizedValue);
                          
                          // Real-time validation
                          if (sanitizedValue) {
                            validateField('contact_number', sanitizedValue, (value) => {
                              const result = DataValidationService.validateUserData({ contact_number: value });
                              return {
                                isValid: result.isValid,
                                errors: result.errors.filter(e => e.includes('contact_number')),
                                warnings: result.warnings.filter(w => w.includes('contact_number'))
                              };
                            });
                          } else {
                            clearFieldError('contact_number');
                          }
                        }}
                        disabled={!isEditing}
                        className={`pl-10 ${fieldErrors.contact_number ? 'border-red-300' : ''}`}
                      />
                    </div>
                    <FieldValidation 
                      error={fieldErrors.contact_number} 
                      warning={fieldWarnings.contact_number}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded-md disabled:bg-gray-100"
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="approval_status">Status</Label>
                      <select
                        id="approval_status"
                        value={formData.approval_status}
                        onChange={(e) => setFormData(prev => ({ ...prev, approval_status: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded-md disabled:bg-gray-100"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Password Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(mode === 'add' || isEditing) && (
                    <>
                      <div>
                        <Label htmlFor="password">
                          Password {mode === 'add' ? '*' : '(leave blank to keep current)'}
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            placeholder={mode === 'add' ? 'Enter password' : 'Enter new password'}
                            required={mode === 'add'}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGeneratePassword}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Generate Secure Password
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const options = PasswordManagementService.generatePasswordOptions(3);
                              const selectedPassword = options[Math.floor(Math.random() * options.length)] || '';
                              setFormData(prev => ({ ...prev, password: selectedPassword }));
                              setShowPassword(true);
                            }}
                          >
                            <Key className="h-4 w-4 mr-1" />
                            Generate Options
                          </Button>
                        </div>
                        
                        {/* Password Generation Options */}
                        <details className="text-sm">
                          <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                            Advanced Password Options
                          </summary>
                          <div className="mt-2 space-y-2 p-3 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const password = PasswordManagementService.generateSecurePassword({ length: 8 });
                                  setFormData(prev => ({ ...prev, password }));
                                  setShowPassword(true);
                                }}
                              >
                                8 chars (Basic)
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const password = PasswordManagementService.generateSecurePassword({ length: 16 });
                                  setFormData(prev => ({ ...prev, password }));
                                  setShowPassword(true);
                                }}
                              >
                                16 chars (Strong)
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const password = PasswordManagementService.generateSecurePassword({ 
                                    length: 12, 
                                    includeSpecialChars: false 
                                  });
                                  setFormData(prev => ({ ...prev, password }));
                                  setShowPassword(true);
                                }}
                              >
                                No Symbols
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const password = PasswordManagementService.generateSecurePassword({ 
                                    length: 12, 
                                    excludeSimilar: true 
                                  });
                                  setFormData(prev => ({ ...prev, password }));
                                  setShowPassword(true);
                                }}
                              >
                                Easy to Read
                              </Button>
                            </div>
                          </div>
                        </details>
                      </div>

                      {formData.password && (
                        <div className="space-y-3">
                          {/* Password Strength Indicator */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Password Strength:</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordValidation.strength)}`}
                                  style={{ width: `${passwordValidation.score}%` }}
                                />
                              </div>
                              <span className={`text-sm capitalize font-medium ${PasswordManagementService.getPasswordStrengthTextColor(passwordValidation.strength)}`}>
                                {passwordValidation.strength} ({passwordValidation.score}%)
                              </span>
                            </div>
                            
                            {/* Crack Time Estimate */}
                            <div className="text-xs text-gray-600">
                              Estimated crack time: {PasswordManagementService.estimateCrackTime(formData.password)}
                            </div>
                          </div>
                          
                          {/* Password Requirements */}
                          {passwordValidation.errors.length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <h4 className="text-sm font-medium text-red-800 mb-2">Requirements not met:</h4>
                              <div className="text-sm text-red-600 space-y-1">
                                {passwordValidation.errors.map((error, index) => (
                                  <div key={index} className="flex items-center gap-1">
                                    <XCircle className="h-3 w-3 flex-shrink-0" />
                                    {error}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Password Suggestions */}
                          {passwordValidation.suggestions.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <h4 className="text-sm font-medium text-yellow-800 mb-2">Suggestions:</h4>
                              <div className="text-sm text-yellow-700 space-y-1">
                                {passwordValidation.suggestions.map((suggestion, index) => (
                                  <div key={index} className="flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                                    {suggestion}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Success Message */}
                          {passwordValidation.isValid && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <div className="text-sm text-green-600 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Password meets all security requirements
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {mode === 'view' && !isEditing && (
                    <div className="text-center py-4 text-gray-500">
                      <Shield className="h-8 w-8 mx-auto mb-2" />
                      <p>Password information is protected</p>
                      <p className="text-sm">Click Edit to manage password</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Account Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Account Created</Label>
                        <p className="text-lg">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                        <p className="text-lg">
                          {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Last Login</Label>
                        <p className="text-lg">
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Account Status</Label>
                        <div className="flex items-center gap-2">
                          {user.account_locked ? (
                            <Badge className="bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Locked
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {mode === 'add' && (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                      <p>Activity information will be available after user creation</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <div>
              {mode === 'view' && !isEditing && onDelete && (
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  disabled={loading}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete User
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (isEditing && mode === 'view') {
                    setIsEditing(false);
                    // Reset form data to original user data
                    if (user) {
                      setFormData({
                        first_name: user.first_name || '',
                        last_name: user.last_name || '',
                        email: user.email || '',
                        role: user.role || 'student',
                        password: '',
                        contact_number: user.contact_number || '',
                        approval_status: user.approval_status || 'pending'
                      });
                    }
                  } else {
                    onClose();
                  }
                }}
                disabled={loading}
              >
                <X className="h-4 w-4 mr-1" />
                {isEditing && mode === 'view' ? 'Cancel' : 'Close'}
              </Button>
              
              {(isEditing || mode === 'add') && (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || (mode === 'add' && !passwordValidation.isValid)}
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  {mode === 'add' ? 'Create User' : 'Save Changes'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementModal;