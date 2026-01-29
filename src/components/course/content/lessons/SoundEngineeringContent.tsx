
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Volume2, 
  Headphones, 
  Mic, 
  Radio, 
  Music, 
  Film, 
  Gamepad2,
  Heart,
  Car,
  Building,
  ChevronRight,
  Play,
  Youtube
} from 'lucide-react';
import type { VideoLesson } from '@/types/course';

interface SoundEngineeringContentProps {
  lesson: VideoLesson;
}

const SoundEngineeringContent = ({ lesson }: SoundEngineeringContentProps) => {
  const [activeSection, setActiveSection] = useState(0);

  if (lesson.id === 1) {
    return <WhatIsSoundContent />;
  } else if (lesson.id === 2) {
    return <AudioCareersContent />;
  } else if (lesson.id === 3) {
    return <BasicSoundPropertiesContent />;
  } else if (lesson.id === 4) {
    return <IndustryApplicationsContent />;
  }

  return <DefaultSoundContent lesson={lesson} />;
};

const WhatIsSoundContent = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white animate-scale-in overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎧</div>
            <h2 className="text-4xl font-bold mb-4">What is Sound?</h2>
            <p className="text-xl opacity-90">Discover the fascinating world of mechanical waves and audio perception</p>
          </div>
          <div className="absolute -right-10 -top-10 text-8xl opacity-20">
            <Volume2 className="h-32 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Definition Section */}
      <Card className="animate-slide-in-left border-l-4 border-l-blue-500">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Volume2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">Definition of Sound</h3>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <p className="text-lg text-blue-800 leading-relaxed">
              Sound is a type of <strong>mechanical wave</strong> that results from the vibration of particles in a medium (such as air, water, or solids).
            </p>
            <p className="text-lg text-blue-800 leading-relaxed mt-4">
              It is perceived by the human ear and interpreted by the brain as auditory information.
            </p>
          </div>

          {/* REMOVE: YouTube video and label */}
        </CardContent>
      </Card>

      {/* Sound Production */}
      <Card className="animate-slide-in-right">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-3 rounded-full animate-pulse">
              <Radio className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">How Sound is Produced</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg text-center animate-scale-in delay-100">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-semibold text-green-800">Vibration</h4>
              <p className="text-sm text-green-700">Object vibrates</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center animate-scale-in delay-200">
              <div className="text-3xl mb-2">〰️</div>
              <h4 className="font-semibold text-green-800">Disturbance</h4>
              <p className="text-sm text-green-700">Particles disturbed</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center animate-scale-in delay-300">
              <div className="text-3xl mb-2">📡</div>
              <h4 className="font-semibold text-green-800">Wave</h4>
              <p className="text-sm text-green-700">Travels outward</p>
            </div>
          </div>

          {/* REMOVE: YouTube video and label */}
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card className="animate-fade-in delay-300">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Music className="h-6 w-6 text-purple-600" />
            </div>
            Properties of Sound Waves
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <th className="border border-gray-300 p-4 text-left">Property</th>
                  <th className="border border-gray-300 p-4 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Frequency (Hz)', 'Number of wave cycles per second; determines pitch.'],
                  ['Amplitude', 'Height of the wave; relates to volume (loudness).'],
                  ['Wavelength', 'Distance between two peaks of compression.'],
                  ['Speed', 'How fast the wave travels; depends on the medium.'],
                  ['Phase', 'Position of a point in time on a waveform cycle.']
                ].map(([property, description], index) => (
                  <tr key={property} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors`}>
                    <td className="border border-gray-300 p-4 font-semibold text-purple-700">{property}</td>
                    <td className="border border-gray-300 p-4">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* REMOVE: YouTube video and label */}
        </CardContent>
      </Card>

      {/* Types of Sound Waves */}
      <Card className="animate-slide-in-left delay-400">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-indigo-600 mb-6">Types of Sound Waves</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg animate-scale-in">
              <div className="text-4xl mb-3 text-center">👂</div>
              <h4 className="font-bold text-green-800 mb-2">Audible Sound</h4>
              <p className="text-sm text-green-700">20 Hz – 20,000 Hz</p>
              <p className="text-xs text-green-600">(heard by humans)</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-lg animate-scale-in delay-100">
              <div className="text-4xl mb-3 text-center">🌍</div>
              <h4 className="font-bold text-orange-800 mb-2">Infrasound</h4>
              <p className="text-sm text-orange-700">Below 20 Hz</p>
              <p className="text-xs text-orange-600">(earthquakes)</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg animate-scale-in delay-200">
              <div className="text-4xl mb-3 text-center">🏥</div>
              <h4 className="font-bold text-blue-800 mb-2">Ultrasound</h4>
              <p className="text-sm text-blue-700">Above 20,000 Hz</p>
              <p className="text-xs text-blue-600">(medical imaging)</p>
            </div>
          </div>

          {/* REMOVE: YouTube video and label */}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold mb-4">Summary</h3>
          <div className="space-y-3 text-lg">
            <p>Sound is a mechanical wave created by vibrations and transmitted through a medium.</p>
            <p>Our perception of sound depends on its frequency, amplitude, and waveform.</p>
            <p>Sound plays a crucial role in many aspects of life, from communication to science and technology.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AudioCareersContent = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white animate-scale-in overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎙️</div>
            <h2 className="text-4xl font-bold mb-4">Audio Careers</h2>
            <p className="text-xl opacity-90">Explore the exciting world of professional audio opportunities</p>
          </div>
          <div className="absolute -right-10 -bottom-10 text-8xl opacity-20">
            <Headphones className="h-32 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="animate-slide-in-left">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Music className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">Introduction to Audio Careers</h3>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg space-y-4">
            <p className="text-blue-800">The audio industry offers a wide variety of careers involving the creation, manipulation, and management of sound.</p>
            <p className="text-blue-800">Careers span across industries such as music, film, broadcasting, gaming, live events, podcasting, and technology.</p>
            <p className="text-blue-800">Rapid advances in technology have expanded opportunities in digital and immersive audio (e.g., VR/AR, 3D sound).</p>
          </div>
        </CardContent>
      </Card>

      {/* Major Fields */}
      <Card className="animate-slide-in-right">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-6">Major Fields in Audio Careers</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { field: 'Music Production', icon: Music, color: 'from-pink-400 to-pink-600', desc: 'Recording, editing, mixing, and mastering music.' },
              { field: 'Film & TV Sound', icon: Film, color: 'from-blue-400 to-blue-600', desc: 'Sound design, dialogue editing, and Foley for visual media.' },
              { field: 'Live Sound', icon: Mic, color: 'from-green-400 to-green-600', desc: 'Managing sound at concerts, theaters, and live events.' },
              { field: 'Broadcasting', icon: Radio, color: 'from-purple-400 to-purple-600', desc: 'Audio engineering for radio, TV, and live streams.' },
              { field: 'Game Audio', icon: Gamepad2, color: 'from-orange-400 to-orange-600', desc: 'Sound effects, dialogue, and music for video games.' },
              { field: 'Podcasting', icon: Headphones, color: 'from-teal-400 to-teal-600', desc: 'Producing and editing spoken-word audio.' },
              { field: 'Audiobooks', icon: Volume2, color: 'from-indigo-400 to-indigo-600', desc: 'Recording and mastering spoken content.' },
              { field: 'Audio Tech Dev', icon: Building, color: 'from-red-400 to-red-600', desc: 'Designing software, hardware, and AI tools for audio.' }
            ].map((item, index) => (
              <div key={item.field} className={`bg-gradient-to-br ${item.color} text-white p-6 rounded-lg animate-scale-in hover:scale-105 transition-transform cursor-pointer`} style={{animationDelay: `${index * 100}ms`}}>
                <item.icon className="h-8 w-8 mb-3" />
                <h4 className="font-bold mb-2">{item.field}</h4>
                <p className="text-sm opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Titles */}
      <Card className="animate-fade-in delay-300">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-green-600 mb-6">Common Job Titles & Roles</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                  <th className="border border-gray-300 p-4 text-left">Job Title</th>
                  <th className="border border-gray-300 p-4 text-left">Role Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Audio Engineer', 'Operates equipment to record, mix, and produce sound.'],
                  ['Sound Designer', 'Creates custom audio elements and environments.'],
                  ['Mixing Engineer', 'Balances and blends audio tracks.'],
                  ['Mastering Engineer', 'Finalizes audio for distribution.'],
                  ['Foley Artist', 'Recreates everyday sounds for film/TV.'],
                  ['Live Sound Technician', 'Manages sound reinforcement in live settings.'],
                  ['Music Producer', 'Oversees the recording and artistic direction of music projects.'],
                  ['Podcast Producer/Editor', 'Records and edits episodes, adds effects, and improves quality.'],
                  ['Voiceover Artist', 'Performs spoken content for media and advertising.'],
                  ['Audio Software Developer', 'Creates plugins, DAWs, and sound design tools.']
                ].map(([title, description], index) => (
                  <tr key={title} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50 transition-colors`}>
                    <td className="border border-gray-300 p-4 font-semibold text-green-700">{title}</td>
                    <td className="border border-gray-300 p-4">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="animate-slide-in-left delay-400">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-orange-600 mb-6">Required Skills and Tools</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🔧</div>
                <h4 className="font-bold text-orange-800">Technical Skills</h4>
              </div>
              <ul className="text-orange-700 space-y-2">
                <li>• Proficiency with DAWs (Pro Tools, Logic Pro, Ableton Live)</li>
                <li>• Knowledge of microphones, mixers, audio interfaces</li>
                <li>• Understanding of signal flow, EQ, compression, and effects</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🎨</div>
                <h4 className="font-bold text-purple-800">Creative Skills</h4>
              </div>
              <ul className="text-purple-700 space-y-2">
                <li>• Sound aesthetics</li>
                <li>• Music theory (for music-related careers)</li>
                <li>• Critical listening</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">💼</div>
                <h4 className="font-bold text-blue-800">Soft Skills</h4>
              </div>
              <ul className="text-blue-700 space-y-2">
                <li>• Communication & collaboration</li>
                <li>• Time management</li>
                <li>• Problem-solving</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BasicSoundPropertiesContent = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white animate-scale-in overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4 animate-bounce">🔊</div>
            <h2 className="text-4xl font-bold mb-4">Basic Sound Properties</h2>
            <p className="text-xl opacity-90">Master the fundamental characteristics of sound waves</p>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="animate-slide-in-left">
        <CardContent className="p-8">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Introduction to Sound Properties</h3>
            <div className="space-y-3 text-blue-700">
              <p>Sound is a mechanical wave that travels through a medium by vibrating particles.</p>
              <p>The characteristics of these waves determine how sound is perceived by the human ear.</p>
              <p>Understanding these properties is essential for anyone working in audio, acoustics, music, or media production.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Properties */}
      <Card className="animate-fade-in">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Key Properties of Sound Waves</h3>
          
          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/wEL87lznGrg?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Key Properties of Sound Waves" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: '🌀',
                title: 'Frequency',
                subtitle: 'Number of wave cycles per second',
                unit: 'Hertz (Hz)',
                perception: 'Determines pitch',
                color: 'from-blue-400 to-blue-600',
                details: 'Low frequency = Low pitch (bass guitar)\nHigh frequency = High pitch (whistle)\nHuman hearing: ~20 Hz to 20,000 Hz'
              },
              {
                icon: '🔊',
                title: 'Amplitude',
                subtitle: 'Height of the sound wave',
                unit: 'Decibels (dB)',
                perception: 'Determines loudness',
                color: 'from-green-400 to-green-600',
                details: 'Higher amplitude = Louder sound\nLower amplitude = Softer sound'
              },
              {
                icon: '🌊',
                title: 'Wavelength',
                subtitle: 'Distance between wave peaks',
                unit: 'Meters',
                perception: 'Related to frequency',
                color: 'from-purple-400 to-purple-600',
                details: 'Wavelength = Speed of Sound ÷ Frequency\nLonger wavelength = Lower frequency'
              },
              {
                icon: '🚀',
                title: 'Speed of Sound',
                subtitle: 'How fast sound travels',
                unit: 'Meters per second (m/s)',
                perception: 'Varies by medium',
                color: 'from-red-400 to-red-600',
                details: 'Air (20°C): ~343 m/s\nWater: ~1,480 m/s\nSteel: ~5,960 m/s'
              },
              {
                icon: '🔄',
                title: 'Phase',
                subtitle: 'Position in waveform cycle',
                unit: 'Degrees',
                perception: 'Affects mixing',
                color: 'from-orange-400 to-orange-600',
                details: 'Important for interference\nPhase issues can cancel sounds'
              },
              {
                icon: '🔉',
                title: 'Timbre',
                subtitle: 'Quality or color of sound',
                unit: 'N/A',
                perception: 'Tone character',
                color: 'from-pink-400 to-pink-600',
                details: 'Violin vs flute playing same note\nDetermined by harmonics'
              }
            ].map((property, index) => (
              <div 
                key={property.title} 
                className={`bg-gradient-to-br ${property.color} text-white p-6 rounded-lg animate-scale-in hover:scale-105 transition-transform cursor-pointer`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-4xl mb-3 text-center">{property.icon}</div>
                <h4 className="font-bold text-xl mb-2">{property.title}</h4>
                <p className="text-sm opacity-90 mb-2">{property.subtitle}</p>
                <div className="bg-white/20 p-3 rounded mb-3">
                  <p className="text-xs"><strong>Unit:</strong> {property.unit}</p>
                  <p className="text-xs"><strong>Perception:</strong> {property.perception}</p>
                </div>
                <p className="text-xs opacity-80 whitespace-pre-line">{property.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Table */}
      <Card className="animate-slide-in-right">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Summary of Basic Sound Properties</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <th className="border border-gray-300 p-4 text-left">Property</th>
                  <th className="border border-gray-300 p-4 text-left">Measured In</th>
                  <th className="border border-gray-300 p-4 text-left">Affects...</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Frequency', 'Hertz (Hz)', 'Pitch'],
                  ['Amplitude', 'Decibels (dB)', 'Loudness'],
                  ['Wavelength', 'Meters', 'Pitch/Speed'],
                  ['Speed', 'm/s', 'Timing'],
                  ['Phase', 'Degrees', 'Clarity/Mix'],
                  ['Timbre', 'N/A', 'Tone Quality']
                ].map(([property, unit, affects], index) => (
                  <tr key={property} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors`}>
                    <td className="border border-gray-300 p-4 font-semibold text-indigo-700">{property}</td>
                    <td className="border border-gray-300 p-4">{unit}</td>
                    <td className="border border-gray-300 p-4">{affects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Additional Videos */}
          <div className="space-y-6 mt-8">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/PVObtPN_UFw?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Amplitude" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/E-SPpUhzYZY?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Wavelength" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/q9ezMbDpIHI?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Mediums for Sound Transmission" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/xc34n-l4vd4?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Human Perception of Sound" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/L3cIo8G65m4?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Reflection, Absorption, Diffusion" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/xI_gXxA7GaM?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Sound Environments" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const IndustryApplicationsContent = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white animate-scale-in overflow-hidden">
        <CardContent className="p-8 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎧</div>
            <h2 className="text-4xl font-bold mb-4">Industry Applications</h2>
            <p className="text-xl opacity-90">Discover how sound transforms industries worldwide</p>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="animate-slide-in-left">
        <CardContent className="p-8">
          <div className="bg-gradient-to-r from-teal-100 to-blue-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">Introduction</h3>
            <div className="space-y-3 text-teal-700">
              <p>Sound is not only central to entertainment and communication, but also vital across science, technology, medicine, industry, and business.</p>
              <p>Understanding sound's practical applications helps in career planning and innovation across disciplines.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entertainment & Media Section */}
      <Card className="animate-slide-in-right">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-6">Entertainment & Media</h3>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/YyUcAoj-BVM?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Entertainment & Media" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/_iUdNak3a7c?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Film & Television" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/S84Dp880C8Q?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Video Games" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Wgeg_TnndnY?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Podcasting & Broadcasting" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Technology Section */}
      <Card className="animate-fade-in">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-6">Communication Technology</h3>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Go1tF9E3XEg?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Telecommunications" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/MWvsgal_SGY?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Consumer Audio" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry & Safety Section */}
      <Card className="animate-slide-in-left">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-green-600 mb-6">Safety & Industry Applications</h3>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/C1b2TpwwUKA?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Acoustic Monitoring" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/-rTtiAr1ct0?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Alarm Systems" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transportation Section */}
      <Card className="animate-slide-in-right">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-orange-600 mb-6">Automotive & Transportation</h3>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/yFh6Fh7FVow?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Vehicle Acoustics" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/qT3UHI7eT9w?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Aerospace" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Architecture & Design Section */}
      <Card className="animate-fade-in">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-6">Architecture & Design</h3>
          
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
            {/* REMOVE: YouTube video and label */}
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/9Ur1GAkmoF0?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                title="Performance Spaces" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing & Education Section */}
      <Card className="animate-slide-in-left">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-pink-600 mb-6">Marketing & Education</h3>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/QnXed5fI8Gk?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Sonic Branding" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/IpMBIlpBgAM?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="Retail Environments" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg">
              {/* REMOVE: YouTube video and label */}
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/zZJ8-n0Om4I?rel=0&modestbranding=1&autoplay=0&fs=1&cc_load_policy=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1&playsinline=1&origin=${window.location.origin}" 
                  title="E-learning & Instructional Design" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emerging Applications Section */}
      <Card className="animate-scale-in">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-6">Emerging & Future Applications</h3>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">VR</div>
                <div>
                  <h4 className="font-semibold">AR/VR Audio</h4>
                  <p className="text-sm text-gray-600">3D spatial sound for immersive environments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">AI</div>
                <div>
                  <h4 className="font-semibold">AI Audio</h4>
                  <p className="text-sm text-gray-600">Speech synthesis, voice cloning, generative music</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">🎤</div>
                <div>
                  <h4 className="font-semibold">Voice Interfaces</h4>
                  <p className="text-sm text-gray-600">Human-AI interaction via spoken language</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">🌐</div>
                <div>
                  <h4 className="font-semibold">Metaverse Sound Design</h4>
                  <p className="text-sm text-gray-600">Crafting audio layers for virtual worlds</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            category: 'Entertainment & Media',
            icon: Film,
            color: 'from-pink-400 to-red-500',
            applications: [
              { name: '🎵 Music Industry', desc: 'Recording, production, live sound, distribution' },
              { name: '🎬 Film & Television', desc: 'Sound design, Foley art, ADR' },
              { name: '🎮 Video Games', desc: 'Interactive audio, spatial sound' },
              { name: '🎤 Podcasting', desc: 'Voice recording, audio branding' }
            ]
          },
          {
            category: 'Health & Medicine',
            icon: Heart,
            color: 'from-green-400 to-emerald-500',
            applications: [
              { name: '🏥 Medical Imaging', desc: 'Ultrasound technology' },
              { name: '🦻 Audiology', desc: 'Hearing tests, hearing aids' },
              { name: '💊 Therapeutic Uses', desc: 'Sound therapy, neuroscience' }
            ]
          },
          {
            category: 'Communication Technology',
            icon: Radio,
            color: 'from-blue-400 to-cyan-500',
            applications: [
              { name: '📱 Telecommunications', desc: 'Voice compression, noise cancellation' },
              { name: '🎧 Consumer Audio', desc: 'Headphones, speakers, voice assistants' }
            ]
          },
          {
            category: 'Automotive & Transport',
            icon: Car,
            color: 'from-orange-400 to-yellow-500',
            applications: [
              { name: '🚗 Vehicle Acoustics', desc: 'Cabin sound design, electric vehicle alerts' },
              { name: '✈️ Aerospace', desc: 'Noise control, acoustic testing' }
            ]
          },
          {
            category: 'Architecture & Design',
            icon: Building,
            color: 'from-purple-400 to-indigo-500',
            applications: [
              { name: '🏙️ Acoustic Engineering', desc: 'Building acoustics, urban design' },
              { name: '🎭 Performance Spaces', desc: 'Concert halls, theaters' }
            ]
          },
          {
            category: 'Marketing & Retail',
            icon: Volume2,
            color: 'from-teal-400 to-green-500',
            applications: [
              { name: '📣 Sonic Branding', desc: 'Sound logos, jingles' },
              { name: '🛒 Retail Environments', desc: 'Background music influence' }
            ]
          }
        ].map((industry, index) => (
          <Card key={industry.category} className={`animate-scale-in hover:scale-105 transition-transform`} style={{animationDelay: `${index * 150}ms`}}>
            <CardContent className="p-6">
              <div className={`bg-gradient-to-br ${industry.color} text-white p-4 rounded-lg mb-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <industry.icon className="h-8 w-8" />
                  <h3 className="font-bold text-lg">{industry.category}</h3>
                </div>
              </div>
              
              <div className="space-y-3">
                {industry.applications.map((app, appIndex) => (
                  <div key={appIndex} className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-1">{app.name}</h4>
                    <p className="text-sm text-gray-600">{app.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold mb-4">Summary</h3>
          <div className="space-y-3 text-lg max-w-3xl mx-auto">
            <p>Sound is a multidisciplinary tool that powers innovation in countless industries.</p>
            <p>From health and safety to gaming and entertainment, its applications are expanding with technology.</p>
            <p>Professionals with audio skills are in high demand across both creative and technical fields.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DefaultSoundContent = ({ lesson }: { lesson: VideoLesson }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎧</div>
          <h2 className="text-3xl font-bold mb-4">{lesson.title}</h2>
          <Badge className="bg-white/20 text-white">{lesson.duration}</Badge>
        </CardContent>
      </Card>
      
      {lesson.content.textContent && (
        <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <div 
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-primary"
              dangerouslySetInnerHTML={{ __html: lesson.content.textContent }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SoundEngineeringContent;
