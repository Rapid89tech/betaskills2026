import { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';
import module9 from './module9';

export const podcastManagementCourse: Course = {
  id: 'podcast-management',
  title: 'Podcast Management Mastery',
  description: 'Unlock the secrets to creating, managing, and growing a successful podcast with this comprehensive online course, designed to guide you from concept to chart-topping production. Covering ideation, recording, editing, publishing, and marketing, this course equips you with the tools and strategies to build a professional podcast that captivates audiences.',
  instructor: {
    id: 'podcast-management-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '10 weeks',
  level: 'beginner',
  category: 'Film & Broadcasting',
  is_free: false,
  price: 290,
  currency: 'ZAR',
  students: 0,
  rating: 5.0,
  thumbnail: '/courses-hero-bg.png',
  learningObjectives: [
    'Develop a compelling podcast concept, including defining niche, audience, and format',
    'Master audio recording and editing software, such as Audacity and Adobe Audition, to produce high-quality episodes',
    'Implement effective microphone and recording techniques to achieve professional-grade audio',
    'Create and execute a content plan, including episode scripting, guest management, and scheduling',
    'Publish podcasts on major platforms (e.g., Spotify, Apple Podcasts) with optimized metadata and RSS feeds',
    'Apply marketing strategies, including social media promotion and audience engagement, to grow listenership',
    'Analyze podcast performance metrics using analytics tools to refine content and increase reach'
  ],
  status: 'approved',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  available: true,
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8,
    module9
  ]
};

export default podcastManagementCourse;
