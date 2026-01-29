
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Settings, CheckCircle, Download, ExternalLink, Monitor } from 'lucide-react';

const Lesson3Content = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">⚙️</div>
          <h2 className="text-3xl font-bold">Setting Up Your AI Development Environment</h2>
          <p className="text-xl opacity-90">Get your workspace ready for AI-powered coding! 🛠️✨</p>
        </div>
      </div>

      {/* Prerequisites */}
      <Card className="border-2 border-blue-200 animate-slide-in-right">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-3xl">📋</div>
            <h3 className="text-xl font-bold">What You'll Need</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">💻</div>
                <h4 className="font-semibold">Computer</h4>
                <p className="text-sm text-gray-600">Windows, Mac, or Linux</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🌐</div>
                <h4 className="font-semibold">Internet</h4>
                <p className="text-sm text-gray-600">For AI tool access</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🧠</div>
                <h4 className="font-semibold">Willingness to Learn</h4>
                <p className="text-sm text-gray-600">Most important!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Choose Your IDE */}
      <Card className="overflow-hidden border-l-4 border-l-blue-500 animate-slide-in-right delay-200">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">💻</div>
            <h3 className="text-2xl font-bold text-blue-600">Step 1: Choose Your IDE</h3>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              An Integrated Development Environment (IDE) is where you'll write code. 
              Some IDEs have better AI integration than others! 🎯
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* VS Code */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="h-8 w-8 text-blue-500" />
                  <h4 className="text-xl font-bold text-blue-700">Visual Studio Code</h4>
                  <Badge className="bg-green-500">Recommended 🌟</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Free and open source</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Excellent AI extension support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Works on all operating systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Large community and extensions</span>
                  </div>
                </div>
                <a 
                  href="https://code.visualstudio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download VS Code
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* JetBrains */}
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="h-8 w-8 text-purple-500" />
                  <h4 className="text-xl font-bold text-purple-700">JetBrains IDEs</h4>
                  <Badge variant="outline">Professional 💼</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">IntelliJ, PyCharm, WebStorm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced refactoring tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Built-in AI features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-amber-500">⚠️</div>
                    <span className="text-sm">Paid (but free for students)</span>
                  </div>
                </div>
                <a 
                  href="https://www.jetbrains.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Visit JetBrains
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Essential Extensions */}
      <Card className="overflow-hidden border-l-4 border-l-green-500 animate-slide-in-right delay-400">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🔌</div>
            <h3 className="text-2xl font-bold text-green-600">Step 2: Install Essential Extensions</h3>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Extensions add AI superpowers to your IDE. Here are the must-haves! ⚡
            </p>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                <div className="text-2xl">🤖</div>
                AI-Powered Extensions:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold mb-2">GitHub Copilot 🚀</h5>
                  <p className="text-sm text-gray-600 mb-2">AI pair programmer that suggests code as you type</p>
                  <Badge className="bg-blue-500">Essential</Badge>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold mb-2">Tabnine 💡</h5>
                  <p className="text-sm text-gray-600 mb-2">AI-powered autocompletion for all languages</p>
                  <Badge variant="outline">Alternative</Badge>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold mb-2">CodeGPT 🧠</h5>
                  <p className="text-sm text-gray-600 mb-2">ChatGPT integration directly in your editor</p>
                  <Badge className="bg-purple-500">Helpful</Badge>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold mb-2">AI Code Reviewer 🔍</h5>
                  <p className="text-sm text-gray-600 mb-2">Automated code review and suggestions</p>
                  <Badge className="bg-green-500">Recommended</Badge>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <div className="text-2xl">🛠️</div>
                Productivity Extensions:
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>Prettier:</strong> Automatic code formatting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>ESLint:</strong> JavaScript/TypeScript linting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>GitLens:</strong> Enhanced Git integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>Live Server:</strong> Local development server</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Configure Your Environment */}
      <Card className="overflow-hidden border-l-4 border-l-purple-500 animate-slide-in-right delay-600">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">⚙️</div>
            <h3 className="text-2xl font-bold text-purple-600">Step 3: Configure Your Environment</h3>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-800 mb-4">Quick Setup Checklist:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-purple-300 rounded flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span>✅ Install your chosen IDE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-purple-300 rounded flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span>✅ Add AI extensions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-purple-300 rounded flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span>✅ Configure settings for optimal AI performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-purple-300 rounded flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span>✅ Test AI suggestions with a simple project</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-purple-300 rounded flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span>✅ Customize themes and UI for comfort</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-2xl">💡</div>
                <h4 className="font-semibold text-amber-800">Pro Tips:</h4>
              </div>
              <ul className="space-y-2 text-amber-700">
                <li>• Start with just GitHub Copilot - don't overwhelm yourself with too many AI tools</li>
                <li>• Spend time learning keyboard shortcuts - they'll make you much faster</li>
                <li>• Customize your workspace to match your coding style and preferences</li>
                <li>• Join developer communities to learn about new tools and best practices</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Celebration */}
      <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold mb-4">Environment Setup Complete!</h3>
          <p className="text-xl opacity-90 mb-6">
            You're now ready to start coding with AI assistance. 
            Time to write some amazing code! 💻✨
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

export default Lesson3Content;
