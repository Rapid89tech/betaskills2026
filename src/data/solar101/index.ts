import type { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';

const solar101: Course = {
  id: 'solar101',
  title: 'Solar Energy Systems: Installation & Maintenance',
  description: 'Comprehensive training in solar PV technology, covering photovoltaic system components, design principles, installation procedures, maintenance practices, safety protocols, and compliance standards. Perfect for electricians, technicians, contractors, and anyone starting a career in solar energy.',
  thumbnail: '/images/solar101-course.jpg',
    instructor: {
    id: 'solar101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '14-16 weeks',
  level: 'Beginner to Advanced',
  students: 2850,
  rating: 4.9,
  price: 4350,
  currency: 'ZAR',
  is_free: false,
  category: 'Renewable Energy',
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
    'Understand the science and technology behind solar power generation and photovoltaic systems',
    'Identify and describe all components of a solar PV system including panels, inverters, batteries, and BOS',
    'Design, install, and maintain solar systems according to safety and efficiency standards',
    'Interpret solar system layouts, wiring diagrams, and conduct comprehensive site assessments',
    'Apply maintenance and troubleshooting practices to maximize system performance and longevity',
    'Navigate permits, regulations, and compliance standards (NEC, IEC, SANS, NRS)',
    'Implement proper safety protocols including PPE, electrical safety, and fire prevention',
    'Launch and scale a solar installation business with proper certifications and marketing strategies'
  ],
  targetAudience: [
    'Electricians and technicians looking to specialize in solar PV installations',
    'Contractors seeking to add solar services to their business offerings',
    'Career switchers interested in entering the renewable energy sector',
    'Homeowners and DIY enthusiasts wanting to understand solar systems',
    'Facility managers and maintenance professionals needing to upskill in solar technology'
  ]
};

export default solar101;



