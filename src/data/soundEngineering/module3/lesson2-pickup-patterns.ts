
import type { VideoLesson } from '@/types/course';

export const lesson2PickupPatterns: VideoLesson = {
  id: 11,
  title: 'Pickup Patterns (Polar Patterns)',
  duration: '40 min',
  type: 'video',
  content: {
    videoUrl: 'https://example.com/pickup-patterns',
    textContent: `
      <div class="animate-fade-in">
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎤 Pickup Patterns (Polar Patterns)
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Learn how microphones respond to sound from different directions and how to choose the right pattern for your recording needs.
          </p>
        </div>

        <div class="space-y-8">
          <!-- Introduction -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">1. What Are Pickup Patterns?</h3>
            <div class="space-y-4">
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-semibold text-purple-800 mb-2">Definition:</h4>
                <p class="text-purple-700">Pickup patterns (or polar patterns) describe how a microphone responds to sound from different directions—i.e., where it "hears" sound the most and where it rejects it.</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Importance:</h4>
                <ul class="text-blue-700 space-y-1">
                  <li>• Crucial in selecting the right microphone for a specific recording situation</li>
                  <li>• Helps manage sound isolation, feedback control, and room acoustics</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Types of Pickup Patterns -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">2. Types of Pickup Patterns</h3>
            
            <!-- Omnidirectional -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                <span class="text-xl">A. Omnidirectional</span>
              </h4>
              <div class="bg-green-50 p-4 rounded-lg space-y-3">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-green-800 mb-2">Description:</h5>
                    <ul class="text-green-700 space-y-1 text-sm">
                      <li>• Picks up sound equally well from all directions (360°)</li>
                      <li>• No rejection areas</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-green-800 mb-2">Characteristics:</h5>
                    <ul class="text-green-700 space-y-1 text-sm">
                      <li>• Natural and open sound</li>
                      <li>• High ambient noise pickup</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-green-100 p-3 rounded">
                  <h5 class="font-semibold text-green-800 mb-1">Use Cases:</h5>
                  <p class="text-green-700 text-sm">Room/ambience recording, group conversations, lavalier mics in broadcast</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: By Polar Pattern (Directionality) - https://youtu.be/AdOx7t-J2ek</p>
                </div>
                <div class="bg-gray-100 p-3 rounded flex items-center justify-center">
                  <span class="text-2xl">🟢</span>
                  <span class="ml-2 text-gray-600 text-sm">(Perfect circle around the mic)</span>
                </div>
              </div>
            </div>

            <!-- Cardioid -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                <span class="text-xl">B. Cardioid</span>
              </h4>
              <div class="bg-orange-50 p-4 rounded-lg space-y-3">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-orange-800 mb-2">Description:</h5>
                    <ul class="text-orange-700 space-y-1 text-sm">
                      <li>• Picks up sound primarily from the front</li>
                      <li>• Rejects sound from the rear</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-orange-800 mb-2">Characteristics:</h5>
                    <ul class="text-orange-700 space-y-1 text-sm">
                      <li>• Good background noise rejection</li>
                      <li>• Named "cardioid" due to its heart-shaped pattern</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-orange-100 p-3 rounded">
                  <h5 class="font-semibold text-orange-800 mb-1">Use Cases:</h5>
                  <p class="text-orange-700 text-sm">Studio vocals, live vocals, podcasts and streaming</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Cardioid - https://youtu.be/keBa2ocQInI</p>
                </div>
                <div class="bg-gray-100 p-3 rounded flex items-center justify-center">
                  <span class="text-2xl">🧡</span>
                  <span class="ml-2 text-gray-600 text-sm">(Heart-shaped pattern with wide front lobe)</span>
                </div>
              </div>
            </div>

            <!-- Supercardioid -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                <span class="text-xl">C. Supercardioid</span>
              </h4>
              <div class="bg-blue-50 p-4 rounded-lg space-y-3">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-blue-800 mb-2">Description:</h5>
                    <ul class="text-blue-700 space-y-1 text-sm">
                      <li>• Tighter front pickup than cardioid</li>
                      <li>• Small rear lobe (picks up a little from the back)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-blue-800 mb-2">Characteristics:</h5>
                    <ul class="text-blue-700 space-y-1 text-sm">
                      <li>• Better side noise rejection</li>
                      <li>• Slightly more sensitive to rear noise than cardioid</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-blue-100 p-3 rounded">
                  <h5 class="font-semibold text-blue-800 mb-1">Use Cases:</h5>
                  <p class="text-blue-700 text-sm">Noisy live stages, isolating vocals or instruments in close setups</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Supercardioid - https://youtu.be/nTFeedjmJxQ</p>
                </div>
                <div class="bg-gray-100 p-3 rounded flex items-center justify-center">
                  <span class="text-2xl">🔶</span>
                  <span class="ml-2 text-gray-600 text-sm">(Narrower front with small back pickup)</span>
                </div>
              </div>
            </div>

            <!-- Hypercardioid -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                <span class="text-xl">D. Hypercardioid</span>
              </h4>
              <div class="bg-purple-50 p-4 rounded-lg space-y-3">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-purple-800 mb-2">Description:</h5>
                    <ul class="text-purple-700 space-y-1 text-sm">
                      <li>• Even narrower front pickup angle than supercardioid</li>
                      <li>• Larger rear lobe</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-purple-800 mb-2">Characteristics:</h5>
                    <ul class="text-purple-700 space-y-1 text-sm">
                      <li>• Extremely focused directionality</li>
                      <li>• More susceptible to rear pickup than supercardioid</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-purple-100 p-3 rounded">
                  <h5 class="font-semibold text-purple-800 mb-1">Use Cases:</h5>
                  <p class="text-purple-700 text-sm">Isolating sound in very loud environments, drum overheads, stage monitors</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Hypercardioid - https://youtu.be/keBa2ocQInI</p>
                </div>
                <div class="bg-gray-100 p-3 rounded flex items-center justify-center">
                  <span class="text-2xl">🔺</span>
                  <span class="ml-2 text-gray-600 text-sm">(Very narrow front with significant rear sensitivity)</span>
                </div>
              </div>
            </div>

            <!-- Bidirectional -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                <span class="text-xl">E. Bidirectional (Figure-8)</span>
              </h4>
              <div class="bg-teal-50 p-4 rounded-lg space-y-3">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-teal-800 mb-2">Description:</h5>
                    <ul class="text-teal-700 space-y-1 text-sm">
                      <li>• Picks up sound from the front and back</li>
                      <li>• Rejects sound from the sides</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-teal-800 mb-2">Characteristics:</h5>
                    <ul class="text-teal-700 space-y-1 text-sm">
                      <li>• Excellent side rejection</li>
                      <li>• Very natural room sound when used properly</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-teal-100 p-3 rounded">
                  <h5 class="font-semibold text-teal-800 mb-1">Use Cases:</h5>
                  <p class="text-teal-700 text-sm">Duets or interviews (face-to-face), stereo miking (Blumlein, mid-side techniques)</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Bidirectional (Figure-8) - https://youtu.be/qV6mxPpqTv0</p>
                </div>
                <div class="bg-gray-100 p-3 rounded flex items-center justify-center">
                  <span class="text-2xl">🟢🟢</span>
                  <span class="ml-2 text-gray-600 text-sm">(Two circles front and back)</span>
                </div>
              </div>
            </div>

            <!-- Shotgun -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                <span class="text-xl">F. Shotgun (Lobar)</span>
              </h4>
              <div class="bg-red-50 p-4 rounded-lg space-y-3">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-red-800 mb-2">Description:</h5>
                    <ul class="text-red-700 space-y-1 text-sm">
                      <li>• Extremely directional pickup with narrow acceptance angle</li>
                      <li>• Uses an interference tube to cancel off-axis sounds</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-red-800 mb-2">Characteristics:</h5>
                    <ul class="text-red-700 space-y-1 text-sm">
                      <li>• Best at long-distance sound isolation</li>
                      <li>• Rejection of side and ambient noise</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-red-100 p-3 rounded">
                  <h5 class="font-semibold text-red-800 mb-1">Use Cases:</h5>
                  <p class="text-red-700 text-sm">Film and TV production, field recording, nature recording</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                  <p class="text-yellow-700 text-sm">📺 YOUTUBE: Shotgun (Lobar) - https://youtu.be/HagyNPzc-zs</p>
                </div>
                <div class="bg-gray-100 p-3 rounded flex items-center justify-center">
                  <span class="text-2xl">🎯</span>
                  <span class="ml-2 text-gray-600 text-sm">(Tight forward beam, very little side pickup)</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Visual Comparison -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">3. Visual Comparison of Patterns</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2 text-left">Pattern</th>
                    <th class="border border-gray-300 p-2 text-left">Front Pickup</th>
                    <th class="border border-gray-300 p-2 text-left">Side Rejection</th>
                    <th class="border border-gray-300 p-2 text-left">Rear Pickup</th>
                    <th class="border border-gray-300 p-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-2 font-medium">Omnidirectional</td>
                    <td class="border border-gray-300 p-2">Yes</td>
                    <td class="border border-gray-300 p-2">No</td>
                    <td class="border border-gray-300 p-2">Yes</td>
                    <td class="border border-gray-300 p-2">Natural sound, ambiance</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-medium">Cardioid</td>
                    <td class="border border-gray-300 p-2">Yes</td>
                    <td class="border border-gray-300 p-2">Moderate</td>
                    <td class="border border-gray-300 p-2">No</td>
                    <td class="border border-gray-300 p-2">Studio vocals, podcasts</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-medium">Supercardioid</td>
                    <td class="border border-gray-300 p-2">Yes (narrow)</td>
                    <td class="border border-gray-300 p-2">High</td>
                    <td class="border border-gray-300 p-2">Slight</td>
                    <td class="border border-gray-300 p-2">Stage performance, film</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-medium">Hypercardioid</td>
                    <td class="border border-gray-300 p-2">Yes (tighter)</td>
                    <td class="border border-gray-300 p-2">Very high</td>
                    <td class="border border-gray-300 p-2">More than super</td>
                    <td class="border border-gray-300 p-2">Loud environments, drums</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-2 font-medium">Bidirectional</td>
                    <td class="border border-gray-300 p-2">Yes (front & back)</td>
                    <td class="border border-gray-300 p-2">Very high</td>
                    <td class="border border-gray-300 p-2">Yes</td>
                    <td class="border border-gray-300 p-2">Interviews, stereo miking</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-2 font-medium">Shotgun</td>
                    <td class="border border-gray-300 p-2">Yes (focused)</td>
                    <td class="border border-gray-300 p-2">Extremely high</td>
                    <td class="border border-gray-300 p-2">Minimal</td>
                    <td class="border border-gray-300 p-2">Film, long-range vocal pickup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Choosing the Right Pattern -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">4. Choosing the Right Pickup Pattern</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Scenario</h4>
                <ul class="text-blue-700 space-y-1 text-sm">
                  <li>• Solo vocal in studio</li>
                  <li>• Noisy environment</li>
                  <li>• Group discussion (1 mic)</li>
                  <li>• Film set (distant sound)</li>
                  <li>• Interview (2 people, face-to-face)</li>
                  <li>• Live concert (drum overheads)</li>
                </ul>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">Recommended Pattern</h4>
                <ul class="text-green-700 space-y-1 text-sm">
                  <li>• Cardioid</li>
                  <li>• Supercardioid</li>
                  <li>• Omnidirectional</li>
                  <li>• Shotgun</li>
                  <li>• Bidirectional</li>
                  <li>• Hypercardioid</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Multi-Pattern Microphones -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">5. Multi-Pattern Microphones</h3>
            <div class="bg-purple-50 p-4 rounded-lg">
              <p class="text-purple-800 mb-3">Some condenser mics offer switchable polar patterns, allowing users to choose between:</p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <ul class="text-purple-700 space-y-1 text-sm">
                    <li>• Cardioid</li>
                    <li>• Omnidirectional</li>
                  </ul>
                </div>
                <div>
                  <ul class="text-purple-700 space-y-1 text-sm">
                    <li>• Bidirectional</li>
                    <li>• Sometimes super/hypercardioid</li>
                  </ul>
                </div>
              </div>
              <div class="bg-purple-100 p-3 rounded mt-3">
                <h5 class="font-semibold text-purple-800 mb-1">Examples:</h5>
                <p class="text-purple-700 text-sm">AKG C414, Blue Yeti</p>
                <p class="text-purple-700 text-sm mt-1">These mics are versatile for multiple recording applications.</p>
              </div>
            </div>
          </section>

          <!-- Additional Resources -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">6. Additional Educational Videos</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">Types of Pickup Patterns</h4>
                <p class="text-yellow-700 text-sm">📺 YOUTUBE: Types of Pickup Patterns - https://youtu.be/XNu5H2qJ-hc</p>
              </div>
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">Cardioid Pattern Deep Dive</h4>
                <p class="text-yellow-700 text-sm">📺 YOUTUBE: Cardioid Microphones - https://youtu.be/XpwGtm-gquU</p>
              </div>
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">Bidirectional Pattern</h4>
                <p class="text-yellow-700 text-sm">📺 YOUTUBE: Bidirectional (Figure-8) - https://www.youtube.com/watch?v=rbnPc8pzlp0</p>
              </div>
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2">Distant Miking Techniques</h4>
                <p class="text-yellow-700 text-sm">📺 YOUTUBE: Distant Miking - https://youtu.be/Fc-c66PjC0M</p>
              </div>
            </div>
          </section>

          <!-- Summary -->
          <section class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">7. Summary</h3>
            <div class="space-y-3">
              <ul class="text-gray-700 space-y-2">
                <li>• Pickup patterns determine how a mic captures sound from different directions</li>
                <li>• Choosing the correct pattern can improve audio quality, reduce noise, and enhance focus on the intended source</li>
                <li>• Understanding these patterns is essential for mic placement, studio setup, and live sound engineering</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    `
  }
};
