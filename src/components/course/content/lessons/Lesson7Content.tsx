
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Code, Zap, CheckCircle, Lightbulb, Brain } from 'lucide-react';

const Lesson7Content = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const handleChallengeComplete = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
  };

  const challenges = [
    {
      id: 1,
      title: "AI Code Generator",
      difficulty: "Beginner",
      description: "Create a function that generates code snippets using AI prompts",
      points: 100,
      color: "green"
    },
    {
      id: 2,
      title: "Smart Bug Detector",
      difficulty: "Intermediate",
      description: "Build a tool that analyzes code and suggests improvements",
      points: 200,
      color: "blue"
    },
    {
      id: 3,
      title: "AI Documentation Generator",
      difficulty: "Advanced",
      description: "Create an automated documentation system using AI",
      points: 300,
      color: "purple"
    }
  ];

  const totalPoints = completedChallenges.reduce((sum, id) => {
    const challenge = challenges.find(c => c.id === id);
    return sum + (challenge?.points || 0);
  }, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold">Building Your First AI-Powered Tool</h2>
          <p className="text-xl opacity-90">Time to put everything together and create something amazing! 🚀✨</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <Card className="border-2 border-yellow-200 animate-slide-in-right">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-3xl">📊</div>
            <h3 className="text-xl font-bold">Your Progress</h3>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{completedChallenges.length}/3</div>
                <p className="text-sm text-gray-600">Challenges Completed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
                <p className="text-sm text-gray-600">Points Earned</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedChallenges.length / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Recap */}
      <Card className="overflow-hidden border-l-4 border-l-blue-500 animate-slide-in-right delay-200">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🎓</div>
            <h3 className="text-2xl font-bold text-blue-600">What You've Mastered</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🤖</div>
              <h4 className="font-semibold text-blue-700">AI Tools</h4>
              <p className="text-sm text-blue-600">GitHub Copilot, ChatGPT</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-green-700">Prompting</h4>
              <p className="text-sm text-green-600">Effective communication</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🔍</div>
              <h4 className="font-semibold text-purple-700">Debugging</h4>
              <p className="text-sm text-purple-600">AI-assisted troubleshooting</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">⚙️</div>
              <h4 className="font-semibold text-orange-700">Setup</h4>
              <p className="text-sm text-orange-600">Development environment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Challenges */}
      <Card className="animate-slide-in-right delay-400">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-2xl font-bold">Hands-on Challenges</h3>
            <p className="text-gray-600">Apply your skills with these real-world projects!</p>
          </div>
          
          <div className="space-y-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className={`bg-${challenge.color}-50 rounded-lg p-6 border border-${challenge.color}-200 transition-all duration-300 hover:shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${challenge.color}-500 text-white rounded-full flex items-center justify-center font-bold`}>
                      {challenge.id}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold text-${challenge.color}-700`}>{challenge.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-${challenge.color}-500`}>{challenge.difficulty}</Badge>
                        <span className={`text-${challenge.color}-600 font-semibold`}>{challenge.points} points</span>
                      </div>
                    </div>
                  </div>
                  {completedChallenges.includes(challenge.id) ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <Button
                      onClick={() => handleChallengeComplete(challenge.id)}
                      className={`bg-${challenge.color}-500 hover:bg-${challenge.color}-600`}
                    >
                      Complete
                    </Button>
                  )}
                </div>
                <p className={`text-${challenge.color}-700 mb-4`}>{challenge.description}</p>
                
                {challenge.id === 1 && (
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold mb-2">🎯 Challenge Details:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Create a web interface where users can input prompts</li>
                      <li>• Use AI to generate code snippets based on the prompts</li>
                      <li>• Display the generated code with syntax highlighting</li>
                      <li>• Add copy-to-clipboard functionality</li>
                    </ul>
                  </div>
                )}

                {challenge.id === 2 && (
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold mb-2">🎯 Challenge Details:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Build a code analyzer that scans for common issues</li>
                      <li>• Integrate with AI to provide improvement suggestions</li>
                      <li>• Show before/after code comparisons</li>
                      <li>• Include performance and security recommendations</li>
                    </ul>
                  </div>
                )}

                {challenge.id === 3 && (
                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold mb-2">🎯 Challenge Details:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Analyze code files to extract functions and classes</li>
                      <li>• Generate comprehensive documentation using AI</li>
                      <li>• Create interactive documentation with examples</li>
                      <li>• Export to multiple formats (Markdown, HTML, PDF)</li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-indigo-100 to-purple-100 animate-slide-in-right delay-600">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-2xl font-bold">What's Next?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-indigo-200">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="font-semibold text-indigo-800 mb-3">Continue Learning:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="text-indigo-500">•</div>
                  <span>Explore advanced AI programming techniques</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-indigo-500">•</div>
                  <span>Learn about AI model training and fine-tuning</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-indigo-500">•</div>
                  <span>Study machine learning fundamentals</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-indigo-500">•</div>
                  <span>Join AI developer communities</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-purple-200">
              <div className="text-3xl mb-3">💼</div>
              <h4 className="font-semibold text-purple-800 mb-3">Apply Your Skills:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="text-purple-500">•</div>
                  <span>Build a portfolio of AI-enhanced projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-purple-500">•</div>
                  <span>Contribute to open-source AI tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-purple-500">•</div>
                  <span>Apply for AI-focused developer roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-purple-500">•</div>
                  <span>Start a blog about AI programming tips</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-6 w-6 text-orange-500" />
              <h4 className="font-semibold text-orange-800">Final Pro Tips:</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-orange-700">
              <div>
                <p className="text-sm">🎯 <strong>Practice Daily:</strong> Use AI tools in your regular coding routine</p>
              </div>
              <div>
                <p className="text-sm">🤝 <strong>Share Knowledge:</strong> Teach others what you've learned</p>
              </div>
              <div>
                <p className="text-sm">🔄 <strong>Stay Updated:</strong> AI tools evolve rapidly, keep learning</p>
              </div>
              <div>
                <p className="text-sm">⚖️ <strong>Use Responsibly:</strong> Always understand and verify AI-generated code</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graduation Celebration */}
      {completedChallenges.length === 3 && (
        <Card className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-3xl font-bold mb-4">Congratulations, AI Developer!</h3>
            <p className="text-xl opacity-90 mb-6">
              You've completed all challenges and mastered AI-assisted programming! 
              You're now ready to build the future with AI! 🌟🚀
            </p>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm mb-6">
              <p className="text-lg">🏆 <strong>Achievement Unlocked:</strong> AI Programming Master - {totalPoints} points earned!</p>
            </div>
            <div className="flex justify-center gap-4 text-3xl">
              <span className="animate-bounce">🎉</span>
              <span className="animate-bounce delay-100">🏆</span>
              <span className="animate-bounce delay-200">🚀</span>
              <span className="animate-bounce delay-300">💻</span>
              <span className="animate-bounce delay-400">⭐</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Completion */}
      <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-3xl font-bold mb-4">Course Complete!</h3>
          <p className="text-xl opacity-90 mb-6">
            You're now equipped with cutting-edge AI programming skills. 
            Time to change the world, one line of code at a time! 💪✨
          </p>
          <div className="flex justify-center gap-4 text-3xl">
            <span className="animate-bounce">🚀</span>
            <span className="animate-bounce delay-100">💻</span>
            <span className="animate-bounce delay-200">🤖</span>
            <span className="animate-bounce delay-300">⚡</span>
            <span className="animate-bounce delay-400">🎯</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lesson7Content;
