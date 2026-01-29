
import type { QuizLesson } from '@/types/course';

export const lesson20Quiz: QuizLesson = {
  id: 20,
  title: 'Module 5 Quiz: Education, Learning & AI',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of AI tutors in education?',
        options: [
          'To replace human teachers entirely',
          'To simulate one-on-one instruction by personalizing content and feedback',
          'To deliver standardized tests only',
          'To limit student access to educational materials'
        ],
        correct: 1,
        explanation: 'AI tutors are designed to simulate one-on-one instruction by personalizing content and providing feedback, not to replace human teachers entirely.'
      },
      {
        question: 'Which of the following is an example of an AI tutor?',
        options: [
          'DreamBox Learning',
          'Socratic by Google',
          'Blackboard',
          'Google Classroom'
        ],
        correct: 1,
        explanation: 'Socratic by Google is an AI tutor that helps students solve problems using AI explanations.'
      },
      {
        question: 'Adaptive learning systems primarily adjust which of the following based on learner data?',
        options: [
          'Content difficulty, pacing, and instructional path',
          'Teacher salaries',
          'Classroom seating arrangements',
          'School schedules'
        ],
        correct: 0,
        explanation: 'Adaptive learning systems adjust content difficulty, pacing, and instructional paths based on individual learner data and interactions.'
      },
      {
        question: 'Which AI capability allows tutors to understand and respond to student questions in natural language?',
        options: [
          'Predictive Modeling',
          'Learning Analytics',
          'Natural Language Processing (NLP)',
          'Diagnostic Assessment'
        ],
        correct: 2,
        explanation: 'Natural Language Processing (NLP) enables AI tutors to understand and respond to student questions in natural language.'
      },
      {
        question: 'One major benefit of AI tutors and adaptive learning systems is:',
        options: [
          'Decreased student engagement',
          'Providing real-time feedback and personalized learning at scale',
          'Eliminating the need for teachers',
          'Standardizing all students\' learning pace'
        ],
        correct: 1,
        explanation: 'AI tutors and adaptive learning systems provide real-time feedback and personalized learning at scale, which is a major benefit.'
      },
      {
        question: 'A key challenge of AI in education is:',
        options: [
          'AI always understands student emotions perfectly',
          'Unlimited equitable access for all students',
          'Data privacy concerns and potential algorithm bias',
          'AI being able to replace teacher mentorship'
        ],
        correct: 2,
        explanation: 'Data privacy concerns and potential algorithm bias are key challenges when implementing AI in education.'
      },
      {
        question: 'Ethical considerations for AI tutors include all EXCEPT:',
        options: [
          'Transparency about how algorithms work',
          'Ensuring equity and access',
          'Completely hiding data usage from students',
          'Informed consent about data collection'
        ],
        correct: 2,
        explanation: 'Completely hiding data usage from students is not an ethical consideration - transparency about data usage is actually required.'
      },
      {
        question: 'How can AI tutors support teachers?',
        options: [
          'By automating routine tasks like grading',
          'By taking over all classroom teaching duties',
          'By reducing communication with students',
          'By discouraging personalized instruction'
        ],
        correct: 0,
        explanation: 'AI tutors can support teachers by automating routine tasks like grading, freeing up time for more meaningful interactions.'
      },
      {
        question: 'What is one future trend in AI-enhanced education?',
        options: [
          'Removing human teachers from classrooms completely',
          'Hybrid models where AI supports teachers as facilitators',
          'Standardized learning paths for all students',
          'Avoiding AI integration to prevent bias'
        ],
        correct: 1,
        explanation: 'Hybrid models where AI supports teachers as facilitators represent a key future trend in AI-enhanced education.'
      },
      {
        question: 'Why is it important to maintain teacher-student relationships despite AI use?',
        options: [
          'Because AI can fully replace emotional support',
          'To ensure trust, mentorship, and emotional connection remain central to learning',
          'To reduce the teacher\'s workload to zero',
          'To prevent students from accessing personalized learning'
        ],
        correct: 1,
        explanation: 'Maintaining teacher-student relationships is important to ensure trust, mentorship, and emotional connection remain central to learning, which AI cannot fully replace.'
      }
    ]
  }
};
