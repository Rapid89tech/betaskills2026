import { Lesson } from '@/types/course';

interface VideoSection {
  id: string;
  title: string;
  videoUrl: string;
  keyFeatures: string;
  description: string;
}

interface LessonConfig {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'audio' | 'text' | 'interactive';
  sections: VideoSection[];
}

// Helper: Convert YouTube URL to embed
const getEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const lessonConfig: LessonConfig = {
  id: 1,
  title: 'What is Sound?',
  duration: '45 minutes',
  type: 'video',
  sections: [
    {
      id: 'definition',
      title: 'Definition of Sound',
   
      keyFeatures: 'Mechanical Wave Fundamentals',
      description: `Sound is a mechanical wave resulting from particle vibrations in a medium like air, water, or solids. This foundational concept powers everything in audio production—from recording to playback.

Understanding sound as a wave unlocks your ability to manipulate its properties effectively. Unlike electromagnetic waves, sound needs a medium to travel through, which dramatically affects how it behaves in different environments. Master this concept, and you'll nail microphone placement and acoustic treatment every time.`
    },
    {
      id: 'production',
      title: 'How Sound is Produced',
     
      keyFeatures: 'Vibration and Wave Propagation',
      description: `Sound springs to life when objects vibrate, creating compression and rarefaction zones that ripple through space as longitudinal waves. This is the heartbeat of all audio—from the strum of a guitar to the warmth of a voice.

When a guitar string vibrates or a speaker cone moves, it triggers a domino effect of particle movement. This knowledge is your secret weapon for selecting the perfect microphone and recording technique for any sound source.`
    },
    {
      id: 'properties',
      title: 'Properties of Sound Waves',
     
      keyFeatures: 'Frequency, Amplitude, Wavelength, Speed, Phase',
      description: `Sound waves dance with five key properties: frequency (pitch), amplitude (loudness), wavelength (wave spacing), speed (travel rate), and phase (waveform position). These are your tools for sculpting sound in any DAW.

Frequency controls pitch—essential for tuning and sound design. Amplitude drives perceived loudness—crucial for balanced mixes. Wavelength and speed shape room acoustics. Phase prevents cancellation in multi-mic setups. Master these, and you'll manipulate sound like a pro.`
    },
    {
      id: 'types',
      title: 'Types of Sound Waves',
    
      keyFeatures: 'Audible, Infrasound, Ultrasound',
      description: `Sound waves span three realms: audible (20 Hz–20 kHz for human ears), infrasound (below 20 Hz—think earthquakes), and ultrasound (above 20 kHz—medical imaging territory). This spectrum opens doors beyond music production.

Each type serves unique purposes. Infrasound monitors environmental changes. Ultrasound revolutionizes medical diagnostics. Understanding this spectrum positions you for diverse career paths in audio engineering.`
    },
    {
      id: 'mediums',
      title: 'Mediums for Sound Transmission',
      videoUrl: 'https://youtu.be/7iUbaOq5LA8',
      keyFeatures: 'Solids, Liquids, Gases, Vacuum',
      description: `Sound races through solids, flows through liquids, and drifts through gases—but hits a wall in vacuum. Speed hierarchy: solids > liquids > gases. No medium? No sound.

This knowledge shapes studio design and specialized applications. Sound's speed in solids informs acoustic isolation. Understanding medium behavior prepares you for everything from underwater recording to space-related audio challenges.`
    },
    {
      id: 'sound-vs-noise',
      title: 'Sound vs. Noise',
      keyFeatures: 'Organized vs. Random Vibrations',
      description: `Sound flows with organized vibrations—musical, purposeful. Noise crashes with random chaos—unwanted, disruptive. This distinction is your foundation for pristine audio production.

Separating signal from noise defines professional audio. Whether filtering background hum from podcasts or designing immersive soundscapes, this skill elevates your work from amateur to exceptional.`
    },
    {
      id: 'human-perception',
      title: 'Human Perception of Sound',
      keyFeatures: 'Pitch, Loudness, Timbre',
      description: `We perceive sound through three dimensions: pitch (frequency interpretation), loudness (amplitude perception), and timbre (unique sound character). These shape every emotional response to audio.

Timbre gives instruments their voice—why pianos and guitars sound distinct on the same note. Master these perceptual elements to craft audio that moves hearts and minds across any medium.`
    },
    {
      id: 'measurement',
      title: 'Measurement of Sound',
      keyFeatures: 'Decibels and Sound Level Meters',
      description: `Decibels (dB) quantify sound intensity, measured with precision tools like sound level meters. This ensures safe, effective audio levels in any environment.

From protecting hearing at concerts to maintaining broadcast standards, dB measurement is non-negotiable. Master the scales, understand the tools, and you'll deliver professional audio every time.`
    },
    {
      id: 'applications',
      title: 'Applications of Sound',
      keyFeatures: 'Diverse Industry Uses',
      description: `Sound powers our world: communication (speech, telecom), entertainment (music, gaming), navigation (sonar), medicine (ultrasound), and engineering (acoustic design). Your skills can shape any industry.

From crafting immersive game audio to developing medical imaging systems, sound engineering opens infinite doors. Choose your path and make waves in fields that matter.`
    },
    {
      id: 'summary',
      title: 'Summary',
      videoUrl: '',
      keyFeatures: 'Core Concepts and Applications',
      description: `Sound is energy in motion—mechanical waves born from vibration, traveling through mediums, perceived through frequency, amplitude, and timbre. Its applications touch every corner of human experience.
You've built the foundation. These principles power everything from bedroom productions to Hollywood blockbusters. With this knowledge, you're ready to shape the future of audio.`
    }
  ]
};

const generateLesson = (config: LessonConfig): Lesson => {
  let textContent = `# 🎵 Module 1: Introduction to Sound Engineering

## 🎧 What is Sound?

`;

  config.sections.forEach((section, idx) => {
    textContent += `---

## ${idx + 1}. <span style="color:#5a67d8;font-weight:700">${section.title}</span>

${section.videoUrl ? `
<div style="display:flex;justify-content:center;margin:2rem 0;">
  <iframe width="900" height="506" src="${getEmbedUrl(section.videoUrl)}" frameborder="0" allowfullscreen style="border-radius:18px;box-shadow:0 8px 32px rgba(90,103,216,0.18);"></iframe>
</div>
` : ''}

<div style="background:linear-gradient(90deg,#e0e7ff 0%,#f0e6ff 100%);padding:1rem 2rem;border-radius:12px;margin-bottom:1.5rem;border-left:5px solid #667eea;">
  <b>🔑 Key Features:</b> <span style="color:#5a67d8">${section.keyFeatures}</span>
</div>

<div style="font-size:1.1rem;line-height:1.8;color:#2d3748;">
  ${section.description}
</div>

`;
  });

  textContent += `
---

<div style="text-align:center;margin:3rem 0 1rem 0;">
  <span style="font-size:2rem;font-weight:700;color:#764ba2;">🚀 Ready for the Next Level?</span>
  <p style="font-size:1.1rem;color:#4a5568;">You've mastered the fundamentals of sound! Continue your journey to become a professional audio engineer.</p>
</div>
`;

  return {
    id: config.id,
    title: config.title,
    duration: config.duration,
    type: config.type,
    content: {
      videoUrl: config.sections[0]?.videoUrl || '',
      videoUrl2: 'https://www.youtube.com/watch?v=wh5wdmjPur8',
      textContent
    }
  };
};

export const lesson1WhatIsSound: Lesson = generateLesson(lessonConfig);
export { generateLesson, type LessonConfig, type VideoSection };
export default lesson1WhatIsSound;
