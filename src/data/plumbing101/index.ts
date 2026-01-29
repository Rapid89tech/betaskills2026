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

const plumbing101: Course = {
  id: 'plumbing101',
  title: 'Plumbing',
  description: 'Comprehensive online course covering plumbing fundamentals, tools, systems, installation, and professional practices. Master residential and commercial plumbing systems, pipe fitting, and maintenance procedures.',
  thumbnail: '/src/assets/plumbing101-course.jpg',
    instructor: {
    id: 'plumbing101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '8-10 weeks',
  level: 'Beginner to Intermediate',
  students: 1250,
  rating: 4.7,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  category: 'Construction and Trades',
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
  ],
  learningObjectives: [
    'Understand and apply plumbing fundamentals, including pipe materials, fittings, and tools',
    'Design and install water supply and drainage systems that comply with international codes',
    'Diagnose and troubleshoot common plumbing issues using online diagnostic tools',
    'Implement sustainable plumbing practices and energy-efficient systems',
    'Utilize digital tools and virtual simulations to model plumbing layouts',
    'Interpret and create plumbing blueprints and schematics',
    'Demonstrate safe working practices and adherence to health standards',
    'Collaborate effectively in virtual group projects'
  ],
  targetAudience: [
    'Beginners with no prior plumbing experience',
    'Aspiring plumbers seeking career foundation',
    'Homeowners and DIY enthusiasts',
    'Maintenance professionals and facility managers',
    'Construction professionals integrating plumbing knowledge'
  ]
};

export default plumbing101; 

