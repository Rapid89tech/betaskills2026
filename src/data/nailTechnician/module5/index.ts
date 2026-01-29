import { Module } from '@/types/course';
import { lesson5_1 } from './lesson5_1';
import { lesson5_2 } from './lesson5_2';
import { quiz5 } from './quiz5';

export const module5: Module = {
  id: 5,
  title: 'Sanitation, Safety, and Client Consultation',
  description: 'Learn essential health and safety standards, proper sterilization protocols, and effective client consultation techniques',
  lessons: [
    lesson5_1,
    lesson5_2,
    {
      id: quiz5.id,
      title: quiz5.title,
      duration: '0:00',
      type: 'quiz',
      content: { questions: quiz5.questions }
    }
  ]
}; 