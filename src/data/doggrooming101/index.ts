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

const doggrooming101: Course = {
  id: 'doggrooming101',
  title: 'Dog Grooming & Training',
  description: 'Comprehensive online course covering dog grooming and training fundamentals, tools, techniques, and professional practices. Master breed-specific grooming, obedience training, behavior management, and business skills for a successful career in canine care.',
  thumbnail: '/src/assets/doggrooming101-course.jpg',
  instructor: {
    id: 'doggrooming-instructor',
    first_name: 'Dog Grooming',
    last_name: 'Experts',
    email: 'doggrooming@betaskilltraining.com'
  },
  duration: '10-12 weeks',
  level: 'Beginner to Intermediate',
  students: 850,
  rating: 4.8,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  category: 'Animal Care',
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
  ],
  learningObjectives: [
    'Understand and apply dog grooming fundamentals, including breed-specific techniques and coat care',
    'Master essential dog training commands and positive reinforcement methods',
    'Identify and address common behavioral issues in dogs',
    'Use professional grooming tools and equipment safely and effectively',
    'Recognize health issues and provide basic first aid for dogs',
    'Develop business skills for running a successful grooming and training business',
    'Apply ethical and humane practices in all grooming and training activities',
    'Handle anxious or aggressive dogs safely and compassionately'
  ],
  targetAudience: [
    'Beginners with no prior dog grooming or training experience',
    'Aspiring professional dog groomers and trainers',
    'Dog owners seeking to improve their pet care skills',
    'Animal care professionals expanding their expertise',
    'Entrepreneurs interested in starting a dog grooming business'
  ]
};

export default doggrooming101;

