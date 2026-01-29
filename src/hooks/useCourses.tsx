import { useState, useEffect } from 'react';
import { Course } from '@/types/course';
import { comingSoonCourses } from '@/data/comingSoonCourses';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        
        // Updated course data - making requested courses available and removing specified ones
        const staticCourses: Course[] = [
          // 1. Entrepreneurship
          {
            id: 'entrepreneurship-final',
            title: 'Entrepreneurship',
            description: '"Entrepreneurship: Creating Your Business" is a comprehensive online course designed to empower aspiring entrepreneurs with the skills, mindset, and strategies needed to launch and sustain a successful business.',
            category: 'Business',
            level: 'intermediate',
            duration: '6 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 1247,
            rating: 4.8,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 2. AI and Human Relations
          {
            id: 'ai-human-relations',
            title: 'AI and Human Relations',
            description: 'Explore the intersection of artificial intelligence and human interaction, covering AI fundamentals, ethics, and workplace applications.',
            category: 'ICT',
            level: 'intermediate',
            duration: '8 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 680,
            rating: 4.9,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 3. Roofing
          {
            id: 'roofing101',
            title: 'Roofing',
            description: 'Comprehensive online course covering roofing design, installation, maintenance, and modern sustainable practices.',
            category: 'Construction and Civil',
            level: 'beginner',
            duration: '8-10 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 650,
            rating: 4.7,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 4. Plumbing
          {
            id: 'plumbing101',
            title: 'Plumbing',
            description: 'Comprehensive online course covering plumbing fundamentals, tools, systems, installation, and professional practices.',
            category: 'Construction and Civil',
            level: 'beginner',
            duration: '8-10 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 650,
            rating: 4.7,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 5. Tiling
          {
            id: 'tiling-101',
            title: 'Tiling 101',
            description: 'Mastering the Art & Science of Tiling is a comprehensive online course designed to equip learners with the knowledge, skills, and techniques needed to excel in professional and DIY tiling projects.',
            category: 'Construction and Civil',
            level: 'beginner',
            duration: '6 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 425,
            rating: 4.7,
            instructor: { id: 'betaskilltutor', first_name: 'Expert', last_name: 'Instructor', email: 'instructor@betaskill.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 6. Hair Dressing
          {
            id: 'hair-dressing',
            title: 'Hair Dressing',
            description: 'Professional hair styling, cutting, coloring, and salon management training for beauty industry careers.',
            category: 'Health and Beauty',
            level: 'beginner',
            duration: '12 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 850,
            rating: 4.6,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 7. Nail Technician
          {
            id: 'nail-technician',
            title: 'Nail Technician',
            description: 'Learn nail care, art, and extension techniques to become a certified nail technician.',
            category: 'Health and Beauty',
            level: 'beginner',
            duration: '6 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 850,
            rating: 4.6,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 8. Motor Mechanic (Petrol)
          {
            id: 'motor-mechanic-petrol-02',
            title: 'Petrol Motor Mechanic',
            description: 'The Petrol Engine Mechanics course is a comprehensive, online training program designed to empower aspiring and experienced mechanics.',
            category: 'Automotive',
            level: 'intermediate',
            duration: '8 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 856,
            rating: 4.7,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 9. Motor Mechanic (Diesel)
          {
            id: 'motor-mechanic-diesel',
            title: 'Diesel Motor Mechanic',
            description: 'This engaging online course, Diesel Mechanic Mastery: Comprehensive Online Training, equips learners with the knowledge and skills to excel.',
            category: 'Automotive',
            level: 'intermediate',
            duration: '10 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 425,
            rating: 4.8,
            instructor: { id: 'betaskilltutor', first_name: 'Expert', last_name: 'Instructor', email: 'instructor@betaskill.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 10. Landscaping
          {
            id: 'landscaping101',
            title: 'Landscaping',
            description: 'Comprehensive online course covering landscaping fundamentals, design principles, plant and soil management, hardscaping, installation techniques, sustainable practices, and business operations.',
            category: 'Construction and Trades',
            level: 'beginner',
            duration: '8-10 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 1150,
            rating: 4.8,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 11. Social Media Marketing 101
          {
            id: 'social-media-marketing-101',
            title: 'Social Media Marketing 101',
            description: 'Comprehensive online course covering social media marketing fundamentals, platform strategies, content creation, paid advertising, analytics, and advanced tactics. Master Instagram, TikTok, LinkedIn, and emerging platforms.',
            category: 'Digital Marketing',
            level: 'beginner',
            duration: '10-12 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 850,
            rating: 4.8,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          // 12. Master Electrician Online
          {
            id: 'electrician101',
            title: 'Master Electrician Online',
            description: 'Comprehensive Training for Electrical Expertise. Master electrical installations, safety protocols, troubleshooting, and NEC standards for residential, commercial, and industrial settings.',
            category: 'Construction and Trades',
            level: 'beginner',
            duration: '14-16 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 1450,
            rating: 4.9,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          {
            id: 'solar101',
            title: 'Solar Energy Systems: Installation & Maintenance',
            description: 'Comprehensive training in solar PV technology covering photovoltaic system components, design principles, installation procedures, maintenance practices, safety protocols, and compliance standards.',
            category: 'Renewable Energy',
            level: 'beginner',
            duration: '14-16 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 2850,
            rating: 4.9,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          },
          {
            id: 'carpentry101',
            title: 'Carpentry',
            description: 'Comprehensive carpentry training covering hand tools, power tools, wood properties, joinery techniques, assembly methods, finishing, furniture making, cabinet making, and professional business skills for a successful carpentry career.',
            category: 'Skilled Trades',
            level: 'beginner',
            duration: '12-14 weeks',
            is_free: false,
            price: 290,
            currency: 'ZAR',
            students: 1850,
            rating: 4.8,
            instructor: { id: 'betaskilltutor', first_name: 'Beta Skill', last_name: 'Tutor', email: 'betaskilltraining@gmail.com' },
            status: 'approved', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), available: true
          }
        ];

        // Add coming soon courses
        const allCourses = [...staticCourses, ...comingSoonCourses];
        
        // Set instructor and missing properties for all courses
        allCourses.forEach(course => {
          if (course.isComingSoon) {
            course.available = false;
            course.status = 'approved';
            course.created_at = course.created_at || new Date().toISOString();
            course.updated_at = course.updated_at || new Date().toISOString();
            course.is_free = false;
            course.currency = 'ZAR';
            course.students = 0;
            course.rating = 5.0;
          }
        });

        setCourses(allCourses);
        setLoading(false);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return { courses, loading, error };
};

export type { Course };