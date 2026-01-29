import { Module } from '../../../types/course';
import lesson1BasicsOfDieselCombustion from './lesson1-basics-of-diesel-combustion';
import lesson2KeyComponentsOfInjectionSystem from './lesson2-key-components-of-injection-system';
import lesson3InjectionTimingAndPressure from './lesson3-injection-timing-and-pressure';
import lesson4TypesOfFuelInjectors from './lesson4-types-of-fuel-injectors';
import lesson5FuelFiltrationAndWaterSeparation from './lesson5-fuel-filtration-and-water-separation';
import lesson6MaintenanceBestPractices from './lesson6-maintenance-best-practices';
import lesson7DiagnosingFuelDeliveryIssues from './lesson7-diagnosing-fuel-delivery-issues';
import lesson8Quiz from './lesson8-quiz';

export const module2: Module = {
  id: 2,
  title: 'How Diesel Fuel Injection Systems Work',
  description: 'This section delves into the mechanics of diesel fuel injection systems, critical for efficient combustion and engine performance. Through comprehensive explanations, interactive animations, and curated YouTube videos, learners will master the basics of diesel combustion, key components, and the importance of injection timing and pressure.',
  lessons: [
    lesson1BasicsOfDieselCombustion,
    lesson2KeyComponentsOfInjectionSystem,
    lesson3InjectionTimingAndPressure,
    lesson4TypesOfFuelInjectors,
    lesson5FuelFiltrationAndWaterSeparation,
    lesson6MaintenanceBestPractices,
    lesson7DiagnosingFuelDeliveryIssues,
    lesson8Quiz
  ]
};

export default module2;