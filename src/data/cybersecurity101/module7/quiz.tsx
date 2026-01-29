import type { Lesson } from '@/types/course';

const quiz: Lesson = {
  id: 7,
  title: 'Module 7 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the main purpose of a security policy?',
        options: [
          'Install software updates',
          'Monitor network usage',
          'Define rules for protecting digital assets',
          'Manage website traffic'
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'Which policy outlines how to react during a cyber incident?',
        options: [
          'Password Policy',
          'Access Control Policy',
          'Acceptable Use Policy',
          'Incident Response Policy'
        ],
        correctAnswer: 3
      },
      {
        id: 3,
        question: 'What does GDPR regulate?',
        options: [
          'Software development',
          'Credit card payments',
          'EU data privacy',
          'Medical records in the U.S.'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'Which standard applies to healthcare data in the U.S.?',
        options: [
          'PCI-DSS',
          'HIPAA',
          'ISO 27001',
          'NIST'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What does IT governance ensure?',
        options: [
          'More network speed',
          'That policies align with business goals',
          'Free internet usage',
          'Better antivirus programs'
        ],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'What is the role of a Compliance Officer?',
        options: [
          'Program the firewall',
          'Audit the network',
          'Ensure laws and standards are followed',
          'Install updates'
        ],
        correctAnswer: 2
      },
      {
        id: 7,
        question: 'Which of the following is a framework for managing IT governance?',
        options: [
          'COBIT',
          'Apache',
          'SSL',
          'TOR'
        ],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 'What is risk assessment used for?',
        options: [
          'Measuring password strength',
          'Monitoring social media',
          'Identifying and evaluating potential threats',
          'Backing up data'
        ],
        correctAnswer: 2
      },
      {
        id: 9,
        question: 'Why should policies be regularly updated?',
        options: [
          'To meet new marketing goals',
          'To avoid outdated regulations and threats',
          'To make documents longer',
          'To impress clients'
        ],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'What is a key goal of cybersecurity governance?',
        options: [
          'Minimizing team meetings',
          'Controlling employee behavior',
          'Aligning security strategy with business needs',
          'Building user interfaces'
        ],
        correctAnswer: 2
      }
    ]
  }
};

export default quiz;
