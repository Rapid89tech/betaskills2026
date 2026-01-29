import { Module } from '../../../types/course';
import { lesson4_1 } from './lesson4_1';
import { lesson4_2 } from './lesson4_2';
import { lesson4_3 } from './lesson4_3';
import { lesson4_4 } from './lesson4_4';
import { quiz4 } from './quiz4';

export const module4: Module = {
  id: 4,
  title: "Engine Maintenance and Routine Services",
  description: "This module equips learners with essential skills for maintaining petrol engines through routine tasks like checking and changing engine oil, inspecting air filters, replacing spark plugs, and verifying coolant levels. Delivered via engaging video lectures, interactive simulations, and hands-on assignments, the module ensures practical mastery of maintenance techniques to enhance engine longevity and performance. Designed for online accessibility, resources are available on-demand to accommodate diverse schedules globally. The smart AI voice tutor provides 24/7 support, guiding learners through procedures like oil changes or spark plug diagnostics with real-time advice.",
  duration: 240, // 4 hours
  objectives: [
    "Master checking and changing engine oil procedures",
    "Perform air filter inspection and replacement",
    "Execute spark plug examination and replacement",
    "Verify coolant levels and system condition",
    "Apply proper safety procedures for all maintenance tasks"
  ],
  lessons: [lesson4_1, lesson4_2, lesson4_3, lesson4_4],
  quiz: quiz4
};