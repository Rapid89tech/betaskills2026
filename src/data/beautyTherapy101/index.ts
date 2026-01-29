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

const beautyTherapy101: Course = {
  id: 'beautyTherapy101',
  title: 'Beauty Therapy',
  description: 'Comprehensive online course covering beauty therapy fundamentals, skincare treatments, hair removal techniques, nail technology, makeup application, body treatments, and professional practices. Master professional beauty therapy skills for a successful career in the beauty industry.',
  thumbnail: '/src/assets/beautytherapy101-course.jpg',
    instructor: {
    id: 'beautyTherapy101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '10-12 weeks',
  level: 'Beginner to Intermediate',
  students: 950,
  rating: 4.8,
  price: 600,
  currency: 'ZAR',
  is_free: false,
  category: 'Beauty and Wellness',
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
    'Understand and apply beauty therapy fundamentals, including skincare, hair removal, and nail care',
    'Master professional treatment techniques for facials, body treatments, and makeup application',
    'Apply anatomy and physiology knowledge to safe and effective beauty treatments',
    'Implement strict hygiene, safety, and sterilization protocols in salon settings',
    'Develop client consultation and treatment planning skills',
    'Master advanced beauty therapy techniques and aesthetic device operation',
    'Build business skills for running a successful beauty therapy practice',
    'Apply ethical practices and professional standards in all client interactions'
  ],
  targetAudience: [
    'Beginners with no prior beauty therapy experience',
    'Aspiring beauty therapists seeking career foundation',
    'Salon professionals looking to expand their skills',
    'Individuals interested in starting a beauty therapy business',
    'Beauty enthusiasts seeking professional knowledge'
  ]
};

export default beautyTherapy101;


