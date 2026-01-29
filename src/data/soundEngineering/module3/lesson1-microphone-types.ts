
import type { VideoLesson } from '@/types/course';

export const lesson1MicrophoneTypes: VideoLesson = {
  id: 10,
  title: 'Types of Microphones',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://example.com/microphone-types',
    textContent: `
      <div class="animate-fade-in">
        <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎙️ Types of Microphones
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Explore the different types of microphones and their applications in professional audio production.
          </p>
        </div>

        <div class="space-y-8">
          <!-- Introduction -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">1. Introduction to Microphones</h3>
            <div class="space-y-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">What is a Microphone?</h4>
                <p class="text-blue-700">A microphone (mic) is a transducer that converts sound (acoustic energy) into electrical signals.</p>
                <p class="text-blue-700 mt-2">It captures audio from voices, instruments, or environments for recording, amplification, or broadcasting.</p>
              </div>
                <div class="bg-yellow-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-800 mb-2">📺 Video Resource</h4>
                  <p class="text-yellow-700">📺 YOUTUBE: What is a Microphone? - https://youtu.be/4cc0D2RJyMU</p>
                </div>
            </div>
          </section>

          <!-- Classifications -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">2. Microphone Classifications</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800">Transducer Type</h4>
                <p class="text-green-700 text-sm">How they convert sound</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800">Polar Pattern</h4>
                <p class="text-blue-700 text-sm">Directionality of sound pickup</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-semibold text-purple-800">Application/Design</h4>
                <p class="text-purple-700 text-sm">Usage or physical design</p>
              </div>
            </div>
          </section>

          <!-- Transducer Types -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">3. By Transducer Type</h3>
            
            <!-- Dynamic Microphones -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">A</span>
                Dynamic Microphones
              </h4>
              <div class="bg-green-50 p-4 rounded-lg space-y-3">
                <p class="text-green-800">Use a moving coil and magnetic field to generate signal. Rugged, durable, and affordable.</p>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-green-800 mb-2">Features:</h5>
                    <ul class="text-green-700 space-y-1 text-sm">
                      <li>• No external power needed</li>
                      <li>• Handles high SPL (sound pressure levels)</li>
                      <li>• Less sensitive to quiet, subtle sounds</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-green-800 mb-2">Examples:</h5>
                    <ul class="text-green-700 space-y-1 text-sm">
                      <li>• Shure SM58 (vocals)</li>
                      <li>• Shure SM57 (instruments)</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-green-100 p-3 rounded">
                  <h5 class="font-semibold text-green-800 mb-1">Use Cases:</h5>
                  <p class="text-green-700 text-sm">Live performances, drums, guitar amps, vocals (live)</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Dynamic Microphones - https://youtu.be/Ofq6FrI6dd4</p>
                </div>
              </div>
            </div>

            <!-- Condenser Microphones -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">B</span>
                Condenser Microphones
              </h4>
              <div class="bg-blue-50 p-4 rounded-lg space-y-3">
                <p class="text-blue-800">Use a capacitor (electrostatic) element to detect sound. Require phantom power (+48V) or battery.</p>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-blue-800 mb-2">Features:</h5>
                    <ul class="text-blue-700 space-y-1 text-sm">
                      <li>• High sensitivity and wide frequency response</li>
                      <li>• Better for capturing detail and nuance</li>
                      <li>• More fragile than dynamic mics</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-blue-800 mb-2">Examples:</h5>
                    <ul class="text-blue-700 space-y-1 text-sm">
                      <li>• Audio-Technica AT2020</li>
                      <li>• Neumann U87</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-blue-100 p-3 rounded">
                  <h5 class="font-semibold text-blue-800 mb-1">Use Cases:</h5>
                  <p class="text-blue-700 text-sm">Studio vocals, acoustic instruments, podcasting and broadcasting</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Condenser Microphones - https://youtu.be/omOTBD19P4I</p>
                </div>
              </div>
            </div>

            <!-- Ribbon Microphones -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">C</span>
                Ribbon Microphones
              </h4>
              <div class="bg-purple-50 p-4 rounded-lg space-y-3">
                <p class="text-purple-800">Use a thin metal ribbon suspended in a magnetic field.</p>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-purple-800 mb-2">Features:</h5>
                    <ul class="text-purple-700 space-y-1 text-sm">
                      <li>• Natural, vintage sound with smooth high frequencies</li>
                      <li>• Very delicate and sensitive to handling and wind</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-purple-800 mb-2">Examples:</h5>
                    <ul class="text-purple-700 space-y-1 text-sm">
                      <li>• Royer R-121</li>
                      <li>• AEA R84</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-purple-100 p-3 rounded">
                  <h5 class="font-semibold text-purple-800 mb-1">Use Cases:</h5>
                  <p class="text-purple-700 text-sm">Studio recording, vocals, brass, strings, guitar cabinets</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Ribbon Microphones - https://youtu.be/sE8cp7usjXo</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Specialty Microphones -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">5. Specialty Microphones</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-800 mb-2">Lavalier Microphones</h4>
                <p class="text-gray-700 text-sm mb-2">Small, clip-on mics for voice capture. Usually omnidirectional. Used in film, broadcasting, theater.</p>
                <div class="bg-yellow-50 p-2 rounded text-xs">
                  <p class="text-yellow-700">📺 YOUTUBE: Specialty Microphones - https://youtu.be/mUlB0lLXZNM</p>
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-800 mb-2">Shotgun Microphones</h4>
                <p class="text-gray-700 text-sm mb-2">Highly directional with narrow pickup angle. Uses interference tube to reject off-axis sound.</p>
                <div class="bg-yellow-50 p-2 rounded text-xs">
                  <p class="text-yellow-700">📺 YOUTUBE: Shotgun Microphones - https://youtu.be/h3LSEnI3ko0</p>
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-800 mb-2">USB Microphones</h4>
                <p class="text-gray-700 text-sm mb-2">Built-in analog-to-digital converter and USB output. Plug-and-play with computers.</p>
                <div class="bg-yellow-50 p-2 rounded text-xs">
                  <p class="text-yellow-700">📺 YOUTUBE: USB Microphones - https://youtu.be/sDjr1G0uqRc</p>
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-800 mb-2">Boundary Microphones (PZM)</h4>
                <p class="text-gray-700 text-sm mb-2">Placed on flat surfaces; pick up ambient sound. Good for conferences, stage floors.</p>
                <div class="bg-yellow-50 p-2 rounded text-xs">
                  <p class="text-yellow-700">📺 YOUTUBE: Boundary Microphones (PZM) - https://youtu.be/PLM70P1xrEA</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Summary Table -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">7. Summary Table</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2 text-left">Type</th>
                    <th class="border border-gray-300 p-2 text-left">Power Needed</th>
                    <th class="border border-gray-300 p-2 text-left">Sensitivity</th>
                    <th class="border border-gray-300 p-2 text-left">Durability</th>
                    <th class="border border-gray-300 p-2 text-left">Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2 font-medium">Dynamic</td>
                    <td class="border border-gray-300 p-2">No</td>
                    <td class="border border-gray-300 p-2">Low</td>
                    <td class="border border-gray-300 p-2">High</td>
                    <td class="border border-gray-300 p-2">Live vocals, drums</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-medium">Condenser</td>
                    <td class="border border-gray-300 p-2">Yes (+48V)</td>
                    <td class="border border-gray-300 p-2">High</td>
                    <td class="border border-gray-300 p-2">Moderate</td>
                    <td class="border border-gray-300 p-2">Studio vocals, acoustic</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-medium">Ribbon</td>
                    <td class="border border-gray-300 p-2">No (some yes)</td>
                    <td class="border border-gray-300 p-2">Medium-High</td>
                    <td class="border border-gray-300 p-2">Low</td>
                    <td class="border border-gray-300 p-2">Studio instruments</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-medium">Lavalier</td>
                    <td class="border border-gray-300 p-2">Yes (battery or phantom)</td>
                    <td class="border border-gray-300 p-2">Medium</td>
                    <td class="border border-gray-300 p-2">Moderate</td>
                    <td class="border border-gray-300 p-2">Interviews, film</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-medium">Shotgun</td>
                    <td class="border border-gray-300 p-2">Yes</td>
                    <td class="border border-gray-300 p-2">High</td>
                    <td class="border border-gray-300 p-2">High</td>
                    <td class="border border-gray-300 p-2">Film, field recording</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Conclusion -->
          <section class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">8. Conclusion</h3>
            <div class="space-y-3">
              <p class="text-gray-700">Understanding microphone types helps in choosing the right mic for:</p>
              <ul class="modern-bullet-list ml-4">
                <li>Optimal sound quality</li>
                <li>Appropriate application</li>
                <li>Maximum performance in different recording environments</li>
              </ul>
              <div class="bg-blue-100 p-4 rounded-lg mt-4">
                <p class="text-blue-800 font-semibold">💡 Tip: Always match mic type and pattern to the sound source and setting.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `
  }
};
