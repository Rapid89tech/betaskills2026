import { Course } from '@/types/course';
import roofingModule1 from './roofing101/module1';
import roofingModule2 from './roofing101/module2';
import roofingModule3 from './roofing101/module3';
import roofingModule4 from './roofing101/module4';
import roofingModule5 from './roofing101/module5';
import roofingModule6 from './roofing101/module6';
import roofingModule7 from './roofing101/module7';
import roofingModule8 from './roofing101/module8';
import roofingModule9 from './roofing101/module9';
import roofingModule11 from './roofing101/module11';

const roofingCourse: Course = {
  id: 'roofing101',
  title: 'Roofing',
  description: 'Roofing Mastery: Design, Installation, and Maintenance is a comprehensive online course designed to equip learners with the knowledge and skills to excel in roofing projects, from residential homes to commercial buildings. Covering essential topics such as material selection, installation techniques, waterproofing, safety protocols, and troubleshooting, this course blends theoretical insights with practical, hands-on applications.',
  instructor: {
    name: 'Beta Skill Tutor',
    title: 'Senior Roofing Instructor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Certified roofing instructor with 10+ years of experience in residential and commercial roofing, specializing in modern roofing systems and sustainable practices.'
  },
  level: 'intermediate',
  duration: '9 weeks',
  students: 0,
  rating: 4.9,
  price: 800,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
  category: 'Construction and Building',
  learningObjectives: [
    'Evaluate roofing materials and select appropriate options based on climate, budget, and structural requirements',
    'Master installation techniques for various roofing systems, ensuring proper alignment, waterproofing, and structural integrity',
    'Implement OSHA-compliant safety practices for roofing, including ladder use, fall protection, and hazard identification',
    'Perform advanced waterproofing techniques and install flashing to prevent leaks in wet or extreme environments',
    'Diagnose and repair roofing problems such as leaks, cracked shingles, or ventilation issues using industry-standard methods',
    'Design sustainable roofs incorporating eco-friendly materials and practices, such as green roofs or solar integration',
    'Develop maintenance schedules and repair techniques to extend roof lifespan and prevent costly replacements',
    'Use online roofing calculators, design software, and project management apps to plan and execute projects efficiently',
    'Execute hands-on roofing projects through simulated installations and team-based repair challenges'
  ],
  modules: [
    roofingModule1,
    roofingModule2,
    roofingModule3,
    roofingModule4,
    roofingModule5,
    roofingModule6,
    roofingModule7,
    roofingModule8,
    roofingModule9,
    roofingModule11
  ]
};

export default roofingCourse; 