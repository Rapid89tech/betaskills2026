import type { Module } from '@/types/course';
import { lesson1ResidentialWiring } from './lesson1-residential-wiring';
import { lesson2CommercialInstallations } from './lesson2-commercial-installations';
import { lesson3PanelsAndBreakers } from './lesson3-panels-and-breakers';
import { lesson4GroundingAndBonding } from './lesson4-grounding-and-bonding';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: '🏗️ Module 8: Electrical Installations',
  description: 'Learn residential and commercial wiring, panel installations, circuit breakers, grounding, and bonding systems',
  lessons: [
    lesson1ResidentialWiring,
    lesson2CommercialInstallations,
    lesson3PanelsAndBreakers,
    lesson4GroundingAndBonding,
    module8Quiz
  ]
};

export default module8;

