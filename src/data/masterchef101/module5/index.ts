import type { Module } from '@/types/course';
import lesson1 from './lesson1-balancing-flavors-textures';
import lesson2 from './lesson2-developing-personal-culinary-style';
import lesson3 from './lesson3-menu-design-development';
import lesson4 from './lesson4-wine-beverage-pairings';
import lesson5 from './lesson5-creating-signature-dishes';
import quiz from './quiz';

const module5: Module = {
  id: 5,
  title: '🎨 Module 5: Creativity & Signature Dishes',
  description: 'Develop creativity and signature dishes through balancing flavors and textures, developing a personal culinary style, menu design and development, wine and beverage pairings, and creating signature dishes.',
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

