
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Lesson6Hero from './lesson6/Lesson6Hero';
import DebuggingIntroduction from './lesson6/DebuggingIntroduction';
import AIStrategies from './lesson6/AIStrategies';
import DebuggingExamples from './lesson6/DebuggingExamples';
import BestPractices from './lesson6/BestPractices';
import Lesson6Success from './lesson6/Lesson6Success';

const Lesson6Content = () => {
  const [activeTab, setActiveTab] = useState('introduction');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <Lesson6Hero />

      {/* Navigation Tabs */}
      <Card className="animate-slide-in-right">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'introduction', label: 'What is Debugging?', icon: '🧠' },
              { id: 'strategies', label: 'AI Strategies', icon: '🎯' },
              { id: 'examples', label: 'Live Examples', icon: '🔧' },
              { id: 'practices', label: 'Best Practices', icon: '⭐' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'introduction' && <DebuggingIntroduction />}
          {activeTab === 'strategies' && <AIStrategies />}
          {activeTab === 'examples' && <DebuggingExamples />}
          {activeTab === 'practices' && <BestPractices />}
        </CardContent>
      </Card>

      {/* Success Celebration */}
      <Lesson6Success />
    </div>
  );
};

export default Lesson6Content;
