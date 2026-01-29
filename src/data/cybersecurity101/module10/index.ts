import type { Module } from '@/types/course';
import lesson1 from './lesson1-why-choose-a-career-in-cybersecurity';
import lesson2 from './lesson2-popular-cybersecurity-career-paths';
import lesson3 from './lesson3-cybersecurity-certifications';
import quiz from './quiz';

const module10: Module = {
  id: 10,
  title: '💼 Module 10: Careers in Cybersecurity and Certification Pathways',
  description: 'Explore cybersecurity career opportunities, popular career paths, certification pathways, and salary expectations in the field.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz
  ]
};

export default module10;
