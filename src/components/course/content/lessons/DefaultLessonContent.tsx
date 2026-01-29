
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Code, Zap, Target } from 'lucide-react';

const DefaultLessonContent = () => {
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-2xl md:rounded-2xl p-6 sm:p-8 md:p-10 text-white animate-scale-in">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🚀</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">AI-Assisted Programming Course</h2>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90">Master the future of software development with AI! 💻✨</p>
        </div>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 animate-slide-in-left rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8 lg:p-10">
            <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0 lg:p-0">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">What You'll Learn</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  <span className="text-sm sm:text-base md:text-lg text-gray-700">AI-powered code generation</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  <span className="text-sm sm:text-base md:text-lg text-gray-700">Smart debugging assistance</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  <span className="text-sm sm:text-base md:text-lg text-gray-700">Code optimization techniques</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 animate-slide-in-right rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8 lg:p-10">
            <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0 lg:p-0">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📈</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Expected Outcomes</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm sm:text-base md:text-lg text-gray-700">5-10x faster coding</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm sm:text-base md:text-lg text-gray-700">Fewer bugs and errors</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm sm:text-base md:text-lg text-gray-700">Better code quality</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tools You'll Use */}
      <Card className="bg-gradient-to-r from-emerald-100 to-blue-100 animate-slide-in-right delay-200 rounded-none sm:rounded-lg md:rounded-lg">
        <CardContent className="p-0 sm:p-6 md:p-8 lg:p-10">
          <div className="text-center mb-6 sm:mb-8 p-6 sm:p-0 md:p-0 lg:p-0">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🛠️</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">AI Tools You'll Master</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-emerald-200 text-center hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🤖</div>
                <h5 className="font-semibold text-sm sm:text-base md:text-lg">GitHub Copilot</h5>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">AI pair programmer</p>
                  </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-blue-200 text-center hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">💬</div>
                <h5 className="font-semibold text-sm sm:text-base md:text-lg">ChatGPT</h5>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Conversational AI assistant</p>
                  </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-purple-200 text-center hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">⚡</div>
                <h5 className="font-semibold text-sm sm:text-base md:text-lg">Tabnine</h5>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Smart code completion</p>
                  </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-green-200 text-center hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">☁️</div>
                <h5 className="font-semibold text-sm sm:text-base md:text-lg">CodeWhisperer</h5>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Amazon's AI coding tool</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white animate-scale-in rounded-none sm:rounded-lg md:rounded-lg">
        <CardContent className="p-0 sm:p-6 md:p-8 lg:p-10">
          <div className="text-center p-6 sm:p-0 md:p-0 lg:p-0">
            <div className="text-3xl sm:text-4xl mb-4 sm:mb-6">🚀</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Ready to Transform Your Coding?</h3>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-8">
              Join thousands of developers who are already coding faster and smarter with AI!
            </p>
            <div className="flex justify-center gap-4 text-xl sm:text-2xl">
            <span className="animate-bounce">🔥</span>
            <span className="animate-bounce delay-100">💻</span>
            <span className="animate-bounce delay-200">⚡</span>
            <span className="animate-bounce delay-300">🎯</span>
            <span className="animate-bounce delay-400">🚀</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefaultLessonContent;
