import type { Module } from '@/types/course';
import { lesson1CopyrightsPolicies } from './lesson1-copyrights-policies';
import { lesson2EthicalAdvertising } from './lesson2-ethical-advertising';
import { lesson3NegativeFeedback } from './lesson3-negative-feedback';
import { lesson4CrisisCommunication } from './lesson4-crisis-communication';
import { module10Quiz } from './quiz';

const module10: Module = {
  id: 10,
  title: '⚖️ Module 10: Legal, Ethical, and Crisis Management',
  description: 'Master copyright laws, ethical advertising, crisis response strategies, and reputation management',
  lessons: [
    lesson1CopyrightsPolicies,
    lesson2EthicalAdvertising,
    lesson3NegativeFeedback,
    lesson4CrisisCommunication,
    module10Quiz
  ]
};

export default module10;

