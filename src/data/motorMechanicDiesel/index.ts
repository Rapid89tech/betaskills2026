import { Course } from '../../types/course';
import { module1 } from './module1';
import { module2 } from './module2';
import { module3 } from './module3';
import { module4 } from './module4';
import { module5 } from './module5';
import { module6 } from './module6';

export const motorMechanicDieselCourse: Course = {
  id: 'motor-mechanic-diesel',
  title: 'Diesel Motor Mechanic',
  description: 'This engaging online course, Diesel Mechanic Mastery: Comprehensive Online Training, equips learners with the knowledge and skills to excel in diesel engine maintenance, repair, and diagnostics. Covering essential topics like engine systems, fuel injection, electrical components, and advanced troubleshooting, the course blends theory with practical, real-world applications.',
  instructor: {
    id: 'betaskilltutor',
    first_name: 'Expert',
    last_name: 'Instructor',
    email: 'instructor@betaskill.com',
  },
  thumbnail: '/images/diesel-mechanic-course.jpg',
  duration: '10 weeks',
  category: 'Automotive',
  level: 'intermediate',
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6
  ]
};

export default motorMechanicDieselCourse;