import type { Module } from '@/types/course';
import { lesson1HygieneSanitation } from './lesson1-hygiene-sanitation';
import { module5Quiz } from './quiz5';

const module5: Module = {
  id: 5,
  title: '🧼 Module 5: Hygiene, Sanitation, and Safety Protocols',
  description: 'Master essential hygiene and sanitation practices, understand infection prevention, proper disinfection procedures, and legal compliance requirements',
  lessons: [
    lesson1HygieneSanitation,
    module5Quiz
  ]
};

export default module5;
