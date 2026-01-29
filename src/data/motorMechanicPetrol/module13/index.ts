import { Module } from '../../../types/course';
import { lesson13_1 } from './lesson13_1';
import { lesson13_2 } from './lesson13_2';
import { lesson13_3 } from './lesson13_3';
import { quiz13 } from './quiz13';

export const module13: Module = {
  id: 13,
  title: "Improving Engine Efficiency and Performance",
  description: "This module empowers learners to enhance petrol engine efficiency and performance by mastering the use of high-quality performance parts, selecting optimal fuel grades with additives, and leveraging advanced diagnostic tools. Delivered through engaging video lectures, interactive virtual simulations, and hands-on assignments, the module is accessible online for global learners, with a focus on South African mechanics. The 24/7 AI voice tutor provides real-time guidance on tasks like installing performance intakes, choosing 95 RON fuel, or analyzing OBD-II data, ensuring workshop-ready skills. These techniques boost power output (10–25% horsepower gains, e.g., 80–100 kW in a 1.6L engine), improve fuel economy (12–15 km/l vs. 8–10 km/l), and enhance reliability, preventing costly failures like piston damage or sensor failures (R20,000–R50,000). In South Africa's challenging conditions—hot climates (30–40°C in Durban), high altitudes (1753 m in Johannesburg), dusty rural roads (e.g., R573 in Limpopo), and inconsistent fuel quality (91–95 RON)—these skills are vital for vehicles like Toyota Corollas, VW Polos, and Ford Fiestas. Mechanics mastering this module optimize workshop efficiency, reduce client costs by R5,000–R20,000, and build trust in urban centers like Cape Town and rural areas like the Karoo, addressing local issues such as dust contamination, poor fuel quality, and high-altitude performance demands.",
  duration: 180, // 3 hours
  objectives: [
    "Master the selection and use of high-quality performance parts",
    "Learn to select optimal fuel grades and additives for performance",
    "Apply advanced diagnostic tools for performance monitoring",
    "Understand efficiency optimization in challenging conditions",
    "Develop skills in performance enhancement and cost-effective solutions"
  ],
  lessons: [lesson13_1, lesson13_2, lesson13_3],
  quiz: quiz13
};