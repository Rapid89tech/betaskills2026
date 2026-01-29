
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Play, Download, Settings, CheckCircle, ExternalLink } from 'lucide-react';

const Lesson4Content = () => {
  const [activeTab, setActiveTab] = useState('github-copilot');

  const tools = [
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      icon: '🤖',
      description: 'AI pair programmer that suggests code as you type',
      features: ['Code completion', 'Function generation', 'Test writing', 'Documentation'],
      pricing: '$10/month',
      category: 'Essential'
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      icon: '💬',
      description: 'Conversational AI for code generation and debugging',
      features: ['Natural language to code', 'Code explanation', 'Debugging help', 'Architecture advice'],
      pricing: 'Free + $20/month Pro',
      category: 'Popular'
    },
    {
      id: 'tabnine',
      name: 'Tabnine',
      icon: '⚡',
      description: 'AI-powered code completion for all languages',
      features: ['Multi-language support', 'Team training', 'Privacy focused', 'IDE integration'],
      pricing: 'Free + $12/month Pro',
      category: 'Alternative'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-2xl p-8 text-white animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🛠️</div>
          <h2 className="text-3xl font-bold">Popular AI Programming Tools and Their Features</h2>
          <p className="text-xl opacity-90">Discover the most powerful AI coding assistants! 🚀✨</p>
        </div>
      </div>

      {/* Tool Categories */}
      <Card className="border-2 border-blue-200 animate-slide-in-right">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-3xl">🎯</div>
            <h3 className="text-xl font-bold">Choose Your AI Coding Companion</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    activeTab === tool.id 
                      ? 'border-blue-500 bg-blue-50 scale-105' 
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <h4 className="font-semibold">{tool.name}</h4>
                  <Badge className={`mt-2 ${
                    tool.category === 'Essential' ? 'bg-green-500' :
                    tool.category === 'Popular' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {tool.category}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Tool Details */}
      {tools.map((tool) => (
        activeTab === tool.id && (
          <Card key={tool.id} className="overflow-hidden border-l-4 border-l-blue-500 animate-slide-in-right delay-200">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">{tool.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-600">{tool.name}</h3>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Features */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Key Features:
                  </h4>
                  <div className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="text-blue-500">✨</div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Setup */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Setup Info:
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">💰 Pricing: </span>
                      <span>{tool.pricing}</span>
                    </div>
                    <div>
                      <span className="font-semibold">⏱️ Setup Time: </span>
                      <span>5-10 minutes</span>
                    </div>
                    <div>
                      <span className="font-semibold">🎯 Best For: </span>
                      <span>
                        {tool.id === 'github-copilot' && 'Daily coding assistance'}
                        {tool.id === 'chatgpt' && 'Complex problem solving'}
                        {tool.id === 'tabnine' && 'Team collaboration'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Try It Now:
                </h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded text-sm font-mono">
                  <div className="mb-2">// {tool.name} in action:</div>
                  {tool.id === 'github-copilot' && (
                    <>
                      <div>function calculateTip(bill, percentage) {'{'}// Copilot suggests:</div>
                      <div className="text-blue-400">  return bill * (percentage / 100);</div>
                      <div>{'}'}</div>
                    </>
                  )}
                  {tool.id === 'chatgpt' && (
                    <>
                      <div>// Prompt: "Create a function to validate email"</div>
                      <div className="text-blue-400">function isValidEmail(email) {'{'}</div>
                      <div className="text-blue-400">  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);</div>
                      <div className="text-blue-400">{'}'}</div>
                    </>
                  )}
                  {tool.id === 'tabnine' && (
                    <>
                      <div>const users = [// Tabnine suggests complete array</div>
                      <div className="text-blue-400">  {'{'}name: "John", email: "john@example.com"{'}'}</div>
                      <div>];</div>
                    </>
                  )}
                </div>
              </div>

              <Button className="mt-4" asChild>
                <a href="#" className="inline-flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Get Started with {tool.name}
                </a>
              </Button>
            </CardContent>
          </Card>
        )
      ))}

      {/* Success Card */}
      <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold mb-4">Ready to Supercharge Your Coding!</h3>
          <p className="text-xl opacity-90 mb-6">
            Choose the AI tool that fits your workflow and start coding smarter, not harder! 💪✨
          </p>
          <div className="flex justify-center gap-4 text-3xl">
            <span className="animate-bounce">🚀</span>
            <span className="animate-bounce delay-100">💻</span>
            <span className="animate-bounce delay-200">⚡</span>
            <span className="animate-bounce delay-300">🎯</span>
            <span className="animate-bounce delay-400">🔥</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lesson4Content;
