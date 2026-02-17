import type { Course } from '@/types/course';
import { module1 } from './module1';

export const soundEngineeringCourse: Course = {
  id: 'sound-engineering',
  title: 'Sound Engineering',
  description: 'Sonic Mastery: Comprehensive Sound Engineering Online is a dynamic, fully online course designed to equip learners with the skills to excel in professional audio production and sound design. Covering the fundamentals of sound theory, recording techniques, mixing, mastering, and post-production, this course blends technical expertise with creative application, preparing students for careers in music production, film audio, podcasting, and live sound engineering.',
  thumbnail: '/images/courses/sound-engineering.jpg',
  category: 'Technical Skills',
  level: 'beginner',
  duration: '40 hours',
  rating: 4.8,
  is_free: false,
  price: 290,
  currency: 'ZAR',
  students: 892,
  status: 'approved',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  available: true,
  isComingSoon: false,
  overview: 'Sonic Mastery: Comprehensive Sound Engineering Online is a dynamic, fully online course designed to equip learners with the skills to excel in professional audio production and sound design.',
  modules: [module1],
  learningObjectives: [
    'Understand the principles of acoustics, sound wave propagation, and audio signal flow in digital and analog environments',
    'Master industry-standard digital audio workstations (DAWs) such as Pro Tools, Logic Pro, and Ableton Live for recording, editing, and mixing',
    'Apply advanced mixing techniques, including equalization, compression, and reverb, to achieve professional-quality audio',
    'Design and implement soundscapes for film, games, and multimedia using Foley, sound effects, and spatial audio techniques',
    'Execute mastering processes to prepare audio tracks for commercial release, ensuring compatibility across platforms like streaming services',
    'Analyze and troubleshoot common audio issues, such as phase cancellation and distortion, using online diagnostic tools',
    'Collaborate effectively in virtual production environments, integrating feedback from peers and instructors to refine projects',
    'Create a professional portfolio showcasing a variety of audio projects, including a mixed music track, a podcast episode, and a film audio segment'
  ],
  instructor: {
    id: 'betaskills-audio',
    first_name: 'BetaSkills',
    last_name: 'Audio Team',
    email: 'betaskilltraining@gmail.com'
  }
};
