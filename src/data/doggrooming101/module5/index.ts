import type { Module } from '@/types/course';
import lesson1 from './lesson1-positive-reinforcement';
import lesson2 from './lesson2-core-commands';
import lesson3 from './lesson3-leash-training';
import lesson4 from './lesson4-crate-housebreaking';
import lesson5 from './lesson5-managing-behaviors';
import quiz from './quiz';

const module5: Module = {
  id: 5,
  title: '🐕 Module 5: Obedience Training Basics',
  description: 'Learn principles of positive reinforcement, core commands (sit, stay, come, down, heel), leash training, crate training, housebreaking, and managing common behaviors like barking, chewing, and jumping.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module5;

