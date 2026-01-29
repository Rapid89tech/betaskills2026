import type { Module } from '@/types/course';
import { lesson1PreparingTheRoofDeck } from './lesson1-preparing-the-roof-deck';
import { lesson2LayingUnderlaymentAndStarterShingles } from './lesson2-laying-underlayment-and-starter-shingles';
import { lesson3ShingleTileAndMetalPanelInstallation } from './lesson3-shingle-tile-and-metal-panel-installation';
import { lesson4FlashingAndSealingTechniques } from './lesson4-flashing-and-sealing-techniques';
import { lesson5VentAndRidgeCapInstallation } from './lesson5-vent-and-ridge-cap-installation';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: '🧾 Module 5: Roof Installation Techniques',
  description: 'Master roof deck preparation, underlayment, shingles, tiles, metal panels, flashing, sealing, and ventilation installation',
  lessons: [
    lesson1PreparingTheRoofDeck,
    lesson2LayingUnderlaymentAndStarterShingles,
    lesson3ShingleTileAndMetalPanelInstallation,
    lesson4FlashingAndSealingTechniques,
    lesson5VentAndRidgeCapInstallation,
    module5Quiz
  ]
};

export default module5; 