
import React from 'react';
import { Badge } from '@/components/ui/badge';

const PromptTemplates = () => {
  const promptTemplates = [
    {
      id: 'function',
      title: '🔧 Function Creation Template',
      template: '"Create a [language] function that [specific task]. The function should [requirements/constraints]. Include [error handling/validation] and add comments explaining the logic."',
      use: 'Functions, utilities, algorithms',
      color: 'blue'
    },
    {
      id: 'component',
      title: '🎨 UI Component Template', 
      template: '"Build a [framework] component for [purpose]. Style it with [styling approach]. Include [interactions/states]. Make it [accessibility/responsive] friendly."',
      use: 'React, Vue, Angular components',
      color: 'green'
    },
    {
      id: 'review',
      title: '🔍 Code Review Template',
      template: '"Review this [language] code for [specific concerns like performance, security, readability]. Suggest improvements and explain why each change would help."',
      use: 'Code optimization, debugging',
      color: 'purple'
    },
    {
      id: 'testing',
      title: '🧪 Testing Template',
      template: '"Write [testing framework] tests for [function/component name]. Include [test types like unit, integration]. Cover [edge cases/error scenarios]."',
      use: 'Jest, Cypress, testing suites',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">📋 Proven Prompt Templates</h3>
      <p className="text-gray-600">Copy these templates and customize them for your needs!</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {promptTemplates.map((template) => (
          <div key={template.id} className={`bg-${template.color}-50 rounded-lg p-6 border border-${template.color}-200`}>
            <h4 className={`font-semibold text-${template.color}-800 mb-3`}>{template.title}</h4>
            <div className="bg-white p-4 rounded border font-mono text-sm">
              {template.template}
            </div>
            <Badge className={`mt-3 bg-${template.color}-500`}>{template.use}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptTemplates;
