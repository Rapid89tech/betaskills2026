import type { Lesson } from '@/types/course';

const quiz: Lesson = {
  id: 6,
  title: 'Module 8 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the goal of cybersecurity risk management?',
        options: [
          'Improve graphic design',
          'Eliminate all risks completely',
          'Identify and reduce potential cybersecurity risks',
          'Speed up the internet'
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'Which of these is a phase of risk management?',
        options: [
          'System formatting',
          'User profiling',
          'Risk identification',
          'Web scraping'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What does the formula Risk = Threat × Vulnerability × Impact imply?',
        options: [
          'All risks are equal',
          'Risk only depends on software age',
          'High impact + high threat = high risk',
          'Risk is unrelated to impact'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'Which strategy transfers risk to another party?',
        options: [
          'Avoid',
          'Mitigate',
          'Accept',
          'Transfer'
        ],
        correctAnswer: 3
      },
      {
        id: 5,
        question: 'What is the first step in the NIST incident response lifecycle?',
        options: [
          'Containment',
          'Eradication',
          'Preparation',
          'Analysis'
        ],
        correctAnswer: 2
      },
      {
        id: 6,
        question: 'Which tool helps monitor and analyze security logs?',
        options: [
          'FTP',
          'SIEM',
          'SSH',
          'DNS'
        ],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'Which of the following is NOT a type of cybersecurity incident?',
        options: [
          'Insider threat',
          'Website defacement',
          'High bandwidth usage',
          'Unauthorized access'
        ],
        correctAnswer: 2
      },
      {
        id: 8,
        question: 'What is the goal of containment in incident response?',
        options: [
          'Ignore the threat',
          'Erase logs',
          'Limit the damage',
          'Avoid legal action'
        ],
        correctAnswer: 2
      },
      {
        id: 9,
        question: 'What should be done after an incident is resolved?',
        options: [
          'Delete the evidence',
          'Post about it on social media',
          'Conduct a post-incident review',
          'Disable backups'
        ],
        correctAnswer: 2
      },
      {
        id: 10,
        question: 'Why are tabletop exercises useful?',
        options: [
          'To update passwords',
          'To test the incident response plan in a simulated scenario',
          'To design logos',
          'To check internet speed'
        ],
        correctAnswer: 1
      }
    ]
  }
};

export default quiz;
