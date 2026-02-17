import type { Module } from '@/types/course';
import { lesson1ClientConsultationBusiness } from './lesson1-client-consultation-business';
import { module12Quiz } from './quiz12';

const module12: Module = {
  id: 12,
  title: '💼 Module 12: Client Consultation and Business Skills',
  description: 'Master client consultations, style recommendations, managing client concerns, and essential business skills for salon success',
  lessons: [
    lesson1ClientConsultationBusiness,
    module12Quiz
  ]
};

export default module12;
