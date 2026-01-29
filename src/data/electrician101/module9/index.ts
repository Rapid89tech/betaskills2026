import type { Module } from '@/types/course';
import { lesson1MotorFundamentals } from './lesson1-motor-fundamentals';
import { lesson2MotorTypes } from './lesson2-motor-types';
import { lesson3MotorControls } from './lesson3-motor-controls';
import { lesson4MotorInstallation } from './lesson4-motor-installation';
import { module9Quiz } from './quiz';

const module9: Module = {
  id: 9,
  title: '⚙️ Module 9: Motors and Motor Controls',
  description: 'Master electric motors, motor types, control systems, starters, VFDs, and motor installation procedures',
  lessons: [
    lesson1MotorFundamentals,
    lesson2MotorTypes,
    lesson3MotorControls,
    lesson4MotorInstallation,
    module9Quiz
  ]
};

export default module9;

