import type { Course } from '@/types/course';

// Import all modules
import { module1 } from './module1';
import { module2 } from './module2';
import { module3 } from './module3';

export const cellphoneRepairsCourse: Course = {
  id: 'cellphone-repairs-maintenance-101',
  title: 'Cellphone Repairs and Maintenance 101',
  description: 'The Cell Phone Repairs and Maintenance course is an in-depth, fully online program designed to provide learners with practical, hands-on skills to diagnose, repair, and maintain modern smartphones. Covering essential topics such as hardware component identification, troubleshooting common issues (e.g., cracked screens, battery failures), software recovery, and preventive maintenance, this course equips participants with the expertise needed to address real-world cellphone challenges. Delivered through engaging digital content, it emphasizes step-by-step guidance and accessibility, enabling learners to master repair techniques at their own pace.',
  instructor: {
    name: "Expert Mobile Repair Team",
    title: "Professional Smartphone Technicians",
    bio: "Expert team of mobile repair specialists with over 15 years of combined experience in smartphone diagnostics, hardware repair, and software troubleshooting across all major brands and models.",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  },
  level: 'beginner',
  duration: '8 weeks (12 hours/week)',
  students: 1892,
  rating: 4.8,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
  category: 'Technology',
  learningObjectives: [
    'Recognize and explain the functions of key smartphone components, including processors, batteries, displays, and circuit boards',
    'Diagnose common smartphone issues, such as hardware malfunctions, software glitches, or connectivity problems, using online diagnostic tools',
    'Perform hardware repairs, including screen replacements, battery swaps, camera repairs, and charging port fixes, with precision and safety',
    'Troubleshoot and resolve software issues, including operating system crashes, app malfunctions, and data recovery, using free or open-source tools',
    'Implement preventive maintenance techniques, such as cleaning connectors, optimizing software, and protecting devices, to enhance longevity',
    'Estimate repair costs and timelines accurately using digital resources and industry-standard pricing guides',
    'Apply professional repair practices, including safe handling of electronic components, customer communication, and documentation of repair processes'
  ],
  modules: [
    module1,
    module2,
    module3
  ]
};

export const cellphoneRepairsMarkdown = `
<full markdown content from CourseDocuments/Cellphone Repairs and Maintenance Version 3.md>
`;