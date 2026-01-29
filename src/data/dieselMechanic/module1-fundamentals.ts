
import type { Module } from '@/types/course';

export const module1Fundamentals: Module = {
  id: 1,
  title: 'Module 1: Introduction to Diesel Engines',
  description: 'Diesel engine theory: 4-stroke vs. 2-stroke operation, differences between diesel and gasoline engines, overview of diesel engine components, and basic engine terminology.',
  lessons: [
    {
      id: 1,
      title: 'Introduction to Diesel Engines',
      duration: '2.5 hours',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/Q3AqwaRaF0s',
        textContent: `
          <div class="space-y-8 animate-fade-in">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl shadow-lg border border-blue-200">
              <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-blue-800 mb-4 animate-scale-in">🚛 Module 1: Introduction to Diesel Engines</h1>
                <div class="flex flex-wrap justify-center gap-4 mb-6">
                  <span class="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">4-Stroke vs. 2-Stroke</span>
                  <span class="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Engine Components</span>
                  <span class="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Diesel vs. Gasoline</span>
                  <span class="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Terminology</span>
                </div>
              </div>

              <div class="bg-white p-6 rounded-lg shadow-md mb-8 hover-scale">
                <h2 class="text-2xl font-bold text-blue-700 mb-4">📚 Lesson Objectives</h2>
                <ul class="space-y-3 text-gray-700">
                  <li class="flex items-start gap-3">
                    <span class="text-green-500 text-xl">✓</span>
                    <span>Understand the basic theory of diesel engine operation, including the differences between 4-stroke and 2-stroke cycles.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-500 text-xl">✓</span>
                    <span>Learn how diesel engines differ from gasoline engines in terms of combustion, efficiency, and design.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-500 text-xl">✓</span>
                    <span>Gain an overview of the primary components found in a diesel engine.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-500 text-xl">✓</span>
                    <span>Become familiar with fundamental engine terminology and functions.</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg mb-8">
                <h2 class="text-3xl font-bold text-white mb-6 text-center">⚙️ Section 1: Diesel Engine Theory – 4-Stroke vs. 2-Stroke Operation</h2>
                <p class="text-blue-100 text-center mb-6">Duration: 1 hour</p>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">🔄 The Four-Stroke Diesel Cycle</h3>
                    <p class="text-blue-100 mb-4">A diesel engine typically operates on the 4-stroke cycle, which consists of four distinct phases:</p>
                    
                    <div class="space-y-4">
                      <div class="bg-white/20 p-3 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">1. Intake Stroke:</h4>
                        <p class="text-sm text-blue-100">The intake valve opens, and the piston moves down the cylinder, drawing in air.</p>
                      </div>
                      
                      <div class="bg-white/20 p-3 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">2. Compression Stroke:</h4>
                        <p class="text-sm text-blue-100">The intake valve closes, and the piston moves up, compressing the air. This compression generates high temperatures, preparing the air for fuel injection.</p>
                      </div>
                      
                      <div class="bg-white/20 p-3 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">3. Power Stroke:</h4>
                        <p class="text-sm text-blue-100">Fuel is injected into the hot compressed air, causing spontaneous combustion. The resulting explosion forces the piston down, producing mechanical energy.</p>
                      </div>
                      
                      <div class="bg-white/20 p-3 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">4. Exhaust Stroke:</h4>
                        <p class="text-sm text-blue-100">The exhaust valve opens, and the piston moves back up, pushing exhaust gases out of the cylinder.</p>
                      </div>
                    </div>
                    
                    <div class="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-400">
                      <p class="text-sm text-red-100">📺 <strong>YOUTUBE LINK:</strong> DIESEL ENGINE | Construction and working of 4 stroke diesel engine (animation).</p>
                    </div>
                    <p class="text-blue-100 mt-2 text-center italic">The cycle then repeats.</p>
                  </div>

                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">🚀 The Two-Stroke Diesel Cycle</h3>
                    <p class="text-blue-100 mb-4">A two-stroke diesel engine completes the same functions as a four-stroke, but in just two strokes (one revolution of the crankshaft).</p>
                    
                    <div class="space-y-4">
                      <div class="bg-white/20 p-3 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">1. Compression Stroke:</h4>
                        <p class="text-sm text-blue-100">The piston moves up, compressing air, followed by fuel injection and combustion.</p>
                      </div>
                      
                      <div class="bg-white/20 p-3 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">2. Power Stroke:</h4>
                        <p class="text-sm text-blue-100">The piston moves down, performing power delivery while simultaneously drawing in air for the next compression cycle. Exhaust occurs as intake ports open near the bottom of the piston's stroke, allowing fresh air to push out the exhaust gases.</p>
                      </div>
                    </div>
                    
                    <p class="text-blue-100 mt-4 text-sm">Two-stroke engines are often used in large industrial applications or marine engines due to their high power-to-weight ratio.</p>
                    
                    <div class="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-400">
                      <p class="text-sm text-red-100">📺 <strong>YOUTUBE LINK:</strong> 2- Stroke Diesel Engine | Internal & External Parts Overview | 3D Animated Explanation| HIMT</p>
                    </div>
                  </div>
                </div>

                <div class="mt-6 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                  <h3 class="text-xl font-bold text-white mb-4">🔍 Key Differences Between 4-Stroke and 2-Stroke Diesel Engines</h3>
                  <div class="grid md:grid-cols-3 gap-4">
                    <div class="text-center">
                      <h4 class="font-semibold text-yellow-300 mb-2">Efficiency</h4>
                      <p class="text-sm text-blue-100">4-stroke engines tend to be more fuel-efficient.</p>
                    </div>
                    <div class="text-center">
                      <h4 class="font-semibold text-yellow-300 mb-2">Power Output</h4>
                      <p class="text-sm text-blue-100">2-stroke engines can produce more power for a given size but may require more maintenance.</p>
                    </div>
                    <div class="text-center">
                      <h4 class="font-semibold text-yellow-300 mb-2">Complexity</h4>
                      <p class="text-sm text-blue-100">4-stroke engines have more moving parts, while 2-stroke engines rely on simpler porting systems.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-lg mb-8">
                <h2 class="text-3xl font-bold text-white mb-6 text-center">🔥 Section 2: Differences Between Diesel and Gasoline Engines</h2>
                <p class="text-green-100 text-center mb-6">Duration: 45 minutes</p>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">⚡ Combustion Process</h3>
                    
                    <div class="space-y-4">
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🚛 Diesel Engines:</h4>
                        <ul class="text-sm text-green-100 space-y-1">
                          <li>• Use compression ignition.</li>
                          <li>• Air is compressed to extremely high pressure, generating heat that ignites the fuel.</li>
                          <li>• Diesel fuel is injected directly into the cylinder at the precise moment of combustion.</li>
                        </ul>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🚗 Gasoline Engines:</h4>
                        <ul class="text-sm text-green-100 space-y-1">
                          <li>• Use spark ignition.</li>
                          <li>• Air and fuel are mixed before entering the cylinder, and a spark plug ignites the mixture.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">📊 Efficiency and Power</h3>
                    
                    <div class="space-y-4">
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🚛 Diesel Engines:</h4>
                        <ul class="text-sm text-green-100 space-y-1">
                          <li>• Higher compression ratios result in better fuel efficiency and more torque.</li>
                          <li>• Ideal for heavy-duty applications, long-distance travel, and towing.</li>
                        </ul>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🚗 Gasoline Engines:</h4>
                        <ul class="text-sm text-green-100 space-y-1">
                          <li>• Typically produce higher horsepower at higher RPMs.</li>
                          <li>• Preferred for light-duty vehicles and performance cars.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6 mt-6">
                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">🔧 Durability and Maintenance</h3>
                    
                    <div class="space-y-4">
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🚛 Diesel Engines:</h4>
                        <ul class="text-sm text-green-100 space-y-1">
                          <li>• Built to handle higher pressures, often resulting in greater longevity.</li>
                          <li>• Maintenance intervals for oil changes, filters, and injectors are longer, but repairs can be more expensive.</li>
                        </ul>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🚗 Gasoline Engines:</h4>
                        <ul class="text-sm text-green-100 space-y-1">
                          <li>• Lower internal pressures generally mean less wear, but shorter maintenance intervals are needed.</li>
                          <li>• Replacement parts and repairs are often less costly.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">🌍 Emissions</h3>
                    <div class="bg-white/20 p-4 rounded-lg">
                      <p class="text-sm text-green-100">Diesel engines produce more nitrogen oxides (NOx) and particulate matter but less CO2 per mile compared to gasoline engines.</p>
                      <p class="text-sm text-green-100 mt-2">Modern emissions controls (such as diesel particulate filters and SCR systems) are used to meet stringent environmental standards.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg shadow-lg mb-8">
                <h2 class="text-3xl font-bold text-white mb-6 text-center">🔧 Section 3: Overview of Diesel Engine Components</h2>
                <p class="text-purple-100 text-center mb-6">Duration: 30 minutes</p>
                
                <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                  <h3 class="text-xl font-bold text-white mb-4">⚙️ Key Components and Their Roles</h3>
                  
                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🏗️ Cylinder Head and Block:</h4>
                        <ul class="text-sm text-purple-100 space-y-1">
                          <li>• The block houses the cylinders, where combustion occurs.</li>
                          <li>• The cylinder head covers the top of the engine block, containing intake and exhaust ports, valves, and fuel injectors.</li>
                        </ul>
                        <div class="mt-2 p-2 bg-red-500/20 rounded border border-red-400">
                          <p class="text-xs text-red-100">📺 <strong>YOUTUBE LINK:</strong> Car Engine Components, Car Engine Parts and Functions animation & diagram</p>
                        </div>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🔩 Pistons and Connecting Rods:</h4>
                        <ul class="text-sm text-purple-100 space-y-1">
                          <li>• Pistons move up and down within the cylinders, converting combustion energy into mechanical motion.</li>
                          <li>• Connecting rods transfer this motion to the crankshaft.</li>
                        </ul>
                        <div class="mt-2 p-2 bg-red-500/20 rounded border border-red-400">
                          <p class="text-xs text-red-100">📺 <strong>YOUTUBE LINK:</strong> Piston and connecting rod 3d animation</p>
                        </div>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🌀 Crankshaft:</h4>
                        <ul class="text-sm text-purple-100 space-y-1">
                          <li>• Converts the linear motion of the pistons into rotational motion, which drives the vehicle's transmission and wheels.</li>
                        </ul>
                        <div class="mt-2 p-2 bg-red-500/20 rounded border border-red-400">
                          <p class="text-xs text-red-100">📺 <strong>YOUTUBE LINK:</strong> Structure and function of the crankshaft (3D animation) - Motorservice Group - BF Crankshaft</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">⏰ Camshaft:</h4>
                        <ul class="text-sm text-purple-100 space-y-1">
                          <li>• Controls the timing of valve opening and closing.</li>
                          <li>• Ensures the proper amount of air and exhaust flows in and out of the combustion chamber.</li>
                        </ul>
                        <div class="mt-2 p-2 bg-red-500/20 rounded border border-red-400">
                          <p class="text-xs text-red-100">📺 <strong>YOUTUBE LINK:</strong> What is a camshaft? Quick, simple definition with animation.</p>
                        </div>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">⛽ Fuel System Components:</h4>
                        <ul class="text-sm text-purple-100 space-y-1">
                          <li>• High-pressure fuel pump, fuel injectors, and common rail (in modern engines) are responsible for delivering the right amount of fuel at the right time.</li>
                        </ul>
                        <div class="mt-2 p-2 bg-red-500/20 rounded border border-red-400">
                          <p class="text-xs text-red-100">📺 <strong>YOUTUBE LINK:</strong> How Diesel Common Rail Fuel Systems Work</p>
                        </div>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">🌪️ Turbocharger (if equipped):</h4>
                        <ul class="text-sm text-purple-100 space-y-1">
                          <li>• Increases air intake pressure, allowing for more efficient combustion and greater power output.</li>
                        </ul>
                        <div class="mt-2 p-2 bg-red-500/20 rounded border border-red-400">
                          <p class="text-xs text-red-100">📺 <strong>YOUTUBE LINK:</strong> How a turbocharger works! (Animation)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg shadow-lg mb-8">
                <h2 class="text-3xl font-bold text-white mb-6 text-center">📚 Section 4: Basic Engine Terminology and Function</h2>
                <p class="text-orange-100 text-center mb-6">Duration: 15 minutes</p>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">📖 Terminology</h3>
                    
                    <div class="space-y-4">
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">Compression Ratio:</h4>
                        <p class="text-sm text-orange-100">The ratio of the volume of the cylinder when the piston is at the bottom of its stroke compared to the top. Diesel engines typically have higher compression ratios than gasoline engines.</p>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">TDC (Top Dead Center) and BDC (Bottom Dead Center):</h4>
                        <ul class="text-sm text-orange-100 space-y-1">
                          <li>• <strong>TDC:</strong> The highest point of the piston's travel.</li>
                          <li>• <strong>BDC:</strong> The lowest point of the piston's travel.</li>
                        </ul>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">Stroke:</h4>
                        <p class="text-sm text-orange-100">The movement of the piston from TDC to BDC or vice versa.</p>
                      </div>
                      
                      <div class="bg-white/20 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-300 mb-2">Injection Timing:</h4>
                        <p class="text-sm text-orange-100">The precise moment when fuel is injected into the cylinder, critical for efficient combustion.</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">🔄 Function</h3>
                    
                    <div class="bg-white/20 p-4 rounded-lg">
                      <h4 class="font-semibold text-yellow-300 mb-4">The Diesel Engine Cycle:</h4>
                      <ul class="text-sm text-orange-100 space-y-2">
                        <li>• Compresses air to high pressures, injects fuel into the hot compressed air, and ignites it to produce power.</li>
                        <li>• Each component—cylinder, piston, crankshaft, and camshaft—works together to ensure smooth operation, consistent power output, and optimal efficiency.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 rounded-lg shadow-lg mb-8">
                <h2 class="text-3xl font-bold text-white mb-6 text-center">🎯 Conclusion and Q&A</h2>
                <p class="text-indigo-100 text-center mb-6">Duration: 30 minutes</p>
                
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">📝 Recap Key Points</h3>
                    <ul class="text-sm text-indigo-100 space-y-2">
                      <li>• Diesel engines operate on compression ignition, relying on high pressure and heat rather than a spark.</li>
                      <li>• Understanding the 4-stroke and 2-stroke cycles provides insight into how power is generated and delivered.</li>
                      <li>• Key components, such as the cylinder head, pistons, crankshaft, and camshaft, must work in harmony for efficient operation.</li>
                      <li>• Basic terminology like compression ratio, TDC, and injection timing is crucial for troubleshooting and repair.</li>
                    </ul>
                  </div>

                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">💬 Interactive Q&A Session</h3>
                    <ul class="text-sm text-indigo-100 space-y-2">
                      <li>• Invite participants to ask about the differences between 4-stroke and 2-stroke engines.</li>
                      <li>• Encourage discussion about how diesel engine components interact during operation.</li>
                      <li>• Provide real-world examples of how higher compression ratios benefit diesel engines.</li>
                    </ul>
                  </div>

                  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                    <h3 class="text-xl font-bold text-white mb-4">📋 Practice Assignments</h3>
                    <ul class="text-sm text-indigo-100 space-y-2">
                      <li>• Assign participants to identify key diesel engine components on an engine diagram.</li>
                      <li>• Encourage them to research and compare the compression ratios of different diesel and gasoline engines.</li>
                      <li>• Have them write a brief summary of the advantages of diesel engines in heavy-duty applications.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg">
                <h2 class="text-3xl font-bold text-white mb-4 text-center">✅ Outcome</h2>
                <p class="text-white text-center">By the end of this lecture, participants will have a clear understanding of diesel engine operation, how it differs from gasoline engines, and the purpose of key components. They will also become familiar with basic terminology, forming a solid foundation for more advanced topics in diesel mechanics.</p>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      id: 2,
      title: 'Diesel Engine Fundamentals Quiz',
      duration: '30 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which of the following correctly lists the four strokes of a 4-stroke diesel engine in order?',
            options: [
              'Power, Exhaust, Intake, Compression',
              'Intake, Compression, Power, Exhaust',
              'Compression, Intake, Power, Exhaust',
              'Intake, Power, Compression, Exhaust'
            ],
            correct: 1,
            explanation: 'The correct order is: Intake, Compression, Power, Exhaust.'
          },
          {
            question: 'What happens during the compression stroke in a 4-stroke diesel engine?',
            options: [
              'Fuel is injected',
              'The exhaust valve opens',
              'Air is drawn into the cylinder',
              'Air is compressed, raising its temperature'
            ],
            correct: 3,
            explanation: 'During the compression stroke, air is compressed which raises its temperature, preparing it for fuel injection.'
          },
          {
            question: 'What is a key characteristic of the power stroke in both 2-stroke and 4-stroke diesel engines?',
            options: [
              'It compresses the air-fuel mixture',
              'It expels exhaust gases',
              'It drives the piston downward',
              'It opens the intake valve'
            ],
            correct: 2,
            explanation: 'The power stroke drives the piston downward, converting combustion energy into mechanical motion.'
          },
          {
            question: 'Which of the following is a unique feature of 2-stroke diesel engines?',
            options: [
              'Use of spark plugs',
              'Power is generated every second stroke',
              'They have no exhaust systems',
              'Intake and compression occur in the same stroke'
            ],
            correct: 1,
            explanation: '2-stroke engines generate power every second stroke (every revolution), unlike 4-stroke engines.'
          },
          {
            question: 'Which statement best describes the difference in efficiency between 2-stroke and 4-stroke diesel engines?',
            options: [
              '2-stroke engines are always more fuel-efficient',
              '4-stroke engines produce more power for their size',
              '4-stroke engines are generally more fuel-efficient',
              'Both have the same fuel efficiency'
            ],
            correct: 2,
            explanation: '4-stroke engines are generally more fuel-efficient than 2-stroke engines.'
          },
          {
            question: 'How is combustion initiated in a diesel engine?',
            options: [
              'By a spark plug',
              'By heated glow plugs',
              'By compression of air to high temperatures',
              'By premixed fuel and air igniting automatically'
            ],
            correct: 2,
            explanation: 'Diesel engines use compression ignition - high compression generates heat that ignites the fuel.'
          },
          {
            question: 'Which of the following is a typical characteristic of diesel engines compared to gasoline engines?',
            options: [
              'Lower compression ratio',
              'Higher torque at lower RPMs',
              'Lower durability',
              'Greater horsepower at high speeds'
            ],
            correct: 1,
            explanation: 'Diesel engines typically produce higher torque at lower RPMs compared to gasoline engines.'
          },
          {
            question: 'Which engine type usually requires spark plugs?',
            options: [
              'Diesel engine',
              'Gasoline engine',
              'Both',
              'Neither'
            ],
            correct: 1,
            explanation: 'Gasoline engines use spark plugs for ignition, while diesel engines use compression ignition.'
          },
          {
            question: 'Why are diesel engines more suited for heavy-duty vehicles?',
            options: [
              'They have fewer parts',
              'They produce more heat',
              'They generate higher torque and are more fuel-efficient',
              'They are lighter'
            ],
            correct: 2,
            explanation: 'Diesel engines generate higher torque and are more fuel-efficient, making them ideal for heavy-duty applications.'
          },
          {
            question: 'What is a downside of diesel engines in terms of emissions?',
            options: [
              'They release more carbon monoxide',
              'They produce higher levels of NOx and particulate matter',
              'They generate more unburned hydrocarbons',
              'They emit higher amounts of CO2 per mile'
            ],
            correct: 1,
            explanation: 'Diesel engines produce higher levels of nitrogen oxides (NOx) and particulate matter.'
          },
          {
            question: 'What is the function of the crankshaft in a diesel engine?',
            options: [
              'Opens and closes the intake valve',
              'Converts rotational motion into linear motion',
              'Converts linear piston motion into rotational motion',
              'Compresses the air-fuel mixture'
            ],
            correct: 2,
            explanation: 'The crankshaft converts the linear motion of pistons into rotational motion to drive the transmission.'
          },
          {
            question: 'Which component controls the timing of valve operations?',
            options: [
              'Crankshaft',
              'Camshaft',
              'Turbocharger',
              'Fuel injector'
            ],
            correct: 1,
            explanation: 'The camshaft controls the timing of valve opening and closing operations.'
          },
          {
            question: 'What is the primary role of a turbocharger in a diesel engine?',
            options: [
              'To increase engine temperature',
              'To mix air and fuel',
              'To reduce engine noise',
              'To force more air into the cylinders for better combustion'
            ],
            correct: 3,
            explanation: 'A turbocharger forces more air into the cylinders, allowing for more efficient combustion and greater power output.'
          },
          {
            question: 'What does TDC stand for in engine terminology?',
            options: [
              'Top Drive Combustion',
              'Total Diesel Compression',
              'Top Dead Center',
              'Thermal Detonation Cycle'
            ],
            correct: 2,
            explanation: 'TDC stands for Top Dead Center - the highest point of the piston\'s travel in the cylinder.'
          },
          {
            question: 'Define compression ratio:',
            options: [
              'The ratio of piston height to crankshaft length',
              'The volume of the cylinder at TDC',
              'The difference between intake and exhaust pressure',
              'The ratio of cylinder volume at BDC to that at TDC'
            ],
            correct: 3,
            explanation: 'Compression ratio is the ratio of the cylinder volume when the piston is at BDC compared to when it\'s at TDC.'
          }
        ]
      }
    }
  ]
};
