import type { Module } from '@/types/course';
import { lesson1InstallingCommonFixtures } from './lesson1-installing-common-fixtures';
import { lesson2ConnectingWaterHeatersAndBoilers } from './lesson2-connecting-water-heaters-and-boilers';
import { lesson3SettingUpDishwashersAndWashingMachines } from './lesson3-setting-up-dishwashers-and-washing-machines';
import { lesson4LeakDetectionAndPrevention } from './lesson4-leak-detection-and-prevention';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: '🚰 Module 6: Fixtures and Appliances Installation',
  description: 'Master installing sinks, faucets, toilets, showers, water heaters, boilers, dishwashers, washing machines, and leak detection methods',
  lessons: [
    lesson1InstallingCommonFixtures,
    lesson2ConnectingWaterHeatersAndBoilers,
    lesson3SettingUpDishwashersAndWashingMachines,
    lesson4LeakDetectionAndPrevention,
    module6Quiz
  ]
};

export default module6; 