import type { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';

const landscaping101: Course = {
  id: 'landscaping101',
  title: 'Landscaping',
  description: 'Comprehensive online course covering landscaping fundamentals, design principles, plant and soil management, hardscaping, installation techniques, sustainable practices, and business operations. Master residential and commercial landscaping systems, ecological design, and professional landscape management.',
  thumbnail: '/src/assets/landscaping101-course.jpg',
    instructor: {
    id: 'landscaping101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '8-10 weeks',
  level: 'Beginner to Intermediate',
  students: 1150,
  rating: 4.8,
  price: 7500,
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
    module8
  ],
  learningObjectives: [
    'Understand and apply landscaping fundamentals, including design principles, plant selection, and hardscaping techniques',
    'Design and install sustainable landscapes that comply with environmental regulations and water conservation standards',
    'Diagnose and manage soil conditions, select appropriate plants for climate and soil types',
    'Implement eco-friendly practices including native plant selection, xeriscaping, and organic fertilization',
    'Utilize design software and mapping tools to create professional 2D and 3D landscape plans',
    'Install and maintain irrigation systems, drainage solutions, and hardscape features',
    'Demonstrate safe working practices with tools, machinery, and adherence to OSHA health standards',
    'Develop business skills for estimating, pricing, marketing, and managing a landscaping enterprise'
  ],
  targetAudience: [
    'Beginners with no prior landscaping experience',
    'Aspiring landscapers seeking career foundation',
    'Homeowners and DIY enthusiasts',
    'Property managers and facility maintenance professionals',
    'Construction professionals integrating landscaping knowledge'
  ]
};

export default landscaping101;



