import type { Module } from '@/types/course';
import { lesson1ElectricalPPE } from './lesson1-electrical-ppe';
import { lesson2ElectricalHazards } from './lesson2-electrical-hazards';
import { lesson3LockoutTagout } from './lesson3-lockout-tagout';
import { lesson4OSHAStandards } from './lesson4-osha-standards';
import { lesson5ArcFlashSafety } from './lesson5-arc-flash-safety';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: '⚠️ Module 2: Electrical Safety and OSHA Standards',
  description: 'Master essential safety protocols, PPE requirements, lockout/tagout procedures, OSHA standards, and arc flash protection',
  lessons: [
    lesson1ElectricalPPE,
    lesson2ElectricalHazards,
    lesson3LockoutTagout,
    lesson4OSHAStandards,
    lesson5ArcFlashSafety,
    module2Quiz
  ]
};

export default module2;

