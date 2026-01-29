
import type { Module } from '@/types/course';

export const module2FuelInjection: Module = {
  id: 2,
  title: 'Diesel Fuel Systems',
  description: 'Understanding and servicing diesel fuel injection systems',
  lessons: [
    {
      id: 3,
      title: 'How Diesel Fuel Injection Systems Work',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ZloaiB7VPgE',
        textContent: `
          <div class="space-y-8 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                🔧 How Diesel Fuel Injection Systems Work
              </h1>
              <p class="text-lg text-gray-700 max-w-3xl mx-auto">
                Understanding the fundamental operation of diesel fuel injection systems and their role in engine performance.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-8">
              <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">💥 Basics of Diesel Combustion</h3>
                <div class="space-y-3 text-gray-700">
                  <p>• Diesel engines rely on <strong>compression ignition</strong></p>
                  <p>• Air compressed to very high pressures generates heat</p>
                  <p>• Heat ignites injected fuel without spark plugs</p>
                  <p>• Precise timing and pressure are critical for efficiency</p>
                </div>
              </div>

              <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 class="text-2xl font-bold text-green-800 mb-4">⚙️ Key System Components</h3>
                <div class="space-y-2 text-gray-700">
                  <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span><strong>Fuel Pump:</strong> Pressurizes and delivers fuel</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span><strong>Fuel Injectors:</strong> Atomize fuel into fine mist</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span><strong>Fuel Rails:</strong> Distribute fuel to injectors</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span><strong>Control Units:</strong> Monitor and adjust timing</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl border-l-4 border-orange-500">
              <h3 class="text-2xl font-bold text-orange-800 mb-4">⏰ Injection Timing & Pressure</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold text-orange-700 mb-2">Timing Control:</h4>
                  <ul class="space-y-1 text-gray-700">
                    <li>• Precise moment of fuel injection</li>
                    <li>• Advanced timing improves performance</li>
                    <li>• Retarded timing reduces emissions</li>
                    <li>• Critical for efficient combustion</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-orange-700 mb-2">Pressure Systems:</h4>
                  <ul class="space-y-1 text-gray-700">
                    <li>• High pressure enables better atomization</li>
                    <li>• Range: 15,000 to 30,000+ PSI</li>
                    <li>• Improves combustion efficiency</li>
                    <li>• Reduces soot formation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h3 class="text-xl font-semibold text-yellow-800 mb-3">🎥 Related Videos</h3>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white p-3 rounded-lg">
                  <p class="text-sm font-medium">How a Fuel Pump Works</p>
                </div>
                <div class="bg-white p-3 rounded-lg">
                  <p class="text-sm font-medium">How Fuel Injectors Work</p>
                </div>
                <div class="bg-white p-3 rounded-lg">
                  <p class="text-sm font-medium">Common Rail Fuel Systems</p>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 4,
      title: 'Types of Fuel Injectors',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/abc123',
        textContent: `
          <div class="space-y-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                🔧 Types of Fuel Injectors
              </h1>
              <p class="text-lg text-gray-700 max-w-3xl mx-auto">
                Learn about different types of fuel injectors and how they impact efficiency and emissions.
              </p>
            </div>

            <div class="space-y-6">
              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">🔧 Mechanical Fuel Injectors</h3>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-blue-700 mb-2">Operation:</h4>
                    <ul class="space-y-1 text-gray-700">
                      <li>• Operate without electronic control</li>
                      <li>• Fuel pressure directly moves needle valve</li>
                      <li>• Simple mechanical operation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-green-700 mb-2">Advantages:</h4>
                    <ul class="space-y-1 text-gray-700">
                      <li>• Simple and reliable design</li>
                      <li>• Durable construction</li>
                      <li>• Lower maintenance complexity</li>
                    </ul>
                  </div>
                </div>
                <div class="mt-4 p-3 bg-red-50 rounded-lg">
                  <h4 class="font-semibold text-red-700 mb-1">Disadvantages:</h4>
                  <p class="text-red-600 text-sm">Limited precision in timing and quantity, less efficient, higher emissions</p>
                </div>
              </div>

              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-bold text-purple-800 mb-4">⚡ Common Rail Injectors</h3>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-purple-700 mb-2">Operation:</h4>
                    <ul class="space-y-1 text-gray-700">
                      <li>• Single high-pressure rail supplies all injectors</li>
                      <li>• Electrically controlled solenoids</li>
                      <li>• Piezoelectric actuators available</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-green-700 mb-2">Advantages:</h4>
                    <ul class="space-y-1 text-gray-700">
                      <li>• Precise fuel delivery</li>
                      <li>• Multiple injections per cycle</li>
                      <li>• Better efficiency and lower emissions</li>
                      <li>• Reduced noise</li>
                    </ul>
                  </div>
                </div>
                <div class="mt-4 p-3 bg-orange-50 rounded-lg">
                  <h4 class="font-semibold text-orange-700 mb-1">Disadvantages:</h4>
                  <p class="text-orange-600 text-sm">Higher complexity, requires advanced diagnostics</p>
                </div>
              </div>

              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-bold text-indigo-800 mb-4">🔌 Electronic Unit Injectors (EUI)</h3>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-semibold text-indigo-700 mb-2">Operation:</h4>
                    <ul class="space-y-1 text-gray-700">
                      <li>• Integrate fuel pump and injector</li>
                      <li>• Electronically controlled</li>
                      <li>• Precise timing and pressure control</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-green-700 mb-2">Advantages:</h4>
                    <ul class="space-y-1 text-gray-700">
                      <li>• Compact design</li>
                      <li>• Improved performance over mechanical</li>
                      <li>• Better fuel control</li>
                    </ul>
                  </div>
                </div>
                <div class="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <h4 class="font-semibold text-yellow-700 mb-1">Disadvantages:</h4>
                  <p class="text-yellow-600 text-sm">Maintenance and repair can be more challenging</p>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 5,
      title: 'Fuel Filtration and Water Separators',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/def456',
        textContent: `
          <div class="space-y-8 bg-gradient-to-br from-cyan-50 to-blue-100 p-8 rounded-xl">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                🔍 Fuel Filtration and Water Separators
              </h1>
              <p class="text-lg text-gray-700 max-w-3xl mx-auto">
                Understanding the importance of fuel filtration, water separation, and proper maintenance.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">🔧 The Role of Fuel Filters</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-blue-50 rounded-lg">
                    <h4 class="font-semibold text-blue-700 mb-2">Primary Purpose:</h4>
                    <p class="text-gray-700">Protect injectors and pumps by removing contaminants such as dirt, rust, and debris.</p>
                  </div>
                  <div class="space-y-3">
                    <h4 class="font-semibold text-blue-700">Types of Filters:</h4>
                    <div class="space-y-2">
                      <div class="flex items-start space-x-3">
                        <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p class="font-medium">Primary Filters:</p>
                          <p class="text-sm text-gray-600">Coarser filtration for larger particles</p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p class="font-medium">Secondary Filters:</p>
                          <p class="text-sm text-gray-600">Finer filtration to protect high-pressure components</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-bold text-orange-800 mb-4">💧 Water Separation</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <h4 class="font-semibold text-red-700 mb-2">Why Water Is a Problem:</h4>
                    <ul class="space-y-1 text-red-600 text-sm">
                      <li>• Causes corrosion in fuel system</li>
                      <li>• Reduces lubrication properties</li>
                      <li>• Can lead to injector damage</li>
                      <li>• Promotes microbial growth</li>
                    </ul>
                  </div>
                  <div class="p-4 bg-green-50 rounded-lg">
                    <h4 class="font-semibold text-green-700 mb-2">Water Separators:</h4>
                    <ul class="space-y-1 text-green-600 text-sm">
                      <li>• Remove water before it reaches injectors</li>
                      <li>• Often combined with fuel filters</li>
                      <li>• Require regular draining</li>
                      <li>• Prevent water buildup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 class="text-2xl font-bold text-yellow-800 mb-4">🛠️ Maintenance Best Practices</h3>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-700 mb-2">Regular Replacement</h4>
                  <p class="text-sm text-gray-600">Replace fuel filters at recommended intervals</p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-700 mb-2">Water Separator Checks</h4>
                  <p class="text-sm text-gray-600">Regularly check and drain water separators</p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-700 mb-2">Quality Fuel</h4>
                  <p class="text-sm text-gray-600">Use high-quality fuel from trusted suppliers</p>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 6,
      title: 'Diagnosing Fuel Delivery Issues',
      duration: '60 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ghi789',
        textContent: `
          <div class="space-y-8 bg-gradient-to-br from-red-50 to-pink-100 p-8 rounded-xl">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
                🔍 Diagnosing Fuel Delivery Issues
              </h1>
              <p class="text-lg text-gray-700 max-w-3xl mx-auto">
                Develop diagnostic skills for addressing fuel delivery issues and maintaining key components.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 mb-8">
              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-xl font-bold text-red-800 mb-4">⬇️ Low Fuel Pressure</h3>
                <div class="space-y-3">
                  <div class="p-3 bg-red-50 rounded-lg">
                    <h4 class="font-semibold text-red-700 mb-1">Causes:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Weak or failing fuel pump</li>
                      <li>• Clogged filters</li>
                      <li>• Leaks in fuel lines</li>
                    </ul>
                  </div>
                  <div class="p-3 bg-orange-50 rounded-lg">
                    <h4 class="font-semibold text-orange-700 mb-1">Symptoms:</h4>
                    <ul class="text-sm text-orange-600 space-y-1">
                      <li>• Loss of power</li>
                      <li>• Rough idling</li>
                      <li>• Difficulty starting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-xl font-bold text-yellow-800 mb-4">🦠 Contamination</h3>
                <div class="space-y-3">
                  <div class="p-3 bg-yellow-50 rounded-lg">
                    <h4 class="font-semibold text-yellow-700 mb-1">Types:</h4>
                    <ul class="text-sm text-yellow-600 space-y-1">
                      <li>• Dirt and debris</li>
                      <li>• Water presence</li>
                      <li>• Algae growth</li>
                    </ul>
                  </div>
                  <div class="p-3 bg-red-50 rounded-lg">
                    <h4 class="font-semibold text-red-700 mb-1">Effects:</h4>
                    <ul class="text-sm text-red-600 space-y-1">
                      <li>• Clogged filters</li>
                      <li>• Stuck injectors</li>
                      <li>• Poor combustion</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-xl font-bold text-blue-800 mb-4">⏰ Incorrect Timing</h3>
                <div class="space-y-3">
                  <div class="p-3 bg-blue-50 rounded-lg">
                    <h4 class="font-semibold text-blue-700 mb-1">Causes:</h4>
                    <ul class="text-sm text-blue-600 space-y-1">
                      <li>• Sensor failures</li>
                      <li>• Worn injectors</li>
                      <li>• Incorrect ECU settings</li>
                    </ul>
                  </div>
                  <div class="p-3 bg-purple-50 rounded-lg">
                    <h4 class="font-semibold text-purple-700 mb-1">Results:</h4>
                    <ul class="text-sm text-purple-600 space-y-1">
                      <li>• Rough running</li>
                      <li>• Increased emissions</li>
                      <li>• Reduced efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-l-4 border-green-500">
              <h3 class="text-2xl font-bold text-green-800 mb-4">🔧 Diagnostic Steps</h3>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-green-700 mb-2">1. Check Fuel Pressure</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Use fuel pressure gauge</li>
                      <li>• Compare to specifications</li>
                      <li>• Test at rail and pump</li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-green-700 mb-2">2. Inspect Filters</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Look for clogging signs</li>
                      <li>• Check water accumulation</li>
                      <li>• Replace or drain as needed</li>
                    </ul>
                  </div>
                </div>
                <div class="space-y-4">
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-green-700 mb-2">3. Monitor Injectors</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Use diagnostic software</li>
                      <li>• Test each injector response</li>
                      <li>• Check for misfire codes</li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 rounded-lg">
                    <h4 class="font-semibold text-green-700 mb-2">4. Test Fuel Pump</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li>• Verify pressure and flow</li>
                      <li>• Check for noise/vibration</li>
                      <li>• Inspect for leaks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 7,
      title: 'Maintaining and Replacing Components',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/jkl012',
        textContent: `
          <div class="space-y-8 bg-gradient-to-br from-purple-50 to-indigo-100 p-8 rounded-xl">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                🔧 Maintaining and Replacing Components
              </h1>
              <p class="text-lg text-gray-700 max-w-3xl mx-auto">
                Learn proper maintenance and replacement procedures for fuel filters and injectors.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-bold text-blue-800 mb-4">🔄 Replacing Fuel Filters</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <h4 class="font-semibold text-red-700 mb-2">⚠️ Safety Precautions:</h4>
                    <ul class="space-y-1 text-red-600 text-sm">
                      <li>• Relieve fuel system pressure</li>
                      <li>• Wear gloves and safety glasses</li>
                      <li>• Work in well-ventilated area</li>
                      <li>• Have fire extinguisher nearby</li>
                    </ul>
                  </div>
                  <div class="space-y-3">
                    <h4 class="font-semibold text-blue-700">Replacement Steps:</h4>
                    <div class="space-y-2">
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                        <p class="text-sm">Locate primary and secondary filters</p>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                        <p class="text-sm">Disconnect fuel lines and remove old filter</p>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                        <p class="text-sm">Install new filter with proper seal seating</p>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                        <p class="text-sm">Prime system and bleed air from lines</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-bold text-green-800 mb-4">💉 Injector Maintenance</h3>
                <div class="space-y-4">
                  <div class="p-4 bg-green-50 rounded-lg">
                    <h4 class="font-semibold text-green-700 mb-2">Regular Maintenance:</h4>
                    <ul class="space-y-1 text-green-600 text-sm">
                      <li>• Use fuel additives or cleaners</li>
                      <li>• Prevent carbon buildup</li>
                      <li>• Inspect for leaks regularly</li>
                      <li>• Check for wear signs</li>
                    </ul>
                  </div>
                  <div class="space-y-3">
                    <h4 class="font-semibold text-green-700">Replacement Steps:</h4>
                    <div class="space-y-2">
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                        <p class="text-sm">Disconnect fuel lines and electrical connections</p>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                        <p class="text-sm">Remove injector from mounting</p>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                        <p class="text-sm">Install new injector with proper torque</p>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                        <p class="text-sm">Reconnect and test for leaks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 class="text-2xl font-bold text-yellow-800 mb-4">✅ Best Practices</h3>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-700 mb-2">Follow Schedule</h4>
                  <p class="text-sm text-gray-600">Adhere to manufacturer's maintenance intervals</p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-700 mb-2">Correct Parts</h4>
                  <p class="text-sm text-gray-600">Always use proper parts and tools</p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-700 mb-2">Document Work</h4>
                  <p class="text-sm text-gray-600">Track maintenance and replacement dates</p>
                </div>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 8,
      title: 'Diesel Fuel Systems Quiz',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary function of the diesel fuel injection system?',
            options: [
              'To cool the engine\'s exhaust system',
              'To deliver the correct amount of fuel at high pressure and precise timing',
              'To mix fuel and air outside the cylinder for better combustion',
              'To decrease engine temperature during operation'
            ],
            correct: 1,
            explanation: 'The primary function is to deliver the correct amount of fuel at high pressure and precise timing for efficient combustion.'
          },
          {
            question: 'How do mechanical injectors differ from common rail injectors?',
            options: [
              'Mechanical injectors rely solely on fuel pressure to open, while common rail injectors use electronic control for precise timing',
              'Mechanical injectors are used only in gasoline engines',
              'Common rail injectors are simpler and less precise than mechanical injectors',
              'Common rail injectors only operate at low pressures'
            ],
            correct: 0,
            explanation: 'Mechanical injectors rely solely on fuel pressure to open, while common rail injectors use electronic control for precise timing and better performance.'
          },
          {
            question: 'What is the purpose of a water separator in a diesel fuel system?',
            options: [
              'To improve the atomization of diesel fuel',
              'To remove water from the fuel, preventing corrosion and injector damage',
              'To increase the power output of the fuel system',
              'To decrease fuel pressure in the fuel rails'
            ],
            correct: 1,
            explanation: 'Water separators remove water from the fuel, preventing corrosion and injector damage that water can cause.'
          },
          {
            question: 'Which of the following could cause low fuel pressure in a diesel fuel system?',
            options: [
              'A faulty turbocharger',
              'A clogged fuel filter',
              'Excessive valve clearance',
              'A malfunctioning coolant thermostat'
            ],
            correct: 1,
            explanation: 'A clogged fuel filter restricts fuel flow and can cause low fuel pressure in the system.'
          },
          {
            question: 'What is a common symptom of fuel contamination in a diesel engine?',
            options: [
              'Increased engine oil pressure',
              'Improved fuel economy',
              'Rough idling or misfires',
              'Increased engine temperature'
            ],
            correct: 2,
            explanation: 'Fuel contamination typically causes rough idling or misfires due to poor combustion from contaminated fuel.'
          },
          {
            question: 'What is a common advantage of common rail injection systems?',
            options: [
              'They operate without a fuel pump',
              'They can perform multiple injections per cycle, improving efficiency and emissions',
              'They are simpler and easier to repair than older mechanical systems',
              'They eliminate the need for fuel filtration'
            ],
            correct: 1,
            explanation: 'Common rail systems can perform multiple injections per cycle, which improves efficiency and reduces emissions.'
          },
          {
            question: 'How can you test for a clogged fuel filter?',
            options: [
              'Measure the pressure drop across the filter',
              'Check the air intake for debris',
              'Measure the temperature of the fuel rail',
              'Test for voltage at the injector connector'
            ],
            correct: 0,
            explanation: 'Measuring the pressure drop across the filter is the proper way to test for clogging - excessive pressure drop indicates a clogged filter.'
          },
          {
            question: 'What should you always do after replacing a fuel filter or injector?',
            options: [
              'Increase the fuel pressure to its maximum setting',
              'Bleed air from the fuel system to ensure proper fuel delivery',
              'Drain and replace all engine coolant',
              'Disable the electronic control unit temporarily'
            ],
            correct: 1,
            explanation: 'After replacing fuel system components, you must bleed air from the system to ensure proper fuel delivery and prevent air pockets.'
          }
        ]
      }
    }
  ]
};
