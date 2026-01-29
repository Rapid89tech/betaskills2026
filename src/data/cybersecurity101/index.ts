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

const cybersecurity101: Course = {
  id: 'cybersecurity101',
  title: 'Cybersecurity',
  description: 'This course equips learners with foundational knowledge and practical skills in cybersecurity. It covers essential concepts such as threat identification, secure communication, ethical hacking, malware protection, and risk management. Learners will explore both technical and behavioral aspects of securing digital environments, preparing them for personal safety and entry-level careers in cybersecurity.',
  thumbnail: '/src/assets/cybersecurity101-course.jpg',
  instructor: {
    name: 'Cybersecurity Professionals',
    title: 'Certified Cybersecurity Experts',
    avatar: '/src/assets/cybersecurity-instructor.jpg',
    bio: 'Experienced cybersecurity professionals with decades of industry expertise'
  },
  duration: '10-12 weeks',
  level: 'Beginner to Intermediate',
  students: 1500,
  rating: 4.8,
  price: 290,
  currency: 'ZAR',
  is_free: false,
  category: 'Technology',
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
    'Understand key cybersecurity principles and terminology',
    'Identify common threats, attacks, and vulnerabilities',
    'Apply protective strategies to personal and organizational digital assets',
    'Learn tools and techniques for preventing, detecting, and responding to cyber threats',
    'Develop an ethical approach to handling data and security',
    'Master network security fundamentals and technologies',
    'Understand operating system and endpoint security',
    'Learn web application security best practices',
    'Implement security policies, compliance, and governance',
    'Develop skills in risk management and incident response',
    'Master cloud security essentials',
    'Explore careers in cybersecurity and certification pathways'
  ],
  targetAudience: [
    'Individuals seeking to protect their personal digital assets',
    'Aspiring cybersecurity professionals',
    'IT professionals looking to expand their security knowledge',
    'Business owners and managers responsible for organizational security',
    'Students interested in cybersecurity careers'
  ]
};

export default cybersecurity101;

