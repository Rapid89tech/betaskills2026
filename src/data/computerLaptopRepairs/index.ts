import { Course } from '@/types/course';
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

export const computerLaptopRepairsCourse: Course = {
  id: 'computer-laptop-repairs',
  title: 'Computer and Laptop Repairs',
  description: 'A comprehensive online course designed to equip learners with foundational and advanced knowledge in computer and laptop repair, enabling them to confidently identify, troubleshoot, and resolve both hardware and software issues. Through engaging video tutorials, interactive simulations, and hands-on practice, this course covers essential skills like disassembly, part replacement, software recovery, and customer service excellence.',
  instructor: {
    id: 'computer-repairs-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '12 weeks',
  level: 'beginner',
  category: 'Technology & IT',
  is_free: false,
  price: 390,
  currency: 'ZAR',
  students: 0,
  rating: 5.0,
  thumbnail: '/courses-hero-bg.png',
  learningObjectives: [
    'Identify and describe the function of key hardware components (CPU, RAM, motherboard, SSD)',
    'Diagnose and fix common computer and laptop issues including power, display, and system errors',
    'Disassemble and reassemble laptops and desktops with confidence using proper tools and safety protocols',
    'Perform hardware upgrades (RAM, HDD, SSD, motherboards) and operating system installations',
    'Troubleshoot hardware and software issues using diagnostic tools and virtual simulations',
    'Implement virus removal, malware detection, and system optimization techniques',
    'Execute data recovery and implement backup strategies to safeguard critical information',
    'Apply customer service and communication skills to handle clients professionally',
    'Prepare for CompTIA A+ certification through practice quizzes and real-world repair scenarios'
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
    module12
  ]
};

export default computerLaptopRepairsCourse;
