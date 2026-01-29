
import type { Course } from '@/types/course';
import { module1Hardware } from './computerRepairs/module1/index';
import { module2Disassembly } from './computerRepairs/module2/index';
import { module3Troubleshooting } from './computerRepairs/module3-troubleshooting';
import { module4PowerSupply } from './computerRepairs/module4-powerSupply';
import { module5ComponentReplacement } from './computerRepairs/module5-componentReplacement';
import { module6DisplayKeyboard } from './computerRepairs/module6-displayKeyboard';
import { module7BiosFirmware } from './computerRepairs/module7-biosFirmware';
import { module8OperatingSystem } from './computerRepairs/module8-operatingSystem';
import { module9VirusRemoval } from './computerRepairs/module9-virusRemoval';
import { module10DataRecovery } from './computerRepairs/module10-dataRecovery';
// import { module11CustomerService } from './computerRepairs/module11-customerService';
import { module12Assessment } from './computerRepairs/module12-assessment';

export const computerRepairsCourse: Course = {
  id: 'computer-repairs',
  title: 'Certified Computer & Laptop Repair Technician Training',
  description: 'Complete certification course for computer repair technicians. Learn hardware fundamentals, troubleshooting, component replacement, and professional service skills.',
  instructor: {
    name: 'Mike Johnson',
    title: 'Senior Computer Repair Technician',
    bio: 'Certified computer repair technician with 15+ years of experience in hardware troubleshooting and repair.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  level: 'beginner',
  duration: '8 weeks (4-5 hours/week)',
  students: 892,
  rating: 4.7,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: '/images/generation-223f5d12-39ae-4748-84af-466e0078c55d.png',
  category: 'Technology',
  learningObjectives: [
    'Equip learners with foundational and advanced knowledge in computer and laptop repair',
    'Enable identification and troubleshooting of hardware and software issues',
    'Develop hands-on repair skills including disassembly, part replacement, and software recovery',
    'Prepare learners for real-world repair scenarios and customer service excellence',
    'Identify and describe the function of key hardware components',
    'Diagnose and fix common computer and laptop issues',
    'Disassemble and reassemble laptops and desktops',
    'Perform hardware upgrades and OS installations',
    'Troubleshoot power, display, and system errors',
    'Implement virus removal and system optimization',
    'Recover lost data and implement backup strategies',
    'Provide professional customer service and communication'
  ],
  modules: [
    module1Hardware,
    module2Disassembly,
    module3Troubleshooting,
    module4PowerSupply,
    module5ComponentReplacement,
    module6DisplayKeyboard,
    module7BiosFirmware,
    module8OperatingSystem,
    module9VirusRemoval,
    module10DataRecovery,
    // module11CustomerService, // Removed because file is missing
    module12Assessment
  ]
};
