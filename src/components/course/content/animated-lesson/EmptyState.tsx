import React from 'react';

const EmptyState = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-bounce [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full animate-ping [animation-delay:2s]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Animated 3D Emoji */}
        <div className="mb-8">
          <span className="text-8xl animate-bounce inline-block transform transition-transform duration-300 hover:scale-125 hover:rotate-12 cursor-pointer">
            📚
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 mb-4">
          🚀 Ready to Start Learning?
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md mx-auto mb-8">
          Click the <span className="font-semibold text-blue-600 dark:text-blue-400">✨ Continue with</span> button above to begin your interactive educational experience!
        </p>

        {/* Animated Progress Dots */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse [animation-delay:0.5s]"></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse [animation-delay:1s]"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 right-8 w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>
      <div className="absolute bottom-8 left-8 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce [animation-delay:1.5s]"></div>
    </div>
  );
};

export default EmptyState;