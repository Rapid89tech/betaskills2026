import type { Module } from '@/types/course';
import { lesson1EssentialTools } from './lesson1-essential-tools';
import { lesson2TestingEquipment } from './lesson2-testing-equipment';
import { lesson3WorkspaceOrganization } from './lesson3-workspace-organization';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: 'Module 2: Tools and Equipment',
  description: 'Essential repair tools, testing equipment, and workspace organization for professional smartphone repair.',
  lessons: [
    lesson1EssentialTools,
    lesson2TestingEquipment,
    lesson3WorkspaceOrganization,
    module2Quiz
  ]
};

export default module2;
