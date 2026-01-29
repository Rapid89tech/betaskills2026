import { Module } from '../../../types/course';
import { lesson2_1 } from './lesson2_1';
import { lesson2_2 } from './lesson2_2';
import { lesson2_3 } from './lesson2_3';
import { quiz2 } from './quiz2';

export const module2: Module = {
  id: 2,
  title: "Tools and Equipment",
  description: "This comprehensive module covers essential repair tools, testing and diagnostic equipment, and workspace organization. Students will master the use of precision screwdrivers, spudgers, tweezers, and heat guns for hardware repairs, learn to operate multimeters, power supply testers, and microscopes for advanced diagnostics, and implement professional workspace organization techniques for efficient and safe repair operations.",
  duration: 180, // 3 hours
  objectives: [
    "Master the use of essential repair tools for smartphone disassembly and assembly",
    "Learn advanced testing and diagnostic equipment operation",
    "Understand proper tool selection for different repair scenarios",
    "Apply professional workspace organization and safety principles",
    "Develop precision handling techniques for delicate components"
  ],
  lessons: [lesson2_1, lesson2_2, lesson2_3],
  quiz: quiz2
};