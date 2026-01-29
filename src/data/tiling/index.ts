
import type { Course } from '@/types/course';
import { module1IntroductionToTiling } from './module1-introductionToTiling';
import { module2SurfacePreparationAndLayout } from './module2-surfacePreparationAndLayout';
import { module3TileInstallationTechniques } from './module3-tileInstallationTechniques';
import { module4GroutingAndFinishing } from './module4-groutingAndFinishing';
import { module5SpecializedApplications } from './module5-specializedApplications';

export const tilingMarkdown = `
<full markdown content from CourseDocuments/Tiling Version 03.docx.md>
`;

export const tilingCourse: Course = {
  id: 'tiling-course',
  title: 'Professional Tiling',
  description: `Professional Tiling is a comprehensive online course designed to provide learners with essential knowledge and practical skills in ceramic, porcelain, and natural stone tile installation. This course covers fundamental tiling principles, surface preparation, layout techniques, and finishing procedures required for professional tiling work.

Through detailed video demonstrations, interactive simulations, and hands-on projects, students will learn to install, repair, and maintain various tiling systems for floors, walls, and specialized applications. The course emphasizes safety standards, building codes, and professional best practices while preparing learners for real-world tiling scenarios.

Whether you're beginning a career in tiling, enhancing existing skills, or pursuing professional certification, this course provides the foundation for success in the tiling industry.`,
  instructor: {
    name: 'Carlos Martinez',
    title: 'Master Tile Setter and Educator',
    bio: 'Licensed master tile setter with 16+ years of experience in residential and commercial tiling, specializing in modern tiling techniques and artistic installations.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  level: 'beginner',
  duration: '10 weeks (5-6 hours/week)',
  students: 634,
  rating: 4.4,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  category: 'Construction',
  learningObjectives: [
    'Understand fundamental tiling principles and material properties',
    'Master surface preparation and layout techniques',
    'Learn to work with various tiling tools and equipment',
    'Develop skills in tile cutting and installation methods',
    'Acquire knowledge of tiling codes and safety regulations',
    'Gain proficiency in grouting and finishing procedures',
    'Learn troubleshooting and maintenance techniques',
    'Prepare for professional tiling certification and licensing'
  ],
  modules: [
    module1IntroductionToTiling,
    module2SurfacePreparationAndLayout,
    module3TileInstallationTechniques,
    module4GroutingAndFinishing,
    module5SpecializedApplications
  ]
};
