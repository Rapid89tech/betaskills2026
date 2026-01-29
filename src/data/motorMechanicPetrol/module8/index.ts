import { Module } from '../../../types/course';
import { lesson8_1 } from './lesson8_1';
import { lesson8_2 } from './lesson8_2';
import { lesson8_3 } from './lesson8_3';
import { quiz8 } from './quiz8';

export const module8: Module = {
  id: 8,
  title: "Testing and Diagnostic Tools",
  description: "This module provides comprehensive training on essential diagnostic tools and testing equipment used in petrol engine maintenance and repair. Learners will master the use of OBD2 scanners, multimeters, compression testers, vacuum gauges, and other specialized equipment critical for accurate engine diagnostics. Through engaging video demonstrations, hands-on virtual simulations, and practical assignments, participants will develop proficiency in tool selection, proper usage techniques, and result interpretation. Designed for online delivery with global accessibility, the module accommodates South African learners with localized examples and 24/7 AI voice tutor support. The AI assistant provides real-time guidance on tool calibration, measurement interpretation, and troubleshooting techniques, ensuring practical workshop applications and professional competency in modern automotive diagnostics.",
  duration: 270, // 4.5 hours
  objectives: [
    "Master the use of OBD2 scanners and diagnostic equipment",
    "Develop proficiency with multimeters and electrical testing",
    "Learn proper techniques for compression and leak-down testing",
    "Understand vacuum gauge operation and interpretation",
    "Apply diagnostic tools effectively in real-world scenarios"
  ],
  lessons: [lesson8_1, lesson8_2, lesson8_3],
  quiz: quiz8
};