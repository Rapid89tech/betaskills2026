import type { Module } from '@/types/course';
import { lesson1HandToolsInRoofingAndConstruction } from './lesson1-hand-tools-in-roofing-and-construction';
import { lesson2PowerToolsInRoofingAndConstruction } from './lesson2-power-tools-in-roofing-and-construction';
import { lesson3SafetyGearInRoofing } from './lesson3-safety-gear-in-roofing';
import { lesson4MaintenanceAndSafeUseOfTools } from './lesson4-maintenance-and-safe-use-of-tools';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: '🛠️ Module 2: Roofing Tools and Equipment',
  description: 'Master hand tools, power tools, safety gear, and proper maintenance for professional roofing work',
  lessons: [
    lesson1HandToolsInRoofingAndConstruction,
    lesson2PowerToolsInRoofingAndConstruction,
    lesson3SafetyGearInRoofing,
    lesson4MaintenanceAndSafeUseOfTools,
    module2Quiz
  ]
};

export default module2; 