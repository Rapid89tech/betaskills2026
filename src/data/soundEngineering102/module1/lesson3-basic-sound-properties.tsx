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
  id: 3,
  title: 'Basic Sound Properties',
  duration: '50 minutes',
  type: 'video',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction to Sound Properties',
      videoUrl: '',
      keyFeatures: 'Wave Characteristics and Perception',
      description: `Sound is a mechanical wave with properties like frequency, amplitude, and timbre that determine how it's perceived, essential for audio professionals.

Understanding sound properties is foundational for manipulating audio in production. These characteristics affect everything from recording quality to listener experience. The course provides interactive simulations and video tutorials to explore these properties, allowing learners to visualize and manipulate them in DAWs. Online accessibility ensures students can revisit these concepts, building a strong foundation for advanced audio techniques and applications across industries.`
    },
    {
      id: 'frequency',
      title: 'Frequency',
      videoUrl: 'https://youtu.be/g0CSDL5o-jk',
      keyFeatures: 'Pitch Determination',
      description: `Frequency, measured in Hertz (Hz), is the number of wave cycles per second, determining pitch (low for bass, high for treble). Human hearing ranges from 20 Hz to 20,000 Hz.

Frequency is critical for tuning instruments or designing sound effects with specific pitches. Engineers must balance frequencies to create clear mixes. The course includes virtual exercises to adjust frequencies in DAWs, helping learners understand their impact on pitch. Online forums allow students to discuss frequency-related challenges, ensuring they can apply this knowledge effectively in music production, film sound, or other audio contexts.`
    },
    {
      id: 'amplitude',
      title: 'Amplitude',
      videoUrl: 'https://youtu.be/EJUK2hSfepg',
      keyFeatures: 'Loudness Control',
      description: `Amplitude, measured in decibels (dB), is the wave's height, determining loudness. Higher amplitude means louder sound, critical for mixing and mastering.

Amplitude affects how audio is perceived in terms of volume, impacting listener comfort and mix balance. Engineers use amplitude adjustments to highlight vocals or instruments. The course offers practical exercises in DAWs to manipulate amplitude, with online feedback from instructors to refine techniques. This hands-on approach ensures learners can control loudness effectively, preparing them for professional audio production tasks.`
    },
    {
      id: 'wavelength',
      title: 'Wavelength',
      videoUrl: 'https://youtu.be/9VSHa1mKcTw',
      keyFeatures: 'Wave Distance and Pitch',
      description: `Wavelength, measured in meters, is the distance between wave peaks, inversely related to frequency (longer wavelength = lower pitch).

Wavelength influences how sound interacts with physical spaces, affecting room acoustics and microphone placement. The course provides virtual labs to explore wavelength's impact, helping learners optimize recording setups. Online accessibility allows students to experiment with these concepts at their own pace, ensuring they understand how wavelength shapes audio quality in various production environments.`
    },
    {
      id: 'speed',
      title: 'Speed of Sound',
      videoUrl: 'https://youtu.be/kr4nOru3JZU',
      keyFeatures: 'Medium-Dependent Travel',
      description: `The speed of sound varies by medium (343 m/s in air, 1,480 m/s in water, 5,960 m/s in steel), affecting timing in audio applications.

Sound's speed influences delay and echo in recordings, critical for live sound and studio work. The course includes simulations to demonstrate speed differences across mediums, helping learners design effective acoustic environments. Online discussion forums enable students to share insights on managing timing issues, ensuring they can apply this knowledge to create precise, high-quality audio in diverse settings.`
    },
    {
      id: 'phase',
      title: 'Phase',
      videoUrl: 'https://youtu.be/NtLIIfJ6IwQ',
      keyFeatures: 'Wave Alignment and Interference',
      description: `Phase, measured in degrees, describes a wave's position in its cycle, critical for avoiding interference issues like sound cancellation in mixing.

Phase issues can degrade audio quality, especially in multi-microphone setups. Engineers must align phases to ensure clarity. The course offers DAW-based exercises to identify and correct phase problems, with online instructor feedback to guide learners. This practical training ensures students can manage phase effectively, producing clean and professional audio mixes.`
    },
    {
      id: 'timbre',
      title: 'Timbre',
      videoUrl: 'https://youtu.be/AjJLAcDb_MU',
      keyFeatures: 'Sound Quality and Character',
      description: `Timbre, or tone color, distinguishes sounds with the same pitch and loudness, shaped by harmonics and overtones (e.g., violin vs. flute).

Timbre defines the unique character of sounds, crucial for creating distinctive audio in music or film. The course provides audio samples and DAW exercises to manipulate timbre, helping learners craft unique soundscapes. Online forums foster discussions on timbre's creative applications, ensuring students can use it to enhance the emotional impact of their audio projects.`
    },
    {
      id: 'wave-types',
      title: 'Types of Sound Waves',
      videoUrl: 'https://youtu.be/0Anh9HthWgQ',
      keyFeatures: 'Longitudinal, Transverse, Complex, Pure Tone',
      description: `Sound waves include longitudinal (sound in air), transverse (in strings), complex (real-world sounds), and pure tones (single frequency).

Understanding wave types helps engineers select appropriate recording techniques. For example, longitudinal waves are key for air-based audio, while complex waves dominate real-world sounds. The course's interactive tutorials allow learners to analyze wave types in DAWs, with online feedback to refine their skills. This knowledge ensures students can handle diverse audio sources effectively in professional production.`
    },
    {
      id: 'reflection-absorption',
      title: 'Reflection, Absorption, Diffusion',
      videoUrl: 'https://youtu.be/jYuz6y-ZK_Y',
      keyFeatures: 'Sound Behavior in Environments',
      description: `Reflection creates echoes, absorption reduces sound energy, and diffusion scatters sound for balanced acoustics, critical for studio design.

These principles guide acoustic treatment in recording spaces. Reflection can enhance or disrupt sound, while absorption and diffusion optimize clarity. The course includes virtual room design exercises to apply these concepts, with online forums for sharing acoustic solutions. This practical approach ensures learners can create optimal recording environments, enhancing audio quality in their projects.`
    },
    {
      id: 'inverse-square',
      title: 'The Inverse Square Law',
      videoUrl: 'https://youtu.be/9AftLaKQ33w',
      keyFeatures: 'Sound Intensity Reduction',
      description: `Sound intensity decreases with distance (doubling distance reduces intensity by 6 dB), impacting microphone placement and live sound.

The inverse square law is crucial for positioning microphones and speakers to capture or project sound effectively. The course provides simulations to demonstrate this principle, with online assignments to practice optimal setups. Peer reviews and instructor feedback help learners refine their techniques, ensuring they can manage sound intensity in various production scenarios for maximum clarity and impact.`
    },
    {
      id: 'environments',
      title: 'Sound Environments',
      videoUrl: 'https://youtu.be/xI_gXxA7GaM',
      keyFeatures: 'Reverberation, Echo, Dry/Wet Sound',
      description: `Environments affect sound through reverberation (persistent reflections), echo (distinct reflections), dry sound (no reverb), and wet sound (with effects).

Understanding sound environments is key for creating immersive audio. Reverberation enhances music, while dry sound suits podcasts. The course offers DAW exercises to manipulate reverb and echo, with online forums for discussing environmental effects. This hands-on training ensures learners can craft appropriate soundscapes for different media, enhancing their production versatility.`
    },
    {
      id: 'summary',
      title: 'Summary of Basic Sound Properties',
      videoUrl: '',
      keyFeatures: 'Comprehensive Property Overview',
      description: `Frequency (pitch), amplitude (loudness), wavelength, speed, phase, and timbre collectively define sound's behavior and perception in audio production.

This summary reinforces the interconnectedness of sound properties, essential for mastering audio engineering. The course's online platform provides interactive tools to explore these properties, with video lectures and quizzes to solidify understanding. This comprehensive approach ensures learners can apply these concepts to produce high-quality audio across various professional contexts.`
    }
  ]
};

const generateLesson = (config: LessonConfig): Lesson => {
  let textContent = `# 🎵 Module 1: Introduction to Sound Engineering

## 🔊 Basic Sound Properties

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
  <p style="font-size:1.1rem;color:#4a5568;">You've mastered the basic properties of sound! Continue your journey to become a professional audio engineer.</p>
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

export const lesson3BasicSoundProperties: Lesson = generateLesson(lessonConfig);
export { generateLesson, type LessonConfig, type VideoSection };
export default lesson3BasicSoundProperties; 
