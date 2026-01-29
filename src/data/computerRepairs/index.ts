
import type { Course } from '@/types/course';
import { module1Hardware } from './module1/index';
import { module2Disassembly } from './module2/index';
import { module3Troubleshooting } from './module3-troubleshooting';
import { module4PowerSupply } from './module4-powerSupply';
import { module5ComponentReplacement } from './module5-componentReplacement';
import { module6DisplayKeyboard } from './module6-displayKeyboard';
import { module7BiosFirmware } from './module7-biosFirmware';
import { module8OperatingSystem } from './module8-operatingSystem';
import { module9VirusRemoval } from './module9-virusRemoval';
import { module10DataRecovery } from './module10-dataRecovery';
import { module11CustomerService } from './module11-customerService';
import { module12Assessment } from './module12-assessment';

export const computerRepairsMarkdown = `
<full markdown content from CourseDocuments/Computer and Laptop Repairs - Version 3.md>
`;

export const computerRepairsCourse: Course = {
  id: 'computer-repairs',
  title: 'Computer and Laptop Repairs',
  description: `Computer and Laptop Repairs is a comprehensive online course designed to equip learners with foundational and advanced knowledge in computer and laptop repair, enabling them to confidently identify, troubleshoot, and resolve both hardware and software issues. Through engaging video tutorials, interactive simulations, and hands-on practice, this course covers essential skills like disassembly, part replacement, software recovery, and customer service excellence, preparing learners for real-world repair scenarios. Accessible entirely online, it’s perfect for anyone looking to start a repair business, prepare for certifications like CompTIA A+, or master personal device repairs in today’s tech-driven world.

With a smart AI voice tutor available 24/7, virtual labs, and a supportive community, learners will develop practical, career-ready skills to tackle common and complex repair challenges. Whether you're a beginner or an aspiring technician, this course provides the tools and knowledge to excel in the growing tech repair industry, all from the comfort of your home.`,
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
    'Identify and describe the function of key hardware components (e.g., CPU, RAM, motherboard, SSD).',
    'Diagnose and fix common computer and laptop issues, including power, display, and system errors.',
    'Disassemble and reassemble laptops and desktops with confidence, using proper tools and safety protocols.',
    'Perform hardware upgrades (e.g., RAM, HDD, SSD, motherboards) and operating system installations (Windows, macOS, Linux).',
    'Troubleshoot hardware and software issues using diagnostic tools and virtual simulations.',
    'Implement virus removal, malware detection, and system optimization techniques with freely available software.',
    'Execute data recovery and implement backup strategies to safeguard critical information.',
    'Apply customer service and communication skills to handle clients professionally and estimate repair costs.',
    'Prepare for CompTIA A+ certification through practice quizzes and real-world repair scenarios.',
    'Use online collaboration tools to share solutions and engage with peers in virtual forums.'
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
    module11CustomerService,
    module12Assessment
  ]
};
