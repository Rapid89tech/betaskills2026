import { Module } from '@/types/course';
import { lesson1TypesOfMicrophones } from './lesson1-types-of-microphones';
import { lesson2PickupPatterns } from './lesson2-pickup-patterns';
import { lesson3MicPlacementTechniques } from './lesson3-mic-placement-techniques';
import { lesson4Quiz } from './lesson4-quiz';

export const module3MicrophonesAndApplications: Module = {
  id: 3,
  title: '🎙️ Module 3: Microphones and Their Applications',
  description: 'Understanding microphone types, pickup patterns, and placement techniques',
  lessons: [
    lesson1TypesOfMicrophones,
    lesson2PickupPatterns,
    lesson3MicPlacementTechniques,
    lesson4Quiz
  ]
}; 