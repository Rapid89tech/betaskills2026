import { Course } from '@/types/course';
import { module1IntroductionToSoundEngineering102 } from './soundEngineering102/module1/index';
import { module2AudioTechnologyAndSignalFlow } from './soundEngineering102/module2/index';
import { module3MicrophonesAndApplications } from './soundEngineering102/module3/index';
import { module4DigitalAudioWorkstations } from './soundEngineering102/module4/index';
import { module5MixingPrinciples } from './soundEngineering102/module5/index';

export const soundEngineering102Course: Course = {
  id: 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5',
  title: 'Sound Engineering',
  description: `Sonic Mastery: Comprehensive Sound Engineering Online is a dynamic, fully online course designed to equip learners with the skills to excel in professional audio production and sound design. Covering the fundamentals of sound theory, recording techniques, mixing, mastering, and post-production, this course blends technical expertise with creative application, preparing students for careers in music production, film audio, podcasting, and live sound engineering. Through engaging digital content and hands-on projects, learners will explore industry-standard tools and workflows, all accessible from anywhere in the world, making it ideal for aspiring audio professionals seeking flexible, high-quality training. The course emphasizes real-world applications, ensuring students can produce professional-grade audio and adapt to evolving industry trends.

Whether you're a beginner looking to break into the audio industry or a seasoned professional aiming to refine your skills, this course offers a structured yet flexible learning path. With a focus on practical experience, students will work on real-world projects, such as recording a podcast or mixing a music track, while leveraging cutting-edge online tools to collaborate and create, ensuring relevance in today's digital audio landscape.`,
  instructor: {
    name: 'David Martinez',
    title: 'Senior Audio Engineer & Producer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Award-winning sound engineer with 15+ years in the music industry, having worked with major record labels and live venues.'
  },
  level: 'intermediate',
  duration: '12 weeks',
  students: 892,
  rating: 4.9,
  price: 2500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
  category: 'Audio Technology',
  learningObjectives: [
    'Understand the principles of acoustics, sound wave propagation, and audio signal flow in digital and analog environments.',
    'Master industry-standard digital audio workstations (DAWs) such as Pro Tools, Logic Pro, and Ableton Live for recording, editing, and mixing.',
    'Apply advanced mixing techniques, including equalization, compression, and reverb, to achieve professional-quality audio.',
    'Design and implement soundscapes for film, games, and multimedia using Foley, sound effects, and spatial audio techniques.',
    'Execute mastering processes to prepare audio tracks for commercial release, ensuring compatibility across platforms like streaming services.',
    'Analyze and troubleshoot common audio issues, such as phase cancellation and distortion, using online diagnostic tools.',
    'Collaborate effectively in virtual production environments, integrating feedback from peers and instructors to refine projects.',
    'Create a professional portfolio showcasing a variety of audio projects, including a mixed music track, a podcast episode, and a film audio segment.'
  ],
  modules: [
    module1IntroductionToSoundEngineering102,
    module2AudioTechnologyAndSignalFlow,
    module3MicrophonesAndApplications,
    module4DigitalAudioWorkstations,
    module5MixingPrinciples
  ]
}; 