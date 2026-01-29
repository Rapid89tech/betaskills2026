
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Search, TrendingUp, Users, BarChart3, CheckCircle } from 'lucide-react';

const EntrepreneurshipModule = () => {
  const activities = [
    {
      id: 1,
      icon: Search,
      title: 'Look for Market Gaps',
      description: 'Find areas where products or services are missing, or not good enough.',
      explanation: 'This means finding areas where people need something but can\'t find it, or where the current options aren\'t working well. You become the detective looking for these missing pieces.',
      example: 'No affordable small wedding venues nearby',
      detailedExample: 'Maybe people in your area want a small wedding venue for 50 people or less, but all the current venues only handle big weddings of 200+ people. That\'s a gap you could fill by creating a cozy, affordable option for smaller celebrations.',
      actionSteps: [
        'Walk around your neighborhood and ask "What\'s missing here?"',
        'Talk to friends and family about what they wish existed',
        'Look at online reviews - what are people complaining about?',
        'Check if other cities have services your city doesn\'t have'
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: TrendingUp,
      title: 'Watch for Emerging Trends',
      description: 'Spot new habits or rising interests that are starting to grow.',
      explanation: 'Trends are like waves - if you can spot them early and ride them, you can be successful. These are new ideas, habits, or interests that are becoming popular.',
      example: 'More people want eco-friendly outdoor events',
      detailedExample: 'You notice more people talking about environmental protection and wanting to spend time outdoors. You could start an eco-friendly event planning business that uses biodegradable decorations and hosts events in natural settings.',
      actionSteps: [
        'Pay attention to what young people are doing',
        'Notice what\'s becoming popular on social media',
        'Read news about changing habits (like working from home)',
        'Ask "What are people starting to care more about?"'
      ],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      icon: Users,
      title: 'Find Unmet Customer Needs',
      description: 'Understand what customers want but aren\'t getting from current options.',
      explanation: 'This means listening to what people are asking for but not finding. It\'s like being a translator between what customers really want and what businesses are actually providing.',
      example: 'People want flexible booking or unique decor styles',
      detailedExample: 'Customers tell you they want to book events just 2 weeks in advance, but most venues require 6-month advance booking. Or they want modern, Instagram-worthy decor, but most venues only offer traditional styles. These are unmet needs you could fulfill.',
      actionSteps: [
        'Listen to what people complain about',
        'Ask friends "What would make your life easier?"',
        'Look at customer reviews and see what\'s missing',
        'Notice what takes people too much time or money'
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      icon: BarChart3,
      title: 'Do Smart Market Analysis',
      description: 'Check if enough people want your idea before you invest time and money.',
      explanation: 'Before starting a business, you need to make sure enough people actually want what you\'re planning to offer. It\'s like testing the water before diving in.',
      steps: [
        {
          title: 'Talk to potential customers',
          detail: 'Ask 20 people if they have the problem you want to solve'
        },
        {
          title: 'Study your competition', 
          detail: 'Look at similar businesses - their prices, services, and customer reviews'
        },
        {
          title: 'Check online interest',
          detail: 'Google your idea and see if people are searching for solutions'
        }
      ],
      conclusion: 'Make informed choices, not guesses',
      detailedConclusion: 'This research helps you make smart decisions based on real information, instead of just hoping your idea will work. It\'s much better to spend a few weeks researching than to spend months building something nobody wants.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🧠 Entrepreneurship Module
          </h2>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            How to Identify Market Opportunities
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn step-by-step how to find profitable business ideas, explained in simple terms that anyone can understand and apply immediately
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <Card 
                key={activity.id}
                className={`${activity.bgColor} border-0 hover-lift animate-fade-in group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-gray-800">{activity.id}.</span>
                      <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                        {activity.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-8 space-y-4">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {activity.description}
                  </p>

                  {activity.explanation && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <p className="text-sm font-semibold text-gray-600 mb-2">🤔 What This Means:</p>
                      <p className="text-gray-800 font-medium">{activity.explanation}</p>
                    </div>
                  )}

                  {activity.example && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <p className="text-sm font-semibold text-gray-600 mb-2">💡 Simple Example:</p>
                      <p className="text-gray-800 font-medium italic">"{activity.example}"</p>
                      {activity.detailedExample && (
                        <p className="text-gray-700 mt-2 text-sm">{activity.detailedExample}</p>
                      )}
                    </div>
                  )}

                  {activity.actionSteps && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <p className="text-sm font-semibold text-gray-600 mb-3">🎯 How to Do This:</p>
                      <ul className="space-y-2">
                        {activity.actionSteps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800 text-sm font-medium">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activity.steps && (
                    <div className="space-y-3">
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                        <p className="text-sm font-semibold text-gray-600 mb-3">📋 Step-by-Step Process:</p>
                        <ul className="space-y-3">
                          {activity.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {stepIndex + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">{step.title}</p>
                                <p className="text-gray-700 text-sm">{step.detail}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-200">
                        <p className="text-blue-800 font-bold text-center">
                          ✅ {activity.conclusion}
                        </p>
                        {activity.detailedConclusion && (
                          <p className="text-blue-700 text-sm mt-2 text-center">
                            {activity.detailedConclusion}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16 animate-fade-in delay-700">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Find Your First Business Opportunity?</h3>
            <p className="text-xl mb-6 opacity-90">
              Follow these 4 simple steps and you'll start seeing business opportunities everywhere
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">🔍</span>
                <p className="text-sm font-semibold mt-1">Spot Gaps</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">📈</span>
                <p className="text-sm font-semibold mt-1">Follow Trends</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">👂</span>
                <p className="text-sm font-semibold mt-1">Listen to Needs</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">📊</span>
                <p className="text-sm font-semibold mt-1">Research Smart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneurshipModule;
