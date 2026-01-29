
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, BookOpen, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EnrollmentGuardProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

const EnrollmentGuard = ({ isOpen, onClose, courseName }: EnrollmentGuardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className={`relative z-10 w-full max-w-lg mx-auto animate-scale-in overflow-hidden ${
        isAnimating ? 'animate-bounce' : ''
      }`}>
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Course Access Restricted</h3>
                  <p className="text-sm opacity-90">Prerequisites Required</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600 animate-pulse" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              🚫 Prerequisites Not Met
            </h4>
            <p className="text-gray-600 leading-relaxed">
              You need to complete the required course before enrolling in 
              <span className="font-semibold text-blue-600"> {courseName}</span>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-bold text-blue-800 mb-2">Required Course:</h5>
                <p className="text-blue-700 font-semibold text-lg mb-2">
                  Entrepreneurship Essentials: How to Start and Grow a Business
                </p>
                <p className="text-blue-600 text-sm">
                  This foundational course provides essential business knowledge required for all other programs.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-700 text-sm font-medium">
                You can still view course details, curriculum, and instructor information
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/course/entrepreneurship-essentials" className="w-full">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <BookOpen className="h-5 w-5 mr-2" />
                Take Required Course First
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-gray-300 hover:bg-gray-50 font-semibold py-3 rounded-xl"
            >
              Continue Browsing
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              💡 Tip: Complete the prerequisite course to unlock all features and gain foundational knowledge
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentGuard;
