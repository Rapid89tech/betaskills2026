import type { Module } from '@/types/course';
import { lesson1OverviewOfFlatRoofSystems } from './lesson1-overview-of-flat-roof-systems';
import { lesson2InstallingMembraneSystemsEpdmTpoBur } from './lesson2-installing-membrane-systems-epdm-tpo-bur';
import { lesson3ProperDrainageAndWaterproofing } from './lesson3-proper-drainage-and-waterproofing';
import { lesson4CommonRoofingProblemsAndSolutions } from './lesson4-common-roofing-problems-and-solutions';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: '🏠 Module 6: Flat and Low-Slope Roofing',
  description: 'Master flat roof systems, membrane installation, drainage, waterproofing, and troubleshooting for effective design and maintenance',
  lessons: [
    lesson1OverviewOfFlatRoofSystems,
    lesson2InstallingMembraneSystemsEpdmTpoBur,
    lesson3ProperDrainageAndWaterproofing,
    lesson4CommonRoofingProblemsAndSolutions,
    module6Quiz
  ]
};

export default module6; 