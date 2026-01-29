
import type { Lesson } from '@/types/course';

export const lesson2SignalFlow: Lesson = {
  id: 7,
  title: 'Signal Flow Diagrams',
  duration: '40 min',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/embed/Yh8-0bj3_sI',
    textContent: `
      <div class="space-y-8">
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl shadow-lg">
          <h2 class="text-4xl font-bold text-emerald-800 mb-6 text-center animate-fade-in">
            📊 Signal Flow Diagrams
          </h2>
          
          <div class="my-8">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/pDzlLsYDIEE" title="Importance of Signal Flow Diagrams" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mb-6 animate-scale-in">
            <h3 class="text-2xl font-semibold text-teal-700 mb-4 flex items-center">
              <span class="animate-pulse mr-3">🔄</span>
              Introduction to Signal Flow Diagrams (SFDs)
            </h3>
            <div class="space-y-4">
              <div class="bg-teal-50 p-4 rounded-lg">
                <h4 class="font-semibold text-teal-700 mb-2">Definition:</h4>
                <p class="text-gray-700">
                  A Signal Flow Diagram is a graphical representation that shows the path an audio or electrical signal takes from the input source through various processing stages to the output destination.
                </p>
              </div>
              <div class="bg-emerald-50 p-4 rounded-lg">
                <h4 class="font-semibold text-emerald-700 mb-2">Purpose:</h4>
                <p class="text-gray-700">
                  To visualize and understand how signals move through an audio system or electronic circuit.
                </p>
              </div>
              <div class="bg-cyan-50 p-4 rounded-lg">
                <h4 class="font-semibold text-cyan-700 mb-2">Applications:</h4>
                <ul class="text-gray-700 space-y-1">
                  <li>• Audio engineering (mixing consoles, recording setups)</li>
                  <li>• Electronics and control systems</li>
                  <li>• Telecommunications</li>
                  <li>• Software signal processing</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md mb-6 animate-slide-in-left">
            <h3 class="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
              <span class="animate-bounce mr-3">⭐</span>
              Importance of Signal Flow Diagrams
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-lg">
                <ul class="text-gray-700 space-y-2">
                  <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Helps troubleshoot audio and electrical problems</li>
                  <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Provides clear understanding of signal routing and processing</li>
                  <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Enables efficient setup and reconfiguration of equipment</li>
                </ul>
              </div>
              <div class="bg-white p-4 rounded-lg">
                <ul class="text-gray-700 space-y-2">
                  <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Assists in teaching and documentation of complex systems</li>
                  <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> Essential for designing audio systems and electronic circuits</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="my-8">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/q5aBt8M8ZR0" title="Basic Components in Signal Flow Diagrams" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
          </div>

          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-md mb-6 animate-slide-in-right">
            <h3 class="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
              <span class="animate-spin mr-3">⚙️</span>
              Basic Components in Signal Flow Diagrams
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div class="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 class="font-semibold text-purple-700 mb-1">Source</h4>
                  <p class="text-sm text-gray-600">The origin of the signal (microphone, instrument, line input)</p>
                </div>
                <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 class="font-semibold text-blue-700 mb-1">Processor</h4>
                  <p class="text-sm text-gray-600">Any device or module that alters the signal (preamps, compressors, EQs)</p>
                </div>
                <div class="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <h4 class="font-semibold text-green-700 mb-1">Mixer</h4>
                  <p class="text-sm text-gray-600">Combines multiple signals and routes them to outputs</p>
                </div>
              </div>
              <div class="space-y-3">
                <div class="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 class="font-semibold text-orange-700 mb-1">Output</h4>
                  <p class="text-sm text-gray-600">Final destination of the signal (speakers, recorders, headphones)</p>
                </div>
                <div class="bg-white p-4 rounded-lg border-l-4 border-red-500">
                  <h4 class="font-semibold text-red-700 mb-1">Paths/Lines</h4>
                  <p class="text-sm text-gray-600">Represent signal cables or signal routes</p>
                </div>
                <div class="bg-white p-4 rounded-lg border-l-4 border-cyan-500">
                  <h4 class="font-semibold text-cyan-700 mb-1">Nodes</h4>
                  <p class="text-sm text-gray-600">Points where signals split or join</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg shadow-md mb-6 animate-fade-in">
            <h3 class="text-2xl font-semibold text-amber-800 mb-4 flex items-center">
              <span class="animate-pulse mr-3">🔣</span>
              Symbols and Conventions
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-lg">
                <ul class="text-gray-700 space-y-2">
                  <li><strong>Lines:</strong> Show direction of signal flow, usually left-to-right or top-to-bottom</li>
                  <li><strong>Boxes:</strong> Represent devices or processing units</li>
                  <li><strong>Circles:</strong> Often used for connection points or junctions</li>
                </ul>
              </div>
              <div class="bg-white p-4 rounded-lg">
                <ul class="text-gray-700 space-y-2">
                  <li><strong>Arrows:</strong> Indicate signal direction</li>
                  <li><strong>Labels:</strong> Annotate types of signals (mic level, line level), channel names, or function names</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-md mb-6 animate-scale-in">
            <h3 class="text-2xl font-semibold text-indigo-800 mb-4 flex items-center">
              <span class="animate-bounce mr-3">📋</span>
              Types of Signal Flow Diagrams
            </h3>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                <h4 class="font-semibold text-indigo-700 mb-2">Block Diagrams</h4>
                <p class="text-sm text-gray-600">
                  Simplified, high-level diagrams showing major components and signal flow without detailed wiring
                </p>
              </div>
              <div class="my-8">
                <iframe width="100%" height="400" src="https://www.youtube.com/embed/hCT1ls7Z5i0" title="Block Diagrams" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
              </div>
              <div class="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                <h4 class="font-semibold text-purple-700 mb-2">Detailed SFDs</h4>
                <p class="text-sm text-gray-600">
                  Include every connection, device, and signal path with precise routing and levels
                </p>
              </div>
              <div class="my-8">
                <iframe width="100%" height="400" src="https://www.youtube.com/embed/fb8aqKwrZzY" title="Detailed SFDs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
              </div>
              <div class="bg-white p-4 rounded-lg border-l-4 border-pink-500">
                <h4 class="font-semibold text-pink-700 mb-2">Hybrid Diagrams</h4>
                <p class="text-sm text-gray-600">
                  Combine block and detailed elements to suit complexity and audience
                </p>
              </div>
              <div class="my-8">
                <iframe width="100%" height="400" src="https://www.youtube.com/embed/hMPQryShCWY" title="Hybrid Diagrams" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-md mb-6 animate-slide-in-left">
            <h3 class="text-2xl font-semibold text-green-800 mb-4 flex items-center">
              <span class="animate-pulse mr-3">🎵</span>
              Common Audio Signal Flow Example
            </h3>
            <div class="bg-white p-4 rounded-lg">
              <div class="flex flex-wrap items-center justify-center gap-2 text-sm">
                <div class="bg-blue-100 px-3 py-2 rounded-lg border-2 border-blue-300">
                  <span class="font-semibold text-blue-800">Microphone</span>
                </div>
                <span class="text-gray-400">→</span>
                <div class="bg-green-100 px-3 py-2 rounded-lg border-2 border-green-300">
                  <span class="font-semibold text-green-800">Preamp</span>
                </div>
                <span class="text-gray-400">→</span>
                <div class="bg-purple-100 px-3 py-2 rounded-lg border-2 border-purple-300">
                  <span class="font-semibold text-purple-800">EQ</span>
                </div>
                <span class="text-gray-400">→</span>
                <div class="bg-orange-100 px-3 py-2 rounded-lg border-2 border-orange-300">
                  <span class="font-semibold text-orange-800">Compressor</span>
                </div>
                <span class="text-gray-400">→</span>
                <div class="bg-red-100 px-3 py-2 rounded-lg border-2 border-red-300">
                  <span class="font-semibold text-red-800">Mixer</span>
                </div>
                <span class="text-gray-400">→</span>
                <div class="bg-cyan-100 px-3 py-2 rounded-lg border-2 border-cyan-300">
                  <span class="font-semibold text-cyan-800">Output</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg shadow-md animate-fade-in">
            <h3 class="text-2xl font-semibold text-rose-800 mb-4 text-center">
              🎯 Summary
            </h3>
            <div class="space-y-3 text-gray-700">
              <p>• Signal Flow Diagrams are essential tools in audio and electronics</p>
              <p>• They clarify the path and transformation of signals</p>
              <p>• Mastery of SFDs improves system design, operation, and troubleshooting</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
};
