import type { Module } from '@/types/course';
import { lesson1DiagnosticSoftware } from './lesson1-diagnostic-software';
import { lesson2WaterDamageRepair } from './lesson2-water-damage-repair';
import { lesson3SolderingTechniques } from './lesson3-soldering-techniques';
import { lesson4BiometricComponents } from './lesson4-biometric-components';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: 'Module 5: Advanced Diagnostics and Repairs',
  description: 'Advanced diagnostic techniques, water damage repair, micro-soldering skills, and biometric component replacement for professional smartphone repair.',
  lessons: [
    lesson1DiagnosticSoftware,
    lesson2WaterDamageRepair,
    lesson3SolderingTechniques,
    lesson4BiometricComponents,
    module5Quiz
  ]
};

export default module5;
