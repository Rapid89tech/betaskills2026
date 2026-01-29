import { Module } from '../../../types/course';
import { lesson9_1 } from './lesson9_1';
import { lesson9_2 } from './lesson9_2';
import { lesson9_3 } from './lesson9_3';
import { quiz9 } from './quiz9';

export const module9: Module = {
  id: 9,
  title: "Basic Repairs",
  description: "This module equips learners with practical skills to perform essential petrol engine repairs, focusing on replacing faulty spark plugs or ignition coils, addressing minor gasket leaks, and repairing damaged wiring or connectors. Delivered through engaging video lectures, interactive virtual simulations, and hands-on assignments, the module is accessible online for global learners, including those in South Africa. The 24/7 AI voice tutor provides real-time guidance on tasks like torquing spark plugs, sealing gaskets, or soldering wires, ensuring workshop-ready skills. Mastering these repairs prevents issues like misfires, oil leaks, or electrical faults, saving clients costly repairs (e.g., R10,000+ for engine damage) and enhancing mechanic efficiency in diverse conditions, from urban Johannesburg to rural Free State.",
  duration: 180, // 3 hours
  objectives: [
    "Master spark plug and ignition coil replacement procedures",
    "Learn to diagnose and repair minor gasket leaks",
    "Develop skills in wiring and connector repair",
    "Apply proper tools and safety procedures for basic repairs",
    "Understand cost-effective repair strategies"
  ],
  lessons: [lesson9_1, lesson9_2, lesson9_3],
  quiz: quiz9
};