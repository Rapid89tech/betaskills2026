import type { Module } from '@/types/course';
import lesson1 from './lesson1-anatomy-physiology';
import lesson2 from './lesson2-skin-structure-function';
import lesson3 from './lesson3-skin-conditions-disorders';
import lesson4 from './lesson4-hair-nail-structure';
import quiz from './quiz';

const module2: Module = {
  id: 2,
  title: '🧬 Module 2: Anatomy and Physiology for Beauty Therapy',
  description: 'Learn essential anatomy and physiology knowledge including skin structure and function, common skin conditions and disorders, and hair and nail anatomy for safe and effective beauty treatments.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module2;


