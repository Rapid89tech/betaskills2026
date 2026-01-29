import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-prophecy';
import lesson2 from './lesson2-prophetic-gifting-vs-office';
import lesson3 from './lesson3-biblical-prophets';
import lesson4 from './lesson4-fivefold-ministry';
import lesson5 from './lesson5-modern-day-prophets';
import quiz from './quiz';

const module1: Module = {
  id: 1,
  title: '🔮 Module 1: The Office of the Prophet',
  description: 'Understanding the prophetic office, biblical foundations, and the role of modern-day prophets in ministry.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module1;
