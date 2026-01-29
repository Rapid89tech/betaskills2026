
import type { Lesson } from '@/types/course';

export const lesson3AudioEquipment: Lesson = {
  id: 8,
  title: 'Audio Interface, Mixers, Preamps',
  duration: '50 min',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/embed/Yh8-0bj3_sI',
    textContent: `
      <div class="space-y-8">
        <div class="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-xl shadow-lg">
          <h2 class="text-4xl font-bold text-cyan-800 mb-6 text-center animate-fade-in">
            🎛️ Audio Interface, Mixers, Preamps
          </h2>
          
          <div class="my-8">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/mkFpvHb1HQI" title="What is an Audio Interface?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md mb-6 animate-scale-in">
            <h3 class="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
              <span class="animate-pulse mr-3">🔌</span>
              Audio Interface
            </h3>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <h4 class="font-semibold text-blue-700 mb-2">What is an Audio Interface?</h4>
                <div class="space-y-2 text-gray-700">
                  <p>A hardware device that connects microphones, instruments, and other audio sources to a computer.</p>
                  <p>Converts analog signals to digital for recording and digital signals back to analog for playback.</p>
                </div>
              </div>
              
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold text-blue-700 mb-3">Main Functions:</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <div class="bg-blue-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>ADC:</strong> Converts analog input signals into digital audio data</p>
                    </div>
                    <div class="bg-indigo-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>DAC:</strong> Converts digital audio data back into analog signals for monitoring</p>
                    </div>
                    <div class="bg-purple-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>I/O:</strong> Provides inputs (mic, instrument, line) and outputs (monitors, headphones)</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="bg-cyan-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Preamps:</strong> Often includes built-in preamps for mic/instrument signal amplification</p>
                    </div>
                    <div class="bg-teal-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Phantom Power:</strong> Supplies phantom power (+48V) for condenser microphones</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Connectivity:</strong> Supports various connection protocols: USB, Thunderbolt, FireWire, PCIe</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-700 mb-2">Why Use an Audio Interface?</h4>
                <ul class="modern-bullet-list">
                  <li>Better audio quality than a computer's built-in sound card</li>
                  <li>Lower latency (delay) for real-time monitoring</li>
                  <li>Allows multi-channel recording</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="my-8">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/T1y8cjigI4Y" title="Types of Mixers" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
          </div>

          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-md mb-6 animate-slide-in-left">
            <h3 class="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
              <span class="animate-bounce mr-3">🎚️</span>
              Mixers
            </h3>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                <h4 class="font-semibold text-purple-700 mb-2">What is a Mixer?</h4>
                <div class="space-y-2 text-gray-700">
                  <p>A device that takes multiple audio inputs and combines them into one or more outputs.</p>
                  <p>Allows control of volume, tone, and effects on each input channel.</p>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold text-purple-700 mb-3">Types of Mixers:</h4>
                <div class="space-y-6">
                  <div class="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-lg border-2 border-red-200">
                    <h5 class="font-semibold text-red-700 mb-2">Analog Mixer</h5>
                    <p class="text-sm text-gray-600">Uses physical knobs, faders, and switches</p>
                  </div>
                  <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
                    <h5 class="font-semibold text-blue-700 mb-2">Digital Mixer</h5>
                    <p class="text-sm text-gray-600">Uses digital processing, offers presets, effects, and recallable settings</p>
                  </div>
                  <div class="my-8">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/wymFYVcVwvQ" title="Digital Mixer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
                  </div>
                  <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
                    <h5 class="font-semibold text-green-700 mb-2">Hybrid Mixer</h5>
                    <p class="text-sm text-gray-600">Combines analog controls with digital processing</p>
                  </div>
                  <div class="my-8">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/oblIQ8x9GLU" title="Hybrid Mixer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
                  </div>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold text-purple-700 mb-3">Key Components:</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <div class="bg-purple-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Channels:</strong> Input strips for microphones or instruments</p>
                    </div>
                    <div class="bg-pink-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Faders:</strong> Adjust channel volume</p>
                    </div>
                    <div class="bg-rose-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>EQ:</strong> Modify frequency response of each channel</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="bg-indigo-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Aux Sends:</strong> Create separate mixes for monitors or effects</p>
                    </div>
                    <div class="bg-blue-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Buses:</strong> Group several channels for collective control</p>
                    </div>
                    <div class="bg-cyan-50 p-3 rounded-lg">
                      <p class="text-sm"><strong>Master Section:</strong> Controls the final output level</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg">
                <h4 class="font-semibold text-amber-700 mb-2">Use Cases:</h4>
                <ul class="modern-bullet-list">
                  <li>Live sound reinforcement</li>
                  <li>Studio recording</li>
                  <li>Broadcast and podcast production</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="my-8">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/7UGEvcXlRlw" title="What is a Preamp?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="rounded-lg shadow-lg"></iframe>
          </div>

          <div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg shadow-md mb-6 animate-slide-in-right">
            <h3 class="text-2xl font-semibold text-orange-800 mb-4 flex items-center">
              <span class="animate-pulse mr-3">📢</span>
              Preamps (Preamplifiers)
            </h3>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                <h4 class="font-semibold text-orange-700 mb-2">What is a Preamp?</h4>
                <div class="space-y-2 text-gray-700">
                  <p>A device that boosts very low-level signals (like from microphones or guitars) to line level.</p>
                  <p>Essential for providing clean, noise-free amplification before processing or recording.</p>
                </div>
              </div>

              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold text-orange-700 mb-3">Characteristics:</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <div class="bg-orange-50 p-3 rounded-lg">
                      <p class="text-sm">• Provides gain (signal boost)</p>
                    </div>
                    <div class="bg-red-50 p-3 rounded-lg">
                      <p class="text-sm">• Should have a low noise floor and high headroom</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="bg-amber-50 p-3 rounded-lg">
                      <p class="text-sm">• Influences the tone and character of the sound</p>
                    </div>
                    <div class="bg-yellow-50 p-3 rounded-lg">
                      <p class="text-sm">• Available as standalone units or built into mixers and audio interfaces</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg">
                <p class="text-gray-700">
                  <strong>Common types:</strong> Solid-state (clean, transparent) and Tube (warm, colored).
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg shadow-md mb-6 animate-fade-in">
            <h3 class="text-2xl font-semibold text-teal-800 mb-4 flex items-center">
              <span class="animate-spin mr-3">🔄</span>
              How They Work Together
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm border-collapse bg-white rounded-lg shadow-sm">
                <thead>
                  <tr class="bg-teal-100">
                    <th class="border border-teal-300 p-3 text-left font-semibold">Device</th>
                    <th class="border border-teal-300 p-3 text-left font-semibold">Function</th>
                    <th class="border border-teal-300 p-3 text-left font-semibold">Role in Signal Chain</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  <tr class="hover:bg-teal-50 transition-colors">
                    <td class="border border-teal-300 p-3 font-medium">Preamp</td>
                    <td class="border border-teal-300 p-3">Amplifies mic/instrument signal to line level</td>
                    <td class="border border-teal-300 p-3">First stage after microphone or instrument</td>
                  </tr>
                  <tr class="hover:bg-teal-50 transition-colors">
                    <td class="border border-teal-300 p-3 font-medium">Mixer</td>
                    <td class="border border-teal-300 p-3">Combines and processes multiple signals</td>
                    <td class="border border-teal-300 p-3">Mixes all input sources, applies EQ and effects</td>
                  </tr>
                  <tr class="hover:bg-teal-50 transition-colors">
                    <td class="border border-teal-300 p-3 font-medium">Audio Interface</td>
                    <td class="border border-teal-300 p-3">Converts analog signals to/from digital</td>
                    <td class="border border-teal-300 p-3">Connects audio hardware to computer for recording/playback</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 bg-white p-4 rounded-lg">
              <p class="text-gray-700 mb-2">
                • In many modern setups, audio interfaces have built-in preamps and mixing functions.
              </p>
              <p class="text-gray-700">
                • External mixers or preamps are used when more control or higher quality is needed.
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-md animate-fade-in">
            <h3 class="text-2xl font-semibold text-indigo-800 mb-4 text-center">
              🎯 Summary
            </h3>
            <div class="grid md:grid-cols-3 gap-4 text-center">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold text-blue-700 mb-2">Audio Interface</h4>
                <p class="text-sm text-gray-600">Converts signals between analog and digital, connects to a computer</p>
              </div>
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold text-purple-700 mb-2">Mixer</h4>
                <p class="text-sm text-gray-600">Combines, controls, and processes multiple audio signals</p>
              </div>
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold text-orange-700 mb-2">Preamplifier</h4>
                <p class="text-sm text-gray-600">Boosts low-level signals to line level cleanly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
};
