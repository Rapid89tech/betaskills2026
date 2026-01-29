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
  type: 'video';
  sections: VideoSection[];
}

// Helper: Convert YouTube URL to embed
const getEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const lessonConfig: LessonConfig = {
  id: 2,
  title: 'Audio Careers',
  duration: '40 minutes',
  type: 'video',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction to Audio Careers',
      videoUrl: 'https://youtu.be/zz5NHkUVBQA',
      keyFeatures: 'Diverse Opportunities in Audio',
      description: `The audio industry offers varied careers in music, film, broadcasting, gaming, and more, driven by technological advances like immersive audio and remote production.

The audio industry is a vibrant field with opportunities for creative and technical professionals. From producing chart-topping tracks to designing sound for virtual reality, careers are diverse and evolving. The course's online format allows learners to explore these paths through video case studies and interactive forums, connecting with global professionals. This accessibility ensures students can network and build skills from anywhere, preparing them for a competitive yet rewarding industry with growing demand for skilled audio engineers.`
    },
    {
      id: 'major-fields',
      title: 'Major Fields in Audio Careers',
      videoUrl: 'https://youtu.be/1zWMFFkQihA',
      keyFeatures: 'Industry-Specific Roles',
      description: `Fields include music production, film/TV sound, live sound, broadcasting, game audio, podcasting, audiobooks, and audio tech development, each requiring unique skills.

Each field demands specialized knowledge, from mixing music tracks to creating immersive game audio. For instance, film sound engineers focus on dialogue clarity, while game audio professionals integrate dynamic soundscapes. The course provides targeted modules and project-based assignments to explore these fields, with online tools enabling hands-on practice. Discussion forums connect learners with peers pursuing similar paths, fostering collaboration and insight into industry-specific challenges and opportunities.`
    },
    {
      id: 'job-titles',
      title: 'Common Job Titles & Roles',
      videoUrl: '',
      keyFeatures: 'Specific Roles and Responsibilities',
      description: `Roles include audio engineer, sound designer, mixing/mastering engineer, Foley artist, live sound technician, music producer, podcast editor, voiceover artist, and audio software developer.

Each role has distinct responsibilities, such as a Foley artist recreating sounds for films or a mastering engineer finalizing tracks for release. The course offers video tutorials and portfolio projects to simulate these roles, allowing learners to build relevant skills. Online accessibility ensures students can revisit content and receive feedback from instructors, helping them refine their expertise and create a professional demo reel tailored to their chosen career path.`
    },
    {
      id: 'skills-tools',
      title: 'Required Skills and Tools',
      videoUrl: 'https://youtu.be/cv9U-CIqHsc',
      keyFeatures: 'Technical, Creative, and Soft Skills',
      description: `Proficiency in DAWs, microphones, signal flow, sound aesthetics, music theory, critical listening, communication, time management, and problem-solving are essential.

Success in audio careers requires a blend of technical expertise, creative vision, and interpersonal skills. For example, mastering Pro Tools is as crucial as collaborating with artists to achieve a desired sound. The course provides interactive DAW tutorials and peer review exercises to develop these skills, with online forums facilitating collaboration. This comprehensive approach ensures learners are well-equipped to handle the multifaceted demands of audio production in professional settings.`
    },
    {
      id: 'education-paths',
      title: 'Education and Training Paths',
      videoUrl: '',
      keyFeatures: 'Formal, Informal, and Self-Learning Options',
      description: `Paths include degrees in audio engineering, certifications (e.g., Pro Tools), internships, and self-learning via online tutorials, YouTube, and forums.

Formal education provides structured learning, while certifications and internships offer practical experience. Self-learning through online resources is increasingly viable, especially with the course's digital platform. Learners can access video lectures, practice files, and community discussions to build skills at their own pace, ensuring flexibility for diverse schedules. This approach empowers students to tailor their education to their career goals, whether in a studio or as a freelancer.`
    },
    {
      id: 'industry-trends',
      title: 'Industry Trends',
      videoUrl: '',
      keyFeatures: 'Remote Production, Immersive Audio, AI',
      description: `Trends include growth in remote production, immersive sound (Dolby Atmos), podcasting, and AI tools for vocal isolation and mastering.

The audio industry is rapidly evolving, with remote workflows and spatial audio gaining prominence. AI tools are transforming tasks like mastering, while podcasting continues to grow. The course's online format includes modules on these trends, with virtual labs to experiment with immersive audio and AI plugins. Discussion forums allow learners to share insights on emerging technologies, ensuring they stay ahead of industry shifts and are prepared for future opportunities.`
    },
    {
      id: 'career-growth',
      title: 'Career Growth & Income Potential',
      videoUrl: '',
      keyFeatures: 'Progression and Earnings',
      description: `Career levels range from entry-level ($20,000–$40,000 USD) to mid-level ($40,000–$70,000 USD) to senior-level ($70,000–$120,000+ USD), with freelancers varying by project.

Career progression in audio depends on experience, specialization, and networking. Entry-level roles like assistants build skills, while senior roles like producers command higher salaries. The course supports career growth through portfolio development and online networking opportunities, allowing learners to connect with industry professionals. This prepares students to navigate the competitive landscape and achieve financial and creative success in their chosen audio career.`
    },
    {
      id: 'building-career',
      title: 'Building a Career in Audio',
      videoUrl: '',
      keyFeatures: 'Portfolio, Networking, Branding',
      description: `Success requires a strong portfolio, networking at events, freelance platforms (Fiverr, Upwork), and an online presence showcasing work.

A compelling portfolio demonstrates skills to potential employers or clients. Networking at expos or online platforms like LinkedIn expands opportunities. The course guides learners in creating demo reels through project-based assignments, with feedback from instructors and peers via online forums. This hands-on approach ensures students build a professional presence and gain practical experience, positioning them for success in a competitive industry.`
    },
    {
      id: 'challenges-rewards',
      title: 'Challenges & Rewards',
      videoUrl: '',
      keyFeatures: 'Competitive Field, Creative Fulfillment',
      description: `Challenges include competition, irregular income, and long hours, while rewards include creative fulfillment, diverse paths, and remote work opportunities.

The audio industry is competitive, with freelancers facing income variability, but the creative satisfaction of crafting unique soundscapes is unparalleled. The course's online format supports learners in overcoming challenges through community support and practical training. Virtual group projects and forums foster collaboration, helping students build resilience and capitalize on the diverse, rewarding opportunities available in audio careers worldwide.`
    },
    {
      id: 'summary',
      title: 'Summary',
      videoUrl: '',
      keyFeatures: 'Evolving Industry, Skill Integration',
      description: `Audio careers blend technical, creative, and networking skills, with growing demand in music, film, gaming, and emerging tech like AI and immersive audio.

The audio industry offers dynamic opportunities for those who combine technical proficiency with creativity. The course's comprehensive resources, including video lectures and online communities, prepare learners to thrive in this evolving field. By mastering industry tools and trends, students can pursue fulfilling careers, leveraging the flexibility of online learning to build skills and connections globally.`
    }
  ]
};

const generateLesson = (config: LessonConfig): Lesson => {
  let textContent = `# 🎵 Module 1: Introduction to Sound Engineering

## 🎙️ Audio Careers

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
  <p style="font-size:1.1rem;color:#4a5568;">You've explored the exciting world of audio careers! Continue your journey to become a professional audio engineer.</p>
</div>
`;

  return {
    id: config.id,
    title: config.title,
    duration: config.duration,
    type: config.type,
    content: {
      videoUrl: config.sections[0]?.videoUrl || '',
      textContent
    }
  };
};

export const lesson2AudioCareers: Lesson = generateLesson(lessonConfig);
export { generateLesson, type LessonConfig, type VideoSection };
export default lesson2AudioCareers; 
