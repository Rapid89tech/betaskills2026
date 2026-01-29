import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ValidationMessage {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  field?: string;
}

interface ValidationFeedbackProps {
  messages: ValidationMessage[];
  className?: string | undefined;
  showIcons?: boolean;
  compact?: boolean;
}

export const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({
  messages,
  className,
  showIcons = true,
  compact = false
}) => {
  if (!messages || messages.length === 0) {
    return null;
  }

  const getIcon = (type: ValidationMessage['type']) => {
    const iconClass = "h-4 w-4 flex-shrink-0";
    
    switch (type) {
      case 'error':
        return <AlertCircle className={cn(iconClass, "text-red-500")} />;
      case 'warning':
        return <AlertTriangle className={cn(iconClass, "text-yellow-500")} />;
      case 'success':
        return <CheckCircle className={cn(iconClass, "text-green-500")} />;
      case 'info':
        return <Info className={cn(iconClass, "text-blue-500")} />;
      default:
        return <Info className={cn(iconClass, "text-gray-500")} />;
    }
  };

  const getMessageStyle = (type: ValidationMessage['type']) => {
    const baseStyle = compact ? "text-xs" : "text-sm";
    
    switch (type) {
      case 'error':
        return cn(baseStyle, "text-red-700 bg-red-50 border-red-200");
      case 'warning':
        return cn(baseStyle, "text-yellow-700 bg-yellow-50 border-yellow-200");
      case 'success':
        return cn(baseStyle, "text-green-700 bg-green-50 border-green-200");
      case 'info':
        return cn(baseStyle, "text-blue-700 bg-blue-50 border-blue-200");
      default:
        return cn(baseStyle, "text-gray-700 bg-gray-50 border-gray-200");
    }
  };

  // Group messages by type for better organization
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.type]) {
      acc[message.type] = [];
    }
    acc[message.type].push(message);
    return acc;
  }, {} as Record<ValidationMessage['type'], ValidationMessage[]>);

  return (
    <div className={cn("space-y-2", className)}>
      {Object.entries(groupedMessages).map(([type, typeMessages]) => (
        <div
          key={type}
          className={cn(
            "border rounded-lg p-3",
            getMessageStyle(type as ValidationMessage['type'])
          )}
        >
          <div className="space-y-1">
            {typeMessages.map((message, index) => (
              <div key={index} className="flex items-start gap-2">
                {showIcons && getIcon(type as ValidationMessage['type'])}
                <div className="flex-1">
                  {message.field && (
                    <span className="font-medium">{message.field}: </span>
                  )}
                  <span>{message.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface FieldValidationProps {
  error?: string;
  warning?: string;
  success?: string;
  className?: string | undefined;
}

export const FieldValidation: React.FC<FieldValidationProps> = ({
  error,
  warning,
  success,
  className
}) => {
  const messages: ValidationMessage[] = [];

  if (error) {
    messages.push({ type: 'error', message: error });
  }
  if (warning) {
    messages.push({ type: 'warning', message: warning });
  }
  if (success) {
    messages.push({ type: 'success', message: success });
  }

  return (
    <ValidationFeedback 
      messages={messages} 
      className={className}
      compact={true}
    />
  );
};

interface ValidationSummaryProps {
  errors: string[];
  warnings: string[];
  className?: string;
  title?: string;
}

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({
  errors,
  warnings,
  className,
  title = "Validation Results"
}) => {
  const messages: ValidationMessage[] = [
    ...errors.map(error => ({ type: 'error' as const, message: error })),
    ...warnings.map(warning => ({ type: 'warning' as const, message: warning }))
  ];

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <ValidationFeedback messages={messages} />
    </div>
  );
};

interface RealTimeValidationProps {
  value: string;
  validator: (value: string) => { isValid: boolean; errors: string[]; warnings: string[] };
  className?: string;
  debounceMs?: number;
}

export const RealTimeValidation: React.FC<RealTimeValidationProps> = ({
  value,
  validator,
  className,
  debounceMs = 300
}) => {
  const [validationResult, setValidationResult] = React.useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }>({ isValid: true, errors: [], warnings: [] });

  const [isValidating, setIsValidating] = React.useState(false);

  React.useEffect(() => {
    if (!value) {
      setValidationResult({ isValid: true, errors: [], warnings: [] });
      return;
    }

    setIsValidating(true);
    const timeoutId = setTimeout(() => {
      try {
        const result = validator(value);
        setValidationResult(result);
      } catch (error) {
        setValidationResult({
          isValid: false,
          errors: ['Validation error occurred'],
          warnings: []
        });
      } finally {
        setIsValidating(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [value, validator, debounceMs]);

  const messages: ValidationMessage[] = [
    ...validationResult.errors.map(error => ({ type: 'error' as const, message: error })),
    ...validationResult.warnings.map(warning => ({ type: 'warning' as const, message: warning }))
  ];

  if (isValidating) {
    return (
      <div className={cn("text-xs text-gray-500 flex items-center gap-1", className)}>
        <div className="animate-spin h-3 w-3 border border-gray-300 border-t-gray-600 rounded-full"></div>
        Validating...
      </div>
    );
  }

  return (
    <ValidationFeedback 
      messages={messages} 
      className={className}
      compact={true}
    />
  );
};

// Hook for managing form validation state
export const useFormValidation = (initialData: any = {}) => {
  const [data, setData] = React.useState(initialData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [warnings, setWarnings] = React.useState<Record<string, string>>({});
  const [isValid, setIsValid] = React.useState(true);

  const validateField = React.useCallback((
    fieldName: string, 
    value: any, 
    validator: (value: any) => { isValid: boolean; errors: string[]; warnings: string[] }
  ) => {
    const result = validator(value);
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: result.errors[0] || ''
    }));
    
    setWarnings(prev => ({
      ...prev,
      [fieldName]: result.warnings[0] || ''
    }));

    return result.isValid;
  }, []);

  const updateField = React.useCallback((fieldName: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  const clearFieldError = React.useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = React.useCallback(() => {
    setErrors({});
    setWarnings({});
  }, []);

  React.useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error);
    setIsValid(!hasErrors);
  }, [errors]);

  return {
    data,
    errors,
    warnings,
    isValid,
    validateField,
    updateField,
    clearFieldError,
    clearAllErrors,
    setData
  };
};