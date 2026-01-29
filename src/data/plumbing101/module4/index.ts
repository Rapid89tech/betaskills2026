import type { Module } from '@/types/course';
import { lesson1ResidentialCommercialIndustrialSystems } from './lesson1-residential-commercial-industrial-systems';
import { lesson2WaterSupplySystems } from './lesson2-water-supply-systems';
import { lesson3DrainageSystems } from './lesson3-drainage-systems';
import { lesson4VentingSystems } from './lesson4-venting-systems';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: '🚽 Module 4: Plumbing Systems Overview',
  description: 'Understand residential, commercial, and industrial plumbing systems, water supply, drainage, and venting systems',
  lessons: [
    lesson1ResidentialCommercialIndustrialSystems,
    lesson2WaterSupplySystems,
    lesson3DrainageSystems,
    lesson4VentingSystems,
    module4Quiz
  ]
};

export default module4; 