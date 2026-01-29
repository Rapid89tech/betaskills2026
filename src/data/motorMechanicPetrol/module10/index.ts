import { Module } from '../../../types/course';
import { lesson10_1 } from './lesson10_1';
import { lesson10_2 } from './lesson10_2';
import { lesson10_3 } from './lesson10_3';
import { quiz10 } from './quiz10';

export const module10: Module = {
  id: 10,
  title: "Cooling System Overhauls",
  description: "This module equips learners with the skills to diagnose and repair common cooling system issues in petrol engines, focusing on overheating causes, replacing thermostats, water pumps, and radiators, and flushing the system to maintain performance. Delivered through engaging video lectures, interactive virtual simulations, and practical assignments, the module is accessible online for global learners, including those in South Africa. The 24/7 AI voice tutor provides real-time guidance on tasks like testing thermostats, torquing water pump bolts, or bleeding air from the system, ensuring workshop-ready skills. Mastering these repairs prevents engine damage (e.g., R30,000+ for a seized engine) and ensures optimal performance in South Africa's hot climate, enhancing mechanic efficiency and client trust.",
  duration: 240, // 4 hours
  objectives: [
    "Diagnose common overheating issues and their causes",
    "Master thermostat, water pump, and radiator replacement procedures",
    "Learn proper cooling system flushing techniques",
    "Apply diagnostic procedures for cooling system problems",
    "Understand cooling system maintenance in hot climates"
  ],
  lessons: [lesson10_1, lesson10_2, lesson10_3],
  quiz: quiz10
};