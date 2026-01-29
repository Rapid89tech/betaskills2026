import type { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';

const emotionalIntelligence: Course = {
  id: 'emotional-intelligence',
  title: 'Emotional Intelligence',
  description: 'Master the art of understanding and managing emotions to enhance your personal and professional life. This comprehensive course covers the five key components of emotional intelligence: self-awareness, self-regulation, motivation, empathy, and social skills. Learn practical strategies to build stronger relationships, improve communication, resolve conflicts, and achieve success in all areas of life.',
  thumbnail: '/src/assets/emotional-intelligence-course.jpg',
  instructor: {
    id: 'ei-instructor',
    first_name: 'EI',
    last_name: 'Specialists',
    email: 'ei@betaskilltraining.com'
  },
  duration: '8-10 weeks',
  level: 'Beginner',
  students: 0,
  rating: 4.9,
  price: 290,
  currency: 'ZAR',
  is_free: false,
  category: 'Personal Development',
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
    module7
  ],
  learningObjectives: [
    'Understand the five key components of emotional intelligence',
    'Develop self-awareness and recognize your emotions',
    'Master self-regulation techniques for managing emotions',
    'Build intrinsic motivation and resilience',
    'Cultivate empathy and understand others\' perspectives',
    'Enhance social skills for better relationships',
    'Apply emotional intelligence in leadership and teamwork'
  ]
};

export default emotionalIntelligence;
