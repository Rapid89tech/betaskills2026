import { Module } from '../../../types/course';
import lesson1BasicsOfTileMaterials from './lesson1-basics-of-tile-materials';
import lesson2ToolsAndEquipment from './lesson2-tools-and-equipment';
import lesson3SurfacePreparationBasics from './lesson3-surface-preparation-basics';
import lesson4Quiz from './lesson4-quiz';

export const module1: Module = {
  id: 1,
  title: 'Introduction to Tiling',
  description: 'This comprehensive module introduces the fundamentals of tiling, covering essential tile materials, tools and equipment, and surface preparation basics. Students will gain a clear understanding of different tile types, learn to select and maintain essential tools, and master the critical importance of proper surface preparation for successful tile installations.',
  lessons: [
    lesson1BasicsOfTileMaterials,
    lesson2ToolsAndEquipment,
    lesson3SurfacePreparationBasics,
    lesson4Quiz,
  ],
};