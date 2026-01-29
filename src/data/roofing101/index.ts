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
// import module10 from './module10';
import module11 from './module11';
import module12 from './module12';

const roofing101: Course = {
  id: 'roofing101',
  title: 'Roofing',
  description: 'Comprehensive online course covering roofing design, installation, maintenance, and modern sustainable practices',
  thumbnail: '/images/generation-8dea647f-b6de-42c7-8708-d6e68a0fe5d1.png',
    instructor: {
    id: 'roofing101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '8-10 weeks',
  level: 'Beginner to Intermediate',
  students: 980,
  rating: 4.8,
  price: 500,
  currency: 'ZAR',
  is_free: true,
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
    module9,
    // module10,
    module11,
    module12
  ],
  learningObjectives: [
    'Evaluate and select appropriate roofing materials based on climate, budget, and structural requirements',
    'Master professional installation techniques for various roofing systems ensuring proper alignment and waterproofing',
    'Implement OSHA-compliant safety protocols including fall protection and hazard identification',
    'Execute advanced waterproofing techniques and flashing installation to prevent leaks',
    'Diagnose and repair common roofing problems using industry-standard methods',
    'Design sustainable roofs incorporating eco-friendly materials and practices',
    'Develop maintenance schedules and repair techniques to extend roof lifespan',
    'Navigate digital tools and project management apps for efficient roofing projects'
  ],
  targetAudience: [
    'DIY homeowners seeking professional-grade roofing skills',
    'Aspiring roofing professionals entering the trade',
    'Construction professionals expanding their roofing expertise',
    'Facility managers maintaining commercial or residential buildings',
    'Sustainability enthusiasts interested in eco-friendly roofing solutions'
  ]
};

export default roofing101; 

