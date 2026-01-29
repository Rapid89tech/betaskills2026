import type { Module } from '@/types/course';
import { lesson1WhatIsMinistry } from './lesson1-what-is-ministry';
import { lesson2WhatIsACalling } from './lesson2-what-is-a-calling';
import { lesson3BiblicalExamples } from './lesson3-biblical-examples';
import { lesson4RoleOfTeachers } from './lesson4-role-of-teachers';
import { lesson5HumilityInService } from './lesson5-humility-in-service';
import { lesson6ExcellenceInService } from './lesson6-excellence-in-service';
import { quiz } from './quiz';

export const module1: Module = {
  id: 1,
  title: 'The Call and Role of a Christian Teacher',
  description: 'Understanding the definition of ministry and calling, biblical examples, and the role of teachers in ministry with humility and excellence in service.',
  lessons: [
    lesson1WhatIsMinistry,
    lesson2WhatIsACalling,
    lesson3BiblicalExamples,
    lesson4RoleOfTeachers,
    lesson5HumilityInService,
    lesson6ExcellenceInService,
    quiz
  ]
};
