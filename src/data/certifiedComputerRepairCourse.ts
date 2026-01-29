import { Course } from '@/types/course';
import certifiedComputerRepairModule1 from './certifiedComputerRepair/module1-introduction';
import certifiedComputerRepairModule2 from './certifiedComputerRepair/module2-disassembly';
import certifiedComputerRepairModule3 from './certifiedComputerRepair/module3-troubleshooting';
import certifiedComputerRepairModule4 from './certifiedComputerRepair/module4-powerSupply';
import certifiedComputerRepairModule5 from './certifiedComputerRepair/module5-upgrades';
import certifiedComputerRepairModule6 from './certifiedComputerRepair/module6-displayKeyboard';
import certifiedComputerRepairModule7 from './certifiedComputerRepair/module7-software';
import certifiedComputerRepairModule8 from './certifiedComputerRepair/module8-customerService';

const certifiedComputerRepairCourse: Course = {
  id: 'certified-computer-repair',
  title: 'Certified Computer & Laptop Repair Technician Training',
  description: 'Computer and Laptop Repairs is a comprehensive online course designed to equip learners with foundational and advanced knowledge in computer and laptop repair, enabling them to confidently identify, troubleshoot, and resolve both hardware and software issues. Through engaging video tutorials, interactive simulations, and hands-on practice, this course covers essential skills like disassembly, part replacement, software recovery, and customer service excellence, preparing learners for real-world repair scenarios. Accessible entirely online, it\'s perfect for anyone looking to start a repair business, prepare for certifications like CompTIA A+, or master personal device repairs in today\'s tech-driven world.',
  instructor: {
    name: 'Beta Skill Tutor',
    title: 'Senior Computer Repair Instructor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Certified computer repair instructor with 10+ years of experience in hardware diagnostics, component replacement, and professional repair services.'
  },
  level: 'intermediate',
  duration: '8 weeks',
  students: 0,
  rating: 4.9,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
  category: 'Information Communication and technology',
  learningObjectives: [
    'Identify and describe the function of key hardware components (e.g., CPU, RAM, motherboard, SSD)',
    'Diagnose and fix common computer and laptop issues, including power, display, and system errors',
    'Disassemble and reassemble laptops and desktops with confidence, using proper tools and safety protocols',
    'Perform hardware upgrades (e.g., RAM, HDD, SSD, motherboards) and operating system installations (Windows, macOS, Linux)',
    'Troubleshoot hardware and software issues using diagnostic tools and virtual simulations',
    'Implement virus removal, malware detection, and system optimization techniques with freely available software',
    'Execute data recovery and implement backup strategies to safeguard critical information',
    'Apply customer service and communication skills to handle clients professionally and estimate repair costs',
    'Prepare for CompTIA A+ certification through practice quizzes and real-world repair scenarios',
    'Use online collaboration tools to share solutions and engage with peers in virtual forums'
  ],
  modules: [
    certifiedComputerRepairModule1,
    certifiedComputerRepairModule2,
    certifiedComputerRepairModule3,
    certifiedComputerRepairModule4,
    certifiedComputerRepairModule5,
    certifiedComputerRepairModule6,
    certifiedComputerRepairModule7,
    certifiedComputerRepairModule8
  ]
};

export default certifiedComputerRepairCourse; 