
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, BookOpen, Clock, Award } from 'lucide-react';

const CourseVideoLearning = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 via-red-900/30 to-black relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-24 h-24 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-red-600 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-red-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-red-500/30">
            <Trophy className="h-5 w-5 text-red-400" />
            <span className="text-red-200 font-medium">Comprehensive Learning Path</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Complete Your Entrepreneurship Journey
          </h2>
          <p className="text-xl text-red-200 max-w-3xl mx-auto leading-relaxed">
            Work through each module systematically to build comprehensive entrepreneurship skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* Learning Modules Overview */}
          <Card className="bg-black/50 backdrop-blur-sm border-red-500/20 hover:border-red-400/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">5 Core Modules</h3>
              <p className="text-gray-300">Comprehensive curriculum covering all entrepreneurship fundamentals</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 backdrop-blur-sm border-red-500/20 hover:border-red-400/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Self-Paced Learning</h3>
              <p className="text-gray-300">Complete lessons at your own pace with lifetime access</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 backdrop-blur-sm border-red-500/20 hover:border-red-400/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Certificate of Completion</h3>
              <p className="text-gray-300">Earn your entrepreneurship certificate upon course completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress Section */}
        <div className="text-center animate-fade-in delay-300">
          <div className="bg-gradient-to-r from-red-600/20 to-black/40 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 max-w-4xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Begin Your Entrepreneurial Journey?
              </h3>
              <p className="text-lg text-red-200 mb-6">
                Navigate through the course modules using the sidebar. Each module contains video lessons, quizzes, and practical assignments to ensure comprehensive learning.
              </p>
              <div className="flex justify-center gap-6 mb-6">
                <div className="bg-red-600/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-red-500/30">
                  <span className="text-2xl mb-1 block">📚</span>
                  <p className="text-sm text-white font-medium">5 Modules</p>
                </div>
                <div className="bg-red-600/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-red-500/30">
                  <span className="text-2xl mb-1 block">🎥</span>
                  <p className="text-sm text-white font-medium">Video Lessons</p>
                </div>
                <div className="bg-red-600/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-red-500/30">
                  <span className="text-2xl mb-1 block">📋</span>
                  <p className="text-sm text-white font-medium">Quizzes & Assignments</p>
                </div>
                <div className="bg-red-600/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-red-500/30">
                  <span className="text-2xl mb-1 block">🏆</span>
                  <p className="text-sm text-white font-medium">Certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseVideoLearning;
