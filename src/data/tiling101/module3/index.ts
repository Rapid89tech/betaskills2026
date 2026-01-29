import { Module } from '../../../types/course';
import lesson1ApplyingAdhesivesSettingTiles from './lesson1-applying-adhesives-setting-tiles';
import lesson2CuttingDrillingTiles from './lesson2-cutting-drilling-tiles';
import lesson3InstallingDifferentTileTypes from './lesson3-installing-different-tile-types';
import lesson4Quiz from './lesson4-quiz';

export const module3: Module = {
  id: 3,
  title: 'Tile Installation Techniques',
  description: 'This comprehensive module covers essential tile installation techniques including adhesive selection and application, trowel techniques, tile cutting and drilling methods, and specialized installation approaches for different tile types. Students will master professional techniques for mosaics, large-format tiles, natural stone, and complex patterns.',
  lessons: [
    lesson1ApplyingAdhesivesSettingTiles,
    lesson2CuttingDrillingTiles,
    lesson3InstallingDifferentTileTypes,
    lesson4Quiz,
  ],
};