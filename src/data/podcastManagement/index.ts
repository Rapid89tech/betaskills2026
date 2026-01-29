import type { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';
import module9 from './module9';
import module10 from './module10';

const podcastManagementCourse: Course = {
  id: 'podcast-management-101',
  title: 'Podcast Management Mastery: Launching and Growing Your Audio Brand',
  description: 'Unlock the secrets to creating, managing, and growing a successful podcast with this comprehensive online course, designed to guide you from concept to chart-topping production. Covering ideation, recording, editing, publishing, and marketing, this course equips you with the tools and strategies to build a professional podcast that captivates audiences.',
  instructor: {
    name: 'Podcast Management Expert',
    title: 'Professional Podcaster & Audio Producer',
    avatar: '/images/instructors/podcast-expert.jpg',
    bio: 'Experienced podcast producer with expertise in audio production, content strategy, and audience growth.'
  },
  level: 'Beginner to Intermediate',
  duration: '12 weeks',
  students: 0,
  rating: 0,
  price: 0,
  currency: 'USD',
  is_free: true,
  thumbnail: '/images/courses/podcast-management.jpg',
  category: 'Digital Media',
  learningObjectives: [
    'Develop a compelling podcast concept, including defining niche, audience, and format.',
    'Master audio recording and editing software, such as Audacity and Adobe Audition, to produce high-quality episodes.',
    'Implement effective microphone and recording techniques to achieve professional-grade audio.',
    'Create and execute a content plan, including episode scripting, guest management, and scheduling.',
    'Publish podcasts on major platforms (e.g., Spotify, Apple Podcasts) with optimized metadata and RSS feeds.',
    'Apply marketing strategies, including social media promotion and audience engagement, to grow listenership.',
    'Analyze podcast performance metrics using analytics tools to refine content and increase reach.'
  ],
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8,
    module9,
    module10
  ]
};

export default podcastManagementCourse;
