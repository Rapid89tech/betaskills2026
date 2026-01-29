import { Module } from '../../../types/course';
import { lesson12_1 } from './lesson12_1';
import { lesson12_2 } from './lesson12_2';
import { lesson12_3 } from './lesson12_3';
import { quiz12 } from './quiz12';

export const module12: Module = {
  id: 12,
  title: "Tuning and Performance Optimization",
  description: "This module empowers learners to optimize petrol engine performance by mastering ignition timing adjustments, carburetor tuning or fuel injector recalibration, and valve clearance settings. Delivered through dynamic video lectures, interactive virtual simulations, and hands-on assignments, the module is accessible online for global learners, including those in South Africa. The 24/7 AI voice tutor provides real-time guidance on tasks such as aligning timing marks, adjusting mixture screws, or setting valve gaps, ensuring workshop-ready skills. These techniques enhance power output (e.g., 10–20% horsepower gains), improve fuel efficiency (12–15 km/l vs. 8–10 km/l), and ensure reliability, preventing costly damage like engine knock repairs (R20,000–R50,000). In South Africa's diverse conditions—hot climates (30–40°C), high altitudes (e.g., Johannesburg at 1753 m), and dusty rural roads—these skills are critical for vehicles like Toyota Corollas, VW Polos, and Ford Fiestas. Mechanics mastering this module boost efficiency, reduce client costs, and build trust in both urban workshops and rural service centers, addressing local challenges like poor fuel quality or dust accumulation.",
  duration: 270, // 4.5 hours
  objectives: [
    "Master ignition timing adjustments for optimal performance",
    "Learn carburetor tuning and fuel injector recalibration techniques",
    "Apply proper valve clearance settings and adjustments",
    "Understand performance optimization in various operating conditions",
    "Develop skills in precision tuning and diagnostics"
  ],
  lessons: [lesson12_1, lesson12_2, lesson12_3],
  quiz: quiz12
};