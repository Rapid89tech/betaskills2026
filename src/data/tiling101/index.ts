import { Course } from '../../types/course';
import { module1 } from './module1';
import { module2 } from './module2';
import { module3 } from './module3';
import { module4 } from './module4';
import { module5 } from './module5';

export const tiling101Course: Course = {
  id: 'tiling-101',
  title: 'Tiling 101',
  description: 'Mastering the Art & Science of Tiling is a comprehensive online course designed to equip learners with the knowledge, skills, and techniques needed to excel in professional and DIY tiling projects. From foundational principles to advanced installation methods, this course covers tile selection, surface preparation, layout planning, cutting techniques, grouting, and maintenance, with a focus on both aesthetic and technical excellence.',
    instructor: {
    id: 'tiling101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  thumbnail: '/images/tiling-course.jpg',
  duration: '6 weeks',
  category: 'Construction',
  level: 'beginner',
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5
  ]
};

export default tiling101Course;

