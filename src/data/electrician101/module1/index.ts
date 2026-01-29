import type { Module } from '@/types/course';
import { lesson1ElectricianProfession } from './lesson1-electrician-profession';
import { lesson2TypesOfElectricians } from './lesson2-types-of-electricians';
import { lesson3ToolsAndEquipment } from './lesson3-tools-and-equipment';
import { lesson4SkillsAndTraits } from './lesson4-skills-and-traits';
import { lesson5TrainingAndCertification } from './lesson5-training-and-certification';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: '⚡ Module 1: Introduction to the Electrical Trade',
  description: 'Learn the fundamentals of the electrical trade, career opportunities, types of electricians, essential tools, and professional development pathways',
  lessons: [
    lesson1ElectricianProfession,
    lesson2TypesOfElectricians,
    lesson3ToolsAndEquipment,
    lesson4SkillsAndTraits,
    lesson5TrainingAndCertification,
    module1Quiz
  ]
};

export default module1;

