import type { Module } from '@/types/course';
import lesson1 from './lesson1-ppe';
import lesson2 from './lesson2-electrical-fire-safety';
import lesson3 from './lesson3-permits-regulations';
import lesson4 from './lesson4-standards';
import lesson5 from './lesson5-environmental-ethics';
import quiz from './quiz';

const module7: Module = {
  id: 7,
  title: 'Safety and Compliance',
  description: 'Master safety protocols, PPE requirements, electrical and fire safety, permitting procedures, industry standards, and environmental and ethical practices in solar installations.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
  quiz
};

export default module7;

