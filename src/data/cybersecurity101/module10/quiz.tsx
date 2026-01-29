import type { Lesson } from '@/types/course';

const quiz: Lesson = {
  id: 4,
  title: 'Module 10 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What makes cybersecurity a promising career?',
        options: [
          'Low skill requirement',
          'Repetitive tasks',
          'High demand and job security',
          'No need for education'
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'Which role simulates attacks to find weaknesses?',
        options: [
          'Security Engineer',
          'CISO',
          'Penetration Tester',
          'Incident Responder'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'Which certification is ideal for beginners in cybersecurity?',
        options: [
          'CISSP',
          'OSCP',
          'Security+',
          'CISM'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'What is the role of a CISO?',
        options: [
          'Maintain firewalls',
          'Analyze phishing emails',
          'Lead cybersecurity strategy',
          'Code mobile apps'
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'What is the purpose of a home lab?',
        options: [
          'Watch tutorials',
          'Store music',
          'Practice cybersecurity tools',
          'Backup files'
        ],
        correctAnswer: 2
      },
      {
        id: 6,
        question: 'Which skill is NOT typically needed in cybersecurity?',
        options: [
          'Critical thinking',
          'Scripting',
          'Financial auditing',
          'Problem-solving'
        ],
        correctAnswer: 2
      },
      {
        id: 7,
        question: 'What does CEH focus on?',
        options: [
          'Encryption',
          'Incident response',
          'Ethical hacking and penetration testing',
          'Compliance reporting'
        ],
        correctAnswer: 2
      },
      {
        id: 8,
        question: 'Which role focuses on regulatory policies and audits?',
        options: [
          'Penetration Tester',
          'GRC Analyst',
          'SOC Analyst',
          'Forensics Investigator'
        ],
        correctAnswer: 1
      },
      {
        id: 9,
        question: 'What is the typical salary for a mid-level Security Engineer in South Africa?',
        options: [
          'R780,000',
          'R1,950,000',
          'R1,170,000',
          'R585,000'
        ],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'What are CTF competitions?',
        options: [
          'Cybersecurity tournaments to test skills',
          'Firewall configuration tools',
          'File transfer protocols',
          'Cloud security software'
        ],
        correctAnswer: 0
      }
    ]
  }
};

export default quiz;
