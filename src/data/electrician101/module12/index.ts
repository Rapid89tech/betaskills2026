import type { Module } from '@/types/course';
import { lesson1SolarPowerSystems } from './lesson1-solar-power-systems';
import { lesson2EVChargingStations } from './lesson2-ev-charging-stations';
import { lesson3SmartHomeTechnology } from './lesson3-smart-home-technology';
import { lesson4EnergyEfficiency } from './lesson4-energy-efficiency';
import { module12Quiz } from './quiz';

const module12: Module = {
  id: 12,
  title: '🌱 Module 12: Renewable Energy and Emerging Tech',
  description: 'Learn solar power systems, EV charging stations, smart home technology, and energy-efficient solutions',
  lessons: [
    lesson1SolarPowerSystems,
    lesson2EVChargingStations,
    lesson3SmartHomeTechnology,
    lesson4EnergyEfficiency,
    module12Quiz
  ]
};

export default module12;

