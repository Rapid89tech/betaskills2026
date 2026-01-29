
import { Course, Module } from '@/types/course';
import { module1 } from './module1';
import { module2 } from './module2';
import { module3 } from './module3';
import { module4 } from './module4';
import { module5 } from './module5';
import { module6 } from './module6';
import { nailTechnicianCertificate } from './certificate';

export const nailTechnicianCourse: Course = {
  id: 'nail-technician',
  title: 'Professional Nail Technician Certification',
  description: 'Master professional nail care, design techniques, manicures, pedicures, nail enhancements, salon business skills, and career development',
  instructor: {
    name: 'Jessica Taylor',
    title: 'Master Nail Technician & Salon Owner',
    bio: 'With over 12 years of experience in nail artistry and salon management, Jessica has trained hundreds of successful nail technicians and owns three award-winning nail salons.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  duration: '30 weeks',
  level: 'Beginner',
  category: 'Beauty & Wellness',
  is_free: false,
  price: 500,
  currency: 'ZAR',
  students: 987,
  rating: 4.6,
  thumbnail: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
  learningObjectives: [
    'Master nail anatomy and identify common nail disorders',
    'Use professional nail care tools and products safely',
    'Perform complete manicures and pedicures',
    'Create stunning nail art and designs',
    'Apply various nail enhancement techniques including acrylics, gels, and dip powder',
    'Maintain proper sanitation and safety protocols',
    'Conduct professional client consultations and maintain detailed records',
    'Understand salon business operations and marketing strategies',
    'Build a successful nail technician career with ongoing education',
    'Develop professionalism and customer service skills'
  ],
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    nailTechnicianCertificate
  ]
};
