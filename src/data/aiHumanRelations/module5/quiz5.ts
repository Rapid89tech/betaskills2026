import type { Lesson } from '@/types/course';

export const quiz5: Lesson = {
  id: 4,
  title: '📝 Module 5 Quiz: Education, Learning & AI',
  duration: '25 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which of the following is a core function of AI tutors in education?',
        options: [
          'Hiring teachers',
          'Conducting final exams',
          'Offering personalized content and feedback',
          'Building school infrastructure'
        ],
        correctAnswer: 2,
        explanation: 'AI tutors provide personalized content and feedback tailored to individual student needs.'
      },
      {
        id: 2,
        question: 'What is the main advantage of adaptive learning systems?',
        options: [
          'They eliminate the need for teachers',
          'They standardize education for all students',
          'They dynamically adjust instruction based on student performance',
          'They reduce the need for any student input'
        ],
        correctAnswer: 2,
        explanation: 'Adaptive learning systems dynamically adjust content difficulty, pacing, and instructional paths based on individual learner data.'
      },
      {
        id: 3,
        question: 'Which platform is known for providing personalized math coaching using AI?',
        options: [
          'Duolingo',
          'MATHia by Carnegie Learning',
          'Grammarly',
          'Zoom'
        ],
        correctAnswer: 1,
        explanation: 'Carnegie Learning\'s MATHia provides K–12 students with tailored math coaching.'
      },
      {
        id: 4,
        question: 'How does AI support teachers in the classroom?',
        options: [
          'By replacing teachers',
          'By automating routine tasks and providing insights',
          'By taking over teaching completely',
          'By monitoring student emotions only'
        ],
        correctAnswer: 1,
        explanation: 'AI supports teachers by automating routine tasks like grading and providing data-driven insights for targeted interventions.'
      },
      {
        id: 5,
        question: 'What is a major ethical concern when using AI in education?',
        options: [
          'Increased student participation',
          'Data privacy and bias in algorithms',
          'Lack of classroom supplies',
          'Too many homework assignments'
        ],
        correctAnswer: 1,
        explanation: 'Data privacy and algorithmic bias are major ethical concerns in AI education systems.'
      },
      {
        id: 6,
        question: 'Which principle is central to humanized digital education?',
        options: [
          'Rigid content delivery',
          'Empathy and connection',
          'Memorization-focused teaching',
          'Automated learning without feedback'
        ],
        correctAnswer: 1,
        explanation: 'Empathy and connection are central to humanizing digital education, ensuring learners feel supported.'
      },
      {
        id: 7,
        question: 'What emotional risk is associated with excessive use of AI in education?',
        options: [
          'Too much interaction with teachers',
          'Increased motivation and trust',
          'Emotional detachment and reduced human interaction',
          'Improved communication'
        ],
        correctAnswer: 2,
        explanation: 'Over-reliance on AI may lead to emotional detachment and reduced human interaction.'
      },
      {
        id: 8,
        question: 'What is the purpose of emotion AI in adaptive learning systems?',
        options: [
          'To schedule breaks for students',
          'To detect and respond to student emotions',
          'To design classroom furniture',
          'To monitor teacher behavior'
        ],
        correctAnswer: 1,
        explanation: 'Emotion AI detects student emotions like frustration or boredom to adapt content and maintain engagement.'
      },
      {
        id: 9,
        question: 'Which of the following is a negative impact of AI on teacher-student relationships?',
        options: [
          'Enhanced student engagement',
          'Improved teacher planning',
          'Reduced face-to-face interaction',
          'More accurate grading'
        ],
        correctAnswer: 2,
        explanation: 'Over-reliance on AI tutors may decrease face-to-face interaction, weakening emotional connections.'
      },
      {
        id: 10,
        question: 'How is the teacher\'s role evolving with the use of AI?',
        options: [
          'From facilitator to administrator',
          'From grader to AI technician',
          'From instructor to facilitator and coach',
          'From leader to observer'
        ],
        correctAnswer: 2,
        explanation: 'Teachers are evolving from traditional instructors to facilitators and coaches who guide inquiry and provide mentorship.'
      },
      {
        id: 11,
        question: 'What is the goal of humanized digital education?',
        options: [
          'To eliminate the need for teachers',
          'To maximize automation',
          'To foster connection, empathy, and inclusion',
          'To create identical experiences for all learners'
        ],
        correctAnswer: 2,
        explanation: 'Humanized digital education aims to foster connection, empathy, and inclusion in online learning.'
      },
      {
        id: 12,
        question: 'Which adaptive platform is widely used for language learning?',
        options: [
          'Smart Sparrow',
          'MATHia',
          'Duolingo',
          'Knewton'
        ],
        correctAnswer: 2,
        explanation: 'Duolingo is widely used for adaptive language learning with gamification.'
      },
      {
        id: 13,
        question: 'Which of the following is a limitation of AI tutors?',
        options: [
          'They offer 24/7 access',
          'They lack emotional intelligence and human empathy',
          'They provide instant feedback',
          'They enhance teacher productivity'
        ],
        correctAnswer: 1,
        explanation: 'AI tutors lack emotional intelligence and cannot fully understand or respond to students\' emotional needs.'
      },
      {
        id: 14,
        question: 'What does Universal Design for Learning (UDL) promote?',
        options: [
          'One-size-fits-all instruction',
          'Standardized testing only',
          'Flexible, inclusive learning approaches',
          'Strict grading criteria'
        ],
        correctAnswer: 2,
        explanation: 'UDL promotes flexible, inclusive learning approaches that accommodate diverse learners.'
      },
      {
        id: 15,
        question: 'Which strategy helps maintain strong teacher-student relationships in AI-enabled classrooms?',
        options: [
          'Replacing teachers with AI entirely',
          'Using AI to reduce all interaction',
          'Blending AI tools with emotional check-ins and mentoring',
          'Automating lectures and removing group activities'
        ],
        correctAnswer: 2,
        explanation: 'Blending AI tools with emotional check-ins and mentoring maintains strong teacher-student relationships.'
      }
    ]
  }
};
