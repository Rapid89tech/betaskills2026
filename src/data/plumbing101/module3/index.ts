import type { Module } from '@/types/course';
import { lesson1PersonalProtectiveEquipment } from './lesson1-personal-protective-equipment';
import { lesson2SafeHandlingOfToolsAndMaterials } from './lesson2-safe-handling-of-tools-and-materials';
import { lesson3CommonHazardsAndRiskPrevention } from './lesson3-common-hazards-and-risk-prevention';
import { lesson4ConfinedSpacesAndTrenchingSafety } from './lesson4-confined-spaces-and-trenching-safety';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: '🦺 Module 3: Health and Safety in Plumbing Work',
  description: 'Master personal protective equipment, safe tool handling, hazard identification, and safety protocols for confined spaces and trenching',
  lessons: [
    lesson1PersonalProtectiveEquipment,
    lesson2SafeHandlingOfToolsAndMaterials,
    lesson3CommonHazardsAndRiskPrevention,
    lesson4ConfinedSpacesAndTrenchingSafety,
    module3Quiz
  ]
};

export default module3; 