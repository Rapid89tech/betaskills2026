import type { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';

const masterchef101: Course = {
  id: 'masterchef101',
  title: 'Master Chef',
  description: 'Comprehensive professional culinary arts course covering foundations, essential cooking techniques, international cuisines, advanced techniques, creativity, nutrition, business, and leadership. Master professional culinary skills for a successful career in the culinary industry.',
  thumbnail: '/src/assets/masterchef101-course.jpg',
    instructor: {
    id: 'masterchef101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '12-16 weeks',
  level: 'Beginner to Advanced',
  students: 1200,
  rating: 4.9,
  price: 800,
  currency: 'ZAR',
  is_free: false,
  category: 'Culinary Arts',
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
  learningObjectives: [
    'Master professional kitchen operations, safety, and hygiene standards',
    'Develop essential cooking techniques including stocks, sauces, and mother sauces',
    'Explore international cuisines from French haute cuisine to Asian, African, and Latin American traditions',
    'Master advanced culinary techniques and modern cooking methods',
    'Create signature dishes with balanced flavors and textures',
    'Understand nutrition principles and dietary requirements',
    'Build business and leadership skills for culinary management',
    'Complete capstone projects and achieve professional certification'
  ],
  targetAudience: [
    'Aspiring chefs seeking professional culinary training',
    'Culinary students pursuing certification',
    'Professional cooks looking to advance their careers',
    'Restaurant entrepreneurs planning to open their own establishments',
    'Food enthusiasts seeking comprehensive culinary knowledge'
  ]
};

export default masterchef101;



