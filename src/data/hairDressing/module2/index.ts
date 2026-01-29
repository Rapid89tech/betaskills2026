import { Module } from '../../../types/course';
import { lesson2_1 } from './lesson2_1';
import { lesson2_2 } from './lesson2_2';
import { lesson2_3 } from './lesson2_3';
import { lesson2_4 } from './lesson2_4';
import { quiz2 } from './quiz2';

export const module2: Module = {
  id: 2,
  title: "Tools and Equipment in Hairdressing",
  description: "This comprehensive module covers all essential tools and equipment used in professional hairdressing. Students will learn about combs and brushes, scissors and razors, heat styling tools, and protective gear and hygiene essentials. Mastery of these tools is essential for delivering professional results and upholding hygiene standards in any salon environment.",
  duration: 180, // 3 hours
  objectives: [
    "Master the use of various combs and brushes for different hair types and techniques",
    "Understand and properly use scissors and razors for cutting",
    "Learn to operate heat styling tools safely and effectively",
    "Implement proper protective gear and hygiene practices",
    "Develop professional tool maintenance and safety protocols"
  ],
  lessons: [lesson2_1, lesson2_2, lesson2_3, lesson2_4],
  quiz: quiz2
}; 