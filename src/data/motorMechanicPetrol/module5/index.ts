import { Module } from '../../../types/course';
import { lesson5_1 } from './lesson5_1';
import { lesson5_2 } from './lesson5_2';
import { quiz5 } from './quiz5';

export const module5: Module = {
  id: 5,
  title: "Inspecting Drive Belts and Timing Belts",
  description: "This module equips learners with critical skills for inspecting and maintaining drive and timing belts, essential for petrol engine performance and longevity. Participants will learn to identify wear and tear, check belt tension, and execute replacements to prevent breakdowns and costly engine damage. Delivered through engaging video lectures, interactive virtual simulations, and practical assignments, the module is accessible online with on-demand resources, accommodating diverse schedules globally, including South African learners. The smart AI voice tutor provides 24/7 support, offering real-time guidance on tasks like assessing belt wear, adjusting tension, or aligning timing marks during replacements.",
  duration: 180, // 3 hours
  objectives: [
    "Identify wear and tear patterns in drive and timing belts",
    "Master belt tension checking and adjustment procedures",
    "Execute proper belt replacement techniques",
    "Understand the differences between drive belts and timing belts",
    "Apply safety procedures for belt maintenance and replacement"
  ],
  lessons: [lesson5_1, lesson5_2],
  quiz: quiz5
};