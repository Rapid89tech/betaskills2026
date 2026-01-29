import { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';

export const motorMechanicPetrol02Course: Course = {
  id: 'motor-mechanic-petrol-02',
  title: 'Petrol Motor Mechanic',
  description: 'The Petrol Engine Mechanics course is a comprehensive, online training program designed to empower aspiring and experienced mechanics with the skills to master petrol engine maintenance, diagnostics, and repair. This course covers the complete lifecycle of petrol engine technology, from foundational mechanics like the four-stroke cycle to advanced topics such as electronic fuel injection, turbocharging, and hybrid powertrains.',
  category: 'Automotive',
  level: 'intermediate',
  duration: '8 weeks',
  price: 500,
  currency: 'ZAR',
  students: 856,
  rating: 4.7,
  instructor: {
    id: 'betaskilltutor',
    name: 'Beta Skill Tutor',
    email: 'betaskilltraining@gmail.com',
    avatar: '/images/instructor-avatar.jpg'
  },
  thumbnail: '/images/courses/motor-mechanic-petrol-02.jpg',
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8
  ],
  certificate: {
    id: 'motor-mechanic-petrol-02-certificate',
    title: 'Motor Mechanic (Petrol Engine) 02 Certificate',
    description: 'Certificate of completion for Motor Mechanic (Petrol Engine) 02 course'
  }
};

export default motorMechanicPetrol02Course;
