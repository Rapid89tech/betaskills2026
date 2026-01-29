import React from 'react';

interface SmoothLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const SmoothLoadingSpinner: React.FC<SmoothLoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-red-500',
    secondary: 'text-gray-500',
    white: 'text-white'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
        style={{
          // Optimize for smooth animation with reduced motion
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          animationDuration: '1s', // Slower, more stable rotation
          animationTimingFunction: 'linear'
        }}
      >
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
};

// Skeleton loader component for content placeholders with reduced motion
export const SmoothSkeleton: React.FC<{
  className?: string;
  lines?: number;
  height?: string;
}> = ({ className = '', lines = 1, height = 'h-4' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${height} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded`}
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite', // Slower animation
            willChange: 'background-position'
          }}
        />
      ))}
    </div>
  );
};

// Content placeholder component with reduced motion
export const SmoothContentPlaceholder: React.FC<{
  className?: string;
  minHeight?: string;
}> = ({ className = '', minHeight = 'min-h-[200px]' }) => {
  return (
    <div
      className={`${minHeight} ${className} bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s ease-in-out infinite', // Slower animation
        willChange: 'background-position'
      }}
    />
  );
};

export default SmoothLoadingSpinner; 