import { Lesson } from '@/types/course';

export const quiz10: Lesson = {
  id: 2,
  title: 'Module 10 Quiz: Data Recovery and Backup',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the first thing you should do after realizing data has been accidentally deleted?',
        options: ['Continue using the computer normally', 'Stop using the affected drive immediately', 'Format the drive', 'Install new software'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which backup strategy is recommended for comprehensive data protection?',
        options: ['1-1-1 rule', '2-1-1 rule', '3-2-1 rule', '4-3-2 rule'],
        correct: 2
      },
      {
        id: 3,
        question: 'What does the "3" in the 3-2-1 backup rule represent?',
        options: ['3 different backup software', '3 copies of your data', '3 backup schedules', '3 years of retention'],
        correct: 1
      },
      {
        id: 4,
        question: 'Which type of backup only saves files that have changed since the last backup?',
        options: ['Full backup', 'Incremental backup', 'Mirror backup', 'System backup'],
        correct: 1
      },
      {
        id: 5,
        question: 'What is a common cause of logical data loss?',
        options: ['Physical drive damage', 'File system corruption', 'Water damage', 'Fire damage'],
        correct: 1
      },
      {
        id: 6,
        question: 'Which tool is commonly used for data recovery on Windows?',
        options: ['Paint', 'Notepad', 'Recuva', 'Calculator'],
        correct: 2
      },
      {
        id: 7,
        question: 'What is NAS in the context of backups?',
        options: ['Network Attached Storage', 'New Automated System', 'Non-Active Storage', 'Network Access Server'],
        correct: 0
      },
      {
        id: 8,
        question: 'Why should you recover data to a different location than the original?',
        options: ['To save space', 'To prevent overwriting recoverable data', 'To speed up recovery', 'To organize files better'],
        correct: 1
      },
      {
        id: 9,
        question: 'Which macOS feature provides automatic backup functionality?',
        options: ['Finder', 'Time Machine', 'Safari', 'Spotlight'],
        correct: 1
      },
      {
        id: 10,
        question: 'What does the "1" in the 3-2-1 backup rule represent?',
        options: ['1 backup per day', '1 offsite copy', '1 backup software', '1 year retention'],
        correct: 1
      }
    ]
  }
};
