import { HardHat, Smartphone, Wrench, Palette, Car, Hammer, Scissors, Zap, Briefcase, BookOpen, Flower, Share2 } from 'lucide-react';

export const categories = [
  {
    id: 1,
    title: 'Roofing',
    icon: HardHat,
    description: 'Master professional roofing techniques and installations',
    courses: 1,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    courseId: 'roofing101'
  },
  {
    id: 2,
    title: 'Plumbing',
    icon: Wrench,
    description: 'Professional plumbing training covering residential and commercial systems',
    courses: 1,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    courseId: 'plumbing101'
  },
  {
    id: 3,
    title: 'Tiling 101',
    icon: HardHat,
    description: 'Master professional tiling techniques and bathroom installations',
    courses: 1,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    courseId: 'tiling-101'
  },
  {
    id: 4,
    title: 'Cellphone Repairs and Maintenance',
    icon: Smartphone,
    description: 'Learn smartphone diagnostics, repairs and maintenance',
    courses: 1,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    courseId: 'cellphone-repairs-101'
  },
  {
    id: 5,
    title: 'Nail Technician',
    icon: Palette,
    description: 'Professional nail care, design and salon techniques',
    courses: 1,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    courseId: 'nail-technician'
  },
  {
    id: 6,
    title: 'Petrol Motor Mechanic',
    icon: Car,
    description: 'Petrol engine diagnostics, repair and maintenance',
    courses: 1,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    courseId: 'motor-mechanic-petrol-02'
  },
  {
    id: 7,
    title: 'Diesel Motor Mechanic',
    icon: Car,
    description: 'Diesel engine systems and advanced repairs',
    courses: 1,
    color: 'from-gray-600 to-gray-800',
    bgColor: 'bg-gray-50',
    courseId: 'motor-mechanic-diesel'
  },
  {
    id: 8,
    title: 'Hair Dressing',
    icon: Scissors,
    description: 'Complete hair styling, cutting and coloring techniques',
    courses: 1,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    courseId: 'hair-dressing'
  },
  {
    id: 9,
    title: 'Podcast Management',
    icon: Briefcase,
    description: 'Learn to create, manage and grow successful podcasts',
    courses: 1,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    courseId: 'podcast-management-101'
  },
  {
    id: 10,
    title: 'Sound Engineering',
    icon: Zap,
    description: 'Master audio production, recording and mixing techniques',
    courses: 1,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50',
    courseId: 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5'
  },
  {
    id: 11,
    title: 'Computer Repairs',
    icon: Zap,
    description: 'Master computer hardware and software troubleshooting',
    courses: 1,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    courseId: 'computer-repairs'
  },
  {
    id: 12,
    title: 'Bricklaying & Plastering',
    icon: Hammer,
    description: 'Construction skills for building and renovation',
    courses: 11,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    courseId: 'bricklaying-plastering-course'
  },
  {
    id: 13,
    title: 'Electrician',
    icon: Zap,
    description: 'Electrical installation, wiring and safety systems',
    courses: 20,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50',
    courseId: 'electrician-course'
  },
  {
    id: 14,
    title: 'Business',
    icon: Briefcase,
    description: 'Entrepreneurship, business planning and management skills',
    courses: 6,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    courseId: 'business'
  },
  {
    id: 15,
    title: 'AI Assisted Programming',
    icon: Zap,
    description: 'Learn to integrate AI tools into software development workflow',
    courses: 1,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
    courseId: 'ai-assisted-programming'
  },
  {
    id: 16,
    title: 'AI-Assisted Web Development',
    icon: Zap,
    description: 'Master AI-powered web development with modern tools and technologies',
    courses: 1,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    courseId: 'ai-assisted-web-development'
  },
  {
    id: 17,
    title: 'Religion',
    icon: BookOpen,
    description: 'Christian education, teaching, and spiritual development courses',
    courses: 1,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    courseId: 'christian-teacher'
  },
  {
    id: 18,
    title: 'Landscaping',
    icon: Flower,
    description: 'Master landscaping fundamentals, design principles, and sustainable practices',
    courses: 1,
    color: 'from-green-500 to-lime-600',
    bgColor: 'bg-green-50',
    courseId: 'landscaping101'
  },
  {
    id: 19,
    title: 'Social Media Marketing 101',
    icon: Share2,
    description: 'Master social media marketing, content creation, and platform strategies',
    courses: 1,
    color: 'from-blue-500 to-purple-600',
    bgColor: 'bg-blue-50',
    courseId: 'social-media-marketing-101'
  },
  {
    id: 20,
    title: 'Master Electrician Online',
    icon: Zap,
    description: 'Comprehensive electrical training covering installations, safety, NEC standards, and troubleshooting',
    courses: 1,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    courseId: 'electrician101'
  },
  {
    id: 21,
    title: 'Solar Energy Systems: Installation & Maintenance',
    icon: Sun,
    description: 'Master solar PV technology, system design, installation, maintenance, safety protocols, and compliance standards',
    courses: 1,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-50',
    courseId: 'solar101'
  },
  {
    id: 22,
    title: 'Carpentry',
    icon: Hammer,
    description: 'Comprehensive carpentry training covering hand tools, power tools, joinery, furniture making, cabinet making, and professional business skills',
    courses: 1,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    courseId: 'carpentry101'
  }
];
