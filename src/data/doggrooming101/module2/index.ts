import type { Module } from '@/types/course';
import lesson1 from './lesson1-dog-anatomy';
import lesson2 from './lesson2-dog-behaviors-communication';
import lesson3 from './lesson3-breed-specific-needs';
import lesson4 from './lesson4-building-trust-rapport';
import quiz from './quiz';

const module2: Module = {
  id: 2,
  title: '🚐 Module 2: Canine Anatomy & Behavior Basics',
  description: 'Learn about dog anatomy, common behaviors, communication signals, breed-specific needs, and how to build trust and rapport with dogs.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module2;

