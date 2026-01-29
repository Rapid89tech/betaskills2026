
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Cpu, Zap, Target, CheckCircle } from 'lucide-react';

const Lesson2Content = () => {
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-2xl md:rounded-2xl p-6 sm:p-8 md:p-10 text-white animate-scale-in">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🤖</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Types of AI Tools: Autocompletion, Code Generation, Static Analysis</h2>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90">Discover the power of AI in modern software development! 🚀</p>
        </div>
      </div>

      {/* Interactive Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Autocompletion */}
        <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-blue-200 hover:border-blue-400 rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8">
            <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base">
                <Zap className="h-4 w-4 mr-2" />
                Autocompletion
              </Badge>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Smart Code Suggestions</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">AI predicts and completes your code as you type!</p>
            </div>
          </CardContent>
        </Card>

        {/* Code Generation */}
        <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 hover:border-purple-400 rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8">
            <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🤖</div>
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base">
                <Code className="h-4 w-4 mr-2" />
                Code Generation
              </Badge>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">AI-Powered Coding</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">Generate entire functions and classes from descriptions!</p>
            </div>
          </CardContent>
        </Card>

        {/* Static Analysis */}
        <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-green-200 hover:border-green-400 rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8">
            <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
              <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base">
                <Target className="h-4 w-4 mr-2" />
                Static Analysis
              </Badge>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Intelligent Code Review</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">AI finds bugs and improvements without running code!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Content Sections */}
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {/* Autocompletion Section */}
        <Card className="overflow-hidden border-l-4 border-l-blue-500 animate-slide-in-right rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8 lg:p-10">
            <div className="space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0 lg:p-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">Autocompletion Tools</h3>
            </div>
            
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
                Autocompletion tools use machine learning to predict what you're going to type next, 
                making coding faster and reducing errors.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">Tabnine</h4>
                  <p className="text-sm sm:text-base text-blue-700">Context-aware code completion</p>
                  </div>
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">Kite</h4>
                  <p className="text-sm sm:text-base text-green-700">Python-focused autocompletion</p>
                  </div>
                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">IntelliCode</h4>
                  <p className="text-sm sm:text-base text-purple-700">Microsoft's AI-powered suggestions</p>
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Generation Section */}
        <Card className="overflow-hidden border-l-4 border-l-purple-500 animate-slide-in-right delay-200 rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8 lg:p-10">
            <div className="space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0 lg:p-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Code className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">Code Generation Tools</h3>
            </div>
            
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
                These tools can generate entire code blocks, functions, and even complete applications 
                based on natural language descriptions.
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 sm:p-8 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3 sm:mb-4 text-lg sm:text-xl">Example: Function Generator</h4>
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-purple-300">
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                    <strong>Input:</strong> "Create a function that sorts an array of numbers in ascending order"
                  </p>
                  <div className="bg-gray-100 p-3 sm:p-4 rounded border-l-4 border-l-purple-500">
                    <code className="text-sm sm:text-base text-purple-800">
                      function sortNumbers(arr) {'{'}
                      <br />
                      &nbsp;&nbsp;return arr.sort((a, b) => a - b);
                      <br />
                      {'}'}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Static Analysis Section */}
        <Card className="overflow-hidden border-l-4 border-l-green-500 animate-slide-in-right delay-400 rounded-none sm:rounded-lg md:rounded-lg">
          <CardContent className="p-0 sm:p-6 md:p-8 lg:p-10">
            <div className="space-y-4 sm:space-y-6 p-6 sm:p-0 md:p-0 lg:p-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">Static Analysis Tools</h3>
            </div>
            
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
                Static analysis tools examine code without executing it, identifying potential issues, 
                security vulnerabilities, and optimization opportunities.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">SonarQube</h4>
                  <p className="text-sm sm:text-base text-green-700">Comprehensive code quality analysis</p>
                    </div>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">ESLint</h4>
                  <p className="text-sm sm:text-base text-blue-700">JavaScript/TypeScript linting</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
          </div>
    </div>
  );
};

export default Lesson2Content;
