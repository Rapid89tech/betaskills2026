import type { Module } from '@/types/course';
import { lesson1ToolsAndEquipment } from './lesson1-tools-and-equipment';
import { module2Quiz } from './quiz2';

const module2: Module = {
  id: 2,
  title: '✂️ Module 2: Tools and Equipment in Hairdressing',
  description: 'Master the essential tools including combs, brushes, scissors, razors, heat styling tools, and hygiene essentials',
  lessons: [
    lesson1ToolsAndEquipment,
    module2Quiz
  ]
};

export default module2;
