import type { Course } from '@/types/course';
import module1 from './module1';
import { module2 } from './module2';
import { module3 } from './module3';
import { module4 } from './module4';
import { module5 } from './module5';
import { module6 } from './module6';
import { module7 } from './module7';

const prophet: Course = {
  id: 'prophet',
  title: 'Prophet',
  description: 'Prophetic Ministry Training Course: Hearing, Speaking, and Living God\'s Voice. This course is designed for believers who are called to operate in the office of a prophet (Ephesians 4:11) or function in prophetic ministry. It focuses on cultivating the gift of prophecy, spiritual maturity, and the ability to discern and deliver God\'s word with accuracy, humility, and accountability.',
  thumbnail: '/src/assets/prophet-course.jpg',
  instructor: {
    id: 'prophet-instructor',
    first_name: 'Prophetic Ministry',
    last_name: 'Specialists',
    email: 'prophet@betaskilltraining.com'
  },
  duration: '8-10 weeks',
  level: 'Intermediate',
  students: 0,
  rating: 4.9,
  price: 290,
  currency: 'ZAR',
  is_free: false,
  category: 'Spiritual Development',
  status: 'approved',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  available: true,
  modules: [
    module1,
    module2 as any,
    module3 as any,
    module4 as any,
    module5 as any,
    module6 as any,
    module7 as any
  ],
  learningObjectives: [
    'Understand the office and gift of prophecy',
    'Learn to hear God\'s voice clearly',
    'Develop prophetic character and integrity',
    'Master prophetic protocols and order',
    'Practice prophetic intercession',
    'Participate in prophetic activation exercises',
    'Apply prophetic ethics and accountability'
  ]
};

export default prophet;
