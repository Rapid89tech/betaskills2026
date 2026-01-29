import type { Module } from '@/types/course';
import { lesson1LowVoltageSystems } from './lesson1-low-voltage-systems';
import { lesson2DataAndNetworking } from './lesson2-data-and-networking';
import { lesson3SecuritySystems } from './lesson3-security-systems';
import { lesson4FireAlarmSystems } from './lesson4-fire-alarm-systems';
import { module10Quiz } from './quiz';

const module10: Module = {
  id: 10,
  title: '📡 Module 10: Low Voltage and Communication Systems',
  description: 'Learn low voltage systems, data cabling, networking, security systems, and fire alarm installations',
  lessons: [
    lesson1LowVoltageSystems,
    lesson2DataAndNetworking,
    lesson3SecuritySystems,
    lesson4FireAlarmSystems,
    module10Quiz
  ]
};

export default module10;

