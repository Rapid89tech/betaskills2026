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
      videoUrl: 'https://www.youtube.com/watch?v=m3aojGTTDT8&pp=ygUjWW91VHViZTogU291bmQgYXMgYSBNZWNoYW5pY2FsIFdhdmU%3D',
      keyFeatures: 'Mechanical Wave Fundamentals',
      description: `Sound is a mechanical wave resulting from particle vibrations in a medium like air, water, or solids, perceived by the human ear and interpreted by the brain as auditory information. This foundational concept is critical for sound engineers, as it underpins all audio production processes, from recording to playback. Understanding sound as a wave enables engineers to manipulate its properties effectively, ensuring clarity and quality in various applications.

Sound's nature as a mechanical wave distinguishes it from electromagnetic waves, like light, requiring a medium for propagation. This property affects how sound behaves in different environments, such as studios or open spaces. For aspiring sound engineers, grasping this concept is essential for tasks like microphone placement and acoustic treatment, as it informs how sound interacts with physical spaces. The course emphasizes practical applications, enabling learners to analyze and control sound wave behavior using digital tools, ensuring they can produce high-quality audio in diverse settings.`
    },
    {
      id: 'production',
      title: 'How Sound is Produced',
      videoUrl: 'https://www.youtube.com/watch?v=XLfQpv2ZRPU&pp=ygUhWW91VHViZTogSG93IERvIFNvdW5kIFdhdmVzIFdvcms_',
      keyFeatures: 'Vibration and Wave Propagation',
      description: `Sound is created when an object vibrates, disturbing surrounding particles to form areas of compression and rarefaction, which travel as longitudinal waves. This process is the basis for all audio, from musical instruments to vocal cords. Engineers must understand this to capture sound accurately during recording sessions.

The vibration of objects, such as a guitar string or a speaker cone, initiates a chain reaction of particle movement, creating pressure waves that travel through a medium. This knowledge is vital for selecting appropriate microphones and recording techniques to capture specific sound sources. The online course provides interactive simulations to visualize wave propagation, helping learners connect theoretical concepts to practical applications like setting up a recording session or troubleshooting audio issues in real-time, ensuring a robust foundation for further study.`
    },
    {
      id: 'properties',
      title: 'Properties of Sound Waves',
      videoUrl: 'https://www.youtube.com/watch?v=mevjV5pcITc&pp=ygUjWW91VHViZTogUHJvcGVydGllcyBvZiBhIFNvdW5kIFdhdmU%3D',
      keyFeatures: 'Frequency, Amplitude, Wavelength, Speed, Phase',
      description: `Sound waves are characterized by frequency (pitch), amplitude (loudness), wavelength (distance between wave peaks), speed (medium-dependent travel rate), and phase (waveform position). These properties shape how sound is recorded and manipulated in a DAW.

Each property plays a distinct role in audio engineering. Frequency determines the pitch, critical for tuning instruments or designing sound effects. Amplitude affects perceived loudness, essential for balancing mixes. Wavelength and speed influence how sound travels in different environments, impacting room acoustics. Phase is crucial for avoiding issues like cancellation in multi-microphone setups. The course's digital resources, including interactive diagrams, allow learners to experiment with these properties virtually, reinforcing their ability to manipulate sound effectively in professional settings.`
    },
    {
      id: 'types',
      title: 'Types of Sound Waves',
      videoUrl: 'https://youtu.be/f9wzSCSDd1U',
      keyFeatures: 'Audible, Infrasound, Ultrasound',
      description: `Sound waves include audible sound (20 Hz–20,000 Hz, heard by humans), infrasound (below 20 Hz, e.g., earthquakes), and ultrasound (above 20,000 Hz, e.g., medical imaging). Understanding these types broadens the scope of audio applications beyond music and media.

This classification helps engineers specialize in diverse fields, from music production to medical acoustics. For instance, infrasound knowledge is useful in environmental monitoring, while ultrasound applications are critical in medical technology. The course provides case studies and video tutorials to explore these applications, enabling learners to appreciate the versatility of sound engineering. Online accessibility ensures students can revisit these concepts anytime, fostering a deeper understanding of how different sound types are used across industries.`
    },
    {
      id: 'mediums',
      title: 'Mediums for Sound Transmission',
      videoUrl: 'https://youtu.be/7iUbaOq5LA8',
      keyFeatures: 'Solids, Liquids, Gases, Vacuum',
      description: `Sound travels fastest in solids (due to tightly packed particles), slower in liquids, and slowest in gases like air. It cannot travel in a vacuum, a key consideration for audio in space-related applications.

Understanding how sound behaves in various mediums is crucial for designing recording spaces or working in specialized fields like underwater acoustics. For example, sound's faster transmission in solids informs the design of studio walls to minimize unwanted vibrations. The course includes virtual experiments to demonstrate these differences, allowing learners to analyze sound behavior in diverse contexts. This knowledge equips students to adapt their techniques to different environments, enhancing their versatility as sound engineers.`
    },
    {
      id: 'sound-vs-noise',
      title: 'Sound vs. Noise',
      videoUrl: 'https://youtu.be/6gGVLYH5_Bk',
      keyFeatures: 'Organized vs. Random Vibrations',
      description: `Sound consists of organized vibrations, often pleasant or neutral, while noise involves disorganized, random vibrations, typically unwanted. This distinction is critical for noise reduction in audio production.

Differentiating sound from noise is essential for creating clean recordings and designing effective soundscapes. For instance, engineers must filter out background noise to enhance vocal clarity in podcasts. The course offers practical exercises, such as using DAW plugins to isolate desired sounds, helping learners develop critical listening skills. Online forums facilitate discussions on noise reduction techniques, enabling students to share strategies and refine their approach to producing high-quality audio.`
    },
    {
      id: 'human-perception',
      title: 'Human Perception of Sound',
      videoUrl: 'https://youtu.be/xc34n-l4vd4',
      keyFeatures: 'Pitch, Loudness, Timbre',
      description: `Human perception of sound involves pitch (frequency), loudness (amplitude), and timbre (sound quality). These factors influence how audio is crafted to evoke specific emotions or clarity.

Pitch, loudness, and timbre shape the listener's experience, whether in music, film, or gaming. For example, timbre allows a piano and a guitar to sound distinct despite playing the same note. The course provides audio samples and DAW exercises to explore these concepts, helping learners manipulate them creatively. Online accessibility ensures students can experiment with these elements at their own pace, building skills to craft emotionally resonant audio for various media.`
    },
    {
      id: 'measurement',
      title: 'Measurement of Sound',
      videoUrl: 'https://youtu.be/A3JQ0iDu98g',
      keyFeatures: 'Decibels and Sound Level Meters',
      description: `Sound intensity is measured in decibels (dB) using tools like sound level meters, essential for ensuring safe and effective audio levels in production and live settings.

Decibel measurement is critical for maintaining audio quality and protecting hearing in loud environments like concerts. Sound level meters help engineers monitor levels accurately, ensuring compliance with industry standards. The course includes virtual labs where learners use simulated meters to measure and adjust sound levels, reinforcing practical skills. Online quizzes test understanding of dB scales, preparing students for real-world applications in studio and live sound scenarios.`
    },
    {
      id: 'applications',
      title: 'Applications of Sound',
      videoUrl: 'https://youtu.be/9Km7a_AAoJ4',
      keyFeatures: 'Diverse Industry Uses',
      description: `Sound is used in communication (speech, telecom), entertainment (music, cinema), navigation (sonar), medicine (ultrasound), and engineering (noise control), showcasing its versatility.

From podcast production to medical imaging, sound's applications are vast. Engineers must understand these contexts to tailor their skills to specific industries. The course provides case studies and video lectures exploring these applications, helping learners identify career paths. Online discussion forums encourage students to share insights on applying sound in innovative ways, fostering a global perspective on its role across disciplines.`
    },
    {
      id: 'summary',
      title: 'Summary',
      videoUrl: '',
      keyFeatures: 'Core Concepts and Applications',
      description: `Sound is a mechanical wave created by vibrations, transmitted through mediums, and perceived based on frequency, amplitude, and timbre. Its applications span communication, entertainment, and science, making it a vital field for study.

This summary ties together the fundamental principles of sound, emphasizing their relevance to audio engineering. The course's online platform allows learners to revisit these concepts through video lectures and interactive tools, ensuring a solid foundation. By mastering these basics, students are prepared to tackle advanced topics like mixing and mastering, with the flexibility to study at their own pace and apply their knowledge to real-world projects.`
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
