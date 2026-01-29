import type { Course } from '@/types/course';
import { module1 } from './christianTeacher/module1';
import { module2 } from './christianTeacher/module2';
import { module3 } from './christianTeacher/module3';
import { module4 } from './christianTeacher/module4';
import { module5 } from './christianTeacher/module5';
import { module6 } from './christianTeacher/module6';
import { module7 } from './christianTeacher/module7';
import { module8 } from './christianTeacher/module8';
import { module10 } from './christianTeacher/module10';

export const christianTeacherCourse: Course = {
  id: 'christian-teacher',
  title: 'Christian Teacher Training Course: Teaching with Truth, Grace & Power',
  description: 'This course is designed for individuals who feel called to teach from a Christian worldview. It equips aspiring Christian educators to effectively integrate biblical principles into teaching, disciple students, and represent Christ in their teaching practice.',
  instructor: 'Dr. Sarah Johnson',
  level: 'Intermediate',
  category: 'Religion & Spirituality',
  duration: '10 weeks',
  students: 1250,
  rating: 4.8,
  price: 0,
  currency: 'USD',
  is_free: true,
  thumbnail: '/images/courses/christian-teacher.jpg',
  learningObjectives: [
    'Understand the spiritual and professional responsibilities of a Christian teacher',
    'Be grounded in biblical doctrine and pedagogy',
    'Develop lesson plans that integrate scripture and moral values',
    'Demonstrate Christlike character and teaching ethics',
    'Teach and disciple students across age groups in church or school settings'
  ],
  modules: [module1, module2, module3, module4, module5, module6, module7, module8, module10]
};
