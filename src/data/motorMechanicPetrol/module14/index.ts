import { Module } from '../../../types/course';
import { lesson14_1 } from './lesson14_1';
import { lesson14_2 } from './lesson14_2';
import { quiz14 } from './quiz14';

export const module14: Module = {
  id: 14,
  title: "Emissions and Environmental Considerations",
  description: "This final module equips learners with the skills to ensure compliance with emissions standards, diagnose issues with catalytic converters and oxygen sensors, and understand the environmental benefits of proper emissions control. Delivered through engaging video lectures, interactive virtual simulations, and hands-on assignments, the module is accessible online for global learners, with a focus on South African mechanics. The 24/7 AI voice tutor provides real-time guidance on tasks like testing catalytic converters, analyzing oxygen sensor data, or ensuring compliance with South African National Standards (SANS 20083, based on Euro standards). These skills reduce harmful pollutants (e.g., CO <0.5%, NOx <0.08 g/km), improve fuel economy (12–15 km/l vs. 8–10 km/l), and enhance vehicle reliability, preventing costly failures like catalytic converter damage (R10,000–R30,000). In South Africa's diverse conditions—hot climates (30–40°C in Durban), high altitudes (1753 m in Johannesburg), dusty rural roads (e.g., R573 in Limpopo), and inconsistent fuel quality (91–95 RON)—these skills are critical for vehicles like Toyota Corollas, VW Polos, and Ford Fiestas. Mechanics mastering this module ensure compliance with roadworthy tests (e-Natis), save clients R5,000–R20,000 in fines and repairs, and contribute to cleaner air, addressing local challenges like dust contamination, poor fuel quality, and urban smog.",
  duration: 180, // 3 hours
  objectives: [
    "Master emissions standards compliance and testing procedures",
    "Learn catalytic converter operation and diagnostic techniques",
    "Understand oxygen sensor function and troubleshooting methods",
    "Apply environmental considerations in mechanical practice",
    "Develop skills in emissions-related problem solving"
  ],
  lessons: [lesson14_1, lesson14_2],
  quiz: quiz14
};