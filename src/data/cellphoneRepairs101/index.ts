import type { Course } from '@/types/course';
import module1 from './module1-introduction';
import module2 from './module2-tools';
import module3 from './module3-hardware';
import module4 from './module4-commonRepairs';
import module5 from './module5-advancedDiagnostics';
import module6 from './module6-maintenance';
import module7 from './module7-business';

const cellphoneRepairs101: Course = {
  id: 'cellphone-repairs-101',
  title: 'Cellphone Repairs and Maintenance',
  description: 'The Cell Phone Repairs and Maintenance course is an in-depth, fully online program designed to provide learners with practical, hands-on skills to diagnose, repair, and maintain modern smartphones. Covering essential topics such as hardware component identification, troubleshooting common issues (e.g., cracked screens, battery failures), software recovery, and preventive maintenance, this course equips participants with the expertise needed to address real-world cellphone challenges. Delivered through engaging digital content, it emphasizes step-by-step guidance and accessibility, enabling learners to master repair techniques at their own pace.',
  longDescription: `In an era where smartphones are indispensable for personal and professional use, this course is highly relevant for those seeking to enter the growing mobile repair industry, launch a repair business, or perform cost-effective DIY fixes. With a focus on practical application and online flexibility, it empowers aspiring technicians, hobbyists, and entrepreneurs to confidently handle various phone models, ensuring devices remain functional and optimized.

By the end of this course, learners will be able to:

• Recognize and explain the functions of key smartphone components, including processors, batteries, displays, and circuit boards.
• Diagnose common smartphone issues, such as hardware malfunctions, software glitches, or connectivity problems, using online diagnostic tools.
• Perform hardware repairs, including screen replacements, battery swaps, camera repairs, and charging port fixes, with precision and safety.
• Troubleshoot and resolve software issues, including operating system crashes, app malfunctions, and data recovery, using free or open-source tools.
• Implement preventive maintenance techniques, such as cleaning connectors, optimizing software, and protecting devices, to enhance longevity.
• Estimate repair costs and timelines accurately using digital resources and industry-standard pricing guides.
• Apply professional repair practices, including safe handling of electronic components, customer communication, and documentation of repair processes.`,
  category: 'Technology',
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7
  ],
  totalLessons: 0, // Will be calculated
  totalDuration: '7 weeks',
  difficulty: 'Intermediate',
  rating: 4.8,
  students: 1250,
  price: 299,
  originalPrice: 399,
  image: '/images/courses/cellphone-repairs-101.jpg',
  instructor: {
    name: 'Professional Repair Technician',
    avatar: '/images/instructors/repair-tech.jpg',
    bio: 'Certified mobile device repair technician with over 10 years of experience in smartphone diagnostics, repair, and maintenance.'
  },
  features: [
    'Comprehensive hardware and software repair training',
    'Hands-on diagnostic techniques',
    'Safety protocols and best practices',
    'Business setup guidance',
    'Industry-standard tools and equipment',
    'Real-world repair scenarios',
    'Certificate of completion'
  ],
  requirements: [
    'Basic understanding of electronics',
    'Access to repair tools (recommended)',
    'Dedication to learning and practice',
    'No prior repair experience required'
  ],
  learningObjectives: [
    'Master smartphone hardware component identification and function',
    'Develop diagnostic skills for common device issues',
    'Learn safe repair techniques and procedures',
    'Understand iOS and Android system architecture',
    'Implement preventive maintenance strategies',
    'Build professional repair business foundations'
  ]
};

// Calculate total lessons
cellphoneRepairs101.totalLessons = cellphoneRepairs101.modules.reduce(
  (total, module) => total + module.lessons.length,
  0
);

export default cellphoneRepairs101;
