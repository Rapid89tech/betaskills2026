import type { Module } from '@/types/course';
import lesson1 from './lesson1-introduction';
import lesson2 from './lesson2-what-are-security-policies';
import lesson3 from './lesson3-compliance-in-cybersecurity';
import lesson4 from './lesson4-it-governance';
import lesson5 from './lesson5-key-roles-and-responsibilities';
import lesson6 from './lesson6-auditing-and-risk-assessment';
import quiz from './quiz';

const module7: Module = {
  id: 7,
  title: '📋 Module 7: Security Policies, Compliance, and Governance',
  description: 'Learn about security policies, compliance frameworks (GDPR, HIPAA, PCI-DSS, ISO/IEC 27001, NIST), and IT governance principles and frameworks.',
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

export default module7;

