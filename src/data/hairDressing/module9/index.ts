import { Module } from '@/types/course';
import { lesson9_1 } from './lesson9_1';
import { quiz9 } from './quiz9';

export const module9: Module = {
  id: 9,
  title: 'Curling and Straightening',
  description: 'Master various curling techniques using wands, rollers, and irons, plus achieving sleek straight hair with temporary and permanent styling options',
  lessons: [
    lesson9_1,
    quiz9
  ]
}; 