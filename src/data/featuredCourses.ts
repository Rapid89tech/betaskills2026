import { UnifiedCourse, COURSE_CATEGORIES } from '@/types/unifiedCourse';

/**
 * Featured Courses Data
 * This file contains the curated list of featured courses with complete data structure
 * All courses are validated against the UnifiedCourse interface
 */

// Raw featured courses data with proper structure
const rawFeaturedCourses = [
  {
    id: 'computer-repairs',
    title: 'Computer & Laptop Repairs',
    instructor: 'Beta Skill Tutor',
    rating: 4.9,
    students: 1247,
    duration: '8 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Intermediate',
    description: 'Learn computer repair and maintenance skills for a career in IT support.',
    category: 'ICT',
    courseId: 'computer-repairs'
  },
  {
    id: 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5',
    title: 'Sound Engineering',
    instructor: 'David Martinez',
    rating: 4.8,
    students: 892,
    duration: '12 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Intermediate',
    description: 'Master the art of sound engineering and audio production.',
    category: 'Film & Broadcasting',
    courseId: 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5'
  },
  {
    id: 'entrepreneurship-final',
    title: 'Entrepreneurship',
    instructor: 'Beta Skill Tutor',
    rating: 4.7,
    students: 1567,
    duration: '6 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Beginner',
    description: 'Start your own business with proven entrepreneurial strategies.',
    category: 'Business',
    courseId: 'entrepreneurship-final'
  },
  {
    id: 'podcast-management',
    title: 'Podcast Management',
    instructor: 'Sarah Johnson',
    rating: 4.6,
    students: 734,
    duration: '10 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Beginner',
    description: 'Create and manage successful podcasts from concept to distribution.',
    category: 'Film & Broadcasting',
    courseId: 'podcast-management'
  },
  {
    id: 'ai-assisted-programming',
    title: 'AI Assisted Programming',
    instructor: 'Beta Skill Tutor',
    rating: 4.8,
    students: 1850,
    duration: '10 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Intermediate',
    description: 'Learn to integrate AI tools into software development workflow with ChatGPT, GitHub Copilot, and other AI coding assistants.',
    category: 'ICT',
    courseId: 'ai-assisted-programming'
  },
  {
    id: 'ai-assisted-web-development',
    title: 'AI-Assisted Web Development',
    instructor: 'Beta Skill Tutor',
    rating: 4.9,
    students: 2156,
    duration: '10 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Intermediate',
    description: 'Master AI-powered web development with tools like GitHub Copilot, AI website builders, and modern web technologies.',
    category: 'ICT',
    courseId: 'ai-assisted-web-development'
  },
  {
    id: 'christian-teacher',
    title: 'Christian Teacher Training Course',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    students: 1250,
    duration: '10 weeks',
    price: 0,
    image: '/courses-hero-bg.png',
    level: 'Intermediate',
    description: 'Equip yourself to teach from a Christian worldview, integrating biblical principles into teaching and discipling students.',
    category: 'Religion',
    courseId: 'christian-teacher'
  },
  {
    id: 'ai-human-relations',
    title: 'AI and Human Relations',
    instructor: 'Beta Skill Tutor',
    rating: 4.9,
    students: 680,
    duration: '8 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Intermediate',
    description: 'Explore the intersection of artificial intelligence and human interaction, covering AI fundamentals, ethics, and workplace applications.',
    category: 'ICT',
    courseId: 'ai-human-relations'
  },
  {
    id: 'roofing101',
    title: 'Professional Roofing',
    instructor: 'Beta Skill Tutor',
    rating: 4.7,
    students: 650,
    duration: '8 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Beginner',
    description: 'Comprehensive online course covering roofing design, installation, maintenance, and modern sustainable practices.',
    category: 'Construction and Civil',
    courseId: 'roofing101'
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence',
    instructor: 'EI Specialists',
    rating: 4.9,
    students: 0,
    duration: '8-10 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Beginner',
    description: 'Master the art of understanding and managing emotions to enhance your personal and professional life. This comprehensive course covers the five key components of emotional intelligence: self-awareness, self-regulation, motivation, empathy, and social skills.',
    category: 'Personal Development',
    courseId: 'emotional-intelligence'
  },
  {
    id: 'prophet',
    title: 'Prophet',
    instructor: 'Beta Skill Tutor',
    rating: 4.9,
    students: 0,
    duration: '8-10 weeks',
    price: 290,
    image: '/courses-hero-bg.png',
    level: 'Intermediate',
    description: 'Prophetic Ministry Training Course: Hearing, Speaking, and Living God\'s Voice. This course is designed for believers who are called to operate in the office of a prophet or function in prophetic ministry.',
    category: 'Religion',
    courseId: 'prophet'
  },


];

/**
 * Validate and normalize course category
 */
function validateCategory(category: string): string {
  // Check if category exists in predefined categories
  if (Object.values(COURSE_CATEGORIES).includes(category as any)) {
    return category;
  }
  
  // Fallback to Professional Services if category is not found
  console.warn(`Category "${category}" not found in COURSE_CATEGORIES, using fallback`);
  return 'Professional Services';
}

/**
 * Validate course data structure
 */
function validateCourseData(course: any): boolean {
  const requiredFields = ['id', 'title', 'description', 'category', 'level', 'duration', 'instructor'];
  
  for (const field of requiredFields) {
    if (!course[field]) {
      console.error(`Missing required field "${field}" in course:`, course.title || course.id);
      return false;
    }
  }
  
  if (typeof course.price !== 'number' || course.price < 0) {
    console.error(`Invalid price for course:`, course.title || course.id);
    return false;
  }
  
  if (typeof course.rating !== 'number' || course.rating < 0 || course.rating > 5) {
    console.error(`Invalid rating for course:`, course.title || course.id);
    return false;
  }
  
  return true;
}

// Convert to UnifiedCourse format with validation
export const featuredCourses: UnifiedCourse[] = rawFeaturedCourses
  .filter(course => validateCourseData(course))
  .map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    category: validateCategory(course.category),
    level: course.level,
    duration: course.duration,
    price: course.price,
    currency: 'ZAR',
    instructor: course.instructor,
    rating: course.rating,
    students: course.students,
    image: course.image,
    isComingSoon: false,
    available: true,
    courseId: course.courseId // Backward compatibility
  }));

/**
 * Get all unique categories from featured courses
 */
export const getFeaturedCourseCategories = (): string[] => {
  const categories = featuredCourses.map(course => course.category);
  const uniqueCategories: string[] = [];
  
  categories.forEach(category => {
    if (!uniqueCategories.includes(category)) {
      uniqueCategories.push(category);
    }
  });
  
  return uniqueCategories.sort();
};

/**
 * Get courses by category
 */
export const getCoursesByCategory = (category: string): UnifiedCourse[] => {
  return featuredCourses.filter(course => course.category === category);
};

/**
 * Get free courses
 */
export const getFreeCourses = (): UnifiedCourse[] => {
  return featuredCourses.filter(course => course.price === 0);
};

/**
 * Get paid courses
 */
export const getPaidCourses = (): UnifiedCourse[] => {
  return featuredCourses.filter(course => course.price > 0);
};

/**
 * Search courses by title or description
 */
export const searchCourses = (query: string): UnifiedCourse[] => {
  const lowercaseQuery = query.toLowerCase();
  return featuredCourses.filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get course by ID (supports both id and courseId for backward compatibility)
 */
export const getCourseById = (id: string): UnifiedCourse | undefined => {
  return featuredCourses.find(course => course.id === id || course.courseId === id);
};

export default featuredCourses;
