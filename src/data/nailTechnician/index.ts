import type { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';

export const nailTechnicianCourse: Course = {
  id: 'nail-technician',
  title: 'Master Nail Artistry: Professional Nail Technician Certification',
  description: 'Comprehensive online program covering nail anatomy, advanced manicure/pedicure techniques, gel and acrylic applications, nail art design, and salon management',
  thumbnail: '/images/courses/nail-technician.jpg',
  category: 'Beauty & Personal Care',
  level: 'Beginner to Intermediate',
  duration: '10 weeks',
  is_free: true,
  price: 0,
  currency: 'ZAR',
  students: 0,
  rating: 0,
  status: 'published',
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
    module7
  ],
  learningObjectives: [
    'Understand nail anatomy and physiology, identifying common nail disorders and maintaining client safety',
    'Master professional manicure and pedicure techniques, including cuticle care, shaping, and polishing',
    'Apply gel and acrylic nail enhancements with precision, ensuring durability and aesthetic appeal',
    'Create intricate nail art designs using tools like brushes, dotting tools, and stamping kits',
    'Implement hygiene and sanitation protocols compliant with health regulations',
    'Develop a business plan for a nail salon or freelance practice',
    'Utilize online tools to practice and showcase designs',
    'Obtain professional certification recognized in South Africa and internationally'
  ],
  instructor: {
    id: 'nail-technician-instructor',
    first_name: 'Professional Nail',
    last_name: 'Artistry Team',
    email: 'nailartistry@betaskills.com'
  }
};
