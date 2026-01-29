import type { Course } from '@/types/course';
import module1 from './module1';

const filmProduction101: Course = {
  id: 'filmProduction101',
  title: 'Film Production',
  description: 'Comprehensive online course covering film production from concept to distribution, including theory, storytelling, pre-production, cinematography, sound design, directing, production, and post-production',
  thumbnail: '/images/generation-f4a1277d-3867-48ad-9ca4-d8d9965d2670.png',
  instructor: {
    id: 'filmProduction101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '12-16 weeks',
  level: 'Beginner to Intermediate',
  students: 1250,
  rating: 4.9,
  price: 800,
  currency: 'ZAR',
  is_free: true,
  category: 'Creative Arts and Media',
  modules: [
    module1
  ],
  learningObjectives: [
    'Understand the complete film production process from development to distribution',
    'Master storytelling fundamentals including narrative structures and genre analysis',
    'Learn pre-production planning including budgeting, scheduling, and casting',
    'Develop cinematography skills with camera types, lenses, lighting, and composition',
    'Create professional sound design with dialogue recording, Foley, and mixing',
    'Direct effectively by working with actors, cinematographers, and production designers',
    'Execute on-set workflows and troubleshoot production challenges',
    'Complete post-production including video editing, color grading, and final delivery'
  ],
  targetAudience: [
    'Aspiring filmmakers seeking comprehensive production knowledge',
    'Content creators wanting to enhance their video production skills',
    'Film students supplementing their formal education',
    'Independent producers planning their first film project',
    'Creative professionals transitioning into film and video production'
  ]
};

export default filmProduction101;
