
import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Final Assessment and Certification',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of a final assessment in a certification course?',
        options: [
          'To reduce the number of students who complete the course',
          'To confirm competency across the full curriculum',
          'To replace all practical practice',
          'To advertise the course'
        ],
        correct: 1,
        explanation: 'A final assessment validates that you can apply knowledge and skills from all modules to professional scenarios.'
      },
      {
        question: 'Which item is most important to include in a professional nail portfolio?',
        options: [
          'Only photos of tools',
          'Before/after images showing a variety of services and styles',
          'Only one signature design repeated',
          'Competitor pricing sheets'
        ],
        correct: 1,
        explanation: 'A strong portfolio demonstrates range, consistency, and quality through clear before/after photos and diverse work.'
      },
      {
        question: 'When documenting work in a portfolio, what is best practice for client privacy?',
        options: [
          'Include the client\'s full name and contact details',
          'Post everything without consent',
          'Get consent and avoid personally identifying details',
          'Use private medical information to add credibility'
        ],
        correct: 2,
        explanation: 'Always obtain consent and avoid sharing identifying information to protect client privacy and comply with ethical standards.'
      },
      {
        question: 'Which of the following is an example of professional certification readiness?',
        options: [
          'Skipping sanitation to save time',
          'Consistently following hygiene protocols and producing repeatable results',
          'Only practicing on one nail shape',
          'Using any product without checking allergies'
        ],
        correct: 1,
        explanation: 'Certification readiness means safe, consistent, repeatable service delivery with strong hygiene and client-care standards.'
      },
      {
        question: 'What is a good way to keep improving after certification?',
        options: [
          'Stop learning once certified',
          'Seek feedback, take advanced workshops, and track outcomes',
          'Only copy trends without understanding technique',
          'Avoid documenting your work'
        ],
        correct: 1,
        explanation: 'Ongoing improvement comes from feedback, continued education, and reflecting on results to refine technique.'
      }
    ]
  }
};

