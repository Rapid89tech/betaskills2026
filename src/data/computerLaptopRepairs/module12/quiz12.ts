import { Lesson } from '@/types/course';

export const quiz12: Lesson = {
  id: 2,
  title: 'Module 12 Quiz: Final Assessment',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What percentage must you achieve on the practical repair task to earn certification?',
        options: ['70%', '75%', '80%', '90%'],
        correct: 2
      },
      {
        id: 2,
        question: 'Which CompTIA A+ exam focuses on hardware and networking?',
        options: ['Core 1 (220-1101)', 'Core 2 (220-1102)', 'Network+', 'Security+'],
        correct: 0
      },
      {
        id: 3,
        question: 'What is the minimum passing score for module quizzes?',
        options: ['60%', '70%', '75%', '80%'],
        correct: 1
      },
      {
        id: 4,
        question: 'Which component is worth 40% of the final assessment?',
        options: ['Customer interaction only', 'Both practical task and written exam', 'Module quizzes', 'Attendance'],
        correct: 1
      },
      {
        id: 5,
        question: 'What should you do first when approaching a practical repair task?',
        options: ['Start replacing parts', 'Use a systematic diagnostic approach', 'Skip testing', 'Ignore safety procedures'],
        correct: 1
      },
      {
        id: 6,
        question: 'Which career path is NOT mentioned as a potential opportunity?',
        options: ['Computer Repair Technician', 'Help Desk Support Specialist', 'Professional Chef', 'IT Support Technician'],
        correct: 2
      },
      {
        id: 7,
        question: 'What is an important aspect of the customer interaction simulation?',
        options: ['Using technical jargon', 'Professional communication and documentation', 'Rushing through the assessment', 'Avoiding customer questions'],
        correct: 1
      },
      {
        id: 8,
        question: 'How many modules must be completed to earn certification?',
        options: ['10', '11', '12', '15'],
        correct: 2
      },
      {
        id: 9,
        question: 'What is recommended for continuing education after course completion?',
        options: ['Stop learning', 'Only focus on one skill', 'Stay updated with technology and pursue additional certifications', 'Avoid new technologies'],
        correct: 2
      },
      {
        id: 10,
        question: 'Which organization offers the A+ certification exam?',
        options: ['Microsoft', 'CompTIA', 'Cisco', 'Apple'],
        correct: 1
      }
    ]
  }
};
