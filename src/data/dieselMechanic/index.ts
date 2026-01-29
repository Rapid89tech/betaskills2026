
import { module1Fundamentals } from './module1-fundamentals';
import { module2FuelInjection } from './module2-fuelInjection';
import { module3Diagnostics } from './module3-diagnostics';
import { module4Turbochargers } from './module4-turbochargers';
import { module5Electrical } from './module5-electrical';
import { module6EmissionsControl } from './module6-emissionsControl';
import { module7Maintenance } from './module7-maintenance';
import { module8Practicals } from './module8-practicals';
import type { Course } from '@/types/course';

export const dieselMechanicCourse: Course = {
  id: 'b8c7d6e5-f4a3-9281-b0c9-d8e7f6a5b4c3',
  title: 'Diesel Mechanic Professional Certification',
  description: 'Master diesel engine diagnostics, repair, and maintenance with hands-on training for heavy-duty vehicles, trucks, and equipment.',
  instructor: {
    name: 'Master Technician Mike Johnson',
    title: 'Certified Diesel Engine Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Over 20 years of experience in diesel engine repair and maintenance. Certified by major diesel manufacturers including Caterpillar, Cummins, and Detroit Diesel.'
  },
  level: 'intermediate',
  duration: '16 weeks',
  students: 1247,
  rating: 4.8,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  category: 'Automotive',
  learningObjectives: [
    'Understand diesel engine principles and operation',
    'Diagnose common diesel engine problems',
    'Master fuel injection system repair',
    'Perform preventive maintenance procedures',
    'Use diagnostic tools and equipment effectively',
    'Understand emissions systems and regulations',
    'Repair turbochargers and intercoolers',
    'Troubleshoot electrical systems in diesel vehicles'
  ],
  modules: [
    module1Fundamentals,
    module2FuelInjection,
    module3Diagnostics,
    module4Turbochargers,
    module5Electrical,
    module6EmissionsControl,
    module7Maintenance,
    module8Practicals
  ]
};
