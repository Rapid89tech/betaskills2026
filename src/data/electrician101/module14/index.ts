import type { Module } from '@/types/course';
import { lesson1ExamPreparation } from './lesson1-exam-preparation';
import { lesson2LicensingRequirements } from './lesson2-licensing-requirements';
import { lesson3PracticeExam } from './lesson3-practice-exam';
import { lesson4CareerDevelopment } from './lesson4-career-development';
import { module14Quiz } from './quiz';

const module14: Module = {
  id: 14,
  title: '🎓 Module 14: Exam Preparation and Licensing',
  description: 'Prepare for electrician licensing exams, understand licensing requirements, take practice exams, and plan career development',
  lessons: [
    lesson1ExamPreparation,
    lesson2LicensingRequirements,
    lesson3PracticeExam,
    lesson4CareerDevelopment,
    module14Quiz
  ]
};

export default module14;

