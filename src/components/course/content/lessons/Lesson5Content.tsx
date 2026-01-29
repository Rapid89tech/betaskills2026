
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Lesson5Hero from './lesson5/Lesson5Hero';
import WhatIsPrompt from './lesson5/WhatIsPrompt';
import KeyPrinciples from './lesson5/KeyPrinciples';
import PromptTemplates from './lesson5/PromptTemplates';
import LiveExamples from './lesson5/LiveExamples';
import CommonMistakes from './lesson5/CommonMistakes';
import Lesson5Success from './lesson5/Lesson5Success';

const Lesson5Content = () => {
  const [activeTab, setActiveTab] = useState('principles');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <Lesson5Hero />

      {/* What is a Prompt */}
      <WhatIsPrompt />

      {/* Navigation Tabs */}
      <Card className="animate-slide-in-right delay-200">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'principles', label: 'Key Principles', icon: '🧩' },
              { id: 'templates', label: 'Prompt Templates', icon: '📋' },
              { id: 'examples', label: 'Live Examples', icon: '💡' },
              { id: 'mistakes', label: 'Common Mistakes', icon: '⚠️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'principles' && <KeyPrinciples />}
          {activeTab === 'templates' && <PromptTemplates />}
          {activeTab === 'examples' && <LiveExamples />}
          {activeTab === 'mistakes' && <CommonMistakes />}
        </CardContent>
      </Card>

      {/* Success Card */}
      <Lesson5Success />
    </div>
  );
};

export default Lesson5Content;
