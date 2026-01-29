import type { Module } from '@/types/course';
import lesson1 from './lesson1-introduction';
import lesson2 from './lesson2-key-cybersecurity-technologies';
import lesson3 from './lesson3-security-tools-and-utilities';
import lesson4 from './lesson4-identity-and-access-management';
import lesson5 from './lesson5-security-information-and-event-management';
import lesson6 from './lesson6-cloud-security-tools';
import quiz from './quiz';

const module3: Module = {
  id: 3,
  title: '🛠️ Module 3: Cybersecurity Technologies and Tools',
  description: 'Learn about essential cybersecurity technologies including firewalls, IDS/IPS, antivirus, encryption, endpoint security, IAM, SIEM, and cloud security tools.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    lesson6,
    quiz
  ]
};

export default module3;

