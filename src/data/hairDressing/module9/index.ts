import type { Module } from '@/types/course';
import { lesson1CurlingStraightening } from './lesson1-curling-straightening';
import { module9Quiz } from './quiz9';

const module9: Module = {
  id: 9,
  title: '💫 Module 9: Curling and Straightening',
  description: 'Master curling techniques with wands, irons, and rollers, achieve sleek straight hair, and understand temporary vs permanent styling',
  lessons: [
    lesson1CurlingStraightening,
    module9Quiz
  ]
};

export default module9;
