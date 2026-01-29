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
import { hairDressingCertificate } from './certificate';

export const hairDressingCourse: Course = {
  id: 'hair-dressing',
  title: 'Hair Dressing 101',
  description: 'This comprehensive online course delves deeply into the art and science of hair dressing, providing a structured pathway for learners to develop professional-level expertise from the comfort of their homes. Starting with foundational knowledge such as hair anatomy, types, and textures, the course progresses to hands-on techniques including precision cutting, advanced coloring, perming, relaxing, and creative styling for diverse hair types and cultural preferences. You\'ll explore critical topics like client communication, salon management, product knowledge, and emerging trends influenced by global fashion, social media, and sustainability. Through interactive modules, virtual reality simulations, and real-world case studies, participants will learn to handle various scenarios, from everyday maintenance to high-fashion editorial looks, while emphasizing ethical practices like inclusivity for all hair textures (e.g., curly, coily, straight) and safe chemical handling. The course\'s flexible, self-paced format ensures accessibility for global learners, allowing you to balance studies with work or personal commitments, and culminates in building a professional portfolio that can kickstart your career or enhance your personal beauty routine.',
  instructor: {
    name: "Expert Hair Styling Team",
    title: "Professional Hair Dressing Instructors",
    bio: "Expert team of hair dressing professionals with over 20 years of combined experience in cutting, coloring, styling, and salon management across diverse hair types and cultural styles.",
    avatar: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=150&h=150&fit=crop&crop=face"
  },
  level: 'beginner',
  duration: '12 weeks (8 hours/week)',
  students: 3247,
  rating: 4.9,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
  category: 'Beauty',
  learningObjectives: [
    'Identify and explain the detailed structure of hair (including follicles, cuticles, and cortex), common scalp conditions (e.g., dandruff, alopecia), and how environmental factors like humidity or pollution affect hair health, enabling informed decision-making in styling practices',
    'Demonstrate proficiency in selecting and using a wide range of tools and equipment, such as professional shears, clippers, curling irons, flat irons, sectioning clips, and specialized brushes, through guided video tutorials and interactive online simulations that mimic real salon environments',
    'Master fundamental and intermediate techniques, including shampooing, deep conditioning, precision cutting methods (e.g., point cutting, razor cuts, layered bobs), and basic to advanced coloring processes like root touch-ups, ombre, and foiling, utilizing digital color wheels and virtual try-on apps for accurate previews',
    'Create and execute a diverse array of hairstyles, from protective styles like twists and locs for textured hair to elegant updos, beach waves, sleek ponytails, and occasion-specific looks (e.g., bridal, prom, or red-carpet), by following detailed step-by-step instructions and submitting practice evidence for feedback',
    'Conduct effective virtual client consultations, analyzing factors such as face shape, skin tone, hair density, lifestyle, and personal preferences to recommend customized solutions, including adaptations for diverse ethnicities and gender identities',
    'Apply comprehensive hygiene, safety, and sustainability principles, such as sterilizing tools with autoclaves or UV lights, adhering to OSHA standards, selecting vegan and cruelty-free products, and minimizing waste through eco-friendly practices like water conservation in virtual salon setups',
    'Develop business acumen by learning to manage a hair dressing operation, including inventory tracking, budgeting for supplies, client scheduling via online apps, and marketing strategies using social media analytics to stay ahead of trends like "clean beauty" or "no-heat styling"',
    'Build, curate, and present a professional digital portfolio using platforms like Behance or Google Sites, incorporating before-and-after photos, video demos, and client testimonials to showcase skills for job applications, freelance gigs, or social media branding',
    'Evaluate and adapt to current and emerging hair trends by analyzing digital resources such as industry reports from WGSN, social media data from tools like Google Trends, and cultural influences (e.g., K-beauty or Afrocentric styles), ensuring versatile and inclusive styling approaches',
    'Troubleshoot common hair dressing challenges, such as color corrections, damage repair, or styling resistant hair types, using problem-solving frameworks and online diagnostic tools to achieve optimal results'
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

export const hairDressingMarkdown = `
<full markdown content from CourseDocuments/Hair Dressing Volume 3.md>
`;