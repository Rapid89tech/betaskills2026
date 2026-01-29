import type { Module } from '@/types/course';
import { lesson1SitePrepGrading } from './lesson1-site-prep-grading';
import { lesson2InstallingPlants } from './lesson2-installing-plants';
import { lesson3PruningMowing } from './lesson3-pruning-mowing';
import { lesson4SeasonalMaintenance } from './lesson4-seasonal-maintenance';
import { lesson5WasteManagement } from './lesson5-waste-management';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: '🛠️ Module 5: Landscape Installation and Maintenance',
  description: 'Apply knowledge to real-world landscape construction and upkeep',
  lessons: [
    lesson1SitePrepGrading,
    lesson2InstallingPlants,
    lesson3PruningMowing,
    lesson4SeasonalMaintenance,
    lesson5WasteManagement,
    module5Quiz
  ]
};

export default module5;

