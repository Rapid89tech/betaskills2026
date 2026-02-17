import { Course } from '@/types/course';
import { module1 } from './module1-introductionPetrolEngines';
import { module2 } from './module2-petrolFuelSystems';
import { module3 } from './module3-safetyWorkshopPractices';
import { module4 } from './module4-engineMaintenance';
import { module5 } from './module5-driveBeltsTiming';
import { module6 } from './module6-fuelSystemHealth';
import { module7 } from './module7-diagnosingEngineIssues';
import { module8 } from './module8-testingDiagnosticTools';
import { module9 } from './module9-basicRepairs';
import { module10 } from './module10-coolingSystemOverhauls';
import { module11 } from './module11-lubricationSystemRepairs';
import { module12 } from './module12-tuningPerformanceOptimization';
import { module13 } from './module13-improvingEngineEfficiency';
import { module14 } from './module14-emissionsEnvironmental';

export const petrolMechanicCourse: Course = {
  id: 'petrol-mechanic',
  title: 'Motor Mechanic (Petrol Engine)',
  description: 'A comprehensive online training program designed to empower aspiring and experienced mechanics with the skills to master petrol engine maintenance, diagnostics, and repair. This course covers the complete lifecycle of petrol engine technology, from foundational mechanics like the four-stroke cycle to advanced topics such as electronic fuel injection, turbocharging, and hybrid powertrains.',
  instructor: {
    id: 'petrol-mechanic-instructor',
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
  thumbnail: '/images/petrol-mechanic-course.png',
  learningObjectives: [
    'Explain the operational principles of petrol engines, including the four-stroke cycle, combustion processes, and key components',
    'Perform routine maintenance tasks, such as oil changes, spark plug replacements, and cooling system flushes',
    'Diagnose complex engine faults, including misfires, power loss, and emissions issues, using OBD-II scanners and compression testers',
    'Execute advanced repairs, such as timing belt replacements, cylinder head overhauls, and turbocharger servicing',
    'Interpret technical documentation, including wiring diagrams, service manuals, and diagnostic trouble codes',
    'Utilize specialized automotive tools, such as torque wrenches, bore gauges, and diagnostic software',
    'Apply knowledge of modern petrol engine technologies, including direct injection, variable valve timing, and hybrid systems',
    'Implement emissions control and fuel efficiency strategies to comply with regulations',
    'Create a professional portfolio documenting maintenance logs, diagnostic reports, and repair projects',
    'Collaborate effectively in virtual teams using online platforms'
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
    module8,
    module9,
    module10,
    module11,
    module12,
    module13,
    module14
  ]
};

export default petrolMechanicCourse;
