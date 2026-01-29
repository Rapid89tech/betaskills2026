import type { Module } from '@/types/course';
import { lesson1WorkingAtHeightsFallProtectionSystems } from './lesson1-working-at-heights-fall-protection-systems';
import { lesson2OshaStandardsAndLocalCodes } from './lesson2-osha-standards-and-local-codes';
import { lesson3LadderSafetyAndScaffolding } from './lesson3-ladder-safety-and-scaffolding';
import { lesson4WeatherConsiderationsForWorkingAtHeights } from './lesson4-weather-considerations-for-working-at-heights';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: '🛡️ Module 8: Roofing Safety and Regulations',
  description: 'Master fall protection systems, OSHA compliance, ladder safety, scaffolding, and weather considerations for safe roofing operations',
  lessons: [
    lesson1WorkingAtHeightsFallProtectionSystems,
    lesson2OshaStandardsAndLocalCodes,
    lesson3LadderSafetyAndScaffolding,
    lesson4WeatherConsiderationsForWorkingAtHeights,
    module8Quiz
  ]
};

export default module8;