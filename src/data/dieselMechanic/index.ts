import { Course } from '@/types/course';
import { module1 } from './module1-introductionDieselEngines';
import { module2 } from './module2-fuelInjectionSystems';
import { module3 } from './module3-lubricationCoolingSystems';
import { module4 } from './module4-turbochargerAirManagement';
import { module5 } from './module5-electricalDiagnosticSystems';
import { module6 } from './module6-emissionsControlEnvironmental';
import { module7 } from './module7-maintenancePreventativeCare';
import { module8 } from './module8-handsOnPracticals';

export const dieselMechanicCourse: Course = {
  id: 'diesel-mechanic',
  title: 'Diesel Mechanic Mastery',
  description: 'A comprehensive online training program designed to equip learners with the knowledge and skills to excel in diesel engine maintenance, repair, and diagnostics. Covering essential topics like engine systems, fuel injection, electrical components, and advanced troubleshooting, this course blends theory with practical, real-world applications.',
  instructor: {
    id: 'diesel-mechanic-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '40 weeks',
  level: 'intermediate',
  category: 'Automotive & Mechanics',
  is_free: false,
  price: 2500,
  currency: 'ZAR',
  students: 0,
  rating: 5.0,
  thumbnail: '/images/diesel-mechanic-course.png',
  learningObjectives: [
    'Diagnose diesel engine issues using online diagnostic tools and virtual simulations',
    'Perform routine maintenance on diesel engines, including oil changes, filter replacements, and cooling system checks',
    'Repair critical components such as fuel injectors, turbochargers, and electrical systems',
    'Analyze engine performance data with online diagnostic software to optimize efficiency',
    'Apply safety and compliance standards in diesel repair, ensuring adherence to OSHA and EPA regulations',
    'Troubleshoot advanced systems like electronic control modules (ECMs)',
    'Develop professional communication skills to document repairs and interact with clients'
  ],
  status: 'approved',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  available: true,
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8
  ]
};

export default dieselMechanicCourse;
