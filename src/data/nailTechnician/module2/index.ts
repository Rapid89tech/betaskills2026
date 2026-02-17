import type { Module } from '@/types/course';
import { lesson1ManicuresPedicures } from './lesson1-manicures-pedicures';
import { module2Quiz } from './quiz2';

const module2: Module = {
  id: 2,
  title: '💅 Module 2: Professional Manicure and Pedicure Techniques',
  description: 'Master the art of professional manicures and pedicures, including preparation, cuticle care, shaping, polishing, and client comfort',
  lessons: [
    lesson1ManicuresPedicures,
    module2Quiz
  ]
};

export default module2;
