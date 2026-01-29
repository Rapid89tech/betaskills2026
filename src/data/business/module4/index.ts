import { lesson1BusinessStructures } from './lesson1-business-structures';
import { lesson2BusinessRegistration } from './lesson2-business-registration';
import type { Module } from '@/types/course';

export const module4: Module = {
  id: 4,
  title: 'Legal Considerations and Business Structure',
  description: 'Understand different business structures, legal requirements, and compliance obligations to establish a solid legal foundation for your business.',
  lessons: [
    lesson1BusinessStructures,
    lesson2BusinessRegistration
  ]
}; 