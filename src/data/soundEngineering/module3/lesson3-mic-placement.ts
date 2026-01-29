
import type { VideoLesson } from '@/types/course';

export const lesson3MicPlacement: VideoLesson = {
  id: 12,
  title: 'Mic Placement Techniques',
  duration: '50 min',
  type: 'video',
  content: {
    videoUrl: 'https://example.com/mic-placement',
    textContent: `
      <div class="animate-fade-in">
        <div class="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-lg mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎤 Mic Placement Techniques
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Master the art of microphone positioning to achieve optimal sound quality and control in your recordings.
          </p>
        </div>

        <div class="space-y-8">
          <!-- Introduction -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">1. Introduction to Mic Placement</h3>
            <div class="space-y-4">
              <div class="bg-teal-50 p-4 rounded-lg">
                <h4 class="font-semibold text-teal-800 mb-2">Definition:</h4>
                <p class="text-teal-700">Mic placement refers to the positioning and orientation of a microphone relative to a sound source to achieve the desired tonal quality, clarity, and isolation.</p>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Importance:</h4>
                <ul class="text-blue-700 space-y-1">
                  <li>• Affects tone, presence, noise level, and recording balance</li>
                  <li>• Helps manage proximity effect, feedback, and room acoustics</li>
                  <li>• Crucial in studio, live, and broadcast environments</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Key Factors -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">2. Key Factors Affecting Mic Placement</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-3 text-left">Factor</th>
                    <th class="border border-gray-300 p-3 text-left">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Distance</td>
                    <td class="border border-gray-300 p-3">Affects loudness, proximity effect, room tone</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">Angle (off-axis/on-axis)</td>
                    <td class="border border-gray-300 p-3">Changes tonal character and clarity</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Environment</td>
                    <td class="border border-gray-300 p-3">Room acoustics can add echo or reverb</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">Mic type/pattern</td>
                    <td class="border border-gray-300 p-3">Directionality determines optimal position</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Sound source type</td>
                    <td class="border border-gray-300 p-3">Different instruments or voices need different setups</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- General Guidelines -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">3. General Guidelines for Mic Placement</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    ✅ On-Axis Placement
                  </h4>
                  <ul class="text-green-700 space-y-1 text-sm">
                    <li>• Mic is pointed directly at the sound source</li>
                    <li>• Brighter, clearer sound</li>
                    <li>• Most sensitive to detail</li>
                  </ul>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    ✅ Off-Axis Placement
                  </h4>
                  <ul class="text-blue-700 space-y-1 text-sm">
                    <li>• Mic is angled slightly away from the source</li>
                    <li>• Reduces harshness, captures more room sound</li>
                    <li>• Helps control plosives and sibilance</li>
                  </ul>
                </div>
              </div>
              <div class="space-y-4">
                <div class="bg-purple-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    ✅ Close Miking
                  </h4>
                  <ul class="text-purple-700 space-y-1 text-sm">
                    <li>• 1–12 inches from source</li>
                    <li>• Dry, detailed sound with low room reflection</li>
                    <li>• Risks: proximity effect (bass boost), plosives</li>
                  </ul>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                    ✅ Distant Miking
                  </h4>
                  <ul class="text-orange-700 space-y-1 text-sm">
                    <li>• 1 foot or more from source</li>
                    <li>• Natural, ambient sound</li>
                    <li>• Best in acoustically treated or well-behaved rooms</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg mt-4">
              <p class="text-yellow-700 text-sm">📺 YOUTUBE LINK: 3 Principles of Mic Placement Every Engineer Should Know</p>
            </div>
          </section>

          <!-- Voice Recording -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">4. Mic Placement for Voice (Podcasting, Vocals)</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-3 text-left">Technique</th>
                    <th class="border border-gray-300 p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Close Mic (6–12 inches)</td>
                    <td class="border border-gray-300 p-3">Clean, full voice; watch for plosives and sibilance</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">Use of Pop Filter</td>
                    <td class="border border-gray-300 p-3">Prevents popping from "p" and "b" sounds</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Slight Off-Axis (15–30°)</td>
                    <td class="border border-gray-300 p-3">Reduces harshness and sibilance</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">Distance Miking (1–2 feet)</td>
                    <td class="border border-gray-300 p-3">More natural voice, more room sound</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bg-blue-100 p-4 rounded-lg mt-4">
              <p class="text-blue-800 font-semibold">💡 Tip: Use cardioid or dynamic mics for vocal isolation in untreated rooms.</p>
            </div>
          </section>

          <!-- Instrument Placement -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">5. Mic Placement for Instruments</h3>
            
            <div class="space-y-6">
              <!-- Acoustic Guitar -->
              <div class="bg-amber-50 p-4 rounded-lg">
                <h4 class="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  🎸 Acoustic Guitar
                </h4>
                <ul class="text-amber-700 space-y-1 text-sm">
                  <li>• 6–12 inches from the 12th fret, slightly off-axis</li>
                  <li>• Avoid pointing directly at the sound hole (boomy)</li>
                  <li>• Combine mic on body + mic on neck for depth</li>
                </ul>
              </div>

              <!-- Drums -->
              <div class="bg-red-50 p-4 rounded-lg">
                <h4 class="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  🥁 Drums
                </h4>
                <ul class="text-red-700 space-y-1 text-sm">
                  <li>• Kick drum: Inside shell (attack), outside front head (body)</li>
                  <li>• Snare: Top close mic, angled toward center</li>
                  <li>• Overheads: Spaced pair or XY over kit</li>
                  <li>• Room mics: Add ambience and depth</li>
                </ul>
              </div>

              <!-- Piano -->
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  🎹 Piano
                </h4>
                <ul class="text-purple-700 space-y-1 text-sm">
                  <li>• Upright: Behind soundboard or over open lid</li>
                  <li>• Grand: Multiple mics over soundboard strings</li>
                  <li>• Blend close and room mics for full tone</li>
                </ul>
              </div>

              <!-- Brass/Woodwinds -->
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  🎷 Brass/Woodwinds
                </h4>
                <ul class="text-yellow-700 space-y-1 text-sm">
                  <li>• Mic 6–12 inches from bell, slightly off-axis</li>
                  <li>• Avoid placing directly in airflow</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Stereo Techniques -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">6. Stereo Mic Techniques</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-3 text-left">Technique</th>
                    <th class="border border-gray-300 p-3 text-left">Description</th>
                    <th class="border border-gray-300 p-3 text-left">Pattern</th>
                    <th class="border border-gray-300 p-3 text-left">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">XY</td>
                    <td class="border border-gray-300 p-3">Two cardioids at 90°, capsules close</td>
                    <td class="border border-gray-300 p-3">Coincident</td>
                    <td class="border border-gray-300 p-3">Tight stereo image, phase-coherent</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">AB</td>
                    <td class="border border-gray-300 p-3">Two omnis spaced apart</td>
                    <td class="border border-gray-300 p-3">Time difference</td>
                    <td class="border border-gray-300 p-3">Wide stereo, natural room</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">ORTF</td>
                    <td class="border border-gray-300 p-3">Two cardioids at 110°, 17cm apart</td>
                    <td class="border border-gray-300 p-3">Near-coincident</td>
                    <td class="border border-gray-300 p-3">Balanced stereo with space</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">Mid/Side (M/S)</td>
                    <td class="border border-gray-300 p-3">One cardioid + one figure-8 mic</td>
                    <td class="border border-gray-300 p-3">Adjustable width</td>
                    <td class="border border-gray-300 p-3">Flexible post-processing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Podcasting/Voiceovers -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">7. Mic Placement for Podcasting/Voiceovers</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">Home/Studio Recording:</h4>
                <ul class="text-green-700 space-y-1 text-sm">
                  <li>• Dynamic mic (e.g., SM7B) close to mouth (~6 inches)</li>
                  <li>• Pop filter + boom arm for stability</li>
                  <li>• Cardioid pattern to minimize room noise</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Multiple Hosts/Guests:</h4>
                <ul class="text-blue-700 space-y-1 text-sm">
                  <li>• Individual mics for each speaker</li>
                  <li>• Avoid mic bleed: position off-axis and use directional mics</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Common Mistakes -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">8. Common Mic Placement Mistakes</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr class="bg-red-100">
                    <th class="border border-gray-300 p-3 text-left">Mistake</th>
                    <th class="border border-gray-300 p-3 text-left">Consequence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Mic too close to mouth</td>
                    <td class="border border-gray-300 p-3">Plosives, boomy sound (proximity effect)</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">Mic too far from source</td>
                    <td class="border border-gray-300 p-3">Room noise, lack of clarity</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Directly in airflow path</td>
                    <td class="border border-gray-300 p-3">Popping sounds from breath</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 p-3 font-medium">Poor angle (on-axis sibilance)</td>
                    <td class="border border-gray-300 p-3">Harsh "s" sounds, excessive treble</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 p-3 font-medium">Incorrect mic type</td>
                    <td class="border border-gray-300 p-3">Misbalanced tone or high noise floor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Practical Tips -->
          <section class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">9. Practical Tips</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Recording Tips:</h4>
                <ul class="text-blue-700 space-y-1 text-sm">
                  <li>• Use headphones to monitor mic placement in real time</li>
                  <li>• Record short tests at different angles/distances</li>
                  <li>• Treat your room (even lightly) for better results</li>
                </ul>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">Equipment Tips:</h4>
                <ul class="text-green-700 space-y-1 text-sm">
                  <li>• Use shock mounts and isolation to reduce handling noise</li>
                  <li>• Label and document successful placements for future setups</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Summary -->
          <section class="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">10. Summary</h3>
            <div class="space-y-3">
              <ul class="text-gray-700 space-y-2">
                <li>• Mic placement is a critical skill in capturing professional audio</li>
                <li>• Depends on source, environment, mic type, and artistic intent</li>
                <li>• Small adjustments can result in significant tonal changes</li>
                <li>• Understanding placement techniques leads to cleaner, clearer, and more controlled recordings</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    `
  }
};
