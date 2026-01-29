import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Cpu, Zap, Target, CheckCircle, Brain, Lightbulb } from 'lucide-react';

const Lesson1Content = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-3xl font-bold">Introduction to Computer Hardware</h2>
          <p className="text-xl opacity-90">Topics: CPU, RAM, motherboard, PSU, GPU</p>
        </div>
      </div>

      {/* What is AI Programming */}
      <Card className="overflow-hidden border-l-4 border-l-blue-500 animate-slide-in-right">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🧠</div>
            <h3 className="text-2xl font-bold text-blue-600">Key Computer Hardware Components</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">1. Central Processing Unit (CPU)

Definition: Often called the "brain" of the computer, the CPU processes instructions and performs calculations. Imagine your computer is like a big, busy kitchen, and you're making a delicious cake!

The CPU (Central Processing Unit) is like the chef in that kitchen. Here's why:

The Brain of the Kitchen: The chef is the one who reads the recipe (that's like the program on the computer), figures out what to do next, and tells everyone else what to do. Without the chef, nothing would get done!

Super Fast Thinker: The chef thinks really, really fast. When you tell the computer to open a game or watch a video, the CPU quickly understands what you want and starts working on it.

Doing the Work: The chef does all the important jobs, like mixing the ingredients, cracking the eggs, and making sure everything is cooked just right. The CPU does all the "thinking" and "calculating" for the computer.

Lots of Jobs at Once: A really good chef can sometimes do a few things at the same time, like stir the batter while checking the oven. Modern CPUs are like that – they have special parts that let them work on different parts of a task all at once so things happen even faster!

So, every time you click on something, type a letter, or play a game on your computer, it's the amazing CPU (the chef!) that's making it all happen!

Function: Executes program instructions by performing basic arithmetic, logic, control, and input/output operations.

Key Parts:

Cores: Multiple cores allow parallel processing, improving performance. Okay, remember our computer kitchen and the CPU being the chef? Well, imagine that some chefs are so good, they're like super chefs! Instead of just having one brain to think with, they actually have multiple mini-brains inside their head that can all think and work at the same time. These "mini-brains" are called cores.

One Core: If your chef only has one core, they can only do one step of the recipe at a time. They'll mix the batter, then put it in the oven, then decorate the cake. One thing after another.


Two Cores (Dual-Core): If your chef has two cores, it's like they have two heads that can work together! One head can be mixing the batter, while the other head is already preparing the icing. They can do two things at the same time, which makes the cake get done faster!


Four Cores (Quad-Core): Now imagine a chef with four cores! They're super efficient. One core can be chopping fruit, another mixing batter, another checking the oven, and another cleaning up! They can juggle many tasks at once.

So, the more cores a CPU has, the more different jobs it can work on at the very same time. This is why computers with more cores feel faster, especially when you're doing many things at once, like playing a game, listening to music, and Browse the internet all at the same time!

Clock Speed: Measured in GHz, indicates how many cycles per second the CPU can perform.

Cache: Small, fast memory on the CPU used to store frequently accessed data.

Types: Intel (Core i3, i5, i7, i9), AMD (Ryzen series).

Common Issues: Overheating, improper installation, bent pins (on some CPUs), compatibility problems.</p>
            
            <div className="bg-blue-50 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Key Benefits:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500">⚡</div>
                    <span>10x faster code writing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500">🎯</div>
                    <span>Fewer bugs and errors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500">🧪</div>
                    <span>Automated testing generation</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500">📚</div>
                    <span>Instant documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500">🔍</div>
                    <span>Smart code refactoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-blue-500">🌟</div>
                    <span>Learn best practices faster</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evolution Timeline */}
      <Card className="bg-gradient-to-r from-purple-100 to-blue-100 animate-slide-in-right delay-200">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-2xl font-bold">Evolution of Programming Tools</h3>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border hover:shadow-lg transition-all duration-300">
                <div className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">1970s</div>
                <div>
                  <h5 className="font-semibold">Text Editors 📝</h5>
                  <p className="text-gray-600">Basic editing, no coding help</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">1990s</div>
                <div>
                  <h5 className="font-semibold">IDEs 🛠️</h5>
                  <p className="text-gray-600">Auto-complete, debug, refactor tools</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg border hover:shadow-lg transition-all duration-300">
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">2000s</div>
                <div>
                  <h5 className="font-semibold">Linters & Analyzers 🔍</h5>
                  <p className="text-gray-600">Static analysis, quality enforcement</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg border hover:shadow-xl transition-all duration-300 animate-pulse">
                <div className="bg-white text-purple-500 rounded-full w-12 h-12 flex items-center justify-center font-bold">2020s</div>
                <div>
                  <h5 className="font-semibold">AI Code Assistants 🤖</h5>
                  <p className="text-purple-100">Code generation, debugging, documentation</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular AI Tools */}
      <Card className="animate-slide-in-right delay-400">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="text-2xl font-bold">Popular AI Programming Tools</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">🤖</div>
              <h5 className="font-semibold">GitHub Copilot</h5>
              <p className="text-sm text-gray-600">Uses OpenAI Codex for intelligent suggestions</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">💬</div>
              <h5 className="font-semibold">ChatGPT</h5>
              <p className="text-sm text-gray-600">Conversational coding assistance</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">⚡</div>
              <h5 className="font-semibold">Tabnine</h5>
              <p className="text-sm text-gray-600">AI-powered completion with deep learning</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200 text-center hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">☁️</div>
              <h5 className="font-semibold">CodeWhisperer</h5>
              <p className="text-sm text-gray-600">Amazon's AI coding tool</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Learn This Now */}
      <Card className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold mb-4">Why Learn AI Programming Now?</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold mb-2">Career Boost</h4>
              <p className="text-sm opacity-90">AI-skilled developers are in high demand</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-2">⏰</div>
              <h4 className="font-semibold mb-2">Time Saver</h4>
              <p className="text-sm opacity-90">Finish projects 5-10x faster</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2">Better Code</h4>
              <p className="text-sm opacity-90">Write cleaner, more efficient code</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-2xl mt-6">
            <span className="animate-bounce">🔥</span>
            <span className="animate-bounce delay-100">💻</span>
            <span className="animate-bounce delay-200">⚡</span>
            <span className="animate-bounce delay-300">🎯</span>
            <span className="animate-bounce delay-400">🚀</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lesson1Content;