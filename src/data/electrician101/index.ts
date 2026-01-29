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
import module14 from './module14';

const electrician101: Course = {
  id: 'electrician101',
  title: 'Master Electrician Online',
  description: 'Comprehensive Training for Electrical Expertise. Master electrical installations, safety protocols, troubleshooting, and NEC standards for residential, commercial, and industrial settings.',
  thumbnail: '/images/electrician101-course.jpg',
    instructor: {
    id: 'electrician101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '14-16 weeks',
  level: 'Beginner to Advanced',
  students: 1450,
  rating: 4.9,
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
    module8,
    module9,
    module10,
    module11,
    module12,
    module13,
    module14
  ],
  learningObjectives: [
    'Understand electrical fundamentals: voltage, current, resistance, and circuitry with Ohm\'s Law and Kirchhoff\'s Laws',
    'Perform safe installations: wiring, circuit breakers, and grounding systems in compliance with NEC standards',
    'Troubleshoot electrical systems: diagnose and repair faults in residential and commercial setups',
    'Apply safety protocols: implement OSHA and NFPA 70E standards to prevent electrical hazards',
    'Interpret blueprints and schematics: read and create electrical diagrams for installations',
    'Prepare for certification exams: demonstrate readiness for journeyman or apprentice electrician licensure',
    'Use modern tools and technology: operate multimeters, circuit testers, and smart home systems',
    'Master renewable energy systems: solar panels, EV charging stations, and energy-efficient solutions'
  ],
  targetAudience: [
    'Beginners with no prior electrical experience seeking entry into the electrician trade',
    'Apprentices or early-career electricians aiming to deepen knowledge and earn certifications',
    'Career switchers from related fields (construction, HVAC) transitioning to electrical work',
    'Homeowners or DIY enthusiasts interested in safe electrical practices',
    'Professionals in facility management or maintenance roles needing to upskill in electrical systems'
  ]
};

export default electrician101;



