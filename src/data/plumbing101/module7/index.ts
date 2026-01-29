import type { Module } from '@/types/course';
import { lesson1PrinciplesOfWastewaterDrainage } from './lesson1-principles-of-wastewater-drainage';
import { lesson2InstallingTrapsAndVents } from './lesson2-installing-traps-and-vents';
import { lesson3BackflowPreventionMethods } from './lesson3-backflow-prevention-methods';
import { lesson4SewageSystemConnectionAndMaintenance } from './lesson4-sewage-system-connection-and-maintenance';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: '🚰 Module 7: Drainage, Waste, and Vent (DWV) Systems',
  description: 'Master wastewater drainage principles, trap and vent installation, backflow prevention, and sewage system connections and maintenance',
  lessons: [
    lesson1PrinciplesOfWastewaterDrainage,
    lesson2InstallingTrapsAndVents,
    lesson3BackflowPreventionMethods,
    lesson4SewageSystemConnectionAndMaintenance,
    module7Quiz
  ]
};

export default module7; 