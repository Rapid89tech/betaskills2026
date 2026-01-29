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
  id: 4,
  title: 'Industry Applications of Sound and Audio',
  duration: '55 minutes',
  type: 'video',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      videoUrl: 'https://youtu.be/CsG8tZB7I70',
      keyFeatures: 'Multidisciplinary Applications',
      description: `Sound is integral to entertainment, communication, medicine, science, and industry, offering diverse career opportunities for audio professionals.

Sound's versatility spans from creating immersive film audio to medical diagnostics. Understanding these applications helps learners identify career paths. The course's online resources, including case studies and video lectures, explore these fields, with forums for discussing innovative uses. This accessibility ensures students can explore sound's impact across disciplines, preparing them for specialized roles in a global industry.`
    },
    {
      id: 'entertainment-media',
      title: 'Entertainment & Media',
      videoUrl: '',
      keyFeatures: 'Music, Film, Gaming, Broadcasting',
      description: `The entertainment industry encompasses music production, film and television sound, video game audio, and broadcasting. Each sector requires specialized audio engineering skills and techniques.

From recording chart-topping hits to creating immersive game soundscapes, entertainment audio drives emotional engagement and storytelling. The course provides hands-on projects in each area, allowing learners to develop specialized skills while understanding the unique demands of each medium. Online collaboration tools enable students to work on cross-disciplinary projects, preparing them for the diverse opportunities in entertainment audio.`
    },
    {
      id: 'health-medicine',
      title: 'Health & Medicine',
      videoUrl: 'https://youtu.be/KwsvDQhOpeU',
      keyFeatures: 'Ultrasound, Audiology, Therapy',
      description: `Sound's medical applications, like ultrasound, are non-invasive and critical for diagnostics. Audiology and therapy leverage sound for health benefits.

Medical acoustics combines engineering precision with healthcare applications. Ultrasound imaging provides safe, real-time internal views, while audiology helps diagnose and treat hearing disorders. The course explores these applications through video case studies, with online discussions to connect concepts to audio engineering. This broadens learners' perspectives, preparing them for specialized roles in medical acoustics.`
    },
    {
      id: 'science-research',
      title: 'Science & Research',
      videoUrl: 'https://youtu.be/D7mU7YohbK0',
      keyFeatures: 'Infrasound, Marine Acoustics, Sonification',
      description: `Sound aids scientific discovery, from detecting infrasound in natural phenomena to sonifying astronomical data.

Sound's role in scientific research spans environmental monitoring, marine biology, and data analysis. Infrasound detection helps predict natural disasters, while marine acoustics studies ocean life communication. The course provides virtual experiments to explore these applications, with online forums for discussing research implications. This ensures learners can apply audio skills to scientific fields, expanding their career versatility.`
    },
    {
      id: 'communication-tech',
      title: 'Communication Technology',
      videoUrl: 'https://youtu.be/ShPUG5mztSY',
      keyFeatures: 'Voice Compression, Noise Cancellation',
      description: `Sound engineering enhances telecommunications by optimizing voice clarity and reducing noise.

Modern communication relies on sophisticated audio processing. Voice compression enables efficient data transmission, while noise cancellation ensures clear communication in challenging environments. The course includes exercises to simulate these technologies, with online feedback to refine skills. This prepares learners for roles in audio tech development, leveraging online resources to stay updated on communication advancements.`
    },
    {
      id: 'safety-industry',
      title: 'Safety & Industry',
      videoUrl: '',
      keyFeatures: 'Acoustic Monitoring, Alarms',
      description: `Sound ensures safety by detecting structural flaws or triggering alerts.

Industrial applications of sound include structural health monitoring, safety systems, and quality control. Acoustic sensors detect equipment failures before they become dangerous, while alarm systems provide critical safety notifications. The course provides case studies and simulations to explore these applications, with online forums for discussing practical uses. This equips learners to apply audio skills in industrial contexts, enhancing safety and efficiency.`
    },
    {
      id: 'automotive-transport',
      title: 'Automotive & Transportation',
      videoUrl: 'https://youtu.be/26kYW2SAu9s',
      keyFeatures: 'Cabin Sound, Synthetic Sounds',
      description: `Sound design in vehicles enhances user experience and safety.

Automotive audio encompasses cabin acoustics, entertainment systems, and safety alerts. Electric vehicles require synthetic sounds for pedestrian safety, while cabin design affects passenger comfort. The course offers projects to create synthetic sounds, with online feedback to refine techniques. This prepares learners for innovative roles in automotive audio, leveraging the flexibility of online learning to explore this growing field.`
    },
    {
      id: 'architecture-urban',
      title: 'Architecture & Urban Design',
      videoUrl: '',
      keyFeatures: 'Acoustic Engineering, Performance Spaces',
      description: `Acoustic engineering shapes how sound behaves in spaces, from theaters to offices.

Architectural acoustics combines physics with design to create optimal listening environments. Concert halls require precise acoustic design, while office spaces need noise control for productivity. The course includes virtual design exercises, with online forums for sharing acoustic solutions. This ensures learners can apply sound principles to create optimal environments, preparing them for roles in architectural acoustics.`
    },
    {
      id: 'marketing-branding',
      title: 'Marketing & Branding',
      videoUrl: 'https://youtu.be/fT4BCpvVKoA',
      keyFeatures: 'Sonic Branding, Retail Soundscapes',
      description: `Sonic branding creates memorable audio identities, like Intel's chime.

Audio branding uses sound to create emotional connections with brands. Sonic logos, jingles, and retail soundscapes influence consumer behavior and brand perception. The course provides projects to design brand sounds, with online peer reviews to refine creations. This prepares learners to craft audio that enhances marketing, leveraging online tools to stay competitive in this creative field.`
    },
    {
      id: 'education-training',
      title: 'Education & Training',
      videoUrl: '',
      keyFeatures: 'E-Learning, Language Learning',
      description: `Sound enhances educational content through clear narration and interactive feedback.

Educational audio includes e-learning modules, language instruction, and accessibility features. Clear audio improves comprehension, while interactive elements engage learners. The course offers projects to create educational audio, with online feedback to improve quality. This prepares learners for roles in instructional design, leveraging the flexibility of online learning to develop versatile audio skills.`
    },
    {
      id: 'emerging-future',
      title: 'Emerging & Future Applications',
      videoUrl: 'https://youtu.be/V-FFkXKd42o',
      keyFeatures: 'AR/VR, AI Audio, Metaverse',
      description: `Emerging technologies like VR and AI are transforming audio production.

The future of audio includes spatial computing, AI-generated sound, and immersive virtual environments. Spatial audio creates 3D soundscapes, while AI tools automate complex audio tasks. The course provides virtual labs to explore spatial audio and AI tools, with online forums for discussing future trends. This ensures learners are prepared for cutting-edge roles in immersive audio and virtual environments.`
    },
    {
      id: 'summary',
      title: 'Summary',
      videoUrl: '',
      keyFeatures: 'Multidisciplinary Impact',
      description: `Sound drives innovation across entertainment, medicine, science, and technology, with growing demand for skilled audio professionals.

This summary highlights sound's broad applications, from gaming to medical imaging. The course's online platform offers resources to explore these fields, with community forums to connect learners globally. This comprehensive approach ensures students can leverage sound's versatility to pursue diverse, impactful careers.`
    }
  ]
};

const generateLesson = (config: LessonConfig): Lesson => {
  let textContent = `# 🎵 Module 1: Introduction to Sound Engineering

## 🎵 Industry Applications of Sound and Audio

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
  <p style="font-size:1.1rem;color:#4a5568;">You've explored the diverse applications of sound! Continue your journey to become a professional audio engineer.</p>
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

export const lesson4IndustryApplications: Lesson = generateLesson(lessonConfig);
export { generateLesson, type LessonConfig, type VideoSection };
export default lesson4IndustryApplications; 
