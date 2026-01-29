import type { Course } from '@/types/course';

// Import all modules
import { module1 } from './module1';
import { module2 } from './module2';
import { module3 } from './module3';
import { module4 } from './module4';
import { module5 } from './module5';
import { module6 } from './module6';
import { module7 } from './module7';
import { module8 } from './module8';
import { module9 } from './module9';
import { module10 } from './module10';
import { module11 } from './module11';
import { module12 } from './module12';
import { module13 } from './module13';
import { module14 } from './module14';

export const motorMechanicPetrolCourse: Course = {
  id: 'motor-mechanic-petrol',
  title: 'Petrol Motor Mechanic',
  description: 'The Petrol Engine Mechanics course is a comprehensive, online training program designed to empower aspiring and experienced mechanics with the skills to master petrol engine maintenance, diagnostics, and repair.',
  instructor: {
    name: "Expert Motor Mechanics Team",
    title: "Professional Automotive Instructors",
    bio: "Expert team of motor mechanics with over 20 years of combined experience in petrol engine diagnostics, maintenance, and repair across various vehicle makes and models.",
    avatar: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=150&h=150&fit=crop&crop=face"
  },
  level: 'beginner',
  duration: '14 weeks (10 hours/week)',
  students: 2847,
  rating: 4.9,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
  category: 'Automotive',
  learningObjectives: [
    'Explain the operational principles of petrol engines, including the four-stroke cycle, combustion processes, and key components like pistons, camshafts, and fuel injectors',
    'Perform routine maintenance tasks, such as oil changes, spark plug replacements, and cooling system flushes, to optimize engine performance and longevity',
    'Diagnose complex engine faults, including misfires, power loss, and emissions issues, using tools like OBD-II scanners, multimeters, and compression testers',
    'Execute advanced repairs, such as timing belt replacements, cylinder head overhauls, and turbocharger servicing, adhering to manufacturer specifications',
    'Interpret technical documentation, including wiring diagrams, service manuals, and diagnostic trouble codes (DTCs), for precise troubleshooting',
    'Utilize specialized automotive tools, such as torque wrenches, bore gauges, and diagnostic software, to deliver professional-grade repairs',
    'Apply knowledge of modern petrol engine technologies, including direct injection, variable valve timing, and hybrid systems, to service contemporary vehicles',
    'Implement emissions control and fuel efficiency strategies to comply with regulations like Euro 6 or EPA standards'
  ],
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
  ]
};