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
import module11 from './module11';
import module12 from './module12';
import module13 from './module13';

export const hairDressingCourse: Course = {
  id: 'hair-dressing',
  title: 'Hair Dressing',
  description: 'Essential Skills for Aspiring Stylists and Beauty Enthusiasts',
  thumbnail: '/images/courses/hair-dressing.jpg',
  category: 'Beauty & Personal Care',
  level: 'Beginner to Intermediate',
  duration: '12 weeks',
  is_free: true,
  price: 0,
  currency: 'ZAR',
  students: 0,
  rating: 0,
  status: 'published',
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
    module9,
    module10,
    module11,
    module12,
    module13
  ],
  learningObjectives: [
    'Identify and explain the detailed structure of hair including follicles, cuticles, and cortex',
    'Demonstrate proficiency in selecting and using a wide range of hairdressing tools and equipment',
    'Master fundamental and intermediate cutting techniques including precision cutting and layering',
    'Create and execute diverse hairstyles from protective styles to elegant updos',
    'Conduct effective client consultations and analyze hair types and conditions',
    'Apply comprehensive hygiene, safety, and sustainability principles in salon settings',
    'Develop business acumen for managing a hair dressing operation',
    'Build and present a professional digital portfolio showcasing your skills'
  ],
  instructor: {
    id: 'hair-dressing-instructor',
    first_name: 'Professional Hair',
    last_name: 'Styling Team',
    email: 'hairstyling@betaskills.com'
  }
};
